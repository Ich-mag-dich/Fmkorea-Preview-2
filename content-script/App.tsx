import React, { useEffect, useState } from 'react'
import PreviewPage from './modules/preview_page'
import './index.css'

const classNames = ['hotdeal_var8', 'notice_pop0', 'title']
let checkState = false
let postHref = ''
let exTitle = ''
const throwError = (): void => {
  throw new Error('Something Broken')
}

let count = 0

const addHistory = (title1: any, postHref: any, title2: any): void => {
  if (count === 0) {
    history.pushState(null, `${title1.innerText}`, `${postHref}`)
    exTitle = document.title
    document.title = title2
    count++
  }
}

const App = (): React.JSX.Element => {
  const [error, setError] = useState(false)
  const [visl, setVisual] = useState<string>()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const throwErrorInRender = (): void => { setError(true) }
  const [post, setPost] = useState<any>()
  if (visl === undefined) {
    setVisual('hidden')
  }

  const chgVisl = (): void => {
    if (visl === 'hidden' && checkState) {
      setVisual('block')
    } else if (visl === 'block' && !checkState) {
      setVisual('hidden')
    } else if (visl === undefined) {
      setVisual('block')
    }
  }

  const handleClick = async (target: any): Promise<void> => {
    try {
      if (!checkState) {
        const extensionRoot = document.querySelector('#extension-root') as HTMLElement
        extensionRoot.style.top = `${window.scrollY - 80}px`
        document.querySelector('body')?.style.setProperty('overflow', 'hidden')
        extensionRoot.style.visibility = 'visible'
        extensionRoot.style.backgroundColor = 'rgba(109, 109, 109, 0.5)'
        // console.log(target.innerText)
        checkState = true
        if (target.href !== undefined) {
          postHref = target.href
        } else if (target.children[0]?.href !== undefined) {
          postHref = target.children[0].href
        } else if (target.parentElement?.href !== undefined) {
          postHref = target.parentElement.href
        }
        chgVisl()
        addHistory(target.innerText, postHref, target.innerText)
        setPost(await requestPost(postHref).then(res => res))
      }
    } catch {
    }
  }

  const requestPost = async (posthref: string): Promise<string> => {
    try {
      return await fetch(posthref).then(async res => {
        return await res.text()
      })
    } catch {
    }
  }

  const exit = (): void => {
    // console.log(checkState)
    if (!checkState) {
      return
    }
    if (count !== 1) {
      return
    }

    checkState = false
    chgVisl()
    setPost(undefined)
    try {
      document.querySelector('.rounded-md')?.remove()
    } catch {
      setPost(undefined)
    }
    document.querySelector('body')?.style.setProperty('overflow', 'hidden scroll')
    const extensionRoot = document.querySelector('#extension-root') as HTMLElement
    extensionRoot.style.backgroundColor = 'rgba(109, 109, 109, 0.0)'
    extensionRoot.style.visibility = 'hidden'
    extensionRoot.style.top = '0px'
    document.title = exTitle
    count = 0
    history.back()
  }

  window.onkeydown = (event: { keyCode: number }) => {
    if (event.keyCode === 27) {
      // esc키 눌렀을때
      if (checkState) {
        exit()
      }
    }
  }

  useEffect(() => {
    document.addEventListener('contextmenu', function (e) {
      if (checkState) { /* empty */ } else {
        if (e.target != null) {
          const target = e.target as HTMLElement
          // console.log(target);
          if (
            classNames.some(className => target.classList.contains(className))
          ) {
            e.preventDefault()
            void handleClick(target)
          } else if (target.parentElement != null) {
            const parent = target.parentElement
            if (
              classNames.some(className => parent.classList.contains(className))
            ) {
              e.preventDefault()
              void handleClick(target)
            } else if ((target.parentElement?.parentElement) != null) {
              const parent = target.parentElement.parentElement
              if (
                classNames.some(className =>
                  parent.classList.contains(className)
                )
              ) {
                e.preventDefault()
                void handleClick(target)
              } else {
                checkState = false
              }
            }
          }
        }
      }
    })

    document.addEventListener('click', function (e) {
      const target = e.target as HTMLElement
      if (checkState) {
        if (target.id === 'extension-root' || target.id === 'frame') {
          exit()
        }
      }
    })
  }, [])

  useEffect(() => {
    if (error) throwError()
  }, [error])

  try {
    return (
      <div className={visl} id={'frame'} style={{ marginBottom: '500px' }}>
        {postHref !== '' && visl === 'block' && (Boolean(post))
          ? (
            <PreviewPage post={post} postHref={postHref} ></PreviewPage>
            // eslint-disable-next-line @typescript-eslint/indent
          )
          : (
            <div></div>
            // eslint-disable-next-line @typescript-eslint/indent
          )}
      </div>
    )
  } catch {
    return <div className={visl}></div>
  }
}

export default App
