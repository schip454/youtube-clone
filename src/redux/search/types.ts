export interface ISearchParams {
  searchQuery?: string;
  upload_date?: string;
  sort_by?: string;
  type?: string;
  duration?: string;
  features?: string;
  continuationToken?: string | null | undefined;
  query?: string;
}

export interface ISearch {
  continuationToken?: string;
  videos: ISearchItem[];
  msg?: string;
}

export interface ISearchItem {
  type: string;
  videoId: string;
  title: string;
  channelTitle: string;
  channelId: string;
  channelThumbnail: {
    url: string;
    width: number;
    height: number;
  }[];
  description: string;
  viewCount: number;
  publishedTimeText: string;
  lengthText: string;
  thumbnail: {
    url: string;
    width: number;
    height: number;
  }[];
  richThumbnail: {
    url: string;
    width: number;
    height: number;
  }[];
}

export interface ISearchState {
  isLoading: boolean;
  mobileMenu: boolean;
  searchItems: ISearchItem[];
  continuationToken: string | null | undefined;
  isContinuationLoading: boolean;
  errorMessage: string | null | undefined;
}
