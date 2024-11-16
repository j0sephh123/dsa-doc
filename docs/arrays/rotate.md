# Rotate

### **Approach: In-Place Reversal Technique**

This approach involves:

1. **Reversing the entire array.**
2. **Reversing the first \( k \) elements.**
3. **Reversing the remaining \( n - k \) elements.**

---

### **Why Does This Work?**

Reversing parts of the array reorders the elements correctly:

1. After reversing the entire array, the last \( k \) elements come to the front, but in reverse order.
2. Reversing the first \( k \) elements restores their correct order.
3. Reversing the rest restores the order of the remaining elements.

---

### **Step-by-Step Example**

#### Input:

Array: `[1, 2, 3, 4, 5]`  
Rotate by \( k = 2 \).

#### Steps:

1. Reverse the entire array:
   \[
   [1, 2, 3, 4, 5] \quad \rightarrow \quad [5, 4, 3, 2, 1]
   \]

2. Reverse the first \( k = 2 \) elements:
   \[
   [5, 4, 3, 2, 1] \quad \rightarrow \quad [4, 5, 3, 2, 1]
   \]

3. Reverse the remaining \( n - k = 3 \) elements:
   \[
   [4, 5, 3, 2, 1] \quad \rightarrow \quad [4, 5, 1, 2, 3]
   \]

#### Output:

\[ [4, 5, 1, 2, 3] \]

---

### **Code Implementation**

Here’s how to do it in JavaScript without any built-in methods:

```javascript
const assert = require("node:assert");

/**
 * Reverse a portion of the array in place.
 * @param {number[]} arr - The input array.
 * @param {number} start - Starting index of the portion to reverse.
 * @param {number} end - Ending index of the portion to reverse.
 */
function reverse(arr, start, end) {
  while (start < end) {
    [arr[start], arr[end]] = [arr[end], arr[start]]; // Swap
    start++;
    end--;
  }
}

/**
 * Rotate an array to the right by k steps.
 * @param {number[]} arr - The input array.
 * @param {number} k - The number of steps to rotate.
 */
function rotateArray(arr, k) {
  const n = arr.length;
  if (n === 0 || k % n === 0) return; // No rotation needed for empty or full rotations

  k = k % n; // Reduce k if it's larger than the array length

  // Step 1: Reverse the entire array
  reverse(arr, 0, n - 1);

  // Step 2: Reverse the first k elements
  reverse(arr, 0, k - 1);

  // Step 3: Reverse the remaining elements
  reverse(arr, k, n - 1);
}

// Tests
let arr1 = [1, 2, 3, 4, 5];
rotateArray(arr1, 2);
assert.deepStrictEqual(arr1, [4, 5, 1, 2, 3]); // Standard case

let arr2 = [1, 2, 3, 4, 5];
rotateArray(arr2, 5);
assert.deepStrictEqual(arr2, [1, 2, 3, 4, 5]); // Full rotation (k = array length)

let arr3 = [1, 2, 3, 4, 5];
rotateArray(arr3, 7);
assert.deepStrictEqual(arr3, [4, 5, 1, 2, 3]); // k > array length

let arr4 = [];
rotateArray(arr4, 3);
assert.deepStrictEqual(arr4, []); // Empty array

let arr5 = [1];
rotateArray(arr5, 10);
assert.deepStrictEqual(arr5, [1]); // Single element

console.log("All tests passed!");
```

---

### **Key Insights**

1. **Reversal is Efficient**:

   - Each reversal takes \( O(n) \) time, and we reverse three times. The overall time complexity is:
     \[
     O(n)
     \]

2. **In-Place Rotation**:

   - No additional arrays are created, so the space complexity is:
     \[
     O(1)
     \]

3. **Edge Cases**:
   - \( k = 0 \): No rotation needed.
   - \( k = n \): Array remains the same.
   - \( k > n \): Handled by reducing \( k \) modulo \( n \).

### **Why Does the In-Place Reversal Work?**

The in-place reversal is rooted in **mathematical reordering**. Here’s the conceptual trick:

1. **Reversing the Entire Array**:

   - It rearranges the array so that the last \( k \) elements move to the front, but **in reverse order**.
   - Example: `[1, 2, 3, 4, 5]` becomes `[5, 4, 3, 2, 1]`.

