const fetch = require('node-fetch');

class Main {
  constructor() {
    this.fetchData();
  }

  render(res) {
    res.render(__dirname + '/main', {
      title: 'Fake Yr.no',
    });
  }

  async fetchData() {
    const data = await fetch(
      'https://api.met.no/weatherapi/locationforecast/2.0/complete?lat=59.9139&lon=10.7522'
    ).then(res => res.json());

    console.log(data);
    return data;
  }
}

module.exports = new Main();