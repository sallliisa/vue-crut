<script setup lang="ts">
import Input from '@/components/Input.vue';
import {ref} from 'vue';
import axios from 'axios';
import router from '@/router';
import Card from '@/components/Card.vue';
import Button from '@/components/Button.vue';
import {useUserStore} from '@/stores/user';

const username = ref('')
const password = ref('')
let res = ref('')
function login() {
    const data = {
        username: username.value,
        password: password.value
    }
    axios.post('https://pos.zzidzz.tech/login', data).then(function (response) {
        if (response.data.message == "message.loginSuccess") {
            router.push('/')
        }
    }).catch(function (error) {
        res.value = error
    });
}
</script>

<template>
    <main>
        <Card>
            <div class="flex flex-col gap-4">
            <Input
                label="Email"
                placeholder="Enter your email"
                type="email"
                @update-value="username = $event"
            />
            <Input
                label="Password"
                placeholder="Enter your password"
                type="password"
                @update-value="password = $event"
            />
            </div>
            <div class="flex flex-row gap-4">
            <Button @click="login">Login</Button>
            </div>
        </Card>
    </main>
</template>