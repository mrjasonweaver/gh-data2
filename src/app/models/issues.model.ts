export interface IIssue {
  id: number;
  url: string;
  comments: number;
  number: number;
  title: string;
  body: string;
  user: {
    login: string;
    type: string;
  };
  created_at: string;
}

export interface IIssuesObject {
  total_count: number;
  items: IIssue[];
}

export const initialIssuesObject: IIssuesObject = {
  total_count: 0,
  items: []
};

export interface IIssuesParams {
  username: string;
  repo: string;
  type: string;
  page: number;
  perPage: number;
  sort: string;
  order: string;
  searchTerm: string;
}

export const issuesParams: IIssuesParams = {
  username: 'angular',
  repo: 'angular',
  type: 'issues',
  page: 1,
  perPage: 10,
  sort: 'created',
  order: 'desc',
  searchTerm: ''
};

export const mockIssuesObject: IIssuesObject = {
  total_count: 1000,
  items: [
    {
      id: 1,
      url: 'http://github.com',
      comments: 1,
      number: 1,
      title: 'This is a title',
      body: 'This is an issue',
      user: {
        login: 'bobby1',
        type: 'User'
      },
      created_at: '2018-05-09T14:39:24Z'
    }, {
      id: 2,
      url: 'http://github.com',
      comments: 2,
      number: 2,
      title: 'This is a title2',
      body: 'This is an issue2',
      user: {
        login: 'bobby2',
        type: 'User'
      },
      created_at: '2018-05-09T14:40:24Z'
    }
  ]
};