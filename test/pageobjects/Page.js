export default class Page {

  constructor() {
    this.title = ''
  }

  open(path) {
    browser.url(path)
  }

  getTitle() {
    let title = browser.getTitle()
    return title
  }

}
