<template>
  <div class="audio-container">
    <div class="audio-header">
      <h4 class="h6 mb-0">
        <i class="fas fa-microphone me-2"></i>
        녹음 파일
      </h4>
    </div>

    <div class="audio-content">
      <div class="audio-player">
        <audio controls class="w-100">
          <source src="" type="audio/mpeg" />
          브라우저가 오디오를 지원하지 않습니다.
        </audio>
      </div>

      <div class="audio-info mt-2">
        <small class="text-muted">
          <i class="fas fa-clock me-1"></i>
          녹음 시간: {{ emergencyTime }}
        </small>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AudioPlayer',
  props: {
    emergencyTime: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped>
.audio-container {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.audio-header {
  background: linear-gradient(135deg, #f39c12 0%, #e67e22 100%);
  color: white;
  padding: 15px 20px;
}

.audio-content {
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.audio-player audio {
  border-radius: 10px;
}
</style>
