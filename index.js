const BLOCKED_KEYWORDS = [
    'خمر', 'خمور', 'كحول', 'حشيش', 'مخدرات', 'بار', 'نادي ليلي',
    'رقص', 'تعري', 'عريان', 'جنس', 'سكس', 'عري',
    'alcohol', 'wine', 'beer', 'vodka', 'whisky', 'whiskey',
    'cannabis', 'marijuana', 'drugs', 'nude', 'naked', 'strip',
    'strip club', 'adult', 'sexy', 'porn', 'explicit'
];

const TICKETMASTER_KEY = "C6DNnoN0BCMFa0tqwwzw70kcWHlqag4D";

const countries = [
    "Argentina", "Australia", "Austria", "Bahrain", "Belgium", "Brazil", "Canada", "China", "Croatia", "Czech Republic",
    "Denmark", "Egypt", "Finland", "France", "Germany", "Greece", "Hungary", "India", "Indonesia", "Ireland",
    "Italy", "Japan", "Jordan", "Kenya", "Kuwait", "Lebanon", "Malaysia", "Mexico", "Morocco", "Netherlands",
    "New Zealand", "Norway", "Oman", "Philippines", "Poland", "Portugal", "Qatar", "Saudi Arabia", "Singapore", "South Africa",
    "South Korea", "Spain", "Sweden", "Switzerland", "Tanzania", "Thailand", "Tunisia", "Turkey", "UAE", "UK",
    "USA", "Vietnam"
];

