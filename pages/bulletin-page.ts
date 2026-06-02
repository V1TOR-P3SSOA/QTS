import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';

export class BulletinPage {
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

    async cadastrarNota(notaParcial: string, notaBimestral: string, materia: string, bimestre:string) {
        await this.page.goto('https://studylab.free.laravel.cloud/bulletin');
        await this.page.click('button:has-text("Nova nota")');
        await this.page.locator('select[id="gradeModalSubjectId"]').selectOption(materia);
        await this.page.locator('select[id="gradeModalBimester"]').selectOption(bimestre);
        await this.page.locator('input[id="gradeModalMidterm"]').fill(notaParcial);
        await this.page.locator('input[id="gradeModalEndterm"]').fill(notaBimestral);
        await this.page.click('button[type="submit"]');
    }

    async excluirNota(materia: string) {
        await this.page.goto('https://studylab.free.laravel.cloud/bulletin');
        // Localiza a linha que contém o nome da matéria e clica no botão de delete dentro dela
        const row = this.page.locator('tr, div').filter({ hasText: materia });
        await row.locator('button[data-del]').click();
    }
}