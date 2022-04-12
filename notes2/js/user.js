async function apiCall(link, functionCall, isGet ,method, body) {
    try {
        let apiCallResp;

        if (isGet === false) {
            apiCallResp = await fetch(link, {
                
                method: "post",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
        } else {
            apiCallResp = await fetch(link);
        }
       
        const apiJsonResp = await apiCallResp.json();
        functionCall(apiJsonResp);
    } catch (error) {
        $("#load").text(error);
    }

}

$("#login").on("click", function() {
    let userName = $("#userName").val();
    let password = $("#password").val();

    if(userName !== "" && password !== "") {
        apiCall("http://localhost:3000/api/users?userName=" + userName +"&password="+password, function(resp){
            if(resp.statusCode === 200) {
                $("#msg").text(resp.msg);
            } else{
                $("#msg").text(resp.msg);
            }
        });
    } else {
        $("#msg").text("Please enter Your Username and Password");
    }
})