import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { IIssuesParams, issuesParams } from '../../models/issues.model';
import { IssuesStore } from '../../store/issues.store';
import { PullRequestsStore } from '../../store/pull-requests.store';
import { CurrentUserStore } from '../../store/current-user.store';
import { pullRequestsParams } from 'src/app/models/pull-requests.model';
import { commitsParams, ICommitsParams } from 'src/app/models/commits.model';
import { multi } from 'src/app/data';
import { CommitsStore } from 'src/app/store/commits.store';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  cuSub: Subscription;
  currentUser;
  multi: any[];
  view: any[] = [1000, 300];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Population';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor(
    public currentUserStore: CurrentUserStore,
    public issuesStore: IssuesStore,
    public pullRequestsStore: PullRequestsStore,
    public commitsStore: CommitsStore
  ) {
    Object.assign(this, { multi });
  }

  ngOnInit() {
    this.cuSub = this.currentUserStore.currentUser$.subscribe(user => this.currentUser = user.login);
    this.loadUserIssues();
    this.loadUserPullRequests();
    this.loadCommits();
  }

  ngOnDestroy() {
    if (this.cuSub) {
      this.cuSub.unsubscribe();
    }
  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  private getIssuesParams(): IIssuesParams {
    return {
      ...issuesParams,
      searchTerm: this.currentUser
    };
  }

  private getPullRequestsParams(): IIssuesParams {
    return {
      ...pullRequestsParams,
      searchTerm: this.currentUser
    };
  }

  private getCommitsParams(): ICommitsParams {
    return {
      ...commitsParams,
      username: this.currentUser
    };
  }

  private loadUserIssues(): void {
    this.issuesStore.loadIssues(this.getIssuesParams());
  }

  private loadUserPullRequests(): void {
    this.pullRequestsStore.loadPullRequests(this.getPullRequestsParams());
  }

  private loadCommits(): void {
    this.commitsStore.loadCommits(this.getCommitsParams());
  }

}