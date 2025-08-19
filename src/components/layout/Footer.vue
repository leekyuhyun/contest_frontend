<template>
  <footer class="modern-footer">
    <div class="footer-container">
      <!-- Three-column footer layout with organized sections -->
      <div class="footer-content">
        <div class="footer-section">
          <h3 class="footer-title">The Cane of Minjeung</h3>
          <p class="footer-description">범죄 취약 계층을 위한 AI 기반 실시간 대응 서비스</p>
        </div>

        <div class="footer-section">
          <h4 class="section-title">서비스</h4>
          <ul class="footer-links">
            <li><router-link to="/register-device" class="footer-link">기기 등록</router-link></li>
            <li><router-link to="/device-list" class="footer-link">기기 목록</router-link></li>
            <li><router-link to="/monitoring" class="footer-link">모니터링</router-link></li>
            <li><router-link to="/alerts" class="footer-link">상황 알림</router-link></li>
          </ul>
        </div>

        <div class="footer-section">
          <h4 class="section-title">프로젝트 정보</h4>
          <p class="project-info">Net 챌린지 캠프 시즌 12</p>
          <div class="social-links">
            <a href="#" class="social-link" aria-label="GitHub">📧</a>
            <a href="#" class="social-link" aria-label="Contact">📞</a>
            <a href="#" class="social-link" aria-label="Support">🛠️</a>
          </div>
        </div>
        <div classs="footer-section">
          <h4 class="Section-title">제작자</h4>
          <p class="member">
            김민증 김동준 오태양 <br />
            유진영 이규현 차순욱
          </p>
        </div>
      </div>

      <!-- Modern copyright section -->
      <div class="footer-bottom">
        <p class="copyright">&copy; {{ currentYear }} MinjeungCare. All rights reserved.</p>
      </div>
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

<style scoped>
.modern-footer {
  background: var(--muted, #f9fafb);
  border-top: 1px solid var(--border, #e5e7eb);
  margin-top: auto;
  padding: 3rem 0 1rem;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.footer-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary, #0891b2);
  margin: 0;
}

.footer-description {
  color: var(--muted-foreground, #4b5563);
  line-height: 1.6;
  margin: 0;
}

.section-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--foreground, #4b5563);
  margin: 0;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer-link {
  color: var(--muted-foreground, #4b5563);
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-link:hover {
  color: var(--primary, #0891b2);
}

.project-info {
  color: var(--muted-foreground, #4b5563);
  margin: 0;
  font-weight: 500;
}

.social-links {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--background, #ffffff);
  border: 1px solid var(--border, #e5e7eb);
  text-decoration: none;
  font-size: 1.2rem;
  transition: all 0.2s ease;
}

.social-link:hover {
  background: var(--accent, #6366f1);
  border-color: var(--accent, #6366f1);
  transform: translateY(-2px);
}

.footer-bottom {
  padding-top: 2rem;
  border-top: 1px solid var(--border, #e5e7eb);
  text-align: center;
}

.copyright {
  color: var(--muted-foreground, #4b5563);
  font-size: 0.9rem;
  margin: 0;
}

@media (max-width: 768px) {
  .modern-footer {
    padding: 2rem 0 1rem;
  }

  .footer-content {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    text-align: center;
  }

  .social-links {
    justify-content: center;
  }
}
</style>
