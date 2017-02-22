

//Todo for client side
function getName() {
    var person = prompt("Please enter your name");
    if (person) 
     return person; 
}

var socket = io.connect('/start');    
var name = getName();

socket.on('connect', function () {
    socket.emit('adduser', name);
});

socket.on('matchstart', function (data) {
if(data.status){ 
console.log("Match Started !!");
 }
else{ console.log(data.msg) }
});

socket.on('updateusers', function (data) {
  $('#users').empty();
  $.each(data, function (key, value) {
  if(key!=name)
    $('#users').append('<div><a class="_js_user-connected" id='+key+'>' + key + '</div>');

  });
});

// after document loaded
$(document).ready(function(){
	$('#users').on("click","._js_user-connected",function(e){
	if(name==$(e.target).attr("id")) alert("Its you !!"); 
	else
		socket.emit('joinuser',$(e.target).attr("id"));
	});
});
