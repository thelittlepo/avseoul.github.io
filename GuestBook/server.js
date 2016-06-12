var servi = require('servi');

var app = new servi(true);


var thisIsDB = useDatabase("GuestLogDB");
var counter = 0;
var nullcomment = " ";

serveFiles("public");

route('/comments', getComments);
route('/savecommentA', saveCommentA);
route('/data', sendData);
// route('/savecommentB', saveCommentB);

function getComments(request) {
	console.log("getComments");
	
	thisIsDB.getAll({Q1: 1},gotComments);
	
	function gotComments(allComments) {
	  var toRender = {title: "Comments", allComments: allComments};
	  request.render("guestBook.html",toRender);
	}
}			

function sendData(request) {	
	// print out the fact that a client HTTP request came in to the server:
	console.log("Got a client request, sending them the data.");

	// Return 100 records from the database
	thisIsDB.getAll(100,gotData);    

	function gotData(theData) {
		request.headerType = "text/json";
		request.respond(JSON.stringify(theData));
	}

	// respond to the client request with the latest serial string:
	//request.respond(latestData);
}

function saveCommentA(request) {
	counter++;
	console.log("saveComment01: " + counter);
	console.log("saveComment02: " + request.fields.hiddenInputQ1);
	console.log("saveComment03: " + request.fields.hiddenInputQ2);
	console.log("saveComment04: " + request.fields.hiddenInputQ3);
	console.log("saveComment05: " + request.fields.hiddenInputQ4);
	console.log("saveComment06: " + request.fields.hiddenInputQ6);
    
	thisIsDB.add({Q1: counter,
				Q2: request.fields.hiddenInputQ1,
				Q3: request.fields.hiddenInputQ2,
				Q4: request.fields.hiddenInputQ3,
				Q5: request.fields.hiddenInputQ4,
				Q5B: request.fields.hiddenInputQ4B,
				Q6: request.fields.hiddenInputQ5
                 });
	request.redirect("/comments");
}

// function saveCommentB(request) {
// 	counter++;
// 	console.log("saveComment01: " + counter);
// 	console.log("saveComment02: " + request.fields.nameQ1);
// 	console.log("saveComment03: " + request.fields.hiddenInputQ2);
// 	console.log("saveComment04: " + request.fields.hiddenInputQ3);
// 	console.log("saveComment05: " + request.fields.hiddenInputQ4);
// 	console.log("saveComment06: " + nullcomment);
// 	thisIsDB.add({Q1: counter,
// 								Q2: request.fields.nameQ1,
// 								Q3: request.fields.hiddenInputQ2,
// 								Q4: request.fields.hiddenInputQ3,
// 								Q5: request.fields.hiddenInputQ4,
// 								Q6: nullcomment
// 							});
// 	request.redirect("/comments");
// }



if (typeof run === 'function') {
  app.defaultRoute(run);
}
start();