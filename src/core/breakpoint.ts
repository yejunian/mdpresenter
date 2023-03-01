import {
  columnGap,
  getBreakpointByColumns,
} from '../core/getBreakpointByColumns'

export { columnGap, getBreakpointByColumns }

export const breakpoints = [4, 5, 6].map((column) =>
  getBreakpointByColumns(column)
)

export function getColumnsByWidth(width: number): number | undefined {
  for (let i = breakpoints.length - 1; i >= 0; i -= 1) {
    if (width >= breakpoints[i]) {
      return i + 4
    }
  }

  return undefined
}
