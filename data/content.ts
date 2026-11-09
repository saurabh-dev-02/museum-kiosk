import content from "./content.json";

export type Settings = typeof content.settings;
export type TimeoutText = typeof content.timeout;
export type Exhibit = (typeof content.exhibits)[number];

export const settings: Settings = content.settings;
export const timeout: TimeoutText = content.timeout;
export const exhibits: Exhibit[] = content.exhibits;

export function getExhibit(id: string): Exhibit | undefined {
  return exhibits.find((exhibit) => exhibit.id === id);
}

export function formatMessage(
  template: string,
  values: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}
