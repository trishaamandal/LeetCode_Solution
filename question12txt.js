Given a string expression representing an expression of fraction addition and subtraction, return the calculation result in string format.

The final result should be an irreducible fraction. If your final result is an integer, change it to the format of a fraction that has a denominator 1. So in this case, 2 should be converted to 2/1.

 

Example 1:

Input: expression = "-1/2+1/2"
Output: "0/1"
Example 2:

Input: expression = "-1/2+1/2+1/3"
Output: "1/3"
Example 3:

Input: expression = "1/3-1/2"
Output: "-1/6"
 

Constraints:

The input string only contains '0' to '9', '/', '+' and '-'. So does the output.
Each fraction (input and output) has the format ±numerator/denominator. If the first input fraction or the output is positive, then '+' will be omitted.
The input only contains valid irreducible fractions, where the numerator and denominator of each fraction will always be in the range [1, 10]. If the denominator is 1, it means this fraction is actually an integer in a fraction format defined above.
The number of given fractions will be in the range [1, 10].
The numerator and denominator of the final result are guaranteed to be valid and in the range of 32-bit int.




# ANSWER:
/**
 * @param {string} expression
 * @return {string}
 */
var fractionAddition = function(expression) {
    let num = 0;
    let den = 1;
    let i = 0;
    const n = expression.length;
    
    while (i < n) {
        let sign = 1;
        
        // Determine the sign of the current fraction
        if (expression[i] === '-') {
            sign = -1;
            i++;
        } else if (expression[i] === '+') {
            i++;
        }
        
        // Extract the numerator
        let j = i;
        while (j < n && isDigit(expression[j])) {
            j++;
        }
        let numerator = sign * parseInt(expression.substring(i, j));
        
        // Move past the '/' character
        i = j + 1;
        
        // Extract the denominator
        j = i;
        while (j < n && isDigit(expression[j])) {
            j++;
        }
        let denominator = parseInt(expression.substring(i, j));
        
        // Calculate the new denominator (LCM of current and new denominator)
        let commonDen = lcm(den, denominator);
        
        // Adjust the numerators to the new common denominator and add them
        num = num * (commonDen / den) + numerator * (commonDen / denominator);
        den = commonDen;
        
        // Move to the next part of the expression
        i = j;
    }
    
    // Simplify the fraction
    let gcdValue = gcd(Math.abs(num), den);
    num /= gcdValue;
    den /= gcdValue;
    
    return `${num}/${den}`;
};

// Helper function to check if a character is a digit
function isDigit(char) {
    return char >= '0' && char <= '9';
}

// Helper function to compute the greatest common divisor (GCD)
function gcd(a, b) {
    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

// Helper function to compute the least common multiple (LCM)
function lcm(a, b) {
    return (a * b) / gcd(a, b);
}
