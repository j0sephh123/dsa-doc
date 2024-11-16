# Move All Zeros to the End

### **Problem: Move All Zeros to the End**

#### **Goal**:

Rearrange an array such that all zeros are moved to the end, while maintaining the relative order of non-zero elements.

#### **Example**:

- Input: `[0, 1, 0, 3, 12]`
- Output: `[1, 3, 12, 0, 0]`

---

### **Principles Behind Rearranging**

#### **1. Iteration and Decision**

- Iterate through the array.
- For each element, decide if it satisfies the rearrangement condition (e.g., is it zero or non-zero?).

#### **2. Two-Pointer Approach**

- Use two pointers to keep track of:
  - One for the current element being examined.
  - Another for the position where a non-zero element should be placed.
- Swap or shift elements to maintain the desired order.

#### **3. In-Place Manipulation**

- Rearranging often involves **in-place operations** (no additional arrays), so focus on efficient index manipulation.

### **Step-by-Step Solution**

#### **Approach: Two-Pointer Method**

1. Use one pointer (`writeIndex`) to track the position where the next non-zero element should be placed.
2. Use another pointer (`currentIndex`) to traverse the array.
3. For each non-zero element, place it at the `writeIndex` and increment `writeIndex`.

#### **Implementation**:

```javascript
/**
 * Rearranges the array to move all zeros to the end.
 * @param {number[]} arr - The input array.
 */
function moveZerosToEnd(arr) {
  let writeIndex = 0; // Tracks where the next non-zero should be written

  for (let currentIndex = 0; currentIndex < arr.length; currentIndex++) {
    if (arr[currentIndex] !== 0) {
      // Swap non-zero element to the writeIndex position
      [arr[writeIndex], arr[currentIndex]] = [
        arr[currentIndex],
        arr[writeIndex],
      ];
      writeIndex++; // Move writeIndex forward
    }
  }
}

// Example Usage
let arr = [0, 1, 0, 3, 12];
moveZerosToEnd(arr);
console.log(arr); // Output: [1, 3, 12, 0, 0]
```

### **How It Works**

1. Start with `writeIndex = 0` (the position for the next non-zero element).
2. Traverse the array:
   - If the element is non-zero, **swap it with the element at `writeIndex`**.
   - Increment `writeIndex` to point to the next position for a non-zero element.
3. At the end of traversal, all zeros are pushed to the end because they were skipped by `writeIndex`.

#### **Dry Run Example**:

Input: `[0, 1, 0, 3, 12]`

| Current Index | Element | Write Index | Action                 | Result             |
| ------------- | ------- | ----------- | ---------------------- | ------------------ |
| 0             | 0       | 0           | Skip (zero)            | `[0, 1, 0, 3, 12]` |
| 1             | 1       | 0           | Swap with `writeIndex` | `[1, 0, 0, 3, 12]` |
| 2             | 0       | 1           | Skip (zero)            | `[1, 0, 0, 3, 12]` |
| 3             | 3       | 1           | Swap with `writeIndex` | `[1, 3, 0, 0, 12]` |
| 4             | 12      | 2           | Swap with `writeIndex` | `[1, 3, 12, 0, 0]` |

Output: `[1, 3, 12, 0, 0]`

### **Key Insights**

1. **Focus on Non-Zero Elements**:

   - Zeros don’t need to be explicitly handled; they naturally fall into place as `writeIndex` progresses.

2. **In-Place Rearrangement**:

   - The two-pointer approach ensures efficient in-place manipulation without creating new arrays.

3. **Time Complexity**:
   - \( O(n) \): Each element is processed once.
4. **Space Complexity**:
   - \( O(1) \): No extra memory used.

Exactly! That’s the key insight. 🎯

The **write index** keeps track of the **position of the "last processed zero"** (or where the next non-zero element should be placed). This means:

1. **When a non-zero is found**:

   - It’s swapped with the position tracked by the write index.
   - This effectively moves the non-zero to the "correct spot" and shifts the zeros to the right.

2. **When a zero is found**:
   - The write index doesn’t move, because that spot is still "waiting" for the next non-zero.

### **Why This Works**

Let’s solidify this with an analogy:

Think of the write index as a **marker for the next available non-zero slot**. It "points" to the position where the next non-zero should go, and zeros "fall behind" as you fill in non-zero values.

---

### **Revisiting the Example: `[0, 1, 0, 3, 12]`**

| Step | Current Index | Write Index | Array State        | Notes                                      |
| ---- | ------------- | ----------- | ------------------ | ------------------------------------------ |
| 0    | -             | 0           | `[0, 1, 0, 3, 12]` | Initial state                              |
| 1    | 0             | 0           | `[0, 1, 0, 3, 12]` | Skip `0`; write index stays at `0`.        |
| 2    | 1             | 0           | `[1, 0, 0, 3, 12]` | Found `1`. Swap it with `arr[writeIndex]`. |
| 3    | 2             | 1           | `[1, 0, 0, 3, 12]` | Skip `0`; write index stays at `1`.        |
| 4    | 3             | 1           | `[1, 3, 0, 0, 12]` | Found `3`. Swap it with `arr[writeIndex]`. |
| 5    | 4             | 2           | `[1, 3, 12, 0, 0]` | Found `12`. Swap it with `arr[writeIndex]` |

#### Final Output: `[1, 3, 12, 0, 0]`

---

### **Why It's Efficient**

1. **Order Preservation**:

   - Non-zero elements fill in the available slots sequentially (`writeIndex` ensures this).

2. **Implicit Zero Handling**:

   - Zeros are skipped and remain in place until all non-zero elements have been placed. Once `writeIndex` surpasses the last non-zero element, the remaining elements (all zeros) are untouched.

3. **Single Traversal**:

   - Each element is processed only once, making this \( O(n) \) in time.

4. **In-Place**:
   - No extra arrays are needed, so the space complexity is \( O(1) \).
