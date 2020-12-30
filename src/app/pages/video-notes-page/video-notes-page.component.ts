import { Component, OnInit } from '@angular/core';
import { VideoNoteService } from 'src/app/services/video-note.service';

@Component({
  selector: 'app-video-notes-page',
  templateUrl: './video-notes-page.component.html',
  styleUrls: ['./video-notes-page.component.scss']
})
export class VideoNotesPageComponent implements OnInit {

  constructor( public videoNotes: VideoNoteService) { }

  ngOnInit(): void {
  }

}
