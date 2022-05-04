if ($.cookie("userId")) {
    document.location.href = "home.html";
}

$("#form").on("submit", function(e) {
    e.preventDefault();

    let userName = $("#userName").val();
    let password = $("#password").val();

    if(userName !== "" && password !== "") {
        apiCall("http://localhost:3000/api/users?userName=" + userName +"&password="+password, function(resp){
            if(resp.statusCode === 200) {
                const userId = resp?.data[0]?.id;

                $("#msg").text(resp.msg);

                if (userId) {
                    $.cookie("userId", userId);
                    document.location.href = "home.html";
                }
            } else{
                $("#msg").text(resp.msg);
            }
        });
    } else {
        $("#msg").text("Please enter Your Username and Password");
    }
})

$("#signup").on("click", function() {
    let newUserName = $("#newUserName").val();
    let newPassword = $("#newPassword").val();
    let confirmPass = $("#confirmPass").val();
    
    if(newUserName !== "" && newPassword !== "" && confirmPass !== "") {
        if(newPassword === confirmPass) {
            apiCall("http://localhost:3000/api/users", function(resp){
                if(resp.statusCode === 200) {
                    $("#updateMsg").text(resp.msg);
                } else{
                    $("#updateMsg").text(resp.msg);
                }
            }, false , "post", {username: newUserName , password: newPassword});
        } else {
            $("#updateMsg").text("Passwords didn't match. Try again.");
        }
    } else {
        $("#updateMsg").text("Please enter all data.");
    }
})
