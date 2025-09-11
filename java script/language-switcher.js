// Language Switcher for Zap Tech Website
let currentLanguage = 'en';
let translations = {};

// Deep merge utility: prefers values from 'source', fills missing from 'target'
function deepMerge(target, source) {
    if (typeof target !== 'object' || target === null) return source;
    if (typeof source !== 'object' || source === null) return source ?? target;
    const result = Array.isArray(target) ? target.slice() : { ...target };
    Object.keys(source).forEach(key => {
        if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
            result[key] = deepMerge(result[key] || {}, source[key]);
        } else {
            result[key] = source[key];
        }
    });
    return result;
}

// Load translations from language.json
async function loadTranslations() {
    try {
        console.log('Attempting to load translations...');
        const response = await fetch('/language.json');
        console.log('Response status:', response.status);
        console.log('Response URL:', response.url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        translations = await response.json();
        // Ensure Steam Accounts page keys exist even if missing from language.json
        const steamaccDefaults = {
            en: {
                steamacc: {
                    pageTitle: "Steam Accounts - Zap Tech",
                    mainHeader: "Free Steam Accounts",
                    availableHeader: "Available Steam Accounts",
                    explanation: "Welcome to our Steam Accounts section! We provide free Steam accounts on a daily basis to help gamers access games and features without any cost.",
                    searchPlaceholder: "Search account details...",
                    searchButton: "Search",
                    clearButton: "Clear",
                    pagination: {
                        showing: "Showing page",
                        of: "of",
                        totalAccounts: "total accounts",
                        prev: "Previous",
                        next: "Next"
                    },
                    refreshButton: "Refresh Accounts",
                    refreshInfo: "Click refresh to see newly published accounts",
                    commentsTitle: "Requests & Comments",
                    namePlaceholder: "Your name (optional)",
                    messagePlaceholder: "Ask what account you want...",
                    sendButton: "Send",
                    noComments: "No comments yet. Be the first!",
                    deleteComment: "Delete comment"
                },
                custom: {
                    freeSteam: {
                        title: "Free Steam Account",
                        part: "Video Tutorial",
                        desc: "Visit our website to get free accounts. We post daily, and you can ask for accounts."
                    }
                }
            },
            ku: {
                steamacc: {
                    pageTitle: "ئەکاونتی ستیم - زاپ تێک",
                    mainHeader: "ئەکاونتی ستیم بەخۆڕایی",
                    availableHeader: "ئەکاونتە ستیمە بەردەستەکان",
                    explanation: "بەخێربێیت بۆ بەشی ئەکاونتە ستیم! ئێمە ڕۆژانە ئەکاونتی ستیم بەخۆڕایی دابین دەکەین بۆ یاریکەرانی دەستگەیشتن بە یاری و تایبەتمەندییەکان بەبێ هیچ تێچوویەکی دارایی.",
                    searchPlaceholder: "گەڕان لە وردەکاری ئەکاونتەکان...",
                    searchButton: "گەڕان",
                    clearButton: "سڕینەوە",
                    pagination: {
                        showing: "پەڕە",
                        of: "لە",
                        totalAccounts: "ئەکاونتەکان",
                        prev: "پێشوو",
                        next: "دواتر"
                    },
                    refreshButton: "نوێکردنەوەی ئەکاونتەکان",
                    refreshInfo: "دوگمەی نوێکردنەوە دابگرە بۆ بینینی ئەکاونتی نوێکراو",
                    commentsTitle: "داوا و لێدوانەکان",
                    namePlaceholder: "ناوت (ئارەزوویە)",
                    messagePlaceholder: "بڵێ چی جۆر ئەکاونت دەتەوێت...",
                    sendButton: "ناردن",
                    noComments: "هیچ لێدوانێک نییە. یەکەم بین!",
                    deleteComment: "سڕینەوەی لێدوان"
                },
                custom: {
                    freeSteam: {
                        title: "هەژماری بەخۆرای Steam",
                        part: "فیدیۆی ڕێنمایی",
                        desc: "سەردانی وێبساتەکەمان بکە بۆ وەرگرتنی هەژمارە خۆرایەکان. هەموو ڕۆژێک بڵاو دەکەینەوە و دەتوانیت داوای هەژمار بکەیت."
                    }
                }
            }
        };
        translations = deepMerge(steamaccDefaults, translations);
        console.log('Translations loaded successfully:', translations);
        console.log('Available sections:', translations.ku?.sections);
        console.log('Websites section:', translations.ku?.sections?.websites);
    } catch (error) {
        console.error('Error loading translations:', error);
        // Fallback to hardcoded translations for testing
        translations = {
            en: {
                nav: {
                    home: "Home",
                    website: "Website",
                    videoTutorial: "Video Tutorial",
                    pcAppsGames: "Pc Apps & Games",
                    tools: "Tools",
                    personality: "Personality",
                    quran: "Quran",
                    kurdishImageAI: "Kurdish Image AI",
                    aboutUs: "About Us",
                    donate: "Donate $"
                },
                steamacc: {
                    pageTitle: "Steam Accounts - Zap Tech",
                    mainHeader: "Free Steam Accounts",
                    availableHeader: "Available Steam Accounts",
                    searchPlaceholder: "Search account details...",
                    searchButton: "Search",
                    clearButton: "Clear",
                    pagination: {
                        showing: "Showing page",
                        of: "of",
                        totalAccounts: "total accounts",
                        prev: "Previous",
                        next: "Next"
                    },
                    refreshButton: "Refresh Accounts",
                    refreshInfo: "Click refresh to see newly published accounts",
                    commentsTitle: "Requests & Comments",
                    namePlaceholder: "Your name (optional)",
                    messagePlaceholder: "Ask what account you want...",
                    sendButton: "Send",
                    noComments: "No comments yet. Be the first!",
                    deleteComment: "Delete comment"
                },
                sections: {
                    pcAppsGames: {
                        title: "PC Apps & Games",
                        description: "We're all about sharing useful PC apps and games no paywalls, no hassle. Just tools and fun that anyone can enjoy, totally free."
                    },
                    aboutUs: {
                        title: "About Us",
                        description: "Welcome to Zap Tech, a dedicated platform offering curated PC applications, games, and digital tools. Our goal is to make high-quality software and practical tech solutions accessible to everyone. We specialize in providing reliable resources, step-by-step tutorials, and clear solutions to everyday digital challenges. Whether you're a gamer, a creative professional, or someone looking to get more from your PC, Zap Tech is here to support your journey.",
                        followUs: "Follow Us",
                        copyright: "© 2024 Zap Tech. All rights reserved."
                    }
                },
                custom: {
                    freeSteam: {
                        title: "Free Steam Account",
                        part: "Video Tutorial",
                        desc: "Visit our website to get free accounts. We post daily, and you can ask for accounts."
                    }
                }
            },
            ku: {
                nav: {
                    home: "سەرەکی",
                    website: "وێبسایت",
                    videoTutorial: "ڤیدیۆ تەڵەم",
                    pcAppsGames: "ئەپ و یاری کۆمپیوتەر",
                    personality: "کەسایەتی",
                    quran: "قورئان",
                    aboutUs: "دەربارەی ئێمە",
                    donate: "پارە بدە $"
                },
                steamacc: {
                    pageTitle: "ئەکاونتی ستیم - زاپ تێک",
                    mainHeader: "ئەکاونتی ستیم بەخۆڕایی",
                    availableHeader: "ئەکاونتە ستیمە بەردەستەکان",
                    searchPlaceholder: "گەڕان لە وردەکاری ئەکاونتەکان...",
                    searchButton: "گەڕان",
                    clearButton: "سڕینەوە",
                    pagination: {
                        showing: "پەڕە",
                        of: "لە",
                        totalAccounts: "ئەکاونتەکان",
                        prev: "پێشوو",
                        next: "دواتر"
                    },
                    refreshButton: "نوێکردنەوەی ئەکاونتەکان",
                    refreshInfo: "دوگمەی نوێکردنەوە دابگرە بۆ بینینی ئەکاونتی نوێکراو",
                    commentsTitle: "داوا و لێدوانەکان",
                    namePlaceholder: "ناوت (ئارەزوویە)",
                    messagePlaceholder: "بڵێ چی جۆر ئەکاونت دەتەوێت...",
                    sendButton: "ناردن",
                    noComments: "هیچ لێدوانێک نییە. یەکەم بین!",
                    deleteComment: "سڕینەوەی لێدوان"
                },
                sections: {
                    websites: {
                        title: "وێبسایتەکان",
                        description: "ئێمە وێبسایت و ئامرازە بەسوودەکان  هاوبەش دەکەین کە دیزاین کراون بۆ ئاسانکردنی کاری ڕۆژانە و کات هەڵەگرتن. ئامانجمان ئەوەیە ژیانی ڕۆژانە کاراتر بکەین لە ڕێگەی چارەسەرە زیرەک و بەکارهێنانی ئاسانەوە.",
                        chooseTitle: "وێبسایت هەڵبژێرە",
                        chooseDescription: "وێبسایتەکەمان دیزاین کراوە بۆ بەکارهێنانی ئاسان و ڕێنیشاندان. ئێمە جۆرەها وێبسایتمان هەیە بۆ هەڵبژاردن، و ئێمە بەردەوام نوێیەکان زیاد دەکەین. ئێمە تیمێکی پەرەپێدەرین کە ئارەزومەندانەن لە دروستکردنی وێبسایت و ئامرازە بەکاردێنەکان.",
                        moreButton: " وێبسایتی زیاتر"
                    },
                    pcAppsGames: {
                        title: "ئەپ و یاری کۆمپیوتەر",
                        description: "ئێمە هەموو دەربارەی هاوبەشکردنی ئەپ و یاری کۆمپیوتەر بەسوودین هیچ پردی پارەیەک نییە، هیچ کێشەیەک نییە. تەنها ئامراز و خۆشی کە هەموو کەسێک دەتوانێت بەکاری بهێنێت، بەتەواوی بە خۆڕایی."
                    },
                    aboutUs: {
                        title: "دەربارەی ئێمە",
                        description: "بەخێربێیت بۆ زاپ تێک، پلاتفۆرمێکی تایبەت کە ئەپەکانی PC، یاریەکان، و ئامرازە دیجیتاڵیەکان پێشکەش دەکات. ئامانجمان ئەوەیە نەرمەکاڵای بەکیفیت و چارەسەرە تەکنەلۆجیایە پراکتیکیەکان بۆ هەموو کەسێک بەردەست بکەینەوە. ئێمە تایبەتین بە دابینکردنی سەرچاوە بەوێنەکان، فێرکاریە بەپێی هەنگاو، و چارەسەرە ڕوونەکان بۆ بەرەنگاربوونەوەی ڕۆژانەی دیجیتاڵ. گەر یاریزانێک بیت، پیشەیەکی داهێنەر، یان کەسێک کە بەدوای زیاتر لە PC کەت دەگەڕێت، زاپ تێک لێرەیە بۆ پشتگیریکردنی گەشتەکەت.",
                        followUs: "شوێنمان بکەوە",
                        copyright: "© ٢٠٢٥ زاپ تێک. هەموو مافەکان پارێزراون"
                    }
                },
                custom: {
                    freeSteam: {
                        title: "هەژماری بەخۆرای Steam",
                        part: "فیدیۆی ڕێنمایی",
                        desc: "سەردانی وێبساتەکەمان بکە بۆ وەرگرتنی هەژمارە خۆرایەکان. هەموو ڕۆژێک بڵاو دەکەینەوە و دەتوانیت داوای هەژمار بکەیت."
                    }
                }
            }
        };
        console.log('Using fallback translations');
    }
}

// Function to get translation by key path
function getTranslation(keyPath) {
    const keys = keyPath.split('.');
    let value = translations[currentLanguage];
    
    console.log('Getting translation for:', keyPath);
    console.log('Current language:', currentLanguage);
    console.log('Available translations:', translations);
    
    for (const key of keys) {
        if (value && value[key] !== undefined) {
            value = value[key];
        } else {
            console.warn(`Translation key not found: ${keyPath}`);
            return keyPath; // Return the key path if translation not found
        }
    }
    
    console.log('Translation result:', value);
    return value;
}

// Function to update all text content on the page
function updatePageLanguage() {
    console.log('updatePageLanguage called, current language:', currentLanguage);
    
    // Update navigation
    updateNavigation();
    
    // Update home page content
    updateHomeContent();
    
    // Update sections
    updateSections();
    
    // Update cards
    updateCards();
    
    // Update videos
    updateVideos();
    
    // Update apps
    updateApps();
    
    // Update donate modal
    updateDonateModal();
    
    // Update personality page
    updatePersonalityContent();
    
    // Update Quran page
    updateQuranContent();

    // Update Steam Accounts page (UI only, exclude account details)
    updateSteamAccPage();
    
    // Update page title
    updatePageTitle();
    
    // Update HTML lang attribute
    document.documentElement.lang = currentLanguage;
    
    // Update body lang attribute for font switching
    document.body.lang = currentLanguage;
}
// Update Steam Accounts page UI (exclude account content text)
function updateSteamAccPage() {
    const isSteamAccPage = /steamacc(\.html)?$/.test(window.location.pathname) || document.body.classList.contains('steamacc-page');
    if (!isSteamAccPage) return;

    // Title
    const titleEl = document.querySelector('title');
    if (titleEl) {
        titleEl.textContent = getTranslation('steamacc.pageTitle');
    }

    // Main header
    const mainHeader = document.querySelector('.main-header');
    if (mainHeader) {
        mainHeader.textContent = getTranslation('steamacc.mainHeader');
    }

    // Section header
    const availableHeader = document.querySelector('.public-header');
    if (availableHeader) {
        availableHeader.textContent = getTranslation('steamacc.availableHeader');
    }

    // Explanation paragraph under banner
    const explanationText = document.querySelector('.explanation-text');
    if (explanationText) {
        explanationText.textContent = getTranslation('steamacc.explanation');
    }

    // Search placeholders and buttons
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.placeholder = getTranslation('steamacc.searchPlaceholder');
    }
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.textContent = getTranslation('steamacc.searchButton');
    }
    const clearBtn = document.querySelector('.clear-search-btn');
    if (clearBtn) {
        clearBtn.textContent = getTranslation('steamacc.clearButton');
    }

    // Pagination
    const paginationInfo = document.getElementById('pagination-info');
    if (paginationInfo) {
        // Rebuild using current page info pattern: "Showing page X of Y (N total accounts)"
        const current = document.getElementById('current-page');
        const text = paginationInfo.textContent || '';
        let totalPages = 1;
        let totalAccounts = '';
        try {
            const match = text.match(/page\s+(\d+)\s+of\s+(\d+).*?(\d+)?/i);
            if (match) {
                totalPages = parseInt(match[2], 10) || 1;
                totalAccounts = match[3] || '';
            }
        } catch (e) {}
        const showing = getTranslation('steamacc.pagination.showing');
        const ofText = getTranslation('steamacc.pagination.of');
        const totalText = getTranslation('steamacc.pagination.totalAccounts');
        const currPageNum = current ? current.textContent : '1';
        paginationInfo.textContent = `${showing} ${currPageNum} ${ofText} ${totalPages}${totalAccounts ? ` (${totalAccounts} ${totalText})` : ''}`;
    }
    const prevBtn = document.getElementById('prev-btn');
    if (prevBtn) prevBtn.textContent = getTranslation('steamacc.pagination.prev');
    const nextBtn = document.getElementById('next-btn');
    if (nextBtn) nextBtn.textContent = getTranslation('steamacc.pagination.next');

    // Refresh section
    const refreshBtn = document.querySelector('.refresh-btn');
    if (refreshBtn) refreshBtn.textContent = getTranslation('steamacc.refreshButton');
    const refreshInfo = document.querySelector('.refresh-info');
    if (refreshInfo) refreshInfo.textContent = getTranslation('steamacc.refreshInfo');

    // Comments box created dynamically in steamacc.html
    const commentsContainer = document.getElementById('comments-list');
    const commentsHeader = commentsContainer ? commentsContainer.closest('div').querySelector('h3') : null;
    if (commentsHeader) commentsHeader.textContent = getTranslation('steamacc.commentsTitle');
    const nameInput = document.getElementById('comment-name');
    if (nameInput) nameInput.placeholder = getTranslation('steamacc.namePlaceholder');
    const msgInput = document.getElementById('comment-message');
    if (msgInput) msgInput.placeholder = getTranslation('steamacc.messagePlaceholder');
    const sendBtn = document.getElementById('comment-send');
    if (sendBtn) sendBtn.textContent = getTranslation('steamacc.sendButton');

    // If no comments placeholder is present, skip; render happens in page script
}

