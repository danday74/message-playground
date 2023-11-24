import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

// a base component to simplify unsubscribing
@Component({ template: '' })
export class DestroyerComponent implements OnDestroy {
  protected unsubscribe$: Subject<any> = new Subject();

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
