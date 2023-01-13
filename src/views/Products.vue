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
import NumberInput from "@/components/NumberInput.vue";
import IconX from "@/components/icons/IconX.vue";
import ButtonSelection from "@/components/ButtonSelection.vue";
import IconTrash from "@/components/icons/IconTrash.vue";
import IconEdit from "@/components/icons/IconEdit.vue";
import IconLoading from "@/components/icons/IconLoading.vue";
import { useScreenStore } from "@/stores/screen";
import Alert from "@/components/Alert.vue";
import IconChevronRight from "@/components/icons/IconChevronRight.vue";
import IconChevronLeft from "@/components/icons/IconChevronLeft.vue";
import IconChevronsRight from "@/components/icons/IconChevronsRight.vue";
import IconChevronsLeft from "@/components/icons/IconChevronsLeft.vue";

const query = ref('')
const activeStockFilter = ref(0)
const tablePage = ref(1)
const tableViewSize = ref(10)
const loading = ref(true)
const errorMessage = ref('')
const viewSizeDropdownOptions = [10, 20, 30, 40, 40]
const viewSizeDropdownActive = ref(0)

const cardState = reactive({
  filter: false,
  input: false,
  edit: false,
  delete: false
})

const data = reactive({
  productData: {
    columns: ['PRODUCT CODE', 'PRODUCT NAME', 'UNIT PRICE', 'STOCK', 'ACTIONS'],
    data: [],
    total: 0,
    totalPages: 0,
    currentPage: 1
  },
  uom: [],
  product: {
    product_code: '',
    product_name: '',
    description: '',
    unit_price: 0,
    stock: 0,
    uom_id: 1,
  },
  editedProduct: {
    product_code: '',
    product_name: '',
    description: '',
    unit_price: 0,
    stock: 0,
    uom_id: 1,
  },
  deletedProduct: {
    id: 0,
    product_code: '',
    product_name: '',
    description: '',
    unit_price: 0,
    stock: 0,
    uom_id: 1,
  }
})

function searchData(data: Array<Object>, key: string, field: string) {
  return data.filter((data: any) => data[field].toLowerCase().includes(key.toLowerCase()));
}

function filterData(data: Array<Object>) {
  if (activeStockFilter.value === 0) return data
  else if (activeStockFilter.value === 1) return data.filter((data: any) => data.stock < 5)
  else return data.filter((data: any) => data.stock === 0)
}

const computedData: any = computed(() => {
  return searchData(filterData(data.productData.data), query.value, 'product_name')
})

function toggleEditCard() {
  if (cardState.edit) {
    cardState.edit = false
    data.editedProduct = {
      product_code: '',
      product_name: '',
      description: '',
      unit_price: 0,
      stock: 0,
      uom_id: 1,
    }
  }
  else cardState.edit = true
}

function toggleInputCard() {
  if (cardState.input) {
    cardState.input = false
    data.product = {
      product_code: '',
      product_name: '',
      description: '',
      unit_price: 0,
      stock: 0,
      uom_id: 1,
    }
  } else cardState.input = true
}

const fetchProducts = () => {
  console.log('fetching')
  loading.value = true
  axios.get(`/products?page=${data.productData.currentPage}&limit=${viewSizeDropdownOptions[viewSizeDropdownActive.value]}&search=${query.value}`).then(function (response) {
    errorMessage.value = ''
    data.productData.data = response.data.data
    data.productData.total = response.data.total
    data.productData.totalPages = response.data.totalPage
    data
    loading.value = false
  }).catch(function (error) {
    loading.value = false
    errorMessage.value = error.response.data.message
  });
}

const fetchUOMs = () => {
  axios.get('/uoms?limit=100').then(function (response) {
    errorMessage.value = ''
    response.data.data.map((item: any) => {
      (data.uom as any).push({id: item.id, uom_code: item.uom_code, uom_name: item.uom_name})
    })
  }).catch(function (error) {
    loading.value = false
    errorMessage.value = error.response.data.message
  });
}

