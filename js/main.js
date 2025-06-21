"use strict";

// Initialize global variables
window.characters = [];
let characters = window.characters;
let player;
let year = Math.round(Math.random() * 20) + 2000;

class Person {
    constructor(name, surname, age, gender, nationality, money, location) {
        this.gender = gender || genderRandomizer();
        this.nationality = nationality || countryRandomizer();
        this.language = languageQuery(this.nationality);
        this.name = name || nameRandomizer(this.language, this.gender);
        this.surname = surname || surnameRandomizer(this.language);
        this.age = age || 0;
        this.location = location || birthplaceQuery(this.nationality);
        this.birthplace = this.location;
        this.driverLicense = this.age > 18 ? true : false;

        // Initialize money total after money object is defined
        if (money) this.money.total = money;
    }

    inventory = {
        weapons: [],
        instruments: [],
        electronics: [],
        houses: [],
        cars: [],
    };

    sexuality = "heterosexual";

    stats = {
        health: randomStat(70, 30),
        happiness: randomStat(0, 100),
        smartness: randomStat(0, 100),
        fitness: randomStat(0, 35),
        appearance: randomStat(0, 100),
        music: randomStat(0, 30),
    };

    relationships = {
        parents: [],
        siblings: [],
        partner: [],
        friends: [],
        offspring: [],
    };
    alive = true;
    career = {};
    currentCareer = { studying: false };

    skills = {
        programming: {
            level: 0,
            xp: 0,
            xpNeeded: 50,
        },
        handiness: {
            level: 0,
            xp: 0,
            xpNeeded: 50,
        },
        writing: {
            level: 0,
            xp: 0,
            xpNeeded: 50,
        },
        art: {
            level: 0,
            xp: 0,
            xpNeeded: 50,
        },
        music: {
            level: 0,
            xp: 0,
            xpNeeded: 50,
        },
    };

    //activities which you pay for increasing skills and stats
    freetime = {
        isReading: false,
        isTakingMusicLessons: false,
        isAttendingParties: false,
        goesToGym: false,
    };

    job = "none";

    //in cv goes your employment history
    cv = [];

    money = {
        expenses: 0,
        income: 0,
        total: 0,
    };

    get fullName() {
        return `${this.name} ${this.surname}`;
    }

    //this is used when you want to access to certain character by using this index with the characters array
    characterIndex = characters.length;

    criminalRecord = {
        yearsInPrison: 0,
        murderAttempts: 0,
        murder: 0,
        prisonEscapes: 0,
    };

    prison = {
        yearsLeft: 0,
        sentenceTime: 0,
        jailed: false,
    };

    // this limits your actions per year
    actions = {
        programming: 0,
        writing: 0,
        workHarder: 0,
        music: 0,
        meanActions: 0,
        friendlyActions: 0,
        romanticActions: 0,
        askPromotion: 0,
    };

    socialMedia = {
        youtube: {
            created: false,
            created_at: null,
            username: null,
            videos: [],
            subscribers: 0,
        },
        instagram: {
            created: false,
            created_at: null,
            username: null,
            videos: [],
            subscribers: 0,
        },
    };
}

const createFamily = (player) => {
    const parentsAge = () => {
        let age = Math.floor(Math.random() * 40) + player.age;
        if (age - player.age < 18) age = age + 18 + player.age;
        return age;
    };

    let dad = new Person(
        undefined,
        player.surname,
        parentsAge(),
        "male",
        player.nationality,
    );
    dad.stats.relationWithPlayer = Math.floor(Math.random() * 100);
    characters.push(dad);

    let mom = new Person(
        undefined,
        undefined,
        dad.age + Math.floor(Math.random() * 10),
        "female",
        player.nationality,
    );
    mom.stats.relationWithPlayer = Math.floor(Math.random() * 100);
    characters.push(mom);

    dad.relationships.partner.push(mom);
    mom.relationships.partner.push(dad);

    player.relationships.parents.push(dad);
    player.relationships.parents.push(mom);

    let siblingsAmount = Math.floor(Math.random() * 3);

    while (siblingsAmount > 0) {
        let randomAge = Math.floor(Math.random() * 5);
        let sibling = new Person(
            undefined,
            player.surname,
            randomAge,
            undefined,
            player.nationality,
        );
        sibling.stats.relationWithPlayer = Math.floor(Math.random() * 100);
        characters.push(sibling);
        player.relationships.siblings.push(sibling);
        siblingsAmount--;
    }

    // Assign jobs to parents after they are created
    if (typeof jobAssigner === "function") {
        jobAssigner(dad);
        jobAssigner(mom);
    }
};

