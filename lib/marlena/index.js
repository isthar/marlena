
var Types = require('./types');










function alphaMemoryActivation ( alphaMemory, wmelement ) {
	newItem = new AlphaMemoryItem (alphaMemory, wmelement);
	
	alphaMemory.items.unshift ( newItem);
	wmelement.alphaMemoryItems.unshift ( newItem);

	for ( var ix in alphaMem.successors ){
		child = alphaMem.successors[ix];
		rightActivation ( child , wmelement);
	}
}

function addWMElement ( e ){
        var v1 = e.fileds[0], v2 = e.fileds[1], v3 = e.fileds[2];
        
        alphaMem = hashLookup( v1, v2, v3);
        if ( alphaMem != null ) alphaMemoryActivation( alphaMem, e );

        alphaMem = hashLookup( v1, v2, null);
        if ( alphaMem != null ) alphaMemoryActivation( alphaMem, e );

        alphaMem = hashLookup( v1, null, v3);
        if ( alphaMem != null ) alphaMemoryActivation( alphaMem, e );
        
        alphaMem = hashLookup( v1, null, null);
        if ( alphaMem != null ) alphaMemoryActivation( alphaMem, e );
        
        alphaMem = hashLookup( null, v2, v3);
        if ( alphaMem != null ) alphaMemoryActivation( alphaMem, e );
        
        alphaMem = hashLookup( null, v2, null);
        if ( alphaMem != null ) alphaMemoryActivation( alphaMem, e );
        
        alphaMem = hashLookup( null, null, v3);
        if ( alphaMem != null ) alphaMemoryActivation( alphaMem, e );
        
        alphaMem = hashLookup( null, null, null);
        if ( alphaMem != null ) alphaMemoryActivation( alphaMem, e );
}

function betaMemoryLeftActivation ( betaMemory, token, wmElement ) {
	newToken = new Token( betaMemory, token, wmElement );
	betaMemory.items.unshift ( newToken );
	for ( var ix in betaMemory.children ){
		leftActivation (  betaMemory.children[ix] , newToken );
	}
}

function performJoinTest ( tests, token, wmelement ){
	
	for ( var ix in tests ) {
			thisTest = tests[ix];
			arg1 = wmelement[thisTest]
			wme2 = token[thisTest.conditionNumberOfArg2 ]
	}
	
}




//---

function removeWMElement(){
}

function addProduction(){
}

function removeProduction(){	
}