// Update navigation menu
function updateNavigation() {
    const navItemSelectors = {
        home: [
            'a[href="/"]',
            'a[href="index.html"]'
        ],
        website: [
            'a[href="/website"]',
            'a[href="website.html"]'
        ],
        videoTutorial: [
            'a[href="/video-tutorial"]',
            'a[href="video-tutorial.html"]'
        ],
        pcAppsGames: [
            'a[href="/pc-apps-and-games"]',
            'a[href="pc apps and games.html"]'
        ],
        aboutUs: [
            'a[href="/#bg8"]',
            'a[href="#bg8"]',
            'a[href="index.html#bg8"]'
        ],
        donate: [
            '#donate-btn'
        ]
    };

    Object.entries(navItemSelectors).forEach(([key, selectors]) => {
        selectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                element.textContent = getTranslation(`nav.${key}`);
            });
        });
    });
    
    // Update Tools dropdown specifically
    const toolsDropdown = document.querySelector('.dropdown-toggle[data-translate="navbar.tools"]');
    if (toolsDropdown) {
        toolsDropdown.textContent = getTranslation('nav.tools');
    }
    
    // Update Personality link in dropdown
    const personalityLink = document.querySelector('.dropdown-menu a[data-translate="navbar.personality"], .dropdown-menu a[href="/personality"]');
    if (personalityLink) {
        personalityLink.textContent = getTranslation('nav.personality');
    }
    
    // Update Quran link in dropdown
    const quranLink = document.querySelector('.dropdown-menu a[data-translate="navbar.quran"], .dropdown-menu a[href="/quran"]');
    if (quranLink) {
        quranLink.textContent = getTranslation('nav.quran');
    }
    
    // Update Kurdish Image AI link in dropdown
    const kurdishImageAILink = document.querySelector('.dropdown-menu a[data-translate="navbar.kurdishImageAI"]');
    if (kurdishImageAILink) {
        kurdishImageAILink.textContent = getTranslation('nav.kurdishImageAI');
    }

    // Update Steam Accounts link in Tools dropdown (exclude content area)
    const steamAccLink = document.querySelector('.dropdown-menu a[href="/steamacc"], .dropdown-menu a[href="steamacc.html"], .dropdown-menu a[href="/steamacc.html"]');
    if (steamAccLink) {
        steamAccLink.textContent = currentLanguage === 'ku' ? 'ئەکاونتی ستیم' : 'Steam Accounts';
    }
}

