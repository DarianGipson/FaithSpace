<template>
  <div class="faithspace-features">
    <!-- NAVBAR (matches Home/About) -->
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
    <section class="features-hero">
      <div class="hero-content">
        <h1>
          <span class="accent">Discover</span> FaithSpace Features
        </h1>
        <p>
          Everything you need to connect, grow, and thrive in a safe, faith-filled community.
        </p>
        <router-link to="/join" class="hero-cta">Join FaithSpace</router-link>
        <button class="suggest-btn" @click="showSuggest = true">Suggest a Feature</button>
      </div>
      <div class="hero-image-wrap">
        <img src="/src/assets/IMG_453.png" alt="FaithSpace Community" class="hero-image" />
      </div>
    </section>

    <!-- FEATURE CARDS -->
    <main id="main-content" class="main-content">
      <section class="features-columns">
        <div
          v-for="(feature, i) in features"
          :key="feature.title"
          class="glass-card features-card"
          :style="{ animationDelay: (i * 0.08) + 's' }"
          tabindex="0"
        >
          <div class="features-card-icon" v-html="feature.icon"></div>
          <div class="features-card-title">{{ feature.title }}</div>
          <div class="features-card-text">{{ feature.text }}</div>
        </div>
      </section>

      <!-- TESTIMONIALS -->
      <section class="features-testimonials">
        <h2>What Our Members Say</h2>
        <div class="testimonials-list">
          <div v-for="t in testimonials" :key="t.name" class="testimonial-card">
            <div class="testimonial-avatar">{{ t.avatar }}</div>
            <div class="testimonial-content">
              <div class="testimonial-quote">“{{ t.quote }}”</div>
              <div class="testimonial-name">— {{ t.name }}</div>
            </div>
          </div>
        </div>
      </section>

      <!-- SUGGEST FEATURE MODAL -->
      <div v-if="showSuggest" class="modal-overlay" @click.self="showSuggest = false">
        <div class="modal">
          <h3>Suggest a Feature</h3>
          <form @submit.prevent="submitSuggestion">
            <input v-model="suggestion" placeholder="Your idea…" required />
            <button type="submit">Send</button>
            <button type="button" class="modal-close" @click="showSuggest = false">Cancel</button>
          </form>
          <div v-if="suggestionSent" class="suggestion-success">Thank you for your suggestion!</div>
        </div>
      </div>
    </main>

    <!-- FOOTER -->
    <footer class="footer">
      <div class="footer-main">
        <div class="footer-logo">
          <img src="/src/assets/logo.png" alt="FaithSpace Logo" />
          <span class="footer-tagline">FaithSpace Ministry &mdash; United in Christ</span>
        </div>
        <ul class="footer-links">
          <li><router-link to="/about">About Us</router-link></li>
          <li><router-link to="/features">Features</router-link></li>
          <li><router-link to="/community">Community</router-link></li>
          <li><router-link to="/events">Events</router-link></li>
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

const features = [
  {
    icon: '🙏',
    title: 'Prayer Wall',
    text: 'Post prayer requests, pray for others, and see the power of community prayer in action.'
  },
  {
    icon: '👥',
    title: 'Small Groups',
    text: 'Join or start groups for Bible study, youth, interests, or accountability.'
  },
  {
    icon: '📖',
    title: 'Daily Encouragement',
    text: 'Receive daily Bible verses, devotionals, and uplifting messages.'
  },
  {
    icon: '💬',
    title: 'Private Messaging',
    text: 'Safe, Christlike 1-on-1 chats with privacy and moderation.'
  },
  {
    icon: '💙',
    title: 'Faithful Community',
    text: 'Connect with believers of all ages, share testimonies, and celebrate answered prayers.'
  },
  {
    icon: '🎵',
    title: 'Christian Music Lounge',
    text: 'Listen, share, and worship together with curated Christian playlists.'
  },
  {
    icon: '🏆',
    title: 'Badges & Achievements',
    text: 'Earn badges for encouragement, prayer, and community involvement.'
  },
  {
    icon: '🌎',
    title: 'Global Events',
    text: 'Participate in online Bible studies, prayer nights, and Christian events worldwide.'
  }
]

const testimonials = [
  {
    avatar: '🕊️',
    name: 'Sara',
    quote: 'FaithSpace is the only social site where I feel truly uplifted every day!'
  },
  {
    avatar: '🙏',
    name: 'Jordan',
    quote: 'The prayer wall changed my life. I know I’m never alone here.'
  },
  {
    avatar: '🎶',
    name: 'Chris',
    quote: 'I love the music lounge and daily encouragements. It’s my safe space online.'
  }
]

const showSuggest = ref(false)
const suggestion = ref('')
const suggestionSent = ref(false)
const searchQuery = ref('')
function submitSuggestion() {
  suggestionSent.value = true
  suggestion.value = ''
  setTimeout(() => {
    showSuggest.value = false
    suggestionSent.value = false
  }, 1800)
}
function performSearch() {
  // Add your search logic here if needed
}
</script>

