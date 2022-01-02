<template>
    <div class="content">
        <div class="md-layout">
            <div class="md-layout-item md-medium-size-100 md-size-66">
                <template>
                    <form>
                        <md-card>
                            <md-card-header
                                :data-background-color="
                                    userId == '0' ? 'green' : 'orange'
                                "
                            >
                                <h4 class="title">
                                    {{
                                        userId == '0'
                                            ? 'สร้าง User'
                                            : 'แก้ไขข้อมูล User'
                                    }}
                                </h4>
                                <!-- <p class="category">Complete your profile</p> -->
                            </md-card-header>

                            <md-card-content>
                                <div class="md-layout md-gutter">
                                    <div
                                        class="md-layout-item md-small-size-100 md-size-50"
                                    >
                                        <md-field>
                                            <label>ยูสเซอร์เนม</label>
                                            <md-input
                                                v-model="username"
                                                type="text"
                                            ></md-input>
                                        </md-field>
                                    </div>

                                    <div
                                        class="md-layout-item md-small-size-100 md-size-50"
                                    >
                                        <md-field>
                                            <label>ชื่อเจ้าของบัญชี</label>
                                            <md-input
                                                v-model="display"
                                                type="text"
                                            ></md-input>
                                        </md-field>
                                    </div>

                                    <div
                                        class="md-layout-item md-small-size-100 md-size-50"
                                    >
                                        <md-field>
                                            <label>รหัสผ่าน</label>
                                            <md-input
                                                v-model="password"
                                                type="password"
                                            ></md-input>
                                        </md-field>
                                    </div>

                                    <div
                                        class="md-layout-item md-small-size-100 md-size-50"
                                    >
                                        <md-field>
                                            <label for="roles">สิทธิ์</label>
                                            <md-select
                                                v-model="role"
                                                name="roles"
                                                id="roles"
                                            >
                                                <md-option value="SUPERADMIN"
                                                    >SUPERADMIN</md-option
                                                >
                                                <md-option value="ADMIN"
                                                    >ADMIN</md-option
                                                >
                                            </md-select>
                                        </md-field>
                                    </div>

                                    <div
                                        class="md-layout-item md-size-100 text-right"
                                    >
                                        <md-button
                                            @click="updateProfile()"
                                            :class="
                                                userId == '0'
                                                    ? 'md-raised md-success'
                                                    : 'md-raised md-warning'
                                            "
                                            >{{
                                                userId == '0'
                                                    ? 'สร้าง User'
                                                    : 'อัพเดตโปรไฟล์'
                                            }}</md-button
                                        >
                                    </div>
                                </div>
                            </md-card-content>
                        </md-card>
                    </form>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import api from '@/services/api.js'
export default {
    components: {},
    data() {
        return {
            userId: this.$route.params.id,
            username: null,
            display: null,
            password: null,
            confirmPassword: null,
            role: null,
            apiRoute: `users/get-user-by-id/`,
            result: {},
            createRoute: 'auth/signup',
            editRoute: 'users/update-user-by-id',
        }
    },
    methods: {
        updateProfile() {
            const user = {
                id: this.userId,
                username: this.username,
                display: this.display,
                password: this.password,
                role: this.role,
            }
            var confirmText =
                this.userId == '0'
                    ? 'ยืนยันสร้างบัญชีใหม่'
                    : 'ยืนยันแก้ไขโปรไฟล์'

            this.$swal({
                title: confirmText,
                text: this.psn,
                showDenyButton: true,
                confirmButtonText: `ยืนยัน`,
                denyButtonText: `แก้ไข`,
                allowOutsideClick: false,
            }).then(result => {
                if (result.isConfirmed) {
                    var resultText =
                        this.userId == '0'
                            ? 'สร้างบัญชีผู้ใช้ใหม่เรียบร้อย'
                            : 'อัพเดตโปรไฟล์เรียบร้อย'
                    let resSubmit = api
                        .post(
                            this.userId == '0'
                                ? this.createRoute
                                : this.editRoute,
                            user
                        )
                        .then(result => {
                            this.$swal({
                                title: resultText,
                                icon: 'success',
                                confirmButtonText: 'ตกลง',
                                allowOutsideClick: false,
                            }).then(result => {
                                /* Read more about isConfirmed, isDenied below */
                                if (result.isConfirmed) {
                                    this.$router.push({ name: 'Users' })
                                }
                            })
                        })
                        .catch(err => {
                            if (err.response.status === 400);
                            this.$swal(err.response.data, '', 'error')
                        })
                }
            })
        },
    },

    async mounted() {
        let res = await api.get(this.apiRoute + this.userId)
        this.result = res.data
        this.username = this.result.username
        this.role = this.result.role
        this.display = this.result.display
    },
}
</script>
<style lang="scss" scoped></style>
