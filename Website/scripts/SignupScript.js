window.onload = function() {
		if($.session.get("session_key")!=null)
			window.location.href = "profile.html";
		else
		$("#body").show();
};
function check()
{	 
    $.notify({title :"<i>Signing up</i>", timeout:1500});
    var name = $("#name").val();
	var email = $("#email").val();
	var password = $("#pwd1").val();
	var dob= $("#dob").val();
	//person.gender = $("#gender").val();
	API_URL = "https://kj9s4jdg62.execute-api.us-east-2.amazonaws.com/prod/adduser";
$.ajax(
{
    url: API_URL,
    type:"GET",
    contentType: "application/json",
    dataType: "json",
    data: {		
			    "username": name,
				"email": email,
				"password": password,
				"dateofbirth": dob
				//"gender" : gender
			
		}	,
	success: function(data)
	{
				//alert(JSON.stringify(data));
				console.log(typeof data.status);
				if(data.status=="exists")
					alert("Account Already Exists. Try Login In");
				else
					if(data.status=="success")
					{
						alert("Account Created Successfully. Please Sign In");
						window.location.href = "index.html";
					}
	} ,
	error: function (jqXHR, status) {
                 // error handler
                 console.log(jqXHR);
                 alert('fail' + JSON.stringify(status.code));
             }
}
);
}

$(document).ready(function(){
        $("#pwd2").keyup(function(){
             if ($("#pwd1").val() != $("#pwd2").val()) {
                 $("#msg").html("<center>Password do not match </center><br>").css("color","red");
				 $('#submit').prop('disabled', true);
             }else{
                 $("#msg").html("<center>Password matched</center><br>").css("color","green");
				 $('#submit').prop('disabled', false);
            }
      });
});
