import { match as matchPinyin } from 'pinyin-pro'

export type TextRange = readonly [start: number, end: number]

const PINYIN_OPTIONS = {
  continuous: true,
  insensitive: true,
  precision: 'every',
  space: 'ignore',
  v: true,
} as const

function hasChinese(value: string) {
  return /[\u3400-\u9fff]/u.test(value)
}

export function normalize(value: string) {
  return value.toLocaleLowerCase().replace(/[\s`'"，。！？、/\-_:：]/g, '')
}

function isPinyinQuery(value: string) {
  const query = normalize(value)
  return Boolean(query) && /^[a-z]+$/u.test(query)
}

export function pinyinMatchIndices(text: string, query: string) {
  if (!isPinyinQuery(query) || !hasChinese(text)) return null
  try {
    return matchPinyin(text, normalize(query), PINYIN_OPTIONS)
  } catch {
    return null
  }
}

function codeUnitStarts(characters: string[]) {
  const starts: number[] = []
  let offset = 0
  for (const character of characters) {
    starts.push(offset)
    offset += character.length
  }
  return starts
}

function mergeRanges(ranges: TextRange[]) {
  return ranges
    .filter(([start, end]) => end > start)
    .sort(([left], [right]) => left - right)
    .reduce<TextRange[]>((merged, range) => {
      const previous = merged.at(-1)
      if (previous && range[0] <= previous[1]) {
        merged[merged.length - 1] = [previous[0], Math.max(previous[1], range[1])]
      } else {
        merged.push(range)
      }
      return merged
    }, [])
}

function normalizedRanges(text: string, query: string): TextRange[] {
  const normalizedQuery = normalize(query)
  if (!normalizedQuery) return []

  const characters = Array.from(text)
  const starts = codeUnitStarts(characters)
  const spans: { sourceIndex: number; start: number; end: number }[] = []
  let normalizedOffset = 0
  for (const [sourceIndex, character] of characters.entries()) {
    const part = normalize(character)
    if (part) spans.push({ sourceIndex, start: normalizedOffset, end: normalizedOffset + part.length })
    normalizedOffset += part.length
  }
  const normalizedText = spans.map((span) => normalize(characters[span.sourceIndex])).join('')
  const ranges: TextRange[] = []
  for (let index = normalizedText.indexOf(normalizedQuery); index !== -1; index = normalizedText.indexOf(normalizedQuery, index + 1)) {
    const end = index + normalizedQuery.length
    const matched = spans.filter((span) => span.end > index && span.start < end)
    if (!matched.length) continue
    const first = matched[0].sourceIndex
    const last = matched.at(-1)!.sourceIndex
    ranges.push([starts[first], starts[last] + characters[last].length])
  }
  return ranges
}

function pinyinRanges(text: string, query: string): TextRange[] {
  const indices = pinyinMatchIndices(text, query)
  if (!indices?.length) return []

  const characters = Array.from(text)
  const starts = codeUnitStarts(characters)
  const validIndices = [...new Set(indices)]
    .filter((index) => index >= 0 && index < characters.length)
    .sort((left, right) => left - right)
  if (!validIndices.length) return []
  const ranges: TextRange[] = []
  let groupStart = validIndices[0]
  let previous = groupStart
  for (const index of validIndices.slice(1)) {
    if (index === previous + 1) {
      previous = index
      continue
    }
    ranges.push([starts[groupStart], starts[previous] + characters[previous].length])
    groupStart = previous = index
  }
  ranges.push([starts[groupStart], starts[previous] + characters[previous].length])
  return ranges
}

export function getTextMatchRanges(text: string, query: string): TextRange[] {
  if (!query.trim()) return []
  return mergeRanges([...normalizedRanges(text, query), ...pinyinRanges(text, query)])
}
