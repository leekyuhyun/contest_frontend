<template>
    <div class="timeline-slider">
        <h3 class="font-semibold mb-2">시간대 선택</h3>
        <Slider v-if="timestamps.length > 0" v-model="selected" :min="0" :max="timestamps.length - 1" :marks="marks"
            :tooltips="true" :format="formatTimeFromIndex" :lazy="false" @change="handleChange"
            tooltipPosition="bottom" />
        <div v-if="timestamps.length > 0" class="d-flex justify-content-between mt-5 w-full fw-semibold">
            <span>{{ formatTimeFromIndex(selected) }}</span>
            <span class="toggle-switch">
                <span>{{ wantLive ? '실시간 조회' : '수동 조회' }}</span>
                <label class="switch justify-content-center align-items-center">
                    <input type="checkbox" v-model="wantLive" />
                    <span class="slider"></span>
                </label>
            </span>
        </div>
    </div>
</template>

<script>
import { computed, ref, watch } from 'vue';
import Slider from '@vueform/slider';

export default {
    name: 'TimelineSlider',
    props: {
        data: {
            type: Array,
            required: true,
        },
    },
    emits: ["select", "select-live"],
    components: { Slider },
    setup(props, { emit }) {
        const timestamps = computed(() => {
            return props.data
                .map(item => new Date(item.created_at).getTime())
                .sort((a, b) => a - b)
        })

        const marks = computed(() => {
            return timestamps.value.reduce((acc, ts, index) => {
                const utcDate = new Date(ts)
                const kstDate = new Date(utcDate.getTime() + 9 * 60 * 60 * 1000)
                acc[index] = new Date(kstDate).toLocaleTimeString('ko-KR', {
                    hour: "2-digit",
                    minute: "2-digit",
                })
                return acc
            }, {})
        })

        const selected = ref(0)
        watch(timestamps, (newVal) => {
            if (newVal.length > 0) {
                selected.value = newVal.length - 1
                emit("select", timestamps.value[selected.value])
            }
        })

        const formatTimeFromIndex = (index) => {
            const ts = timestamps.value[index]
            if (!ts) return "-"
            const utcDate = new Date(ts)
            const kstDate = new Date(utcDate.getTime() + 9 * 60 * 60 * 1000)
            return new Date(kstDate).toLocaleTimeString('ko-KR', {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            })
        }

        const handleChange = (val) => {
            emit("select", timestamps.value[val])
        }

        const wantLive = ref(true)

        return {
            timestamps,
            marks,
            selected,
            formatTimeFromIndex,
            handleChange,
            wantLive,
        }
    },
}
</script>

<style src="@vueform/slider/themes/default.css"></style>
<style scoped>
.timeline-slider {
    padding: 4rem;
    border-radius: 12px;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
}

.switch {
    position: relative;
    display: inline-block;
    width: 4.5rem;
    height: 2rem;
    margin-left: 0.5rem;
}

.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.slider {
    position: absolute;
    cursor: pointer;
    background-color: #ccc;
    border-radius: 1.0rem;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transition: 0.3s;
}

.slider:before {
    content: "";
    position: absolute;
    height: 1.8rem;
    width: 1.8rem;
    left: 0.2rem;
    bottom: 0.1rem;
    background-color: white;
    border-radius: 70%;
    transition: 0.3s;
}

input:checked+.slider {
    background-color: #4ade80;
    /* green */
}

input:checked+.slider:before {
    transform: translateX(2.35rem);
}
</style>