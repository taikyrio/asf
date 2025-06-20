
// Enhanced Windows System with better organization and error handling
const windows = {
    freetime: {
        handleSwitch: function(activity) {
            if (player.age < 2) return;

            const costs = {
                reading: 200,
                musicLessons: 2000,
                parties: 500,
                gym: 1800
            };

            const benefits = {
                reading: { smartness: 3 },
                musicLessons: { music: 25 },
                parties: { happiness: 5 },
                gym: { fitness: 3 }
            };

            const cost = costs[activity];
            const isActive = this.getActivityStatus(activity);

            if (!isActive && player.money.total < cost) {
                showEvent({
                    title: "Insufficient Funds",
                    body: `<p>You need $${cost} to start this activity.</p><div class="option" onclick="closeEvent()">OK</div>`
                });
                return;
            }

            // Toggle activity
            this.setActivityStatus(activity, !isActive);

            if (!isActive) {
                player.money.expenses += cost;
            } else {
                player.money.expenses -= cost;
            }

            // Update UI
            const switchEl = document.getElementById(`freetime-${activity}`);
            if (switchEl) {
                switchEl.style.float = !isActive ? "right" : "left";
            }

            closeEvent();
            if (typeof menu !== 'undefined' && menu.freetime) {
                menu.freetime(); // Refresh menu
            }
        },

        getActivityStatus: function(activity) {
            if (!player.freetime) {
                player.freetime = {};
            }
            
            switch(activity) {
                case 'reading': return player.freetime.isReading || false;
                case 'musicLessons': return player.freetime.isTakingMusicLessons || false;
                case 'parties': return player.freetime.isAttendingParties || false;
                case 'gym': return player.freetime.goesToGym || false;
                default: return false;
            }
        },

        setActivityStatus: function(activity, status) {
            if (!player.freetime) {
                player.freetime = {};
            }

            switch(activity) {
                case 'reading': player.freetime.isReading = status; break;
                case 'musicLessons': player.freetime.isTakingMusicLessons = status; break;
                case 'parties': player.freetime.isAttendingParties = status; break;
                case 'gym': player.freetime.goesToGym = status; break;
            }
        },

        restaurant: {
            display: function() {
                showEvent({
                    title: "Restaurant",
                    body: `
                    <p>Choose where to eat:</p>
                    <div class="option" onclick="windows.freetime.restaurant.eat('cheap')">Fast Food - $15</div>
                    <div class="option" onclick="windows.freetime.restaurant.eat('mid')">Casual Dining - $40</div>
                    <div class="option" onclick="windows.freetime.restaurant.eat('expensive')">Fine Dining - $100</div>
                    <div class="option" onclick="closeEvent()">Cancel</div>
                    `
                });
            },

            eat: function(type) {
                const costs = { cheap: 15, mid: 40, expensive: 100 };
                const happiness = { cheap: 2, mid: 5, expensive: 10 };

                const cost = costs[type];
                const happinessBonus = happiness[type];

                if (player.money.total < cost) {
                    showEvent({
                        title: "Insufficient Funds",
                        body: `<div class="option" onclick="closeEvent()">OK</div>`
                    });
                    return;
                }

                player.money.total -= cost;
                player.stats.happiness += happinessBonus;

                closeEvent();
                if (typeof textContainer !== 'undefined') {
                    textContainer.innerHTML += `<p>I enjoyed a nice meal and feel happier!</p>`;
                }
                if (typeof moneyViewer === 'function') moneyViewer();
            }
        },

        cinema: {
            display: function() {
                showEvent({
                    title: "Cinema",
                    body: `
                    <p>What movie would you like to watch?</p>
                    <div class="option" onclick="windows.freetime.cinema.watch('action')">Action Movie - $12</div>
                    <div class="option" onclick="windows.freetime.cinema.watch('comedy')">Comedy - $12</div>
                    <div class="option" onclick="windows.freetime.cinema.watch('drama')">Drama - $12</div>
                    <div class="option" onclick="closeEvent()">Cancel</div>
                    `
                });
            },

            watch: function(genre) {
                const cost = 12;

                if (player.money.total < cost) {
                    showEvent({
                        title: "Insufficient Funds",
                        body: `<div class="option" onclick="closeEvent()">OK</div>`
                    });
                    return;
                }

                player.money.total -= cost;
                player.stats.happiness += 3;

                closeEvent();
                if (typeof textContainer !== 'undefined') {
                    textContainer.innerHTML += `<p>I watched a ${genre} movie and had a good time!</p>`;
                }
                if (typeof moneyViewer === 'function') moneyViewer();
            }
        },

        goClubbing: {
            display: function() {
                if (player.age < 18) return;

                showEvent({
                    title: "Clubbing",
                    body: `
                    <p>Ready to hit the clubs?</p>
                    <div class="option" onclick="windows.freetime.goClubbing.party()">Party All Night - $50</div>
                    <div class="option" onclick="closeEvent()">Stay Home</div>
                    `
                });
            },

            party: function() {
                const cost = 50;

                if (player.money.total < cost) {
                    showEvent({
                        title: "Insufficient Funds",
                        body: `<div class="option" onclick="closeEvent()">OK</div>`
                    });
                    return;
                }

                player.money.total -= cost;
                player.stats.happiness += 8;

                // Small chance of meeting someone
                if (Math.random() < 0.1) {
                    if (typeof textContainer !== 'undefined') {
                        textContainer.innerHTML += `<p>I had an amazing night clubbing and even met someone interesting!</p>`;
                    }
                } else {
                    if (typeof textContainer !== 'undefined') {
                        textContainer.innerHTML += `<p>I had a great night out dancing and partying!</p>`;
                    }
                }

                closeEvent();
                if (typeof moneyViewer === 'function') moneyViewer();
            }
        }
    },

    prison: {
        years: 0,

        display: function() {
            showEvent({
                title: "Prison",
                body: `
                <p>You are currently serving a ${this.years} year sentence.</p>
                <p>Time remaining: ${this.years} years</p>
                <div class="option" onclick="closeEvent()">OK</div>
                `
            });
        },

        sentence: function(years) {
            this.years = years;
            player.inPrison = true;
            if (typeof textContainer !== 'undefined') {
                textContainer.innerHTML += `<p>I was sentenced to ${years} years in prison.</p>`;
            }
        },

        release: function() {
            this.years = 0;
            player.inPrison = false;
            if (typeof textContainer !== 'undefined') {
                textContainer.innerHTML += `<p>I was released from prison!</p>`;
            }
        }
    },

    suicide: {
        display: function() {
            if (player.age < 5) return;

            showEvent({
                title: "End Life",
                body: `
                <p>Are you sure you want to end your life?</p>
                <p>This action cannot be undone.</p>
                <div class="option" onclick="windows.suicide.confirm()">Yes, I'm sure</div>
                <div class="option" onclick="closeEvent()">Cancel</div>
                `
            });
        },

        confirm: function() {
            player.alive = false;
            player.deathCause = "by suicide";
            closeEvent();
            if (typeof deathScreen === 'function') {
                deathScreen();
            }
        }
    },

    criminal: {
        murder: {
            display: function() {
                if (player.age < 14) return;

                const targets = characters.filter(char => 
                    char.alive && 
                    char !== player && 
                    char.location === player.location
                );

                if (targets.length === 0) {
                    showEvent({
                        title: "No Targets",
                        body: `<p>There's no one around to target.</p><div class="option" onclick="closeEvent()">OK</div>`
                    });
                    return;
                }

                let targetOptions = targets.map((target, index) => 
                    `<div class="option" onclick="windows.criminal.murder.attempt(${characters.indexOf(target)})">${target.fullName}</div>`
                ).join('');

                showEvent({
                    title: "Choose Target",
                    body: `
                    <p>Who do you want to target?</p>
                    ${targetOptions}
                    <div class="option" onclick="closeEvent()">Cancel</div>
                    `
                });
            },

            attempt: function(targetIndex) {
                const target = characters[targetIndex];
                const success = Math.random() < 0.3; // 30% success rate

                if (success) {
                    target.alive = false;
                    target.deathCause = "murdered by " + player.fullName;
                    if (!player.criminalRecord) {
                        player.criminalRecord = { murder: 0, murderAttempts: 0 };
                    }
                    player.criminalRecord.murder++;

                    // Chance of getting caught
                    if (Math.random() < 0.7) {
                        windows.prison.sentence(Math.floor(Math.random() * 20) + 10);
                    }

                    if (typeof textContainer !== 'undefined') {
                        textContainer.innerHTML += `<p>I murdered ${target.fullName}.</p>`;
                    }
                } else {
                    if (!player.criminalRecord) {
                        player.criminalRecord = { murder: 0, murderAttempts: 0 };
                    }
                    player.criminalRecord.murderAttempts++;

                    // Higher chance of getting caught for failed attempts
                    if (Math.random() < 0.8) {
                        windows.prison.sentence(Math.floor(Math.random() * 10) + 5);
                    }

                    if (typeof textContainer !== 'undefined') {
                        textContainer.innerHTML += `<p>My murder attempt on ${target.fullName} failed.</p>`;
                    }
                }

                closeEvent();
            }
        },

        stealCar: {
            display: function() {
                showEvent({
                    title: "Steal Car",
                    body: `
                    <p>Attempt to steal a car?</p>
                    <div class="option" onclick="windows.criminal.stealCar.attempt()">Steal Car</div>
                    <div class="option" onclick="closeEvent()">Cancel</div>
                    `
                });
            },

            attempt: function() {
                const success = Math.random() < 0.4; // 40% success rate

                if (success) {
                    const stolenValue = Math.floor(Math.random() * 20000) + 5000;
                    player.money.total += stolenValue;
                    if (typeof textContainer !== 'undefined') {
                        textContainer.innerHTML += `<p>I successfully stole a car worth $${stolenValue}!</p>`;
                    }

                    // Chance of getting caught later
                    if (Math.random() < 0.3) {
                        windows.prison.sentence(Math.floor(Math.random() * 3) + 1);
                    }
                } else {
                    if (typeof textContainer !== 'undefined') {
                        textContainer.innerHTML += `<p>My car theft attempt failed.</p>`;
                    }

                    // High chance of getting caught for failed theft
                    if (Math.random() < 0.9) {
                        windows.prison.sentence(Math.floor(Math.random() * 2) + 1);
                    }
                }

                closeEvent();
                if (typeof moneyViewer === 'function') moneyViewer();
            }
        }
    },

    love: {
        findLove: function() {
            if (player.age < 14) return;

            showEvent({
                title: "Find Love",
                body: `
                <p>How would you like to meet someone?</p>
                <div class="option" onclick="windows.love.attempt('dating_app')">Dating App</div>
                <div class="option" onclick="windows.love.attempt('social_event')">Social Event</div>
                <div class="option" onclick="windows.love.attempt('workplace')">Through Work</div>
                <div class="option" onclick="closeEvent()">Cancel</div>
                `
            });
        },

        attempt: function(method) {
            const success = Math.random() < 0.3; // 30% success rate

            if (success) {
                // Generate a potential partner
                const partnerGender = player.gender === 'male' ? 'female' : 'male';
                const partnerAge = player.age + Math.floor(Math.random() * 10) - 5;
                
                // Safe name generation
                let partnerName = "Alex";
                let partnerSurname = "Smith";
                
                try {
                    if (typeof names !== 'undefined' && names[languageQuery(player.nationality)]) {
                        const nameData = names[languageQuery(player.nationality)];
                        if (nameData[partnerGender] && nameData.surnames) {
                            const partnerNames = nameData[partnerGender];
                            const surnames = nameData.surnames;
                            partnerName = partnerNames[Math.floor(Math.random() * partnerNames.length)];
                            partnerSurname = surnames[Math.floor(Math.random() * surnames.length)];
                        }
                    }
                } catch (e) {
                    console.warn("Error generating partner name, using defaults");
                }

                const partner = new Person(
                    partnerName,
                    partnerSurname,
                    Math.max(16, partnerAge),
                    partnerGender,
                    player.nationality
                );

                // Add to relationships
                if (!player.relationships.partner) {
                    player.relationships.partner = [];
                }
                player.relationships.partner.push(partner);
                
                if (!partner.relationships.partner) {
                    partner.relationships.partner = [];
                }
                partner.relationships.partner.push(player);

                if (typeof characters !== 'undefined') {
                    characters.push(partner);
                }

                if (typeof textContainer !== 'undefined') {
                    textContainer.innerHTML += `<p>I met ${partner.fullName} and we started dating!</p>`;
                }
            } else {
                if (typeof textContainer !== 'undefined') {
                    textContainer.innerHTML += `<p>I didn't have any luck finding love this time.</p>`;
                }
            }

            closeEvent();
        }
    },

    plasticSurgeries: {
        display: function() {
            if (player.age < 18) return;

            showEvent({
                title: "Plastic Surgery",
                body: `
                <p>What procedure would you like?</p>
                <div class="option" onclick="windows.plasticSurgeries.procedure('face', 5000)">Face Lift - $5,000</div>
                <div class="option" onclick="windows.plasticSurgeries.procedure('nose', 3000)">Nose Job - $3,000</div>
                <div class="option" onclick="windows.plasticSurgeries.procedure('body', 8000)">Body Contouring - $8,000</div>
                <div class="option" onclick="closeEvent()">Cancel</div>
                `
            });
        },

        procedure: function(type, cost) {
            if (player.money.total < cost) {
                showEvent({
                    title: "Insufficient Funds",
                    body: `<div class="option" onclick="closeEvent()">OK</div>`
                });
                return;
            }

            player.money.total -= cost;
            player.stats.attractiveness += Math.floor(Math.random() * 20) + 10;

            closeEvent();
            if (typeof textContainer !== 'undefined') {
                textContainer.innerHTML += `<p>I got plastic surgery and feel more attractive!</p>`;
            }
            if (typeof moneyViewer === 'function') moneyViewer();
        }
    },

    university: {
        display: function() {
            if (player.age < 18) return;

            showEvent({
                title: "University",
                body: `
                <p>Choose your degree:</p>
                <div class="option" onclick="windows.university.enroll('computer_science')">Computer Science</div>
                <div class="option" onclick="windows.university.enroll('business')">Business</div>
                <div class="option" onclick="windows.university.enroll('medicine')">Medicine</div>
                <div class="option" onclick="windows.university.enroll('law')">Law</div>
                <div class="option" onclick="closeEvent()">Cancel</div>
                `
            });
        },

        enroll: function(degree) {
            const cost = 50000;

            if (player.money.total < cost) {
                showEvent({
                    title: "Insufficient Funds",
                    body: `<p>University costs $50,000 per year.</p><div class="option" onclick="closeEvent()">OK</div>`
                });
                return;
            }

            player.money.total -= cost;
            player.education = {
                degree: degree,
                yearsRemaining: 4,
                studying: true
            };

            closeEvent();
            if (typeof textContainer !== 'undefined') {
                textContainer.innerHTML += `<p>I enrolled in university to study ${degree}!</p>`;
            }
            if (typeof moneyViewer === 'function') moneyViewer();
        }
    },

    handleRelationBars() {
        let progressBars = document.getElementsByClassName("relation");
        for (let element of Object.entries(progressBars)) {
            let index = parseInt(element[1].id.split("-")[1]);
            let category = element[1].id.split("-")[0];
            if (player.relationships[category] && player.relationships[category][index]) {
                let opinion = player.relationships[category][index].stats.relationWithPlayer;
                element[1].style.width = `${opinion}%`;
            }
        }

        for (let progressBar of progressBars) {
            let percentage = parseInt(progressBar.style.width.split("%")[0]);
            if (percentage > 55)
                progressBar.style.backgroundColor = "rgb(47, 151, 73)";
            else if (percentage > 25)
                progressBar.style.backgroundColor = "rgb(196, 221, 105)";
            else progressBar.style.backgroundColor = "rgb(185, 61, 61)";
        }
    },
    
    throwParty() {
        player.stats.happiness += 10;
        showEvent({
            title: "Party Time",
            body: `
            <p>You threw an amazing party</p>
            <br>
            <div class="option" onclick="closeEvent()">Close</div>
            `
        });
        if (typeof textContainer !== 'undefined') {
            textContainer.innerHTML += `<p>I organized a party at home</p>`;
        }
        if (typeof statsLimit === 'function') {
            statsLimit(player);
        }
        if (typeof handleStatBars === 'function') {
            handleStatBars(player, true);
        }
    },

    driverLicense: {
        display() {
            if (player.age < 18) return;

            if (player.driverLicense) {
                showEvent({
                    title: "Driver License",
                    body: `
                    <p>You already have a driver's license!</p>
                    <div class="option" onclick="closeEvent()">OK</div>
                    `
                });
                return;
            }

            showEvent({
                title: "Driver License",
                body: `
                <p>Get your driver's license for $200</p>
                <div class="option" onclick="windows.driverLicense.get()">Get License - $200</div>
                <div class="option" onclick="closeEvent()">Cancel</div>
                `
            });
        },

        get() {
            if (player.money.total < 200) {
                showEvent({
                    title: "Not enough money",
                    body: '<p>You need $200 to get your driver\'s license.</p><div class="option" onclick="closeEvent()">OK</div>'
                });
                return;
            }

            player.money.total -= 200;
            player.driverLicense = true;
            
            if (typeof textContainer !== 'undefined') {
                textContainer.innerHTML += `<p>I got my driver's license!</p>`;
            }
            if (typeof moneyViewer === 'function') {
                moneyViewer();
            }
            closeEvent();
        }
    },

    emigrate() {
        const countryChooser = document.getElementById("country-chooser");
        if (!countryChooser) return;
        
        const chosenCountry = countryChooser.value;
        if (player.age >= 18) {
            player.location = chosenCountry;
            if (typeof textContainer !== 'undefined') {
                textContainer.innerHTML += `
            <p>I emigrated to ${player.location}</p>
            ${
                player.job !== "none"
                    ? `
            <p>I quit my job</p>`
                    : ""
            }
            `;
            }
            if (player.job && player.job.until) {
                player.job.until = year;
            }
            if (player.money && player.job && player.job.salary) {
                player.money.income -= player.job.salary;
            }
            if (typeof moneyViewer === 'function') {
                moneyViewer();
            }
            if (player.cv && player.job !== "none") {
                player.cv.push(player.job);
            }
            player.job = "none";
            if (typeof menuTemplate !== 'undefined') {
                menuTemplate.style.display = "none";
            }
        } else if (player.age < 18) {
            showEvent({
                title: "You cant emigrate",
                body: `
                <div class="option" onclick="closeEvent()">Ok</div>
                `,
            });
            if (typeof textContainer !== 'undefined') {
                textContainer.innerHTML += "I cant emigrate";
            }
            if (typeof menuTemplate !== 'undefined') {
                menuTemplate.style.display = "none";
            }
        }
    }
};

// Utility functions - only declare if not already defined
if (typeof window.showEvent === 'undefined') {
    window.showEvent = (eventData) => {
        const modalBackground = document.getElementById("modal-background");
        const eventTitle = document.getElementById("event-title");
        const eventBody = document.getElementById("event-body");
        const eventContainer = document.getElementById("event-container");
        
        if (eventTitle) eventTitle.innerText = eventData.title;
        if (eventBody) eventBody.innerHTML = eventData.body;
        if (modalBackground) modalBackground.style.display = 'flex';
        if (eventContainer) eventContainer.style.display = 'block';
    };
}

if (typeof window.closeEvent === 'undefined') {
    window.closeEvent = () => {
        const modalBackground = document.getElementById("modal-background");
        const eventContainer = document.getElementById("event-container");
        
        if (modalBackground) modalBackground.style.display = 'none';
        if (eventContainer) eventContainer.style.display = 'none';
    };
}

// Global access
window.windows = windows;
window.showEvent = showEvent;
window.closeEvent = closeEvent;
