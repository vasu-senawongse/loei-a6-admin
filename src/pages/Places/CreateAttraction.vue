<template>
    <div class="content">
        <div class="md-layout">
            <div class="md-layout-item md-medium-size-100 md-size-66">
                <template>
                    <form @submit.prevent="create()">
                        <md-card>
                            <md-card-header data-background-color="blue">
                                <h4 class="title">
                                    เพิ่มข้อมูลแหล่งท่องเที่ยว
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
                                <label for="name">ชื่อแหล่งท่องเที่ยว</label>
                                <b-input
                                    v-model="name"
                                    placeholder="ชื่อแหล่งท่องเที่ยว"
                                    class="mb-3"
                                />

                                <label for="district">อำเภอ</label>
                                <b-select
                                    alternative
                                    v-model="district"
                                    :options="options"
                                    @change="subDistrict = ''"
                                    class="mb-3"
                                />

                                <label for="subDistrict">ตำบล</label>
                                <b-select
                                    alternative
                                    v-model="subDistrict"
                                    :options="
                                        subOptions.filter(
                                            i =>
                                                i.district == district ||
                                                i.district == ''
                                        )
                                    "
                                    class="mb-3"
                                />

                                <md-field>
                                    <label for="category"
                                        >ประเภทแหล่งท่องเที่ยว</label
                                    >
                                    <md-select
                                        v-model="category"
                                        class="mb-3"
                                        multiple
                                        name="category"
                                        id="category"
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

                                <label for="Latitude">ละติจูด</label>
                                <b-input
                                    v-model="lat"
                                    placeholder="Latitude"
                                    class="mb-3"
                                />
                                <label for="Lontitude">ลองจิจูด</label>
                                <b-input
                                    v-model="lon"
                                    placeholder="Lontitude"
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
            name: '',
            district: '',
            subDistrict: '',
            category: [],
            lat: '',
            img: '',
            lon: '',
            thumbnail: null,
            id: 0,
            apiRoute: `attractions/create-attraction`,
            idRoute: `attractions/get-attraction-next-id`,
            result: {},
            options: [
                { text: '-- อำเภอ --', value: '', disabled: true },
                'เชียงคาน',
                'เมืองเลย',
                'เอราวัณ',
                'ด่านซ้าย',
                'ท่าลี่',
                'นาแห้ว',
                'นาด้วง',
                'ปากชม',
                'ผาขาว',
                'ภูเรือ',
                'ภูกระดึง',
                'ภูหลวง',
                'วังสะพุง',
                'หนองหิน',
            ],

            subOptions: [
                { text: '-- ตำบล --', value: '', disabled: true, district: '' },
                { text: 'เชียงคาน', value: 'เชียงคาน', district: 'เชียงคาน' },
                { text: 'ธาตุ', value: 'ธาตุ', district: 'เชียงคาน' },
                { text: 'นาซ่าว', value: 'นาซ่าว', district: 'เชียงคาน' },
                { text: 'เขาแก้ว', value: 'เขาแก้ว', district: 'เชียงคาน' },
                { text: 'ปากตม', value: 'ปากตม', district: 'เชียงคาน' },
                { text: 'บุฮม', value: 'บุฮม', district: 'เชียงคาน' },
                { text: 'จอมศรี', value: 'จอมศรี', district: 'เชียงคาน' },
                {
                    text: 'หาดทรายขาว',
                    value: 'หาดทรายขาว',
                    district: 'เชียงคาน',
                },
                { text: 'กุดป่อง', value: 'กุดป่อง', district: 'เมืองเลย' },
                { text: 'เมือง', value: 'เมือง', district: 'เมืองเลย' },
                { text: 'นาอ้อ', value: 'นาอ้อ', district: 'เมืองเลย' },
                { text: 'กกดู่', value: 'กกดู่', district: 'เมืองเลย' },
                { text: 'น้ำหมาน', value: 'น้ำหมาน', district: 'เมืองเลย' },
                { text: 'เสี้ยว', value: 'เสี้ยว', district: 'เมืองเลย' },
                { text: 'นาอาน', value: 'นาอาน', district: 'เมืองเลย' },
                { text: 'นาโป่ง', value: 'นาโป่ง', district: 'เมืองเลย' },
                { text: 'นาดินดำ', value: 'นาดินดำ', district: 'เมืองเลย' },
                { text: 'น้ำสวย', value: 'น้ำสวย', district: 'เมืองเลย' },
                { text: 'ชัยพฤกษ์', value: 'ชัยพฤกษ์', district: 'เมืองเลย' },
                { text: 'นาแขม', value: 'นาแขม', district: 'เมืองเลย' },
                { text: 'ศรีสองรัก', value: 'ศรีสองรัก', district: 'เมืองเลย' },
                { text: 'กกทอง', value: 'กกทอง', district: 'เมืองเลย' },
                {
                    text: 'ผาอินทร์แปลง',
                    value: 'ผาอินทร์แปลง',
                    district: 'เอราวัณ',
                },
                { text: 'เอราวัณ', value: 'เอราวัณ', district: 'เอราวัณ' },
                { text: 'ผาสามยอด', value: 'ผาสามยอด', district: 'เอราวัณ' },
                {
                    text: 'ทรัพย์ไพวัลย์',
                    value: 'ทรัพย์ไพวัลย์',
                    district: 'เอราวัณ',
                },
                { text: 'ด่านซ้าย', value: 'ด่านซ้าย', district: 'ด่านซ้าย' },
                { text: 'ปากหมัน', value: 'ปากหมัน', district: 'ด่านซ้าย' },
                { text: 'นาดี', value: 'นาดี', district: 'ด่านซ้าย' },
                { text: 'โคกงาม', value: 'โคกงาม', district: 'ด่านซ้าย' },
                { text: 'โพนสูง', value: 'โพนสูง', district: 'ด่านซ้าย' },
                { text: 'อิปุ่ม', value: 'อิปุ่ม', district: 'ด่านซ้าย' },
                { text: 'กกสะทอน', value: 'กกสะทอน', district: 'ด่านซ้าย' },
                { text: 'โป่ง', value: 'โป่ง', district: 'ด่านซ้าย' },
                { text: 'วังยาว', value: 'วังยาว', district: 'ด่านซ้าย' },
                { text: 'นาหอ', value: 'นาหอ', district: 'ด่านซ้าย' },
                { text: 'ท่าลี่', value: 'ท่าลี่', district: 'ท่าลี่' },
                { text: 'หนองผือ', value: 'หนองผือ', district: 'ท่าลี่' },
                { text: 'อาฮี', value: 'อาฮี', district: 'ท่าลี่' },
                { text: 'น้ำแคม', value: 'น้ำแคม', district: 'ท่าลี่' },
                { text: 'โคกใหญ่', value: 'โคกใหญ่', district: 'ท่าลี่' },
                { text: 'น้ำทูน', value: 'น้ำทูน', district: 'ท่าลี่' },
                { text: 'นาแห้ว', value: 'นาแห้ว', district: 'นาแห้ว' },
                { text: 'แสงภา', value: 'แสงภา', district: 'นาแห้ว' },
                { text: 'นาพึง', value: 'นาพึง', district: 'นาแห้ว' },
                { text: 'นามาลา', value: 'นามาลา', district: 'นาแห้ว' },
                { text: 'เหล่ากอหก', value: 'เหล่ากอหก', district: 'นาแห้ว' },
                { text: 'นาด้วง', value: 'นาด้วง', district: 'นาด้วง' },
                { text: 'นาดอกคำ', value: 'นาดอกคำ', district: 'นาด้วง' },
                { text: 'ท่าสะอาด', value: 'ท่าสะอาด', district: 'นาด้วง' },
                { text: 'ท่าสวรรค์', value: 'ท่าสวรรค์', district: 'นาด้วง' },
                { text: 'ปากชม', value: 'ปากชม', district: 'ปากชม' },
                { text: 'เชียงกลม', value: 'เชียงกลม', district: 'ปากชม' },
                { text: 'หาดคัมภีร์', value: 'หาดคัมภีร์', district: 'ปากชม' },
                { text: 'ห้วยบ่อซืน', value: 'ห้วยบ่อซืน', district: 'ปากชม' },
                { text: 'ห้วยพิชัย', value: 'ห้วยพิชัย', district: 'ปากชม' },
                { text: 'ชมเจริญ', value: 'ชมเจริญ', district: 'ปากชม' },
                { text: 'ผาขาว', value: 'ผาขาว', district: 'ผาขาว' },
                {
                    text: 'ท่าช้างคล้อง',
                    value: ' ท่าช้างคล้อง',
                    district: 'ผาขาว',
                },
                { text: 'โนนปอแดง', value: 'โนนปอแดง', district: 'ผาขาว' },
                { text: 'โนนป่าซาง', value: 'โนนป่าซาง', district: 'ผาขาว' },
                { text: 'บ้านเพิ่ม', value: 'บ้านเพิ่ม', district: 'ผาขาว' },
                { text: 'หนองบัว', value: 'หนองบัว', district: 'ภูเรือ' },
                { text: 'ท่าศาลา', value: 'ท่าศาลา', district: 'ภูเรือ' },
                { text: 'ร่องจิก', value: 'ร่องจิก', district: 'ภูเรือ' },
                { text: 'ปลาบ่า', value: 'ปลาบ่า', district: 'ภูเรือ' },
                { text: 'ลาดค่าง', value: 'ลาดค่าง', district: 'ภูเรือ' },
                { text: 'สานตม', value: 'สานตม', district: 'ภูเรือ' },
                { text: 'ศรีฐาน', value: 'ศรีฐาน', district: 'ภูกระดึง' },
                { text: 'ผานกเค้า', value: 'ผานกเค้า', district: 'ภูกระดึง' },
                { text: 'ภูกระดึง', value: 'ภูกระดึง', district: 'ภูกระดึง' },
                { text: 'ห้วยส้ม', value: 'ห้วยส้ม', district: 'ภูกระดึง' },
                { text: 'ภูหอ', value: 'ภูหอ', district: 'ภูหลวง' },
                { text: 'หนองคัน', value: 'หนองคัน', district: 'ภูหลวง' },
                {
                    text: 'ห้วยสีเสียด',
                    value: 'ห้วยสีเสียด',
                    district: 'ภูหลวง',
                },
                { text: 'เลยวังไสย์', value: 'เลยวังไสย์', district: 'ภูหลวง' },
                {
                    text: 'แก่งศรีภูมิ',
                    value: 'แก่งศรีภูมิ',
                    district: 'ภูหลวง',
                },
                { text: 'วังสะพุง', value: 'วังสะพุง', district: 'วังสะพุง' },
                { text: 'ผาน้อย', value: 'ผาน้อย', district: 'วังสะพุง' },
                { text: 'ทรายขาว', value: 'ทรายขาว', district: 'วังสะพุง' },
                { text: 'ผาบิ้ง', value: 'ผาบิ้ง', district: 'วังสะพุง' },
                {
                    text: 'หนองหญ้าปล้อง',
                    value: 'หนองหญ้าปล้อง',
                    district: 'วังสะพุง',
                },
                { text: 'เขาหลวง', value: 'เขาหลวง', district: 'วังสะพุง' },
                { text: 'หนองงิ้ว', value: 'หนองงิ้ว', district: 'วังสะพุง' },
                { text: 'โคกขมิ้น', value: 'โคกขมิ้น', district: 'วังสะพุง' },
                { text: 'ปากปวน', value: 'ปากปวน', district: 'วังสะพุง' },
                { text: 'ศรีสงคราม', value: 'ศรีสงคราม', district: 'วังสะพุง' },
                { text: 'หนองหิน', value: 'หนองหิน', district: 'หนองหิน' },
                { text: 'ตาดข่า', value: 'ตาดข่า', district: 'หนองหิน' },
                { text: 'ปวนพุ', value: 'ปวนพุ', district: 'หนองหิน' },
            ],

            months: [
                {
                    value: '1',
                    text: 'มกราคม',
                },
                {
                    value: '2',
                    text: 'กุมภาพันธ์',
                },
                {
                    value: '3',
                    text: 'มีนาคม',
                },
                {
                    value: '4',
                    text: 'เมษายน',
                },
                {
                    value: '5',
                    text: 'พฤษภาคม',
                },
                {
                    value: '6',
                    text: 'มิถุนายน',
                },
                {
                    value: '7',
                    text: 'กรกฎาคม',
                },
                {
                    value: '8',
                    text: 'สิงหาคม',
                },
                {
                    value: '9',
                    text: 'กันยายน',
                },
                {
                    value: '10',
                    text: 'ตุลาคม',
                },

                {
                    value: '11',
                    text: 'พฤศจิกายน',
                },
                {
                    value: '12',
                    text: 'ธันวาคม',
                },
            ],

            uploadRoute: '/upload',
            path: 'public/images/attractions',
            actRoute: `activities/get-activities`,
            types: [],
            actList: [],
            amenList: [],
            amenRoute: `amenities/get-amenities`,
        }
    },
    methods: {
        async upload() {
            let formData = new FormData()
            formData.append('path', `${this.path}/${this.id}`)
            formData.append('name', this.thumbnail.name)
            formData.append('file', this.thumbnail)
            let res = await api
                .post(this.uploadRoute, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then(resss => {
                    this.img = `attractions/${this.id}/${this.thumbnail.name}`
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
                title: 'เพิ่มข้อมูล',
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
                                title: 'เพิ่มข้อมูลแล้ว',
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

        async fetchAmen() {
            let res = await api.get(this.amenRoute)
            res.data.forEach(i => {
                this.amenList.push({ text: i.name, value: i.name })
            })
        },

        async fetchAct() {
            let res = await api.get(this.actRoute)
            res.data.forEach(i => {
                this.actList.push({ text: i.name, value: i.name })
            })
        },
    },

    async mounted() {
        let res = await api.get(this.idRoute)
        this.id = res.data
        let res2 = await api.get('attractions/get-attraction-types')
        res2.data.forEach(i => {
            this.types.push({ text: i.name, value: i.name })
        })
        this.fetchAmen()
        this.fetchAct()
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
