import { open } from '@tauri-apps/api/dialog'
import { readTextFile } from '@tauri-apps/api/fs'

export async function loadSingleTextFile(path: string): Promise<string> {
  return await readTextFile(path)
}

export async function selectSingleTextFile(): Promise<string> {
  const selected = await open({
    filters: [
      {
        name: '지원하는 모든 파일',
        extensions: ['md', 'markdown', 'txt'],
      },
      {
        name: 'text/markdown',
        extensions: ['md', 'markdown'],
      },
      {
        name: 'text/plain',
        extensions: ['txt'],
      },
      {
        name: '모든 파일',
        extensions: ['*'],
      },
    ],
  })

  if (!selected) {
    throw new Error('File is not selected')
  }

  if (Array.isArray(selected)) {
    throw new Error('Unreachable block')
  }

  return selected
}
