const ageButton = document.getElementById('age-btn');

let modalBackground = document.getElementById('modal-background');
let eventBox = document.getElementById('event-box');
let eventTitle = document.getElementById('event-title');
let eventBody = document.getElementById('event-body')
let options = document.getElementsByClassName('option')

let textContainer = document.getElementById('text-container');

let year = Math.round(Math.random() * 20) + 2000;


//this is when you customize your character
const displayCustomization = () => {
    const characterScreen = document.getElementById('create-character-screen');
    characterScreen.innerHTML = `
    <h1>Customize your character</h1>
    <div class="input-group">
        <label>Name</label>
        <input id="name" type="text" autocomplete="off">

        <label>Surname</label>
        <input id="surname" type="text" autocomplete="off">

        <label>Age</label>
        <input min="0" max="70" id="age" type="number">

        <label>Gender</label>
        <select id="gender">
            <option value="male">Male</option>
            <option value="female">Female</option>
        </select>

        <label>Nationality</label>
        <select id="nationality" value="american">
            ${nationalityList()}
        </select>

        <label>Money</label>
        <input min="0" step="10000" id="money" type="number">
        <button onclick="customCharacter()" class="create-btn">Create</button>
        
        ${SaveSystem.hasSavedGame() ? '<button onclick="loadSavedGame()" class="create-btn" style="background-color: #4CAF50; border-color: #4CAF50;">Continue Saved Game</button>' : ''}
    </div>
    `
    //these two prevent typing white spaces in the inputs
    const inputName = document.getElementById('name');
    inputName.addEventListener('input', e => {
        e.target.value = e.target.value = e.target.value.replace(/\W|\d/, '')
    })

    const inputSurname = document.getElementById('surname');
    inputSurname.addEventListener('input', e => {
        e.target.value = e.target.value = e.target.value.replace(/\W|\d/, '')
    })
}

//called after dying
const newLife = () => {
    const deathScreen = document.getElementById('death-screen');
    const characterScreen = document.getElementById('create-character-screen')
    textContainer.innerHTML = ''

    deathScreen.style.display = 'none'
    characterScreen.style.display = 'block'
    
    // Update character screen with save/load options
    const menu = document.getElementById('create-character-screen')
    menu.innerHTML = `
        <h1>Choose how will you create your character</h1>
        <div id="buttons-container">
            <button class="create-btn" onclick="randomCharacter()">Random</button>
            <button class="create-btn" onclick="displayCustomization()">Custom</button>
            ${SaveSystem.hasSavedGame() ? '<button class="create-btn" style="background-color: #4CAF50; border-color: #4CAF50;" onclick="loadSavedGame()">Continue Saved Game</button>' : ''}
        </div>
        
        <div style="margin-top: 30px; text-align: center;">
            <p class="yellow">Achievements: ${AchievementSystem.getUnlockedCount()}/${AchievementSystem.getTotalCount()}</p>
            <button class="create-btn" onclick="showAchievements()" style="font-size: 18px; padding: 8px 20px;">View Achievements</button>
        </div>
    `
}

const loadSavedGame = () => {
    try {
        if (typeof SaveSystem !== 'undefined' && SaveSystem.loadGame()) {
            const characterScreen = document.getElementById('create-character-screen');
            if (characterScreen) {
                characterScreen.style.display = 'none';
            }
            if (typeof EnhancedUI !== 'undefined') {
                EnhancedUI.showNotification('Game loaded successfully!', 'success');
            }
            // Refresh the UI after loading
            if (typeof interfaceLoading === 'function') {
                interfaceLoading();
            }
        } else {
            if (typeof EnhancedUI !== 'undefined') {
                EnhancedUI.showNotification('No saved game found!', 'warning');
            }
        }
    } catch (error) {
        console.error('Error loading game:', error);
        if (typeof EnhancedUI !== 'undefined') {
            EnhancedUI.showNotification('Failed to load game!', 'error');
        }
    }
}

const showAchievements = () => {
    try {
        if (typeof AchievementSystem === 'undefined') {
            if (typeof EnhancedUI !== 'undefined') {
                EnhancedUI.showNotification('Achievement system not loaded!', 'error');
            }
            return;
        }
        
        const achievementsList = Object.entries(AchievementSystem.achievements)
            .map(([key, achievement]) => 
                `<div style="margin: 12px 0; padding: 16px; background: ${achievement.unlocked ? 'rgba(52, 199, 89, 0.2)' : 'rgba(255, 255, 255, 0.1)'}; border-radius: 12px; border: 1px solid ${achievement.unlocked ? '#34C759' : 'rgba(255, 255, 255, 0.2)'};">
                    <strong style="display: flex; align-items: center; gap: 8px;">
                        <span style="font-size: 20px;">${achievement.unlocked ? '🏆' : '🔒'}</span>
                        ${achievement.name}
                    </strong>
                    <p style="margin-top: 8px; color: rgba(255, 255, 255, 0.8); font-size: 14px;">${achievement.description}</p>
                </div>`
            ).join('');
        
        if (typeof createStoryEvent === 'function') {
            createStoryEvent({
                title: '🏆 Achievements',
                body: (id) => `
                    <div style="max-height: 400px; overflow-y: auto;">
                        <div style="text-align: center; margin-bottom: 16px; padding: 12px; background: rgba(255, 255, 255, 0.1); border-radius: 8px;">
                            <strong>Progress: ${AchievementSystem.getUnlockedCount()}/${AchievementSystem.getTotalCount()}</strong>
                        </div>
                        ${achievementsList}
                    </div>
                    <div class="option" onclick="closeStoryEvent('${id}')">Close</div>
                `
            });
        }
    } catch (error) {
        console.error('Error showing achievements:', error);
        if (typeof EnhancedUI !== 'undefined') {
            EnhancedUI.showNotification('Error loading achievements!', 'error');
        }
    }
}

