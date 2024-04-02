// import { test, expect } from '@playwright/test';

// test('completePurchaseFlow', async ({ page }) => {

//         const searchIcon = await page.getByTestId('IconLink-Search');
//         const searchBarInput = await page.getByTestId('SearchBar__input');
//         const searchInput1 = 'Huel Instant Meals';
//         const searchInput2 = 'Huel Complete Nutrition Bar';

//         async function acceptCookiesIfPresent(page) {
//             const acceptCookieButton = await page.getByTestId('acceptCookieButton');
//             if (acceptCookieButton && await acceptCookieButton.isVisible()) {
//                 await acceptCookieButton.click();
//                 await page.waitForTimeout(1000); // wait for the animation to complete
//                 const isCookieButtonVisible = await page.isVisible('[data-testid="acceptCookieButton"]');
//                 expect(isCookieButtonVisible).toBe(false);
//             }
//         }

//         async function clickAndAssert(page, role, name) {
//             const button = await page.getByRole(role, { name: name });
//             await button.click();
//         }

//         async function clickAndAssertMultipleTimes(page, role, name, selector, times) {
//             for (let i = 0; i < times; i++) {
//                 await clickAndAssert(page, role, name);
//                 //await page.waitForTimeout(500); // wait for the UI to update
//                 expect(await page.inputValue(selector)).toBe((i + 1).toString());
//             }
//         }

//         async function clickSearchIconAndCheckInput(page) {        
//             await searchIcon.click();
//             expect(await searchBarInput.isVisible()).toBe(true);
//             expect(await searchBarInput.isEnabled()).toBe(true);
//         }

//         await page.goto('https://huel.com/');
//         expect(page.url()).toBe('https://huel.com/');
//         await acceptCookiesIfPresent(page);

//         clickSearchIconAndCheckInput(page)
        
//         await page.getByTestId('SearchBar__input').click();
//         const focusedElement = await page.evaluate(() => document.activeElement.getAttribute('data-testid'));
//         expect(focusedElement).toBe('SearchBar__input');

//         await page.getByTestId('SearchBar__input').fill(searchInput1);
//         const searchBarInputValue1 = await searchBarInput.inputValue();
//         expect(searchBarInputValue1).toBe(searchInput1);

//         await page.getByTestId('SearchBar__input').press('Enter');
//         await page.waitForURL();
//         const expectedUrlSearch1 = 'search?q=' + encodeURIComponent(searchInput1);
//         expect(page.url()).toContain(expectedUrlSearch1);
//         await acceptCookiesIfPresent(page);

//         // After searching for a product
//         const searchSelectionLink1 = page.getByRole('link', { name: searchInput1, exact: true });
//         if (!searchSelectionLink1) {
//             throw new Error(`Product not found: ${searchInput1}`);
//         }
//         await searchSelectionLink1.click();
//         await page.waitForLoadState('networkidle');
//         expect(page.url()).toContain('/build-your-own-bundle');
        
//         await acceptCookiesIfPresent(page);

//         await clickAndAssertMultipleTimes(page, 'button', 'Spicy Indian Curry Increase', '.QuantitySelector__input', 2);
//         await clickAndAssertMultipleTimes(page, 'button', 'Mexican Chili Increase', '.QuantitySelector__input', 2);

//         await page.getByRole('button', { name: 'Continue' }).click();
//         expect(page.url()).toContain('/step-2');
                
//         await page.getByRole('button', { name: 'Continue' }).click();
//         expect(page.url()).toContain('/step-2'); // expect(page.url()).toContain('/cross-sell'); - doesnt appear in headerless version?

        
//         await page.getByRole('button', { name: 'Continue to Cart' }).click();
//         await page.waitForTimeout(3000);
//         expect(page.url()).toContain('/cart');

//         const element = await page.getByText('Huel Instant Meals');
//         expect(await element.isVisible()).toBe(true);


//         clickSearchIconAndCheckInput(page)
        
//         // await page.getByTestId('SearchBar__input').fill(searchInput2);
//         // await page.getByTestId('SearchBar__input').click();
//         // expect(focusedElement).toBe('SearchBar__input');

//         await page.getByTestId('SearchBar__input').fill(searchInput2);
//         const searchBarInputValue2 = await searchBarInput.inputValue();
//         expect(searchBarInputValue2).toBe(searchInput2);

//         await page.getByTestId('SearchBar__input').press('Enter');
//         await page.waitForURL();
//         const expectedUrlSearch2 = 'search?q=' + encodeURIComponent(searchInput2);
//         expect(page.url()).toContain(expectedUrlSearch2);

