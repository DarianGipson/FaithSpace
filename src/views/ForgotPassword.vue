<template>
  <div class="forgot-password-page">
    <nav class="navigationbar glass-nav" role="navigation" aria-label="Main navigation">
      <div class="logoWrap">
        <img class="logo" src="/src/assets/logo.png" alt="FaithSpace Logo" loading="lazy" tabindex="0" aria-label="FaithSpace Home" @click="$router.push('/')" style="cursor:pointer;" />
      </div>
      <ul class="navLinks">
        <li><router-link to="/" exact-active-class="active">Home</router-link></li>
        <li><router-link to="/login" exact-active-class="active">Login</router-link></li>
        <li><router-link to="/join" exact-active-class="active">Sign Up</router-link></li>
      </ul>
    </nav>
    <main class="main-content">
      <section class="forgot-hero">
        <h1 class="forgot-title">Forgot Password?</h1>
        <p class="forgot-desc">
          Enter your email address below and we'll send you a link to reset your password.
        </p>
        <form class="forgot-form">
          <label>
            Email:
            <input type="email" placeholder="Your Email" required />
          </label>
          <button type="submit" class="reset-btn">Send Reset Link</button>
        </form>
      </section>
    </main>
  </div>
</template>

<script setup>
// No script needed for static forgot password page
</script>

<style scoped>
.forgot-password-page {
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
.main-content {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem 1rem;
}
.forgot-hero {
  background: #fff;
  border-radius: 1.5rem;
  box-shadow: 0 2px 24px #7c4dff22;
  padding: 2rem;
}
.forgot-title {
  color: #2256c7;
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
}
.forgot-desc {
  color: #2256c7;
  margin-bottom: 1.5rem;
}
.forgot-form label {
  display: block;
  margin-bottom: 1.2rem;
  color: #2256c7;
  font-weight: 600;
}
.forgot-form input[type="email"] {
  width: 100%;
  padding: 0.5em;
  border-radius: 0.7em;
  border: 1.5px solid #eaf1ff;
  font-size: 1.08em;
  background: #fafdff;
  color: #2256c7;
  margin-top: 0.3em;
  margin-bottom: 0.5em;
}
.reset-btn {
  background: linear-gradient(90deg, #488ae7 60%, #7c4dff 100%);
  color: #fff;
  font-weight: 700;
  font-size: 1.1em;
  padding: 0.7em 2em;
  border-radius: 24px;
  border: none;
  box-shadow: 0 2px 8px #488ae733;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
}
.reset-btn:hover {
  background: linear-gradient(90deg, #7c4dff 60%, #488ae7 100%);
  transform: scale(1.07);
  box-shadow: 0 4px 16px #7c4dff33;
  outline: none;
}
</style>