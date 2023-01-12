import { ref, watch } from "vue";
import { defineStore } from "pinia";
import router from "../router";

const user = ref({
    fullname: '',
    username: '',
    auth: false
})

if (localStorage.getItem('user')) {
    user.value = JSON.parse(localStorage.getItem('user') || '{}')
}

watch(
    user,
    (userVal) => {
        localStorage.setItem('user', JSON.stringify(userVal))
    },
    { deep: true }
)

export const useUserStore = defineStore("user", () => {
    function setUser(loggedInUser: any) {
        user.value = loggedInUser
    }
    function deleteUser() {
        user.value = {
            fullname: '',
            username: '',
            auth: false
        }
    }
    function logOut() {
        deleteUser()
        router.push('/login')
    }
    return { user, setUser, deleteUser, logOut };
});
