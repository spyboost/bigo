UFTest = TestCase('UF');
UFTest.prototype.testUnion = function testUnion(){
	var uf = new bigo.UF(1000);
	uf.union(1, 2);
	uf.union(2,3);
	assertTrue(uf.connected(1, 2));
	assertTrue(uf.connected(2, 1));
	assertTrue(uf.connected(2, 3));
	assertTrue(uf.connected(1, 3));
	assertTrue(uf.connected(3, 1));
	assertFalse(uf.connected(1, 4));
};