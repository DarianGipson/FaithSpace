<template>
  <router-view />
</template>

<style scoped>
body, .main-content {
  background: #f5f6fa;
  margin: 0;
  font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
  font-size: 1rem;
  font-weight: 400;
}

.navbar {
  background: #1e2a38;
  color: #fff;
  padding: 1.2rem 0; /* Increased from 0.5rem 0 */
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}
.navbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}
.logo {
  background: #e7f0ff;
  border-radius: 999px;
  padding: 0.25rem 1.25rem;
  display: flex;
  align-items: center;
}
.nav-links {
  list-style: none;
  display: flex;
  gap: 2rem;
  margin: 0;
  padding: 0;
}
.nav-links a {
  color: #fff;
  font-weight: 500;
  text-decoration: none;
  font-size: 1.1rem;
  transition: color 0.2s;
}
.nav-links a:hover {
  color: #488ae7;
}

.hero-section {
  width: 100%;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin: 0;
  padding: 0;
}

.hero-bg-card {
  background: #e7f0ff;
  border-radius: 48px;
  width: 100vw;
  max-width: none;
  margin: 0 0 0 0;
  padding: 32px 0 24px 0; /* Reduced vertical padding */
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 24px rgba(72,138,231,0.07);
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}

.hero-content-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 24px;           /* Reduced gap */
  padding-left: 40px;  /* Less left padding */
  padding-right: 40px; /* Less right padding */
}

.hero-text {
  flex: 1 1 0;
  min-width: 350px;
  max-width: 700px;
  margin-left: 0;
  margin-top: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.hero-text h1 {
  font-size: 2.8rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  line-height: 1.1;
  word-break: break-word;
}

.hero-text .blue {
  color: #488ae7;
}

.subtitle {
  font-size: 1.15rem;
  margin-bottom: 2rem;
  color: #222;
}

.join-now-btn {
  background: #2256c7;
  color: #fff;
  font-weight: 700;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(34,86,199,0.15);
  padding: 0.7rem 2.2rem;
  font-size: 1.25rem;
  border: none;
  transition: background 0.2s;
  cursor: pointer;
  margin-top: 0.5rem;
}

.join-now-btn:hover {
  background: #1741a6;
}

.hero-img-bg {
  background: none;
  border-radius: 40px;
  width: 520px;
  height: 400px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  margin: 0 40px 0 0; /* Reduced right margin */
  box-shadow: none;
}

.hero-img {
  width: 480px;
  height: 360px;
  object-fit: contain;
}

.main-content-row {
  display: flex;
  justify-content: flex-start; /* Aligns all columns to the left */
  align-items: flex-start;
  gap: 48px;                   /* Increase gap for spacing if needed */
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  margin-top: 1.5rem;
  position: relative;
  padding-bottom: 40px;
  padding-left: 0;
}

.info-col {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: flex-start;
  justify-content: flex-start;
  height: 100%;
  margin-left: 0; /* No negative margin */
}

.info-card {
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  margin-bottom: 1.2rem; /* Less space between cards */
  padding: 1.2rem 1.5rem 1.2rem 1.2rem; /* Slightly tighter padding */
  font-size: 1.1rem;
  width: 420px;
  max-width: 420px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border: 1.5px solid #e0e0e0;
  margin-bottom: 2.5rem;
  min-height: 120px; /* Adjust as needed */
}

.info-card .arrow {
  position: absolute;
  right: 1.5rem;
  bottom: 1.5rem;
  font-size: 1.5rem;
  color: #2256c7;
  font-weight: bold;
}

.center-img-col {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 420px;
  min-width: 420px;
}

.group-img {
  width: 420px;
  height: 220px;
  object-fit: cover;
  border-radius: 28px;
  margin: 0 20px; /* Less horizontal margin */
  display: block;
}

.testimonials-col {
  display: flex;
  flex-direction: column;
  gap: 1.2rem; /* Less vertical gap between testimonials */
  min-width: 420px;
  align-items: flex-start;
  margin-right: 0;
  margin-left: 12px; /* Slightly less space from center */
}

.testimonial-card {
  background: #e7f0ff;
  border-radius: 24px;
  padding: 1.5rem 2rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  box-sizing: border-box;
  width: 100%;
  max-width: 420px;
}

.testimonial-avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  object-fit: cover;
}

.testimonial-title {
  font-size: 1.6rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  line-height: 1;
}

.footer {
  text-align: center;
  width: 100%;
  margin: 0 auto;
  padding: 1rem 0;
  font-size: 0.95rem;
}
@media (max-width: 1000px) {
  .hero-row,
  .main-content-row {
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
  .testimonials-col,
  .info-col {
    min-width: unset;
    width: 100%;
    align-items: center;
  }
  .info-card,
  .group-img,
  .testimonial-card {
    width: 100%;
    max-width: 420px;
  }
}
</style>