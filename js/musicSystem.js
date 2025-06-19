
class MusicSystem {
    constructor() {
        this.backgroundMusic = null;
        this.musicEnabled = localStorage.getItem('musicEnabled') !== 'false'; // Default enabled
        this.volume = parseFloat(localStorage.getItem('musicVolume')) || 0.3;
        this.initializeMusic();
    }

    initializeMusic() {
        // Create audio element for background music
        this.backgroundMusic = new Audio('attached_assets/New Composition #336_1750284826079.mp3');
        this.backgroundMusic.loop = true;
        this.backgroundMusic.volume = this.volume;
        
        // Auto-play when music is enabled
        if (this.musicEnabled) {
            this.playBackgroundMusic();
        }
    }

    playBackgroundMusic() {
        if (this.backgroundMusic && this.musicEnabled) {
            this.backgroundMusic.play().catch(e => {
                console.log('Music autoplay prevented by browser:', e);
                // Show a notification to user about music
                setTimeout(() => {
                    this.showMusicPrompt();
                }, 1000);
            });
        }
    }

    stopBackgroundMusic() {
        if (this.backgroundMusic) {
            this.backgroundMusic.pause();
            this.backgroundMusic.currentTime = 0;
        }
    }

    toggleMusic() {
        this.musicEnabled = !this.musicEnabled;
        localStorage.setItem('musicEnabled', this.musicEnabled);
        
        if (this.musicEnabled) {
            this.playBackgroundMusic();
        } else {
            this.stopBackgroundMusic();
        }
    }

    setVolume(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
        localStorage.setItem('musicVolume', this.volume);
        if (this.backgroundMusic) {
            this.backgroundMusic.volume = this.volume;
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
