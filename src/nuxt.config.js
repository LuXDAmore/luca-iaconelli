import { resolve } from 'path';

const meta = [
    {
        once: true,
        hid: 'description',
        name: 'description',
        content: 'ASD',
    },
];

export default {
    rootDir: resolve(
        __dirname,
        '..',
    ),
    buildDir: resolve(
        __dirname,
        '.nuxt',
    ),
    srcDir: __dirname,
    head: {
        htmlAttrs: {
            lang: 'en',
        },
        title: 'Luca Iaconelli',
        meta,
    },
    /*
     * Router
     */
    router: {
        base: (
            process.env.NODE_ENV === 'production'
            ? '/luca-iaconelli/'
            : '/'
        ),
    },
    /*
     * Generate
     */
    generate: {
        dir: resolve(
            __dirname,
            '../docs'
        ),
    },
};