const cities = {
    UAE: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Ras Al Khaimah", "Fujairah", "Al Ain"],
    Egypt: ["Cairo", "Alexandria", "Giza", "Luxor", "Aswan", "Hurghada", "Sharm El Sheikh", "Dahab", "Marsa Alam", "Sahl Hasheesh", "El Gouna", "Sokhna"],
    "Saudi Arabia": ["Riyadh", "Jeddah", "Mecca", "Medina", "Dammam", "Khobar", "Taif", "AlUla", "Abha", "Jizan", "Yanbu", "Tabuk"],
    Qatar: ["Doha", "Katara", "The Pearl", "Al Wakrah", "Lusail"],
    Kuwait: ["Kuwait City", "Salmiya", "Hawalli"],
    Jordan: ["Amman", "Aqaba", "Petra", "Wadi Rum", "Dead Sea", "Jerash", "Madaba"],
    Morocco: ["Casablanca", "Marrakech", "Rabat", "Fez", "Tangier", "Agadir", "Essaouira", "Chefchaouen", "Ouarzazate", "Tetouan", "Meknes", "Safi"],
    Bahrain: ["Manama", "Amwaj Islands", "Muharraq", "Riffa"],
    Oman: ["Muscat", "Salalah", "Nizwa", "Sur", "Sohar", "Khasab", "Bahla"],
    Lebanon: ["Beirut", "Byblos", "Jounieh", "Batroun", "Tripoli", "Zahle"],
    Tunisia: ["Tunis", "Hammamet", "Sousse", "Monastir", "Djerba", "Sfax", "Kairouan"],
    UK: ["London", "Edinburgh", "Manchester", "Birmingham", "Glasgow", "Liverpool", "Bristol", "Oxford", "Cambridge", "Brighton", "Bath", "York", "Cardiff", "Belfast", "Southampton", "Nottingham"],
    USA: ["New York", "Los Angeles", "Chicago", "Miami", "Las Vegas", "Orlando", "San Francisco", "Boston", "Washington DC", "Seattle", "Denver", "Nashville", "Austin", "Atlanta", "New Orleans", "Honolulu", "San Diego", "Portland", "Philadelphia", "Dallas", "Houston", "Phoenix"],
    Germany: ["Berlin", "Munich", "Hamburg", "Frankfurt", "Cologne", "Stuttgart", "Düsseldorf", "Dresden", "Nuremberg", "Hanover", "Leipzig", "Bremen", "Heidelberg", "Rothenburg", "Füssen"],
    France: ["Paris", "Nice", "Lyon", "Marseille", "Bordeaux", "Toulouse", "Strasbourg", "Montpellier", "Lille", "Nantes", "Cannes", "Saint-Tropez", "Avignon", "Versailles", "Biarritz"],
    Italy: ["Rome", "Milan", "Florence", "Venice", "Naples", "Turin", "Bologna", "Palermo", "Genoa", "Verona", "Pisa", "Siena", "Lake Como", "Amalfi", "Positano", "Capri", "Cinque Terre", "Sorrento", "Taormina"],
    Spain: ["Madrid", "Barcelona", "Seville", "Valencia", "Granada", "Malaga", "Bilbao", "Zaragoza", "Alicante", "Palma de Mallorca", "Ibiza", "San Sebastian", "Cordoba", "Toledo", "Salamanca", "Marbella", "Benidorm", "Tenerife", "Las Palmas", "Lanzarote"],
    Turkey: ["Istanbul", "Antalya", "Ankara", "Izmir", "Bodrum", "Marmaris", "Fethiye", "Kusadasi", "Cesme", "Alanya", "Side", "Belek", "Cappadocia", "Pamukkale", "Trabzon", "Bursa", "Gaziantep"],
    Greece: ["Athens", "Santorini", "Mykonos", "Crete", "Rhodes", "Thessaloniki", "Corfu", "Zakynthos", "Paros", "Naxos", "Milos", "Kefalonia", "Skiathos", "Olympia", "Meteora", "Delphi"],
    Switzerland: ["Zurich", "Geneva", "Bern", "Lucerne", "Interlaken", "Zermatt", "Grindelwald", "Jungfrau", "St. Moritz", "Lugano", "Montreux", "Basel", "Lausanne"],
    Netherlands: ["Amsterdam", "Rotterdam", "The Hague", "Utrecht", "Maastricht", "Groningen", "Eindhoven", "Haarlem", "Leiden", "Delft", "Giethoorn", "Zaanse Schans", "Volendam"],
    Portugal: ["Lisbon", "Porto", "Algarve", "Sintra", "Faro", "Albufeira", "Lagos", "Cascais", "Madeira", "Azores", "Coimbra", "Braga", "Aveiro", "Nazare"],
    Austria: ["Vienna", "Salzburg", "Innsbruck", "Hallstatt", "Graz", "Linz", "Zell am See", "Kitzbuhel", "Bad Gastein", "St. Anton", "Mayrhofen"],
    Belgium: ["Brussels", "Bruges", "Ghent", "Antwerp", "Leuven", "Namur", "Liege", "Dinant", "Waterloo"],
    Sweden: ["Stockholm", "Gothenburg", "Malmo", "Uppsala", "Lund", "Helsingborg", "Visby", "Kiruna", "Abisko", "Gotland"],
    Denmark: ["Copenhagen", "Aarhus", "Odense", "Aalborg", "Ribe", "Helsingør", "Roskilde", "Billund", "Skagen"],
    Norway: ["Oslo", "Bergen", "Trondheim", "Stavanger", "Tromsø", "Lofoten", "Svalbard", "Alesund", "Kristiansand", "Flam", "Geiranger"],
    Finland: ["Helsinki", "Rovaniemi", "Tampere", "Turku", "Oulu", "Lapland", "Levi", "Saariselka", "Kemi"],
    Poland: ["Warsaw", "Krakow", "Gdansk", "Wroclaw", "Poznan", "Zakopane", "Auschwitz", "Wieliczka", "Szczecin", "Lodz"],
    "Czech Republic": ["Prague", "Cesky Krumlov", "Brno", "Karlovy Vary", "Plzen", "Ostrava", "Kutna Hora", "Telc"],
    Hungary: ["Budapest", "Debrecen", "Szeged", "Lake Balaton", "Eger", "Sopron", "Pecs"],
    Ireland: ["Dublin", "Galway", "Cork", "Limerick", "Killarney", "Dingle", "Kinsale", "Belfast", "Giant's Causeway", "Ring of Kerry"],
    Croatia: ["Dubrovnik", "Split", "Zagreb", "Hvar", "Zadar", "Rovinj", "Pula", "Korcula", "Makarska", "Plitvice Lakes", "Sibenik", "Trogir"],
    Thailand: ["Bangkok", "Phuket", "Chiang Mai", "Krabi", "Koh Samui", "Pattaya", "Hua Hin", "Ayutthaya", "Phi Phi Islands", "Koh Tao", "Chiang Rai", "Khao Lak", "Railay Beach"],
    Japan: ["Tokyo", "Kyoto", "Osaka", "Hokkaido", "Hiroshima", "Yokohama", "Nagoya", "Nara", "Kobe", "Kanazawa", "Takayama", "Fuji", "Okinawa", "Nagasaki", "Kamakura", "Nikko"],
    "South Korea": ["Seoul", "Busan", "Jeju Island", "Incheon", "Daegu", "Gyeongju", "Daejeon", "Gwangju", "Jeonju", "Suwon", "Sokcho", "Seoraksan"],
    China: ["Beijing", "Shanghai", "Hong Kong", "Macau", "Guangzhou", "Shenzhen", "Chengdu", "Xi'an", "Hangzhou", "Guilin", "Zhangjiajie", "Kunming", "Tibet", "Lhasa", "Suzhou", "Nanjing", "Chongqing"],
    India: ["Mumbai", "Delhi", "Jaipur", "Goa", "Agra", "Bangalore", "Kerala", "Chennai", "Kolkata", "Udaipur", "Varanasi", "Hyderabad", "Rishikesh", "Manali", "Shimla", "Jaisalmer", "Leh Ladakh", "Pune", "Ahmedabad"],
    Malaysia: ["Kuala Lumpur", "Langkawi", "Penang", "Johor Bahru", "Malacca", "Cameron Highlands", "Kota Kinabalu", "Kuching", "Selangor", "Tioman Island", "Perhentian Islands", "Redang Island"],
    Singapore: ["Marina Bay", "Sentosa", "Orchard Road", "Chinatown", "Little India", "Gardens by the Bay", "Clarke Quay", "Bugis", "Jurong"],
    Indonesia: ["Bali", "Jakarta", "Yogyakarta", "Lombok", "Bandung", "Surabaya", "Gili Islands", "Komodo Island", "Bogor", "Medan", "Malang", "Tana Toraja", "Raja Ampat"],
    Vietnam: ["Ho Chi Minh City", "Hanoi", "Da Nang", "Hoi An", "Ha Long Bay", "Nha Trang", "Phu Quoc", "Da Lat", "Hue", "Sapa", "Mui Ne", "Ninh Binh"],
    Philippines: ["Manila", "Cebu", "Boracay", "Palawan", "El Nido", "Coron", "Davao", "Bohol", "Siargao", "Tagaytay", "Baguio", "Iloilo", "Puerto Galera"],
    Australia: ["Sydney", "Melbourne", "Brisbane", "Perth", "Gold Coast", "Cairns", "Adelaide", "Hobart", "Canberra", "Darwin", "Byron Bay", "Whitsundays", "Great Barrier Reef", "Uluru", "Fraser Island", "Tasmania"],
    "New Zealand": ["Auckland", "Queenstown", "Wellington", "Christchurch", "Rotorua", "Taupo", "Dunedin", "Nelson", "Mount Cook", "Milford Sound", "Franz Josef", "Waitomo", "Bay of Islands"],
    "South Africa": ["Cape Town", "Johannesburg", "Durban", "Kruger Park", "Soweto", "Port Elizabeth", "Pretoria", "Stellenbosch", "Knysna", "Garden Route", "Sun City"],
    Canada: ["Toronto", "Vancouver", "Montreal", "Quebec City", "Banff", "Whistler", "Ottawa", "Calgary", "Niagara Falls", "Victoria", "Edmonton", "Halifax", "Jasper", "Lake Louise", "Winnipeg"],
    Brazil: ["Rio de Janeiro", "Sao Paulo", "Salvador", "Florianopolis", "Brasilia", "Fortaleza", "Recife", "Manaus", "Iguazu Falls", "Curitiba", "Natal", "Porto Alegre", "Fernando de Noronha"],
    Argentina: ["Buenos Aires", "Mendoza", "Bariloche", "Iguazu", "El Calafate", "Ushuaia", "Cordoba", "Salta", "Rosario", "Perito Moreno", "Mar del Plata"],
    Mexico: ["Cancun", "Mexico City", "Playa del Carmen", "Tulum", "Puerto Vallarta", "Los Cabos", "Guadalajara", "Monterrey", "Riviera Maya", "Cozumel", "Merida", "Chichen Itza", "Oaxaca", "Puebla", "Guanajuato"],
    Kenya: ["Nairobi", "Mombasa", "Maasai Mara", "Lamu", "Diani Beach", "Malindi", "Watamu", "Naivasha", "Nakuru", "Amboseli", "Tsavo", "Samburu"],
    Tanzania: ["Zanzibar", "Dar es Salaam", "Arusha", "Serengeti", "Kilimanjaro", "Moshi", "Ngorongoro", "Stone Town", "Pemba", "Mafia Island", "Bagamoyo", "Tanga"]
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
    if (!countrySelect) return;
    
    countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country;
        option.textContent = country;
        countrySelect.appendChild(option);
    });
}

