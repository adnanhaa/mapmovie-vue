<template>
    <nav class="navbar border-top" style="background-color: #29313e;padding-left:4px;padding-right:4px;">
        <div class="" role="toolbar" style="width:100%; display: flex;">
            <div class="justify-content-between" style="width:100%; display: flex;">
                <div class="btn-group">
                    <BackButton/>
                </div>

                <div class="btn-group">
                    <div class="btn btn-secondary btn-sm">Videos</div>
                    <div class="btn btn-secondary btn-sm">Images</div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
    import BackButton from "@/components/BackButton";
    export default {
        name: "DetailsNav",
        components: {BackButton},
    }
</script>

<style scoped>

</style>