import { ref, watch } from "vue";
import { defineStore } from "pinia";
import router from "../router";

interface userDataSchema {
    "id": number,
    "fullname": string,
    "username": string,
    "password": string,
    "email": string,
    "telephone": number,
    "img_photo_user": string,
    "role_id": string,
    "job_position": string,
    "email_verified_at": string,
    "status_code": number,
    "approval_at": string,
    "approval_by": string,
    "api_token": string,
    "created_at": string,
    "updated_at": string,
    "role_name": string,
    "auth": boolean
}

const user = ref({
    "id": null,
    "fullname": null,
    "username": null,
    "password": "",
    "email": null,
    "telephone": null,
    "img_photo_user": null,
    "role_id": null,
    "job_position": null,
    "email_verified_at": null,
    "status_code": null,
    "approval_at": null,
    "approval_by": null,
    "api_token": null,
    "created_at": null,
    "updated_at": null,
    "role_name": null,
    "auth": false
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
            "id": null,
            "fullname": null,
            "username": null,
            "password": "",
            "email": null,
            "telephone": null,
            "img_photo_user": null,
            "role_id": null,
            "job_position": null,
            "email_verified_at": null,
            "status_code": null,
            "approval_at": null,
            "approval_by": null,
            "api_token": null,
            "created_at": null,
            "updated_at": null,
            "role_name": null,
            "auth": false
        }
    }
    function logOut() {
        deleteUser()
        router.push('/login')
    }
    return { user, setUser, deleteUser, logOut };
});
