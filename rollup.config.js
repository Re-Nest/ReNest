import dts from "rollup-plugin-dts";
import typescript from '@rollup/plugin-typescript'
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import multiInput from 'rollup-plugin-multi-input';

const packageJson = require("./package/package.json");

const inputPaths = ['src/core/index.ts', 'src/component/index.ts', 'src/core/utils/HTMLTags.ts']

const outputPathMap = {
    'src/core/index.ts': 'index.js',
    'src/component/index.ts': 'component/index.js',
    'src/core/utils/HTMLTags.ts': 'tag/index.js'
}


const rollupDefault = [{
      input: inputPaths,
      output: {
        dir: './package',
        format: 'esm'
      },
      plugins: [
        typescript({ tsconfig: "tsconfig.json" }),
        commonjs(),
        nodeResolve(),
        multiInput({
            transformOutputPath: (output, input) => outputPathMap[input]
        })
      ],
      external: Object.keys(packageJson.dependencies)
},
{
    input: inputPaths,
    output: {
        dir: './package',
        format: "esm"
    },
    plugins: [
        multiInput({
            transformOutputPath: (output, input) => outputPathMap[input]
        }),
        dts()
    ]
}]

export default rollupDefault