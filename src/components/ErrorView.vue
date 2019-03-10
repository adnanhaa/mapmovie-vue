<template>
    <div>
        <div className="alert alert-danger" role="alert">
            {{message}}
        </div>
    </div>
</template>

<script>
    export default {
        name: "ErrorView",
        props:{
            message: String
        }
    }
</script>

<style scoped>

</style>