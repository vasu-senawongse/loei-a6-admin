<template>
    <div>
        <nav-tabs-card>
            <template slot="content">
                <div class="md-layout">
                    <div
                        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-50"
                    >
                        <md-card>
                            <md-card-header data-background-color="red">
                                <div
                                    class="md-layout-item md-small-size-100 md-size-50"
                                >
                                    <h4 class="title">ขอความช่วยเหลือ</h4>
                                </div>
                            </md-card-header>
                            <md-card-content>
                                <div>
                                    <b-table
                                        :items="
                                            result.filter(
                                                i => i.type == 'REQUEST'
                                            )
                                        "
                                        :fields="fields"
                                        hover
                                        striped
                                        small
                                        responsive
                                        style="width: 100%"
                                    >
                                        <template v-slot:cell(title)="data">
                                            {{ data.item.title }}
                                        </template>

                                        <template v-slot:cell(message)="data">
                                            <div
                                                v-html="
                                                    data.item.message &&
                                                        data.item.message
                                                "
                                            ></div>
                                        </template>

                                        <template v-slot:cell(user)="data">
                                            {{ data.item.user }}
                                        </template>

                                        <template v-slot:cell(createdAt)="data">
                                            {{
                                                getFormatDate(
                                                    data.item.createdAt
                                                )
                                            }}
                                        </template>

                                        <template v-slot:cell(btn)="data">
                                            <b-button
                                                variant="danger"
                                                @click="doneTask(data.item.id)"
                                                ><i class="fas fa-trash"></i
                                            ></b-button>
                                        </template>
                                    </b-table>
                                </div>
                            </md-card-content>
                        </md-card>
                    </div>

                    <div
                        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-50"
                    >
                        <md-card>
                            <md-card-header data-background-color="green">
                                <div
                                    class="md-layout-item md-small-size-100 md-size-50"
                                >
                                    <h4 class="title">สอบถาม</h4>
                                </div>
                            </md-card-header>
                            <md-card-content>
                                <div>
                                    <b-table
                                        :items="
                                            result.filter(
                                                i => i.type == 'QUESTION'
                                            )
                                        "
                                        :fields="fields"
                                        hover
                                        striped
                                        small
                                        responsive
                                        style="width: 100%"
                                    >
                                        <template v-slot:cell(title)="data">
                                            {{ data.item.title }}
                                        </template>

                                        <template v-slot:cell(message)="data">
                                            <div
                                                v-html="
                                                    data.item.message &&
                                                        data.item.message
                                                "
                                            ></div>
                                        </template>

                                        <template v-slot:cell(user)="data">
                                            {{ data.item.user }}
                                        </template>

                                        <template v-slot:cell(createdAt)="data">
                                            {{
                                                getFormatDate(
                                                    data.item.createdAt
                                                )
                                            }}
                                        </template>

                                        <template v-slot:cell(btn)="data">
                                            <b-button
                                                variant="danger"
                                                @click="doneTask(data.item.id)"
                                                ><i class="fas fa-trash"></i
                                            ></b-button>
                                        </template>
                                    </b-table>
                                </div>
                            </md-card-content>
                        </md-card>
                    </div>

                    <div
                        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-50"
                    >
                        <md-card>
                            <md-card-header data-background-color="orange">
                                <div
                                    class="md-layout-item md-small-size-100 md-size-50"
                                >
                                    <h4 class="title">แจ้งข้อมูล</h4>
                                </div>
                            </md-card-header>
                            <md-card-content>
                                <div>
                                    <b-table
                                        :items="
                                            result.filter(
                                                i => i.type == 'INFORM'
                                            )
                                        "
                                        :fields="fields"
                                        hover
                                        striped
                                        small
                                        responsive
                                        style="width: 100%"
                                    >
                                        <template v-slot:cell(title)="data">
                                            {{ data.item.title }}
                                        </template>

                                        <template v-slot:cell(message)="data">
                                            <div
                                                v-html="
                                                    data.item.message &&
                                                        data.item.message
                                                "
                                            ></div>
                                        </template>

                                        <template v-slot:cell(user)="data">
                                            {{ data.item.user }}
                                        </template>

                                        <template v-slot:cell(createdAt)="data">
                                            {{
                                                getFormatDate(
                                                    data.item.createdAt
                                                )
                                            }}
                                        </template>

                                        <template v-slot:cell(btn)="data">
                                            <b-button
                                                variant="danger"
                                                @click="doneTask(data.item.id)"
                                                ><i class="fas fa-trash"></i
                                            ></b-button>
                                        </template>
                                    </b-table>
                                </div>
                            </md-card-content>
                        </md-card>
                    </div>

                    <div
                        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-50"
                    >
                        <md-card>
                            <md-card-header data-background-color="blue">
                                <div
                                    class="md-layout-item md-small-size-100 md-size-50"
                                >
                                    <h4 class="title">อื่นๆ</h4>
                                </div>
                            </md-card-header>
                            <md-card-content>
                                <div>
                                    <b-table
                                        :items="
                                            result.filter(
                                                i => i.type == 'OTHER'
                                            )
                                        "
                                        :fields="fields"
                                        hover
                                        striped
                                        small
                                        responsive
                                        style="width: 100%"
                                    >
                                        <template v-slot:cell(title)="data">
                                            {{ data.item.title }}
                                        </template>

                                        <template v-slot:cell(message)="data">
                                            <div
                                                v-html="
                                                    data.item.message &&
                                                        data.item.message
                                                "
                                            ></div>
                                        </template>

                                        <template v-slot:cell(user)="data">
                                            {{ data.item.user }}
                                        </template>

                                        <template v-slot:cell(createdAt)="data">
                                            {{
                                                getFormatDate(
                                                    data.item.createdAt
                                                )
                                            }}
                                        </template>

                                        <template v-slot:cell(btn)="data">
                                            <b-button
                                                variant="danger"
                                                @click="doneTask(data.item.id)"
                                                ><i class="fas fa-trash"></i
                                            ></b-button>
                                        </template>
                                    </b-table>
                                </div>
                            </md-card-content>
                        </md-card>
                    </div>
                </div>
            </template>
        </nav-tabs-card>
    </div>
