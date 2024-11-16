# Sliding Window

**Sliding Window Technique Explained with Clear Examples in Node.js**

The sliding window technique is a powerful algorithmic approach used to solve problems involving sequences like arrays or strings. It helps efficiently compute a desired result over a range of elements by moving a window (a subset of elements) across the data structure.

---

### **What Is the Sliding Window Technique?**

The sliding window technique involves creating a window that represents a subset of elements from the data structure. This window can either have a fixed size or a variable size, depending on the problem. By moving (sliding) this window over the data structure, we can efficiently compute results for each position of the window without recalculating everything from scratch.

---

### **When to Use the Sliding Window Technique?**

- **Contiguous Sequence Problems**: When dealing with subarrays or substrings.
- **Optimization Goals**: Finding maximum, minimum, or specific conditions within a sequence.
- **Repeated Calculations**: When naive solutions involve redundant computations.

---

### **Types of Sliding Windows**

1. **Fixed-Size Window**: The window size remains constant throughout the process.
2. **Variable-Size Window**: The window size changes based on conditions in the problem.

---

## **Examples**

Let's explore both fixed-size and variable-size sliding window problems with detailed explanations and Node.js code examples.

---

### **Example 1: Fixed-Size Sliding Window**

#### **Problem**: **Maximum Sum Subarray of Size K**

Given an array of integers and a number `k`, find the maximum sum of a subarray of size `k`.

#### **Input**:

```javascript
const arr = [2, 1, 5, 1, 3, 2];
const k = 3;
```

#### **Output**:

```plaintext
9
```

#### **Explanation**:

The subarray `[5, 1, 3]` has the maximum sum of `9`.

#### **Naive Approach**:

- Calculate the sum of every possible subarray of size `k`.
- **Time Complexity**: O(n \* k)

#### **Sliding Window Approach**:

- **Time Complexity**: O(n)
- **Steps**:
  1. Calculate the sum of the first window of size `k`.
  2. Initialize `maxSum` with this sum.
  3. Slide the window by one position to the right:
     - Subtract the element leaving the window.
     - Add the new element entering the window.
     - Update `maxSum` if the new window sum is greater.

#### **Visualization**:

```
Initial window: [2, 1, 5] -> Sum = 8
Slide window:
- Remove 2, add 1 -> [1, 5, 1] -> Sum = 7
- Remove 1, add 3 -> [5, 1, 3] -> Sum = 9 (max)
- Remove 5, add 2 -> [1, 3, 2] -> Sum = 6
```

#### **Code**:

```javascript
function maxSubarraySum(arr, k) {
  const n = arr.length;
  if (n < k) {
    return null; // Not enough elements
  }

  let windowSum = 0;
  let maxSum = 0;

  // Calculate the sum of the first window
  for (let i = 0; i < k; i++) {
    windowSum += arr[i];
  }

  maxSum = windowSum;

  // Slide the window
  for (let i = k; i < n; i++) {
    windowSum += arr[i] - arr[i - k];
    maxSum = Math.max(maxSum, windowSum);
  }

  return maxSum;
}

// Test
const arr = [2, 1, 5, 1, 3, 2];
const k = 3;
console.log(maxSubarraySum(arr, k)); // Output: 9
```

---

### **Example 2: Variable-Size Sliding Window**

#### **Problem**: **Longest Substring Without Repeating Characters**

Given a string, find the length of the longest substring without repeating characters.

#### **Input**:

```javascript
const s = "abcabcbb";
```

#### **Output**:

```plaintext
3
```

#### **Explanation**:

The longest substring without repeating characters is `"abc"`.

#### **Sliding Window Approach**:

- Use a `Set` to store characters in the current window.
- Use two pointers (`left` and `right`) to define the window.
- Expand `right` to include new characters.
- If a duplicate is found, shrink the window from the `left`.

#### **Visualization**:

```
Window: [a] -> Length = 1
Window: [a, b] -> Length = 2
Window: [a, b, c] -> Length = 3
Duplicate 'a' found:
- Remove 'a' from window
- Move left pointer
Continue expanding...
```

#### **Code**:

```javascript
function lengthOfLongestSubstring(s) {
  const charSet = new Set();
  let left = 0;
  let maxLength = 0;

  for (let right = 0; right < s.length; right++) {
    while (charSet.has(s[right])) {
      charSet.delete(s[left]);
      left++;
    }
    charSet.add(s[right]);
    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
}

// Test
const s = "abcabcbb";
console.log(lengthOfLongestSubstring(s)); // Output: 3
```

