const ageButton = document.getElementById("age-btn");

let modalBackground = document.getElementById("modal-background");
let eventBox = document.getElementById("event-box");
let eventTitle = document.getElementById("event-title");
let eventBody = document.getElementById("event-body");
let options = document.getElementsByClassName("option");

let textContainer = document.getElementById("text-container");

let year = Math.round(Math.random() * 20) + 2000;

//this is when you customize your character
const updateCareerButtonState = () => {
    const careerButton = document.getElementById("career-button");
    if (careerButton && player) {
        if (player.age < 18) {
            careerButton.classList.add("disabled");
            careerButton.title = "Career options unlock at age 18";
        } else {
            careerButton.classList.remove("disabled");
            careerButton.title = "Career options";
        }
    }
};

const handleCareerClick = () => {
    if (!player || player.age < 18) {
        showEvent({
            title: "Career Locked",
            body: '<p>You must be at least 18 years old to access career options.</p><div class="option" onclick="closeEvent()">OK</div>',
        });
        return;
    }

    if (typeof menu !== "undefined" && menu.job) {
        menu.job();
    }
};

const displayCustomization = () => {
    const characterScreen = document.getElementById("create-character-screen");
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
    </div>
    `;
    //these two prevent typing white spaces in the inputs
    const inputName = document.getElementById("name");
    inputName.addEventListener("input", (e) => {
        e.target.value = e.target.value = e.target.value.replace(/\W|\d/, "");
    });

    const inputSurname = document.getElementById("surname");
    inputSurname.addEventListener("input", (e) => {
        e.target.value = e.target.value = e.target.value.replace(/\W|\d/, "");
    });
};

//called after dying
// Splash screen and menu system
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        document.getElementById("splash-screen").style.display = "none";
        document.getElementById("main-menu-screen").style.display = "flex";
    }, 3000);
});

const showCharacterCreation = () => {
    document.getElementById("main-menu-screen").style.display = "none";
    document.getElementById("create-character-screen").style.display = "flex";
};

const backToMainMenu = () => {
    document.getElementById("create-character-screen").style.display = "none";
    document.getElementById("main-menu-screen").style.display = "flex";
};

const showSettings = () => {
    // Placeholder for settings menu
    alert("Settings menu coming soon!");
};

const showAbout = () => {
    // Show about dialog
    showEvent({
        title: "About LifeWay",
        body: `
        <div style="text-align: center; padding: 10px;">
            <h3>LifeWay</h3>
            <p><strong>Developed by:</strong> AciddGames</p>
            <p><strong>Version:</strong> 1.0.0</p>
            <br>
            <p>A comprehensive life simulation game where you can live, work, and make choices that shape your virtual life.</p>
            <br>
            <p>Experience the journey from birth to old age, build relationships, pursue careers, and create your own unique story.</p>
        </div>
        <div class="option" onclick="closeEvent()">Close</div>
        `,
    });
};

const newLife = () => {
    const deathScreen = document.getElementById("death-screen");
    const mainMenu = document.getElementById("main-menu-screen");
    textContainer.innerHTML = "";

    deathScreen.style.display = "none";
    mainMenu.style.display = "flex";
};
const deathScreen = () => {
    const ageBtnContainer = document.getElementById("age-btn-container");
    ageBtnContainer.innerHTML = `
    <button id="age-btn" onclick="annualChanges()">Age</button>
    `;

    const obituaryContainer = document.getElementById("obituary-container");

    const siblingLength = player.relationships.siblings.length;
    const dadName = player.relationships.parents[0].fullName;
    const momName = player.relationships.parents[1].fullName;
    const pronoun = player.gender === "male" ? "He" : "She";

    obituaryContainer.innerHTML = `
    <p>${player.fullName} was born in ${player.birthplace} at year ${year - player.age}. ${pronoun} was son of ${dadName} and ${momName}${siblingLength !== 0 ? `, ${player.gender === "male" ? "brother" : "sister"} of ${siblingLength} ${siblingLength > 1 ? "persons" : "person"}.` : "."}</p><br>
    `;

    if (player.cv.length !== 0) {
        obituaryContainer.innerHTML += `<h4 class="yellow">He worked as:</h4>
        ${cvListifier(player)}<br>
        `;
    } else
        obituaryContainer.innerHTML += `<p>${pronoun} never got a job.</p><br>`;

    obituaryContainer.innerHTML += `<p>${pronoun} left this world with ${moneyFormat(player.money.total)} $ on his bank account. ${player.inventory.houses.length !== 0 ? `${pronoun} had ${player.inventory.houses.length} properties.` : `${pronoun} was homeless.`}</p><br>`;

    obituaryContainer.innerHTML += `
    <h3 class="yellow">Criminal record: </h3>
    <ul>
    <li><b class="yellow">Murder: </b>${player.criminalRecord.murder}</li>
    <li><b class="yellow">Murder attempts:</b>${player.criminalRecord.murderAttempts}</li>
    </ul><br>
    `;

    obituaryContainer.innerHTML += `
    <p>${pronoun} passed away at age of ${player.age} ${player.deathCause} in ${player.location}</p>
    `;

    document.getElementById("death-screen").style.display = "block";
};

const annualChanges = () => {
    try {
        // Check if required global variables exist
        if (typeof player === "undefined" || !player) {
            console.error("Player not defined");
            return;
        }

        if (typeof textContainer === "undefined" || !textContainer) {
            console.error("Text container not defined");
            return;
        }

        if (typeof year === "undefined") {
            console.error("Year not defined");
            return;
        }

        // Simple aging system if gameState is not available
        if (typeof window.gameState === "undefined" || !window.gameState) {
            console.warn("Using fallback aging system - gameState not available");

            // Basic aging
            player.age++;
            year++;

            // Update text container
            textContainer.innerHTML += `
                <p><span class="yellow">${year} - ${player.age} years old</span></p>
            `;

            // Basic stat changes with error checking
            try {
                if (typeof statsChanges === "function") {
                    statsChanges();
                }
            } catch (e) {
                console.error("Error in statsChanges:", e);
            }

            // Update finances if available
            try {
                if (player.money && typeof player.money.income === "number" && typeof player.money.expenses === "number") {
                    player.money.total += player.money.income - player.money.expenses;
                }
            } catch (e) {
                console.error("Error updating finances:", e);
            }

            // Update UI
            try {
                if (typeof moneyViewer === "function") {
                    moneyViewer();
                }
                if (typeof scrolldown === "function") {
                    scrolldown(textContainer);
                }
                updateCareerButtonState();
            } catch (e) {
                console.error("Error updating UI:", e);
            }

            return;
        }

        let state = window.gameState.getState();
        if (!state) {
            throw new Error("Game state is empty");
        }
        
        // Initialize game state if it's empty or missing required data
        if (!state.characters || state.characters.length === 0) {
            console.warn("Game state characters empty, initializing with current game data");
            
            // Initialize with global characters array if available
            if (typeof characters !== 'undefined' && Array.isArray(characters) && characters.length > 0) {
                // Ensure player has characterIndex if not already set
                if (player && typeof player.characterIndex === 'undefined') {
                    player.characterIndex = characters.findIndex(char => char === player);
                    if (player.characterIndex === -1) {
                        player.characterIndex = 0; // Default to first character
                    }
                }
                
                const initialState = {
                    year: year || state.year,
                    characters: [...characters],
                    player: player ? { characterIndex: player.characterIndex } : null
                };
                
                window.gameState.setState(initialState);
                state = window.gameState.getState();
                console.log("Game state initialized with player index:", player ? player.characterIndex : 'none');
            } else {
                throw new Error("No character data available to initialize game state");
            }
        }

        // Validate required state properties
        if (typeof state.year !== "number") {
            throw new Error("Invalid year in game state");
        }
        if (!Array.isArray(state.characters)) {
            throw new Error("Invalid characters array in game state");
        }
        if (!state.player) {
            throw new Error("Player not found in game state");
        }

        const updates = {
            year: state.year + 1,
            characters: state.characters.map((person) => {
                if (!person) {
                    console.warn("Found null/undefined character in state");
                    return person;
                }
                if (person.alive) {
                    person.age++;
                }
                return person;
            }),
        };

        // Update game state
        if (!window.gameState.setState(updates)) {
            throw new Error("Failed to update game state");
        }

        // Simplified player lookup - use the global player directly
        let currentPlayer = player;
        
        // Verify player exists
        if (!currentPlayer) {
            throw new Error("Global player object not available");
        }
        
        // Make sure the player is at the correct index in state.characters
        if (state.characters.length > 0) {
            // Update the player reference in the characters array
            const playerIndex = player.characterIndex || 0;
            if (playerIndex < state.characters.length) {
                state.characters[playerIndex] = player;
            }
        }
        
        console.log("Using global player object directly")

        // Handle pregnancy for all characters
        if (typeof pregnancyHandler === "function") {
            state.characters.forEach((person) => {
                try {
                    if (person && person.alive) {
                        pregnancyHandler(person);
                    }
                } catch (e) {
                    console.error("Error in pregnancy handler:", e);
                }
            });
        }

        // Update text container
        try {
            textContainer.innerHTML += `
                <p><span class="yellow">${state.year} - ${currentPlayer.age} years old</span></p>
            `;
        } catch (e) {
            console.error("Error updating text container:", e);
        }

        // Handle deaths with error checking
        if (typeof randomDeath === "function") {
            state.characters.forEach((person) => {
                try {
                    if (person) {
                        randomDeath(person);
                    }
                } catch (e) {
                    console.error("Error in random death handler:", e);
                }
            });
        }

        // Update UI elements with error checking
        try {
            if (typeof lifeStageDisplayer === "function") {
                lifeStageDisplayer();
            }
            if (typeof specificEvents === "function") {
                specificEvents();
            }
        } catch (e) {
            console.error("Error updating UI elements:", e);
        }

        // Random world events with error checking
        try {
            if (typeof worldEventsAmount !== "undefined" && typeof worldEventsMethodArr !== "undefined") {
                if (Math.floor(Math.random() * 10) === 5) {
                    const eventIndex = Math.floor(Math.random() * worldEventsAmount);
                    const eventMethod = worldEventsMethodArr[eventIndex];
                    if (Array.isArray(eventMethod) && typeof eventMethod[1] === "function") {
                        textContainer.innerHTML += `<p>${eventMethod[1]()}</p>`;
                    }
                }
            }
        } catch (e) {
            console.error("Error handling world events:", e);
        }

        // Update player's finances with validation
        try {
            if (currentPlayer.money && 
                typeof currentPlayer.money.income === "number" &&
                typeof currentPlayer.money.expenses === "number") {
                currentPlayer.money.total += currentPlayer.money.income - currentPlayer.money.expenses;
            } else {
                console.warn("Invalid money values:", currentPlayer.money);
            }
        } catch (e) {
            console.error("Error updating finances:", e);
        }

        // Handle job performance with validation
        try {
            if (currentPlayer.job && currentPlayer.job !== "none") {
                const random = Math.round(Math.random());
                if (random === 0) {
                    currentPlayer.job.performance += Math.floor(Math.random() * 5);
                } else {
                    currentPlayer.job.performance -= Math.floor(Math.random() * 5);
                }
            }
        } catch (e) {
            console.error("Error handling job performance:", e);
        }

        // Handle music career with error checking
        try {
            if (currentPlayer.musicCareer && currentPlayer.musicCareer.active && typeof handleMusicCareerProgression === "function") {
                handleMusicCareerProgression();
            }
        } catch (e) {
            console.error("Error in music career progression:", e);
        }

        // Handle education and careers with error checking
        try {
            if (typeof studyingProcess === "function") {
                studyingProcess(textContainer);
            }
            if (currentPlayer.job && currentPlayer.job !== "none" && typeof currentPlayer.job.buff === "function") {
                currentPlayer.job.buff(currentPlayer);
            }
            if (currentPlayer.currentCareer && 
                currentPlayer.currentCareer.studying && 
                typeof currentPlayer.currentCareer.buff === "function") {
                currentPlayer.currentCareer.buff(currentPlayer);
            }
        } catch (e) {
            console.error("Error handling education/careers:", e);
        }

        // Update stats with error checking
        try {
            if (typeof statsChanges === "function") {
                statsChanges();
            }
            if (typeof statsBuffer === "function") {
                statsBuffer();
            }
            if (typeof statsLimit === "function") {
                statsLimit(currentPlayer);
            }
            if (typeof handleStatBars === "function") {
                handleStatBars(currentPlayer, true);
            }
            if (typeof skillLeveler === "function") {
                skillLeveler();
            }
        } catch (e) {
            console.error("Error updating stats:", e);
        }

        // Update UI with error checking
        try {
            if (typeof scrolldown === "function") {
                scrolldown(textContainer);
            }
            if (typeof moneyViewer === "function") {
                moneyViewer();
            }
            if (typeof resetAvaibleActions === "function") {
                resetAvaibleActions();
            }
            if (typeof randomizeHouseStats === "function") {
                randomizeHouseStats();
            }
            if (typeof prisonHandler === "function") {
                prisonHandler(currentPlayer);
            }
            if (typeof eventsHandler === "function") {
                eventsHandler();
            }
            updateCareerButtonState();
        } catch (e) {
            console.error("Error updating UI:", e);
        }

        // Save game after annual changes
        try {
            if (typeof SaveSystem !== "undefined" && SaveSystem.saveGame) {
                SaveSystem.saveGame();
            }
        } catch (e) {
            console.error("Error saving game:", e);
        }
    } catch (error) {
        console.error("Error in annual changes:", error);
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
        if (typeof EnhancedUI !== "undefined" && EnhancedUI.showNotification) {
            EnhancedUI.showNotification(`Error: ${error.message}`, "error");
        }
    }
};

const handleMusicCareerProgression = () => {
    // Check for records finishing production
    player.musicCareer.records.forEach((record) => {
        if (record.inProduction && year >= record.releaseYear) {
            record.inProduction = false;
            const success = Math.floor(
                (player.stats.music / 100) * 100 + Math.random() * 50,
            );
            const sales = Math.floor(
                success * player.musicCareer.totalFans * 0.1,
            );
            const earnings =
                sales *
                (record.type === "single" ? 1 : record.type === "ep" ? 3 : 8);

            player.musicCareer.totalEarnings += earnings;
            player.money.total += earnings;

            // Fan growth based on success
            const fanGrowth = Math.floor(
                success * (player.stats.music / 100) * 50,
            );
            player.musicCareer.totalFans += fanGrowth;

            textContainer.innerHTML += `<p>My ${record.type} "${record.name}" was released! It earned $${earnings.toLocaleString()} and gained ${fanGrowth} fans</p>`;
        }
    });

    // Random music events
    if (Math.random() < 0.1 && player.musicCareer.totalFans > 100) {
        const eventTypes = ["concert", "interview", "collaboration"];
        const eventType =
            eventTypes[Math.floor(Math.random() * eventTypes.length)];

        switch (eventType) {
            case "concert":
                const concertEarnings = Math.floor(
                    player.musicCareer.totalFans * 0.3,
                );
                player.money.total += concertEarnings;
                player.musicCareer.totalEarnings += concertEarnings;
                textContainer.innerHTML += `<p>I performed a concert and earned $${concertEarnings.toLocaleString()}</p>`;
                break;
            case "interview":
                const fanIncrease = Math.floor(
                    player.musicCareer.totalFans * 0.05,
                );
                player.musicCareer.totalFans += fanIncrease;
                textContainer.innerHTML += `<p>I gave an interview and gained ${fanIncrease} new fans</p>`;
                break;
            case "collaboration":
                if (player.stats.music < 90) {
                    player.stats.music += Math.floor(Math.random() * 3) + 1;
                    textContainer.innerHTML += `<p>I collaborated with another artist and improved my music skills</p>`;
                }
                break;
        }
    }
};

const closeMenu = document.getElementById("close-menu");
closeMenu.addEventListener("click", (e) => {
    menuTemplate.style.display = "none";
});

// GameSystem is defined in gameSystem.js - no need to redefine here