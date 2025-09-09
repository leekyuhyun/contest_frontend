<template>
  <div class="audio-player-card">
    <div class="panel-header">
      <i class="fas fa-microphone-alt icon"></i>
      <h3 class="title">실시간 음성 분석</h3>
    </div>
    <div class="panel-body">
      <div class="stt-transcript-wrapper">
        <div class="stt-transcript" ref="transcriptBox">
          <p v-for="(item, index) in stt_data" :key="index" class="stt-item">
            <span class="timestamp">{{ formatTime(item.timestamp) }}</span>
            <span class="text">{{ item.text }}</span>
          </p>
          <p v-if="stt_data.length === 0" class="no-data">음성 데이터 수신 대기 중...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch, nextTick } from 'vue'
export default {
  name: 'AudioPlayer',
  props: { stt_data: { type: Array, default: () => [] } },
  setup(props) {
    const transcriptBox = ref(null)
    watch(
      () => props.stt_data,
      () => {
        nextTick(() => {
          if (transcriptBox.value) {
            transcriptBox.value.scrollTop = transcriptBox.value.scrollHeight
          }
        })
      },
      { deep: true }
    )

    const formatTime = ts => new Date(ts).toLocaleTimeString('ko-KR')

    return { transcriptBox, formatTime }
  },
}
</script>

<style scoped>
.audio-player-card {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.panel-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid #f1f5f9;
}
.icon {
  font-size: 1.5rem;
  color: #48bb78;
}
.title {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
  color: #1e293b;
}
.panel-body {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}
.stt-transcript-wrapper {
  flex-grow: 1;
  background-color: #f8fafc;
  border-radius: 8px;
  padding: 1rem;
  overflow-y: auto;
  border: 1px solid #f1f5f9;
}
.stt-item {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}
.timestamp {
  font-size: 0.8rem;
  color: #94a3b8;
  font-family: monospace;
}
.text {
  font-size: 0.9rem;
  color: #334155;
}
.no-data {
  text-align: center;
  color: #94a3b8;
}
</style>
