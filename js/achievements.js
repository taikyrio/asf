
class AchievementSystem {
    static achievements = {
        'first_job': {
            name: 'First Paycheck',
            description: 'Get your first job',
            unlocked: false,
            category: 'career'
        },
        'millionaire': {
            name: 'Millionaire',
            description: 'Accumulate $1,000,000',
            unlocked: false,
            category: 'wealth'
        },
        'graduate': {
            name: 'Scholar',
            description: 'Graduate from university',
            unlocked: false,
            category: 'education'
        },
        'centenarian': {
            name: 'Century Club',
            description: 'Live to 100 years old',
            unlocked: false,
            category: 'longevity'
        },
        'family_man': {
            name: 'Family Person',
            description: 'Have 3 or more children',
            unlocked: false,
            category: 'family'
        },
        'criminal_mastermind': {
            name: 'Criminal Mastermind',
            description: 'Commit 5 murders without getting caught',
            unlocked: false,
            category: 'crime'
        },
        'skill_master': {
            name: 'Renaissance Person',
            description: 'Max out any skill to level 10',
            unlocked: false,
            category: 'skills'
        },
        'social_media_star': {
            name: 'Influencer',
            description: 'Get 10,000 followers on social media',
            unlocked: false,
            category: 'fame'
        },
        'real_estate_mogul': {
            name: 'Property Tycoon',
            description: 'Own 5 properties',
            unlocked: false,
            category: 'wealth'
        }
    };
    
    static checkAchievements() {
        // First job
        if (!this.achievements.first_job.unlocked && player.job !== 'none') {
            this.unlockAchievement('first_job');
        }
        
        // Millionaire
        if (!this.achievements.millionaire.unlocked && player.money.total >= 1000000) {
            this.unlockAchievement('millionaire');
        }
        
        // Graduate
        if (!this.achievements.graduate.unlocked && Object.keys(player.career).length > 1) {
            this.unlockAchievement('graduate');
        }
        
        // Centenarian
        if (!this.achievements.centenarian.unlocked && player.age >= 100) {
            this.unlockAchievement('centenarian');
        }
        
        // Family person
        if (!this.achievements.family_man.unlocked && player.relationships.offspring.length >= 3) {
            this.unlockAchievement('family_man');
        }
        
        // Criminal mastermind
        if (!this.achievements.criminal_mastermind.unlocked && player.criminalRecord.murder >= 5) {
            this.unlockAchievement('criminal_mastermind');
        }
        
        // Skill master
        for (let skill of Object.values(player.skills)) {
            if (!this.achievements.skill_master.unlocked && skill.level >= 10) {
                this.unlockAchievement('skill_master');
                break;
            }
        }
        
        // Social media star
        const totalFollowers = player.socialMedia.youtube.subscribers + player.socialMedia.instagram.followers;
        if (!this.achievements.social_media_star.unlocked && totalFollowers >= 10000) {
            this.unlockAchievement('social_media_star');
        }
        
        // Real estate mogul
        if (!this.achievements.real_estate_mogul.unlocked && player.inventory.houses.length >= 5) {
            this.unlockAchievement('real_estate_mogul');
        }
    }
    
    static unlockAchievement(achievementId) {
        const achievement = this.achievements[achievementId];
        if (achievement && !achievement.unlocked) {
            achievement.unlocked = true;
            
            // Show achievement notification
            createStoryEvent({
                title: '🏆 Achievement Unlocked!',
                body: () => `
                    <div style="text-align: center; padding: 20px;">
                        <h3>${achievement.name}</h3>
                        <p>${achievement.description}</p>
                        <div class="option" onclick="closeStoryEvent()">Continue</div>
                    </div>
                `
            });
            
            // Add to text container
            textContainer.innerHTML += `<p class="yellow">🏆 Achievement Unlocked: ${achievement.name}</p>`;
        }
    }
    
    static getUnlockedCount() {
        return Object.values(this.achievements).filter(a => a.unlocked).length;
    }
    
    static getTotalCount() {
        return Object.keys(this.achievements).length;
    }
}

