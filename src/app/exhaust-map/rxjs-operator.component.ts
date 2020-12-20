import {Component, OnInit} from '@angular/core';
import {combineLatest, interval, merge, Observable, Subject, timer} from "rxjs";
import {exhaustMap, map, mergeMap, switchMap, take} from "rxjs/operators";

@Component({
  selector: 'app-rxjs-operator',
  template: `
    <button
      (click)="exhasutMapCount$ = exhasutMapCount$ + 1;
              subjectExhaustMap.next('ExhaustMap button clicked ' + exhasutMapCount$ + ' : ')">
      ExhaustMap
    </button><br/>
    <br/>
    <button
      (click)="mergeMapCount$ = mergeMapCount$ + 1;
       subjectMergeMap.next('MergeMap button cliecked ' + mergeMapCount$ + ' : ')">
      MergeMap
    </button><br/><br/>
    <button
      (click)="
      switchMapCount$ = switchMapCount$ + 1;
      subjectSwitchMap.next('SwitchMap button clicked ' + switchMapCount$ + ' : ')">
      switchMap
    </button><br/><br/>
    <button (click)="mergeCount$ = mergeCount$ + 1;
    subjectMerge.next('Merge button clicked ' + mergeCount$ + ' : ')
">Merge
    </button><br/><br/>
    <button (click)="combineLatest()">CombineLatest</button>


  `
})
export class RxjsOperatorComponent implements OnInit {

  subjectExhaustMap: Subject<string> = new Subject<string>();
  exhasutMapCount$: number = 0;

  subjectMergeMap: Subject<string> = new Subject<string>();
  mergeMapCount$: number = 0;

  subjectMerge: Subject<string> = new Subject<string>();
  mergeCount$: number = 0;

  subjectSwitchMap: Subject<string> = new Subject<string>();
  switchMapCount$: number = 0;

  constructor() {
  }

  ngOnInit() {
    this.initExhaustMap();
    this.initMergeMap();
    this.initSwitchMap();
    this.initMerge();
  }


  private initExhaustMap() {
    this.subjectExhaustMap.pipe(exhaustMap(
      x => interval(1000).pipe(map(value => x + ' ' + value), take(10))
    )).subscribe(console.log);
  }

  private initMergeMap() {
    this.subjectMergeMap.pipe(
      mergeMap(x => interval(1000).pipe(map(value => x + ' ' + value), take(10)))
    ).subscribe(console.log);
  }

  private initSwitchMap() {
    this.subjectSwitchMap.pipe(
      switchMap(x => interval(1000).pipe(map(value => x + ' ' + value), take(10)))
    ).subscribe(console.log);
  }


  private initMerge() {
    merge(this.subjectMerge, interval(1000).pipe(take(10))).subscribe(console.log);
  }

  combineLatest() {
    const source1:Observable<string> = timer(0, 1000).pipe(map(value => value + ' s '));
    const source2:Observable<string> = timer(500, 1000 ).pipe(map(value => (value + 0.5) +' s '));
    combineLatest(source1, source2).subscribe(([x,y]) => {
      console.log(x + ' , ' + y)
    });
  }
}

