const childhoodEducation = {
    preschool: {
        label:'Preschool',
        since: 3,
        until: 5,
    },
    elementary: {
        label: 'Elementary school',
        since: 5,
    }
}

const universityCareers = {
    medic: {
        label: 'medic',
        name: 'Medic',
        duration: 4,
        buff(player) {
            player.stats.smartness += Math.floor(Math.random() * 5)
        }
    },
    computerScience: {
        label: 'computerScience',
        name: 'Computer science',
        duration: 4,
        buff(player) {
            player.stats.smartness += Math.floor(Math.random() * 5)
            player.skills.programming.xp += 50 + Math.floor(Math.random() * 20)
        }
    },
    biology: {
        label: 'biology',
        name: 'Biology',
        duration: 4,
        buff(player) {
            player.stats.smartness += Math.floor(Math.random() * 5)
        }
    },
    chemistry: {
        label: 'chemistry',
        name: 'Chemistry',
        duration: 4,
        buff(player) {
            player.stats.smartness += Math.floor(Math.random() * 5)
        }
    },
    history : {
        label: 'history',
        name: 'History',
        duration: 4,
        buff(player) {
            player.stats.smartness += Math.floor(Math.random() * 5)
        }
    },
    politicalScience: {
        label: 'politicalScience',
        name: 'Political science',
        duration: 4,
        buff(player) {
            player.stats.smartness += Math.floor(Math.random() * 5)
        }
    },
    math: {
        label: 'math',
        name: 'Math',
        duration: 4,
        buff(player) {
            player.stats.smartness += Math.floor(Math.random() * 5)
        }
    },
    music: {
        label: 'music',
        name: 'Music',
        duration: 4,
        buff(player) {
            player.skills.music.xp += 30 + Math.floor(Math.random() * 20)
        }
    },
    business: {
        label: 'business',
        name: 'Business Administration',
        duration: 4,
        buff(player) {
            player.stats.smartness += Math.floor(Math.random() * 5)
        }
    },
    military: {
        label: 'military',
        name: 'Military Academy',
        duration: 2,
        buff(player) {
            player.stats.fitness += Math.floor(Math.random() * 5)
            player.stats.health += Math.floor(Math.random() * 3)
        }
    },


}

