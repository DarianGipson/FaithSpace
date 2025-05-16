<template>
  <div class="faithspace-about">
    <!-- SKIP LINK FOR ACCESSIBILITY -->
    <a href="#main-content" class="skip-link">Skip to main content</a>

    <!-- NAVBAR (matches Home.vue) -->
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

    <!-- MAIN CONTENT -->
    <main id="main-content" class="main-content">
      <section class="about-columns">
        <!-- Left Card (side) -->
        <div class="glass-card about-card side" tabindex="0">
          <div class="about-card-title">How <span class="blue">FaithSpace</span> Began</div>
          <div class="about-card-text">
            FaithSpace was born out of a simple desire—to create a digital space that reflects the love, grace, and truth of Jesus. In a world full of negativity and temptation, we needed a space that uplifted rather than tore down.<br><br>
            We saw young Christians struggling to find community online, so we built a platform where faith could flourish without compromise. FaithSpace is more than a social app. It’s a movement to reclaim the internet for good.
          </div>
        </div>

        <!-- Middle Card (tallest, fits all content) -->
        <div class="glass-card about-card middle" tabindex="0">
          <div class="about-card-title">Our Mission</div>
          <div class="about-card-text">
            To provide a Christ-centered social space where believers can find encouragement, spiritual growth, and authentic connection in a safe, distraction-free environment.
          </div>
          <div class="about-card-title" style="margin-top:2rem;">Who Is <span class="blue">FaithSpace</span> For?</div>
          <div class="about-card-text">
            <b class="blue">Teens & Students</b><br>
            Connect with others walking through the same life stage and stay grounded in faith.
            <span class="emoji" title="Student">🧑‍🎓</span>
            <br><br>
            <b class="blue">Young Adults</b><br>
            Build meaningful relationships and grow deeper in your spiritual walk.
            <span class="emoji" title="Young Adults">🧑‍🤝‍🧑</span>
            <br><br>
            <b class="blue">Believers of All Ages</b><br>
            Everyone is welcome. Whether you're 13 or 63, this is your space to grow.
            <span class="emoji" title="All Ages">👵</span>
          </div>
        </div>

        <!-- Right Card (side) -->
        <div class="glass-card about-card side" tabindex="0">
          <div class="about-center-title">Why does <span class="blue">FaithSpace</span> Exist?</div>
          <div class="about-card-text" style="text-align:center;">
            In a world overflowing with noise and distraction, FaithSpace was created to be a digital sanctuary.<br><br>
            <b>We exist to:</b>
            <ul class="about-exist-list">
              <li>Foster authentic, Christ-centered relationships online</li>
              <li>Encourage spiritual growth and daily encouragement</li>
              <li>Provide a safe, uplifting space for all ages</li>
              <li>Empower believers to share, pray, and support one another</li>
              <li>Reclaim the internet for good, one post at a time</li>
            </ul>
            <span class="exist-quote">"Let your light shine before others." – Matthew 5:16</span>
          </div>
        </div>
      </section>

      <!-- Move CTA here, centered below the cards -->
      <div class="about-cta-card about-cta-card-standalone">
        <div class="about-cta-title">Ready to Join a<br>Faithful Community?</div>
        <router-link to="/join" class="about-cta-btn">Create an Account</router-link>
      </div>

      <!-- FAQ Section -->
      <section class="glass-card about-faq-section">
        <h2 class="about-faq-title">Frequently Asked Questions</h2>
        <div v-for="(faq, i) in faqs" :key="i" class="about-faq-item">
          <button
            class="about-faq-question"
            @click="toggleFaq(i)"
            :aria-expanded="openFaq === i ? 'true' : 'false'"
          >
            {{ faq.q }}
            <span class="about-faq-arrow">{{ openFaq === i ? '▲' : '▼' }}</span>
          </button>
          <transition name="fade">
            <div v-if="openFaq === i" class="about-faq-answer">
              {{ faq.a }}
            </div>
          </transition>
        </div>
      </section>
    </main>

    <!-- FOOTER (matches Home.vue) -->
    <footer class="footer">
      <div class="footer-main">
        <div class="footer-logo">
          <img :src="logoImg" alt="FaithSpace Logo" />
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
        <div class="footer-social">
          <a href="#" aria-label="Instagram" class="footer-social-icon"><i class="fab fa-instagram"></i></a>
          <a href="#" aria-label="Facebook" class="footer-social-icon"><i class="fab fa-facebook"></i></a>
          <a href="#" aria-label="Twitter" class="footer-social-icon"><i class="fab fa-twitter"></i></a>
          <a href="#" aria-label="YouTube" class="footer-social-icon"><i class="fab fa-youtube"></i></a>
        </div>
        <div class="footer-badges">
          <span class="footer-badge safe">🛡️ Safe Community</span>
          <span class="footer-badge privacy">🔒 Privacy First</span>
          <span class="footer-badge ministry">✝️ Ministry Led</span>
          <span class="footer-badge cross">✝️ Faithful</span>
          <span class="footer-badge bible">📖 Bible Reader</span>
          <span class="footer-badge dove">🕊️ Peacemaker</span>
        </div>
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
    <div class="footer-marquee-mini-wrap">
      <div class="footer-marquee-mini">
        <div class="footer-marquee-track">
          <span>
            ✝️ Welcome to FaithSpace! | 🙏 Pray for others | 📖 Join a Bible Study | 🕊️ Spread peace | 💙 Invite your friends | 🎶 Enjoy Christian music while you connect! &nbsp;&nbsp;
          </span>
          <span>
            ✝️ Welcome to FaithSpace! | 🙏 Pray for others | 📖 Join a Bible Study | 🕊️ Spread peace | 💙 Invite your friends | 🎶 Enjoy Christian music while you connect! &nbsp;&nbsp;
          </span>
        </div>
      </div>
    </div>
    <div class="announcement-bar">
      ✝️ <b>FaithSpace Announcement:</b> Join our global prayer event this Sunday at 7pm! 🙏
    </div>
    <button class="back-to-top" @click="window.scrollTo({top:0,behavior:'smooth'})" aria-label="Back to top">↑</button>
  </div>
