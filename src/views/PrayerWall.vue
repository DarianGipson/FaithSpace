<template>
  <div class="prayer-wall-page">
    <h1 class="prayer-wall-title">Prayer Wall</h1>
    <p class="prayer-wall-desc">Share your prayer requests and pray for others here.</p>
    <div v-if="prayers.length === 0" class="prayer-wall-empty">
      <i class="fas fa-praying-hands"></i>
      <span>No prayer requests yet. Be the first to share!</span>
    </div>
    <div v-else class="prayer-list">
      <div
        v-for="prayer in prayers"
        :key="prayer.id"
        class="prayer-card"
        :class="{ answered: prayer.answered }"
      >
        <span class="prayer-emoji">{{ prayer.emoji }}</span>
        <div class="prayer-info">
          <div class="prayer-header">
            <span class="prayer-user">{{ prayer.name }}</span>
            <span class="prayer-time">{{ prayer.time }}</span>
          </div>
          <div class="prayer-message">{{ prayer.message }}</div>
        </div>
        <span v-if="prayer.answered" class="prayer-answered-badge">Answered</span>
      </div>
    </div>
    <button class="new-prayer-btn" @click="showNewPrayer = true">
      <span class="prayer-emoji" aria-hidden="true">🙏</span> New Prayer Request
    </button>

    <!-- New Prayer Modal -->
    <div v-if="showNewPrayer" class="modal-overlay" @click.self="closeNewPrayer">
      <div class="modal new-prayer-modal">
        <h3>New Prayer Request</h3>
        <form @submit.prevent="addPrayer">
          <div class="modal-field">
            <label for="prayer-name">Name:</label>
            <input
              id="prayer-name"
              v-model="newPrayer.name"
              type="text"
              placeholder="Your name"
              required
              autocomplete="off"
            />
          </div>
          <div class="modal-field">
            <label for="prayer-emoji">Emoji:</label>
            <select id="prayer-emoji" v-model="newPrayer.emoji">
              <option v-for="emoji in emojiOptions" :key="emoji" :value="emoji">{{ emoji }}</option>
            </select>
          </div>
          <div class="modal-field">
            <label for="prayer-message">Prayer Request:</label>
            <textarea
              id="prayer-message"
              v-model="newPrayer.message"
              placeholder="Type your prayer request..."
              required
              rows="3"
            ></textarea>
          </div>
          <div class="modal-actions">
            <button type="submit" class="send-btn">Post</button>
            <button type="button" class="cancel-btn" @click="closeNewPrayer">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const prayers = ref([
  // Example:
  // {
  //   id: 1,
  //   name: 'Jordan',
  //   emoji: '😊',
  //   message: 'Please pray for my family.',
  //   time: '2m ago',
  //   answered: false
  // }
])

const showNewPrayer = ref(false)
const newPrayer = ref({
  name: '',
  emoji: '🙏',
  message: ''
})
const emojiOptions = ['🙏', '😊', '😇', '💙', '🕊️', '✝️', '👼', '🌟']

function closeNewPrayer() {
  showNewPrayer.value = false
  newPrayer.value = { name: '', emoji: '🙏', message: '' }
}

function addPrayer() {
  if (!newPrayer.value.name || !newPrayer.value.message) return
  prayers.value.unshift({
    id: Date.now(),
    name: newPrayer.value.name,
    emoji: newPrayer.value.emoji,
    message: newPrayer.value.message,
    time: 'now',
    answered: false
  })
  closeNewPrayer()
}
</script>

<style scoped>
.prayer-wall-page {
  max-width: 600px;
  margin: 3rem auto;
  background: #fff;
  border-radius: 1.5rem;
  box-shadow: 0 2px 24px #7c4dff22;
  padding: 2rem;
  font-family: 'Inter', Arial, sans-serif;
  text-align: center;
}
.prayer-wall-title {
  color: #2256c7;
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
}
.prayer-wall-desc {
  color: #7c4dff;
  margin-bottom: 2rem;
}
.prayer-wall-empty {
  margin-top: 2rem;
  color: #7c4dff;
  font-size: 1.3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.7rem;
}
.prayer-wall-empty i {
  font-size: 2.5rem;
  color: #bdbdbd;
}
.prayer-list {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin-bottom: 2rem;
}
.prayer-card {
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
.prayer-card.answered {
  background: #eaf1ff;
  font-weight: 600;
}
.prayer-emoji {
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
.prayer-info {
  flex: 1;
  text-align: left;
}
.prayer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.2rem;
}
.prayer-user {
  font-weight: 600;
  color: #7c4dff;
}
.prayer-time {
  font-size: 0.95rem;
  color: #888;
}
.prayer-message {
  color: #333;
  font-size: 1.05rem;
  white-space: normal;
}
.prayer-answered-badge {
  background: #43a047;
  color: #fff;
  border-radius: 1rem;
  padding: 0.2rem 0.7rem;
  font-size: 0.85rem;
  margin-left: 1rem;
  position: absolute;
  right: 1.2rem;
  top: 1.2rem;
}
.new-prayer-btn {
  display: inline-flex;
  align-items: center;
  padding: 0.6rem 1.3rem;
  background: #7c4dff;
  color: #fff;
  border-radius: 2rem;
  border: none;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 8px #7c4dff33;
  transition: background 0.2s;
  margin-top: 1.5rem;
}
.new-prayer-btn:hover {
  background: #6a3fda;
}
.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: #7c4dff44;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal {
  background: #fff;
  border-radius: 1.2rem;
  box-shadow: 0 2px 32px #7c4dff33;
  padding: 2rem 1.5rem 1.5rem 1.5rem;
  min-width: 320px;
  max-width: 95vw;
  text-align: left;
  position: relative;
}
.new-prayer-modal h3 {
  color: #7c4dff;
  margin-bottom: 1.2rem;
  text-align: center;
}
.modal-field {
  margin-bottom: 1.1rem;
  display: flex;
  flex-direction: column;
}
.modal-field label {
  font-weight: 600;
  color: #7c4dff;
  margin-bottom: 0.3rem;
}
.modal-field input,
.modal-field textarea,
.modal-field select {
  border: 1px solid #d1c4e9;
  border-radius: 0.7rem;
  padding: 0.5rem 0.8rem;
  font-size: 1.05rem;
  font-family: inherit;
  background: #f8f7ff;
  outline: none;
  transition: border 0.2s;
}
.modal-field input:focus,
.modal-field textarea:focus,
.modal-field select:focus {
  border: 1.5px solid #7c4dff;
}
.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.7rem;
  margin-top: 1.2rem;
}
.send-btn {
  background: #7c4dff;
  color: #fff;
  border: none;
  border-radius: 1.2rem;
  padding: 0.5rem 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.send-btn:hover {
  background: #6a3fda;
}
.cancel-btn {
  background: #eee;
  color: #7c4dff;
  border: none;
  border-radius: 1.2rem;
  padding: 0.5rem 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.cancel-btn:hover {
  background: #e0d7fa;
}
</style>