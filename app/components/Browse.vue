<template>
    <Page class="page">

        <ActionBar class="action-bar">

            <!-- http://www.hellothupten.com/2013/06/25/436/ -->
            <!-- https://developer.android.com/reference/android/R.drawable.html -->
            <NavigationButton
                text="Go Back"
                android.systemIcon="ic_menu_back"
                android.position="actionBar"
                ios.position="left"
                ios.systemIcon="9"
                @tap="onDrawerButtonTap"
            />

            <Label class="action-bar-title" text="Browse" />

        </ActionBar>

        <GridLayout class="page-content">
            <Label class="page-icon fa" text.decode="&#xf015;" />
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
                'Browse'
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
    @import "../app-variables";
    // End custom common variables

    // Custom styles
    .fa {

        color: $accent-dark;

    }

    .info {

        font-size: 20;

    }

</style>
