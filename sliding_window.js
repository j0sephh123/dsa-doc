const s = "abcabcbb";
let longest = 0;

for (let i = 0; i < s.length; i++) {
  const set = new Set();
  const el = s[i];

  if (i === 0) {
    set.add(el);
    if (set.size > longest) {
      longest = set.size;
    }
    continue;
  }

  // has
  if (set.has(el)) {
    set.delete(el);
  } else {
    set.add(el);
    if (set.size > longest) {
      longest = set.size;
    }
  }
}

console.log(longest);
