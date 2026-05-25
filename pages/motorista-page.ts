import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';

export class MotoristaPage {
    readonly page: Page;
constructor(page: Page) {
        this.page = page;
    }
async cadastrarMotorista(nome: string, email: string, telefone: string, numeroCnh: string, senha: string, confirmarSenha: string) {
        await this.page.goto('https://omnibusdrive.up.railway.app/cadastro_motorista');
        await this.page.fill('input[name="nome"]', nome);
        await this.page.fill('input[name="email"]', email);
        await this.page.fill('input[name="telefone"]', telefone);
        await this.page.fill('input[name="numeroCnh"]', numeroCnh);
        await this.page.fill('input[name="senha"]', senha);
        await this.page.fill('input[name="confirmarSenha"]', confirmarSenha);
        await this.page.click('button[type="submit"]');
    }

}