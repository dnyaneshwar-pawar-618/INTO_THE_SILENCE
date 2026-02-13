/* ===================================
   SOLAR SYSTEM EXPLORER - JAVASCRIPT
   Professional Cosmic Experience
   =================================== */

// ===================================
// GLOBAL STATE MANAGEMENT
// ===================================
const state = {
    planets: [],
    selectedPlanet: null,
    animationSpeed: 1,
    isAnimating: true,
    isDarkTheme: false,
    compareMode: false,
    selectedForCompare: [],
    animationFrameId: null
};

// ===================================
// PLANET CLASS
// ===================================
class Planet {
    constructor(data) {
        this.name = data.name;
        this.mass = data.mass;
        this.radius = data.radius;
        this.distance = data.distance;
        this.orbitTime = data.orbitTime;
        this.gravity = data.gravity;
        this.color = data.color;
        this.orbitRadius = data.orbitRadius;
        this.orbitSpeed = data.orbitSpeed;
        this.size = data.size;
        this.description = data.description;
        this.angle = Math.random() * Math.PI * 2; // Random starting position
        this.element = null;
        this.orbitElement = null;
    }

    createElement() {
        // Create orbit path
        this.orbitElement = document.createElement('div');
        this.orbitElement.className = 'orbit';
        this.orbitElement.style.width = `${this.orbitRadius * 2}px`;
        this.orbitElement.style.height = `${this.orbitRadius * 2}px`;

        // Create planet container
        const container = document.createElement('div');
        container.className = 'planet-container';
        
        // Create planet element
        this.element = document.createElement('div');
        this.element.className = 'planet';
        this.element.style.width = `${this.size}px`;
        this.element.style.height = `${this.size}px`;
        this.element.style.background = `radial-gradient(circle at 30% 30%, ${this.lightenColor(this.color, 40)}, ${this.color})`;
        this.element.style.boxShadow = `0 0 ${this.size}px ${this.color}`;
        
        // Add glow effect on hover
        this.element.style.setProperty('--glow-color', this.color);
        this.element.addEventListener('mouseenter', () => {
            this.element.style.boxShadow = `0 0 ${this.size * 2}px ${this.color}, 0 0 ${this.size * 3}px ${this.color}`;
        });
        this.element.addEventListener('mouseleave', () => {
            this.element.style.boxShadow = `0 0 ${this.size}px ${this.color}`;
        });

        // Create label
        const label = document.createElement('div');
        label.className = 'planet-label';
        label.textContent = this.name.toUpperCase();
        this.element.appendChild(label);

        // Add click event
        this.element.addEventListener('click', () => this.onClick());

        container.appendChild(this.element);
        
        return { orbit: this.orbitElement, container };
    }

    lightenColor(color, percent) {
        const num = parseInt(color.replace("#", ""), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) + amt;
        const G = (num >> 8 & 0x00FF) + amt;
        const B = (num & 0x0000FF) + amt;
        return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
            (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
            (B < 255 ? B < 1 ? 0 : B : 255))
            .toString(16).slice(1);
    }

    updatePosition() {
        this.angle += this.orbitSpeed * state.animationSpeed * 0.01;
        
        const x = Math.cos(this.angle) * this.orbitRadius;
        const y = Math.sin(this.angle) * this.orbitRadius;
        
        if (this.element && this.element.parentElement) {
            this.element.parentElement.style.transform = `translate(${x}px, ${y}px)`;
        }
    }

    onClick() {
        state.selectedPlanet = this;
        displayPlanetInfo(this);
        
        // Zoom effect
        this.element.style.transform = 'translate(-50%, -50%) scale(1.5)';
        setTimeout(() => {
            if (this.element) {
                this.element.style.transform = 'translate(-50%, -50%) scale(1)';
            }
        }, 300);
    }
}

