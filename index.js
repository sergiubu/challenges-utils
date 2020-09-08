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

// Digits Sum Root
// Create a function that takes a number and returns one digit that is the result of summing all the digits of the input number. When the sum of the digits consists of more than one digit, repeat summing until you get one digit.
function rootDigit(n) {
  return n > 9 ? rootDigit([...String(n)].reduce((ac, cv) => +ac + +cv)) : n;

  // return n && (+`${BigInt(n) % 9n}` || 9);
  // return BigInt(n) < 10n ? Number(n) : rootDigit([...''+n].reduce((a,v) => +v+a, 0));
  // return 	n < 10 ? n : rootDigit([...`${n}`].reduce((ac, cv) => a + Number(cv), 0));
}

console.log(rootDigit(1238763636555555555555n));

// How Much is True?
// Create a function which returns the number of true values there are in an array.
function countTrue(arr) {
  return arr.filter((val) => val === true).length;

  // return arr.filter(Boolean).length;
}

console.log(countTrue([true, false, false, true, false]));

// Positive Dominant
// Write a function that returns true if an array is positive dominant.
// 0 neither counts as a positive nor a negative value.
// An array is positive dominant if it contains strictly more unique positive values than unique negative values.
function isPositiveDominant(a) {
  const arrSet = [...new Set(a)];
  return (
    arrSet.filter((val) => val > 0).length >
    arrSet.filter((val) => val < 0).length
  );

  // return [...new Set(a)].reduce((a, b) => a + Math.sign(b), 0) > 0;

  // return new Set(a.filter(x => x > 0)).size > new Set(a.filter(x => x < 0)).size;

  // return [...new Set(a)].filter(x => x > 0).length > [...new Set(a)].filter(x => x < 0).length;

  // return (
  //   a.filter((e, i, a) => e > 0 && a.indexOf(e) == i).length >
  //   a.filter((e, i, a) => e < 0 && a.indexOf(e) == i).length
  // );
}

console.log(isPositiveDominant([1, 1, 1, 1, -3, -4]));

// Finding Common Elements
// Create a function that takes two "sorted" arrays of numbers and returns an array of numbers which are common to both the input arrays.
function commonElements(arr1, arr2) {
  return [...new Set(arr1.filter((val) => arr2.includes(val)))];
}

console.log(commonElements([1, 2, 2, 2, 3, 4, 5], [1, 2, 4, 5]));

// Return the Time Saved by Speeding
// Create a function that calculates the amount of time saved (in minutes) were you traveling with an average speed that is above the speed-limit as compared to traveling with an average speed exactly at the speed-limit.
// The paramater's format is as follows:
// (speed limit, avg speed, distance traveled at avg speed)
function timeSaved(lim, avg, d) {
  return +((d / lim - d / avg) * 60).toFixed(1);
}

console.log(timeSaved(80, 90, 40));

// Oddly or Evenly Positioned
// Create a function that extracts the characters from an array (or a string) on odd or even positions, depending on the specifier. The string 'odd' for items on odd positions (1, 2, 3, ...) and 'even' for even positions (2, 4, 6, ...).
function charAtPos(r, s) {
  if (typeof r === 'string') {
    return r
      .split('')
      .filter((_, i) => (s === 'odd' ? !(i % 2) : i % 2))
      .join('');
  } else {
    return r.filter((_, i) => (s === 'odd' ? !(i % 2) : i % 2));
  }

  // let p = [...r].filter((k, i) => {
  //   if (s == 'odd' && !(i & 1)) return k;
  //   if (s == 'even' && i & 1) return k;
  // });

  // return Array.isArray(r) ? p : p.join('');
}

console.log(charAtPos([2, 4, 6, 8, 10], 'even'));
console.log(charAtPos('EDABIT', 'even'));

// Clone a List
// The Code tab has a code which attempts to add a clone of an array to itself. There is no error message, but the results are not as expected. Can you fix the code?
function clone(arr) {
  return [...arr, arr];

  //arr.push(...arr);
  //arr.push(arr.slice(0));

  //return arr.concat([arr.map(item=>item)]);
  //return arr;
}

console.log(clone([1, 2, 3]));

