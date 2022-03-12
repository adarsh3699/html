$('#inputBox').on("keyup", function(e){
    let store = e.target.value  //$('#inputBox').val()

    if (e.keyCode === 13) {
        //if typed key is enter
        let lisPrevVal = $("#list").html();
        $("#list").html("<div>" + store + "<div/>" + lisPrevVal);

        $("#list div").on("click", function() {
            let flag = $(this).hasClass("highlight");
            if (flag == false) {
                $(this).addClass("highlight");
            } else {
                $(this).removeClass("highlight");
            }
        });
        $("#inputBox").val("");
    }
});