function loadCities() {
    const citySelect = document.getElementById('citySelect');
    if (!citySelect || !selectedCountry || !cities[selectedCountry]) return;
    
    citySelect.disabled = false;
    citySelect.innerHTML = '<option value="">-- اختر مدينة --</option>';
    cities[selectedCountry].forEach(city => {
        const option = document.createElement('option');
        option.value = city;
        option.textContent = city;
        citySelect.appendChild(option);
    });
}

function initEventListeners() {
    const countrySelect = document.getElementById('countrySelect');
    const citySelect = document.getElementById('citySelect');
    const searchBtn = document.getElementById('searchBtn');
    const monthsCount = document.getElementById('monthsCount');
    
    if (countrySelect) {
        countrySelect.addEventListener('change', (e) => {
            selectedCountry = e.target.value;
            selectedCity = "";
            if (citySelect) {
                if (selectedCountry && cities[selectedCountry]) {
                    loadCities();
                    if (searchBtn) searchBtn.disabled = true;
                } else {
                    citySelect.disabled = true;
                    citySelect.innerHTML = '<option value="">-- اختر مدينة أولاً --</option>';
                    if (searchBtn) searchBtn.disabled = true;
                }
            }
        });
    }
    
    if (citySelect) {
        citySelect.addEventListener('change', (e) => {
            selectedCity = e.target.value;
            if (searchBtn) searchBtn.disabled = !selectedCity;
        });
    }
    
    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }
    
    if (monthsCount) {
        monthsCount.addEventListener('change', () => {
            if (selectedCity && selectedCountry && searchBtn) {
                searchBtn.disabled = false;
            }
        });
    }
}

