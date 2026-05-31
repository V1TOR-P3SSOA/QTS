import { test, expect } from '@playwright/test';
import { WorksPage } from '../pages/works-page';
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

    test('O usuário pode cadastrar um novo trabalho', async ({ page }) => {
        const worksPage = new WorksPage(page);
        await worksPage.cadastrarWork(
            'Artigo',
            'Trabalho de Matemática',
            '2026-12-31',
        );
        await expect(page.getByText('Trabalho de Matemática', { exact: false })).toBeVisible();
    });

    test('O usuário pode deletar um trabalho existente', async ({ page }) => {
        const worksPage = new WorksPage(page);
        await worksPage.cadastrarWork(
            'Artigo',
            'Trabalho de Matemática',
            '2026-12-31',
        );
        await worksPage.excluirWork('Trabalho de Matemática');
        await expect(page.getByText('Trabalho excluído!', { exact: false })).toBeVisible();
    });

});

test.describe('Casos Tristes', () => {

    test('O usuário não pode cadastrar um trabalho sem preencher o campo de descrição', async ({ page }) => {
        const worksPage = new WorksPage(page);
        await worksPage.cadastrarWork(
            'Artigo',
            '',
            '2026-12-31',
        );
        await expect(page.getByText('A descrição é obrigatória.', { exact: false })).toBeVisible();
    });

    test('O usuário não pode cadastrar um trabalho sem preencher o campo data de vencimento', async ({ page }) => {
        const worksPage = new WorksPage(page);
        await worksPage.cadastrarWork(
            'Artigo',
            'Trabalho de Matemática',
            '',
        );
        await expect(page.getByText('A data de entrega é obrigatória.', { exact: false })).toBeVisible();
    });

});

test.describe('Casos de Borda', () => {

    test('O usuário pode cadastrar um trabalho com a descrição no limite máximo de caracteres', async ({ page }) => {
        const worksPage = new WorksPage(page);
        const longDescription = 'A'.repeat(100);
        await worksPage.cadastrarWork(
            'Artigo',
            longDescription,
            '2026-12-31',
        );
        await expect(page.getByText('Trabalho criado com sucesso!', { exact: false })).toBeVisible();
    });

    test('O usuário não pode cadastrar um trabalho com data de entrega no passado', async ({ page }) => {
        const worksPage = new WorksPage(page);
        await worksPage.cadastrarWork(
            'Artigo',
            'Trabalho de Matemática',
            '2020-01-01',
        );
        await expect(page.getByText('A data não pode ser anterior a hoje.', { exact: false })).toBeVisible();
    });

});