const jobs = [
    {
        label: 'Jr App Developer',
        requirements: {
            education: 'computerScience',
            programming: 3
        },
        salary: 55000,
        field: 'technology',
        promotion: 'App Developer',
        buff(player){
            player.skills.programming.xp += 5 + Math.floor(Math.random() * 20);
        }
    }, {
        label: 'App Developer',
        requirements: {
            education: 'computerScience',
            programming: 5
        },
        salary: 75000,
        field: 'technology',
        promotion: 'Sr App Developer',
        buff(player){
            player.skills.programming.xp += 5 + Math.floor(Math.random() * 20);
        }
    }, {
        label: 'Sr App Developer',
        requirements: {
            education: 'computerScience',
            programming: 8
        },
        salary: 100000,
        field: 'technology',
        promotion: 'none',
        buff(player){
            player.skills.programming.xp += 5 + Math.floor(Math.random() * 20);
        }
    }, {
        label: 'Supermarket cashier',
        requirements: {
            minAge: 16
        },
        salary: 25000,
        field: '',
        promotion: 'none',
        buff(player){
            return
        }
    },{
        label: 'Janitor',
        requirements: {
            minAge: 16
        },
        salary: 18000,
        field: '',
        promotion: 'none',
        buff(player){
            player.skills.handiness.xp += 5 + Math.floor(Math.random() * 20);
        }
    }, {
        label: 'History teacher',
        requirements: {
            minAge: 20,
            education: 'history'
        },
        salary: 50000,
        field: 'history',
        promotion: 'none',
        buff(player){
            return
        }
    },{
        label: 'Math teacher',
        requirements: {
            minAge: 20,
            education: 'math'
        },
        salary: 50000,
        field: 'math',
        promotion: 'none',
        buff(player){
            return
        }
    },{
        label: 'Gym trainer',
        requirements: {
            minAge: 18,
            fitness: 70
        },
        salary: 36000,
        field: 'fitness',
        promotion: 'none',
        buff(player){
            return
        }
    }, {
        label: 'Chemistry teacher',
        requirements: {
            minAge: 20,
            education: 'chemistry'
        },
        salary: 50000,
        field: 'chemistry',
        promotion: 'none',
        buff(player){
            return
        }
    }, {
        label: 'Biology teacher',
        requirements: {
            minAge: 20,
            education: 'biology'
        },
        salary: 50000,
        field: 'biology',
        promotion: 'none',
        buff(player){
            return
        }
    }, {
        label: 'Jr Web developer',
        requirements: {
            minAge: 18,
            education: 'computerScience',
            programming: 2
        },
        salary: 52000,
        field: 'technology',
        promotion: 'Web developer',
        buff(player){
            player.skills.programming.xp += 5 + Math.floor(Math.random() * 20);
        }
    }, {
        label: 'Web developer',
        requirements: {
            education: 'computerScience',
            programming: 4
        },
        salary: 65000,
        field: 'technology',
        promotion: 'Sr Web developer',
        buff(player){
            player.skills.programming.xp += 5 + Math.floor(Math.random() * 20);
        }
    }, {
        label: 'Sr Web developer',
        requirements: {
            education: 'computerScience',
            programming: 7
        },
        salary: 80000,
        field: 'technology',
        promotion: 'none',
        buff(player){
            player.skills.programming.xp += 5 + Math.floor(Math.random() * 20);
        }
    }, {
        label: 'Truck driver',
        requirements: {
            driverLicense: true
        },
        salary: 40000,
        field: 'transport',
        promotion: 'none',
        buff(player){
            return
        }
    }, {
        label: 'Taxi driver',
        requirements: {
            driverLicense: true
        },
        salary: 48000,
        field: 'transport',
        promotion: 'none',
        buff(player){
            return
        }
    }, {
        label: 'Music teacher',
        requirements: {
            education: 'music',
            music: 2
        },
        salary: 50000,
        field: 'music',
        promotion: 'none',
        buff(player){
            player.skills.music.xp += 5 + Math.floor(Math.random() * 20);
        }
    }, {
        label: 'Pianist',
        requirements: {
            education: 'music',
            music: 4
        },
        salary: 55000,
        field: 'music',
        promotion: 'none',
        buff(player){
            player.skills.music.xp += 5 + Math.floor(Math.random() * 20);
        }
    }, {
        label: 'Guru',
        requirements: {
            happiness: 100,
            health: 100,
            minAge: 18,
            criminalRecord: 'clean'
        },
        salary: 78000,
        promotion: 'none',
        buff(player){
            return
        }
    },
    {
        label: 'Apprentice carpenter',
        requirements: {
            minAge: 18,
            handiness: 5,
            fitness: 70
        },
        salary: 41000,
        field: 'construction',
        promotion: 'none',
        buff(player){
            player.skills.handiness.xp += 5 + Math.floor(Math.random() * 20);
        }
    },
    {
        label: 'Apprentice construction worker',
        requirements: {
            handiness: 5,
            minAge: 18
        },
        salary: 30000,
        field: 'construction',
        promotion: 'Construction worker',
        buff(player){
            player.skills.handiness.xp += 5 + Math.floor(Math.random() * 20);
        }
    },
    {
        label: 'Construction worker',
        requirements: {
            handiness: 8,
            minAge: 18
        },
        salary: 40000,
        field: 'construction',
        promotion: 'none',
        buff(player){
            player.skills.handiness.xp += 5 + Math.floor(Math.random() * 20);
        }
    },
    {
        label: 'Police officer',
        requirements: {
            fitness: 85,
            minAge: 25,
            criminalRecord: 'clean'
        },
        salary: 55000,
        field: 'lawEnforcement',
        promotion: 'none',
        buff(player){
            return
        }
    },
    {
        label: 'Barber',
        requirements: {
            handiness: 3,
            minAge: 18,
            criminalRecord: 'clean'
        },
        salary: 24000,
        field: 'smallBussiness',
        promotion: 'none',
        buff(player){
            return
        }
    },
    {
        label: 'Apprentice pediatrician',
        requirements: {
            education: 'medic',
            minAge: 20,
        },
        salary: 50000,
        field: 'medicine',
        promotion: 'Pediatrician',
        buff(player){
            return
        }
    },
    {
        label:'Pediatrician',
        requirements: {
            education: 'medic',
            minAge: 20,
            handiness: 3
        },
        salary: 75000,
        field: 'medicine',
        promotion: 'none',
        buff(player){
            return
        }
    },
    {
        label: 'Army Private',
        requirements: {
            education: 'military',
            fitness: 80,
            minAge: 18,
            criminalRecord: 'clean'
        },
        salary: 45000,
        field: 'military',
        promotion: 'Army Sergeant',
        buff(player){
            player.stats.fitness += Math.floor(Math.random() * 3)
            player.stats.health += Math.floor(Math.random() * 2)
        }
    },
    {
        label: 'Army Sergeant',
        requirements: {
            education: 'military',
            fitness: 85,
            minAge: 22
        },
        salary: 65000,
        field: 'military',
        promotion: 'Army Officer',
        buff(player){
            player.stats.fitness += Math.floor(Math.random() * 3)
        }
    },
    {
        label: 'Army Officer',
        requirements: {
            education: 'military',
            fitness: 90,
            minAge: 26
        },
        salary: 85000,
        field: 'military',
        promotion: 'none',
        buff(player){
            player.stats.fitness += Math.floor(Math.random() * 2)
        }
    },
    {
        label: 'YouTuber',
        requirements: {
            minAge: 16,
            socialMediaFollowers: 1000
        },
        salary: 30000,
        field: 'entertainment',
        promotion: 'none',
        buff(player){
            const videoSuccess = Math.random();
            if (videoSuccess > 0.7) {
                player.socialMedia.youtube.subscribers += Math.floor(Math.random() * 100);
                player.stats.happiness += 5;
            }
        }
    },
    {
        label: 'Professional Athlete',
        requirements: {
            fitness: 95,
            minAge: 18,
            health: 85
        },
        salary: 150000,
        field: 'sports',
        promotion: 'none',
        buff(player){
            player.stats.fitness += Math.floor(Math.random() * 2)
            if (Math.random() > 0.9) {
                player.money.total += Math.floor(Math.random() * 50000); // Bonus earnings
                textContainer.innerHTML += `<p class="green">Won a competition bonus!</p>`;
            }
        }
    },
    {
        label: 'Entrepreneur',
        requirements: {
            education: 'business',
            minAge: 22,
            smartness: 70
        },
        salary: 80000,
        field: 'business',
        promotion: 'none',
        buff(player){
            const businessSuccess = Math.random();
            if (businessSuccess > 0.8) {
                player.money.total += Math.floor(Math.random() * 25000);
                textContainer.innerHTML += `<p class="green">Business venture was successful!</p>`;
            } else if (businessSuccess < 0.2) {
                player.money.total -= Math.floor(Math.random() * 10000);
                textContainer.innerHTML += `<p class="red">Business had some losses</p>`;
            }
        }
    },
    {
        label: 'Actor',
        requirements: {
            appearance: 70,
            minAge: 18
        },
        salary: 55000,
        field: 'entertainment',
        promotion: 'none',
        buff(player){
            if (Math.random() > 0.85) {
                player.money.total += Math.floor(Math.random() * 100000);
                player.stats.happiness += 15;
                textContainer.innerHTML += `<p class="green">Landed a major movie role!</p>`;
            }
        }
    }
];