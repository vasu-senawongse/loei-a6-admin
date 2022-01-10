<template>
    <div class="content">
        <div class="md-layout">
            <div class="md-layout-item md-medium-size-100 md-size-66">
                <template>
                    <form @submit.prevent="create()">
                        <md-card>
                            <md-card-header data-background-color="blue">
                                <h4 class="title">
                                    ผลิตภัณฑ์และสินค้า
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
                                <label for="name"
                                    >ชื่อผลิตภัณฑ์หรือสินค้า</label
                                >
                                <b-input
                                    v-model="name"
                                    placeholder="ชื่อผลิตภัณฑ์หรือสินค้า"
                                    class="mb-3"
                                />

                                <label for="description">คำอธิบาย</label>
                                <b-form-textarea
                                    v-model="description"
                                    placeholder="คำอธิบาย"
                                    class="mb-3"
                                    rows="3"
                                    max-rows="6"
                                ></b-form-textarea>

                                <label for="name">ชื่อร้านค้า</label>
                                <b-input
                                    v-model="shop"
                                    placeholder="ชื่อร้านค้า"
                                    class="mb-3"
                                />

                                <label for="phone">เบอร์ติดต่อ</label>
                                <b-input
                                    v-model="phone"
                                    placeholder="เบอร์ติดต่อ"
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
import api from '@/services/api.js'
export default {
    components: {},
    data() {
        return {
            name: '',
            img: '',
            shop: '',
            phone: '',
            description: '',
            thumbnail: null,
            id: 0,
            apiRoute: `products/create-product`,
            result: {},
            uploadRoute: '/upload',
            path: 'public/images/products',
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
                    this.img = `products/${this.thumbnail.name}`
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
                img: this.img,
                name: this.name,
                phone: this.phone,
                description: this.description,
                shop: this.shop,
            }
            this.$swal({
                title: 'เพิ่มผลิตภัณฑ์',
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
                                title: 'เพิ่มผลิตภัณฑ์แล้ว',
                                icon: 'success',
                                confirmButtonText: 'ตกลง',
                                allowOutsideClick: false,
                            }).then(result => {
                                /* Read more about isConfirmed, isDenied below */
                                if (result.isConfirmed) {
                                    this.$router.push({ name: 'Product' })
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