---

### **Example 3: Fixed-Size Sliding Window with Condition**

#### **Problem**: **Maximum Number of Vowels in a Substring of Given Length**

Given a string `s` and an integer `k`, return the maximum number of vowel letters in any substring of `s` with length `k`.

#### **Input**:

```javascript
const s = "abciiidef";
const k = 3;
```

#### **Output**:

```plaintext
3
```

#### **Explanation**:

The substring `"iii"` contains `3` vowels.

#### **Sliding Window Approach**:

- Use a `Set` of vowels for quick lookup.
- Initialize the count of vowels in the first window.
- Slide the window:
  - Update the vowel count by subtracting the exiting character and adding the new character.
  - Keep track of the maximum vowel count.

#### **Code**:

```javascript
function maxVowels(s, k) {
  const vowels = new Set(["a", "e", "i", "o", "u"]);
  let windowVowelCount = 0;
  let maxVowelsCount = 0;

  // First window
  for (let i = 0; i < k; i++) {
    if (vowels.has(s[i])) {
      windowVowelCount++;
    }
  }
  maxVowelsCount = windowVowelCount;

  // Slide the window
  for (let i = k; i < s.length; i++) {
    if (vowels.has(s[i - k])) {
      windowVowelCount--;
    }
    if (vowels.has(s[i])) {
      windowVowelCount++;
    }
    maxVowelsCount = Math.max(maxVowelsCount, windowVowelCount);
  }

  return maxVowelsCount;
}

// Test
const s = "abciiidef";
const k = 3;
console.log(maxVowels(s, k)); // Output: 3
```

---

### **Example 4: Variable-Size Sliding Window with Condition**

#### **Problem**: **Minimum Size Subarray Sum**

Given an array of positive integers `nums` and a positive integer `s`, find the minimal length of a contiguous subarray of which the sum is greater than or equal to `s`. If none exists, return `0`.

#### **Input**:

```javascript
const s = 7;
const nums = [2, 3, 1, 2, 4, 3];
```

#### **Output**:

```plaintext
2
```

#### **Explanation**:

The subarray `[4, 3]` has the minimal length under the problem constraint.

#### **Sliding Window Approach**:

- Initialize `left` pointer and `currentSum`.
- Move `right` pointer to expand the window.
- When `currentSum` ≥ `s`, try to shrink the window from the `left` to find the minimal length.

#### **Code**:

```javascript
function minSubArrayLen(s, nums) {
  let left = 0;
  let currentSum = 0;
  let minLength = Infinity;

  for (let right = 0; right < nums.length; right++) {
    currentSum += nums[right];

    while (currentSum >= s) {
      minLength = Math.min(minLength, right - left + 1);
      currentSum -= nums[left];
      left++;
    }
  }

  return minLength === Infinity ? 0 : minLength;
}

// Test
const s = 7;
const nums = [2, 3, 1, 2, 4, 3];
console.log(minSubArrayLen(s, nums)); // Output: 2
```

---

## **Key Concepts**

- **Initialization**: Set up pointers and any data structures needed (e.g., Sets, counters).
- **Window Expansion**: Move the `right` pointer to include more elements.
- **Window Contraction**: Move the `left` pointer to exclude elements and maintain conditions.
- **State Maintenance**: Keep track of necessary information (e.g., sums, counts) as the window moves.
- **Optimality Check**: Update the result based on the problem's goal (e.g., max, min).

---

## **Tips for Mastering the Sliding Window Technique**

1. **Identify the Problem Type**:

   - Is the problem asking about subarrays/substrings?
   - Are you dealing with contiguous elements?

2. **Determine Window Behavior**:

   - Will the window size be fixed or variable?
   - What conditions dictate the window's movement?

3. **Use Appropriate Data Structures**:

   - **Sets**: For uniqueness constraints.
   - **Maps/Objects**: For frequency counts.

4. **Avoid Redundant Calculations**:

   - Update results incrementally as the window slides.
   - Don't recompute the entire window's state from scratch.

5. **Understand the Termination Condition**:
   - Know when to stop expanding or contracting the window.

**Sliding Window Technique for Maximum/Minimum in a Range with Node.js Examples**

The sliding window technique is especially useful when you need to process all contiguous subarrays (or substrings) of a given size or conditions, particularly when you're interested in finding the maximum or minimum values within those ranges.

