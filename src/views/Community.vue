<template>
  <div class="faithspace-community">
    <!-- NAVBAR -->
    <nav class="navigationbar glass-nav" role="navigation" aria-label="Main navigation">
      <div class="logoWrap">
        <img
          class="logo"
          src="/src/assets/logo.png"
          alt="FaithSpace Logo"
          loading="lazy"
          tabindex="0"
          aria-label="FaithSpace Home"
          @click="$router.push('/')"
          style="cursor:pointer;"
        />
      </div>
      <input
        class="search-bar"
        v-model="searchQuery"
        placeholder="Search FaithSpace…"
        @keyup.enter="performSearch"
        @focus="playInputSound"
      />
      <ul class="navLinks">
        <li><router-link to="/" exact-active-class="active">Home</router-link></li>
        <li><router-link to="/about" exact-active-class="active">About</router-link></li>
        <li><router-link to="/features" exact-active-class="active">Features</router-link></li>
        <li><router-link to="/community" exact-active-class="active">Community</router-link></li>
        <li><router-link to="/join" exact-active-class="active">Join Now</router-link></li>
        <li><router-link to="/login" exact-active-class="active">Log In</router-link></li>
      </ul>
    </nav>

    <!-- HERO SECTION -->
    <section class="community-hero">
      <div class="hero-content">
        <h1>
          <span class="accent">FaithSpace Community</span>
        </h1>
        <p>
          Connect, pray, and grow with believers from around the world.<br>
          Join groups, share testimonies, and encourage one another in Christ!
        </p>
        <div class="hero-actions">
          <router-link to="/join" class="hero-cta">Join the Community</router-link>
          <button class="start-group-btn" @click="showGroupModal = true">Start a Group</button>
        </div>
        <div class="online-users">
          <span class="dot"></span>
          {{ onlineUsers }} online now
        </div>
        <div class="invite-link">
          <span>Invite a friend:</span>
          <input class="invite-input" :value="inviteUrl" readonly @focus="$event.target.select()" />
          <button class="copy-btn" @click="copyInvite">Copy</button>
          <span v-if="copied" class="copied-msg">Copied!</span>
        </div>
      </div>
      <div class="hero-image-wrap">
        <img src="/src/assets/IMG_CP22.png" alt="FaithSpace Community" class="hero-image" />
      </div>
    </section>

    <!-- MAIN CONTENT -->
    <main class="main-content">
      <section class="community-cards">
        <div
          v-for="(card, i) in cards"
          :key="card.title"
          class="glass-card community-card"
          :style="{ animationDelay: (i * 0.08) + 's' }"
          tabindex="0"
        >
          <div class="community-card-icon" v-html="card.icon"></div>
          <h2>{{ card.title }}</h2>
          <p>{{ card.text }}</p>
          <router-link v-if="card.link" :to="card.link" class="card-link">Explore</router-link>
        </div>
      </section>
    </main>

    <!-- START GROUP MODAL -->
    <div v-if="showGroupModal" class="modal-overlay" @click.self="showGroupModal = false">
      <div class="modal">
        <h3>Start a New Group</h3>
        <form @submit.prevent="submitGroup">
          <input v-model="groupName" placeholder="Group name…" required />
          <textarea v-model="groupDesc" placeholder="What’s this group about?" required></textarea>
          <button type="submit">Create Group</button>
          <button type="button" class="modal-close" @click="showGroupModal = false">Cancel</button>
        </form>
        <div v-if="groupCreated" class="group-success">Your group has been created!</div>
      </div>
    </div>

    <!-- FAQ POPUP TRIGGER BUTTON -->
    <button class="faq-popup-btn" @click="showFaq = true">FAQ / Help Center</button>

    <!-- FAQ MODAL -->
    <div v-if="showFaq" class="modal-overlay" @click.self="showFaq = false">
      <div class="modal-content">
        <button class="modal-close" @click="showFaq = false">&times;</button>
        <h2>FAQ / Help Center</h2>
        <ul class="faq-list">
          <li>
            <strong>How do I join a group?</strong>
            <p>Click "Join the Community" and follow the prompts to sign up and join groups that interest you.</p>
          </li>
          <li>
            <strong>How do I reset my password?</strong>
            <p>Click "Forgot Password?" on the login page and follow the instructions.</p>
          </li>
          <li>
            <strong>How do I contact support?</strong>
            <p>Use the Contact link in the footer or email us at <a href="mailto:hello@faithspace.com">hello@faithspace.com</a>.</p>
          </li>
          <li>
            <strong>Is FaithSpace free?</strong>
            <p>Yes! FaithSpace is a free ministry platform for all believers.</p>
          </li>
        </ul>
      </div>
    </div>

    <!-- FOOTER -->
    <footer class="footer">
      <div class="footer-main">
        <div class="footer-logo">
          <img src="/src/assets/logo.png" alt="FaithSpace Logo" />
          <span class="footer-tagline">FaithSpace Ministry &mdash; United in Christ</span>
        </div>
        <ul class="footer-links">
          <li><router-link to="/about">About Us</router-link></li>
          <li><router-link to="/features" class="footer-nav-link">Features</router-link></li>
          <li><router-link to="/community" class="footer-nav-link">Community</router-link></li>
          <li><router-link to="/events" class="footer-nav-link">Events</router-link></li>
          <li><router-link to="/contact">Contact</router-link></li>
          <li><router-link to="/terms">Terms</router-link></li>
          <li><router-link to="/privacy">Privacy</router-link></li>
        </ul>
        <div class="footer-ministry-message">
          <strong>FaithSpace is a non-profit Christian ministry.</strong><br>
          Our mission: Connect, encourage, and grow together in Christ.<br>
          <a href="mailto:hello@faithspace.com" class="footer-contact-link">Contact Ministry Team</a>
        </div>
        <div class="footer-bottom">
          © 2025 FaithSpace. All rights reserved.<br>
          FaithSpace is a ministry for all believers. <span class="footer-scripture">"Let us consider how we may spur one another on toward love and good deeds." – Hebrews 10:24</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const searchQuery = ref('')