// ===================================
// INITIALIZATION
// ===================================
async function init() {
    try {
        // Show loading screen
        const loadingScreen = document.getElementById('loadingScreen');
        
        // Fetch planet data
        const response = await fetch('planets.json');
        const planetsData = await response.json();
        
        // Create planet objects (filter out Sun for orbital planets)
        state.planets = planetsData.map(data => new Planet(data));
        
        // Render planets (only those with orbit)
        renderPlanets();
        
        // Setup event listeners
        setupEventListeners();
        
        // Add click event to Sun
        setupSunClickHandler();
        
        // Start animation loop
        animate();
        
        // Hide loading screen after a delay
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
        }, 1500);
        
    } catch (error) {
        console.error('Error initializing solar system:', error);
        document.getElementById('loadingScreen').innerHTML = `
            <div class="loading-content">
                <h2 class="loading-text">ERROR LOADING SOLAR SYSTEM</h2>
                <p class="loading-subtext">Please ensure planets.json is in the same directory</p>
            </div>
        `;
    }
}

// ===================================
// SUN CLICK HANDLER
// ===================================
function setupSunClickHandler() {
    setTimeout(() => {
        const sunElement = document.querySelector('.sun');
        if (sunElement) {
            sunElement.addEventListener('click', () => {
                const sunData = state.planets.find(p => p.name === "Sun");
                if (sunData) {
                    displayPlanetInfo(sunData);
                    
                    // Add zoom effect for Sun
                    sunElement.style.transform = 'translate(-50%, -50%) scale(1.3)';
                    setTimeout(() => {
                        sunElement.style.transform = 'translate(-50%, -50%) scale(1)';
                    }, 300);
                }
            });
        }
    }, 100);
}

// ===================================
// RENDERING
// ===================================
function renderPlanets() {
    const solarSystem = document.getElementById('solarSystem');
    
    // Render only planets with orbits (not the Sun)
    state.planets.filter(planet => planet.orbitRadius > 0).forEach(planet => {
        const { orbit, container } = planet.createElement();
        solarSystem.appendChild(orbit);
        solarSystem.appendChild(container);
    });
}

// ===================================
// ANIMATION LOOP
// ===================================
function animate() {
    state.planets.forEach(planet => {
        if (planet.orbitRadius > 0) { // Only animate orbiting planets
            planet.updatePosition();
        }
    });
    state.animationFrameId = requestAnimationFrame(animate);
}

// ===================================
// PLANET INFO DISPLAY
// ===================================
function displayPlanetInfo(planet) {
    const infoPanel = document.getElementById('infoPanel');
    const planetImage = document.getElementById('planetImage');
    const planetName = document.getElementById('planetName');
    const planetDescription = document.getElementById('planetDescription');
    const planetStats = document.getElementById('planetStats');
    const compareCheckbox = document.getElementById('compareCheckbox');
    
    // Update planet image
    planetImage.style.background = `radial-gradient(circle at 30% 30%, ${planet.lightenColor(planet.color, 40)}, ${planet.color})`;
    planetImage.style.boxShadow = `0 0 60px ${planet.color}, inset 0 0 30px rgba(0, 0, 0, 0.5)`;
    
    // Update text content
    planetName.textContent = planet.name.toUpperCase();
    planetDescription.textContent = planet.description;
    
    // Update stats
    const stats = [
        { label: 'Mass', value: planet.mass },
        { label: 'Radius', value: planet.radius },
        { label: 'Distance from Sun', value: planet.distance },
        { label: 'Orbital Period', value: planet.orbitTime },
        { label: 'Gravity', value: planet.gravity }
    ];
    
    planetStats.innerHTML = stats.map(stat => `
        <div class="stat-item">
            <span class="stat-label">${stat.label}</span>
            <span class="stat-value">${stat.value}</span>
        </div>
    `).join('');
    
    // Show compare checkbox if in compare mode (but not for Sun)
    if (state.compareMode && planet.name !== "Sun") {
        compareCheckbox.style.display = 'block';
        const checkbox = compareCheckbox.querySelector('.compare-input');
        checkbox.checked = state.selectedForCompare.includes(planet);
        checkbox.onchange = (e) => handleCompareSelection(planet, e.target.checked);
    } else {
        compareCheckbox.style.display = 'none';
    }
    
    // Show panel
    infoPanel.classList.add('active');
}

