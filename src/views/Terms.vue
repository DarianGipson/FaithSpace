<template>
  <div class="terms-page">
    <nav class="navigationbar glass-nav" role="navigation" aria-label="Main navigation">
      <div class="logoWrap">
        <img class="logo" src="/src/assets/logo.png" alt="FaithSpace Logo" loading="lazy" tabindex="0" aria-label="FaithSpace Home" @click="$router.push('/')" style="cursor:pointer;" />
      </div>
      <ul class="navLinks">
        <li><router-link to="/" exact-active-class="active">Home</router-link></li>
        <li><router-link to="/about" exact-active-class="active">About</router-link></li>
        <li><router-link to="/community" exact-active-class="active">Community</router-link></li>
        <li><router-link to="/features" exact-active-class="active">Features</router-link></li>
        <li><router-link to="/terms" exact-active-class="active" class="terms-link">Terms</router-link></li>
      </ul>
    </nav>
    <main class="main-content">
      <section class="terms-hero">
        <h1 class="terms-title">Terms of Service</h1>
        <p class="terms-date">Last updated: May 2025</p>
        <div class="terms-content">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using FaithSpace, you agree to be bound by these Terms of Service and our Privacy Policy.
          </p>
          <h2>2. User Conduct</h2>
          <p>
            Please use FaithSpace respectfully. Do not post harmful, illegal, or inappropriate content. We reserve the right to remove content or suspend accounts that violate these terms.
          </p>
          <h2>3. Privacy</h2>
          <p>
            Your privacy is important to us. Please review our Privacy Policy to understand how we collect and use your information.
          </p>
          <h2>4. Changes to Terms</h2>
          <p>
            We may update these Terms from time to time. Continued use of FaithSpace means you accept any changes.
          </p>
          <h2>5. Contact</h2>
          <p>
            If you have questions about these Terms, please <router-link to="/contact" class="contact-link">contact us</router-link>.
          </p>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
// No script needed for static terms page
</script>

<style scoped>
.terms-page {
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
.navLinks .terms-link {
  background: #fff;
  color: #7c4dff !important;
  font-weight: 800;
  border-radius: 2rem;
  padding: 0.5rem 1.5rem;
  margin-left: 0.5rem;
  box-shadow: 0 2px 8px #7c4dff22;
  border: 2px solid #7c4dff;
}
.navLinks .terms-link:hover,
.navLinks .terms-link.active {
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
.terms-hero {
  background: #fff;
  border-radius: 1.5rem;
  box-shadow: 0 2px 24px #7c4dff22;
  padding: 2rem;
}
.terms-title {
  color: #2256c7;
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
}
.terms-date {
  color: #7c4dff;
  font-size: 1em;
  margin-bottom: 1.5rem;
}
.terms-content h2 {
  color: #7c4dff;
  margin-top: 1.5em;
  margin-bottom: 0.5em;
  font-size: 1.2em;
  font-weight: 700;
}
.terms-content p {
  color: #2256c7;
  margin-bottom: 1em;
  font-size: 1.08em;
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