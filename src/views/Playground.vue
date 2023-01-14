<script setup lang="ts">
import Card from '@/components/Card.vue';
import {ref} from 'vue'
import Button from '@/components/Button.vue';
import Input from '@/components/Input.vue';
import Dropdown from '@/components/Dropdown.vue';
import RadioSelection from '@/components/RadioSelection.vue';

type questionCard = {
    questionType: 'Pilihan ganda',
    question: string,
    options: string[],
    correctAnswer: number,
} | {
    questionType: 'Essay',
    question: string,
    answer: string
}

const template = {
    pilihanGanda: {
        questionType: 'Pilihan ganda',
        question: '',
        options: ['', '', '', ''],
        correctAnswer: 0
    } as questionCard,
    essay: {
        questionType: 'Essay',
        question: '',
        answer: ''
    } as questionCard
}

const history = ref<questionCard[]>([])
const questionCards = ref<questionCard[]>([])
</script>

<template>
    <div>questionCards: {{ questionCards }}</div>
    <div>history: {{ history }}</div>
    <Button @click="questionCards.push({
        questionType: 'Pilihan ganda',
        question: '',
        options: ['', '', '', ''],
        correctAnswer: 0
    }); history.push({
        questionType: 'Essay',
        question: '',
        answer: ''
    })">Add card</Button>
    <Card v-for="(card, index) in questionCards">
        <div>{{ card }}</div>
        <div @click="questionCards.splice(index, 1)">close</div>
        <div class="flex flex-row gap-4 w-full">
            <Input :value="card.question" placeholder="Judul pertanyaan" @update-value="card.question = $event"></Input>
            <Dropdown @active-item-change="($event != card.questionType ? [questionCards[index] = history[index], history[index] = card] : null)" class="min-w-[156px]" :items="['Pilihan ganda', 'Essay']"></Dropdown>
        </div>
        <div v-if="card.questionType == 'Pilihan ganda'" class="flex flex-col gap-2">
            <div v-for="(option, index) in card.options" class="items-center grid grid-cols-8">
                <div class="whitespace-nowrap col-span-1">Pilihan {{ ['A', 'B', 'C', 'D'][index] }}</div>
                <Input class="col-span-7" :value="option" @update-value="card.options[index] = $event"></Input>
            </div>
            <div class="flex flex-row items-center gap-4 ">
                <div>Jawaban benar:</div>
                <Dropdown @active-item-change="card.correctAnswer = $event" :items="['A', 'B', 'C', 'D']" v-if="card.questionType == 'Pilihan ganda'" placeholder="Jawaban benar"></Dropdown>
            </div>
        </div>
        <div v-else>
            <textarea @input="(e) => card.answer = (e.target as HTMLInputElement).value"></textarea>
        </div>
    </Card>
</template>