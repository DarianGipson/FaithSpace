<template>
  <div class="login-page">
    <!-- Navigation Bar -->
    <nav class="navigationbar glass-nav" role="navigation" aria-label="Main navigation">
      <div class="logoWrap">
        <img class="logo" src="/src/assets/logo.png" alt="FaithSpace Logo" loading="lazy" tabindex="0" aria-label="FaithSpace Home" @click="$router.push('/')" style="cursor:pointer;" />
      </div>
      <ul class="navLinks">
        <li><router-link to="/" exact-active-class="active">Home</router-link></li>
        <li><router-link to="/about" exact-active-class="active">About</router-link></li>
        <li><router-link to="/features" exact-active-class="active">Features</router-link></li>
        <li><router-link to="/community" exact-active-class="active">Community</router-link></li>
        <li><router-link to="/join" exact-active-class="active">Join Now</router-link></li>
      </ul>
    </nav>

    <!-- HERO SECTION -->
    <section class="login-hero">
      <div class="hero-content">
        <h1 class="login-title">
          LOG<span class="accent">IN</span>
        </h1>
        <p class="login-subtitle">
          Welcome back to <span class="accent">FaithSpace</span>!
        </p>
      </div>
      <div class="hero-image-wrap">
        <img src="/src/assets/IMG_LOG1.png" alt="Login to FaithSpace" class="hero-image" />
      </div>
    </section>

    <main class="main-content">
      <section class="login-cards">
        <div class="glass-card login-card">
          <form class="login-form" @submit.prevent="onLogin">
            <input type="email" placeholder="Email Address" v-model="form.email" required />
            <div class="password-wrap">
              <input :type="showPass ? 'text' : 'password'" placeholder="Password" v-model="form.password" required />
              <button type="button" class="toggle-pass" @click="showPass = !showPass" :aria-label="showPass ? 'Hide password' : 'Show password'">
                <span v-if="showPass">🙈</span>
                <span v-else>👁️</span>
              </button>
            </div>
            <div class="login-links">
              <router-link to="/forgot-password" class="forgot-link">Forgot Password?</router-link>
            </div>
            <button class="login-btn" type="submit">Log In</button>
          </form>
          <div v-if="loginSuccess" class="login-success">🎉 Welcome back! Redirecting…</div>
          <div class="login-signup">
            Don’t have an account?
            <router-link to="/join" class="signup-link">Sign up</router-link>
          </div>
          <p>
            By joining, you agree to our
            <router-link to="/terms" class="terms-link">Terms of Service</router-link>.
          </p>
        </div>
      </section>
    </main>

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
  email: '',
  password: ''
})
const showPass = ref(false)
const loginSuccess = ref(false)
function onLogin() {
  // Add real login logic here
  loginSuccess.value = true
  setTimeout(() => {
    loginSuccess.value = false
    router.push('/')
  }, 1800)
}
</script>

<style scoped>
.login-page {
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
.login-hero {
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
  text-align: center;
}
.login-title {
  font-size: 2.5rem;
  font-weight: 900;
  color: #2256c7;
  margin-bottom: 0.5rem;
  letter-spacing: 0.05em;
}
.accent { color: #488ae7; }
.login-subtitle {
  font-size: 1.3rem;
  font-weight: 600;
  color: #7c4dff;
  margin-bottom: 0.5rem;
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
  max-width: 340px;
  border-radius: 1.5rem;
  box-shadow: 0 4px 24px #7c4dff22;
  object-fit: cover;
  animation: fadeInUp 1.2s cubic-bezier(.23,1.01,.32,1) 0.2s both;
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(40px);}
  to { opacity: 1; transform: translateY(0);}
}

/* LOGIN CARDS & FORM */
.main-content {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
}
.login-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 2.5rem;
}
.login-card {
  flex: 1 1 320px;
  min-width: 280px;
  max-width: 370px;
  background: rgba(255,255,255,0.92);
  border-radius: 1.2rem;
  box-shadow: 0 2px 12px #488ae722;
  padding: 2rem 1.5rem 1.5rem 1.5rem;
  margin-bottom: 0;
  transition: box-shadow 0.2s, transform 0.2s, background 0.2s;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  outline: none;
  animation: fadeInCard 0.7s cubic-bezier(.23,1.01,.32,1) both;
}
@keyframes fadeInCard {
  from { opacity: 0; transform: translateY(30px);}
  to { opacity: 1; transform: translateY(0);}
}
.login-card:focus,
.login-card:hover {
  box-shadow: 0 8px 32px #488ae744;
  background: #fafdff;
  transform: translateY(-4px) scale(1.02);
}
.login-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  animation: fadeInCard 1.2s cubic-bezier(.23,1.01,.32,1) 0.2s both;
}
.login-form input[type="email"],
.login-form input[type="password"] {
  padding: 0.7rem 1rem;
  border-radius: 0.7rem;
  border: 1.5px solid #eaf1ff;
  font-size: 1.08rem;
  background: #fafdff;
  color: #2256c7;
  outline: none;
  transition: border 0.2s, box-shadow 0.2s;
}
.login-form input:focus {
  border: 1.5px solid #7c4dff;
  box-shadow: 0 2px 8px #7c4dff22;
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
}
.login-btn {
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
.login-btn:hover, .login-btn:focus {
  background: linear-gradient(90deg, #7c4dff 60%, #488ae7 100%);
  transform: scale(1.07);
  box-shadow: 0 4px 16px #7c4dff33;
  outline: none;
}
.login-links {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}
.forgot-link {
  color: #2266cc;
  text-decoration: underline;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.2s;
}
.forgot-link:hover {
  color: #7c4dff;
}
.login-signup {
  margin-top: 1.5rem;
  font-size: 1rem;
  color: #2256c7;
  text-align: center;
  width: 100%;
}
.signup-link {
  color: #488ae7;
  font-weight: 600;
  margin-left: 0.3em;
  text-decoration: underline;
}
.login-success {
  color: #488ae7;
  margin-top: 1rem;
  font-weight: 700;
  text-align: center;
  width: 100%;
  animation: fadeInUp 0.7s;
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
  .login-hero {
    flex-direction: column;
    gap: 1.5rem;
    padding: 1.5rem 0.5rem 1rem 0.5rem;
    text-align: center;
  }
  .login-cards {
    flex-direction: column;
    gap: 1.5rem;
    align-items: stretch;
  }
  .login-card {
    max-width: 100%;
    min-width: 0;
  }
}
</style>