import { Component, OnInit } from '@angular/core'
import { MessageService } from './services/message.service'
import { IMessage } from './interfaces/i-message'
import { distinctUntilChanged, filter, takeUntil } from 'rxjs/operators'
import { isEqual } from 'lodash-es'
import { DestroyerComponent } from './components/destroyer.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends DestroyerComponent implements OnInit {
  messages: IMessage[] = []

  constructor(private messageService: MessageService) {
    super()
  }

  ngOnInit(): void {
    this.messageService.messageReplay$.pipe(
    ).subscribe((message: IMessage) => {
      this.messages = [...this.messages, message]
    })

    this.messageService.messageReplay$
      .pipe(
        takeUntil(this.unsubscribe$), // assumes component extends DestroyerComponent
        filter((message: IMessage) => message.name === 'myMessage1'),
        distinctUntilChanged(isEqual) // WORKAROUND
      )
      .subscribe((message: IMessage) => {
        console.log('XXX', message.name)
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
