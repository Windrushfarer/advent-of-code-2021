import fs from 'fs'

/**
 * @param {string} filePath
 * @returns {string}
 */
export function readInputFile(filePath) {
  return fs.readFileSync(filePath, 'utf8')
}

/**
 * @param {string} filePath
 * @returns {number[]}
 */
export function getInputData(filePath) {
  const raw = readInputFile(filePath)

  return raw.split('\n').map(entry => Number(entry))
}