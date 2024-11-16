# Behind the Scenes

## What is the Call Stack?

- **Call Stack**: A data structure used by JavaScript (and many other programming languages) to keep track of function calls.
- **Stack Frames**: Each function call creates a new frame on the stack containing information like function arguments and where to return after the function completes.
- **LIFO Principle**: The call stack operates on a Last-In, First-Out basis. The last function added is the first one to complete.

---

## Simple Recursive Function Example

Let's revisit the `greet` function:

```javascript
function greet(times) {
  if (times <= 0) {
    // Base case: Stop the recursion
    return;
  }
  console.log("Hello!");
  greet(times - 1); // Recursive call with a smaller number
}

greet(3);
```

---

## Step-by-Step Execution with the Call Stack

### Overview

When `greet(3)` is called, the function will:

1. Check if `times` is less than or equal to 0.
2. If not, print `'Hello!'`.
3. Call itself with `times - 1`.

Let's trace each step, focusing on how functions are added to and removed from the call stack.

---

### 1. Initial Call: `greet(3)`

- **Call Stack Before**: `[]` (empty)
- **Action**: `greet(3)` is called.
- **Call Stack After**: `[greet(3)]`
- **Execution Inside `greet(3)`**:
  - `times = 3`
  - `3 <= 0` is **false**.
  - `console.log('Hello!')` outputs **"Hello!"**.
  - **Recursive Call**: `greet(2)` is called.

### 2. First Recursive Call: `greet(2)`

- **Call Stack Before**: `[greet(3)]`
- **Action**: `greet(2)` is called.
- **Call Stack After**: `[greet(3), greet(2)]`
- **Execution Inside `greet(2)`**:
  - `times = 2`
  - `2 <= 0` is **false**.
  - `console.log('Hello!')` outputs **"Hello!"**.
  - **Recursive Call**: `greet(1)` is called.

### 3. Second Recursive Call: `greet(1)`

- **Call Stack Before**: `[greet(3), greet(2)]`
- **Action**: `greet(1)` is called.
- **Call Stack After**: `[greet(3), greet(2), greet(1)]`
- **Execution Inside `greet(1)`**:
  - `times = 1`
  - `1 <= 0` is **false**.
  - `console.log('Hello!')` outputs **"Hello!"**.
  - **Recursive Call**: `greet(0)` is called.

### 4. Base Case Call: `greet(0)`

- **Call Stack Before**: `[greet(3), greet(2), greet(1)]`
- **Action**: `greet(0)` is called.
- **Call Stack After**: `[greet(3), greet(2), greet(1), greet(0)]`
- **Execution Inside `greet(0)`**:
  - `times = 0`
  - `0 <= 0` is **true**.
  - **Base Case Reached**: The function returns without making further recursive calls.
- **Call Stack After Return**: `[greet(3), greet(2), greet(1)]` (since `greet(0)` has returned)

---

## Unwinding the Call Stack (Returning)

After reaching the base case, the functions start to return one by one, unwinding the call stack.

### 5. Returning from `greet(1)`

- **Call Stack Before**: `[greet(3), greet(2), greet(1)]`
- **Action**: `greet(1)` resumes after the recursive call to `greet(0)`.
- **Execution**:
  - No more statements to execute in `greet(1)`.
  - The function returns.
- **Call Stack After Return**: `[greet(3), greet(2)]`

### 6. Returning from `greet(2)`

- **Call Stack Before**: `[greet(3), greet(2)]`
- **Action**: `greet(2)` resumes after the recursive call to `greet(1)`.
- **Execution**:
  - No more statements to execute in `greet(2)`.
  - The function returns.
- **Call Stack After Return**: `[greet(3)]`

### 7. Returning from `greet(3)`

- **Call Stack Before**: `[greet(3)]`
- **Action**: `greet(3)` resumes after the recursive call to `greet(2)`.
- **Execution**:
  - No more statements to execute in `greet(3)`.
  - The function returns.
- **Call Stack After Return**: `[]` (empty)

---

## Summary of Call Stack Changes

### Call Stack Growth (Function Calls)

1. `[greet(3)]`
2. `[greet(3), greet(2)]`
3. `[greet(3), greet(2), greet(1)]`
4. `[greet(3), greet(2), greet(1), greet(0)]`

### Call Stack Shrinkage (Function Returns)

