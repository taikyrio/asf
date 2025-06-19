
// Windows items functionality
Object.assign(windows, {
    items: {
        buyWindow(e) {
            // objname could be items of assets (car or real estate)
            const objName = e.getAttribute("data-objname");
            const property = e.getAttribute("data-property");
            const index = e.getAttribute("data-index");

            if (property === "cars") {
                return windows.driverLicense.display();
            }

            let obj;

            if (objName === "items") obj = items[property][index];
            else obj = assets[property][index];

            showEvent({
                title: `Buy ${obj.label}`,
                body: `
                <h3>Price: ${moneyFormat(obj.price)} $</h3>
                <div class="option" onclick="windows.items.buy('${objName}', '${property}', '${index}')">Buy it</div>
                <div class="option" onclick="closeEvent()">Cancel</div>
                `,
            });
        },
        sell(data) {
            const index = data.getAttribute("data-item").split("-")[1];
            const type = data.getAttribute("data-item").split("-")[0];
            const item = player.inventory[type][index];
            const price = item.price;

            eventBody.innerHTML = `
            <h3>Are you sure you want to sell this?</h3>
            <p><b>Price:</b> ${moneyFormat(price)} $</p>
            <div class="option" onclick="windows.items.confirmSell(this)" data-type="${type}" data-index="${index}" data-price="${price}">Sell</div>
            <div class="option" onclick="closeEvent()">No</div>
            `;
        },
        confirmSell(data) {
            const price = data.getAttribute("data-price");
            let index = data.getAttribute("data-index");
            const type = data.getAttribute("data-type");
            closeEvent();
            menuTemplate.style.display = "none";
            textContainer.innerHTML += `<p>I sold an item for ${moneyFormat(price)}$</p>`;

            player.inventory[type].splice(parseInt(index), 1);

            let i = 0;
            for (let item of player.inventory[type]) {
                item.inventoryIndex = i;
                i++;
            }

            player.money.total += parseInt(price);
            moneyViewer();
        },
        useItem(data) {
            const type = data.getAttribute("data-type");
            const index = data.getAttribute("data-index");
            const object = player.inventory[type][index];

            if (type === "weapons") {
                showEvent({
                    title: object.label,
                    body: `
                    <ul>
                    <p>${object.successChance}% efficiency</p>
                    <li class="option" data-weapon="${index}" onclick="windows.items.weapon.selectVictim(this)">Crimes</li>
                    <li class="option" data-item="${type}-${index}" onclick="windows.items.sell(this)">Sell</li>
                    <li class="option" onclick="closeEvent()">Close</li>
                    </ul>
                    `,
                });
            } else if (type === "instruments") {
                showEvent({
                    title: object.label,
                    body: `
                    ${
                        player.actions.music < 3
                            ? `
                        <div class="option" data-item="${index}" onclick="windows.items.playInstrument(this)">Play</div>
                    `
                            : ""
                    }
                    <div class="option" data-item="${type}-${index}" onclick="windows.items.sell(this)">Sell</div>
                    <div class="option" onclick="closeEvent()">Close</div>
                    `,
                });
            } else if (["fastFood", "desserts", "vegetables"].includes(type)) {
                showEvent({
                    title: object.label,
                    body: `
                    <div class="option" data-item="${type}-${index}" onclick="windows.items.consume(this, 'food')">Eat</div>
                    <div class="option" data-item="${type}-${index}" onclick="windows.items.sell(this)">Sell</div>
                    <div class="option" onclick="closeEvent()">Close</div>
                    `,
                });
            } else if (["alcoholic", "nonAlcoholic"].includes(type)) {
                showEvent({
                    title: object.label,
                    body: `
                    <div class="option" data-item="${type}-${index}" onclick="windows.items.consume(this, 'drink')">Drink</div>
                    <div class="option" data-item="${type}-${index}" onclick="windows.items.sell(this)">Sell</div>
                    <div class="option" onclick="closeEvent()">Close</div>
                    `,
                });
            }

            if (object.label === "Laptop" || object.label === "PC") {
                showEvent({
                    title: object.label,
                    body: `
                    ${
                        player.actions.programming < 3
                            ? `
                    <div class="option" data-item="${index}" onclick="windows.items.computer.practiceProgramming(this)">Practice programming</div>
                    `
                            : ""
                    }
                    ${
                        player.actions.writing < 3
                            ? `
                        <div class="option" data-item="${index}" onclick="windows.items.computer.practiceWriting(this)">Practice writing</div>
                    `
                            : ""
                    }
                    <div class="option" data-item="${index}" onclick="windows.items.computer.playVideogames(this)">Play videogames</div>
                    <div class="option" data-item="${type}-${index}" onclick="windows.items.sell(this)">Sell</div>
                    <div class="option" data-item="${index}" onclick="closeEvent()">Do nothing</div>
                    `,
                });
            } else if (object.label === "Smartphone") {
                showEvent({
                    title: object.label,
                    body: `
                    <div class="option" onclick="windows.socialMedia.display()">Social Media</div>
                    <div class="option" onclick="windows.items.smartphone.watchVideo()">Watch video</div>
                    <div class="option" data-item="${type}-${index}" onclick="windows.items.sell(this)">Sell</div>
                    <div class="option" onclick="closeEvent()">Close</div>
                    `,
                });
            }
        },
        buy(objName, property, index) {
            let obj;
            if (objName === "items") obj = items[property][index];
            else obj = assets[property][index];

            if (property === "houses") obj.location = player.location;
            let newObj = structuredClone(obj);

            if (player.money.total >= newObj.price) {
                player.money.total -= newObj.price;
                try {
                    newObj.inventoryIndex = player.inventory[property].length;
                } catch (err) {
                    newObj.inventoryIndex = 0;
                    player.inventory[property] = [];
                }

                player.inventory[property].push(newObj);
                textContainer.innerHTML += `<p>I bought a ${newObj.label}</p>`;
                closeEvent();
                document.getElementById(`${property}-${index}`).remove();
                moneyViewer();
            } else {
                eventTitle.innerText = "Cant afford this";
                eventBody.innerHTML = `<div class="option" onclick="closeEvent()">...</div>`;
            }
        },
        consume(data, kind) {
            const type = data.getAttribute("data-item").split("-")[0];
            const index = data.getAttribute("data-item").split("-")[1];
            const item = player.inventory[type][index];
            const statChanges = item.statChanges;
            for (let stat of Object.entries(statChanges)) {
                player.stats[stat[0]] += stat[1];
                statsLimit(player);
            }
            handleStatBars(player, true);
            eventBody.innerHTML = `
            <p>You ${kind === "food" ? "ate" : "drank"} a ${item.label.toLowerCase()}</p>
            <div class="option" onclick="closeEvent()">Close</div>
            `;
            player.inventory[type].splice(index, 1);
            menu.inventory();
        },
        playInstrument(data) {
            player.actions.music++;
            player.skills.music.xp += 25;

            eventBody.innerHTML = `
            <p>+25 music skill earned!</p>
            <div class="option" onclick="closeEvent()">Close</div>
            `;
            skillLeveler();
        },
        weapon: {
            selectVictim(data) {
                let weaponIndex = data.getAttribute("data-weapon");

                let options = "";
                //one because player is 0, this may cause problems later if I decide to implement generations
                let index = 1;

                for (let person of characters) {
                    if (person.fullName !== player.fullName && person.alive) {
                        person.index = index;
                        options = options.concat(`
                            <div onclick="windows.items.weapon.kill(this)" data-weapon="${weaponIndex}" class="option" data-person="${person.index}">${person.fullName}</div>
                        `);
                        index++;
                    }
                }

                options = options.concat(
                    `<div onclick="windows.items.weapon.kill(this)" data-weapon="${weaponIndex}" class="option" data-person="beggar">Random beggar</div>`,
                );

                eventBody.innerHTML = `
                    ${options}
                    <div class="option" onclick="closeEvent()">Not a good idea</div>
                `;
            },
            kill(data) {
                const victimIndex = data.getAttribute("data-person");
                const victim = characters[victimIndex];
                const weaponIndex = data.getAttribute("data-weapon");
                const weapon = player.inventory.weapons[weaponIndex];
                const efficiency = weapon.successChance;
                const randomNum = Math.floor(Math.random() * 100);

                if (randomNum < efficiency) {
                    let name;
                    if (victim != undefined) {
                        victim.alive = false;
                        name = victim.fullName;
                        player.criminalRecord.murder++;
                    } else name = "someone";
                    eventBody.innerHTML = `
                    <h3>Success</h3>
                    <p>You have commited murder succesfully</p>
                    <div class="option" onclick="closeEvent()">Okay</div>
                    `;
                    textContainer.innerHTML += `
                    <p>I killed ${name}</p>
                    `;
                } else {
                    eventBody.innerHTML = `
                    <h3>Oh no!</h3>
                    <p>Your assasination attemp failed! you got arrested</p>
                    <div class="option" onclick="closeEvent()">...</div>
                    `;
                    menuTemplate.style.display = "none";

                    player.criminalRecord.murderAttempts++;
                    arrestByMurder(player);

                    textContainer.innerHTML += `
                    <p>My assasination attempt failed, I got denounced</p>
                    <p>I have been arrested for ${player.prison.sentenceTime} years
                    </p>
                    `;
                }
            },
        },
        computer: {
            practiceWriting() {
                player.actions.writing++;
                player.skills.writing.xp += 25;
                eventBody.innerHTML = `
                <p>+25 writing skill earned!</p>
                <div class="option" onclick="closeEvent()">Close</div>
                `;
                textContainer.innerHTML += `
                <p>I practiced writing</p>
                `;
                skillLeveler();
            },
            practiceProgramming() {
                player.actions.programming++;
                player.skills.programming.xp += 25;
                eventBody.innerHTML = `
                <p>+25 programming skill earned!</p>
                <div class="option" onclick="closeEvent()">Close</div>
                `;
                textContainer.innerHTML += `
                <p>I practiced programming</p>
                `;
                skillLeveler();
            },
            playVideogames() {
                const videogames = [
                    "Among sus",
                    "Minekampf",
                    "Call of Honor",
                    "The Binding of Ray",
                    "Hollow Warrior",
                    "Raymonds Mod",
                    "Hearts of Steel IV",
                    "Asia Universallis IV",
                    "Fall-in: New Ohio",
                ];
                player.stats.happiness += 5;

                const gamePlayed =
                    videogames[Math.floor(Math.random() * videogames.length)];

                eventBody.innerHTML = `
                <p>You played ${gamePlayed}</p>
                <p>+5 happiness</p>
                <div class="option" onclick="closeEvent()">Close</div>
                `;
                textContainer.innerHTML += `<p>I played ${gamePlayed}</p>`;
            },
        },
        smartphone: {
            watchVideo() {
                const location = countryQuery(player.location);
                if (location.laws.banned_youtube) {
                    return (eventBody.innerHTML = `
                    <p>Youtube is not available in your country</p>
                    <div class="option" onclick="closeEvent()">Close</div>
                    `);
                }

                const randomIndex = Math.floor(
                    Math.random() * popularYoutubers.length,
                );
                const randomUser = popularYoutubers[randomIndex].user;
                closeEvent();
                menuTemplate.style.display = "none";
                textContainer.innerHTML += `
                <p>I watched a video of ${randomUser}</p>
                `;
                player.stats.happiness += Math.round(Math.random() * 10);
                handleStatBars(player, true);
            },
        },
        ownedAssetWindow(data) {
            const type = data.getAttribute("data-type");
            const index = data.getAttribute("data-index");
            const asset = player.inventory[type][index];
            const canThrowParty =
                asset.location === player.location ? true : false;

            modalBackground.style.display = "flex";
            eventTitle.innerText = asset.label;
            if (type === "houses")
                eventBody.innerHTML = `
                <p><b>Age: </b>${asset.age}</p>
                <p><b>Value: </b>${moneyFormat(asset.price)} $</p>
                <p><b>Condition: </b>${asset.condition}</p>
                <p><b>Location: </b>${asset.location}</p>
                <br>

                ${
                    canThrowParty
                        ? `
                    <div class="option" onclick="windows.throwParty()">Throw a party</div>
                `
                        : ""
                }
                <div class="option" data-item="${type}-${index}" onclick="windows.items.sell(this)">Sell</div>
                <div class="option" onclick="closeEvent()">Close</div>
            `;
            else
                eventBody.innerHTML = `
                <p><b>Value: </b>${moneyFormat(asset.price)}</p>
                ${
                    player.driverLicense
                        ? `
                <div class="option" onclick="windows.drive()">Drive</div>
                `
                        : ""
                }
                <div class="option" data-item="${type}-${index}" onclick="windows.items.sell(this)">Sell</div>
                <div class="option" onclick="closeEvent()">Close</div>
            `;
        },
    }
});
