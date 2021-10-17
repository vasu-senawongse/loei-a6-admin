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
                                @click="addType"
                                >เพิ่ม</md-button
                            >
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

                            <md-button class="md-raised md-info" @click="addAct"
                                >เพิ่ม</md-button
                            >
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
                                >เพิ่ม</md-button
                            >
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
            apiRoute2: `amenities/get-amenities`,
            apiRoute3: `activities/get-activities`,
            result: [],
            amenities: [],
            activities: [],
            newType: null,
            newAct: null,
            newAmen: null,
            fields: [
                {
                    key: 'name',
                    label: 'ประเภท',
                    sortable: true,
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
