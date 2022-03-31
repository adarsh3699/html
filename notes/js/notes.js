let myNotesId
try {
    var url = document.location.href,
        params = url.split('?')[1].split('&'),
        notes = {}, tmp;
    for (var i = 0, l = params.length; i < l; i++) {
        tmp = params[i].split('=');
        notes[tmp[0]] = tmp[1];
    }
    myNotesId= notes.id;
} catch{
    $("#bar, #notesArea").css({"display": "none"});
    $("#error").text("Note not found (404)");
}

async function postApiCall(link, body, functionCall) {
    try {
        let apiCallResp = await fetch(link, {
            method: "post",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        const apiJsonResp = await apiCallResp.json();
        functionCall(apiJsonResp);
    } catch (error) {
        $("#load").text(error);
    }
}

if (myNotesId) {
    postApiCall("api/getNotesById.php", { id: myNotesId }, function(resp) {
        if (resp.statusCode == 200) {
            $("#title").val(resp.data?.title);
            $("#textArea").text(resp.data?.notes);
            if (resp.data == null) {
                $("#bar, #notesArea").css({"display": "none"});
                $("#error").text("Note not found");
            }
        } else {
            $("#msg").text(resp.msg);
        }
    })
}


function updateNotes(notes, title) {
    const body = { id: myNotesId, notes, title };
    postApiCall("api/updateNotes.php", body , function(resp) {
        if (resp.statusCode == 200) {
            $("#msg").text(resp.msg);
        } else {
            $("#msg").text(resp.msg);
        }
    });
}

$("#title").keyup(function(e) {
    const keyValue = (e.target.value).trim();
    
    if (e.keyCode == 13) {
        if (keyValue != "") {
            const newtitle = $("#title").val();     
            const newNote = $("#textArea").text();

            updateNotes(newNote, newtitle)
            $('#title').blur();
        }
    }
});

$("#save").on("click", function(e) {
    e.stopPropagation();
    const newNote = $("#textArea").text();
    const newtitle = $("#title").val(); 
    updateNotes(newNote, newtitle)
});

$("#delete").on("click", function(e) {
    e.stopPropagation();
    postApiCall("api/removeNotes.php", {id: myNotesId}, function(resp) {
        if (resp.statusCode == 200) {
            $("#msg").text(resp.msg);
            window.close();
        } else {
            $("#msg").text(resp.msg);
        }
    });
});

$(document).on("click", function(e){
    if ($("#msg").text() !== "") {
        $("#msg").text("");
    }
});
