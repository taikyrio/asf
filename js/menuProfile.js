
// Profile management functionality
Object.assign(menu, {
    identity() {
        menuTitle.innerText = 'Identity';
        menuBody.innerHTML = `
        <div class="identity-container">
            <div class="identity-item">
                <span class="yellow">First name:</span> ${player.name}
            </div>
            <div class="identity-item">
                <span class="yellow">Last name:</span> ${player.surname}
            </div>
            <div class="identity-item">
                <span class="yellow">Gender:</span> ${player.gender}
            </div>
            <div class="identity-item">
                <span class="yellow">Age:</span> ${player.age} years old
            </div>
            <div class="identity-item">
                <span class="yellow">Location:</span> ${player.location}
            </div>
            <div class="identity-item">
                <span class="yellow">Birthplace:</span> ${player.birthplace}
            </div>
            <div class="identity-item">
                <span class="yellow">Nationality:</span> ${player.nationality}
            </div>
        </div>
        `;
    },

    stats() {
        menuTitle.innerText = 'Stats';
        menuBody.innerHTML = `
        <div class="stats-container">
            <div class="stat-item">
                <span class="yellow">Health:</span> ${player.stats.health}%
            </div>
            <div class="stat-item">
                <span class="yellow">Happiness:</span> ${player.stats.happiness}%
            </div>
            <div class="stat-item">
                <span class="yellow">Smartness:</span> ${player.stats.smartness}%
            </div>
            <div class="stat-item">
                <span class="yellow">Fitness:</span> ${player.stats.fitness}%
            </div>
            <div class="stat-item">
                <span class="yellow">Appearance:</span> ${player.stats.appearance}%
            </div>
            <div class="stat-item">
                <span class="yellow">Music:</span> ${player.stats.music || 0}%
            </div>
        </div>
        `;
    },

    sexuality() {
        menuTitle.innerText = 'Sexuality';
        menuBody.innerHTML = `
        <div class="sexuality-container">
            <p>Current sexuality: <span class="yellow">${player.sexuality}</span></p>
        </div>
        `;
    },

    cRecord() {
        menuTitle.innerText = 'Criminal Record';
        menuBody.innerHTML = `
        <div class="criminal-record">
            <div class="record-item">
                <span class="yellow">Murder:</span> ${player.criminalRecord.murder}
            </div>
            <div class="record-item">
                <span class="yellow">Murder attempts:</span> ${player.criminalRecord.murderAttempts}
            </div>
            <div class="record-item">
                <span class="yellow">Years in prison:</span> ${player.criminalRecord.yearsInPrison}
            </div>
            <div class="record-item">
                <span class="yellow">Prison escapes:</span> ${player.criminalRecord.prisonEscapes}
            </div>
        </div>
        `;
    },

    cv() {
        menuTitle.innerText = 'CV';
        menuBody.innerHTML = `
        <div class="cv-container">
            ${player.cv.length > 0 ? player.cv.map(job => `
                <div class="cv-item">
                    <span class="yellow">${job.label}</span> (${job.since} - ${job.until || 'Present'})
                </div>
            `).join('') : '<p>No work experience yet.</p>'}
        </div>
        `;
    },

    inventory() {
        menuTitle.innerText = 'Inventory';
        menuBody.innerHTML = `
        <div class="inventory-container">
            <div class="inventory-section">
                <h4 class="yellow">Houses:</h4>
                ${player.inventory.houses.length > 0 ? player.inventory.houses.map(house => `<p>${house.label}</p>`).join('') : '<p>None</p>'}
            </div>
            <div class="inventory-section">
                <h4 class="yellow">Cars:</h4>
                ${player.inventory.cars.length > 0 ? player.inventory.cars.map(car => `<p>${car.label}</p>`).join('') : '<p>None</p>'}
            </div>
            <div class="inventory-section">
                <h4 class="yellow">Electronics:</h4>
                ${player.inventory.electronics.length > 0 ? player.inventory.electronics.map(item => `<p>${item.label}</p>`).join('') : '<p>None</p>'}
            </div>
        </div>
        `;
    },

    skills() {
        menuTitle.innerText = 'Skills';
        menuBody.innerHTML = `
        <div class="skills-container">
            ${Object.entries(player.skills).map(([skill, data]) => `
                <div class="skill-item">
                    <span class="yellow">${skill.charAt(0).toUpperCase() + skill.slice(1)}:</span> Level ${data.level} (${data.xp}/${data.xpNeeded} XP)
                </div>
            `).join('')}
        </div>
        `;
    }
});
