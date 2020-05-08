import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { IIssuesParams } from '../../models/issues.model';
import { pullRequestsParams } from '../../models/pull-requests.model';
import { PullRequestsStore } from '../../store/pull-requests.store';
import { UiStateStore } from '../../store/ui-state.store';
import { CurrentUserStore } from '../../store/current-user.store';

@Component({
  selector: 'app-pull-requests',
  templateUrl: './pull-requests.component.html',
  styleUrls: ['./pull-requests.component.css']
})
export class PullRequestsComponent implements OnInit, OnDestroy {
  routeQueryParams;
  displayedColumns = ['number', 'user', 'type', 'title', 'created', 'comments'];
  pSub: Subscription;
  cuSub: Subscription;
  currentUser;

  constructor(
    public pullRequestsStore: PullRequestsStore,
    public uiStateStore: UiStateStore,
    public currentUserStore: CurrentUserStore,
    private router: Router
  ) {
    this.cuSub = this.currentUserStore.currentUser$.subscribe(user => this.currentUser = user.login);
  }

  ngOnInit() {
    this.navigate();
  }

  ngOnDestroy() {
    this.pSub.unsubscribe();
    if (this.cuSub) {
      this.cuSub.unsubscribe();
    }
  }

  private getPullRequestsParams(p): IIssuesParams {
    return {
      ...pullRequestsParams,
      type: p.get('type') || pullRequestsParams.type,
      sort: p.get('sort') || pullRequestsParams.sort,
      order: p.get('order') || pullRequestsParams.order,
      page: p.get('page') || pullRequestsParams.page,
      perPage: p.get('perPage') || pullRequestsParams.perPage,
      searchTerm: p.get('searchTerm') || this.currentUser
    };
  }

  private navigate(): Subscription {
    return this.pSub = this.uiStateStore.routeQueryParams$.subscribe(p => {
      this.routeQueryParams = p;
      return this.pullRequestsStore.loadPullRequests(this.getPullRequestsParams(p));
    });
  }

  onPageChange(event, routeQueryParams): Promise<boolean> {
    const page = event.pageIndex + 1;
    const { sort, order, searchTerm } = routeQueryParams;
    return this.router.navigate(['/pullrequests'], { queryParams: { sort, order, page, searchTerm } });
  }

  onSortData(event, routeQueryParams): Promise<boolean> {
    const { active: sort, direction: order } = event;
    const { page, searchTerm } = routeQueryParams;
    return this.router.navigate(['/pullrequests'], { queryParams: { sort, order, page, searchTerm } });
  }

}