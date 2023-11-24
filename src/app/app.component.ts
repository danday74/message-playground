import { Component, OnInit } from '@angular/core'
import { MessageService } from './services/message.service'
import { IMessage } from './interfaces/i-message'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  messages: IMessage[] = []

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.messageService.messageReplay$.pipe(
    ).subscribe((message: IMessage) => {
      this.messages = [...this.messages, message]
    })
  }

  bob1(): void {
    this.messageService.sendReplay('bob', this.constructor.name, 1)
  }

  bob2(): void {
    this.messageService.sendReplay('bob', this.constructor.name, 2)
  }

  fred1(): void {
    this.messageService.sendReplay('fred', this.constructor.name, 1)
  }

  fred2(): void {
    this.messageService.sendReplay('fred', this.constructor.name, 2)
  }
}
