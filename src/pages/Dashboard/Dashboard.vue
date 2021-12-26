<template>
    <div class="content">
        <div class="md-layout">
            <div
                class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-50"
            >
                <top-attraction
                    :chart-options="topSearchChart.options"
                    :chart-responsive-options="topSearchChart.responsiveOptions"
                    :chart-type="'Bar'"
                    data-background-color="green"
                >
                </top-attraction>
            </div>

            <div
                class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-50"
            >
                <top-search
                    :chart-options="topAttractionChart.options"
                    :chart-responsive-options="
                        topAttractionChart.responsiveOptions
                    "
                    :chart-type="'Bar'"
                    data-background-color="green"
                >
                </top-search>
            </div>
            <div
                class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
            >
                <stats-card data-background-color="green">
                    <template slot="header">
                        <i class="fas fa-map-marker-alt"></i>
                    </template>

                    <template slot="content">
                        <p class="category">แหล่งท่องเที่ยว</p>
                        <h3 class="title">
                            {{ result && result.attraction }}
                            <small>แห่ง</small>
                        </h3>
                    </template>
                </stats-card>
            </div>
            <div
                class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
            >
                <stats-card data-background-color="orange">
                    <template slot="header">
                        <i class="fas fa-hotel"></i>
                    </template>

                    <template slot="content">
                        <p class="category">โรงแรม</p>
                        <h3 class="title">
                            {{ result && result.hotel }}
                            <small>แห่ง</small>
                        </h3>
                    </template>
                </stats-card>
            </div>
            <div
                class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
            >
                <stats-card data-background-color="red">
                    <template slot="header">
                        <i class="fas fa-utensils"></i>
                    </template>

                    <template slot="content">
                        <p class="category">ร้านอาหาร</p>
                        <h3 class="title">
                            {{ result && result.restaurant }}
                            <small>แห่ง</small>
                        </h3>
                    </template>
                </stats-card>
            </div>
            <div
                class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
            >
                <stats-card data-background-color="blue">
                    <template slot="header">
                        <i class="fa fa-search"></i>
                    </template>

                    <template slot="content">
                        <p class="category">จำนวนการค้นหารวม</p>
                        <h3 class="title">
                            {{ result && result.search }}
                            <small>ครั้ง</small>
                        </h3>
                    </template>
                </stats-card>
            </div>

            <div
                class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
            >
                <Contact></Contact>
            </div>
        </div>
    </div>
</template>

<script>
import { StatsCard } from '@/components'
import Contact from './panel/Contact'
import api from '@/services/api.js'
import TopAttraction from './panel/TopAttraction.vue'
import TopSearch from './panel/TopSearch.vue'
export default {
    components: {
        StatsCard,
        TopAttraction,
        Contact,
        TopSearch,
        TopDate,
    },
    data() {
        return {
            apiRoute: `get-system-overview`,
            result: {},
            topDateChart: {
                options: {
                    lineSmooth: this.$Chartist.Interpolation.cardinal({
                        tension: 0,
                    }),
                    low: 0,
                    high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
                    chartPadding: {
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                    },
                },
            },
            topSearchChart: {
                responsiveOptions: [
                    [
                        'screen and (max-width: 640px)',
                        {
                            seriesBarDistance: 5,
                            axisX: {
                                labelInterpolationFnc: function(value) {
                                    return value[0]
                                },
                            },
                        },
                    ],
                ],
            },
            topAttractionChart: {
                responsiveOptions: [
                    [
                        'screen and (max-width: 640px)',
                        {
                            seriesBarDistance: 5,
                            axisX: {
                                labelInterpolationFnc: function(value) {
                                    return value[0]
                                },
                            },
                        },
                    ],
                ],
            },
        }
    },
    async created() {
        let res = await api.get(this.apiRoute)
        this.result = res.data
    },
}
</script>
