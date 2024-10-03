/* eslint-disable react/prop-types */
import React from 'react'
import { VoteDiv } from '../styles/vote_style'
import { VoteCountDiv } from '../styles/vote_count_style'
import '../../index.css'

interface VoteSectionProps {
  voteDiv: HTMLElement
  voteCount: string
}

const VoteSection = ({
  voteDiv,
  voteCount
}: VoteSectionProps): React.JSX.Element => (
  <VoteDiv>
    <VoteCountDiv>
      <div
        style={{
          textAlign: 'center',
          fontSize: '20px',
          fontWeight: 'bold'
        }}
      >
        추천수: {voteCount}
      </div>
    </VoteCountDiv>
    <div dangerouslySetInnerHTML={{ __html: voteDiv.innerHTML }} />
  </VoteDiv>
)

export default VoteSection
