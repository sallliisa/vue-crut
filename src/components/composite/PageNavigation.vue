<script setup lang="ts">
import Button from "@/components/Button.vue";
import Dropdown from "@/components/Dropdown.vue";
import IconChevronRight from "../icons/IconChevronRight.vue";
import IconChevronLeft from "../icons/IconChevronLeft.vue";
import IconChevronsRight from "../icons/IconChevronsRight.vue";
import IconChevronsLeft from "../icons/IconChevronsLeft.vue";
</script>

<template>
<div class="flex flex-col md:flex-row md:justify-between items-center gap-4">
    <div class="flex flex-row gap-2">
        <button class="fill-white disabled:fill-c-outline disabled:hover:border-c-outline/75 border border-c-outline/75 hover:border-c-outline/100 hover:bg-rbs-primary/20 rounded-md text-rbs-primary py-2 px-4 font-semibold" :disabled="currentPage == 1" @click="currentPage = 1; currentPageChange()">
            <IconChevronsLeft/>
        </button>
        <button class="fill-white disabled:fill-c-outline disabled:hover:border-c-outline/75 border border-c-outline/75 hover:border-c-outline/100 hover:bg-rbs-primary/20 rounded-md text-rbs-primary py-2 px-4 font-semibold" :disabled="currentPage == 1" @click="currentPage--; currentPageChange()">
            <IconChevronLeft/>
        </button>
        <div class="border border-c-outline/75  rounded-md py-2 px-4">
            {{currentPage}}
        </div>
        <button class="fill-white disabled:fill-c-outline disabled:hover:border-c-outline/75 border border-c-outline/75 hover:border-c-outline/100 hover:bg-rbs-primary/20 rounded-md text-rbs-primary py-2 px-4 font-semibold" :disabled="currentPage == lastPage" @click="currentPage++; currentPageChange()">
            <IconChevronRight/>
        </button>
        <button class="fill-white disabled:fill-c-outline disabled:hover:border-c-outline/75 border border-c-outline/75 hover:border-c-outline/100 hover:bg-rbs-primary/20 rounded-md text-rbs-primary py-2 px-4 font-semibold" :disabled="currentPage == lastPage"  @click="currentPage = lastPage; currentPageChange()">
            <IconChevronsRight/>
        </button>
    </div>
    <div class="flex flex-row gap-2 items-center justify-center">
        <h1 class='text-rbs-grey'>Menampilkan {{ dataLength > (viewSizeDropdownOptions[viewSizeDropdownActive] as number) ? viewSizeDropdownOptions[viewSizeDropdownActive] : dataLength }} dari {{ dataLength }} data</h1>
        <Dropdown v-on:activeItemChange="viewSizeDropdownActiveChange($event)" :items=viewSizeDropdownOptions></Dropdown>
    </div>
</div>
</template>

<script lang="ts">
export default {
    name: "PageNavigation",
    data() {
        return {
            currentPage: 1,
            viewSizeDropdownActive: 0
        }
    },
    props: {
        dataLength: {
            type: Number,
            required: true
        },
        viewSizeDropdownOptions: {
            type: Array,
            required: false,
            default: () => [10, 20, 50, 100]
        },
    },
    methods: {
        viewSizeDropdownActiveChange(event: any) {
            this.viewSizeDropdownActive = event;
            this.$emit('viewSizeDropdownActiveChange', this.viewSizeDropdownOptions[event])
        },
        currentPageChange() {
            this.$emit('currentPageChange', this.currentPage)
        }
    },
    emits: ['viewSizeDropdownActiveChange', 'currentPageChange'],
    computed: {
        lastPage() {
            return Math.ceil(this.dataLength / (this.viewSizeDropdownOptions[this.viewSizeDropdownActive] as any))
        }
    },
}
</script>