// Update home page content
function updateHomeContent() {
    // Welcome section
    const welcomeTitle = document.querySelector('.header');
    if (welcomeTitle) {
        welcomeTitle.textContent = getTranslation('home.welcomeTitle');
    }
    
    const welcomeDesc = document.querySelector('.info-container p');
    if (welcomeDesc) {
        welcomeDesc.innerHTML = getTranslation('home.welcomeDescription');
    }
    
    const contactText = document.querySelector('.contact-text');
    if (contactText) {
        contactText.textContent = getTranslation('home.contactText');
    }
    
    // Contact form
    const nameInput = document.querySelector('input[name="name"]');
    if (nameInput) {
        nameInput.placeholder = getTranslation('home.contactForm.namePlaceholder');
    }
    
    const messageTextarea = document.querySelector('textarea[name="message"]');
    if (messageTextarea) {
        messageTextarea.placeholder = getTranslation('home.contactForm.messagePlaceholder');
    }
    
    const sendButton = document.querySelector('.contact-button');
    if (sendButton) {
        sendButton.textContent = getTranslation('home.contactForm.sendButton');
    }
    
    // Send message button text
    const sendMessageSpan = document.querySelector('.state--default p span');
    if (sendMessageSpan) {
        sendMessageSpan.textContent = getTranslation('home.sendMessage');
    }
    
    const sentSpan = document.querySelector('.state--sent p span');
    if (sentSpan) {
        sentSpan.textContent = getTranslation('home.sent');
    }
    
    // Debug: Log contact form elements
    console.log('Contact form elements found:', {
        nameInput: nameInput,
        messageTextarea: messageTextarea,
        sendButton: sendButton,
        sendMessageSpan: sendMessageSpan,
        sentSpan: sentSpan
    });
    
    // Debug: Log translations
    console.log('Contact form translations:', {
        namePlaceholder: getTranslation('home.contactForm.namePlaceholder'),
        messagePlaceholder: getTranslation('home.contactForm.messagePlaceholder'),
        sendButton: getTranslation('home.contactForm.sendButton'),
        sendMessage: getTranslation('home.sendMessage'),
        sent: getTranslation('home.sent')
    });
}

