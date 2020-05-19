export default class UrlRepo {
  constructor(client) {
    this.client = client;
  }

  save(tiny, url) {
    return this.client.query("INSERT INTO urls VALUES ($1, $2)", tiny, url);
  }
}
