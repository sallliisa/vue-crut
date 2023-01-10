<script setup lang="ts">

</script>

<template>
<div class="block overflow-x-auto whitespace-nowrap">
    <table class="table-auto w-full">
        <thead>
            <th v-if="numbered" class="text-start pb-4">No.</th>
            <th v-for="column in columns"><h1 class="text-start pb-4">{{ column }}</h1></th>
        </thead>
        <tbody>
            <tr v-if="paginated && !numbered" v-for="item in paginatedData">
                <slot name="item" v-bind="item"></slot>
            </tr>
            <tr v-else-if="paginated && numbered" v-for="(item, idx) in paginatedData">
                <td>{{ pageStartIndex + idx }}</td>
                <slot name="item" v-bind="item"></slot>
            </tr>
            <tr v-else v-for="item in (data as any)">
                <slot name="item" v-bind="item"></slot>
            </tr>
        </tbody>
    </table>
</div>
</template>

<script lang="ts">
export default {
    name: "Table",
    props: {
        columns: {
            type: Array,
            required: true
        },
        data: {
            type: Array,
            required: true
        },
        paginated: {
            type: Boolean,
            required: false,
            default: false
        },
        numbered: {
            type: Boolean,
            required: false,
            default: false
        },
        itemPerPage: {
            type: Number,
            required: false,
            default: 10
        },
        currentPage: {
            type: Number,
            required: false,
            default: 1
        }
    },
    methods: {
        range(min: number, max: number) {
            return Array.from(Array((max-1) - min + 1).keys()).map((x) => x + min);
        },
    },
    computed: {
        paginatedData() {
            const start = (this.currentPage - 1) * this.itemPerPage;
            const end = this.currentPage * this.itemPerPage;
            return (this.data as any).slice(start, end);
        },
        pageStartIndex() {
            return (this.currentPage - 1) * this.itemPerPage + 1
        },
    }
}
</script>