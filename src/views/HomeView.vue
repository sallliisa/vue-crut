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
import {ref} from "vue";
import Dropdown from "@/components/Dropdown.vue";
import IconRadio from "@/components/icons/IconRadio.vue";
import RadioSelection from "@/components/RadioSelection.vue";

const query = ref('')
const activeradio = ref(0)
const activedropdown = ref(0)
const data = {columns: ['GAMER', 'GAMING', 'NAME'], data: [{gamer: 'gamer', gaming: 'gaming', name: 'mr gamer'}, {gamer: 'mister gamer', gaming: 'yes', name: 'tuan gamer'}]}
const showFilter = ref(false)

function searchData(data: Array<Object>, key: string, field: string) {
    return data.filter((data: any) => data[field].toLowerCase().includes(key.toLowerCase()));
}

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
            <ButtonIcon><IconPlus class="fill-white"/></ButtonIcon>
          </Group>
        </Group>
      </Card>
      <Card v-if="showFilter" class="justify-start">
        <Group class="gap-12">
          <Stack>
            <div class="text-sm text-c-faded">Kategori</div>
            <Dropdown :items="['SEMUA', 'gamer', 'mr gamer']" @active-item-change="activedropdown = $event"></Dropdown>
          </Stack>
          <Stack>
            <div class="text-sm text-c-faded">Kategori</div>
            <Group class="gap-8">
              <RadioSelection :items="['SEMUA', 'gamer', 'mr gamer']" @active-item-change="activeradio = $event"/>
            </Group>
          </Stack>
        </Group>
      </Card>
      <Card>
        <Table :columns="data.columns" :data="searchData(data.data, query, 'gamer')">
          <template #item="item">
            <td class="py-1">{{ item.gamer }}</td>
            <td>{{ item.gaming }}</td>
            <td>{{ item.name }}</td>
          </template>
        </Table>
      </Card>
    </Stack>
  </main>
</template>