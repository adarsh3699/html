async function apiCall(link, functionCall) {
    try {
        let resp = await fetch(link);
        const data = await resp.json();
        functionCall(data);
    } catch (error) {
        $("#load").text(error);
    }
}

// let gitApiLink = "https://api.github.com/users/adarsh3699";

// function renderDataFromGit(data) {
//     $("#load").remove();
//     $("#avatar").attr("src", data.avatar_url)
//     $("#name").text(data.name);
//     $("#follow")body.html("<div> followers :- " + data.followers + "</div> <div> following :- " + data.following + "</div>");
// }

// apiCall(gitApiLink, renderDataFromGit);

apiCall("https://api.coindesk.com/v1/bpi/currentprice.json", function(data) {
    $("#load").remove();
    $("#time").text("time:- " + data?.time?.updated)
  
    const bpi = Object.keys(data.bpi);
    for(let i = 0; i < bpi.length; i++) {
        $("#currBtns").append("<button curr='" + bpi[i] + "'>" + bpi[i] + " currency</button>");
    }
    $("#currBtns button").on("click", function() {
        const curr = $(this).attr("curr"); // $(this).text();
        $("#rate").text(data?.bpi?.[curr]?.rate);
    })
});

for (let i = 1; i <= 50; i++) {
    $("#count").append("<div>" + i + "</div>")
}
$("#count div").on("click", function() {
    $(this).nextAll().remove();
});

$(window).on("scroll", function(e) {
    console.log("scroll", this.scrollY)
    if (this.scrollY >= 0) {
        // e.preventDefault();
        // return false;
        window.scrollTo(this.scrollX, 0)
    }
})