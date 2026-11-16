import {readdir, readFile, writeFile} from 'node:fs/promises'
import {join} from 'node:path'
import {fileURLToPath} from 'node:url'

const declarationDirectory = fileURLToPath(new URL('../dist/library/types/', import.meta.url))

async function rewriteDeclarations(directory) {
    for (const entry of await readdir(directory, {withFileTypes: true})) {
        const path = join(directory, entry.name)
        if (entry.isDirectory()) {
            await rewriteDeclarations(path)
        } else if (entry.name.endsWith('.d.ts')) {
            const declaration = await readFile(path, 'utf8')
            const rewritten = declaration.replace(
                /((?:from\s*|import\s*\()\s*['"])(\.\.?\/[^'"]+)\.ts(['"])/g,
                '$1$2.js$3'
            )
            if (rewritten !== declaration)
                await writeFile(path, rewritten)
        }
    }
}

await rewriteDeclarations(declarationDirectory)
