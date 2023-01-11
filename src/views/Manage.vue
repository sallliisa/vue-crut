<script setup lang="ts">
import Card from "@/components/Card.vue"
import Input from "@/components/Input.vue";
import IconSearch from "@/components/icons/IconSearch.vue";
import Group from "@/components/Group.vue";
import Stack from "@/components/Stack.vue";
import ButtonIcon from "@/components/ButtonIcon.vue";
import IconFilter from "@/components/icons/IconFilter.vue";
import IconPlus from "@/components/icons/IconPlus.vue";
import Table from "@/components/Table.vue";
import {ref, reactive, computed} from "vue";
import Dropdown from "@/components/Dropdown.vue";
import RadioSelection from "@/components/RadioSelection.vue";
import Button from "@/components/Button.vue";
import PageNavigation from "@/components/composite/PageNavigation.vue"
import axios from 'axios'

const query = ref('')
const activeradio = ref(0)
const activedropdown = ref(0)
const showFilter = ref(false)
const showInputForm = ref(false)
const tablePage = ref(1)
const tableViewSize = ref(10)
const inputName = ref('')
const inputCode = ref('')
const productData = reactive({
    columns: ['PRODUCT CODE', 'PRODUCT NAME', 'UNIT PRICE', 'STOCK'],
    data: []
})

const uom = reactive({
    data: []
})

const product = reactive({
    code: '',
    name: '',
    description: '',
    unit_price: 0,
    stock: 0,
    uom_id: 1,
})

function searchData(data: Array<Object>, key: string, field: string) {
    return data.filter((data: any) => data[field].toLowerCase().includes(key.toLowerCase()));
}

const searchedData: any = computed(() => {
    return searchData(productData.data, query.value, 'product_name')
})

const fetchProducts = () => {
  axios.get('https://pos.zzidzz.tech/products').then(function (response) {
    productData.data = response.data.data
  }).catch(function (error) {
    console.log(error)
  });
}

const fetchUOMs = () => {
  axios.get('https://pos.zzidzz.tech/uoms').then(function (response) {
    response.data.data.map((item: any) => {
      (uom as any).data.push(item.uom_name)
    })
  }).catch(function (error) {
    console.log(error)
  });
}

const submitData = () => {
  const data = {
    product_code: product.code,
    product_name: product.name,
    uom_id: product.uom_id,
    thumbnail: "",
    description: product.description,
    unit_price: product.unit_price,
    stock: product.stock
  }
  axios.post('https://pos.zzidzz.tech/products/create', data).then(function (response) {
    fetchProducts()
    showInputForm.value = false
    console.log(response)
  }).catch(function (error) {
    console.log(error)
  });
}

fetchProducts()
fetchUOMs()

</script>

<template>
  <main>
    <Stack>
      <Card class="gap-4">
        <Group class="justify-between">
          <Group>
            <Input placeholder="Cari" @update-value="query = $event"><IconSearch class="fill-white"/></Input>
            <ButtonIcon :active="showFilter" @click="showFilter = !showFilter"><IconFilter class="fill-white"/></ButtonIcon>
          </Group>
          <Group>
            <ButtonIcon :active="showInputForm" @click="showInputForm = !showInputForm"><IconPlus class="fill-white"/></ButtonIcon>
          </Group>
        </Group>
      </Card>

      <Card v-if="showInputForm">
        <Group>
          <Input class="w-[168px]" @update-value="product.code = $event" placeholder="Product Code"></Input>
          <Input @update-value="product.name = $event" placeholder="Product Name"></Input>
        </Group>
        <Input @update-value="product.description = $event" placeholder="Product Description"></Input>
        <Input @update-value="product.unit_price = $event" placeholder="Unit Price"></Input>
        <Group>
          <Input @update-value="product.stock = $event" placeholder="Stock"></Input>
          <Dropdown :items="uom.data" @active-item-change="product.uom_id = $event + 1"></Dropdown>
        </Group>
        <Button @click="submitData()">Submit</Button>
      </Card>

      <Card v-if="showFilter" class="items-start">
        <Group class="gap-12">
          <Stack>
            <div class="text-sm text-c-faded w-[250px]">Kategori</div>
            <Dropdown :items="['SEMUA', 'gamer', 'mr gamer']" @active-item-change="activedropdown = $event"></Dropdown>
          </Stack>
          <Stack>
            <div class="text-sm text-c-faded">Status</div>
            <Group class="gap-8">
              <RadioSelection :items="['Aktif', 'Non-aktif']" @active-item-change="activeradio = $event"/>
            </Group>
          </Stack>
        </Group>
        <Group>
          <Button>Apply</Button>
          <Button>Reset</Button>
        </Group>
      </Card>

      <Card class="gap-8">
        <Table v-if="searchedData.length > 0" :columns="productData.columns" :data="searchedData">
          <template #item="item">
            <td class="py-1 w-36">{{ item.product_code }}</td>
            <td>
              <Stack class="gap-0">
                <div>{{ item.product_name }}</div>
                <div class="text-xs text-c-outline">{{ item.description }}</div>
              </Stack>
            </td>
            <td class="w-36">Rp{{ item.unit_price.toLocaleString('en-US') }}</td>
            <td class="w-36">
              <Group class="gap-1 items-end">
                <div>{{ item.stock }}</div>
                <div class="text-xs">{{ item.uom_name }}</div>
              </Group></td>
          </template>
        </Table>
        <div v-else>Data tidak ditemukan</div>
        <PageNavigation :data-length="searchedData.length" @current-page-change="tablePage = $event" @view-size-dropdown-active-change="tableViewSize = $event"/>
      </Card>
    </Stack>
  </main>
</template>

<script lang="ts">
</script>