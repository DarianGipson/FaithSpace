<template>
  <div class="profile-page">
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
        <li><router-link to="/join" exact-active-class="active" class="join-now-link">Join Now</router-link></li>
        <li><router-link to="/login" exact-active-class="active" class="login-link">Log In</router-link></li>
      </ul>
    </nav>

    <main class="main-content">
      <section class="profile-hero">
        <div class="profile-avatar-wrap">
          <div class="profile-avatar profile-emoji" title="Profile Avatar">{{ user.emoji }}</div>
          <button class="edit-avatar-btn" @click="editAvatar = true" title="Change Avatar">✏️</button>
        </div>
        <div class="profile-info">
          <h1 class="profile-name">{{ user.name }}</h1>
          <span class="profile-username">@{{ user.username }}</span>
          <div class="profile-badges">
            <span class="profile-badge" v-for="badge in user.badges" :key="badge">{{ badge }}</span>
          </div>
          <p class="profile-bio">{{ user.bio }}</p>
          <button class="edit-profile-btn" @click="editProfile = true">Edit Profile</button>
        </div>
      </section>

      <section class="profile-stats">
        <div class="stat-card">
          <span class="stat-number">{{ user.posts }}</span>
          <span class="stat-label">Posts</span>
        </div>
        <div class="stat-card">
          <span class="stat-number">{{ user.followers }}</span>
          <span class="stat-label">Followers</span>
        </div>
        <div class="stat-card">
          <span class="stat-number">{{ user.following }}</span>
          <span class="stat-label">Following</span>
        </div>
        <div class="stat-card">
          <span class="stat-number">{{ user.groups }}</span>
          <span class="stat-label">Groups</span>
        </div>
      </section>

      <section class="profile-feed">
        <h2 class="feed-title">Your Recent Posts</h2>
        <div v-if="posts.length === 0" class="no-posts">You haven't posted yet. <router-link to="/community">Join the conversation!</router-link></div>
        <div v-else>
          <div class="feed-post" v-for="post in posts" :key="post.id">
            <div class="feed-post-header">
              <span class="feed-avatar post-emoji">{{ user.emoji }}</span>
              <div>
                <span class="feed-name">{{ user.name }}</span>
                <span class="feed-date">{{ post.date }}</span>
              </div>
            </div>
            <div class="feed-post-content">{{ post.content }}</div>
            <div class="feed-post-actions">
              <button class="feed-action-btn">👍 {{ post.likes }}</button>
              <button class="feed-action-btn">💬 {{ post.comments }}</button>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Edit Profile Modal -->
    <div v-if="editProfile" class="modal-overlay" @click.self="editProfile = false">
      <div class="modal">
        <h3>Edit Profile</h3>
        <form @submit.prevent="saveProfile">
          <input v-model="editForm.name" placeholder="Name" required />
          <input v-model="editForm.username" placeholder="Username" required />
          <textarea v-model="editForm.bio" placeholder="Bio"></textarea>
          <button type="submit" class="save-btn">Save</button>
        </form>
        <button class="modal-close" @click="editProfile = false">Cancel</button>
      </div>
    </div>

    <!-- Edit Avatar Modal -->
    <div v-if="editAvatar" class="modal-overlay" @click.self="editAvatar = false">
      <div class="modal">
        <h3>Change Avatar</h3>
        <div style="font-size:2.5rem; margin-bottom:1rem;">
          <button v-for="emoji in emojiOptions" :key="emoji" @click="setEmoji(emoji)" style="background:none;border:none;cursor:pointer;font-size:2.5rem;">
            {{ emoji }}
          </button>
        </div>
        <button class="modal-close" @click="editAvatar = false">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const user = ref({
  name: 'Jordan Rivers',
  username: 'jordanr',
  emoji: '🧑‍🦱',
  bio: 'Follower of Christ • Musician • Group Leader',
  badges: ['Encourager', 'Prayer Warrior'],
  posts: 3,
  followers: 128,
  following: 87,
  groups: 4
})

const posts = ref([
  {
    id: 1,
    date: 'May 14, 2025',
    content: 'Excited to join the FaithSpace Bible study group tonight!',
    likes: 12,
    comments: 3
  },
  {
    id: 2,
    date: 'May 12, 2025',
    content: 'Thankful for this uplifting community. 🙏',
    likes: 18,
    comments: 5
  },
  {
    id: 3,
    date: 'May 10, 2025',
    content: 'Shared a prayer request and was overwhelmed by support.',
    likes: 22,
    comments: 7
  }
])

const editProfile = ref(false)
const editAvatar = ref(false)
const editForm = ref({
  name: user.value.name,
  username: user.value.username,
  bio: user.value.bio
})

const emojiOptions = ['🧑‍🦱', '😊', '😇', '😎', '👼', '✝️', '🕊️', '📖', '🐟', '💙']

function saveProfile() {
  user.value.name = editForm.value.name
  user.value.username = editForm.value.username
  user.value.bio = editForm.value.bio
  editProfile.value = false
}