// Array Operation
// Create a function that takes three parameters and returns an array with the first parameter x, the second parameter y, and every number in between the first and second parameter in ascending order. Then filter through the array and return the array with numbers that are only divisible by the third parameter n.
// The final array should consist of all numbers between x and y inclusive that are divisible by n.
// Return an empty array if there are no numbers that are divisible by n.
function arrayOperation(x, y, n) {
  //return Array.from({length: y - x + 1}, (_, i) => x + i).filter(v => !(v % n));

  return Array.from({ length: ++y - x }, (v, i) => i + x).filter(
    (int) => !(int % n)
  );

  //const arr = [];
  //for (let i = x; i <= y; i++) arr.push(i);

  //return arr.filter(val => val % n === 0);
}

console.log(arrayOperation(1, 10, 3));

// Recursion to Repeat a String n Number of Times
// Create a recursive function that takes two parameters and repeats the string n number of times. The first parameter txt is the string to be repeated and the second parameter is the number of times the string is to be repeated.
// String.prototype.repeat() is not allowed
function repetition(txt, n) {
  return n ? txt + repetition(txt, n - 1) : '';
  //return n <= 0 ? '' : txt + repetition(txt, n - 1);

  //let str = '';
  //for (let i = 0; i <= n - 1; i++) repetition(str += txt);
  //return str;

  // let res = '';
  // while (n > 0) {
  //   res += txt;
  //   n--;
  // }
  // return res;
}

console.log(repetition('amigo', 5));

// Summing a Slice
// Given an array and an integer n, return the sum of the first n numbers in the array.
// If n is larger than the length of the array, return the sum of the whole array.
function sliceSum(arr, n) {
  return arr.slice(0, n).reduce((acc, cv) => acc + cv, 0);

  // return [0, ...arr].slice(0, n + 1).reduce((x, y) => x + y);

  // return n < arr.length
  //   ? arr.slice(0, n).reduce((a, b) => a + b, 0)
  //   : arr.reduce((a, b) => a + b, 0);
}

console.log(sliceSum([0, 0, 0, 3, 4], 3));

// All About Anonymous Functions: Adding Suffixes
// Write a function that returns an anonymous function, which transforms its input by adding a particular suffix at the end.
function add_suffix(suffix) {
  return (word) => word + suffix;
}

add_ly = add_suffix('ly');

console.log(add_ly('hopeless'));

// Integer in Range?
// Create a function which validates whether a number n is exclusively within the bounds of lower and upper. Return false if n is not an integer.
// - Exclusively means that a number is considered not within the bounds if it is equal to the upper bound (see example #2).
// - Bounds will be always given as integers.
function intWithinBounds(n, lower, upper) {
  return Number.isInteger(n) && n >= lower && n < upper;
}

console.log(intWithinBounds(4.5, 3, 8));

// Algorithms I: Introduction to Recursion

// Recursion
// In computer science, "recursion" is the act of writing a function that calls itself from within its own code. The function below better helps explain and illustrate recursion by simply counting down from a given number to zero:

// Explanation
// The above function starts by initializing the target number, which is zero, then it creates a base case by checking if the inputted number has reached the target number yet. If it has, then the function ends and it prints the statement, else the function inputs num subtracted by one and then runs the function again.

// When using recursive functions a "Base Case" is needed. A base case will stop the function once it reaches its intended goal. In the absence of a base case, the program can either crash due to "Stack Overflow" or by initiating an "Infinite Loop."

// On a side note, initializing variables in recursive functions can sometimes be problematic because when the function runs again it will reset the value of that variable. For this specific recursive function the variable works fine because the target number we're trying to reach is consistently zero.

// The recursive function for this challenge should return the factorial of an inputted integer.
// If anyone needs a refresher, factorials in mathematics are represented by an exclamation point placed to the right of a number: 4! = 4 x 3 x 2 x 1 = 24
function factorial(num) {
  return num === 0 ? 1 : num * factorial(--num);

  // return num === 0 ? 1 : num * factorial(num - 1);
}

console.log(factorial(4));

// toString() Hooking
// You have one job and one job only, to ruin the day of any unsuspecting victim using the toString() function. Hook the String prototype toString() to instead return a string that is in reverse.
// Remember that this is an object!
String.prototype.toString = function () {
  return [...this].reverse().join('');

  // return Array.from(this).reverse().join('');

  // return Object.values(this).reverse().join('');
};

