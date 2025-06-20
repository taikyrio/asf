
// Relationships management functionality
Object.assign(menu, {
    relationships() {
        if (player.age < 2) return;
        menuTemplate.style.display = 'block';
        menuTitle.innerText = 'Relationships';
        menuBody.innerHTML = `
        <div class="relationships-grid">
            <div onclick="menu.parents()" class="relationship-card">
                <div class="card-icon">👨‍👩‍👧‍👦</div>
                <div class="card-title">Parents</div>
                <div class="card-count">${player.relationships.parents.length}</div>
            </div>
            <div onclick="menu.siblings()" class="relationship-card">
                <div class="card-icon">👫</div>
                <div class="card-title">Siblings</div>
                <div class="card-count">${player.relationships.siblings.length}</div>
            </div>
            <div onclick="menu.partner()" class="relationship-card">
                <div class="card-icon">💕</div>
                <div class="card-title">Partner</div>
                <div class="card-count">${player.relationships.partner.length}</div>
            </div>
            <div onclick="menu.friends()" class="relationship-card">
                <div class="card-icon">👥</div>
                <div class="card-title">Friends</div>
                <div class="card-count">${player.relationships.friends.length}</div>
            </div>
            <div onclick="menu.offspring()" class="relationship-card">
                <div class="card-icon">👶</div>
                <div class="card-title">Children</div>
                <div class="card-count">${player.relationships.offspring.length}</div>
            </div>
        </div>
        `;
    },

    parents() {
        menuTitle.innerText = 'Parents';
        menuBody.innerHTML = `
        <div class="modern-relationships-container">
            ${player.relationships.parents.map(parent => `
                <div class="modern-relationship-item">
                    <div class="relationship-avatar">${parent.gender === 'male' ? '👨' : '👩'}</div>
                    <div class="relationship-details">
                        <div class="relationship-name">${parent.fullName}</div>
                        <div class="relationship-info">${parent.age} years old</div>
                        <div class="relationship-bar">
                            <div class="bar-fill" style="width: ${parent.stats.relationWithPlayer || 50}%"></div>
                        </div>
                        <div class="relationship-percentage">${parent.stats.relationWithPlayer || 50}%</div>
                    </div>
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
        <div class="modern-relationships-container">
            ${player.relationships.partner.length > 0 ? player.relationships.partner.map(partner => `
                <div class="modern-relationship-item">
                    <div class="relationship-avatar">${partner.gender === 'male' ? '👨' : '👩'}</div>
                    <div class="relationship-details">
                        <div class="relationship-name">${partner.fullName}</div>
                        <div class="relationship-info">${partner.age} years old</div>
                        <div class="relationship-bar">
                            <div class="bar-fill" style="width: ${partner.stats.relationWithPlayer || 50}%"></div>
                        </div>
                        <div class="relationship-percentage">${partner.stats.relationWithPlayer || 50}%</div>
                    </div>
                </div>
            `).join('') : '<div class="no-relationships">💔 Single</div>'}
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
