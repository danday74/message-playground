import { Injectable } from '@angular/core'
import { from, Observable, Subject } from 'rxjs'
import { distinctUntilChanged, map, publishReplay, scan, switchMap } from 'rxjs/operators'
import { cloneDeep, isEqual, values } from 'lodash-es'
import { IMessage } from '../interfaces/i-message'
import { IDictionary } from '../interfaces/i-dictionary'

@Injectable({ providedIn: 'root' })
export class MessageService {
  private messageReplaySource = new Subject<IMessage>()
  private messageReplayConnect$: Observable<IDictionary<IMessage>> = this.messageReplaySource.pipe(
    scan((acc: IDictionary<IMessage>, message: IMessage) => ({ ...acc, [message.name]: message }), {}),
    map((acc: { [p: string]: IMessage }) => cloneDeep(acc)),
    distinctUntilChanged(isEqual),
    publishReplay(1)
  )

  messageReplay$: Observable<IMessage> = this.messageReplayConnect$.pipe(
    switchMap((messages: IDictionary<IMessage>) => from(values(messages)))
  )

  constructor() {
    // @ts-ignore
    this.messageReplayConnect$.connect()
  }

  // this.messageService.sendReplay('example', this.constructor.name)
  sendReplay(name: string, sender: string, payload: any = null): void {
    const message: IMessage = { name, sender, payload }
    this.messageReplaySource.next(message)
  }
}
