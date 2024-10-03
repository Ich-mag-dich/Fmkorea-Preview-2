/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable multiline-ternary */
/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
// PreviewPage.tsx
import React, { useEffect } from 'react'
import '../index.css'
import Title from './components/Title'
import WriterInfo from './components/WriterInfo'
import ContentBody from './components/ContentBody'
import Comments from './components/Comments'
import VoteSection from './components/VoteSection'

interface iPost {
  post: any
  postHref: string
}

const PreviewPage = (props: iPost): React.JSX.Element => {
  const { post } = props

  // 상태 관리
  // const [commentPageCount, setCommentPageCount] = useState(0)
  // const [commentPageNumber, setCommentPageNumber] = useState(0)
  // const [comments, setComments] = useState<string>('`')

  let darkmode = false
  const getdarkmode = document.querySelector(
    '.logged_info > .li2 > .on1'
  )?.innerHTML
  if (getdarkmode === '다크ON') {
    darkmode = true
  }

  // 컴포넌트 초기 로드 시 댓글 가져오기
  useEffect(() => {
    // const fetchInitialComments = async () => {
    //   // await fetchComments(0) // 초기 댓글 로드
    // }
    // fetchInitialComments()
  }, [])

  console.log('작동확인')

  // 댓글 가져오기
  // const fetchComments = async (pageNumber: number): Promise<void> => {
  //   const url = `${postHref}?cpage=${pageNumber}`
  //   try {
  //     const response = await fetch(url)
  //     const data = await response.text()
  //     const dataDiv = document.createElement('div')
  //     dataDiv.innerHTML = data

  //     // 댓글 내용 설정
  //     const comment = dataDiv.querySelector('ul.fdb_lst_ul')?.innerHTML || ''
  //     setComments(comment)
  //   } catch (error) {
  //     console.error('Failed to fetch comments:', error)
  //   }
  // }

  // HTML 파싱
  const getHtml = document.createElement('html')
  getHtml.innerHTML = post
  const comments = getHtml.querySelector('ul.fdb_lst_ul')?.innerHTML || ''
  // setComments(comment)
  const title =
    (getHtml.querySelector('span.np_18px_span') as HTMLElement).innerHTML || ''
  const writerDiv = getHtml.querySelector('.member_plate')?.innerHTML || ''
  const dateDiv = getHtml.querySelector('span.date.m_no')?.innerHTML || ''
  const viewsDiv = getHtml.querySelector('div.side.fr')?.innerHTML || ''
  const contentHtml = getHtml.querySelector('.xe_content')!
  const voteDivHtml =
    (getHtml.querySelector('.new_voted_count') as HTMLElement).innerHTML || '0'

  // 후처리 작업 (이미지와 비디오 처리)
  const contentElement = contentHtml as unknown as Element

  try {
    const beforeLoad = contentElement.querySelectorAll('.beforeLoad')
    beforeLoad.forEach((element) => {
      element.className = element.className.replace('beforeLoad', '')
    })
  } catch (error) {
    console.error(error)
  }

  try {
    contentElement.querySelectorAll('img').forEach((img1: any) => {
      img1.style.maxWidth = '820px'
      img1.style.height = 'auto'
      img1.style.margin = '0 auto'
      if (img1.src.indexOf('classes/lazy/img/transparent.gif')) {
        if (img1.dataset.original) {
          img1.src = img1.dataset.original
        }
      }
    })
  } catch (error) {
    console.error(error)
  }

  try {
    contentElement.querySelectorAll('video').forEach((video1: any) => {
      if (video1.children[0]) {
        const addedVideo = videoFunction(video1)
        video1.parentElement.parentElement.parentElement.replaceWith(addedVideo)
      }
    })
  } catch (error) {
    console.error(error)
  }

  useEffect(() => {
    const videos = document.querySelectorAll('.addedVideo')
    videos.forEach((video: Element) => {
      const videoElement = video as HTMLVideoElement
      try {
        videoElement.volume = 0.5
      } catch (e) {
        console.log(e)
      }
    })
  }, [])

  // 후처리 작업 끝

  const articleBackgroundColor = darkmode
    ? 'rgba(51, 51, 51)'
    : 'rgba(245, 245, 245, 0.85)'
  const articleFontColor = darkmode ? '#ccc' : '#434343'

  // 추천반대.

  let readNum

  try {
    readNum = (
      getHtml.querySelector('div.document_address > a') as HTMLAnchorElement
    ).href.replace('https://www.fmkorea.com/', '')
  } catch {
    alert('오류가 발생했습니다. 새로고침 후 다시 시도해주세요.')
    readNum = 'none'
    window.location.reload()
  }

  try {
    readNum = readNum.replace('best/', '')
  } catch {}

  const voteDiv = document.createElement('div')
  voteDiv.innerHTML = `<a id="voteup" style="display: inline-block; position: static; cursor: pointer; width: 100px; border-style: solid; border-radius: 15px; color: #7ca2db; border-color: rgb(231, 231, 231); background-color: rgb(231, 231, 231); font-size: 20px; font-weight: bold;" onclick="fm_vote(${readNum}, jQuery('#fm_vote${readNum}')[0]);" >추천</a>
           <a id="votedown" style="display: inline-block; position: static; cursor: pointer; width: 100px; border-style: solid; border-radius: 15px; color: #ff8888; border-color: rgb(231, 231, 231); background-color: rgb(231, 231, 231); font-size: 20px; font-weight: bold;"onclick="fm_vote3(${readNum});" >비추천</a>`

  return (
    <div
      className="preview_article"
      style={{
        backgroundColor: `${articleBackgroundColor}`,
        marginLeft: '21%',
        marginRight: '21%',
        width: '900px',
        zIndex: '102',
        color: `${articleFontColor}`
      }}
    >
      <Title title={title} />
      <WriterInfo
        writerHtml={writerDiv}
        dateHtml={dateDiv}
        viewsHtml={viewsDiv}
        darkmode={darkmode}
      />
      <ContentBody contentHtml={contentElement} darkmode={darkmode} />
      <VoteSection voteDiv={voteDiv} voteCount={voteDivHtml} />
      <Comments commentsHtml={comments} />
    </div>
  )
}

export default PreviewPage

function videoFunction(video1: any): HTMLVideoElement {
  const addedVideo = document.createElement('video')
  const addedSource = document.createElement('source')
  addedSource.type = 'video/mp4'
  addedSource.src = video1.children[0].src
  addedVideo.src = video1.children[0].src
  addedVideo.controls = true
  addedVideo.style.maxWidth = '820px'
  addedVideo.style.height = 'auto'
  addedVideo.style.margin = '0 auto'
  addedVideo.appendChild(addedSource)
  addedVideo.className = 'addedVideo'
  if (`${video1}`.includes('gif')) {
    addedVideo.autoplay = true
    addedVideo.loop = true
  } else if (video1.className.includes('video-without-sound')) {
    addedVideo.autoplay = true
    addedVideo.loop = true
  } else {
    addedVideo.autoplay = false
    addedVideo.loop = false
    addedVideo.volume = 0.5 // FIXME  Not working
  }

  // 비디오가 로드된 후 볼륨을 설정
  addedVideo.addEventListener('loadedmetadata', () => {
    addedVideo.volume = 0.5
  })

  return addedVideo
}
