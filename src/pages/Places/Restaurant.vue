<template>
    <div class="content">
        <div class="md-layout">
            <div
                class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
            >
                <div style="float:right;margin-right:50px">
                    <a :href="'/restaurants/create'">
                        <md-button class="md-raised md-info"
                            ><i class="fas fa-plus"
                        /></md-button>
                    </a>
                </div>
                <md-card>
                    <md-card-header data-background-color="green">
                        <div
                            class="md-layout-item md-small-size-100 md-size-50"
                        >
                            <h4 class="title">ร้านอาหาร</h4>
                        </div>
                        <div
                            class="md-layout-item md-small-size-100 md-size-50"
                        >
                            <md-field>
                                <md-input
                                    v-model="search"
                                    type="text"
                                    placeholder="ค้นหา..."
                                ></md-input>
                            </md-field>
                        </div>

                        <!-- <p class="category">Here is a subtitle for this table</p> -->
                    </md-card-header>
                    <md-card-content>
                        <div>
                            <b-table
                                sort-icon-left
                                :items="
                                    search == null
                                        ? result
                                        : result.filter(i =>
                                              i.name
                                                  .toLowerCase()
                                                  .trim()
                                                  .includes(
                                                      search
                                                          .toLowerCase()
                                                          .trim()
                                                  )
                                          )
                                "
                                :fields="fields"
                                hover
                                striped
                                small
                                id="restaurant-list"
                                :per-page="perPage"
                                :current-page="currentPage"
                                responsive
                                style="width: 100%"
                            >
                                <template v-slot:cell(updatedAt)="data">
                                    <span>{{
                                        new Date(
                                            data.item.updatedAt
                                        ).toLocaleString('en-GB')
                                    }}</span>
                                </template>
                                <template v-slot:cell(btn)="data">
                                    <a :href="'/restaurants/' + data.item.id">
                                        <md-button
                                            class="md-raised md-warning mr-2"
                                            ><i class="fas fa-edit"></i
                                        ></md-button>
                                    </a>
                                    <md-button
                                        class="md-raised md-danger mr-2"
                                        @click="deleteRestaurant(data.item)"
                                        ><i class="fas fa-trash"></i
                                    ></md-button>
                                </template>
                            </b-table>
                            <b-pagination
                                v-model="currentPage"
                                :total-rows="
                                    search == null
                                        ? result.name
                                        : result.filter(i =>
                                              i.name
                                                  .toLowerCase()
                                                  .trim()
                                                  .includes(
                                                      search
                                                          .toLowerCase()
                                                          .trim()
                                                  )
                                          ).length
                                "
                                :per-page="perPage"
                                aria-controls="restaurant-list"
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
            perPage: 10,
            apiRoute: `restaurants/get-restaurants`,
            deleteRoute: `restaurants/delete-restaurant`,
            result: [],
            search: null,
            fields: [
                {
                    key: 'name',
                    label: 'ร้านอาหาร',
                    sortable: true,
                },

                {
                    key: 'district',
                    label: 'อำเภอ',
                    sortable: true,
                },
                {
                    key: 'phone',
                    label: 'เบอร์ติดต่อ',
                    sortable: true,
                },

                {
                    key: 'btn',
                    label: '',
                },
            ],
            imgPath:
                process.env.VUE_APP_IMAGE_STORAGE_URL ||
                'http://localhost:5000/images',
        }
    },
    methods: {
        async deleteRestaurant(restaurant) {
            const model = {
                id: restaurant.id,
            }

            this.$swal({
                title: 'ยืนยันลบร้านอาหาร',
                text: restaurant.name,
                showDenyButton: true,
                confirmButtonText: `ยืนยัน`,
                denyButtonText: `ยกเลิก`,
                allowOutsideClick: false,
            }).then(result => {
                if (result.isConfirmed) {
                    let resSubmit = api
                        .delete(this.deleteRoute, model)
                        .then(result => {
                            this.$swal({
                                title: 'ลบร้านอาหารแล้ว',
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
        },
    },
    async mounted() {
        this.fetch()
    },
}
</script>
<style></style>