const submitData = () => {
  loading.value = true
  const payload = {
    product_code: data.product.product_code,
    product_name: data.product.product_name,
    uom_id: data.product.uom_id,
    thumbnail: "",
    description: data.product.description,
    unit_price: data.product.unit_price,
    stock: data.product.stock
  }
  axios.post('/products/create', payload).then(function (response) {
    errorMessage.value = ''
    fetchProducts()
    toggleInputCard()
    loading.value = false
  }).catch(function (error) {
    loading.value = false
    errorMessage.value = error.response.data.message
  });
}

const removeData = (id: number) => {
  loading.value = true
  const payload = {
    id: id
  }
  axios.delete('/products/delete', {data: payload}).then(function (response) {
    errorMessage.value = ''
    fetchProducts()
    loading.value = false
    cardState.delete = false
  }).catch(function (error) {
    loading.value = false
    errorMessage.value = error.response.data.message
  });
}

const populateEditProduct = async (item: any) => {
  data.editedProduct = item
  cardState.edit = !cardState.edit
}

const editProduct = () => {
  loading.value = true
  axios.put('/products/update', data.editedProduct).then(function (response) {
    errorMessage.value = ''
    fetchProducts()
    toggleEditCard()
    loading.value = false
  }).catch(function (error) {
    loading.value = false
    errorMessage.value = error.response.data.message
  });
}

const deleteProduct = (item: any) => {
  data.deletedProduct = item
  cardState.delete = !cardState.delete
}

fetchProducts()
fetchUOMs()

</script>

