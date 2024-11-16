# Cumulative Sums

### **1. What Are Cumulative Sums?**

A **cumulative sum** at index \( i \) in an array is the sum of all elements from the beginning of the array up to \( i \).

#### **Example**:

Input: `[1, 2, 3, 4]`  
Output: `[1, 3, 6, 10]`  
Explanation:

- Cumulative sum at index `0`: \( 1 \)
- Cumulative sum at index `1`: \( 1 + 2 = 3 \)
- Cumulative sum at index `2`: \( 1 + 2 + 3 = 6 \)
- Cumulative sum at index `3`: \( 1 + 2 + 3 + 4 = 10 \)

---

### **2. Applications of Cumulative Sums**

1. **Querying Subarray Sums**:

   - Quickly calculate the sum of elements between two indices using:

2. **Dynamic Analysis**:

   - Track running totals in financial data, scores, or resource usage.

3. **Optimization**:
   - Reduce repeated computations in range sum problems.

---

### **3. Principles**

#### **Space Efficiency**:

- Cumulative sums can be stored in the same array to save space.

#### **Time Complexity**:

- \( O(n) \): Each element is processed once.

---

### **4. Implementation**

#### **Code Without Using Extra Space**

Update the input array to store cumulative sums.

```javascript
/**
 * Calculates cumulative sums in-place.
 * @param {number[]} arr - The input array.
 */
function calculateCumulativeSumsInPlace(arr) {
  for (let i = 1; i < arr.length; i++) {
    arr[i] += arr[i - 1];
  }
}

// Example Usage
const arr = [1, 2, 3, 4];
calculateCumulativeSumsInPlace(arr);
console.log(arr); // Output: [1, 3, 6, 10]
```

---

#### **Code Using Extra Space**

Create a new array to store the cumulative sums.

```javascript
/**
 * Calculates cumulative sums and returns a new array.
 * @param {number[]} arr - The input array.
 * @returns {number[]} - The cumulative sums array.
 */
function calculateCumulativeSums(arr) {
  const cumSum = new Array(arr.length);
  cumSum[0] = arr[0];

  for (let i = 1; i < arr.length; i++) {
    cumSum[i] = cumSum[i - 1] + arr[i];
  }

  return cumSum;
}

// Example Usage
const arr = [1, 2, 3, 4];
const cumSum = calculateCumulativeSums(arr);
console.log(cumSum); // Output: [1, 3, 6, 10]
```

---

### **5. Variations**

#### **1. Reverse Cumulative Sums**

Calculate cumulative sums starting from the end of the array.

**Example**:
Input: `[1, 2, 3, 4]`  
Output: `[10, 9, 7, 4]`  
Explanation:

- Cumulative sum at index `3`: \( 4 \)
- Cumulative sum at index `2`: \( 4 + 3 = 7 \)
- Cumulative sum at index `1`: \( 4 + 3 + 2 = 9 \)
- Cumulative sum at index `0`: \( 4 + 3 + 2 + 1 = 10 \)

**Code**:

```javascript
/**
 * Calculates reverse cumulative sums.
 * @param {number[]} arr - The input array.
 * @returns {number[]} - The reverse cumulative sums array.
 */
function calculateReverseCumulativeSums(arr) {
  const revCumSum = new Array(arr.length);
  revCumSum[arr.length - 1] = arr[arr.length - 1];

  for (let i = arr.length - 2; i >= 0; i--) {
    revCumSum[i] = revCumSum[i + 1] + arr[i];
  }

  return revCumSum;
}

// Example Usage
const arr = [1, 2, 3, 4];
const revCumSum = calculateReverseCumulativeSums(arr);
console.log(revCumSum); // Output: [10, 9, 7, 4]
```

---

#### **2. Range Sum Using Cumulative Sums**

Given cumulative sums, compute the sum of elements in a specific range `[i, j]` in constant time.

**Formula**:

**Code**:

```javascript
/**
 * Calculates the sum of a range using cumulative sums.
 * @param {number[]} cumSum - The cumulative sums array.
 * @param {number} start - The starting index of the range.
 * @param {number} end - The ending index of the range.
 * @returns {number} - The sum of the range.
 */
function rangeSum(cumSum, start, end) {
  if (start === 0) return cumSum[end];
  return cumSum[end] - cumSum[start - 1];
}

// Example Usage
const arr = [1, 2, 3, 4];
const cumSum = calculateCumulativeSums(arr);
console.log(rangeSum(cumSum, 1, 3)); // Output: 9 (2 + 3 + 4)
```
