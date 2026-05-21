import { test, expect } from '@playwright/test';
import { BusPage } from '../pages/bus-page';


test('Usuário pode cadastrar um ônibus', async ({ page }) => {

    await expect(page).toHaveURL(/.dashboard/);

});

