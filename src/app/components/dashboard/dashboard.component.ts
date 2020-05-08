import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { IIssuesParams, issuesParams } from '../../models/issues.model';
import { IssuesStore } from '../../store/issues.store';
import { PullRequestsStore } from '../../store/pull-requests.store';
import { CurrentUserStore } from '../../store/current-user.store';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  cuSub: Subscription;
  currentUser;

  constructor(
    public currentUserStore: CurrentUserStore,
    public issuesStore: IssuesStore,
    public pullRequestsStore: PullRequestsStore
  ) { }

  ngOnInit() {
    this.cuSub = this.currentUserStore.currentUser$.subscribe(user => this.currentUser = user.login);
    this.loadUserIssues();
    this.loadUserPullRequests();
  }

  ngOnDestroy() {
    if (this.cuSub) {
      this.cuSub.unsubscribe();
    }
  }

  private getParams(): IIssuesParams {
    return {
      ...issuesParams,
      searchTerm: this.currentUser
    };
  }

  private loadUserIssues(): void {
    this.issuesStore.loadIssues(this.getParams());
  }

  private loadUserPullRequests(): void {
    this.pullRequestsStore.loadPullRequests(this.getParams());
  }

}