
class EnhancedUI {
    static showNotification(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = message;
        notification.style.cssText = `
            position: fixed;
            top: 70px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: bold;
            z-index: 1000;
            animation: slideIn 0.3s ease;
            max-width: 300px;
        `;
        
        switch (type) {
            case 'success':
                notification.style.backgroundColor = '#4CAF50';
                break;
            case 'error':
                notification.style.backgroundColor = '#f44336';
                break;
            case 'warning':
                notification.style.backgroundColor = '#ff9800';
                break;
            default:
                notification.style.backgroundColor = '#2196F3';
        }
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, duration);
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
    
    static addKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch (e.key) {
                    case 's':
                        e.preventDefault();
                        SaveSystem.saveGame();
                        this.showNotification('Game saved!', 'success');
                        break;
                    case 'l':
                        e.preventDefault();
                        if (SaveSystem.hasSavedGame()) {
                            SaveSystem.loadGame();
                            this.showNotification('Game loaded!', 'success');
                        } else {
                            this.showNotification('No saved game found!', 'error');
                        }
                        break;
                }
            }
            
            // Space bar to age
            if (e.code === 'Space' && !e.target.matches('input, textarea')) {
                e.preventDefault();
                const ageBtn = document.getElementById('age-btn');
                if (ageBtn && ageBtn.style.display !== 'none') {
                    annualChanges();
                }
            }
        });
    }
}

const EnhancedUI = {
    // Notification system
    showNotification(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Auto remove after duration
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideInRight 0.3s ease-out reverse';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }
        }, duration);
    },

    // Add smooth animations to elements
    animateElement(element, animationClass, duration = 1000) {
        if (!element) return;
        
        element.classList.add(animationClass);
        setTimeout(() => {
            element.classList.remove(animationClass);
        }, duration);
    },

    // Add keyboard shortcuts
    addKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl+S to save
            if (e.ctrlKey && e.key === 's') {
                e.preventDefault();
                if (typeof SaveSystem !== 'undefined' && SaveSystem.saveGame) {
                    SaveSystem.saveGame();
                    this.showNotification('Game saved successfully!', 'success');
                }
            }
            
            // Ctrl+L to load
            if (e.ctrlKey && e.key === 'l') {
                e.preventDefault();
                if (typeof loadSavedGame === 'function') {
                    loadSavedGame();
                }
            }
            
            // Space to age
            if (e.code === 'Space' && !e.target.matches('input, textarea, select')) {
                e.preventDefault();
                if (typeof annualChanges === 'function') {
                    annualChanges();
                }
            }
            
            // Escape to close modals
            if (e.key === 'Escape') {
                const modal = document.getElementById('modal-background');
                const menu = document.getElementById('menu-template');
                
                if (modal && modal.style.display === 'flex') {
                    modal.style.display = 'none';
                }
                if (menu && menu.style.display === 'block') {
                    menu.style.display = 'none';
                }
            }
        });
    },

    // Enhanced modal system
    createModal(title, content, options = {}) {
        const modal = document.getElementById('modal-background');
        const container = document.getElementById('event-container');
        const titleElement = document.getElementById('event-title');
        const bodyElement = document.getElementById('event-body');
        
        if (!modal || !container || !titleElement || !bodyElement) return;
        
        titleElement.textContent = title;
        bodyElement.innerHTML = content;
        
        // Add glassmorphism effect
        container.style.backdropFilter = 'blur(20px)';
        
        modal.style.display = 'flex';
        
        // Add animation class
        this.animateElement(container, 'fade-in');
        
        // Auto-close option
        if (options.autoClose) {
            setTimeout(() => {
                modal.style.display = 'none';
            }, options.autoClose);
        }
        
        return modal;
    },

    // Update stat bars with smooth animations
    updateStatBar(statName, value) {
        const bar = document.getElementById(`${statName}-bar`);
        if (!bar) return;
        
        const percentage = Math.max(0, Math.min(100, value));
        
        // Add smooth transition
        bar.style.transition = 'width 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        bar.style.width = `${percentage}%`;
        
        // Update color based on value
        if (percentage >= 70) {
            bar.style.background = 'linear-gradient(90deg, #34C759, #30D158)';
        } else if (percentage >= 40) {
            bar.style.background = 'linear-gradient(90deg, #FF9500, #FFCC02)';
        } else {
            bar.style.background = 'linear-gradient(90deg, #FF3B30, #FF6961)';
        }
        
        // Add pulse animation for low values
        if (percentage < 20) {
            bar.classList.add('pulse');
        } else {
            bar.classList.remove('pulse');
        }
    },

    // Add haptic feedback simulation
    hapticFeedback(type = 'light') {
        if ('vibrate' in navigator) {
            switch (type) {
                case 'light':
                    navigator.vibrate(10);
                    break;
                case 'medium':
                    navigator.vibrate(20);
                    break;
                case 'heavy':
                    navigator.vibrate(50);
                    break;
            }
        }
    },

    // Initialize all UI enhancements
    init() {
        this.addKeyboardShortcuts();
        
        // Add loading animations to buttons
        document.querySelectorAll('.btn, .option, .create-btn').forEach(button => {
            button.addEventListener('click', () => {
                this.hapticFeedback('light');
            });
        });
        
        // Add smooth scrolling
        document.documentElement.style.scrollBehavior = 'smooth';
        
        // Initialize intersection observer for animations
        this.initScrollAnimations();
    },

    // Initialize scroll-triggered animations
    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target, 'slide-in-left');
                }
            });
        }, observerOptions);
        
        // Observe stat containers and other elements
        document.querySelectorAll('#stats-container, #tale-container, .relationship-container').forEach(el => {
            observer.observe(el);
        });
    }
};

// Initialize enhanced UI when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    EnhancedUI.init();
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
