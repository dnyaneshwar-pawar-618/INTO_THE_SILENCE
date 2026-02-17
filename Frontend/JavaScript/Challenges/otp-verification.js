// Simulate sending OTP to phone number
function sendOTP(phoneLast4) {
  return new Promise((resolve, reject) => {
    console.log(`📲 Requesting OTP for +91 *****${phoneLast4}...`);
    
    // Generate random 4-digit OTP
    const otp = Math.floor(1000 + Math.random() * 9000);
    
    setTimeout(() => {
      // 10% chance of failure
      if (Math.random() < 0.1) {
        reject(new Error(`❌ Too many requests. Try again in 5 minutes`));
      } else {
        resolve({
          message: `📲 OTP ${otp} sent to +91 *****${phoneLast4}`,
          otp: otp,
          phoneLast4: phoneLast4
        });
      }
    }, 2000);
  });
}

// Verify OTP with max attempts
function verifyOTP(userOTP, correctOTP, attemptsLeft = 3) {
  return new Promise((resolve, reject) => {
    console.log(`🔐 Verifying OTP... Attempts remaining: ${attemptsLeft}`);
    
    setTimeout(() => {
      if (userOTP === correctOTP) {
        resolve({
          success: true,
          message: `✅ Phone verified successfully!`,
          attempts: 4 - attemptsLeft
        });
      } else {
        if (attemptsLeft > 1) {
          reject({
            success: false,
            message: `❌ Invalid OTP. Attempts remaining: ${attemptsLeft - 1}`,
            attemptsLeft: attemptsLeft - 1,
            canRetry: true
          });
        } else {
          reject({
            success: false,
            message: `🔒 Too many failed attempts. Blocked for 1 hour`,
            attemptsLeft: 0,
            canRetry: false,
            blocked: true
          });
        }
      }
    }, 1500);
  });
}

// Complete verification flow
async function verifyPhoneNumber(phoneLast4) {
  console.log("📱 PHONE VERIFICATION STARTED");
  console.log("=".repeat(50));
  
  try {
    // Step 1: Send OTP
    const otpResult = await sendOTP(phoneLast4);
    console.log(`   ${otpResult.message}`);
    console.log(`   🔐 Debug - OTP sent: ${otpResult.otp}\n`);
    
    // Step 2: User enters OTP (simulated with correct OTP)
    const userEnteredOTP = otpResult.otp; // Simulating correct entry
    console.log(`👤 User entered OTP: ${userEnteredOTP}`);
    
    // Step 3: Verify OTP
    const verificationResult = await verifyOTP(userEnteredOTP, otpResult.otp);
    console.log(`   ${verificationResult.message}`);
    
    console.log("\n" + "=".repeat(50));
    console.log("🎉 PHONE VERIFICATION SUCCESSFUL");
    return verificationResult;
    
  } catch (error) {
    console.log(`\n❌ ${error.message}`);
    if (error.blocked) {
      console.log(`   Account is now locked for security`);
    } else if (error.canRetry) {
      console.log(`   Please try again`);
    }
    throw error;
  }
}

// Test the basic solution
async function testBasicOTP() {
  try {
    await verifyPhoneNumber("1234");
  } catch (error) {
    // Handle error
  }
}

// testBasicOTP();