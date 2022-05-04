if (!$.cookie("userId")) {
    document.location.href = "index.html";
}

let myNotesId;
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
    $("#bar, #elementBox").css({"display": "none"});
    $("#error").text("Note not found (404)");
}

let notesType;
let myNotes;
let notesTitle;
let todosData = [];
if (myNotesId) {
    //geting notesElement
    apiCall("http://localhost:3000/api/notesElement?notesId="+ myNotesId, function(resp) {
        if (resp.statusCode == 200) {
            if (resp.data == null) {
                $("#bar, #elementBox").css({"display": "none"});
                $("#error").text("Note not found");
            }
            notesTitle = resp.data[0]?.notesTitle;
            notesType = resp.data[0]?.notesType;
            $("#title").val(notesTitle);
            document.title = notesTitle;

            if (notesType == 0){
                myNotes = resp.data[0]?.element;
                $("#elementBox").html('<textarea id="notesArea" role="textbox" >' + myNotes +'</textarea>').css("margin-bottom", "50px");
            } else if (notesType == 1) {
                renderList(resp?.data);
                todosData = resp?.data;
                $("#background").append('<div id="addTodos" onclick="handleAddToDoBtnClick()">Add ToDos</div>')
            }
        } else {
            $("#msg").text(resp.msg);
        }
    })
}

function renderList(data) {
    $("#elementBox").html('');

    let html = ""
    for (let i = 0 ; i < data.length; i++) {
        const thisElement = data?.[i];
        let isChecked = (thisElement?.isDone == 1 ? "checked" : "");
        let isDoneClass =  (thisElement?.isDone == 1 ? "todosIsDone" : "");
        html += ('<div class="toDosBox"><input type="checkbox" ' + isChecked + ' onclick="handleCheckboxClick('+ i + ', ' + thisElement?.isDone + ')"> <div id="toDosBox-' + i + '" class="todos ' + isDoneClass + '" role="textbox" contenteditable onkeyup="handleToDoChange(' + i + ')"> '+ (thisElement?.element || "") +' </div> <img src="img/cross.png" onclick="handleDeleteToDoBtnClick('+ i +')"> </div>');
    }
    $("#elementBox").html(html);
}

function handleAddToDoBtnClick() {
    todosData.push({ element: "", isDone: 0 });
    renderList(todosData);
}

function handleDeleteToDoBtnClick(id) {
    todosData.splice(id, 1); // 2nd parameter means remove one item only
    renderList(todosData);
}

function handleToDoChange(id) {
    todosData[id].element = $("#toDosBox-" + id).text();
}

function handleCheckboxClick(id, isDone) {
    todosData[id].isDone = (isDone == 1 ? 0: 1);
    renderList(todosData);
}

function handleDeleteBtnClick() {
    event.stopPropagation();
    apiCall("http://localhost:3000/api/notes/"+ myNotesId, function(resp) {
        $("#msg").text(resp.msg);
        window.close();
    }, false, "delete");
}

async function handleSaveBtnClick() {
    event.stopPropagation();

    let newNotesTitle = $("#title").val();
    if (notesTitle != newNotesTitle) {
        //if only note title changes
        await apiCall("http://localhost:3000/api/notes?notesId="+ myNotesId, function(resp) {
        },false, "put", {notesTitle: newNotesTitle} );
    }

    //if todos
    if (notesType == 1) {
        apiCall("http://localhost:3000/api/notesElement/save?notesId="+ myNotesId, function(resp) {
            if (resp.statusCode == 200) {
                $("#msg").text(resp.msg);
            } else {
                $("#msg").text(resp.msg);
            }
        },false, "post", {element: todosData} );
    } else if(notesType == 0) {
        let newMyNotes = $("#notesArea").val();
        if (myNotes != newMyNotes) {
            apiCall("http://localhost:3000/api/notesElement?notesId="+ myNotesId, function(resp) {
                if (resp.statusCode == 200) {
                    $("#msg").text(resp.msg);
                } else {
                    $("#msg").text(resp.msg);
                }
            },false, "put", {element: newMyNotes} );
        }
    }
}

$("#title").keyup(function(e) {    
    if (e.keyCode == 13) {
        $('#title').blur();
    }
});

$(document).on("click", function(e){
    if ($("#msg").text() !== "") {
        $("#msg").text("");
    }
});
