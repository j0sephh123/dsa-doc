# Permutations

### **Recursive Approach to Generate Permutations**

The recursive backtracking approach is simple and intuitive:

1. Swap elements at different positions.
2. Recursively generate permutations for the remaining elements.
3. Swap back to restore the original order (backtracking).

---

### **Code Implementation**

Here's how you can implement it in JavaScript:

```javascript
function generatePermutations(arr) {
  const results = [];

  function backtrack(start) {
    if (start === arr.length) {
      // Add a copy of the current permutation to results
      results.push([...arr]);
      return;
    }

    for (let i = start; i < arr.length; i++) {
      // Swap current element with the starting element
      [arr[start], arr[i]] = [arr[i], arr[start]];

      // Recurse for the rest of the elements
      backtrack(start + 1);

      // Swap back to backtrack
      [arr[start], arr[i]] = [arr[i], arr[start]];
    }
  }

  backtrack(0);
  return results;
}
```

---

### **Tests**

Here are the test cases for the function using the `node:assert` module:

```javascript
import assert from "node:assert";

function generatePermutations(arr) {
  const results = [];

  function backtrack(start) {
    if (start === arr.length) {
      results.push([...arr]);
      return;
    }

    for (let i = start; i < arr.length; i++) {
      [arr[start], arr[i]] = [arr[i], arr[start]];
      backtrack(start + 1);
      [arr[start], arr[i]] = [arr[i], arr[start]];
    }
  }

  backtrack(0);
  return results;
}

// Test cases
assert.deepStrictEqual(
  generatePermutations([1, 2, 3]).sort(),
  [
    [1, 2, 3],
    [1, 3, 2],
    [2, 1, 3],
    [2, 3, 1],
    [3, 1, 2],
    [3, 2, 1],
  ].sort(),
  "Test Case 1 Failed"
);

assert.deepStrictEqual(
  generatePermutations([1]).sort(),
  [[1]].sort(),
  "Test Case 2 Failed"
);

assert.deepStrictEqual(
  generatePermutations([]).sort(),
  [].sort(),
  "Test Case 3 Failed"
);

console.log("All test cases pass");
```

---

### **Explanation**

1. **Base Case**:

   - When `start === arr.length`, it means we’ve formed a valid permutation, so we push it to the results.

2. **Swapping**:

   - Swapping ensures that every element has a chance to be at every position.

3. **Backtracking**:
   - After exploring one path, we swap back to restore the original order and explore the next path.

---

This implementation works for both numbers and strings (convert the string to an array of characters). Run the tests, and you'll see the results. Let me know if you'd like further clarifications!
