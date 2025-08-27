export type MenuItem =
  | { kind: 'route'; text: string; href: string }
  | { kind: 'external'; text: string; href: string; newTab?: boolean }
  | { kind: 'action'; text: string; onClick: () => void; disabled?: boolean }
  | { kind: 'text'; text: string; disabled?: boolean };

export interface ListSection {
  title: string;
  menu: MenuItem[];
}