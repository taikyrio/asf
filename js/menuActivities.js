
// Activities and general actions functionality
Object.assign(menu, {
    activities() {
        if (player.age < 2) return;
        menuTemplate.style.display = 'block';
        menuTitle.innerText = 'Activities';
        menuBody.innerHTML = `
        <ul>
            <li onclick="menu.saveGame()" class="option">Save Game</li>
            <li onclick="menu.backToMenu()" class="option">Back to Menu</li>
            <li onclick="menu.freetime()" class="option activity-option">
                <span class="emoji-icon">🎮</span> Free time
            </li>
            <li onclick="menu.cars()" class="option activity-option ${player.age < 18 ? "disabled" : ""}">
                <span class="emoji-icon">🚗</span> Cars
            </li>
            <li onclick="menu.realEstate()" class="option activity-option ${player.age < 16 ? "disabled" : ""}">
                <span class="emoji-icon">🏠</span> Real Estate
            </li>
            <li onclick="menu.shopping()" class="option activity-option ${player.age < 14 ? "disabled" : ""}">
                <span class="emoji-icon">🛒</span> Shopping
            </li>
            <li onclick="menu.emigrate()" class="option activity-option ${player.age < 18 ? "disabled" : ""}">
                <span class="emoji-icon">🌍</span> Emigrate
            </li>
            <li onclick="windows.driverLicense.display()" class="option activity-option ${player.age < 18 ? "disabled" : ""}">
                <span class="emoji-icon">🚗</span> Driver license
            </li>
            <li onclick="windows.love.findLove()" class="option activity-option ${player.age < 14 ? "disabled" : ""}">
                <span class="emoji-icon">💕</span> Love
            </li>
            <li onclick="windows.plasticSurgeries.display()" class="option activity-option ${player.age < 18 ? "disabled" : ""}">
                <span class="emoji-icon">💄</span> Plastic surgeries
            </li>
            <li onclick="windows.university.display()" class="option activity-option ${player.age < 18 ? "disabled" : ""}">
                <span class="emoji-icon">🎓</span> University
            </li>
            <li class="option activity-option ${player.age < 14 ? "disabled" : ""}" onclick="menu.criminal()">
                <span class="emoji-icon">🔫</span> Criminal
            </li>
            <li class="option activity-option ${player.age < 5 ? "disabled" : ""}" onclick="windows.suicide.display()">
                <span class="emoji-icon">☠️</span> Suicide
            </li>
        </ul>
        `;
    },

    criminal() {
        if (player.age < 14) return;

        menuTemplate.style.display = "block";
        menuTitle.innerText = "Criminal";
        menuBody.innerHTML = `
        <ul>
            <li class="option activity-option" onclick="windows.criminal.murder.display()">
                Murder
            </li>
            <li class="option activity-option" onclick="windows.criminal.stealCar.display()">
                Steal Car
            </li>
            <li class="option activity-option" onclick="alert('coming soon')">
                Robbery
            </li>
        </ul>
        `;
    },

    freetime() {
        menuTemplate.style.display = "block";
        menuTitle.innerText = "Free time";
        menuBody.innerHTML = `
        <ul>
        <li class="option ${player.age < 8 ? "disabled" : ""}" onclick="windows.freetime.handleSwitch('reading')">
        <div class="column">
            <h4>Read books</h4>
            <p class="yellow">+3 smartness</p>
        </div> 
        <div class="column switch-container">
            <div class="switch-background">
            <div class="switch" id="freetime-reading"
            style="float:${player.freetime.isReading ? "right" : "left"}"></div>
            </div>
            <p class="green">200$</p>
        </div>
        </li>

        <li class="option ${player.age < 7 ? "disabled" : ""}" onclick="windows.freetime.handleSwitch('musicLessons')">
        <div class="column">
            <h4>Take music lessons</h4>
            <p class="yellow">+25 music</p>
        </div>
        <div class="column switch-container">
            <div class="switch-background">
                <div class="switch" id="freetime-musicLessons"
                style="float:${player.freetime.isTakingMusicLessons ? "right" : "left"}"></div>
            </div>
            <p class="green">2000$</p>
        </div>
        </li>

        <li class="option ${player.age < 2 ? "disabled" : ""}" onclick="windows.freetime.handleSwitch('parties')">
        <div class="column">
            <h4>Attend parties</h4>
            <p class="yellow">+5 happiness</p>
        </div>
        <div class="column switch-container">
            <div class="switch-background">
                <div class="switch" id="freetime-parties"
                style="float:${player.freetime.isAttendingParties ? "right" : "left"}"></div>
            </div>
            <p class="green">500$</p>
        </div>
        </li>

        <li class="option ${player.age < 16 ? "disabled" : ""}" onclick="windows.freetime.handleSwitch('gym')">
        <div class="column">
            <h4>Go to gym</h4>
            <p class="yellow">+3 fitness</p>
        </div>
        <div class="column switch-container">
            <div class="switch-background">
                <div class="switch" id="freetime-gym"
                style="float:${player.freetime.goesToGym ? "right" : "left"}"></div>
            </div>
            <p class="green">1800$</p>
        </div>
        </li>

        <li class="option ${player.age < 12 ? "disabled" : ""}" onclick="windows.freetime.restaurant.display()">
            Go to a restaurant
        </li>

        <li class="option ${player.age < 12 ? "disabled" : ""}" onclick="windows.freetime.cinema.display()">
            Watch a movie
        </li>

        <li class="option ${player.age < 18 ? "disabled" : ""}" onclick="windows.freetime.goClubbing.display()">
            Go clubbing
        </li>
        </ul>
        `;
    },

    cars() {
        if (player.age < 18) return;

        menuTemplate.style.display = "block";
        menuTitle.innerText = "Cars";
        menuBody.innerHTML = `
        <div class="assetsContainer">
            <div id="assets-header">
                <div id="ownedTab" class="tab" data-type="cars" onclick="menu.assetsHandler(this)">
                    Owned
                </div>
                <div id="marketTab" class="tab active" data-type="cars" onclick="menu.assetsHandler(this)">
                    Market
                </div>
            </div>
            <div id="cell-container">
                ${carsOptions || ''}
            </div>
        </div>`;
    },

    realEstate() {
        if (player.age < 16) return;

        menuTemplate.style.display = "block";
        menuTitle.innerText = "Real Estate";
        menuBody.innerHTML = `
        <div class="assetsContainer">
            <div id="assets-header">
                <div id="ownedTab" class="tab" data-type="houses" onclick="menu.assetsHandler(this)">
                    Owned
                </div>
                <div id="marketTab" class="tab active" data-type="houses" onclick="menu.assetsHandler(this)">
                    Market
                </div>
            </div>
            <div id="cell-container">
                ${housesOptions || ''}
            </div>
        </div>`;
    },

    emigrate() {
        if (player.age < 18) return;
        menuTemplate.style.display = "block";
        menuTitle.innerText = "Emigrate";
        menuBody.innerHTML = `
        <div id="select-container">
            <select id="country-chooser">
            ${countriesList()}
            </select>
        </div>
        <ul>
        <li data-triggers="windows" onclick="windows.emigrate()" class="option">Emigrate</li>
        <li data-triggers="windows" onclick="menu.activities()" class="option">Cancel</li>
        </ul>

        `;
    }
});