// Update sections
function updateSections() {
    // Websites section
    const websitesTitle = document.querySelector('.bg2 .header');
    if (websitesTitle) {
        websitesTitle.textContent = getTranslation('sections.websites.title');
    }
    
    const websitesDesc = document.querySelector('.header-text');
    if (websitesDesc) {
        websitesDesc.innerHTML = getTranslation('sections.websites.description');
    }
    
    const chooseWebsiteTitle = document.querySelector('.b3header');
    if (chooseWebsiteTitle) {
        chooseWebsiteTitle.textContent = getTranslation('sections.websites.chooseTitle');
    }
    
    // Website description text (from website.html)
const websiteDescription = document.querySelector('.b3header-text');
if (websiteDescription) {
    const translation = getTranslation('sections.websites.chooseDescription');
    console.log('Website description translation:', translation);
    console.log('Current language:', currentLanguage);
    websiteDescription.textContent = translation;
}
    
    const moreWebsitesBtn = document.querySelector('.modern-more-websites-btn');
    if (moreWebsitesBtn) {
        moreWebsitesBtn.textContent = getTranslation('sections.websites.moreButton');
    }
    
    // Video tutorial section
    const videoTitle = document.querySelector('.b4header');
    if (videoTitle) {
        videoTitle.textContent = getTranslation('sections.videoTutorial.title');
    }
    
    const videoDesc = document.querySelector('.b4header-text');
    if (videoDesc) {
        videoDesc.innerHTML = getTranslation('sections.videoTutorial.description');
    }
    
    const pickTutorialTitle = document.querySelector('.b5header');
    if (pickTutorialTitle) {
        pickTutorialTitle.textContent = getTranslation('sections.videoTutorial.pickTitle');
    }
    
    // Video tutorial page specific elements (video-tutorial.html)
    const videoTutorialPageTitle = document.querySelector('.bg5header');
    if (videoTutorialPageTitle) {
        videoTutorialPageTitle.textContent = getTranslation('sections.videoTutorial.pickTitle');
    }
    
    const videoTutorialPageDesc = document.querySelector('.bgg5text');
    if (videoTutorialPageDesc) {
        videoTutorialPageDesc.innerHTML = getTranslation('sections.videoTutorial.pickDescription');
    }
    
    const moreVideosBtn = document.querySelector('.modern-more-videos-btn');
    if (moreVideosBtn) {
        moreVideosBtn.textContent = getTranslation('sections.videoTutorial.moreButton');
    }
    
    // PC Apps & Games section
    const pcAppsTitle = document.querySelector('.b6header');
    if (pcAppsTitle) {
        pcAppsTitle.textContent = getTranslation('sections.pcAppsGames.title');
    }
    
    const pcAppsDesc = document.querySelector('.b6header-text');
    if (pcAppsDesc) {
        pcAppsDesc.innerHTML = getTranslation('sections.pcAppsGames.description');
    }
    
    // BG7 section (PC Apps & Games page) - handle both class variations
    const bg7Title = document.querySelector('.bgb7header') || document.querySelector('.bgg7header');
    console.log('BG7 Title element found:', bg7Title);
    if (bg7Title) {
        const translation = getTranslation('sections.pcAppsGames.title');
        console.log('BG7 Title translation:', translation);
        bg7Title.textContent = translation;
    }
    
    const bg7Desc = document.querySelector('.bgb7header-text') || document.querySelector('.bgg7header-text');
    console.log('BG7 Desc element found:', bg7Desc);
    if (bg7Desc) {
        const translation = getTranslation('sections.pcAppsGames.description');
        console.log('BG7 Desc translation:', translation);
        bg7Desc.innerHTML = translation;
    }
    
    const moreAppsBtn = document.querySelector('.modern-more-apps-btn');
    if (moreAppsBtn) {
        moreAppsBtn.textContent = getTranslation('sections.pcAppsGames.moreButton');
    }
    
    // About Us section
    const aboutTitle = document.querySelector('.bg8header');
    console.log('About Us Title element found:', aboutTitle);
    if (aboutTitle) {
        const translation = getTranslation('sections.aboutUs.title');
        console.log('About Us Title translation:', translation);
        aboutTitle.textContent = translation;
    }
    
    const aboutDesc = document.querySelector('.bg8-text');
    console.log('About Us Description element found:', aboutDesc);
    if (aboutDesc) {
        const translation = getTranslation('sections.aboutUs.description');
        console.log('About Us Description translation:', translation);
        aboutDesc.innerHTML = translation;
    }
    
    const followUsTitle = document.querySelector('.social-title');
    console.log('Follow Us Title element found:', followUsTitle);
    if (followUsTitle) {
        const translation = getTranslation('sections.aboutUs.followUs');
        console.log('Follow Us Title translation:', translation);
        followUsTitle.textContent = translation;
    }
    
    const copyright = document.querySelector('.bg8-copyright');
    console.log('Copyright element found:', copyright);
    if (copyright) {
        const translation = getTranslation('sections.aboutUs.copyright');
        console.log('Copyright translation:', translation);
        copyright.textContent = translation;
    }
}

