/**
 * WHOIS Checker - Domain Information Lookup Tool
 * Author: GitHub User
 * License: MIT
 */

class WHOISChecker {
    constructor() {
        this.form = document.getElementById('searchForm');
        this.domainInput = document.getElementById('domain');
        this.searchBtn = document.getElementById('searchBtn');
        this.btnText = document.getElementById('btnText');
        this.loadingSpinner = document.getElementById('loadingSpinner');
        this.errorMessage = document.getElementById('errorMessage');
        this.errorText = document.getElementById('errorText');
        this.results = document.getElementById('results');
        
        // API endpoints (multiple fallbacks)
        this.apiEndpoints = [
            {
                name: 'FreeAPI Direct',
                url: 'https://whois.freeapi.app/api/whois',
                format: 'freeapi',
                cors: false
            },
            {
                name: 'AllOrigins Proxy',
                url: 'https://api.allorigins.win/get?url=',
                format: 'proxy',
                cors: true
            },
            {
                name: 'CorsProxy.io',
                url: 'https://corsproxy.io/?',
                format: 'corsproxy',
                cors: true
            },
            {
                name: 'Demo Mode',
                url: 'demo',
                format: 'demo',
                cors: true
            }
        ];

        // Demo data for testing when APIs are down
        this.demoData = {
            'google.com': {
                domainName: 'google.com',
                status: ['clientTransferProhibited', 'clientUpdateProhibited', 'clientDeleteProhibited', 'serverTransferProhibited', 'serverUpdateProhibited', 'serverDeleteProhibited'],
                creationDate: '1997-09-15T00:00:00Z',
                expirationDate: '2028-09-13T00:00:00Z',
                updatedDate: '2023-09-07T08:58:19Z',
                registrarName: 'MarkMonitor Inc.',
                registrarIANAID: '292',
                nameServers: ['ns1.google.com', 'ns2.google.com', 'ns3.google.com', 'ns4.google.com']
            },
            'github.com': {
                domainName: 'github.com',
                status: ['clientDeleteProhibited', 'clientTransferProhibited', 'clientUpdateProhibited'],
                creationDate: '2007-10-09T18:20:50Z',
                expirationDate: '2025-10-09T18:20:50Z',
                updatedDate: '2023-09-07T09:10:44Z',
                registrarName: 'MarkMonitor Inc.',
                registrarIANAID: '292',
                nameServers: ['dns1.p08.nsone.net', 'dns2.p08.nsone.net', 'dns3.p08.nsone.net', 'dns4.p08.nsone.net', 'ns-1283.awsdns-32.org', 'ns-1707.awsdns-21.co.uk', 'ns-421.awsdns-52.com', 'ns-520.awsdns-01.net']
            }
        };
        
        this.initEventListeners();
        this.initMobileMenu();
        this.initPlaceholderAnimation();
    }

