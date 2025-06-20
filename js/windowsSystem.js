
// Windows system - all modal functionality
const windows = {
    suicide: {
        display() {
            if (player.age < 5) return;

            showEvent({
                title: "Suicide",
                body: `
                <p>Are you sure you want to do this</p>
                <div class="option" onclick="windows.suicide.confirmation()">Yes</div>
                <div class="option" onclick="closeEvent()">No</div>    
                `,
            });
        },
        confirmation() {
            closeEvent();
            death(player, "commited suicide");
            menuTemplate.style.display = "none";
        },
    },
    criminal: {
        stealCar: {
            display() {
                const cars = assets.cars;
                const random = Math.floor(Math.random() * cars.length);
                const car = cars[random];

                showEvent({
                    title: "Steal car",
                    body: `
                    <p>You found a ${car.label}, would you steal it?</p>
                    <div class="option" onclick="windows.criminal.stealCar.steal('${car.label}')">Yes</div>
                    <div class="option" onclick="closeEvent()">No</div>                    
                    `,
                });
            },
            steal(carName) {
                let car;
                const cars = assets.cars;
                for (let i = 0; i < assets.cars.length; i++) {
                    if (carName === cars[i].label) {
                        car = structuredClone(cars[i]);
                        car.stolen = true;
                        break;
                    }
                }
                const random = Math.floor(Math.random() * 100);
                menuTemplate.style.display = "none";
                if (random >= 30) {
                    car.inventoryIndex = player.inventory.cars.length;
                    player.inventory.cars.push(car);
                    eventBody.innerHTML = `
                    <p>You stole this car succesfully</p>
                    <div class="option" onclick="closeEvent()">Close</div>
                    `;
                    textContainer.innerHTML += `<p>I stole a ${carName.toLowerCase()}</p>`;
                } else {
                    eventBody.innerHTML = `
                    <p>You got arrested</p>
                    <div class="option" onclick="closeEvent()">Close</div>
                    `;
                    arrestByStealingCar(player);
                    textContainer.innerHTML += `<p>I tried to steal a ${carName.toLowerCase()}</p>`;
                    textContainer.innerHTML += `<p>I got arrested for ${player.prison.sentenceTime} years</p>`;
                }
            },
        },
        murder: {
            display() {
                const events = [
                    {
                        message: "A beggar asked for your charity",
                        target: "beggar",
                        gender: "male",
                    },
                    {
                        message: "A prostitute offers you her services",
                        target: "prostitute",
                        gender: "female",
                    },
                ];
                const random = Math.floor(Math.random() * events.length);
                const pronoun =
                    events[random].gender === "male" ? "him" : "her";
                const victim = events[random].target;

                showEvent({
                    title: "Murder",
                    body: `
                    <p>${events[random].message}</p>
                    <h3 style="margin-top: 1px">Murder method:</h3>
                    <select id="method-selector">
                        <option value="strangulation">Strangle ${pronoun}</option>
                        <option value="stab">Stab ${pronoun}</option>
                    </select>    
                    `,
                });

                const methodSelector =
                    document.getElementById("method-selector");
                let method = methodSelector.value;
                methodSelector.onselect = (e) => {
                    method = e.target.value;
                };
                eventBody.innerHTML += `
                <div class="option" onclick="windows.criminal.murder.kill('${victim}')">kill</div>
                <div class="option" onclick="closeEvent()">Close</div>
                `;
            },
            kill(victim) {
                const random = Math.floor(Math.random() * 100);
                menuTemplate.style.display = "none";

                if (random > 30) {
                    player.criminalRecord.murder++;
                    textContainer.innerHTML += `
                    <p>I killed a ${victim}</p>
                    `;
                    const probabilityOfArrest = Math.floor(Math.random() * 100);
                    if (probabilityOfArrest > 60) {
                        eventBody.innerHTML = `
                        <p>You got caught by the police, you are arrested</p>
                        <div class="option" onclick="closeEvent()">Close</div>
                        `;
                        arrestByMurder(player);
                        textContainer.innerHTML += `
                        <p>The police caught me</p>
                        <p>I have been arrested for ${player.prison.sentenceTime} years</p>
                        `;
                    } else {
                        eventBody.innerHTML = `
                        <p>You killed the ${victim} succesfully</p>
                        <div class="option" onclick="closeEvent()">Close</div>
                        `;
                    }
                } else {
                    player.criminalRecord.murderAttempts++;
                    arrestByMurder(player);
                    eventBody.innerHTML = `
                    <p>Your murder attempt failed, you got denounced</p>
                    <div class="option" onclick="closeEvent()">Close</div>
                    `;
                    textContainer.innerHTML += `
                    <p>My murder attempt failed</p>
                    <p>I got denounced</p>
                    <p>I have been arrested for ${player.prison.sentenceTime} years</p>
                    `;
                }
            },
        },
        robbery() {
            showEvent({
                title: "Robbery",
                body: `
                <div class="option" onclick="closeEvent()">Close</div>    
                `,
            });
        },
    },
    plasticSurgeries: {
        display() {
            if (player.age < 17) return;

            showEvent({
                title: "Plastic surgeries",
                body: `
                <p>Fix your insecurities today</p>
                <div class="option" onclick="windows.plasticSurgeries.noseJob(400)">
                    Nose job
                </div>
                <div class="option" onclick="windows.plasticSurgeries.faceLift(1000)">
                    Face lift
                </div>
                <div class="option" onclick="windows.plasticSurgeries.lipAugmentation(600)">
                    Lip Augmentation
                </div>
                ${
                    player.gender === "male"
                        ? ``
                        : `
                <div class="option" onclick="windows.plasticSurgeries.breastAugmentation(800)">
                    Breast augmentation
                </div>
                `
                }
                <div class="option" onclick="windows.plasticSurgeries.eyelidLift(250)">
                    Eyelid Lift
                </div>
                <div class="option" onclick="windows.plasticSurgeries.hairTransplantation(900)">
                    Hair transplantation
                </div>
                <div class="option" onclick="closeEvent()">Do nothing</div>    
                `,
            });
        },
        beautyBuff(price, operation) {
            if (player.money.total < price)
                return (eventBody.innerHTML = `
                <p>You cant afford this</p>
                <div class="option" onclick="closeEvent()">Close</div>
                `);
            const buff = 12 + Math.floor(Math.random() * 12);
            player.stats.appearance += buff;
            statsLimit(player);
            eventBody.innerHTML = `
            <p>+${buff} appearance</p>
            <div class="option" onclick="closeEvent()">Close</div>
            `;
            menuTemplate.style.display = "none";
            textContainer.innerHTML += `
            <p>I paid for a ${operation}</p>
            `;
            handleStatBars(player, true);
        },
        options(price, operation) {
            return `
            <p><b>Price: </b>${moneyFormat(price)} $</p>
            <div class="option" onclick="windows.plasticSurgeries.beautyBuff(${price}, '${operation}')">Pay</div>
            <div class="option" onclick="closeEvent()">Close</div>
            `;
        },
        noseJob(price) {
            const options = this.options(price, "nose job");
            eventTitle.innerText = "Nose job";
            eventBody.innerHTML = options;
        },
        faceLift(price) {
            const options = this.options(price, "face lift");
            eventTitle.innerText = "Face lift";
            eventBody.innerHTML = options;
        },
        lipAugmentation(price) {
            const options = this.options(price, "lip augmentation");
            eventTitle.innerText = "Lip augmentation";
            eventBody.innerHTML = options;
        },
        breastAugmentation(price) {
            const options = this.options(price, "breast augmentation");
            eventTitle.innerText = "Breast augmentation";
            eventBody.innerHTML = options;
        },
        eyelidLift(price) {
            const options = this.options(price, "eyelid lift");
            eventTitle.innerText = "Eyelid lift";
            eventBody.innerHTML = options;
        },
        hairTransplantation(price) {
            const options = this.options(price, "hair transplantation");
            eventTitle.innerText = "Hair transplantation";
            eventBody.innerHTML = options;
        },
    },
    
    handleRelationBars() {
        let progressBars = document.getElementsByClassName("relation");
        for (let element of Object.entries(progressBars)) {
            let index = parseInt(element[1].id.split("-")[1]);
            let category = element[1].id.split("-")[0];
            let opinion =
                player.relationships[category][index].stats.relationWithPlayer;
            element[1].style.width = `${opinion}%`;
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
        eventBody.innerHTML = `
            <p>You threw an amazing party</p>
            <br>
            <div class="option" onclick="closeEvent()">Close</div>
            `;
        textContainer.innerHTML += `<p>I organized a party at home</p>`;
        statsLimit(player);
        menuTemplate.style.display = "none";
        handleStatBars(player, true);
    },

    emigrate() {
        const chosenCountry = document.getElementById("country-chooser").value;
        if (player.age >= 18) {
            player.location = chosenCountry;
            textContainer.innerHTML += `
        <p>I emigrated to ${player.location}</p>
        ${
            player.job !== "none"
                ? `
        <p>I quit my job</p>`
                : ""
        }
        `;
            player.job.until = year;
            player.money.income -= player.job.salary;
            moneyViewer();
            player.cv.push(player.job);
            player.job = "none";
            menuTemplate.style.display = "none";
        } else if (player.age < 18) {
            showEvent({
                title: "You cant emigrate",
                body: `
                <div class="option" onclick="closeEvent()">Ok</div>
                `,
            });
            textContainer.innerHTML += "I cant emigrate";
            menuTemplate.style.display = "none";
        }
    }
};