// Update cards
function updateCards() {
    console.log('updateCards called');
    
    // First, update cards with data-translate attributes
    updateCardsWithDataTranslate();
    
    // Then update cards by text content (for backward compatibility)
    const cardTitles = {
        'onlineFix': 'Online Fix',
        'tempMail': 'Temp Mail',
        'photoGradient': 'Photo Gradient',
        'recraftAI': 'Recraft AI',
        'unscreen': 'Unscreen',
        'whatsThisAnime': 'WHATS THIS ANIME ',
        'napkinAI': 'Napkin AI',
        'pixie': 'Pixie',
        'suno': 'Suno'
    };
    
    Object.entries(cardTitles).forEach(([key, englishTitle]) => {
        const cards = document.querySelectorAll('.card-title-hover');
        console.log(`Looking for cards with title: "${englishTitle}", found ${cards.length} cards`);
        cards.forEach(card => {
            console.log(`Checking card: "${card.textContent.trim()}" against "${englishTitle}"`);
            if (card.textContent.trim() === englishTitle) {
                console.log(`Found match for ${key}, updating to: ${getTranslation(`cards.${key}.title`)}`);
                card.textContent = getTranslation(`cards.${key}.title`);
                
                // Update description
                const descElement = card.closest('.card-details').querySelector('p');
                if (descElement) {
                    descElement.textContent = getTranslation(`cards.${key}.description`);
                }
                
                // Update category
                const categoryElement = card.closest('.card-details').querySelector('.card-footer-overlay');
                if (categoryElement) {
                    categoryElement.textContent = getTranslation(`cards.${key}.category`);
                }
            }
        });
    });
}

// Update cards with data-translate attributes
function updateCardsWithDataTranslate() {
    console.log('updateCardsWithDataTranslate called');
    const cardElements = document.querySelectorAll('[data-translate^="cards."]');
    console.log(`Found ${cardElements.length} card elements with data-translate attributes`);
    
    cardElements.forEach(element => {
        const translationKey = element.getAttribute('data-translate');
        console.log(`Updating element with translation key: ${translationKey}`);
        const translation = getTranslation(translationKey);
        console.log(`Translation for ${translationKey}: ${translation}`);
        element.textContent = translation;
    });
}

// Update videos
function updateVideos() {
    const videoTitles = {
        'fixLagGamesRender': 'FIX LAG IN GAMES AND RENDER',
        'newVideoTutorial': 'New Video Tutorial',
        'newEpicGameTutorial': 'New Epic Game Tutorial',
        'iosAppsGames': 'How to Install Paid Apps and Games on iOS Devices',
        'steamTools': 'How to Delete Crack Games on Main Account by SteamTools by Mistake',
        'blackOpsTutorial': 'How to Download Black Ops 1 & Black Ops 2',
        'pcGamesFree': 'How to Download PC Games for Free and Very Safe'
    };
    
    Object.entries(videoTitles).forEach(([key, englishTitle]) => {
        const videos = document.querySelectorAll('.video-hover-title');
        videos.forEach(video => {
            if (video.textContent.trim() === englishTitle) {
                video.textContent = getTranslation(`videos.${key}.title`);
                
                // Update description
                const descElement = video.closest('.video-hover-card-details').querySelector('.video-hover-desc');
                if (descElement) {
                    descElement.textContent = getTranslation(`videos.${key}.description`);
                }
            }
        });
    });

    // Update any custom video elements using data-translate starting with 'custom.'
    const customElements = document.querySelectorAll('[data-translate^="custom."]');
    customElements.forEach(el => {
        const key = el.getAttribute('data-translate');
        const val = getTranslation(key);
        if (val) el.textContent = val;
    });
}

// Update apps
function updateApps() {
    const appTitles = {
        'efficientRamCleaner': 'Efficient RAM Cleaner',
        'minecraftServers': 'Minecraft Cracked Servers',
        'steamFix': 'Steam fix',
        'plutonium': 'Plutonium',
        'blackOps1': 'Black Ops 1',
        'blackOps2': 'Black Ops 2',
        'visualCode': 'Visual Code',
        'codeBlock': 'Code Block',
        'adobePhotoshop': 'Adobe Photoshop',
        'adobePremiere': 'Adobe Premiere Pro'
    };
    
    Object.entries(appTitles).forEach(([key, englishTitle]) => {
        const apps = document.querySelectorAll('.pc-app-title');
        apps.forEach(app => {
            if (app.textContent.trim() === englishTitle) {
                app.textContent = getTranslation(`apps.${key}.title`);
                
                // Update description
                const descElement = app.closest('.pc-app-overlay').querySelector('.pc-app-desc');
                if (descElement) {
                    descElement.textContent = getTranslation(`apps.${key}.description`);
                }
            }
        });
    });
}

// Update donate modal
function updateDonateModal() {
    const modalTitle = document.querySelector('.donate-header h2');
    if (modalTitle) {
        modalTitle.textContent = getTranslation('donate.title');
    }
    
    const modalDesc = document.querySelector('.donate-body p');
    if (modalDesc) {
        modalDesc.textContent = getTranslation('donate.description');
    }
    
    const fastPayBtn = document.querySelector('.donate-option:nth-child(1) a');
    if (fastPayBtn) {
        fastPayBtn.textContent = getTranslation('donate.fastPay');
    }
    
    const fibBtn = document.querySelector('.donate-option:nth-child(2) a');
    if (fibBtn) {
        fibBtn.textContent = getTranslation('donate.fib');
    }
    
    const qiCardBtn = document.querySelector('.donate-option:nth-child(3) a');
    if (qiCardBtn) {
        qiCardBtn.textContent = getTranslation('donate.qiCard');
    }
}

