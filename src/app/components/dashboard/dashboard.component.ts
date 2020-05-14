import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { IIssuesParams, issuesParams } from '../../models/issues.model';
import { IssuesStore } from '../../store/issues.store';
import { PullRequestsStore } from '../../store/pull-requests.store';
import { CurrentUserStore } from '../../store/current-user.store';
import { pullRequestsParams } from 'src/app/models/pull-requests.model';
import { commitsParams, ICommitsParams, ICommitTimelineYear } from 'src/app/models/commits.model';
import { CommitsStore } from 'src/app/store/commits.store';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  cuSub: Subscription;
  currentUser;
  view: any[] = [1000, 300];
  formattedDates;

  // options
  legend: boolean = false;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  gradient: boolean = true;

  colorScheme = {
    domain: ['#26C6DA']
  };

  constructor(
    public currentUserStore: CurrentUserStore,
    public issuesStore: IssuesStore,
    public pullRequestsStore: PullRequestsStore,
    public commitsStore: CommitsStore
  ) {
    this.getYearlyTimeframe();
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

  getYearlyTimeframe() {
    const currentDate = Date.now();
    let d = new Date(currentDate),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }

    const OneYearAgo = year - 1;
    const formattedDateNow = [year, month, day].join('-');
    const formattedDate1YearAgo = [OneYearAgo, month, day].join('-');
    return this.formattedDates = [formattedDate1YearAgo, formattedDateNow];
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
      username: this.currentUser,
      afterDate: this.formattedDates[0],
      beforeDate: this.formattedDates[1]
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