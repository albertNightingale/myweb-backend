export function scrapeContentList<T>($: cheerio.Root) {
  // get all ul tags
  const projectList = $("ul").get().map((el) => {
    const children = $(el).children().get();
    if (children.length > 0) {
      const obj = {};
      children.forEach((el) => {
        const text = $(el).text();
        const splitIdx = text.indexOf(": ") + 2;
        const key = text.substring(0, splitIdx - 2);
        const value = text.substring(splitIdx);
        obj[key] = value;
      });
      return obj as T;
    }
  });

  return projectList;
}

export function scrapeHeader($: cheerio.Root) {
  // get all h1 tags
  const titles = $("h1").get().map((el) => $(el).text());
  return titles;
}
