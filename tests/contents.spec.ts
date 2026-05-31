import { test, expect } from '@playwright/test';
import { ContentPage } from '../pages/contents-page';
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

    test('O usuário pode registrar um novo conteúdo', async ({ page }) => {
        const contentPage = new ContentPage(page);
        await contentPage.cadastrarContent('Hidrocarbonetos', 'Química', '20');
        await expect(page.getByText('Conteúdo cadastrado!', { exact: false })).toBeVisible();
    });

    test('O usuário pode excluir um conteúdo existente', async ({ page }) => {
        const contentPage = new ContentPage(page);
        await contentPage.cadastrarContent('Hidrocarbonetos', 'Química', '20');
        await contentPage.excluirContent('Hidrocarbonetos');
        await expect(page.getByText('Conteúdo excluído!', { exact: false })).toBeVisible();
    });

});

test.describe('Casos Tristes', () => {

    test('O usuário não pode cadastrar um conteúdo sem preencher o campo de nome', async ({ page }) => {
        const contentPage = new ContentPage(page);
        await contentPage.cadastrarContent('', 'Química', '20');
        await expect(page.getByText('Informe o nome do conteúdo.', { exact: false })).toBeVisible();
    });

    test('O usuário não pode cadastrar um conteúdo com um nome que já existe', async ({ page }) => {
        const contentPage = new ContentPage(page);
        await contentPage.cadastrarContent('Funções oxigenadas', 'Química', '20');
        await contentPage.cadastrarContent('Funções oxigenadas', 'Química', '20');
        await expect(page.getByText('Este conteúdo já está registrado.', { exact: false })).toBeVisible();
    });

});

test.describe('Casos de Borda', () => {

    test('O usuário não pode registrar o nome do conteúdo com números', async ({ page }) => {
        const contentPage = new ContentPage(page);
        await contentPage.cadastrarContent('Química 123', 'Química', '1');
        await expect(page.getByText('O nome do conteúdo não pode conter números ou caracteres especiais.', { exact: false })).toBeVisible();
    });

    test('O usuário não pode registrar um conteúdo com semestre igual a 21', async ({ page }) => {
        const contentPage = new ContentPage(page);
        await contentPage.cadastrarContent('Hidrocarbonetos', 'Química', '21');
        await expect(page.getByText('O semestre não pode ser maior que 20.', { exact: false })).toBeVisible();
    });

});