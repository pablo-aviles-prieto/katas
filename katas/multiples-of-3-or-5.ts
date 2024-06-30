/*
 ** https://www.codewars.com/kata/514b92a657cdc65150000006
 **
 ** 6 KYU
 **
 ** If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9. The sum of these multiples is 23.
 ** Finish the solution so that it returns the sum of all the multiples of 3 or 5 below the number passed in.
 ** Additionally, if the number is negative, return 0.
 ** Note: If the number is a multiple of both 3 and 5, only count it once.
 */

const NUMBERS_TO_CHECK_MULTIPLES = [3, 5];

const multiplesOf3Or5 = (numberToCheck: number) => {
  if (numberToCheck <= Math.min(...NUMBERS_TO_CHECK_MULTIPLES) - 1) return 0;

  const numbersInBetween: number[] = [];
  let currentNumberChecking = numberToCheck - 1;

  while (currentNumberChecking > 0) {
    numbersInBetween.push(currentNumberChecking);
    currentNumberChecking--;
  }

  const multiplesNumbers: number[] = [];

  for (let i = 0; i < numbersInBetween.length; i++) {
    for (let j = 0; j < NUMBERS_TO_CHECK_MULTIPLES.length; j++) {
      if (numbersInBetween[i] % NUMBERS_TO_CHECK_MULTIPLES[j] === 0) {
        multiplesNumbers.push(numbersInBetween[i]);
        j = NUMBERS_TO_CHECK_MULTIPLES.length;
      }
    }
  }

  return multiplesNumbers.reduce((acc, value) => {
    return acc + value;
  }, 0);
};

console.log('multiplesOf3Or5', multiplesOf3Or5(10));
