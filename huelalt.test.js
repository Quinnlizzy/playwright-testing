import { test, expect } from '@playwright/test';

test('completePurchaseFlow', async ({ page }) => {

        const searchIcon = await page.getByTestId('IconLink-Search');
        const searchBarInput = await page.getByTestId('SearchBar__input');
        const searchInput1 = 'Huel Instant Meals';
        
        async function acceptCookiesIfPresent(page) {
            const acceptCookieButton = await page.getByTestId('acceptCookieButton');
            if (acceptCookieButton && await acceptCookieButton.isVisible()) {
                await acceptCookieButton.click();
                await page.waitForTimeout(1000); // wait for the animation to complete
                const isCookieButtonVisible = await page.isVisible('[data-testid="acceptCookieButton"]');
                expect(isCookieButtonVisible).toBe(false);
            }
        }


        await page.goto('https://huel.com/');
        expect(page.url()).toBe('https://huel.com/');
        await acceptCookiesIfPresent(page);

        await searchIcon.click();
        expect(await searchBarInput.isVisible()).toBe(true);
        expect(await searchBarInput.isEnabled()).toBe(true);
        
        await page.getByTestId('SearchBar__input').click();
        const focusedElement = await page.evaluate(() => document.activeElement.getAttribute('data-testid'));
        expect(focusedElement).toBe('SearchBar__input');

        await page.getByTestId('SearchBar__input').fill(searchInput1);
        const searchBarInputValue = await searchBarInput.inputValue();
        expect(searchBarInputValue).toBe(searchInput1);

        await page.getByTestId('SearchBar__input').press('Enter');
        await page.waitForURL();
        const expectedUrlPart = 'search?q=' + encodeURIComponent(searchInput1);
        expect(page.url()).toContain(expectedUrlPart);
        await acceptCookiesIfPresent(page);

        //await page.getByRole('link', { name: 'Huel Instant Meals', exact: true }).click();
        // await page.waitForSelector(`a:has-text("${searchInput1}")`);
        // expect (page.getByRole('link', { name: searchInput1, exact: true }).isVisible());
        // await page.getByRole('link', { name: searchInput1, exact: true }).click();
        // await page.waitForLoadState('networkidle');
        // expect(page.url()).toBe('https://huel.com/products/build-your-own-bundle?mrasn=1158041.1435750.TFBCdNT7#');
        
        const searchSelectionLink = page.getByRole('link', { name: searchInput1, exact: true });
        // await link.isVisible().toBe(true);
        // expect(await link.isEnabled()).toBe(true);
        // console.log(await link.getAttribute('href'));

        await searchSelectionLink.click();
        await page.waitForLoadState('networkidle');
        expect(page.url()).toContain('https://huel.com/products/build-your-own-bundle');
        
        await acceptCookiesIfPresent(page);

        await page.getByRole('button', { name: 'Mexican Chili Increase' }).click();
        await page.getByRole('button', { name: 'Mexican Chili Increase' }).click();
        await page.getByRole('button', { name: 'Spicy Indian Curry Increase' }).click();
        await page.getByRole('button', { name: 'Spicy Indian Curry Increase' }).click();
        await page.getByRole('button', { name: 'Continue' }).click();
        //await page.waitForURL('https://huel.com/products/build-your-own-bundle?mrasn=1158041.1435750.TFBCdNT7#/step-2');
        //worked better without
        await page.getByRole('button', { name: 'Continue' }).click();
        await page.getByRole('button', { name: 'Continue to Cart' }).click();
        await page.getByTestId('IconLink-Search').click();
        await page.getByTestId('SearchBar__input').fill('huel complete nutrition bar');
        //await page.getByTestId('SearchBar__submit-button').click(); //fails on icon click?
        await page.waitForTimeout(2000);
        await page.getByTestId('SearchBar__input').press('Enter');
        await page.waitForTimeout(2000); // Wait for 2 seconds - couldnt get past this step without a timeout?
        await page.getByRole('link', { name: 'Huel Complete Nutrition Bar', exact: true }).click();
        await page.getByRole('button', { name: 'Chocolate Fudge Brownie' }).click();
        await page.getByRole('button', { name: 'Chocolate Fudge Brownie Increase Quantity' }).click();
        await page.getByRole('button', { name: 'Chocolate Caramel Increase' }).click();
        await page.getByRole('button', { name: 'Chocolate Caramel Increase' }).click();
        await page.getByRole('button', { name: 'Dark Chocolate Raspberry' }).click();
        await page.getByRole('button', { name: 'Continue' }).click();
        await page.getByTestId('IconLink-Cart').click();
        await page.locator('span').filter({ hasText: 'Add Free T-shirt' }).click();
        await page.getByText('XL', { exact: true }).click();
        await page.locator('.tshirt-modal__black-square').click();
        await page.locator('span').filter({ hasText: '.st0{fill:none;stroke:#0B0B0B;stroke-width:20;stroke-miterlimit:10;} Men\'s' }).locator('#Layer_1').click();
        await page.getByRole('button', { name: 'Add Free T-shirt' }).click();
        await page.getByRole('button', { name: 'Secure Checkout' }).click();
// } catch (error) {
//     console.error(`Test failed with error: ${error}`);
// }
});





