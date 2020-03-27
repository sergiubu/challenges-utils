/* 
  The Recamán Sequence is a numeric sequence that starts always with 0. The position of a positive integer in the sequence, or Recamán Index, can be established with the following algorithm:

  For every number to find, two variables are considered: the value of the last element of the sequence (last element from now on), and the actual sequence length (length from now on).
  If the subtraction of the length from the last element returns a number greater than 0 and not already present in the sequence, it is added to the sequence.
  When the conditions of the above statement are not met, will be added always the sum of the last element plus the length (even if it is a number already present in the sequence).
  Repeat until the number of interest is found.

Look at example below for the steps to do for to establish the Recamán Index of number 2:
Sequence = [0]

Last - Length = 0 - 1 = -1 (lower than zero)
Last + Length = 0 + 1 = 1

Sequence = [0, 1]

Last - Length = 1 - 2 = -1 (lower than 0)
Last + Length = 1 + 2 = 3

Sequence = [0, 1, 3]

Last - Length = 3 - 3 = 0 (already present in sequence)
Last + Length = 3 + 3 = 6

Sequence = [0, 1, 3, 6]

Last - Length = 6 - 4 = 2 (greater than 0 and not already in sequence)

Sequence = [0, 1, 3, 6, 2]

The Recaman Index of 2 is: 4

// Notes
- The sequence starts always with 0.
- The step with the subtraction Last Element - Sequence Length (verifying that is not already present in the sequence) has the precedence over the second step.
- Remember: if the number to add is the result of a subtraction it can't be already in the sequence (first step), if it is the result of an addition it can be already present (second step).
*/
// 0, 1, 3, 6, 2, 7, 13, 20, 12, 21, 11, 22, 10, 23, 9, 24, 8, 25, 43, 62
function recamanIndex(n) {
  const seq = [0];
  let result;

  // while (seq.indexOf(n) === -1)
  // while (!seq.includes(n))
  while (seq[seq.length - 1] !== n) {
    result = seq[seq.length - 1] - seq.length;
    if (result > 0 && !seq.includes(result)) {
      seq.push(result);
    } else {
      seq.push(seq[seq.length - 1] + seq.length);
    }
  }

  return seq.indexOf(n);
}

console.log(recamanIndex(18));

/* 
  Extend the global Array object to have
  an instance method called isEqual().
  The method should accept an array as the
  first argument, and a second optional
  argument that is a flag to ignore the
  order of the arrays. This second argument
  should default to false
*/
// Comparing arrays
Array.prototype.isEqual = function(arr, ignoreOrder = false) {
  // Good
  console.log(this.join(), arr.join());
  console.log(JSON.stringify(this), JSON.stringify(arr));
  // Bad
  console.log(this.join(''), arr.join(''));
  console.log(this.join``, arr.join``);

  if (ignoreOrder === false) return this.join() === arr.join();
  else return this.sort().join() === arr.sort().join();
};

console.log([1, 1, 2, 3, 4].isEqual([112, 34]));

/* 
Create a function that returns true if smaller
arrays can concatenate to form the target array
and false otherwise.
- Arrays do not have to be sorted
- Arrays should concatenate to create the final
array exactly
*/
function canConcatenate(arr, target) {
  return (
    []
      .concat(...arr)
      .sort()
      .join('') === target.sort().join('')
  );

  // return return [].concat.apply([], arr).length === target.length;

  // return arr.flat(Infinity).reduce((ac, cv) => ac + cv) ===
  // 				target.reduce((ac, cv) => ac + cv);

  // return JSON.stringify(arr.reduce((a, v) => a.concat(v), []).sort()) === JSON.stringify(target.sort());

  // return String(arr.reduce((a, b) => [...a, ...b], []).sort()) === String(target.sort());
}

console.log(canConcatenate([1, [2, [3]]], [3, 2, 1]));

/* 
Given a two digit number, return true if
that number contains one even and one odd digit.
*/
function oneOddOneEven(n) {
  return [...String(n)].reduce((a, b) => +a + +b) % 2 !== 0;

  // return ~~(n / 10) % 2 !== n % 2;

  // return `${n}`[0] % 2 !== `${n}`[1] % 2;

  // return [...`${n}`].every(val => val % 2 === 0)
  //   ? false
  //   : [...`${n}`].some(val => val % 2 === 0);
}

console.log(oneOddOneEven(26));

/* 
The code below produces an error because
no object was passed to the function.
Fix the function to return the default size,
even if nothing is passed to the function.
Don't remove the {size = "big"} object in the
parameter and don't change the return statement.
*/
function shirtSize({ size = 'big' }) {
  return size;
}
// Solution
// function ({size} = {size: "big"})
function shirtSize({ size = 'big' } = {}) {
  return size;
}
