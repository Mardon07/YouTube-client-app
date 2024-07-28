export interface VideoDetail {
    snippet: {
      title: string;
      description: string;
      channelTitle: string;
      publishedAt: string;
      thumbnails: {
        high: {
          url: string;
        };
      };
    };
    statistics: {
      viewCount: string;
      likeCount: string;
      dislikeCount: string;
      commentCount: string;
    };
  }
  