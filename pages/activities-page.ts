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

    async cadastrarActivitieComData(description: string, subject: string, date: string) {
        await this.page.goto('https://studylab.free.laravel.cloud/activities');
        await this.page.click('button:has-text("Nova Atividade")');
        await this.page.fill('textarea[id="modalDescription"]', description);
        await this.page.locator('select[id="modalSubjectId"]').selectOption('Digitar manualmente...');
        await this.page.fill('input[id="modalSubjectManual"]', subject);
        await this.page.locator('select[id="modalDueDateQuick"]').selectOption('custom');
        await this.page.fill('input[id="modalDueDate"]', date);
        await this.page.click('button[type="submit"]');
    }

    async editarActivitie(title: string) {
        await this.page.goto('https://studylab.free.laravel.cloud/activities');
        const row = this.page.locator('tbody#activitiesTable tr').filter({ hasText: title });
        await expect(row).toBeVisible();
        await row.locator('button:has-text("Editar")').click();
        await this.page.fill('textarea[id="modalDescription"]', `${title} - Editada`);
        await this.page.click('button[type="submit"]');
    }
}