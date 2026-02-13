// ============================================
// SORTING ALGORITHM VISUALIZER
// Educational JavaScript Implementation
// ============================================

// ============================================
// GLOBAL STATE MANAGEMENT
// ============================================

// Store the current array being visualized
let array = [];

// Animation speed in milliseconds (controlled by slider)
let animationSpeed = 50;

// Flag to prevent multiple sorts running simultaneously
let isSorting = false;

// Statistics tracking
let stats = {
    comparisons: 0,
    arrayAccess: 0
};

// ============================================
// ALGORITHM INFORMATION DATABASE
// Each algorithm has complexity info and description
// ============================================

const algorithmInfo = {
    bubble: {
        name: 'Bubble Sort',
        description: 'Bubble Sort repeatedly steps through the list, compares adjacent elements and swaps them if they are in wrong order. The pass through the list is repeated until no swaps are needed.',
        timeComplexity: 'O(n²)',
        spaceComplexity: 'O(1)',
        bestCase: 'O(n)',
        avgCase: 'O(n²)',
        worstCase: 'O(n²)'
    },
    selection: {
        name: 'Selection Sort',
        description: 'Selection Sort divides the input into sorted and unsorted regions. It repeatedly selects the smallest element from the unsorted region and moves it to the end of the sorted region.',
        timeComplexity: 'O(n²)',
        spaceComplexity: 'O(1)',
        bestCase: 'O(n²)',
        avgCase: 'O(n²)',
        worstCase: 'O(n²)'
    },
    insertion: {
        name: 'Insertion Sort',
        description: 'Insertion Sort builds the final sorted array one item at a time. It takes each element and inserts it into its correct position in the already sorted portion of the array.',
        timeComplexity: 'O(n²)',
        spaceComplexity: 'O(1)',
        bestCase: 'O(n)',
        avgCase: 'O(n²)',
        worstCase: 'O(n²)'
    },
    merge: {
        name: 'Merge Sort',
        description: 'Merge Sort is a divide-and-conquer algorithm that divides the array into halves, recursively sorts them, and then merges the sorted halves. It guarantees O(n log n) time complexity.',
        timeComplexity: 'O(n log n)',
        spaceComplexity: 'O(n)',
        bestCase: 'O(n log n)',
        avgCase: 'O(n log n)',
        worstCase: 'O(n log n)'
    },
    quick: {
        name: 'Quick Sort',
        description: 'Quick Sort picks a pivot element and partitions the array around it, placing smaller elements before and larger elements after the pivot. It then recursively sorts the sub-arrays.',
        timeComplexity: 'O(n log n)',
        spaceComplexity: 'O(log n)',
        bestCase: 'O(n log n)',
        avgCase: 'O(n log n)',
        worstCase: 'O(n²)'
    },
    heap: {
        name: 'Heap Sort',
        description: 'Heap Sort converts the array into a max heap structure, then repeatedly extracts the maximum element and rebuilds the heap. It guarantees O(n log n) performance.',
        timeComplexity: 'O(n log n)',
        spaceComplexity: 'O(1)',
        bestCase: 'O(n log n)',
        avgCase: 'O(n log n)',
        worstCase: 'O(n log n)'
    }
};

// ============================================
// DOM ELEMENT REFERENCES
// Cache all DOM elements for better performance
// ============================================

const elements = {
    arrayContainer: document.getElementById('arrayContainer'),
    algorithmSelect: document.getElementById('algorithmSelect'),
    arraySizeSlider: document.getElementById('arraySize'),
    speedSlider: document.getElementById('speed'),
    generateBtn: document.getElementById('generateBtn'),
    sortBtn: document.getElementById('sortBtn'),
    sizeValue: document.getElementById('sizeValue'),
    speedValue: document.getElementById('speedValue'),
    comparisons: document.getElementById('comparisons'),
    arrayAccess: document.getElementById('arrayAccess'),
    timeComplexity: document.getElementById('timeComplexity'),
    spaceComplexity: document.getElementById('spaceComplexity'),
    status: document.getElementById('status'),
    algoDescription: document.getElementById('algoDescription'),
    bestCase: document.getElementById('bestCase'),
    avgCase: document.getElementById('avgCase'),
    worstCase: document.getElementById('worstCase')
};

