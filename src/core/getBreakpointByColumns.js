const gap = 24

/**
 * @param {number} count
 * @returns {number}
 */
function getBreakpointByColumns(count) {
  return count * 264 + (count + 1) * gap + gap
}

module.exports = {
  columnGap: gap,
  getBreakpointByColumns,
}
