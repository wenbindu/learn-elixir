export const RESOURCE_ACCENTS = ["elixir", "erlang", "beam", "tool"] as const;

export type ResourceAccent = (typeof RESOURCE_ACCENTS)[number];

export type ResourceEntry = {
  label: string;
  shortLabel: string;
  href: string;
  category: string;
  description: string;
  accent: ResourceAccent;
  featured: boolean;
};

export type ResourceLink = ResourceEntry;

export type ResourceGroup = {
  title: string;
  resources: ResourceEntry[];
};

export type ResourceDirectory = {
  title: string;
  groups: ResourceGroup[];
  resources: ResourceEntry[];
};
