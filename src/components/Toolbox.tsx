import clsx from 'clsx'
import { MouseEventHandler } from 'react'

type ToolboxProps = {
  filePath?: string
  fileLoadTime?: string
  onFileOpenClick: () => void
  onFileReloadClick: () => void
  onSettingsClick: MouseEventHandler
}

function Toolbox({
  filePath,
  fileLoadTime,
  onFileOpenClick,
  onFileReloadClick,
  onSettingsClick,
}: ToolboxProps) {
  return (
    <section className="col-span-3 grid grid-cols-6 gap-x-6 gap-y-2 mb-auto select-none">
      <div className="col-span-6 grid grid-cols-6 gap-x-6 gap-y-2">
        <button
          className={clsx(
            'col-span-3 border rounded p-1 text-sm',
            filePath
              ? 'border-zinc-600 hover:border-zinc-500 bg-zinc-800'
              : clsx(
                  'border-blue-600 hover:border-blue-500',
                  'bg-blue-600 hover:bg-blue-500 text-white font-bold'
                )
          )}
          type="button"
          onClick={onFileOpenClick}
        >
          {filePath ? '다른 ' : null}파일 선택
        </button>
        <button
          className={clsx(
            'col-span-3',
            'border border-zinc-600 hover:border-zinc-500 rounded',
            'p-1 bg-zinc-800 text-sm'
          )}
          type="button"
          onClick={onFileReloadClick}
        >
          현재 파일 다시 불러오기
        </button>
        <div className="col-span-6 text-xs text-zinc-400">
          <div className="ex-high-legibility">
            {filePath || '파일을 선택하세요.'}
          </div>
          {fileLoadTime ? <div>불러온 시각: {fileLoadTime}</div> : null}
        </div>
      </div>

      <div className="col-span-6 grid grid-cols-6 gap-x-6 gap-y-2 mt-2">
        <button
          className={clsx(
            'col-span-3',
            'border border-zinc-600 hover:border-zinc-500 rounded',
            'p-1 bg-zinc-800 text-sm'
          )}
          type="button"
          onClick={onSettingsClick}
        >
          설정
        </button>
      </div>
    </section>
  )
}

export default Toolbox
