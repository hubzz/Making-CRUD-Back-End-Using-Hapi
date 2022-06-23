// // if (!(20 > 30)) {
// //   console.log("21");
// // }

// // console.log(!0);

const test = [
  {
    bookId: "3yGZzDvc2h",
    name: "Mahesa Book's",
    year: 2021,
    author: "Mahesa",
    summary: "Wass",
    publisher: "Ghanes Production",
    pageCount: 300,
    readPage: 222,
    finished: false,
    reading: true,
    insertedAt: "2022-06-22T11:54:18.030Z",
    updatedAt: "2022-06-22T11:54:18.030Z",
  },
  {
    bookId: "3yGZzDvc2h",
    name: "Mahesa",
    year: 2021,
    author: "Mahesa",
    summary: "Wass",
    publisher: "Ghanes Production",
    pageCount: 3000,
    readPage: 222,
    finished: false,
    reading: true,
    insertedAt: "2022-06-22T11:54:18.030Z",
    updatedAt: "2022-06-22T11:54:18.030Z",
  },
];
// const user = { bookId: "3yGZzDvc2h", name: "Mahesa Book's" };
// users = test.filter((item) => {
//   for (var key in user) {
//     if (item[key] === undefined || item[key] != user[key]) return false;
//   }
//   return true;
// });
// console.log(users);
// const arr = ["ONE", "TWO", "THREE"];
// try {
//   const lower = arr.map((element) => {
//     return element.toLowerCase();
//   });
//   console.log(lower);
// } catch (error) {
//   ("");
// }
// console.log(
//   test.forEach((name) => (name.bookId = name.bookId.toLocaleLowerCase()))
// );
const isSimmilarity = (a, b) => {
  return a.localeCompare(b, undefined, { sensitivity: "base" }) === 0;
};

const query = { name: "MAHESA" };

users = test.filter((item) => {
  for (var key in query) {
    if (
      item[key] === undefined ||
      !isSimmilarity(item[key], query[key] || item[key] !== query[key])
    ) {
      return false;
    }
    // } else if (key === "name") {
    //   if (isSimmilarity(item[key], query[key]));
    //   console.log("a");
    // }
  }
  return true;
});

console.log(typeof 3 === "number");
