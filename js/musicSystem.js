// Music system disabled per user request
class MusicSystem {
    constructor() {
        this.musicEnabled = false;
        this.isInitialized = true;
        console.log('Music system disabled');
    }

    async initializeMusic() {
        try {
            this.backgroundMusic = null;
            console.log('Music system disabled');
        } catch (error) {
            console.error('Music system error:', error);
        }
    }

    playBackgroundMusic() {
        // Music disabled
        return false;
    }

    stopBackgroundMusic() {
        // Music disabled
        return false;
    }

    toggleMusic() {
        console.log('Music system is disabled');
    }

    setVolume(volume) {
        // Music disabled
        return false;
    }

    handleAudioError() {
        // Music disabled
    }

    cleanup() {
        // Music disabled
    }

    showMusicPrompt() {
        // Music disabled
    }

    enableMusicFromPrompt() {
        console.log('Music system is disabled');
    }
}

// Initialize music system (disabled)
const musicSystem = new MusicSystem();