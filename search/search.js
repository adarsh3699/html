let list = ["aman", "biresh"];
$('#inputBox').on("keyup", function(e){
    let store = e.target.value;  //$('#inputBox').val()
    // const results = list.filter(function(element) {
    //     if(element.includes(store) && store != "") {
    //         return element;
    //     }
    // });
    let html = "";
    for(let i = 0; i<list.length; i++) {
        if (list[i].includes(store) && store != "") {
            html += "<div>" + list[i] + "</div>";
        }
    } 
    $("#data").html(html);
  
    if (e.keyCode === 13 && store != "") {
        //if typed key is enter
        list.push(store);
        $("#inputBox").val("");
        $("#data").html("");
    }
});
//https://api.coindesk.com/v1/bpi/currentprice.json
//https://api.github.com/users/adarsh3699