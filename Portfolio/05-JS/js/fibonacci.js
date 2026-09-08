/*
    Fibonacci Sequence - Enter a number and have the program
    generate the Fibonacci sequence to that number or to the Nth number.
*/
// This array will keep memory of the previous fibonacci numbers

// When it grabs the value, it is a string, so we need to convert it to a number
var memo = {};

// Add an alert to test your function when the button is used. 
const button = document.getElementById("btn");
button.addEventListener("click", e=> {
  var n = parseInt(document.getElementById("num").value);
  fibonacci(n);
  
  var resultSequence = fibonacci(n);

  console.log(`Sequence for ${n}:`, resultSequence);
});

function fibonacci(n) {
  "use strict";
  var val = f(n);
  return val;
} 

function f(n) {
  var value;
  // Check if the memory array already contains the requested number
  if (memo.hasOwnProperty(n)) {
    value = memo[n];
  } else {
    //TODO: Implement the fibonacci function here!

    var sequence;

    if (n === 0) {
      sequence = [0];
    } else if (n === 1) {
      sequence = [0, 1];
    } else {
// Recursively get the sequence up to (n - 1)
    var prevSequence = fibonacci(n - 1);
    
    // Copy the previous array and append the next calculated number
    var nextValue = prevSequence[prevSequence.length - 1] + prevSequence[prevSequence.length - 2];
    sequence = prevSequence.concat(nextValue);
    }

    memo[n] = sequence[sequence.length - 1];

    return sequence;
  }

  return value;
}