---

## **Problem**: **Sliding Window Maximum**

Given an array of integers and a window size `k`, find the maximum element in each subarray of size `k`.

### **Input**:

```javascript
const nums = [1, 3, -1, -3, 5, 3, 6, 7];
const k = 3;
```

### **Output**:

```plaintext
[3, 3, 5, 5, 6, 7]
```

### **Explanation**:

For each window of size `k`, we want to find the maximum value:

- Window `[1, 3, -1]` → Max: **3**
- Window `[3, -1, -3]` → Max: **3**
- Window `[-1, -3, 5]` → Max: **5**
- Window `[-3, 5, 3]` → Max: **5**
- Window `[5, 3, 6]` → Max: **6**
- Window `[3, 6, 7]` → Max: **7**

---

### **Naive Approach**

- **Method**: For each subarray of size `k`, scan all elements to find the maximum.
- **Time Complexity**: O(n * k)
- **Drawback**: Inefficient for large arrays.

---

### **Optimized Sliding Window Approach**

To optimize, we'll use a **Deque** (double-ended queue) to store indices of elements. The deque will store indices in such a way that the maximum element's index is always at the front.

- **Time Complexity**: O(n)
- **Space Complexity**: O(k)

#### **Algorithm Steps**:

1. **Initialize**:
   - A deque `dq` to store indices.
   - An array `result` to store the maximums.

2. **Process the First `k` Elements**:
   - For each element (index `i` from `0` to `k - 1`):
     - Remove indices from the back of `dq` if `nums[i]` is greater than `nums[dq[back]]`.
     - Add `i` to the back of `dq`.

3. **Process the Rest of the Elements**:
   - For each element (index `i` from `k` to `nums.length - 1`):
     - The element at the front of `dq` is the maximum of the previous window.
     - Remove indices from the front if they are out of the current window (`i - k`).
     - Remove indices from the back if `nums[i]` is greater than `nums[dq[back]]`.
     - Add `i` to the back of `dq`.
     - Add `nums[dq[front]]` to `result`.

4. **Finalize**:
   - After the loop, add the maximum of the last window to `result`.

---

#### **Visualization**:

Let's walk through the first few steps with our input:

- **Initialization**:
  - `dq = []`
  - `result = []`

- **Processing First `k` Elements**:
  - `i = 0`, `nums[0] = 1`:
    - `dq` is empty. Add `0` to `dq`.
    - `dq = [0]`
  - `i = 1`, `nums[1] = 3`:
    - `nums[1] > nums[dq[back]]` ⇒ `3 > 1`. Remove `0` from `dq`.
    - Add `1` to `dq`.
    - `dq = [1]`
  - `i = 2`, `nums[2] = -1`:
    - `nums[2]` is not greater than `nums[dq[back]]`. Add `2` to `dq`.
    - `dq = [1, 2]`

- **Processing Rest of the Elements**:
  - **First Window Maximum**:
    - `nums[dq[0]] = nums[1] = 3`. Add `3` to `result`.
    - `result = [3]`
  - `i = 3`, `nums[3] = -3`:
    - Remove indices out of window (`dq[0] < i - k + 1`).
    - No indices to remove.
    - `nums[3]` is not greater than `nums[dq[back]]`. Add `3` to `dq`.
    - `dq = [1, 2, 3]`
    - Add `nums[dq[0]] = 3` to `result`.
    - `result = [3, 3]`
  - Continue this process for the rest of the elements.

---

#### **Code Implementation**:

```javascript
function maxSlidingWindow(nums, k) {
  const n = nums.length;
  if (n === 0 || k === 0) return [];
  if (k === 1) return nums;

  const result = [];
  const dq = []; // Stores indices

  for (let i = 0; i < n; i++) {
    // Remove indices out of the current window
    if (dq.length && dq[0] < i - k + 1) {
      dq.shift();
    }

    // Remove indices whose corresponding values are less than nums[i]
    while (dq.length && nums[dq[dq.length - 1]] < nums[i]) {
      dq.pop();
    }

    // Add current index
    dq.push(i);

    // When we've hit size k, add to result
    if (i >= k - 1) {
      result.push(nums[dq[0]]);
    }
  }

  return result;
}

// Test
const nums = [1, 3, -1, -3, 5, 3, 6, 7];
const k = 3;
console.log(maxSlidingWindow(nums, k)); // Output: [3, 3, 5, 5, 6, 7]
```

