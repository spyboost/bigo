'use strict';
var PriorityQueueTest = TestCase('PriorityQueue');
PriorityQueueTest.prototype.testPriorityQueue = function(){
	var pqs = [
       ['comparator', new bigo.collection.PriorityQueue(function(a, b){
    	   	return a < b ? -1 : a == b ? 0 : 1;	})],
	   ['no comparator', new bigo.collection.PriorityQueue()]
    ];
	pqs.forEach(function(testUnit){
		var info = testUnit[0];
		var pq = testUnit[1];
		assertEquals([info, ':', 'initial length'].join(''), 0, pq.length);
		assertEquals([info, ':', 'initial size'].join(''), 0, pq.size);
		pq.offer(1);
		assertEquals([info, ':', 'length'].join(''), 1, pq.length);
		assertEquals([info, ':', 'size'].join(''), 1, pq.size);
		assertEquals([info, ':'].join(''), 1, pq.peek());
		assertEquals([info, ':', 'length'].join(''), 1, pq.length);
		assertEquals([info, ':', 'size'].join(''), 1, pq.size);
		pq.offer(2);
		assertEquals([info, ':','length'].join(''), 2, pq.length);
		assertEquals([info, ':','size'].join(''), 2, pq.size);
		assertEquals([info, ':'].join(''),1, pq.peek());
		assertEquals([info, ':','length'].join(''), 2, pq.length);
		assertEquals([info, ':','size'].join(''), 2, pq.size);
		pq.offer(0);
		assertEquals([info, ':','length'].join(''), 3, pq.length);
		assertEquals([info, ':','size'].join(''), 3, pq.size);
		assertEquals([info, ':'].join(''), 0, pq.peek());
		assertEquals([info, ':','length'].join(''), 3, pq.length);
		assertEquals([info, ':','size'].join(''), 3, pq.size);

		assertEquals([info, ':'].join(''), 0, pq.poll());
		assertEquals([info, ':','length'].join(''), 3, pq.length);
		assertEquals([info, ':','size'].join(''), 2, pq.size);

		assertEquals([info, ':'].join(''), 1, pq.poll());
		assertEquals([info, ':','length'].join(''), 3, pq.length);
		assertEquals([info, ':','size'].join(''), 1, pq.size);

		assertEquals([info, ':'].join(''), 2, pq.poll());
		assertEquals([info, ':','length'].join(''), 3, pq.length);
		assertEquals([info, ':','size'].join(''), 0, pq.size);

		assertUndefined([info, ':'].join(''), pq.poll());
		assertEquals([info, ':','length'].join(''), 3, pq.length);
		assertEquals([info, ':','size'].join(''), 0, pq.size);

		assertUndefined([info, ':'].join(''), pq.peek());
		assertEquals([info, ':','length'].join(''), 3, pq.length);
		assertEquals([info, ':','size'].join(''), 0, pq.size);

		pq.offer(3);
		pq.offer(0);
		pq.offer(7);
		assertEquals([info, ':','length'].join(''), 3, pq.length);
		assertEquals([info, ':','size'].join(''), 3, pq.size);
		pq.offer(2);
		assertEquals([info, ':','length'].join(''), 4, pq.length);
		assertEquals([info, ':','size'].join(''), 4, pq.size);
		assertTrue(pq.remove(7));
		assertEquals([info, ':','length'].join(''), 4, pq.length);
		assertEquals([info, ':','size'].join(''), 3, pq.size);
		assertFalse(pq.remove(7));
		assertEquals([info, ':','length'].join(''), 4, pq.length);
		assertEquals([info, ':','size'].join(''), 3, pq.size);
	});
};
PriorityQueueTest.prototype.testPriorityQueueUsingComareTo = function(){
	var pq = new bigo.collection.PriorityQueue();
	var compareTo = function(other){
		return this.data < other.data ? -1 : this.data == other.data ? 0 : 1;
	};
	var load = [
        {data: 'c'},
        {data: 'a'},
        {data: 'b'},
        {data: 'z'},
        {data: 'y'},
    ].map(function(it){
    	it.compareTo = compareTo;
    	return it;
    });
	load.forEach(function(it){
		pq.offer(it);
	});
	assertEquals(['compareTo', ': ', 'size'].join(''), load.length, pq.size);
	assertEquals(['compareTo', ': ', 'length'].join(''), load.length, pq.length);
	assertSame(['compareTo', ': ', 'peek'].join(''), load[1], pq.peek());
	assertSame(['compareTo', ': ', 'peek'].join(''), load[1], pq.poll());
	assertSame(['compareTo', ': ', 'peek'].join(''), load[2], pq.peek());
	assertSame(['compareTo', ': ', 'peek'].join(''), load[2], pq.poll());
	assertSame(['compareTo', ': ', 'peek'].join(''), load[0], pq.peek());
	assertSame(['compareTo', ': ', 'peek'].join(''), load[0], pq.poll());
	assertSame(['compareTo', ': ', 'peek'].join(''), load[4], pq.peek());
	assertSame(['compareTo', ': ', 'peek'].join(''), load[4], pq.poll());
	assertSame(['compareTo', ': ', 'peek'].join(''), load[3], pq.peek());
	assertSame(['compareTo', ': ', 'peek'].join(''), load[3], pq.poll());
	assertUndefined(['compareTo', ': ', 'peek'].join(''), pq.peek());
	assertUndefined(['compareTo', ': ', 'peek'].join(''), pq.poll());
	assertEquals(['compareTo', ': ', 'size'].join(''), 0, pq.size);
	assertEquals(['compareTo', ': ', 'length'].join(''), load.length, pq.length);
};