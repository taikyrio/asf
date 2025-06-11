
class SaveSystem {
    static saveGame() {
        const gameData = {
            player: player,
            characters: characters,
            year: year,
            timestamp: Date.now(),
            version: "1.0"
        };
        
        localStorage.setItem('lifeSimulatorSave', JSON.stringify(gameData));
        return true;
    }
    
    static loadGame() {
        const savedData = localStorage.getItem('lifeSimulatorSave');
        if (!savedData) return false;
        
        try {
            const gameData = JSON.parse(savedData);
            
            // Restore game state
            characters = gameData.characters;
            player = characters.find(char => char.characterIndex === gameData.player.characterIndex);
            year = gameData.year;
            
            // Restore UI
            handleStatBars(player, true);
            lifeStageDisplayer();
            moneyViewer();
            
            // Restore text container
            textContainer.innerHTML = '';
            textContainer.innerHTML += `<p><span class="yellow">Game loaded successfully!</span></p><p><span class="yellow">${year} - ${player.age} years old</span></p>`;
            
            return true;
        } catch (error) {
            console.error('Failed to load game:', error);
            return false;
        }
    }
    
    static deleteSave() {
        localStorage.removeItem('lifeSimulatorSave');
    }
    
    static hasSavedGame() {
        return localStorage.getItem('lifeSimulatorSave') !== null;
    }
}

// Auto-save every year
const originalAnnualChanges = annualChanges;
window.annualChanges = function() {
    originalAnnualChanges();
    SaveSystem.saveGame();
}