---

## **Problem**: **Sliding Window Minimum**

Similarly, you can find the minimum in each window by adjusting the comparison in the deque.

### **Input**:

```javascript
const nums = [1, 3, -1, -3, 5, 3, 6, 7];
const k = 3;
```

### **Output**:

```plaintext
[ -1, -3, -3, -3, 3, 3 ]
```

### **Explanation**:

- Window `[1, 3, -1]` → Min: **-1**
- Window `[3, -1, -3]` → Min: **-3**
- Window `[-1, -3, 5]` → Min: **-3**
- Window `[-3, 5, 3]` → Min: **-3**
- Window `[5, 3, 6]` → Min: **3**
- Window `[3, 6, 7]` → Min: **3**

---

### **Code Implementation**:

```javascript
function minSlidingWindow(nums, k) {
  const n = nums.length;
  if (n === 0 || k === 0) return [];
  if (k === 1) return nums;

  const result = [];
  const dq = []; // Stores indices

  for (let i = 0; i < n; i++) {
    // Remove indices out of the current window
    if (dq.length && dq[0] < i - k + 1) {
      dq.shift();
    }

    // Remove indices whose corresponding values are greater than nums[i]
    while (dq.length && nums[dq[dq.length - 1]] > nums[i]) {
      dq.pop();
    }

    // Add current index
    dq.push(i);

    // When we've hit size k, add to result
    if (i >= k - 1) {
      result.push(nums[dq[0]]);
    }
  }

  return result;
}

// Test
const nums = [1, 3, -1, -3, 5, 3, 6, 7];
const k = 3;
console.log(minSlidingWindow(nums, k)); // Output: [ -1, -3, -3, -3, 3, 3 ]
```

---

## **Understanding the Deque Approach**

- **Deque (Double-Ended Queue)**: Allows insertion and deletion at both ends in O(1) time.
- **Purpose in Sliding Window**:
  - Stores indices of potential maximum/minimum candidates.
  - Maintains elements in decreasing (for max) or increasing (for min) order.
  - The front always has the index of the maximum/minimum element for the current window.

---

## **Key Points**

- **Why Indices Instead of Values?**
  - We need to know if an element is within the current window.
  - Using indices allows us to check if `dq[0] < i - k + 1`.

- **Why Remove Elements from the Back?**
  - If the current element is greater (for max) or smaller (for min), previous elements cannot be maximum/minimum for future windows.

---

## **Time and Space Complexity Analysis**

- **Time Complexity**: O(n)
  - Each element is processed at most twice (once when added, once when removed from the deque).
- **Space Complexity**: O(k)
  - The deque can hold at most `k` elements.

---

## **Practical Applications**

- **Stock Market Analysis**: Finding the maximum/minimum stock price in a given window.
- **Sensor Data Processing**: Real-time analysis of data streams for peaks or drops.
- **Computer Vision**: Applying filters over images (e.g., max-pooling).

---

## **Additional Example: Maximum Sum in Any Subarray of Size Less Than or Equal to K**

### **Problem**:

Given an array of integers and an integer `k`, find the maximum sum of any subarray with size less than or equal to `k`.

### **Approach**:

This problem requires checking all subarrays of sizes from `1` to `k`, which can be done efficiently using the sliding window technique.

### **Code Implementation**:

```javascript
function maxSumSubarray(nums, k) {
  let maxSum = -Infinity;

  for (let windowSize = 1; windowSize <= k; windowSize++) {
    let windowSum = 0;

    // Calculate sum of first window
    for (let i = 0; i < windowSize; i++) {
      windowSum += nums[i];
    }
    maxSum = Math.max(maxSum, windowSum);

    // Slide the window
    for (let i = windowSize; i < nums.length; i++) {
      windowSum += nums[i] - nums[i - windowSize];
      maxSum = Math.max(maxSum, windowSum);
    }
  }

  return maxSum;
}

// Test
const nums = [2, 3, -2, 5, -1];
const k = 3;
console.log(maxSumSubarray(nums, k)); // Output: 8
```

### **Explanation**:

- We consider all window sizes from `1` to `k`.
- For each window size, we use the sliding window to find the maximum sum.
- The overall maximum sum is updated accordingly.

---

## **Conclusion**

The sliding window technique is a versatile tool in algorithm design, especially for problems involving contiguous sequences. By mastering this technique, you can optimize solutions for maximum/minimum range queries and many other related problems.

