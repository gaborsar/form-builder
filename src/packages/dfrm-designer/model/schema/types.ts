export interface Meta {
  ids?: MetaTag[];
  tags?: MetaTag[];
}

export interface MetaTag {
  source?: string;
  vocab: string;
  code: string;
  fsn: { [locale: string]: string };
}
