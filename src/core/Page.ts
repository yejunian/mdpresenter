import { Root } from 'hast'

type Page = {
  contents: Root
  pageNumber: number
  note?: string
}

export default Page
