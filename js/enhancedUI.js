class EnhancedUI {
    constructor() {
        this.notificationQueue = [];
        this.isProcessingQueue = false;
        this.boundKeyHandler = this.handleKeyPress.bind(this);
        this.initialize();
    }

    initialize() {
        document.addEventListener('keydown', this.boundKeyHandler);
        window.addEventListener('beforeunload', () => this.cleanup());
    }

    cleanup() {
        document.removeEventListener('keydown', this.boundKeyHandler);
        this.notificationQueue = [];
        this.isProcessingQueue = false;
    }

    handleKeyPress(e) {
        // Ignore if user is typing in an input
        if (e.target.matches('input, textarea, select')) return;

        if (e.ctrlKey || e.metaKey) {
            switch(e.key.toLowerCase()) {
                case 's':
                    e.preventDefault();
                    this.handleSave();
                    break;
                case 'l':
                    e.preventDefault();
                    this.handleLoad();
                    break;
                case 'n':
                    e.preventDefault();
                    this.handleNewGame();
                    break;
            }
        }

        // Space to age
        if (e.code === 'Space') {
            e.preventDefault();
            const ageBtn = document.getElementById('age-btn');
            if (ageBtn && ageBtn.style.display !== 'none') {
                if (typeof annualChanges === 'function') {
                    annualChanges();
                }
            }
        }

        // Escape to close modals
        if (e.key === 'Escape') {
            this.closeAllModals();
        }
    }

    handleSave() {
        if (typeof SaveSystem !== 'undefined' && SaveSystem.saveGame) {
            SaveSystem.saveGame();
        }
    }

    handleLoad() {
        if (typeof SaveSystem !== 'undefined' && SaveSystem.loadGame) {
            SaveSystem.loadGame();
        }
    }

    handleNewGame() {
        if (typeof showCharacterCreation === 'function') {
            showCharacterCreation();
        }
    }

    closeAllModals() {
        const modal = document.getElementById('modal-background');
        const menu = document.getElementById('menu-template');
        
        if (modal && modal.style.display === 'flex') {
            modal.style.display = 'none';
        }
        if (menu && menu.style.display === 'block') {
            menu.style.display = 'none';
        }
    }

    static showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
            </div>
        `;

        document.body.appendChild(notification);

        // Trigger animation
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        // Remove notification after delay
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.parentElement.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    static hapticFeedback() {
        if ('vibrate' in navigator) {
            navigator.vibrate(50);
        }
    }

    static addProgressBar(containerId, value, maxValue, label) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const percentage = (value / maxValue) * 100;
        const progressHTML = `
            <div class="progress-container">
                <label>${label}: ${value}/${maxValue}</label>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${percentage}%"></div>
                </div>
            </div>
        `;
        
        container.innerHTML += progressHTML;
    }
    
    static animateStatChange(statName, oldValue, newValue) {
        const bar = document.getElementById(`${statName}-bar`);
        if (!bar) return;
        
        const difference = newValue - oldValue;
        if (difference !== 0) {
            bar.style.transition = 'width 0.5s ease';
            
            // Show floating text
            const floatingText = document.createElement('div');
            floatingText.innerHTML = `${difference > 0 ? '+' : ''}${difference}`;
            floatingText.style.cssText = `
                position: absolute;
                color: ${difference > 0 ? '#4CAF50' : '#f44336'};
                font-weight: bold;
                animation: floatUp 2s ease;
                pointer-events: none;
                z-index: 100;
            `;
            
            bar.parentNode.appendChild(floatingText);
            setTimeout(() => {
                if (floatingText.parentNode) {
                    floatingText.parentNode.removeChild(floatingText);
                }
            }, 2000);
        }
    }
    
    static createTooltip(element, text) {
        element.setAttribute('title', text);
        element.style.cursor = 'help';
    }
}

// Initialize UI enhancements
const enhancedUI = new EnhancedUI();

// Initialize enhanced UI when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    enhancedUI.initialize();
});

// Export for global access
window.EnhancedUI = EnhancedUI;
const enhancedStyles = `
@keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}

@keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
}

@keyframes floatUp {
    from { transform: translateY(0); opacity: 1; }
    to { transform: translateY(-30px); opacity: 0; }
}

.progress-container {
    margin: 10px 0;
}

.progress-bar {
    width: 100%;
    height: 20px;
    background-color: #303030;
    border-radius: 10px;
    overflow: hidden;
}

.progress-fill {
    height: 100%;
    background-color: #4CAF50;
    transition: width 0.3s ease;
}

.notification {
    animation-fill-mode: forwards;
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = enhancedStyles;
document.head.appendChild(styleSheet);
