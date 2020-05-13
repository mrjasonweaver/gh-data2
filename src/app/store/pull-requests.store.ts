import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { makeKeyStr } from '../utilities/objects/make-key-string';
import { CacheService } from '../services/cache/cache.service';
import { UiStateStore } from './ui-state.store';
import { IssuesService } from '../services/issues/issues.service';
import { IIssuesObject, IIssuesParams, IIssue, initialIssuesObject } from '../models/issues.model';

@Injectable()
export class PullRequestsStore {
  private _key: string;
  private _pullRequestsObject: BehaviorSubject<IIssuesObject> = new BehaviorSubject(initialIssuesObject);
  public readonly pullRequestsObject: Observable<IIssuesObject> = this._pullRequestsObject;
  config = { duration: 3000 };

  constructor(
    private issuesService: IssuesService,
    private cache: CacheService,
    public uiStateStore: UiStateStore,
    public snackBar: MatSnackBar
  ) { }

  get pullRequests$(): Observable<IIssue[]> {
    return this.pullRequestsObject.pipe( pluck('items') );
  }
  get pullRequestsCount$(): Observable<number> {
    return this.pullRequestsObject.pipe( pluck('total_count') );
  }

  loadPullRequests(p: IIssuesParams): Subscription | void {
    this._key = makeKeyStr(p);
    this.uiStateStore.startAction('Retrieving Pull Requests...', false);
    return this.cache.validKey(this._key) ? this.loadCache() : this.loadApi(p);
  }

  loadCache(): void {
    const issues = this.cache.getCache(this._key).value;
    this._pullRequestsObject.next(issues);
    this.uiStateStore.endAction('Pull Requests retrieved', false);
  }

  loadApi(p: IIssuesParams): Subscription {
    return this.issuesService.getIssues(p).subscribe(res => {
      this.cache.setCache(this._key, res);
      this._pullRequestsObject.next(res);
      this.uiStateStore.endAction('Pull Requests retrieved', false);
    },
      err =>  {
        this.uiStateStore.endAction('Error retrieving Pull Requests', false);
        this.snackBar.open('No Pull Requests found', null, this.config);
      }
    );
  }

}