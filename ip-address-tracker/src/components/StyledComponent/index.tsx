import styled from 'styled-components'
import { Input } from 'antd'
const Wrapper = styled.section`
  position: relative;
`

const Header = styled.div`
  position: relative;
  height: 30vh;
  padding-top: 20px;
  @media only screen and (min-width: 320px) and (max-width: 598px) {
    height: 30vh;
  }
  @media only screen and (min-width: 599px) and (max-width: 1023px) {
    height: 15vh;
  }
`
const Topic = styled.div`
  text-align: center;
  font-size: 30px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 16px;
`
const SearchGroup = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  @media only screen and (min-width: 320px) and (max-width: 598px) {
    padding: 0 20px;
  }
  @media only screen and (min-width: 599px) and (max-width: 1023px) {
    padding: 0 20px;
  }
`
const SearchInput = styled(Input.Search)`
  border-radius: 8px;
  border: none;
  outline: none;
  width: 600px;
  .ant-btn-primary {
    background-color: hsl(0, 0%, 17%);
  }
`
const ResultDiv = styled.div`
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  position: absolute;
  width: 80%;
  left: 50%;
  transform: translateX(-50%);
  top: 70%;
  z-index: 9999;
  background: #fff;
  border-radius: 8px;
  @media only screen and (min-width: 320px) and (max-width: 598px) {
    width: 90%;
    top: 55%;
  }
  @media only screen and (min-width: 599px) and (max-width: 1023px) {
    width: 95%;
    top: 70%;
  }
`
const ResultElement = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  @media only screen and (min-width: 320px) and (max-width: 598px) {
    flex-direction: column;
    align-items: unset;
    margin: 5px 0;
  }
`
const ResultItems = styled.div`
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;

  &:not(:last-child) {
    border-right: 1px solid #ccc;
  }
  @media only screen and (min-width: 320px) and (max-width: 598px) {
    margin: 5px 0;
    padding: 0;
    text-align: center;
    align-items: center;
  &:not(:last-child) {
    border-right: unset;
  }
`
const TitleItems = styled.p`
  text-transform: uppercase;
  color: hsl(0, 0%, 59%);
  font-weight: 500;
  text-align: left !important;
  margin-block-start: 0;
  margin-block-end: 0;
  @media only screen and (min-width: 320px) and (max-width: 598px) {
    margin-bottom: 5px;
  }
`
const ElementItems = styled.h3`
  margin-block-start: 0;
  margin-block-end: 0;
  height: 55px;
  @media only screen and (min-width: 320px) and (max-width: 598px) {
    height: unset;
  }
`
const MapAddress = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
`
export {
  Wrapper,
  Header,
  Topic,
  SearchGroup,
  SearchInput,
  ResultDiv,
  ResultElement,
  ResultItems,
  TitleItems,
  ElementItems,
  MapAddress
}
