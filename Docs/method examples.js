// 1. ScrollToElement
        driver.wait(function() {
    		return driver.getTitle().then(function(title) {
        	return title === 'Lieferheld | Online Essen bestellen | Lieferservice Pizza & co';
    		});
		}, 4000)
		.then(function findNameInput(element) {
    		element = driver.findElement(webdriver.By.id('name'));
    		driver.executeScript("arguments[0].scrollIntoView()", element);
    		driver.sleep(300);
    		element.sendKeys('Testi Testi');
			});

// 2. Old flow with new and old address widget
        driver.findElement(webdriver.By.className('street-name js-street-name')).sendKeys('streetName streetNumber')
        .then(function() {
            driver.findElement(webdriver.By.className('zipcode')).sendKeys('zipCode');
            driver.findElement(webdriver.By.className('button js-submit')).click()
            },
        function (err) {
        if (err.name === "NoSuchElementError")
            driver.findElement(webdriver.By.className('js-gis-field')).sendKeys('streetName streenNumber zipCode city');
            driver.findElement(webdriver.By.className('button js-submit')).click()
        });

// 3. Select from dropdown
        driver.findElement(webdriver.By.name('preorder_day')).click();
        driver.findElement(webdriver.By.css("option[value='tomorrow']")).click()

// 4. Get random email
        .then(function randomEmail() {
            var chars = 'abcdefghijklmnopqrstuvwxyz'
            var randomEmail = chars[Math.floor(Math.random()*26)]
                  + Math.random().toString(36).substring(2,11)
                  + '@lhweb.com';
            driver.sleep(2000);
            return driver.findElement(webdriver.By.xpath("//*[@data-qa='register_email']")).sendKeys(randomEmail);
            });

// 5. Get random name and phone
        .then(function getRandomName(){
            var chars = 'abcdefghijklmnopqrstuvwxyz'
            var randomName = chars[Math.floor(Math.random()*26)]
                + Math.random().toString(36).substring(2,8)
                + ' '
                + Math.random().toString(36).substring(2,8)
            driver.findElement(webdriver.By.xpath("//*[@id='name']")).sendKeys(randomName)
        })
        .then(function getRandomPhone(phone) {
            var randomPhone = Math.random().toString().slice(2,14);
            phone = driver.findElement(webdriver.By.name('phone'));
            driver.executeScript("arguments[0].scrollIntoView()", phone)
            phone.sendKeys(randomPhone);
            driver.sleep(500)
            driver.findElement(webdriver.By.className('icon-credit')).click()
        })
