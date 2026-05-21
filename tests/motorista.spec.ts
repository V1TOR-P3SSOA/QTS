import { test, expect } from '@playwright/test';
import { MotoristaPage } from '../pages/motorista-page';
import { LoginPage } from '../pages/login-page';
import * as dotenv from 'dotenv';

dotenv.config();

const email = process.env.USER_EMAIL!;
const password = process.env.USER_PASSWORD!;

test('Usuário pode cadastrar um motorista', async ({ page }) => {
    const loginpage = new LoginPage(page);
    await loginpage.login(email, password);
    await expect(page).toHaveURL(/.dashboard/);

});

