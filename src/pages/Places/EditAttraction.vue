<template>
    <div class="content">
        <div class="md-layout">
            <div class="md-layout-item md-medium-size-100 md-size-50">
                <template>
                    <form>
                        <md-card>
                            <md-card-header data-background-color="orange">
                                <h4 class="title">
                                    แก้ไขข้อมูลแหล่งท่องเที่ยว
                                </h4>
                            </md-card-header>

                            <md-card-content>
                                <label for="name">ชื่อแหล่งท่องเที่ยว</label>
                                <b-input
                                    v-model="name"
                                    placeholder="ชื่อแหล่งท่องเที่ยว"
                                    class="mb-3"
                                />

                                <label for="district">อำเภอ</label>
                                <b-select
                                    alternative
                                    v-model="district"
                                    :options="options"
                                    @change="subDistrict = ''"
                                    class="mb-3"
                                />

                                <label for="subDistrict">ตำบล</label>
                                <b-select
                                    alternative
                                    v-model="subDistrict"
                                    :options="
                                        subOptions.filter(
                                            i =>
                                                i.district == district ||
                                                i.district == ''
                                        )
                                    "
                                    class="mb-3"
                                />

                                <label for="category"
                                    >ประเภทแหล่งท่องเที่ยว</label
                                >
                                <md-select
                                    v-model="category"
                                    class="mb-3"
                                    multiple
                                    name="category"
                                    id="category"
                                >
                                    <div
                                        v-for="m in types"
                                        v-bind:key="m.value"
                                    >
                                        <md-option :value="m.value">{{
                                            m.text
                                        }}</md-option>
                                    </div>
                                </md-select>

                                <label for="lat">Latitude</label>
                                <b-input
                                    v-model="lat"
                                    placeholder="Latitude"
                                    class="mb-3"
                                />

                                <label for="lon">Lontitude</label>
                                <b-input
                                    v-model="lon"
                                    placeholder="Lontitude"
                                    class="mb-3"
                                />

                                <label for="name">register/ประกาศ</label>

                                <b-input
                                    v-model="register"
                                    placeholder="การขึ้นทะเบียน/ประกาศ"
                                    class="mb-3"
                                />

                                <label for="Physical">ข้อมูลทางกายภาพ</label>
                                <quill-editor
                                    class="mb-3"
                                    ref="Physical"
                                    v-model="physical"
                                    :options="{
                                        placeholder: 'ข้อมูลทางกายภาพ ...',
                                        theme: 'snow',
                                    }"
                                />

                                <label for="Nature"
                                    >ข้อมูลคุณค่าทางธรรมชาติ</label
                                >
                                <quill-editor
                                    class="mb-3"
                                    ref="Nature"
                                    v-model="nature"
                                    :options="{
                                        placeholder:
                                            'ข้อมูลคุณค่าทางธรรมชาติ ...',
                                        theme: 'snow',
                                    }"
                                />

                                <label for="Geo"
                                    >ข้อมูลทางธรณีวิทยาและซากดึกดำบรรพ์</label
                                >
                                <quill-editor
                                    class="mb-3"
                                    ref="Geo"
                                    v-model="geo"
                                    :options="{
                                        placeholder:
                                            'ข้อมูลทางธรณีวิทยาและซากดึกดำบรรพ์ ...',
                                        theme: 'snow',
                                    }"
                                />

                                <label for="Eco">ข้อมูลทางนิเวศวิทยา</label>

                                <quill-editor
                                    class="mb-3"
                                    ref="Eco"
                                    v-model="eco"
                                    :options="{
                                        placeholder: 'ข้อมูลทางนิเวศวิทยา ...',
                                        theme: 'snow',
                                    }"
                                />

                                <label for="Biodiversity"
                                    >ข้อมูลความหลากหลายทางชีวภาพ</label
                                >

                                <quill-editor
                                    class="mb-3"
                                    ref="Biodiversity"
                                    v-model="biodiversity"
                                    :options="{
                                        placeholder:
                                            'ข้อมูลความหลากหลายทางชีวภาพ ...',
                                        theme: 'snow',
                                    }"
                                />

                                <label for="History"
                                    >ข้อมูลทางประวัติศาสตร์</label
                                >

                                <quill-editor
                                    class="mb-3"
                                    ref="History"
                                    v-model="history"
                                    :options="{
                                        placeholder:
                                            'ข้อมูลทางประวัติศาสตร์ ...',
                                        theme: 'snow',
                                    }"
                                />

                                <label for="Myth"
                                    >ข้อมูลตำนานและเรื่องเล่า</label
                                >
                                <quill-editor
                                    class="mb-3"
                                    ref="Myth"
                                    v-model="myth"
                                    :options="{
                                        placeholder:
                                            'ข้อมูลตำนานและเรื่องเล่า ...',
                                        theme: 'snow',
                                    }"
                                />

                                <label for="Culture"
                                    >ข้อมูลมรดกทางวัฒนธรรม</label
                                >
                                <quill-editor
                                    class="mb-3"
                                    ref="Culture"
                                    v-model="culture"
                                    :options="{
                                        placeholder:
                                            'ข้อมูลมรดกทางวัฒนธรรม ...',
                                        theme: 'snow',
                                    }"
                                />

                                <label for="Festival"
                                    >ข้อมูลงานประเพณีและเทศกาล</label
                                >

                                <quill-editor
                                    class="mb-3"
                                    ref="Festival"
                                    v-model="festival"
                                    :options="{
                                        placeholder:
                                            'ข้อมูลงานประเพณีและเทศกาล ...',
                                        theme: 'snow',
                                    }"
                                />

                                <label for="creativetourism"
                                    >ข้อมูลการท่องเที่ยวสร้างสรรค์</label
                                >
                                <quill-editor
                                    class="mb-3"
                                    ref="creativetourism"
                                    v-model="creativetourism"
                                    :options="{
                                        placeholder:
                                            'ข้อมูลการท่องเที่ยวสร้างสรรค์ ...',
                                        theme: 'snow',
                                    }"
                                />

                                <label for="storytelling"
                                    >ข้อมูล Story Telling</label
                                >
                                <quill-editor
                                    class="mb-3"
                                    ref="storytelling"
                                    v-model="storytelling"
                                    :options="{
                                        placeholder: 'ข้อมูล Story Telling ...',
                                        theme: 'snow',
                                    }"
                                />
                                <label for="etc">ข้อมูลน่าสนใจอื่นๆ</label>
                                <quill-editor
                                    class="mb-3"
                                    ref="etc"
                                    v-model="etc"
                                    :options="{
                                        placeholder: 'ข้อมูลน่าสนใจอื่นๆ ...',
                                        theme: 'snow',
                                    }"
                                />

                                <label for="attraction">สิ่งดึงดูดใจ</label>

                                <quill-editor
                                    class="mb-3"
                                    ref="attraction"
                                    v-model="attraction"
                                    :options="{
                                        placeholder: 'สิ่งดึงดูดใจ ...',
                                        theme: 'snow',
                                    }"
                                />

                                <label for="accessibility"
                                    >การเดินทางมายังแหล่งท่องเที่ยว</label
                                >
                                <quill-editor
                                    class="mb-3"
                                    ref="accessibility"
                                    v-model="accessibility"
                                    :options="{
                                        placeholder:
                                            'การเดินทางมายังแหล่งท่องเที่ยว ...',
                                        theme: 'snow',
                                    }"
                                />

                                <label for="accommodation"
                                    >การบริการที่พัก</label
                                >
                                <quill-editor
                                    class="mb-3"
                                    ref="accommodation"
                                    v-model="accommodation"
                                    :options="{
                                        placeholder: 'การบริการที่พัก ...',
                                        theme: 'snow',
                                    }"
                                />
                                <md-field>
                                    <label for="activities"
                                        >กิจกรรมการท่องเที่ยว</label
                                    >
                                    <md-select
                                        v-model="activities"
                                        class="mb-3"
                                        multiple
                                        name="activities"
                                        id="activities"
                                    >
                                        <div
                                            v-for="m in actList"
                                            v-bind:key="'act-' + m.value"
                                        >
                                            <md-option :value="m.value">{{
                                                m.text
                                            }}</md-option>
                                        </div>
                                    </md-select>
                                </md-field>

                                <md-field>
                                    <label for="amenities"
                                        >สิ่งอำนวยความสะดวก</label
                                    >
                                    <md-select
                                        v-model="amenities"
                                        class="mb-3"
                                        multiple
                                        name="amenities"
                                        id="amenities"
                                    >
                                        <div
                                            v-for="m in amenList"
                                            v-bind:key="'amen-' + m.value"
                                        >
                                            <md-option :value="m.value">{{
                                                m.text
                                            }}</md-option>
                                        </div>
                                    </md-select>
                                </md-field>

                                <md-field>
                                    <label for="months">เดือนท่องเที่ยว</label>
                                    <md-select
                                        v-model="travelMonths"
                                        class="mb-3"
                                        multiple
                                        name="months"
                                        id="months"
                                    >
                                        <div
                                            v-for="m in months"
                                            v-bind:key="m.value"
                                        >
                                            <md-option :value="m.value">{{
                                                m.text
                                            }}</md-option>
                                        </div>
                                    </md-select>
                                </md-field>

                                <label for="org"
                                    >ชื่อหน่วยงานที่รับผิดชอบ</label
                                >
                                <b-input
                                    v-model="org"
                                    placeholder="ชื่อหน่วยงานที่รับผิดชอบ"
                                    class="mb-3"
                                />
                                <label for="phone">เบอร์ติดต่อหน่วยงาน</label>
                                <b-input
                                    v-model="phone"
                                    placeholder="เบอร์ติดต่อหน่วยงาน"
                                    class="mb-3"
                                />

                                <b-button variant="warning" @click="update">
                                    บันทึก
                                </b-button>
                            </md-card-content>
                        </md-card>
                    </form>
                </template>
            </div>
            <div class="md-layout-item md-medium-size-100 md-size-50">
                <div class="md-layout-item md-medium-size-100 md-size-100">
                    <template>
                        <form>
                            <md-card>
                                <md-card-header data-background-color="orange">
                                    <h4 class="title">
                                        แกลอรี่รูปภาพ
                                    </h4>
                                </md-card-header>

                                <md-card-content>
                                    <b-form-file
                                        :browse-text="'เลือกรูป'"
                                        accept="image/*"
                                        placeholder="เลือกไฟล์ หรือ ลากไฟล์มาวาง"
                                        v-model="thumbnail"
                                        class="mb-3 mr-1"
                                        style="width:75%"
                                    ></b-form-file>
                                    <b-button
                                        variant="info"
                                        @click="upload"
                                        :disabled="thumbnail == null"
                                    >
                                        อัพโหลด
                                    </b-button>

                                    <b-table
                                        :items="gallery"
                                        :fields="fields"
                                        id="image-list"
                                        :per-page="perPage"
                                        :current-page="currentPage"
                                        hover
                                        striped
                                        small
                                        responsive
                                        sort-icon-left
                                        style="width: 100%"
                                    >
                                        <template v-slot:cell(img)="data">
                                            <div style="width: 180px">
                                                <img
                                                    :src="
                                                        imgPath + data.item.img
                                                    "
                                                    class="mb-3 fit-image"
                                                />
                                            </div>
                                        </template>

                                        <template v-slot:cell(btn)="data">
                                            <b-button
                                                class="m-1"
                                                variant="warning"
                                                :disabled="data.item.img == img"
                                                @click="
                                                    selectThumbnail(
                                                        data.item.img
                                                    )
                                                "
                                            >
                                                ตั้งเป็นรูปปก
                                            </b-button>

                                            <b-button
                                                class="m-1"
                                                variant="danger"
                                                :disabled="data.item.img == img"
                                                @click="deleteImage(data.item)"
                                            >
                                                ลบ
                                            </b-button>
                                        </template>
                                    </b-table>
                                    <b-pagination
                                        v-model="currentPage"
                                        :total-rows="gallery.length"
                                        :per-page="perPage"
                                        aria-controls="image-list"
                                        style="float:right"
                                    ></b-pagination>
                                </md-card-content>
                            </md-card>
                        </form>
                    </template>
                </div>
                <div class="md-layout-item md-medium-size-100 md-size-100">
                    <template>
                        <form>
                            <md-card>
                                <md-card-header data-background-color="orange">
                                    <h4 class="title">
                                        เอกสารที่เกี่ยวข้อง
                                    </h4>
                                </md-card-header>

                                <md-card-content>
                                    <b-form-file
                                        :browse-text="'เลือกไฟล์'"
                                        placeholder="เลือกไฟล์ หรือ ลากไฟล์มาวาง"
                                        v-model="file"
                                        class="mb-3 mr-1"
                                        style="width:75%"
                                    ></b-form-file>
                                    <b-button
                                        variant="info"
                                        @click="uploadMaterial"
                                        :disabled="file == null"
                                    >
                                        อัพโหลด
                                    </b-button>

                                    <b-table
                                        :items="material"
                                        :fields="fields2"
                                        id="material-list"
                                        :per-page="perPage"
                                        :current-page="matPage"
                                        hover
                                        striped
                                        small
                                        responsive
                                        sort-icon-left
                                        style="width: 100%"
                                    >
                                        <template v-slot:cell(name)="data">
                                            <div style="width: 180px">
                                                {{ data.item.file }}
                                            </div>
                                        </template>

                                        <template v-slot:cell(btn)="data">
                                            <b-button
                                                class="m-1"
                                                variant="danger"
                                                :disabled="data.item.img == img"
                                                @click="
                                                    deleteMaterial(data.item)
                                                "
                                            >
                                                ลบ
                                            </b-button>
                                        </template>
                                    </b-table>
                                    <b-pagination
                                        v-model="matPage"
                                        :total-rows="material.length"
                                        :per-page="perPage"
                                        aria-controls="material-list"
                                        style="float:right"
                                    ></b-pagination>
                                </md-card-content>
                            </md-card>
                        </form>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import api from '@/services/api.js'
