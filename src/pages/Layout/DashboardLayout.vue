<template>
    <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
        <notifications></notifications>

        <side-bar
            :sidebar-item-color="sidebarBackground"
            :sidebar-background-image="sidebarBackgroundImage"
        >
            <mobile-menu slot="content"></mobile-menu>
            <div>
                <sidebar-link to="/dashboard">
                    <md-icon>dashboard</md-icon>
                    <p>Dashboard</p>
                </sidebar-link>
                <sidebar-link to="/tutorial">
                    <i class="fas fa-book"></i>
                    <p>คู่มือการใช้งาน</p>
                </sidebar-link>
                <sidebar-link
                    to="/users"
                    v-if="user && user.roles == 'SUPERADMIN'"
                >
                    <i class="fas fa-user"></i>
                    <p>ผู้ดูแลระบบ</p>
                </sidebar-link>
                <sidebar-link to="/attractions">
                    <i class="fas fa-map-marker-alt"></i>
                    <p>แหล่งท่องเที่ยว</p>
                </sidebar-link>
                <sidebar-link to="/options">
                    <i class="fas fa-cog"></i>
                    <p>ตัวเลือกเพิ่มเติ่ม</p>
                </sidebar-link>

                <sidebar-link to="/hotels">
                    <i class="fas fa-hotel"></i>
                    <p>สถานที่พัก</p>
                </sidebar-link>
                <sidebar-link to="/restaurants">
                    <i class="fas fa-utensils"></i>
                    <p>ร้านอาหาร</p>
                </sidebar-link>
                <sidebar-link to="/document">
                    <i class="fas fa-file"></i>
                    <p>เอกสารที่เกี่ยวข้อง</p>
                </sidebar-link>
                <sidebar-link to="/organization">
                    <i class="fas fa-briefcase"></i>
                    <p>หน่วยงานที่เกี่ยวข้อง</p>
                </sidebar-link>
                <sidebar-link to="/product">
                    <i class="fas fa-gift"></i>
                    <p>ผลิตภัณฑ์และสินค้า</p>
                </sidebar-link>
                <sidebar-link to="/logout">
                    <i class="fas fa-sign-out-alt"></i>
                    <p>กลับหน้าหลัก</p>
                </sidebar-link>
            </div>
        </side-bar>

        <div class="main-panel">
            <top-navbar></top-navbar>

            <dashboard-content> </dashboard-content>

            <content-footer v-if="!$route.meta.hideFooter"></content-footer>
        </div>
    </div>
</template>

<script>
import TopNavbar from './TopNavbar.vue'
import ContentFooter from './ContentFooter.vue'
import DashboardContent from './Content.vue'
import MobileMenu from '@/pages/Layout/MobileMenu.vue'

export default {
    components: {
        TopNavbar,
        DashboardContent,
        ContentFooter,
        MobileMenu,
    },
    data() {
        return {
            sidebarBackground: 'green',
            sidebarBackgroundImage: require('@/assets/img/sidebar-2.jpg'),
            user: JSON.parse(localStorage.getItem('user')),
            unAuthURL: process.env.VUE_APP_WEBSITE_URL,
        }
    },
    watch: {
        $route(to, from) {
            if (to !== from) {
                location.reload()
            }
        },
    },
    async mounted() {
        if (!this.user) {
            this.$router.push({ name: 'Login' })
        }
    },
}
</script>
