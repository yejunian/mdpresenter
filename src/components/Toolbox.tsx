import clsx from 'clsx'

type ToolboxProps = {
  filePath?: string
  fileLoadTime?: string
  onFileOpenClick: () => void
  onFileReloadClick: () => void
}

function Toolbox({
  filePath,
  fileLoadTime,
  onFileOpenClick,
  onFileReloadClick,
}: ToolboxProps) {
  return (
    <section className="col-span-3 grid grid-cols-6 gap-x-6 gap-y-2 mb-auto">
      <button
        className={clsx(
          'col-span-3 border rounded p-1 text-sm',
          filePath
            ? 'border-zinc-600'
            : 'border-blue-600 bg-blue-600 text-white font-bold'
        )}
        type="button"
        onClick={onFileOpenClick}
      >
        {filePath ? '다른 ' : null}파일 선택
      </button>
      <button
        className="col-span-3 border border-zinc-600 rounded p-1 text-sm"
        type="button"
        onClick={onFileReloadClick}
      >
        현재 파일 다시 불러오기
      </button>
      <div className="col-span-6 text-xs text-zinc-400 ex-high-legibility">
        {filePath || '파일을 선택하세요.'}
        {fileLoadTime ? (
          <>
            <br />
            불러온 시각: {fileLoadTime}
          </>
        ) : null}
      </div>
    </section>
  )
}

export default Toolbox
