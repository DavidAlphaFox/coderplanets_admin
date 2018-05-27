/*
 *
 * CategoriesCell
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import R from 'ramda'

import shortid from 'shortid'

import {
  Wrapper,
  CategoryWrapper,
  CategoryTag,
  AddWrapper,
  DeleteCross,
  AddIcon,
  AddText,
} from './styles'

import { ICON_ASSETS } from '../../config'

// import { inject, observer } from 'mobx-react'
// import Link from 'next/link'

const CategoriesList = ({ categories, communityId, onDelete }) => (
  <CategoryWrapper>
    {categories.map(c => (
      <CategoryTag
        key={shortid.generate()}
        onClick={onDelete.bind(this, communityId, c)}
      >
        {c.title}
        <DeleteCross>x</DeleteCross>
      </CategoryTag>
    ))}
  </CategoryWrapper>
)

class CategoriesCell extends React.Component {
  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    const { communityId, categories, onDelete, onAdd } = this.props

    return (
      <div>
        {R.isEmpty(categories) ? (
          <AddWrapper>
            <AddIcon src={`${ICON_ASSETS}/cmd/plus.svg`} />
            <AddText onClick={onAdd.bind(this, communityId, [])}>添加</AddText>
          </AddWrapper>
        ) : (
          <Wrapper>
            <CategoriesList
              categories={categories}
              onDelete={onDelete}
              communityId={communityId}
            />
            <div onClick={onAdd.bind(this, communityId, categories)}>
              <AddIcon src={`${ICON_ASSETS}/cmd/plus.svg`} />
            </div>
          </Wrapper>
        )}
      </div>
    )
  }
}

export default CategoriesCell

CategoriesCell.propTypes = {
  // https://www.npmjs.com/package/prop-types
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
    })
  ),
  communityId: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
}

CategoriesCell.defaultProps = {
  categories: [],
}
