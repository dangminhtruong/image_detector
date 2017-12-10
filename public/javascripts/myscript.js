
    function processImage() {
        // **********************************************
        // *** Update or verify the following values. ***
        // **********************************************

        // Replace the subscriptionKey string value with your valid subscription key.
        var subscriptionKey = "b3812f877c2f468c85e2f378960b1724";

        // Replace or verify the region.
        //
        // You must use the same region in your REST API call as you used to obtain your subscription keys.
        // For example, if you obtained your subscription keys from the westus region, replace
        // "westcentralus" in the URI below with "westus".
        //
        // NOTE: Free trial subscription keys are generated in the westcentralus region, so if you are using
        // a free trial subscription key, you should not need to change this region.
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

    