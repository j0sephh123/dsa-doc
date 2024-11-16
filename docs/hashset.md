https://leetcode.com/problems/design-hashset?envType=problem-list-v2&envId=array&difficulty=EASY

# Problem: Design a HashSet without using any built-in hash table libraries.

My own implementation, works in leetcode, but probably not the best solution.

```js
var MyHashSet = function () {
  this.set = [];
  this.map = {};
};

/**
 * @param {number} key
 * @return {void}
 */
MyHashSet.prototype.add = function (key) {
  if (!(key in this.map)) {
    this.set.push(key);
    this.map[key] = this.set.length - 1;
  }
};

/**
 * @param {number} key
 * @return {void}
 */
MyHashSet.prototype.remove = function (key) {
  const index = this.map[key];
  this.set.splice(index, 1);
  delete this.map[key];
};

/**
 * @param {number} key
 * @return {boolean}
 */
MyHashSet.prototype.contains = function (key) {
  return key in this.map;
};

var myHashSet = new MyHashSet();

myHashSet.add(1); // set = [1]
myHashSet.add(2); // set = [1, 2]

console.log(myHashSet.contains(1)); // return True
console.log(myHashSet.contains(3)); // return False, (not found)
myHashSet.add(2); // set = [1, 2]
console.log(myHashSet.contains(2)); // return True

console.log(myHashSet);

myHashSet.remove(2); // set = [1]
console.log(myHashSet.contains(2)); // return False, (already removed)
```
