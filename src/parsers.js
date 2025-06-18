import fs from 'fs'
import path from 'path'

export const parseJsonFile = (filePath) => {
    const absolutePath = path.resolve(process.cwd(), filePath)
    const fileContent = fs.readFileSync(absolutePath, 'utf-8')
    return JSON.parse(fileContent)
}
