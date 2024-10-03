/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable multiline-ternary */
import React, { useCallback, useEffect, useState } from 'react'
import PreviewPage from './modules/preview_page'
import './index.css'

const classNames = ['hotdeal_var8', 'notice_pop0', 'title']
let checkState = false
let postHref = ''
let exTitle = ''

let savedScrollPosition = 0

function saveScrollPosition(): void {
  savedScrollPosition = window.scrollY
}

function restoreScrollPosition(): void {
  if (checkState) {
    window.scrollTo(0, savedScrollPosition)
  }
}

document.addEventListener('fullscreenchange', restoreScrollPosition)

let count = 0

const addHistory = (
  title1: HTMLElement,
  postHref: string,
  title2: string
): void => {
  if (count === 0) {
    history.pushState(null, `${title1.innerText}`, `${postHref}`)
    exTitle = document.title
    document.title = title2
    count++
  }
}

const App = (): React.JSX.Element => {
  saveScrollPosition()
  const [visl, setVisual] = useState<string>('hidden')
  const [post, setPost] = useState<any>(null)

  let darkmode = false
  const getdarkmode = document.querySelector(
    '.logged_info > .li2 > .on1'
  )?.innerHTML
  if (getdarkmode === '다크ON') {
    darkmode = true
  }

  const chgVisl = useCallback((): void => {
    setVisual((prevVisl) => (prevVisl === 'hidden' ? 'block' : 'hidden'))
  }, [])

  const handleClick = useCallback(
    async (target: any): Promise<void> => {
      try {
        if (!checkState) {
          const extensionRoot = document.querySelector(
            '#extension-root'
          ) as HTMLElement
          extensionRoot.style.top = `${window.scrollY - 80}px`
          document.body.style.overflow = 'hidden'
          extensionRoot.style.visibility = 'visible'
          extensionRoot.style.transition = 'background-color 1s'
          extensionRoot.style.backgroundColor = darkmode
            ? 'rgba(0, 0, 0, 0.5)'
            : 'rgba(109, 109, 109, 0.5)'

          checkState = true
          if (target.href !== undefined) {
            postHref = target.href
          } else if (target.children[0]?.href !== undefined) {
            postHref = target.children[0].href
          } else if (target.parentElement?.href !== undefined) {
            postHref = target.parentElement.href
          }
          console.log('postHref:', postHref)

          chgVisl()
          addHistory(target, postHref, target.innerText)
          const response = await fetch(postHref)
          setPost(await response.text())
        }
      } catch (error) {
        console.error('Error fetching post:', error)
      }
    },
    [chgVisl, darkmode]
  )

  const exit = useCallback((): void => {
    if (!checkState || count !== 1) {
      return
    }

    checkState = false
    chgVisl()
    setPost(null)
    document.body.style.overflow = 'auto'
    const extensionRoot = document.querySelector(
      '#extension-root'
    ) as HTMLElement
    extensionRoot.style.backgroundColor = 'rgba(109, 109, 109, 0.0)'
    extensionRoot.style.visibility = 'hidden'
    extensionRoot.style.top = '0px'
    document.title = exTitle
    count = 0
    history.back()
  }, [chgVisl])

  useEffect(() => {
    const contextMenuHandler = (e: MouseEvent): void => {
      if (!checkState && e.target) {
        const target = e.target as HTMLElement
        if (
          classNames.some((className) => target.classList.contains(className))
        ) {
          e.preventDefault()
          handleClick(target)
        } else if (
          target.parentElement &&
          classNames.some((className) =>
            target?.parentElement?.classList.contains(className)
          )
        ) {
          e.preventDefault()
          handleClick(target.parentElement)
        }
      }
    }

    const clickHandler = (e: MouseEvent): void => {
      const target = e.target as HTMLElement
      if (
        checkState &&
        (target.id === 'extension-root' || target.id === 'frame')
      ) {
        exit()
      }
    }

    document.addEventListener('contextmenu', contextMenuHandler)
    document.addEventListener('click', clickHandler)

    return () => {
      document.removeEventListener('contextmenu', contextMenuHandler)
      document.removeEventListener('click', clickHandler)
    }
  }, [handleClick, exit])

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent): void => {
      if (event.key === 'Escape' && checkState) {
        exit()
      }
    }

    window.addEventListener('keydown', keyDownHandler)
    return () => {
      window.removeEventListener('keydown', keyDownHandler)
    }
  }, [exit])

  return (
    <div className={visl} id={'frame'} style={{ marginBottom: '500px' }}>
      {postHref !== '' && visl === 'block' && post ? (
        <PreviewPage post={post} postHref={postHref}></PreviewPage>
      ) : (
        <div></div>
      )}
    </div>
  )
}

export default App
