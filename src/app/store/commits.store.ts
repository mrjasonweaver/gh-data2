import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { makeKeyStr } from '../utilities/objects/make-key-string';
import { CacheService } from '../services/cache/cache.service';
import { UiStateStore } from './ui-state.store';
import { CommitsService } from '../services/commits/commits.service';
import { ICommitsObject, ICommitsParams, ICommit, initialCommitsObject,
  ICommitTimelineYear, initialCommitTimelineYearObject, initialCommitTimelineYear } from '../models/commits.model';

@Injectable()
export class CommitsStore {
  private _key: string;
  private _commitsObject: BehaviorSubject<ICommitsObject> = new BehaviorSubject(initialCommitsObject);
  public readonly commitsObject: Observable<ICommitsObject> = this._commitsObject;
  private _commitsTimeline: BehaviorSubject<ICommitTimelineYear[]> = new BehaviorSubject(initialCommitTimelineYear);
  public readonly commitsTimeline: Observable<ICommitTimelineYear[]> = this._commitsTimeline;
  config = { duration: 3000 };

  constructor(
    private commitsService: CommitsService,
    private cache: CacheService,
    public uiStateStore: UiStateStore,
    public snackBar: MatSnackBar
  ) { }

  get commits$(): Observable<ICommit[]> {
    return this.commitsObject.pipe( pluck('items') );
  }
  get commitsCount$(): Observable<number> {
    return this.commitsObject.pipe( pluck('total_count') );
  }
  get commitsTimeline$(): Observable<ICommitTimelineYear[]> {
    return this.commitsTimeline;
  }

  loadCommits(p: ICommitsParams): Subscription | void {
    this._key = makeKeyStr(p);
    this.uiStateStore.startAction('Retrieving Commits...', false);
    return this.cache.validKey(this._key) ? this.loadCache() : this.loadApi(p);
  }

  loadCache(): void {
    const commits = this.cache.getCache(this._key).value;
    const timeline = this.makeCommitsTimeline(commits);
    this._commitsObject.next(commits);
    this._commitsTimeline.next([timeline]);
    this.uiStateStore.endAction('Commits retrieved', false);
  }

  loadApi(p: ICommitsParams): Subscription {
    return this.commitsService.getCommits(p).subscribe(res => {
      const timeline = this.makeCommitsTimeline(res.items);
      this.cache.setCache(this._key, res);
      this._commitsObject.next(res);
      this._commitsTimeline.next([timeline]);
      this.uiStateStore.endAction('Commits retrieved', false);
    },
      err =>  {
        this.uiStateStore.endAction('Error retrieving Commits', false);
        this.snackBar.open('No Commits found', null, this.config);
      }
    );
  }

  makeCommitsTimeline(data: ICommit[]): ICommitTimelineYear {
    let commitsByMonth = initialCommitTimelineYearObject;
    const dateNow = Date.now();
    const currentMonthIndex = new Date(dateNow).getMonth();
    data.forEach((commit: ICommit) => {
      const indexOfMonth = +commit.commit.author.date.split('-')[1] - 1;
      return commitsByMonth.series[indexOfMonth].value = commitsByMonth.series[indexOfMonth].value + 1;
    });
    const startWithCurrentMonth = commitsByMonth.series.slice(currentMonthIndex + 1);
    const beginningOfYear = commitsByMonth.series.slice(0, currentMonthIndex + 1);
    const startWithCurrentMonthArray = startWithCurrentMonth.concat(beginningOfYear);
    return { ...commitsByMonth, series: startWithCurrentMonthArray };
  }

}