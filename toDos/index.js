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
        renderList(resp?.data);
    } else {
        console.log(resp.msg);
    }
});

function renderList(data) {
    $("#list").html("");
    for (let i = 0; i< data.length; i++) {
        const id = data?.[i]?.id;
        const toDo = data?.[i]?.toDo;
        const isDone = data?.[i]?.isDone;
        $("#list").append("<div id='" + id +"' onClick='highlight(" + id + "," + isDone + ")'>" + toDo + "</div>");
        if (isDone == 1) {
            $("#" + id).addClass("highlight");
        }
    }
}

$("#inputBox").keyup(function(e) {
    let keyValue = (e.target.value).trim();
    
    if (e.keyCode == 13) {
        if (keyValue != "") {
            apiCall("http://localhost/html/toDos/api/addToDos.php", function(resp) {
                if (resp.statusCode == 200) {
                    const id = resp?.id;
                    $("#list").append("<div id='" + id + "' onClick='highlight(" + id + ", 0)'>" + keyValue + "</div>");
                } else {
                    $("#list").append(resp.msg);
                }
            }, true, {toDo: keyValue});
        } else {
            $("#list").append("enter something");
        }
        $("#inputBox").val("");
    }
});

function highlight(id, isDone) {
    let newIsDone = 0;
    if (isDone === 0) {
        newIsDone = 1;
    }
    
    apiCall("http://localhost/html/toDos/api/updateToDos.php", function(resp) {
        if (resp.statusCode === 200) {
            renderList(resp?.data);
            console.log(resp)
        } else {
            console.log(resp.msg);
        }
    }, true, { id, isDone: newIsDone });
};