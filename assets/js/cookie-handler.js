/**
 * Cookie Handler
 * Manages cookie consent and preferences
 */

class CookieHandler {
    constructor() {
        this.cookieName = 'soyuz3d_cookies_consent';
        this.cookieDuration = 365; // 1 year
        this.bannerElement = document.getElementById('cookieBanner');
        this.modalElement = document.getElementById('cookieModal');
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.checkConsentStatus();
    }

    setupEventListeners() {
        // Banner buttons
        document.getElementById('acceptAllCookies').addEventListener('click', () => this.acceptAll());
        document.getElementById('rejectCookies').addEventListener('click', () => this.rejectAll());
        document.getElementById('cookieSettings').addEventListener('click', () => this.openModal());

        // Modal buttons
        document.getElementById('closeCookieModal').addEventListener('click', () => this.closeModal());
        document.getElementById('saveSettingsCookies').addEventListener('click', () => this.saveSettings());
        document.getElementById('rejectFromModal').addEventListener('click', () => this.rejectAll());

        // Close modal when clicking outside
        this.modalElement.addEventListener('click', (e) => {
            if (e.target === this.modalElement) {
                this.closeModal();
            }
        });
    }

    checkConsentStatus() {
        const consent = this.getCookie(this.cookieName);
        console.log('Checking consent status. Cookie found:', consent ? 'YES' : 'NO');
        console.log('All cookies:', document.cookie);
        
        if (!consent) {
            // Show banner if no consent recorded
            console.log('No consent found. Showing banner.');
            this.showBanner();
        } else {
            // Load user's cookie preferences
            console.log('Consent found. Loading preferences:', consent);
            this.loadUserPreferences(JSON.parse(consent));
        }
    }

    showBanner() {
        this.bannerElement.classList.add('show');
    }

    hideBanner() {
        this.bannerElement.classList.remove('show');
    }

    openModal() {
        this.modalElement.classList.add('show');
        this.loadCurrentSettings();
    }

    closeModal() {
        this.modalElement.classList.remove('show');
    }

    loadCurrentSettings() {
        const consent = this.getCookie(this.cookieName);
        
        if (consent) {
            const preferences = JSON.parse(consent);
            document.getElementById('analyticsCookies').checked = preferences.analytics || false;
            document.getElementById('marketingCookies').checked = preferences.marketing || false;
            document.getElementById('functionalCookies').checked = preferences.functional || false;
        }
    }

    acceptAll() {
        const preferences = {
            necessary: true,
            analytics: true,
            marketing: true,
            functional: true,
            timestamp: new Date().toISOString()
        };

        console.log('Accepting all cookies. Saving preferences:', preferences);
        this.setCookie(this.cookieName, JSON.stringify(preferences), this.cookieDuration);
        this.loadUserPreferences(preferences);
        this.hideBanner();
        this.closeModal();
        this.logConsent('All cookies accepted');
    }

    rejectAll() {
        const preferences = {
            necessary: true,
            analytics: false,
            marketing: false,
            functional: false,
            timestamp: new Date().toISOString()
        };

        this.setCookie(this.cookieName, JSON.stringify(preferences), this.cookieDuration);
        this.loadUserPreferences(preferences);
        this.hideBanner();
        this.closeModal();
        this.logConsent('Cookies rejected');
    }

    saveSettings() {
        const preferences = {
            necessary: true,
            analytics: document.getElementById('analyticsCookies').checked,
            marketing: document.getElementById('marketingCookies').checked,
            functional: document.getElementById('functionalCookies').checked,
            timestamp: new Date().toISOString()
        };

        this.setCookie(this.cookieName, JSON.stringify(preferences), this.cookieDuration);
        this.loadUserPreferences(preferences);
        this.closeModal();
        this.hideBanner();
        this.logConsent('Custom cookie settings saved');
    }

    loadUserPreferences(preferences) {
        // Initialize cookies based on user preferences
        if (preferences.analytics) {
            this.initAnalyticsCookies();
        }

        if (preferences.marketing) {
            this.initMarketingCookies();
        }

        if (preferences.functional) {
            this.initFunctionalCookies();
        }

        // Always initialize necessary cookies
        this.initNecessaryCookies();
    }

    // Cookie management utility functions
    setCookie(name, value, days) {
        const d = new Date();
        d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + d.toUTCString();
        document.cookie = name + "=" + encodeURIComponent(value) + ";" + expires + ";path=/;SameSite=Lax";
        console.log('Cookie set:', name, '| Expires:', d.toUTCString(), '| Value length:', value.length);
    }

    getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i].trim();
            if (c.indexOf(nameEQ) === 0) {
                return decodeURIComponent(c.substring(nameEQ.length));
            }
        }
        return null;
    }

    deleteCookie(name) {
        this.setCookie(name, "", -1);
    }

    // Cookie initialization functions
    initNecessaryCookies() {
        // Set necessary session cookie
        this.setCookie('soyuz3d_session', this.generateSessionId(), 1);
    }

    initAnalyticsCookies() {
        // Set analytics tracking cookie
        this.setCookie('soyuz3d_analytics_id', this.generateUniqueId(), 365);
        
        // Example: Initialize Google Analytics or similar
        // This would normally load GA script if user consents
        console.log('Analytics cookies enabled');
    }

    initMarketingCookies() {
        // Set marketing tracking cookie
        this.setCookie('soyuz3d_marketing_id', this.generateUniqueId(), 365);
        
        // Example: Initialize marketing pixels if user consents
        console.log('Marketing cookies enabled');
    }

    initFunctionalCookies() {
        // Set user preference cookies
        this.setCookie('soyuz3d_preferences', JSON.stringify({
            theme: 'light',
            language: 'ru'
        }), 365);
        
        console.log('Functional cookies enabled');
    }

    // Utility functions
    generateSessionId() {
        return 'session_' + Math.random().toString(36).substr(2, 9);
    }

    generateUniqueId() {
        return 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    logConsent(action) {
        const logEntry = {
            action: action,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent
        };
        
        console.log('Cookie Consent Log:', logEntry);
        // In production, you would send this to a server
    }

    // Public API methods
    updateCookiePreference(type, value) {
        const consent = this.getCookie(this.cookieName);
        
        if (consent) {
            const preferences = JSON.parse(consent);
            preferences[type] = value;
            this.setCookie(this.cookieName, JSON.stringify(preferences), this.cookieDuration);
            this.loadUserPreferences(preferences);
        }
    }

    getCookiePreference(type) {
        const consent = this.getCookie(this.cookieName);
        
        if (consent) {
            const preferences = JSON.parse(consent);
            return preferences[type] || false;
        }
        
        return false;
    }

    getAllPreferences() {
        const consent = this.getCookie(this.cookieName);
        
        if (consent) {
            return JSON.parse(consent);
        }
        
        return null;
    }

    resetConsent() {
        this.deleteCookie(this.cookieName);
        this.showBanner();
    }
}

// Initialize cookie handler when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.cookieHandler = new CookieHandler();
});
