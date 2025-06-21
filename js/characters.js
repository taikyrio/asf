//here I handle every stat change in the characters

// Character System Constants
const EDUCATION_STAGES = {
    NONE: "none",
    PRESCHOOL: "preschool",
    ELEMENTARY: "elementary",
    HIGHSCHOOL: "highschool",
    UNIVERSITY: "university",
};

const EDUCATION_AGE_RANGES = {
    [EDUCATION_STAGES.PRESCHOOL]: { start: 3, end: 5 },
    [EDUCATION_STAGES.ELEMENTARY]: { start: 6, end: 11 },
    [EDUCATION_STAGES.HIGHSCHOOL]: { start: 12, end: 17 },
    [EDUCATION_STAGES.UNIVERSITY]: { start: 18, end: null },
};

// Education handling
const studyingProcess = (textbox) => {
    if (!player || !textbox) return;

    try {
        const currentEducation = player.currentEducation;
        const currentCareer = player.currentCareer;

        if (
            !currentCareer ||
            !currentEducation ||
            currentEducation !== EDUCATION_STAGES.UNIVERSITY
        ) {
            return;
        }

        const duration = currentCareer.duration;
        const yearsStudied = currentCareer.yearsStudied;

        if (yearsStudied !== duration) {
            player.currentCareer.yearsStudied++;
        } else {
            // Graduation
            player.career[player.currentCareer.label] = player.currentCareer;

            // Handle tuition expenses
            if (player.currentCareer.paidBy === "myself") {
                player.money.expenses -= 6000;
            }

            // Reset education status
            player.currentCareer = { studying: false };
            player.currentEducation = EDUCATION_STAGES.NONE;

            // Notify player
            textbox.innerHTML += `<p>I finished my ${player.currentCareer.label} degree!</p>`;

            if (typeof EnhancedUI !== "undefined") {
                EnhancedUI.showNotification(
                    "Graduated from University!",
                    "success",
                );
            }
        }
    } catch (error) {
        console.error("Error in studying process:", error);
    }
};

const statsLimit = (person) => {
    let stats = person.stats;
    for (let stat of Object.entries(stats)) {
        if (stat[1] < 0) person.stats[stat[0]] = 0;
        else if (stat[1] > 100) person.stats[stat[0]] = 100;
    }
    if (person.job !== "none")
        if (person.job.performance > 100) person.job.performance = 100;
        else if (person.job.performance < 0) person.job.performance = 0;
};

const statsBuffer = () => {
    if (player.freetime.isReading) {
        if (player.money.total > 0) {
            player.stats.smartness += 3;
        } else {
            player.freetime.isReading = false;
            player.money.expenses -= 200;
        }
    }
    if (player.freetime.isAttendingParties) {
        if (player.money.total > 0) player.stats.happiness += 5;
        else {
            player.freetime.isAttendingParties = false;
            player.money.expenses -= 500;
        }
    }
    if (player.freetime.isTakingMusicLessons) {
        if (player.money.total > 0) player.skills.music.xp += 25;
        else {
            player.freetime.isTakingMusicLessons = false;
            player.money.expenses -= 2000;
        }
    }
    if (player.freetime.goesToGym) {
        if (player.money.total > 0) {
            player.stats.health++;
            player.stats.fitness += 6;
        } else {
            player.freetime.goesToGym = false;
            player.money.expenses -= 1800;
        }
    } else player.stats.fitness--;
};

// Life stage events
const specificEvents = () => {
    if (!player) return;

    try {
        switch (player.age) {
            case 1:
                if (
                    typeof obligatoryEvents?.firstWords?.display === "function"
                ) {
                    obligatoryEvents.firstWords.display();
                }
                break;

            case EDUCATION_AGE_RANGES[EDUCATION_STAGES.PRESCHOOL].start:
                player.currentEducation = EDUCATION_STAGES.PRESCHOOL;
                textContainer.innerHTML += `<p>I started preschool</p>`;
                break;

            case EDUCATION_AGE_RANGES[EDUCATION_STAGES.ELEMENTARY].start:
                player.currentEducation = EDUCATION_STAGES.ELEMENTARY;
                textContainer.innerHTML += `<p>I started elementary school</p>`;
                break;

            case EDUCATION_AGE_RANGES[EDUCATION_STAGES.HIGHSCHOOL].start:
                player.currentEducation = EDUCATION_STAGES.HIGHSCHOOL;
                textContainer.innerHTML += `<p>I started high school</p>`;
                break;

            case EDUCATION_AGE_RANGES[EDUCATION_STAGES.UNIVERSITY].start:
                player.career["education"] = { name: "High School" };
                if (
                    typeof windows?.education?.university?.display ===
                    "function"
                ) {
                    windows.education.university.display();
                }
                break;
        }
    } catch (error) {
        console.error("Error in specific events:", error);
    }
};

