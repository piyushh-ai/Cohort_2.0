// 🧩 10 JavaScript Practice Questions — Beginner → Advance 🔱
// 1️⃣ Variables & Strings (warm-up)
// Ek variable firstName aur lastName banao. Unhe ek hi template string me jod kar print karo:
// Hello, my name is <firstName> <lastName>
// let name = "piyush siroliya"
// console.log(`my name is ${name}`);

// 2️⃣ Conditions (brain stretch)
// User se prompt() se ek number input lo.
// Agar number positive ho → print "Positive"
// Agar negative ho → print "Negative"
// Agar zero ho → print "Zero"
// let num = +prompt("enter your number");
// if (num > 0) {
//   console.log("positive");
// } else {
//   console.log("negative");
// }

// 3️⃣ Loops (start sweating)
// for loop ka use karke 1 se 50 tak ke saare odd numbers print karo.
// for (let i = 0; i < 51; i++) {
//   if (i % 2 !== 0) {
//     console.log(i);
//   }
// }

// 4️⃣ Functions (speed boost)
// Ek function sumArray(arr) likho jo array ke saare numbers ka total return kare.
// Array example: [10, 20, 5, 15]
// function sumArray(...arr) {
//   let sum = arr.reduce((total, acc) => total + acc, 0);
//   console.log(sum);
// }
// sumArray(2, 2);

// 5️⃣ Higher Order Function (logic wali khel)
// Ek array diya hai:
// [3, 7, 11, 18, 22, 29]
// filter() ka use karke sirf even numbers ka naya array banao.
// let arr = [3, 7, 11, 18, 22, 29];
// arr.filter((arr) => {
//   if (arr % 2 === 0) {
//     console.log(arr);
//   }
// });

// 6️⃣ Objects (mid-level boss)
// student object banao jisme:
// name, age, marks (array), city
// ek method getInfo() add karo jo return kare:
// <name> from <city> scored <marks ka average>
// let student = {
//   name: "piyush",
//   age: "20",
//   marks: [20, 50, 10, 50],
//   city: "bhopal",
//   getInfo() {
//     let sum = this.marks.reduce((total, acc) => total + acc, 0);
//     let avrg = Math.floor(sum / this.marks.length);
//     return console.log(`${this.name} from ${this.city} scored ${avrg}`);
//   },
// };
// student.getInfo();

// 7️⃣ Closures (thoda magic)
// Ek function counter() banao jo har call par value +1 return kare.
// Example:
// let score = counter();
// score(); // 1
// score(); // 2
// score(); // 3
// function counter() {
//   let count = 0;
//   return function () {
//     count = count + 1;
//     return count;
//   };
// }
// let score = counter();
// console.log(score());
// console.log(score());
// console.log(score());
// console.log(score());
// console.log(score());

// 8️⃣ DOM Manipulation (UI control)
// HTML me ek button ho:
// <button id="magicBtn">Click Me</button>
// <p id="showText"></p>
// JS me aisa logic likho:
// Button click → <p> me “Button Clicked 🎉” aajaye
// Har click ke sath background color random change ho
// document.querySelector("button").addEventListener("click", () => {
//   document.querySelector("#showText").innerHTML = "🎉";
// });

// 9️⃣ Event Handling + Forms
// Ek form lo jisme input ho:
// name, email
// Form submit hone par:
// Page refresh nahi hona chahiye
// Agar name empty hai → alert "Name is required"
// Agar email me @ nahi hai → alert "Invalid email"
// Sab sahi ho to — name & email Console me print hone chahiye

// 🔟 OOP + Inheritance (final boss mode 💀)
// Ek class Car banao jisme:
// brand, model, year
// start() --> returns "<brand> <model> is starting..."
// Isse inherit karte hue ElectricCar class banao jisme:
// batteryCapacity
// charge() --> returns "Charging <batteryCapacity> kWh..."
// Object bana ke dono methods call karo.
// Parent Class
// class Car {
//   constructor(brand, model, year) {
//     this.brand = brand;
//     this.model = model;
//     this.year = year;
//   }

//   start() {
//     return `${this.brand} ${this.model} is starting...`;
//   }
// }

// class ChildCar extends Car {
//   constructor(brand, model, year, batteryCapacity) {
//     super(brand, model, year), (this.batteryCapacity = batteryCapacity);
//   }
//   charge() {
//     console.log(`Charging ${this.batteryCapacity} kWh...`);
//   }
// }

// const tesla = new ChildCar("Tesla", "S", 2025, 100);

// console.log(tesla.start());
// console.log(tesla.charge());
