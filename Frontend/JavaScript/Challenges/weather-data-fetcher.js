/*

//* Problem 1: Async Data Fetcher (Easy)
Scenario: You're building a weather app that needs to fetch temperature data from multiple cities.

Task: Create three separate promises that simulate fetching temperature data for "New York", "London", and "Tokyo". Each promise should resolve after 2 seconds with a random temperature between 15-30°C. Then:

Use Promise.all() to fetch all three temperatures simultaneously

Calculate and display the average temperature

Handle any potential errors (simulate a rejection randomly for one city)

Bonus: Add a timeout mechanism - if any city takes longer than 3 seconds to respond, reject it.
*/


// Simulate fetching temperature for a city
function fetchTemperature(city) {
    return new Promise((resolve, reject) => {
        console.log(`🌤️  Fetching temperature for ${city}...`);

        // setTimeout(() => {
        // Randomly reject one city (30% chance)
        //   if (Math.random() < 0.3) {
        //     reject(new Error(`❌ Failed to fetch data for ${city}`));
        //   } else {

        //   }
        // }, 2000);
        const temp = Math.floor(Math.random() * 16) + 15; // 15-30°C
        resolve({ city, temper: temp });
    });
}

// Fetch all cities and calculate average
function fetchAllTemperatures() {
    const cities = ["New York", "London", "Tokyo"];

    const promises = cities.map(city => fetchTemperature(city));
    console.log('Promises... :)', promises)
    Promise.all(promises)
        .then(results => {
            console.log('results: ', results)
            console.log("\n✅ All temperatures received:");
            results.forEach(({ city, temperature }) => {
                console.log(`   ${city}: ${temperature}°C`);
            });

            const avg = results.reduce((sum, { temperature }) => sum + temperature, 0) / results.length;
            console.log(`\n📊 Average temperature: ${avg.toFixed(1)}°C`);
        })
        .catch(error => {
            console.log(`\n${error.message}`);
            console.log("🔄 Try again later...");
        })
        .finally(() => {
            console.log("\n🏁 Weather fetch completed");
        });
}

// Run the solution
// fetchAllTemperatures();


//* ________________________________________________________________________________

// Fetch temperature with timeout
function fetchTemperatureWithTimeout(city, timeoutMs = 3000) {
  return new Promise((resolve, reject) => {
    console.log(`🌤️  Fetching temperature for ${city}...`);
    
    // Create timeout promise
    const timeout = setTimeout(() => {
      reject(new Error(`⏰ Timeout: ${city} took too long (>${timeoutMs/1000}s)`));
    }, timeoutMs);
    
    // Simulate variable response time (1-4 seconds)
    const responseTime = Math.floor(Math.random() * 2000) + 1000; // 1-4s
    
    setTimeout(() => {
      clearTimeout(timeout);
      
      if (Math.random() < 0.2) { // 20% chance of network error
        reject(new Error(`🌩️  Network error for ${city}`));
      } else {
        const temp = Math.floor(Math.random() * 16) + 15;
        resolve({ city, temperature: temp, responseTime });
      }
    }, responseTime);
  });
}

// Fetch with timeout and individual error handling
function fetchAllWithTimeout() {
  const cities = ["New York", "London", "Tokyo"];
  
  console.log("🚀 Starting weather fetch with 3s timeout...\n");
  
  const promises = cities.map(city => 
    fetchTemperatureWithTimeout(city)
      .catch(error => {
        console.log(`   ${error.message}`);
        return null; // Return null for failed cities
      })
  );
  
  Promise.all(promises)
    .then(results => {
        console.log(results, "results")
      const successful = results.filter(result => result !== null);
      
      if (successful.length === 0) {
        console.log("\n❌ No cities returned data");
        return;
      }
      
      console.log("\n✅ Successfully received:");
      successful.forEach(({ city, temperature, responseTime }) => {
        console.log(`   ${city}: ${temperature}°C (${responseTime/1000}s)`);
      });
      
      const avg = successful.reduce((sum, { temperature }) => sum + temperature, 0) / successful.length;
      console.log(`\n📊 Average temperature: ${avg.toFixed(1)}°C (from ${successful.length} cities)`);
    });
}

// Run the timeout version
// fetchAllWithTimeout();


