import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { makeKeyStr } from '../utilities/objects/make-key-string';
import { CacheService } from '../services/cache/cache.service';
import { UiStateStore } from './ui-state.store';
import { CommitsService } from '../services/commits/commits.service';
import { ICommitsObject, ICommitsParams, ICommit, initialCommitsObject } from '../models/commits.model';

@Injectable()
export class CommitsStore {
  private _key: string;
  private _commitsObject: BehaviorSubject<ICommitsObject> = new BehaviorSubject(initialCommitsObject);
  public readonly commitsObject: Observable<ICommitsObject> = this._commitsObject;
  config = { duration: 3000 };

  constructor(
    private CommitsService: CommitsService,
    private cache: CacheService,
    public uiStateStore: UiStateStore,
    public snackBar: MatSnackBar
  ) { }

  get Commits$(): Observable<ICommit[]> {
    return this.commitsObject.pipe( pluck('items') );
  }
  get CommitsCount$(): Observable<number> {
    return this.commitsObject.pipe( pluck('total_count') );
  }

  loadCommits(p: ICommitsParams): Subscription | void {
    this._key = makeKeyStr(p);
    this.uiStateStore.startAction('Retrieving Commits...', false);
    return this.cache.validKey(this._key) ? this.loadCache() : this.loadApi(p);
  }

  loadCache(): void {
    const commits = this.cache.getCache(this._key).value;
    this._commitsObject.next(commits);
    this.uiStateStore.endAction('Commits retrieved', false);
  }

  loadApi(p: ICommitsParams): Subscription {
    return this.CommitsService.getCommits(p).subscribe(res => {
      this.cache.setCache(this._key, res);
      this._commitsObject.next(res);
      this.uiStateStore.endAction('Commits retrieved', false);
    },
      err =>  {
        this.uiStateStore.endAction('Error retrieving Commits', false);
        this.snackBar.open('No Commits found', null, this.config);
      }
    );
  }

}