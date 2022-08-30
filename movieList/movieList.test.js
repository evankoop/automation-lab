const {Builder, Capabilities, By} = require('selenium-webdriver')

require('chromedriver')

const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

beforeEach(async () => {
    await driver.get('http://127.0.0.1:5500/movieList/index.html')
})

afterAll(async () => {
    await driver.quit()
})

test('Delete movie button removes movie', async () => {
    await driver.findElement(By.xpath('//input')).sendKeys('Iron Man')

    await driver.findElement(By.xpath('//button')).click()

    const deleteBtn = await driver.findElement(By.xpath('//button[contains(text(), "x")]'))


    const displayed = deleteBtn.isDisplayed()

    await deleteBtn.click()

    expect(displayed).not.toBe(true)

    await driver.sleep(3000)

})

test('Crossing off a movie crosses a line through title of movie when clicked', async () => {
    await driver.findElement(By.xpath('//input')).sendKeys('Jaws')

    await driver.findElement(By.xpath('//button')).click()

    const crossedBtn = await driver.findElement(By.xpath('//span[contains(text(), "Jaws")]'))

    const displayed = crossedBtn.isDisplayed()

    await crossedBtn.click()

    expect(displayed).toBeTruthy()

    await driver.sleep(3000)

   
})

test('The text "<movie> Deleted!" is shown after delete button is pressed', async () => {
    const deleteText = await driver.findElement(By.xpath('//aside'))

    const displayed = deleteText.isDisplayed()

    expect(displayed).toBeTruthy()
})

