class MiniGames {
    static currentUserSequence = [];

    static generateSequence() {
        const length = Math.floor(Math.random() * 3) + 3; // 3-5 notes
        const sequence = [];
        for (let i = 0; i < length; i++) {
            sequence.push(Math.floor(Math.random() * 3) + 1);
        }
        return sequence;
    }

    // Fitness Challenge minigame
    static createFitnessChallenge() {
        if (typeof createStoryEvent === "function") {
            const exercise = ["push-ups", "sit-ups", "squats", "jumping jacks"][
                Math.floor(Math.random() * 4)
            ];
            const target = Math.floor(Math.random() * 20) + 10;

            createStoryEvent({
                title: "💪 Fitness Challenge",
                body: (id) => {
                    return `<p>Time for a ${exercise} challenge!</p>
                    <p>Try to do <strong>${target}</strong> ${exercise}!</p>
                    <div class="option" onclick="MiniGames.completeFitnessChallenge('${id}', ${target})">Do the exercise</div>
                    <div class="option" onclick="closeStoryEvent('${id}')">Skip</div>`;
                },
            });
        }
    }

    static completeFitnessChallenge(id, target) {
        const success = Math.random() > 0.3; // 70% success rate

        if (success) {
            player.stats.fitness += Math.floor(target / 5);
            player.stats.health += 5;
            textContainer.innerHTML += `<p class="green">Completed ${target} exercises! Fitness improved</p>`;
        } else {
            player.stats.fitness += 1;
            textContainer.innerHTML += `<p>Tried my best but couldn't complete all exercises</p>`;
        }

        statsLimit(player);
        closeStoryEvent(id);
        scrolldown(textContainer);
    }

    static addToSequence(note) {
        if (!this.currentUserSequence) {
            this.currentUserSequence = [];
        }
        this.currentUserSequence.push(note);

        const userSequenceDiv = document.getElementById("user-sequence");
        if (userSequenceDiv) {
            const noteSymbols = ["🎵", "🎶", "🎼"];
            userSequenceDiv.innerHTML = `Your sequence: ${this.currentUserSequence.map((n) => noteSymbols[n - 1]).join(" ")}`;
        }
    }

    static checkSequence(id, targetSequence) {
        if (!this.currentUserSequence) {
            this.currentUserSequence = [];
        }

        const isCorrect =
            JSON.stringify(this.currentUserSequence) ===
            JSON.stringify(targetSequence);

        if (isCorrect) {
            player.stats.music += 10;
            player.stats.happiness += 5;
            textContainer.innerHTML += `<p class="green">Perfect rhythm! Music skill improved</p>`;
        } else {
            player.stats.music += 2;
            textContainer.innerHTML += `<p>Not quite right, but good effort</p>`;
        }

        statsLimit(player);
        closeStoryEvent(id);
        scrolldown(textContainer);
        this.currentUserSequence = [];
    }

    // Music Rhythm Game
    static createMusicRhythmGame() {
        if (typeof createStoryEvent === "function") {
            const sequence = this.generateSequence();

            createStoryEvent({
                title: "🎵 Music Rhythm Game",
                body: (id) => {
                    return `<p>Follow the rhythm pattern!</p>
                    <p>Pattern: ${sequence.map((n) => ["🎵", "🎶", "🎼"][n - 1]).join(" ")}</p>
                    <div id="user-sequence">Your sequence: </div>
                    <div class="rhythm-buttons">
                        <div class="option" onclick="MiniGames.addToSequence(1)">🎵</div>
                        <div class="option" onclick="MiniGames.addToSequence(2)">🎶</div>
                        <div class="option" onclick="MiniGames.addToSequence(3)">🎼</div>
                    </div>
                    <div class="option" onclick="MiniGames.checkSequence('${id}', ${JSON.stringify(sequence)})">Submit</div>`;
                },
            });
        }
    }
}
