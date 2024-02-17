export interface ISelectedCategoryData {
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
  richThumbnail: null | string[];
  publishedText?: string;
}

export interface IRelatedVideos {
  continuationToken: string;
  videos: IRelatedVideo[];
  detail?: string;
}
export interface IRelatedVideosParams {
  videoId: string | undefined;
  relatedContinuation: string | null | undefined;
}

export interface IVideoDetail {
  author: {
    avatar: {
      height: number;
      url: string;
      width: number;
    }[];
    badges: {
      text: string;
      type: string;
    }[];
    canonicalBaseUrl: string;
    channelId: string;
    stats: {
      subscribers: number;
      subscribersText: string;
      title: string;
    };
    title: string;
  };

  cards: {
    label: string;
    link: {
      displayDomain: string;
      thumbnails: {
        height: number;
        url: string;
        width: number;
      }[];
      title: string;
      url: string;
    };
    type: string;
  }[];
  category: string;
  chapters?: string[];
  description: string;
  endScreen: {
    items: {
      channel: {
        avatar: {
          height: number;
          url: string;
          width: number;
        }[];
        channelId: string;
        description: string;
        title: string;
      };
      type: string;
    }[];
  };
  isLiveContent: boolean;
  isLiveNow: boolean;
  keywords: string[];
  lengthSeconds: number;
  musics: string[];
  publishedDate: string;
  stats?: {
    comments: number;
    likes: number;
    views: number;
  };
  superTitle: string[];
  thumbnails: {
    height: number;
    url: string;
    width: number;
  }[];
  title: string;
  videoId: string;
}

export interface IRelatedVideo {
  video_id: string;
  title: string;
  author: string;
  number_of_views: 1284411;
  video_length: string;
  description?: null | string;
  is_live_content?: null | boolean;
  published_time: string;
  channel_id: string;
  category?: null | string;
  type: string;
  keywords?: string[];
  thumbnails: { height: number; url: string; width: number }[];
}

export interface IVideoState {
  searchResults: ISelectedCategoryData[];
  isLoading: boolean;
  selectedCategory: string;
  isDetailsVideoLoading: boolean;
  videoDetails: null | IVideoDetail;
  relatedVideos: IRelatedVideo[];
  relatedContinuation: string | null;
  errorText: string | null | undefined;
}
