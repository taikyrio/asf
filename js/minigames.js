
class MiniGames {
    static programmingChallenge() {
        const challenges = [
            { question: "What does HTML stand for?", answers: ["HyperText Markup Language", "High Tech Modern Language", "Home Tool Markup Language"], correct: 0 },
            { question: "Which language is primarily used for web styling?", answers: ["JavaScript", "CSS", "Python"], correct: 1 },
            { question: "What does 'var' declare in JavaScript?", answers: ["A function", "A variable", "A class"], correct: 1 },
            { question: "Which of these is a programming loop?", answers: ["if", "for", "function"], correct: 1 }
        ];
        
        const challenge = challenges[Math.floor(Math.random() * challenges.length)];
        
        createStoryEvent({
            title: '💻 Programming Challenge',
            body: (id) => `
                <p><strong>${challenge.question}</strong></p>
                ${challenge.answers.map((answer, index) => 
                    `<div class="option" onclick="MiniGames.checkAnswer('${id}', ${index}, ${challenge.correct}, 'programming')">${answer}</div>`
                ).join('')}
            `
        });
    }
    
    static musicRhythmGame() {
        const sequences = [
            [1, 2, 3, 1],
            [2, 1, 3, 2, 1],
            [3, 2, 1, 3, 2],
            [1, 3, 2, 1, 3]
        ];
        
        const sequence = sequences[Math.floor(Math.random() * sequences.length)];
        const userSequence = [];
        
        createStoryEvent({
            title: '🎵 Music Rhythm Challenge',
            body: (id) => `
                <p>Repeat this rhythm sequence:</p>
                <p><strong>${sequence.map(n => ['🎵', '🎶', '🎼'][n-1]).join(' ')}</strong></p>
                <div id="rhythm-buttons">
                    <div class="option" onclick="MiniGames.addToSequence(1)">🎵</div>
                    <div class="option" onclick="MiniGames.addToSequence(2)">🎶</div>
                    <div class="option" onclick="MiniGames.addToSequence(3)">🎼</div>
                </div>
                <p id="user-sequence">Your sequence: </p>
                <div class="option" onclick="MiniGames.checkSequence('${id}', [${sequence}])">Submit</div>
            `
        });
        
        this.currentUserSequence = [];
    }
    
    static addToSequence(note) {
        this.currentUserSequence.push(note);
        const display = document.getElementById('user-sequence');
        if (display) {
            const symbols = this.currentUserSequence.map(n => ['🎵', '🎶', '🎼'][n-1]).join(' ');
            display.innerHTML = `Your sequence: ${symbols}`;
        }
    }
    
    static checkSequence(id, correctSequence) {
        const isCorrect = JSON.stringify(this.currentUserSequence) === JSON.stringify(correctSequence);
        
        if (isCorrect) {
            player.skills.music.xp += 25;
            player.stats.happiness += 10;
            textContainer.innerHTML += `<p class="green">Perfect rhythm! Music skill improved</p>`;
        } else {
            textContainer.innerHTML += `<p>Rhythm was off, but I learned something</p>`;
            player.skills.music.xp += 5;
        }
        
        statsLimit(player);
        skillLeveler();
        closeStoryEvent(id);
        scrolldown(textContainer);
    }
    
    static fitnessChallenge() {
        const exercises = ['push-ups', 'sit-ups', 'jumping jacks', 'burpees'];
        const exercise = exercises[Math.floor(Math.random() * exercises.length)];
        const target = 10 + Math.floor(Math.random() * 20);
        
        createStoryEvent({
            title: '💪 Fitness Challenge',
            body: (id) => `
                <p>Gym trainer challenges you to do ${target} ${exercise}!</p>
                <div class="option" onclick="MiniGames.fitnessAttempt('${id}', ${target}, 'easy')">Take it easy (50% success)</div>
                <div class="option" onclick="MiniGames.fitnessAttempt('${id}', ${target}, 'normal')">Normal effort (75% success)</div>
                <div class="option" onclick="MiniGames.fitnessAttempt('${id}', ${target}, 'intense')">Go all out (90% success, more reward)</div>
                <div class="option" onclick="closeStoryEvent('${id}')">Skip the challenge</div>
            `
        });
    }
    
    static fitnessAttempt(id, target, intensity) {
        let successChance, reward;
        
        switch (intensity) {
            case 'easy':
                successChance = 0.5;
                reward = 3;
                break;
            case 'normal':
                successChance = 0.75;
                reward = 6;
                break;
            case 'intense':
                successChance = 0.9;
                reward = 10;
                break;
        }
        
        const success = Math.random() < successChance;
        
        if (success) {
            player.stats.fitness += reward;
            player.stats.health += Math.floor(reward / 2);
            textContainer.innerHTML += `<p class="green">Successfully completed the fitness challenge!</p>`;
        } else {
            player.stats.fitness += 1;
            textContainer.innerHTML += `<p>Couldn't complete the full challenge, but got some exercise</p>`;
        }
        
        statsLimit(player);
        closeStoryEvent(id);
        scrolldown(textContainer);
    }
    
    static checkAnswer(id, selected, correct, skill) {
        if (selected === correct) {
            player.skills[skill].xp += 20;
            player.stats.smartness += 5;
            textContainer.innerHTML += `<p class="green">Correct answer! ${skill} skill improved</p>`;
        } else {
            player.skills[skill].xp += 5;
            textContainer.innerHTML += `<p>Wrong answer, but I learned something</p>`;
        }
        
        statsLimit(player);
        skillLeveler();
        closeStoryEvent(id);
        scrolldown(textContainer);
    }
}

// Add mini-game opportunities to existing activities
const originalJobEvents = jobEvents[0].display;
jobEvents.push({
    display() {
        if (player.job.field === 'technology' && Math.random() < 0.3) {
            MiniGames.programmingChallenge();
        } else {
            originalJobEvents();
        }
    }
});
