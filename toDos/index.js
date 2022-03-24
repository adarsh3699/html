async function apiCall(link, functionCall, isPost, body) {
    try {
        let apiCallResp;
        if (isPost === true) {
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

let i = 0;
apiCall("http://localhost/html/toDos/api/getToDos.php", function(resp) {
    if (resp.statusCode == 200) {
        for( ; i< resp?.data.length; i++) {
            $("#list").append("<div>" + resp.data[i].toDo + "</div>");
            console.log(i);
        }
    } else {
        console.log(resp.msg);
    }
});

$("#inputBox").keyup(function(e) {
    let keyValue = (e.target.value).trim();
    
    if(e.keyCode == 13) {
        if(keyValue != ""){
            apiCall("http://localhost/html/toDos/api/addToDos.php", function(add) {

                if(add.statusCode == 200){
                    $("#list").append("<div>" + keyValue + "</div>");
                } else {
                    $("#list").append(add.msg);
                }

            }, true, {toDo: keyValue});
        } else {
            $("#list").append("enter something");
        }
        $("#inputBox").val("");
    }
});