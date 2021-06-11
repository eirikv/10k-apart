const fetch = require('node-fetch');

class Main {
  async render(res) {
    const data = await this.fetchData();
    const weatherSymbolCode = data.properties.timeseries[0].data.next_12_hours.summary.symbol_code;
    res.render(__dirname + '/main', {
      title: 'Fake Yr.no',
      weatherSymbolCode: weatherSymbolCode,
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