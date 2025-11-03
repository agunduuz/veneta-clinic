// types/navigation.ts
export interface MenuItem {
  id: string;
  label: string;
  href?: string;
  children?: MenuItem[];
}