    /**
     * Initialize all event listeners
     */
    initEventListeners() {
        // Form submission
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.searchDomain();
        });

        // Enter key handling
        this.domainInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.searchDomain();
            }
        });

        // Clear error when user starts typing
        this.domainInput.addEventListener('input', () => {
            this.hideError();
        });

        // Add focus/blur effects for better UX
        this.domainInput.addEventListener('focus', () => {
            this.domainInput.classList.add('ring-2', 'ring-white/20');
        });

        this.domainInput.addEventListener('blur', () => {
            this.domainInput.classList.remove('ring-2', 'ring-white/20');
        });
    }

    /**
     * Initialize mobile menu functionality
     */
    initMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');

        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                    mobileMenu.classList.add('hidden');
                }
            });
        }
    }

    /**
     * Initialize placeholder animation with domain examples
     */
    initPlaceholderAnimation() {
        const examples = [
            'google.com',
            'github.com', 
            'stackoverflow.com',
            'wikipedia.org',
            'microsoft.com',
            'apple.com',
            'amazon.com',
            'facebook.com'
        ];
        
        let exampleIndex = 0;

        setInterval(() => {
            if (!this.domainInput.value && !this.domainInput.matches(':focus')) {
                this.domainInput.placeholder = `örnek: ${examples[exampleIndex]}`;
                exampleIndex = (exampleIndex + 1) % examples.length;
            }
        }, 3000);
    }

    /**
     * Validate domain name format
     * @param {string} domain - Domain to validate
     * @returns {boolean} - Whether domain is valid
     */
    validateDomain(domain) {
        // Enhanced domain validation regex
        const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?\.[a-zA-Z]{2,}$/;
        
        // Additional checks
        if (domain.length > 253) return false;
        if (domain.includes('..')) return false;
        if (domain.startsWith('-') || domain.endsWith('-')) return false;
        
        return domainRegex.test(domain);
    }

    /**
     * Show error message to user
     * @param {string} message - Error message to display
     */
    showError(message) {
        this.errorText.textContent = message;
        this.errorMessage.classList.remove('hidden');
        this.results.classList.add('hidden');
        
        // Add animation
        this.errorMessage.style.animation = 'slideUp 0.3s ease-out';
        
        // Scroll to error message
        this.errorMessage.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
    }

    /**
     * Hide error message
     */
    hideError() {
        this.errorMessage.classList.add('hidden');
    }

    /**
     * Show API success message
     * @param {string} message - Success message to display
     */
    showApiSuccess(message) {
        // Create or update success message element
        let successElement = document.getElementById('apiSuccess');
        if (!successElement) {
            successElement = document.createElement('div');
            successElement.id = 'apiSuccess';
            successElement.className = 'glass-effect rounded-xl p-3 mb-4 border-l-4 border-green-500 bg-green-500/10';
            
            // Insert after search form
            const searchForm = document.querySelector('.glass-effect');
            searchForm.parentNode.insertBefore(successElement, searchForm.nextSibling);
        }
        
        successElement.innerHTML = `
            <div class="flex items-center">
                <svg class="w-5 h-5 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <p class="text-green-200 text-sm font-medium">${message}</p>
            </div>
        `;
        
        successElement.classList.remove('hidden');
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            if (successElement) {
                successElement.classList.add('hidden');
            }
        }, 5000);
    }

    /**
     * Show loading state
     */
    showLoading() {
        this.searchBtn.disabled = true;
        this.btnText.textContent = 'Sorgulanıyor...';
        this.loadingSpinner.classList.remove('hidden');
        this.searchBtn.classList.add('opacity-75', 'cursor-not-allowed');
        
        // Prevent multiple submissions
        this.domainInput.disabled = true;
    }

    /**
     * Hide loading state
     */
    hideLoading() {
        this.searchBtn.disabled = false;
        this.btnText.textContent = '🔍 WHOIS Sorgula';
        this.loadingSpinner.classList.add('hidden');
        this.searchBtn.classList.remove('opacity-75', 'cursor-not-allowed');
        this.domainInput.disabled = false;
    }

    /**
     * Format date string to Turkish locale
     * @param {string} dateString - Date string to format
     * @returns {string} - Formatted date
     */
    formatDate(dateString) {
        if (!dateString) return 'Bilgi yok';
        
        try {
            const date = new Date(dateString);
            
            // Check if date is valid
            if (isNaN(date.getTime())) {
                return dateString; // Return original if invalid
            }
            
            return date.toLocaleDateString('tr-TR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                timeZone: 'Europe/Istanbul'
            });
        } catch (error) {
            console.warn('Date formatting error:', error);
            return dateString;
        }
    }

    /**
     * Format domain status for display
     * @param {string|Array} status - Domain status
     * @returns {string} - Formatted status
     */
    formatStatus(status) {
        if (!status) return 'Bilinmiyor';
        
        const statusMap = {
            'clientTransferProhibited': 'Transfer Yasağı',
            'clientUpdateProhibited': 'Güncelleme Yasağı',
            'clientDeleteProhibited': 'Silme Yasağı',
            'serverTransferProhibited': 'Sunucu Transfer Yasağı',
            'serverUpdateProhibited': 'Sunucu Güncelleme Yasağı',
            'serverDeleteProhibited': 'Sunucu Silme Yasağı',
            'ok': 'Aktif',
            'active': 'Aktif',
            'inactive': 'Pasif'
        };

        if (Array.isArray(status)) {
            return status.map(s => statusMap[s] || s).join(', ');
        }

        return statusMap[status] || status;
    }

    /**
     * Display WHOIS results
     * @param {Object} data - WHOIS data to display
     */
    displayResults(data) {
        try {
            // Domain basic info
            document.getElementById('domainName').textContent = data.domainName || 'Bilgi yok';
            
            // Status with color coding
            const statusElement = document.getElementById('domainStatus');
            const formattedStatus = this.formatStatus(data.status);
            statusElement.textContent = formattedStatus;
            
            // Apply status styling
            statusElement.className = 'font-medium px-3 py-1 rounded-full text-sm';
            if (formattedStatus.includes('Aktif') || formattedStatus.includes('ok')) {
                statusElement.classList.add('bg-green-500/20', 'text-green-400', 'border', 'border-green-500/30');
            } else if (formattedStatus.includes('Pasif')) {
                statusElement.classList.add('bg-red-500/20', 'text-red-400', 'border', 'border-red-500/30');
            } else {
                statusElement.classList.add('bg-yellow-500/20', 'text-yellow-400', 'border', 'border-yellow-500/30');
            }

            // Dates
            document.getElementById('creationDate').textContent = this.formatDate(data.creationDate);
            document.getElementById('expirationDate').textContent = this.formatDate(data.expirationDate);
            document.getElementById('updatedDate').textContent = this.formatDate(data.updatedDate);

            // Registrar info
            document.getElementById('registrarName').textContent = data.registrarName || 'Bilgi yok';
            document.getElementById('registrarId').textContent = data.registrarIANAID || 'Bilgi yok';

            // Name servers
            this.displayNameServers(data.nameServers);

            // Show results with animation
            this.hideError();
            this.results.classList.remove('hidden');
            
            // Smooth scroll to results
            setTimeout(() => {
                this.results.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }, 100);

            // Track successful lookup (for analytics if needed)
            this.trackLookup(data.domainName, 'success');

        } catch (error) {
            console.error('Display error:', error);
            this.showError('Sonuçlar gösterilirken bir hata oluştu.');
        }
    }

    /**
     * Display name servers
     * @param {Array} nameServers - Array of name servers
     */
    displayNameServers(nameServers) {
        const nameServersContainer = document.getElementById('nameServers');
        nameServersContainer.innerHTML = '';
        
        if (nameServers && nameServers.length > 0) {
            nameServers.forEach((ns, index) => {
                const nsElement = document.createElement('div');
                nsElement.className = 'nameserver-item bg-white/5 rounded-lg p-3 text-white/90 font-mono text-sm border border-white/10 transition-all duration-200 hover:bg-white/10 hover:border-white/20';
                nsElement.textContent = ns;
                
                // Add animation delay for staggered effect
                nsElement.style.animationDelay = `${index * 0.1}s`;
                nsElement.style.animation = 'slideUp 0.3s ease-out forwards';
                nsElement.style.opacity = '0';
                
                nameServersContainer.appendChild(nsElement);
                
                // Trigger animation
                setTimeout(() => {
                    nsElement.style.opacity = '1';
                }, index * 100);
            });
        } else {
            nameServersContainer.innerHTML = '<div class="text-white/60 text-center py-4">Name server bilgisi bulunamadı</div>';
        }
    }

    /**
     * Try multiple API endpoints with fallback
     * @param {string} domain - Domain to lookup
     * @returns {Object} - WHOIS data
     */
    async tryMultipleAPIs(domain) {
        let lastError = null;
        
        for (const api of this.apiEndpoints) {
            try {
                console.log(`Trying ${api.name}...`);
                const result = await this.callAPI(api, domain);
                if (result && result.success) {
                    console.log(`Success with ${api.name}`);
                    
                    // Show success message with API source (except for demo mode)
                    if (api.format !== 'demo') {
                        this.showApiSuccess(`Veri kaynağı: ${api.name}`);
                    } else {
                        this.showApiSuccess('Demo modu - Örnek veriler gösteriliyor');
                    }
                    
                    return result.data;
                }
            } catch (error) {
                console.warn(`${api.name} failed:`, error.message);
                lastError = error;
                continue;
            }
        }
        
        // If all APIs failed, throw the last error
        throw lastError || new Error('All API endpoints failed');
    }

    /**
     * Call specific API endpoint
     * @param {Object} api - API configuration
     * @param {string} domain - Domain to lookup
     * @returns {Object} - API response
     */
    async callAPI(api, domain) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout per API
        
        try {
            let url, options;
            
            switch (api.format) {
                case 'whoisapi':
                    // WhoisAPI format (requires API key for full access, but has limited free tier)
                    url = `${api.url}?domain=${encodeURIComponent(domain)}&format=json`;
                    options = {
                        signal: controller.signal,
                        headers: {
                            'Accept': 'application/json'
                        }
                    };
                    break;
                    
                case 'freeapi':
                    // Original free API format
                    url = `${api.url}?domainName=${encodeURIComponent(domain)}`;
                    options = {
                        signal: controller.signal,
                        mode: 'cors',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
                    };
                    break;
                    
                case 'proxy':
                    // CORS proxy format
                    url = `${api.url}${encodeURIComponent('https://whois.freeapi.app/api/whois?domainName=' + domain)}`;
                    options = {
                        signal: controller.signal,
                        headers: {
                            'Accept': 'application/json'
                        }
                    };
                    break;
                    
                case 'corsproxy':
                    // Alternative CORS proxy
                    url = `${api.url}https://whois.freeapi.app/api/whois?domainName=${encodeURIComponent(domain)}`;
                    options = {
                        signal: controller.signal,
                        headers: {
                            'Accept': 'application/json'
                        }
                    };
                    break;
                    
                case 'demo':
                    // Demo mode - simulate API response
                    clearTimeout(timeoutId);
                    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
                    
                    const demoResult = this.demoData[domain];
                    if (demoResult) {
                        return { success: true, data: demoResult };
                    } else {
                        return { 
                            success: true, 
                            data: {
                                domainName: domain,
                                status: ['Demo Mode - Gerçek veriler için API gerekli'],
                                creationDate: '2020-01-01T00:00:00Z',
                                expirationDate: '2025-01-01T00:00:00Z',
                                updatedDate: '2024-01-01T00:00:00Z',
                                registrarName: 'Demo Registrar',
                                registrarIANAID: '000',
                                nameServers: ['ns1.demo.com', 'ns2.demo.com']
                            }
                        };
                    }
                    
                default:
                    throw new Error(`Unknown API format: ${api.format}`);
            }
            
            const response = await fetch(url, options);
            clearTimeout(timeoutId);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            let result = await response.json();
            
            // Handle proxy responses
            if (api.format === 'proxy' && result.contents) {
                result = JSON.parse(result.contents);
            }
            
            // Standardize response format
            return this.standardizeResponse(result, api.format);
            
        } catch (error) {
            clearTimeout(timeoutId);
            throw error;
        }
    }

    /**
     * Standardize different API response formats
     * @param {Object} data - Raw API response
     * @param {string} format - API format type
     * @returns {Object} - Standardized response
     */
    standardizeResponse(data, format) {
        if (!data) {
            return { success: false, data: null };
        }
        
        switch (format) {
            case 'freeapi':
            case 'proxy':
            case 'corsproxy':
                if (data.status === 'success' && data.data) {
                    return { success: true, data: data.data };
                }
                break;
                
            case 'whoisapi':
                if (data.domainName) {
                    return { 
                        success: true, 
                        data: {
                            domainName: data.domainName,
                            status: data.status,
                            creationDate: data.createdDate,
                            expirationDate: data.expiresDate,
                            updatedDate: data.updatedDate,
                            registrarName: data.registrarName,
                            registrarIANAID: data.registrarIANAID,
                            nameServers: data.nameServers
                        }
                    };
                }
                break;
                
            case 'demo':
                // Demo mode is already standardized
                return data;
        }
        
        return { success: false, data: null };
    }

    /**
     * Track lookup for analytics (optional)
     * @param {string} domain - Domain that was looked up
     * @param {string} status - Lookup status (success/error)
     */
    trackLookup(domain, status) {
        // This could be connected to analytics service
        console.log(`WHOIS lookup: ${domain} - ${status}`);
    }

    /**
     * Main domain search function
     */
    async searchDomain() {
        const domain = this.domainInput.value.trim().toLowerCase();

        // Validation
        if (!domain) {
            this.showError('Lütfen bir domain adı girin.');
            this.domainInput.focus();
            return;
        }

        if (!this.validateDomain(domain)) {
            this.showError('Geçerli bir domain adı girin (örnek: google.com)');
            this.domainInput.focus();
            return;
        }

        this.showLoading();
        this.hideError();

        try {
            // Try multiple API endpoints with automatic fallback
            console.log(`Starting WHOIS lookup for: ${domain}`);
            const result = await this.tryMultipleAPIs(domain);
            
            if (result) {
                this.displayResults(result);
                this.trackLookup(domain, 'success');
            } else {
                throw new Error('WHOIS bilgisi alınamadı');
            }

        } catch (error) {
            console.error('WHOIS lookup error:', error);
            
            let errorMessage = 'WHOIS sorgusu sırasında bir hata oluştu.';
            
            if (error.name === 'AbortError') {
                errorMessage = 'Sorgu zaman aşımına uğradı. Lütfen tekrar deneyin.';
            } else if (error.message.includes('CORS') || error.message.includes('cors')) {
                errorMessage = 'CORS hatası nedeniyle API\'ye erişilemiyor. Farklı bir tarayıcı deneyiniz.';
            } else if (error.message.includes('fetch') || error.message.includes('network') || error.message.includes('Failed to fetch')) {
                errorMessage = 'Ağ bağlantı hatası. Lütfen internet bağlantınızı kontrol edin ve tekrar deneyin.';
            } else if (error.message.includes('404')) {
                errorMessage = 'Domain bulunamadı veya kayıt bilgileri mevcut değil.';
            } else if (error.message.includes('rate limit') || error.message.includes('429')) {
                errorMessage = 'Çok fazla sorgu gönderildi. Lütfen bir dakika bekleyip tekrar deneyin.';
            } else if (error.message.includes('500') || error.message.includes('502') || error.message.includes('503')) {
                errorMessage = 'Sunucu hatası. Lütfen daha sonra tekrar deneyin.';
            } else if (error.message.includes('All API endpoints failed')) {
                errorMessage = 'Tüm API servisleri şu anda erişilemez durumda. Lütfen daha sonra tekrar deneyin.';
            }

            this.showError(errorMessage);
            this.trackLookup(domain, 'error');
            
        } finally {
            this.hideLoading();
        }
    }
}

/**
 * Utility functions
 */
const Utils = {
    /**
     * Copy text to clipboard
     * @param {string} text - Text to copy
     */
    copyToClipboard(text) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                this.showToast('Kopyalandı!');
            });
        } else {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            this.showToast('Kopyalandı!');
        }
    },

    /**
     * Show toast notification
     * @param {string} message - Message to show
     */
    showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'fixed top-20 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300';
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        // Animate in
        setTimeout(() => {
            toast.classList.remove('translate-x-full');
        }, 100);
        
        // Animate out and remove
        setTimeout(() => {
            toast.classList.add('translate-x-full');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 2000);
    }
};

/**
 * Initialize the application when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', () => {
    new WHOISChecker();
    
    // Add copy functionality to name servers (if needed)
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('nameserver-item')) {
            Utils.copyToClipboard(e.target.textContent);
        }
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Hide mobile menu if open
            const mobileMenu = document.getElementById('mobileMenu');
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        }
    });
});