const firstMessage = () => {
    // Safely get parent job labels with fallbacks
    const getDadJob = () => {
        const dad = player.relationships.parents[0];
        if (dad && dad.job && typeof dad.job === "object" && dad.job.label) {
            return dad.job.label.toLowerCase();
        }
        return "unemployed";
    };

    const getMomJob = () => {
        const mom = player.relationships.parents[1];
        if (mom && mom.job && typeof mom.job === "object" && mom.job.label) {
            return mom.job.label.toLowerCase();
        }
        return "unemployed";
    };

    const textContainer = document.getElementById("text-container");
    if (textContainer) {
        textContainer.innerHTML = `
        <p><span class="yellow">${year} - ${player.age === 0 ? "birth" : `${player.age} years old`}</span></p>
        <p>My name is ${player.fullName}</p>
        <p>I was born ${player.gender} in ${player.location} on year ${year}</p>
        <p>My father is ${player.relationships.parents[0].fullName}, he works as a ${getDadJob()}</p>
        <p>My mother is ${player.relationships.parents[1].fullName}, she works as a ${getMomJob()}</p>
        `;
    }
};

// interfaceLoading function is now in interface.js to avoid duplication

//sets jobs for npcs
const jobAssigner = (characters) => {
    const findJob = (person) => {
        // Check if jobs array exists
        if (
            typeof jobs === "undefined" ||
            !Array.isArray(jobs) ||
            jobs.length === 0
        ) {
            // Fallback job structure
            person.job = {
                label: "Worker",
                salary: 30000,
            };
            person.money.income = 30000;
            return;
        }

        let randomIndex = Math.floor(Math.random() * jobs.length);
        const job = jobs[randomIndex];
        person.job = job;
        person.money.income = job.salary;

        // Check if requirementsFiller function exists
        if (typeof requirementsFiller === "function") {
            requirementsFiller(job, person);
        }
    };

    if (characters && characters.characterIndex === player.characterIndex)
        return;

    if (Array.isArray(characters)) {
        for (let person of characters) {
            if (
                person.age > 17 &&
                (person.job === "none" || typeof person.job === "string") &&
                person.characterIndex !== player.characterIndex
            ) {
                findJob(person);
            }
        }
    } else {
        let person = characters;
        if (
            person &&
            person.age > 17 &&
            (person.job === "none" || typeof person.job === "string")
        ) {
            findJob(person);
        }
    }
};

const assignNPCEducation = (characters) => {
    for (let person of characters) {
        if (person.age >= 3 && person.age < 6) {
            person.currentEducation = "preschool";
        } else if (person.age >= 6 && person.age < 12) {
            person.currentEducation = "elementary";
        } else if (person.age >= 12 && person.age < 18) {
            person.currentEducation = "highschool";
        } else if (person.age >= 18) {
            person.currentEducation = "none";
            person.career["education"] = { name: "Highschool" };
        }
    }
};

//Functions which generate player character
window.customCharacter = () => {
    const name = document.getElementById("name").value;
    const surname = document.getElementById("surname").value;
    const age = parseInt(document.getElementById("age").value);
    const gender = document.getElementById("gender").value;
    const nationality = document.getElementById("nationality").value;
    const money = parseInt(document.getElementById("money").value);

    if (!name || !surname || age < 0 || age > 70 || !money || money < 0) {
        alert("Please fill all fields correctly!");
        return;
    }

    createCharacter(name, surname, age, gender, nationality, money);
    startGame();
};

