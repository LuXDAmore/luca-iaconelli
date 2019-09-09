
import { getRootView } from 'tns-core-modules/application';

export const showDrawer = () => {

    const drawerNativeView = getRootView();

    if( drawerNativeView && drawerNativeView.showDrawer )
        drawerNativeView.showDrawer();

};

export const closeDrawer = () => {

    const drawerNativeView = getRootView();

    if( drawerNativeView && drawerNativeView.showDrawer )
        drawerNativeView.closeDrawer();

};
