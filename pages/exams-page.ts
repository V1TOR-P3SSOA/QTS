import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';

export class ExamsPage {
    readonly page: Page;
constructor(page: Page) {
        this.page = page;
    }

    async login(email: string, password: string) {
        await this.page.goto('https://studylab.free.laravel.cloud/login');
        await this.page.fill('input[id="email"]', email);
        await this.page.fill('input[id="password"]', password);
        await this.page.click('button[type="submit"]');
    }

async cadastrarExam(prova: string, materia: string) {
    await this.page.goto('https://studylab.free.laravel.cloud/exams');
    await this.page.waitForLoadState('networkidle');
    await this.page.click('button[id="prevWeek"]');
    await this.page.locator('button:has-text("Adicionar")').first().click();
    await this.page.locator('select[id="modalType"]').selectOption(prova);
    await this.page.locator('select[id="modalDesc"]').selectOption('__outro__');
    await this.page.fill('input[id="descCustom"]', materia);
    await this.page.click('button[id="modalSave"]');
}

async excluirExam(materia: string) {
    await this.page.goto('https://studylab.free.laravel.cloud/exams');
    await this.page.waitForLoadState('networkidle');
    await this.page.click('button[id="prevWeek"]');
    const card = this.page.locator('div[onclick*="openEdit"]').filter({ hasText: materia }).first();
    await card.click();
    await this.page.click('button[id="modalDelete"]');
    await expect(this.page.getByText('Excluir prova?', { exact: false })).toBeVisible();
    await this.page.click('button[id="confirmModalOk"]');
}

async editarExam(materiaAtual: string, materiaNova: string) {
    await this.page.goto('https://studylab.free.laravel.cloud/exams');
    await this.page.waitForLoadState('networkidle');
    await this.page.click('button[id="prevWeek"]');
    const card = this.page.locator('div[onclick*="openEdit"]').filter({ hasText: materiaAtual }).first();
    await card.click();
    await this.page.locator('select[id="modalDesc"]').selectOption('__outro__');
    await this.page.fill('input[id="descCustom"]', materiaNova);
    await this.page.click('button[id="modalSave"]');
}

}