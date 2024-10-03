import React from 'react'
import { TitleDiv } from '../styles/title_style'
import '../../index.css'

const Title = ({ title }: { title: string }): React.JSX.Element => (
  <TitleDiv>
    <p>{title}</p>
  </TitleDiv>
)

export default Title