</template>
<script>
import { NavTabsCard } from '@/components'
import api from '@/services/api.js'
import moment from 'moment'
export default {
    components: { NavTabsCard },
    data() {
        return {
            apiRoute: `contacts/get-pending-contacts`,
            verifyRoute: `contacts/done-task`,
            result: [],
            fields: [
                {
                    key: 'name',
                    label: 'ชื่อผู้ส่ง',
                },
                {
                    key: 'phone',
                    label: 'เบอร์ติดต่อ',
                },

                {
                    key: 'title',
                    label: 'หัวข้อ',
                },
                {
                    key: 'message',
                    label: 'รายละเอียด',
                },

                {
                    key: 'createdAt',
                    label: 'วันที่',
                },
                {
                    key: 'btn',
                    label: '',
                },
            ],
        }
    },
    methods: {
        async fetch() {
            let res = await api.get(this.apiRoute)
            this.result = res.data
        },
        getFormatDate(date) {
            return moment(new Date(date))
                .locale('th')
                .add(543, 'year')
                .format('ll LT')
        },
        async doneTask(id) {
            const data = {
                id: id,
            }
            this.$swal({
                title: 'ยืนยันลบข้อความนี้',
                showDenyButton: true,
                confirmButtonText: `ยืนยัน`,
                denyButtonText: `ยกเลิก`,
                allowOutsideClick: false,
            }).then(result => {
                if (result.isConfirmed) {
                    api.post(this.verifyRoute, data)
                        .then(res => {
                            this.$swal({
                                title: 'ลบข้อความแล้ว',
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
    },
    async mounted() {
        this.fetch()
    },
}
</script>