// Temperature Converter
// Create a function that converts Celcius to Fahrenheit and vice versa.
// - Round to the nearest integer.
// - If the input is incorrect, return "Error".

function convert(deg) {
  if (!/°[CF]$/.test(deg)) return 'Error';

  const [number, letter] = deg.split('°');
  return letter === 'F'
    ? `${Math.round((number - 32) * (5 / 9))}°C`
    : `${Math.round(number * (9 / 5) + 32)}°F`;

  // if (!deg.endsWith('°C') && !deg.endsWith('°F')) return 'Error';

  // return deg.endsWith('C')
  //   ? `${Math.round((deg.slice(0, deg.length - 2) * 9) / 5 + 32)}°F`
  //   : `${Math.round(((deg.slice(0, deg.length - 2) - 32) * 5) / 9)}°C`;

  // C to F
  // (C * 9 / 5) + 32
  // F to C
  // (F - 32) * 5 / 9
}

console.log(convert('100°C'));
console.log(convert('0°F'));
console.log(convert('33'));
console.log(convert('7K'));

// Number of Boomerangs
// A boomerang is a V-shaped sequence that is either upright or upside down. Specifically, a boomerang can be defined as: sub-array of length 3, with the first and last digits being the same and the middle digit being different.
// Some boomerang examples:
// [3, 7, 3], [1, -1, 1], [5, 6, 5]
// Create a function that returns the total number of boomerangs in an array.
// To illustrate:
// [3, 7, 3, 2, 1, 5, 1, 2, 2, -2, 2]
// 3 boomerangs in this sequence:  [3, 7, 3], [1, 5, 1], [2, -2, 2]
// Be aware that boomerangs can overlap, like so:
// [1, 7, 1, 7, 1, 7, 1]
// 5 boomerangs (from left to right): [1, 7, 1], [7, 1, 7], [1, 7, 1], [7, 1, 7], and [1, 7, 1]
// Notes
// [5, 5, 5] (triple identical digits) is NOT considered a boomerang because the middle digit is identical to the first and last.
function countBoomerangs(arr) {
  return arr.reduce(
    (acc, e, index) => acc + (e === arr[index + 2] && e != arr[index + 1]),
    0
  );

  // return arr.filter((_, i) => arr[i] == arr[i + 2] && arr[i + 1] != arr[i])
  //   .length;

  // return arr.slice(2).reduce((total, last, i) => {
  //   const [first, middle] = [arr[i], arr[i + 1]];
  //   return total + Number(first === last && first !== middle);
  // }, 0);

  // let stack = [];
  // for (let i = 0; i < arr.length; i++) {
  //   if (arr[i] === arr[i + 2] && arr[i] !== arr[i + 1]) {
  //     stack.push(arr.slice(i, i + 3));
  //   }
  // }
  // return stack.length;

  // const res = [];

  // arr.forEach((val, i) => {
  //   if (val === arr[i + 2] && val !== arr[i + 1]) {
  //     res.push([val, arr[i + 1], arr[i + 2]]);
  //   }
  // });

  // return res;
  // return res.length;
}

console.log(countBoomerangs([9, 5, 9, 5, 1, 1, 1]));
console.log(countBoomerangs([1, 7, 1, 7, 1, 7, 1]));

// Calculate the Volume of a Pyramid
// Create a function that takes the length, width, height (in meters) and output unit and returns the volume of a pyramid to three decimal places in the correct unit.
// - The units used are limited to: millimeters, centimeters, meters and kilometers.
// - Ensure you return the answer and add the correct unit in the format cubic <unit>.
// V = (l * w * h) / 3
function pyramidVolume(length, width, height, unit) {
  const UNITS = {
    millimeters: 1e3,
    centimeters: 1e2,
    meters: 1,
    kilometers: 1e-3,
  };

  return `${(((length * width * height) / 3) * UNITS[unit] ** 3).toFixed(
    3
  )} cubic ${unit}`;

  // const units = {
  //   millimeters: 10 ** 9,
  //   centimeters: 10 ** 6,
  //   meters: 1,
  //   kilometers: 10 ** -9,
  // };
  // const vol = (((length * width * height) / 3) * units[unit]).toFixed(3);
  // return `${vol} cubic ${unit}`;

  // switch (unit) {
  //   case 'millimeters':
  //     return `${(((length * width * height) / 3) * 1e9).toFixed(
  //       3
  //     )} cubic ${unit}`;
  //   case 'centimeters':
  //     return `${(((length * width * height) / 3) * 1e6).toFixed(
  //       3
  //     )} cubic ${unit}`;
  //   case 'meters':
  //     return `${((length * width * height) / 3).toFixed(3)} cubic ${unit}`;
  //   case 'kilometers':
  //     return `${((length * width * height) / 3 / 1e9).toFixed(
  //       3
  //     )} cubic ${unit}`;
  // }
}

