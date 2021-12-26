<template>
    <div class="content">
        <div class="md-layout">
            <div class="md-layout-item md-medium-size-100 md-size-66">
                <template>
                    <form @submit.prevent="update()">
                        <md-card>
                            <md-card-header data-background-color="blue">
                                <h4 class="title">
                                    แก้ไขที่พัก
                                </h4>
                            </md-card-header>

                            <md-card-content>
                                <label>ชื่อที่พัก</label>
                                <b-input
                                    v-model="name"
                                    placeholder="ชื่อที่พัก"
                                    class="mb-3"
                                />

                                <label>อำเภอ</label>
                                <b-select
                                    alternative
                                    v-model="district"
                                    :options="options"
                                    @change="subDistrict = ''"
                                    class="mb-3"
                                />

                                <label>ตำบล</label>
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

                                <label>จำนวนห้องพัก</label>
                                <b-input
                                    type="number"
                                    v-model="room"
                                    placeholder="จำนวนห้องพัก"
                                    class="mb-3"
                                />

                                <label>ละติจูด</label>
                                <b-input
                                    v-model="lat"
                                    placeholder="Latitude"
                                    class="mb-3"
                                />

                                <label>ลองจิจูด</label>
                                <b-input
                                    v-model="lon"
                                    placeholder="Lontitude"
                                    class="mb-3"
                                />

                                <label>เบอร์ติดต่อ</label>
                                <b-input
                                    type="tel"
                                    v-model="phone"
                                    placeholder="เบอร์ติดต่อ"
                                    class="mb-3"
                                />

                                <label>แหล่งอ้างอิง</label>
                                <b-input
                                    type="url"
                                    v-model="url"
                                    placeholder="แหล่งอ้างอิง"
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
            id: this.$route.params.id,
            name: '',
            district: '',
            subDistrict: '',
            room: 0,
            lat: '',
            lon: '',
            url: '',
            phone: '',
            apiRoute: `hotels/get-hotel-by-id/${this.$route.params.id}`,
            updateRoute: `hotels/update-hotel-by-id`,
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
        }
    },
    methods: {
        async update() {
            var model = {
                id: this.id,
                name: this.name,
                district: this.district,
                subDistrict: this.subDistrict,
                lat: this.lat,
                lon: this.lon,
                phone: this.phone,
                url: this.url,
                room: this.room,
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
                        .post(this.updateRoute, model)
                        .then(result => {
                            this.$swal({
                                title: 'แก้ไขข้อมูลแล้ว',
                                icon: 'success',
                                confirmButtonText: 'ตกลง',
                                allowOutsideClick: false,
                            }).then(result => {
                                /* Read more about isConfirmed, isDenied below */
                                if (result.isConfirmed) {
                                    this.$router.push({
                                        name: `Hotel`,
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

        async fetch() {
            let res = await api.get(this.apiRoute)
            this.result = res.data

            this.name = this.result.name
            this.district = this.result.district
            this.subDistrict = this.result.subDistrict
            this.lat = this.result.lat
            this.lon = this.result.lon
            this.url = this.result.url
            this.phone = this.result.phone
            this.room = this.result.room
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
.md-menu-content {
    max-width: 500px !important;
}
</style>
