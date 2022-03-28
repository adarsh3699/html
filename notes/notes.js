var url = document.location.href,
    params = url.split('?')[1].split('&'),
    notes = {}, tmp;
for (var i = 0, l = params.length; i < l; i++) {
        tmp = params[i].split('=');
        notes[tmp[0]] = tmp[1];
}
const myNotesId = notes.id;
console.log(myNotesId);


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

postApiCall("http://localhost/html/notes/api/getNotesById.php", {id: myNotesId}, function(resp) {
    const title = resp.data[0].title;
    const myNotes = resp.data[0].notes;
    $("#title").val(title);
    $("#textArea").text(myNotes);
})


// $("#textArea").each(function () {
//     this.setAttribute("style", "height:" + (this.scrollHeight) + "px;overflow-y:hidden;");
//   }).on("input", function () {
//     this.style.height = "auto";
//     this.style.height = (this.scrollHeight) + "px";
//   });