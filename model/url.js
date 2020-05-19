export default class UrlRepo {
  constructor(client) {
    this.client = client;
  }

  save(tiny, url) {
    return this.client.query("INSERT INTO urls VALUES ($1, $2)", tiny, url);
  }

  get(tiny) {
    return this.client.query("SELECT url FROM urls WHERE tiny = $1", tiny);
  }
}