window.randomCharacter = () => {
    const genders = ["male", "female"];
    const gender = genders[Math.floor(Math.random() * genders.length)];
    const nationality = countryRandomizer();
    const age = 0;
    const money = Math.floor(Math.random() * 10000) + 1000;

    // Get random name based on nationality and gender with fallbacks
    let firstName = "John";
    let lastName = "Smith";

    try {
        const language = languageQuery(nationality);
        if (typeof names !== "undefined" && names[language]) {
            const nameData = names[language];
            if (nameData[gender] && nameData[gender].length > 0) {
                firstName =
                    nameData[gender][
                        Math.floor(Math.random() * nameData[gender].length)
                    ];
            }
            if (nameData.surnames && nameData.surnames.length > 0) {
                lastName =
                    nameData.surnames[
                        Math.floor(Math.random() * nameData.surnames.length)
                    ];
            }
        }
    } catch (error) {
        console.warn("Error generating random names, using defaults:", error);
    }

    createCharacter(firstName, lastName, age, gender, nationality, money);
    startGame();
};

const createCharacter = (name, surname, age, gender, nationality, money) => {
    try {
        // Clear any existing game data
        window.characters = [];
        characters = window.characters;

        // Ensure names data is available
        if (typeof names === "undefined") {
            window.names = {
                english: {
                    male: ["John", "James", "Michael", "William"],
                    female: ["Mary", "Patricia", "Jennifer", "Linda"],
                    surnames: ["Smith", "Johnson", "Williams", "Brown"],
                },
            };
        }

        // Create player
        player = new Person(name, surname, age, gender, nationality, money);
        window.player = player;

        // Add to characters array
        characters.push(player);
        player.characterIndex = 0;

        // Set initial year
        year = Math.round(Math.random() * 20) + 2000;
        window.year = year;

        // Generate family relationships
        createFamily(player);

        // Set initial UI
        const textContainer = document.getElementById("text-container");
        if (textContainer) {
            textContainer.innerHTML = `<p>Welcome to your new life, ${name} ${surname}!</p>`;
        }

        // Update money display
        if (typeof moneyViewer === "function") {
            moneyViewer();
        }

        // Update career button state
        if (typeof updateCareerButtonState === "function") {
            updateCareerButtonState();
        }

        console.log("Character created successfully:", player);
    } catch (error) {
        console.error("Error creating character:", error);
    }
};

