import React, { useState, useEffect } from 'react';

async function apiCall(link, functionCall) {
    try {
        let resp = await fetch(link);
        const data = await resp.json();
        functionCall(data);
    } catch (error) {
        console.log(error);
    }
}

function App() {

    const [data, setData] = useState();
    const [price, setPrice] = useState("");

    useEffect(() => {
        apiCall("https://api.coindesk.com/v1/bpi/currentprice.json", function (data) {
            setData(data)
        })
    }, []);

    function getPrice(currency) {
        if (currency === "USD") {
            setPrice("$ " + data?.bpi?.[currency].rate)
        } else if (currency === "GBP") {
            setPrice("£ " + data?.bpi?.[currency].rate)
        } else if (currency === "EUR") {
            setPrice("€ " + data?.bpi?.[currency].rate)
        } else {
            setPrice(data?.bpi?.[currency].rate)
        }
    }

    return (
        <div className="App">
            <div id="title">{data?.chartName} Prices</div>
            <div id="time"><b>Last Updated:-</b> {data?.time?.updated}</div>
            <div id="buttons">
                {
                    data ?
                        Object.keys(data?.bpi).map(function (item, index) {
                            return (
                                <button onClick={() => getPrice(item)}>{item}</button>
                            )
                        })
                        : null
                }
            </div>
            <div id="price">{price ? price : "Price"}</div>

            <div id='concept'>
                <b>Concept:- </b>
                Get data from the server and render it on the frontend.
            </div>
        </div>
    );
}

export default App;
