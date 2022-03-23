// $('#inputBox').on("keyup", function(e){
//     let store = e.target.value;  //$('#inputBox').val()

//     if (e.keyCode === 13) {
//         //if typed key is enter
//         let lisPrevVal = $("#list").html();
//         $("#list").html("<div>" + store + "</div>" + lisPrevVal);

//         $("#list div").on("click", function() {
//             let flag = $(this).hasClass("highlight");
//             if (flag == false) {
//                 $(this).addClass("highlight");
//             } else {
//                 $(this).removeClass("highlight");
//             }
//         });
//         $("#inputBox").val("");
//     }
// });

let toDos = [];
$('#inputBox').on("keyup", function(e){
    let store = e.target.value;  //$('#inputBox').val()

    if (e.keyCode === 13) {
        //if typed key is enter
        toDos.push({ text: store, flag: false });

        let html = "";
        for(let i = 0; i < toDos.length; i++) {
            html = "<div id='" + i + "'>" + toDos[i].text + "</div>" + html;
        }
        $("#list").html(html);

        $("#list div").on("click", function() {
            let id = $(this).attr("id");
            let flag = toDos[id].flag;
            if (flag == false) {
                $(this).addClass("highlight");
            } else {
                $(this).removeClass("highlight");
            }

            toDos[id].flag = !flag;
        });

        $("#inputBox").val("");
    }
});
