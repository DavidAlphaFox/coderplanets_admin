import { pagedPosts, post } from './post'
import { pagedJobs, job } from './job'
import { pagedVideos, video } from './video'
import { pagedRepos, repo } from './repo'
import { user, sessionState } from './user'
import { community, subscribedCommunities, pagedCommunities } from './community'
import { pagedComments } from './comment'
import { pagedCategories, partialTags } from './misc'
import { pagedTags } from './tag'
import { pagedThreads } from './thread'
import cheatsheet from './cheatsheet'
import wiki from './wiki'

const P = {
  // community
  community,
  subscribedCommunities,
  pagedCommunities,
  // comment
  pagedComments,
  // misc
  pagedTags,
  pagedThreads,
  pagedCategories,
  partialTags,
  // post
  pagedPosts,
  post,
  // job
  pagedJobs,
  job,
  // video
  pagedVideos,
  video,
  // repo
  pagedRepos,
  repo,
  // user
  user,
  sessionState,
  // cheatsheet
  cheatsheet,
  // wiki
  wiki,
}

export default P
