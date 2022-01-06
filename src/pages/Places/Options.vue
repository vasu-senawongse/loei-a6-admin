<template>
    <div class="content">
        <div class="md-layout">
            <div
                class="md-layout-item md-medium-size-100 md-xsmall-size-33 md-size-33"
            >
                <md-card>
                    <md-card-header data-background-color="green">
                        <div
                            class="md-layout-item md-small-size-100 md-size-50"
                        >
                            <h4 class="title">ประเภท</h4>
                        </div>
                        <div
                            class="md-layout-item md-small-size-100 md-size-50"
                        >
                            <md-field>
                                <md-input
                                    v-model="newType"
                                    type="text"
                                    placeholder="เพิ่มประเภท..."
                                ></md-input>
                            </md-field>

                            <md-button
                                class="md-raised md-info"
                                :disabled="!newType"
                                @click="addType"
                                ><i class="fas fa-plus"></i
                            ></md-button>
                        </div>
                    </md-card-header>
                    <md-card-content>
                        <div>
                            <b-table
                                sort-icon-left
                                :items="result"
                                :fields="fields"
                                hover
                                striped
                                small
                                id="type-list"
                                :per-page="perPage"
                                :current-page="currentPage"
                                responsive
                                style="width: 100%"
                            >
                                <template v-slot:cell(btn)="data">
                                    <md-button
                                        class="md-raised md-warning mr-2"
                                        @click="editOption(data.item, 'TYPE')"
                                        ><i class="fas fa-edit"></i
                                    ></md-button>

                                    <md-button
                                        class="md-raised md-danger mr-2"
                                        @click="deleteType(data.item.id)"
                                        ><i class="fas fa-trash"></i
                                    ></md-button>
                                </template>
                            </b-table>
                            <b-pagination
                                v-model="currentPage"
                                :total-rows="result.length"
                                :per-page="perPage"
                                aria-controls="type-list"
                                style="float:right"
                            ></b-pagination>
                        </div>
                    </md-card-content>
                </md-card>
            </div>

            <div
                class="md-layout-item md-medium-size-100 md-xsmall-size-33 md-size-33"
            >
                <md-card>
                    <md-card-header data-background-color="green">
                        <div
                            class="md-layout-item md-small-size-100 md-size-100"
                        >
                            <h4 class="title">กิจกรรม</h4>
                        </div>
                        <div
                            class="md-layout-item md-small-size-100 md-size-100"
                        >
                            <md-field>
                                <md-input
                                    v-model="newAct"
                                    type="text"
                                    placeholder="เพิ่มกิจกรรม..."
                                ></md-input>
                            </md-field>

                            <md-button
                                class="md-raised md-info"
                                @click="addAct"
                                :disabled="!newAct"
                                ><i class="fas fa-plus"
                            /></md-button>
                        </div>
                    </md-card-header>
                    <md-card-content>
                        <div>
                            <b-table
                                sort-icon-left
                                :items="activities"
                                :fields="fields"
                                hover
                                striped
                                small
                                id="activities-list"
                                :per-page="perPage"
                                :current-page="actPage"
                                responsive
                                style="width: 100%"
                            >
                                <template v-slot:cell(btn)="data">
                                    <md-button
                                        class="md-raised md-warning mr-2"
                                        @click="editOption(data.item, 'ACT')"
                                        ><i class="fas fa-edit"></i
                                    ></md-button>

                                    <md-button
                                        class="md-raised md-danger mr-2"
                                        @click="deleteAct(data.item.id)"
                                        ><i class="fas fa-trash"></i
                                    ></md-button>
                                </template>
                            </b-table>
                            <b-pagination
                                v-model="actPage"
                                :total-rows="activities.length"
                                :per-page="perPage"
                                aria-controls="activities-list"
                                style="float:right"
                            ></b-pagination>
                        </div>
                    </md-card-content>
                </md-card>
            </div>

            <div
                class="md-layout-item md-medium-size-100 md-xsmall-size-33 md-size-33"
            >
                <md-card>
                    <md-card-header data-background-color="green">
                        <div
                            class="md-layout-item md-small-size-100 md-size-100"
                        >
                            <h4 class="title">สิ่งอำนวยความสะดวก</h4>
                        </div>
                        <div
                            class="md-layout-item md-small-size-100 md-size-100"
                        >
                            <md-field>
                                <md-input
                                    v-model="newAmen"
                                    type="text"
                                    placeholder="เพิ่มสิ่งอำนวยความสะดวก..."
                                ></md-input>
                            </md-field>
                        </div>
                        <div
                            class="md-layout-item md-small-size-100 md-size-20"
                        >
                            <md-button
                                class="md-raised md-info"
                                @click="addAmen"
                                :disabled="!newAmen"
                                ><i class="fas fa-plus"
                            /></md-button>
                        </div>
                    </md-card-header>
                    <md-card-content>
                        <div>
                            <b-table
                                sort-icon-left
                                :items="amenities"
                                :fields="fields"
                                hover
                                striped
                                small
                                id="amenities-list"
                                :per-page="perPage"
                                :current-page="amenPage"
                                responsive
                                style="width: 100%"
                            >
                                <template v-slot:cell(btn)="data">
                                    <md-button
                                        class="md-raised md-warning mr-2"
                                        @click="editOption(data.item, 'AMEN')"
                                        ><i class="fas fa-edit"></i
                                    ></md-button>

                                    <md-button
                                        class="md-raised md-danger mr-2"
                                        @click="deleteAmen(data.item.id)"
                                        ><i class="fas fa-trash"></i
                                    ></md-button>
                                </template>
                            </b-table>
                            <b-pagination
                                v-model="amenPage"
                                :total-rows="amenities.length"
                                :per-page="perPage"
                                aria-controls="amenities-list"
                                style="float:right"
                            ></b-pagination>
                        </div>
                    </md-card-content>
                </md-card>
            </div>
        </div>
        <div>
            <b-modal
                id="edit-option"
                ref="edit-option"
                :title="
                    editingType == 'TYPE'
                        ? 'แก้ไขประเภทแหล่ง'
                        : editingType == 'AMEN'
                        ? 'แก้ไขสิ่งอำนวยความสะดวก'
                        : 'แก้ไขกิจกรรม'
                "
                hide-footer
            >
                <p class="my-4">
                    <b-input
                        v-model="newName"
                        type="text"
                        placeholder="แก้ไขตัวเลือก"
                        required
                    ></b-input>
                </p>
                <b-button type="button" variant="warning" @click="edit()"
                    ><i class="fas fa-edit"></i
                ></b-button>
            </b-modal>
        </div>
    </div>
