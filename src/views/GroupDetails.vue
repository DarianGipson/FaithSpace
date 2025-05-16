<template>
  <div class="group-details-page">
    <h1 class="group-title">{{ group.emoji }} {{ group.name }}</h1>
    <p class="group-desc">{{ group.desc }}</p>
    <div class="group-meta">
      <span class="group-meta-item"><i class="fas fa-users"></i> {{ group.members }} members</span>
      <span class="group-meta-item"><i class="fas fa-calendar-alt"></i> Created: {{ group.created }}</span>
    </div>
    <div class="group-section">
      <h2 class="group-section-title">About</h2>
      <p>{{ group.about }}</p>
    </div>
    <div class="group-section">
      <h2 class="group-section-title">Recent Posts</h2>
      <div v-if="group.posts.length === 0" class="group-empty">
        <i class="fas fa-comment-slash"></i>
        <span>No posts yet. Be the first to share!</span>
      </div>
      <div v-else class="group-posts-list">
        <div v-for="post in group.posts" :key="post.id" class="group-post-card">
          <span class="group-post-emoji">{{ post.emoji }}</span>
          <div class="group-post-info">
            <div class="group-post-header">
              <span class="group-post-user">{{ post.user }}</span>
              <span class="group-post-time">{{ post.time }}</span>
            </div>
            <div class="group-post-message">{{ post.message }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const group = ref({
  emoji: '✝️',
  name: 'Faith Builders',
  desc: 'A group for encouragement, prayer, and growing together in faith.',
  members: 42,
  created: 'Jan 2024',
  about: 'We meet weekly for Bible study, prayer, and fellowship. All are welcome!',
  posts: [
    // Example:
    // {
    //   id: 1,
    //   emoji: '😊',
    //   user: 'Jordan',
    //   time: '2m ago',
    //   message: 'Excited for tonight\'s study!'
    // }
  ]
})
</script>

<style scoped>
.group-details-page {
  max-width: 600px;
  margin: 3rem auto;
  background: #fff;
  border-radius: 1.5rem;
  box-shadow: 0 2px 24px #7c4dff22;
  padding: 2rem;
  font-family: 'Inter', Arial, sans-serif;
  text-align: center;
}
.group-title {
  color: #2256c7;
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
}
.group-desc {
  color: #7c4dff;
  margin-bottom: 1.2rem;
}
.group-meta {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
  font-size: 1.05rem;
  color: #555;
}
.group-meta-item i {
  margin-right: 0.4rem;
  color: #7c4dff;
}
.group-section {
  margin-bottom: 2.2rem;
}
.group-section-title {
  color: #7c4dff;
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.7rem;
}
.group-empty {
  margin-top: 1rem;
  color: #7c4dff;
  font-size: 1.1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}
.group-empty i {
  font-size: 2rem;
  color: #bdbdbd;
}
.group-posts-list {
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
}
.group-post-card {
  display: flex;
  align-items: center;
  background: #f5f4ff;
  border-radius: 1rem;
  padding: 1rem 1.2rem;
  box-shadow: 0 1px 8px #7c4dff11;
  transition: background 0.2s;
  position: relative;
  cursor: pointer;
}
.group-post-emoji {
  font-size: 1.7rem;
  margin-right: 1rem;
  background: #fff;
  border-radius: 50%;
  width: 2.3rem;
  height: 2.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 6px #7c4dff22;
}
.group-post-info {
  flex: 1;
  text-align: left;
}
.group-post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.2rem;
}
.group-post-user {
  font-weight: 600;
  color: #7c4dff;
}
.group-post-time {
  font-size: 0.95rem;
  color: #888;
}
.group-post-message {
  color: #333;
  font-size: 1.05rem;
  white-space: normal;
}
</style>