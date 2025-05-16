<template>
  <div class="joinnow-page">
    <!-- Navigation Bar -->
    <nav class="navigationbar glass-nav" role="navigation" aria-label="Main navigation">
      <div class="logoWrap">
        <img class="logo" src="/src/assets/logo.png" alt="FaithSpace Logo" loading="lazy" tabindex="0" aria-label="FaithSpace Home" @click="$router.push('/')" style="cursor:pointer;" />
      </div>
      <ul class="navLinks">
        <li><router-link to="/" :exact-active-class="'active'">Home</router-link></li>
        <li><router-link to="/about" :exact-active-class="'active'">About</router-link></li>
        <li><router-link to="/features" :exact-active-class="'active'">Features</router-link></li>
        <li><router-link to="/community" :exact-active-class="'active'">Community</router-link></li>
        <li><router-link to="/login" :exact-active-class="'active'">Log In</router-link></li>
      </ul>
    </nav>

    <!-- HERO SECTION -->
    <section class="join-hero">
      <div class="hero-content">
        <h1 class="join-title">
          Join <span class="accent">F</span>aith<span class="accent">S</span>pace Today
        </h1>
        <p class="join-subtitle">
          Social Media with a <span class="accent">Purpose</span>.
        </p>
        <button class="why-join-btn" @click="showWhy = true">Why Join?</button>
      </div>
      <div class="hero-image-wrap">
        <img src="/src/assets/IMG_JN22.png" alt="Join FaithSpace" class="hero-image" />
      </div>
    </section>

    <main class="main-content">
      <!-- Welcome Banner -->
      <div class="welcome-banner">
        <span>👋 Already have an account? <router-link to="/login" class="banner-link">Log in here!</router-link></span>
      </div>

      <!-- Live Activity Banner -->
      <div class="live-activity-banner">
        <span>✨ 5 new members joined in the last hour!</span>
      </div>

      <section class="join-main-flex">
        <div class="glass-card join-benefits even-card">
          <h2 class="join-card-title">
            What You’ll Get
            <span class="feature-badge">Free</span>
          </h2>
          <ul>
            <li>🛡️ <strong>Safe, Moderated Community:</strong> Verified members and 24/7 uplifting support.</li>
            <li>📖 <strong>Daily Inspiration:</strong> Bible verses and encouragement every day.</li>
            <li>🙏 <strong>Prayer Wall & Messaging:</strong> Share requests and connect privately.</li>
            <li>👥 <strong>Groups for Every Interest:</strong> Bible study, youth, hobbies, and more.</li>
            <li>💙 <strong>Real Community Support:</strong> Friends who lift you up and pray with you.</li>
          </ul>
          <!-- Filler to match height of form card -->
          <div class="benefits-filler"></div>
        </div>
        <div class="glass-card join-form-card even-card">
          <h2 class="join-card-title">Create Your Account</h2>
          <!-- Replace your .stepper with this for a fixed, visually clear progress bar -->
<div class="stepper">
  <div class="progress-bar-bg">
    <div class="progress-bar-fill"></div>
  </div>
  <span class="step active">1</span>
  <span class="step-line"></span>
  <span class="step">2</span>
  <span class="step-line"></span>
  <span class="step">3</span>
