export interface IMessage {
  name: string
  payload: any
  sender: string // the sender of the message (to ease debugging) - typically this.constructor.name
}
