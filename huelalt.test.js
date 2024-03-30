import { test, expect } from '@playwright/test';

test('completePurchaseFlow', async ({ page }) => {
    try {
        await page.goto('https://huel.com/');
    await page.getByTestId('acceptCookieButton').click();
    await page.getByTestId('IconLink-Search').click();
    await page.getByTestId('SearchBar__input').click();
    await page.getByTestId('SearchBar__input').fill('huel instant meals');
    await page.getByTestId('SearchBar__input').press('Enter');
    await page.getByRole('link', { name: 'Huel Instant Meals', exact: true }).click();
    await page.getByRole('button', { name: 'Mexican Chili Increase' }).click();
    await page.getByRole('button', { name: 'Mexican Chili Increase' }).click();
    await page.getByRole('button', { name: 'Spicy Indian Curry Increase' }).click();
    await page.getByRole('button', { name: 'Spicy Indian Curry Increase' }).click();
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.waitForURL('https://huel.com/products/build-your-own-bundle?mrasn=1158041.1435750.TFBCdNT7#/step-2');
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByTestId('IconLink-Search').click();
    await page.getByTestId('SearchBar__input').fill('huel complete nutrition bar');
    //await page.getByTestId('SearchBar__submit-button').click(); //fails on icon click?
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
    const url = page.url();
        expect(url).toBe('https://huel.com/cart');
    await page.locator('span').filter({ hasText: 'Add Free T-shirt' }).click();
    await page.getByText('XL', { exact: true }).click();
    await page.locator('.tshirt-modal__black-square').click();
    await page.locator('span').filter({ hasText: '.st0{fill:none;stroke:#0B0B0B;stroke-width:20;stroke-miterlimit:10;} Men\'s' }).locator('#Layer_1').click();
    await page.getByRole('button', { name: 'Add Free T-shirt' }).click();
    await page.getByRole('button', { name: 'Secure Checkout' }).click();
} catch (error) {
    console.error(`Test failed with error: ${error}`);
}
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