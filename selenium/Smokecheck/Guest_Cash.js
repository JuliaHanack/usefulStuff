require('chromedriver');
const webdriver = require('selenium-webdriver');
const config = require('../config/global');
const By = webdriver.By;
const driver = new webdriver.Builder()
    .usingServer(config.url.browserstack)
    .withCapabilities(config.capabilities)
    .build();

driver.manage().window().maximize().then(function startTest() {
	driver.get(config.url.live);
	driver.findElement(By.xpath("//*[@data-qa='address-field']")).sendKeys('TEST_DATA');
	driver.findElement(By.xpath("//*[@data-qa='find_restaurants']")).click();
	driver.wait(function() {
        return driver.getTitle()
            .then(function(title) {
                return title === 'Lieferservice in der Nähe | Bequem & sicher Essen bestellen!';
           });
	}, config.globalTimeout)
    .then(function findRestaurant(restaurant) {
        restaurant = driver.findElement(By.xpath("//*[contains(text(), 'TEST_DATA)]"));
        driver.executeScript("arguments[0].scrollIntoView()", restaurant);
        restaurant.click()
    });
    .then(function addItem1() {
        driver.findElement(By.xpath("//*[contains(text(), 'TEST_DATA')]")).click();
        driver.findElement(By.xpath("//*[@data-qa='dish-details-add-cart']")).click();
        driver.findElement(By.className('js-add-item buttons cart-plus')).click();
    })
    .then(function addItem2() {
        driver.findElement(By.xpath("//*[contains(text(), 'TEST_DATA')]")).click();
        driver.findElement(By.xpath("//*[@data-qa='dish-details-add-cart']")).click();
    });
    driver.wait(function cartLoad() {
    var cartCTA = driver.findElement("//*[@data-qa='cart-checkout']");
        driver.findElement(By.className('button action shopping-cart-summary js-normal-checkout loading shopping-cart-banner--notEmpty')).isEnabled()
            .then(function) {
                cartCTA.click();
            };
    driver.wait(function() {
        return driver.getTitle()
            .then(function(title) {
                return title === 'Lieferheld | Online Essen bestellen | Lieferservice Pizza & co';
            });
	}, config.globalTimeout);
	.then(function findNameInput(firstNameLastName) {
        firstNameLastName = driver.findElement(By.xpath("//*[@data-qa='checkout-name']"));
        driver.executeScript("arguments[0].scrollIntoView()", firstNameLastName);
        firstNameLastName.sendKeys('TEST_DATA');
	})
	.then(function enterEmailAndPhone() {
		driver.findElement(By.xpath("//*[@data-qa='checkout-email']")).sendKeys('TEST_DATA');
		driver.findElement(By.xpath("//*[@data-qa='checkout-phone']")).sendKeys('TEST_DATA');
	})
	.then(function selectPayment(paymentMethod) {
        paymentMethod = driver.findElement(By.className('icon-cash'));
        driver.executeScript("arguments[0].scrollIntoView()", paymentMethod);
        driver.sleep(1000);
        paymentMethod.click()
	})
    .then(function() {
   	    driver.findElement(By.xpath("//*[@data-qa='order-confirmation']")).click()
    })
	.then(function() {
		driver.sleep(4000);
			console.log('Order was successful!')
	});
});
driver.quit();