console.log(pyramidVolume(8, 12, 2, 'centimeters'));
console.log(pyramidVolume(10, 14, 6, 'meters'));

// The Major Sum
// Create a function that takes an integer array and return the biggest between positive sum, negative sum, or 0s count. The major is understood as the greatest absolute.
// arr = [1,2,3,4,0,0,-3,-2], the function has to return 10, because:
// - Positive sum = 1+2+3+4 = 10
// - Negative sum = (-3)+(-2) = -5
// - 0s count = 2 (there are two zeros in array)
// - All numbers are integers.
// - There aren't empty arrays.
function majorSum(arr) {
  const pos = arr.filter((val) => val > 0).reduce((ac, cv) => +ac + cv, []);
  const neg = Math.abs(
    arr.filter((val) => val < 0).reduce((ac, cv) => +ac + cv, [])
  );
  const zeros = arr.filter((val) => val === 0).length;

  return neg === Math.max(pos, neg, zeros) ? -neg : Math.max(pos, neg, zeros);

  // let [pos, neg, zero] = [0, 0, 0];
  // arr.forEach((i) => {
  //   i > 0 ? (pos += i) : i < 0 ? (neg += i) : zero++;
  // });
  // return [pos, neg, zero].sort((a, b) => Math.abs(b) - Math.abs(a))[0];

  // let zeros = 0,
  //   pos = 0,
  //   neg = 0;
  // for (const n of arr) {
  //   if (!n) zeros++;
  //   else if (n > 0) pos += n;
  //   else neg += n;
  // }

  // const max = Math.max(zeros, pos, Math.abs(neg));
  // return max + neg ? max : neg;
}

console.log(majorSum([0, 0, 0, 0]));
console.log(majorSum([1, 2, 3, 4, 0, 0, -3, -2]));
console.log(majorSum([-4, -8, -12, -3, 4, 7, 1, 3, 0, 0, 0, 0]));

// Function Factory
// Create a function that takes a "base number" as an argument. This function should return another function which takes a new argument, and returns the sum of the "base number" and the new argument.
function makePlusFunction(baseNum) {
  return (num) => baseNum + num;

  // return function (num) {
  //   return baseNum + num;
  // };
}

// const makePlusFunction = (baseNum) => (num) => baseNum + num;

const plusTwo = makePlusFunction(2);

console.log(plusTwo(5));

// Pythagorean Triplet
// Create a function that validates whether three given integers form a Pythagorean triplet. The sum of the squares of the two smallest integers must equal the square of the largest number to be validated.
// - Numbers may not be given in a sorted order.
function isTriplet(n1, n2, n3) {
  const sqMax = Math.pow(Math.max(...arguments), 2);
  const sqMin = [...arguments]
    .sort((a, b) => a - b)
    .slice(0, arguments.length - 1)
    .map((val) => Math.pow(val, 2))
    .reduce((ac, cv) => ac + cv);

  return sqMax === sqMin;

  // return n1 ** 2 + n2 ** 2 + n3 ** 2 == 2 * Math.max(n1, n2, n3) ** 2;

  // [n1, n2, n3] = [n1, n2, n3].sort((a, b) => a - b);
  // return n1 ** 2 + n2 ** 2 == n3 ** 2;

  // spread args -> ...args
  // return args.sort((a, b) => a - b).pop() === Math.hypot(...args);
}

console.log(isTriplet(5, 3, 4));

// Is One Array a Subset of Another?
// Create a function that returns true if the first array is a subset of the second. Return false otherwise.
//  - Both arrays will contain only unique values.
function isSubset(arr1, arr2) {
  return arr1.every((val) => arr2.includes(val));
}

