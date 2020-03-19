const assert = require('assert')

/*
Page Class //TODO: Move into pageobjects folder and import here
*/
class Page {

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

/*
Google Maps Page Class //TODO: Move into pageobjects folder and import here
*/
class GoogleMapsPage extends Page {

  // Class selectors
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
  get selectRoute() { return $('.section-directions-trip-title*=' + route)}
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

/*
Define Destiatiion, Midpoint, StartingPoint and Route
*/
const destination = "San Francisco, California"
const midpoint = "Denver, Colorado"
const startingPoint = "Philadelphia, Pennsylvania"
const route = "I-70 W"

/*
Define Expected Results
*/
const expectedGoogleMapsTitle = "Google Maps";
const expectedRouteTitle = "Philadelphia, Pennsylvania to San Francisco, California - Google Maps";
const expectedMileage = "2,977 miles";
const expectedTravelTimeWithoutTraffic = "45 h";

/*
Open URL and Check Maps Page Title
*/
page = new GoogleMapsPage()
page.open("http://maps.google.com")

describe('home page', () => {
  it('should have the right title', () => {

    const googleMapsTitle = page.getTitle()
    console.log("Google Maps Page Title: " + googleMapsTitle)

    // Asset Google Maps page title to confirm we are in the right place
    assert.strictEqual(googleMapsTitle, expectedGoogleMapsTitle, "Google Maps page title " + googleMapsTitle + " is NOT correct!")

  })
})

/*
Enter Route and Check Page Title
*/
describe('route page', () => {
  it('should have the right title', () => {

    // Search for midpoint stop
    page.searchMidpoint.setValue(midpoint)
    page.submitSearch()

    // Select directions and submit starting point
    page.submitDirections()
    page.startingPoint.setValue(startingPoint)
    page.submitDrivingDirections()

    // Add final destination
    page.submitAddDestination()

    //
    // After adding support for Firefox, I found it necessary to send unicode for the "Enter" key
    // as follows when typeing the destination. Works for Chrome too
    //
    // page.submitDestinationSearch()
    page.destination.setValue(destination + "\uE007")

    page.submitRoute(route)

    const routeTitle = page.getTitle()
    console.log("Route Page Title: " + routeTitle)

    // Assert page title
    assert.strictEqual(routeTitle, expectedRouteTitle, "Route page title " + routeTitle + " is NOT correct!")

  })
})

/*
Verify Final Route
*/
describe('route page', () => {
  it('should have the correct route', () => {

    const finalRoute = page.finalRoute.getText()
    console.log("Route: " + finalRoute)

    // Asset final route
    assert.strictEqual(finalRoute, route, "Route " + finalRoute + " is NOT correct!")

  })
})

/*
Verify Mileage
*/
describe('route page', () => {
  it('should have the correct mileage', () => {

    const mileage = page.mileage.getText()
    console.log("Mileage: " + mileage)

    // Assert mileage
    assert.strictEqual(mileage, expectedMileage, "Mileage " + mileage + " is NOT correct!")

  })
})

/*
Verify Travel Time
*/
describe('route page', () => {
  it('should have the correct travel time without traffic', () => {

    const travelTimeWithoutTraffic = page.travelTimeWithoutTraffic.getText()
    console.log("Travel Time Without Traffic: " + travelTimeWithoutTraffic)

    // Asset travel time
    assert.strictEqual(travelTimeWithoutTraffic, expectedTravelTimeWithoutTraffic, "Travel Time Without Traffic " + travelTimeWithoutTraffic + " is NOT correct!")

  })
})
