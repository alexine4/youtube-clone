export interface VideoDetails {
    videoId: string;
    userId: string;
    title: string;
    description: string;
    tags: string[];
    videoStatus: string;
    videoUrl: string;
    thumbnailUrl: string;
    likeCount?: number;
    dislikeCount?: number;
}
