var url = document.location.href,
    params = url.split('?')[1].split('&'),
    notes = {}, tmp;
for (var i = 0, l = params.length; i < l; i++) {
    tmp = params[i].split('=');
    notes[tmp[0]] = tmp[1];
}
const myNotesId = notes.id;

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

postApiCall("api/getNotesById.php", { id: myNotesId }, function(resp) {
    if (resp.statusCode == 200) {
        const title = resp.data?.title;
        const myNotes = resp.data?.notes;
        $("#title").val(title);
        $("#textArea").text(myNotes);

        for (let i = 0; i<resp.allIds.length; i++) {
            if (resp.allIds[i].id == myNotesId) {
            } else {
                console.log("error");
                $("#bar, #textArea, #msg").css({"display": "none"});
                $("#background").html("<div id='error'>Note not found</div>");
            }
        }
    } else {
        $("#msg").text(resp.msg);
    }
})

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
