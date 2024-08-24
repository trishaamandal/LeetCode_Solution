(12)Given a string n representing an integer, return the closest integer (not including itself), which is a palindrome. If there is a tie, return the smaller one.

The closest is defined as the absolute difference minimized between two integers.

 

Example 1:

Input: n = "123"
Output: "121"
Example 2:

Input: n = "1"
Output: "0"
Explanation: 0 and 2 are the closest palindromes but we return the smallest which is 0.
 

Constraints:

1 <= n.length <= 18
n consists of only digits.
n does not have leading zeros.
n is representing an integer in the range [1, 1018 - 1].

# Answer:
/**
 * @param {string} numberStr
 * @return {string}
 */
var nearestPalindromic = function(numberStr) {
    let number = BigInt(numberStr);
    if (number <= 10n) return (number - 1n).toString();
    if (number === 11n) return "9";

    let length = numberStr.length;
    let leftHalf = BigInt(numberStr.slice(0, (length + 1) / 2));
    
    let palindromeCandidates = [
        generatePalindromeFromLeft(leftHalf - 1n, length % 2 === 0),
        generatePalindromeFromLeft(leftHalf, length % 2 === 0),
        generatePalindromeFromLeft(leftHalf + 1n, length % 2 === 0),
        BigInt(10n ** BigInt(length - 1)) - 1n,
        BigInt(10n ** BigInt(length)) + 1n
    ];

    let nearestPalindrome = 0n;
    let minDifference = BigInt(Number.MAX_SAFE_INTEGER);

    for (let candidate of palindromeCandidates) {
        if (candidate === number) continue;
        let difference = candidate > number ? candidate - number : number - candidate;
        if (difference < minDifference || (difference === minDifference && candidate < nearestPalindrome)) {
            minDifference = difference;
            nearestPalindrome = candidate;
        }
    }

    return nearestPalindrome.toString();
};

function generatePalindromeFromLeft(leftHalf, isEvenLength) {
    let palindrome = leftHalf;
    if (!isEvenLength) leftHalf = leftHalf / 10n;
    while (leftHalf > 0n) {
        palindrome = palindrome * 10n + leftHalf % 10n;
        leftHalf = leftHalf / 10n;
    }
    return palindrome;
}