// Career history management
const careerPreviewer = () => {
    if (!player)
        return {
            education: "<li>No education received yet</li>",
            degrees: "<p>No degrees yet</p>",
        };

    try {
        let degrees = "";
        const result = {
            education: "<li>No education received yet</li>",
            degrees: "<p>No degrees yet</p>",
        };

        // Process career entries
        for (const [key, value] of Object.entries(player.career)) {
            if (key === "education") {
                result.education = "High School";
            } else if (value?.name) {
                degrees += `<li>${value.name}</li>`;
            }
        }

        if (degrees) {
            result.degrees = degrees;
        }

        return result;
    } catch (error) {
        console.error("Error in career previewer:", error);
        return {
            education: "<li>Error loading education</li>",
            degrees: "<p>Error loading degrees</p>",
        };
    }
};

const skillLeveler = () => {
    const levelChanger = (skill, newXpNeeded) => {
        player.skills[skill[0]].level++;
        player.skills[skill[0]].xp =
            player.skills[skill[0]].xp - player.skills[skill[0]].xpNeeded;
        player.skills[skill[0]].xpNeeded = newXpNeeded;
    };

    let skills = player.skills;
    for (let skill of Object.entries(skills)) {
        let xp = skills[skill[0]].xp;
        let level = skills[skill[0]].level;
        let xpNeeded = skills[skill[0]].xpNeeded;

        if (level === 0 && xp >= xpNeeded) {
            levelChanger(skill, 50);
        } else if (level === 1 && xp >= xpNeeded) {
            levelChanger(skill, 100);
        } else if (level === 2 && xp >= xpNeeded) {
            levelChanger(skill, 250);
        } else if (level === 3 && xp >= xpNeeded) {
            levelChanger(skill, 450);
        } else if (level === 4 && xp >= xpNeeded) {
            levelChanger(skill, 600);
        } else if (level === 5 && xp >= xpNeeded) {
            levelChanger(skill, 800);
        } else if (level === 6 && xp >= xpNeeded) {
            levelChanger(skill, 1200);
        } else if (level === 7 && xp >= xpNeeded) {
            levelChanger(skill, 3000);
        } else if (level === 8 && xp >= xpNeeded) {
            levelChanger(skill, 6000);
        } else if (level === 9 && xp >= xpNeeded) {
            levelChanger(skill, 6000);
        }
    }
};

window.randomDeath = (person) => {
    const randomNum = Math.floor(Math.random() * person.age);
    const deathCause = [
        `has died while ${person.gender == "male" ? "he" : "she"} was sleeping`,
    ];
    const randomReason =
        deathCause[Math.floor(Math.random() * deathCause.length)];

    if (person.age > 70 && person.stats.health < randomNum && person.alive) {
        death(person, randomReason);
    }
};

const death = (person, reason) => {
    person.alive = false;
    textContainer.innerHTML += `<p>${person.fullName} ${reason} at age of ${person.age}</p>`;

    person.deathCause = reason;

    if (person.job !== "none") {
        person.job.until = year;
        person.cv.push(person.job);
        person.job = "none";
    }

    if (person.characterIndex === player.characterIndex) {
        const ageBtnContainer = document.getElementById("age-btn-container");
        ageBtnContainer.innerHTML = `
        <button id="dead-button" class="rectangular-btn" onclick="deathScreen()">Dead</button>
        `;
    }
};

