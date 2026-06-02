import { test, expect } from '@playwright/test';
import { BulletinPage } from '../pages/bulletin-page';
import { LoginPage } from '../pages/login-page';
import * as dotenv from 'dotenv';

dotenv.config();

const email = process.env.USER_EMAIL!;
const password = process.env.USER_PASSWORD!;

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(email, password);
    await expect(page).toHaveURL(/.dashboard/);
    await expect(page.getByText('Olá, Pessôa', { exact: false })).toBeVisible();
});

test.describe('Casos Felizes', () => {

    test('O usuário pode registrar uma nova nota', async ({ page }) => {
        const bulletinPage = new BulletinPage(page);
        await bulletinPage.cadastrarNota('8.5', '9.0', 'QUI-Química', '1');
        await expect(page.getByText('Nota cadastrada!', { exact: false })).toBeVisible();
    });

    test('O usuário pode excluir uma nota existente', async ({ page }) => {
        const bulletinPage = new BulletinPage(page);
        await bulletinPage.cadastrarNota('8.5', '9.0', 'QUI-Química', '1');
        await bulletinPage.excluirNota('QUI-Química');
        await expect(page.getByText('Nota excluída!', { exact: false })).toBeVisible();
    }); 
});