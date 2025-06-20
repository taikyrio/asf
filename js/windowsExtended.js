// Extended windows functionality - additional windows that extend the main windows object

// Extend the existing windows object
Object.assign(windows, {
    driverLicense: {
        display() {
            if (player.inventory.driverLicense) {
                return windows.items.buyWindow(event.target);
            }

            showEvent({
                title: "Driver's License",
                body: `
            <p>You need a driver's license to buy a car.</p>
            <p>Cost: ${moneyFormat(500)}$</p>
            <div class="option" onclick="windows.driverLicense.buy()">Get License</div>
            <div class="option" onclick="closeEvent()">Cancel</div>
            `,
            });
        },
        buy() {
            if (player.money.total < 500) {
                showEvent({
                    title: "Insufficient Funds",
                    body: `
                <p>You don't have enough money for a driver's license.</p>
                <div class="option" onclick="closeEvent()">OK</div>
                `,
                });
                return;
            }

            player.money.total -= 500;
            player.inventory.driverLicense = true;
            closeEvent();

            showEvent({
                title: "Driver's License",
                body: `
            <p>Congratulations! You now have a driver's license.</p>
            <div class="option" onclick="closeEvent()">OK</div>
            `,
            });
        }
    },

    education: {
        university: {
            display() {
                showEvent({
                    title: "University",
                    body: `
                <p>Choose your degree:</p>
                <div class="option" onclick="windows.education.university.enroll('Computer Science', 40000)">
                    Computer Science - ${moneyFormat(40000)}$
                </div>
                <div class="option" onclick="windows.education.university.enroll('Medicine', 60000)">
                    Medicine - ${moneyFormat(60000)}$
                </div>
                <div class="option" onclick="windows.education.university.enroll('Law', 50000)">
                    Law - ${moneyFormat(50000)}$
                </div>
                <div class="option" onclick="windows.education.university.enroll('Business', 35000)">
                    Business - ${moneyFormat(35000)}$
                </div>
                <div class="option" onclick="closeEvent()">Cancel</div>
                `,
                });
            },

            enroll(degree, cost) {
                if (player.money.total < cost) {
                    showEvent({
                        title: "Insufficient Funds",
                        body: `
                    <p>You can't afford this degree.</p>
                    <div class="option" onclick="closeEvent()">OK</div>
                    `,
                    });
                    return;
                }

                player.money.total -= cost;
                player.education.university = degree;
                player.stats.intelligence = Math.min(100, player.stats.intelligence + 15);
                closeEvent();

                showEvent({
                    title: "Enrolled!",
                    body: `
                <p>You are now studying ${degree}! Intelligence increased by 15.</p>
                <div class="option" onclick="closeEvent()">OK</div>
                `,
                });
            }
        }
    }
});