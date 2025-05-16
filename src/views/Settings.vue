<template>
  <div class="settings-page">
    <nav class="navigationbar glass-nav" role="navigation" aria-label="Main navigation">
      <div class="logoWrap">
        <img class="logo" src="/src/assets/logo.png" alt="FaithSpace Logo" loading="lazy" tabindex="0" aria-label="FaithSpace Home" @click="$router.push('/')" style="cursor:pointer;" />
      </div>
      <ul class="navLinks">
        <li><router-link to="/" exact-active-class="active">Home</router-link></li>
        <li><router-link to="/dashboard" exact-active-class="active">Dashboard</router-link></li>
        <li><router-link to="/profile" exact-active-class="active">Profile</router-link></li>
        <li><router-link to="/settings" exact-active-class="active" class="settings-link">Settings</router-link></li>
      </ul>
    </nav>
    <main class="main-content">
      <section class="settings-hero">
        <h1 class="settings-title">Settings</h1>
        <form class="settings-form">
          <label>
            Display Name:
            <input type="text" v-model="displayName" />
          </label>
          <label>
            Email Notifications:
            <input type="checkbox" v-model="emailNotifications" />
          </label>
          <button type="button" class="save-btn" @click="saveSettings">Save Settings</button>
        </form>
      </section>
      <section class="delete-account-section">
        <h2>Delete Account</h2>
        <p>
          Warning: Deleting your account is permanent and cannot be undone.<br />
          All your data will be removed.
        </p>
        <button class="delete-account-btn">Delete My Account</button>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const displayName = ref('Jordan Rivers')
const emailNotifications = ref(true)
const router = useRouter()
function saveSettings() {
  alert('Settings saved!')
}
function goHome() {
  router.push('/')
}
</script>

<style scoped>
.settings-page {
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
.navLinks .settings-link {
  background: #fff;
  color: #7c4dff !important;
  font-weight: 800;
  border-radius: 2rem;
  padding: 0.5rem 1.5rem;
  margin-left: 0.5rem;
  box-shadow: 0 2px 8px #7c4dff22;
  border: 2px solid #7c4dff;
}
.navLinks .settings-link:hover,
.navLinks .settings-link.active {
  background: #7c4dff;
  color: #fff !important;
  border-color: #488ae7;
  transform: scale(1.07);
}
.main-content {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem 1rem;
}
.settings-hero {
  background: #fff;
  border-radius: 1.5rem;
  box-shadow: 0 2px 24px #7c4dff22;
  padding: 2rem;
}
.settings-title {
  color: #2256c7;
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
}
.settings-form label {
  display: block;
  margin-bottom: 1.2rem;
  color: #2256c7;
  font-weight: 600;
}
.settings-form input[type="text"] {
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
.settings-form input[type="checkbox"] {
  margin-left: 0.7em;
}
.save-btn {
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
.save-btn:hover {
  background: linear-gradient(90deg, #7c4dff 60%, #488ae7 100%);
  transform: scale(1.07);
  box-shadow: 0 4px 16px #7c4dff33;
  outline: none;
}
.delete-account-section {
  margin-top: 2.5rem;
  padding: 1.5rem;
  background: #fff0f0;
  border-radius: 1rem;
  border: 1.5px solid #ffb3b3;
}
.delete-account-section h2 {
  color: #e63946;
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1rem;
}
.delete-account-section p {
  color: #333;
  font-size: 1rem;
  margin-bottom: 1.5rem;
}
.delete-account-btn {
  background: #ff4d4f;
  color: #fff;
  font-weight: 700;
  border: none;
  border-radius: 1.2rem;
  padding: 0.7em 2em;
  margin-top: 1em;
  cursor: pointer;
  transition: background 0.2s;
}
.delete-account-btn:hover {
  background: #d9363e;
}
</style>