// ============================================
// INITIALIZATION
// Run when the page loads
// ============================================

window.addEventListener('DOMContentLoaded', () => {
    generateArray();
    updateAlgorithmInfo();
    setupEventListeners();
});

// ============================================
// EVENT LISTENERS SETUP
// ============================================

function setupEventListeners() {
    // Generate new random array
    elements.generateBtn.addEventListener('click', generateArray);
    
    // Start sorting
    elements.sortBtn.addEventListener('click', startSort);
    
    // Update array size display when slider moves
    elements.arraySizeSlider.addEventListener('input', (e) => {
        elements.sizeValue.textContent = e.target.value;
    });
    
    // Update array size when slider is released
    elements.arraySizeSlider.addEventListener('change', generateArray);
    
    // Update speed display and value
    elements.speedSlider.addEventListener('input', (e) => {
        const speeds = ['Very Slow', 'Slow', 'Medium', 'Fast', 'Very Fast'];
        elements.speedValue.textContent = speeds[e.target.value - 1];
        
        // Map slider value to actual delay (inverse relationship)
        const speedMap = [200, 100, 50, 20, 5];
        animationSpeed = speedMap[e.target.value - 1];
    });
    
    // Update algorithm information when selection changes
    elements.algorithmSelect.addEventListener('change', updateAlgorithmInfo);
}

// ============================================
// ARRAY GENERATION
// Creates a new random array and renders it
// ============================================

function generateArray() {
    // Don't generate new array while sorting
    if (isSorting) return;
    
    const size = parseInt(elements.arraySizeSlider.value);
    array = [];
    
    // Generate random values between 5 and 100
    for (let i = 0; i < size; i++) {
        array.push(Math.floor(Math.random() * 96) + 5);
    }
    
    // Reset statistics
    resetStats();
    
    // Render the array visually
    renderArray();
    
    updateStatus('Ready');
}

// ============================================
// ARRAY RENDERING
// Creates visual bars for each array element
// ============================================

function renderArray(colorArray = []) {
    // Clear existing bars
    elements.arrayContainer.innerHTML = '';
    
    // Create a bar for each array element
    array.forEach((value, index) => {
        const bar = document.createElement('div');
        bar.classList.add('array-bar');
        
        // Set height based on value (percentage of container)
        bar.style.height = `${value * 3}px`;
        
        // Apply special colors if provided (for highlighting during sort)
        if (colorArray.length > 0 && colorArray[index]) {
            bar.classList.add(colorArray[index]);
        }
        
        elements.arrayContainer.appendChild(bar);
    });
}

// ============================================
// STATISTICS MANAGEMENT
// ============================================

function resetStats() {
    stats.comparisons = 0;
    stats.arrayAccess = 0;
    updateStatsDisplay();
}

function updateStatsDisplay() {
    elements.comparisons.textContent = stats.comparisons;
    elements.arrayAccess.textContent = stats.arrayAccess;
}

function updateStatus(status) {
    elements.status.textContent = status;
}

// ============================================
// ALGORITHM INFORMATION UPDATE
// Updates the UI with selected algorithm details
// ============================================

function updateAlgorithmInfo() {
    const selected = elements.algorithmSelect.value;
    const info = algorithmInfo[selected];
    
    elements.algoDescription.textContent = info.description;
    elements.timeComplexity.textContent = info.timeComplexity;
    elements.spaceComplexity.textContent = info.spaceComplexity;
    elements.bestCase.textContent = info.bestCase;
    elements.avgCase.textContent = info.avgCase;
    elements.worstCase.textContent = info.worstCase;
}

// ============================================
// START SORTING
// Main entry point for sorting algorithms
// ============================================