export default {
    components: {},
    data() {
        return {
            currentPage: 1,
            matPage: 1,
            perPage: 10,
            travelMonths: [],
            name: '',
            district: '',
            subDistrict: '',
            img: '',
            category: [],
            physical: '',
            nature: '',
            thumbnail: null,
            file: null,
            history: '',
            culture: '',
            lat: '',
            lon: '',
            register: '',
            org: '',
            phone: '',
            attraction: '',
            accessibility: '',
            accommodation: '',
            geo: '',
            eco: '',
            biodiversity: '',
            myth: '',
            festival: '',
            creativetourism: '',
            storytelling: '',
            etc: '',
            activities: [],
            amenities: [],
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

            subOptions: [
                { text: '-- ตำบล --', value: '', disabled: true, district: '' },
                { text: 'เชียงคาน', value: 'เชียงคาน', district: 'เชียงคาน' },
                { text: 'ธาตุ', value: 'ธาตุ', district: 'เชียงคาน' },
                { text: 'นาซ่าว', value: 'นาซ่าว', district: 'เชียงคาน' },
                { text: 'เขาแก้ว', value: 'เขาแก้ว', district: 'เชียงคาน' },
                { text: 'ปากตม', value: 'ปากตม', district: 'เชียงคาน' },
                { text: 'บุฮม', value: 'บุฮม', district: 'เชียงคาน' },
                { text: 'จอมศรี', value: 'จอมศรี', district: 'เชียงคาน' },
                {
                    text: 'หาดทรายขาว',
                    value: 'หาดทรายขาว',
                    district: 'เชียงคาน',
                },
                { text: 'กุดป่อง', value: 'กุดป่อง', district: 'เมืองเลย' },
                { text: 'เมือง', value: 'เมือง', district: 'เมืองเลย' },
                { text: 'นาอ้อ', value: 'นาอ้อ', district: 'เมืองเลย' },
                { text: 'กกดู่', value: 'กกดู่', district: 'เมืองเลย' },
                { text: 'น้ำหมาน', value: 'น้ำหมาน', district: 'เมืองเลย' },
                { text: 'เสี้ยว', value: 'เสี้ยว', district: 'เมืองเลย' },
                { text: 'นาอาน', value: 'นาอาน', district: 'เมืองเลย' },
                { text: 'นาโป่ง', value: 'นาโป่ง', district: 'เมืองเลย' },
                { text: 'นาดินดำ', value: 'นาดินดำ', district: 'เมืองเลย' },
                { text: 'น้ำสวย', value: 'น้ำสวย', district: 'เมืองเลย' },
                { text: 'ชัยพฤกษ์', value: 'ชัยพฤกษ์', district: 'เมืองเลย' },
                { text: 'นาแขม', value: 'นาแขม', district: 'เมืองเลย' },
                { text: 'ศรีสองรัก', value: 'ศรีสองรัก', district: 'เมืองเลย' },
                { text: 'กกทอง', value: 'กกทอง', district: 'เมืองเลย' },
                {
                    text: 'ผาอินทร์แปลง',
                    value: 'ผาอินทร์แปลง',
                    district: 'เอราวัณ',
                },
                { text: 'เอราวัณ', value: 'เอราวัณ', district: 'เอราวัณ' },
                { text: 'ผาสามยอด', value: 'ผาสามยอด', district: 'เอราวัณ' },
                {
                    text: 'ทรัพย์ไพวัลย์',
                    value: 'ทรัพย์ไพวัลย์',
                    district: 'เอราวัณ',
                },
                { text: 'ด่านซ้าย', value: 'ด่านซ้าย', district: 'ด่านซ้าย' },
                { text: 'ปากหมัน', value: 'ปากหมัน', district: 'ด่านซ้าย' },
                { text: 'นาดี', value: 'นาดี', district: 'ด่านซ้าย' },
                { text: 'โคกงาม', value: 'โคกงาม', district: 'ด่านซ้าย' },
                { text: 'โพนสูง', value: 'โพนสูง', district: 'ด่านซ้าย' },
                { text: 'อิปุ่ม', value: 'อิปุ่ม', district: 'ด่านซ้าย' },
                { text: 'กกสะทอน', value: 'กกสะทอน', district: 'ด่านซ้าย' },
                { text: 'โป่ง', value: 'โป่ง', district: 'ด่านซ้าย' },
                { text: 'วังยาว', value: 'วังยาว', district: 'ด่านซ้าย' },
                { text: 'นาหอ', value: 'นาหอ', district: 'ด่านซ้าย' },
                { text: 'ท่าลี่', value: 'ท่าลี่', district: 'ท่าลี่' },
                { text: 'หนองผือ', value: 'หนองผือ', district: 'ท่าลี่' },
                { text: 'อาฮี', value: 'อาฮี', district: 'ท่าลี่' },
                { text: 'น้ำแคม', value: 'น้ำแคม', district: 'ท่าลี่' },
                { text: 'โคกใหญ่', value: 'โคกใหญ่', district: 'ท่าลี่' },
                { text: 'น้ำทูน', value: 'น้ำทูน', district: 'ท่าลี่' },
                { text: 'นาแห้ว', value: 'นาแห้ว', district: 'นาแห้ว' },
                { text: 'แสงภา', value: 'แสงภา', district: 'นาแห้ว' },
                { text: 'นาพึง', value: 'นาพึง', district: 'นาแห้ว' },
                { text: 'นามาลา', value: 'นามาลา', district: 'นาแห้ว' },
                { text: 'เหล่ากอหก', value: 'เหล่ากอหก', district: 'นาแห้ว' },
                { text: 'นาด้วง', value: 'นาด้วง', district: 'นาด้วง' },
                { text: 'นาดอกคำ', value: 'นาดอกคำ', district: 'นาด้วง' },
                { text: 'ท่าสะอาด', value: 'ท่าสะอาด', district: 'นาด้วง' },
                { text: 'ท่าสวรรค์', value: 'ท่าสวรรค์', district: 'นาด้วง' },
                { text: 'ปากชม', value: 'ปากชม', district: 'ปากชม' },
                { text: 'เชียงกลม', value: 'เชียงกลม', district: 'ปากชม' },
                { text: 'หาดคัมภีร์', value: 'หาดคัมภีร์', district: 'ปากชม' },
                { text: 'ห้วยบ่อซืน', value: 'ห้วยบ่อซืน', district: 'ปากชม' },
                { text: 'ห้วยพิชัย', value: 'ห้วยพิชัย', district: 'ปากชม' },
                { text: 'ชมเจริญ', value: 'ชมเจริญ', district: 'ปากชม' },
                { text: 'ผาขาว', value: 'ผาขาว', district: 'ผาขาว' },
                {
                    text: 'ท่าช้างคล้อง',
                    value: ' ท่าช้างคล้อง',
                    district: 'ผาขาว',
                },
                { text: 'โนนปอแดง', value: 'โนนปอแดง', district: 'ผาขาว' },
                { text: 'โนนป่าซาง', value: 'โนนป่าซาง', district: 'ผาขาว' },
                { text: 'บ้านเพิ่ม', value: 'บ้านเพิ่ม', district: 'ผาขาว' },
                { text: 'หนองบัว', value: 'หนองบัว', district: 'ภูเรือ' },
                { text: 'ท่าศาลา', value: 'ท่าศาลา', district: 'ภูเรือ' },
                { text: 'ร่องจิก', value: 'ร่องจิก', district: 'ภูเรือ' },
                { text: 'ปลาบ่า', value: 'ปลาบ่า', district: 'ภูเรือ' },
                { text: 'ลาดค่าง', value: 'ลาดค่าง', district: 'ภูเรือ' },
                { text: 'สานตม', value: 'สานตม', district: 'ภูเรือ' },
                { text: 'ศรีฐาน', value: 'ศรีฐาน', district: 'ภูกระดึง' },
                { text: 'ผานกเค้า', value: 'ผานกเค้า', district: 'ภูกระดึง' },
                { text: 'ภูกระดึง', value: 'ภูกระดึง', district: 'ภูกระดึง' },
                { text: 'ห้วยส้ม', value: 'ห้วยส้ม', district: 'ภูกระดึง' },
                { text: 'ภูหอ', value: 'ภูหอ', district: 'ภูหลวง' },
                { text: 'หนองคัน', value: 'หนองคัน', district: 'ภูหลวง' },
                {
                    text: 'ห้วยสีเสียด',
                    value: 'ห้วยสีเสียด',
                    district: 'ภูหลวง',
                },
                { text: 'เลยวังไสย์', value: 'เลยวังไสย์', district: 'ภูหลวง' },
                {
                    text: 'แก่งศรีภูมิ',
                    value: 'แก่งศรีภูมิ',
                    district: 'ภูหลวง',
                },
                { text: 'วังสะพุง', value: 'วังสะพุง', district: 'วังสะพุง' },
                { text: 'ผาน้อย', value: 'ผาน้อย', district: 'วังสะพุง' },
                { text: 'ทรายขาว', value: 'ทรายขาว', district: 'วังสะพุง' },
                { text: 'ผาบิ้ง', value: 'ผาบิ้ง', district: 'วังสะพุง' },
                {
                    text: 'หนองหญ้าปล้อง',
                    value: 'หนองหญ้าปล้อง',
                    district: 'วังสะพุง',
                },
                { text: 'เขาหลวง', value: 'เขาหลวง', district: 'วังสะพุง' },
                { text: 'หนองงิ้ว', value: 'หนองงิ้ว', district: 'วังสะพุง' },
                { text: 'โคกขมิ้น', value: 'โคกขมิ้น', district: 'วังสะพุง' },
                { text: 'ปากปวน', value: 'ปากปวน', district: 'วังสะพุง' },
                { text: 'ศรีสงคราม', value: 'ศรีสงคราม', district: 'วังสะพุง' },
                { text: 'หนองหิน', value: 'หนองหิน', district: 'หนองหิน' },
                { text: 'ตาดข่า', value: 'ตาดข่า', district: 'หนองหิน' },
                { text: 'ปวนพุ', value: 'ปวนพุ', district: 'หนองหิน' },
            ],

            months: [
                {
                    value: '1',
                    text: 'มกราคม',
                },
                {
                    value: '2',
                    text: 'กุมภาพันธ์',
                },
                {
                    value: '3',
                    text: 'มีนาคม',
                },
                {
                    value: '4',
                    text: 'เมษายน',
                },
                {
                    value: '5',
                    text: 'พฤษภาคม',
                },
                {
                    value: '6',
                    text: 'มิถุนายน',
                },
                {
                    value: '7',
                    text: 'กรกฎาคม',
                },
                {
                    value: '8',
                    text: 'สิงหาคม',
                },
                {
                    value: '9',
                    text: 'กันยายน',
                },
                {
                    value: '10',
                    text: 'ตุลาคม',
                },

                {
                    value: '11',
                    text: 'พฤศจิกายน',
                },
                {
                    value: '12',
                    text: 'ธันวาคม',
                },
            ],
            fields2: [
                {
                    key: 'name',
                    label: 'ไฟล์',
                },

                {
                    key: 'btn',
                    label: '',
                },
            ],
            fields: [
                {
                    key: 'img',
                    label: 'รูปภาพ',
                },
                {
                    key: 'img_order',
                    label: 'ลำดับภาพ',
                    sortable: true,
                },
                {
                    key: 'btn',
                    label: '',
                },
            ],
            types: [],
            actList: [],
            amenList: [],
            material: [],
            uploadRoute: '/upload',
            insertRoute: `attractions/insert-attraction-image`,
            insertMatRoute: `attractions/insert-attraction-document`,
            deleteRoute: `attractions/delete-attraction-image`,
            deleteMatRoute: `attractions/delete-attraction-document`,
            selectRoute: `attractions/select-attraction-thumbnail`,
            amenRoute: `amenities/get-amenities`,
            actRoute: `activities/get-activities`,
            path: 'public/images/attractions',
            imgPath:
                process.env.VUE_APP_IMAGE_STORAGE_URL ||
                'http://localhost:5000/images',

            imgRoute: `attractions/get-attraction-gallery-by-id/${this.$route.params.id}`,
            matRoute: `attractions/get-attraction-material-by-id/${this.$route.params.id}`,
            gallery: [],
        }
    },
    methods: {
        async selectThumbnail(img) {
            var model = {
                img: img,
                id: this.id,
            }
            await api.post(this.selectRoute, model)
            let res = await api.get(this.apiRoute)
            this.result = res.data
            this.img = this.result.img
        },

        async upload() {
            var model = {
                img: `attractions/${this.id}/${this.thumbnail.name}`,
                attraction: this.id,
                order: this.gallery[this.gallery.length - 1].img_order + 1,
            }
            await api.post(this.insertRoute, model)
            let formData = new FormData()
            formData.append('path', `${this.path}/${this.id}`)
            formData.append('name', this.thumbnail.name)
            formData.append('file', this.thumbnail)
            let res = await api
                .post(this.uploadRoute, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then(resss => {
                    this.thumbnail = null
                    this.fetchImg()
                })
                .catch(err => {
                    if (err.resss.status === 400);
                    this.$swal(err.resss.data, '', 'error')
                })
        },

        async uploadMaterial() {
            var model = {
                file: this.file.name,
                path: `attractions/${this.id}/${this.file.name}`,
                attraction: this.id,
                m_order:
                    this.material.length == 0
                        ? '0'
                        : this.material[this.material.length - 1].order + 1,
            }
            await api.post(this.insertMatRoute, model)
            let formData = new FormData()
            formData.append('path', `${this.path}/${this.id}`)
            formData.append('name', this.file.name)
            formData.append('file', this.file)
            let res = await api
                .post(this.uploadRoute, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then(resss => {
                    this.file = null
                    this.fetchMaterial()
                })
                .catch(err => {
                    if (err.resss.status === 400);
                    this.$swal(err.resss.data, '', 'error')
                })
        },

        async deleteImage(img) {
            this.$swal({
                title: 'ยืนยันลบรูป',
                showDenyButton: true,
                confirmButtonText: `ยืนยัน`,
                denyButtonText: `ยกเลิก`,
                allowOutsideClick: false,
            }).then(result => {
                if (result.isConfirmed) {
                    let resSubmit = api
                        .delete(this.deleteRoute, img)
                        .then(result => {
                            this.$swal({
                                title: 'ลบรูปแล้ว',
                                icon: 'success',
                                confirmButtonText: 'ตกลง',
                                allowOutsideClick: false,
                            }).then(result => {
                                /* Read more about isConfirmed, isDenied below */
                                if (result.isConfirmed) {
                                    this.fetchImg()
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

        async deleteMaterial(mat) {
            this.$swal({
                title: 'ยืนยันลบเอกสาร',
                showDenyButton: true,
                confirmButtonText: `ยืนยัน`,
                denyButtonText: `ยกเลิก`,
                allowOutsideClick: false,
            }).then(result => {
                if (result.isConfirmed) {
                    let resSubmit = api
                        .delete(this.deleteMatRoute, mat)
                        .then(result => {
                            this.$swal({
                                title: 'ลบเอกสารแล้ว',
                                icon: 'success',
                                confirmButtonText: 'ตกลง',
                                allowOutsideClick: false,
                            }).then(result => {
                                /* Read more about isConfirmed, isDenied below */
                                if (result.isConfirmed) {
                                    this.fetchMaterial()
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

        async update() {
            var model = {
                id: this.id,
                name: this.name,
                district: this.district,
                subDistrict: this.subDistrict,
                category: this.category.join(),
                lat: this.lat,
                lon: this.lon,
                register: this.register,
                physical: this.physical,
                nature: this.nature,
                history: this.history,
                culture: this.culture,
                attraction: this.attraction,
                accessibility: this.accessibility,
                accommodation: this.accommodation,
                geo: this.geo,
                eco: this.eco,
                biodiversity: this.biodiversity,
                myth: this.myth,
                festival: this.festival,
                creativetourism: this.creativetourism,
                storytelling: this.storytelling,
                etc: this.etc,
                activities: this.activities.join(),
                amenities: this.amenities.join(),
                month: this.travelMonths.join(),
                org: this.org,
                phone: this.phone,
                updatedAt: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
            }
            this.$swal({
                title: 'แก้ไขข้อมูล',
                text: this.name,
                showDenyButton: true,
                confirmButtonText: `ยืนยัน`,
                denyButtonText: `ยกเลิก`,
                allowOutsideClick: false,
            }).then(result => {
                if (result.isConfirmed) {
                    let resSubmit = api
                        .post(this.editRoute, model)
                        .then(result => {
                            this.$swal({
                                title: 'แก้ไขข้อมูลแล้ว',
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

        async fetchImg() {
            let res2 = await api.get(this.imgRoute)
            this.gallery = res2.data
        },

        async fetchMaterial() {
            let res = await api.get(this.matRoute)
            this.material = res.data
        },

        async fetchAct() {
            let res = await api.get(this.actRoute)
            res.data.forEach(i => {
                this.actList.push({ text: i.name, value: i.name })
            })
        },

        async fetchAmen() {
            let res = await api.get(this.amenRoute)
            res.data.forEach(i => {
                this.amenList.push({ text: i.name, value: i.name })
            })
        },
        async fetch() {
            let res = await api.get(this.apiRoute)
            this.result = res.data
            let res2 = await api.get('attractions/get-attraction-types')
            res2.data.forEach(i => {
                this.types.push({ text: i.name, value: i.name })
            })
            this.name = this.result.name
            this.img = this.result.img
            this.district = this.result.district
            this.subDistrict = this.result.subDistrict
            this.register = this.result.register
            this.category =
                this.result.category && this.result.category.split(',')
            this.physical = this.result.physical
            this.lat = this.result.lat
            this.lon = this.result.lon
            this.nature = this.result.nature
            this.history = this.result.history
            this.culture = this.result.culture
            this.attraction = this.result.attraction
            this.accessibility = this.result.accessibility
            this.accommodation = this.result.accommodation
            this.amenities =
                this.result.amenities && this.result.amenities.split(',')
            this.activities =
                this.result.activities && this.result.activities.split(',')
            this.travelMonths =
                this.result.month && this.result.month.split(',')
            this.org = this.result.org
            this.phone = this.result.phone
            this.geo = this.result.geo
            this.eco = this.result.eco
            this.biodiversity = this.result.biodiversity
            this.myth = this.result.myth
            this.festival = this.result.festival
            this.creativetourism = this.result.creativetourism
            this.storytelling = this.result.storytelling
            this.etc = this.result.etc
        },
    },

    async mounted() {
        this.fetch()
        this.fetchImg()
        this.fetchAmen()
        this.fetchAct()
        this.fetchMaterial()
    },
}
</script>
<style type="text/css">
.fit-image {
    width: 100%;
    object-fit: cover;
    height: auto; /* only if you want fixed height */
}
.md-menu-content {
    max-width: 500px !important;
}
</style>
