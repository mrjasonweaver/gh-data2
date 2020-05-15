import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ICommitsObject, ICommitsParams } from '../../models/commits.model';

@Injectable({
  providedIn: 'root'
})
export class CommitsService {
  url = 'https://api.github.com/search/commits';

  constructor(private http: HttpClient) {}

  getCommits(params: ICommitsParams): Observable<ICommitsObject> {
    const unSegment = `?q=author:${params.username}`;
    const dateRangeSegment = `+author-date:${params.afterDate}..${params.beforeDate}+sort:author-date`;
    const perPageSegment = `&per_page=100`;
    return this.http.get<ICommitsObject>(`${this.url}${unSegment}${dateRangeSegment}${perPageSegment}`,
    {headers: new HttpHeaders().set('Accept', 'application/vnd.github.cloak-preview')});
  }
}