</template>

<script>
import api from '@/services/api.js'
export default {
    components: {},
    data() {
        return {
            currentPage: 1,
            amenPage: 1,
            actPage: 1,
            perPage: 10,
            apiRoute: `attractions/get-attraction-types`,
            addRoute: `attractions/add-options`,
            editRoute: `attractions/edit-options`,
            deleteRoute: `attractions/delete-options`,
            apiRoute2: `amenities/get-amenities`,
            apiRoute3: `activities/get-activities`,
            editingOption: null,
            newName: '',
            editingType: null,
            result: [],
            amenities: [],
            activities: [],
            newType: null,
            newAct: null,
            newAmen: null,
            fields: [
                {
                    key: 'name',
                    label: 'ชื่อ',
                    sortable: true,
                },

                {
                    key: 'btn',
                    label: '',
                },
            ],
        }
    },
    methods: {
        async addType() {
            var model = {
                type: 'TYPE',
                name: this.newType,
            }

            api.post(this.addRoute, model)
                .then(result => {
                    this.$swal({
                        title: 'เพิ่มประเภทแล้ว',
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
        },

        async deleteType(id) {
            var model = {
                type: 'TYPE',
                id: id,
            }
            this.$swal({
                title: 'ยืนยันลบประเภท',
                showDenyButton: true,
                confirmButtonText: `ยืนยัน`,
                denyButtonText: `ยกเลิก`,
                allowOutsideClick: false,
            }).then(result => {
                if (result.isConfirmed) {
                    api.post(this.addRoute, model)
                        .then(result => {
                            this.$swal({
                                title: 'ลบตัวเลือกประเภทแล้ว',
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

        async deleteAmen(id) {
            var model = {
                type: 'AMEN',
                id: id,
            }
            this.$swal({
                title: 'ยืนยันลบสิ่งอำนวยความสะดวก',
                showDenyButton: true,
                confirmButtonText: `ยืนยัน`,
                denyButtonText: `ยกเลิก`,
                allowOutsideClick: false,
            }).then(result => {
                if (result.isConfirmed) {
                    api.delete(this.deleteRoute, model)
                        .then(result => {
                            this.$swal({
                                title: 'ลบสิ่งอำนวยความสะดวกแล้ว',
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

        async deleteAct(id) {
            var model = {
                type: 'ACT',
                id: id,
            }
            this.$swal({
                title: 'ยืนยันลบกิจกรรม',
                showDenyButton: true,
                confirmButtonText: `ยืนยัน`,
                denyButtonText: `ยกเลิก`,
                allowOutsideClick: false,
            }).then(result => {
                if (result.isConfirmed) {
                    api.delete(this.deleteRoute, model)
                        .then(result => {
                            this.$swal({
                                title: 'ลบกิจกรรมแล้ว',
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

        async addAmen() {
            var model = {
                type: 'AMEN',
                name: this.newAmen,
            }
            api.post(this.addRoute, model)
                .then(result => {
                    this.$swal({
                        title: 'เพิ่มสิ่งอำนวยความสะดวกแล้ว',
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
        },
        async addAct() {
            var model = {
                type: 'ACT',
                name: this.newAct,
            }
            api.post(this.addRoute, model)
                .then(result => {
                    this.$swal({
                        title: 'เพิ่มกิจกรรมแล้ว',
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
        },

        async editOption(option, type) {
            this.editingOption = option
            this.editingType = type
            this.newName = this.editingOption.name
            this.$refs['edit-option'].show()
        },

        async edit() {
            var model = {
                type: this.editingType,
                id: this.editingOption.id,
                name: this.newName,
            }
            api.post(this.editRoute, model)
                .then(result => {
                    this.$swal({
                        title: 'แก้ไขตัวเลือกแล้ว',
                        icon: 'success',
                        confirmButtonText: 'ตกลง',
                        allowOutsideClick: false,
                    }).then(result => {
                        /* Read more about isConfirmed, isDenied below */
                        if (result.isConfirmed) {
                            this.editingOption = null
                            this.editingType = null
                            this.newName = ''
                            this.$refs['edit-option'].hide()
                            this.fetch()
                        }
                    })
                })
                .catch(err => {
                    if (err.response.status === 400);
                    this.$swal(err.response.data, '', 'error')
                })
        },
        async fetch() {
            let res = await api.get(this.apiRoute)
            this.result = res.data

            let res2 = await api.get(this.apiRoute2)
            this.amenities = res2.data

            let res3 = await api.get(this.apiRoute3)
            this.activities = res3.data
        },
    },
    async mounted() {
        this.fetch()
    },
}
</script>
<style>
.fit-image {
    width: 100%;
    object-fit: cover;
    height: auto; /* only if you want fixed height */
}
</style>
