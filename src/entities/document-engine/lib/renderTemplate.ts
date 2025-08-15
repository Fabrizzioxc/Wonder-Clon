export function renderTemplate(template: string, values: Record<string, string>): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_m, k) => (k in values ? String(values[k]) : "__________"));
}
