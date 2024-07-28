import { Injectable } from '@angular/core';
import * as response from '../../../assests/mock/response.json';
import { ResponseItem } from '../models/video-response.model';
@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  private data: ResponseItem[] = response.items;

  constructor() {}

  getVideoDetail(videoId: string): Promise<ResponseItem | undefined> {
    return new Promise((resolve) => {
      const videoDetail = this.data.find(item => item.id === videoId);
      resolve(videoDetail);
    });
  }
}
