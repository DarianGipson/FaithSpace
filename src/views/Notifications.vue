<template>
  <div class="notifications-page">
    <h1>Notifications</h1>
    <p class="notifications-desc">Stay up to date with your latest activity and alerts.</p>
    <div v-if="notifications.length === 0" class="notifications-empty">
      <i class="fas fa-bell-slash"></i>
      <span>No notifications at this time.</span>
    </div>
    <div v-else class="notifications-list">
      <div
        v-for="notif in notifications"
        :key="notif.id"
        class="notification-card"
        :class="{ unread: notif.unread }"
      >
        <span class="notification-emoji">{{ notif.emoji }}</span>
        <div class="notification-info">
          <div class="notification-header">
            <span class="notification-title">{{ notif.title }}</span>
            <span class="notification-time">{{ notif.time }}</span>
          </div>
          <div class="notification-message">{{ notif.message }}</div>
        </div>
        <span v-if="notif.unread" class="notification-unread-badge">New</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const notifications = ref([
  // Example notifications; replace with real data or API later
  {
    id: 1,
    emoji: '💬',
    title: 'New Comment',
    message: 'Jordan commented on your post.',
    time: '2m ago',
    unread: true
  },
  {
    id: 2,
    emoji: '❤️',
    title: 'New Like',
    message: 'Emily liked your post.',
    time: '1h ago',
    unread: false
  },
  {
    id: 3,
    emoji: '👤',
    title: 'New Follower',
    message: 'Chris started following you.',
    time: '3h ago',
    unread: true
  }
])
</script>

<style scoped>
.notifications-page {
  max-width: 600px;
  margin: 3rem auto;
  background: #fff;
  border-radius: 1.5rem;
  box-shadow: 0 2px 24px #7c4dff22;
  padding: 2rem;
  font-family: 'Inter', Arial, sans-serif;
  text-align: center;
}
.notifications-desc {
  color: #7c4dff;
  margin-bottom: 2rem;
}
.notifications-empty {
  margin-top: 2rem;
  color: #7c4dff;
  font-size: 1.3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.7rem;
}
.notifications-empty i {
  font-size: 2.5rem;
  color: #bdbdbd;
}
.notifications-list {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin-bottom: 2rem;
}
.notification-card {
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
.notification-card.unread {
  background: #eaf1ff;
  font-weight: 600;
}
.notification-emoji {
  font-size: 2rem;
  margin-right: 1rem;
  background: #fff;
  border-radius: 50%;
  width: 2.7rem;
  height: 2.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 6px #7c4dff22;
}
.notification-info {
  flex: 1;
  text-align: left;
}
.notification-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.2rem;
}
.notification-title {
  font-weight: 600;
  color: #7c4dff;
}
.notification-time {
  font-size: 0.95rem;
  color: #888;
}
.notification-message {
  color: #333;
  font-size: 1.05rem;
  white-space: normal;
}
.notification-unread-badge {
  background: #ff3d00;
  color: #fff;
  border-radius: 1rem;
  padding: 0.2rem 0.7rem;
  font-size: 0.85rem;
  margin-left: 1rem;
  position: absolute;
  right: 1.2rem;
  top: 1.2rem;
}
</style>