<template>
  <div class="content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <div style="float:right;margin-right:50px">
          <a :href="'/attractions/create'">
            <md-button class="md-raised md-info">เพิ่ม</md-button>
          </a>
        </div>
        <md-card>
          <md-card-header data-background-color="green">
            <div class="md-layout-item md-small-size-100 md-size-50">
              <h4 class="title">แหล่งท่องเที่ยว</h4>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-50">
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
                    : result.filter((i) =>
                        i.name
                          .toLowerCase()
                          .trim()
                          .includes(search.toLowerCase().trim())
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
                <template v-slot:cell(updatedAt)="data">
                  <span>{{
                    new Date(data.item.updatedAt).toLocaleString('en-GB')
                  }}</span>
                </template>
                <template v-slot:cell(btn)="data">
                  <a :href="'/attractions/' + data.item.id">
                    <md-button class="md-raised md-warning">แก้ไข</md-button>
                  </a>
                </template>
              </b-table>
              <b-pagination
                v-model="currentPage"
                :total-rows="
                  search == null
                    ? result.name
                    : result.filter((i) =>
                        i.name
                          .toLowerCase()
                          .trim()
                          .includes(search.toLowerCase().trim())
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
import api from '@/services/api.js';
export default {
  components: {},
  data() {
    return {
      currentPage: 1,
      perPage: 10,
      apiRoute: `attractions/get-attractions`,
      result: [],
      search: null,
      fields: [
        {
          key: 'name',
          label: 'แหล่งท่องเที่ยว',
          sortable: true,
        },
        {
          key: 'district',
          label: 'อำเภอ',
          sortable: true,
        },
        {
          key: 'category',
          label: 'ประเภท',
          sortable: true,
        },
        {
          key: 'updatedAt',
          label: 'แก้ไขล่าสุดเมื่อ',
          sortable: true,
        },
        {
          key: 'btn',
          label: '',
        },
      ],
      imgPath:
        process.env.VUE_APP_IMAGE_STORAGE_URL || 'http://localhost:5000/images',
    };
  },
  methods: {
    async fetch() {
      let res = await api.get(this.apiRoute);
      this.result = res.data;
    },
  },
  async mounted() {
    this.fetch();
  },
};
</script>
<style></style>
