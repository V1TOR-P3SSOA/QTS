import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';

export class ContentPage {
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

    async cadastrarContent(name: string, materia: string, semestre:string) {
        await this.page.goto('https://studylab.free.laravel.cloud/contents');
        await this.page.click('button:has-text("Adicionar conteúdo")');
        await this.page.fill('input[id="modalContentName"]', name);
        await this.page.locator('select[id="modalContentSubject"]').selectOption(materia);
        await this.page.locator('select[id="modalContentSemester"]').selectOption('Outro...');
        await this.page.fill('input[id="modalContentSemesterCustom"]', semestre);
        await this.page.click('button[type="submit"]');
    }

    async excluirContent(nome: string) {
        await this.page.goto('https://studylab.free.laravel.cloud/contents');
        const row = this.page.locator('tbody#contentsTable tr').filter({ hasText: nome });
        await row.locator('button[data-del]').click();
        await expect(this.page.getByText('Excluir conteúdo?', { exact: false })).toBeVisible();
        await this.page.click('button:has-text("Sim, excluir")');
    }
}