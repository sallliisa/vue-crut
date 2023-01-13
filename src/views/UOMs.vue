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
import Alert from "@/components/Alert.vue"
import IconChevronRight from "@/components/icons/IconChevronRight.vue";
import IconChevronLeft from "@/components/icons/IconChevronLeft.vue";
import IconChevronsRight from "@/components/icons/IconChevronsRight.vue";
import IconChevronsLeft from "@/components/icons/IconChevronsLeft.vue";

const query = ref('')
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
  uomData: {
    columns: ['ID', 'UOM CODE', 'UOM NAME', 'ACTIONS'],
    data: [],
    totalLength: 0,
    totalPages: 0,
    currentPage: 1,
    viewSize: 10,
  },
  UOM: {
    uom_code: '',
    uom_name: '',
  },
  editedUOM: {
    id: 0,
    uom_code: '',
    uom_name: '',
  },
  deletedUOM: {
    id: 0,
    uom_code: '',
    uom_name: '',
  }
})

function searchData(data: Array<Object>, key: string, field: string) {
  return data.filter((data: any) => data[field].toLowerCase().includes(key.toLowerCase()));
}

// function filterData(data: Array<Object>) {
//   if (activeStockFilter.value === 0) return data
//   else if (activeStockFilter.value === 1) return data.filter((data: any) => data.stock < 5)
//   else return data.filter((data: any) => data.stock === 0)
// }

const computedData: any = computed(() => {
    return searchData(data.uomData.data, query.value, 'uom_name')
})

function toggleEditCard() {
  if (cardState.edit) {
    cardState.edit = false
    data.editedUOM = {
        id: 0,
        uom_code: '',
        uom_name: '',
    }
  }
  else cardState.edit = true
}

function toggleInputCard() {
  if (cardState.input) {
    cardState.input = false
    data.UOM = {
      uom_code: '',
      uom_name: '',
    }
  } else cardState.input = true
}

const fetchUOMs = () => {
  console.log('fetching')
  loading.value = true
  axios.get(`/uoms?page=${data.uomData.currentPage}&limit=${viewSizeDropdownOptions[viewSizeDropdownActive.value]}&search=${query.value}`).then(function (response) {
    errorMessage.value = ''
    data.uomData.data = response.data.data.map(({id, uom_code, uom_name}: any) => ({id, uom_code, uom_name}))
    data.uomData.totalLength = response.data.total
    data.uomData.totalPages = response.data.totalPage
    loading.value = false
  }).catch(function (error) {
    loading.value = false
    errorMessage.value = error.response.data.message
  });
}

