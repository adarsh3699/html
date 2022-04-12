async function apiCall(link, functionCall, isGet ,method, body) {
    try {
        let apiCallResp;

        if (isGet === false) {
            apiCallResp = await fetch(link, {
                
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
        } else {
            apiCallResp = await fetch(link);
        }
       
        const apiJsonResp = await apiCallResp.json();
        functionCall(apiJsonResp);
    } catch (error) {
        $("#msg").text(error);
    }
}

console.log($.cookie());

function renderList(data) {
    $("#list").html("");
    for (let i = 0; i < data.length; i++) {
        const id = data[i]?.notesId;
        const notesTitle = data[i]?.notesTitle;
        $("#list").prepend("<div id='" + id +"' onClick='openMyNotes(" + id + ")'> " +notesTitle+" <img src='img/delete.png' onClick='event.stopPropagation(); deleteToDO(" + id + ")'></div>");
    }
}

let myUserId = $.cookie("userId");

function getNotes() {

    if (myUserId){
        apiCall("http://localhost:3000/api/notes?userId="+ myUserId, function(resp) {
            if (resp.statusCode == 200) {
                renderList(resp?.data);
            } else {
                $("#msg").text(resp.msg);
            }
        });
    }
}
getNotes();

function addNotes(notes) {
    apiCall("http://localhost:3000/api/notes?userId="+ myUserId, function(resp) {
        if (resp.statusCode == 200) {
            console.log(resp.msg);
            const id = resp.data.insertId;
            $("#list").prepend("<div id='" + id +"' onClick='openMyNotes(" + id + ")'> " +notes+" <img src='img/delete.png' onClick='event.stopPropagation(); deleteToDO(" + id + ")'></div>");
            // openMyNotes(resp.id);
        } else {
            $("#msg").text(resp.msg);
        }
    }, false, "post", {notesTitle: notes});
}

function deleteToDO(noteId) {
    apiCall("http://localhost:3000/api/notes/"+ noteId, function(resp) {
        if (resp.statusCode === 200) {
            $("#"+noteId).remove();
        } else {
            $("#msg").text(resp.msg);
        }
    }, false, "delete");
}

$("#inputBox").keyup(function(e) {
    let keyValue = (e.target.value).trim();
    
    if (e.keyCode == 13) {
        if (keyValue != "") {
            addNotes(keyValue);
            
        } else {
            $("#msg").text("Enter something");
        }
        $("#inputBox").val("");
    }
});

// function openMyNotes(id) {
//     url = window.location.href + "notes.html?id=" + encodeURIComponent(id);
//     window.open(url, '_blank').focus();
//     // document.location.href = url;
// }

// $("#addButton").on("click", function() {
//     addNotes("addNotes;");
// });

// window.onfocus = function() {
//     getNotes();
// };

// $(document).on("click", function(e){
//     if ($("#msg").text() !== "") {
//         $("#msg").text("");
//     }
// });