<style scoped>
.faithspace-features {
  font-family: 'Inter', Arial, sans-serif;
  min-height: 100vh;
  background: linear-gradient(135deg, #f7faff 0%, #eaf1ff 100%);
}

/* NAVBAR */
.navigationbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #e1e1e1;
  position: relative;
  z-index: 1000;
}
.logoWrap {
  cursor: pointer;
}
.logo {
  height: 40px;
}
.search-bar {
  flex: 1;
  max-width: 500px;
  padding: 0.7rem 1rem;
  border: 1.5px solid #eaf1ff;
  border-radius: 24px;
  background: #fafdff;
  color: #2256c7;
  margin: 0 1rem;
  transition: border 0.2s;
}
.search-bar:focus {
  border: 1.5px solid #7c4dff;
  outline: none;
}
.navLinks {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
}
.navLinks li {
  position: relative;
}
.navLinks a {
  color: #2256c7;
  font-weight: 700;
  text-decoration: none;
  padding: 0.4rem 1rem;
  border-radius: 24px;
  transition: background 0.2s, color 0.2s;
}
.navLinks a:hover,
.navLinks a:focus {
  background: #eaf1ff;
  color: #7c4dff;
}
.active {
  color: #7c4dff;
}

/* HERO SECTION */
.features-hero {
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
.features-hero h1 {
  font-size: 2.7rem;
  font-weight: 900;
  color: #2256c7;
  margin-bottom: 0.7rem;
}
.accent { color: #7c4dff; }
.features-hero p {
  font-size: 1.25rem;
  color: #555;
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
  margin-right: 1rem;
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
.suggest-btn {
  background: #fff;
  color: #7c4dff;
  border: 2px solid #7c4dff;
  border-radius: 24px;
  padding: 0.7rem 1.5rem;
  font-weight: 700;
  font-size: 1.05rem;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
  transition: background 0.18s, color 0.18s, box-shadow 0.18s;
  box-shadow: 0 2px 8px #7c4dff22;
}
.suggest-btn:hover, .suggest-btn:focus {
  background: #7c4dff;
  color: #fff;
  box-shadow: 0 4px 16px #7c4dff33;
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

/* FEATURE CARDS */
.features-columns {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  margin-bottom: 2.5rem;
}
.features-card {
  flex: 1 1 260px;
  min-width: 220px;
  max-width: 320px;
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
.features-card:focus,
.features-card:hover {
  box-shadow: 0 8px 32px #488ae744;
  background: #fafdff;
  transform: translateY(-4px) scale(1.03);
}
@keyframes fadeInCard {
  from { opacity: 0; transform: translateY(30px);}
  to { opacity: 1; transform: translateY(0);}
}
.features-card-icon {
  font-size: 2.1rem;
  margin-bottom: 0.7rem;
  filter: drop-shadow(0 2px 8px #7c4dff22);
  animation: popIn 0.7s cubic-bezier(.23,1.01,.32,1) both;
}
@keyframes popIn {
  from { opacity: 0; transform: scale(0.7);}
  to { opacity: 1; transform: scale(1);}
}
.features-card-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: #2256c7;
  margin-bottom: 0.7rem;
}
.features-card-text {
  font-size: 1.05rem;
  color: #222;
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

/* TESTIMONIALS */
.features-testimonials {
  margin: 3rem auto 2rem auto;
  max-width: 900px;
  text-align: center;
}
.features-testimonials h2 {
  font-size: 1.5rem;
  color: #7c4dff;
  margin-bottom: 1.2rem;
  font-weight: 800;
}
.testimonials-list {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
}
.testimonial-card {
  background: #fff;
  border-radius: 1.2rem;
  box-shadow: 0 2px 12px #7c4dff22;
  padding: 1.2rem 1rem;
  min-width: 220px;
  max-width: 260px;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  flex-direction: row;
  margin-bottom: 1rem;
  transition: box-shadow 0.18s, transform 0.18s;
}
.testimonial-card:hover {
  box-shadow: 0 8px 32px #7c4dff33;
  transform: translateY(-4px) scale(1.03);
}
.testimonial-avatar {
  font-size: 2rem;
  background: #eaf1ff;
  border-radius: 50%;
  width: 2.7rem;
  height: 2.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px #7c4dff22;
}
.testimonial-content {
  text-align: left;
}
.testimonial-quote {
  font-size: 1.05rem;
  color: #2256c7;
  font-style: italic;
  margin-bottom: 0.3rem;
}
.testimonial-name {
  font-size: 0.98rem;
  color: #7c4dff;
  font-weight: 700;
}

/* SUGGEST FEATURE MODAL */
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
.modal input {
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
.modal input:focus {
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
  background: #fff;
  color: #7c4dff;
  border: 2px solid #7c4dff;
  margin-left: 0.5rem;
}
.suggestion-success {
  color: #488ae7;
  margin-top: 1rem;
  font-weight: 700;
}

/* FOOTER (same as before) */
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
  gap: 1.2rem;
  flex-wrap: wrap;
  list-style: none;
  margin: 0 0 1rem 0;
  padding: 0;
  justify-content: center;
}
.footer-links a {
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
.footer-links a:hover,
.footer-links .router-link-active:hover,
.footer-links .router-link-exact-active:hover {
  background: #7c4dff !important;
  color: #fff !important;
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
@media (max-width: 900px) {
  .features-hero {
    flex-direction: column;
    gap: 1.5rem;
    padding: 1.5rem 0.5rem 1rem 0.5rem;
    text-align: center;
  }
  .features-columns {
    flex-direction: column;
    gap: 1.5rem;
    align-items: stretch;
  }
  .features-card {
    max-width: 100%;
    min-width: 0;
    margin-bottom: 1.5rem;
  }
  .testimonials-list {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>