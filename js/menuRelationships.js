
// Relationships management functionality
Object.assign(menu, {
    relationships() {
        if (player.age < 2) return;
        menuTemplate.style.display = 'block';
        menuTitle.innerText = 'Relationships';
        menuBody.innerHTML = `
        <ul>
            <li onclick="menu.parents()" class="option">Parents</li>
            <li onclick="menu.siblings()" class="option">Siblings</li>
            <li onclick="menu.partner()" class="option">Partner</li>
            <li onclick="menu.friends()" class="option">Friends</li>
            <li onclick="menu.offspring()" class="option">Children</li>
        </ul>
        `;
    },

    parents() {
        menuTitle.innerText = 'Parents';
        menuBody.innerHTML = `
        <div class="relationships-container">
            ${player.relationships.parents.map(parent => `
                <div class="relationship-item">
                    <span class="yellow">${parent.fullName}</span> (${parent.gender}, ${parent.age} years old)
                    <br>Relationship: ${parent.stats.relationWithPlayer || 50}%
                </div>
            `).join('')}
        </div>
        `;
    },

    siblings() {
        menuTitle.innerText = 'Siblings';
        menuBody.innerHTML = `
        <div class="relationships-container">
            ${player.relationships.siblings.length > 0 ? player.relationships.siblings.map(sibling => `
                <div class="relationship-item">
                    <span class="yellow">${sibling.fullName}</span> (${sibling.gender}, ${sibling.age} years old)
                    <br>Relationship: ${sibling.stats.relationWithPlayer || 50}%
                </div>
            `).join('') : '<p>No siblings.</p>'}
        </div>
        `;
    },

    partner() {
        menuTitle.innerText = 'Partner';
        menuBody.innerHTML = `
        <div class="relationships-container">
            ${player.relationships.partner.length > 0 ? player.relationships.partner.map(partner => `
                <div class="relationship-item">
                    <span class="yellow">${partner.fullName}</span> (${partner.gender}, ${partner.age} years old)
                    <br>Relationship: ${partner.stats.relationWithPlayer || 50}%
                </div>
            `).join('') : '<p>Single.</p>'}
        </div>
        `;
    },

    friends() {
        menuTitle.innerText = 'Friends';
        menuBody.innerHTML = `
        <div class="relationships-container">
            ${player.relationships.friends.length > 0 ? player.relationships.friends.map(friend => `
                <div class="relationship-item">
                    <span class="yellow">${friend.fullName}</span> (${friend.gender}, ${friend.age} years old)
                    <br>Relationship: ${friend.stats.relationWithPlayer || 50}%
                </div>
            `).join('') : '<p>No friends yet.</p>'}
        </div>
        `;
    },

    offspring() {
        menuTitle.innerText = 'Children';
        menuBody.innerHTML = `
        <div class="relationships-container">
            ${player.relationships.offspring.length > 0 ? player.relationships.offspring.map(child => `
                <div class="relationship-item">
                    <span class="yellow">${child.fullName}</span> (${child.gender}, ${child.age} years old)
                    <br>Relationship: ${child.stats.relationWithPlayer || 50}%
                </div>
            `).join('') : '<p>No children.</p>'}
        </div>
        `;
    }
});
