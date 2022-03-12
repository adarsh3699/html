let toDos = [];
let html = $("#data").html();
$('#inputBox').on("keyup", function(e){
    let store = e.target.value;  //$('#inputBox').val()

    $("#data div").removeClass ('highlight');
    if (store != '') {
        $("#data div:contains(" + store + ")").addClass('highlight');
    }

    if (e.keyCode === 13 && $('#inputBox').val() != "") {
        //if typed key is enter
        toDos.push(store);
        // let html = $("#data").html();
        let i = 0;

        for( ; i < toDos.length - 1; i++) {
        }
        html = "<div>" + toDos[i] + "</div>" + html;
        $("#data").html(html);

        $("#inputBox").val("");
    }
});
