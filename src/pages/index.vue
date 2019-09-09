<template>
    <h1>Drink & D-Rank</h1>
</template>

<script>
    export default {
        name: 'homepage',
        created() {

            this.$router.push(
                {
                    name: 'drink-and-drank',
                }
            );

        },
    };
</script>