const generateFamily = (person) => {
    try {
        // Generate parents
        const fatherNationality = person.nationality;
        const motherNationality = person.nationality;
        const fatherAge = person.age + (Math.floor(Math.random() * 20) + 20);
        const motherAge = person.age + (Math.floor(Math.random() * 20) + 20);

        // Safe name generation with fallbacks
        let fatherName = "John";
        let motherName = "Jane";
        let surname = person.surname || "Smith";

        try {
            const language = languageQuery(fatherNationality);
            if (typeof names !== "undefined" && names[language]) {
                const nameData = names[language];
                if (nameData.male && nameData.male.length > 0) {
                    fatherName =
                        nameData.male[
                            Math.floor(Math.random() * nameData.male.length)
                        ];
                }
                if (nameData.female && nameData.female.length > 0) {
                    motherName =
                        nameData.female[
                            Math.floor(Math.random() * nameData.female.length)
                        ];
                }
                if (nameData.surnames && nameData.surnames.length > 0) {
                    surname =
                        nameData.surnames[
                            Math.floor(Math.random() * nameData.surnames.length)
                        ];
                }
            }
        } catch (nameError) {
            console.warn("Error generating names, using defaults:", nameError);
        }

        const father = new Person(
            fatherName,
            surname,
            fatherAge,
            "male",
            fatherNationality,
        );

        const mother = new Person(
            motherName,
            person.surname,
            motherAge,
            "female",
            motherNationality,
        );

        // Set up relationships
        person.relationships.parents.push(father, mother);
        father.relationships.offspring.push(person);
        mother.relationships.offspring.push(person);
        father.relationships.partner.push(mother);
        mother.relationships.partner.push(father);

        // Add to characters array
        if (typeof characters !== "undefined") {
            characters.push(father, mother);
        }

        // Generate potential siblings
        if (Math.random() < 0.4) {
            const siblingGender = Math.random() < 0.5 ? "male" : "female";
            const siblingAge = person.age + randomStat(-5, 5);

            let siblingName = siblingGender === "male" ? "Alex" : "Sam";

            if (
                typeof names !== "undefined" &&
                names[languageQuery(person.nationality)]
            ) {
                const nameData = names[languageQuery(person.nationality)];
                if (
                    nameData[siblingGender] &&
                    nameData[siblingGender].length > 0
                ) {
                    siblingName =
                        nameData[siblingGender][
                            Math.floor(
                                Math.random() * nameData[siblingGender].length,
                            )
                        ];
                }
            }

            const sibling = new Person(
                siblingName,
                person.surname,
                Math.max(0, siblingAge),
                siblingGender,
                person.nationality,
            );

            person.relationships.siblings.push(sibling);
            sibling.relationships.siblings.push(person);
            sibling.relationships.parents.push(father, mother);
            father.relationships.offspring.push(sibling);
            mother.relationships.offspring.push(sibling);

            if (typeof characters !== "undefined") {
                characters.push(sibling);
            }
        }
    } catch (error) {
        console.error("Error generating family:", error);
        // Create minimal family structure as fallback
        const father = new Person(
            "John",
            person.surname || "Smith",
            person.age + 25,
            "male",
            person.nationality,
        );
        const mother = new Person(
            "Jane",
            person.surname || "Smith",
            person.age + 23,
            "female",
            person.nationality,
        );

        person.relationships.parents.push(father, mother);
        father.relationships.offspring.push(person);
        mother.relationships.offspring.push(person);
        father.relationships.partner.push(mother);
        mother.relationships.partner.push(father);

        if (typeof characters !== "undefined") {
            characters.push(father, mother);
        }
    }
};

const annualChanges = () => {
    if (!player) return;

    try {
        // Age the player
        player.age++;

        // Update year
        year++;

        // Handle money changes
        player.money.total =
            player.money.total + player.money.income - player.money.expenses;

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
            prisonHandler(player);
        }

        // Handle specific age events
        if (typeof specificEvents === "function") {
            specificEvents();
        }

        // Age all NPCs
        if (typeof characters !== "undefined" && Array.isArray(characters)) {
            characters.forEach((char) => {
                if (char !== player) {
                    char.age++;
                }
            });
        }

        // Reset actions
        if (typeof resetAvailableActions === "function") {
            resetAvailableActions();
        }

        // Update UI
        if (typeof moneyViewer === "function") {
            moneyViewer();
        }

        // Limit stats
        if (typeof statsLimit === "function") {
            statsLimit(player);
        }
    } catch (error) {
        console.error("Error in annual changes:", error);
    }
};

const startGame = () => {
    try {
        // Initialize the game interface
        if (typeof interfaceLoading === "function") {
            interfaceLoading();
        }

        // Set up initial UI
        if (typeof moneyViewer === "function") {
            moneyViewer();
        }

        // Assign jobs to NPCs first (before displaying first message)
        if (typeof jobAssigner === "function") {
            jobAssigner(characters);
        }

        // Assign education to NPCs
        if (typeof assignNPCEducation === "function") {
            assignNPCEducation(characters);
        }

        // Display first message after jobs are assigned
        if (typeof firstMessage === "function") {
            firstMessage();
        }

        // Hide character creation screen
        const characterScreen = document.getElementById(
            "create-character-screen",
        );
        if (characterScreen) {
            characterScreen.style.display = "none";
        }

        // Show main game interface
        const mainElement = document.querySelector("main");
        if (mainElement) {
            mainElement.style.display = "block";
        }

        // Initialize music if available
        if (typeof musicSystem !== "undefined" && musicSystem.initializeMusic) {
            musicSystem.initializeMusic();
        }

        console.log("Game started successfully");
    } catch (error) {
        console.error("Error starting game:", error);
    }
};
