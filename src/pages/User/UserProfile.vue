<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-66">
        <template>
          <form>
            <md-card>
              <md-card-header
                :data-background-color="userId == '0' ? 'green' : 'orange'"
              >
                <h4 class="title">
                  {{ userId == '0' ? 'สร้าง User' : 'แก้ไขข้อมูล User' }}
                </h4>
                <!-- <p class="category">Complete your profile</p> -->
              </md-card-header>

              <md-card-content>
                <div class="md-layout md-gutter">
                  <div class="md-layout-item md-small-size-100 md-size-50">
                    <md-field>
                      <label>User Name</label>
                      <md-input v-model="username" type="text"></md-input>
                    </md-field>
                  </div>
                  <div class="md-layout-item md-small-size-100 md-size-50">
                    <md-field>
                      <label>PSN ID</label>
                      <md-input v-model="psn" type="text"></md-input>
                    </md-field>
                  </div>
                  <div class="md-layout-item md-small-size-100 md-size-50">
                    <md-field>
                      <label>Email Address</label>
                      <md-input v-model="email" type="email"></md-input>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-small-size-100 md-size-50">
                    <md-field>
                      <label>Line ID</label>
                      <md-input v-model="line" type="text"></md-input>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-small-size-100 md-size-50">
                    <md-field>
                      <label>รหัสผ่าน</label>
                      <md-input v-model="password" type="password"></md-input>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-small-size-100 md-size-50">
                    <md-field>
                      <label>ยืนยันรหัสผ่าน</label>
                      <md-input
                        v-model="confirmPassword"
                        type="password"
                      ></md-input>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-small-size-100 md-size-50">
                    <md-field>
                      <label for="roles">Roles</label>
                      <md-select
                        v-model="roles"
                        name="roles"
                        id="roles"
                        multiple
                      >
                        <md-option value="ADMIN">ADMIN</md-option>
                        <md-option value="PLAYER">PLAYER</md-option>
                      </md-select>
                    </md-field>
                  </div>
                  <!-- <div class="md-layout-item md-size-100">
            <md-field maxlength="5">
              <label>About Me</label>
              <md-textarea v-model="aboutme"></md-textarea>
            </md-field>
          </div> -->
                  <div class="md-layout-item md-size-100 text-right">
                    <md-button
                      @click="updateProfile()"
                      :class="
                        userId == '0'
                          ? 'md-raised md-success'
                          : 'md-raised md-warning'
                      "
                      >{{
                        userId == '0' ? 'สร้าง User' : 'อัพเดตโปรไฟล์'
                      }}</md-button
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
      userId: this.$route.params.id,
      username: null,
      email: null,
      psn: null,
      line: null,
      password: null,
      confirmPassword: null,
      roles: [],
      apiRoute: `users/get-user-by-id/`,
      result: {},
      editRoute: 'admin/users/update-user-by-id',
    };
  },
  methods: {
    updateProfile() {
      const user = {
        id: this.userId,
        userName: this.username,
        displayName: this.psn,
        email: this.email,
        line: this.line,
        password: this.password,
        roles: this.roles,
      };
      var confirmText =
        this.userId == '0' ? 'ยืนยันสร้างบัญชีใหม่' : 'ยืนยันแก้ไขโปรไฟล์';

      this.$swal({
        title: confirmText,
        text: this.psn,
        showDenyButton: true,
        confirmButtonText: `ยืนยัน`,
        denyButtonText: `แก้ไข`,
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          var resultText =
            this.userId == '0'
              ? 'สร้างบัญชีผู้ใช้ใหม่เรียบร้อย'
              : 'อัพเดตโปรไฟล์เรียบร้อย';
          let resSubmit = api
            .post(this.editRoute, user)
            .then((result) => {
              this.$swal({
                title: resultText,
                icon: 'success',
                confirmButtonText: 'ตกลง',
                allowOutsideClick: false,
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                  this.$router.push({ name: 'Users' });
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
    let res = await api.get(this.apiRoute + this.userId);
    this.result = res.data;
    this.username = this.result.userName;
    this.email = this.result.email;
    this.psn = this.result.displayName;
    this.line = this.result.line;

    this.result.roles.forEach((element) => {
      this.roles.push(element.role);
    });
  },
};
</script>
<style lang="scss" scoped></style>
