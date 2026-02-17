//* Advanced Concepts in Objects:

const person = { name: "Alice", age: 25, city: "New York" };
console.log(Object.keys(person));  // Output: ['name', 'age', 'city']

console.log(Object.values(person));  // Output: ['Alice', 25, 'New York']

console.log(Object.entries(person));  // Output: [['name', 'Alice'], ['age', 25], ['city', 'New York']]






//* Shallow Copy: Only the references of nested objects are copied, not the actual objects.

let original = { name: "Alice", address: { city: "New York" } };
let shallowCopy = { ...original };
shallowCopy.address.city = "San Francisco";
console.log(original.address.city);  // Output: San Francisco


//* Deep Copy: Copies the object and all nested objects fully, creating an independent copy.

let deepCopy = JSON.parse(JSON.stringify(original));
deepCopy.address.city = "Los Angeles";
console.log(original.address.city);  // Output: New York


//* Object.freeze(): Freezes an object, making it immutable (you cannot add, remove, or change properties).

let obj1 = { name: "Alice" };
Object.freeze(obj1);
obj1.name = "Bob";  // This will have no effect
console.log(obj1.name);  // Output: Alice

//* Object.seal(): Seals an object, allowing modification of existing properties but preventing adding or removing properties.

let obj2 = { name: "Alice" };
Object.seal(obj2);
obj2.name = "Bob";  // This will work
obj2.age = 30;  // This won't add a new property
console.log(obj2);  // Output: { name: "Bob" }


//! arrow functions don't have their own this, and they inherit this from their surrounding scope.

let car = {
    brand: "Tesla",
    model: "Model 3",
    getDetails: () => {
        console.log(this.brand);  // `this` is not the car object here
    }
};
car.getDetails();  // Output: undefined
