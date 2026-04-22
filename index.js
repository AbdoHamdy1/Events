// ========================================
        // 1️⃣ قائمة الكلمات الممنوعة (فلتر تلقائي)
        // ========================================
        const BLOCKED_KEYWORDS = [
            'خمر', 'خمور', 'كحول', 'حشيش', 'مخدرات', 'بار', 'نادي ليلي',
            'رقص', 'تعري', 'عريان', 'جنس', 'سكس', 'عري',
            'alcohol', 'wine', 'beer', 'vodka', 'whisky', 'whiskey',
            'cannabis', 'marijuana', 'drugs', 'nude', 'naked', 'strip',
            'strip club', 'adult', 'sexy', 'porn', 'explicit'
        ];

        // ========================================
        // 2️⃣ تخزين IDs الأحداث المحظورة (حل دائم)
        // ========================================
        // دي اللي بتمنع الحدث من الظهور بشكل دائم
        let blockedEventIds = JSON.parse(localStorage.getItem('blocked_event_ids') || '[]');
        
        // دي لتخزين تفاصيل إضافية (للإدارة)
        let blockedEventsDetails = JSON.parse(localStorage.getItem('blocked_events_details') || '[]');

        // ========================================
        // 3️⃣ وضع المشرف
        // ========================================
        let isAdminMode = localStorage.getItem('isAdmin') === 'true';
        const ADMIN_PASSWORD = "admin123";

        function showAdminBadge() {
            let badge = document.querySelector('.admin-badge');
            let unblockBtn = document.getElementById('unblockBtnContainer');
            
            if (isAdminMode) {
                if (!badge) {
                    badge = document.createElement('div');
                    badge.className = 'admin-badge';
                    badge.innerHTML = '👑 وضع المشرف نشط | اضغط على 🗑️ لحذف أي حدث';
                    document.body.appendChild(badge);
                }
                if (unblockBtn) unblockBtn.style.display = 'block';
            } else {
                if (badge) badge.remove();
                if (unblockBtn) unblockBtn.style.display = 'none';
            }
        }

        function promptAdminPassword() {
            const pwd = prompt("🔐 أدخل كلمة سر المشرف:");
            if (pwd === ADMIN_PASSWORD) {
                isAdminMode = true;
                localStorage.setItem('isAdmin', 'true');
                showAdminBadge();
                if (monthsData.length > 0) {
                    renderCalendar(monthsData[currentMonthIndex], currentMonthIndex);
                }
                alert("✅ تم تفعيل وضع المشرف - ستظهر أزرار حذف بجانب كل حدث");
            } else if (pwd !== null) {
                alert("❌ كلمة سر خاطئة");
            }
        }

        // ========================================
        // 4️⃣ حظر حدث بشكل دائم (حتى بعد تحديث الصفحة وإعادة البحث)
        // ========================================
        function blockEventPermanently(event) {
            // التحقق إذا كان الحدث محظور بالفعل
            if (!blockedEventIds.includes(event.id)) {
                // إضافة ID الحدث إلى قائمة المحظورين
                blockedEventIds.push(event.id);
                localStorage.setItem('blocked_event_ids', JSON.stringify(blockedEventIds));
                
                // إضافة تفاصيل للعرض في قائمة الإدارة
                blockedEventsDetails.push({
                    id: event.id,
                    name: event.name?.text || event.name,
                    date: event.date,
                    source: event.source,
                    blockedAt: new Date().toISOString()
                });
                localStorage.setItem('blocked_events_details', JSON.stringify(blockedEventsDetails));
                
                console.log(`🚫 تم حظر الحدث بشكل دائم: ${event.name}`);
                
                // إعادة تحميل الأحداث الحالية
                refreshCurrentEvents();
            }
        }

        // إلغاء حظر حدث
        function unblockEvent(eventId) {
            blockedEventIds = blockedEventIds.filter(id => id !== eventId);
            blockedEventsDetails = blockedEventsDetails.filter(detail => detail.id !== eventId);
            
            localStorage.setItem('blocked_event_ids', JSON.stringify(blockedEventIds));
            localStorage.setItem('blocked_events_details', JSON.stringify(blockedEventsDetails));
            
            console.log(`✅ تم إلغاء حظر الحدث: ${eventId}`);
            refreshCurrentEvents();
        }

        // عرض قائمة الأحداث المحظورة (للمشرف)
        function showBlockedEventsList() {
            if (!isAdminMode) {
                alert("❌ هذه الخاصية متاحة فقط للمشرف");
                return;
            }
            
            if (blockedEventsDetails.length === 0) {
                alert("📭 لا توجد أحداث محظورة حالياً");
                return;
            }
            
            let message = "🚫 الأحداث المحظورة:\n\n";
            blockedEventsDetails.forEach((event, index) => {
                message += `${index + 1}. ${event.name}\n`;
                message += `   📅 ${event.date || 'تاريخ غير محدد'}\n`;
                message += `   📍 من ${event.source === 'eventbrite' ? 'Eventbrite' : 'Ticketmaster'}\n`;
                message += `   🗑️ محظور في: ${new Date(event.blockedAt).toLocaleString()}\n\n`;
            });
            
            message += "\n👇 اختر رقم الحدث لإلغاء حظره (0 للخروج):";
            
            const choice = prompt(message);
            if (choice && !isNaN(choice)) {
                const index = parseInt(choice) - 1;
                if (index >= 0 && index < blockedEventsDetails.length) {
                    const eventToUnblock = blockedEventsDetails[index];
                    if (confirm(`هل تريد إلغاء حظر "${eventToUnblock.name}"؟`)) {
                        unblockEvent(eventToUnblock.id);
                        alert(`✅ تم إلغاء حظر "${eventToUnblock.name}"`);
                    }
                }
            }
        }

        // ========================================
        // 5️⃣ فلتر الأحداث (تلقائي + يدوي دائم)
        // ========================================
        function filterAllEvents(events) {
            if (!events || !Array.isArray(events)) return [];
            
            return events.filter(event => {
                const eventName = (event.name?.text || event.name || '').toLowerCase();
                const eventDesc = (event.description?.text || event.description || '').toLowerCase();
                const fullText = eventName + ' ' + eventDesc;
                
                // 1. فلتر الكلمات الممنوعة (تلقائي)
                const hasBlockedWord = BLOCKED_KEYWORDS.some(keyword => 
                    fullText.includes(keyword.toLowerCase())
                );
                
                if (hasBlockedWord) {
                    console.log('🚫 تم حذف حدث تلقائياً (كلمة ممنوعة):', eventName);
                    return false;
                }
                
                // 2. فلتر المحظور يدوياً (باستخدام ID الحدث)
                const isManuallyBlocked = blockedEventIds.includes(event.id);
                if (isManuallyBlocked) {
                    console.log('🚫 تم حذف حدث يدوياً بواسطة المشرف:', eventName);
                    return false;
                }
                
                return true;
            });
        }

        // ========================================
        // 6️⃣ APIs Configuration
        // ========================================
        const EVENTBRITE_TOKEN = "ZDUJO7E2HZWVCRPMVUW3";
        const TICKETMASTER_KEY = "sF7cjf3EGJLSLwcxCz4244eYlsewAtc6";
        const API_PRIORITY = ["eventbrite", "ticketmaster"];
        
        // ========================================
        // 7️⃣ الدول والمدن
        // ========================================
        const countries = [
            "UAE", "Egypt", "Saudi Arabia", "Qatar", "Kuwait", "Jordan", "Morocco",
            "UK", "USA", "Germany", "France", "Italy", "Spain", "Turkey"
        ];
        
        const cities = {
            UAE: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman"],
            Egypt: ["Cairo", "Alexandria", "Giza", "Luxor"],
            "Saudi Arabia": ["Riyadh", "Jeddah", "Mecca", "Medina"],
            Qatar: ["Doha", "Al Rayyan"],
            Kuwait: ["Kuwait City"],
            Jordan: ["Amman", "Aqaba"],
            Morocco: ["Casablanca", "Marrakech", "Rabat"],
            UK: ["London", "Manchester", "Birmingham"],
            USA: ["New York", "Los Angeles", "Chicago", "Miami"],
            Germany: ["Berlin", "Munich", "Hamburg"],
            France: ["Paris", "Lyon", "Marseille"],
            Italy: ["Rome", "Milan", "Florence"],
            Spain: ["Madrid", "Barcelona", "Seville"],
            Turkey: ["Istanbul", "Ankara", "Antalya"]
        };
        
        let selectedCountry = "";
        let selectedCity = "";
        let currentMonthIndex = 0;
        let monthsData = [];
        
        function getEventImageUrl(eventName, source) {
            const name = (eventName || "").toLowerCase();
            if (name.includes("concert") || name.includes("حفلة")) 
                return "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=100&h=100&fit=crop";
            if (name.includes("art")) 
                return "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=100&h=100&fit=crop";
            if (name.includes("tech")) 
                return "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=100&h=100&fit=crop";
            if (name.includes("food")) 
                return "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=100&h=100&fit=crop";
            return "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=100&h=100&fit=crop";
        }
        
        function getEventEmoji(name) {
            const n = (name || "").toLowerCase();
            if (n.includes("concert") || n.includes("حفلة")) return "🎵";
            if (n.includes("art")) return "🎨";
            if (n.includes("tech")) return "💻";
            if (n.includes("food")) return "🍽️";
            return "🎉";
        }
        
        function loadCountries() {
            const countrySelect = document.getElementById('countrySelect');
            countries.forEach(country => {
                const option = document.createElement('option');
                option.value = country;
                option.textContent = country;
                countrySelect.appendChild(option);
            });
        }
        
        document.getElementById('countrySelect').addEventListener('change', (e) => {
            selectedCountry = e.target.value;
            const citySelect = document.getElementById('citySelect');
            const searchBtn = document.getElementById('searchBtn');
            
            if (selectedCountry && cities[selectedCountry]) {
                citySelect.disabled = false;
                citySelect.innerHTML = '<option value="">-- اختر مدينة --</option>';
                cities[selectedCountry].forEach(city => {
                    const option = document.createElement('option');
                    option.value = city;
                    option.textContent = city;
                    citySelect.appendChild(option);
                });
                searchBtn.disabled = true;
            } else {
                citySelect.disabled = true;
                searchBtn.disabled = true;
            }
        });
        
        document.getElementById('citySelect').addEventListener('change', (e) => {
            selectedCity = e.target.value;
            document.getElementById('searchBtn').disabled = !selectedCity;
        });
        
        async function fetchFromEventbrite(city, country, startDate, endDate) {
            const location = `${city}, ${country}`;
            const url = `https://www.eventbriteapi.com/v3/events/search/?location.address=${encodeURIComponent(location)}&start_date.range_start=${startDate}&start_date.range_end=${endDate}&sort_by=date`;
            try {
                const response = await fetch(url, {
                    headers: { 'Authorization': `Bearer ${EVENTBRITE_TOKEN}` }
                });
                if (!response.ok) return [];
                const data = await response.json();
                return (data.events || []).map(event => ({
                    id: `eb_${event.id}`,
                    name: event.name?.text || "حدث",
                    date: event.start?.local?.split('T')[0],
                    url: event.url,
                    source: "eventbrite",
                    description: event.description?.text || "",
                    imageUrl: event.logo?.original?.url || getEventImageUrl(event.name?.text, "eventbrite")
                }));
            } catch(e) {
                return [];
            }
        }
        
        async function fetchFromTicketmaster(city, country, startDate, endDate) {
            const countryCodes = { UAE: "AE", Egypt: "EG", "Saudi Arabia": "SA", Qatar: "QA", Kuwait: "KW", Jordan: "JO", Morocco: "MA", UK: "GB", USA: "US", Germany: "DE", France: "FR", Italy: "IT", Spain: "ES", Turkey: "TR" };
            const code = countryCodes[country] || "US";
            const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${TICKETMASTER_KEY}&city=${encodeURIComponent(city)}&countryCode=${code}&startDateTime=${startDate}T00:00:00Z&endDateTime=${endDate}T23:59:59Z&size=200`;
            try {
                const response = await fetch(url);
                const data = await response.json();
                if (!data._embedded?.events) return [];
                return data._embedded.events.map(event => ({
                    id: `tm_${event.id}`,
                    name: event.name || "حدث",
                    date: event.dates?.start?.localDate,
                    url: event.url,
                    source: "ticketmaster",
                    description: event.info || "",
                    imageUrl: event.images?.[0]?.url || getEventImageUrl(event.name, "ticketmaster")
                }));
            } catch(e) {
                return [];
            }
        }
        
        function mergeEventsWithPriority(eventsFromAPIs) {
            const eventsMap = new Map();
            for (const apiName of API_PRIORITY) {
                const events = eventsFromAPIs[apiName] || [];
                for (const event of events) {
                    const key = `${event.date}_${event.name}`;
                    if (!eventsMap.has(key)) {
                        eventsMap.set(key, event);
                    }
                }
            }
            return Array.from(eventsMap.values());
        }
        
        async function fetchAllMonthsEvents(city, country, monthsCount) {
            const today = new Date();
            const eventsByMonth = [];
            for (let i = 0; i < monthsCount; i++) {
                const startDate = new Date(today.getFullYear(), today.getMonth() + i, 1);
                const endDate = new Date(today.getFullYear(), today.getMonth() + i + 1, 0);
                const startStr = startDate.toISOString().split('T')[0];
                const endStr = endDate.toISOString().split('T')[0];
                const [eventbriteEvents, ticketmasterEvents] = await Promise.all([
                    fetchFromEventbrite(city, country, startStr, endStr),
                    fetchFromTicketmaster(city, country, startStr, endStr)
                ]);
                let mergedEvents = mergeEventsWithPriority({ eventbrite: eventbriteEvents, ticketmaster: ticketmasterEvents });
                mergedEvents = filterAllEvents(mergedEvents);
                eventsByMonth.push({
                    month: startDate.getMonth(),
                    year: startDate.getFullYear(),
                    events: mergedEvents,
                    startDate: startDate,
                    endDate: endDate
                });
            }
            return eventsByMonth;
        }
        
        async function refreshCurrentEvents() {
            if (!selectedCity || !selectedCountry) return;
            const monthsCount = parseInt(document.getElementById('monthsCount').value);
            const container = document.getElementById('calendarContainer');
            container.innerHTML = '<div class="loading">⏳ جاري تحديث الأحداث...</div>';
            try {
                monthsData = await fetchAllMonthsEvents(selectedCity, selectedCountry, monthsCount);
                currentMonthIndex = 0;
                if (monthsData.length > 0 && monthsData.some(m => m.events.length > 0)) {
                    renderCalendar(monthsData[0], 0);
                } else {
                    container.innerHTML = `<div class="error">📭 لا توجد أحداث في ${selectedCity}, ${selectedCountry}</div>`;
                }
            } catch(error) {
                container.innerHTML = '<div class="error">❌ حدث خطأ</div>';
            }
        }
        
        function renderCalendar(monthData, monthIndex) {
            const container = document.getElementById('calendarContainer');
            const startDate = monthData.startDate;
            const year = startDate.getFullYear();
            const month = startDate.getMonth();
            const firstDay = new Date(year, month, 1);
            let startDayOfWeek = firstDay.getDay();
            startDayOfWeek = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            const eventsByDay = {};
            monthData.events.forEach(event => {
                if (event.date) {
                    const day = new Date(event.date).getDate();
                    if (!eventsByDay[day]) eventsByDay[day] = [];
                    eventsByDay[day].push(event);
                }
            });
            let daysHtml = '';
            for (let i = 0; i < startDayOfWeek; i++) {
                daysHtml += `<div class="day-cell empty"></div>`;
            }
            for (let day = 1; day <= daysInMonth; day++) {
                const events = eventsByDay[day] || [];
                const eventCount = events.length;
                daysHtml += `
                    <div class="day-cell ${eventCount > 0 ? 'has-events' : ''}" onclick="showDayEvents(${day}, ${month}, ${year})">
                        <div class="day-number">${day}</div>
                        ${events.slice(0, 3).map(e => `
                            <div class="event-badge" onclick="event.stopPropagation(); window.open('${e.url}', '_blank')">
                                ${isAdminMode ? `<button class="admin-delete-btn" onclick="event.stopPropagation(); blockEventPermanently(${JSON.stringify(e).replace(/"/g, '&quot;')})">🗑️</button>` : ''}
                                <div class="event-badge-img">
                                    <img src="${e.imageUrl}" style="width:100%; height:100%; object-fit:cover; border-radius:10px;" onerror="this.style.display='none'; this.parentElement.innerHTML='${getEventEmoji(e.name)}'">
                                </div>
                                <div class="event-badge-info">
                                    <div class="event-badge-name">${(e.name || "").substring(0, 25)}${(e.name || "").length > 25 ? '...' : ''}</div>
                                    <div class="event-badge-source">${e.source === 'eventbrite' ? 'Eventbrite' : 'Ticketmaster'}</div>
                                </div>
                            </div>
                        `).join('')}
                        ${eventCount > 3 ? `<div class="event-count">+${eventCount - 3}</div>` : ''}
                    </div>
                `;
            }
            const monthNames = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
            const weekdays = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
            container.innerHTML = `
                <div class="month-nav">
                    <button onclick="changeMonth(-1)" ${monthIndex === 0 ? 'disabled' : ''}>◀ الشهر السابق</button>
                    <div class="month-title">${monthNames[month]} ${year}</div>
                    <button onclick="changeMonth(1)" ${monthIndex === monthsData.length - 1 ? 'disabled' : ''}>الشهر التالي ▶</button>
                </div>
                <div class="calendar">
                    <div class="weekdays">${weekdays.map(day => `<div class="weekday">${day}</div>`).join('')}</div>
                    <div class="days-grid">${daysHtml}</div>
                </div>
            `;
        }
        
        function changeMonth(delta) {
            const newIndex = currentMonthIndex + delta;
            if (newIndex >= 0 && newIndex < monthsData.length) {
                currentMonthIndex = newIndex;
                renderCalendar(monthsData[currentMonthIndex], currentMonthIndex);
            }
        }
        
        function showDayEvents(day, month, year) {
            const monthData = monthsData[currentMonthIndex];
            const events = monthData.events.filter(e => {
                if (!e.date) return false;
                const eventDate = new Date(e.date);
                return eventDate.getDate() === day && eventDate.getMonth() === month && eventDate.getFullYear() === year;
            });
            const modal = document.getElementById('modal');
            const modalDate = document.getElementById('modalDate');
            const modalEventsList = document.getElementById('modalEventsList');
            const monthNames = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
            modalDate.textContent = `📅 ${day} ${monthNames[month]} ${year} - ${events.length} فعالية`;
            if (events.length === 0) {
                modalEventsList.innerHTML = '<p style="text-align:center; padding:20px;">لا توجد فعاليات في هذا اليوم</p>';
            } else {
                modalEventsList.innerHTML = events.map(event => `
                    <div class="modal-event-item" onclick="window.open('${event.url}', '_blank')">
                        ${isAdminMode ? `<button class="admin-delete-btn" onclick="event.stopPropagation(); blockEventPermanently(${JSON.stringify(event).replace(/"/g, '&quot;')})">🗑️</button>` : ''}
                        <div class="modal-event-img"><img src="${event.imageUrl}" style="width:100%; height:100%; object-fit:cover; border-radius:16px;" onerror="this.style.display='none'; this.parentElement.innerHTML='${getEventEmoji(event.name)}'"></div>
                        <div class="modal-event-info">
                            <div class="modal-event-name">${event.name}</div>
                            <div class="modal-event-date">📅 ${event.date}</div>
                            <div class="modal-event-source">📍 من ${event.source === 'eventbrite' ? 'Eventbrite' : 'Ticketmaster'}</div>
                        </div>
                    </div>
                `).join('');
            }
            modal.style.display = "flex";
        }
        
        function closeModal() {
            document.getElementById('modal').style.display = "none";
        }
        
        document.getElementById('searchBtn').addEventListener('click', async () => {
            if (!selectedCity || !selectedCountry) return;
            const monthsCount = parseInt(document.getElementById('monthsCount').value);
            const container = document.getElementById('calendarContainer');
            container.innerHTML = '<div class="loading">⏳ جاري البحث عن الأحداث...</div>';
            try {
                monthsData = await fetchAllMonthsEvents(selectedCity, selectedCountry, monthsCount);
                currentMonthIndex = 0;
                if (monthsData.length > 0 && monthsData.some(m => m.events.length > 0)) {
                    renderCalendar(monthsData[0], 0);
                } else {
                    container.innerHTML = `<div class="error">📭 لا توجد أحداث في ${selectedCity}, ${selectedCountry}</div>`;
                }
            } catch(error) {
                container.innerHTML = '<div class="error">❌ حدث خطأ</div>';
            }
        });
        
        loadCountries();
        showAdminBadge();
        
        window.onclick = (event) => {
            const modal = document.getElementById('modal');
            if (event.target === modal) closeModal();
        };
        
        console.log("✅ النظام جاهز - عدد الأحداث المحظورة:", blockedEventIds.length);