</template>

<script setup lang="js">
import { ref } from 'vue'
import logoImg from '@/assets/logo.png'

const searchQuery = ref('')

function performSearch() {
  // Implement your search logic here, or leave empty if not needed
  // For now, just clear the search input
  searchQuery.value = ''
}

function playInputSound() {
  // Optionally play a sound or leave empty for now
}

const openFaq = ref(null)
const faqs = ref([
  { q: "Is FaithSpace free to join?", a: "Yes! FaithSpace is completely free for all users." },
  { q: "Who can join FaithSpace?", a: "Anyone seeking a Christ-centered, encouraging online community is welcome." },
  { q: "Is my information safe?", a: "We take privacy seriously and use modern security practices to protect your data." }
])

function toggleFaq(i) {
  openFaq.value = openFaq.value === i ? null : i
}
</script>

<style scoped>
.faithspace-about {
  font-family: 'Inter', Arial, sans-serif;
  min-height: 100vh;
  background: linear-gradient(135deg, #f7faff 0%, #eaf1ff 100%);
  animation: bgmove 12s ease-in-out infinite alternate;
}
@keyframes bgmove {
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
}
.skip-link {
  position: absolute;
  left: 50%;
  top: 10px;
  transform: translateX(-50%);
  background: #7c4dff;
  color: #fff;
  padding: 0.7rem 2rem;
  border-radius: 2rem;
  font-weight: 700;
  font-size: 1.08rem;
  z-index: 2000;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s, top 0.2s;
  box-shadow: 0 2px 12px #7c4dff33;
  outline: none;
  border: none;
}
.skip-link:focus {
  opacity: 1;
  pointer-events: auto;
  top: 24px;
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
.search-bar-wrap {
  flex: 1;
  display: flex;
  justify-content: center;
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
.navbar-profile-area {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-left: 1.5rem;
}
.navbar-profile-name {
  font-weight: 900;
  color: #7c4dff;
  font-size: 1.25rem;
  letter-spacing: 0.02em;
  text-shadow: 0 2px 8px #7c4dff22;
  background: #eaf1ff;
  padding: 0.2rem 1rem;
  border-radius: 1rem;
  box-shadow: 0 2px 8px #7c4dff11;
}
.navbar-messages-btn,
.navbar-notification,
.modern-toggle {
  position: relative;
  background: #eaf1ff;
  color: #7c4dff;
  border: none;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s, color 0.2s, transform 0.2s;
  box-shadow: 0 2px 8px #7c4dff22;
  cursor: pointer;
}
.navbar-messages-btn:hover,
.navbar-messages-btn:focus,
.navbar-notification:hover,
.navbar-notification:focus-within,
.modern-toggle:hover,
.modern-toggle:focus {
  background: #7c4dff;
  color: #fff;
  transform: scale(1.08);
}
.messages-emoji,
.notification-emoji {
  font-size: 1.2rem;
  margin-right: 0.2rem;
}
.main-content {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
}
.about-columns {
  display: flex;
  justify-content: center;
  align-items: stretch;
  gap: 2.5rem;
  margin: 2.5rem 0 1.5rem 0;
  flex-wrap: nowrap;
  border-bottom: 1px solid #eaf1ff;
  padding-bottom: 2rem;
  margin-bottom: 2rem;
}

.about-card {
  flex: 1 1 0;
  min-width: 0;
  max-width: 370px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  background: rgba(255,255,255,0.85);
  border-radius: 1.2rem;
  box-shadow: 0 2px 12px #488ae722;
  padding: 2rem 2rem 1.5rem 2rem;
  margin-bottom: 0;
  transition: box-shadow 0.2s, transform 0.2s, background 0.2s;
  overflow: hidden;
  outline: none;
  opacity: 0;
  transform: translateY(30px);
  animation: cardFadeIn 0.7s cubic-bezier(.4,0,.2,1) forwards;
}
.about-card:focus,
.about-card:hover {
  box-shadow: 0 8px 32px #488ae744, 0 0 0 3px #7c4dff33;
  background: #fafdff;
  transform: translateY(-4px) scale(1.03);
  outline: none;
}
.about-card.side {
  min-height: 260px;
  max-height: 340px;
  height: auto;
  overflow: auto;
  animation-delay: 0.1s;
}
.about-card.middle {
  min-height: 340px;
  max-height: 480px;
  height: auto;
  overflow: auto;
  animation-delay: 0.2s;
}
@keyframes cardFadeIn {
  to { opacity: 1; transform: none; }
}

.about-card-title,
.about-center-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.7rem;
  color: #2256c7;
  letter-spacing: 0.01em;
  transition: color 0.2s;
}
.about-card-title:hover,
.about-center-title:hover {
  color: #7c4dff;
}
.about-card-text {
  font-size: 1.02rem;
  color: #222;
  margin-bottom: 0.5rem;
  line-height: 1.5;
  transition: color 0.2s;
}
.about-card-text:hover {
  color: #488ae7;
}
.emoji, .footer-badge {
  transition: transform 0.2s;
  cursor: pointer;
}
.emoji:hover, .footer-badge:hover {
  transform: scale(1.2) rotate(-10deg);
}
.belief-link {
  text-decoration: underline dotted;
  cursor: pointer;
  transition: color 0.2s, text-decoration 0.2s;
}
.belief-link:hover {
  color: #1741a6;
  text-decoration: underline solid;
}
.about-center-img {
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 1rem 0;
}
.about-cta-btn {
  background: linear-gradient(90deg, #488ae7 60%, #7c4dff 100%);
  color: #fff;
  font-weight: 700;
  font-size: 1.1rem;
  padding: 0.7rem 1.5rem;
  border-radius: 24px;
  text-decoration: none;
  border: none;
  transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 8px #488ae733;
  cursor: pointer;
}
.about-cta-btn:hover,
.about-cta-btn:focus {
  background: linear-gradient(90deg, #7c4dff 60%, #488ae7 100%);
  transform: scale(1.07);
  box-shadow: 0 4px 16px #7c4dff33;
  outline: none;
}
.about-cta-card {
  animation: pulse 2.5s infinite alternate;
}
@keyframes pulse {
  0% { box-shadow: 0 2px 12px #488ae733; }
  100% { box-shadow: 0 6px 24px #7c4dff33; }
}
@media (max-width: 1100px) {
  .about-columns {
    flex-direction: column;
    gap: 1.5rem;
    align-items: stretch;
    flex-wrap: wrap;
  }
  .about-card,
  .about-card.side,
  .about-card.middle {
    max-width: 100%;
    min-width: 0;
    min-height: 0;
    max-height: none;
  }
}

.about-cta-card {
  background: #eaf1ff;
  border-radius: 16px;
  padding: 1.2rem 1rem;
  margin: 2.5rem auto 0 auto;
  text-align: center;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 2px 12px #488ae733;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}
.about-cta-title {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 1rem;
}
.about-faq-section {
  margin: 3rem auto 0 auto;
  max-width: 600px;
  background: #fafdff;
  border-radius: 18px;
  box-shadow: 0 2px 8px #488ae733;
  padding: 2rem 2rem 1.5rem 2rem;
}
.about-faq-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.2rem;
  color: #2256c7;
  text-align: center;
}
.about-faq-item {
  margin-bottom: 1rem;
}
.about-faq-question {
  width: 100%;
  background: none;
  border: none;
  font-size: 1.1rem;
  font-weight: 600;
  color: #1741a6;
  text-align: left;
  cursor: pointer;
  padding: 0.6rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  outline: none;
  transition: color 0.2s;
}
.about-faq-question:hover {
  color: #488ae7;
}
.about-faq-arrow {
  transition: transform 0.2s;
}
.about-faq-question[aria-expanded="true"] .about-faq-arrow {
  transform: rotate(180deg);
}
.about-faq-answer {
  font-size: 1rem;
  color: #333;
  margin: 0.3rem 0 0.7rem 0;
  padding-left: 0.5rem;
  border-left: 2px solid #eaf1ff;
}
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
  color: #2256c7;
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
.footer-social {
  display: flex;
  gap: 1.2rem;
  margin-bottom: 1rem;
}
.footer-social-icon {
  font-size: 1.5rem;
  color: #488ae7;
  transition: color 0.18s;
}
.footer-social-icon:hover {
  color: #7c4dff;
}
.footer-badges {
  display: flex;
  gap: 0.7rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}
.footer-badge {
  background: #eaf1ff;
  color: #488ae7;
  font-weight: 700;
  border-radius: 1rem;
  padding: 0.3rem 1rem;
  font-size: 0.98rem;
  box-shadow: 0 2px 8px #7c4dff11;
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
.footer-marquee-mini-wrap {
  width: 100%;
  background: #eaf1ff;
  border-radius: 0 0 1.5rem 1.5rem;
  box-shadow: 0 2px 12px #7c4dff11;
  margin-top: 0.5rem;
  overflow: hidden;
}
.footer-marquee-mini {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
}
.footer-marquee-track {
  display: inline-block;
  animation: marquee 18s linear infinite;
  font-size: 1.05rem;
  color: #2256c7;
  padding: 0.5rem 0;
}
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.announcement-bar {
  width: 100%;
  background: #488ae7;
  color: #fff;
  text-align: center;
  font-weight: 700;
  padding: 0.5rem 0;
  font-size: 1.08rem;
  letter-spacing: 0.01em;
  margin-top: 0.5rem;
  border-radius: 0 0 1.5rem 1.5rem;
}
@media (max-width: 900px) {
  .about-columns {
    flex-direction: column;
    gap: 1.5rem;
    align-items: stretch;
  }
  .about-card {
    max-width: 100%;
    min-width: 0;
    margin-bottom: 1.5rem;
  }
}
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.about-exist-list {
  list-style: disc inside;
  margin: 1rem 0 1rem 0;
  padding: 0;
  text-align: left;
  display: inline-block;
}
.exist-quote {
  display: block;
  margin-top: 1.2rem;
  font-style: italic;
  color: #488ae7;
  font-size: 1.05rem;
}
.back-to-top {
  position: fixed;
  bottom: 2.5rem;
  right: 2.5rem;
  background: #7c4dff;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  font-size: 2rem;
  box-shadow: 0 2px 12px #7c4dff33;
  cursor: pointer;
  z-index: 1000;
  opacity: 0.85;
  transition: background 0.2s, opacity 0.2s;
}
.back-to-top:hover { background: #488ae7; opacity: 1; }
:focus-visible {
  outline: 2px solid #7c4dff;
  outline-offset: 2px;
}
</style>

<!-- Google Fonts link moved to public/index.html -->
