const fetch = require('node-fetch');

const locations = [
  {
    name: 'Oslo, Norge',
    geoData: 'lat=59.9139&lon=10.7522',
  },
  {
    name: 'Stavanger, Norge',
    geoData: 'lat=58.964432&lon=5.726250',
  },
  {
    name: 'Trondheim, Norge',
    geoData: 'lat=63.430515&lon=10.395053',
  },
  {
    name: 'Bergen, Norge',
    geoData: 'lat=60.391262&lon=5.322054',
  },
];

class Main {
  async render(req, res) {
    const location = req.query.location
      ? locations.filter(l => l.name.match(new RegExp(req.query.location, 'gi')))[0]
      : locations[0];

    if (!location) {
      res.status(404).send("Not Found!")
    }

    try {
      const data = await this.fetchData(location);
      const weatherData = data.properties.timeseries[0].data;

      res.render(__dirname + '/main', {
        location,
        ...weatherData
      });
    } catch (e) {
      res.status(500).send("Nothing too see here, move along...")
    }
  }

  fetchData(location) {
    return fetch(
      `https://api.met.no/weatherapi/locationforecast/2.0/complete?${location.geoData}`,
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