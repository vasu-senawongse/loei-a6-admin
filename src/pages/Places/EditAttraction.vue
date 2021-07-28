<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-66">
        <template>
          <form>
            <md-card>
              <md-card-header data-background-color="orange">
                <h4 class="title">
                  แก้ไขข้อมูลทีม
                </h4>
                <!-- <p class="category">Complete your profile</p> -->
              </md-card-header>

              <md-card-content>
                <div style="width:400px">
                  <img
                    class="fit-image"
                    :src="imgPath + 'clubs/' + id + '.png'"
                  />
                </div>

                <div class="md-layout md-gutter">
                  <div class="md-layout-item md-small-size-100 md-size-50">
                    <b-form-file
                      :state="logo && logo.size < 1024 * 1024"
                      accept="image/png"
                      browse-text="อัพโหลดLogo"
                      placeholder="Choose a file or drop it here..."
                      drop-placeholder="Drop file here..."
                      v-model="logo"
                      class="mt-3"
                    ></b-form-file>
                  </div>
                  <div class="md-layout-item md-small-size-100 md-size-50">
                    <b-button variant="info" @click="uploadLogo()"
                      >อัพโหลด</b-button
                    >
                  </div>
                  <div class="md-layout-item md-small-size-100 md-size-50">
                    <md-field>
                      <label>ชื่อทีม</label>
                      <md-input v-model="name" type="text"></md-input>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-small-size-100 md-size-50">
                    <md-field>
                      <label for="division">ดิวิชั่น</label>
                      <md-select
                        v-model="division"
                        name="division"
                        id="division"
                      >
                        <md-option value="1">1</md-option>
                        <md-option value="2">2</md-option>
                        <md-option value="3">3</md-option>
                      </md-select>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-small-size-100 md-size-50">
                    <label>ผู้จัดการทีม</label>
                    <b-select :options="list" v-model="manager"></b-select>
                  </div>

                  <div class="md-layout-item md-size-100 text-right">
                    <md-button
                      @click="updateProfile()"
                      class="

                          md-raised md-warning
                      "
                      >อัพเดตข้อมูล</md-button
                    >
                  </div>
                </div>
              </md-card-content>
            </md-card>
          </form>
        </template>
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
      id: this.$route.params.id,
      name: null,
      logo: null,
      manager: null,
      division: null,
      apiRoute: `clubs/get-club-by-id/`,
      listRoute: 'users/get-player-list',
      list: [{ text: '- เลือกผู้จัดการทีม -', value: null }],
      result: {},
      logoRoute: '/upload',
      path: 'public/images/clubs',
      editRoute: 'admin/clubs/update-club-by-id',
      imgPath:
        process.env.VUE_APP_IMAGE_STORAGE_URL || 'http://localhost:5000/images',
    };
  },
  methods: {
    async uploadLogo() {
      let formData = new FormData();
      formData.append('path', this.path);
      formData.append('name', this.result._id + '.png');
      formData.append('file', this.logo);
      let res = await api
        .post(this.logoRoute, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((resss) => {
          location.reload();
        })
        .catch((err) => {
          if (err.resss.status === 400);
          this.$swal(err.resss.data, '', 'error');
        });
    },
    updateProfile() {
      const club = {
        id: this.id,
        club_name: this.name,
        club_manager: this.manager,
        club_division: this.division,
      };

      this.$swal({
        title: 'ยืนยันแก้ไขข้อมูลทีม',
        text: this.result.club_name,
        showDenyButton: true,
        confirmButtonText: `ยืนยัน`,
        denyButtonText: `แก้ไข`,
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          let resSubmit = api
            .post(this.editRoute, club)
            .then((result) => {
              this.$swal({
                title: 'อัพเดตข้อมูลทีมเรียบร้อย',
                icon: 'success',
                confirmButtonText: 'ตกลง',
                allowOutsideClick: false,
              }).then((result) => {
                if (result.isConfirmed) {
                  this.$router.push({ name: 'Clubs' });
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
  },

  async mounted() {
    let res = await api.get(this.apiRoute + this.id);
    this.result = res.data;
    this.name = this.result.club_name;
    this.manager = this.result.club_manager
      ? this.result.club_manager._id
      : null;
    this.division = this.result.club_division;
    let res2 = await api.get(this.listRoute);
    var playerList = res2.data.filter(
      (i) =>
        i._id == (this.result.club_manager && this.result.club_manager._id) ||
        !i.roles.includes('5fdcafb5b495f11654c1daed')
    );
    playerList.forEach((i) => {
      this.list.push({ value: i._id, text: i.displayName });
    });
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
