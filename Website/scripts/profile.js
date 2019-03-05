window.onload = function() {
	//alert($.session.get("session_key"));
		var session_key = $.session.get("session_key");
		if(session_key==null)
			window.location.href = "index.html";
		else
		{
			API_URL = "https://kj9s4jdg62.execute-api.us-east-2.amazonaws.com/prod/validatesession";
			$.ajax(
			{
				url: API_URL,
				type:"GET",
				contentType: "application/json",
				dataType: "json",
				data: {"session_key":String(session_key)},
				success: function(data)
				{			
						if(data.is_valid)
							{	 valid(data);
							    $("#body").show();
							}
							else
							{
								logout();
							}
							

				} ,
				error: function (jqXHR, status) {
							// error handler
							console.log(jqXHR);
						alert('fail' + status.code);
				}
				}
			);
			
		}
		
};
function valid(data){
	
	$("#username").html(" "+data.user_profile_data.username);
}
function logout()
{
	$.session.remove("session_key");
	window.location.href = "index.html";
}


function search()
{
	search_key=$("#search").val();
	$("#result").html("<br><br><br><br><h1><center>Searching....</center>");
	API_URL = "https://kj9s4jdg62.execute-api.us-east-2.amazonaws.com/prod/searchprofiles";
			$.ajax(
			{
				url: API_URL,
				type:"GET",
				contentType: "application/json",
				dataType: "json",
				data: {"name":String(search_key)},
				success: function(data)
				{			
						
							if(data.count>0){
								$("#result").html("<br><br><br>");
								for(var i =0;i<data.count;i++)
								{user = 	JSON.stringify(data.result[i]);	
								
								$("#result").append("<h4> <b>Username:</b>"+data.result[i].username+" </h4>");
								$("#result").append("<h4> <b>Email Id:</b>"+data.result[i].email+" </h4>");
								$("#result").append("<hr> ")
								}
								 
							}
							else
							{
								$("#result").html("<br><br><br><br><h1><center>No Results Found....</center>")
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


//id = username
// id_search = search