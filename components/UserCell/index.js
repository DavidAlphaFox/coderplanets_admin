/*
 *
 * UserCell
 *
 */

import React from 'react'
import PropTypes from 'prop-types'

import { UserCellWrapper, Avatar, NickName } from './styles'

import { makeDebugger } from '../../utils'
/* eslint-disable no-unused-vars */
const debug = makeDebugger('c:UserCell:index')
/* eslint-enable no-unused-vars */

const UserCell = ({ user }) => {
  return (
    <UserCellWrapper>
      <Avatar src={user.avatar} />
      <NickName>{user.nickname}</NickName>
    </UserCellWrapper>
  )
}

UserCell.propTypes = {
  // https://www.npmjs.com/package/prop-types
  user: PropTypes.shape({
    id: PropTypes.string,
    avatar: PropTypes.string,
    nickname: PropTypes.string,
  }).isRequired,
}

UserCell.defaultProps = {}

export default UserCell
