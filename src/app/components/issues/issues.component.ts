import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { IIssuesParams, issuesParams } from '../../models/issues.model';
import { IssuesStore } from '../../store/issues.store';
import { UiStateStore } from '../../store/ui-state.store';
import { CurrentUserStore } from '../../store/current-user.store';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css']
})
export class IssuesComponent implements OnInit, OnDestroy {
  routeQueryParams;
  displayedColumns = ['number', 'user', 'type', 'title', 'created', 'comments'];
  pSub: Subscription;
  cuSub: Subscription;
  currentUser;

  constructor(
    public issuesStore: IssuesStore,
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

  private getIssuesParams(p): IIssuesParams {
    return {
      ...issuesParams,
      type: p.get('type') || issuesParams.type,
      sort: p.get('sort') || issuesParams.sort,
      order: p.get('order') || issuesParams.order,
      page: p.get('page') || issuesParams.page,
      perPage: p.get('perPage') || issuesParams.perPage,
      searchTerm: p.get('searchTerm') || this.currentUser
    };
  }

  private navigate(): Subscription {
    return this.pSub = this.uiStateStore.routeQueryParams$.subscribe(p => {
      this.routeQueryParams = p;
      return this.issuesStore.loadIssues(this.getIssuesParams(p));
    });
  }

  onPageChange(event, routeQueryParams): Promise<boolean> {
    const page = event.pageIndex + 1;
    const { sort, order, searchTerm } = routeQueryParams;
    return this.router.navigate(['/issues'], { queryParams: { sort, order, page, searchTerm } });
  }

  onSortData(event, routeQueryParams): Promise<boolean> {
    const { active: sort, direction: order } = event;
    const { page, searchTerm } = routeQueryParams;
    return this.router.navigate(['/issues'], { queryParams: { sort, order, page, searchTerm } });
  }

}