// Check achievements every // Achievement System with proper error handling
const AchievementSystem = {
    achievements: {
        firstYear: {
            name: "First Year",
            description: "Survive your first year",
            unlocked: false,
            condition: (player) => player.age >= 1
        },
        teenager: {
            name: "Teenager",
            description: "Reach teenage years",
            unlocked: false,
            condition: (player) => player.age >= 13
        },
        adult: {
            name: "Adult",
            description: "Become an adult",
            unlocked: false,
            condition: (player) => player.age >= 18
        },
        millionaire: {
            name: "Millionaire",
            description: "Accumulate $1,000,000",
            unlocked: false,
            condition: (player) => player.money?.balance >= 1000000
        },
        centenarian: {
            name: "Centenarian",
            description: "Live to 100 years old",
            unlocked: false,
            condition: (player) => player.age >= 100
        },
        scholar: {
            name: "Scholar",
            description: "Graduate from university",
            unlocked: false,
            condition: (player) => player.career?.education?.name?.includes('University')
        },
        healthy: {
            name: "Healthy Life",
            description: "Maintain 80+ health for 10 years",
            unlocked: false,
            yearsHealthy: 0,
            condition: (player) => {
                if (player.stats?.health >= 80) {
                    this.achievements.healthy.yearsHealthy++;
                } else {
                    this.achievements.healthy.yearsHealthy = 0;
                }
                return this.achievements.healthy.yearsHealthy >= 10;
            }
        },
        happyLife: {
            name: "Happy Life",
            description: "Maintain 80+ happiness for 5 years",
            unlocked: false,
            yearsHappy: 0,
            condition: (player) => {
                if (player.stats?.happiness >= 80) {
                    this.achievements.happyLife.yearsHappy++;
                } else {
                    this.achievements.happyLife.yearsHappy = 0;
                }
                return this.achievements.happyLife.yearsHappy >= 5;
            }
        }
    },

    checkAchievements(player) {
        if (!player) return;
        
        try {
            let newUnlocks = 0;
            
            Object.entries(this.achievements).forEach(([key, achievement]) => {
                if (!achievement.unlocked && achievement.condition) {
                    try {
                        if (achievement.condition(player)) {
                            achievement.unlocked = true;
                            newUnlocks++;
                            this.showAchievementUnlock(achievement);
                        }
                    } catch (error) {
                        console.error(`Error checking achievement ${key}:`, error);
                    }
                }
            });
            
            return newUnlocks;
        } catch (error) {
            console.error('Error checking achievements:', error);
            return 0;
        }
    },

    showAchievementUnlock(achievement) {
        try {
            if (typeof EnhancedUI !== 'undefined' && EnhancedUI.showNotification) {
                EnhancedUI.showNotification(`🏆 Achievement Unlocked: ${achievement.name}!`, 'success', 5000);
            }
            
            if (typeof EnhancedUI !== 'undefined' && EnhancedUI.hapticFeedback) {
                EnhancedUI.hapticFeedback('medium');
            }
        } catch (error) {
            console.error('Error showing achievement unlock:', error);
        }
    },

    getUnlockedCount() {
        try {
            return Object.values(this.achievements).filter(a => a.unlocked).length;
        } catch (error) {
            console.error('Error getting unlocked count:', error);
            return 0;
        }
    },

    getTotalCount() {
        try {
            return Object.keys(this.achievements).length;
        } catch (error) {
            console.error('Error getting total count:', error);
            return 0;
        }
    },

    getProgress() {
        return `${this.getUnlockedCount()}/${this.getTotalCount()}`;
    },

    resetAchievements() {
        Object.values(this.achievements).forEach(achievement => {
            achievement.unlocked = false;
            if (achievement.yearsHealthy !== undefined) achievement.yearsHealthy = 0;
            if (achievement.yearsHappy !== undefined) achievement.yearsHappy = 0;
        });
    }
};

// Hook into the annual changes function if it exists
if (typeof window !== 'undefined') {
    const originalAnnualChanges = window.annualChanges;
    
    if (typeof originalAnnualChanges === 'function') {
        window.annualChanges = function() {
            try {
                originalAnnualChanges.apply(this, arguments);
                
                // Check achievements after annual changes
                if (typeof player !== 'undefined' && player) {
                    AchievementSystem.checkAchievements(player);
                }
            } catch (error) {
                console.error('Error in enhanced annual changes:', error);
                // Still call original function even if achievement check fails
                if (originalAnnualChanges) {
                    originalAnnualChanges.apply(this, arguments);
                }
            }
        };
    }
}

// Export for global access
if (typeof window !== 'undefined') {
    window.AchievementSystem = AchievementSystem;
}s();
}
