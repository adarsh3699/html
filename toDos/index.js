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
    for (let i = 0; i < data.length; i++) {
        renderListElement(data?.[i]);
    }
}

function renderListElement(thisData) {
    const id = thisData?.id;
    const toDo = thisData?.toDo;
    const isDone = thisData?.isDone;
    const title = thisData?.title;

    $("#list").prepend("<div id='" + id +"' onClick='highlight(" + id + "," + isDone + ")' >" + title + "<img src='edit.png'></div>");
    // <button onClick='event.stopPropagation(); deleteToDO(" + id + ")' >Remove</button>
    if (isDone == 1) {
        $("#" + id).addClass("highlight");
    }
}

$("#inputBox").keyup(function(e) {
    let keyValue = (e.target.value).trim();
    
    if (e.keyCode == 13) {
        if (keyValue != "") {
            apiCall("http://localhost/html/toDos/api/addToDos.php", function(resp) {
                if (resp.statusCode == 200) {
                    renderListElement({ id: resp?.id, toDo: keyValue, isDone: 0 });
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
        newIsDone =  1;
    }
    
    apiCall("http://localhost/html/toDos/api/updateToDos.php", function(resp) {
        if (resp.statusCode === 200) {
            renderList(resp?.data);
        } else {
            console.log(resp.msg);
        }
    }, true, { id, isDone: newIsDone });
};

function deleteToDO(id) {
    apiCall("http://localhost/html/toDos/api/removeToDo.php", function(resp) {
        if (resp.statusCode === 200) {
            renderList(resp?.data);
        } else {
            console.log(resp.msg);
        }
    }, true, { id });
};