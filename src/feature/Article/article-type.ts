export interface initialArticleValueType {
  title: string;
  category: string;
  image_url: string | File | null;
  description: string;
}

export interface articleType {
  id: 0;
  title: string;
  description: string;
  category: string;
  image_url: string;
}

export interface articleSliceType {
  article: articleType | null;
  articles: articleType[] | null;
  isLoading: boolean;
  isError: any;
}

export interface ArticleCardType {
  id: number;
  img: string;
  title: string;
  category: string;
  description: string;
}
