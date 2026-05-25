import { test, expect } from '@playwright/test';
import { MotoristaPage } from '../pages/motorista-page';


test('Usuário pode cadastrar um novo motorista', async ({ page }) => {
    const motoristaPage = new MotoristaPage(page);

    const emailUnico = `carls.renen.${Date.now()}@example.com`;

    await motoristaPage.cadastrarMotorista(
        'Carlson Renen', 
        emailUnico, 
        '4002892200', 
        '1234567890', 
        '12345678', 
        '12345678'
    );
    
    await expect(page).toHaveURL(/.lista_motoristas/);
});
