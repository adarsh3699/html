async function postApiCall(link, body, functionCall) {
    try {
        let apiCallResp = await fetch(link, {
            method: "post",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        const apiJsonResp = await apiCallResp.json();
        functionCall(apiJsonResp);
    } catch (error) {
        $("#load").text(error);
    }
}


$("#login").on("click", function() {
    let userName = $("#userName").val();
    let password = $("#password").val();

    if (userName !== "" && password !== "") {
        postApiCall("http://localhost/html/login/api/userSearch.php", {userName: userName}, function(resp){
            if(resp.statusCode === 200) {
              
                if(resp.data.length !== [].length) {
                    const realPass = resp.data[0].password;

                    if(password == realPass) {
                        $("#msg").text("Logined");
                        $("#login").addClass("disableBtn");
                    } else{
                        $("#msg").text("Incorrect Password");
                    }

                } else {
                    $("#msg").text("User name not fond");
                }

            } else{
                $("#msg").text(resp.msg);
            }
            
        })
    } else {
        $("#msg").text("plz enter ur username and password");
    }
})
