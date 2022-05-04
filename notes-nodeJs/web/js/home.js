if (!$.cookie("userId")) {
    document.location.href = "index.html";
}

let myUserId = $.cookie("userId");

function renderList(data) {
    $("#list").html("");
    for (let i = 0; i < data.length; i++) {
        const id = data[i]?.notesId;
        const notesTitle = data[i]?.notesTitle;
        $("#list").prepend("<div id='" + id +"' onClick='handleNoteClick(" + id + ")'> " +notesTitle+" <img src='img/delete.png' onClick='event.stopPropagation(); handleDeleteNoteClick(" + id + ")'></div>");
    }
}

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

$("#inputBox").keyup(function(e) {
    let keyValue = (e.target.value).trim();
    
    if (e.keyCode == 13) {
        if (keyValue != "") {
            addNotes("", keyValue);
        } else {
            $("#msg").text("Enter something");
        }
        $("#inputBox").val("");
    }
});

function handleAddBtnClick() {
    event.stopPropagation();
    if ($("#option").hasClass("showOption")) {
        $("#option").removeClass("showOption");
    } else {
        $("#option").addClass("showOption");
    }
};

function addNotes(type, notesTitle) {
    event.stopPropagation();

    apiCall("http://localhost:3000/api/notes?userId="+ myUserId, function(resp) {
        if (resp.statusCode == 200) {
            const id = resp.noteId;
            $("#list").prepend("<div id='" + id +"' onClick='handleNoteClick(" + id + ")'> Enter Your Title <img src='img/delete.png' onClick='event.stopPropagation(); handleDeleteNoteClick(" + id + ")'></div>");
            handleNoteClick(id);
        } else {
            $("#msg").text(resp.msg);
        }
    }, false, "post", (type === "todo" ? { notesType: 1, notesTitle: "" }: { notesTitle: notesTitle }));
};

function handleDeleteNoteClick(noteId) {
    apiCall("http://localhost:3000/api/notes/"+ noteId, function(resp) {
        if (resp.statusCode === 200) {
            $("#"+noteId).remove();
        } else {
            $("#msg").text(resp.msg);
        }
    }, false, "delete");
}

function handleNoteClick(id) {
    url = window.location.origin + "/notes/web/notes.html?id=" + id;
    window.open(url, '_blank').focus();
}

$(document).on("click", function(e){
    if ($("#msg").text() !== "") {
        $("#msg").text("");
    }
    if ($("#option").hasClass("showOption")) {
        $("#option").removeClass("showOption");
    }    
});

window.onfocus = function() {
    getNotes();
};