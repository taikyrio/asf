
// Career and job management functionality
Object.assign(menu, {
    job() {
        if (player.age < 18) {
            showEvent({
                title: 'Career Locked',
                body: '<p>You must be at least 18 years old to access most career options.</p><div class="option" onclick="closeEvent()">OK</div>'
            });
            return;
        }

        menuTemplate.style.display = 'block';
        menuTitle.innerText = 'Career';

        // Check for special musician career (available from age 10)
        const musicianOption = player.age >= 10 ? '<li onclick="menu.musicianCareer()" class="option special-career">🎵 Musician Career</li>' : '';

        menuBody.innerHTML = `
        <div class="career-grid">
            ${musicianOption}
            <div class="career-category">
                <h3>Available Jobs</h3>
                <div class="jobs-list">
                    ${this.generateJobsList()}
                </div>
            </div>
            ${player.job !== 'none' ? `
                <div class="current-job">
                    <h3>Current Job</h3>
                    <p><span class="yellow">${player.job.label}</span></p>
                    <p>Salary: $${player.job.salary.toLocaleString()}</p>
                    <p>Performance: ${player.job.performance || 50}%</p>
                </div>
            ` : ''}
        </div>
        `;
    },

    generateJobsList() {
        const availableJobs = jobs.filter(job => {
            // Check age requirement
            if (job.requirements.minAge && player.age < job.requirements.minAge) return false;

            // Check education requirement
            if (job.requirements.education && !player.career[job.requirements.education]) return false;

            // Check skill requirements
            for (const [skill, level] of Object.entries(job.requirements)) {
                if (skill !== 'minAge' && skill !== 'education' && skill !== 'criminalRecord' && skill !== 'driverLicense') {
                    if (player.stats[skill] < level) return false;
                }
            }

            return true;
        });

        return availableJobs.map(job => `
            <div class="job-item" onclick="menu.applyForJob('${job.label}')">
                <div class="job-title">${job.label}</div>
                <div class="job-salary">$${job.salary.toLocaleString()}/year</div>
                <div class="job-field">${job.field || 'General'}</div>
            </div>
        `).join('');
    },

    applyForJob(jobLabel) {
        const job = jobs.find(j => j.label === jobLabel);
        if (!job) return;

        if (player.job !== 'none') {
            showEvent({
                title: 'Job Application',
                body: `<p>You already have a job. Do you want to quit your current position and apply for ${job.label}?</p>
                       <div class="option" onclick="menu.confirmJobChange('${jobLabel}')">Yes, Apply</div>
                       <div class="option" onclick="closeEvent()">Cancel</div>`
            });
        } else {
            this.confirmJobChange(jobLabel);
        }
    },

    confirmJobChange(jobLabel) {
        const job = jobs.find(j => j.label === jobLabel);
        if (!job) return;

        // Quit current job if any
        if (player.job !== 'none') {
            player.job.until = year;
            player.cv.push(player.job);
            player.money.income -= player.job.salary;
        }

        // Start new job
        player.job = Object.assign({}, job, {
            since: year,
            performance: 50
        });
        player.money.income += job.salary;

        textContainer.innerHTML += `<p>I got a job as a ${job.label}</p>`;
        closeEvent();
        menuTemplate.style.display = 'none';
    }
});
