import { test, expect } from '@playwright/test';
import { SubjectsPage } from '../pages/subjects-page';
import { LoginPage } from '../pages/login-page';
import * as dotenv from 'dotenv';

dotenv.config();

const email = process.env.USER_EMAIL!;
const password = process.env.USER_PASSWORD!;

test('O usuário pode registrar uma nova matéria', async ({ page }) => {
    
    const loginPage = new LoginPage(page);
    await loginPage.login(email, password);
    await expect(page).toHaveURL(/.dashboard/);
    await expect(page.getByText('Olá, Pessôa', { exact: false })).toBeVisible();

    const subjectsPage = new SubjectsPage(page);
    await subjectsPage.cadastrarSubject(
        'Matemática', 
        'Prof. Silva', 
        '1'
    );
    
    await expect(page.getByText('Matéria cadastrada!')).toBeVisible();
});

test('O usuário pode excluir uma matéria existente', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.login(email, password);
    await expect(page).toHaveURL(/.dashboard/);
    await expect(page.getByText('Olá, Pessôa', { exact: false })).toBeVisible();

    const subjectsPage = new SubjectsPage(page);
    await subjectsPage.excluirSubject('Matemática');

    await expect(page.getByText('Matéria excluída!')).toBeVisible();
});

test('O usuário não pode cadastrar uma matéria sem preencher o campo de professor', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.login(email, password);
    await expect(page).toHaveURL(/.dashboard/);
    await expect(page.getByText('Olá, Pessôa', { exact: false })).toBeVisible();

    const subjectsPage = new SubjectsPage(page);
    await subjectsPage.cadastrarSubject('Matemática', '', '1');
    await expect(page.getByText('Informe o nome do professor.')).toBeVisible();
});

test('O usuário não pode cadastrar uma matéria com um nome de matéria que já existe', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.login(email, password);
    await expect(page).toHaveURL(/.dashboard/);
    await expect(page.getByText('Olá, Pessôa', { exact: false })).toBeVisible();

    const subjectsPage = new SubjectsPage(page);
    await subjectsPage.cadastrarSubject('Química', 'Prof. Silva', '1');
    await expect(page.getByText('Você já possui uma matéria com este nome.')).toBeVisible();
});

test('O usuário não pode resgistrar o nome do professor com caracteres inválidos', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.login(email, password);
    await expect(page).toHaveURL(/.dashboard/);
    await expect(page.getByText('Olá, Pessôa', { exact: false })).toBeVisible();

    const subjectsPage = new SubjectsPage(page);
    await subjectsPage.cadastrarSubject('Física', '12345678', '1');
    await expect(page.getByText('O campo professor não pode conter números.')).toBeVisible();
});

test('O usuário não pode registrar uma matéria com um semestre inválido', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.login(email, password);
    await expect(page).toHaveURL(/.dashboard/);
    await expect(page.getByText('Olá, Pessôa', { exact: false })).toBeVisible();

    const subjectsPage = new SubjectsPage(page);
    await subjectsPage.cadastrarSubject('Biologia', 'Prof. Silva', '99');
    await expect(page.getByText('O semestre não pode ser maior que 20.')).toBeVisible();
});