//         const searchSelectionLink2 = page.getByRole('link', { name: searchInput2, exact: true });
//         if (!searchSelectionLink2) {
//             throw new Error(`Product not found: ${searchInput2}`);
//         }
//         await searchSelectionLink2.click();
//         await page.waitForTimeout(3000)
//         //await page.waitForLoadState('networkidle');
//         expect(page.url()).toContain('huel-bar');
//         //await page.waitForTimeout(3000)
        
      
//         await acceptCookiesIfPresent(page);
//         await clickAndAssertMultipleTimes(page, 'button', 'Chocolate Fudge Brownie Increase', '.QuantitySelector__input', 1);
//         await clickAndAssertMultipleTimes(page, 'button', 'Chocolate Caramel Increase', '.QuantitySelector__input', 1);
//         await clickAndAssertMultipleTimes(page, 'button', 'Dark Chocolate Raspberry Increase', '.QuantitySelector__input', 2);

//         await page.getByRole('button', { name: 'Continue' }).click();
        
//         expect(page.url()).toContain('/step-2');

//          await page.getByRole('button', { name: 'Continue' }).click();
//          expect(page.url()).toContain('/step-2');

//         await page.getByRole('button', { name: 'Continue to Cart' }).click();
//         expect(page.url()).toContain('/cart');
        
//         await page.waitForTimeout(3000)
//         await page.locator('span').filter({ hasText: 'Add Free T-shirt' }).click();
//         expect( await page.locator('h2.is-size-5.has-text-weight-bold').isVisible()).toBe(true);

//         await page.getByText('XL', { exact: true }).click();
//         const xlButton = await page.locator('span.tshirt__size-button[data-size="XL"]');
//         const xlStyleConfirm = await xlButton.getAttribute('style');
//         expect(xlStyleConfirm).toContain('border: 1px solid rgb(11, 11, 11)');

//         await page.locator('.tshirt-modal__black-square').click();
//         const colorButton = await page.locator('span.tshirt__size-button[data-colour="Black"]');
//         const colourStyleConfirm = await colorButton.getAttribute('style');
//         expect(colourStyleConfirm).toContain('border: 1px solid rgb(11, 11, 11)');

//         await page.locator('span').filter({ hasText: '.st0{fill:none;stroke:#0B0B0B;stroke-width:20;stroke-miterlimit:10;} Men\'s' }).locator('#Layer_1').click();
//         const genderStyleButton = await page.locator('span.tshirt-modal__icon[data-gender="Men\'s"]');
//         const genderStyleConfirm = await genderStyleButton.getAttribute('style');
//         expect(genderStyleConfirm).toContain('border: 1px solid rgb(11, 11, 11)');


//         await page.getByRole('button', { name: 'Add Free T-shirt' }).click();
//         expect(page.url()).toContain('/cart');
//         const yourBundleHeader = page.locator('h3:has-text("Your Bundle")');
//         expect(await yourBundleHeader.isVisible()).toBe(true);

//         const itemCountSpan = await page.locator('span.item_count');
//         const itemCount = parseInt(await itemCountSpan.innerText(), 10);
//         expect(itemCount).toBeGreaterThanOrEqual(2);
                
//         await page.getByRole('button', { name: 'Secure Checkout' }).click();
//         //cease test here as it requires legit details to continue
//     }
// );





//import required methods from Playwright
import { test, expect } from '@playwright/test';

