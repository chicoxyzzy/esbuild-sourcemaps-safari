#!/usr/bin/env node
import fs from 'node:fs/promises'

import esbuild from 'esbuild'

import { rollup } from 'rollup';
import { terser } from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

async function main () {
  if (process.env.BUNDLER === 'rollup') {
    const bundle = await rollup({
      input: 'src/index.js',
      plugins: [
        resolve(),
        json(),
        commonjs({
          extensions: ['.js', '.json']
        }),
      ]
    })
    await bundle.write({
      format: 'esm',
      sourcemap: true,
      dir: 'dist',
      plugins: [,
        terser({ keep_fnames: true })
      ]
    });
    await bundle.close()
  } else {
    await esbuild.build({
      entryPoints: ['src/index.js'],
      format: 'esm',
      bundle: true,
      keepNames: true,
      minify: true,
      sourcemap: true,
      outdir: 'dist'
    })
  }

  await fs.cp('src/index.html', 'dist/index.html', { recursive: true, force: true })
}

main()
