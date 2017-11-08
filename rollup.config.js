
import buble from 'rollup-plugin-buble';
import pkg from './package.json';

export default [
    // browser-friendly UMD build
    {
        input: pkg.module,
        output: {
            file: pkg.browser,
            format: 'iife',
            sourcemap: true
        },
        name: 'unclutter1d',
        plugins: [
            buble({}),
        ]
    },

    {
        input: pkg.module,
        output: [
            { file: pkg.main, format: 'cjs', sourcemap: true },
//             { file: pkg.module, format: 'es', sourcemap: true }
        ],
        plugins: [
            buble({}),
        ]
    }
];