async function startSort() {
    if (isSorting) return;
    
    isSorting = true;
    resetStats();
    
    // Disable buttons during sorting
    elements.sortBtn.disabled = true;
    elements.generateBtn.disabled = true;
    elements.algorithmSelect.disabled = true;
    elements.arraySizeSlider.disabled = true;
    
    updateStatus('Sorting...');
    
    const algorithm = elements.algorithmSelect.value;
    
    // Call the appropriate sorting algorithm
    switch(algorithm) {
        case 'bubble':
            await bubbleSort();
            break;
        case 'selection':
            await selectionSort();
            break;
        case 'insertion':
            await insertionSort();
            break;
        case 'merge':
            await mergeSort(0, array.length - 1);
            break;
        case 'quick':
            await quickSort(0, array.length - 1);
            break;
        case 'heap':
            await heapSort();
            break;
    }
    
    // Mark all bars as sorted with animation
    await markSorted();
    
    updateStatus('Sorted!');
    
    // Re-enable buttons
    isSorting = false;
    elements.sortBtn.disabled = false;
    elements.generateBtn.disabled = false;
    elements.algorithmSelect.disabled = false;
    elements.arraySizeSlider.disabled = false;
}

// ============================================
// UTILITY: Delay function for animation
// Creates a pause between visualization steps
// ============================================

function delay(ms = animationSpeed) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// ============================================
// UTILITY: Swap array elements
// Swaps two elements and updates visualization
// ============================================

async function swap(i, j) {
    // Visual feedback for swapping
    const colors = Array(array.length).fill(null);
    colors[i] = 'swapping';
    colors[j] = 'swapping';
    renderArray(colors);
    
    await delay();
    
    // Perform the actual swap
    [array[i], array[j]] = [array[j], array[i]];
    stats.arrayAccess += 4; // 2 reads + 2 writes
    updateStatsDisplay();
    
    // Render the swapped array
    renderArray();
    await delay();
}

// ============================================
// UTILITY: Mark all as sorted
// Final animation showing completion
// ============================================

async function markSorted() {
    for (let i = 0; i < array.length; i++) {
        const colors = Array(array.length).fill(null);
        for (let j = 0; j <= i; j++) {
            colors[j] = 'sorted';
        }
        renderArray(colors);
        await delay(10);
    }
}

// ============================================
// ALGORITHM 1: BUBBLE SORT
// Time: O(n²) | Space: O(1)
// ============================================

async function bubbleSort() {
    const n = array.length;
    
    // Outer loop: n-1 passes through the array
    for (let i = 0; i < n - 1; i++) {
        let swapped = false;
        
        // Inner loop: compare adjacent elements
        for (let j = 0; j < n - i - 1; j++) {
            // Highlight elements being compared
            const colors = Array(n).fill(null);
            colors[j] = 'comparing';
            colors[j + 1] = 'comparing';
            
            // Mark already sorted elements
            for (let k = n - 1; k >= n - i; k--) {
                colors[k] = 'sorted';
            }
            
            renderArray(colors);
            await delay();
            
            // Increment comparison counter
            stats.comparisons++;
            stats.arrayAccess += 2;
            updateStatsDisplay();
            
            // If elements are in wrong order, swap them
            if (array[j] > array[j + 1]) {
                await swap(j, j + 1);
                swapped = true;
            }
        }
        
        // If no swaps occurred, array is sorted
        if (!swapped) break;
    }
}

// ============================================
// ALGORITHM 2: SELECTION SORT
// Time: O(n²) | Space: O(1)
// ============================================

async function selectionSort() {
    const n = array.length;
    
    // Move boundary of unsorted subarray one element at a time
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        
        // Find the minimum element in unsorted portion
        for (let j = i + 1; j < n; j++) {
            const colors = Array(n).fill(null);
            
            // Mark sorted portion
            for (let k = 0; k < i; k++) {
                colors[k] = 'sorted';
            }
            
            // Highlight current minimum
            colors[minIndex] = 'swapping';
            // Highlight element being compared
            colors[j] = 'comparing';
            
            renderArray(colors);
            await delay();
            
            stats.comparisons++;
            stats.arrayAccess += 2;
            updateStatsDisplay();
            
            // Update minimum if needed
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }
        
        // Swap minimum element with first unsorted element
        if (minIndex !== i) {
            await swap(i, minIndex);
        }
    }
}

