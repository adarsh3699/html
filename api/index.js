//https://api.coindesk.com/v1/bpi/currentprice.json
//https://api.github.com/users/adarsh3699

async function apiCall() {
    try {
        let resp = await fetch("https://api.github.com/users/adarsh3699");
        const data = await resp.json();
        $("#avatar").attr("src", data.avatar_url)
        $("#name").text(data.name);
        $("#follow").html("<div> followers :- " + data.followers + "</div> <div> following :- " + data.following + "</div>");

        console.log("data", data.name)
    } catch {
        // return ""; // { error: "Something went wrong" };
    }
}

apiCall();