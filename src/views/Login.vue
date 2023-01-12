<script setup lang="ts">
import Input from '@/components/Input.vue';
import {ref} from 'vue';
import axios from 'axios';
import router from '@/router';
import Card from '@/components/Card.vue';
import Button from '@/components/Button.vue';
import {useUserStore} from '@/stores/user';
import IconLoading from '@/components/icons/IconLoading.vue';

const username = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')

let res = ref('')
function login() {
    loading.value = true
    const data = {
        username: username.value,
        password: password.value
    }
    axios.post('https://pos.zzidzz.tech/login', data).then(function (response) {
        if (response.data.message == "message.loginSuccess") {
            useUserStore().setUser(response.data.user)
            errorMessage.value = ''
            loading.value = false
            router.push('/')
        }
    }).catch(function (error) {
        res.value = error
        errorMessage.value = error.response.data.message
        loading.value = false
    });
}
</script>

<template>
    <main>
        <Card>
            <div class="flex flex-col gap-4">
            <div class="bg-red-500 rounded-lg px-8 py-4" v-if="errorMessage != ''">{{ errorMessage }}</div>
            <Input
                label="Username"
                placeholder="Username"
                type="username"
                @update-value="username = $event"
            />
            <Input
                label="Password"
                placeholder="Password"
                type="password"
                @update-value="password = $event"
            />
            </div>
            <div class="flex flex-row gap-4">
            <Button @click="login">
                <IconLoading v-if="loading"/>
                <div v-else>Login</div>
            </Button>
            </div>
        </Card>
    </main>
</template>