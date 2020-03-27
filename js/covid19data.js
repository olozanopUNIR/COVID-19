var script = document.createElement('script');
script.src = '/jquery-3.4.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);
<script>
var data;
$.ajax({
    type: "GET",
    url: "js-tutorials.com_sample_file.csv",
    dataType: "text",
    success: function(response)
    {
        data = $.csv.toArrays(response);
        generateHtmlTable(data);
    }
});
var data;
$.ajax({
    type: "GET",
    url: "https://datahub.io/core/covid-19/r/time-series-19-covid-combined.csv",
    dataType: "text",
    success: function(response)
    {
        data = $.csv.toArrays(response);
        generateHtmlTable(data);
    }
});



var url;
url="https://www.worldometers.info/coronavirus/";
$.getJSON(url, function(data)){

});</script>