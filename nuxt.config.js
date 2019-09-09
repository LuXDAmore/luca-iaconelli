// Imports
import dotenv from 'dotenv';

// Env extraction
const {
        NODE_ENV,
        VUE_APP_LOCALE,
        VUE_APP_AUTHOR,
        VUE_APP_TITLE,
        VUE_APP_DESCRIPTION,
        VUE_APP_COLOR,
        API_URL,
        BASE_URL,
    } = dotenv.config().parsed
    // Development or Production
    , IS_DEV = NODE_ENV === 'development'
    , IS_PROD = NODE_ENV === 'production'
    // Title, description and colors
    , title = VUE_APP_TITLE
    , description = VUE_APP_DESCRIPTION
    , url = IS_PROD ? `${ BASE_URL }/` : '/'
    , primary = VUE_APP_COLOR
    // Links && Scripts
    , link = [
        {
            once: true,
            hid: 'favicon',
            rel: 'shortcut icon',
            type: 'image/x-icon',
            href: 'favicon.ico',
        },
        {
            once: true,
            hid: 'safari-pinned-tab',
            rel: 'mask-icon',
            href: 'safari-pinned-tab.svg',
            color: primary,
        },
        {
            once: true,
            hid: 'humans',
            rel: 'author',
            type: 'text/plain',
            href: 'humans.txt',
        },
    ]
    , script = []
    , noscript = []
    // Plugins && Middleware requirements.
    , plugins = [ '~/plugins/jsonld' ]
    , modules = [
        '@nuxtjs/dotenv',
        '@nuxtjs/browserconfig',
        '@nuxtjs/pwa',
        'nuxt-compress',
    ]
    , routerMiddleware = []
;

// Other modules
API_URL && modules.push(
    [
        '@nuxtjs/axios',
        {
            https: true,
            baseUrl: API_URL,
        },
    ]
);

// Nuxt Config
module.exports = {
    srcDir: 'src/',
    modern: true,
    dev: IS_DEV,
    /*
     ** Headers of the page
     */
    head: {
        title,
        htmlAttrs: {
            lang: VUE_APP_LOCALE,
        },
        meta: [
            {
                once: true,
                hid: 'description',
                name: 'description',
                content: description,
            },
            {
                once: true,
                hid: 'x-ua-compatible',
                'http-equiv': 'X-UA-Compatible',
                content: 'IE=edge,chrome=1',
            },
        ],
        link,
        script,
        noscript,
    },
    /*
     ** CSS
     */
    css: [ '~assets/global.scss' ],
    /*
     ** Router
     */
    router: {
        base: url,
        prefetchLinks: true,
        middleware: routerMiddleware,
        linkActiveClass: 'is-link-active',
        linkExactActiveClass: 'is-link-exact-active',
        linkPrefetchedClass: 'is-link-prefetched',
    },
    /*
     ** Modules
     */
    modules,
    dotenv: {
        path: './',
    },
    meta: {
        name: title,
        description,
        lang: VUE_APP_LOCALE,
        theme_color: primary,
        author: VUE_APP_AUTHOR,
    },
    manifest: {
        name: VUE_APP_DESCRIPTION,
        short_name: VUE_APP_DESCRIPTION,
        start_url: `${ url }?utm_source=pwa&utm_medium=app`,
        description,
        lang: VUE_APP_LOCALE,
        theme_color: primary,
        background_color: primary,
        orientation: 'portrait',
        prefer_related_applications: true,
    },
    browserconfig: {
        TileColor: primary,
        square70x70logo: {
            '@': {
                src: 'icons/windows/mstile-70x70.png',
            },
        },
        // square144x144logo: {
        //     '@': {
        //         src: 'icons/windows/mstile-144x144.png',
        //     },
        // },
        square150x150logo: {
            '@': {
                src: 'icons/windows/mstile-150x150.png',
            },
        },
        square310x150logo: {
            '@': {
                src: 'icons/windows/mstile-310x150.png',
            },
        },
        // square310x310logo: {
        //     '@': {
        //         src: 'icons/windows/mstile-310x310.png',
        //     },
        // },
    },
    /*
     ** Plugins
     */
    plugins,
    /*
     ** Customize the progress bar color
     */
    loading: {
        color: primary,
        failedColor: primary,
        height: '5px',
    },
    /*
     ** Build configuration
     */
    build: {
        ... (
            IS_PROD
            ? {
                publicPath: url,
            }
            : {}
        ),
        devtools: ! IS_PROD,
        loaders: {
            vue: {
                compilerOptions: {
                    preserveWhitespace: false,
                    whitespace: 'condense',
                },
            },
        },
        /*
         ** PostCSS
         */
        postcss: {
            parser: 'postcss-scss',
            syntax: 'postcss-scss',
            preset: {
                stage: 2,
                autoprefixer: {
                    cascade: false,
                    grid: true,
                },
            },
        },
        /*
         ** Minifier
         */
        html: {
            minify: {
                collapseBooleanAttributes: true,
                decodeEntities: true,
                minifyCSS: true,
                minifyJS: true,
                processConditionalComments: true,
                removeEmptyAttributes: true,
                removeRedundantAttributes: true,
                trimCustomFragments: true,
                useShortDoctype: true,
                collapseWhitespace: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                removeComments: true,
            },
        },
        /*
         ** Run lint on save
         */
        extend(
            config,
            {
                isDev,
                isClient,
            }
        ) {

            /*
             ** ESLint loaded
             */
            isDev && isClient && config.module.rules.push(
                {
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/,
                }
            );

        },
    },
    /*
     ** Render
     */
    render: {
        http2: {
            push: true,
            pushAssets: (
                req,
                res,
                publicPath,
                preloadFiles
            ) => preloadFiles
                .filter(
                    f => f.asType === 'script' && f.file === 'runtime.js'
                )
                .map(
                    f => `<${ publicPath }${ f.file }>; rel=preload; as=${ f.asType }`
                )
            ,
        },
    },
    /*
     * Vue
     */
    vue: {
        config: {
            productionTip: false,
        },
    },
    /*
     * Generate
     */
    generate: {
        dir: 'docs',
    },
};
