/* eslint-disable multiline-ternary */
import React from 'react'
import '../../index.css'

interface ContentBodyProps {
  contentHtml: Element
  darkmode: boolean
}

const ContentBody = ({
  contentHtml,
  darkmode
}: ContentBodyProps): React.JSX.Element => (
  <div
    style={{ marginLeft: '40px', marginRight: '40px', paddingBottom: '10px' }}
  >
    <div
      style={{ fontSize: '13px', color: darkmode ? '#ccc' : '#434343' }}
      dangerouslySetInnerHTML={{ __html: contentHtml.innerHTML }}
    />
  </div>
)

export default ContentBody
