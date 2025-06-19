
// Core menu functionality and navigation
// Function to generate item lists
const itemListifier = (itemsObj, category, type) => {
    if (!itemsObj || !itemsObj[category]) return '';

    return itemsObj[category].map((item, index) => {
        return `<li class="option" data-objname="${type}" data-property="${category}" data-index="${index}" onclick="windows.items.buyWindow(this)">
            ${item.label} - ${moneyFormat(item.price)}$
        </li>`;
    }).join('');
};

// Initialize options after items and assets are loaded
let weaponOptions, instrumentOptions, electronicOptions, housesOptions, carsOptions;

const initializeMenuOptions = () => {
    if (typeof items !== 'undefined' && typeof assets !== 'undefined') {
        weaponOptions = itemListifier(items, "weapons", "items");
        instrumentOptions = itemListifier(items, "instruments", "items");
        electronicOptions = itemListifier(items, "electronics", "items");
        housesOptions = itemListifier(assets, "houses", "assets");
        carsOptions = itemListifier(assets, "cars", "assets");
    }
};

// Main menu object - core navigation functions
const menu = {
    profile() {
        menuTemplate.style.display = 'block';
        menuTitle.innerText = 'Profile';
        menuBody.innerHTML = `
        <ul>
            <li onclick="menu.identity()" class="option">Identity</li>
            <li onclick="menu.stats()" class="option">Stats</li>
            <li onclick="menu.sexuality()" class="option">Sexuality</li>
            <li onclick="menu.cRecord()" class="option">Criminal record</li>
            <li onclick="menu.cv()" class="option">CV</li>
            <li onclick="menu.inventory()" class="option">Inventory</li>
            <li onclick="menu.skills()" class="option">Skills</li>
        </ul>
        `;
    },

    saveGame() {
        menuTitle.innerText = 'Save Game';
        menuBody.innerHTML = `
        <div class="save-container">
            <p>Game saved successfully!</p>
            <div class="option" onclick="closeEvent()">OK</div>
        </div>
        `;
        // Add actual save functionality here
        localStorage.setItem('lifeWayGameSave', JSON.stringify(player));
    },

    backToMenu() {
        if (confirm('Are you sure you want to return to the main menu? Unsaved progress will be lost.')) {
            location.reload();
        }
    },

    assetsHandler(data) {
        const ids = {
            ownedTab: "marketTab",
            marketTab: "ownedTab",
        };
        const thisId = data.id;
        const cellContainer = document.getElementById("cell-container");
        const type = data.getAttribute("data-type");

        if (!data.classList.value.includes("active")) {
            document.getElementById(ids[thisId]).classList.remove("active");
            data.classList.add("active");
            if (thisId === "marketTab") {
                if (type === "houses") cellContainer.innerHTML = housesOptions;
                else cellContainer.innerHTML = carsOptions;
            } else cellContainer.innerHTML = ownedAssets(type);
        }
    }
};