// Update Quran page content
function updateQuranContent() {
    console.log('Updating Quran content...');
    console.log('Current language:', currentLanguage);
    
    // Update page title
    const pageTitle = document.querySelector('title[data-translate="quran.pageTitle"]');
    if (pageTitle) {
        pageTitle.textContent = getTranslation('quran.pageTitle');
    }
    
    // Update header content
    const headerTitle = document.querySelector('h1[data-translate="quran.headerTitle"]');
    if (headerTitle) {
        headerTitle.textContent = getTranslation('quran.headerTitle');
    }
    
    const headerDescription = document.querySelector('p[data-translate="quran.headerDescription"]');
    if (headerDescription) {
        headerDescription.textContent = getTranslation('quran.headerDescription');
    }
    
    // Update gallery header
    const galleryTitle = document.querySelector('h2[data-translate="quran.galleryTitle"]');
    if (galleryTitle) {
        galleryTitle.textContent = getTranslation('quran.galleryTitle');
    }
    
    const galleryDescription = document.querySelector('p[data-translate="quran.galleryDescription"]');
    if (galleryDescription) {
        galleryDescription.textContent = getTranslation('quran.galleryDescription');
    }
    
    // Update search placeholder
    const searchInput = document.querySelector('input[data-translate-placeholder="quran.searchPlaceholder"]');
    if (searchInput) {
        searchInput.placeholder = getTranslation('quran.searchPlaceholder');
    }
    
    // Update pagination buttons
    const previousButton = document.querySelector('span[data-translate="quran.previousButton"]');
    if (previousButton) {
        previousButton.textContent = getTranslation('quran.previousButton');
    }
    
    const nextButton = document.querySelector('span[data-translate="quran.nextButton"]');
    if (nextButton) {
        nextButton.textContent = getTranslation('quran.nextButton');
    }
    
    // Update page info
    const pageInfo = document.querySelector('span[data-translate="quran.pageInfo"]');
    if (pageInfo) {
        pageInfo.textContent = getTranslation('quran.pageInfo');
    }
    
    // Update button titles
    const randomBtn = document.querySelector('button[data-translate-title="quran.randomPlayTitle"]');
    if (randomBtn) {
        randomBtn.title = getTranslation('quran.randomPlayTitle');
    }
    
    const stopBtn = document.querySelector('button[data-translate-title="quran.stopAllTitle"]');
    if (stopBtn) {
        stopBtn.title = getTranslation('quran.stopAllTitle');
    }
    
    const volumeSlider = document.querySelector('input[data-translate-title="quran.volumeControlTitle"]');
    if (volumeSlider) {
        volumeSlider.title = getTranslation('quran.volumeControlTitle');
    }
    
    // Update icon titles
    const searchIcon = document.querySelector('i[data-translate-title="quran.searchIconTitle"]');
    if (searchIcon) {
        searchIcon.title = getTranslation('quran.searchIconTitle');
    }
    
    const clearSearchBtn = document.querySelector('button[data-translate-title="quran.clearSearchTitle"]');
    if (clearSearchBtn) {
        clearSearchBtn.title = getTranslation('quran.clearSearchTitle');
    }
    
    const volumeDownIcon = document.querySelector('i[data-translate-title="quran.volumeDownTitle"]');
    if (volumeDownIcon) {
        volumeDownIcon.title = getTranslation('quran.volumeDownTitle');
    }
    
    const volumeUpIcon = document.querySelector('i[data-translate-title="quran.volumeUpTitle"]');
    if (volumeUpIcon) {
        volumeUpIcon.title = getTranslation('quran.volumeUpTitle');
    }
    
    // Update all play icons in video gallery
    const playIcons = document.querySelectorAll('i[data-translate-title="quran.playIconTitle"]');
    playIcons.forEach(icon => {
        icon.title = getTranslation('quran.playIconTitle');
    });
    
    // Update pagination arrow icons
    const prevArrowIcon = document.querySelector('i[data-translate-title="quran.previousArrowTitle"]');
    if (prevArrowIcon) {
        prevArrowIcon.title = getTranslation('quran.previousArrowTitle');
    }
    
    const nextArrowIcon = document.querySelector('i[data-translate-title="quran.nextArrowTitle"]');
    if (nextArrowIcon) {
        nextArrowIcon.title = getTranslation('quran.nextArrowTitle');
    }
    
    // Update control button icons
    const randomIcon = document.querySelector('i[data-translate-title="quran.randomIconTitle"]');
    if (randomIcon) {
        randomIcon.title = getTranslation('quran.randomIconTitle');
    }
    
    const stopIcon = document.querySelector('i[data-translate-title="quran.stopIconTitle"]');
    if (stopIcon) {
        stopIcon.title = getTranslation('quran.stopIconTitle');
    }
    
    // Update pagination button titles
    const prevBtn = document.querySelector('button[data-translate-title="quran.previousArrowTitle"]');
    if (prevBtn) {
        prevBtn.title = getTranslation('quran.previousArrowTitle');
    }
    
    const nextBtn = document.querySelector('button[data-translate-title="quran.nextArrowTitle"]');
    if (nextBtn) {
        nextBtn.title = getTranslation('quran.nextArrowTitle');
    }
    
    // Update additional section content
    const additionalSectionTitle = document.querySelector('h2[data-translate="quran.additionalSectionTitle"]');
    if (additionalSectionTitle) {
        additionalSectionTitle.textContent = getTranslation('quran.additionalSectionTitle');
    }
    
    const additionalSectionDescription = document.querySelector('p[data-translate="quran.additionalSectionDescription"]');
    if (additionalSectionDescription) {
        additionalSectionDescription.textContent = getTranslation('quran.additionalSectionDescription');
    }
    
    const downloadTitle = document.querySelector('h3[data-translate="quran.downloadTitle"]');
    if (downloadTitle) {
        downloadTitle.textContent = getTranslation('quran.downloadTitle');
    }
    
    const downloadDescription = document.querySelector('p[data-translate="quran.downloadDescription"]');
    if (downloadDescription) {
        downloadDescription.textContent = getTranslation('quran.downloadDescription');
    }
    
    // Update feature list items
    const feature1 = document.querySelector('span[data-translate="quran.feature1"]');
    if (feature1) {
        feature1.textContent = getTranslation('quran.feature1');
    }
    
    const feature2 = document.querySelector('span[data-translate="quran.feature2"]');
    if (feature2) {
        feature2.textContent = getTranslation('quran.feature2');
    }
    
    const feature3 = document.querySelector('span[data-translate="quran.feature3"]');
    if (feature3) {
        feature3.textContent = getTranslation('quran.feature3');
    }
    
    const feature4 = document.querySelector('span[data-translate="quran.feature4"]');
    if (feature4) {
        feature4.textContent = getTranslation('quran.feature4');
    }
    
    // Update download button and note
    const downloadButtonText = document.querySelector('span[data-translate="quran.downloadButtonText"]');
    if (downloadButtonText) {
        downloadButtonText.textContent = getTranslation('quran.downloadButtonText');
    }
    
    const downloadNote = document.querySelector('p[data-translate="quran.downloadNote"]');
    if (downloadNote) {
        downloadNote.textContent = getTranslation('quran.downloadNote');
    }
    
    // Update font family based on language
    const additionalSection = document.querySelector('.additional-quran-section');
    if (additionalSection) {
        if (currentLanguage === 'ku') {
            additionalSection.style.fontFamily = "'K24', Arial, sans-serif";
        } else {
            additionalSection.style.fontFamily = "'Arial', sans-serif";
        }
    }
    
    // Ensure Font Awesome icons are properly rendered after language switch
    ensureQuranIconsRendered();
    
    // Call the page's icon initialization if it exists
    if (typeof initializeIcons === 'function') {
        setTimeout(() => {
            initializeIcons();
        }, 100);
    }
}

