

var UQCtr = 0;

getUQ = function (){
	return "@id-" + ( UQCtr ++ );
}

Fact = function (typeName, conditions, assignTo){
	this.type = typeName;
	this.conditions = conditions;
	this.assignTo = assignTo;
	
	
	this.strip = function (){
		ret = [];
		
		//typeId = "@" + this.type;
		typeId = getUQ();
		
		ret.push ( { arg1: typeId, op: "TYPE_OF", arg2: this.type } );
		
		
		if ( this.assignTo != null ){
			ret.push ( { arg1: this.assignTo, op: "IS", arg2: typeId } );
		}
			
		
		for ( condIx in conditions ){
			cond = conditions[ condIx ]
			
			//TODO: add conditions
			//TODO: add field assignments
		}
			
		return ret;
		//console.log (ret);
	}
}

Evaluation = function (arg1, arg2, op ){
	this.arg1 = arg1;
	this.arg2 = arg2;
	this.op = op;
	this.strip  = function(){
		
		return { 'arg1': this.arg1, op: this.op, arg2: this.arg2, "DUPA":"CYCKI" }	
	}
}

Negation = function ( arg1 ){
	this.arg1 = arg1;
	this.strip = function (){
		return { NOT: this.arg1 }	
	}	
}

exports.fact = function ( typeName, conditions, assignTo){
	return new Fact( typeName, conditions, assignTo );
}



var constraint_walk = function ( arr , obj ){		
	retConstr = obj.strip();
	for ( ix in retConstr ){
		triple = retConstr[ix];
		if ( typeof triple.strip === 'function' ){
			constraint_walk ( arr, triple );	
		} else {
			arr.push ( triple );
		}
	} 
}

exports.when = function ( constraints , func ){
	arr = [];
	console.log ('---- when: start ----');
	for ( cix in constraints ){
		constraint = constraints[cix]		
		constraint_walk ( arr, constraint );
	}
	
	console.log ( arr ); 
	console.log ('---- when: end ----');
}

exports.evlEq = function  ( ls, rs ){
	return new Evaluation ( ls, rs, "EQ" );
} 

exports.evlNotEq = function  ( ls, rs ){
	return new Evaluation ( ls, rs, "NOT_EQ" );	
}

exports.evlNot = function  ( obj ) {
	return new Negation (obj);	
}