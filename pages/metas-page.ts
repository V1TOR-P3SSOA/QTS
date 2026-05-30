import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';

export class MetasPage {
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

    async cadastrarMeta(title: string, value: number, unit:string, date:string) {
        await this.page.goto('https://studylab.free.laravel.cloud/metas');
        await this.page.click('button:has-text("Nova Meta")');
        await this.page.fill('input[name="title"]', title);
        await this.page.fill('input[name="target_value"]', value.toString());
        await this.page.fill('input[name="unit"]', unit);
        await this.page.fill('input[name="deadline"]', date);
        await this.page.click('button[type="submit"]');
    }

    async concluirMeta(title: string) {
        await this.page.goto('https://studylab.free.laravel.cloud/metas');
        await this.page.click('button:has-text("Concluir")');
        await expect(this.page.getByText('Meta concluída!')).toBeVisible();
    }
}