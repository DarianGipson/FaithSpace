<template>
  <div class="inbox-page">
    <h1>Inbox</h1>
    <p class="inbox-desc">Your messages and conversations will appear here.</p>
    <div v-if="conversations.length === 0" class="inbox-empty">
      <i class="fas fa-inbox"></i>
      <span>No messages yet.</span>
    </div>
    <div v-else class="conversations-list">
      <div
        v-for="conv in conversations"
        :key="conv.id"
        class="conversation-card"
        :class="{ unread: conv.unread }"
      >
        <span class="conversation-emoji">{{ conv.emoji }}</span>
        <div class="conversation-info">
          <div class="conversation-header">
            <span class="conversation-name">{{ conv.name }}</span>
            <span class="conversation-time">{{ conv.time }}</span>
          </div>
          <div class="conversation-preview">{{ conv.preview }}</div>
        </div>
        <span v-if="conv.unread" class="conversation-unread-badge">New</span>
      </div>
    </div>
    <button class="new-message-btn" @click="showNewMessage = true">
      <span class="messages-emoji" aria-hidden="true">💬</span> New Message
    </button>

    <!-- New Message Modal -->
    <div v-if="showNewMessage" class="modal-overlay" @click.self="closeNewMessage">
      <div class="modal new-message-modal">
        <h3>New Message</h3>
        <form @submit.prevent="sendMessage">
          <div class="modal-field">
            <label for="recipient">To:</label>
            <input
              id="recipient"
              v-model="newMessage.recipient"
              type="text"
              placeholder="Recipient name"
              required
              autocomplete="off"
            />
          </div>
          <div class="modal-field">
            <label for="emoji">Emoji:</label>
            <select id="emoji" v-model="newMessage.emoji">
              <option v-for="emoji in emojiOptions" :key="emoji" :value="emoji">{{ emoji }}</option>
            </select>
          </div>
          <div class="modal-field">
            <label for="message">Message:</label>
            <textarea
              id="message"
              v-model="newMessage.text"
              placeholder="Type your message..."
              required
              rows="3"
            ></textarea>
          </div>
          <div class="modal-actions">
            <button type="submit" class="send-btn">Send</button>
            <button type="button" class="cancel-btn" @click="closeNewMessage">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const conversations = ref([
  {
    id: 1,
    name: 'Jordan',
    emoji: '😊',
    preview: 'Hey! Are you coming to group tonight?',
    time: '2m ago',
    unread: true
  },
  {
    id: 2,
    name: 'Emily',
    emoji: '😇',
    preview: 'Praying for you! 🙏',
    time: '1h ago',
    unread: false
  }
])

const showNewMessage = ref(false)
const newMessage = ref({
  recipient: '',
  emoji: '😊',
  text: ''
})
const emojiOptions = ['😊', '😇', '😎', '👼', '✝️', '🕊️', '📖', '🐟', '💙']

function closeNewMessage() {
  showNewMessage.value = false
  newMessage.value = { recipient: '', emoji: '😊', text: '' }
}

function sendMessage() {
  if (!newMessage.value.recipient || !newMessage.value.text) return
  conversations.value.unshift({
    id: Date.now(),
    name: newMessage.value.recipient,
    emoji: newMessage.value.emoji,
    preview: newMessage.value.text,
    time: 'now',
    unread: true
  })
  closeNewMessage()
}
</script>

<style scoped>
.inbox-page {
  max-width: 600px;
  margin: 3rem auto;
  background: #fff;
  border-radius: 1.5rem;
  box-shadow: 0 2px 24px #7c4dff22;
  padding: 2rem;
  font-family: 'Inter', Arial, sans-serif;
  text-align: center;
}
.inbox-desc {
  color: #7c4dff;
  margin-bottom: 2rem;
}
.inbox-empty {
  margin-top: 2rem;
  color: #7c4dff;
  font-size: 1.3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.7rem;
}
.inbox-empty i {
  font-size: 2.5rem;
  color: #488ae7;
}
.conversations-list {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin-bottom: 2rem;
}
.conversation-card {
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
.conversation-card.unread {
  background: #eaf1ff;
  font-weight: 600;
}
.conversation-emoji {
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
.conversation-info {
  flex: 1;
  text-align: left;
}
.conversation-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.2rem;
}
.conversation-name {
  font-weight: 600;
  color: #7c4dff;
}
.conversation-time {
  font-size: 0.95rem;
  color: #888;
}
.conversation-preview {
  color: #333;
  font-size: 1.05rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.conversation-unread-badge {
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
.new-message-btn {
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
.new-message-btn:hover {
  background: #6a3fda;
}
.messages-emoji {
  font-size: 1.5rem;
  margin-right: 0.5rem;
}

/* Modal Styles */
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
.new-message-modal h3 {
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