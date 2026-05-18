
export interface initialArticleValueType {
  title: string,
  category: string,
  image_url: string | File | null,
  description: string
}

export interface articleType {
  id: 0;
  title: string;
  description: string;
  category: string;
  image_url: File | string | null;
}

export interface articleSliceType {
    article: articleType | null,
    articles: articleType[] | null,
    isLoading: boolean,
    isError: any
}