import { test, expect } from '@playwright/test';
import { ExamsPage } from '../pages/exams-page';
import { LoginPage } from '../pages/login-page';
import * as dotenv from 'dotenv';

dotenv.config();

const email = process.env.USER_EMAIL!;
const password = process.env.USER_PASSWORD!;

test('O usuário pode registrar uma nova prova', async ({ page }) => {
    
    const loginPage = new LoginPage(page);
    await loginPage.login(email, password);
    await expect(page).toHaveURL(/.dashboard/);
    await expect(page.getByText('Olá, Pessôa', { exact: false })).toBeVisible();

    const examsPage = new ExamsPage(page);
    await examsPage.cadastrarExam('Prova', 'Matemática', '11111212');
    await expect(page.getByText('Prova cadastrada!', { exact: false })).toBeVisible();
});

test('O usuário pode excluir uma prova existente', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.login(email, password);
    await expect(page).toHaveURL(/.dashboard/);
    await expect(page.getByText('Olá, Pessôa', { exact: false })).toBeVisible();

    const examsPage = new ExamsPage(page);
    await examsPage.excluirExam('Matemática');

    await expect(page.getByText('Prova excluída.', { exact: false })).toBeVisible();
});