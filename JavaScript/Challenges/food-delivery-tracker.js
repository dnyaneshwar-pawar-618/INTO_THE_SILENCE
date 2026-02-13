/*

Problem 1: Food Delivery Tracker 🍕
Scenario: You're building a real-time food delivery tracker like UberEats or Zomato.

Task: Create a function trackOrder(restaurantName) that simulates tracking a food delivery.

Requirements:

Returns a promise that takes 2 seconds to resolve

Randomly choose one of these statuses:

"✅ Order confirmed at {restaurant}"

"👨‍🍳 Chef is preparing your food"

"🛵 Driver is on the way"

"📦 Order delivered! Enjoy your meal!"

15% chance of rejection with:

"❌ Restaurant canceled order" or

"❌ Driver assigned to another order"

Then create trackMultipleOrders(restaurants) that:

Takes array of 3 restaurant names

Uses Promise.allSettled() to track all orders

Logs: "📊 Delivered: 2, Canceled: 1"

Shows final status of each order

Bonus: Add timeout - if any order takes >3 seconds, reject with "⏰ Driver took too long"



*/


function trackOrder(restaurantName) {
    return new Promise((resolve, reject) => {
        console.log(`🔄 Tracking order from ${restaurantName}...`);

        const statuses = [
            `✅ Order confirmed at ${restaurantName}`,
            `👨‍🍳 Chef is preparing your food from ${restaurantName}`,
            `🛵 Driver is on the way with your ${restaurantName} order`,
            `📦 Order delivered! Enjoy your meal from ${restaurantName}!`
        ];

        const randomIndex = Math.floor(Math.random() * statuses.length);
        const randomStatus = statuses[randomIndex]

        const willFail = Math.random() < 0.15;

        setTimeout(() => {
            if (willFail) {
                const errors = [
                    `❌ ${restaurantName} canceled your order`,
                    `❌ Driver assigned to another order - ${restaurantName} delivery delayed`
                ];

                const randomError = errors[Math.floor(Math.random() * errors.length)];
                reject(new Error(randomError));
            } else {
                resolve(randomStatus)
            }
        }, 2000);
    })
}

function trackMultipleOrders(restaurants) {
    console.log('STARTING FOOD DELIVERY TRACKING')
    console.log("=".repeat(30));
    console.log(`📋 Tracking orders for: ${restaurants.join(", ")}\n`);

    const promises = restaurants.map(restaurant => trackOrder(restaurant));

    Promise.allSettled(promises)
        .then(results => {
            console.log('results...', results)
            console.log("\n" + "=".repeat(30));
            console.log("📊 DELIVERY SUMMARY");
            console.log("=".repeat(50));

            const successful = results.filter(r => r.status === 'fulfilled').length;
            const failed = results.filter(r => r.status === 'rejected').length;

            console.log(`✅ Delivered: ${successful}`);
            console.log(`❌ Canceled: ${failed}`);
            console.log(`📊 ${successful}/${restaurants.length} orders completed\n`);

            console.log("📋 ORDER DETAILS:");
            results.forEach((result, index) => {
                console.log(`\n ${index + 1}. ${restaurants[index]}:`)
                if (result.status === 'fulfilled') {
                    console.log(`   ✅ ${result.value}`);
                } else {
                    console.log(`   ❌ ${result.reason.message}`);
                }
            })
        })
}

const restaurants = ["Domino's", "Burger King", "Sushi Master"];
// trackMultipleOrders(restaurants);