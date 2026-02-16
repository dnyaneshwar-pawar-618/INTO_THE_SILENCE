//? In JavaScript, scope is the context that determines where variables can be accessed, helping write cleaner and error-free code.

//! 1. Global and Local Scope

//* A global variable refers to a variable that is declared outside any function or block, so it can be used anywhere in the program, both inside functions and in the main code.

const x = 10 // global scope

function func1() {
    console.log(x)
}

func1()


//* A local variable is a variable declared inside a function, making it accessible only within that function. It cannot be used outside the function.

function fun2() {
    // This variable is local to fun2() and 
    // cannot be accessed outuside this function
    let x = 10;
    console.log(x);
}

fun2();


//! 2. Block and Lexical Scope

//* In JavaScript, block scope refers to variables declared with let or const inside a { } block. These variables are accessible only within that block and not outside it.

{

    // Var can Accessible inside & outside the block scope 
    var y = 10;

    // let , const Accessible only inside the block scope
    const p = 20;
    let z = 30;

    console.log(x);
    console.log(y);
    console.log(z);
}

console.log(y);

//* The variable is declared inside the function and can only be accessed inside that block or nested block is called lexical scope.

function func1() {
    const x = 10;

    function func2() {
        const y = 20;
        console.log(`${x} ${y}`);
    }

    func2();
}

func1();