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

apiCall("http://localhost/html/toDos/api/getToDos.php", function(resp) {
    if (resp.statusCode == 200) {
        for(let i = 0; i< resp?.data.length; i++) {
            $("#list").append("<div>" + resp.data[i].toDo + "</div>");
        }
    } else {
        console.log(resp.msg);
    }
});

$("#inputBox").keyup(function(e) {
    let keyValue = e.target.value;
    
    if(e.keyCode == 13) {
        apiCall("http://localhost/html/toDos/api/addToDos.php", function(resp) {}, true, {toDo: keyValue}) 
        console.log(keyValue);
        
        $("#inputBox").val("");
    }
});