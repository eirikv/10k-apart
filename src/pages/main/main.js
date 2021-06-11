const fetch = require('node-fetch');

class Main {
  async render(res) {
    const data = await this.fetchData();
    const weatherData = data.properties.timeseries[0].data;

    const instant = weatherData.instant;
    const nextHour = weatherData.next_1_hours;

    res.render(__dirname + '/main', {
      title: 'Fake Yr.no',
      ...weatherData
    });
  }

  fetchData() {
    return fetch(
      'https://api.met.no/weatherapi/locationforecast/2.0/complete?lat=59.9139&lon=10.7522',
      {
        method: 'GET',
        headers: {
          'User-Agent': 'Firefox/88.0',
        },
      },
    ).then(res => res.json());
  }
}

module.exports = new Main();