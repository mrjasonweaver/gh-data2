import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PullRequestsComponent } from './pull-requests.component';
import { PullRequestsStore } from '../../store/pull-requests.store';
import { IssuesService } from 'src/app/services/issues/issues.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { CacheService } from 'src/app/services/cache/cache.service';
import { UiStateStore } from 'src/app/store/ui-state.store';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

xdescribe('PullRequestsComponent', () => {
  let component: PullRequestsComponent;
  let fixture: ComponentFixture<PullRequestsComponent>;
  const fakeActivatedRoute = {
    snapshot: { data: {} }
  } as ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PullRequestsComponent, RouterTestingModule ],
      providers: [
        PullRequestsStore,
        IssuesService,
        HttpClient,
        HttpHandler,
        CacheService,
        UiStateStore,
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PullRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
