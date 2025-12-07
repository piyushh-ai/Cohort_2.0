// SECTION 1: OOPS Thinking with Objects
// 	1.	Create an object called laptop that contains brand, price, and a start method that prints “Laptop started”.
// let laptop = {
//   brand: "lenovo",
//   price: 25000,
//   start() {
//     console.log(`${this.brand} laptop started — price ₹${this.price}`);
//   },
// };
// laptop.start();

// 	2.	Add one more method to the same object that increases the price by 10 percent.
// let laptop = {
//   brand: "lenovo",
//   price: 25000,
//   start() {
//     console.log(`${this.brand} laptop started — price ₹${this.price}`);
//   },
//   increased(){
//     this.price = this.price * 1.10;
//     return this.price;
//   }
// };
// console.log(laptop.increased());

// 	3.	Now imagine you need 10 laptops with same structure but different data.
// Write down (in words or code) what problems you will face if you keep using plain objects.
// answer =  laptop ka structure to same he par brand or price to alag he na to bar bar object banane me mehenat or code boht lagega to hum class ka use karenge har object banane me
// class Laptop{
//     constructor(brand, price){
//         this.brand = brand,
//         this.price = price
//     }
// }
// let laptop1 = new Laptop("lenovo", 25000)
// let laptop2 = new Laptop("HP", 40000)
// let laptop3 = new Laptop("Dell", 50000)
// let laptop4 = new Laptop("Asus", 250000)

// ⸻

// SECTION 2: Classes and Objects (Reinforcement)
// 	4.	Create a class named Employee that stores:
// name
// salary
// Add a method showDetails that prints name and salary.
// class Employee{
//     constructor(name, salary){
//         this.name = name,
//         this.salary = salary
//         this.showDetails = function(){
//         return `Name: ${this.name}, Salary: ${this.salary}`
//     }
//     }

// }
// let employee1 = new Employee("piyush", 25000)
// console.log(employee1.showDetails());

// 	5.	Create three employee objects from the same class and verify that modifying one employee does not affect the others.
// class Employee {
//   constructor(name) {
//     this.name = name;
//   }
// }
// let employee1 = new Employee("Piyush");
// let employee2 = new Employee("Dishant");
// employee1.name = "Rajput";
// console.log(employee1.name);

// 	6.	Explain in your own words:
// Why is class considered a better option than writing similar objects again and again?
// objects me code boht sara hota he or bar bar name change karna hota he class me ek bar class banao or ek line me object banate jao new properties ke sath

// ⸻

// SECTION 3: Constructor and Initialization
// 	7.	Create a class named BankAccount.
// Its constructor should accept accountHolderName and balance.
// class BankAccount{
//     constructor(name, balance){
//         this.name = name,
//         this.balance = balance
//     }
// }
// let account1 = new BankAccount("piyush", 500000000)

// 	8.	Inside the constructor, store both values using this.
// class BankAccount{
//     constructor(name, balance){
//         this.name = name,
//         this.balance = balance
//     }
// }
// let account1 = new BankAccount("piyush", 500000000)

// 	9.	Add a method deposit(amount) that increases the balance.
// class BankAccount{
//     constructor(name, balance){
//         this.name = name,
//         this.balance = balance
//     }
//     deposit(amount){
//         this.balance += amount
//         console.log(this.balance);
//     }
// }
// let account1 = new BankAccount("piyush", 500000000)
// account1.deposit(500)

// 	10.	Create two bank accounts and deposit money into only one.
// Observe and explain why the second account is not affected.
// class BankAccount{
//     constructor(name, balance){
//         this.name = name,
//         this.balance = balance
//     }
//     deposit(amount){
//         this.balance += amount
//         console.log(this.balance);
//     }
// }
// let account1 = new BankAccount("piyush", 500000000)
// account1.deposit(500)
// let account2 = new BankAccount("dishant", 5)
// dusra account isiliye affect nahi hua kyunki uska aapan ne new object banaya he or new variable me save kiya he

// ⸻

// SECTION 4: Understanding this (Very Important)
// 	11.	Create an object named profile with a property username and a method printName that logs this.username.
// let profile = {
//     username: "piyush",
//     printName(){
//         console.log(this.username);

//     }
// }
// profile.printName()

// 	12.	Call the method normally and observe the output.
// let profile = {
//     username: "piyush",
//     printName(){
//         console.log(this.username);

//     }
// }
// profile.printName() // piyush

// 	13.	Store the method in a separate variable and call it.
// Observe what happens to this and explain why.
// let profile = {
//   username: "piyush",
//   printName() {
//     console.log(this.username);
//   },
// };
// let x = profile.printName;
// x(); // undefined  → kyunki this object se juda nahi raha

