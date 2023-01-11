import { ref } from "vue";
import { defineStore } from "pinia";

const user = ref({
    fullname: '',
    username: '',
    auth: false
})

export const useUserStore = defineStore("user", () => {
    function setUser(loggedInUser: any) {
        user.value = loggedInUser
    }
    return { user, setUser };
});
