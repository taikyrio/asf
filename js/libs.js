let leftBtnContainer = document.getElementById("left-btn-container");

let menuTemplate = document.getElementById("menu-template");
let menuBody = document.getElementById("menu-body");
let menuTitle = document.getElementById("menu-title");
let eventContainer = document.getElementById("event-container");

const randomStat = (min, max) => {
    return min + Math.floor(Math.random() * (max - min + 1));
};

const genderRandomizer = () => {
    const index = Math.round(Math.random());
    const genders = ["male", "female"];
    return genders[index];
};

const countryRandomizer = () => {
    const data =
        countriesData[Math.round(Math.random() * countriesData.length)];
    return data.nationality;
};

const languageQuery = (nationality) => {
    for (let country of countriesData) {
        if (country.nationality == nationality) return country.language;
    }
};

const birthplaceQuery = (nationality) => {
    for (let country of countriesData) {
        if (country.nationality == nationality) return country.country;
    }
};

const nationalityQuery = (location) => {
    for (let country of countriesData) {
        if (country.country == location) return country.nationality;
    }
};

const countryQuery = (countryName) => {
    for (let country of countriesData) {
        if (country.country === countryName) return country;
    }
};

const nameRandomizer = (languaje, gender) => {
    const nameEntries = Object.entries(names);
    let matchingList;
    for (let list of nameEntries) {
        if (list[0] === languaje) matchingList = list[1];
    }
    return matchingList[gender][
        Math.floor(Math.random() * matchingList[gender].length)
    ];
};

const surnameRandomizer = (language) => {
    try {
        if (
            !language ||
            typeof names === "undefined" ||
            !names[language] ||
            !names[language].surnames
        ) {
            return "Smith"; // Default surname
        }

        const surnameArray = names[language].surnames;
        if (!Array.isArray(surnameArray) || surnameArray.length === 0) {
            return "Smith";
        }

        return surnameArray[Math.floor(Math.random() * surnameArray.length)];
    } catch (error) {
        console.warn("Error generating surname:", error);
        return "Smith";
    }
};

const oldSurnameRandomizer = (language) => {
    try {
        if (typeof surnames === "undefined") {
            return "Smith"; // Fallback if surnames not loaded
        }

        const nameEntries = Object.entries(surnames);
        let matchingList;
        for (let list of nameEntries) {
            if (list[0] === languaje) {
                matchingList = list[1];
                break;
            }
        }
        if (!matchingList || matchingList.length === 0) {
            return "Smith"; // Fallback surname
        }
        const surname =
            matchingList[Math.floor(Math.random() * matchingList.length)];
        return surname;
    } catch (error) {
        console.error("Error in surnameRandomizer:", error);
        return "Smith";
    }
};

const countriesList = () => {
    let string = "";
    for (let country of countriesData) {
        if (country.country !== player.location)
            string = string.concat(
                `<option value="${country.country}">${country.country}</option>`,
            );
    }
    return string;
};

const nationalityList = () => {
    let string = "";
    for (let country of countriesData) {
        string = string.concat(
            `<option value="${country.nationality}">${capitalize(country.nationality)}</option>`,
        );
    }
    return string;
};

// Function to randomize house statistics annually
const randomizeHouseStats = () => {
    if (!player.inventory.houses || player.inventory.houses.length === 0)
        return;

    for (let house of player.inventory.houses) {
        // Random condition changes
        const conditionChange = Math.floor(Math.random() * 11) - 5; // -5 to +5
        house.condition = Math.max(
            0,
            Math.min(100, (house.condition || 75) + conditionChange),
        );

        // Age the house
        house.age = (house.age || 0) + 1;

        // Adjust price based on condition and age
        const basePrice = house.originalPrice || house.price;
        const conditionMultiplier = house.condition / 100;
        const ageDepreciation = Math.max(0.5, 1 - house.age * 0.01);
        house.price = Math.floor(
            basePrice * conditionMultiplier * ageDepreciation,
        );

        // Store original price if not already stored
        if (!house.originalPrice) {
            house.originalPrice = basePrice;
        }
    }
};

//displays items including houses and cars
// itemListifier and ownedAssets functions are defined in menu.js

