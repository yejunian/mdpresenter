import clsx from 'clsx'
import { FormEventHandler } from 'react'

type ToolboxProps = {
  filePath?: string
  fileLoadTime?: string
  fontSize?: number
  onFileOpenClick: () => void
  onFileReloadClick: () => void
  onFontSizeInput: FormEventHandler
}

function Toolbox({
  filePath,
  fileLoadTime,
  fontSize = 7.5,
  onFileOpenClick,
  onFileReloadClick,
  onFontSizeInput,
}: ToolboxProps) {
  return (
    <section className="col-span-3 grid grid-cols-6 gap-x-6 gap-y-2 mb-auto">
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

      <div className="col-span-6 text-sm text-zinc-400">
        폰트 기본 사이즈: 화면 높이의{' '}
        <input
          type="number"
          className="border border-zinc-500 rounded pl-1 w-12 bg-zinc-800 tabular-nums"
          value={fontSize}
          min={1}
          max={200}
          step={0.1}
          onInput={onFontSizeInput}
        />
        %
      </div>
    </section>
  )
}

export default Toolbox