2. **Reversing the First \( k \) Elements**:

   - Restores the correct order of the first \( k \) elements.
   - Example: `[5, 4, 3, 2, 1]` becomes `[4, 5, 3, 2, 1]`.

3. **Reversing the Remaining \( n - k \) Elements**:
   - Restores the correct order of the remaining elements.
   - Example: `[4, 5, 3, 2, 1]` becomes `[4, 5, 1, 2, 3]`.

This stepwise "breaking and fixing" process feels odd because it relies on manipulating segments in non-obvious ways.

---

### **Slice and Concat: Why Is It Easier to Grasp?**

The **slice and concat** method is easier because it maps directly to how we **think about rotation**: "Move this part to the front." Here's why it's intuitive:

1. **Split the Array**:

   - You split the array into two parts: the last \( k \) elements and the rest.
   - Example: Rotate `[1, 2, 3, 4, 5]` by \( k = 2 \):
     - Last \( k \): `[4, 5]` (elements that will move to the front).
     - Rest: `[1, 2, 3]` (elements that will follow).

2. **Concatenate**:
   - Simply join the parts in the desired order:
     \[
     [4, 5] + [1, 2, 3] = [4, 5, 1, 2, 3]
     \]

---

### **Comparing the Two Approaches**

| **Aspect**           | **Slice and Concat**                     | **In-Place Reversal**                      |
| -------------------- | ---------------------------------------- | ------------------------------------------ |
| **Intuition**        | Direct and simple: split and join.       | Feels odd at first: reverse, fix, fix.     |
| **Time Complexity**  | \( O(n) \)                               | \( O(n) \)                                 |
| **Space Complexity** | \( O(n) \): creates new arrays.          | \( O(1) \): modifies in place.             |
| **Ease of Use**      | High: maps directly to "move this part." | Moderate: relies on segment operations.    |
| **Real-World Use**   | Convenient for quick scripts.            | Better for space-constrained applications. |

---

### **Breaking Down Slice and Concat**

Let’s rewrite the **slice and concat** example step by step, explaining how it works conceptually:

```javascript
const assert = require("node:assert");

/**
 * Rotate an array to the right by k steps.
 * @param {number[]} arr - The input array.
 * @param {number} k - The number of steps to rotate.
 * @returns {number[]} The rotated array.
 */
function rotateArray(arr, k) {
  const n = arr.length;

  // If the array is empty or no rotation is needed
  if (n === 0 || k % n === 0) return arr;

  // Reduce k to within the bounds of array length
  k = k % n;

  // Step 1: Split the array into two parts
  const lastK = arr.slice(-k); // Take the last k elements
  const rest = arr.slice(0, -k); // Take the first n-k elements

  // Step 2: Concatenate the parts in rotated order
  return lastK.concat(rest);
}

// Tests
assert.deepStrictEqual(rotateArray([1, 2, 3, 4, 5], 2), [4, 5, 1, 2, 3]); // Standard case
assert.deepStrictEqual(rotateArray([1, 2, 3, 4, 5], 5), [1, 2, 3, 4, 5]); // Full rotation (k = array length)
assert.deepStrictEqual(rotateArray([1, 2, 3, 4, 5], 7), [4, 5, 1, 2, 3]); // k > array length
assert.deepStrictEqual(rotateArray([], 3), []); // Empty array
assert.deepStrictEqual(rotateArray([1], 10), [1]); // Single element
console.log("All tests passed!");
```

---

### **Why Is Slice and Concat Easier to Visualize?**

You can think of it like **cutting and pasting** pieces of paper:

1. Cut off the last \( k \) pieces.
2. Paste them at the front of the stack.

---

### **Why Use In-Place Reversal, Then?**

1. **Space Optimization**:

   - For very large arrays, creating new arrays (as with `slice` and `concat`) can be costly.
   - In-place reversal avoids extra memory allocation.

2. **Algorithmic Learning**:
   - The reversal technique introduces deeper concepts of **partitioning** and **reordering**, which are used in many advanced algorithms (like quicksort and mergesort).

---

### **When to Use Which Approach?**

- **Slice and Concat**: If you prioritize **ease of understanding** or work in environments where memory isn’t a concern (e.g., scripting or prototyping).
- **In-Place Reversal**: If you need **space efficiency** or are working in low-level environments where memory is limited.
