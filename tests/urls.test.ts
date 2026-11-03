import { afterEach, describe, expect, it, vi } from 'vitest';
import { withBase } from '../src/lib/urls';

afterEach(() => vi.unstubAllEnvs());

describe.each(['/', '/trust-center', '/trust-center/'])('withBase with %s', (base) => {
  it('prefixes local assets, routes, downloads, and home anchors', () => {
    vi.stubEnv('BASE_URL', base);
    const prefix = base.replace(/\/+$/, '');
    for (const path of [
      '/',
      '/logo.svg',
      '/favicon.svg',
      '/og-trust-center.png',
      '/questionnaires/mvsp/',
      '/downloads/questionnaire-mvsp.pdf',
      '/#questionnaires',
    ]) {
      expect(withBase(path)).toBe(`${prefix}${path}`);
    }
    expect(withBase('logo.svg')).toBe(`${prefix}/logo.svg`);
  });

  it('preserves external URLs and same-page references', () => {
    vi.stubEnv('BASE_URL', base);
    for (const url of [
      'https://example.com/logo.svg',
      '//cdn.example.com/logo.svg',
      'data:image/svg+xml;base64,abc',
      'mailto:security@example.com',
      '#questionnaires',
      '?theme=dark',
    ]) {
      expect(withBase(url)).toBe(url);
    }
  });

  it('does not duplicate the base path', () => {
    vi.stubEnv('BASE_URL', base);
    const prefix = base.replace(/\/+$/, '');
    expect(withBase(`${prefix}/logo.svg`)).toBe(`${prefix}/logo.svg`);
    expect(withBase('/trust-center-other/logo.svg')).toBe(`${prefix}/trust-center-other/logo.svg`);
  });
});
