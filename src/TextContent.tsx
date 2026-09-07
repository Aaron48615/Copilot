export function renderText(text = '') {
  return text.split('\n').map((line, index) => {
    const heading = line.match(/^#{1,6} (.+)$/)
    const content = line
      .replace(/^([-*] |#{1,6} )/, '')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/\*\*([^*]+)\*\*/g, '$1')
    if (!content.trim()) return <br key={index} />
    if (heading) return <p key={index}><strong>{content}</strong></p>
    return line.startsWith('- ') || line.startsWith('* ') ? <li key={index}>{content}</li> : <p key={index}>{content}</p>
  })
}


export function renderEvidence(text = '') {
  return text.split('\n').filter((line) => line.trim()).map((line, index) => {
    const clean = line.replace(/^\s*(?:>\s*|[-*]\s*)+/, '')
    const link = clean.match(/^\[([^\]]+)\]\(([^)]+)\)(.*)$/)
    return <p key={index}>{link ? <><strong>{link[1]}</strong><code>{link[2]}</code><span>{link[3].replace(/^[:：]\s*/, '')}</span></> : clean.replace(/`([^`]+)`/g, '$1')}</p>
  })
}
