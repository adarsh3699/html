// function orderNo(no) {
//     console.log("your order no. is " + no);
//     yourOrder();
// }

// function yourOrder() {
    // setTimeout(function () {
    //     console.log("your order is ready");
    // }, "5000");
// }

// for (var i = 1; i <= 5; i++) {
//     orderNo(i);
// }

//-----------------------------------//
// console.log(1 == "1"); //true
// console.log(1 === "1"); //false

//--------------use of this---------------------//
// console.log(this);

// function trying() {
//     console.log(this == global);
// }
// trying();

// var user = {
//     name: "adarsh",
//     fame: function() {
//         console.log("this",this);
//         console.log(this === "user");
//     }
// }
// user.fame();

//----------------prototype-------------------//

// function userName () {
//     this.user1="aman"
//     this.user2="bhemu"
// }
// var aman = new userName();
// userName.prototype.user3 = "kauaa";
// console.log(aman.user3);

var http = require('http');
var fs = require("fs");

function req404(response) {
	response.writeHead(404, { "context-type": "text/plain" })
	response.write("Error code 404")
	response.end();
}

function onRequest(request, response) {
	console.log("a user made a req" + request.url);
	if (request.method == "GET" && request.url == "/") {
		response.writeHead(200, { "context-type": "text/html" })
		fs.createReadStream("./index.html").pipe(response);
	} else {
		req404(response)
	}
}

http.createServer(onRequest).listen(3000);
console.log("server is running");