import { IIssuesParams } from './issues.model';

export const pullRequestsParams: IIssuesParams = {
  username: 'angular',
  repo: 'angular',
  type: 'pr',
  page: 1,
  perPage: 10,
  sort: 'created',
  order: 'desc',
  searchTerm: ''
};