
var marlena = require('../'),
	fact = marlena.fact,
	when = marlena.when,
	evlEq = marlena.evlEq,
	evlNotEq = marlena.evlNotEq,
	evlNot = marlena.evlNot;


x = x = {
  "page":"1",
  "records": "10",
  "total": "2",
  "rows": [
      {
          "id": 3,
          "cell": [
              3,
              "cell 1",
              "2010-09-29T19:05:32",
              "2010-09-29T20:15:56",
              "hurrf",
              0 
          ] 
      },
      {
          "id": 1,
          "cell": [
              1,
              "teaasdfasdf",
              "2010-09-28T21:49:21",
              "2010-09-28T21:49:21",
              "aefasdfsadf",
              1 
          ] 
      } 
  ]
};



assign_first_seat = function() {
	when ( [
		fact ( "Context", { state: 'START' }, "context" ),
		fact ( "Guest", {}, "guest" ),
		fact ( "Count", {}, "count" ),

	]
	, function ( arg ) {
			console.out ("FIRE: find first seat: " + arg.guest )
			
			guestName = atr.guest.name;
			seating = new Seating( atr.count.value, 1, true, 1, guestName, 1, guestName );
        	marlena.assert ( seating );

			path = new Path ( atr.count.value, 1, guestName );
			marlena.assert ( path );
			marlena.modify ( arg.context, { state: 'ASSIGN_SEATS'} );
	});
};
	

find_seating = function () {
	when( [
		
		fact( "Context", { state: 'ASSIGN_SEATS' }, "context" ),
		fact( "Seating", { pathDone: true }, "seating"),
		fact( "Guest"  , { name: {val:'seating.rightGuestName'} }, "g1"),
		fact( "Guest"  , { hobby: {val:'g1.hobby'} }, "g2"),
		evlNotEq ( {val: 'g2.sex'}, {val: 'g1.sex' } ),
		fact( "Count"  , {}, "count" ),
		evlNot ( fact( "Path", {id: {val:"seating.id"}, guestName: {val:'g2.name'} } ) ),
		evlNot ( fact( "Chosen", {id: {val:"seating.id"}, guestName: {val:"g2.name"}, hobby: {val:"g1.hobby"} } ) ),
			 
	]
	, function ( arg ) {
		marlena.assert ( new Seating ( arg.count.value, 
							arg.seating.id, 
							false,
							arg.seating.rightSeat, 
							arg.seating.rightGuestName,
							arg.seating.rightSeat + 1,
							arg.g2.name ) );
		marlena.assert ( new Path ( arg.count.value, arg.seating.rightSeat + 1, arg.g2.name ) );
		marlena.assert ( new Chosen ( arg.sseating.id, arg.g2.name, arg.g1.hobby ) );
		marlena.modify ( arg.count, { value: arg.count.value + 1 } );
		marlena.modify ( arg.context, { state: 'MAKE_PATH '} );
	});
}

make_path = function () {
	when ([ 
	 	fact ("Context", { state: 'MAKE_PATH' }, "ctx" ),
        fact ("Seating", { pathDone: false, 
        						id: { assignTo: 'seatingId' }, 
        						pid: { assignTo: 'seatingPid' } }, "st" ),
        fact ("Path", { id: {val: 'seatingPid' }, 
        				guestName: { assignTo: 'pathGuestName'}, 
        				seat: { assignTo: 'pathSeat' } }, "path" ),
        evlNot(  fact("Path", { id: {val:'seatingId'}, guestName: { val: "pathGuestName"} }, "p2" ) ),
		]
	, function( arg ) { 
		marlena.assert ( new Path( arg.seatingId, arg.pathSeat, arg.pathGuestName ) );
    });
};

 
path_done = function() {
	when ([
		fact ("Context", { state: 'MAKE_PATH' }, "context"),
		fact ("Seating", { pathDone: false }, "seating" ),
		]
	, function (arg){
			marlena.modify ( arg.seating, {pathDone: true } );
			marlena.modify ( arg.context, {state: 'CHECK_DONE' } );
	});
}; 
 

are_we_done = function (){
	when ( [
		fact ( "Context", { state: 'CHECK_DONE' }, "context" ),
		fact ( "LastSeat", {}, "lastSeat" ),
		fact ( "Seating", { rightSeat: {val:"lastSeat.seat"} }, null )
		]
    ,
    function ( arg ) {
			marlena.modify ( arg.context, {state: 'PRINT_RESULTS'} );
	});
}


continue_this = function() {
	when ([
		fact("Context", { state: 'CHECK_DONE' } , "context" ),
		]
	, function ( arg ) {
		marlena.modify ( arg.context, { state: 'ASSIGN_SEATS'} );
	});
};
	
	
all_done =  function() {
	when([
			"$context := Context()",
			"$context.state == 'PRINT_RESULTS'",
		]
	, function ( arg ) {
		console.log ('all done');
	});
}


//assign_first_seat();
find_seating();
//make_path();
//path_done();
//are_we_done();
//continue_this();
//all_done();