const capitalize = (word) => {
    let newWord = [];
    for (let i = 0; i < word.length; i++) {
        if (i === 0) newWord.push(word.split("")[i].toUpperCase());
        else newWord.push(word.split("")[i]);
    }
    return (newWord = newWord.join(""));
};

const relationShipListifier = (category) => {
    const title = capitalize(category);

    const relations = player.relationships[category];
    let string = `<h3>${title}:</h3>`;
    let index = 0;
    //these bars depend on windows.handleRelationBars()
    if (relations.length !== 0)
        for (let relation of relations) {
            string = string.concat(`
        <div onclick="windows.relations.display(this)" class="relationship-container"
        data-id="${category}-${index}">
            <h4>${relation.fullName} <i class="fa-solid fa-${relation.gender === "male" ? "mars" : "venus"}"></i> ${!relation.alive ? "(Dead)" : ""}</h4>
            <div class="opinion-data-wrapper">
                <div class="bar-container">Opinion about you <div class="relation-background"><div class="relation" id="${category}-${index}"></div></div></div>
                ${
                    category === "partner"
                        ? `
                <div class="bar-container">Love <div class="relation-background"><div style="background-color:#bb7a85; height: 100%; width:${relation.stats.loveToPartner}%" id="${category}-${index}"></div><div</div></div>
                `
                        : ""
                }
            </div>
        </div>
        `);
            index++;
        }
    else string = "";
    return `<div class="relationships-container">${string}</div>`;
};

const statbarColorer = () => {
    let progressBars = document.getElementsByClassName("bar-progress");
    for (let progressBar of progressBars) {
        let percentage = parseInt(progressBar.style.width.split("%")[0]);
        if (percentage > 55)
            progressBar.style.backgroundColor = "rgb(47, 151, 73)";
        else if (percentage > 25)
            progressBar.style.backgroundColor = "rgb(196, 221, 105)";
        else progressBar.style.backgroundColor = "rgb(185, 61, 61)";
    }
};

const handleStatBars = (person, isPlayer, prefix = "") => {
    const stats = ["health", "happiness", "smartness", "appearance", "fitness"];
    const windowStat = [
        "relationWithPlayer",
        "health",
        "happiness",
        "smartness",
        "appearance",
        "fitness",
    ];

    if (isPlayer && !prefix) {
        for (let stat of stats) {
            const element = document.getElementById(`${stat}-bar`);
            if (element) {
                element.style.width = `${person.stats[stat]}%`;
            }
        }
    } else if (prefix === "profile") {
        for (let stat of stats) {
            const element = document.getElementById(`${prefix}-${stat}-bar`);
            if (element) {
                element.style.width = `${person.stats[stat]}%`;
            }
        }
    } else {
        for (let stat of windowStat) {
            const element = document.getElementById(`window-${stat}-bar`);
            if (element) {
                element.style.width = `${person.stats[stat]}%`;
            }
        }
    }
    statbarColorer();
};

const skillListifier = (player) => {
    let skills = player.skills;
    let defaultString = "You do not have any skill";
    let string = "";
    for (let skill of Object.entries(skills)) {
        if (
            skill[1].level !== 0 ||
            (skill[1].level === 0 && skill[1].xp !== 0)
        ) {
            string = string.concat(`
                <li>
                <h3>${capitalize(skill[0])}</h3>
                <p><b>Level:</b> ${skill[1].level}</p>
                </li><br>
                `);
        }
    }
    if (string === "") return defaultString;
    return `<ul>${string}</ul>`;
};

const moneyFormat = (money) => {
    money = money.toString();
    let parsedMoney = [];
    let amountOfNumbers = 0;

    for (let i = money.length - 1; i >= 0; i--) {
        parsedMoney.unshift(money[i]);
        amountOfNumbers++;

        if (amountOfNumbers === 3) {
            parsedMoney.unshift(".");
            amountOfNumbers = 0;
        }
    }
    if (parsedMoney[0] == "-" && parsedMoney[1] == ".") {
        parsedMoney.splice(1, 1);
        return parsedMoney.join("");
    } else if (parsedMoney[0] !== ".") return parsedMoney.join("");
    return parsedMoney.join("").slice(1);
};

