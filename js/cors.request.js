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
function makeCorsRequest() {
    // This is a sample server that supports CORS.
    var url = 'http://localhost:3000/daily_assortments';

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
        TableFiller(jsonObject);
    };

    xhr.onerror = function () {
        alert('Woops, there was an error making the request.');
    };

    xhr.send();
}

function TableFiller(jsonListObject) {
    var html = '<thead> <tr><th scope = "col" > assortment_start_date </th> <th scope = "col" > article_id </th> <th scope = "col" > store_id </th> <th scope = "col" > in_cluster_only_because_of_promotion </th> <th scope = "col" > in_elimination </th> <th scope = "col" > provisioning_start_date </th> <th scope = "col" > replenishment_start_date </th> <th scope = "col" > is_replenishable </th> <th scope = "col" > article_name </th> <th scope = "col" > sub_family_id </th> <th scope = "col" > substitute_article_id </th> <th scope = "col" > sub_category_id </th> <th scope = "col" > is_article_without_price </th> <th scope = "col" > is_orderable_and_loadable </th></tr> </thead>';
    jsonListObject.forEach(function (jsonObject) {
        html += '<tr>';

        html += '<td>' + jsonObject['assortment_start_date'] + '</td>' + '<td>' + jsonObject['article_id'] + '</td>' + '<td>' + jsonObject['store_id'] + '</td>' + '<td>' + jsonObject['in_cluster_only_because_of_promotion'] + '</td>' + '<td>' + jsonObject['in_elimination'] + '</td>' + '<td>' + jsonObject['provisioning_start_date'] + '</td>' + '<td>' + jsonObject['replenishment_start_date'] + '</td>' + '<td>' + jsonObject['is_replenishable'] + '</td>' + '<td>' + jsonObject['article_name'] + '</td>' + '<td>' + jsonObject['sub_family_id'] + '</td>' + '<td>' + jsonObject['substitute_article_id'] + '</td>' + '<td>' + jsonObject['sub_category_id'] + '</td>' + '<td>' + jsonObject['is_article_without_price'] + '</td>' + '<td>' + jsonObject['is_orderable_and_loadable'] + '</td>';

        html += '</tr>';
    })
    alert(html);
    document.getElementById('sub-cat-table').innerHTML = html;
}
