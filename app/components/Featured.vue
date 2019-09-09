<template>
    <Page class="page">
        <ActionBar class="action-bar">
            <!-- 
            Use the NavigationButton as a side-drawer button in Android
            because ActionItems are shown on the right side of the ActionBar
            -->
            <NavigationButton
                ios:visibility="collapsed"
                icon="res://menu"
                @tap="onDrawerButtonTap"
            />
            <!-- 
            Use the ActionItem for IOS with position set to left. Using the
            NavigationButton as a side-drawer button in iOS is not possible,
            because its function is to always navigate back in the application.
            -->
            <ActionItem
                icon="res://navigation/menu" 
                android:visibility="collapsed" 
                ios.position="left"
                @tap="onDrawerButtonTap"
            />
            <Label class="action-bar-title" text="Featured" />
        </ActionBar>

        <GridLayout class="page-content">
            <Label class="page-icon fa" text.decode="&#xf005;" />
            <Label class="page-placeholder" :text="message" />
        </GridLayout>
    </Page>
</template>

<script>
    import SelectedPageService from '../shared/selected-page-service';
    import * as utils from '~/shared/utils';

    export default {
        computed: {
            message() {

                return '<!-- Page content goes here -->';
            
            },
        },
        mounted() {

            SelectedPageService.getInstance().updateSelectedPage(
                'Featured' 
            );
        
        },
        methods: {
            onDrawerButtonTap() {

                utils.showDrawer();
            
            },
        },
    };
</script>

<style scoped lang="scss">
    // Start custom common variables
    @import '../app-variables';
    // End custom common variables

    // Custom styles
</style>
