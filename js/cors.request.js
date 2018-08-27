// Create the XHR object.
function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
        // XHR for Chrome/Firefox/Opera/Safari.
        xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined") {
        // XDomainRequest for IE.
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        // CORS not supported.
        xhr = null;
    }
    return xhr;
}


// Make the actual CORS request.
function makeCorsRequestForTable(url, attributes_to_avoid) {
    // This is a sample server that supports CORS.
    // var url = 'http://localhost:3000/daily_assortments';

    var xhr = createCORSRequest('GET', url);
    if (!xhr) {
        alert('CORS not supported');
        return;
    }

    // Response handlers.
    xhr.onload = function () {
        var text = xhr.responseText;
        alert('Response from CORS request to ' + url + ': ' + text);
        var jsonObject = JSON.parse(xhr.response);
        TableFiller(jsonObject, attributes_to_avoid);
    };

    xhr.onerror = function () {
        alert('Woops, there was an error making the request.');
    };

    xhr.send();
}

function TableFiller(jsonListObject, attributes_to_avoid) {
    //var html = '<thead> <tr>';
    alert(attributes_to_avoid);
    /*Object.keys(jsonListObject[0]).forEach(function (key) {
        if (!(attributes_to_avoid.includes(key))) {
            html += '<th scope = "col" >' + key + '</th>';
        }
    })*/
    //html += '</tr> </thead>';
    var html = '<thead> <tr><th scope="col">Store</th><th scope="col">Name</th><th scope="col">In.For.Promo</th><th scope="col">In.Elimination</th><th scope="col">Replenishable</th><th scope="col">Incoming</th><th scope="col">Exiting</th><th scope="col">Changing</th></tr> </thead>'
    html += '<tbody>';
    jsonListObject.forEach(function (jsonObject) {


        //html += '<tbody>';
        Object.keys(jsonObject).forEach(function (key) {
            if (!(attributes_to_avoid.includes(key))) {
                html += '<td>' + jsonObject[key] + '</td>';
            }
        })
        html += '</tr>';
    })
    html += '</tbody>'
    alert(html);
    document.getElementById('sub-cat-table').innerHTML = html;
}