// 	14.	Modify the code so that this works correctly again.
// let profile = {
//     username: "piyush",
//     printName(){
//         console.log(this.username)
//     }
// }

// let x = profile.printName.bind(profile)
// x()

// ⸻

// SECTION 5: Constructor Function and Prototype
// 	15.	Create a constructor function called Vehicle that accepts type and wheels.
// class Vehicle{
//     constructor(type, wheels){
//         this.type = type,
//         this.wheels = wheels
//     }
// }
// let Vehicle1 = new Vehicle("kia", "ceat")

// 	16.	Add a method describe inside the constructor and observe memory behavior when multiple objects are created.
// class Vehicle {
//   constructor(type, wheels) {
//     (this.type = type), (this.wheels = wheels);
//     this.describe = function () {
//       console.log(`Vehicle type: ${this.type}, Wheels: ${this.wheels}`);
//     };
//   }
// }
// let Vehicle1 = new Vehicle("kia", 2);
// let Vehicle2 = new Vehicle("Hyundai", 4);
// Vehicle1.describe();
// Vehicle2.describe();

// 	17.	Move the same method to Vehicle.prototype and repeat the test.
// class Vehicle {
//   constructor(type, wheels) {
//     (this.type = type), (this.wheels = wheels);
//   }
// }
// Vehicle.prototype.describe = function () {
//   console.log(`Vehicle type: ${this.type}, Wheels: ${this.wheels}`);
// };
// let Vehicle1 = new Vehicle("kia", 2);
// let Vehicle2 = new Vehicle("Hyundai", 4);
// Vehicle1.describe();
// Vehicle2.describe();

// 	18.	Explain why the prototype approach is preferred.
// constructor ke andar method rakhoge →
// har object apni alag copy banata hai
// prototype me method rakhoge →
// method sirf ek baar banta hai,
// aur jitne bhi objects honge sab usi ek ko share karte hain
// jaise gaon me ek hi kua ho aur pura gaon paani peeta rahe

// ⸻

// SECTION 6: call Method Practice
// 	19.	Create a function showBrand that prints this.brand.
// let obj ={
//     brand: "kia",
//     price: 1200000
// }
// function abcd() {
//     console.log(`Car brand: ${this.brand}, price: ${this.price}`);
// }
// abcd.call(obj)

// 	20.	Create two different objects with brand values.
// let car = {
//     brand: "hyundai"
// }
// let car2 = {
//     brand: "toyota"
// }

// 	21.	Use call to execute showBrand for both objects.
// let car = {
//   brand: "hyundai",
// };
// let car2 = {
//   brand: "toyota",
// };
// function showBrand() {
//   console.log(this.brand);
// }
// showBrand.call(car);
// showBrand.call(car2);

// 	22.	Explain what problem call is solving here.
// call problem solve karta hai jab hume function ke andar this ko manually kisi object se bind karna ho, taaki function ek hi ho par different objects ke saath kaam kar sake.

// ⸻

// SECTION 7: apply Method Practice
// 	23.	Create a function introduce that accepts two arguments: city and role, and prints name, city, and role using this.name.
// let obj = {
//     name: "piyush"
// }
// function introduce(city, role){
//     console.log(`Name: ${this.name}, city: ${city}, role: ${role}`);
// }
// introduce.apply(obj, ["bhopal", "Software Engineer"])

// 	24.	Create an object with a name property.
// let obj = {
//     name: "Piyush"
// }
// 	25.	Use apply to call introduce using the object and an array of arguments.
// function introduce(city, role){
//     console.log(`Name: ${this.name}, city: ${city}, role: ${role}`);
// }
// introduce.apply(obj, ["bhopal", "Software Engineer"])

// 	26.	Explain in simple words how apply differs from call.
// apply object ke sath sath arguments bhi deta he as a form of array call sirf object deta he

// ⸻

// SECTION 8: bind Method Practice
// 	27.	Create a function greet that prints “Hello” followed by this.name.
// let obj = {
//     name: "Piyush"
// }
// function greet(){
//     console.log(`hello ${this.name}`);
// }

// 	28.	Bind this function to an object and store the returned function in a variable.
// let Greet = greet.bind(obj)

// 	29.	Call the bound function later and observe the output.
// Greet()

// 	30.	Explain why bind is useful when functions are executed later or inside callbacks.
// bind useful hai kyunki jab function baad me execute hota hai (callbacks, timeouts, event handlers, etc), JavaScript often this ko loose kar deta hai, aur bind ensure karta hai ki this hamesha specified object ko hi refer kare.

// Displaying Day 58 - Question Sheet 2.md.


