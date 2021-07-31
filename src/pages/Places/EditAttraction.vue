<template>
    <div class="content">
        <div class="md-layout">
            <div class="md-layout-item md-medium-size-100 md-size-66">
                <template>
                    <form>
                        <md-card>
                            <md-card-header data-background-color="orange">
                                <h4 class="title">
                                    แก้ไขข้อมูลแหล่งท่องเที่ยว
                                </h4>
                                <!-- <p class="category">Complete your profile</p> -->
                            </md-card-header>

                            <md-card-content>
                                <div style="width: 500px">
                                    <img
                                        :src="imgPath + img"
                                        v-if="img != ''"
                                        class="mb-3 fit-image"
                                    />
                                </div>

                                <b-form-file
                                    :browse-text="
                                        img ? 'เปลี่ยนรูป' : 'เลือกรูป'
                                    "
                                    accept="image/*"
                                    :placeholder="
                                        img
                                            ? img.split('/')[1]
                                            : 'Choose a file or drop it here...'
                                    "
                                    v-model="thumbnail"
                                    class="mb-3"
                                ></b-form-file>
                                <b-input
                                    v-model="name"
                                    placeholder="ชื่อแหล่งท่องเที่ยว"
                                    class="mb-3"
                                />

                                <b-select
                                    alternative
                                    v-model="district"
                                    :options="options"
                                    @change="subDistrict = ''"
                                    class="mb-3"
                                />

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

                                <b-select
                                    alternative
                                    v-model="category"
                                    :options="types"
                                    class="mb-3"
                                />

                                <b-input
                                    v-model="lat"
                                    placeholder="Latitude"
                                    class="mb-3"
                                />

                                <b-input
                                    v-model="lon"
                                    placeholder="Lontitude"
                                    class="mb-3"
                                />

                                <quill-editor
                                    class="mb-3"
                                    ref="Physical"
                                    v-model="physical"
                                    :options="{
                                        modules: {
                                            toolbar: [
                                                ['bold', 'italic', 'underline'],
                                                ['image'],
                                            ],
                                        },
                                        placeholder: 'ข้อมูลทางกายภาพ ...',
                                        theme: 'snow',
                                    }"
                                />

                                <quill-editor
                                    class="mb-3"
                                    ref="Nature"
                                    v-model="nature"
                                    :options="{
                                        modules: {
                                            toolbar: [
                                                ['bold', 'italic', 'underline'],
                                                ['image'],
                                            ],
                                        },
                                        placeholder: 'ข้อมูลทางนิเวศ ...',
                                        theme: 'snow',
                                    }"
                                />

                                <quill-editor
                                    class="mb-3"
                                    ref="History"
                                    v-model="history"
                                    :options="{
                                        modules: {
                                            toolbar: [
                                                ['bold', 'italic', 'underline'],
                                                ['image'],
                                            ],
                                        },
                                        placeholder:
                                            'ข้อมูลทางประวัติศาสตร์ ...',
                                        theme: 'snow',
                                    }"
                                />

                                <quill-editor
                                    class="mb-3"
                                    ref="Culture"
                                    v-model="culture"
                                    :options="{
                                        modules: {
                                            toolbar: [
                                                ['bold', 'italic', 'underline'],
                                                ['image'],
                                            ],
                                        },
                                        placeholder: 'ข้อมูลทางวัฒนธรรม ...',
                                        theme: 'snow',
                                    }"
                                />

                                <quill-editor
                                    class="mb-3"
                                    ref="attraction"
                                    v-model="attraction"
                                    :options="{
                                        modules: {
                                            toolbar: [
                                                ['bold', 'italic', 'underline'],
                                                ['image'],
                                            ],
                                        },
                                        placeholder: 'สิ่งดึงดูดใจ ...',
                                        theme: 'snow',
                                    }"
                                />

                                <quill-editor
                                    class="mb-3"
                                    ref="accessibility"
                                    v-model="accessibility"
                                    :options="{
                                        modules: {
                                            toolbar: [
                                                ['bold', 'italic', 'underline'],
                                                ['image'],
                                            ],
                                        },
                                        placeholder:
                                            'การเดินทางมายังแหล่งท่องเที่ยว ...',
                                        theme: 'snow',
                                    }"
                                />

                                <quill-editor
                                    class="mb-3"
                                    ref="accommodation"
                                    v-model="accommodation"
                                    :options="{
                                        modules: {
                                            toolbar: [
                                                ['bold', 'italic', 'underline'],
                                                ['image'],
                                            ],
                                        },
                                        placeholder: 'การบริการที่พัก ...',
                                        theme: 'snow',
                                    }"
                                />
                                <md-field>
                                    <label for="months">เดือนท่องเที่ยว</label>
                                    <md-select
                                        v-model="travelMonths"
                                        class="mb-3"
                                        multiple
                                        name="months"
                                        id="months"
                                    >
                                        <div
                                            v-for="m in months"
                                            v-bind:key="m.value"
                                        >
                                            <md-option :value="m.value">{{
                                                m.text
                                            }}</md-option>
                                        </div>
                                    </md-select>
                                </md-field>
                                <b-input
                                    v-model="org"
                                    placeholder="ชื่อหน่วยงานที่รับผิดชอบ"
                                    class="mb-3"
                                />

                                <b-input
                                    v-model="phone"
                                    placeholder="เบอร์ติดต่อหน่วยงาน"
                                    class="mb-3"
                                />

                                <b-button variant="warning" @click="update">
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
            travelMonths: [],
            name: '',
            district: '',
            subDistrict: '',
            img: '',
            category: '',
            physical: '',
            nature: '',
            thumbnail: null,
            history: '',
            culture: '',
            lat: '',
            lon: '',
            org: '',
            phone: '',
            attraction: '',
            accessibility: '',
            accommodation: '',
            id: this.$route.params.id,
            apiRoute: `attractions/get-attraction-by-id/${this.$route.params.id}`,
            editRoute: `attractions/update-attraction-by-id`,
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
                    value: 1,
                    text: 'มกราคม',
                },
                {
                    value: 2,
                    text: 'กุมภาพันธ์',
                },
                {
                    value: 3,
                    text: 'มีนาคม',
                },
                {
                    value: 4,
                    text: 'เมษายน',
                },
                {
                    value: 5,
                    text: 'พฤษภาคม',
                },
                {
                    value: 6,
                    text: 'มิถุนายน',
                },
                {
                    value: 7,
                    text: 'กรกฎาคม',
                },
                {
                    value: 8,
                    text: 'สิงหาคม',
                },
                {
                    value: 9,
                    text: 'กันยายน',
                },
                {
                    value: 10,
                    text: 'ตุลาคม',
                },

                {
                    value: 11,
                    text: 'พฤศจิกายน',
                },
                {
                    value: 12,
                    text: 'ธันวาคม',
                },
            ],

            types: [
                { text: '-- ประเภท --', value: '', disabled: true },
                'ธรรมชาติ',
                'ประวัติศาสตร์',
                'วัฒนธรรม',
                'วิทยาศาสตร์',
            ],
            uploadRoute: '/upload',
            path: 'public/images/attractions',
            imgPath:
                process.env.VUE_APP_IMAGE_STORAGE_URL ||
                'http://localhost:5000/images',
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
        async update() {
            if (this.thumbnail) {
                await this.upload()
            }

            var model = {
                id: this.id,
                img: this.img,
                name: this.name,
                district: this.district,
                subDistrict: this.subDistrict,
                category: this.category,
                lat: this.lat,
                lon: this.lon,
                physical: this.physical,
                nature: this.nature,
                history: this.history,
                culture: this.culture,
                attraction: this.attraction,
                accessibility: this.accessibility,
                accommodation: this.accommodation,
                month: this.travelMonths.join(),
                org: this.org,
                phone: this.phone,
                updatedAt: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
            }
            this.$swal({
                title: 'แก้ไขข้อมูล',
                text: this.name,
                showDenyButton: true,
                confirmButtonText: `ยืนยัน`,
                denyButtonText: `ยกเลิก`,
                allowOutsideClick: false,
            }).then(result => {
                if (result.isConfirmed) {
                    let resSubmit = api
                        .post(this.editRoute, model)
                        .then(result => {
                            this.$swal({
                                title: 'แก้ไขข้อมูลแล้ว',
                                icon: 'success',
                                confirmButtonText: 'ตกลง',
                                allowOutsideClick: false,
                            }).then(result => {
                                /* Read more about isConfirmed, isDenied below */
                                if (result.isConfirmed) {
                                    this.fetch()
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
        async fetch() {
            let res = await api.get(this.apiRoute)
            this.result = res.data
            this.name = this.result.name
            this.img = this.result.img
            this.district = this.result.district
            this.subDistrict = this.result.subDistrict
            this.category = this.result.category
            this.physical = this.result.physical
            this.lat = this.result.lat
            this.lon = this.result.lon
            this.nature = this.result.nature
            this.history = this.result.history
            this.culture = this.result.culture
            this.attraction = this.result.attraction
            this.accessibility = this.result.accessibility
            this.accommodation = this.result.accommodation
            this.travelMonths = this.result.month.split(',')
            this.org = this.result.org
            this.phone = this.result.phone
        },
    },

    async mounted() {
        this.fetch()
    },
}
</script>
<style lang="scss" scoped>
.fit-image {
    width: 100%;
    object-fit: cover;
    height: auto; /* only if you want fixed height */
}
</style>
