/* eslint-disable multiline-ternary */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import React from 'react'
import { CommentDiv } from '../styles/comment_style'

interface CommentsProps {
  commentsHtml: string
}

const Comments = ({ commentsHtml }: CommentsProps): React.JSX.Element => (
  <CommentDiv>
    <div dangerouslySetInnerHTML={{ __html: commentsHtml }} />
  </CommentDiv>
)

export default Comments
