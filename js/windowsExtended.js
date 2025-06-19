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

    plasticSurgeries: {
        display() {
            showEvent({
                title: "Plastic surgeries",
                body: `
            <p>Fix your insecurities today</p>
            <div class="option" onclick="windows.plasticSurgeries.noseJob(400)">
                Nose job - ${moneyFormat(400)}$
            </div>
            <div class="option" onclick="windows.plasticSurgeries.faceLift(1000)">
                Face lift - ${moneyFormat(1000)}$
            </div>
            <div class="option" onclick="windows.plasticSurgeries.lipAugmentation(600)">
                Lip Augmentation - ${moneyFormat(600)}$
            </div>
            ${
                player.gender === "male"
                    ? ``
                    : `
            <div class="option" onclick="windows.plasticSurgeries.breastAugmentation(800)">
                Breast augmentation - ${moneyFormat(800)}$
            </div>
            `
            }
            <div class="option" onclick="windows.plasticSurgeries.eyelidLift(250)">
                Eyelid Lift - ${moneyFormat(250)}$
            </div>
            <div class="option" onclick="windows.plasticSurgeries.hairTransplantation(900)">
                Hair transplantation - ${moneyFormat(900)}$
            </div>
            <div class="option" onclick="closeEvent()">Do nothing</div>    
            `,
            });
        },

        noseJob(price) {
            this.beautyBuff(price, "nose job");
        },

        faceLift(price) {
            this.beautyBuff(price, "face lift");
        },

        lipAugmentation(price) {
            this.beautyBuff(price, "lip augmentation");
        },

        breastAugmentation(price) {
            this.beautyBuff(price, "breast augmentation");
        },

        eyelidLift(price) {
            this.beautyBuff(price, "eyelid lift");
        },

        hairTransplantation(price) {
            this.beautyBuff(price, "hair transplantation");
        },

        beautyBuff(price, operation) {
            if (player.money.total < price) {
                showEvent({
                    title: "Insufficient Funds",
                    body: `
                <p>You can't afford this surgery.</p>
                <div class="option" onclick="closeEvent()">OK</div>
                `,
                });
                return;
            }

            player.money.total -= price;
            player.stats.beauty = Math.min(100, player.stats.beauty + 10);
            closeEvent();

            showEvent({
                title: "Surgery Complete",
                body: `
            <p>Your ${operation} was successful! Beauty increased by 10.</p>
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