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
 * Priority queue based on a priority heap. Performance:
 * <ul>
 * <li>O(log(N)) - for the enquing and dequing methods(<code>offer()</code>, <code>poll()</code>)</li>
 * <li>O(N) - for the <code>remove(element)</code> method</li>
 * <li>constant time - for the retrieval methods(<code>peek()</code>, <code>size()</code>) and the <code>length</code> and <code>size</code> properties</li>
 * </ul>
 * @param {Function} [comparator] the comparator used to compare elements in the queue
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
		var position = size;
		size++;
		if(position)
			siftUp(position, element);
		else
			q[0] = element;
	};

	function siftUp(position, element){
		if (comparator)
			siftUpUsingComparator(position, element);
        else
            siftUpElement(position, element);
	}

	function siftUpElement(position, element){
		var k = position;
		if(element.compareTo)
			while (k > 0) {
	            var parentIndex = (k - 1) >>> 1;
	            var parent = q[parentIndex];
	            if (element.compareTo(parent) >= 0)
	                break;
	            q[k] = parent;
	            k = parentIndex;
	        }
		else
			while (k > 0) {
	            var parentIndex = (k - 1) >>> 1;
	            var parent = q[parentIndex];
	            if (element >= parent)
	                break;
	            q[k] = parent;
	            k = parentIndex;
	        }
        q[k] = element;
	}

	function siftUpUsingComparator(s, element){
		var k = s;
		while(k > 0) {
            var parentIndex = (k - 1) >>> 1;
            var e = q[parentIndex];
            if (comparator(element, e) >= 0)
                break;
            q[k] = e;
            k = parentIndex;
        }
        q[k] = element;
	}

	/**
	 * Retrieves but doesn't remove the head of the queue.
	 * @return the head of the queue, or <code>undefined</code> if the queue is empty
	 */
	this.peek = function(){
		if (size)
			return q[0];
	};

	/**
	 * Retrieves and removes the head of the queue.
	 * @return the head of the queue, or <code>undefined</code> if the queue is empty
	 */
	this.poll = function(){
		if(size){
	        var s = --size;
	        var result = q[0];
	        var element = q[s];
	        q[s] = undefined;
	        if(s)
	            siftDown(0, element);
	        return result;
		}
	};

	function siftDown(i, element){
		if (comparator)
            siftDownUsingComparator(i, element);
        else
            siftDownElement(i, element);
	}

	function siftDownElement(i, element){
		var k = i;
		var half = size >>> 1;
		if(element.compareTo)
	        while (k < half) {
	            var child = (k << 1) + 1;
	            var c = q[child];
	            var right = child + 1;
	            if (right < size && c.compareTo(q[right]) > 0)
	                c = q[child = right];
	            if (element.compareTo(c) <= 0)
	                break;
	            q[k] = c;
	            k = child;
	        }
		else
			while (k < half) {
	            var child = (k << 1) + 1;
	            var c = q[child];
	            var right = child + 1;
	            if (right < size && c > q[right])
	                c = q[child = right];
	            if (element <= c)
	                break;
	            q[k] = c;
	            k = child;
	        }
        q[k] = element;
	}

	function siftDownUsingComparator(i, element){
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
	 * @return <code>true</code> if removed, otherwise <code>false</code>
	 */
	this.remove = function(element){
		var i = q.indexOf(element);
        if (i == -1)
            return false;

        removeAt(i);
        return true;
	};

	function removeAt(i){
		var s = --size;
        if (s == i)
            q[i] = undefined;
        else {
            var moved = q[s];
            q[s] = undefined;
            siftDown(i, moved);
            if (q[i] == moved) {
                siftUp(i, moved);
                if (q[i] != moved)
                    return moved;
            }
        }
	}

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