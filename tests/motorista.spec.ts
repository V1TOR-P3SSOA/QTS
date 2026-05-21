import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://omnibusdrive.up.railway.app/login');
  await page.locator('input[name="email"]').click();
  await page.locator('input[name="email"]').fill('jp@gmail.com');
  await page.locator('input[name="password"]').click();
  await page.locator('input[name="password"]').fill('12345678');
  await page.getByRole('button', { name: 'ENTRAR' }).click();
  await page.getByRole('button', { name: 'Motoristas' }).click();
  await page.getByRole('button', { name: 'Cadastrar motorista' }).click();
  await page.getByRole('textbox', { name: 'Ex: José Bonifácio Sombra' }).click();
  await page.getByRole('textbox', { name: 'Ex: José Bonifácio Sombra' }).fill('Jose');
  await page.getByRole('textbox', { name: 'Ex: jose@gmail.com' }).click();
  await page.getByRole('textbox', { name: 'Ex: jose@gmail.com' }).fill('jose2@gmail.com');
  await page.getByRole('textbox', { name: 'Ex: (88) 94002-' }).click();
  await page.getByRole('textbox', { name: 'Ex: (88) 94002-' }).fill('(88) 88888-88888');
  await page.getByRole('textbox', { name: 'Ex: 07234567889' }).click();
  await page.getByRole('textbox', { name: 'Ex: 07234567889' }).fill('647283746282');
  await page.getByRole('textbox', { name: 'Mínimo 8 caracteres' }).click();
  await page.getByRole('textbox', { name: 'Mínimo 8 caracteres' }).fill('12345678');
  await page.getByRole('textbox', { name: 'Digite a senha novamente' }).click();
  await page.getByRole('textbox', { name: 'Digite a senha novamente' }).fill('12345678');
  await page.getByRole('button', { name: 'Cadastrar' }).click();
});