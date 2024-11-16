```js
const numbers = [1, [2, [3, 4], 5], 6];

function sumArray(arr) {
  let total = 0;
  arr.forEach((element) => {
    if (Array.isArray(element)) {
      total += sumArray(element); // Recursive call for nested array
    } else {
      total += element;
    }
  });
  return total;
}

console.log(sumArray(numbers)); // Output: 21
```
