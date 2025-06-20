"use strict";

let characters = [];

class Person {
    constructor(name, surname, age, gender, nationality, money, location) {
        this.gender = gender || genderRandomizer()
        this.nationality = nationality || countryRandomizer();
        this.language = languageQuery(this.nationality)
        this.name = name || nameRandomizer(this.language, this.gender);
        this.surname = surname || surnameRandomizer(this.language);
        this.age = age || 0;
        this.location = location || birthplaceQuery(this.nationality)
        this.birthplace = this.location
        this.driverLicense = this.age > 18 ? true : false;

        // Initialize money total after money object is defined
        if (money) this.money.total = money;
    }

    inventory = { weapons: [], instruments: [], electronics: [], houses: [], cars: []};

    sexuality = 'heterosexual'

    stats = {
        health: randomStat(70, 30),
        happiness: randomStat(0, 100),
        smartness: randomStat(0, 100),
        fitness: randomStat(0, 35),
        appearance: randomStat(0, 100),
        music: randomStat(0, 30)
    }

    relationships = {
        parents: [],
        siblings: [],
        partner: [],
        friends: [],
        offspring: []
    }
    alive = true;
    career = {};
    currentCareer = {studying: false}

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
            xpNeeded: 50
        }
    }

    //activities which you pay for increasing skills and stats
    freetime = {
        isReading: false,
        isTakingMusicLessons: false,
        isAttendingParties: false,
        goesToGym: false
    }

    job = 'none';

    //in cv goes your employment history
    cv = [];

    money = {
        expenses: 0,
        income: 0,
        total: 0
    }

    get fullName() {
        return `${this.name} ${this.surname}`
    }

    //this is used when you want to access to certain character by using this index with the characters array
    characterIndex = characters.length

    criminalRecord = {
        yearsInPrison: 0,
        murderAttempts: 0,
        murder: 0,
        prisonEscapes: 0
    }

    prison = {
        yearsLeft: 0,
        sentenceTime: 0,
        jailed: false
    }

    // this limits your actions per year
    actions = {
        programming: 0,
        writing: 0,
        workHarder: 0,
        music: 0,
        meanActions: 0,
        friendlyActions: 0,
        romanticActions: 0,
        askPromotion: 0
    }

    socialMedia = {
        youtube: {
            created: false,
            created_at: null,
            username: null,
            videos: [],
            subscribers: 0
        },
        instagram: {
            created: false,
            created_at: null,
            username: null,
            videos: [],
            subscribers: 0
        }
    }
}

const createFamily = (player) => {
    const parentsAge = () => {
        let age = Math.floor(Math.random() * 40) + player.age;
        if (age - player.age < 18) age = age + 18 + player.age;
        return age;
    }


    let dad = new Person(undefined, player.surname, parentsAge(), 'male', player.nationality);
    dad.stats.relationWithPlayer = Math.floor(Math.random() * 100);
    characters.push(dad);

    let mom = new Person(undefined, undefined, dad.age + Math.floor(Math.random() * 10), 'female', player.nationality);
    mom.stats.relationWithPlayer = Math.floor(Math.random() * 100);
    characters.push(mom)

    dad.relationships.partner.push(mom);
    mom.relationships.partner.push(dad);

    player.relationships.parents.push(dad);
    player.relationships.parents.push(mom)

    let siblingsAmount = Math.floor(Math.random() * 3);

    while (siblingsAmount > 0) {
        let randomAge = Math.floor(Math.random() * 5);
        let sibling = new Person(undefined, player.surname, randomAge, undefined, player.nationality);
        sibling.stats.relationWithPlayer = Math.floor(Math.random() * 100);
        characters.push(sibling);
        player.relationships.siblings.push(sibling);
        siblingsAmount--;
    }
}

const firstMessage = () => {
    textContainer.innerHTML = `
    <p><span class="yellow">${year} - ${player.age === 0 ? 'birth' : `${player.age} years old`}</span></p>
    <p>My name is ${player.fullName}</p>
    <p>I was born ${player.gender} in ${player.location} on year ${year}</p>
    <p>My father is ${player.relationships.parents[0].fullName}, he works as a ${player.relationships.parents[0].job.label.toLowerCase()}</p>
    <p>My mother is ${player.relationships.parents[1].fullName}, she works as a ${player.relationships.parents[1].job.label.toLowerCase()}</p>
    `
}

let player;

const interfaceLoading = () => {
    handleStatBars(player, true);
    lifeStageDisplayer()
    moneyViewer()
    jobAssigner(characters)
    firstMessage()

    // Hide all menu screens
    document.getElementById('splash-screen').style.display = 'none'
    document.getElementById('main-menu-screen').style.display = 'none'
    document.getElementById('create-character-screen').style.display = 'none'

    const bars = document.getElementsByClassName('bar-progress');
    for (let bar of bars) {
        bar.style.animationName = 'animation-bar';
        bar.style.transition = 'all ease 0.3s'
    }

    // Update career button state and initialize menu options
    setTimeout(() => {
        if (typeof updateCareerButtonState === 'function') {
            updateCareerButtonState();
        }
        if (typeof initializeMenuOptions === 'function') {
            initializeMenuOptions();
        }
    }, 100);
}

//sets jobs for npcs
const jobAssigner = (characters) => {
    const findJob = (person) => {
        let randomIndex = Math.floor(Math.random() * jobs.length)
        const job = jobs[randomIndex]
        person.job = job
        person.money.income = job.salary
        requirementsFiller(job, person)
    }
    if (characters.characterIndex === player.characterIndex) return
    if (Array.isArray(characters)) for (let person of characters) {
        if (person.age > 17 && person.job === 'none' && person.characterIndex !== player.characterIndex)
            findJob(person)
    }
    else {  
        let person = characters;
        if (person.age > 17 && person.job && person.job === 'none')
            findJob(person)
    }
}

