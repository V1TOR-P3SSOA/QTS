import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';

export class WorksPage {
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

    async cadastrarWork(tipo: string, descricao: string, data: string) {
        await this.page.goto('https://studylab.free.laravel.cloud/works');
        await this.page.click('button:has-text("Novo Trabalho")');
        await this.page.locator('select[id="workType"]').selectOption(tipo);
        await this.page.fill('input[id="workDescription"]', descricao);
        await this.page.locator('input[id="workDueDate"]').fill(data);
        await this.page.click('button[id="saveWorkBtn"]');
    }

        async excluirWork(title: string) {
        await this.page.goto('https://studylab.free.laravel.cloud/works');
        await expect(this.page.getByText(title)).toBeVisible();
        await this.page.click('button:has-text("Excluir")');
        await this.page.click('button:has-text("Sim, excluir")');
        await expect(this.page.getByText('Trabalho excluído!')).toBeVisible();
    }


}