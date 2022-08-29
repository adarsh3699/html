async function apiCall(link, functionCall) {
    try {
        let resp = await fetch(link);
        const data = await resp.json();
        functionCall(data);
    } catch (error) {
        $("#load").text(error);
    }
}

apiCall("https://api.coindesk.com/v1/bpi/currentprice.json", function(data) {
    $("#load").remove();
    $("#time").text("Time:- " + data?.time?.updated)
  
    const bpi = Object.keys(data.bpi);
    for(let i = 0; i < bpi.length; i++) {
        $("#currBtns").append("<button curr='" + bpi[i] + "'>" + bpi[i] + " currency</button>");
    }
    $("#currBtns button").on("click", function() {
        const curr = $(this).attr("curr"); // $(this).text();
        $("#rate").text(data?.bpi?.[curr]?.rate);
    })
});