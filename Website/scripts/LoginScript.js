window.onload = function() {
		if($.session.get("session_key")!=null)
			window.location.href = "profile.html";
	    else
	        $("#body").show();
};
function onSubmit()
{
	
    $.notify({title :'<i>Logging In</i>', timeout:1500});
	Url = "https://kj9s4jdg62.execute-api.us-east-2.amazonaws.com/prod/validateaccount";
	send(Url);	//event.preventDefa1ult();
}
function send(url)
{   console.log("send");
	var result;
	var email = $("#email").val();
	var password = $("#password").val();
$.ajax(
{
  url: url,
  type:"GET",
  contentType: "application/json",
  dataType: "json",
  data: {			    
				"email": email,
				"password": password
		},
				
	success: function(data)
	{	//JSON.stringify
				result = data;
				if(!result.is_valid)
					invalid_account();
				else
					valid_account(data);
	} ,
	error: function (jqXHR, status) {
                
                 console.log(jqXHR);
                 alert('fail' + String(status.code));
             }
}
);

}
function invalid_account()
{
	$("#msg").html("<center>Invalid Username/Password Combination</center><br>").css("color","red");
}
function valid_account(data){
	$.session.set("session_key",data.session_id);
	window.location.href = "profile.html";
}
