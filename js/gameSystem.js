class GameSystem {
    static saveGame() {
        if (typeof SaveSystem !== 'undefined' && SaveSystem.saveGame) {
            try {
                SaveSystem.saveGame();
                showEvent({
                    title: '💾 Game Saved',
                    body: `
                    <div style="text-align: center; padding: 10px;">
                        <i class="fa-solid fa-check-circle" style="font-size: 48px; color: var(--success-color); margin-bottom: 16px;"></i>
                        <p>Your progress has been saved successfully!</p>
                    </div>
                    <div class="option" onclick="closeEvent()">Continue Playing</div>
                    `
                });
                menuTemplate.style.display = 'none';
            } catch (error) {
                console.error('Save failed:', error);
                showEvent({
                    title: '❌ Save Failed',
                    body: `
                    <div style="text-align: center; padding: 10px;">
                        <p>Failed to save the game. Please try again.</p>
                    </div>
                    <div class="option" onclick="closeEvent()">OK</div>
                    `
                });
            }
        } else {
            showEvent({
                title: '❌ Save Unavailable',
                body: `
                <div style="text-align: center; padding: 10px;">
                    <p>Save system is not available right now.</p>
                </div>
                <div class="option" onclick="closeEvent()">OK</div>
                `
            });
        }
    }

    static loadGame() {
        try {
            const savedData = localStorage.getItem('lifeway_save');
            if (savedData) {
                const gameData = JSON.parse(savedData);
                player = gameData.player;
                characters = gameData.characters;
                year = gameData.year;
                showEvent({
                    title: '📂 Game Loaded',
                    body: `
                    <div style="text-align: center; padding: 10px;">
                        <p>Your saved game has been loaded successfully!</p>
                    </div>
                    <div class="option" onclick="closeEvent()">Continue Playing</div>
                    `
                });
            } else {
                showEvent({
                    title: '❌ No Save Found',
                    body: `
                    <div style="text-align: center; padding: 10px;">
                        <p>No saved game found.</p>
                    </div>
                    <div class="option" onclick="closeEvent()">OK</div>
                    `
                });
            }
        } catch (error) {
            console.error('Load failed:', error);
            showEvent({
                title: '❌ Load Failed',
                body: `
                <div style="text-align: center; padding: 10px;">
                    <p>Failed to load the game.</p>
                </div>
                <div class="option" onclick="closeEvent()">OK</div>
                `
            });
        }
    }

    static backToMainMenu() {
        showEvent({
            title: '🏠 Return to Main Menu',
            body: `
            <div style="text-align: center; padding: 10px;">
                <p><strong>Warning!</strong></p>
                <p>Going back to the main menu will end your current life. Make sure to save your progress first!</p>
                <br>
                <p>Do you want to continue?</p>
            </div>
            <div class="option" onclick="GameSystem.confirmBackToMenu()" style="background: var(--danger-color); color: white;">Yes, Go to Menu</div>
            <div class="option" onclick="closeEvent()">Cancel</div>
            `
        });
        menuTemplate.style.display = 'none';
    }

    static confirmBackToMenu() {
        // Hide all game elements
        document.querySelector('main').style.display = 'none';
        document.getElementById('navbar').style.display = 'none';
        document.getElementById('death-screen').style.display = 'none';
        document.getElementById('create-character-screen').style.display = 'none';

        // Show main menu
        document.getElementById('main-menu-screen').style.display = 'flex';

        // Close any open modals
        closeEvent();

        // Reset text container
        if (typeof textContainer !== 'undefined') {
            textContainer.innerHTML = '';
        }

        // Reset game state if needed
        if (typeof characters !== 'undefined') {
            characters = [];
        }
        if (typeof player !== 'undefined') {
            player = null;
        }
    }

    static loadGame() {
        if (typeof SaveSystem !== 'undefined' && SaveSystem.hasSavedGame && SaveSystem.hasSavedGame()) {
            try {
                if (SaveSystem.loadGame()) {
                    // Hide main menu and show game
                    document.getElementById('main-menu-screen').style.display = 'none';
                    document.querySelector('main').style.display = 'flex';
                    document.getElementById('navbar').style.display = 'flex';

                    showEvent({
                        title: '✅ Game Loaded',
                        body: `
                        <div style="text-align: center; padding: 10px;">
                            <i class="fa-solid fa-check-circle" style="font-size: 48px; color: var(--success-color); margin-bottom: 16px;"></i>
                            <p>Your saved game has been loaded successfully!</p>
                        </div>
                        <div class="option" onclick="closeEvent()">Continue Playing</div>
                        `
                    });
                    return true;
                } else {
                    throw new Error('Load failed');
                }
            } catch (error) {
                console.error('Load failed:', error);
                showEvent({
                    title: '❌ Load Failed',
                    body: `
                    <div style="text-align: center; padding: 10px;">
                        <p>Failed to load the saved game. The save file might be corrupted.</p>
                    </div>
                    <div class="option" onclick="closeEvent()">OK</div>
                    `
                });
            }
        } else {
            showEvent({
                title: '📁 No Save Found',
                body: `
                <div style="text-align: center; padding: 10px;">
                    <i class="fa-solid fa-folder-open" style="font-size: 48px; color: var(--text-muted); margin-bottom: 16px;"></i>
                    <p>No saved game found. Start a new life to begin playing!</p>
                </div>
                <div class="option" onclick="closeEvent()">OK</div>
                `
            });
        }
        return false;
    }
}