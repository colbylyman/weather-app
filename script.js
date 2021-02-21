document.getElementById("weatherSubmit").addEventListener("click", function(event) {
    event.preventDefault();
    const value = document.getElementById("weatherInput").value;
    if (value === "")
      return;
    console.log(value);

    const url = "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=64bdff041a42762d7b22dd0e010ed39b";
    fetch(url)
      .then(function(response) {
        return response.json();
      }).then(function(json) {
          console.log(json);
          let results = "";
          results += '<h2>Current weather in ' + json.name + "</h2>";
          for (let i=0; i < json.weather.length; i++) {
        results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
          }
          results += '<h2>' + json.main.temp + " &deg;F</h2>";
          results += '<h4>' + "Feels Like: " + json.main.feels_like + '</br>' + "Wind Speed: " + json.wind.speed + '</h4>';
          //results += '<h4>'  + '</h4>';
          results += "<p>"
          for (let i=0; i < json.weather.length; i++) {
        results += json.weather[i].description
        if (i !== json.weather.length - 1)
          results += ", "
          }
          results += "</p>";
          document.getElementById("weatherResults").innerHTML = results;
      });

    const url2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + value + ", US&units=imperial" + "&APPID=64bdff041a42762d7b22dd0e010ed39b";
    fetch(url2)
      .then(function(response) {
        return response.json();
      }).then(function(json) {
        console.log(json);
        let forecast = "";
        document.getElementById("forecastResults").innerHTML = "<h1><u style=\"background-color: #DAFAF9\">Five Day Forecast</u></h2>";
        for (let i=0; i < json.list.length; i++) {
          if (i % 8 == 0) {
            forecast += "<div class=\"headImage\">"
            forecast += "<h2>" + moment(json.list[i].dt_txt).format('MMMM Do YYYY') + "</h2>";
            forecast += "<p>Low: " + json.list[i].main.temp_min + '</br>' + "High: " + json.list[i].main.temp_max + '</br>' + "Humidity: " + json.list[i].main.humidity + '%' + 
              "</p>";
            forecast += "</div>"
            document.getElementById("forecastBox").innerHTML = forecast;
          }
          if (i % 2 == 0) {
            forecast += "<div class=\"image\">"
            forecast += "<h2>" + moment(json.list[i].dt_txt).format('h:mm a') + "</h2>";
            forecast += "<p>Temperature: " + json.list[i].main.temp + "</p>";
            forecast += '<img src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/>';
            forecast += "</div>"
          }
        }
        document.getElementById("forecastBox").innerHTML = forecast;
      });
  });