function filterEvents(events) {
    if (!events || !Array.isArray(events)) return [];
    
    return events.filter(event => {
        const eventName = (event.name || '').toLowerCase();
        const eventDesc = (event.description || '').toLowerCase();
        const fullText = eventName + ' ' + eventDesc;
        
        const hasBlockedWord = BLOCKED_KEYWORDS.some(keyword => 
            fullText.includes(keyword.toLowerCase())
        );
        
        if (hasBlockedWord) {
            console.log('🚫 تم حذف حدث تلقائياً:', eventName);
            return false;
        }
        return true;
    });
}

async function fetchFromTicketmaster(city, country, startDate, endDate) {
    const countryCodes = { 
        UAE: "AE", Egypt: "EG", "Saudi Arabia": "SA", Qatar: "QA", Kuwait: "KW", 
        Jordan: "JO", Morocco: "MA", Bahrain: "BH", Oman: "OM", Lebanon: "LB",
        Tunisia: "TN", UK: "GB", USA: "US", Germany: "DE", France: "FR", 
        Italy: "IT", Spain: "ES", Turkey: "TR", Greece: "GR", Switzerland: "CH",
        Netherlands: "NL", Portugal: "PT", Austria: "AT", Belgium: "BE", 
        Sweden: "SE", Denmark: "DK", Norway: "NO", Finland: "FI", Poland: "PL",
        "Czech Republic": "CZ", Hungary: "HU", Ireland: "IE", Croatia: "HR",
        Thailand: "TH", Japan: "JP", "South Korea": "KR", China: "CN", India: "IN",
        Malaysia: "MY", Singapore: "SG", Indonesia: "ID", Vietnam: "VN", 
        Philippines: "PH", Australia: "AU", "New Zealand": "NZ", Canada: "CA",
        Brazil: "BR", Argentina: "AR", Mexico: "MX", "South Africa": "ZA",
        Kenya: "KE", Tanzania: "TZ"
    };
    const code = countryCodes[country] || "US";
    
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    const targetUrl = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${TICKETMASTER_KEY}&city=${encodeURIComponent(city)}&countryCode=${code}&startDateTime=${startDate}T00:00:00Z&endDateTime=${endDate}T23:59:59Z&size=200`;
    const url = proxyUrl + targetUrl;
    
    try {
        const response = await fetch(url);
        if (!response.ok) return [];
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
        console.error("Ticketmaster Error:", e);
        return [];
    }
}

async function fetchAllMonthsEvents(city, country, monthsCount) {
    const today = new Date();
    const eventsByMonth = [];
    
    for (let i = 0; i < monthsCount; i++) {
        if (i > 0) await new Promise(resolve => setTimeout(resolve, 500));
        
        const startDate = new Date(today.getFullYear(), today.getMonth() + i, 1);
        const endDate = new Date(today.getFullYear(), today.getMonth() + i + 1, 0);
        const startStr = startDate.toISOString().split('T')[0];
        const endStr = endDate.toISOString().split('T')[0];
        
        const events = await fetchFromTicketmaster(city, country, startStr, endStr);
        const filteredEvents = filterEvents(events);
        eventsByMonth.push({
            month: startDate.getMonth(),
            year: startDate.getFullYear(),
            events: filteredEvents,
            startDate: startDate,
            endDate: endDate
        });
    }
    return eventsByMonth;
}

async function performSearch() {
    if (!selectedCity || !selectedCountry) return;
    const monthsCount = parseInt(document.getElementById('monthsCount').value);
    const container = document.getElementById('calendarContainer');
    if (container) {
        container.innerHTML = '<div class="loading">⏳ جاري البحث عن الأحداث...</div>';
    }
    try {
        monthsData = await fetchAllMonthsEvents(selectedCity, selectedCountry, monthsCount);
        currentMonthIndex = 0;
        if (monthsData.length > 0 && monthsData.some(m => m.events.length > 0)) {
            renderCalendar(monthsData[0], 0);
        } else {
            if (container) {
                container.innerHTML = `<div class="error">📭 لا توجد أحداث في ${selectedCity}, ${selectedCountry}</div>`;
            }
        }
    } catch(error) {
        console.error(error);
        if (container) {
            container.innerHTML = '<div class="error">❌ حدث خطأ في تحميل الأحداث</div>';
        }
    }
}

function renderCalendar(monthData, monthIndex) {
    const container = document.getElementById('calendarContainer');
    if (!container) return;
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
                        <div class="event-badge-img">
                            <img src="${e.imageUrl}" style="width:100%; height:100%; object-fit:cover; border-radius:10px;" onerror="this.style.display='none'; this.parentElement.innerHTML='${getEventEmoji(e.name)}'">
                        </div>
                        <div class="event-badge-info">
                            <div class="event-badge-name">${(e.name || "").substring(0, 25)}${(e.name || "").length > 25 ? '...' : ''}</div>
                            <div class="event-badge-source">Ticketmaster</div>
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

window.changeMonth = function(delta) {
    const newIndex = currentMonthIndex + delta;
    if (newIndex >= 0 && newIndex < monthsData.length) {
        currentMonthIndex = newIndex;
        renderCalendar(monthsData[currentMonthIndex], currentMonthIndex);
    }
};

window.showDayEvents = function(day, month, year) {
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
    if (modalDate) modalDate.textContent = `📅 ${day} ${monthNames[month]} ${year} - ${events.length} فعالية`;
    if (modalEventsList) {
        if (events.length === 0) {
            modalEventsList.innerHTML = '<p style="text-align:center; padding:20px;">لا توجد فعاليات في هذا اليوم</p>';
        } else {
            modalEventsList.innerHTML = events.map(event => `
                <div class="modal-event-item" onclick="window.open('${event.url}', '_blank')">
                    <div class="modal-event-img"><img src="${event.imageUrl}" style="width:100%; height:100%; object-fit:cover; border-radius:16px;" onerror="this.style.display='none'; this.parentElement.innerHTML='${getEventEmoji(event.name)}'"></div>
                    <div class="modal-event-info">
                        <div class="modal-event-name">${event.name}</div>
                        <div class="modal-event-date">📅 ${event.date}</div>
                        <div class="modal-event-source">📍 Ticketmaster</div>
                    </div>
                </div>
            `).join('');
        }
    }
    if (modal) modal.style.display = "flex";
};

window.closeModal = function() {
    const modal = document.getElementById('modal');
    if (modal) modal.style.display = "none";
};

document.addEventListener('DOMContentLoaded', () => {
    loadCountries();
    initEventListeners();
});

window.onclick = (event) => {
    const modal = document.getElementById('modal');
    if (event.target === modal && modal) {
        closeModal();
    }
};