1. `[greet(3), greet(2), greet(1)]` (after `greet(0)` returns)
2. `[greet(3), greet(2)]` (after `greet(1)` returns)
3. `[greet(3)]` (after `greet(2)` returns)
4. `[]` (after `greet(3)` returns)

---

## Execution Order

- **Order of Function Calls (Adding to Stack)**:

  1. `greet(3)` calls `greet(2)`
  2. `greet(2)` calls `greet(1)`
  3. `greet(1)` calls `greet(0)`

- **Order of Function Returns (Removing from Stack)**:

  1. `greet(0)` returns to `greet(1)`
  2. `greet(1)` returns to `greet(2)`
  3. `greet(2)` returns to `greet(3)`
  4. `greet(3)` returns to the main program

- **Print Statements Execution**:
  - The `console.log('Hello!')` statements are executed **during the forward phase**, before each recursive call.

---

## Visual Representation

While I can't provide visual diagrams here, imagine the call stack as a stack of plates:

- **Adding Plates (Function Calls)**:

  - You keep stacking plates on top for each function call.
  - The top plate is the currently executing function.

- **Removing Plates (Function Returns)**:
  - You remove the top plate when a function returns.
  - You proceed to the next plate underneath.

---

## Detailed Execution Flow

Let's combine the call stack changes with the execution inside each function:

1. **`greet(3)`**:

   - **Stack**: `[greet(3)]`
   - Prints **"Hello!"**
   - Calls **`greet(2)`**

2. **`greet(2)`**:

   - **Stack**: `[greet(3), greet(2)]`
   - Prints **"Hello!"**
   - Calls **`greet(1)`**

3. **`greet(1)`**:

   - **Stack**: `[greet(3), greet(2), greet(1)]`
   - Prints **"Hello!"**
   - Calls **`greet(0)`**

4. **`greet(0)`**:

   - **Stack**: `[greet(3), greet(2), greet(1), greet(0)]`
   - Base case reached.
   - Returns immediately.

5. **Returning from `greet(1)`**:

   - **Stack**: `[greet(3), greet(2), greet(1)]`
   - No more code to execute.
   - Returns.

6. **Returning from `greet(2)`**:

   - **Stack**: `[greet(3), greet(2)]`
   - No more code to execute.
   - Returns.

7. **Returning from `greet(3)`**:
   - **Stack**: `[greet(3)]`
   - No more code to execute.
   - Returns.

---

## Key Concepts

### Forward Phase (Function Calls)

- **Execution Before Recursive Call**:

  - The code before the recursive call (`console.log('Hello!')`) is executed as the stack builds up.

- **Adding to Call Stack**:
  - Each recursive call adds a new frame to the call stack.

### Backward Phase (Function Returns)

- **Execution After Recursive Call**:

  - In this example, there is no code after the recursive call, but if there were, it would execute during the unwinding phase.

- **Removing from Call Stack**:
  - Functions return and are removed from the call stack in reverse order of their calls.

### Last-In, First-Out (LIFO)

- The last function added to the stack (`greet(0)`) is the first one to complete and return.

---

## Another Example: Counting Down

Let's use another simple recursive function to illustrate the concept further.

```javascript
function countdown(n) {
  if (n <= 0) {
    console.log("Done!");
    return;
  } else {
    console.log(n);
    countdown(n - 1);
  }
}

countdown(3);
```

**Expected Output**:

```
3
2
1
Done!
```

### Execution Steps

1. **`countdown(3)`**

   - **Stack**: `[countdown(3)]`
   - Prints **"3"**
   - Calls **`countdown(2)`**

2. **`countdown(2)`**

   - **Stack**: `[countdown(3), countdown(2)]`
   - Prints **"2"**
   - Calls **`countdown(1)`**

3. **`countdown(1)`**

   - **Stack**: `[countdown(3), countdown(2), countdown(1)]`
   - Prints **"1"**
   - Calls **`countdown(0)`**

4. **`countdown(0)`**

   - **Stack**: `[countdown(3), countdown(2), countdown(1), countdown(0)]`
   - `n <= 0` is **true**.
   - Prints **"Done!"**
   - Returns.

5. **Returning from `countdown(1)`**

   - **Stack**: `[countdown(3), countdown(2), countdown(1)]`
   - Returns.

6. **Returning from `countdown(2)`**

   - **Stack**: `[countdown(3), countdown(2)]`
   - Returns.

