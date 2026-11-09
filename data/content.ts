import content from "./content.json";
import ui from "./ui.json";

export type Settings = typeof content.settings;
export type TimeoutText = typeof content.timeout;
export type HomeText = typeof ui.home;
export type ExhibitPageText = typeof ui.exhibitPage;
export type Exhibit = (typeof content.exhibits)[number];

export const settings: Settings = content.settings;
export const timeout: TimeoutText = content.timeout;
export const home: HomeText = ui.home;
export const exhibitPage: ExhibitPageText = ui.exhibitPage;
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
