import ShortUniqueId from 'https://cdn.jsdelivr.net/npm/short-unique-id@latest/short_uuid/mod.ts';

export default class URL {
    constructor(urlRepo) {
        this.urlRepo = urlRepo;
        this.uid = new ShortUniqueId();;
    }

    async shorten({
        params,
        response
      }) {
        let url = params.url;

        if (!url) {
            response.status = 400;
            response.body = { msg: "No URL is specified" };
            return;
        }

        let tiny = this.uid();
        await this.urlRepo(tiny, url);

        response.body = {url: tiny};
    }
}