const submitData = () => {
  loading.value = true
  const payload = {
    uom_code: data.UOM.uom_code,
    uom_name: data.UOM.uom_name,
  }
  axios.post('/uoms/create', payload).then(function (response) {
    errorMessage.value = ''
    fetchUOMs()
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
  axios.delete('/uoms/delete', {data: payload}).then(function (response) {
    errorMessage.value = ''
    fetchUOMs()
    loading.value = false
    cardState.delete = false
  }).catch(function (error) {
    loading.value = false
    errorMessage.value = error.response.data.message
  });
}

const populateEditUOM = async (item: any) => {
  data.editedUOM = item
  cardState.edit = !cardState.edit
}

const editProduct = () => {
  loading.value = true
  axios.put('/uoms/update', data.editedUOM).then(function (response) {
    errorMessage.value = ''
    fetchUOMs()
    toggleEditCard()
    loading.value = false
  }).catch(function (error) {
    loading.value = false
    errorMessage.value = error.response.data.message
  });
}

const deleteUOM = (item: any) => {
  data.deletedUOM = item
  cardState.delete = !cardState.delete
}

fetchUOMs()

</script>

<template>
  <main>
    <Stack>
      <Alert :sentiment="false" v-if="errorMessage != ''">{{ errorMessage }}</Alert>
      <Card class="gap-4">
        <Group v-if="useScreenStore().isAtLeast('md')" class="justify-between">
          <Group>
            <Input placeholder="Cari" @update-value="query = $event; fetchUOMs()"><IconSearch class="fill-white"/></Input>
          </Group>
          <Group>
            <ButtonIcon :active="cardState.input" @click="cardState.input = !cardState.input"><IconPlus class="fill-white"/></ButtonIcon>
          </Group>
        </Group>
        <Stack v-else>
          <Group>
            <Input placeholder="Cari" @update-value="query = $event; fetchUOMs()"><IconSearch class="fill-white"/></Input>
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
            <h1 class="font-bold text-xl">Tambah UOM</h1>
            <button><IconX class="fill-white" @click="toggleInputCard()"/></button>
          </div>
        </template>
        <div class="flex flex-col md:flex-row gap-4">
          <Input @update-value="data.UOM.uom_code = $event" placeholder="UOM Code"></Input>
          <Input @update-value="data.UOM.uom_name = $event" placeholder="UOM Name"></Input>
        </div>
        <Button :disabled="data.UOM.uom_code == '' || data.UOM.uom_name == ''" @click="submitData()">
          <IconLoading v-if="loading"/>
          <div v-else>Submit</div>
        </Button>
      </Card>

      <Card v-if="cardState.edit">
        <template #header>
          <div class="flex flex-row justify-between">
            <div class="flex">
              <h1 class="font-bold text-xl">Edit UOM</h1>
              <IconLoading class="w-8 h-8" v-if="data.editedUOM.uom_code == ''"/>
            </div>
            <button><IconX class="fill-white" @click="toggleEditCard()"/></button>
          </div>
        </template>
        <Stack v-if="data.editedUOM.uom_code != ''">
          <div class="flex flex-col md:flex-row gap-4">
            <Input :value="data.editedUOM.uom_code" @update-value="data.editedUOM.uom_code = $event" placeholder="UOM Code"></Input>
            <Input :value="data.editedUOM.uom_name" @update-value="data.editedUOM.uom_name = $event" placeholder="UOM Name"></Input>
          </div>
          <Button :disabled="data.editedUOM.uom_code == '' || data.editedUOM.uom_name == ''" @click="editProduct()">
            <IconLoading v-if="loading"/>
            <div v-else>Submit</div>
          </Button>
        </Stack>
      </Card>

      <Card v-if="cardState.delete">
        <template #header>
          <div class="flex flex-row justify-between">
            <div class="flex">
              <h1 class="font-bold text-xl">Hapus UOM</h1>
            </div>
            <button><IconX class="fill-white" @click="cardState.delete = !cardState.delete"/></button>
          </div>
        </template>
        <h1>Yakin ingin menghapus UOM {{ data.deletedUOM.uom_name }} ({{ data.deletedUOM.uom_code }})?</h1>
        <Button @click="removeData(data.deletedUOM.id)">
          <IconLoading v-if="loading"/>
          <div v-else>Submit</div>
        </Button>
      </Card>

      <Card class="gap-8">
        <div v-if="loading"><IconLoading/></div>
        <Table v-else-if="computedData.length > 0" :columns="data.uomData.columns" :data="computedData">
          <template #item="item">
            <td class="py-4">{{ item.id }}</td>
            <td>{{ item.uom_code }}</td>
            <td>{{ item.uom_name }}</td>
            <td>
              <Group class="gap-2">
                <ButtonIcon @click="deleteUOM(item)"><IconTrash class="fill-white"/></ButtonIcon>
                <ButtonIcon @click="cardState.edit ? toggleEditCard() : populateEditUOM(item)"><IconEdit class="fill-white"/></ButtonIcon>
              </Group>
            </td>
          </template>
        </Table>
        <div v-else>Data tidak ditemukan</div>
        <div class="flex flex-col md:flex-row md:justify-between items-center gap-4">
          <div class="flex flex-row gap-2">
            <button class="fill-white disabled:fill-c-outline disabled:hover:border-c-outline/75 border border-c-outline/75 hover:border-c-outline/100 hover:bg-rbs-primary/20 rounded-md text-rbs-primary py-2 px-4 font-semibold" :disabled="data.uomData.currentPage == 1" @click="data.uomData.currentPage = 1; fetchUOMs()">
                <IconChevronsLeft/>
            </button>
            <button class="fill-white disabled:fill-c-outline disabled:hover:border-c-outline/75 border border-c-outline/75 hover:border-c-outline/100 hover:bg-rbs-primary/20 rounded-md text-rbs-primary py-2 px-4 font-semibold" :disabled="data.uomData.currentPage == 1" @click="data.uomData.currentPage--; fetchUOMs()">
                <IconChevronLeft/>
            </button>
            <div class="border border-c-outline/75  rounded-md py-2 px-4">
                {{data.uomData.currentPage}}
            </div>
            <button class="fill-white disabled:fill-c-outline disabled:hover:border-c-outline/75 border border-c-outline/75 hover:border-c-outline/100 hover:bg-rbs-primary/20 rounded-md text-rbs-primary py-2 px-4 font-semibold" :disabled="data.uomData.currentPage == data.uomData.totalPages || data.uomData.data.length == 0" @click="data.uomData.currentPage++; fetchUOMs()">
                <IconChevronRight/>
            </button>
            <button class="fill-white disabled:fill-c-outline disabled:hover:border-c-outline/75 border border-c-outline/75 hover:border-c-outline/100 hover:bg-rbs-primary/20 rounded-md text-rbs-primary py-2 px-4 font-semibold" :disabled="data.uomData.currentPage == data.uomData.totalPages || data.uomData.data.length == 0"  @click="data.uomData.currentPage = data.uomData.totalPages; fetchUOMs()">
                <IconChevronsRight/>
            </button>
          </div>
          <div class="flex flex-row gap-2 items-center justify-center">
            <h1 class='text-rbs-grey'>Menampilkan {{ data.uomData.totalLength > (viewSizeDropdownOptions[viewSizeDropdownActive] as number) ? data.uomData.data.length : data.uomData.totalLength }} dari {{ data.uomData.totalLength }} data</h1>
            <Dropdown v-on:activeItemChange="viewSizeDropdownActive = $event; fetchUOMs()" :items=viewSizeDropdownOptions></Dropdown>
          </div>
        </div>
      </Card>
    </Stack>
  </main>
</template>