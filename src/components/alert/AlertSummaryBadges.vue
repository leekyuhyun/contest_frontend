<template>
  <div class="alert-summary">
    <span class="badge bg-danger me-2">긴급: {{ criticalCount }}</span>
    <span class="badge bg-warning me-2">주의: {{ warningCount }}</span>
  </div>
</template>

<script>
export default {
  name: 'AlertSummaryBadges',
  props: {
    criticalCount: {
      type: Number,
      default: 0,
    },
    warningCount: {
      type: Number,
      default: 0,
    },
  },
}
</script>

<style scoped>
.alert-summary .badge {
  font-size: 0.9rem;
  padding: 8px 12px;
}
</style>
