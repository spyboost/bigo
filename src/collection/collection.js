'use strict';
(function(){
Array.prototype.maxSubSum =
/**
 * Finds the max subsequence sum.
 * @param {Boolean} [returnRange = false] the flag indicating that the subsequence is returned instead of just sum.
 * @returns the max subsequence sum
 */
function maxSubSum(returnRange){
	if(this.length <= 1)
		return this[0];
	var maxMin = -Infinity;
	var start = 0;
	var end = 0;
	for(var i = 0; i < this.length && this[i] <= 0; i++)
		if(this[i] > maxMin){
			start = i;
			end = i;
			maxMin = this[i];
		}
	if(i == this.length){
		if(returnRange)
			return [start, end];

		return maxMin;
	}
	if(i > 0)
		i--;
	var sum = this[i];
	start = i;
	end = i;
	var maxSum = this[i];
	var maxStart = i;
	var maxEnd = i;
	for(++i; i < this.length; i++){
		var v = this[i];
		if(v > 0){
			if(sum <= 0){
				sum = v;
				start = i;
			}else
				sum += v;
			end = i;
		}else{
			if(sum > maxSum){
				maxSum = sum;
				maxStart = start;
				maxEnd = end;
			}
			for(; i < this.length && this[i] <= 0; i++)
				if(sum > 0)
					sum += this[i];
			if(i < this.length)
				i--;
		}
	}
	if(sum > maxSum){
		maxSum = sum;
		maxStart = start;
		maxEnd = end;
	}
	if(returnRange)
		return [maxStart, maxEnd];
	return maxSum;
};
})();