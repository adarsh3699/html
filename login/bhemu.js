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

        postApiCall("http://localhost/html/login/api/userSearch.php", {userName: userName, password: password}, function(resp){
            if(resp.statusCode === 200) {
                $("#msg").text(resp.msg);
            } else{
                $("#msg").text(resp.msg);
            }
        })
})
