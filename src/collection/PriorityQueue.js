'use strict';
/**
 * @namespace bigo.
 */
var bigo = bigo || {};

/**
 * @namespace bigo.collection.
 */
bigo.collection = bigo.collection || {};
/**
 * Priority queue based on a priority heap.
 * @param comparator Function the comparator used to compare elements in the queue
 * @constructor
 */
bigo.collection.PriorityQueue = function(comparator){
	var q = [];
	var size = 0;

	/**
	 * Inserts the specified element into the priority queue.
	 * @param element the element to insert
	 */
	this.offer = function(element){
		var s = size;
		size++;
		if(s)
			siftUp(s, element);
		else
			q.push(element);
	};

	function siftUp(s, element){
		var k = s;
		while(k > 0) {
            var parent = (k - 1) >>> 1;
            var e = q[parent];
            if (comparator(element, e) >= 0)
                break;
            q[k] = e;
            k = parent;
        }
        q[k] = element;
	}

	/**
	 * Retrieves but doesn't remove the head of the queue.
	 * @return the head of the queue, or <code>null</code> if the queue is empty
	 */
	this.peek = function(){
		if (size)
			return q[0];
	};

	/**
	 * Retrieves and removes the head of the queue.
	 * @return the head of the queue, or <code>null</code> if the queue is empty
	 */
	this.poll = function(){
		if(size){
	        var s = --size;
	        var result = q[0];
	        var element = q[s];
	        q[s] = null;
	        if(s)
	            siftDown(0, element);
	        return result;
		}
	};

	function siftDown(i, element){
		var k = i;
		var half = size >>> 1;
        while (k < half) {
            var child = (k << 1) + 1;
            var c = q[child];
            var right = child + 1;
            if (right < size && comparator(c, q[right]) > 0)
                c = q[child = right];
            if (comparator(element, c) <= 0)
                break;
            q[k] = c;
            k = child;
        }
        q[k] = element;
	}

	/**
	 * Removes the specified element from the queue.
	 * @param element the element to remove
	 */
	this.remove = function(element){
	};

	Object.defineProperty(this, 'length', {
		get: function(){
			return q.length;
		}
	});
	Object.defineProperty(this, 'size', {
		get: function(){
			return size;
		}
	});
};