console.log(isSubset([3, 2, 5], [5, 3, 7, 9, 2]));

// Instant JAZZ
// Create a function which concantenates the number 7 to the end of every chord in an array. Ignore all chords which already end with 7.
// - Return an empty array if the given array is empty.
// - You can expect all the tests to have valid chords.
function jazzify(arr) {
  return arr.map((val) => val.split(7)[0] + 7);

  // return arr.map((val) => (val.includes('7') ? val : `${val}7`));
}

console.log(jazzify(['F7', 'E7', 'A7', 'Ab7', 'Gm7', 'C7']));
console.log(jazzify(['G', 'F', 'C']));
console.log(jazzify(['G', 'C7']));

// The DECIMATOR
// Write a DECIMATOR function which takes a string and decimates it (i.e. it removes the last 1/10 of the characters).
// Always round up: if the string has 21 characters, 1/10 of the characters would be 2.1 characters, hence the DECIMATOR removes 3 characters. The DECIMATOR shows no mercy!
function DECIMATOR(str) {
  return str.slice(0, -Math.ceil(str.length / 10));

  // return str.slice(0, str.length - Math.ceil(str.length / 10));
}

console.log(DECIMATOR('1234567890AB'));

// Even All the Way
// Given an array of numbers, return an array which contains all the even numbers in the orginal array, which also have even indices.
function getOnlyEvens(nums) {
  return nums.filter((val, i) => !(val % 2) && !(i % 2));

  // return nums.filter((val, i) => val % 2 === 0 && i % 2 === 0);
}

console.log(getOnlyEvens([1, 3, 2, 6, 4, 8]));

// Find Number of Digits in Number
// Create a function that will return an integer number containing the amount of digits in the given integer num.
// - Try to solve this challenge without using strings!
function num_of_digits(num) {
  return ~~Math.log10(Math.abs(num)) + 1;

  // return Array.from(String(Math.abs(num)), Number).length;
}

console.log(num_of_digits(-12381428));
console.log(num_of_digits(13124));

// Find the Second Largest Number
// Create a function that takes an array of numbers and returns the second largest number.
function secondLargest(arr) {
  const [largest, second, ...rest] = arr.sort((a, b) => b - a);
  return second;

  // return arr.sort((a, b) => b - a)[1];
}

console.log(secondLargest([10, 40, 30, 20, 50]));

// Travelling Salesman Problem
// Given a list of cities and the distances between each pair of cities, what is the shortest possible route that visits each city and returns to the origin city?
// Return the total number of possible paths a salesman can travel, given n paths.
function paths(n) {
  return !n || n * paths(--n);

  // return n === 1 ? 1 : n * paths(--n);
}

console.log(paths(5));

// Find Value in a Binary Tree
// An array that represents a Binary Tree is in the following form:

// binaryTree = [val, arrLeft, arrRight]

// When arrLeft is the left side of the tree and arrRight is the right side of the tree.

// To illustrate:
// const arr1 = [3, [ 8, [ 5, null, null], null], [ 7, null, null]]

// arr1 represents the following Binary Tree:

//       3
//      / \
//     8   7
//    /\   /\
//   5  N N  N
//  /\
//  N N

// Where N represents null.

// Create a function that takes an array that represent a Binary Tree and a value and return true if the value is in the tree and, false otherwise.
//  - The tree will contain integers only and will be presented by an array in the specified format.
function valueInTree(tree, val) {
  return tree
    ? tree[0] === val || valueInTree(tree[1], val) || valueInTree(tree[2], val)
    : false;

  // return Boolean(
  //   tree
  //     .toString()
  //     .split(',')
  //     .find((v) => +v === val)
  // );

  // return tree.flat(Infinity).includes(val);
}

console.log(
  valueInTree(
    [3, [7, [1, null, null], [8, null, null]], [5, null, [4, null, null]]],
    7
  )
);

// Dashed Vowels
// Create a function that takes a string and returns dashes on the left and right side of every vowel (a e i o u).
// - A string can contain uppercase and lowercase vowels.
function dashed(str) {
  return str.replace(/a|e|i|o|u/gi, (char) => `-${char}-`);

  // return str.replace(/([aeiou])/gi, '-$1-');

  // return [...str].map((x) => (/[aeiou]/i.test(x) ? `-${x}-` : x)).join('');
}

