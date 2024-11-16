```js
function factorial(n) {
  if (n === 0) {
    // Base case
    return 1;
  } else {
    // Recursive case
    return n * factorial(n - 1);
  }
}

console.log(factorial(3)); // Output: 6
```
