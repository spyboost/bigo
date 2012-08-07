'use strict';
var CollectionTest = TestCase('collection');
CollectionTest.prototype.testMaxSubSum = function(){
	assertEquals(-1, [-1, -2, -3].maxSubSum());
	assertEquals(0, [0, -1, -2, -3].maxSubSum());
	assertEquals(9, [-1, -2, 5, 0, -3, 7].maxSubSum());
	assertEquals(9, [-1, -2, 5, 0, -3, 7, -1].maxSubSum());
	assertEquals(9, [-1, -2, 5, 0, -3, 7, 0].maxSubSum());
	assertEquals(9, [0, -1, -2, 5, 0, -3, 7, 0].maxSubSum());
	assertEquals(11, [5, 0, -1, -2, 5, 0, -3, 7, 0].maxSubSum());
	assertEquals(11, [5, 0, -1, -2, 5, 0, -3, 7, 0, -11].maxSubSum());
	assertEquals(11, [-11, 5, 0, -1, -2, 5, 0, -3, 7, 0].maxSubSum());
	assertEquals(9, [5, 0, -1, -2, -3, 5, 0, -3, 7, 0].maxSubSum());
};