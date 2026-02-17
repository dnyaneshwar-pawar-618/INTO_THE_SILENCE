

/*
Problem 3: Image Loader with Race Condition (Hard)
Scenario: You're building a gallery that loads images from multiple sources (CDN, backup server, cache) and displays the fastest response.

Task:

Create a function loadImage(url, delay) that returns a promise. It should resolve with "Image loaded from {source}" after the given delay, or reject if the delay is > 3 seconds (simulating timeout).

For a single image, try loading it from three sources:

CDN: "cdn.images.com/img1" - 2 seconds

Backup: "backup.images.com/img1" - 2.5 seconds

Cache: "cache.local/img1" - 0.5 seconds (but 30% chance of rejection)

Use Promise.race() to display whichever source responds first

If the winner is rejected, fallback to the next fastest successful response

Keep track of all attempts and log which source was actually used

Bonus: Implement retry logic - if all sources fail, retry the fastest source twice before giving up.
*/




// Simulate loading image from different sources
function loadImage(source, delay, shouldReject = false) {
  return new Promise((resolve, reject) => {
    console.log(`   📥 Attempting to load from ${source}...`);
    
    // Simulate random rejection (30% chance by default)
    const willReject = shouldReject !== undefined ? shouldReject : Math.random() < 0.3;
    
    setTimeout(() => {
      if (willReject) {
        reject(new Error(`❌ Failed to load from ${source}`));
      } else {
        resolve(`✅ Image loaded from ${source} (${delay/1000}s)`);
      }
    }, delay);
  });
}

// Image loader using Promise.race()
function loadImageWithRace() {
  console.log("🖼️  Loading image from fastest source...\n");
  
  const sources = [
    { name: "CDN", delay: 2000 },
    { name: "Backup Server", delay: 2500 },
    { name: "Cache", delay: 500, shouldReject: Math.random() < 0.3 }
  ];
  
  const promises = sources.map(source => 
    loadImage(source.name, source.delay, source.shouldReject)
  );
  
  Promise.race(promises)
    .then(result => {
      console.log(`\n🏆 WINNER: ${result}`);
    })
    .catch(error => {
      console.log(`\n${error.message}`);
      console.log("❌ All sources failed!");
    });
}

// Run the basic solution
// loadImageWithRace();


