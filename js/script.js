$(document).ready(function () {

    console.log("hello");
    
//    console.log(weatherDesc);

    weatherApp = {
        $targetArea: $("#weather"),
        weatherApiKey: "",
        localStorageKey: "openWeatherApi",
        //clearDataLocally: "clear",

        getFormData: function () {
            if (weatherApp.weatherApiKey === null || weatherApp.weatherApiKey === "") {
                weatherApp.weatherApiKey = $("#apikey").val();
                weatherApp.weatherApiKey = weatherApp.weatherApiKey.trim();
            weatherApp.saveApiKey();
            }
            
            var zip = $("#zip").val().trim();
            if (zip === null || zip.length < 5 ) {
                weatherApp.$targetArea.html("Enter a valid zip code.");
            } else {
                weatherApp.getWeatherData(zip);
            }

            console.log(apikey);
            console.log(zip);
        },
        
        getWeatherData : function (zipcode)
         {
           var url = "http://api.openweathermap.org/data/2.5/weather?zip=" + zipcode + ",us&appid=" + weatherApp.weatherApiKey + "&units=imperial";  
             $.getJSON(url,function ( data ) {
                 
                 if (data.cod === 200) {
//                     weatherApp.$targetArea.html("Success!");
                     
                      $("#tempDisp").append("Temperature");
                    $("#tempValue").append(Math.round(data.main.temp));
                    $("#lblDes").append(data.weather[0].description);
                     
//                       This is where you would add data to the page
                     
//                     weatherDesc = data.weather[0].description;
//                     console.log(weatherDesc);                     
                     
                 } else {
                 weatherApp.$targetArea.html("Sorry, no weather data available. Try again later.");
                 } 
             }).fail (function(){
                 weatherApp.$targetArea.html("Sorry, no weather data available.  Try again later.");
            
                      
         }) ; 
         },

        loadApiKey: function () {
            if (typeof (localStorage) === 'undefined') {
                weatherApp.$targetArea.html = ("Sorry, local storage is not supported for this browser.");
            } else {
                // Get API Key
                weatherApp.weatherApiKey = localStorage.getItem(weatherApp.localStorageKey);
                if (weatherApp.weatherApiKey === null || weatherApp.weatherApiKey === "") {
                    //weatherApp.$targetArea.html("Sorry, no api key was found.");
                    return false;
                }
                return true;
            }
        },

        saveApiKey: function () {
            if (typeof (localStorage) === 'undefined') {
                weatherApp.$targetArea.html("Sorry");
            } else {
                if (weatherApp.weatherApiKey === null || weatherApp.weatherApiKey === "") {
                    weatherApp.$targetArea.html("Sorry");
                } else {
                    localStorage.setItem(weatherApp.localStorageKey, weatherApp.weatherApiKey);
                    $("#apidiv").attr("class", "hide");
                }
            }
        },
           clearDataLocally: function (){
        if (typeof(localStorage) === 'undefined') {
            targetArea.html = "Sorry, local storage is not supported for this browser.";
        }
        else {
            localStorage.removeItem(localStorageKey);
        }
    }
    }
    
//    var jsStr = JSON.stringify(weatherApp);
//    
//    document.body.HTML = jsStr;
    
    
    $("#submit").click(function () {

        weatherApp.getFormData();
        return false;

    });

    if (weatherApp.loadApiKey()) {
        $("#apidiv").attr("class", "hide");
        
    }
});