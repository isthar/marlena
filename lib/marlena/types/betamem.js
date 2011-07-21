
var ReteNode = require('./retenode');

function BetaMemory(){
		
	this.items = [];
	this.allChildren = [];
	
}

BetaMemory.prototype = new ReteNode();


module.exports = BetaMemory;
