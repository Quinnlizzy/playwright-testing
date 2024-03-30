//import playwright text/expect
import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    //launch browser, create new page & navigate to Huel website
    await page.goto('https://huel.com/');
    await page.getByTestId('IconLink-Search').click();
    await page.getByTestId('SearchBar__input').fill('huel instant meals');
    await page.getByTestId('SearchBar__input').press('Enter');
    await page.getByRole('link', { name: 'Shop Instant Meal Pouches' }).click();
    await page.getByRole('button', { name: 'Mexican Chili Increase' }).click();
    await page.getByRole('button', { name: 'Mexican Chili Increase' }).click();
    await page.getByRole('button', { name: 'Yellow Coconut Curry Increase' }).click();
    await page.getByRole('button', { name: 'Yellow Coconut Curry Increase' }).click();
    await page.getByRole('button', { name: 'Chick\'n & Mushroom Pasta' }).click();
    await page.locator('#shopify-section-cookie-banner div').nth(4).click();
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByRole('button', { name: 'Continue To Cart' }).click();
    await page.getByTestId('IconLink-Search').click();
    await page.getByTestId('SearchBar__input').click();
    await page.getByTestId('SearchBar__input').fill('coffee caramel');
    await page.getByTestId('SearchBar__input').press('Enter');
    await page.getByTestId('IconLink-Search').click();
    await page.getByTestId('Search').locator('form').click();
    await page.getByTestId('SearchBar__input').fill('coffee caramel bars');
    await page.getByTestId('SearchBar__input').press('Enter');
    await page.getByTestId('IconLink-Search').click();
    await page.getByTestId('SearchBar__input').click();
    await page.getByTestId('SearchBar__input').fill('huel complete nutrition bar');
    await page.getByTestId('SearchBar__input').press('Enter');
    await page.getByRole('link', { name: 'Huel Complete Nutrition Bar', exact: true }).click();
    await page.getByRole('button', { name: 'Dark Chocolate Raspberry' }).click();
    await page.getByRole('button', { name: 'Chocolate Caramel Increase' }).click();
    await page.getByRole('button', { name: 'Chocolate Fudge Brownie' }).click();
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByRole('button', { name: 'Continue To Cart' }).click();
    await page.getByRole('button', { name: 'Edit' }).click();
    await page.getByRole('button', { name: 'Dark Chocolate Raspberry Increase Quantity' }).click();
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByRole('button', { name: 'Continue To Cart' }).click();
    await page.locator('span').filter({ hasText: 'Add Free T-shirt' }).click();
    await page.getByText('XL', { exact: true }).click();
    await page.locator('.tshirt-modal__black-square').click();
    await page.getByText('Men\'s', { exact: true }).click();
    await page.getByRole('button', { name: 'Add Free T-shirt' }).click();
});