  
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IIssuesObject, IIssuesParams } from '../../models/issues.model';

@Injectable()
export class IssuesService {
  url = 'https://api.github.com/search/issues';

  constructor(private http: HttpClient) {}

  getIssues(params: IIssuesParams): Observable<IIssuesObject> {
    const unRepoSegments = `?q=user:${params.searchTerm}+type:${params.type}+is:open&sort=${params.sort}&order=${params.order}`;
    const queryParamsSegments = `&page=${params.page}&per_page=${params.perPage}`;
    return this.http.get<IIssuesObject>(`${this.url}${unRepoSegments}${queryParamsSegments}`);
  }

}