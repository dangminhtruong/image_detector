
    function processImage() {
        var subscriptionKey = "b3812f877c2f468c85e2f378960b1724";
        var uriBase = "https://westcentralus.api.cognitive.microsoft.com/vision/v1.0/ocr";

        // Request parameters.
        var params = {
            "language": "unk",
            "detectOrientation ": "true",
        };

        // Display the image.
        var sourceImageUrl = document.getElementById("inputImage").value;
       // document.querySelector("#sourceImage").src = sourceImageUrl;

        // Perform the REST API call.
        $.ajax({
            url: uriBase + "?" + $.param(params),

            // Request headers.
            beforeSend: function(jqXHR){
                jqXHR.setRequestHeader("Content-Type","application/json");
                jqXHR.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
            },

            type: "POST",

            // Request body.
            data: '{"url": ' + '"' + sourceImageUrl + '"}',
        })

        .done(function(qoutes) {
            // Show formatted JSON on webpage.
           // $("#responseTextArea").val(JSON.stringify(qoutes, null, 2));
            let img_src = $('#inputImage').val();
            let obj = qoutes.regions[0].lines;
            let full_qoutes = '';
            let line_pices = [];
            let word_pices = [];
            for(i in obj){
              let line_tmp = '';
              for(j in obj[i].words){
                  full_qoutes += obj[i].words[j].text + ' ';
                  word_pices.push(obj[i].words[j].text);
                  line_tmp += obj[i].words[j].text + ' ';
              }
              line_pices.push(line_tmp);
            }
            /*--------------------------------*/
            let url = "/save-data";
            let data = {
                qoute : {
                    src : img_src,
                    full : full_qoutes,
                    line : line_pices,
                    word : word_pices
                }
            };
            let success = function(){

            };
            let dataType = 'json';
            $.get(url, data, success, dataType);

        })

        .fail(function(jqXHR, textStatus, errorThrown) {
            // Display error message.
            var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
            errorString += (jqXHR.responseText === "") ? "" : (jQuery.parseJSON(jqXHR.responseText).message) ? 
                jQuery.parseJSON(jqXHR.responseText).message : jQuery.parseJSON(jqXHR.responseText).error.message;
            alert(errorString);
        });
    };

    

    function findImage() {
        let subscriptionKey = "b3812f877c2f468c85e2f378960b1724";
        let uriBase = "https://westcentralus.api.cognitive.microsoft.com/vision/v1.0/ocr";
        let params = {
            "language": "unk",
            "detectOrientation ": "true",
        };
        let sourceImageUrl = document.getElementById("inputImage").value;
       // document.querySelector("#sourceImage").src = sourceImageUrl;

        // Perform the REST API call.
        $.ajax({
            url: uriBase + "?" + $.param(params),

            // Request headers.
            beforeSend: function(jqXHR){
                jqXHR.setRequestHeader("Content-Type","application/json");
                jqXHR.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
            },

            type: "POST",

            // Request body.
            data: '{"url": ' + '"' + sourceImageUrl + '"}',
        })

        .done(function(qoutes) {
            // Show formatted JSON on webpage.
           // $("#responseTextArea").val(JSON.stringify(qoutes, null, 2));
            let img_src = $('#inputImage').val();
            let obj = qoutes.regions[0].lines;
            let string = '';
            for(i in obj){
              let line_tmp = '';
              for(j in obj[i].words){
                string += obj[i].words[j].text + ' ';
              }
            }
            /*--------------------------------*/
            let url = "/detect";
            let data = {
                    full : string,
            };
            let success = function(results){
                html = '';
                for(i in results){
                    html += '<div class="col-md-4 img_result">' + 
                                '<img src="'+ results[i].src + '" alt="result" height="250px"/>' +
                            '</div>';
                }
                $('#result_title').html('Search results');
                $('#result_append').html(html);
            };
            let dataType = 'json';
            console.log(string);
            $.get(url, data, success, dataType);

        })

        .fail(function(jqXHR, textStatus, errorThrown) {
            // Display error message.
            var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
            errorString += (jqXHR.responseText === "") ? "" : (jQuery.parseJSON(jqXHR.responseText).message) ? 
                jQuery.parseJSON(jqXHR.responseText).message : jQuery.parseJSON(jqXHR.responseText).error.message;
            alert(errorString);
        });
    };