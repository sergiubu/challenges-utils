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
Array.prototype.isEqual = function (arr, ignoreOrder = false) {
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

/* 
Fix anotherFunc() so that calls to it will
change the doc variable to bye.
Keep the setTimeout to 100ms and do not change
the callback function or the doc variable.
*/
// From this:
function anotherFunc() {
  let str = 'bye';
  setTimeout(() => {}, 100);
}

var doc = 'hello';

function callback(str) {
  doc = str;
}

// To this:
function anotherFunc(cb) {
  let str = 'bye';
  // Or you can call the function directly,
  // instead of passing it as a param
  // callback(str);
  setTimeout(() => {
    cb(str);
    // callback(str);
  }, 100);
  // callback(str);
}

var doc = 'hello';

function callback(str) {
  doc = str;
}

/* 
Create a function that takes a number and
returns an array with the digits of the number
in reverse order.
*/
function reverseArr(num) {
  return Array.from(String(num), Number).reverse();
  // return [...String(n)].map(Number).reverse();
  // return String(num).split('').reverse().map(Number);
}

console.log(reverseArr(1485979));

/* 
Create a function that takes numbers as
arguments, adds them together, and returns
the product of digits until the answer is
only 1 digit long.
*/
function sumDigProd(...nums) {
  const sum = nums.reduce((ac, cv) => ac + cv);
  if (sum > 9)
    return sumDigProd([...`${sum}`].map(Number).reduce((ac, cv) => ac * cv));
  //return sumDigProd([...`${+sum}`].reduce((ac, cv) => ac * cv));
  else return sum;

  // let n = args.reduce((a,v) => a + v, 0);
  // while (n > 9) { n = [...''+n].reduce((a,v) => a * +v, 1); }
  // return n;

  // n = nums.reduce((a, b) => a + b, 0) + '';
  // while (n.length > 1) n = [...n].reduce((a, b) => a * b) + '';
  // return +n;
}

// let prod = n =>
//   n < 10
//     ? n
//     : prod(
//         +String(n)
//           .split('')
//           .reduce((a, b) => a * b)
//       );
// let sumDigProd = (...arr) => prod(arr.reduce((a, b) => a + b));

console.log(sumDigProd(999, 2222));

/* 
You are given the length of a video in minutes.
The format is mm:ss (e.g.: "02:54").
Create a function that takes the video
length and return it in seconds.
- The video length is given as a string.
- If the number of seconds is 60 or over, return false.
- You may get a number of minutes over 99 (e.g. "121:49" is perfectly valid).
*/
function minutesToSeconds(time) {
  return time.split(':')[1] >= 60
    ? false
    : time.split(':').reduce((ac, cv) => ac * 60 + +cv);

  // let [minutes, seconds] = time.split(':').map(Number);
  // return seconds < 60 ? minutes * 60 + seconds : false;

  // let arr = time.split(':');
  // return arr[1] >= 60 ? false : arr[0] * 60 + +arr[1];
}

console.log(minutesToSeconds('00:50'));

/* 
Create a function that takes a variable number
of groups of items, and returns the number of
ways the items can be arranged, with one item
from each group. Order does not matter.
*/
function combinations(items) {
  return [...arguments].reduce((acc, v) => (v ? acc * v : acc + v), 1);

  // return [...arguments].filter(Boolean).reduce((a, b) => a * b, 1);
  // return [...arguments].reduce((acc, item) => (item === 0 ? acc : acc * item));
  // return [...arguments].filter((val) => val !== 0).reduce((ac, cv) => ac * cv);
}

console.log(combinations(6, 7, 0));

/* 
Create a function that takes a number as
input and returns true if the sum of its
digits has the same parity as the entire number.
Otherwise, return false.
- Parity is whether a number is even or odd.
  If the sum of the digits is even and the number
  itself is even, return true. The same goes if
  the number is odd and so is the sum of its digits.
- Single digits will obviously have the same parities.
*/
function parityAnalysis(num) {
  return num % 2 === [...String(num)].reduce((sum, x) => sum + +x, 0) % 2;

  // return num % 2 === Array.from(String(num), Number).reduce((ac, cv) => ac + cv) % 2;
}

// Format phone number
function createPhoneNumber(nums) {
  return '(xxx) xxx-xxxx'.replace(/x/g, (_) => nums.shift());

  // return `(${nums.slice(0, 3)}) ${nums.slice(3, 6)}-${nums.slice(-4)}`
  // .replace(/,/g, '');

  // let number = "(xxx) xxx-xxxx";
  // for(let i = 0; i < nums.length; i++) {
  // 	number = number.replace('x', nums[i]);
  // }
  // return number;
}

console.log(createPhoneNumber([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]));

/* 
Someone has attempted to censor my strings by
replacing every vowel with a *, l*k* th*s.
Luckily, I've been able to find the vowels that
were removed.
Given a censored string and a string of the
censored vowels, return the original uncensored string.
- The vowels are given in the correct order.
- The number of vowels will match the number
of * characters in the censored string.
*/
function uncensor(str, vowels) {
  // const vowelsArr = [...vowels];
  vowels = [...vowels];
  return str.replace(/\*/g, () => vowels.shift());

  // let v = [...vowels];
  // return [...str].map((val) => (val === '*' ? val.shift() : val)).join``;

  // for (let i = 0; i < vowels.length; i++) {
  //   str = str.replace('*', vowels[i]);
  // }
  // return str;

  // while (vowels) {
  //   str = str.replace(/\*/, vowels[0]);
  //   vowels = vowels.slice(1);
  // }
  // return str;
}

console.log(uncensor('Wh*r* d*d my v*w*ls g*?', 'eeioeo'));

// Count the number of chars
function getCharCount(str) {
  let count = 1;
  let result = '';

  str.split('').forEach((char, i) => {
    if (char === str.charAt(i + 1)) {
      count++;
    } else {
      result += count + char;
      count = 1;
    }
  });

  return result;
}

console.log(getCharCount('77722220'));

// Which planet name will it be?
var planetname = 'Mars';
var obj = {
  planetname: 'Venus',
  prop: {
    planetname: 'Saturn',
    getFullname: function () {
      return this.planetname;
    },
  },
};
//=================================
console.log(obj.prop.getFullname());

//=================================
console.log(this.planetname);
// this goes to global window
var output = obj.prop.getFullname;
console.log(output());

/* 
Create a function that takes in a number as a
string n and returns the number without trailing
and leading zeros.

- Trailing Zeros are the zeros after a decimal
point which don't affect the value
(e.g. the last three zeros in 3.4000 and 3.04000).
- Leading Zeros are the zeros before a whole
number which don't affect the value
(e.g. the first three zeros in 000234 and 000230).
- Return a string.
- If you get a number with .0 on the end,
return the integer value
(e.g. return "4" rather than "4.0").
- If the number is 0, 0.0, 000, 00.00, etc... return "0".
*/
function removeLeadingTrailing(n) {
  return String(+n);

  // return Math.abs(n);
  // return  parseFloat(n);

  // return +(n.match(/[1-9]\d*|(?=\.)\.\d*[1-9]/g) || []).join('');
}

console.log(removeLeadingTrailing('230.000'));
console.log(removeLeadingTrailing('03.1400'));

// Harshad Numbers
/* 
A number n is a Harshad (also called Niven)
number if it is divisible by the sum of its
digits. 
For example, 666 is divisible by 6 + 6 + 6,
so it is a Harshad number.
*/
function isHarshad(num) {
  return num % [...`${num}`].reduce((ac, cv) => ac + +cv, 0) === 0;

  // return n > 0 && !(n % [...`${n}`].reduce((a, b) => a + +b, 0));

  // return n % String(n).match(/\d/g).reduce((a,b)=> +a + +b) === 0;
}

console.log(isHarshad(713));

// Fractions and Rounding
/* 
Given a fraction frac (given in the format "1/2" for example) and n number of decimal places, return a sentence in the following format:

"{fraction} rounded to {n} decimal places is {answer}"

- Add trailing zeros if n is greater than the actual number of decimal places the fraction has (see example #2).
- Numbers greater than one may be given as top-heavy fractions (no mixed numbers).
- n won't be 1 because that would cause "decimal places" to be "decimal place", making the challenge more cumbersome than it needs to be.
*/
function fracRound(frac, n) {
  return `${frac} rounded to ${n} decimal places is ${eval(frac).toFixed(n)}`;
}

console.log(fracRound('42/42', 7));

// Broken Bridge
// Create a function which validates whether a bridge is safe to walk on
// (i.e. has no gaps in it to fall through).
function isSafeBridge(str) {
  return !/\s/.test(str);

  // return !s.includes(' ');
  // return str.search(/ /) === -1;
  // return s.split(' ').length === 1;
}

console.log(isSafeBridge('## ####'));

// Currying - used in functional programming
const ensureNum = (entity) =>
  typeof entity === 'string' ? parseInt(entity) : entity;

const addNums = (a) => (b) => a + b;

const incrementEach = (arr, by) => arr.map(ensureNum).map(addNums(by));

console.log(incrementEach([1, '2', 3], 2));

// Removing Enemies
// Remove enemies from the list of people, even if the enemy shows up twice.
// All names to be removed will be in the enemies list; simply return the list, no fancy strings.
function removeEnemies(names, enemies) {
  return names.filter((name) => !enemies.includes(name));

  // return names.filter(name => enemies.indexOf(name) < 0);
}

console.log(
  removeEnemies(['Jeff', 'Charlie', 'James', 'Fredrick'], ['James', 'Jeff']),
  ['Charlie', 'Fredrick']
);
