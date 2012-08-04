'use strict';

window.bigo = window.bigo || {};
bigo.UF = /**
 * @param {Number} size
 * @returns a new instance of {@link bigo.UF}
 */
function UF(size){
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
	 * @param {Number q
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