// Function to ensure Font Awesome icons are properly rendered in Quran page
function ensureQuranIconsRendered() {
    // Force re-render of Font Awesome icons
    const icons = document.querySelectorAll('.fas, .fa, .fab, .far');
    icons.forEach(icon => {
        // Remove and re-add the class to force re-render
        const iconClass = icon.className;
        icon.className = '';
        setTimeout(() => {
            icon.className = iconClass;
        }, 10);
    });
    
    // Also ensure the icon elements have the correct Font Awesome classes
    const iconElements = {
        'searchIcon': 'fas fa-search',
        'clearSearchIcon': 'fas fa-times',
        'randomIcon': 'fas fa-random',
        'stopIcon': 'fas fa-stop',
        'volumeDownIcon': 'fas fa-volume-down',
        'volumeUpIcon': 'fas fa-volume-up',
        'prevArrowIcon': 'fas fa-chevron-left',
        'nextArrowIcon': 'fas fa-chevron-right',
        'playIcon': 'fas fa-play'
    };
    
    Object.entries(iconElements).forEach(([key, iconClass]) => {
        const element = document.querySelector(`[data-translate-title*="${key}"]`) || 
                       document.querySelector(`.${key}`) ||
                       document.querySelector(`#${key}`);
        
        if (element && !element.className.includes('fas')) {
            element.className = iconClass + ' ' + element.className;
        }
    });
}

// Update personality page content
function updatePersonalityContent() {
    console.log('Updating personality content...');
    console.log('Current language:', currentLanguage);
    
    // Update personality page language button
    const personalityLangBtn = document.querySelector('.personality-language-btn');
    if (personalityLangBtn) {
        personalityLangBtn.textContent = currentLanguage === 'en' ? 'کوردی' : 'English';
        personalityLangBtn.setAttribute('data-lang', currentLanguage);
        console.log('Personality language button updated:', personalityLangBtn.textContent);
    } else {
        console.log('Personality language button not found');
    }
    
    // Reload personality data if the function exists
    if (typeof loadPersonalityData === 'function') {
        loadPersonalityData();
        console.log('Personality data reloaded');
    }
    
    // Welcome popup
    const welcomeTitle = document.querySelector('.welcome-header h2');
    if (welcomeTitle) {
        welcomeTitle.textContent = getTranslation('personality.welcomeTitle');
    }
    
    const welcomeDesc = document.querySelector('.welcome-body p');
    if (welcomeDesc) {
        welcomeDesc.textContent = getTranslation('personality.welcomeDescription');
    }
    
    const features = document.querySelectorAll('.feature span:last-child');
    if (features.length >= 4) {
        features[0].textContent = getTranslation('personality.features.questions');
        features[1].textContent = getTranslation('personality.features.quick');
        features[2].textContent = getTranslation('personality.features.analysis');
        features[3].textContent = getTranslation('personality.features.cards');
    }
    
    const startBtn = document.querySelector('#start-quiz-btn');
    if (startBtn) {
        startBtn.textContent = getTranslation('personality.startButton');
    }
    
    // Main content
    const mainTitle = document.querySelector('.personality-title');
    if (mainTitle) {
        mainTitle.textContent = getTranslation('personality.mainTitle');
    }
    
    const progressText = document.querySelector('.progress-text');
    if (progressText) {
        const currentQuestion = document.getElementById('current-question');
        const totalQuestions = document.getElementById('total-questions');
        if (currentQuestion && totalQuestions) {
            progressText.innerHTML = `${currentQuestion.textContent} / ${totalQuestions.textContent} ${getTranslation('personality.progressText')}`;
        }
    }
    
    const resultsTitle = document.querySelector('#result h2');
    if (resultsTitle) {
        resultsTitle.textContent = getTranslation('personality.resultsTitle');
    }
    
    const personalityType = document.getElementById('personality-type');
    if (personalityType) {
        personalityType.textContent = getTranslation('personality.personalityType');
    }
    
    const description = document.getElementById('personality-description');
    if (description) {
        description.textContent = getTranslation('personality.description');
    }
    
    // Category breakdown
    const categoryBreakdownTitle = document.querySelector('.category-breakdown-title');
    if (categoryBreakdownTitle) {
        categoryBreakdownTitle.textContent = getTranslation('personality.categoryBreakdown');
    }
    
    // Category names
    const categoryElements = document.querySelectorAll('[data-translate]');
    categoryElements.forEach(element => {
        const translationKey = element.getAttribute('data-translate');
        if (translationKey && translationKey.startsWith('personality.')) {
            element.textContent = getTranslation(translationKey);
        }
    });
    
    // Results popup
    const congratulationsTitle = document.querySelector('.congratulations-title');
    if (congratulationsTitle) {
        congratulationsTitle.textContent = getTranslation('personality.congratulations');
    }
    
    const popupPersonalityType = document.getElementById('popup-personality-type');
    if (popupPersonalityType) {
        popupPersonalityType.textContent = getTranslation('personality.personalityType');
    }
    
    const popupDescription = document.getElementById('popup-personality-description');
    if (popupDescription) {
        popupDescription.textContent = getTranslation('personality.description');
    }
}

// Update page title
function updatePageTitle() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    let title = '';
    
    switch (currentPage) {
        case 'index.html':
        case '':
            title = 'Zap Tech - Home';
            break;
        case 'website.html':
            title = 'More Websites - Zap Tech';
            break;
        case 'video-tutorial.html':
            title = 'Video Tutorial - Zap Tech';
            break;
        case 'pc apps and games.html':
            title = 'PC Apps & Games - Zap Tech';
            break;
        case 'personality.html':
            title = 'Personality Test - Zap Tech';
            break;
        case 'quran.html':
            title = getTranslation('quran.pageTitle');
            break;
        default:
            title = 'Zap Tech';
    }
    
    document.title = title;
}

// Toggle language function
function toggleLanguage() {
    console.log('toggleLanguage called, current language:', currentLanguage);
    currentLanguage = currentLanguage === 'en' ? 'ku' : 'en';
    console.log('Language switched to:', currentLanguage);
    updatePageLanguage();
    
    // Update language button text and data attribute
    const langBtn = document.querySelector('.language-switcher-btn');
    if (langBtn) {
        langBtn.textContent = currentLanguage === 'en' ? 'کوردی' : 'English';
        langBtn.setAttribute('data-lang', currentLanguage);
    }
    
    // Update personality page language button if it exists
    const personalityLangBtn = document.querySelector('.personality-language-btn');
    if (personalityLangBtn) {
        personalityLangBtn.textContent = currentLanguage === 'en' ? 'کوردی' : 'English';
        personalityLangBtn.setAttribute('data-lang', currentLanguage);
    }
    
    // Save language preference to localStorage
    localStorage.setItem('zaptech-language', currentLanguage);
}

// Create language switcher button
function createLanguageSwitcher() {
    console.log('Creating language switcher button...');
    // Check if button already exists
    if (document.querySelector('.language-switcher-btn')) {
        console.log('Language switcher button already exists');
        return;
    }
    
    // Language switcher button is now handled in HTML, no need to create dynamically
    console.log('Language switcher button already exists in HTML');
}

