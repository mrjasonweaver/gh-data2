export interface ICommit {
  sha: string;
  commit: {
    url: string;
    author: {
      date: string;
      name: string;
      email: string;
    },
    committer: {
      date: string;
      name: string;
      email: string;
    },
    message: string;
  },
  author: {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
  },
  committer: {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
  },
  repository: {
    id: number;
    node_id: string;
    name: string;
    full_name: string;
    owner: {
      login: string;
    }
  }
}

export interface ICommitTimelineMonth {
  name: string; // month
  value: number; // number of commits
}

export interface ICommitTimelineYear {
  name: string; // "Commits"
  series: ICommitTimelineMonth[]; // array of months
}

export const initialCommitTimelineYearObject: ICommitTimelineYear = {
  name: 'Commits',
  series: [
    {
      "name": "Jan",
      "value": 0
    },
    {
      "name": "Feb",
      "value": 0
    },
    {
      "name": "Mar",
      "value": 0
    },
    {
      "name": "Apr",
      "value": 0
    },
    {
      "name": "May",
      "value": 0
    },
    {
      "name": "Jun",
      "value": 0
    },
    {
      "name": "Jul",
      "value": 0
    },
    {
      "name": "Aug",
      "value": 0
    },
    {
      "name": "Sep",
      "value": 0
    },
    {
      "name": "Oct",
      "value": 0
    },
    {
      "name": "Nov",
      "value": 0
    },
    {
      "name": "Dec",
      "value": 0
    }
  ]
};

export const initialCommitTimelineYear = [ initialCommitTimelineYearObject ]

export interface ICommitsObject {
  total_count: number;
  items: ICommit[];
}

export const initialCommitsObject: ICommitsObject = {
  total_count: 0,
  items: []
};

export interface ICommitsParams {
  username: string;
  afterDate: string;
  beforeDate: string;
}

export const commitsParams: ICommitsParams = {
  username: 'angular',
  afterDate: '2019-02-04T14:38:36-08:00',
  beforeDate: '2020-02-04T14:38:36-08:00'
};

export const mockCommitsObject: ICommitsObject = {
  total_count: 1000,
  items: [
    {
      "sha": "bb4cc8d3b2e14b3af5df699876dd4ff3acd00b7f",
      "commit": {
        "url": "https://api.github.com/repos/octocat/Spoon-Knife/git/commits/bb4cc8d3b2e14b3af5df699876dd4ff3acd00b7f",
        "author": {
          "date": "2014-02-04T14:38:36-08:00",
          "name": "The Octocat",
          "email": "octocat@nowhere.com"
        },
        "committer": {
          "date": "2014-02-12T15:18:55-08:00",
          "name": "The Octocat",
          "email": "octocat@nowhere.com"
        },
        "message": "Create styles.css and updated README"
      },
      "author": {
        "login": "octocat",
        "id": 583231,
        "node_id": "MDQ6VXNlcjU4MzIzMQ==",
        "avatar_url": "https://avatars.githubusercontent.com/u/583231?v=3",
      },
      "committer": {
        "login": "octocat",
        "id": 583231,
        "node_id": "MDQ6VXNlcjU4MzIzMQ==",
        "avatar_url": "https://avatars.githubusercontent.com/u/583231?v=3"
      },
      "repository": {
        "id": 1300192,
        "node_id": "MDEwOlJlcG9zaXRvcnkxMzAwMTky",
        "name": "Spoon-Knife",
        "full_name": "octocat/Spoon-Knife",
        "owner": {
          "login": "octocat",
        }
      }
    }, {
      "sha": "bb4cc8d3b2e14b3af5df699876dd4ff3acd00b73",
      "commit": {
        "url": "https://api.github.com/repos/octocat/Spoon-Knife/git/commits/bb4cc8d3b2e14b3af5df699876dd4ff3acd00b7f",
        "author": {
          "date": "2014-02-04T14:38:36-08:00",
          "name": "The Octocat",
          "email": "octocat@nowhere.com"
        },
        "committer": {
          "date": "2014-02-12T15:18:55-08:00",
          "name": "The Octocat",
          "email": "octocat@nowhere.com"
        },
        "message": "Create styles.css and updated README"
      },
      "author": {
        "login": "octocat",
        "id": 583231,
        "node_id": "MDQ6VXNlcjU4MzIzMQ==",
        "avatar_url": "https://avatars.githubusercontent.com/u/583231?v=3",
      },
      "committer": {
        "login": "octocat",
        "id": 583231,
        "node_id": "MDQ6VXNlcjU4MzIzMQ==",
        "avatar_url": "https://avatars.githubusercontent.com/u/583231?v=3"
      },
      "repository": {
        "id": 1300192,
        "node_id": "MDEwOlJlcG9zaXRvcnkxMzAwMTky",
        "name": "Spoon-Knife",
        "full_name": "octocat/Spoon-Knife",
        "owner": {
          "login": "octocat",
        }
      }
    }
  ]
};