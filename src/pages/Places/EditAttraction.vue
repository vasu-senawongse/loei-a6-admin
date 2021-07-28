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
                <b-input
                  v-model="name"
                  placeholder="ชื่อแหล่งท่องเที่ยว"
                  class="mb-3"
                />

                <b-select
                  alternative
                  v-model="district"
                  :options="options"
                  class="mb-3"
                />

                <b-select
                  alternative
                  v-model="category"
                  :options="types"
                  class="mb-3"
                />

                <b-input v-model="lat" placeholder="Latitude" class="mb-3" />

                <b-input v-model="lon" placeholder="Lontitude" class="mb-3" />

                <quill-editor
                  class="mb-3"
                  ref="Physical"
                  v-model="physical"
                  :options="{
                    modules: {
                      toolbar: [['bold', 'italic', 'underline'], ['image']],
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
                      toolbar: [['bold', 'italic', 'underline'], ['image']],
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
                      toolbar: [['bold', 'italic', 'underline'], ['image']],
                    },
                    placeholder: 'ข้อมูลทางประวัติศาสตร์ ...',
                    theme: 'snow',
                  }"
                />

                <quill-editor
                  class="mb-3"
                  ref="Culture"
                  v-model="culture"
                  :options="{
                    modules: {
                      toolbar: [['bold', 'italic', 'underline'], ['image']],
                    },
                    placeholder: 'ข้อมูลทางวัฒนธรรม ...',
                    theme: 'snow',
                  }"
                />

                <md-select v-model="travelMonths" class="mb-3" multiple>
                  <div v-for="m in months" v-bind:key="m.value">
                    <md-option :value="m.value">{{ m.text }}</md-option>
                  </div>
                </md-select>

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

                <b-button variant="warning" @click="update"> แก้ไข </b-button>
              </md-card-content>
            </md-card>
          </form>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import api from '@/services/api.js';
export default {
  components: {},
  data() {
    return {
      travelMonths: [],
      name: '',
      district: '',
      category: '',
      physical: '',
      nature: '',
      history: '',
      culture: '',
      lat: '',
      lon: '',
      org: '',
      phone: '',
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
    };
  },
  methods: {
    async update() {
      var model = {
        id: this.id,
        name: this.name,
        district: this.district,
        category: this.category,
        lat: this.lat,
        lon: this.lon,
        physical: this.physical,
        nature: this.nature,
        history: this.history,
        culture: this.culture,
        org: this.org,
        phone: this.phone,
        updatedAt: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      };
      this.$swal({
        title: 'แก้ไขข้อมูล',
        text: this.name,
        showDenyButton: true,
        confirmButtonText: `ยืนยัน`,
        denyButtonText: `ยกเลิก`,
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          let resSubmit = api
            .post(this.editRoute, model)
            .then((result) => {
              this.$swal({
                title: 'แก้ไขข้อมูลแล้ว',
                icon: 'success',
                confirmButtonText: 'ตกลง',
                allowOutsideClick: false,
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                  this.fetch();
                }
              });
            })
            .catch((err) => {
              if (err.response.status === 400);
              this.$swal(err.response.data, '', 'error');
            });
        }
      });
    },
    async fetch() {
      let res = await api.get(this.apiRoute);
      this.result = res.data;
      this.name = this.result.name;
      this.district = this.result.district;
      this.category = this.result.category;
      this.physical = this.result.physical;
      this.lat = this.result.lat;
      this.lon = this.result.lon;
      this.nature = this.result.nature;
      this.history = this.result.history;
      this.culture = this.result.culture;
      this.org = this.result.org;
      this.phone = this.result.phone;
    },
  },

  async mounted() {
    this.fetch();
  },
};
</script>
<style lang="scss" scoped>
.fit-image {
  width: 100%;
  object-fit: cover;
  height: auto; /* only if you want fixed height */
}
</style>
