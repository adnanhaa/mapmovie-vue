<template>
    <nav>
        <ul class="pagination pagination-sm justify-content-center">
            <li :class="['page-item ', this.selected === 1 ? 'disabled' :  '']">
                <a @click="prevPage()"
                   class="page-link pointer">Prev</a>
            </li>

            <li :class="['page-item', page === selected ? 'active' : '']" v-for="page in items">
                <a @click="handlePageClicked(page)" class="page-link pointer">{{page}}</a>
            </li>

            <li @click="nextPage()"
                :class="['page-item', this.selected === sum ? 'disabled' :  '']">
                <a class="page-link pointer" >Next</a>
            </li>
        </ul>
    </nav>
</template>

<script>
    export default {
        name: "Pagination",
        props: {
            current: {
                type: Number,
                default: 1
            },
            sum: {
                type: Number,
                default: 0
            },
            range: {
                type: Number,
                default: 3
            },
            static: {
                type: Boolean,
                default: true
            },
            prevText: {
                type: String,
                default: 'Prev'
            },
            nextText: {
                type: String,
                default: 'Next'
            },
            clickHandler: {
                type: Function,
            }
        },

        data: function(){
            return {
                selected: 1
            }
        },

        beforeUpdate() {
            if (this.current === undefined) return;
            if (this.current !== this.selected) {
                this.selected = this.current;
            }
        },

        computed: {
            active: {
                get: function () {
                    return this.selected;
                },
                set: function (value) {
                    return this.selected = value;
                }
            },
            items () {
                let start = 1;
                //console.log(this);
                return [1, '...','t', 'e', 's', 't', '...', 23]
            }
        },
        methods: {
            handlePageClicked(page) {
                if (this.selected === page) return;
                this.selected = page;
                this.$emit('pageSelected', page);
                this.clickHandler(page)
            },
            prevPage() {
                if (this.selected <= 1) return;
                this.handlePageClicked(this.selected - 1)
            },
            nextPage() {
                if (this.selected >= this.sum) return;
                this.handlePageClicked(this.selected + 1)
            },
        }
    }
</script>

<style scoped>

</style>