function performSearch() { searchQuery.value = '' }
function playInputSound() {}

const cards = [
  {
    icon: '👥',
    title: 'Groups',
    text: 'Find or create groups for Bible study, youth, interests, or support. Build lasting friendships in Christ.',
    link: '/groups/1' // Only this card links to group details
  },
  {
    icon: '🙏',
    title: 'Prayer Wall',
    text: 'Share prayer requests, pray for others, and see God move through the power of united prayer.',
    link: '/prayer-wall'
  },
  {
    icon: '💬',
    title: 'Testimonies',
    text: 'Share your story and celebrate answered prayers. Your testimony can inspire and encourage others!',
    link: '/features'
  }
]

// Simulate live online users
const onlineUsers = ref(Math.floor(120 + Math.random() * 80))
setInterval(() => {
  onlineUsers.value = Math.floor(120 + Math.random() * 80)
}, 4000)

// Invite link
const inviteUrl = window.location.origin + '/join'
const copied = ref(false)
function copyInvite() {
  navigator.clipboard.writeText(inviteUrl)
  copied.value = true
  setTimeout(() => (copied.value = false), 1200)
}

// Start group modal
const showGroupModal = ref(false)
const groupName = ref('')
const groupDesc = ref('')
const groupCreated = ref(false)
function submitGroup() {
  groupCreated.value = true
  groupName.value = ''
  groupDesc.value = ''
  setTimeout(() => {
    showGroupModal.value = false
    groupCreated.value = false
  }, 1800)
}

// FAQ modal
const showFaq = ref(false)
</script>

