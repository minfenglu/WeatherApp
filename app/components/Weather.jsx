var React = require('react');
var WeatherForm = require('WeatherForm');
var WeatherMessage = require('WeatherMessage');
var openWeatherMap = require('openWeatherMap');

var Weather = React.createClass({
  getInitialState: function() {
    return {
      isLoading: false,
    }
  },
  handleSearch: function (location) {
    var updates = {};
    var that = this;
    this.setState({isLoading: true});
    updates.location = location;
    openWeatherMap.getTemp(location).then(
      function (temp) {
        updates.temp = temp;
        updates.isLoading = false;
        that.setState(updates);
      },
      function (errorMessage) {
        that.setState({isLoading: false});
        alert(errorMessage);
      });
    this.setState(updates);
  },
  render: function () {
    var {location, temp, isLoading} = this.state;
    function renderMessage () {
      if (isLoading){
        return(
          <h3>Fetching weather...</h3>
        )
      }
      else if (temp && location){
        return(
          <WeatherMessage location={location} temp={temp}/>
        )
      }
    }
    return(
      <div>
        <WeatherForm onSearch={this.handleSearch}/>
        {renderMessage()}
      </div>
    )
  }
});

module.exports = Weather;
