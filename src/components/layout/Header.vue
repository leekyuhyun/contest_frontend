<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand fw-bold fs-4"> The Cane of Minjeung </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link to="/" class="nav-link" active-class="active" aria-current="page"
              >홈</router-link
            >
          </li>

          <li class="nav-item">
            <router-link to="/register-device" class="nav-link" active-class="active"
              >기기 등록</router-link
            >
          </li>

          <li class="nav-item">
            <router-link to="/device-list" class="nav-link" active-class="active"
              >등록 기기 목록</router-link
            >
          </li>

          <li class="nav-item">
            <router-link to="/monitoring" class="nav-link" active-class="active"
              >모니터링</router-link
            >
          </li>

          <li class="nav-item">
            <router-link to="/alerts" class="nav-link" active-class="active">상황 알림</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'AppHeader',
}
</script>

<style scoped>
.navbar-brand {
  color: #007bff !important;
}
.nav-link.active {
  color: #007bff !important;
  font-weight: bold;
}
</style>