//set async function to run the test
test('completePurchaseFlow', async ({ page }) => {

    // Define constants for search inputs to make it possible to amend them for better reusability
    const searchInput1 = 'Huel Instant Meals';
    const searchInput2 = 'Huel Complete Nutrition Bar';
    const searchBarInput = page.getByTestId('SearchBar__input');


    // Define a function to accept cookies if the button is present
    // this function was required multiple times as the headerless version of the site used for testing seemed to throw the banner up at different points through the test
    // so the function was set to first check if the banner had rendered and to action it if it had or carry on if it didn't
    // it would normally show up on the home page or after the first search request but this function just allowed me to handle it wherever
    async function acceptCookiesIfPresent(page) {
        // Try to find the accept cookies button
        const acceptCookieButton = await page.getByTestId('acceptCookieButton');
        // If the button is found and visible, click it and wait for the animation to complete
        if (acceptCookieButton && await acceptCookieButton.isVisible()) {
            await acceptCookieButton.click();
            await page.waitForTimeout(1000);
            // Check if the button is still visible, it should not be
            const isCookieButtonVisible = await page.isVisible('[data-testid="acceptCookieButton"]');
            expect(isCookieButtonVisible).toBe(false);
        }
    }


    // Define a function to click a button and assert it was clicked - made sense to combine this into a function as the bundle building required multiple of these
    // so this just saved some space and again makes it more resuable
    async function clickAndAssert(page, role, name) {
        // Find the button by its role and name
        const button = await page.getByRole(role, { name: name });
        // Click the button
        await button.click();
    }


    // UNUSED FUNCTION 
    // this was supposed to define a function to click a button multiple times and assert it was clicked each time
    // i was unable to get it to work as it seemed to have trouble differentiating between the different value-input-selectors
    // and different methods i used to try and find the relevant one didnt work so this one will have to go back to the drawing board
    async function clickAndAssertMultipleTimes(page, role, name, selector, times) {
        // Click the button the specified number of times
        for (let i = 0; i < times; i++) {
            await clickAndAssert(page, role, name);
            // Check that the input value matches the number of times the button was clicked
            expect(await page.inputValue(selector)).toBe((i + 1).toString());
        }
    }


    // Define a function to click the search icon and check the search bar input
    // Test was going to need multiple clicks on the search icon so this just meant i could handle all that prior to 
    // filling the input
    async function clickSearchIconAndCheckInput(page) {
        // Find the search icon and click it
        const searchIcon = await page.getByTestId('IconLink-Search');
        await searchIcon.click();
        // Find the search bar input and check that it is visible and enabled
        const searchBarInput = await page.getByTestId('SearchBar__input');
        expect(await searchBarInput.isVisible()).toBe(true);
        expect(await searchBarInput.isEnabled()).toBe(true);
    }


    // Continue from selection to cart process      
    async function continueToCart(page) {
        // Click on the button with the name 'Continue' and check if the URL of the page contains '/step-2'.
        await page.getByRole('button', { name: 'Continue' }).click();
        expect(page.url()).toContain('/step-2');
        // repeat step - i couldn't quite figure out this behaviour and i'm not sure if it was something to do
        // with this being the headerless version but on the live site it takes you to the
        // follow up /cross-sell page however that failed each time and when i used timeouts to slow things down and see what was happening
        // the URL remained step-2 even after the click was confirmed. No cross sell page appeared.    
        await page.getByRole('button', { name: 'Continue' }).click();
        expect(page.url()).toContain('/step-2');
        // Click on the button with the name 'Continue to Cart', 
        // wait for 3 seconds (again repeat timeout errors without this and 'waitForSelector' attempts didn't seem to work), 
        // check if the URL of the page contains '/cart'.
        await page.getByRole('button', { name: 'Continue to Cart' }).click();
        expect(page.url()).toContain('/cart');
    }



        // TEST START
        // Go to the website and check that the URL is correct
        await page.goto('https://huel.com/');
        expect(page.url()).toBe('https://huel.com/');
        // Accept cookies if the button is present
        await acceptCookiesIfPresent(page);

        // Click the search icon and check the search bar input
        await clickSearchIconAndCheckInput(page);

        // Fill the search bar with the first search input and check that it was filled correctly
        await page.getByTestId('SearchBar__input').fill(searchInput1);
        const searchBarInputValue1 = await page.getByTestId('SearchBar__input').inputValue();
        expect(searchBarInputValue1).toBe(searchInput1);

        // Press enter to submit the search and check that the URL contains the search query
        await page.getByTestId('SearchBar__input').press('Enter');
        await page.waitForURL();
        const expectedUrlSearch1 = 'search?q=' + encodeURIComponent(searchInput1);
        expect(page.url()).toContain(expectedUrlSearch1);
        
        // Accept cookies if the button is present
        await acceptCookiesIfPresent(page);

        // After searching for a product
        // Get the link element with the role 'link' and name the same as searchInput1 from the page.
        // If the link element is not found, throw an error.
        // Click on the link element and wait for the page to load (had repeated timeout errors without this).
        // Check if the URL of the page contains '/build-your-own-bundle'.
        const searchSelectionLink1 = page.getByRole('link', { name: searchInput1, exact: true });
        if (!searchSelectionLink1) {
            throw new Error(`Product not found: ${searchInput1}`);
        }
        await searchSelectionLink1.click();
        await page.waitForLoadState('networkidle');
        expect(page.url()).toContain('/build-your-own-bundle'); // this also worked with /hot-and-savoury which in hindsight is the more specific option
        
        
        //This was the most common place for the cookies bar to appear if not the home page
        await acceptCookiesIfPresent(page);

        // Click the 'Increase' button for 'Spicy Indian Curry' twice and check that the quantity is correct
        // and then the same for Mexican Chili
        // It would have been better to save the values here as variables back at the top
        await clickAndAssertMultipleTimes(page, 'button', 'Spicy Indian Curry Increase', '.QuantitySelector__input', 2);
        await clickAndAssertMultipleTimes(page, 'button', 'Mexican Chili Increase', '.QuantitySelector__input', 2);


        await continueToCart(page);
        

        // Get the text 'Huel Instant Meals' from the page and check if it is visible in the cart
        const element = await page.getByText('Huel Instant Meals');
        expect(await element.isVisible()).toBe(true);

        // automate search click test
        clickSearchIconAndCheckInput(page)
        
        //Fill the input with the id 'SearchBar__input' with searchInput2 and check if the input value is the same as searchInput2.
        await page.getByTestId('SearchBar__input').fill(searchInput2);
        const searchBarInputValue2 = await searchBarInput.inputValue();
        expect(searchBarInputValue2).toBe(searchInput2);

        // Press 'Enter' on the input with the id 'SearchBar__input', 
        // wait for the URL to load, and check if the URL contains the encoded searchInput2.
        // just a way to verify the search inputs are being utilised as intended
        await page.getByTestId('SearchBar__input').press('Enter');
        await page.waitForURL();
        const expectedUrlSearch2 = 'search?q=' + encodeURIComponent(searchInput2);
        expect(page.url()).toContain(expectedUrlSearch2);


        // Get the link element with the role 'link' and name as searchInput2 from the page.
        // If the link element is not found, throw an error.
        const searchSelectionLink2 = page.getByRole('link', { name: searchInput2, exact: true });
        if (!searchSelectionLink2) {
            throw new Error(`Product not found: ${searchInput2}`);
        }
        await searchSelectionLink2.click();
        await page.waitForTimeout(3000)
        expect(page.url()).toContain('huel-bar');
        // Click on the link element, wait for 3 seconds, 
        // check if the URL of the page contains 'huel-bar'.
        
        
        // just used incase of a repeat
        await acceptCookiesIfPresent(page);

        // much the same case here as with the instant meals bundle - again it would be better to save all the possible flavours as variables or in an object in hindsight
        await clickAndAssertMultipleTimes(page, 'button', 'Chocolate Fudge Brownie Increase', '.QuantitySelector__input', 1);
        await clickAndAssertMultipleTimes(page, 'button', 'Chocolate Caramel Increase', '.QuantitySelector__input', 1);
        await clickAndAssertMultipleTimes(page, 'button', 'Dark Chocolate Raspberry Increase', '.QuantitySelector__input', 2);

        // Again run continue function
        await continueToCart(page);
        
        // this was needed to give the t-shirt modal time to load - again the wait for selector wasn't working here as i would have expected it to
        await page.waitForTimeout(3000)


        // this just handled all the t-shirt option-select logic
        // again there's multiple inputs here i could swap out for vaibles or values in a tshirt-modal object in hindsight
        await page.locator('span').filter({ hasText: 'Add Free T-shirt' }).click();
        expect( await page.locator('h2.is-size-5.has-text-weight-bold').isVisible()).toBe(true);
        // i tested the selection of each option by the change in border style as it was the only thing i could see in the DOM that changed on option choice
        // sizing
        await page.getByText('XL', { exact: true }).click();
        const xlButton = await page.locator('span.tshirt__size-button[data-size="XL"]');
        const xlStyleConfirm = await xlButton.getAttribute('style');
        expect(xlStyleConfirm).toContain('border: 1px solid rgb(11, 11, 11)');
        // colour choice
        await page.locator('.tshirt-modal__black-square').click();
        const colorButton = await page.locator('span.tshirt__size-button[data-colour="Black"]');
        const colourStyleConfirm = await colorButton.getAttribute('style');
        expect(colourStyleConfirm).toContain('border: 1px solid rgb(11, 11, 11)');
        // M-F style choice
        await page.locator('span').filter({ hasText: '.st0{fill:none;stroke:#0B0B0B;stroke-width:20;stroke-miterlimit:10;} Men\'s' }).locator('#Layer_1').click();
        const genderStyleButton = await page.locator('span.tshirt-modal__icon[data-gender="Men\'s"]');
        const genderStyleConfirm = await genderStyleButton.getAttribute('style');
        expect(genderStyleConfirm).toContain('border: 1px solid rgb(11, 11, 11)');


        // confirmation of choices and add to cart
        await page.getByRole('button', { name: 'Add Free T-shirt' }).click();
        expect(page.url()).toContain('/cart');

        //this confirmed it was on the bundle/basket page
        const yourBundleHeader = page.locator('h3:has-text("Your Bundle")');
        expect(await yourBundleHeader.isVisible()).toBe(true);

        //this tested to confirm the number of items in the bundle was greater than 2
        const itemCountSpan = await page.locator('span.item_count');
        const itemCount = parseInt(await itemCountSpan.innerText(), 10);
        expect(itemCount).toBeGreaterThanOrEqual(2);
        
        // confirm progress to checkout
        await page.getByRole('button', { name: 'Secure Checkout' }).click();
        // cease test here as it requires legit details to continue
    }
);
