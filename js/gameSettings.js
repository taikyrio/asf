
class GameSettings {
    static toggleMusic() {
        if (typeof musicSystem !== 'undefined') {
            musicSystem.toggleMusic();
        }
    }

    static setVolume(value) {
        const volume = value / 100;
        if (typeof musicSystem !== 'undefined') {
            musicSystem.setVolume(volume);
        }
        // Update the display
        const volumeDisplay = document.querySelector('[style*="min-width: 35px"]');
        if (volumeDisplay) {
            volumeDisplay.textContent = `${Math.round(volume * 100)}%`;
        }
    }

    static showCredits() {
        showEvent({
            title: '🎬 Credits',
            body: `
            <div style="text-align: center; padding: 20px;">
                <h3 style="color: var(--primary-color); margin-bottom: 20px;">LifeWay</h3>
                
                <div style="margin-bottom: 20px;">
                    <h4 style="color: var(--secondary-color); margin-bottom: 10px;">Development Team</h4>
                    <p><strong>Game Developer:</strong> AciddGames</p>
                    <p><strong>Original Concept:</strong> Life Simulation</p>
                    <p><strong>Enhanced by:</strong> Replit Assistant</p>
                </div>

                <div style="margin-bottom: 20px;">
                    <h4 style="color: var(--secondary-color); margin-bottom: 10px;">Special Thanks</h4>
                    <p>Thanks to the life simulation gaming community</p>
                    <p>Inspired by games like BitLife and InstLife</p>
                </div>

                <div class="option" onclick="closeEvent()">Close</div>
            </div>
            `
        });
    }
}iv>

                <div style="margin-bottom: 20px;">
                    <h4 style="color: var(--secondary-color); margin-bottom: 10px;">Special Thanks</h4>
                    <p>Font Awesome for icons</p>
                    <p>Google Fonts for typography</p>
                    <p>Replit for hosting platform</p>
                </div>
            </div>
            <div class="option" onclick="closeEvent()">Close</div>
            `
        });
    }
}iv>

                <div style="margin-bottom: 20px;">
                    <h4 style="color: var(--secondary-color); margin-bottom: 10px;">Music</h4>
                    <p>Background Music: "New Composition #336"</p>
                    <p>Composed for LifeWay</p>
                </div>

                <div style="font-size: 12px; color: var(--text-muted); margin-top: 20px;">
                    <p>Version 1.0.0</p>
                    <p>Built with ❤️ for life simulation enthusiasts</p>
                </div>
            </div>
            <div class="option" onclick="closeEvent()">Close Credits</div>
            `
        });
    }
}
