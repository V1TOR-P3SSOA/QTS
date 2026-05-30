import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';

export class SubjectsPage {
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
    
    async cadastrarSubject(materia: string, professor: string, semestre: string) {
        await this.page.goto('https://studylab.free.laravel.cloud/subjects');
        await this.page.click('button:has-text("Adicionar matéria")');
        await this.page.locator('select[id="modalSubjectName"]').selectOption(materia);
        await this.page.fill('input[id="modalSubjectTeacher"]', professor);
        await this.page.locator('select[id="modalSubjectSemester"]').selectOption('Outro...');
        await this.page.fill('input[id="modalSubjectSemesterCustom"]', semestre);
        await this.page.click('button[type="submit"]');
    }

    async excluirSubject(materia: string) {
        await this.page.goto('https://studylab.free.laravel.cloud/subjects');
        const row = this.page.locator('tbody#subjectsTable tr').filter({ hasText: materia });
        await row.locator('button[data-del]').click();
        await expect(this.page.getByText('Excluir matéria?', { exact: false })).toBeVisible();
        await this.page.click('button:has-text("Sim, excluir")');
    }
}