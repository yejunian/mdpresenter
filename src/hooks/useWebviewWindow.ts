import { WebviewWindow, WindowOptions } from '@tauri-apps/api/window'
import { useState } from 'react'

function useWebviewWindow(label: string, options?: WindowOptions) {
  const [webview, setWebview] = useState<WebviewWindow>(null)
  const [isProcessing, setProcessing] = useState(false)
  let isLocallyProcessing = isProcessing

  const create = async (onLoad?: () => void) => {
    if (!webview && !isLocallyProcessing) {
      isLocallyProcessing = true
      setProcessing(true)

      const WebviewWindow = (await import('@tauri-apps/api/window'))
        .WebviewWindow

      const localWebview = new WebviewWindow(label, options)

      localWebview.once(`${label}:load`, () => {
        if (typeof onLoad === 'function') {
          onLoad()
        }

        localWebview.show()
      })

      localWebview.once('tauri://destroyed', () => {
        isLocallyProcessing = true
        setWebview(null)
      })

      setWebview(localWebview)

      setProcessing(false)
    }
  }

  return { webview, create }
}

export default useWebviewWindow
