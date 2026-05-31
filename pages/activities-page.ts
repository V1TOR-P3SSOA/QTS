import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';

export class ActivitiesPage {
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

    async cadastrarActivitie(description: string, subject: string, date:string) {
        await this.page.goto('https://studylab.free.laravel.cloud/activities');
        await this.page.click('button:has-text("Nova Atividade")');
        await this.page.fill('textarea[id="modalDescription"]', description);
        await this.page.locator('select[id="modalSubjectId"]').selectOption('Digitar manualmente...');
        await this.page.fill('input[id="modalSubjectManual"]', subject);
        await this.page.locator('select[id="modalDueDateQuick"]').selectOption(date);
        await this.page.click('button[type="submit"]');
    }

    async excluirActivitie(title: string) {
        await this.page.goto('https://studylab.free.laravel.cloud/activities');
        await expect(this.page.getByText(title)).toBeVisible();
        await this.page.click('button:has-text("Excluir")');
        await this.page.click('button:has-text("Sim, excluir")');
        await expect(this.page.getByText('Atividade excluída!')).toBeVisible();
    }
}