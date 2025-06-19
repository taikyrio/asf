class MusicSystem {
    constructor() {
        this.backgroundMusic = null;
        this.musicEnabled = localStorage.getItem('musicEnabled') !== 'false';
        this.volume = parseFloat(localStorage.getItem('musicVolume')) || 0.3;
        this.isInitialized = false;
        this.initializeMusic().catch(console.error);
    }

    async initializeMusic() {
        try {
            if (this.isInitialized) return;

            this.backgroundMusic = new Audio('attached_assets/New Composition #336_1750284826079.mp3');
            
            // Set up event listeners
            this.backgroundMusic.addEventListener('error', (e) => {
                console.error('Audio error:', e);
                this.handleAudioError();
            });

            this.backgroundMusic.addEventListener('ended', () => {
                if (this.musicEnabled) {
                    this.backgroundMusic.play().catch(console.error);
                }
            });

            // Configure audio
            this.backgroundMusic.loop = true;
            this.backgroundMusic.volume = this.volume;
            
            // Preload audio
            await this.backgroundMusic.load();
            
            this.isInitialized = true;

            // Auto-play when music is enabled
            if (this.musicEnabled) {
                await this.playBackgroundMusic();
            }
        } catch (error) {
            console.error('Failed to initialize music:', error);
            this.isInitialized = false;
            this.handleAudioError();
        }
    }

    async playBackgroundMusic() {
        try {
            if (!this.isInitialized || !this.backgroundMusic) {
                await this.initializeMusic();
            }
            
            if (this.backgroundMusic.paused) {
                await this.backgroundMusic.play();
            }
        } catch (error) {
            console.error('Failed to play background music:', error);
            this.handleAudioError();
        }
    }

    stopBackgroundMusic() {
        try {
            if (this.backgroundMusic) {
                this.backgroundMusic.pause();
                this.backgroundMusic.currentTime = 0;
            }
        } catch (error) {
            console.error('Failed to stop background music:', error);
        }
    }

    toggleMusic() {
        try {
            this.musicEnabled = !this.musicEnabled;
            localStorage.setItem('musicEnabled', this.musicEnabled);
            
            if (this.musicEnabled) {
                this.playBackgroundMusic().catch(console.error);
            } else {
                this.stopBackgroundMusic();
            }

            // Notify UI if available
            if (typeof EnhancedUI !== 'undefined') {
                EnhancedUI.showNotification(
                    `Music ${this.musicEnabled ? 'enabled' : 'disabled'}`,
                    'info'
                );
            }
        } catch (error) {
            console.error('Failed to toggle music:', error);
        }
    }

    setVolume(value) {
        try {
            this.volume = Math.max(0, Math.min(1, value));
            localStorage.setItem('musicVolume', this.volume.toString());
            
            if (this.backgroundMusic) {
                this.backgroundMusic.volume = this.volume;
            }
        } catch (error) {
            console.error('Failed to set volume:', error);
        }
    }

    handleAudioError() {
        this.isInitialized = false;
        if (typeof EnhancedUI !== 'undefined') {
            EnhancedUI.showNotification('Failed to load music', 'error');
        }
    }

    cleanup() {
        try {
            if (this.backgroundMusic) {
                this.stopBackgroundMusic();
                this.backgroundMusic.removeAttribute('src');
                this.backgroundMusic.load();
                this.backgroundMusic = null;
            }
            this.isInitialized = false;
        } catch (error) {
            console.error('Failed to cleanup music system:', error);
        }
    }

    showMusicPrompt() {
        if (document.getElementById('main-menu-screen').style.display === 'flex') {
            showEvent({
                title: '🎵 Background Music',
                body: `
                <div style="text-align: center; padding: 10px;">
                    <p>LifeWay has background music to enhance your experience!</p>
                    <p>Would you like to enable it?</p>
                </div>
                <div class="option" onclick="musicSystem.enableMusicFromPrompt()">Enable Music</div>
                <div class="option" onclick="closeEvent()">Maybe Later</div>
                `
            });
        }
    }

    enableMusicFromPrompt() {
        this.musicEnabled = true;
        localStorage.setItem('musicEnabled', true);
        this.playBackgroundMusic();
        closeEvent();
    }
}

// Initialize music system
const musicSystem = new MusicSystem();
