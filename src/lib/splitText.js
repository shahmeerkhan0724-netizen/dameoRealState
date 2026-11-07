/**
 * A tiny, dependency-free split-text helper for masked line/word reveals.
 * It wraps every word in an outer overflow-hidden span and an inner animated span.
 */
export function splitWords(root) {
  if (!root) return { words: [], revert: () => {} }

  const lines = root.querySelectorAll('[data-split-line]')
  const targets = lines.length ? Array.from(lines) : [root]
  const restorers = []

  targets.forEach((line) => {
    const original = line.textContent
    const words = original.trim().split(/\s+/).filter(Boolean)
    if (!words.length) return

    line.textContent = ''
    words.forEach((word, index) => {
      const outer = document.createElement('span')
      outer.className = 'split-word'
      const inner = document.createElement('span')
      inner.className = 'split-word-inner'
      inner.textContent = word
      outer.appendChild(inner)
      line.appendChild(outer)
      if (index < words.length - 1) {
        line.appendChild(document.createTextNode(' '))
      }
    })
    restorers.push(() => {
      line.textContent = original
    })
  })

  return {
    words: root.querySelectorAll('.split-word-inner'),
    revert() {
      restorers.forEach((restore) => restore())
    },
  }
}