const assignNPCEducation = (characters) => {
    for(let person of characters){
        if(person.age >= 3 && person.age < 6){
            person.currentEducation = 'preschool'
        } else if(person.age >= 6 && person.age < 12){
            person.currentEducation = 'elementary'
        } else if(person.age >= 12 && person.age < 18){
            person.currentEducation = 'highschool'
        } else if(person.age >= 18){
            person.currentEducation = 'none'
            person.career['education'] = {name: 'Highschool'}
        }
    }
}

//Functions which generate player character
const customCharacter = () => {
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

const randomCharacter = () => {
    const genders = ["male", "female"];
    const gender = genders[Math.floor(Math.random() * genders.length)];
    const nationality = countryRandomizer();
    const age = 0;
    const money = Math.floor(Math.random() * 10000) + 1000;

    // Get random name based on nationality and gender
    const nameData = names[languageQuery(nationality)];
    const nameArray = nameData[gender];
    const surnameArray = nameData.surnames;

    const firstName = nameArray[Math.floor(Math.random() * nameArray.length)];
    const lastName = surnameArray[Math.floor(Math.random() * surnameArray.length)];

    createCharacter(firstName, lastName, age, gender, nationality, money);
    startGame();
};

const createCharacter = (name, surname, age, gender, nationality, money) => {
    try {
        // Clear any existing game data
        if (typeof characters !== 'undefined') {
            characters.length = 0;
        }

        window.player = new Person(name, surname, age, gender, nationality);
        window.player.money.total = money;

        // Add player to characters array
        if (typeof characters !== 'undefined') {
            characters.push(window.player);
            window.player.characterIndex = 0;
        }

        // Initialize game state
        if (typeof window.gameState !== 'undefined') {
            window.gameState.setState({
                year: Math.round(Math.random() * 20) + 2000,
                characters: characters || [window.player],
                player: { characterIndex: 0 }
            });
        }

        // Set initial year if not defined
        if (typeof window.year === 'undefined') {
            window.year = Math.round(Math.random() * 20) + 2000;
        }

        // Generate family relationships
        generateFamily(window.player);

        // Set initial UI
        const textContainer = document.getElementById('text-container');
        if (textContainer) {
            textContainer.innerHTML = `<p>Welcome to your new life, ${name} ${surname}!</p>`;
        }

        // Update money display
        if (typeof moneyViewer === 'function') {
            moneyViewer();
        }

        // Update career button state
        if (typeof updateCareerButtonState === 'function') {
            updateCareerButtonState();
        }
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
            if (typeof names !== 'undefined' && names[language]) {
                const nameData = names[language];
                if (nameData.male && nameData.male.length > 0) {
                    fatherName = nameData.male[Math.floor(Math.random() * nameData.male.length)];
                }
                if (nameData.female && nameData.female.length > 0) {
                    motherName = nameData.female[Math.floor(Math.random() * nameData.female.length)];
                }
                if (nameData.surnames && nameData.surnames.length > 0) {
                    surname = nameData.surnames[Math.floor(Math.random() * nameData.surnames.length)];
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
            fatherNationality
        );

        const mother = new Person(
            motherName,
            person.surname,
            motherAge,
            "female",
            motherNationality
        );

        // Set up relationships
        person.relationships.parents.push(father, mother);
        father.relationships.offspring.push(person);
        mother.relationships.offspring.push(person);
        father.relationships.partner.push(mother);
        mother.relationships.partner.push(father);

        // Add to characters array
        if (typeof characters !== 'undefined') {
            characters.push(father, mother);
        }

        // Generate potential siblings
        if (Math.random() < 0.4) {
            const siblingGender = Math.random() < 0.5 ? "male" : "female";
            const siblingAge = person.age + randomStat(-5, 5);
            
            let siblingName = siblingGender === "male" ? "Alex" : "Sam";
            
            if (typeof names !== 'undefined' && names[languageQuery(person.nationality)]) {
                const nameData = names[languageQuery(person.nationality)];
                if (nameData[siblingGender] && nameData[siblingGender].length > 0) {
                    siblingName = nameData[siblingGender][Math.floor(Math.random() * nameData[siblingGender].length)];
                }
            }

            const sibling = new Person(
                siblingName,
                person.surname,
                Math.max(0, siblingAge),
                siblingGender,
                person.nationality
            );

            person.relationships.siblings.push(sibling);
            sibling.relationships.siblings.push(person);
            sibling.relationships.parents.push(father, mother);
            father.relationships.offspring.push(sibling);
            mother.relationships.offspring.push(sibling);

            if (typeof characters !== 'undefined') {
                characters.push(sibling);
            }
        }
    } catch (error) {
        console.error("Error generating family:", error);
        // Create minimal family structure as fallback
        const father = new Person("John", person.surname || "Smith", person.age + 25, "male", person.nationality);
        const mother = new Person("Jane", person.surname || "Smith", person.age + 23, "female", person.nationality);
        
        person.relationships.parents.push(father, mother);
        father.relationships.offspring.push(person);
        mother.relationships.offspring.push(person);
        father.relationships.partner.push(mother);
        mother.relationships.partner.push(father);

        if (typeof characters !== 'undefined') {
            characters.push(father, mother);
        }
    }
};