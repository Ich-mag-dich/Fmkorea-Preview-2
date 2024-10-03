// /* eslint-disable react/display-name */
// /* eslint-disable @typescript-eslint/indent */
// /* eslint-disable @typescript-eslint/no-floating-promises */
// /* eslint-disable @typescript-eslint/no-confusing-void-expression */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable multiline-ternary */
// /* eslint-disable @typescript-eslint/space-before-function-paren */
// /* eslint-disable @typescript-eslint/strict-boolean-expressions */
// /* eslint-disable @typescript-eslint/no-non-null-assertion */
// import React, { useEffect, useState, useRef, memo } from 'react'
// import '../index.css'
// import { TitleDiv } from './styles/title_style'
// import { WirterDiv } from './styles/writer_style'
// import { CommentDiv } from './styles/comment_style'
// import { VoteDiv } from './styles/vote_style'
// import { VoteCountDiv } from './styles/vote_count_style'

// interface iPost {
//   post: any
//   postHref: string
// }

// const PreviewPage = memo((props: iPost): React.JSX.Element => {
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   console.log('test')

//   const [commentPageCount, setCommentPageCount] = useState(0)
//   const [commentPageNumber, setCommentPageNumber] = useState(0)
//   const [comments, setComments] = useState<string>('') // 댓글 데이터를 저장하는 상태입니다.
//   const commentsRef = useRef<HTMLDivElement>(null)
//   const [isInitialLoad, setIsInitialLoad] = useState(true) // 처음 로드 여부를 저장하는 상태
//   const [isInitialLoad2, setIsInitialLoad2] = useState(true) // 처음 로드 여부를 저장하는 상태

//   // 첫 로딩일때 ipost의 값에 있는 댓글을 가져와서 setComments에 저장

//   useEffect(() => {
//     if (isInitialLoad) {
//       setComments(props.post)
//     }
//   }, [props.post])

//   const fetchComments = async (pageNumber: number): Promise<void> => {
//     // 이 함수가 원하지 않게 여러번 호출되는것 같아서 이를 방지하고싶은데 방법을 모르겠습니다.

//     const url = `${postHref}?cpage=${pageNumber}`
//     // 댓글 데이터를 가져오는 API 요청을 여기에 작성합니다.
//     // 예시로 fetch를 사용합니다.
//     try {
//       const response = await fetch(url)
//       console.log('fetch')

//       const data = await response.text()
//       const dataDiv = document.createElement('div')
//       dataDiv.innerHTML = data
//       const comment = dataDiv.querySelector('ul.fdb_lst_ul ')!.innerHTML
//       setComments(comment)
//       if (isInitialLoad2 && !isInitialLoad) {
//         setIsInitialLoad2(false)
//       }
//       setIsInitialLoad(false)

//       setCommentPageNumber(pageNumber)
//       if (pageNumber !== 0) {
//         // scrollToComments()
//       }
//     } catch (error) {
//       console.error('Failed to fetch comments:', error)
//     }
//   }

//   useEffect(() => {
//     if (!isInitialLoad2 && comments && commentsRef.current) {
//       // 처음 로드가 아닐 때만 스크롤
//       commentsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
//     }
//   }, [comments])

//   const handleButtonClick = (pageNumber: number): void => {
//     fetchComments(pageNumber)
//   }

//   const { post, postHref } = props
//   let darkmode = false

//   const getdarkmode = document.querySelector(
//     '.logged_info > .li2 > .on1'
//   )?.innerHTML
//   if (getdarkmode === '다크ON') {
//     darkmode = true
//   }

//   const getHtml = document.createElement('html')
//   getHtml.innerHTML = post
//   let rdBody = getHtml.querySelector('.xe_content')!
//   if (getHtml.querySelector('.hotdeal_table')) {
//     rdBody = getHtml.querySelector('.hotdeal_url')!.parentElement!
//     rdBody.appendChild(getHtml.querySelector('.rd_body')!)
//   }
//   // const rdBody = getHtml.querySelector('.rd_body')!
//   const writerDiv = getHtml.querySelector('.member_plate')!
//   const dateDiv = getHtml.querySelector('span.date.m_no')!
//   const viewsDiv = getHtml.querySelector('div.side.fr')!
//   const commentDiv = document.createElement('div')
//   const voteDiv = document.createElement('div')

//   let readNum

//   try {
//     readNum = (
//       getHtml.querySelector('div.document_address > a') as HTMLAnchorElement
//     ).href.replace('https://www.fmkorea.com/', '')
//   } catch {
//     alert('오류가 발생했습니다. 새로고침 후 다시 시도해주세요.')
//     readNum = 'none'
//     window.location.reload()
//   }

//   let voteCount = '0'

