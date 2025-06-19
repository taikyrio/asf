
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
            player.stats.smartness += Math.floor(Math.random() * 3)
            player.stats.music += Math.floor(Math.random() * 8) + 2
            player.skills.music.xp += 75 + Math.floor(Math.random() * 25)
        }
    }
}

// Special Careers - Available at different ages
const specialCareers = {
    musician: {
        label: 'Musician Career',
        minAge: 10,
        icon: '🎵',
        description: 'Pursue a career in music. Success depends heavily on your Musical skill.',
        isSpecial: true,
        requirements: {
            minAge: 10
        },
        // This is handled separately in the menu system
        activation: 'musicianCareer'
    }
}

const jobs = [
    // Technology Jobs
    {
        label: 'Jr App Developer',
        requirements: {
            education: 'computerScience',
            programming: 3
        },
        salary: 55000,
        field: 'Technology',
        category: 'Corporate',
        icon: '💻',
        promotion: 'App Developer',
        buff(player){
            player.skills.programming.xp += 5 + Math.floor(Math.random() * 20);
        }
    }, 
    {
        label: 'App Developer',
        requirements: {
            education: 'computerScience',
            programming: 5
        },
        salary: 75000,
        field: 'Technology',
        category: 'Corporate',
        icon: '💻',
        promotion: 'Sr App Developer',
        buff(player){
            player.skills.programming.xp += 5 + Math.floor(Math.random() * 20);
        }
    }, 
    {
        label: 'Sr App Developer',
        requirements: {
            education: 'computerScience',
            programming: 8
        },
        salary: 100000,
        field: 'Technology',
        category: 'Corporate',
        icon: '💻',
        promotion: 'none',
        buff(player){
            player.skills.programming.xp += 5 + Math.floor(Math.random() * 20);
        }
    },
    {
        label: 'Jr Web developer',
        requirements: {
            minAge: 18,
            education: 'computerScience',
            programming: 2
        },
        salary: 52000,
        field: 'Technology',
        category: 'Corporate',
        icon: '🌐',
        promotion: 'Web developer',
        buff(player){
            player.skills.programming.xp += 5 + Math.floor(Math.random() * 20);
        }
    }, 
    {
        label: 'Web developer',
        requirements: {
            education: 'computerScience',
            programming: 4
        },
        salary: 65000,
        field: 'Technology',
        category: 'Corporate',
        icon: '🌐',
        promotion: 'Sr Web developer',
        buff(player){
            player.skills.programming.xp += 5 + Math.floor(Math.random() * 20);
        }
    }, 
    {
        label: 'Sr Web developer',
        requirements: {
            education: 'computerScience',
            programming: 7
        },
        salary: 80000,
        field: 'Technology',
        category: 'Corporate',
        icon: '🌐',
        promotion: 'none',
        buff(player){
            player.skills.programming.xp += 5 + Math.floor(Math.random() * 20);
        }
    },
    {
        label: 'Computer Programmer',
        requirements: {
            education: 'computerScience',
            programming: 6
        },
        salary: 70000,
        field: 'Technology',
        category: 'Corporate',
        icon: '⌨️',
        promotion: 'none',
        buff(player){
            player.skills.programming.xp += 8 + Math.floor(Math.random() * 15);
        }
    },

    // Entry Level Jobs
    {
        label: 'Supermarket cashier',
        requirements: {
            minAge: 16
        },
        salary: 25000,
        field: 'Retail',
        category: 'Entry Level',
        icon: '🛒',
        promotion: 'none',
        buff(player){
            return
        }
    },
    {
        label: 'Janitor',
        requirements: {
            minAge: 16
        },
        salary: 18000,
        field: 'Maintenance',
        category: 'Entry Level',
        icon: '🧹',
        promotion: 'none',
        buff(player){
            player.skills.handiness.xp += 5 + Math.floor(Math.random() * 20);
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
        field: 'Personal Care',
        category: 'Small Business',
        icon: '✂️',
        promotion: 'none',
        buff(player){
            return
        }
    },

    // Education Jobs
    {
        label: 'History teacher',
        requirements: {
            minAge: 20,
            education: 'history'
        },
        salary: 50000,
        field: 'Education',
        category: 'Education',
        icon: '📚',
        promotion: 'none',
        buff(player){
            return
        }
    },
    {
        label: 'Math teacher',
        requirements: {
            minAge: 20,
            education: 'math'
        },
        salary: 50000,
        field: 'Education',
        category: 'Education',
        icon: '📐',
        promotion: 'none',
        buff(player){
            return
        }
    },
    {
        label: 'Chemistry teacher',
        requirements: {
            minAge: 20,
            education: 'chemistry'
        },
        salary: 50000,
        field: 'Education',
        category: 'Education',
        icon: '🧪',
        promotion: 'none',
        buff(player){
            return
        }
    }, 
    {
        label: 'Biology teacher',
        requirements: {
            minAge: 20,
            education: 'biology'
        },
        salary: 50000,
        field: 'Education',
        category: 'Education',
        icon: '🔬',
        promotion: 'none',
        buff(player){
            return
        }
    },
    {
        label: 'Music teacher',
        requirements: {
            education: 'music',
            music: 3
        },
        salary: 50000,
        field: 'Education',
        category: 'Education',
        icon: '🎼',
        promotion: 'none',
        buff(player){
            player.skills.music.xp += 5 + Math.floor(Math.random() * 20);
        }
    },

    // Music Industry Jobs (not the special career)
    {
        label: 'Pianist',
        requirements: {
            education: 'music',
            music: 4
        },
        salary: 55000,
        field: 'Arts',
        category: 'Entertainment',
        icon: '🎹',
        promotion: 'none',
        buff(player){
            player.skills.music.xp += 5 + Math.floor(Math.random() * 20);
            player.stats.music += Math.floor(Math.random() * 3);
        }
    },

    // Fitness Jobs
    {
        label: 'Gym trainer',
        requirements: {
            minAge: 18,
            fitness: 70
        },
        salary: 36000,
        field: 'Fitness',
        category: 'Health & Fitness',
        icon: '💪',
        promotion: 'none',
        buff(player){
            return
        }
    },

    // Transportation Jobs
    {
        label: 'Truck driver',
        requirements: {
            driverLicense: true
        },
        salary: 40000,
        field: 'Transportation',
        category: 'Transportation',
        icon: '🚛',
        promotion: 'none',
        buff(player){
            return
        }
    }, 
    {
        label: 'Taxi driver',
        requirements: {
            driverLicense: true
        },
        salary: 48000,
        field: 'Transportation',
        category: 'Transportation',
        icon: '🚕',
        promotion: 'none',
        buff(player){
            return
        }
    },

    // Construction Jobs
    {
        label: 'Apprentice carpenter',
        requirements: {
            minAge: 18,
            handiness: 5,
            fitness: 70
        },
        salary: 41000,
        field: 'Construction',
        category: 'Construction',
        icon: '🔨',
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
        field: 'Construction',
        category: 'Construction',
        icon: '🏗️',
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
        field: 'Construction',
        category: 'Construction',
        icon: '🏗️',
        promotion: 'none',
        buff(player){
            player.skills.handiness.xp += 5 + Math.floor(Math.random() * 20);
        }
    },

    // Law Enforcement
    {
        label: 'Police officer',
        requirements: {
            fitness: 85,
            minAge: 25,
            criminalRecord: 'clean'
        },
        salary: 55000,
        field: 'Law Enforcement',
        category: 'Government',
        icon: '👮',
        promotion: 'none',
        buff(player){
            return
        }
    },

    // Medical Jobs
    {
        label: 'Apprentice pediatrician',
        requirements: {
            education: 'medic',
            minAge: 20,
        },
        salary: 50000,
        field: 'Medicine',
        category: 'Medical',
        icon: '👨‍⚕️',
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
        field: 'Medicine',
        category: 'Medical',
        icon: '👨‍⚕️',
        promotion: 'none',
        buff(player){
            return
        }
    },

    // Special Lifestyle Job
    {
        label: 'Guru',
        requirements: {
            happiness: 100,
            health: 100,
            minAge: 18,
            criminalRecord: 'clean'
        },
        salary: 78000,
        field: 'Spiritual',
        category: 'Lifestyle',
        icon: '🧘',
        promotion: 'none',
        buff(player){
            return
        }
    }
];

// Function to get jobs by category for BitLife-like display
const getJobsByCategory = () => {
    const categories = {};
    
    jobs.forEach(job => {
        const category = job.category || 'Other';
        if (!categories[category]) {
            categories[category] = [];
        }
        categories[category].push(job);
    });
    
    return categories;
};

// Function to check if player meets job requirements
const meetsJobRequirements = (job, player) => {
    // Check age requirement
    if (job.requirements.minAge && player.age < job.requirements.minAge) return false;
    
    // Check education requirement
    if (job.requirements.education && !player.career[job.requirements.education]) return false;
    
    // Check criminal record
    if (job.requirements.criminalRecord === 'clean') {
        if (player.criminalRecord.murder > 0 || player.criminalRecord.murderAttempts > 0) return false;
    }
    
    // Check driver license
    if (job.requirements.driverLicense && !player.driverLicense) return false;
    
    // Check skill requirements
    for (const [skill, level] of Object.entries(job.requirements)) {
        if (skill !== 'minAge' && skill !== 'education' && skill !== 'criminalRecord' && skill !== 'driverLicense') {
            if (player.stats[skill] < level) return false;
        }
    }
    
    return true;
};
