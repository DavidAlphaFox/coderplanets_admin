import React from 'react'

import { prettyNum } from '../../utils'
import { DEFAULT_ICON } from '../../config/assets'

import Tabber from '../../components/Tabber'
import * as logic from './logic'

import {
  NumbersWrapper,
  NumberSection,
  NumberDivider,
  NumberTitle,
  NumberItem,
} from './styles'

import {
  BannerContainer,
  BannerContentWrapper,
  TabberWrapper,
  CommunityWrapper,
  CommunityLogo,
  CommunityInfo,
  Title,
  Desc,
} from './styles/community_banner'

const onChange = e => {
  logic.tabberChange(e)
}

const NumbersInfo = ({
  content: { subscribersCount, editorsCount, postsCount },
}) => (
  <NumbersWrapper>
    <NumberSection>
      <NumberTitle>关注</NumberTitle>
      <NumberItem>{prettyNum(subscribersCount)}</NumberItem>
    </NumberSection>
    <NumberDivider />
    <NumberSection>
      <NumberTitle>内容</NumberTitle>
      <NumberItem>{prettyNum(postsCount)}</NumberItem>
    </NumberSection>
    <NumberDivider />
    <NumberSection>
      <NumberTitle>编辑</NumberTitle>
      <NumberItem>{prettyNum(editorsCount)}</NumberItem>
    </NumberSection>
  </NumbersWrapper>
)

const CommunityBrief = ({ content }) => {
  return (
    <CommunityWrapper>
      {content.logo ? (
        <CommunityLogo path={content.logo || DEFAULT_ICON} />
      ) : (
        <div />
      )}
      <CommunityInfo>
        <Title>{content.title}</Title>
        <Desc>{content.desc}</Desc>
      </CommunityInfo>
    </CommunityWrapper>
  )
}

const CommunityBanner = ({ content }) => (
  <BannerContainer>
    <BannerContentWrapper>
      <CommunityBrief content={content} />
      <NumbersInfo content={content} />
      <TabberWrapper>
        <Tabber source={content.threads} onChange={onChange} />
      </TabberWrapper>
    </BannerContentWrapper>
  </BannerContainer>
)

export default CommunityBanner
