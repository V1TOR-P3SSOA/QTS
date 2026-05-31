import { test, expect } from '@playwright/test';
import { ExamsPage } from '../pages/exams-page';
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

    test('O usuário pode registrar uma nova prova', async ({ page }) => {
        const examsPage = new ExamsPage(page);
        await examsPage.cadastrarExam('Prova', 'Matemática');
        await expect(page.getByText('Prova cadastrada!', { exact: false })).toBeVisible();
    });

    test('O usuário pode excluir uma prova existente', async ({ page }) => {
        const examsPage = new ExamsPage(page);
        await examsPage.cadastrarExam('Prova', 'Matemática');
        await examsPage.excluirExam('Matemática');
        await expect(page.getByText('Prova excluída.', { exact: false })).toBeVisible();
    });

});

test.describe('Casos Tristes', () => {

    test('O usuário não pode cadastrar uma prova sem preencher o campo de matéria', async ({ page }) => {
        const examsPage = new ExamsPage(page);
        await examsPage.cadastrarExam('Prova', '');
        await expect(page.getByText('Informe uma matéria sem caracteres especiais (máx 40).')).toBeVisible();
    });

    test('O usuário não pode editar uma prova sem preencher o campo de matéria', async ({ page }) => {
        const examsPage = new ExamsPage(page);
        await examsPage.cadastrarExam('Prova', 'Matemática');
        await examsPage.editarExam('Matemática', '');
        await expect(page.getByText('Informe uma matéria sem caracteres especiais (máx 40).')).toBeVisible();
    });



});

test.describe('Casos de Borda', () => {

    test('O usuário pode cadastrar uma prova com o nome da matéria no limite máximo de caracteres', async ({ page }) => {
        const examsPage = new ExamsPage(page);
        const longSubjectName = 'A'.repeat(40);
        await examsPage.cadastrarExam('Prova', longSubjectName);
        await expect(page.getByText('Prova cadastrada!', { exact: false })).toBeVisible();
    });

    test('O usuário pode editar uma prova para ter o nome da matéria no limite máximo de caracteres', async ({ page }) => {
    const examsPage = new ExamsPage(page);
    await examsPage.cadastrarExam('Prova', 'Matemática');
    const longSubjectName = 'B'.repeat(40);
    await examsPage.editarExam('Matemática', longSubjectName);
    await expect(page.getByText('Prova atualizada!', { exact: false })).toBeVisible();
});
});