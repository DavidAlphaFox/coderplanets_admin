import F from '../fragments'

// contributesDigest
export const subscribedCommunities = `
  query subscribedCommunities($userId: ID, $filter: PagedFilter!) {
    subscribedCommunities(userId: $userId, filter: $filter) {
      entries {
        ${F.community}
        contributesDigest
      }
      ${F.pagedCounts}
    }
  }
`
export const community = `
  query community($id: ID, $raw: String) {
    community(id: $id, raw: $raw) {
      ${F.community}
      threads {
        id
        title
        raw
      }
      contributesDigest
      subscribersCount
      editorsCount
      postsCount
      jobsCount
      videosCount
      reposCount
      threadsCount
      tagsCount
    }
  }
`
export const pagedCommunities = `
  query($filter: CommunitiesFilter!) {
    pagedCommunities(filter: $filter) {
      entries {
        ${F.community}
        threads {
          id
          title
          raw
        }
        categories {
          id
          title
          raw
        }
        postsCount
        jobsCount
        videosCount
        reposCount
        contributesDigest
        subscribersCount
        insertedAt
        updatedAt
      }
      ${F.pagedCounts}
    }
  }
`

export const communitySubscribers = `
  query($id: ID, $community: String, $filter: PagedFilter!) {
    communitySubscribers(id: $id, community: $community, filter: $filter) {
      entries {
        ${F.user}
      }
      ${F.pagedCounts}
    }
  }
`