const cvListifier = (player) => {
    if (player.cv.length === 0) return `<p>You do not have job history</p>`;

    let string = "";
    for (let job of player.cv) {
        string = string.concat(`
        <li>
        ${job.label} (${job.since} - ${job.until})
        </li>
        `);
    }
    return `<ul>${string}</ul>`;
};

const lifeStageDisplayer = () => {
    let headContainer = document.getElementById("head-container");
    if (player.age < 18) {
        headContainer.innerText = "Childhood";
        player.lifeStage = "childhood";
    } else if (player.age < 60) {
        headContainer.innerText = "Adulthood";
        player.lifeStage = "adulthood";
    } else {
        headContainer.innerText = "Elderhood";
        player.lifeStage = "elderhood";
    }
};

//reverts camelCase
const uncamelCaser = (string) => {
    if (typeof string !== "string") return string;

    let arr = [];
    for (let i = 0; i < string.length; i++) {
        if (string[i] === string[i].toUpperCase()) {
            arr.push(" ");
            arr.push(string[i].toLowerCase());
        } else {
            arr.push(string[i]);
        }
    }
    return capitalize(arr.join("").trim());
};

const jobRequirementsListifier = (index) => {
    const jobRequirements = jobs[index].requirements;
    let string = "";
    for (let requirement of Object.entries(jobRequirements)) {
        let reqName = requirement[0];
        if (requirement[0] === "minAge") reqName = "Minimal age";
        string = string.concat(`
        <li><b>${capitalize(uncamelCaser(reqName))}:</b> ${uncamelCaser(requirement[1])}</li>
        `);
    }
    return string;
};

// its used when you want to give the needed stats to any npc for its job
const requirementsFiller = (obj, person) => {
    const statsList = ["programming", "handiness", "writing", "art", "music"];
    const requirements = obj.requirements;
    person.career.education = { name: "Highschool" };
    for (let req of Object.entries(requirements)) {
        if (statsList.includes(req[0])) person.skills[req[0]].level = req[1];

        if (req[0] === "education")
            person.career[req[1]] = universityCareers[req[1]];

        if (req[0] === "driverLicense") person.driverLicense = true;
    }
};

const numAbbreviation = (money) => {
    const array = moneyFormat(money).split(".");
    const size = array.length;
    const handler = (letter) => {
        console.log(parseInt(array[1][0]) !== 0);
        if (parseInt(array[1][0]) !== 0)
            return `${array[0]}.${array[1][0]}${letter}`;
        else return array[0] + letter;
    };
    if (size === 2) return handler("K");
    else if (size === 3) return handler("M");
    else if (size === 4) return handler("B");
};

const moneyViewer = () => {
    if (!player || !player.money) {
        console.warn("Player not initialized for money viewer");
        return;
    }
    
    const totalMoney = document.getElementById("total-money");
    if (totalMoney) {
        totalMoney.innerText = `${moneyFormat(player.money.total)} $`;
    }

    const balance = document.getElementById("balance");
    if (balance) {
        if (player.money.income - player.money.expenses > 0)
            balance.innerHTML = `<span class="green">+${numAbbreviation(player.money.income - player.money.expenses)} $</span>`;
        else if (player.money.income - player.money.expenses < 0)
            balance.innerHTML = `<span class="red">${numAbbreviation(player.money.income - player.money.expenses)} $</span>`;
        else if (player.money.income - player.money.expenses === 0)
            balance.innerText = "";
    }
};

const createChild = (personIndex, gender) => {
    const person = characters[personIndex];
    const partner = person.relationships.partner[0];
    const name = document.getElementById("name-field").value;
    const surname = partner.surname;
    const nationality = nationalityQuery(person.location);
    const offspring = new Person(
        name,
        partner != undefined ? surname : person.surname,
        0,
        gender,
        nationality,
    );
    offspring.stats.relationWithPlayer = 50 + Math.floor(Math.random() * 50);

    characters.push(offspring);
    person.relationships.offspring.push(offspring);
    offspring.relationships.parents.push(person);
    if (partner != undefined) {
        partner.relationships.offspring.push(offspring);
        offspring.relationships.parents.push(partner);
    }

    textContainer.innerHTML += `
        <p>My ${gender === "male" ? "son" : "daughter"} has born. ${gender === "male" ? "His" : "Her"} name is ${offspring.name}</p>
    `;
    closeEvent();
};

