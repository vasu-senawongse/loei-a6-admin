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
                <sidebar-link to="/attractions">
                    <i class="fas fa-map-marker-alt"></i>
                    <p>แหล่งท่องเที่ยว</p>
                </sidebar-link>
                <sidebar-link to="/options">
                    <i class="fas fa-map-marker-alt"></i>
                    <p>ตัวเลือกเพิ่มเติ่ม</p>
                </sidebar-link>

                <sidebar-link to="/hotels">
                    <i class="fas fa-hotel"></i>
                    <p>ที่พัก</p>
                </sidebar-link>
                <sidebar-link to="/restaurants">
                    <i class="fas fa-utensils"></i>
                    <p>ร้านอาหาร</p>
                </sidebar-link>
                <sidebar-link to="/logout">
                    <i class="fas fa-sign-out-alt"></i>
                    <p>กลับหน้าหลัก</p>
                </sidebar-link>
            </div>
        </side-bar>

        <div class="main-panel">
            <top-navbar></top-navbar>

            <fixed-plugin
                :color.sync="sidebarBackground"
                :image.sync="sidebarBackgroundImage"
            >
            </fixed-plugin>

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
import FixedPlugin from './Extra/FixedPlugin.vue'

export default {
    components: {
        TopNavbar,
        DashboardContent,
        ContentFooter,
        MobileMenu,
        FixedPlugin,
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
        // if (!this.user || !this.user.roles.includes('ADMIN')) {
        //   this.$router.push({ name: 'Login' });
        // }
    },
}
</script>
