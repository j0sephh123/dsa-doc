# Rearrange Numbers Unordered

Rearranging positive and negative numbers involves **grouping all negatives before positives**, without necessarily preserving their relative order. This is a classic partitioning problem that can be efficiently solved using the **two-pointer approach**.

---

### **Problem Statement**

Rearrange an array such that all negative numbers appear before positive numbers.

#### **Example**

Input: `[1, -2, 3, -4, -5, 6]`  
Output: `[-5, -4, -2, 3, 1, 6]` (negatives first, order within groups does not matter).

---

### **Key Principles**

1. **Two-Pointer Partitioning**:

   - One pointer starts from the left (to find positives).
   - Another pointer starts from the right (to find negatives).
   - Swap elements when:
     - The left pointer finds a positive number.
     - The right pointer finds a negative number.

2. **In-Place Rearrangement**:

   - Avoid creating extra arrays; work directly within the input array.

3. **Efficiency**:
   - Ensure \( O(n) \) time complexity by processing each element only once.

---

### **Algorithm**

1. **Initialize Two Pointers**:

   - `left` starts at the beginning.
   - `right` starts at the end.

2. **Partition by Swapping**:

   - While `left < right`:
     - Move `left` forward if it points to a negative number (already in the correct group).
     - Move `right` backward if it points to a positive number (already in the correct group).
     - Swap `arr[left]` and `arr[right]` when:
       - `left` points to a positive number.
       - `right` points to a negative number.

3. **Stop When Pointers Meet**:
   - The array is partitioned when `left >= right`.

---

### **Code Implementation**

```javascript
/**
 * Rearranges the array to place all negatives before positives.
 * @param {number[]} arr - The input array.
 */
function rearrangePositivesAndNegatives(arr) {
  let left = 0,
    right = arr.length - 1;

  while (left < right) {
    // Move left pointer forward if it's negative
    if (arr[left] < 0) {
      left++;
    }
    // Move right pointer backward if it's positive
    else if (arr[right] > 0) {
      right--;
    }
    // Swap if left is positive and right is negative
    else {
      [arr[left], arr[right]] = [arr[right], arr[left]];
      left++;
      right--;
    }
  }
}

// Example Usage
let arr = [1, -2, 3, -4, -5, 6];
rearrangePositivesAndNegatives(arr);
console.log(arr); // Output: [-5, -4, -2, 3, 1, 6] (order within groups may vary)
```

---

### **Walkthrough**

#### Input: `[1, -2, 3, -4, -5, 6]`

1. **Initial State**:

   - `left = 0`, `right = 5`.

2. **Step-by-Step Execution**:

| **Left Pointer** | **Right Pointer** | **Action**                 | **Array State**         |
| ---------------- | ----------------- | -------------------------- | ----------------------- |
| 0 (1, positive)  | 5 (6, positive)   | Move `right` to 4          | `[1, -2, 3, -4, -5, 6]` |
| 0 (1, positive)  | 4 (-5, negative)  | Swap `arr[0]` and `arr[4]` | `[-5, -2, 3, -4, 1, 6]` |
| 1 (-2, negative) | 3 (-4, negative)  | Move `left` to 2           | `[-5, -2, 3, -4, 1, 6]` |
| 2 (3, positive)  | 3 (-4, negative)  | Swap `arr[2]` and `arr[3]` | `[-5, -2, -4, 3, 1, 6]` |

3. **Pointers Meet**:
   - `left = 3`, `right = 2`.

#### Final Output:

`[-5, -2, -4, 3, 1, 6]`

---

### **Key Insights**

1. **Unordered Partition**:

   - The approach guarantees negatives appear before positives but does not preserve their relative order within groups. This is a common trade-off in partitioning problems.

2. **In-Place Efficiency**:

   - No extra memory is used, making the space complexity \( O(1) \).

3. **Time Complexity**:
   - Each element is inspected at most once, yielding \( O(n) \).

---

### **Extension: Preserving Order**

If you need to preserve the relative order of negatives and positives, the two-pointer approach won’t suffice. You’ll need a **stable partitioning algorithm**, such as:

1. **Iterative Shifting**:

   - Traverse the array and shift positive numbers right while inserting negatives in order.

2. **Auxiliary Array**:
   - Use two temporary arrays to collect negatives and positives, then merge them.