7. **Returning from `countdown(3)`**
   - **Stack**: `[countdown(3)]`
   - Returns.

---

## Observations

- **Order of Prints**:

  - Numbers are printed during the forward phase (function calls).
  - `"Done!"` is printed when the base case is reached.

- **Call Stack Growth and Shrinkage**:
  - The call stack grows with each recursive call.
  - It shrinks as functions return after hitting the base case.

---

## Key Takeaways

1. **Function Call Order**:

   - Functions are added to the call stack in the order they are called.
   - The most recent function call is at the top of the stack.

2. **Function Execution Order**:

   - The code before the recursive call executes **during the forward phase**.
   - The code after the recursive call (if any) executes **during the backward phase** as the stack unwinds.

3. **Base Case Importance**:

   - The base case prevents infinite recursion.
   - It allows the functions to start returning and the call stack to unwind.

4. **LIFO Behavior of the Call Stack**:
   - Functions return in the reverse order of their calls.

---

## Understanding Through Tracing

To fully grasp the call stack and execution order:

- **Trace Small Inputs**:

  - Manually write down each function call and return for small input values.

- **Write Down the Stack**:

  - Keep track of the call stack at each step to visualize how it grows and shrinks.

- **Note Execution Points**:
  - Mark when code before and after the recursive call is executed.

---

## Recursion Execution Pattern

- **Forward Phase (Going Down)**:

  - Function calls happen.
  - Stack grows.
  - Code before the recursive call executes.

- **Backward Phase (Coming Up)**:
  - Base case reached; functions start returning.
  - Stack shrinks.
  - Code after the recursive call (if any) executes.

---

## Example with Code After Recursive Call

Consider a function where there's code after the recursive call:

```javascript
function printNumbers(n) {
  if (n <= 0) {
    return;
  } else {
    printNumbers(n - 1);
    console.log(n);
  }
}

printNumbers(3);
```

**Expected Output**:

```
1
2
3
```

### Execution Steps

1. **`printNumbers(3)`**

   - **Stack**: `[printNumbers(3)]`
   - Calls **`printNumbers(2)`**

2. **`printNumbers(2)`**

   - **Stack**: `[printNumbers(3), printNumbers(2)]`
   - Calls **`printNumbers(1)`**

3. **`printNumbers(1)`**

   - **Stack**: `[printNumbers(3), printNumbers(2), printNumbers(1)]`
   - Calls **`printNumbers(0)`**

4. **`printNumbers(0)`**

   - **Stack**: `[printNumbers(3), printNumbers(2), printNumbers(1), printNumbers(0)]`
   - Base case reached.
   - Returns.

5. **Returning from `printNumbers(1)`**

   - **Stack**: `[printNumbers(3), printNumbers(2), printNumbers(1)]`
   - **After Recursive Call**: `console.log(1)` outputs **"1"**.
   - Returns.

6. **Returning from `printNumbers(2)`**

   - **Stack**: `[printNumbers(3), printNumbers(2)]`
   - **After Recursive Call**: `console.log(2)` outputs **"2"**.
   - Returns.

7. **Returning from `printNumbers(3)`**
   - **Stack**: `[printNumbers(3)]`
   - **After Recursive Call**: `console.log(3)` outputs **"3"**.
   - Returns.

---

## Understanding Execution Order with Code After Recursive Call

- **Code After Recursive Call**:

  - Executed during the backward phase, as functions return.

- **Order of Outputs**:

  - Numbers are printed in ascending order (`1`, `2`, `3`), even though the function counts down during the calls.

- **Call Stack Behavior**:
  - Stack grows during recursive calls.
  - Stack shrinks as functions return and execute code after the recursive call.

---

## Conclusion

- **Functions are added to the call stack when called**.

  - The function's execution context is pushed onto the stack.

- **Functions execute in the order of their calls**.

  - Code before the recursive call executes immediately.
  - The recursive call pauses the current function's execution until it returns.

- **Functions return in reverse order**.

  - The last function called is the first to return.

- **Call Stack Unwinds as Functions Return**.
  - Each function resumes execution after the recursive call.
  - Code after the recursive call executes during the unwinding phase.

---

## Final Thoughts

Understanding the call stack and execution order in recursion is crucial for mastering recursive algorithms. By tracing function calls, visualizing the call stack, and noting when each part of the code executes, you can gain a deeper insight into how recursion works under the hood.