<template>
  <main>
    <Stack>
      <Alert :sentiment="false" v-if="errorMessage != ''">{{ errorMessage }}</Alert>
      <Card class="gap-4">
        <Group v-if="useScreenStore().isAtLeast('md')" class="justify-between">
          <Group>
            <Input placeholder="Cari" @update-value="query = $event; fetchProducts()"><IconSearch class="fill-white"/></Input>
            <ButtonIcon :active="cardState.filter" @click="cardState.filter = !cardState.filter"><IconFilter class="fill-white"/></ButtonIcon>
          </Group>
          <Group>
            <ButtonIcon :active="cardState.input" @click="cardState.input = !cardState.input"><IconPlus class="fill-white"/></ButtonIcon>
          </Group>
        </Group>
        <Stack v-else>
          <Group>
            <Input placeholder="Cari" @update-value="query = $event"><IconSearch class="fill-white"/></Input>
          </Group>
          <Group class="justify-center">
            <ButtonIcon :active="cardState.filter" @click="cardState.filter = !cardState.filter"><IconFilter class="fill-white"/></ButtonIcon>
            <ButtonIcon :active="cardState.input" @click="cardState.input = !cardState.input"><IconPlus class="fill-white"/></ButtonIcon>
          </Group>
        </Stack>
      </Card>

      <Card v-if="cardState.input">
        <template #header>
          <div class="flex flex-row justify-between">
            <h1 class="font-bold text-xl">Tambah Produk</h1>
            <button><IconX class="fill-white" @click="toggleInputCard()"/></button>
          </div>
        </template>
        <div class="flex flex-col md:flex-row gap-4">
          <Input @update-value="data.product.product_code = $event" placeholder="Product Code"></Input>
          <Input @update-value="data.product.product_name = $event" placeholder="Product Name"></Input>
          <div class="flex flex-row gap-4">
            <NumberInput class="md:w-[156px]" @update-value="data.product.stock = $event" placeholder="Stock"></NumberInput>
            <Dropdown :items="data.uom.map((item) => (item as any).uom_name)" @active-item-change="data.product.uom_id = (data as any).uom[$event].id"></Dropdown>
          </div>
        </div>
        <Input @update-value="data.product.description = $event" placeholder="Product Description"></Input>
        <NumberInput @update-value="data.product.unit_price = $event" placeholder="Unit Price">Rp</NumberInput>
        <Button :disabled="data.product.product_code == '' || data.product.product_name == ''" @click="submitData()">
          <IconLoading v-if="loading"/>
          <div v-else>Submit</div>
        </Button>
      </Card>

      <Card v-if="cardState.filter">
        <template #header>
          <div class="flex flex-row justify-between">
            <h1 class="font-bold text-xl">Filter</h1>
            <button><IconX class="fill-white" @click="cardState.filter = !cardState.filter"/></button>
          </div>
        </template>
        <div class="flex flex-col md:flex-row gap-4">
          <div class="flex flex-col gap-4">
            <div class="text-sm text-c-faded">Kategori</div>
            <Group class="flex-wrap">
              <ButtonSelection :items="['ELEKTRONIK', 'GADGET', 'PROPERTI']"/>
            </Group>
          </div>
          <div class="flex flex-col gap-4">
            <div class="text-sm text-c-faded">Jumlah Stok</div>
            <RadioSelection :items="['Tidak ada', 'Hampir Habis', 'Habis']" @active-item-change="activeStockFilter = $event"/>
          </div>
        </div>
      </Card>

      <Card v-if="cardState.edit">
        <template #header>
          <div class="flex flex-row justify-between">
            <div class="flex">
              <h1 class="font-bold text-xl">Edit Produk</h1>
              <IconLoading class="w-8 h-8" v-if="data.editedProduct.product_code == ''"/>
            </div>
            <button><IconX class="fill-white" @click="toggleEditCard()"/></button>
          </div>
        </template>
        <Stack v-if="data.editedProduct.product_code != ''">
          <div class="flex flex-col md:flex-row gap-4">
            <Input :value="data.editedProduct.product_code" @update-value="data.editedProduct.product_code = $event" placeholder="Product Code"></Input>
            <Input :value="data.editedProduct.product_name" @update-value="data.editedProduct.product_name = $event" placeholder="Product Name"></Input>
            <div class="flex flex-row gap-4">
              <NumberInput class="md:w-[156px]" :value="(data.editedProduct.stock as any)" @update-value="data.editedProduct.stock = $event" placeholder="Stock"></NumberInput>
              <Dropdown :value="data.uom.findIndex((ele: any) => ele.id == data.editedProduct.uom_id)" :items="data.uom.map((item) => (item as any).uom_name)" @active-item-change="data.editedProduct.uom_id = (data as any).uom[$event].id"></Dropdown>
            </div>
          </div>
          <Input :value="data.editedProduct.description" @update-value="data.editedProduct.description = $event" placeholder="Product Description"></Input>
          <NumberInput :value="(data.editedProduct.unit_price as any)" @update-value="data.editedProduct.unit_price = $event" placeholder="Unit Price">Rp</NumberInput>
          <Button :disabled="data.editedProduct.product_code == '' || data.editedProduct.product_name == ''" @click="editProduct()">
            <IconLoading v-if="loading"/>
            <div v-else>Submit</div>
          </Button>
        </Stack>
      </Card>

      <Card v-if="cardState.delete">
        <template #header>
          <div class="flex flex-row justify-between">
            <div class="flex">
              <h1 class="font-bold text-xl">Hapus Produk</h1>
            </div>
            <button><IconX class="fill-white" @click="cardState.delete = !cardState.delete"/></button>
          </div>
        </template>
        <h1>Yakin ingin menghapus produk {{ data.deletedProduct.product_name }} ({{ data.deletedProduct.product_code }})?</h1>
        <Button @click="removeData(data.deletedProduct.id)">
          <IconLoading v-if="loading"/>
          <div v-else>Submit</div>
        </Button>
      </Card>

      <Card class="gap-8">
        <div v-if="loading"><IconLoading/></div>
        <Table v-else-if="computedData.length > 0" :paginated="true" :itemPerPage="tableViewSize" :currentPage="tablePage" :columns="data.productData.columns" :data="computedData">
          <template #item="item">
            <td class="py-4 w-36">{{ item.product_code }}</td>
            <td>
              <Stack class="gap-0">
                <div>{{ item.product_name }}</div>
                <Tooltip/>
                <div :title="item.description" class="text-xs text-c-outline">{{ item.description.length > 20 ? item.description.substring(0, 20) + "…" : item.description }}</div>
              </Stack>
            </td>
            <td class="w-36">Rp{{ item.unit_price.toLocaleString('en-US') }}</td>
            <td class="w-36">
              <Group class="gap-1 items-end">
                <div>{{ item.stock }}</div>
                <div class="text-xs">{{ item.uom_name }}</div>
              </Group>
            </td>
            <td>
              <Group class="gap-2">
                <ButtonIcon @click="deleteProduct(item)"><IconTrash class="fill-white"/></ButtonIcon>
                <ButtonIcon @click="cardState.edit ? toggleEditCard() : populateEditProduct(item)"><IconEdit class="fill-white"/></ButtonIcon>
              </Group>
            </td>
          </template>
        </Table>
        <div v-else>Data tidak ditemukan</div>
        <div class="flex flex-col md:flex-row md:justify-between items-center gap-4">
          <div class="flex flex-row gap-2">
            <button class="fill-white disabled:fill-c-outline disabled:hover:border-c-outline/75 border border-c-outline/75 hover:border-c-outline/100 hover:bg-rbs-primary/20 rounded-md text-rbs-primary py-2 px-4 font-semibold" :disabled="data.productData.currentPage == 1" @click="data.productData.currentPage = 1; fetchUOMs()">
                <IconChevronsLeft/>
            </button>
            <button class="fill-white disabled:fill-c-outline disabled:hover:border-c-outline/75 border border-c-outline/75 hover:border-c-outline/100 hover:bg-rbs-primary/20 rounded-md text-rbs-primary py-2 px-4 font-semibold" :disabled="data.productData.currentPage == 1" @click="data.productData.currentPage--; fetchUOMs()">
                <IconChevronLeft/>
            </button>
            <div class="border border-c-outline/75  rounded-md py-2 px-4">
                {{data.productData.currentPage}}
            </div>
            <button class="fill-white disabled:fill-c-outline disabled:hover:border-c-outline/75 border border-c-outline/75 hover:border-c-outline/100 hover:bg-rbs-primary/20 rounded-md text-rbs-primary py-2 px-4 font-semibold" :disabled="data.productData.currentPage == data.productData.totalPages || data.productData.data.length == 0" @click="data.productData.currentPage++; fetchUOMs()">
                <IconChevronRight/>
            </button>
            <button class="fill-white disabled:fill-c-outline disabled:hover:border-c-outline/75 border border-c-outline/75 hover:border-c-outline/100 hover:bg-rbs-primary/20 rounded-md text-rbs-primary py-2 px-4 font-semibold" :disabled="data.productData.currentPage == data.productData.totalPages || data.productData.data.length == 0"  @click="data.productData.currentPage = data.productData.totalPages; fetchUOMs()">
                <IconChevronsRight/>
            </button>
          </div>
          <div class="flex flex-row gap-2 items-center justify-center">
            <h1 class='text-rbs-grey'>Menampilkan {{ data.productData.total > (viewSizeDropdownOptions[viewSizeDropdownActive] as number) ? data.productData.data.length : data.productData.total }} dari {{ data.productData.total }} data</h1>
            <Dropdown v-on:activeItemChange="viewSizeDropdownActive = $event; fetchProducts()" :items=viewSizeDropdownOptions></Dropdown>
          </div>
        </div>
      </Card>
    </Stack>
  </main>
</template>

<script lang="ts">
</script>