'use strict';
var PriorityQueueTest = TestCase('PriorityQueue');
PriorityQueueTest.prototype.testPriorityQueue = function(){
	var pq = new bigo.collection.PriorityQueue(function(a, b){
		return a < b ? -1 : a == b ? 0 : 1;
	});

	assertEquals('initial length', 0, pq.length);
	assertEquals('initial size', 0, pq.size);
	pq.offer(1);
	assertEquals('length', 1, pq.length);
	assertEquals('size', 1, pq.size);
	assertEquals(1, pq.peek());
	assertEquals('length', 1, pq.length);
	assertEquals('size', 1, pq.size);
	pq.offer(2);
	assertEquals('length', 2, pq.length);
	assertEquals('size', 2, pq.size);
	assertEquals(1, pq.peek());
	assertEquals('length', 2, pq.length);
	assertEquals('size', 2, pq.size);
	pq.offer(0);
	assertEquals('length', 3, pq.length);
	assertEquals('size', 3, pq.size);
	assertEquals(0, pq.peek());
	assertEquals('length', 3, pq.length);
	assertEquals('size', 3, pq.size);

	assertEquals(0, pq.poll());
	assertEquals('length', 3, pq.length);
	assertEquals('size', 2, pq.size);

	assertEquals(1, pq.poll());
	assertEquals('length', 3, pq.length);
	assertEquals('size', 1, pq.size);

	assertEquals(2, pq.poll());
	assertEquals('length', 3, pq.length);
	assertEquals('size', 0, pq.size);

	assertEquals(null, pq.poll());
	assertEquals('length', 3, pq.length);
	assertEquals('size', 0, pq.size);

	assertEquals(null, pq.peek());
	assertEquals('length', 3, pq.length);
	assertEquals('size', 0, pq.size);

	pq.offer(3);
	pq.offer(0);
	pq.offer(7);
	assertEquals('length', 3, pq.length);
	assertEquals('size', 3, pq.size);
	pq.offer(2);
	assertEquals('length', 4, pq.length);
	assertEquals('size', 4, pq.size);
	assertTrue(pq.remove(7));
	assertEquals('length', 4, pq.length);
	assertEquals('size', 3, pq.size);
	assertFalse(pq.remove(7));
	assertEquals('length', 4, pq.length);
	assertEquals('size', 3, pq.size);
};