<style scoped>
.faithspace-community {
  font-family: 'Inter', Arial, sans-serif;
  min-height: 100vh;
  background: linear-gradient(135deg, #f7faff 0%, #eaf1ff 100%);
}

/* NAVBAR */
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
.search-bar {
  border: none;
  outline: none;
  background: rgba(124, 77, 255, 0.08);
  border-radius: 2rem;
  padding: 0.6rem 1.2rem;
  font-size: 1.08rem;
  color: #2256c7;
  margin-right: 1rem;
  transition: box-shadow 0.2s, background 0.2s;
  width: 220px;
  box-shadow: 0 2px 12px #7c4dff22;
  backdrop-filter: blur(6px);
  font-weight: 500;
}
.search-bar:focus {
  background: rgba(124, 77, 255, 0.18);
  box-shadow: 0 0 0 2px #7c4dff;
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
.community-hero {
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
}
.community-hero h1 {
  font-size: 2.7rem;
  font-weight: 900;
  color: #2256c7;
  margin-bottom: 0.7rem;
}
.accent { color: #7c4dff; }
.community-hero p {
  font-size: 1.25rem;
  color: #555;
  margin-bottom: 1.2rem;
}
.hero-actions {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.2rem;
}
.hero-cta {
  background: linear-gradient(90deg, #488ae7 60%, #7c4dff 100%);
  color: #fff;
  font-weight: 700;
  font-size: 1.1rem;
  padding: 0.7rem 2rem;
  border-radius: 24px;
  text-decoration: none;
  border: none;
  transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 8px #488ae733;
  cursor: pointer;
  display: inline-block;
}
.hero-cta:hover, .hero-cta:focus {
  background: linear-gradient(90deg, #7c4dff 60%, #488ae7 100%);
  transform: scale(1.07);
  box-shadow: 0 4px 16px #7c4dff33;
  outline: none;
}
.start-group-btn {
  background: #fff;
  color: #7c4dff;
  border: 2px solid #7c4dff;
  border-radius: 24px;
  padding: 0.7rem 1.5rem;
  font-weight: 700;
  font-size: 1.05rem;
  cursor: pointer;
  transition: background 0.18s, color 0.18s, box-shadow 0.18s;
  box-shadow: 0 2px 8px #7c4dff22;
}
.start-group-btn:hover, .start-group-btn:focus {
  background: #7c4dff;
  color: #fff;
  box-shadow: 0 4px 16px #7c4dff33;
}
.online-users {
  margin-bottom: 1rem;
  color: #488ae7;
  font-weight: 600;
  font-size: 1.08rem;
  display: flex;
  align-items: center;
  gap: 0.5em;
}
.dot {
  display: inline-block;
  width: 0.8em;
  height: 0.8em;
  background: #4be04b;
  border-radius: 50%;
  margin-right: 0.3em;
  box-shadow: 0 0 8px #4be04b88;
  animation: pulse 1.2s infinite alternate;
}
@keyframes pulse {
  from { box-shadow: 0 0 8px #4be04b88; }
  to { box-shadow: 0 0 16px #4be04bcc; }
}
.invite-link {
  display: flex;
  align-items: center;
  gap: 0.5em;
  margin-bottom: 0.5rem;
  font-size: 1rem;
}
.invite-input {
  border: 1px solid #eaf1ff;
  border-radius: 0.7rem;
  padding: 0.3em 0.8em;
  font-size: 1rem;
  width: 180px;
  background: #fafdff;
  color: #2256c7;
}
.copy-btn {
  background: #7c4dff;
  color: #fff;
  border: none;
  border-radius: 1em;
  padding: 0.3em 1em;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.18s;
}
.copy-btn:hover { background: #488ae7; }
.copied-msg {
  color: #4be04b;
  font-weight: 700;
  margin-left: 0.5em;
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
  max-width: 400px;
  border-radius: 1.5rem;
  box-shadow: 0 4px 24px #7c4dff22;
  object-fit: cover;
  animation: fadeInUp 1.2s cubic-bezier(.23,1.01,.32,1) 0.2s both;
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(40px);}
  to { opacity: 1; transform: translateY(0);}
}

/* COMMUNITY CARDS */
.community-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  margin-bottom: 2.5rem;
}
.community-card {
  flex: 1 1 320px;
  min-width: 260px;
  max-width: 340px;
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
  cursor: pointer;
  animation: fadeInCard 0.7s cubic-bezier(.23,1.01,.32,1) both;
}
.community-card:focus,
.community-card:hover {
  box-shadow: 0 8px 32px #488ae744;
  background: #fafdff;
  transform: translateY(-4px) scale(1.03);
}
@keyframes fadeInCard {
  from { opacity: 0; transform: translateY(30px);}
  to { opacity: 1; transform: translateY(0);}
}
.community-card-icon {
  font-size: 2.1rem;
  margin-bottom: 0.7rem;
  filter: drop-shadow(0 2px 8px #7c4dff22);
  animation: popIn 0.7s cubic-bezier(.23,1.01,.32,1) both;
}
@keyframes popIn {
  from { opacity: 0; transform: scale(0.7);}
  to { opacity: 1; transform: scale(1);}
}
.card-link {
  margin-top: 1rem;
  color: #7c4dff;
  font-weight: 700;
  text-decoration: underline;
  font-size: 1.05rem;
  transition: color 0.18s;
}
.card-link:hover { color: #488ae7; }

/* MODAL */
.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(44, 44, 66, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3000;
}
.modal-content {
  background: #fff;
  border-radius: 1.5rem;
  box-shadow: 0 2px 24px #7c4dff22;
  padding: 2rem 2.5rem;
  max-width: 400px;
  width: 100%;
  position: relative;
}
.modal h3 {
  color: #7c4dff;
  margin-bottom: 1rem;
}
.modal input, .modal textarea {
  width: 90%;
  padding: 0.7rem 1rem;
  border-radius: 0.7rem;
  border: 1.5px solid #eaf1ff;
  font-size: 1.08rem;
  background: #fafdff;
  color: #2256c7;
  margin-bottom: 1rem;
  outline: none;
  transition: border 0.2s;
}
.modal input:focus, .modal textarea:focus {
  border: 1.5px solid #7c4dff;
}
.modal button {
  background: linear-gradient(90deg, #488ae7 60%, #7c4dff 100%);
  color: #fff;
  font-weight: 700;
  font-size: 1.1rem;
  padding: 0.5rem 1.5rem;
  border-radius: 24px;
  border: none;
  margin: 0 0.5rem;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 8px #488ae733;
}
.modal-close {
  position: absolute;
  top: 0.7rem;
  right: 1.2rem;
  background: none;
  border: none;
  font-size: 2rem;
  color: #7c4dff;
  cursor: pointer;
}
.group-success {
  color: #488ae7;
  margin-top: 1rem;
  font-weight: 700;
}

/* FOOTER */
.footer {
  background: linear-gradient(90deg, #f7f5ff 60%, #eaf1ff 100%);
  border-radius: 1.5rem 1.5rem 0 0;
  box-shadow: 0 -2px 12px #7c4dff22;
  margin-top: 2rem;
  padding-top: 2rem;
}
.footer-main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.footer-logo {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}
.footer-logo img {
  height: 38px;
}
.footer-tagline {
  font-weight: 700;
  color: #7c4dff;
  font-size: 1.1rem;
}
.footer-links {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  flex-wrap: wrap;
  list-style: none;
  margin: 0 0 1rem 0;
  padding: 0;
  justify-content: center;
}
.footer-links a {
  color: #2256c7;
  font-weight: 700;
  text-decoration: none;
  padding: 0.4rem 1rem;
  border-radius: 1rem;
  transition: background 0.18s, color 0.18s;
  font-size: 1.1rem;
  line-height: 1.5;
  display: inline-block;
}
.footer-links a:hover,
.footer-links .router-link-active:hover,
.footer-links .router-link-exact-active:hover {
  background: #7c4dff !important;
  color: #fff !important;
}
.footer-links .router-link-active,
.footer-links .router-link-exact-active {
  color: #2256c7 !important;
  background: none !important;
  border: none !important;
  font-weight: 700;
  font-size: 1.1rem;
  text-decoration: none;
  border-radius: 6px;
  padding: 0.3rem 0.8rem;
  transition: color 0.2s, background 0.2s;
  display: inline-block;
}
.footer-ministry-message {
  text-align: center;
  margin-bottom: 1rem;
  color: #2256c7;
  font-size: 1.05rem;
}
.footer-contact-link {
  color: #7c4dff;
  text-decoration: underline;
}
.footer-bottom {
  text-align: center;
  color: #aaa;
  font-size: 0.98rem;
}
.footer-scripture {
  color: #488ae7;
  font-style: italic;
}
.faq-popup-btn {
  background: linear-gradient(90deg, #488ae7 60%, #7c4dff 100%);
  color: #fff;
  font-weight: 700;
  font-size: 1.08rem;
  padding: 0.7rem 2rem;
  border-radius: 24px;
  border: none;
  box-shadow: 0 2px 8px #488ae733;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
  margin: 2rem auto 0 auto;
  display: block;
}
.faq-popup-btn:hover, .faq-popup-btn:focus {
  background: linear-gradient(90deg, #7c4dff 60%, #488ae7 100%);
  transform: scale(1.07);
  box-shadow: 0 4px 16px #7c4dff33;
  outline: none;
}
@media (max-width: 900px) {
  .community-hero {
    flex-direction: column;
    gap: 1.5rem;
    padding: 1.5rem 0.5rem 1rem 0.5rem;
    text-align: center;
  }
  .community-cards {
    flex-direction: column;
    gap: 1.5rem;
    align-items: stretch;
  }
  .community-card {
    max-width: 100%;
    min-width: 0;
    margin-bottom: 1.5rem;
  }
}
</style>