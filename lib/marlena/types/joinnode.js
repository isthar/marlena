
var ReteNode = require('./retenode');

function JoinNode (){
	this.alphaMemory = null;
	this.tests = []
	this.reteNode = null;
}

JoinNode.prototype = new ReteNode();

module.exports = JoinNode;