// test('test', async ({ page }) => {
//     //navigate to Huel website
//     await page.goto('https://huel.com/');
//     await page.click('[data-testid="IconLink-Search"]');
//     await page.fill('[data-testid="SearchBar__input"]', 'huel instant meals');
//     await page.press('[data-testid="SearchBar__input"]', 'Enter');
//     await page.waitForSelector('a[href="/products/huel-hot-savoury?_pos=3&_sid=7586e1ea0&_ss=r"]', { state: 'visible'});
//     await page.click('a[href="/products/huel-hot-savoury?_pos=3&_sid=7586e1ea0&_ss=r"]');
//     await page.click('[role="button"][name="Mexican Chili Increase"]');
//     await page.click('[role="button"][name="Mexican Chili Increase"]');
//     await page.click('[role="button"][name="Yellow Coconut Curry Increase"]');
//     await page.click('[role="button"][name="Yellow Coconut Curry Increase"]');
//     await page.click('[role="button"][name="Chick\'n & Mushroom Pasta"]');
//     await page.click('[role="button"][name="Continue"]');
//     await page.click('[role="button"][name="Continue"]');
//     await page.click('[role="button"][name="Continue To Cart"]');
//     await page.click('[data-testid="IconLink-Search"]');
//     await page.click('[data-testid="SearchBar__input"]');
//     await page.fill('[data-testid="SearchBar__input"]', 'huel complete nutrition bar');
//     await page.press('[data-testid="SearchBar__input"]', 'Enter');
//     await page.click('[role="link"][name="Huel Complete Nutrition Bar"]');
//     await page.click('[role="button"][name="Dark Chocolate Raspberry"]');
//     await page.click('[role="button"][name="Chocolate Caramel Increase"]');
//     await page.click('[role="button"][name="Chocolate Fudge Brownie"]');
//     await page.click('[role="button"][name="Continue"]');
//     await page.click('[role="button"][name="Continue"]');
//     await page.click('[role="button"][name="Continue To Cart"]');
//     await page.click('[role="button"][name="Edit"]');
//     await page.click('[role="button"][name="Dark Chocolate Raspberry Increase Quantity"]');
//     await page.click('[role="button"][name="Continue"]');
//     await page.click('[role="button"][name="Continue"]');
//     await page.click('[role="button"][name="Continue To Cart"]');
//     await page.click('span:has-text("Add Free T-shirt")');
//     await page.click('text=XL');
//     await page.click('.tshirt-modal__black-square');
//     await page.click('text=Men\'s');
//     await page.click('[role="button"][name="Add Free T-shirt"]');
// });