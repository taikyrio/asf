
// Shopping and items functionality
Object.assign(menu, {
    shopping() {
        if (player.age < 14) return;

        menuTemplate.style.display = "block";
        menuTitle.innerText = "Shopping";
        menuBody.innerHTML = `
        <ul>
        <li onclick="menu.weapons()" class="option">Weapons</li>
        <li onclick="menu.instruments()" class="option">Instruments</li>
        <li onclick="menu.electronics()" class="option">Electronics</li>
        <li class="option" onclick="menu.foodAndDrinks.display()">Food and drinks</li>
        </ul>
        `;
    },

    weapons() {
        menuTemplate.style.display = "block";
        menuTitle.innerText = "Weapons";
        menuBody.innerHTML = `
        <ul>
        ${weaponOptions || ''}
        </ul>
        `;
    },

    instruments() {
        menuTemplate.style.display = "block";
        menuTitle.innerText = "Instruments";
        menuBody.innerHTML = `
        <ul>
        ${instrumentOptions || ''}
        </ul>
        `;
    },

    electronics() {
        menuTemplate.style.display = "block";
        menuTitle.innerText = "Electronics";
        menuBody.innerHTML = `
        <ul>
        ${electronicOptions || ''}
        </ul>
        `;
    },

    foodAndDrinks: {
        display() {
            menuTitle.innerText = "Food and drinks";
            menuBody.innerHTML = `
            <ul>
                <li class="option" onclick="menu.foodAndDrinks.food.display()">Food</li>
                <li class="option" onclick="menu.foodAndDrinks.drinks.display()">Drinks</li>
            </ul>
            `;
        },
        food: {
            display() {
                menuTitle.innerText = "Food";
                menuBody.innerHTML = `
                <ul>
                    <li class="option" onclick="menu.foodAndDrinks.food.fastFood()">Fast food</li>
                    <li class="option" onclick="menu.foodAndDrinks.food.dessert()">Dessert</li>
                    <li class="option" onclick="menu.foodAndDrinks.food.vegetables()">Vegetables</li>
                </ul>
                `;
            },
            fastFood() {
                menuTitle.innerText = "Fast food";
                menuBody.innerHTML = `
                <ul>
                 ${itemListifier(items, "fastFood", "items")}
                </ul>
                `;
            },
            dessert() {
                menuTitle.innerText = "Dessert";
                menuBody.innerHTML = `
                <ul>
                ${itemListifier(items, "desserts", "items")}
                </ul>
                `;
            },
            vegetables() {
                menuTitle.innerText = "Vegetables";
                menuBody.innerHTML = `
                <ul>
                ${itemListifier(items, "vegetables", "items")}
                </ul>
                `;
            },
        },
        drinks: {
            display() {
                menuTitle.innerText = "Drinks";
                menuBody.innerHTML = `
                <ul>
                    <li class="option" onclick="menu.foodAndDrinks.drinks.nonAlcoholic()">Non alcoholic</li>
                    <li class="option" onclick="menu.foodAndDrinks.drinks.alcoholic()">Alcoholic</li>
                </ul>
                `;
            },
            alcoholic() {
                menuTitle.innerText = "Alcoholic";
                menuBody.innerHTML = `
                <ul>
                ${itemListifier(items, "alcoholic", "items")}
                </ul>
                `;
            },
            nonAlcoholic() {
                menuTitle.innerText = "Non alcoholic";
                menuBody.innerHTML = `
                <ul>
                ${itemListifier(items, "nonAlcoholic", "items")}
                </ul>
                `;
            },
        },
    }
});
