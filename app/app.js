import Vue from 'nativescript-vue';
import RadSideDrawer from 'nativescript-ui-sidedrawer/vue';

import Theme from 'nativescript-theme-core';

import App from './components/App';
import Home from './components/Home';
import DrawerContent from './components/DrawerContent';

Vue.use(
    RadSideDrawer
);

const IS_PROD = TNS_ENV === 'production';

Vue.config.silent = IS_PROD;
Vue.config.productionTip = ! IS_PROD;

/* N.B.: Vue DevTools are not supported yet
 * npm install --save-dev @vue/devtools nativescript-toasty nativescript-socketio nativescript-vue-devtools

    import VueDevtools from 'nativescript-vue-devtools';

    if( ! IS_PROD ) {

        Vue.use(
            VueDevtools
        );

    }

*/

Theme.setMode(
    Theme.Dark
);

new Vue(
    {
        render(
            h
        ) {

            return h(
                App,
                [
                    h(
                        DrawerContent,
                        {
                            slot: 'drawerContent',
                        }
                    ),
                    h(
                        Home,
                        {
                            slot: 'mainContent',
                        }
                    ),
                ]
            );

        },
    }
).$start();
