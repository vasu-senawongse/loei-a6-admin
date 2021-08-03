<template>
    <md-card>
        <md-card-header
            class="card-chart"
            :data-background-color="dataBackgroundColor"
        >
            <div :id="chartId" class="ct-chart"></div>
        </md-card-header>

        <md-card-content>
            <slot name="content">
                <h4 class="title">สถิติการค้นหา10วันล่าสุด</h4>
                <p class="category">
                    วันนี้มีผู้ค้นหาแล้วทั้งหมด
                    {{ result.length > 0 && result[result.length - 1].count }}
                    ครั้ง
                </p>
            </slot>
        </md-card-content>

        <md-card-actions md-alignment="left">
            <slot name="footer">
                <div class="stats">
                    <!-- <md-icon>access_time</md-icon>
                    {{ maxDate.date }} มีจำนวนการค้นหามากที่สุดที่
                    {{ maxDate.count }}
                    ครั้ง -->
                </div>
            </slot>
        </md-card-actions>
    </md-card>
</template>
<script>
import moment from 'moment'
import api from '@/services/api.js'
export default {
    name: 'top-date',
    props: {
        footerText: {
            type: String,
            default: '',
        },
        headerTitle: {
            type: String,
            default: 'Chart title',
        },
        chartType: {
            type: String,
            default: 'Line', // Line | Pie | Bar
        },
        chartOptions: {
            type: Object,
            default: () => {
                return {}
            },
        },
        chartResponsiveOptions: {
            type: Array,
            default: () => {
                return []
            },
        },

        dataBackgroundColor: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            chartId: 'no-id',
            apiRoute: `get-top-search-date`,
            result: [],
            maxDate: {},
            topDateChart: {
                data: {
                    labels: [],
                    series: [],
                },
                options: {
                    low: 0,
                    high: 1000,
                    axisX: {
                        showGrid: false,
                    },

                    chartPadding: {
                        top: 0,
                        right: 5,
                        bottom: 0,
                        left: 0,
                    },
                },
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
    methods: {
        /***
         * Initializes the chart by merging the chart options sent via props and the default chart options
         */
        initChart(Chartist) {
            var chartIdQuery = `#${this.chartId}`
            Chartist['Line'](
                chartIdQuery,
                this.topDateChart.data,
                this.topDateChart.options
            )
        },
        /***
         * Assigns a random id to the chart
         */
        updateChartId() {
            var currentTime = new Date().getTime().toString()
            var randomInt = this.getRandomInt(0, currentTime)
            this.chartId = `div_${randomInt}`
        },
        getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min
        },
    },
    async mounted() {
        let res = await api.get(this.apiRoute)
        this.result = res.data
        var topAttName = []
        var topAttValue = []
        this.result.forEach(i => {
            topAttName.push(moment(new Date(i.date)).format('DD/MM'))
            topAttValue.push(i.count ? i.count : 0)
        })

        this.maxDate = this.result.reduce(function(prev, current) {
            return prev.count > current.count ? prev : current
        })
        this.maxDate.date = moment(new Date(this.maxDate.date)).format('DD/MM')

        this.topDateChart.data.labels = topAttName
        this.topDateChart.data.series.push(topAttValue)
        this.topDateChart.options.high = topAttValue[0]
        if (this.topDateChart.options.high < 10) {
            this.topDateChart.options.high = 10
        } else if (this.topDateChart.options.high < 100) {
            this.topDateChart.options.high = 100
        } else {
            this.topDateChart.options.low = 0
            this.topDateChart.options.high + 100
        }
        await this.updateChartId()
        import('chartist').then(Chartist => {
            let ChartistLib = Chartist.default || Chartist
            this.$nextTick(() => {
                this.initChart(ChartistLib)
            })
        })
    },
}
</script>
