import { test, expect } from '@playwright/test';
import { ActivitiesPage } from '../pages/activities-page';
import { LoginPage } from '../pages/login-page';
import * as dotenv from 'dotenv';

dotenv.config();

const ontem = new Date();
ontem.setDate(ontem.getDate() - 1);
const dataOntem = [
    ontem.getFullYear(),
    String(ontem.getMonth() + 1).padStart(2, '0'),
    String(ontem.getDate()).padStart(2, '0'),
].join('-');

const email = process.env.USER_EMAIL!;
const password = process.env.USER_PASSWORD!;

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(email, password);
    await expect(page).toHaveURL(/.dashboard/);
    await expect(page.getByText('Olá, Pessôa', { exact: false })).toBeVisible();
});

test.describe('Casos Felizes', () => {

    test('O usuário pode registrar uma nova atividade', async ({ page }) => {
        const activitiesPage = new ActivitiesPage(page);
        await activitiesPage.cadastrarActivitie(
            'Estudar para a prova de matemática',
            'MAT',
            'Hoje',
        );
        await expect(page.getByText('Atividade cadastrada! Lista atualizada.')).toBeVisible();
    });

    test('O usuário pode editar uma atividade existente', async ({ page }) => {
        const activitiesPage = new ActivitiesPage(page);
        await activitiesPage.editarActivitie('Estudar para a prova de matemática');
        await expect(page.getByText('Atividade atualizada! Lista atualizada.')).toBeVisible();
    });

});

test.describe('Casos Tristes', () => {

    test('O usuário não pode cadastrar uma atividade sem preencher o campo de descrição', async ({ page }) => {
        const activitiesPage = new ActivitiesPage(page);
        await activitiesPage.cadastrarActivitie(
            '',
            'MAT',
            'Hoje',
        );
        await expect(page.getByText('Informe a descrição.')).toBeVisible();
    });

    test('O usuário não pode cadastrar uma atividade sem preencher o campo data de vencimento', async ({ page }) => {
        const activitiesPage = new ActivitiesPage(page);
        await activitiesPage.cadastrarActivitie(
            'Estudar para a prova de matemática',
            'MAT',
            '',
        );
        await expect(page.getByText('Informe a data de vencimento.')).toBeVisible();
    });

});

test.describe('Casos de Borda', () => {

    test('O usuário pode cadastrar uma atividade com a descrição no limite máximo de caracteres', async ({ page }) => {
        
        const activitiesPage = new ActivitiesPage(page);
        const longDescription = 'A'.repeat(255);
        await activitiesPage.cadastrarActivitie(
            longDescription,
            'MAT',
            'Hoje',
        );
        await expect(page.getByText('Atividade cadastrada! Lista atualizada.')).toBeVisible();
    });

    test('O usuário não pode cadastrar uma atividade com data de vencimento no passado', async ({ page }) => {
    const activitiesPage = new ActivitiesPage(page);
    await activitiesPage.cadastrarActivitieComData(
        'Estudar para a prova de matemática',
        'MAT',
        dataOntem,
    );
    await expect(page.getByText('A data não pode estar no passado.', { exact: false })).toBeVisible();
    });

});