const prisonHandler = (person) => {
    if (!person.prison.jailed) return;

    person.prison.yearsLeft--;
    person.criminalRecord.yearsInPrison++;

    if (person.prison.yearsLeft === 0) {
        person.prison.jailed = false;
        person.prison.sentenceTime = 0;
        leftBtnContainer.innerHTML = "";
        textContainer.innerHTML += `<p>I got out of prison</p>`;
    }
};

// Job performance management
const jobPerformanceHandler = () => {
    if (!player || player.job === "none") return;

    try {
        const performance = player.job.performance;
        const random = Math.round(Math.random() * 10);

        // Handle poor performance
        if (performance <= 10 && random === 2) {
            // Add to CV before termination
            player.cv.push({
                ...player.job,
                until: year,
            });

            // Terminate employment
            player.job = "none";

            if (typeof EnhancedUI !== "undefined") {
                EnhancedUI.showNotification(
                    "You were fired due to poor performance!",
                    "error",
                );
            }
        }
        // Handle exceptional performance (promotion logic moved to CareerSystem)
        else if (performance >= 75 && random === 5) {
            if (typeof CareerSystem !== "undefined") {
                CareerSystem.handleCareerProgression(player);
            }
        }
    } catch (error) {
        console.error("Error in job performance handler:", error);
    }
};

// Action reset
const resetAvailableActions = () => {
    if (!player || !player.actions) return;

    try {
        for (const action of Object.keys(player.actions)) {
            player.actions[action] = 0;
        }
    } catch (error) {
        console.error("Error resetting available actions:", error);
    }
};

// Export character system
const CharacterSystem = {
    EDUCATION_STAGES,
    EDUCATION_AGE_RANGES,
    studyingProcess,
    specificEvents,
    careerPreviewer,
    jobPerformanceHandler,
    resetAvailableActions,
};

window.arrest = (min, max, person) => {
    person.prison.sentenceTime = min + Math.floor(Math.random() * max);
    person.prison.yearsLeft = person.prison.sentenceTime;
    person.prison.jailed = true;

    leftBtnContainer.innerHTML = `
                <button class="btn" onclick="windows.prison.display()">
                🔒
                </button>
                <p>Prison</p>
                `;
    if (player.job !== "none") {
        player.job === "none";
        textContainer.innerHTML += `<p>I lost my job</p>`;
    }
};

window.arrestByMurder = (person) => {
    arrest(8, 17, person);
};

window.arrestByStealingCar = (person) => {
    arrest(1, 3, person);
};

const pregnancyHandler = (person) => {
    if (!person.pregnant) return;

    person.pregnant = false;
    const partner = person.relationships.partner[0];
    const possibleGenders = ["male", "female"];
    const gender = possibleGenders[Math.round(Math.random())];

    if (
        person.characterIndex == player.characterIndex ||
        person.characterIndex == player.characterIndex.relationships.partner[0]
    ) {
        const pronoun = gender === "male" ? "him" : "her";
        modalBackground.style.display = "flex";
        eventTitle.innerText = `Its a ${gender == "male" ? "boy" : "girl"}`;
        eventBody.innerHTML = `
        <p>How will you call ${pronoun}</p>
        <input type="text" placeholder="name" id="name-field">
        <div class="option" onclick="createChild('${person.characterIndex}', '${gender}')">Name ${pronoun}</div>
        <div class="option" onclick="randomNameForChildren('${person.characterIndex}')">Random</div>
        `;
        return;
    }
    const nationality = nationalityQuery(person.location);
    const offspring = new Person(
        undefined,
        partner != undefined ? partner.surname : person.surname,
        0,
        gender,
        nationality,
    );
    person.relationships.offspring.push(offspring);
    offspring.relationships.parents.push(person);
    if (partner != undefined) {
        partner.relationships.offspring.push(offspring);
        offspring.relationships.parents.push(partner);
    }

    characters.push(offspring);
};

const statsChanges = () => {
    const stats = Object.entries(player.stats);
    for (let stat of stats) {
        // if its true buffes the stat
        if (Math.floor(Math.random() * 2) === 1) {
            player.stats[stat[0]] += Math.floor(Math.random() * 5);
        } else {
            player.stats[stat[0]] -= Math.floor(Math.random() * 5);
        }
    }
};
