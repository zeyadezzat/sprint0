import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from '../../message.service';
@Component({
  selector: 'app-message-handler',
  templateUrl: './message-handler.component.html',
  styleUrls: ['./message-handler.component.scss']
})
export class MessageHandlerComponent implements OnInit {

  constructor(public messageService: MessageService) { }
  
  ngOnInit() {
  }
}
