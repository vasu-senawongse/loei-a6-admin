<template>
    <div class="content">
        <div class="md-layout">
            <div
                class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
            >
                <div style="float:right;margin-right:50px">
                    <a :href="'/users/0'">
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
                            <h4 class="title">ผู้ใช้งานในระบบ</h4>
                        </div>
                        <div
                            class="md-layout-item md-small-size-100 md-size-50"
                        >
                            <md-field>
                                <md-input
                                    v-model="search"
                                    type="text"
                                    placeholder="ค้นหา"
                                ></md-input>
                            </md-field>
                        </div>

                        <!-- <p class="category">Here is a subtitle for this table</p> -->
                    </md-card-header>
                    <md-card-content>
                        <div>
                            <md-table
                                v-model="result"
                                :table-header-color="'green'"
                            >
                                <b-table
                                    :items="
                                        search == null
                                            ? result
                                            : result.filter(i =>
                                                  i.display
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
                                    id="player-list"
                                    :per-page="perPage"
                                    :current-page="currentPage"
                                    responsive
                                    style="width: 100%"
                                >
                                    <template v-slot:cell(btn)="data">
                                        <a :href="'/users/' + data.item.id">
                                            <md-button
                                                class="md-raised md-warning"
                                                ><i class="fas fa-edit"></i
                                            ></md-button>
                                        </a>

                                        <md-button
                                            class="md-raised md-danger ml-2"
                                            @click="
                                                deleteUser(
                                                    data.item.id,
                                                    data.item.display
                                                )
                                            "
                                            ><i class="fas fa-trash"></i
                                        ></md-button>
                                    </template>
                                </b-table>
                                <b-pagination
                                    v-model="currentPage"
                                    :total-rows="
                                        search == null
                                            ? result.length
                                            : result.filter(i =>
                                                  i.display
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
                                    aria-controls="player-list"
                                    style="float:right"
                                ></b-pagination>
                            </md-table>
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
    data() {
        return {
            currentPage: 1,
            perPage: 10,
            search: null,
            imgPath:
                process.env.VUE_APP_IMAGE_STORAGE_URL ||
                'http://localhost:5000/images',

            apiRoute: `users/get-users`,

            deleteRoute: `users/delete-user`,
            result: [],
            fields: [
                {
                    key: 'display',
                    label: 'ชื่อ',
                },
                {
                    key: 'role',
                    label: 'สิทธิ์',
                },

                {
                    key: 'btn',
                    label: '',
                },
            ],
        }
    },
    methods: {
        async deleteUser(id, text) {
            const verify = {
                id: id,
            }

            this.$swal({
                title: 'ยืนยันการลบ User',
                text: text,
                showDenyButton: true,
                confirmButtonText: `ยืนยัน`,
                denyButtonText: `ยกเลิก`,
                allowOutsideClick: false,
            }).then(result => {
                if (result.isConfirmed) {
                    let resSubmit = api
                        .delete(this.deleteRoute, verify)
                        .then(result => {
                            this.$swal({
                                title: 'ลบ User แล้ว',
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
