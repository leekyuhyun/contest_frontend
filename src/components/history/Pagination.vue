<template>
  <nav v-if="totalPages > 1" class="pagination-container" aria-label="Page navigation">
    <ul class="pagination">
      <li class="page-item" :class="{ disabled: currentPage === 1 }">
        <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">&laquo;</a>
      </li>
      <li
        class="page-item"
        v-for="page in pages"
        :key="page"
        :class="{ active: page === currentPage }"
      >
        <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
      </li>
      <li class="page-item" :class="{ disabled: currentPage === totalPages }">
        <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">&raquo;</a>
      </li>
    </ul>
  </nav>
</template>

<script>
import { computed } from 'vue'
export default {
  name: 'Pagination',
  props: ['currentPage', 'totalPages'],
  emits: ['page-changed'],
  setup(props, { emit }) {
    const pages = computed(() => {
      const pageArray = []
      for (let i = 1; i <= props.totalPages; i++) {
        pageArray.push(i)
      }
      return pageArray
    })

    const changePage = page => {
      if (page > 0 && page <= props.totalPages) {
        emit('page-changed', page)
      }
    }

    return { pages, changePage }
  },
}
</script>

<style scoped>
.pagination-container {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}
</style>
