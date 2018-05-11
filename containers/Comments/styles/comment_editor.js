import styled from 'styled-components'
import ReactSVG from 'react-svg'

import { WORD_LIMIT } from '../../../config'
import { theme } from '../../../utils'

export const Container = styled.div`
  background: ${theme('preview.article_bg')};
  min-height: ${props => (props.show ? '100px' : '70px')};
  height: auto;
  border-color: ${theme('preview.article_bg')};
  display: flex;
  flex-direction: column;
  transition: all 0.3s;

  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
  border-radius: 3px;
`
export const InputHeaderWrapper = styled.div`
  height: 70px;
  display: flex;
  align-items: center;
  margin-right: 20px;
`
export const InputEditorWrapper = styled.div`
  height: auto;
  margin: 0 30px;
  margin-bottom: 30px;
  display: ${props => (props.showInputEditor ? 'block' : 'none')};
  font-size: 0.9em;
`

export const UserAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-left: 4%;
`
export const LeaveResponseText = styled.div`
  font-size: 1.3em;
  margin-left: 15px;
  color: lightgrey;
`
export const LeaveResponseUsername = styled.div`
  font-size: 1.3em;
  margin-left: 12px;
  color: #96b3b5;
  margin-right: 10px;
`

export const ReferToIcon = styled(ReactSVG)`
  fill: #b7cfd0;
  width: 20px;
  height: 20px;
  margin-right: 5px;
  margin-top: 5px;
`

export const ReplyAvatars = styled.div``

export const CounterWrapper = styled.div`
  display: flex;
  align-items: center;
  color: #c2d9da;
`
export const CounterSpliter = styled.div`
  font-size: 1.5em;
  font-weight: lighter;
`

const getColor = num => {
  if (num > WORD_LIMIT.COMMENT) {
    return 'tomato'
  } else if (num >= WORD_LIMIT.COMMENT - 50 && num <= WORD_LIMIT.COMMENT) {
    return 'orange'
  }
  return 'yellowgreen'
}

export const CounterCur = styled.div`
  margin-right: 5px;
  font-size: 1em;
  color: ${props => getColor(props.num)};
`

export const CounterTotal = styled.div`
  margin-left: 5px;
  margin-right: 5px;
  font-size: 1em;
`

export const PreviewerWrapper = styled.div`
  padding: 0 33px;
  min-height: 150px;
`
