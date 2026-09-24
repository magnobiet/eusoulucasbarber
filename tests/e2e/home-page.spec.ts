import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe('Home page', () => {
  test('renders the heading with APP_TITLE from environment', async ({
    page,
  }) => {
    const heading = page.getByRole('heading', { level: 1 });

    await expect(heading).toBeVisible();
    await expect(heading).toHaveText(/./);
  });
});

test.describe('Home wrapper', () => {
  test('renders the main wrapper', async ({ page }) => {
    await expect(page.getByTestId('home-wrapper')).toBeVisible();
  });
});

test.describe('Header', () => {
  test('renders the header', async ({ page }) => {
    await expect(page.getByTestId('header')).toBeVisible();
  });

  test('navigates to each section from the navigation', async ({ page }) => {
    const navigationLinks = [
      ['Visão geral', 'secao-1', 'hero-section'],
      ['O problema', 'secao-2', 'problem-section'],
      ['O que vem pronto', 'secao-3', 'tech-stack-section'],
      ['Como funciona', 'secao-4', 'workflow-section'],
      ['Criar projeto', 'secao-5', 'call-to-action-section'],
    ] as const;

    for (const [name, sectionId, testId] of navigationLinks) {
      await page.getByTestId('header').getByRole('link', { name }).click();
      await expect(page).toHaveURL(new RegExp(`#${sectionId}$`));
      await expect(page.getByTestId(testId)).toBeVisible();
    }
  });

  test('opens the GitHub repository in a new tab', async ({ page }) => {
    const githubLink = page.getByTestId('header').getByRole('link', {
      name: 'Ver no GitHub',
    });

    await expect(githubLink).toHaveAttribute(
      'href',
      'https://github.com/magnobiet/template-nextjs',
    );
    await expect(githubLink).toHaveAttribute('target', '_blank');
    await expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');

    const popupPromise = page.waitForEvent('popup');
    await githubLink.click();
    const popup = await popupPromise;

    await expect(popup).toHaveURL(/github\.com/);
  });
});

test.describe('Hero section', () => {
  test('renders the hero section', async ({ page }) => {
    await expect(page.getByTestId('hero-section')).toBeVisible();
  });

  test('navigates to the technology section', async ({ page }) => {
    await page.getByRole('link', { name: 'Ver o que vem pronto' }).click();

    await expect(page).toHaveURL(/#secao-3$/);
    await expect(page.getByTestId('tech-stack-section')).toBeVisible();
  });

  test('opens the GitHub template generator in a new tab', async ({ page }) => {
    const generateLink = page.getByTestId('hero-section').getByRole('link', {
      name: 'Usar Template no GitHub',
    });

    await expect(generateLink).toHaveAttribute(
      'href',
      'https://github.com/magnobiet/template-nextjs/generate',
    );
    await expect(generateLink).toHaveAttribute('target', '_blank');
    await expect(generateLink).toHaveAttribute('rel', 'noopener noreferrer');

    const popupPromise = page.waitForEvent('popup');
    await generateLink.click();
    const popup = await popupPromise;

    await expect(popup).toHaveURL(/github\.com/);
  });
});

test.describe('Problem section', () => {
  test('renders the problem section', async ({ page }) => {
    await expect(page.getByTestId('problem-section')).toBeVisible();
  });
});

test.describe('Tech stack section', () => {
  test('renders the tech stack section', async ({ page }) => {
    await expect(page.getByTestId('tech-stack-section')).toBeVisible();
  });
});

test.describe('Workflow section', () => {
  test('renders the workflow section', async ({ page }) => {
    await expect(page.getByTestId('workflow-section')).toBeVisible();
  });
});

test.describe('Call to action section', () => {
  test('renders the call to action section', async ({ page }) => {
    await expect(page.getByTestId('call-to-action-section')).toBeVisible();
  });

  test('opens the GitHub template generator in a new tab', async ({ page }) => {
    const generateLink = page
      .getByTestId('call-to-action-section')
      .getByRole('link', {
        name: 'Usar Template no GitHub',
      });

    const popupPromise = page.waitForEvent('popup');
    await generateLink.click();
    const popup = await popupPromise;

    await expect(popup).toHaveURL(/github\.com/);
  });
});

test.describe('Contact form section', () => {
  test('renders the contact form with its required fields', async ({
    page,
  }) => {
    const section = page.getByTestId('contact-form-section');

    await expect(section).toBeVisible();
    await expect(section.getByLabel('Nome *')).toHaveAttribute('required', '');
    await expect(section.getByLabel('Estado *')).toHaveAttribute(
      'required',
      '',
    );
    await expect(section.getByLabel('Cidade *')).toBeDisabled();
    await expect(section.getByLabel('Mensagem *')).toHaveAttribute(
      'required',
      '',
    );
    await expect(
      section.getByRole('button', { name: 'Enviar mensagem' }),
    ).toBeVisible();
  });
});

test.describe('Footer', () => {
  test('renders the footer', async ({ page }) => {
    await expect(page.getByTestId('footer')).toBeVisible();
  });

  test('opens the MIT license in a new tab', async ({ page }) => {
    const licenseLink = page.getByRole('link', { name: 'MIT' });

    await expect(licenseLink).toHaveAttribute(
      'href',
      'https://license.magnobiet.com/mit/2026',
    );
    await expect(licenseLink).toHaveAttribute('target', '_blank');
    await expect(licenseLink).toHaveAttribute('rel', 'noopener noreferrer');

    const popupPromise = page.waitForEvent('popup');
    await licenseLink.click();
    const popup = await popupPromise;

    await expect(popup).toHaveURL('https://license.magnobiet.com/mit/2026');
  });
});
