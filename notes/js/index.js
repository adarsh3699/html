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
function getNotes() {
    apiCall("http://localhost/html/notes/api/getNotes.php", function(resp) {
        if (resp.statusCode == 200) {
            renderList(resp?.data);
        } else {
            $("#msg").text(resp.msg);
        }
    });
}

getNotes();

function renderList(data) {
    $("#list").html("");
    for (let i = 0; i < data.length; i++) {
        const id = data[i]?.id;
        const title = data[i]?.title;
        $("#list").prepend("<div id='" + id +"' onClick='openMyNotes(" + id + ")'> " +title+" <img src='img/delete.png' onClick='event.stopPropagation(); deleteToDO(" + id + ")'></div>");
    }
}

$("#inputBox").keyup(function(e) {
    let keyValue = (e.target.value).trim();
    
    if (e.keyCode == 13) {
        if (keyValue != "") {
            apiCall("http://localhost/html/notes/api/addNotes.php", function(resp) {
                if (resp.statusCode == 200) {
                    renderList(resp?.data);
                    openMyNotes(resp.id);
                } else {
                    $("#msg").text(resp.msg);
                }
            }, true, {notes: keyValue});
        } else {
            $("#msg").text("Enter something");
        }
        $("#inputBox").val("");
    }
});

function deleteToDO(id) {
    apiCall("http://localhost/html/notes/api/removeNotes.php", function(resp) {
        if (resp.statusCode === 200) {
            renderList(resp?.data);
        } else {
            $("#msg").text(resp.msg);
        }
    }, true, { id });
};

function openMyNotes(id) {
    url = window.location.href + "notes.html?id=" + encodeURIComponent(id);
    window.open(url, '_blank').focus();
    // document.location.href = url;
}


window.onfocus = function() {
    getNotes();
};


$(document).on("click", function(e){
    if ($("#msg").text() !== "") {
        $("#msg").text("");
    }
});
