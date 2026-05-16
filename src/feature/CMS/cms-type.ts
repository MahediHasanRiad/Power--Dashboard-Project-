export interface ButtonDataItem {
  id: number;
  title: CMSPageType;
  description: string;
}

export type CMSPageType = 'TERMS_CONDITION' | 'ABOUT_US' | 'PRIVACY_POLICY'

export interface getDataType {
  id: string;
  title: CMSPageType;
}
export interface getInitialDataType {
  id: string;
  title: CMSPageType;
  content: any;
}