function setEmoji(emoji) {
  user.value.emoji = emoji
  editAvatar.value = false
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');

.profile-page {
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
.navLinks .join-now-link {
  background: linear-gradient(90deg, #488ae7 60%, #7c4dff 100%);
  color: #fff !important;
  font-weight: 800;
  border-radius: 2rem;
  padding: 0.5rem 1.5rem;
  margin-left: 0.7rem;
  box-shadow: 0 2px 8px #7c4dff33;
}
.navLinks .login-link {
  background: #fff;
  color: #7c4dff !important;
  font-weight: 800;
  border-radius: 2rem;
  padding: 0.5rem 1.5rem;
  margin-left: 0.5rem;
  box-shadow: 0 2px 8px #7c4dff22;
  border: 2px solid #7c4dff;
}
.navLinks .join-now-link:hover,
.navLinks .join-now-link.active {
  background: linear-gradient(90deg, #7c4dff 60%, #488ae7 100%);
  color: #fff !important;
  transform: scale(1.07);
}
.navLinks .login-link:hover,
.navLinks .login-link.active {
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

.profile-hero {
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
.profile-avatar-wrap {
  position: relative;
  width: 120px;
  height: 120px;
}
.profile-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #fff;
  box-shadow: 0 2px 12px #7c4dff22;
}
.edit-avatar-btn {
  position: absolute;
  bottom: 0;
  right: 0;
  background: #7c4dff;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 2.2em;
  height: 2.2em;
  font-size: 1.2em;
  cursor: pointer;
  box-shadow: 0 2px 8px #7c4dff33;
  transition: background 0.18s;
}
.edit-avatar-btn:hover {
  background: #488ae7;
}
.profile-info {
  flex: 1 1 320px;
  min-width: 220px;
}
.profile-name {
  font-size: 2rem;
  font-weight: 800;
  color: #2256c7;
  margin-bottom: 0.2em;
}
.profile-username {
  color: #7c4dff;
  font-weight: 700;
  font-size: 1.1em;
  margin-bottom: 0.7em;
  display: block;
}
.profile-badges {
  margin-bottom: 0.7em;
}
.profile-badge {
  background: #eaf1ff;
  color: #7c4dff;
  border-radius: 1em;
  padding: 0.2em 0.9em;
  font-size: 0.98em;
  font-weight: 700;
  margin-right: 0.5em;
  display: inline-block;
}
.profile-bio {
  color: #2256c7;
  font-size: 1.1em;
  margin-bottom: 1em;
}
.edit-profile-btn {
  background: #7c4dff;
  color: #fff;
  border: none;
  border-radius: 1.2em;
  padding: 0.5em 1.5em;
  font-weight: 700;
  font-size: 1em;
  cursor: pointer;
  transition: background 0.18s;
  box-shadow: 0 2px 8px #7c4dff22;
}
.edit-profile-btn:hover {
  background: #488ae7;
}

.profile-stats {
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

.profile-feed {
  margin-top: 2.5rem;
}
.feed-title {
  color: #2256c7;
  font-size: 1.3em;
  font-weight: 700;
  margin-bottom: 1em;
}
.no-posts {
  color: #7c4dff;
  background: #fafdff;
  border-radius: 1em;
  padding: 1.2em;
  text-align: center;
  font-size: 1.1em;
}
.feed-post {
  background: #fff;
  border-radius: 1.2em;
  box-shadow: 0 2px 12px #7c4dff22;
  padding: 1.2em 1.5em;
  margin-bottom: 1.5em;
}
.feed-post-header {
  display: flex;
  align-items: center;
  gap: 1em;
  margin-bottom: 0.7em;
}
.feed-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #eaf1ff;
}
.feed-name {
  color: #2256c7;
  font-weight: 700;
  font-size: 1.1em;
  margin-right: 0.7em;
}
.feed-date {
  color: #7c4dff;
  font-size: 0.98em;
}
.feed-post-content {
  color: #2256c7;
  font-size: 1.08em;
  margin-bottom: 0.7em;
}
.feed-post-actions {
  display: flex;
  gap: 1.2em;
}
.feed-action-btn {
  background: #eaf1ff;
  color: #7c4dff;
  border: none;
  border-radius: 1em;
  padding: 0.3em 1.2em;
  font-weight: 700;
  font-size: 1em;
  cursor: pointer;
  transition: background 0.18s;
}
.feed-action-btn:hover {
  background: #7c4dff;
  color: #fff;
}

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
.modal input,
.modal textarea {
  width: 90%;
  margin: 0.5em 0;
  padding: 0.7em;
  border-radius: 0.7em;
  border: 1.5px solid #eaf1ff;
  font-size: 1.08em;
  background: #fafdff;
  color: #2256c7;
  outline: none;
  transition: border 0.2s, box-shadow 0.2s;
}
.modal input:focus,
.modal textarea:focus {
  border: 1.5px solid #7c4dff;
  box-shadow: 0 2px 8px #7c4dff22;
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
.modal-close {
  background: #fff;
  color: #7c4dff;
  border: 2px solid #7c4dff;
  border-radius: 24px;
  padding: 0.5em 1.5em;
  font-weight: 700;
  font-size: 1.05em;
  cursor: pointer;
  transition: background 0.18s, color 0.18s, box-shadow 0.18s;
  box-shadow: 0 2px 8px #7c4dff22;
  margin-top: 1em;
}
.modal-close:hover, .modal-close:focus {
  background: #7c4dff;
  color: #fff;
  box-shadow: 0 4px 16px #7c4dff33;
}
@media (max-width: 900px) {
  .profile-hero {
    flex-direction: column;
    gap: 1.5rem;
    padding: 1.5rem 0.5rem 1rem 0.5rem;
    text-align: center;
  }
  .profile-stats {
    flex-direction: column;
    gap: 1.2rem;
    align-items: stretch;
  }
}
.profile-emoji {
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
.post-emoji {
  font-size: 1.7rem;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 2px 8px #7c4dff22;
  border: 2px solid #eaf1ff;
}
</style>