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
            let value = resp.data[i];
            $("#list").append("<div id='"+value.id+"' onClick='highlight("+value.id+")'>" + value.toDo + "</div>");
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
                    $("#list").append("<div id='"+i+"' onClick='highlight("+i+")'>" + keyValue + "</div>");
                    i++;
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

let isDone = 0;
function highlight(id) {
    if(isDone == 0){
        $("#"+id).addClass("highlight");
        console.log($("#"+id));
        console.log(isDone);
        isDone = 1;
    } else {
        $("#"+id).removeClass("highlight");
        isDone= 0;
    }
};