import styled from 'styled-components'

export const FooterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #a5c8ca;
  margin-top: 30px;
  margin-left: 35px;
  margin-right: 40px;
  margin-bottom: 50px;
`
export const RespectText = styled.div`
  color: #b9cfd0;
  display: ${props => (props.show ? 'block' : 'none')};
`
export const Divider = styled.div`
  border-top: 1px solid #c8dedf;
  margin-top: 10px;
  width: 55%;
  margin-bottom: 20px;
`

export const PublishBtns = styled.div`
  width: 50%;
  text-align: center;
`