console.log(dashed('Fight for your right to party!'));

// SimpleCrypt
// You'll need to decrypt some strings found on a website and maybe one of that will help you further to get your ever wanted software.

// Let's do OOP and create an object:

// - Create an object named SimpleCrypt with a constructor that will store the original given string.
// - SimpleCrypt should have 3 prototypes : encrypt, decrypt, reset.
// - Prototype encrypt should take one optional argument (string type) and will encrypt the argument if present or original string if no arguments.
// - Prototype decrypt should take one optionnal argument too (string type) and will decrypt the argument if present or get last string with encrypt.
// - Prototype reset should reset all object properties to origin.
// - All whitespace should be spaces (32).
function SimpleCrypt(str) {
  this.original = str;
  this.workStr = str;
}

SimpleCrypt.prototype.encrypt = function (str = this.workStr) {
  this.workStr = [...str]
    .map((val, i) => String.fromCharCode(val.charCodeAt(0) + (i + 1)))
    .join('')
    .replace(/\s/g, ' ');

  return this.workStr;
};

SimpleCrypt.prototype.decrypt = function (str = this.workStr) {
  this.workStr = [...str]
    .map((val, i) => String.fromCharCode(val.charCodeAt(0) - (i + 1)))
    .join('')
    .replace(/\s/g, ' ');

  return this.workStr;
};

SimpleCrypt.prototype.reset = function () {
  this.workStr = this.original;
};

const test = new SimpleCrypt('My uncrypted str');

console.log(test.encrypt());
console.log(test.decrypt());
console.log(test.encrypt());
test.reset();
console.log(test.encrypt());
console.log(test.decrypt());

// Trace That Matrix
// Given a square matrix (i.e. same number of rows as columns), its trace is the sum of the entries in the main diagonal (i.e. the diagonal line from the top left to the bottom right).
// - The size of the matrices will vary (but they will always be square).
function trace(arr) {
  return arr.reduce((ac, cv, i) => ac + cv[i], 0);

  // let trace = 0;
  // let i = 0;
  // while (i < arr.length) {
  //   trace += arr[i][i];
  //   i++;
  // }
  // return trace;

  // let total = (index = 0);
  // for (const num of arr) {
  //   total += arr[index][index];
  //   index++;
  // }
  // return total;

  // let trace = 0;
  // for (y = 0; y < arr.length; y++) {
  //   trace += arr[y][y];
  // }
  // return trace;
}

console.log(
  trace([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ])
);

// ES6 Object Methods in ES5
// In ES6 JavaScript, there are two Object methods:

// 1. Object.prototype.entries() takes a single object as an argument, and returns an array. In this array are arrays with the name of every property of the object, and the value of the property.
// 2. Object.prototype.values() also takes a single object as an argument, and returns an array. In this array are the values of every property of the object.

// Your job is to recreate these Object methods in ES5 JavaScript, creating new methods:

// - Object.prototype.entriesNew()
// - Object.prototype.valuesNew()

// The methods you create should return the same values as Object.prototype.entries() and Object.prototype.values(), and should adhere to ES5 limits. If the object has no properties your methods should return an empty array.
// - Do not use ES6 Object methods.
// - Do not use ES6 features like arrow functions or let.

/*
 * @param {object} obj
 * @return {array}
 */

Object.prototype.valuesNew = function (obj) {
  var values = [];
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) values.push(obj[key]);
  }
  return values;

  // return Object.getOwnPropertyNames(obj).map((val) => obj[val]);
};

Object.prototype.entriesNew = function (obj) {
  var entries = [];
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) entries.push([key, obj[key]]);
  }
  return entries;

  // return Object.getOwnPropertyNames(obj).map((val) => [val, obj[val]]);
};

console.log(Object.valuesNew({ name: 'john', hairColor: 'brown' }));
console.log(Object.valuesNew({ first: 1, second: 2, third: 3 }));
console.log(Object.entriesNew({ 1: 'One', 2: 'Two', 3: 'Three' }));
console.log(
  Object.entriesNew({ purpose: null, reason: 'none', cause: 'none' })
);
