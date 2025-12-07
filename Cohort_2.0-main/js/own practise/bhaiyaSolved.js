// SECTION 1: Objects and OOPS Thinking (Foundation)
// 	1.	Create a user object that stores name and email and has a login method which prints “User logged in”.
// let user = {
//     name: "Piyush",
//     email: "Piyush@gmail.com",
//     login(){
//         console.log("logged in");
//     }
// }
// user.login()

// 	2.	Imagine you now have 5 users.
// First, think how you would manage them without using a class.
// Then convert the same logic using a class and observe how the code becomes cleaner. Write code for both approaches.
// class User {
//   constructor(name, email) {
//     (this.name = name), (this.email = email);
//   }
//   login() {
//     console.log("looged in");
//   }
// }
// let user1 = new User("piyush", "p@p.com");
// let user2 = new User("dishant", "p@p.com");
// let user3 = new User("raj ", "p@p.com");
// let user4 = new User("prince", "p@p.com");
// let user5 = new User("vishal", "p@p.com");

// 	3.	Create a product object that stores name and price and has a method which returns the final price after discount.
// let product = {
//   name: "Redtape",
//   price: 1500,
//   finalPrice() {
//     return this.price - 500;
//   },
// };
// console.log(product.finalPrice());

// The goal of this section is to understand why keeping data and behavior together makes code easier to manage.

// ⸻

// SECTION 2: Classes and Objects
// 	4.	Create a Car class with the following:
// brand
// speed
// a drive method that prints the car brand and speed
// class Car {
//   constructor(brand, speed) {
//     (this.brand = brand), (this.speed = speed);
//   }
//   drive() {
//     return this.brand + " - " + this.speed;
//   }
// }
// let car = new Car("Kia", 150);

// 	5.	Create two different car objects from the same class and verify that their data is different.
// class Car {
//   constructor(brand, speed) {
//     (this.brand = brand), (this.speed = speed);
//   }
//   drive() {
//     return this.brand + " - " + this.speed;
//   }
// }
// let car1 = new Car("Kia", 150);
// let car2 = new Car("hyundai", 180);

// 	6.	Answer this in your own words:
// If classes did not exist, how would you write this logic and what problems might occur when the project becomes large?
// bohot sare objects banane padhte har object ki value alag alag badalna padhti class hum sirf ek bar banate he

// ⸻

// SECTION 3: Constructor and this keyword
// 	7.	Create a Student class whose constructor accepts name and roll number.
// Add a method introduce that prints both values.
// class Student{
//     constructor(name, rollNumber){
//         this.name = name,
//         this.rollNumber = rollNumber
//     }
//     intro(){
//         return this.name + " " + this.rollNumber
//     }
// }
// let student1 = new Student("Piyush", 1)

// 	8.	Inside the constructor, set values using this.
// Then try removing this and notice what error occurs and why.
// class Student{
//     constructor(name, rollNumber){
//         name = name,
//         rollNumber = rollNumber
//     }
//     intro(){
//         return this.name + " " + this.rollNumber
//     }
// }
// let student1 = new Student("Piyush", 1)

// 	9.	Create an object with two methods:
// One method using a normal function
// One method using an arrow function
// Inside both, print this and observe the difference.
// let normal = {
//     this:function(){
//         console.log(this);
//     }
// }
// let arrow = {
//     this:()=>{
//         console.log(this);
//     }
// }
// normal.this()
// arrow.this()

// The goal is to clearly understand how this works and when it changes.

// ⸻

// SECTION 4: Constructor Functions and Prototypes
// 	10.	Create a User constructor function (do not use class syntax).
// function Animal(){
//     this.name = "dog"
// }
// let animal = new Animal()

// 	11.	Add a login method in two ways:
// First, inside the constructor
// Then, move the method to the prototype
// class Animal {
//   constructor() {
//     this.fnc1 = function () {};
//   }
//   fnc2() {}
// }
// let animal = new Animal();

// 	12.	Create two User objects and compare their login methods using equality.
// Explain why the result is true or false.
// class User {
//   constructor() {
//     this.fnc1 = function () {};
//   }
//   fnc2() {}
// }
// let user1 = new User();
// let user2 = new User();

// The purpose here is to understand how prototypes help share behavior efficiently.

// ⸻

// SECTION 5: call, apply, bind
// 	13.	Create a function that prints this.name.
// function abcd() {
//   console.log(this.name);
// }
// let obj = {
//   name: "piyush",
// };
// abcd.call(obj);

// 	14.	Create an object that contains a name property.
// Use call to run the function using the object
// Use apply to run the function using the object
// Use bind to create a new function and then call it
// let obj = {
//   name: "Piyush",
// };
// function abcd(a, v) {
//   console.log(this.name, a, v);
// }
// abcd.call(obj);
// abcd.apply(obj, [1, 2]);
// let bind = abcd.bind(obj);
// bind();

// 	15.	Borrow a method from one object and run it for another object using call.
// let obj = {
//   fnc1: function () {
//     console.log("hello fnc1");
//   },
// };
// let obj2 = {
//   fnc2: function () {
//     return this.fnc1();
//   },
// };
// obj2.fnc2.call(obj);

// The goal is to understand how this can be manually controlled.
// Displaying Day 58 - Question Sheet 1.md.