// Fix the incomplete function at the end
const interfaceEnhancements = () => {
    // Add smooth transitions to all interactive elements
    document.querySelectorAll('.btn, .option, .create-btn, .rectangular-btn').forEach(element => {
        element.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    });
    
    // Add hover effects to stat bars
    document.querySelectorAll('.bar').forEach(bar => {
        bar.addEventListener('mouseenter', () => {
            bar.style.transform = 'scale(1.02)';
        });
        bar.addEventListener('mouseleave', () => {
            bar.style.transform = 'scale(1)';
        });
    });
    
    // Enhance money container click feedback
    const moneyContainer = document.getElementById('money-container');
    if (moneyContainer) {
        moneyContainer.addEventListener('click', () => {
            if (typeof EnhancedUI !== 'undefined') {
                EnhancedUI.hapticFeedback('light');
            }
        });
    }
    
    // Add loading states to buttons
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}
const deathScreen = () => {
    const ageBtnContainer = document.getElementById('age-btn-container');
    ageBtnContainer.innerHTML = `
    <button id="age-btn" onclick="annualChanges()">Age</button>
    `

    const obituaryContainer = document.getElementById('obituary-container');

    const siblingLength = player.relationships.siblings.length;
    const dadName = player.relationships.parents[0].fullName
    const momName = player.relationships.parents[1].fullName
    const pronoun = player.gender === 'male' ? 'He' : 'She'

    obituaryContainer.innerHTML = `
    <p>${player.fullName} was born in ${player.birthplace} at year ${year - player.age}. ${pronoun} was son of ${dadName} and ${momName}${siblingLength !== 0 ? `, ${player.gender === 'male' ? 'brother' : 'sister'} of ${siblingLength} ${siblingLength > 1 ? 'persons' : 'person'}.` : '.'}</p><br>
    `

    if (player.cv.length !== 0) {
        obituaryContainer.innerHTML += `<h4 class="yellow">He worked as:</h4>
        ${cvListifier(player)}<br>
        `
    } else obituaryContainer.innerHTML += `<p>${pronoun} never got a job.</p><br>`

    obituaryContainer.innerHTML += `<p>${pronoun} left this world with ${moneyFormat(player.money.total)} $ on his bank account. ${player.inventory.houses.length !== 0 ? `${pronoun} had ${player.inventory.houses.length} properties.` : `${pronoun} was homeless.`}</p><br>`

    obituaryContainer.innerHTML += `
    <h3 class="yellow">Criminal record: </h3>
    <ul>
    <li><b class="yellow">Murder: </b>${player.criminalRecord.murder}</li>
    <li><b class="yellow">Murder attempts:</b>${player.criminalRecord.murderAttempts}</li>
    </ul><br>
    `

    obituaryContainer.innerHTML += `
    <p>${pronoun} passed away at age of ${player.age} ${player.deathCause} in ${player.location}</p>
    `

    document.getElementById('death-screen').style.display = 'block'
}

const annualChanges = () => {
    year++;
    for (let person of characters) {
        if (person.alive) person.age++;
        pregnancyHandler(person)
    }

    textContainer.innerHTML += `
    <p><span class="yellow">${year} - ${player.age} years old</span></p>
    `

    //death possibility
    for (let person of characters) {
        randomDeath(person)
    }

    // shows if player is in the stage of childhood, adulthood or elderhood
    lifeStageDisplayer()

    //this is for events such as first words and university
    specificEvents()

    //random messages
    if (Math.floor(Math.random() * 10) === 5)
        textContainer.innerHTML += `<p>${worldEventsMethodArr[Math.floor(Math.random() * worldEventsAmount)][1]()}</p>`

    player.money.total += player.money.income - player.money.expenses

    // job related stats
    if (player.job !== 'none') {
        const random = Math.round(Math.random())
        if (random === 0)
            player.job.performance += Math.floor(Math.random() * 5)
        else
            player.job.performance -= Math.floor(Math.random() * 5)
    }

    // for university
    studyingProcess(textContainer)
    if(player.job != 'none') player.job.buff(player)
    if(player.currentCareer.studying) player.currentCareer.buff(player);
    statsChanges()
    statsBuffer()
    statsLimit(player)
    handleStatBars(player, true);
    skillLeveler()

    //scroll handling
    scrolldown(textContainer)

    //displaying flow of money
    moneyViewer()

    resetAvaibleActions()

    randomizeHouseStats()
    prisonHandler(player)
    eventsHandler()
}

const closeMenu = document.getElementById('close-menu');
closeMenu.addEventListener('click', e => {
    menuTemplate.style.display = 'none'
})