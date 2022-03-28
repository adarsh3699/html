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

apiCall("http://localhost/html/notes/api/getNotes.php", function(resp) {
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
    const notes = thisData?.notes;
    const isDone = thisData?.isDone;
    const title = thisData?.title;
    $("#list").prepend("<div id='" + id +"' onClick='openMyNotes(" + id + ")'> " +title+" <img src='delete.png' onClick='event.stopPropagation(); deleteToDO(" + id + ")'></div>");
}

$("#inputBox").keyup(function(e) {
    let keyValue = (e.target.value).trim();
    
    if (e.keyCode == 13) {
        if (keyValue != "") {
            apiCall("http://localhost/html/notes/api/addNotes.php", function(resp) {
                if (resp.statusCode == 200) {
                    renderList(resp?.data);
                } else {
                    $("#list").append(resp.msg);
                }
            }, true, {notes: keyValue});
        } else {
            $("#list").append("enter something");
        }
        $("#inputBox").val("");
    }
});

// function highlight(id) {￼￼
//     let newTitle = $("#box"+id).val();
//     console.log($( "#"+id).html() );
//     apiCall("http://localhost/html/notes/api/updateToDos.php", function(resp) {
//         if (resp.statusCode === 200) {
//             renderList(resp?.data);
//         } else {
//             console.log(resp.msg);
//         }
//     }, true, { id, title: newTitle });
// };

function deleteToDO(id) {
    apiCall("http://localhost/html/notes/api/removeNotes.php", function(resp) {
        if (resp.statusCode === 200) {
            renderList(resp?.data);
        } else {
            console.log(resp.msg);
        }
    }, true, { id });
};

function openMyNotes(id) {
    url = window.location.href + '/notes.html?id=' + encodeURIComponent(id);
    document.location.href = url;
}