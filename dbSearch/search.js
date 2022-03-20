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

$('#inputBox').on("keyup", function(e){
    let value = e.target.value;  //$('#inputBox').val()
    $("#searchResult").html("");
    if (value === "") {
        return;
    }

    let body = {searchText: value};
    postApiCall("http://localhost/html/dbSearch/api/search.php", body, function(resp) {
        if(resp.statusCode === 200) {
            for(let i = 0; i < resp?.data.length; i++) {
                const thisE =  resp?.data[i];
                $("#searchResult").append("<div id='"+ thisE?.id +"' onclick='onSearchResultClick(" + thisE?.id +")'>" + thisE?.text + "</div>")
            }
        } else{
            $("#searchResult").text(resp.msg);
        }
    });

    if (e.keyCode === 13 && value != "") {
        postApiCall("http://localhost/html/dbSearch/api/insertSearch.php", {text: value}, function(resp) {
            if(resp.statusCode === 200) {
                $("#inputBox").val("");
                $("#searchResult").html("");        
            } else{
                $("#searchResult").text(resp.msg)
            }
        });
    }
});

function onSearchResultClick(id) {
    postApiCall("http://localhost/html/dbSearch/api/deleteSearch.php", {id: id}, function(apiResp) {
        if(apiResp.statusCode === 200) {
            $('#' + id).remove();
        } else {
            $("#searchResult").text(resp.msg);
        }
    })
}