// Preload K24 font for Kurdish
function preloadK24Font() {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.type = 'font/ttf';
    link.href = '/fonts/K24.ttf';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
}

// Initialize language system
async function initLanguageSystem() {
    console.log('Initializing language system...');
    await loadTranslations();
    console.log('Translations loaded:', translations);
    
    // Preload K24 font
    preloadK24Font();
    
    // Load saved language preference
    const savedLanguage = localStorage.getItem('zaptech-language');
    console.log('Saved language preference:', savedLanguage);
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ku')) {
        currentLanguage = savedLanguage;
    }
    console.log('Current language set to:', currentLanguage);
    
    // Create language switcher button
    createLanguageSwitcher();
    
    // Update page content
    updatePageLanguage();
    
    // Update PC apps if they exist
    if (typeof updatePCAppsWithTranslations === 'function') {
        updatePCAppsWithTranslations();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Language switcher script loaded');
    initLanguageSystem();
});

// Also try to initialize immediately if DOM is already loaded
if (document.readyState === 'loading') {
    console.log('DOM still loading, waiting for DOMContentLoaded');
} else {
    console.log('DOM already loaded, initializing immediately');
    initLanguageSystem();
}

// Export functions for global access
window.toggleLanguage = toggleLanguage;
window.getTranslation = getTranslation;
window.currentLanguage = currentLanguage;

// Manual function to update bg7 specifically
window.updateBG7 = function() {
    const bg7Title = document.querySelector('.bgb7header') || document.querySelector('.bgg7header');
    console.log('Manual BG7 Title element found:', bg7Title);
    if (bg7Title) {
        const translation = getTranslation('sections.pcAppsGames.title');
        console.log('Manual BG7 Title translation:', translation);
        bg7Title.textContent = translation;
    }
    
    const bg7Desc = document.querySelector('.bgb7header-text') || document.querySelector('.bgg7header-text');
    console.log('Manual BG7 Desc element found:', bg7Desc);
    if (bg7Desc) {
        const translation = getTranslation('sections.pcAppsGames.description');
        console.log('Manual BG7 Desc translation:', translation);
        bg7Desc.innerHTML = translation;
    }
};

// Manual function to update About Us specifically
window.updateAboutUs = function() {
    const aboutTitle = document.querySelector('.bg8header');
    console.log('Manual About Us Title element found:', aboutTitle);
    if (aboutTitle) {
        const translation = getTranslation('sections.aboutUs.title');
        console.log('Manual About Us Title translation:', translation);
        aboutTitle.textContent = translation;
    }
    
    const aboutDesc = document.querySelector('.bg8header-text');
    console.log('Manual About Us Description element found:', aboutDesc);
    if (aboutDesc) {
        const translation = getTranslation('sections.aboutUs.description');
        console.log('Manual About Us Description translation:', translation);
        aboutDesc.innerHTML = translation;
    }
    
    const followUsTitle = document.querySelector('.social-title');
    console.log('Manual Follow Us Title element found:', followUsTitle);
    if (followUsTitle) {
        const translation = getTranslation('sections.aboutUs.followUs');
        console.log('Manual Follow Us Title translation:', translation);
        followUsTitle.textContent = translation;
    }
    
    const copyright = document.querySelector('.bg8-copyright');
    console.log('Manual Copyright element found:', copyright);
    if (copyright) {
        const translation = getTranslation('sections.aboutUs.copyright');
        console.log('Manual Copyright translation:', translation);
        copyright.textContent = translation;
    }
};

// Manual function to update Website description specifically
window.updateWebsiteDescription = function() {
    const websiteDesc = document.querySelector('.b3header-text');
    console.log('Manual Website Description element found:', websiteDesc);
    if (websiteDesc) {
        const translation = getTranslation('sections.websites.chooseDescription');
        console.log('Manual Website Description translation:', translation);
        websiteDesc.textContent = translation;
    }
};

// Manual function to update Video Tutorial page specifically
window.updateVideoTutorial = function() {
    const videoTutorialTitle = document.querySelector('.bg5header');
    console.log('Manual Video Tutorial Title element found:', videoTutorialTitle);
    if (videoTutorialTitle) {
        const translation = getTranslation('sections.videoTutorial.pickTitle');
        console.log('Manual Video Tutorial Title translation:', translation);
        videoTutorialTitle.textContent = translation;
    }
    
    const videoTutorialDesc = document.querySelector('.bgg5text');
    console.log('Manual Video Tutorial Description element found:', videoTutorialDesc);
    if (videoTutorialDesc) {
        const translation = getTranslation('sections.videoTutorial.pickDescription');
        console.log('Manual Video Tutorial Description translation:', translation);
        videoTutorialDesc.innerHTML = translation;
    }
};

// Manual function to update contact form specifically
window.updateContactForm = function() {
    console.log('Manual contact form update called');
    
    // Contact form elements
    const nameInput = document.querySelector('input[name="name"]');
    const messageTextarea = document.querySelector('textarea[name="message"]');
    const sendButton = document.querySelector('.contact-button');
    const sendMessageSpan = document.querySelector('.state--default p span');
    const sentSpan = document.querySelector('.state--sent p span');
    
    console.log('Contact form elements found:', {
        nameInput: nameInput,
        messageTextarea: messageTextarea,
        sendButton: sendButton,
        sendMessageSpan: sendMessageSpan,
        sentSpan: sentSpan
    });
    
    if (nameInput) {
        const translation = getTranslation('home.contactForm.namePlaceholder');
        console.log('Name input translation:', translation);
        nameInput.placeholder = translation;
    }
    
    if (messageTextarea) {
        const translation = getTranslation('home.contactForm.messagePlaceholder');
        console.log('Message textarea translation:', translation);
        messageTextarea.placeholder = translation;
    }
    
    if (sendButton) {
        const translation = getTranslation('home.contactForm.sendButton');
        console.log('Send button translation:', translation);
        sendButton.textContent = translation;
    }
    
    if (sendMessageSpan) {
        const translation = getTranslation('home.sendMessage');
        console.log('Send message span translation:', translation);
        sendMessageSpan.textContent = translation;
    }
    
    if (sentSpan) {
        const translation = getTranslation('home.sent');
        console.log('Sent span translation:', translation);
        sentSpan.textContent = translation;
    }
};

// Manual function to update website cards specifically
window.updateWebsiteCards = function() {
    console.log('Manual website cards update called');
    updateCards();
};

// Manual function to update personality page specifically
window.updatePersonalityPage = function() {
    console.log('Manual personality page update called');
    updatePersonalityContent();
};

// Manual function to update Quran page specifically
window.updateQuranPage = function() {
    console.log('Manual Quran page update called');
    updateQuranContent();
}; 