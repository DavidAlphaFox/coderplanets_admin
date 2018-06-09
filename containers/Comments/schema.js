import gql from 'graphql-tag'

const comments = gql`
  query comments($id: ID!, $filter: CommentsFilter!, $userHasLogin: Boolean!) {
    comments(id: $id, filter: $filter) {
      entries {
        id
        body
        floor
        author {
          id
          nickname
          avatar
        }
        viewerHasLiked @include(if: $userHasLogin)
        viewerHasDisliked @include(if: $userHasLogin)
        replyTo {
          id
          body
          floor
          author {
            id
            avatar
            nickname
          }
        }
        replies(filter: { first: 5 }) {
          id
          author {
            id
            avatar
            nickname
          }
        }
        repliesCount
        likesCount
        dislikesCount
        insertedAt
        updatedAt
      }
      pageNumber
      pageSize
      totalCount
      totalPages
    }
  }
`
const createComment = gql`
  mutation($thread: CmsThread, $id: ID!, $body: String!) {
    createComment(thread: $thread, id: $id, body: $body) {
      id
      body
    }
  }
`
const replyComment = gql`
  mutation($thread: CmsThread, $id: ID!, $body: String!) {
    replyComment(thread: $thread, id: $id, body: $body) {
      id
      body
    }
  }
`
const deleteComment = gql`
  mutation($thread: CmsThread, $id: ID!) {
    deleteComment(thread: $thread, id: $id) {
      id
    }
  }
`

const likeComment = gql`
  mutation($thread: CmsThread, $id: ID!) {
    likeComment(thread: $thread, id: $id) {
      id
      viewerHasLiked
      likesCount
    }
  }
`
const undoLikeComment = gql`
  mutation($thread: CmsThread, $id: ID!) {
    undoLikeComment(thread: $thread, id: $id) {
      id
      viewerHasLiked
      likesCount
    }
  }
`
const dislikeComment = gql`
  mutation($thread: CmsThread, $id: ID!) {
    dislikeComment(thread: $thread, id: $id) {
      id
      viewerHasDisliked
      dislikesCount
    }
  }
`
const undoDislikeComment = gql`
  mutation($thread: CmsThread, $id: ID!) {
    undoDislikeComment(thread: $thread, id: $id) {
      id
      viewerHasDisliked
      dislikesCount
    }
  }
`

const schema = {
  comments,
  createComment,
  replyComment,
  deleteComment,
  likeComment,
  undoLikeComment,
  dislikeComment,
  undoDislikeComment,
}

export default schema
