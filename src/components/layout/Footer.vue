<template>
  <footer class="bg-dark text-white-50 py-4 mt-auto">
    <div class="container text-center">
      <p class="mb-1">&copy; {{ currentYear }} The cane of-Minjeung. All rights reserved.</p>
      <p class="mb-1">Net 챌린지 캠프 시즌 12</p>
      <p class="mb-0">범죄 취약 계층을 위한 AI 기반 실시간 대응 서비스</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter',
  data() {
    return {
      currentYear: new Date().getFullYear(),
    }
  },
}
</script>
