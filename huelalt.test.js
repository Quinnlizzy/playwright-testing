import { test, expect } from '@playwright/test';

test('completePurchaseFlow', async ({ page }) => {

        const searchIcon = await page.getByTestId('IconLink-Search');
        const searchBarInput = await page.getByTestId('SearchBar__input');
        const searchInput1 = 'Huel Instant Meals';
        const searchInput2 = 'Huel Complete Nutrition Bar';

        async function acceptCookiesIfPresent(page) {
            const acceptCookieButton = await page.getByTestId('acceptCookieButton');
            if (acceptCookieButton && await acceptCookieButton.isVisible()) {
                await acceptCookieButton.click();
                await page.waitForTimeout(1000); // wait for the animation to complete
                const isCookieButtonVisible = await page.isVisible('[data-testid="acceptCookieButton"]');
                expect(isCookieButtonVisible).toBe(false);
            }
        }

        async function clickAndAssert(page, role, name) {
            const button = await page.getByRole(role, { name: name });
            await button.click();
        }

        async function clickAndAssertMultipleTimes(page, role, name, selector, times) {
            for (let i = 0; i < times; i++) {
                await clickAndAssert(page, role, name);
                //await page.waitForTimeout(500); // wait for the UI to update
                expect(await page.inputValue(selector)).toBe((i + 1).toString());
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
        const searchBarInputValue1 = await searchBarInput.inputValue();
        expect(searchBarInputValue1).toBe(searchInput1);

        await page.getByTestId('SearchBar__input').press('Enter');
        await page.waitForURL();
        const expectedUrlSearch1 = 'search?q=' + encodeURIComponent(searchInput1);
        expect(page.url()).toContain(expectedUrlSearch1);
        await acceptCookiesIfPresent(page);

        const searchSelectionLink1 = page.getByRole('link', { name: searchInput1, exact: true });
        await searchSelectionLink1.click();
        await page.waitForLoadState('networkidle');
        expect(page.url()).toContain('/build-your-own-bundle');
        
        await acceptCookiesIfPresent(page);

        await clickAndAssertMultipleTimes(page, 'button', 'Spicy Indian Curry Increase', '.QuantitySelector__input', 2);
        await clickAndAssertMultipleTimes(page, 'button', 'Mexican Chili Increase', '.QuantitySelector__input', 2);

        await page.getByRole('button', { name: 'Continue' }).click();
        expect(page.url()).toContain('/step-2');
                
        await page.getByRole('button', { name: 'Continue' }).click();
        expect(page.url()).toContain('/step-2'); // expect(page.url()).toContain('/cross-sell'); - doesnt appear in headerless version?

        
        await page.getByRole('button', { name: 'Continue to Cart' }).click();
        await page.waitForTimeout(3000);
        expect(page.url()).toContain('/cart');

        const element = await page.getByText('Huel Instant Meals');
        expect(await element.isVisible()).toBe(true);


        await page.getByTestId('IconLink-Search').click();
        expect(await searchBarInput.isVisible()).toBe(true);
        expect(await searchBarInput.isEnabled()).toBe(true);
        
        await page.getByTestId('SearchBar__input').fill(searchInput2);
        await page.getByTestId('SearchBar__input').click();
        expect(focusedElement).toBe('SearchBar__input');

        await page.getByTestId('SearchBar__input').fill(searchInput2);
        const searchBarInputValue2 = await searchBarInput.inputValue();
        expect(searchBarInputValue2).toBe(searchInput2);

        await page.getByTestId('SearchBar__input').press('Enter');
        await page.waitForURL();
        const expectedUrlSearch2 = 'search?q=' + encodeURIComponent(searchInput2);
        expect(page.url()).toContain(expectedUrlSearch2);

        const searchSelectionLink2 = page.getByRole('link', { name: searchInput2, exact: true });

        await searchSelectionLink2.click();
        await page.waitForTimeout(3000)
        //await page.waitForLoadState('networkidle');
        expect(page.url()).toContain('huel-bar');
        //await page.waitForTimeout(3000)
        
      
        await acceptCookiesIfPresent(page);
        await clickAndAssertMultipleTimes(page, 'button', 'Chocolate Fudge Brownie Increase', '.QuantitySelector__input', 1);
        await clickAndAssertMultipleTimes(page, 'button', 'Chocolate Caramel Increase', '.QuantitySelector__input', 1);
        await clickAndAssertMultipleTimes(page, 'button', 'Dark Chocolate Raspberry Increase', '.QuantitySelector__input', 2);

        await page.getByRole('button', { name: 'Continue' }).click();
        expect(page.url()).toContain('/step-2');

        await page.getByRole('button', { name: 'Continue' }).click();
        expect(page.url()).toContain('/step-2');

        await page.getByRole('button', { name: 'Continue to Cart' }).click();
        expect(page.url()).toContain('/cart');

        await page.locator('span').filter({ hasText: 'Add Free T-shirt' }).click();
        expect( await page.locator('h2.is-size-5.has-text-weight-bold').isVisible()).toBe(true);

        await page.getByText('XL', { exact: true }).click();
        const xlButton = await page.locator('span.tshirt__size-button[data-size="XL"]');
        const xlStyleConfirm = await xlButton.getAttribute('style');
        expect(xlStyleConfirm).toContain('border: 1px solid rgb(11, 11, 11)');

        await page.locator('.tshirt-modal__black-square').click();
        const colorButton = await page.locator('span.tshirt__size-button[data-colour="Black"]');
        const colourStyleConfirm = await colorButton.getAttribute('style');
        expect(colourStyleConfirm).toContain('border: 1px solid rgb(11, 11, 11)');

        await page.locator('span').filter({ hasText: '.st0{fill:none;stroke:#0B0B0B;stroke-width:20;stroke-miterlimit:10;} Men\'s' }).locator('#Layer_1').click();
        const genderStyleButton = await page.locator('span.tshirt-modal__icon[data-gender="Men\'s"]');
        const genderStyleConfirm = await genderStyleButton.getAttribute('style');
        expect(genderStyleConfirm).toContain('border: 1px solid rgb(11, 11, 11)');


        await page.getByRole('button', { name: 'Add Free T-shirt' }).click();
        expect(page.url()).toContain('/cart');
        const yourBundleHeader = page.locator('h3:has-text("Your Bundle")');
        expect(await yourBundleHeader.isVisible()).toBe(true);

        const itemCountSpan = await page.locator('span.item_count');
        const itemCount = parseInt(await itemCountSpan.innerText(), 10);
        expect(itemCount).toBeGreaterThanOrEqual(2);
                
        await page.getByRole('button', { name: 'Secure Checkout' }).click();
        //cease test here as it requires legit details to continue
    }
);