// ===================================
// EVENT LISTENERS SETUP
// ===================================
function setupEventListeners() {
    // Close info panel
    document.getElementById('closePanel').addEventListener('click', () => {
        document.getElementById('infoPanel').classList.remove('active');
    });
    
    // Speed control
    const speedControl = document.getElementById('speedControl');
    const speedValue = document.querySelector('.speed-value');
    
    speedControl.addEventListener('input', (e) => {
        state.animationSpeed = parseFloat(e.target.value);
        speedValue.textContent = `${state.animationSpeed.toFixed(1)}x`;
    });
    
    // Theme toggle
    document.getElementById('themeToggle').addEventListener('click', () => {
        state.isDarkTheme = !state.isDarkTheme;
        document.body.classList.toggle('ultra-dark', state.isDarkTheme);
        
        const themeToggle = document.getElementById('themeToggle');
        themeToggle.querySelector('.toggle-icon').textContent = state.isDarkTheme ? '☀️' : '🌙';
        themeToggle.querySelector('span:last-child').textContent = state.isDarkTheme ? 'NORMAL' : 'ULTRA DARK';
    });
    
    // Compare mode toggle
    document.getElementById('compareToggle').addEventListener('click', () => {
        state.compareMode = !state.compareMode;
        
        const compareToggle = document.getElementById('compareToggle');
        compareToggle.style.background = state.compareMode 
            ? 'rgba(0, 240, 255, 0.3)' 
            : 'rgba(10, 14, 39, 0.7)';
        compareToggle.style.borderColor = state.compareMode 
            ? '#00f0ff' 
            : 'rgba(255, 255, 255, 0.2)';
        
        if (!state.compareMode) {
            state.selectedForCompare = [];
            document.getElementById('comparisonPanel').classList.remove('active');
        }
        
        // Hide checkbox if panel is open
        if (document.getElementById('infoPanel').classList.contains('active')) {
            document.getElementById('compareCheckbox').style.display = state.compareMode ? 'block' : 'none';
        }
    });
    
    // Close comparison panel
    document.getElementById('closeComparison').addEventListener('click', () => {
        document.getElementById('comparisonPanel').classList.remove('active');
    });
    
    // Start exploring button
    document.getElementById('startExploring').addEventListener('click', () => {
        document.getElementById('instructions').classList.add('hidden');
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.getElementById('infoPanel').classList.remove('active');
            document.getElementById('comparisonPanel').classList.remove('active');
        }
        
        // Speed controls with arrow keys
        if (e.key === 'ArrowUp') {
            state.animationSpeed = Math.min(5, state.animationSpeed + 0.1);
            updateSpeedControl();
        }
        if (e.key === 'ArrowDown') {
            state.animationSpeed = Math.max(0, state.animationSpeed - 0.1);
            updateSpeedControl();
        }
    });
}

function updateSpeedControl() {
    const speedControl = document.getElementById('speedControl');
    const speedValue = document.querySelector('.speed-value');
    speedControl.value = state.animationSpeed;
    speedValue.textContent = `${state.animationSpeed.toFixed(1)}x`;
}

// ===================================
// COMPARISON FEATURE
// ===================================
function handleCompareSelection(planet, isSelected) {
    if (isSelected) {
        if (state.selectedForCompare.length < 2) {
            state.selectedForCompare.push(planet);
        } else {
            // Replace oldest selection
            state.selectedForCompare.shift();
            state.selectedForCompare.push(planet);
        }
    } else {
        state.selectedForCompare = state.selectedForCompare.filter(p => p !== planet);
    }
    
    if (state.selectedForCompare.length === 2) {
        showComparison();
    } else if (state.selectedForCompare.length < 2) {
        document.getElementById('comparisonPanel').classList.remove('active');
    }
}

function showComparison() {
    const comparisonContent = document.getElementById('comparisonContent');
    const comparisonPanel = document.getElementById('comparisonPanel');
    
    if (state.selectedForCompare.length !== 2) return;
    
    const [planet1, planet2] = state.selectedForCompare;
    
    comparisonContent.innerHTML = `
        <div class="comparison-grid">
            ${createComparisonCard(planet1)}
            ${createComparisonCard(planet2)}
        </div>
    `;
    
    comparisonPanel.classList.add('active');
}

