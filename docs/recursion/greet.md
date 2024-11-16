```js
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
