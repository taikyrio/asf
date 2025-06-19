// Only declare if not already defined
if (typeof window.items === 'undefined') {
    window.items = {
        weapons: [
            {
                label: 'Knife',
                price: 15,
                category: 'weapons',
                successChance: 60
            },
            {
                label: 'Handgun',
                price: 800,
                category: 'weapons',
                successChance: 85
            },
            {
                label: 'Shotgun',
                price: 1200,
                category: 'weapons',
                successChance: 90
            },
            {
                label: 'RPG',
                price: 15000,
                category: 'weapons',
                successChance: 95
            }
        ],
        instruments: [
            {
                label: 'Guitar',
                price: 300,
                category: 'instruments'
            },
            {
                label: 'Piano',
                price: 2000,
                category: 'instruments'
            },
            {
                label: 'Violin',
                price: 500,
                category: 'instruments'
            },
            {
                label: 'Bass',
                price: 400,
                category: 'instruments'
            }
        ],
        electronics: [
            {
                label: 'Smartphone',
                price: 800,
                category: 'electronics'
            },
            {
                label: 'Laptop',
                price: 1500,
                category: 'electronics'
            },
            {
                label: 'PC',
                price: 2500,
                category: 'electronics'
            }
        ],
        fastFood: [
            {
                label: 'Burger',
                price: 8,
                category: 'fastFood',
                statChanges: { health: -2, happiness: 3 }
            },
            {
                label: 'Pizza',
                price: 12,
                category: 'fastFood',
                statChanges: { health: -1, happiness: 4 }
            },
            {
                label: 'Fries',
                price: 5,
                category: 'fastFood',
                statChanges: { health: -3, happiness: 2 }
            }
        ],
        desserts: [
            {
                label: 'Ice Cream',
                price: 6,
                category: 'desserts',
                statChanges: { health: -1, happiness: 5 }
            },
            {
                label: 'Cake',
                price: 15,
                category: 'desserts',
                statChanges: { health: -2, happiness: 8 }
            }
        ],
        vegetables: [
            {
                label: 'Salad',
                price: 10,
                category: 'vegetables',
                statChanges: { health: 5, happiness: -1 }
            },
            {
                label: 'Broccoli',
                price: 4,
                category: 'vegetables',
                statChanges: { health: 3 }
            }
        ],
        alcoholic: [
            {
                label: 'Beer',
                price: 5,
                category: 'alcoholic',
                statChanges: { health: -2, happiness: 3 }
            },
            {
                label: 'Wine',
                price: 15,
                category: 'alcoholic',
                statChanges: { health: -3, happiness: 4 }
            },
            {
                label: 'Vodka',
                price: 25,
                category: 'alcoholic',
                statChanges: { health: -5, happiness: 2 }
            }
        ],
        nonAlcoholic: [
            {
                label: 'Water',
                price: 2,
                category: 'nonAlcoholic',
                statChanges: { health: 1 }
            },
            {
                label: 'Soda',
                price: 3,
                category: 'nonAlcoholic',
                statChanges: { health: -1, happiness: 2 }
            },
            {
                label: 'Energy Drink',
                price: 5,
                category: 'nonAlcoholic',
                statChanges: { health: -2, fitness: 2 }
            }
        ]
    };
}

// This file is intentionally empty - item functions are handled in menu.js

const ownedAssets = (type) => {
    if (!player.inventory[type] || player.inventory[type].length === 0) {
        return '<p>You don\'t own any items in this category.</p>';
    }
    
    return player.inventory[type].map((item, index) => {
        return `<div class="cell" data-type="${type}" data-index="${index}" onclick="windows.items.ownedAssetWindow(this)">
            ${item.label}
        </div>`;
    }).join('');
};