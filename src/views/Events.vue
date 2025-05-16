<template>
  <div class="events-page">
    <h1 class="events-title">Events</h1>
    <p class="events-desc">See what's happening in your community!</p>
    <div v-if="events.length === 0" class="events-empty">
      <i class="fas fa-calendar-times"></i>
      <span>No upcoming events at this time. Please check back later!</span>
    </div>
    <div v-else class="events-list">
      <div
        v-for="event in events"
        :key="event.id"
        class="event-card"
        :class="{ upcoming: event.upcoming }"
      >
        <span class="event-emoji">{{ event.emoji }}</span>
        <div class="event-info">
          <div class="event-header">
            <span class="event-title">{{ event.title }}</span>
            <span class="event-date">{{ event.date }}</span>
          </div>
          <div class="event-desc">{{ event.desc }}</div>
        </div>
        <span v-if="event.upcoming" class="event-upcoming-badge">Upcoming</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const events = ref([
  // Example events; replace with real data or API later
  // {
  //   id: 1,
  //   emoji: '🎵',
  //   title: 'Worship Night',
  //   desc: 'Join us for an evening of music and praise.',
  //   date: 'May 20, 7:00pm',
  //   upcoming: true
  // },
  // {
  //   id: 2,
  //   emoji: '📖',
  //   title: 'Bible Study',
  //   desc: 'Weekly group study on the Book of John.',
  //   date: 'May 22, 6:30pm',
  //   upcoming: true
  // }
])
</script>

<style scoped>
.events-page {
  max-width: 600px;
  margin: 3rem auto;
  background: #fff;
  border-radius: 1.5rem;
  box-shadow: 0 2px 24px #7c4dff22;
  padding: 2rem;
  font-family: 'Inter', Arial, sans-serif;
  text-align: center;
}
.events-title {
  color: #2256c7;
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
}
.events-desc {
  color: #7c4dff;
  margin-bottom: 2rem;
}
.events-empty {
  margin-top: 2rem;
  color: #7c4dff;
  font-size: 1.3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.7rem;
}
.events-empty i {
  font-size: 2.5rem;
  color: #bdbdbd;
}
.events-list {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin-bottom: 2rem;
}
.event-card {
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
.event-card.upcoming {
  background: #eaf1ff;
  font-weight: 600;
}
.event-emoji {
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
.event-info {
  flex: 1;
  text-align: left;
}
.event-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.2rem;
}
.event-title {
  font-weight: 600;
  color: #7c4dff;
}
.event-date {
  font-size: 0.95rem;
  color: #888;
}
.event-desc {
  color: #333;
  font-size: 1.05rem;
  white-space: normal;
}
.event-upcoming-badge {
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