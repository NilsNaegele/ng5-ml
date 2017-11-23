
export interface News {
  title: string;
  link: string;
  pubDate?: string;
  description?: string;
  rank?: number;
}

export interface NewsId extends News {
  id: string;
}
