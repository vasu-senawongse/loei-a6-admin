<template>
    <div class="content">
        <div class="md-layout">
            <div
                class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
            >
                <div style="float:right;margin-right:50px">
                    <a :href="'/attractions/create'">
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
                            <h4 class="title">หน่วยงานที่เกี่ยวข้อง</h4>
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
                    </md-card-header>
                    <md-card-content>
                        <div>
                            <b-table
                                sort-icon-left
                                :items="
                                    search == null
                                        ? result
                                        : result.filter(i =>
                                              i.org
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
                                id="attraction-list"
                                :per-page="perPage"
                                :current-page="currentPage"
                                responsive
                                style="width: 100%"
                            >
                                <template v-slot:cell(img)="data">
                                    <div style="width:150px">
                                        <img
                                            :src="imgPath + data.item.img"
                                            class="fit-image"
                                        />
                                    </div>
                                </template>
                                <template v-slot:cell(type)="data">
                                    <span>{{
                                        data.item.type == 1
                                            ? 'หน่วยงาน อพท.'
                                            : data.item.type == 2
                                            ? 'หน่วยงานในจังหวัดเลย'
                                            : 'หน่วยงานอื่นๆ'
                                    }}</span>
                                </template>
                                <template v-slot:cell(btn)="data">
                                    <a :href="'/attractions/' + data.item.id">
                                        <md-button
                                            class="md-raised md-warning mr-2"
                                            ><i class="fas fa-edit"></i
                                        ></md-button>
                                    </a>
                                    <md-button
                                        class="md-raised md-danger mr-2"
                                        @click="deleteAttraction(data.item)"
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
                                              i.org
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
                                aria-controls="attraction-list"
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
            apiRoute: `organizations/get-organizations`,
            deleteRoute: `organizations/delete-organization`,
            result: [],
            search: null,
            fields: [
                {
                    key: 'img',
                    label: '',
                },
                {
                    key: 'org',
                    label: 'ชื่อหน่วยงาน',
                    sortable: true,
                },

                {
                    key: 'type',
                    label: 'ประเภท',
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
        async deleteAttraction(org) {
            const model = {
                id: org.id,
            }

            this.$swal({
                title: 'ยืนยันลบหน่วยงาน',
                text: org.org,
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
                                title: 'ลบหน่วยงานแล้ว',
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
<style>
.fit-image {
    width: 100%;
    object-fit: cover;
    height: auto; /* only if you want fixed height */
}
</style>