// ============================================
// ALGORITHM 3: INSERTION SORT
// Time: O(n²) | Space: O(1)
// ============================================

async function insertionSort() {
    const n = array.length;
    
    // Start from second element (first is considered sorted)
    for (let i = 1; i < n; i++) {
        const key = array[i];
        let j = i - 1;
        
        stats.arrayAccess++;
        
        // Highlight the key element being inserted
        const highlightColors = Array(n).fill(null);
        highlightColors[i] = 'swapping';
        renderArray(highlightColors);
        await delay();
        
        // Move elements greater than key one position ahead
        while (j >= 0) {
            const colors = Array(n).fill(null);
            
            // Mark sorted portion
            for (let k = 0; k < i; k++) {
                colors[k] = 'sorted';
            }
            
            colors[j] = 'comparing';
            colors[i] = 'swapping';
            renderArray(colors);
            await delay();
            
            stats.comparisons++;
            stats.arrayAccess++;
            updateStatsDisplay();
            
            if (array[j] > key) {
                array[j + 1] = array[j];
                stats.arrayAccess += 2;
                renderArray(colors);
                await delay();
                j--;
            } else {
                break;
            }
        }
        
        // Insert key at its correct position
        array[j + 1] = key;
        stats.arrayAccess++;
        updateStatsDisplay();
    }
}

// ============================================
// ALGORITHM 4: MERGE SORT
// Time: O(n log n) | Space: O(n)
// ============================================

async function mergeSort(left, right) {
    if (left >= right) return;
    
    // Find the middle point
    const mid = Math.floor((left + right) / 2);
    
    // Recursively sort first and second halves
    await mergeSort(left, mid);
    await mergeSort(mid + 1, right);
    
    // Merge the sorted halves
    await merge(left, mid, right);
}

async function merge(left, mid, right) {
    // Create temporary arrays
    const leftArray = array.slice(left, mid + 1);
    const rightArray = array.slice(mid + 1, right + 1);
    
    stats.arrayAccess += (right - left + 1);
    
    let i = 0, j = 0, k = left;
    
    // Merge the temp arrays back
    while (i < leftArray.length && j < rightArray.length) {
        const colors = Array(array.length).fill(null);
        
        // Highlight the range being merged
        for (let x = left; x <= right; x++) {
            colors[x] = 'comparing';
        }
        colors[k] = 'swapping';
        
        renderArray(colors);
        await delay();
        
        stats.comparisons++;
        stats.arrayAccess += 3;
        updateStatsDisplay();
        
        if (leftArray[i] <= rightArray[j]) {
            array[k] = leftArray[i];
            i++;
        } else {
            array[k] = rightArray[j];
            j++;
        }
        k++;
        
        renderArray(colors);
        await delay();
    }
    
    // Copy remaining elements of leftArray
    while (i < leftArray.length) {
        array[k] = leftArray[i];
        stats.arrayAccess++;
        i++;
        k++;
        
        const colors = Array(array.length).fill(null);
        colors[k - 1] = 'swapping';
        renderArray(colors);
        await delay();
    }
    
    // Copy remaining elements of rightArray
    while (j < rightArray.length) {
        array[k] = rightArray[j];
        stats.arrayAccess++;
        j++;
        k++;
        
        const colors = Array(array.length).fill(null);
        colors[k - 1] = 'swapping';
        renderArray(colors);
        await delay();
    }
}

// ============================================
// ALGORITHM 5: QUICK SORT
// Time: O(n log n) avg | Space: O(log n)
// ============================================

async function quickSort(low, high) {
    if (low < high) {
        // Partition the array and get pivot index
        const pivotIndex = await partition(low, high);
        
        // Recursively sort elements before and after partition
        await quickSort(low, pivotIndex - 1);
        await quickSort(pivotIndex + 1, high);
    }
}

