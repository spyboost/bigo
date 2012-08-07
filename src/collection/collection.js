'use strict';
(function(){
Array.prototype.maxSubSum =
/**
 * Finds the max subsequence sum.
 * @param {Boolean} [returnSubsequence = false] the flag indicating that the subsequence is returned instead of just sum.
 * @returns the max subsequence sum
 */
function maxSubSum(returnSubsequence){
	if(this.length <= 1)
		return this[0];
	var maxSum = undefined;
	var sum = 0;
	var start = 0;
	var end;
	var maxStart;
	var maxEnd;
	var negativeSum = 0;
	for(var i = 0; i < this.length; i++){
		var v = this[i];
		if(v > 0){
			end = i;
			if(negativeSum){
				var currentSum = sum + negativeSum;
				if(currentSum > 0)
					sum = currentSum + v;
				else if(maxSum == undefined || sum > maxSum){
					maxStart = start;
					maxEnd = end;
					maxSum = sum;
					start = end;
				}
				negativeSum = 0;
			}else{
				sum += v;
				if(maxSum < 0){
					maxSum = v;
					start = v;
					end = v;
				}
			}
		}else if(sum > 0)
			negativeSum += v;
		else if(maxSum == undefined || v > maxSum){
			maxSum = v;
			maxStart = i;
			maxEnd = i;
		}
	}
	if(maxSum < 0)
		return maxSum;
	return sum;

};
})();