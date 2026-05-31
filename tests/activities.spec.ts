import { test, expect } from '@playwright/test';
import { ActivitiesPage } from '../pages/activities-page';
import { LoginPage } from '../pages/login-page';
import * as dotenv from 'dotenv';

dotenv.config();

const email = process.env.USER_EMAIL!;
const password = process.env.USER_PASSWORD!;

test('O usuário pode registrar uma nova atividade', async ({ page }) => {
    
    const loginPage = new LoginPage(page);
    await loginPage.login(email, password);
    await expect(page).toHaveURL(/.dashboard/);
    await expect(page.getByText('Olá, Pessôa', { exact: false })).toBeVisible();

    const activitiesPage = new ActivitiesPage(page);
    await activitiesPage.cadastrarActivitie(
        'Estudar para a prova de matemática',
        'MAT',
        'Hoje',
    );

    await expect(page.getByText('Estudar para a prova de matemática')).toBeVisible();
});

test('O usuário pode concluir uma atividade existente', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(email, password);
    await expect(page).toHaveURL(/.dashboard/);
    await expect(page.getByText('Olá, Pessôa', { exact: false })).toBeVisible();

    const activitiesPage = new ActivitiesPage(page);
    await activitiesPage.excluirActivitie('Estudar para a prova de matemática');
});

test('O usuário não pode cadastrar uma atividade sem preencher o campo de descrição', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(email, password);
    await expect(page).toHaveURL(/.dashboard/);
    await expect(page.getByText('Olá, Pessôa', { exact: false })).toBeVisible();

    const activitiesPage = new ActivitiesPage(page);
    await activitiesPage.cadastrarActivitie(
        '',
        'MAT',
        'Hoje',
    );
    await expect(page.getByText('Informe a descrição.')).toBeVisible();
});