</div>
          <form class="join-form" @submit.prevent="onSubmit">
            <!-- Social Signup Buttons -->
            <div class="social-signup-row">
              <button class="social-btn google" type="button">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" class="social-icon" /> Sign up with Google
              </button>
            </div>
            <input type="text" placeholder="Name" v-model="form.name" required />
            <input type="text" placeholder="Username" v-model="form.username" required />
            <input type="email" placeholder="Email address" v-model="form.email" required />
            <div class="password-wrap">
              <input :type="showPass ? 'text' : 'password'" placeholder="Password" v-model="form.password" required />
              <button type="button" class="toggle-pass" @click="showPass = !showPass" :aria-label="showPass ? 'Hide password' : 'Show password'">
                <span v-if="showPass">🙈</span>
                <span v-else>👁️</span>
              </button>
            </div>
            <input type="password" placeholder="Confirm Password" v-model="form.confirmPassword" required />
            <label class="join-checkbox">
              <input type="checkbox" v-model="form.agree" required />
              I agree to the <span class="accent">FaithSpace</span> community guidelines and terms
            </label>
            <button class="join-btn" type="submit">Create My Account</button>
          </form>
          <div v-if="accountCreated" class="account-success">🎉 Welcome to FaithSpace! Check your email to verify your account.</div>
        </div>
      </section>

      <!-- Testimonials Section -->
      <div class="join-testimonials">
        <div class="testimonial">
          <span class="testimonial-quote">“FaithSpace is the only social site where I feel truly uplifted every day!”</span>
          <span class="testimonial-name">— Sara</span>
        </div>
      </div>
    </main>

    <!-- WHY JOIN MODAL -->
    <div v-if="showWhy" class="modal-overlay" @click.self="showWhy = false">
      <div class="modal">
        <h3>Why Join FaithSpace?</h3>
        <ul class="why-list">
          <li>✔️ 100% ad-free, safe, and moderated</li>
          <li>✔️ Connect with believers worldwide</li>
          <li>✔️ Share prayers, testimonies, and encouragement</li>
          <li>✔️ Grow in faith with daily inspiration</li>
          <li>✔️ Your data is private and never sold</li>
        </ul>
        <button class="modal-close" @click="showWhy = false">Close</button>
      </div>
    </div>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-main">
        <p>
          © 2025 FaithSpace. All rights reserved. |
          <router-link to="/terms" class="terms-link">Terms of Service</router-link> |
          <router-link to="/contact" class="contact-link">Contact Us</router-link> |
          <router-link to="/privacy" class="privacy-link">Privacy Policy</router-link>
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const form = ref({
  name: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  agree: false
})
const showPass = ref(false)
const showWhy = ref(false)
const accountCreated = ref(false)
function onSubmit() {
  // Add real registration logic here
  accountCreated.value = true
  setTimeout(() => {
    accountCreated.value = false
    router.push('/verify-email')
  }, 2200)
}
</script>

