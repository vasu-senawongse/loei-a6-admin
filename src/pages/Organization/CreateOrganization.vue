<template>
    <div class="content">
        <div class="md-layout">
            <div class="md-layout-item md-medium-size-100 md-size-66">
                <template>
                    <form @submit.prevent="create()">
                        <md-card>
                            <md-card-header data-background-color="blue">
                                <h4 class="title">
                                    เพิ่มหน่วยงานที่เกี่ยวข้อง
                                </h4>
                                <!-- <p class="category">Complete your profile</p> -->
                            </md-card-header>

                            <md-card-content>
                                <b-form-file
                                    browse-text="เลือกรูป"
                                    placeholder="เลือกไฟล์ หรือ ลากไฟล์มาวาง"
                                    v-model="thumbnail"
                                    accept="image/*"
                                    class="mb-3"
                                ></b-form-file>
                                <label for="name">ชื่อหน่วยงาน</label>
                                <b-input
                                    v-model="org"
                                    placeholder="ชื่อหน่วยงาน"
                                    class="mb-3"
                                />

                                <md-field>
                                    <label for="type">ประเภทหน่วยงาน</label>
                                    <md-select
                                        v-model="type"
                                        class="mb-3"
                                        name="type"
                                        id="type"
                                    >
                                        <div
                                            v-for="m in types"
                                            v-bind:key="m.value"
                                        >
                                            <md-option :value="m.value">{{
                                                m.text
                                            }}</md-option>
                                        </div>
                                    </md-select>
                                </md-field>

                                <label for="name">ลิงก์</label>
                                <b-input
                                    v-model="url"
                                    placeholder="ลิงก์"
                                    class="mb-3"
                                />

                                <b-button variant="info" type="submit">
                                    บันทึก
                                </b-button>
                            </md-card-content>
                        </md-card>
                    </form>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import api from '@/services/api.js'
export default {
    components: {},
    data() {
        return {
            org: '',
            img: '',
            type: '',
            url: '',
            thumbnail: null,
            id: 0,
            apiRoute: `organizations/create-organization`,
            result: {},
            uploadRoute: '/upload',
            path: 'public/images/organizations',
            types: [],
        }
    },
    methods: {
        async upload() {
            let formData = new FormData()
            formData.append('path', `${this.path}`)
            formData.append('name', this.thumbnail.name)
            formData.append('file', this.thumbnail)
            let res = await api
                .post(this.uploadRoute, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then(resss => {
                    this.img = `organizations/${this.thumbnail.name}`
                })
                .catch(err => {
                    if (err.resss.status === 400);
                    this.$swal(err.resss.data, '', 'error')
                })
        },
        async create() {
            if (this.thumbnail) {
                await this.upload()
            }
            var model = {
                id: this.id,
                img: this.img,
                name: this.name,
                district: this.district,
                subDistrict: this.subDistrict,
                category: this.category.join(),
                lat: this.lat,
                lon: this.lon,
                createdAt: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                updatedAt: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
            }
            this.$swal({
                title: 'เพิ่มหน่วยงานที่เกี่ยวข้อง',
                text: this.name,
                showDenyButton: true,
                confirmButtonText: `ยืนยัน`,
                denyButtonText: `ยกเลิก`,
                allowOutsideClick: false,
            }).then(result => {
                if (result.isConfirmed) {
                    let resSubmit = api
                        .post(this.apiRoute, model)
                        .then(result => {
                            this.$swal({
                                title: 'เพิ่มหน่วยงานที่เกี่ยวข้องแล้ว',
                                icon: 'success',
                                confirmButtonText: 'ตกลง',
                                allowOutsideClick: false,
                            }).then(result => {
                                /* Read more about isConfirmed, isDenied below */
                                if (result.isConfirmed) {
                                    this.$router.push({
                                        path: `/attractions/${this.id}`,
                                    })
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
        let res = await api.get(this.idRoute)
        this.id = res.data
    },
}
</script>
<style lang="scss" scoped>
.fit-image {
    width: 100%;
    object-fit: cover;
    height: auto; /* only if you want fixed height */
}
.md-menu-content {
    max-width: 500px !important;
}
</style>
