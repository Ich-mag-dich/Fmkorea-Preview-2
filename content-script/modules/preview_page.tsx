/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react'
import '../index.css'
import { TitleDiv } from './styles/title_style'
import { WirterDiv } from './styles/writer_style'
import { CommentDiv } from './styles/comment_style'
import { VoteDiv } from './styles/vote_style'
import { VoteCountDiv } from './styles/vote_count_style'

interface iPost {
  post: any
  postHref: string
}

const PreviewPage = (props: iPost): React.JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { post, postHref } = props

  const getHtml = document.createElement('html')
  getHtml.innerHTML = post
  const rdBody = getHtml.querySelector('.xe_content')!
  const writerDiv = getHtml.querySelector('.member_plate')!
  const dateDiv = getHtml.querySelector('span.date.m_no')!
  const viewsDiv = getHtml.querySelector('div.side.fr > span')!
  const commentDiv = document.createElement('div')
  const voteDiv = document.createElement('div')
  let readNum = (getHtml.querySelector('div.document_address > a') as HTMLAnchorElement).href.replace('https://www.fmkorea.com/', '')
  let voteCount = '0'
  try {
    voteCount = (getHtml.querySelector('.new_voted_count') as HTMLElement).innerText
  } catch { }
  try {
    readNum = readNum.replace('best/', '')
  } catch { }
  voteDiv.innerHTML = `<a id="voteup" style="display: inline-block; position: static; cursor: pointer; width: 100px; border-style: solid; border-radius: 15px; color: #7ca2db; border-color: rgb(231, 231, 231); background-color: rgb(231, 231, 231); font-size: 20px; font-weight: bold;" onclick="fm_vote(${readNum}, jQuery('#fm_vote${readNum}')[0]);" >추천</a>
        <a id="votedown" style="display: inline-block; position: static; cursor: pointer; width: 100px; border-style: solid; border-radius: 15px; color: #ff8888; border-color: rgb(231, 231, 231); background-color: rgb(231, 231, 231); font-size: 20px; font-weight: bold;"onclick="fm_vote3(${readNum});" >비추천</a>`

  try {
    commentDiv.innerHTML = getHtml.querySelector('ul.fdb_lst_ul ')!.innerHTML
  } catch {
    commentDiv.innerHTML = `<div class="nocomment" style="margin-top: 40px;">
      <h1>댓글이 없어요 ;ㅅ;</h1>
    </div>`
  }

  // eslint-disable-next-line no-useless-escape
  rdBody.innerHTML = rdBody.innerHTML.replace(/<\!--.*?-->/g, '')

  const title = getHtml.querySelector('span.np_18px_span')!

  // const add_history = () => {
  //   if (count == 0) {
  //     history.pushState(null, `${title.innerText}`, `${postHref}`);
  //     count++;
  //   }
  // };

  try {
    const beforeLoad = rdBody.querySelectorAll('.beforeLoad')
    const beforeLoadNum = beforeLoad.length
    for (let i = 0; i < beforeLoadNum; i++) {
      beforeLoad[i].className = beforeLoad[i].className.replace(
        'beforeLoad',
        ''
      )
    }
  } catch { }

  rdBody.querySelectorAll('img').forEach((img1: any) => {
    img1.style.maxWidth = '820px'
    img1.style.height = 'auto'
    img1.style.margin = '0 auto'
    if (img1.src.indexOf('classes/lazy/img/transparent.gif')) {
      if (img1.dataset.original) {
        img1.src = img1.dataset.original
      }
    }
  })

  rdBody.querySelectorAll('video').forEach((video1: any) => {
    if (video1.children[0]) {
      const addedVideo = videoFunction(video1)
      video1.parentElement.parentElement.parentElement.replaceWith(addedVideo)
    }
  })

  return (
    <div className="preview_article"
      style={{ marginLeft: '21%', marginRight: '21%', width: '900px', zIndex: '102' }}
    >
      <div
        style={{ width: '900px' }}
        className="bg-white rounded-md shadow-sm p-4"
      >
        <TitleDiv>
          <p>{(title as HTMLElement).innerText.toString()}</p>
        </TitleDiv>

        <WirterDiv className="member_plate">
          <div dangerouslySetInnerHTML={{ __html: writerDiv.innerHTML }} />
          <div style={{ textAlign: 'right' }} dangerouslySetInnerHTML={{ __html: dateDiv.innerHTML }} />
          <div style={{ textAlign: 'right' }} dangerouslySetInnerHTML={{ __html: viewsDiv.innerHTML }} />
        </WirterDiv>

        <div
          style={{ marginLeft: '40px', marginRight: '40px', paddingBottom: '10px' }}
        >
          <div style={{ fontSize: '13px' }} dangerouslySetInnerHTML={{ __html: rdBody.innerHTML }} />
        </div>

        <VoteDiv>
          <VoteCountDiv>
            <div style={{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold' }}>추천수: {voteCount}</div>
          </VoteCountDiv>
          <div dangerouslySetInnerHTML={{ __html: voteDiv.innerHTML }} />
        </VoteDiv>

        <hr style={{
          display: 'block',
          width: 'auto',
          margin: '40px',
          height: '2px',
          color: '#cccccc',
          backgroundColor: '#cccccc',
          border: 'none',
          marginBottom: '0px'
        }} />

        <CommentDiv>
          <div dangerouslySetInnerHTML={{ __html: commentDiv.innerHTML }} />
        </CommentDiv>
      </div>
    </div>
  )
}

export default PreviewPage

function videoFunction(video1: any): HTMLVideoElement {
  const addedVideo = document.createElement('video')
  const addedSource = document.createElement('source')
  addedSource.type = 'video/mp4'
  addedVideo.src = video1.children[0].src
  addedVideo.controls = true
  addedVideo.volume = 0.5
  addedVideo.style.maxWidth = '820px'
  addedVideo.style.height = 'auto'
  addedVideo.style.margin = '0 auto'
  addedVideo.appendChild(addedSource)
  if (`${video1}`.includes('gif')) {
    addedVideo.autoplay = true
    addedVideo.loop = true
  } else if (video1.className.includes('video-without-sound')) {
    addedVideo.autoplay = true
    addedVideo.loop = true
  } else {
    addedVideo.autoplay = false
    addedVideo.loop = false
  }
  return addedVideo
}
