import React from 'react'
import { WirterDiv } from '../styles/writer_style'
import '../../index.css'

interface WriterInfoProps {
  writerHtml: string
  dateHtml: string
  viewsHtml: string
  darkmode: boolean
}

const WriterInfo = ({
  writerHtml,
  dateHtml,
  viewsHtml,
  darkmode
}: WriterInfoProps): React.JSX.Element => (
  <WirterDiv className="member_plate2">
    <div dangerouslySetInnerHTML={{ __html: writerHtml }} />
    <div
      style={{ textAlign: 'right' }}
      dangerouslySetInnerHTML={{ __html: dateHtml }}
    />
    <div
      className="views"
      style={{ textAlign: 'right' }}
      dangerouslySetInnerHTML={{ __html: viewsHtml }}
    />
  </WirterDiv>
)

export default WriterInfo
