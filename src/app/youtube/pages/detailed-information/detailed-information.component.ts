import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VideoDetail } from '../../models/video-detail.model';
import { ResponseItem } from '../../models/video-response.model';
import { YoutubeService } from '../../services/youtube.service';

@Component({
  selector: 'app-detailed-information',
  templateUrl: './detailed-information.component.html',
  styleUrls: ['./detailed-information.component.scss'],
})
export class DetailedInformationComponent implements OnInit {
  videoDetail: ResponseItem | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private youtubeService: YoutubeService
  ) {}

  ngOnInit() {
    const videoId = this.route.snapshot.paramMap.get('id');
    console.log(videoId);

    if (videoId) {
      this.youtubeService.getVideoDetail(videoId).then((data) => {
        this.videoDetail = data;
      });
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