async function partition(low, high) {
    // Choose rightmost element as pivot
    const pivot = array[high];
    stats.arrayAccess++;
    
    let i = low - 1; // Index of smaller element
    
    for (let j = low; j < high; j++) {
        const colors = Array(array.length).fill(null);
        colors[high] = 'pivot'; // Highlight pivot
        colors[j] = 'comparing';
        if (i >= low) colors[i] = 'swapping';
        
        renderArray(colors);
        await delay();
        
        stats.comparisons++;
        stats.arrayAccess++;
        updateStatsDisplay();
        
        // If current element is smaller than pivot
        if (array[j] < pivot) {
            i++;
            if (i !== j) {
                await swap(i, j);
            }
        }
    }
    
    // Place pivot in correct position
    if (i + 1 !== high) {
        await swap(i + 1, high);
    }
    
    return i + 1;
}

// ============================================
// ALGORITHM 6: HEAP SORT
// Time: O(n log n) | Space: O(1)
// ============================================

async function heapSort() {
    const n = array.length;
    
    // Build max heap (rearrange array)
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(n, i);
    }
    
    // Extract elements from heap one by one
    for (let i = n - 1; i > 0; i--) {
        // Move current root to end
        await swap(0, i);
        
        // Mark as sorted
        const colors = Array(n).fill(null);
        for (let j = i; j < n; j++) {
            colors[j] = 'sorted';
        }
        renderArray(colors);
        await delay();
        
        // Heapify the reduced heap
        await heapify(i, 0);
    }
}

async function heapify(n, i) {
    let largest = i; // Initialize largest as root
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    
    // Highlight nodes being compared
    const colors = Array(array.length).fill(null);
    colors[i] = 'comparing';
    if (left < n) colors[left] = 'swapping';
    if (right < n) colors[right] = 'swapping';
    renderArray(colors);
    await delay();
    
    // If left child is larger than root
    if (left < n) {
        stats.comparisons++;
        stats.arrayAccess += 2;
        updateStatsDisplay();
        
        if (array[left] > array[largest]) {
            largest = left;
        }
    }
    
    // If right child is larger than largest so far
    if (right < n) {
        stats.comparisons++;
        stats.arrayAccess += 2;
        updateStatsDisplay();
        
        if (array[right] > array[largest]) {
            largest = right;
        }
    }
    
    // If largest is not root
    if (largest !== i) {
        await swap(i, largest);
        
        // Recursively heapify the affected sub-tree
        await heapify(n, largest);
    }
}

// ============================================
// EDUCATIONAL NOTES
// ============================================

/*
 * KEY CONCEPTS TO UNDERSTAND:
 * 
 * 1. TIME COMPLEXITY:
 *    - O(n²): Quadratic - Performance degrades quickly with size
 *    - O(n log n): Linearithmic - Much more efficient for large datasets
 *    - O(n): Linear - Rare for sorting, but possible in best cases
 * 
 * 2. SPACE COMPLEXITY:
 *    - O(1): In-place sorting, minimal extra memory
 *    - O(n): Requires additional array space
 *    - O(log n): Recursion stack space
 * 
 * 3. STABILITY:
 *    - Stable: Preserves relative order of equal elements
 *    - Unstable: May change relative order of equal elements
 * 
 * 4. WHEN TO USE EACH:
 *    - Bubble/Insertion: Small arrays or nearly sorted data
 *    - Selection: When memory writes are expensive
 *    - Merge: When stability is needed, guaranteed O(n log n)
 *    - Quick: General purpose, average O(n log n), in-place
 *    - Heap: Guaranteed O(n log n) with O(1) space
 * 
 * PRACTICE TIPS:
 * - Trace through the code with a small array on paper
 * - Pay attention to the loop structures and conditions
 * - Notice how different algorithms partition/divide the work
 * - Compare the actual comparison counts for different algorithms
 */