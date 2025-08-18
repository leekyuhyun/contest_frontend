<template>
  <div class="text-center text-muted py-3">
    <p>{{ message }}</p>
    <router-link :to="linkTo" class="btn btn-outline-primary mt-3">
      {{ linkText }}
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'EmptyState',
  props: {
    message: {
      type: String,
      default: '데이터가 없습니다.',
    },
    linkTo: {
      type: String,
      required: true,
    },
    linkText: {
      type: String,
      required: true,
    },
  },
}
</script>
