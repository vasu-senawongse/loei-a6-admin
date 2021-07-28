<template>
  <div>
    <nav-tabs-card>
      <template slot="content">
        <span class="md-nav-tabs-title">Tasks:</span>
        <md-tabs class="md-success" md-alignment="left">
          <md-tab id="tab-home" md-label="ALL" md-icon="home">
            <b-table
              :items="result"
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
                <div v-html="data.item.message && data.item.message"></div>
              </template>

              <template v-slot:cell(user)="data">
                {{ data.item.user }}
              </template>

              <template v-slot:cell(createdAt)="data">
                {{ new Date(data.item.createdAt).toLocaleString('en-GB') }}
              </template>

              <template v-slot:cell(btn)="data">
                <b-button variant="success" @click="doneTask(data.item._id)"
                  >DONE</b-button
                >
              </template>
            </b-table>
          </md-tab>

          <md-tab id="tab-bug" md-label="Bugs" md-icon="bug_report">
            <b-table
              :items="result.filter((i) => i.type == 'BUG')"
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
                <div v-html="data.item.message && data.item.message"></div>
              </template>

              <template v-slot:cell(user)="data">
                {{ data.item.user }}
              </template>

              <template v-slot:cell(createdAt)="data">
                {{ new Date(data.item.createdAt).toLocaleString('en-GB') }}
              </template>

              <template v-slot:cell(btn)="data">
                <b-button variant="success" @click="doneTask(data.item._id)"
                  >DONE</b-button
                >
              </template>
            </b-table>
          </md-tab>

          <md-tab id="tab-pages" md-label="Feature Request" md-icon="code">
            <b-table
              :items="result.filter((i) => i.type == 'FEATURE')"
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
                <div v-html="data.item.message && data.item.message"></div>
              </template>

              <template v-slot:cell(user)="data">
                {{ data.item.user }}
              </template>

              <template v-slot:cell(createdAt)="data">
                {{ new Date(data.item.createdAt).toLocaleString('en-GB') }}
              </template>

              <template v-slot:cell(btn)="data">
                <b-button variant="success" @click="doneTask(data.item._id)"
                  >DONE</b-button
                >
              </template>
            </b-table>
          </md-tab>

          <md-tab id="tab-req" md-label="HELP REQUEST" md-icon="support">
            <b-table
              :items="result.filter((i) => i.type == 'REQUEST')"
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
                <div v-html="data.item.message && data.item.message"></div>
              </template>

              <template v-slot:cell(user)="data">
                {{ data.item.user }}
              </template>

              <template v-slot:cell(createdAt)="data">
                {{ new Date(data.item.createdAt).toLocaleString('en-GB') }}
              </template>

              <template v-slot:cell(btn)="data">
                <b-button variant="success" @click="doneTask(data.item._id)"
                  >DONE</b-button
                >
              </template>
            </b-table>
          </md-tab>

          <md-tab id="tab-q" md-label="QUESTION" md-icon="help">
            <b-table
              :items="result.filter((i) => i.type == 'QUESTION')"
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
                <div v-html="data.item.message && data.item.message"></div>
              </template>

              <template v-slot:cell(user)="data">
                {{ data.item.user }}
              </template>

              <template v-slot:cell(createdAt)="data">
                {{ new Date(data.item.createdAt).toLocaleString('en-GB') }}
              </template>

              <template v-slot:cell(btn)="data">
                <b-button variant="success" @click="doneTask(data.item._id)"
                  >DONE</b-button
                >
              </template>
            </b-table>
          </md-tab>

          <md-tab id="tab-report" md-label="REPORT" md-icon="report">
            <b-table
              :items="result.filter((i) => i.type == 'REPORT')"
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
                <div v-html="data.item.message && data.item.message"></div>
              </template>

              <template v-slot:cell(user)="data">
                {{ data.item.user }}
              </template>

              <template v-slot:cell(createdAt)="data">
                {{ new Date(data.item.createdAt).toLocaleString('en-GB') }}
              </template>

              <template v-slot:cell(btn)="data">
                <b-button variant="success" @click="doneTask(data.item._id)"
                  >DONE</b-button
                >
              </template>
            </b-table>
          </md-tab>

          <md-tab id="tab-more" md-label="OTHER" md-icon="more">
            <b-table
              :items="result.filter((i) => i.type == 'OTHER')"
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
                <div v-html="data.item.message && data.item.message"></div>
              </template>

              <template v-slot:cell(user)="data">
                {{ data.item.user }}
              </template>

              <template v-slot:cell(createdAt)="data">
                {{ new Date(data.item.createdAt).toLocaleString('en-GB') }}
              </template>

              <template v-slot:cell(btn)="data">
                <b-button variant="success" @click="doneTask(data.item._id)"
                  >DONE</b-button
                >
              </template>
            </b-table>
          </md-tab>
        </md-tabs>
      </template>
    </nav-tabs-card>
  </div>
</template>
<script>
import { NavTabsCard } from '@/components';
import api from '@/services/api.js';
export default {
  components: { NavTabsCard },
  data() {
    return {
      apiRoute: `contacts/get-pending-contacts`,
      verifyRoute: `contacts/done-task`,
      result: [],
      fields: [
        {
          key: 'user',
          label: 'ชื่อผู้ส่ง',
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
    };
  },
  methods: {
    async fetch() {
      // let res = await api.get(this.apiRoute);
      // this.result = res.data;
    },
    async doneTask(id) {
      const data = {
        id: id,
      };
      let res = await api.post(this.verifyRoute, data);
      if (res.data) {
        this.fetch();
      }
    },
  },
  async mounted() {
    this.fetch();
  },
};
</script>
