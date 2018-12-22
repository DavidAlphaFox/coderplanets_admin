import F from '../fragments'

export const repo = `
  query($id: ID!) {
    repo(id: $id) {
      ${F.repo}
      readme
      author {
        ${F.author}
        bio
        location
        achievement {
          reputation
        }
        followersCount
        followingsCount
      }
      favoritedCount
      pagedCommentsParticipators {
        entries {
          ${F.author}
        }
        totalCount
      }
      communities {
        ${F.community}
      }
      tags {
        ${F.tag}
      }
    }
  }
`

export const pagedRepos = `
  query($filter: PagedArticleFilter) {
    pagedRepos(filter: $filter) {
      entries {
        ${F.repo}
        views
        releaseTag
        repoUrl
        author {
          ${F.author}
        }
        communities {
          ${F.community}
        }
        tags {
          ${F.tag}
        }
      }
      ${F.pagedCounts}
    }
  }
`
