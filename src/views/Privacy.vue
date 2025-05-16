<template>
  <div class="privacy-page">
    <nav class="navigationbar glass-nav" role="navigation" aria-label="Main navigation">
      <div class="logoWrap">
        <img class="logo" src="/src/assets/logo.png" alt="FaithSpace Logo" loading="lazy" tabindex="0" aria-label="FaithSpace Home" @click="$router.push('/')" style="cursor:pointer;" />
      </div>
      <ul class="navLinks">
        <li><router-link to="/" exact-active-class="active">Home</router-link></li>
        <li><router-link to="/about" exact-active-class="active">About</router-link></li>
        <li><router-link to="/community" exact-active-class="active">Community</router-link></li>
        <li><router-link to="/features" exact-active-class="active">Features</router-link></li>
        <li><router-link to="/privacy" exact-active-class="active" class="privacy-link">Privacy</router-link></li>
      </ul>
    </nav>
    <main class="main-content">
      <section class="privacy-hero">
        <h1 class="privacy-title">Privacy Policy</h1>
        <p class="privacy-date">Last updated: May 2025</p>
        <div class="privacy-content">
          <p>
            Your privacy is important to us. This Privacy Policy explains how FaithSpace collects, uses, and protects your information.
          </p>
          <h2>Information We Collect</h2>
          <ul>
            <li>Account information (name, email, etc.)</li>
            <li>Content you post or share</li>
            <li>Usage data (how you use FaithSpace)</li>
          </ul>
          <h2>How We Use Information</h2>
          <ul>
            <li>To provide and improve our services</li>
            <li>To communicate with you</li>
            <li>To keep FaithSpace safe and secure</li>
          </ul>
          <h2>Contact</h2>
          <p>
            If you have questions about this Privacy Policy, please <router-link to="/contact" class="contact-link">contact us</router-link>.
          </p>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
// No script needed for static privacy page
</script>

<style scoped>
.privacy-page {
  font-family: 'Inter', Arial, sans-serif;
  min-height: 100vh;
  background: linear-gradient(135deg, #f7faff 0%, #eaf1ff 100%);
}
.navigationbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.7rem 2rem;
  background: linear-gradient(90deg, #f7f5ff 60%, #eaf1ff 100%);
  border-radius: 0 0 1.5rem 1.5rem;
  box-shadow: 0 2px 12px #7c4dff22;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 10;
}
.logoWrap .logo {
  height: 38px;
  margin-right: 1.2rem;
}
.navLinks {
  display: flex;
  gap: 1.2rem;
  list-style: none;
  margin: 0;
  padding: 0;
  align-items: center;
}
.navLinks li {
  display: flex;
}
.navLinks a {
  color: #2256c7;
  font-weight: 700;
  font-size: 1.08rem;
  text-decoration: none;
  padding: 0.5rem 1.2rem;
  border-radius: 1.2rem;
  transition: background 0.18s, color 0.18s;
}
.navLinks a.active,
.navLinks a:hover,
.navLinks a:focus {
  background: #eaf1ff;
  color: #7c4dff;
}
.navLinks .privacy-link {
  background: #fff;
  color: #7c4dff !important;
  font-weight: 800;
  border-radius: 2rem;
  padding: 0.5rem 1.5rem;
  margin-left: 0.5rem;
  box-shadow: 0 2px 8px #7c4dff22;
  border: 2px solid #7c4dff;
}
.navLinks .privacy-link:hover,
.navLinks .privacy-link.active {
  background: #7c4dff;
  color: #fff !important;
  border-color: #488ae7;
  transform: scale(1.07);
}
.main-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
}
.privacy-hero {
  background: #fff;
  border-radius: 1.5rem;
  box-shadow: 0 2px 24px #7c4dff22;
  padding: 2rem;
}
.privacy-title {
  color: #2256c7;
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
}
.privacy-date {
  color: #7c4dff;
  font-size: 1em;
  margin-bottom: 1.5rem;
}
.privacy-content h2 {
  color: #7c4dff;
  margin-top: 1.5em;
  margin-bottom: 0.5em;
  font-size: 1.2em;
  font-weight: 700;
}
.privacy-content p,
.privacy-content ul {
  color: #2256c7;
  margin-bottom: 1em;
  font-size: 1.08em;
}
.privacy-content ul {
  padding-left: 1.5em;
}
.contact-link {
  color: #2266cc;
  text-decoration: underline;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.2s;
}
.contact-link:hover {
  color: #7c4dff;
}
</style>