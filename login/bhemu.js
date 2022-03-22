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

$("#signup").on("click", function() {
    let newUserName = $("#newUserName").val();
    let newPassword = $("#newPassword").val();
    let confirmPass = $("#confirmPass").val();
    
    if(newPassword == confirmPass) {
        postApiCall("http://localhost/html/login/api/createAcc.php", {userName: newUserName, password: newPassword}, function(resp){
            if(resp.statusCode === 200) {
                $("#updateMsg").text(resp.msg);
            } else{
                $("#updateMsg").text(resp.msg);
            }
        })
    } else {
        $("#updateMsg").text("Passwords didn't match. Try again.");
    }
})