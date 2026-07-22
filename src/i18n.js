// ============================================================
// SMITH'S FORGE — i18n (EN base + VI/ID sub-line translations)
// ============================================================
import { TR } from './translations_smith.js'

export const LANGS = ['en', 'vi', 'id']
export const LANG_LABEL = { en: '🌐 EN', vi: '🌐 VI', id: '🌐 ID' }

let CUR_LANG = 'en'
try {
  const saved = localStorage.getItem('smith_lang')
  if (saved && LANGS.includes(saved)) CUR_LANG = saved
} catch (e) {}

export function getLang() { return CUR_LANG }
export function setLang(l) {
  if (!LANGS.includes(l)) return
  CUR_LANG = l
  try { localStorage.setItem('smith_lang', l) } catch (e) {}
}
export function nextLang() {
  return LANGS[(LANGS.indexOf(CUR_LANG) + 1) % LANGS.length]
}

// Attach translations onto the question objects once, keyed by group + id.
// TR = { S1:{1:{vi:{q,opts,exp}, id:{...}}, ...}, E1:{...} }
export function attachTranslations(quizStages, shikakuExams) {
  quizStages.forEach(s => s.questions.forEach(q => {
    const g = TR['S' + s.stageId]
    if (g && g[q.id]) q.tr = g[q.id]
  }))
  shikakuExams.forEach(e => e.questions.forEach(q => {
    const g = TR['E' + e.examId]
    if (g && g[q.id]) q.tr = g[q.id]
  }))
}
