import Page from "./Page"

export default class GoogleMapsPage extends Page {

  // Class selectors for search buttons
  get searchMidpoint() { return $('#searchboxinput')}
  get searchBtn() { return $('#searchbox-searchbutton') }

  // Getters with XPath selectors for buttons
  get directionsBtn() { return $('//*[@id="pane"]/div/div[1]/div/div/div[5]/div[1]/div/button/img') }
  get drivingDirectionsBtn() { return $('//*[@id="omnibox-directions"]/div/div[2]/div/div/div[1]/div[2]/button/div[1]')}
  get addDestinationBtn() { return $('//*[@id="omnibox-directions"]/div/div[3]/button/div[1]/div')}
  get destinationSearchBtn() { return $('//*[@id="directions-searchbox-2"]/button[1]')}

  // Getters with XPath selectors for fields
  get destination() { return $('//*[@id="sb_ifc53"]/input')}
  get startingPoint() { return $('//*[@id="sb_ifc51"]/input')}

  //get selectRoute() { return $('.section-directions-trip-title*=' + route)} // TO-DO Need to fix this!
  get selectRoute() { return $('.section-directions-trip-title*=I-70 W')}

  get finalRoute() { return $('//*[@id="pane"]/div/div[1]/div/div/div[3]/div[2]/div/div[2]/h1[1]/span')}
  get mileage() { return $('//*[@id="pane"]/div/div[1]/div/div/div[3]/div[1]/h1/span[1]/span[2]/span')}
  get travelTimeWithoutTraffic() { return $('//*[@id="pane"]/div/div[1]/div/div/div[3]/div[2]/div/div[3]/span[2]/span')}

  // Button Click Methods
  submitSearch() {
    this.searchBtn.click()
  }

  submitDirections() {
    this.directionsBtn.click()
  }

  submitDrivingDirections() {
    this.drivingDirectionsBtn.click()
  }

  // This works in Chrome, but not Firefox
  submitDestinationSearch() {
    this.destinationSearchBtn.click()
  }

  submitAddDestination() {
    this.addDestinationBtn.click()
  }

  submitRoute(route) {
    this.selectRoute.click()
  }

}
