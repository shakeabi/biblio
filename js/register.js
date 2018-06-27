var availability;
var xmlhttp;
if (window.XMLHttpRequest) {
	xmlhttp = new XMLHttpRequest();
}
else{
 	xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
}

function checkUsername(username){

	if(username!=""){
		var url="checkUsernameAvailability.php";
		var parameter = "username="+username;

		xmlhttp.onreadystatechange = function(){
		    if(xmlhttp.readyState==4 && xmlhttp.status==200){
  		    	availability = xmlhttp.responseText;
  		    	availability = availability.trim();
  		    	if(availability == false){
              document.getElementById("u_error").innerHTML = "Username is not available!";
              document.getElementById("u_error").style.background = "red";
  		    	}
  		    	else if(availability == true){
        		    		document.getElementById("u_error").innerHTML = "Username is available!";
                    document.getElementById("u_error").style.background = "#42f46e";
  		    	      }
		    }
		};

		xmlhttp.open('POST',url,true);//true - implies asynchronous request
		xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
		xmlhttp.send(parameter);
	}
}

function usernameFocusOut(){

	if(document.getElementById("u_error").style.background!="red"){
		document.getElementById("u_error").innerHTML = "";
	}
}
