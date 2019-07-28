var React = require('react');
var WeatherForm = require('WeatherForm');
var WeatherMessage = require('WeatherMessage');
var openWeatherMap = require('openWeatherMap');
var ErrorModal = require('ErrorModal');

var Weather = React.createClass({
  getInitialState: function() {
    return {
      isLoading: false,
    }
  },
  handleSearch: function (location) {
    var updates = {};
    var that = this;
    this.setState({
      isLoading: true,
      errorMessage: undefined
    });

    updates.location = location;
    openWeatherMap.getTemp(location).then(
      function (temp) {
        updates.temp = temp;
        updates.isLoading = false;
        that.setState(updates);
      },
      function (e) {
        that.setState({
          isLoading: false,
          errorMessage: e.message
        });
      });
    this.setState(updates);
  },
  render: function () {
    var {location, temp, isLoading, errorMessage} = this.state;
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

    function renderError () {
      if (typeof errorMessage === 'string') {
        return (
          <ErrorModal message={errorMessage}/>
        )
      }
    }
    return(
      <div>
        <WeatherForm onSearch={this.handleSearch}/>
        {renderMessage()}
        {renderError()}
      </div>
    )
  }
});

module.exports = Weather;
