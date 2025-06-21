const ageButton = document.getElementById("age-btn");

let modalBackground = document.getElementById("modal-background");
let eventBox = document.getElementById("event-box");
let eventTitle = document.getElementById("event-title");
let eventBody = document.getElementById("event-body");
let options = document.getElementsByClassName("option");

let textContainer = document.getElementById("text-container");

//this is when you customize your character
const updateCareerButtonState = () => {
    const careerButton = document.getElementById("career-button");
    if (careerButton && player && typeof player.age === "number") {
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
    <div id="character-creation-content">
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
        <button class="back-btn" onclick="backToMainMenu()">
            <i class="fa-solid fa-arrow-left"></i>
            Back to Menu
        </button>
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

// Splash screen and menu system
document.addEventListener("DOMContentLoaded", () => {
    // Show splash screen first
    document.getElementById("splash-screen").style.display = "flex";

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
    showEvent({
        title: "Settings",
        body: `
        <div style="text-align: left; padding: 10px;">
            <h3>Game Settings</h3>
            <div class="setting-item">
                <label><input type="checkbox" checked> Auto-save</label>
            </div>
            <div class="setting-item">
                <label><input type="checkbox"> Sound effects</label>
            </div>
            <div class="setting-item">
                <label><input type="checkbox"> Notifications</label>
            </div>
        </div>
        <div class="option" onclick="closeEvent()">Close</div>
        `,
    });
};

const showAbout = () => {
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
    const gameScreen = document.querySelector("main");
    textContainer.innerHTML = "";

    deathScreen.style.display = "none";
    gameScreen.style.display = "none";
    mainMenu.style.display = "flex";
};

const startGameInterface = () => {
    const mainMenu = document.getElementById("main-menu-screen");
    const gameScreen = document.querySelector("main");
    const navbar = document.getElementById("navbar");

    mainMenu.style.display = "none";
    gameScreen.style.display = "flex";
    navbar.style.display = "flex";
};

const deathScreen = () => {
    const ageBtnContainer = document.getElementById("age-btn-container");
    if (ageBtnContainer) {
        ageBtnContainer.innerHTML = `
        <button id="age-btn" onclick="annualChangesInterface()">Age</button>
        `;
    }

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

const annualChangesInterface = () => {
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
            console.warn(
                "Using fallback aging system - gameState not available",
            );

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
                if (
                    player.money &&
                    typeof player.money.income === "number" &&
                    typeof player.money.expenses === "number"
                ) {
                    player.money.total +=
                        player.money.income - player.money.expenses;
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
            console.warn(
                "Game state characters empty, initializing with current game data",
            );

            // Initialize with global characters array if available
            if (
                typeof characters !== "undefined" &&
                Array.isArray(characters) &&
                characters.length > 0
            ) {
                // Ensure player has characterIndex if not already set
                if (player && typeof player.characterIndex === "undefined") {
                    player.characterIndex = characters.findIndex(
                        (char) => char === player,
                    );
                    if (player.characterIndex === -1) {
                        player.characterIndex = 0; // Default to first character
                    }
                }

                const initialState = {
                    year: year || state.year,
                    characters: [...characters],
                    player: player
                        ? { characterIndex: player.characterIndex }
                        : null,
                };

                window.gameState.setState(initialState);
                state = window.gameState.getState();
                console.log(
                    "Game state initialized with player index:",
                    player ? player.characterIndex : "none",
                );
            } else {
                throw new Error(
                    "No character data available to initialize game state",
                );
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
        if (
            currentPlayer.characterIndex !== undefined &&
            state.characters[currentPlayer.characterIndex]
        ) {
            // Update the player object with the state data
            Object.assign(
                currentPlayer,
                state.characters[currentPlayer.characterIndex],
            );
        }

        // Update global year
        year = state.year;

        // Update text container with new year
        textContainer.innerHTML += `
            <p><span class="yellow">${year} - ${currentPlayer.age} years old</span></p>
        `;

        // Handle money changes
        if (
            currentPlayer.money &&
            typeof currentPlayer.money.income === "number" &&
            typeof currentPlayer.money.expenses === "number"
        ) {
            currentPlayer.money.total +=
                currentPlayer.money.income - currentPlayer.money.expenses;
        }

        // Handle education
        if (typeof studyingProcess === "function") {
            studyingProcess(textContainer);
        }

        // Handle stats changes
        if (typeof statsBuffer === "function") {
            statsBuffer();
        }

        // Handle job performance
        if (typeof jobPerformanceHandler === "function") {
            jobPerformanceHandler();
        }

        // Handle prison
        if (typeof prisonHandler === "function") {
            prisonHandler(currentPlayer);
        }

        // Handle specific age events
        if (typeof specificEvents === "function") {
            specificEvents();
        }

        // Reset actions
        if (typeof resetAvailableActions === "function") {
            resetAvailableActions();
        }

        // Update UI
        if (typeof moneyViewer === "function") {
            moneyViewer();
        }

        if (typeof scrolldown === "function") {
            scrolldown(textContainer);
        }

        // Update career button state
        updateCareerButtonState();

        // Limit stats
        if (typeof statsLimit === "function") {
            statsLimit(currentPlayer);
        }
    } catch (error) {
        console.error("Error in annual changes:", error);

        // Fallback to basic aging if game state fails
        if (player) {
            player.age++;
            year++;

            if (textContainer) {
                textContainer.innerHTML += `
                    <p><span class="yellow">${year} - ${player.age} years old</span></p>
                `;
            }

            if (typeof moneyViewer === "function") {
                moneyViewer();
            }
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

// interfaceLoading function
const interfaceLoading = () => {
    try {
        // Update money display
        if (typeof moneyViewer === "function") {
            moneyViewer();
        }

        // Update career button
        updateCareerButtonState();

        // Initialize any UI elements
        console.log("Interface loaded successfully");
    } catch (error) {
        console.error("Error loading interface:", error);
    }
};
