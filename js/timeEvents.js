
class TimeBasedEvents {
    static holidays = {
        'new_year': { month: 1, day: 1, name: 'New Year' },
        'valentines': { month: 2, day: 14, name: "Valentine's Day" },
        'halloween': { month: 10, day: 31, name: 'Halloween' },
        'christmas': { month: 12, day: 25, name: 'Christmas' }
    };
    
    static checkHolidays() {
        const currentDate = new Date();
        const month = currentDate.getMonth() + 1;
        const day = currentDate.getDate();
        
        for (let [key, holiday] of Object.entries(this.holidays)) {
            if (holiday.month === month && holiday.day === day) {
                this.celebrateHoliday(holiday);
                break;
            }
        }
    }
    
    static celebrateHoliday(holiday) {
        switch (holiday.name) {
            case 'New Year':
                createStoryEvent({
                    title: '🎊 Happy New Year!',
                    body: (id) => `
                        <p>It's New Year! How do you want to celebrate?</p>
                        <div class="option" onclick="TimeBasedEvents.holidayChoice('${id}', 'party', 15)">Throw a party (+15 happiness)</div>
                        <div class="option" onclick="TimeBasedEvents.holidayChoice('${id}', 'quiet', 5)">Quiet celebration (+5 happiness)</div>
                        <div class="option" onclick="closeStoryEvent('${id}')">Ignore it</div>
                    `
                });
                break;
                
            case "Valentine's Day":
                if (player.relationships.partner.length > 0) {
                    createStoryEvent({
                        title: '💖 Valentine\'s Day',
                        body: (id) => `
                            <p>It's Valentine's Day! What do you do with your partner?</p>
                            <div class="option" onclick="TimeBasedEvents.holidayChoice('${id}', 'romantic', 20)">Romantic dinner (-$500, +20 happiness)</div>
                            <div class="option" onclick="TimeBasedEvents.holidayChoice('${id}', 'simple', 10)">Simple gift (-$100, +10 happiness)</div>
                            <div class="option" onclick="closeStoryEvent('${id}')">Nothing</div>
                        `
                    });
                }
                break;
                
            case 'Halloween':
                createStoryEvent({
                    title: '🎃 Halloween',
                    body: (id) => `
                        <p>It's Halloween! What do you do?</p>
                        <div class="option" onclick="TimeBasedEvents.holidayChoice('${id}', 'costume', 12)">Dress up in costume (+12 happiness)</div>
                        <div class="option" onclick="TimeBasedEvents.holidayChoice('${id}', 'candy', 8)">Give out candy (+8 happiness)</div>
                        <div class="option" onclick="closeStoryEvent('${id}')">Stay home</div>
                    `
                });
                break;
                
            case 'Christmas':
                createStoryEvent({
                    title: '🎄 Merry Christmas!',
                    body: (id) => `
                        <p>It's Christmas! How do you celebrate?</p>
                        <div class="option" onclick="TimeBasedEvents.holidayChoice('${id}', 'family', 25)">Family gathering (+25 happiness)</div>
                        <div class="option" onclick="TimeBasedEvents.holidayChoice('${id}', 'gifts', 15)">Exchange gifts (-$300, +15 happiness)</div>
                        <div class="option" onclick="closeStoryEvent('${id}')">Quiet day</div>
                    `
                });
                break;
        }
    }
    
    static holidayChoice(id, choice, happiness) {
        player.stats.happiness += happiness;
        
        switch (choice) {
            case 'party':
                player.money.total -= 200;
                textContainer.innerHTML += `<p>I threw a New Year's party</p>`;
                break;
            case 'romantic':
                player.money.total -= 500;
                textContainer.innerHTML += `<p>I had a romantic Valentine's dinner</p>`;
                break;
            case 'simple':
                player.money.total -= 100;
                textContainer.innerHTML += `<p>I gave my partner a Valentine's gift</p>`;
                break;
            case 'costume':
                textContainer.innerHTML += `<p>I dressed up for Halloween</p>`;
                break;
            case 'candy':
                textContainer.innerHTML += `<p>I gave out Halloween candy</p>`;
                break;
            case 'family':
                textContainer.innerHTML += `<p>I celebrated Christmas with family</p>`;
                break;
            case 'gifts':
                player.money.total -= 300;
                textContainer.innerHTML += `<p>I exchanged Christmas gifts</p>`;
                break;
        }
        
        statsLimit(player);
        closeStoryEvent(id);
        scrolldown(textContainer);
    }
    
    static seasonalEvents() {
        const season = Math.floor((year % 4));
        const eventChance = Math.floor(Math.random() * 100);
        
        if (eventChance < 15) {
            switch (season) {
                case 0: // Spring
                    textContainer.innerHTML += `<p>Spring has arrived, I feel more energetic</p>`;
                    player.stats.health += 3;
                    break;
                case 1: // Summer
                    if (Math.random() < 0.5) {
                        textContainer.innerHTML += `<p>Perfect summer weather for outdoor activities</p>`;
                        player.stats.fitness += 2;
                    }
                    break;
                case 2: // Fall
                    textContainer.innerHTML += `<p>Autumn colors make me contemplative</p>`;
                    player.stats.smartness += 2;
                    break;
                case 3: // Winter
                    textContainer.innerHTML += `<p>Cold winter weather affects my mood</p>`;
                    player.stats.happiness -= 1;
                    break;
            }
            statsLimit(player);
        }
    }
}

// Add to annual changes
const originalAnnualChangesTime = annualChanges;
window.annualChanges = function() {
    originalAnnualChangesTime();
    TimeBasedEvents.checkHolidays();
    TimeBasedEvents.seasonalEvents();
}