const randomNameForChildren = (personIndex) => {
    const person = characters[personIndex];
    const gender = person.gender;
    const array = names[person.language][gender];
    const random = Math.floor(Math.random() * array.length);
    document.getElementById("name-field").value = array[random];
};

const closeEvent = () => {
    eventTitle.innerText = "";
    eventBody.innerHTML = "";
    eventContainer.style.display = "none";
    modalBackground.style.display = "none";
};

const showEvent = ({ title, body }) => {
    eventTitle.innerText = title;
    eventBody.innerHTML = body;
    eventContainer.style.display = "block";
    modalBackground.style.display = "flex";
};

// used for story events
const createStoryEvent = ({ title, body }) => {
    const eventsContainer = document.getElementById("events-container");
    const index = eventsContainer.children.length;
    eventsContainer.innerHTML += `
        <div id="event-${index}" class="modal flex" style:"z-index: ${22 + index};">
            <div class="event-container">
                <h2 class="event-title" id="event-${index}-title">
                    ${title}
                </h2>
                <hr>
                <div class="event-body" id="event-${index}-body">
                    ${body(index)}
                </div>
            </div>

        </div>
    `;
};

const modifyStoryEvent = ({ title, body, id }) => {
    const eventTitle = document.getElementById(`event-${id}-title`);
    const eventBody = document.getElementById(`event-${id}-body`);

    eventTitle.innerText = title;
    eventBody.innerHTML = body(id);
};

const closeStoryEvent = (id) => {
    document.getElementById(`event-${id}`).remove();
};

// this function will replace the statbarColorer
const barColor = (percentage) => {
    if (percentage > 55) return `rgb(47, 151, 73)`;
    else if (percentage > 25) return `rgb(196, 221, 105)`;
    else return `rgb(185, 61, 61)`;
};

const scrolldown = (element) => {
    element.scrollTop = element.scrollHeight;
};

// Name data fallback
if (typeof window.names === "undefined") {
    window.names = {
        english: {
            male: [
                "James",
                "John",
                "Robert",
                "Michael",
                "William",
                "David",
                "Richard",
                "Joseph",
                "Thomas",
                "Christopher",
            ],
            female: [
                "Mary",
                "Patricia",
                "Jennifer",
                "Linda",
                "Elizabeth",
                "Barbara",
                "Susan",
                "Jessica",
                "Sarah",
                "Karen",
            ],
            surnames: [
                "Smith",
                "Johnson",
                "Williams",
                "Brown",
                "Jones",
                "Garcia",
                "Miller",
                "Davis",
                "Rodriguez",
                "Martinez",
            ],
        },
        spanish: {
            male: [
                "José",
                "Antonio",
                "Juan",
                "Manuel",
                "Francisco",
                "Luis",
                "Miguel",
                "Carlos",
                "Pedro",
                "Alejandro",
            ],
            female: [
                "María",
                "Carmen",
                "Josefa",
                "Isabel",
                "Ana",
                "Dolores",
                "Pilar",
                "Teresa",
                "Rosa",
                "Francisca",
            ],
            surnames: [
                "García",
                "Rodríguez",
                "González",
                "Fernández",
                "López",
                "Martínez",
                "Sánchez",
                "Pérez",
                "Gómez",
                "Martín",
            ],
        },
        german: {
            male: [
                "Michael",
                "Thomas",
                "Andreas",
                "Wolfgang",
                "Klaus",
                "Jürgen",
                "Günter",
                "Stefan",
                "Uwe",
                "Werner",
            ],
            female: [
                "Ursula",
                "Monika",
                "Gabriele",
                "Petra",
                "Andrea",
                "Susanne",
                "Brigitte",
                "Christine",
                "Barbara",
                "Angelika",
            ],
            surnames: [
                "Müller",
                "Schmidt",
                "Schneider",
                "Fischer",
                "Weber",
                "Meyer",
                "Wagner",
                "Becker",
                "Schulz",
                "Hoffmann",
            ],
        },
    };
}

// Randomizer functions
// Randomizer functions