//   try {
//     voteCount = (getHtml.querySelector('.new_voted_count') as HTMLElement)
//       .innerText
//   } catch {}

//   try {
//     readNum = readNum.replace('best/', '')
//   } catch {}
//   try {
//     const voteCountElement = getHtml.querySelector(
//       '.new_voted_count'
//     ) as HTMLElement
//     const voteCount = voteCountElement ? voteCountElement.innerText : '0'
//   } catch {
//     alert('오류가 발생했습니다. 새로고침 후 다시 시도해주세요.')
//     readNum = 'none'
//     window.location.reload()
//   }

//   try {
//     readNum = readNum.replace('best/', '')
//   } catch {}

//   voteDiv.innerHTML = `<a id="voteup" style="display: inline-block; position: static; cursor: pointer; width: 100px; border-style: solid; border-radius: 15px; color: #7ca2db; border-color: rgb(231, 231, 231); background-color: rgb(231, 231, 231); font-size: 20px; font-weight: bold;" onclick="fm_vote(${readNum}, jQuery('#fm_vote${readNum}')[0]);" >추천</a>
//           <a id="votedown" style="display: inline-block; position: static; cursor: pointer; width: 100px; border-style: solid; border-radius: 15px; color: #ff8888; border-color: rgb(231, 231, 231); background-color: rgb(231, 231, 231); font-size: 20px; font-weight: bold;"onclick="fm_vote3(${readNum});" >비추천</a>`

//   const commentPage = getHtml.querySelector('.bd_pg > .this')?.innerHTML
//   const commentCount = getHtml.querySelector(
//     '.btm_area.clear > div.side.fr > span:nth-child(3) > b'
//   )?.innerHTML

//   const commentPageDiv = document.createElement('div')
//   commentPageDiv.className = 'commentPageDiv'

//   if (commentCount === '0') {
//     commentDiv.innerHTML = `<div class="nocomment" style="margin-top: 40px;">
//     <h1>댓글이 없어요 ;ㅅ;</h1>
//     </div>`
//     commentDiv.style.color = darkmode ? '#ccc' : '#454545'
//   } else {
//     if (comments === '') {
//       // fetchComments(0)
//     }
//     if (commentPage !== undefined) {
//       if (commentPageCount === 0) {
//         setCommentPageCount(parseInt(commentPage, 10))
//         if (commentPageNumber === 0) {
//           setCommentPageNumber(parseInt(commentPage, 10))
//         }
//       }
//     }
//   }

//   // eslint-disable-next-line no-useless-escape
//   rdBody.innerHTML = rdBody.innerHTML.replace(/<\!--.*?-->/g, '')

//   const title = getHtml.querySelector('span.np_18px_span')!

//   // const add_history = () => {
//   //   if (count == 0) {
//   //     history.pushState(null, `${title.innerText}`, `${postHref}`);
//   //     count++;
//   //   }
//   // };

//   try {
//     const beforeLoad = rdBody.querySelectorAll('.beforeLoad')
//     const beforeLoadNum = beforeLoad.length
//     for (let i = 0; i < beforeLoadNum; i++) {
//       beforeLoad[i].className = beforeLoad[i].className.replace(
//         'beforeLoad',
//         ''
//       )
//     }
//   } catch {}

//   rdBody.querySelectorAll('img').forEach((img1: any) => {
//     img1.style.maxWidth = '820px'
//     img1.style.height = 'auto'
//     img1.style.margin = '0 auto'
//     if (img1.src.indexOf('classes/lazy/img/transparent.gif')) {
//       if (img1.dataset.original) {
//         img1.src = img1.dataset.original
//       }
//     }
//   })

//   rdBody.querySelectorAll('video').forEach((video1: any) => {
//     if (video1.children[0]) {
//       const addedVideo = videoFunction(video1)
//       video1.parentElement.parentElement.parentElement.replaceWith(addedVideo)
//     }
//   })

//   useEffect(() => {
//     const videos = document.querySelectorAll('.addedVideo')
//     videos.forEach((video: Element) => {
//       const videoElement = video as HTMLVideoElement
//       try {
//         videoElement.volume = 0.5
//       } catch (e) {
//         console.log(e)
//       }
//     })
//   }, [])

//   commentDiv.querySelectorAll('.document_writer').forEach((writer: any) => {
//     writer.children[0].style.color = darkmode ? 'rgb(104 164 255)' : '#045cdf'
//   })
//   const articleBackgroundColor = darkmode
//     ? 'rgba(51, 51, 51)'
//     : 'rgba(245, 245, 245, 0.85)'

//   const articleFontColor = darkmode ? '#ccc' : '#434343'

