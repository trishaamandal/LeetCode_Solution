Q.10) 
Topics
Companies
Hint
Alice and Bob continue their games with piles of stones.  There are a number of piles arranged in a row, and each pile has a positive integer number of stones piles[i].  The objective of the game is to end with the most stones. 

Alice and Bob take turns, with Alice starting first.  Initially, M = 1.

On each player's turn, that player can take all the stones in the first X remaining piles, where 1 <= X <= 2M.  Then, we set M = max(M, X).

The game continues until all the stones have been taken.

Assuming Alice and Bob play optimally, return the maximum number of stones Alice can get.

 

Example 1:

Input: piles = [2,7,9,4,4]
Output: 10
Explanation:  If Alice takes one pile at the beginning, Bob takes two piles, then Alice takes 2 piles again. Alice can get 2 + 4 + 4 = 10 piles in total. If Alice takes two piles at the beginning, then Bob can take all three piles left. In this case, Alice get 2 + 7 = 9 piles in total. So we return 10 since it's larger. 
Example 2:

Input: piles = [1,2,3,4,5,100]
Output: 104
 

Constraints:

1 <= piles.length <= 100
1 <= piles[i] <= 104





 ANSWER:

/**
 * @param {number[]} piles
 * @return {number}
 */
var stoneGameII = function(piles) {
    const totalPiles = piles.length;
    const suffixSums = new Array(totalPiles + 1).fill(0);
    for (let i = totalPiles - 1; i >= 0; i--) {
        suffixSums[i] = suffixSums[i + 1] + piles[i];
    }
    
    const memo = Array.from({ length: totalPiles }, () => new Array(totalPiles + 1).fill(0));
    
    const maxStonesAliceCanGet = (m, currentPile) => {
        if (currentPile >= totalPiles) return 0;
        
        if (currentPile + 2 * m >= totalPiles) {
            return suffixSums[currentPile];
        }
        
        if (memo[currentPile][m] !== 0) return memo[currentPile][m];
        
        let maxStones = 0;
        
        for (let x = 1; x <= 2 * m; x++) {
            const currentStones = suffixSums[currentPile] - maxStonesAliceCanGet(Math.max(m, x), currentPile + x);
            maxStones = Math.max(maxStones, currentStones);
        }
        
        memo[currentPile][m] = maxStones;
        return maxStones;
    };
    
    return maxStonesAliceCanGet(1, 0);
};
