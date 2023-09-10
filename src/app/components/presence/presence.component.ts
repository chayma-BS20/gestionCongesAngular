import { Component, OnInit } from '@angular/core';
import { Presence } from 'src/app/models/presence';
import { PresenceService } from 'src/app/services/presence.service';


@Component({
  selector: 'app-presence',
  templateUrl: './presence.component.html',
  styleUrls: ['./presence.component.css']
})
export class PresenceComponent implements OnInit {
  presences: Presence[] = [];

  constructor(private presenceService: PresenceService) {}

  ngOnInit(): void {
    this.loadPresences();
  }

  loadPresences(): void {
    this.presenceService.getPresences().subscribe((data) => {
      this.presences = data;
    });
  }
}