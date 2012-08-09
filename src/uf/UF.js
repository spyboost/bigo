'use strict';
/**
 * @namespace Bigo.
 */
var bigo = bigo || {};
/**
 * The weighted quick-union solution to dynamic connectivity problem. For the given input numbers it finds whether a given pairs of numbers are connected.
 * The connection of two numbers is a equivalence relation, which means:
 * <ul>
 * <li><b>Reflexive</b>: p is connected to p.</li>
 * <li><b>Symmetric</b>: if p is connected to q, then q is connected to p.</li>
 * <li><b>Transitive</b>: if p is connected to q and q is connected to r, then p is connected to r.</li>
 * </ul>
 * @example
 * <code>
 * <pre>
 * var uf = new bigo.UF(1000);
 * uf.union(1,2);
 * uf.union(2,3);
 * uf.union(4,5);
 * uf.union(6,7);
 * uf.union(4,7);
 * uf.union(8,9);
 * uf.union(10,11);
 * assertTrue(uf.connected(1,1)); // reflexive: 1-1
 * assertTrue(uf.connected(1,2));
 * assertTrue(uf.connected(2,1)); // symmetric: 1-2 => 2-1
 *
 * assertTrue(uf.connected(2,3));
 * assertTrue(uf.connected(3,1)); // transitive: 1-2 and 2-3 => 1-3
 * assertTrue(uf.connected(4,5));
 * assertTrue(uf.connected(5,6));
 * assertTrue(uf.connected(6,7));
 * assertTrue(uf.connected(5,7));
 * assertFalse(uf.connected(7,8));
 * assertFalse(uf.connected(9,10));
 * </pre>
 * </code>
 * @param Number size - the number of elements
 * @returns bigo.UF a new instance of {@link bigo.UF}
 * @constructor
 */
bigo.UF = function (size){
	var count = size;
	var id = [];
	for(var i = 0; i < size; i++)
		id[i] = i;
	var sz = [];
	for(var i = 0; i < size; i++)
		sz[i] = 1;

	this.union = /**
	 * @param {Number} p
	 * @param {Number} q
	 */
	function union(p, q){
		var i = find(p);
		var j = find(q);
		if(i != j){
			if(sz[i] < sz[j]){
				id[i] = j;
				sz[j] += sz[i];
			}else{
				id[j] = i;
				sz[i] += sz[j];
			}
			count--;
		}
	};

	function find(p){
		while(p != id[p])
			p = id[p];
		return p;
	}

	this.connected = /**
	 * @param {Number} p
	 * @param {Number} q
	 * @returns {Boolean} <code>true</code> if connected, otherwise <code>false</code>
	 */
	function connected(p, q){
		return find(p) == find(q);
	};

	this.count = /**
	 * @returns {Number} count
	 */
	function count(){
		return count;
	};
};
