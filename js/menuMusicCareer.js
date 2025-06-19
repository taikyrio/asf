
// Music career management functionality
Object.assign(menu, {
    musicianCareer() {
        if (player.age < 10) {
            showEvent({
                title: 'Musician Career',
                body: '<p>You must be at least 10 years old to pursue a music career.</p><div class="option" onclick="closeEvent()">OK</div>'
            });
            return;
        }

        // Initialize music career if not exists
        if (!player.musicCareer) {
            player.musicCareer = {
                active: false,
                artists: [],
                records: [],
                tours: [],
                totalFans: Math.floor((player.stats.music || 0) * 10), // 100% music = 1000 fans, 10% = 100 fans
                totalEarnings: 0
            };
        }

        menuTitle.innerText = 'Music Career Dashboard';
        menuBody.innerHTML = `
        <div class="music-dashboard">
            <div class="music-stats">
                <h3>Music Stats</h3>
                <p><span class="yellow">Music Skill:</span> ${player.stats.music || 0}%</p>
                <p><span class="yellow">Total Fans:</span> ${player.musicCareer.totalFans.toLocaleString()}</p>
                <p><span class="yellow">Total Earnings:</span> $${player.musicCareer.totalEarnings.toLocaleString()}</p>
                <p><span class="yellow">Active Artists:</span> ${player.musicCareer.artists.length}</p>
                <p><span class="yellow">Records Released:</span> ${player.musicCareer.records.length}</p>
            </div>

            <div class="music-actions">
                <div class="music-option" onclick="menu.createArtist()">
                    <i class="fa-solid fa-microphone"></i>
                    <span>Create Artist</span>
                </div>
                <div class="music-option ${player.musicCareer.artists.length === 0 ? 'disabled' : ''}" onclick="menu.createRecord()">
                    <i class="fa-solid fa-compact-disc"></i>
                    <span>Create Record</span>
                </div>
                <div class="music-option ${player.musicCareer.records.length === 0 ? 'disabled' : ''}" onclick="menu.goOnTour()">
                    <i class="fa-solid fa-plane"></i>
                    <span>Go On Tour</span>
                </div>
                <div class="music-option" onclick="menu.viewArtistStats()">
                    <i class="fa-solid fa-chart-line"></i>
                    <span>View Artist Stats</span>
                </div>
                ${player.musicCareer.artists.length > 0 ? `
                    <div class="music-option" onclick="menu.disbandArtist()">
                        <i class="fa-solid fa-users-slash"></i>
                        <span>Disband</span>
                    </div>
                ` : ''}
            </div>
        </div>
        `;
    },

    createArtist() {
        showEvent({
            title: 'Create Artist',
            body: `
            <div class="create-artist-form">
                <h3>Create Your Musical Artist</h3>
                <input type="text" id="artist-name" placeholder="Artist/Band Name" maxlength="30">
                <select id="music-genre">
                    <option value="pop">Pop</option>
                    <option value="rock">Rock</option>
                    <option value="hip-hop">Hip Hop</option>
                    <option value="country">Country</option>
                    <option value="electronic">Electronic</option>
                    <option value="jazz">Jazz</option>
                    <option value="classical">Classical</option>
                    <option value="indie">Indie</option>
                </select>
                <select id="band-members">
                    <option value="1">Solo Artist</option>
                    <option value="2">Duo (2 members)</option>
                    <option value="3">Trio (3 members)</option>
                    <option value="4">Band (4 members)</option>
                    <option value="5">Band (5 members)</option>
                    <option value="6">Band (6 members)</option>
                    <option value="7">Band (7 members)</option>
                </select>
                <div class="option" onclick="menu.confirmCreateArtist()">Create Artist</div>
                <div class="option" onclick="closeEvent()">Cancel</div>
            </div>
            `
        });
    },

    confirmCreateArtist() {
        const artistName = document.getElementById('artist-name').value.trim();
        const genre = document.getElementById('music-genre').value;
        const members = parseInt(document.getElementById('band-members').value);

        if (!artistName) {
            alert('Please enter an artist name');
            return;
        }

        const newArtist = {
            name: artistName,
            genre: genre,
            members: members,
            fans: Math.floor((player.stats.music || 0) * 10),
            createdYear: year,
            active: true
        };

        player.musicCareer.artists.push(newArtist);
        player.musicCareer.active = true;

        textContainer.innerHTML += `<p>I created a ${genre} ${members === 1 ? 'solo career' : 'band'} called "${artistName}"</p>`;
        closeEvent();
        this.musicianCareer();
    },

    createRecord() {
        if (player.musicCareer.artists.length === 0) {
            showEvent({
                title: 'No Artist',
                body: '<p>You need to create an artist first before making records.</p><div class="option" onclick="closeEvent()">OK</div>'
            });
            return;
        }

        showEvent({
            title: 'Create Record',
            body: `
            <div class="create-record-form">
                <h3>Create New Record</h3>
                <input type="text" id="record-name" placeholder="Album/Single Name" maxlength="30">
                <select id="record-type">
                    <option value="single">Single (1 track)</option>
                    <option value="ep">EP (3-6 tracks)</option>
                    <option value="album">Album (8-16 tracks)</option>
                </select>
                <select id="production-time">
                    <option value="1">1 year production</option>
                    <option value="2">2 years production</option>
                    <option value="3">3 years production</option>
                    <option value="4">4 years production</option>
                    <option value="5">5 years production</option>
                </select>
                <div class="option" onclick="menu.confirmCreateRecord()">Start Production</div>
                <div class="option" onclick="closeEvent()">Cancel</div>
            </div>
            `
        });
    },

    confirmCreateRecord() {
        const recordName = document.getElementById('record-name').value.trim();
        const recordType = document.getElementById('record-type').value;
        const productionTime = parseInt(document.getElementById('production-time').value);

        if (!recordName) {
            alert('Please enter a record name');
            return;
        }

        const trackCounts = { single: 1, ep: Math.floor(Math.random() * 4) + 3, album: Math.floor(Math.random() * 9) + 8 };
        const tracks = trackCounts[recordType];

        const newRecord = {
            name: recordName,
            type: recordType,
            tracks: tracks,
            productionTime: productionTime,
            startYear: year,
            releaseYear: year + productionTime,
            artist: player.musicCareer.artists[0].name,
            inProduction: true
        };

        player.musicCareer.records.push(newRecord);

        textContainer.innerHTML += `<p>I started production on "${recordName}" - a ${recordType} with ${tracks} tracks</p>`;
        closeEvent();
        this.musicianCareer();
    },

    goOnTour() {
        if (player.musicCareer.records.filter(r => !r.inProduction).length === 0) {
            showEvent({
                title: 'No Released Records',
                body: '<p>You need to have at least one released record before going on tour.</p><div class="option" onclick="closeEvent()">OK</div>'
            });
            return;
        }

        const tourEarnings = Math.floor(player.musicCareer.totalFans * (0.5 + Math.random() * 0.5) * (player.stats.music / 100));
        const fanGain = Math.floor(tourEarnings / 10);

        player.musicCareer.totalFans += fanGain;
        player.musicCareer.totalEarnings += tourEarnings;
        player.money.total += tourEarnings;

        textContainer.innerHTML += `<p>I went on tour and earned $${tourEarnings.toLocaleString()}, gaining ${fanGain} new fans</p>`;
        this.musicianCareer();
    },

    viewArtistStats() {
        const completedRecords = player.musicCareer.records.filter(r => !r.inProduction);
        const inProductionRecords = player.musicCareer.records.filter(r => r.inProduction);

        // Create a stats overlay instead of using showEvent
        const statsOverlay = document.createElement('div');
        statsOverlay.className = 'stats-overlay';
        statsOverlay.innerHTML = `
            <div class="stats-modal">
                <div class="stats-header">
                    <h3>Artist Statistics</h3>
                    <button class="close-stats" onclick="this.closest('.stats-overlay').remove()">×</button>
                </div>
                <div class="stats-content">
                    <div class="artist-stats">
                        <h4>Career Overview</h4>
                        <p><span class="yellow">Total Fans:</span> ${player.musicCareer.totalFans.toLocaleString()}</p>
                        <p><span class="yellow">Total Earnings:</span> $${player.musicCareer.totalEarnings.toLocaleString()}</p>
                        <p><span class="yellow">Records Released:</span> ${completedRecords.length}</p>
                        <p><span class="yellow">Records in Production:</span> ${inProductionRecords.length}</p>
                        <p><span class="yellow">Tours Completed:</span> ${player.musicCareer.tours.length}</p>

                        <h5>Active Artists:</h5>
                        ${player.musicCareer.artists.map(artist => `
                            <p><span class="yellow">${artist.name}</span> (${artist.genre}, ${artist.members} members)</p>
                        `).join('')}

                        ${completedRecords.length > 0 ? `
                            <h5>Released Records:</h5>
                            ${completedRecords.map(record => `
                                <p>• ${record.name} (${record.type}) - ${record.tracks} tracks</p>
                            `).join('')}
                        ` : ''}

                        ${inProductionRecords.length > 0 ? `
                            <h5>Records in Production:</h5>
                            ${inProductionRecords.map(record => `
                                <p>• ${record.name} (${record.type}) - Releases in ${record.releaseYear}</p>
                            `).join('')}
                        ` : ''}
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(statsOverlay);
    },

    disbandArtist() {
        if (player.musicCareer.artists.length === 0) return;

        showEvent({
            title: 'Disband Artist',
            body: `
            <p>Are you sure you want to disband "${player.musicCareer.artists[0].name}"?</p>
            <div class="option" onclick="menu.confirmDisband()">Yes, Disband</div>
            <div class="option" onclick="closeEvent()">Cancel</div>
            `
        });
    },

    confirmDisband() {
        const artist = player.musicCareer.artists[0];
        artist.active = false;
        textContainer.innerHTML += `<p>I disbanded "${artist.name}"</p>`;
        closeEvent();
        this.musicianCareer();
    }
});
