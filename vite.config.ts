import {defineConfig} from 'vite'

export default defineConfig(({mode}) => {
    const standalone = mode === 'standalone'

    return {
        publicDir: mode === 'development' ? 'public' : false,
        build: {
            outDir: standalone ? 'dist/standalone' : 'dist/library',
            emptyOutDir: true,
            lib: {
                entry: 'src/index.ts',
                name: 'VXComponents',
                formats: standalone ? ['iife'] : ['es', 'cjs'],
                fileName: format => {
                    if (standalone)
                        return 'vx-components.js'
                    return format === 'cjs' ? 'index.cjs' : 'index.js'
                }
            },
            ...(standalone ? {} : {
                rollupOptions: {
                    external: (id: string) => /^(lit|color2k|path-to-regexp)(\/|$)/.test(id)
                }
            })
        }
    }
})
