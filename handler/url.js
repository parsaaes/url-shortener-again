import ShortUniqueId from "https://cdn.jsdelivr.net/npm/short-unique-id@latest/short_uuid/mod.ts";
import * as Url from "https://deno.land/x/is_url/mod.ts";

const uid = new ShortUniqueId();

export default class URLHandler {
  constructor(urlRepo) {
    this.urlRepo = urlRepo;
  }

  shorten = async (ctx) => {
    let url = ctx.params.url;
    let base = ctx.request.url.origin + "/";

    if (!url) {
      ctx.response.status = 400;
      ctx.response.body = { msg: "No URL is specified" };
      return;
    }

    if (!Url.isAbsoluteUrl(url)) {
      url = "http://" + url;
    }

    let tiny = uid();

    try {
      await this.urlRepo.save(tiny, url);
    } catch (err) {
      console.error(err);
      ctx.response.status = 500;
      return;
    }

    ctx.response.status = 201;
    ctx.response.body = { url: base + tiny };
  };

  redirect = async (ctx) => {
    let tiny = ctx.params.tiny;
    let result;
    try {
      result = await this.urlRepo.get(tiny);
    } catch (err) {
      console.error(err);
      ctx.response.status = 500;
      return;
    }

    if (!result || !result.rows || result.rows.length < 1) {
      ctx.response.status = 404;
      return;
    }

    ctx.response.redirect(result.rows[0]);
  };
}
