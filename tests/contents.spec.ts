import { test, expect } from '@playwright/test';
import { ContentPage } from '../pages/contents-page';
import { LoginPage } from '../pages/login-page';
import * as dotenv from 'dotenv';

dotenv.config();

const email = process.env.USER_EMAIL!;
const password = process.env.USER_PASSWORD!;

test('O usuário pode registrar um novo conteúdo', async ({ page }) => {
    
    const loginPage = new LoginPage(page);
    await loginPage.login(email, password);
    await expect(page).toHaveURL(/.dashboard/);
    await expect(page.getByText('Olá, Pessôa', { exact: false })).toBeVisible();

    const contentPage = new ContentPage(page);
    await contentPage.cadastrarContent(
        'Hidrocabornetos', 
        'Química', 
        '20'
    );
    
    await expect(page.getByText('Conteúdo cadastrado!')).toBeVisible();
});

test('O usuário pode excluir um conteúdo existente', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.login(email, password);
    await expect(page).toHaveURL(/.dashboard/);
    await expect(page.getByText('Olá, Pessôa', { exact: false })).toBeVisible();

    const contentPage = new ContentPage(page);
    await contentPage.excluirContent('Hidrocabornetos');

    await expect(page.getByText('Conteúdo excluído!')).toBeVisible();
});

test('O usuário não pode cadastrar um conteúdo sem preencher o campo de nome', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.login(email, password);
    await expect(page).toHaveURL(/.dashboard/);
    await expect(page.getByText('Olá, Pessôa', { exact: false })).toBeVisible();

    const contentPage = new ContentPage(page);
    await contentPage.cadastrarContent('', 'Química', '20');
    await expect(page.getByText('Informe o nome do conteúdo.')).toBeVisible();
});

test('O usuário não pode cadastrar um conteúdo com um nome que já existe', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.login(email, password);
    await expect(page).toHaveURL(/.dashboard/);
    await expect(page.getByText('Olá, Pessôa', { exact: false })).toBeVisible();

    const contentPage = new ContentPage(page);
    await contentPage.cadastrarContent('Funções oxigenadas', 'Química', '20');
    await expect(page.getByText('Este conteúdo já está registrado.')).toBeVisible();
});

test('O usuário não pode resgistrar o nome do conteúdo com caracteres inválidos', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.login(email, password);
    await expect(page).toHaveURL(/.dashboard/);
    await expect(page.getByText('Olá, Pessôa', { exact: false })).toBeVisible();

    const contentPage = new ContentPage(page);
    await contentPage.cadastrarContent('', '12345678', '1');
    await expect(page.getByText('O campo nome não pode conter números.')).toBeVisible();
});

test('O usuário não pode registrar um conteúdo com um semestre inválido', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.login(email, password);
    await expect(page).toHaveURL(/.dashboard/);
    await expect(page.getByText('Olá, Pessôa', { exact: false })).toBeVisible();

    const contentPage = new ContentPage(page);
    await contentPage.cadastrarContent('Hidrocabornetos', 'Química', '99');
    await expect(page.getByText('O semestre não pode ser maior que 20.')).toBeVisible();
});