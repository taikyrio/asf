class SaveSystem {
    static VERSION = "1.0";
    static SAVE_KEY = 'lifeSimulatorSave';

    static validateSaveData(data) {
        if (!data || typeof data !== 'object') return false;
        if (!data.version || data.version !== this.VERSION) return false;
        if (!Array.isArray(data.characters)) return false;
        if (typeof data.year !== 'number') return false;
        if (!data.timestamp || typeof data.timestamp !== 'number') return false;

        // Validate player data
        if (!data.player || typeof data.player !== 'object') return false;
        if (typeof data.player.age !== 'number') return false;
        if (typeof data.player.alive !== 'boolean') return false;

        return true;
    }

    static saveGame() {
        try {
            const state = gameState.getState();
            const gameData = {
                ...state,
                timestamp: Date.now()
            };

            // Validate before saving
            if (!this.validateSaveData(gameData)) {
                throw new Error("Invalid game state");
            }

            localStorage.setItem(this.SAVE_KEY, JSON.stringify(gameData));
            
            // Notify UI
            if (typeof EnhancedUI !== 'undefined') {
                EnhancedUI.showNotification('Game saved successfully!', 'success');
            }
            
            return true;
        } catch (error) {
            console.error('Save failed:', error);
            if (typeof EnhancedUI !== 'undefined') {
                EnhancedUI.showNotification('Failed to save game!', 'error');
            }
            return false;
        }
    }

    static loadGame() {
        try {
            const savedData = localStorage.getItem(this.SAVE_KEY);
            if (!savedData) {
                throw new Error('No saved game found');
            }

            const gameData = JSON.parse(savedData);
            
            // Validate loaded data
            if (!this.validateSaveData(gameData)) {
                throw new Error('Corrupted or invalid save data');
            }

            // Update game state
            if (!gameState.setState(gameData)) {
                throw new Error('Failed to update game state');
            }

            // Update UI
            handleStatBars(gameState.getState().player, true);
            lifeStageDisplayer();
            moneyViewer();
            
            // Update text container
            if (textContainer) {
                textContainer.innerHTML = '';
                textContainer.innerHTML += `<p><span class="yellow">Game loaded successfully!</span></p><p><span class="yellow">${gameData.year} - ${gameData.player.age} years old</span></p>`;
            }

            if (typeof EnhancedUI !== 'undefined') {
                EnhancedUI.showNotification('Game loaded successfully!', 'success');
            }

            return true;
        } catch (error) {
            console.error('Failed to load game:', error);
            if (typeof EnhancedUI !== 'undefined') {
                EnhancedUI.showNotification(error.message, 'error');
            }
            return false;
        }
    }

    static deleteSave() {
        try {
            localStorage.removeItem(this.SAVE_KEY);
            if (typeof EnhancedUI !== 'undefined') {
                EnhancedUI.showNotification('Save file deleted', 'success');
            }
        } catch (error) {
            console.error('Failed to delete save:', error);
            if (typeof EnhancedUI !== 'undefined') {
                EnhancedUI.showNotification('Failed to delete save file', 'error');
            }
        }
    }

    static hasSavedGame() {
        return localStorage.getItem(this.SAVE_KEY) !== null;
    }

    static getSaveInfo() {
        try {
            const savedData = localStorage.getItem(this.SAVE_KEY);
            if (!savedData) return null;

            const gameData = JSON.parse(savedData);
            return {
                version: gameData.version,
                timestamp: gameData.timestamp,
                playerAge: gameData.player.age,
                year: gameData.year
            };
        } catch (error) {
            console.error('Failed to get save info:', error);
            return null;
        }
    }
}

// Auto-save every year
const originalAnnualChanges = annualChanges;
window.annualChanges = function() {
    originalAnnualChanges();
    SaveSystem.saveGame();
}
