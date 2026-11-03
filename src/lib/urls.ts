export function withBase(path: string): string {
  if (/^(?:[a-z][a-z\d+.-]*:|\/\/|#|\?)/i.test(path)) return path;

  const base = `${import.meta.env.BASE_URL.replace(/\/+$/, '')}/`;
  const localPath = path.replace(/^\/+/, '');
  if (base !== '/' && (`/${localPath}` === base.slice(0, -1) || `/${localPath}`.startsWith(base))) {
    return `/${localPath}`;
  }
  return `${base}${localPath}`;
}
