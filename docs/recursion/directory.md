```js
const directory = {
  name: "root",
  contents: [
    "file1.txt",
    "file2.txt",
    {
      name: "folder1",
      contents: ["file3.txt", "file4.txt"],
    },
    {
      name: "folder2",
      contents: [
        {
          name: "folder3",
          contents: ["file5.txt"],
        },
      ],
    },
  ],
};

function listFiles(node) {
  if (typeof node === "string") {
    console.log(node);
  } else if (typeof node === "object") {
    node.contents.forEach((item) => {
      listFiles(item); // Recursive call for each item
    });
  }
}

listFiles(directory);
```
