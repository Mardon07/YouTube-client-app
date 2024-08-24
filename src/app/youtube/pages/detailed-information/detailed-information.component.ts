import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { removeCustomCard } from '../../../redux/actions/custom-card.actions';
import { CustomCard } from '../../../redux/models/custom-card.model';
import { AppState } from '../../../redux/reducers';
import { selectGetCustomCardById } from '../../../redux/selectors/custom-card.selector';
import { selectGetVideoById } from '../../../redux/selectors/video.selectors';
import { ResponseItem } from '../../models/video-response.model';
import { YoutubeService } from '../../services/youtube.service';

@Component({
  selector: 'app-detailed-information',
  templateUrl: './detailed-information.component.html',
  styleUrls: ['./detailed-information.component.scss'],
})
export class DetailedInformationComponent implements OnInit {
  videoDetail$: Observable<ResponseItem | undefined>;
  cardDetail$: Observable<CustomCard | undefined>;
  videoId: string | null = '';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private youtubeService: YoutubeService,
    private store: Store<AppState>,
  ) {
    this.videoId = this.route.snapshot.paramMap.get('id');
    this.videoDetail$ = this.store.select(selectGetVideoById(this.videoId!));
    this.cardDetail$ = this.store.select(selectGetCustomCardById(this.videoId!));
  }

  ngOnInit() {
    this.videoId = this.route.snapshot.paramMap.get('id');

  
  }

  goBack() {
    this.router.navigate(['/']);
  }
  deleteCustomCard(){
    this.store.dispatch(removeCustomCard({cardId: this.videoId!}))
    this.goBack()
  }
}
