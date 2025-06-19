class AchievementSystem {
    static VERSION = '1.0';
    static STORAGE_KEY = 'lifeway_achievements';

    static achievements = {
        // Life Milestones
        firstYear: {
            name: "First Year",
            description: "Survive your first year",
            unlocked: false,
            category: 'milestones',
            condition: (player) => player.age >= 1
        },
        teenager: {
            name: "Teenager",
            description: "Reach teenage years",
            unlocked: false,
            category: 'milestones',
            condition: (player) => player.age >= 13
        },
        adult: {
            name: "Adult",
            description: "Become an adult",
            unlocked: false,
            category: 'milestones',
            condition: (player) => player.age >= 18
        },
        centenarian: {
            name: "Centenarian",
            description: "Live to 100 years old",
            unlocked: false,
            category: 'milestones',
            condition: (player) => player.age >= 100
        },

        // Career & Education
        firstJob: {
            name: 'First Paycheck',
            description: 'Get your first job',
            unlocked: false,
            category: 'career',
            condition: (player) => player.job !== 'none'
        },
        graduate: {
            name: 'Scholar',
            description: 'Graduate from university',
            unlocked: false,
            category: 'education',
            condition: (player) => Object.keys(player.career).length > 1
        },
        skillMaster: {
            name: 'Renaissance Person',
            description: 'Max out any skill to level 10',
            unlocked: false,
            category: 'skills',
            condition: (player) => Object.values(player.skills).some(skill => skill.level >= 10)
        },

        // Wealth & Property
        millionaire: {
            name: "Millionaire",
            description: "Accumulate $1,000,000",
            unlocked: false,
            category: 'wealth',
            condition: (player) => player.money?.total >= 1000000
        },
        realEstateMogul: {
            name: 'Property Tycoon',
            description: 'Own 5 properties',
            unlocked: false,
            category: 'wealth',
            condition: (player) => player.inventory?.houses?.length >= 5
        },

        // Social & Family
        familyPerson: {
            name: 'Family Person',
            description: 'Have 3 or more children',
            unlocked: false,
            category: 'family',
            condition: (player) => player.relationships?.offspring?.length >= 3
        },
        socialMediaStar: {
            name: 'Influencer',
            description: 'Get 10,000 followers on social media',
            unlocked: false,
            category: 'fame',
            condition: (player) => {
                const totalFollowers = (player.socialMedia?.youtube?.subscribers || 0) + 
                                    (player.socialMedia?.instagram?.followers || 0);
                return totalFollowers >= 10000;
            }
        },

        // Long-term Achievements
        healthy: {
            name: "Healthy Life",
            description: "Maintain 80+ health for 10 years",
            unlocked: false,
            category: 'lifestyle',
            yearsHealthy: 0,
            condition: (player, achievement) => {
                if (player.stats?.health >= 80) {
                    achievement.yearsHealthy++;
                } else {
                    achievement.yearsHealthy = 0;
                }
                return achievement.yearsHealthy >= 10;
            }
        },
        happyLife: {
            name: "Happy Life",
            description: "Maintain 80+ happiness for 5 years",
            unlocked: false,
            category: 'lifestyle',
            yearsHappy: 0,
            condition: (player, achievement) => {
                if (player.stats?.happiness >= 80) {
                    achievement.yearsHappy++;
                } else {
                    achievement.yearsHappy = 0;
                }
                return achievement.yearsHappy >= 5;
            }
        }
    };

    static initialize() {
        this.loadAchievements();
        this.setupEventListeners();
    }

    static loadAchievements() {
        try {
            const saved = localStorage.getItem(this.STORAGE_KEY);
            if (saved) {
                const data = JSON.parse(saved);
                if (data.version === this.VERSION) {
                    Object.entries(data.achievements).forEach(([key, value]) => {
                        if (this.achievements[key]) {
                            this.achievements[key].unlocked = value.unlocked;
                            if (value.yearsHealthy !== undefined) {
                                this.achievements[key].yearsHealthy = value.yearsHealthy;
                            }
                            if (value.yearsHappy !== undefined) {
                                this.achievements[key].yearsHappy = value.yearsHappy;
                            }
                        }
                    });
                }
            }
        } catch (error) {
            console.error('Failed to load achievements:', error);
        }
    }

    static saveAchievements() {
        try {
            const data = {
                version: this.VERSION,
                achievements: Object.entries(this.achievements).reduce((acc, [key, achievement]) => {
                    acc[key] = {
                        unlocked: achievement.unlocked,
                        yearsHealthy: achievement.yearsHealthy,
                        yearsHappy: achievement.yearsHappy
                    };
                    return acc;
                }, {})
            };
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
        } catch (error) {
            console.error('Failed to save achievements:', error);
        }
    }

    static setupEventListeners() {
        if (typeof window !== 'undefined') {
            const originalAnnualChanges = window.annualChanges;
            if (typeof originalAnnualChanges === 'function') {
                window.annualChanges = function() {
                    try {
                        originalAnnualChanges.apply(this, arguments);
                        if (typeof player !== 'undefined' && player) {
                            AchievementSystem.checkAchievements(player);
                        }
                    } catch (error) {
                        console.error('Error in achievement annual changes:', error);
                        if (originalAnnualChanges) {
                            originalAnnualChanges.apply(this, arguments);
                        }
                    }
                };
            }
        }
    }

    static checkAchievements(player) {
        if (!player) return;
        
        try {
            let newUnlocks = 0;
            
            Object.entries(this.achievements).forEach(([key, achievement]) => {
                if (!achievement.unlocked && achievement.condition) {
                    try {
                        if (achievement.condition(player, achievement)) {
                            achievement.unlocked = true;
                            newUnlocks++;
                            this.showAchievementUnlock(achievement);
                        }
                    } catch (error) {
                        console.error(`Error checking achievement ${key}:`, error);
                    }
                }
            });
            
            if (newUnlocks > 0) {
                this.saveAchievements();
            }
            
            return newUnlocks;
        } catch (error) {
            console.error('Error checking achievements:', error);
            return 0;
        }
    }

    static showAchievementUnlock(achievement) {
        try {
            // Show achievement notification
            if (typeof EnhancedUI !== 'undefined' && EnhancedUI.showNotification) {
                EnhancedUI.showNotification(`🏆 Achievement Unlocked: ${achievement.name}`, 'success');
            }

            // Add haptic feedback
            if (typeof EnhancedUI !== 'undefined' && EnhancedUI.hapticFeedback) {
                EnhancedUI.hapticFeedback();
            }

            // Show achievement modal
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
            if (textContainer) {
                textContainer.innerHTML += `<p class="yellow">🏆 Achievement Unlocked: ${achievement.name}</p>`;
            }
        } catch (error) {
            console.error('Error showing achievement unlock:', error);
        }
    }

    static getUnlockedCount() {
        try {
            return Object.values(this.achievements).filter(a => a.unlocked).length;
        } catch (error) {
            console.error('Error getting unlocked count:', error);
            return 0;
        }
    }

    static getTotalCount() {
        try {
            return Object.keys(this.achievements).length;
        } catch (error) {
            console.error('Error getting total count:', error);
            return 0;
        }
    }

    static getProgress() {
        return `${this.getUnlockedCount()}/${this.getTotalCount()}`;
    }

    static resetAchievements() {
        Object.values(this.achievements).forEach(achievement => {
            achievement.unlocked = false;
            if (achievement.yearsHealthy !== undefined) achievement.yearsHealthy = 0;
            if (achievement.yearsHappy !== undefined) achievement.yearsHappy = 0;
        });
        this.saveAchievements();
    }
}

// Initialize achievements when the module loads
AchievementSystem.initialize();