function createComparisonCard(planet) {
    return `
        <div class="comparison-planet">
            <h3>${planet.name}</h3>
            <table class="comparison-table">
                <tr>
                    <td>Mass</td>
                    <td>${planet.mass}</td>
                </tr>
                <tr>
                    <td>Radius</td>
                    <td>${planet.radius}</td>
                </tr>
                <tr>
                    <td>Distance</td>
                    <td>${planet.distance}</td>
                </tr>
                <tr>
                    <td>Orbit Time</td>
                    <td>${planet.orbitTime}</td>
                </tr>
                <tr>
                    <td>Gravity</td>
                    <td>${planet.gravity}</td>
                </tr>
            </table>
        </div>
    `;
}

// ===================================
// UTILITY FUNCTIONS
// ===================================

// Debounce function for resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle window resize
const handleResize = debounce(() => {
    // Adjust solar system size based on viewport
    const container = document.querySelector('.solar-system');
    const viewportWidth = window.innerWidth;
    
    if (viewportWidth < 480) {
        container.style.width = '350px';
        container.style.height = '350px';
    } else if (viewportWidth < 768) {
        container.style.width = '500px';
        container.style.height = '500px';
    } else if (viewportWidth < 1200) {
        container.style.width = '600px';
        container.style.height = '600px';
    } else {
        container.style.width = '1000px';
        container.style.height = '1000px';
    }
}, 250);

window.addEventListener('resize', handleResize);

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================

// Intersection Observer for performance
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Resume animation when visible
            if (!state.isAnimating) {
                state.isAnimating = true;
                animate();
            }
        } else {
            // Pause animation when not visible (optional optimization)
            // Uncomment to enable:
            // state.isAnimating = false;
            // if (state.animationFrameId) {
            //     cancelAnimationFrame(state.animationFrameId);
            // }
        }
    });
}, observerOptions);

// Observe the solar system container
window.addEventListener('load', () => {
    const solarSystemContainer = document.querySelector('.solar-system-container');
    if (solarSystemContainer) {
        observer.observe(solarSystemContainer);
    }
});

// ===================================
// EASTER EGGS & ENHANCEMENTS
// ===================================

// Konami Code easter egg (up, up, down, down, left, right, left, right, b, a)
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (JSON.stringify(konamiCode) === JSON.stringify(konamiPattern)) {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    // Make planets dance!
    state.planets.filter(p => p.orbitRadius > 0).forEach((planet, index) => {
        setTimeout(() => {
            planet.element.style.animation = 'planetGlow 0.5s ease-in-out 3';
            planet.orbitSpeed *= 10;
            
            setTimeout(() => {
                planet.orbitSpeed /= 10;
            }, 3000);
        }, index * 200);
    });
    
    // Show message
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 240, 255, 0.9);
        color: #0a0e27;
        padding: 2rem 3rem;
        border-radius: 15px;
        font-family: 'Orbitron', sans-serif;
        font-size: 1.5rem;
        font-weight: 900;
        letter-spacing: 0.2rem;
        z-index: 10001;
        box-shadow: 0 0 50px rgba(0, 240, 255, 0.8);
        animation: fadeInOut 3s ease-in-out;
    `;
    message.textContent = '🎉 COSMIC DANCE ACTIVATED! 🎉';
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 3000);
}

// Add fade animation for easter egg
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInOut {
        0%, 100% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
        50% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    }
`;
document.head.appendChild(style);

// ===================================
// START APPLICATION
// ===================================
document.addEventListener('DOMContentLoaded', init);

// Prevent context menu on planets for cleaner UX
document.addEventListener('contextmenu', (e) => {
    if (e.target.classList.contains('planet') || e.target.classList.contains('sun')) {
        e.preventDefault();
    }
});

// Log welcome message
console.log('%c🌌 SOLAR SYSTEM EXPLORER 🌌', 'font-size: 20px; font-weight: bold; color: #00f0ff;');
console.log('%cWelcome to the cosmos! Try the Konami Code for a surprise...', 'font-size: 12px; color: #ff006e;');
console.log('%c↑ ↑ ↓ ↓ ← → ← → B A', 'font-size: 14px; font-weight: bold; color: #fdb813;');
console.log('%c💡 Click the Sun to see its information!', 'font-size: 12px; color: #fdb813;');