<style scoped>
.joinnow-page {
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

/* HERO SECTION */
.join-hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2.5rem;
  padding: 2.5rem 2rem 1.5rem 2rem;
  background: linear-gradient(90deg, #eaf1ff 60%, #f7f5ff 100%);
  border-radius: 0 0 2rem 2rem;
  box-shadow: 0 2px 24px #7c4dff22;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}
.hero-content {
  flex: 1 1 350px;
  min-width: 280px;
  max-width: 500px;
}
.join-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2256c7;
  margin-bottom: 0.5rem;
}
.accent { color: #488ae7; }
.join-subtitle {
  font-size: 1.5rem;
  font-weight: 600;
  color: #7c4dff;
  margin-bottom: 0.5rem;
}
.why-join-btn {
  background: #fff;
  color: #7c4dff;
  border: 2px solid #7c4dff;
  border-radius: 24px;
  padding: 0.7rem 1.5rem;
  font-weight: 700;
  font-size: 1.05rem;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
  transition: background 0.18s, color 0.18s, box-shadow 0.18s;
  box-shadow: 0 2px 8px #7c4dff22;
}
.why-join-btn:hover, .why-join-btn:focus {
  background: #7c4dff;
  color: #fff;
  box-shadow: 0 4px 16px #7c4dff33;
}
.hero-image-wrap {
  flex: 1 1 350px;
  min-width: 260px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.hero-image {
  width: 100%;
  max-width: 400px;
  border-radius: 1.5rem;
  box-shadow: 0 4px 24px #7c4dff22;
  object-fit: cover;
  animation: fadeInUp 1.2s cubic-bezier(.23,1.01,.32,1) 0.2s both;
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(40px);}
  to { opacity: 1; transform: translateY(0);}
}

/* JOIN CARDS & FORM */
.main-content {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
}
.join-main-flex {
  display: flex;
  gap: 2.5rem;
  justify-content: center;
  align-items: stretch;
  flex-wrap: wrap;
  margin-bottom: 2.5rem;
}
.even-card {
  min-width: 320px;
  max-width: 400px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: 650px; /* Adjust this value to match both cards */
  box-sizing: border-box;
}
.join-benefits, .join-form-card {
  flex: 1 1 340px;
  min-width: 280px;
  max-width: 400px;
  background: rgba(255,255,255,0.96);
  border-radius: 1.2rem;
  box-shadow: 0 2px 12px #488ae722;
  padding: 2rem 1.5rem 1.5rem 1.5rem;
  margin: 0;
  animation: fadeInCard 0.7s cubic-bezier(.23,1.01,.32,1) both;
  /* Ensure equal height */
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  min-height: 540px; /* Adjust this value to match your sign up box height */
}
.join-card-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: #2256c7;
  margin-bottom: 0.7rem;
  text-align: center;
}
.join-benefits ul {
  padding-left: 1.2em;
  margin: 0;
  font-size: 1.08rem;
  color: #2256c7;
  flex: 0 0 auto;
}
.join-benefits li {
  margin-bottom: 1.1em;
  line-height: 1.5;
}
.benefits-filler {
  flex: 1 1 auto;
}
.join-form-card form {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
@keyframes fadeInCard {
  from { opacity: 0; transform: translateY(30px);}
  to { opacity: 1; transform: translateY(0);}
}
.join-benefits:focus,
.join-benefits:hover,
.join-form-card:focus,
.join-form-card:hover {
  box-shadow: 0 8px 32px #488ae744;
  background: #fafdff;
  transform: translateY(-4px) scale(1.02);
}
.join-card-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: #2256c7;
  margin-bottom: 0.7rem;
}
.join-card ul {
  padding-left: 1.2em;
  margin: 0;
}
.join-card li {
  margin-bottom: 0.7em;
  font-size: 1.05rem;
}
.join-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  animation: fadeInCard 1.2s cubic-bezier(.23,1.01,.32,1) 0.2s both;
}
.join-form input[type="text"],
.join-form input[type="email"],
.join-form input[type="password"] {
  padding: 0.7rem 1rem;
  border-radius: 0.7rem;
  border: 1.5px solid #eaf1ff;
  font-size: 1.08rem;
  background: #fafdff;
  color: #2256c7;
  outline: none;
  transition: border 0.2s, box-shadow 0.2s;
}
.join-form input:focus {
  border: 1.5px solid #7c4dff;
  box-shadow: 0 2px 8px #7c4dff44;
  background: #f7faff;
}
.password-wrap {
  position: relative;
  display: flex;
  align-items: center;
}
.toggle-pass {
  background: none;
  border: none;
  position: absolute;
  right: 0.7rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.2rem;
  cursor: pointer;
  color: #7c4dff;
  padding: 0 0.3em;
  transition: color 0.18s, transform 0.18s;
}
.toggle-pass:active {
  color: #488ae7;
  transform: scale(1.2);
}
.join-checkbox {
  font-size: 1rem;
  color: #2256c7;
  display: flex;
  align-items: center;
  gap: 0.5em;
}
.join-btn {
  background: linear-gradient(90deg, #488ae7 60%, #7c4dff 100%);
  color: #fff;
  font-weight: 700;
  font-size: 1.1rem;
  padding: 0.7rem 2rem;
  border-radius: 24px;
  border: none;
  box-shadow: 0 2px 8px #488ae733;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
}
.join-btn:hover, .join-btn:focus {
  background: linear-gradient(90deg, #7c4dff 60%, #488ae7 100%);
  transform: scale(1.07);
  box-shadow: 0 4px 16px #7c4dff33;
  outline: none;
}
.account-success {
  color: #488ae7;
  margin-top: 1rem;
  font-weight: 700;
  text-align: center;
  width: 100%;
  animation: fadeInUp 0.7s;
}

/* MODAL */
.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(60,40,120,0.18);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal {
  background: #fff;
  border-radius: 1.2rem;
  box-shadow: 0 8px 32px #7c4dff44;
  padding: 2rem 1.5rem 1.5rem 1.5rem;
  min-width: 320px;
  max-width: 90vw;
  text-align: center;
  position: relative;
}
.modal h3 {
  color: #7c4dff;
  margin-bottom: 1rem;
}
.why-list {
  text-align: left;
  margin-bottom: 1.2rem;
  color: #2256c7;
  font-size: 1.08rem;
}
.why-list li {
  margin-bottom: 0.5em;
}
.modal-close {
  background: #fff;
  color: #7c4dff;
  border: 2px solid #7c4dff;
  border-radius: 24px;
  padding: 0.5rem 1.5rem;
  font-weight: 700;
  font-size: 1.05rem;
  cursor: pointer;
  transition: background 0.18s, color 0.18s, box-shadow 0.18s;
  box-shadow: 0 2px 8px #7c4dff22;
}
.modal-close:hover, .modal-close:focus {
  background: #7c4dff;
  color: #fff;
  box-shadow: 0 4px 16px #7c4dff33;
}

/* FOOTER */
.footer {
  background: linear-gradient(90deg, #f7f5ff 60%, #eaf1ff 100%);
  border-radius: 1.5rem 1.5rem 0 0;
  box-shadow: 0 -2px 12px #7c4dff22;
  margin-top: 2rem;
  padding-top: 2rem;
  text-align: center;
}
.footer-main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem 2rem 1.5rem;
  color: #2256c7;
  font-size: 1rem;
}
.footer-main a {
  color: #488ae7;
  text-decoration: underline;
  margin: 0 0.5rem;
}
.terms-link,
.privacy-link {
  color: #2266cc;
  text-decoration: underline;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.2s;
}
.terms-link:hover,
.privacy-link:hover {
  color: #7c4dff;
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
@media (max-width: 900px) {
  .join-hero {
    flex-direction: column;
    gap: 1.5rem;
    padding: 1.5rem 0.5rem 1rem 0.5rem;
    text-align: center;
  }
  .join-main-flex {
    flex-direction: column;
    gap: 1.5rem;
    align-items: stretch;
  }
  .join-benefits, .join-form-card {
    max-width: 100%;
    min-width: 0;
    min-height: unset;
  }
}
.social-signup-row {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  margin-bottom: 1rem;
}
.social-btn {
  display: flex;
  align-items: center;
  gap: 0.7em;
  background: #fff;
  border: 1.5px solid #eaf1ff;
  border-radius: 0.7rem;
  font-size: 1.08rem;
  font-weight: 600;
  color: #2256c7;
  padding: 0.6rem 1rem;
  cursor: pointer;
  transition: background 0.18s, border 0.18s;
}
.social-btn:hover {
  background: #eaf1ff;
  border-color: #7c4dff;
}
.social-btn .social-icon {
  width: 1.3em;
}
.welcome-banner {
  background: #eaf1ff;
  color: #2256c7;
  text-align: center;
  padding: 0.7em 0;
  font-weight: 600;
  border-radius: 1em;
  margin: 1.5em auto 1em auto;
  max-width: 500px;
  box-shadow: 0 2px 8px #7c4dff22;
}
.banner-link {
  color: #7c4dff;
  text-decoration: underline;
  font-weight: 700;
}
.stepper {
  position: relative;
  margin-bottom: 1.2em;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5em;
  height: 2.5em;
}
.progress-bar-bg {
  position: absolute;
  left: 1.5em;
  right: 1.5em;
  top: 50%;
  height: 6px;
  background: #eaf1ff;
  border-radius: 3px;
  z-index: 0;
  transform: translateY(-50%);
}
.progress-bar-fill {
  position: absolute;
  left: 1.5em;
  top: 50%;
  height: 6px;
  width: 33%; /* Set to 33% for step 1, 66% for step 2, 100% for step 3 */
  background: #7c4dff;
  border-radius: 3px;
  z-index: 1;
  transition: width 0.3s;
  transform: translateY(-50%);
}
.step {
  position: relative;
  z-index: 2;
  width: 2em;
  height: 2em;
  border-radius: 50%;
  background: #eaf1ff;
  color: #7c4dff;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1em;
  border: 2px solid #7c4dff;
  transition: background 0.2s, color 0.2s;
}
.step.active {
  background: #7c4dff;
  color: #fff;
}
.step-line {
  width: 2em;
  height: 6px;
  background: transparent;
  z-index: 2;
}
.join-testimonials {
  text-align: center;
  margin: 2em 0 1em 0;
}
.testimonial {
  display: inline-block;
  background: #fff;
  border-radius: 1em;
  box-shadow: 0 2px 8px #7c4dff22;
  padding: 1em 2em;
  color: #2256c7;
  font-size: 1.08em;
}
.testimonial-quote {
  font-style: italic;
  margin-right: 0.5em;
}
.testimonial-name {
  color: #7c4dff;
  font-weight: 700;
}
.live-activity-banner {
  background: #fafdff;
  color: #488ae7;
  text-align: center;
  padding: 0.5em 0;
  font-weight: 600;
  border-radius: 1em;
  margin: 0.5em auto 1.5em auto;
  max-width: 400px;
  box-shadow: 0 2px 8px #7c4dff11;
  font-size: 1.05em;
}
.feature-badge {
  background: #7c4dff;
  color: #fff;
  font-size: 0.85em;
  border-radius: 0.7em;
  padding: 0.2em 0.8em;
  margin-left: 0.5em;
  vertical-align: middle;
  font-weight: 700;
}

/* TESTIMONIAL CAROUSEL */
/* .testimonial-carousel {
  text-align: center;
  margin: 2em 0 1em 0;
  position: relative;
}
.testimonial-slide {
  display: inline-block;
  background: #fff;
  border-radius: 1em;
  box-shadow: 0 2px 8px #7c4dff22;
  padding: 1em 2em;
  color: #2256c7;
  font-size: 1.08em;
  min-width: 250px;
  transition: opacity 0.3s;
}
.carousel-btn {
  background: #eaf1ff;
  border: none;
  color: #7c4dff;
  font-size: 1.5em;
  border-radius: 50%;
  width: 2em;
  height: 2em;
  margin: 0 0.5em;
  cursor: pointer;
  vertical-align: middle;
  transition: background 0.18s;
}
.carousel-btn:hover {
  background: #7c4dff;
  color: #fff;
} */
</style>