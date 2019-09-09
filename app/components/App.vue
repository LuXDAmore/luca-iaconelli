<template lang="html">
    <RadSideDrawer
        drawer-location="Left"
        gestures-enabled="true"
        :drawer-transition="transition"
    >
        <StackLayout ~drawerContent>
            <slot name="drawerContent" />
        </StackLayout>
        <StackLayout ~mainContent>
            <Frame>
                <slot name="mainContent" />
            </Frame>
        </StackLayout>
    </RadSideDrawer>
</template>

<script>
    import { SlideInOnTopTransition } from 'nativescript-ui-sidedrawer';

    export default {
        data() {

            return {
                transition: new SlideInOnTopTransition(),
            };

        },
    };
</script>

<style lang="css">
</style>