//   rdBody.querySelector('.document_address')?.remove()
//   return (
//     <div
//       className="preview_article"
//       style={{
//         backgroundColor: `${articleBackgroundColor}`,
//         marginLeft: '21%',
//         marginRight: '21%',
//         width: '900px',
//         zIndex: '102',
//         color: `${articleFontColor}`
//       }}
//     >
//       <div
//         style={{ width: '900px' }}
//         className="bg-white rounded-md shadow-sm p-4"
//       >
//         <TitleDiv>
//           <p>{(title as HTMLElement).innerText.toString()}</p>
//         </TitleDiv>

//         <WirterDiv className="member_plate2">
//           <div
//             dangerouslySetInnerHTML={{
//               __html: writerDiv.innerHTML
//             }}
//           />
//           <div
//             style={{ textAlign: 'right' }}
//             dangerouslySetInnerHTML={{ __html: dateDiv.innerHTML }}
//           />
//           <div
//             className="views"
//             style={{ textAlign: 'right' }}
//             dangerouslySetInnerHTML={{ __html: viewsDiv.innerHTML }}
//           />
//         </WirterDiv>

//         {darkmode ? (
//           <div
//             style={{
//               marginLeft: '40px',
//               marginRight: '40px',
//               paddingBottom: '10px'
//             }}
//           >
//             <div
//               style={{ fontSize: '13px' }}
//               dangerouslySetInnerHTML={{ __html: rdBody.innerHTML }}
//             />
//           </div>
//         ) : (
//           <div
//             style={{
//               marginLeft: '40px',
//               marginRight: '40px',
//               paddingBottom: '10px'
//             }}
//           >
//             <div
//               style={{ fontSize: '13px' }}
//               dangerouslySetInnerHTML={{ __html: rdBody.innerHTML }}
//             />
//           </div>
//         )}

//         <VoteDiv>
//           <VoteCountDiv>
//             <div
//               style={{
//                 textAlign: 'center',
//                 fontSize: '20px',
//                 fontWeight: 'bold'
//               }}
//             >
//               추천수: {voteCount}
//             </div>
//           </VoteCountDiv>
//           <div dangerouslySetInnerHTML={{ __html: voteDiv.innerHTML }} />
//         </VoteDiv>

//         <hr
//           style={{
//             display: 'block',
//             width: 'auto',
//             margin: '40px',
//             height: '2px',
//             color: '#cccccc',
//             backgroundColor: '#cccccc',
//             border: 'none',
//             marginBottom: '0px'
//           }}
//         />

//         <CommentDiv>
//           <div
//             style={{ paddingTop: '150px', marginTop: '-150px' }}
//             ref={commentsRef}
//             className="comments"
//           >
//             {/* 댓글 데이터를 표시합니다 */}
//             <div dangerouslySetInnerHTML={{ __html: comments }} />
//           </div>

//           <div style={{ textAlign: 'center' }}>
//             {[...Array(commentPageCount)].map((_, i) => (
//               <button
//                 key={i + 1}
//                 className={`commentPageSelectButton page_${i + 1}`}
//                 onClick={() => handleButtonClick(i + 1)}
//                 style={{
//                   backgroundColor:
//                     commentPageNumber === i + 1
//                       ? '#d3d3d3'
//                       : commentPageNumber !== 0
//                       ? 'rgb(239 239 239 / 50%)'
//                       : commentPageCount === i + 1
//                       ? '#d3d3d3'
//                       : 'rgb(239 239 239 / 50%)'
//                 }}
//               >
//                 {i + 1}
//               </button>
//             ))}
//           </div>
//         </CommentDiv>
//       </div>
//     </div>
//   )
// })

// export default PreviewPage

// function videoFunction(video1: any): HTMLVideoElement {
//   const addedVideo = document.createElement('video')
//   const addedSource = document.createElement('source')
//   addedSource.type = 'video/mp4'
//   addedSource.src = video1.children[0].src
//   addedVideo.src = video1.children[0].src
//   addedVideo.controls = true
//   addedVideo.style.maxWidth = '820px'
//   addedVideo.style.height = 'auto'
//   addedVideo.style.margin = '0 auto'
//   addedVideo.appendChild(addedSource)
//   addedVideo.className = 'addedVideo'
//   if (`${video1}`.includes('gif')) {
//     addedVideo.autoplay = true
//     addedVideo.loop = true
//   } else if (video1.className.includes('video-without-sound')) {
//     addedVideo.autoplay = true
//     addedVideo.loop = true
//   } else {
//     addedVideo.autoplay = false
//     addedVideo.loop = false
//     addedVideo.volume = 0.5 // FIXME  Not working
//   }

//   // 비디오가 로드된 후 볼륨을 설정
//   addedVideo.addEventListener('loadedmetadata', () => {
//     addedVideo.volume = 0.5
//   })

//   return addedVideo
// }
