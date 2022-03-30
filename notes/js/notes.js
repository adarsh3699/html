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
        const title = resp.data[0]?.title;
        const myNotes = resp.data[0]?.notes;
        $("#title").val(title);
        $("#textArea").text(myNotes);
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

$("#save").on("click", function() {
    const newNote = $("#textArea").text();
    const newtitle = $("#title").val(); 
    updateNotes(newNote, newtitle)
});

$("#delete").on("click", function() {
    // window.close();
    postApiCall("api/removeNotes.php", {id: myNotesId}, function(resp) {
        if (resp.statusCode == 200) {
            $("#msg").text(resp.msg);
            window.close();
        } else {
            $("#msg").text(resp.msg);
        }
    });
});