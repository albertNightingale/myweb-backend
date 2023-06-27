export function scrapeContentList<T>($: cheerio.Root) {
  // get all ul tags
  const listComponent = $("ul").get().map((el) => {
    const children = $(el).children().get();
    if (children.length > 0) {
      const obj = {};
      children.forEach((el) => {
        const [key, value] = $(el).text().split(": ");
        obj[key] = value;
      });
      return obj as T;
    }
  });

  return listComponent;
}

export function scrapeHeader($: cheerio.Root) {
  // get all h1 tags
  const titles = $("h1").get().map((el) => $(el).text());
  return titles;
}