export default class Page {

  constructor() {
    this.title = ''
  }

  open(path) {
    browser.url(path)
  }

  getTitle() {
    const title = browser.getTitle()
    return title
  }

}
