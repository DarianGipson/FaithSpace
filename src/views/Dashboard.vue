<template>
  <div class="dashboard-page">
    <!-- Navigation Bar -->
    <nav class="navigationbar glass-nav" role="navigation" aria-label="Main navigation">
      <div class="logoWrap">
        <img class="logo" src="/src/assets/logo.png" alt="FaithSpace Logo" loading="lazy" tabindex="0" aria-label="FaithSpace Home" @click="$router.push('/')" style="cursor:pointer;" />
      </div>
      <ul class="navLinks">
        <li><router-link to="/" exact-active-class="active">Home</router-link></li>
        <li><router-link to="/community" exact-active-class="active">Community</router-link></li>
        <li><router-link to="/features" exact-active-class="active">Features</router-link></li>
        <li><router-link to="/about" exact-active-class="active">About</router-link></li>
        <li><router-link to="/dashboard" exact-active-class="active" class="dashboard-link">Dashboard</router-link></li>
        <li><router-link to="/profile" exact-active-class="active" class="profile-link">Profile</router-link></li>
      </ul>
    </nav>

    <main class="main-content">
      <section class="dashboard-hero">
        <div class="dashboard-avatar-wrap">
          <div class="dashboard-avatar dashboard-emoji" title="User Avatar">🧑‍💻</div>
        </div>
        <div class="dashboard-info">
          <h1 class="dashboard-name">Welcome, {{ user.name }}!</h1>
          <p class="dashboard-bio">Here’s a quick overview of your activity and groups.</p>
        </div>
      </section>

      <section class="dashboard-stats">
        <div class="stat-card">
          <span class="stat-number">{{ user.posts }}</span>
          <span class="stat-label">Posts</span>
        </div>
        <div class="stat-card">
          <span class="stat-number">{{ user.groups }}</span>
          <span class="stat-label">Groups</span>
        </div>
        <div class="stat-card">
          <span class="stat-number">{{ user.notifications }}</span>
          <span class="stat-label">Notifications</span>
        </div>
      </section>

      <section class="dashboard-groups">
        <h2 class="groups-title">Your Groups</h2>
        <div v-if="groups.length === 0" class="no-groups">
          You haven't joined any groups yet. <router-link to="/community">Find a group</router-link>
        </div>
        <ul v-else class="groups-list">
          <li v-for="g in groups" :key="g.id" class="group-card">
            <span class="group-emoji">👥</span>
            <span class="group-name">{{ g.name }}</span>
            <router-link :to="`/community/${g.id}`" class="group-link">View</router-link>
          </li>
        </ul>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const user = ref({
  name: 'Jordan Rivers',
  posts: 12,
  groups: 2,
  notifications: 5
})

const groups = ref([
  { id: 1, name: 'Bible Study' },
  { id: 2, name: 'Prayer Warriors' }
])
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');

.dashboard-page {
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
.navLinks .dashboard-link,
.navLinks .profile-link {
  background: #fff;
  color: #7c4dff !important;
  font-weight: 800;
  border-radius: 2rem;
  padding: 0.5rem 1.5rem;
  margin-left: 0.5rem;
  box-shadow: 0 2px 8px #7c4dff22;
  border: 2px solid #7c4dff;
}
.navLinks .dashboard-link:hover,
.navLinks .dashboard-link.active,
.navLinks .profile-link:hover,
.navLinks .profile-link.active {
  background: #7c4dff;
  color: #fff !important;
  border-color: #488ae7;
  transform: scale(1.07);
}

.main-content {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1rem 2rem 1rem;
}

.dashboard-hero {
  display: flex;
  align-items: center;
  gap: 2.5rem;
  background: linear-gradient(90deg, #eaf1ff 60%, #f7f5ff 100%);
  border-radius: 1.5rem;
  box-shadow: 0 2px 24px #7c4dff22;
  padding: 2.5rem 2rem 1.5rem 2rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}
.dashboard-avatar-wrap {
  position: relative;
  width: 120px;
  height: 120px;
}
.dashboard-avatar.dashboard-emoji {
  font-size: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 2px 12px #7c4dff22;
  border: 4px solid #fff;
}
.dashboard-info {
  flex: 1 1 320px;
  min-width: 220px;
}
.dashboard-name {
  font-size: 2rem;
  font-weight: 800;
  color: #2256c7;
  margin-bottom: 0.2em;
}
.dashboard-bio {
  color: #2256c7;
  font-size: 1.1em;
  margin-bottom: 1em;
}

.dashboard-stats {
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
}
.stat-card {
  background: #fff;
  border-radius: 1.2em;
  box-shadow: 0 2px 12px #7c4dff22;
  padding: 1.2em 2em;
  text-align: center;
  min-width: 120px;
}
.stat-number {
  font-size: 1.5em;
  font-weight: 800;
  color: #7c4dff;
  display: block;
}
.stat-label {
  color: #2256c7;
  font-size: 1em;
  font-weight: 600;
}

.dashboard-groups {
  margin-top: 2.5rem;
}
.groups-title {
  color: #2256c7;
  font-size: 1.3em;
  font-weight: 700;
  margin-bottom: 1em;
}
.no-groups {
  color: #7c4dff;
  background: #fafdff;
  border-radius: 1em;
  padding: 1.2em;
  text-align: center;
  font-size: 1.1em;
}
.groups-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 1.2em;
  flex-wrap: wrap;
}
.group-card {
  background: #fff;
  border-radius: 1.2em;
  box-shadow: 0 2px 12px #7c4dff22;
  padding: 1em 1.5em;
  display: flex;
  align-items: center;
  gap: 0.8em;
  min-width: 180px;
}
.group-emoji {
  font-size: 1.5em;
}
.group-name {
  color: #2256c7;
  font-weight: 700;
  flex: 1;
}
.group-link {
  background: #eaf1ff;
  color: #7c4dff;
  border-radius: 1em;
  padding: 0.3em 1.2em;
  font-weight: 700;
  font-size: 1em;
  text-decoration: none;
  transition: background 0.18s, color 0.18s;
}
.group-link:hover {
  background: #7c4dff;
  color: #fff;
}

@media (max-width: 900px) {
  .dashboard-hero {
    flex-direction: column;
    gap: 1.5rem;
    padding: 1.5rem 0.5rem 1rem 0.5rem;
    text-align: center;
  }
  .dashboard-stats {
    flex-direction: column;
    gap: 1.2rem;
    align-items: stretch;
  }
  .groups-list {
    flex-direction: column;
    gap: 1em;
  }
}
</style>