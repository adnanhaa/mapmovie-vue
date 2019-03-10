<template>
    <div class='container mt-5'>
        <div class='row justify-content-center'>
            <div class=''>
                <div class="spinner-grow text-primary" role="status"/>
                <div class="spinner-grow text-secondary" role="status"/>
                <div class="spinner-grow text-success" role="status"/>
                <div class="spinner-grow text-danger" role="status"/>
                <div class="spinner-grow text-warning" role="status"/>
            </div>
        </div>
        <div class='row mt-3 mb-5'>
            <div class='mx-auto text-center'> {{text}} </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Spinner",
        props : {
            text : String
        }
    }
</script>

<style scoped>

</style>