import { test, expect } from '@playwright/test';
import { SubjectsPage } from '../pages/subjects-page';
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

    test('O usuário pode registrar uma nova matéria', async ({ page }) => {
        const subjectsPage = new SubjectsPage(page);
        await subjectsPage.cadastrarSubject('Matemática', 'Prof. Silva', '1');
        await expect(page.getByText('Matéria cadastrada!', { exact: false })).toBeVisible();
    });

    test('O usuário pode excluir uma matéria existente', async ({ page }) => {
        const subjectsPage = new SubjectsPage(page);
        await subjectsPage.cadastrarSubject('Matemática', 'Prof. Silva', '1');
        await subjectsPage.excluirSubject('Matemática');
        await expect(page.getByText('Matéria excluída!', { exact: false })).toBeVisible();
    });

});

test.describe('Casos Tristes', () => {

    test('O usuário não pode cadastrar uma matéria sem preencher o campo de professor', async ({ page }) => {
        const subjectsPage = new SubjectsPage(page);
        await subjectsPage.cadastrarSubject('Matemática', '', '1');
        await expect(page.getByText('Informe o nome do professor.', { exact: false })).toBeVisible();
    });

    test('O usuário não pode cadastrar uma matéria com um nome que já existe', async ({ page }) => {
        const subjectsPage = new SubjectsPage(page);
        await subjectsPage.cadastrarSubject('Química', 'Prof. Silva', '1');
        await subjectsPage.cadastrarSubject('Química', 'Prof. Silva', '1');
        await expect(page.getByText('Você já possui uma matéria com este nome.', { exact: false })).toBeVisible();
    });

});

test.describe('Casos de Borda', () => {

    test('O usuário não pode registrar o nome do professor com números', async ({ page }) => {
        const subjectsPage = new SubjectsPage(page);
        await subjectsPage.cadastrarSubject('Física', 'Prof. Silva 123', '1');
        await expect(page.getByText('O campo professor não pode conter números.', { exact: false })).toBeVisible();
    });

    test('O usuário não pode registrar uma matéria com semestre igual a 21', async ({ page }) => {
        const subjectsPage = new SubjectsPage(page);
        await subjectsPage.cadastrarSubject('Biologia', 'Prof. Silva', '21');
        await expect(page.getByText('O semestre não pode ser maior que 20.', { exact: false })).toBeVisible();
    });

});