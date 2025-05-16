<template>
  <div class="faithspace-home">
    <!-- SKIP LINK FOR ACCESSIBILITY -->
    <a href="#main-content" class="skip-link">Skip to main content</a>

    <!-- NAVBAR -->
    <nav class="navigationbar glass-nav" role="navigation" aria-label="Main navigation">
      <div class="logoWrap">
        <img class="logo" :src="logo" alt="FaithSpace Logo" loading="lazy" tabindex="0" aria-label="FaithSpace Home" @click="$router.push('/')" style="cursor:pointer;" />
      </div>
      <!-- Place search bar here -->
      <input
        class="search-bar"
        v-model="searchQuery"
        placeholder="Search FaithSpace…"
        @keyup.enter="performSearch"
        @focus="playInputSound"
      />
      <!-- Hamburger and navLinks follow -->
      <ul class="navLinks" :class="{ open: navOpen }">
        <li v-for="link in navLinks" :key="link.to">
          <router-link
            :to="link.to"
            :aria-current="$route.path === link.to ? 'page' : null"
            @click="navOpen = false"
            :class="{
              active: $route.path === link.to,
              'join-now-link': link.to === '/join',
              'login-link': link.to === '/login'
            }"
            >{{ link.label }}</router-link>
        </li>
      </ul>
      <!-- Profile Area (single, modern, hover dropdown) -->
      <div class="navbar-profile-area">
        <!-- Profile Pic & Dropdown -->
        <div
          class="navbar-profile-menu"
          tabindex="0"
          @mouseenter="openProfileDropdown"
          @mouseleave="closeProfileDropdown"
          @focus="openProfileDropdown"
          @blur="closeProfileDropdown"
        >
          <span
            class="navbar-profile-avatar"
            aria-label="Open profile menu"
            style="display: flex; align-items: center; justify-content: center; font-size: 2rem; background: #fff;"
          >{{ user.emoji }}</span>
          <transition name="fade">
            <div
              v-if="profileDropdownOpen"
              class="navbar-profile-dropdown"
              aria-label="Profile menu"
            >
              <div class="navbar-profile-dropdown-header">
                <span class="dropdown-avatar" style="display: flex; align-items: center; justify-content: center; font-size: 2rem; background: #fff;">{{ user.emoji }}</span>
                <div>
                  <div class="navbar-profile-name">{{ user.name }}</div>
                  <div class="navbar-profile-role" v-if="user.role">{{ user.role }}</div>
                  <div class="navbar-profile-badges">
                    <span v-for="badge in userBadges" :key="badge.name" class="badge" :title="badge.name">{{ badge.icon }}</span>
                  </div>
                </div>
              </div>
              <router-link :to="`/profile/${user.name}`" class="dropdown-link">
                <i class="fas fa-user"></i> Profile
              </router-link>
              <router-link to="/dashboard" class="dropdown-link">
                <i class="fas fa-tachometer-alt"></i> Dashboard
              </router-link>
              <router-link to="/settings" class="dropdown-link">
                <i class="fas fa-cog"></i> Settings
              </router-link>
              <button @click="alert('Logout coming soon!')" class="dropdown-link logout">
                <i class="fas fa-sign-out-alt"></i> Logout
              </button>
            </div>
          </transition>
        </div>
        <!-- Name -->
        <span class="navbar-profile-name">{{ user.name }}</span>
        <!-- Toggle -->
        <button
          class="darkmode-toggle modern-toggle"
          @click="toggleDarkMode"
          aria-label="Toggle dark mode"
        >
          <span v-if="!isDark">🌙</span>
          <span v-else>☀️</span>
        </button>
        <!-- Notification Bell (move here, after dark mode toggle) -->
        <div
          class="navbar-notification"
          :class="{ 'has-unread': unreadCount > 0 }"
          tabindex="0"
          @mouseenter="openNotificationDropdownProfile"
          @mouseleave="closeNotificationDropdownProfile"
          @focus="openNotificationDropdownProfile"
          @blur="closeNotificationDropdownProfile"
        >
          <router-link to="/notifications" class="notification-link" tabindex="-1" aria-label="View all notifications">
            <span class="notification-emoji" aria-hidden="true">🔔</span>
            <i class="fas fa-bell" aria-hidden="true"></i>
            <span class="notification-badge" v-if="unreadCount > 0">{{ unreadCount }}</span>
          </router-link>
          <div class="notification-dropdown" v-if="showNotificationsProfile">
            <div class="notification-item" v-for="notification in notifications" :key="notification.id">
              <span class="notification-dot" v-if="notification.type === 'like'">❤️</span>
              <span class="notification-dot" v-if="notification.type === 'comment'">💬</span>
              <span class="notification-dot" v-if="notification.type === 'follow'">👤</span>
              <div class="notification-content">
                <span class="notification-user">{{ notification.user }}</span>
                <span class="notification-action">{{ notification.action }}</span>
                <span class="notification-time">{{ notification.time }}</span>
              </div>
              <button class="notification-close modern-x" @click.stop="removeNotification(notification.id)" aria-label="Dismiss notification">
                <i class="fas fa-times"></i>
              </button>
            </div>
            <router-link to="/notifications" class="notification-viewall">
              <i class="fas fa-list"></i> View All
            </router-link>
          </div>
        </div>
        <!-- Messages Button -->
        <router-link
          to="/inbox"
          class="navbar-messages-btn"
          aria-label="Open inbox"
        >
          <span class="messages-emoji" aria-hidden="true">💬</span>
          <i class="fas fa-comments"></i>
          <span class="messages-badge" v-if="unreadMessagesCount > 0">{{ unreadMessagesCount }}</span>
        </router-link>
      </div>
    </nav>

    <!-- Stories Bar - Online Users Stories -->
    <div class="stories-bar-container">
      <div class="stories-bar-wide">
        <div class="stories-scroll-bar">
          <div class="stories-scroll-inner">
            <div
              v-for="user in onlineUsers"
              :key="user.name"
              class="story-scroll-avatar"
              :data-tooltip="user.name"
            >
              <template v-if="user.avatar">
                <img :src="user.avatar" :alt="user.name" />
              </template>
              <template v-else>
                <span class="story-emoji">{{ user.emoji }}</span>
              </template>
              <span class="story-name">{{ user.name }}</span>
            </div>
            <div class="story-scroll-avatar add-story" @click="alert('Add your story!')">
              <span class="story-emoji">+</span>
              <span class="story-name">Your Story</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <main id="main-content" class="main-content">

      <!-- HERO SECTION -->
      <section class="hero glass-card">
        <div class="hero-content">
          <h1 class="hero-title">Welcome, {{ user.name }}!</h1>
          <p class="hero-subtitle">
            Good {{ greetingTime }}. FaithSpace is your place to connect, pray, and grow together in Christ.
          </p>
          <router-link to="/community" class="big-btn hero-btn">Join the Community</router-link>
        </div>
        <img :src="heroImg" alt="FaithSpace Community" class="hero-img" />
      </section>

      <!-- TRENDING SECTION -->
      <section class="trending glass-card">
        <h2 class="section-title">Trending</h2>
        <ul class="trending-list">
          <li v-for="trend in trending" :key="trend.tag">
            <span class="trending-tag" @click="alert('Show posts for #'+trend.tag)" style="cursor:pointer;">#{{ trend.tag }}</span>
            <span class="trending-text">{{ trend.text }}</span>
          </li>
        </ul>
      </section>

      <!-- QUICK POST SECTION -->
      <section class="quick-post glass-card">
        <h2 class="section-title">Share a Blessing</h2>
        <form @submit.prevent="addQuickPost" class="quick-post-form">
          <span
            class="quick-post-avatar"
            style="display: flex; align-items: center; justify-content: center; font-size: 1.7rem; background: #fff;"
          >{{ user.emoji }}</span>
          <!-- Add ref to your textarea -->
          <textarea
            ref="quickPostInput"
            v-model="quickPostMsg"
            class="quick-post-input"
            placeholder="Share a blessing, prayer, or photo! 😊 #blessed @friend"
            maxlength="280"
            rows="3"
            @focus="playInputSound"
          ></textarea>
          <div class="quick-post-actions">
            <label class="modern-file-upload">
              <input type="file" @change="onImageUpload" accept="image/*" class="quick-post-upload" />
              <span><i class="fas fa-upload"></i> Choose File</span>
            </label>
            <button type="button" class="emoji-btn" @click="toggleEmojiPicker">😊</button>
            <button type="submit" class="big-btn">Post</button>
          </div>
          <div v-if="showEmojiPicker" class="emoji-picker">
            <span v-for="emoji in emojiList" :key="emoji" @click="addEmoji(emoji)" class="emoji-choice">{{ emoji }}</span>
          </div>
          <div v-if="quickPostImage" class="quick-post-preview">
            <img :src="quickPostImage" alt="Preview" />
            <button type="button" class="remove-img-btn" @click="removeImage">✖</button>
          </div>
        </form>
      </section>

      <!-- POSTS FEED -->
      <section class="posts-feed glass-card">
        <h2 class="section-title">Latest Posts</h2>
        <div v-for="post in latestPosts" :key="post.id" class="post-card">
          <div class="post-header">
            <span
              class="post-avatar"
              style="display: flex; align-items: center; justify-content: center; font-size: 1.3rem; background: #fff;"
            >{{ onlineUsers.find(u => u.name === post.user)?.emoji || '🙂' }}</span>
            <div class="post-user-info">
              <span class="post-user">{{ post.user }}</span>
              <span class="post-time">{{ post.time }}</span>
            </div>
          </div>
          <div class="post-message" v-html="formatPostMsg(post.msg)"></div>
          <div v-if="post.image">
            <img :src="post.image" class="post-image" alt="User upload" />
          </div>
          <div class="post-reactions">
            <button @click="post.likes++" class="reaction-btn" aria-label="Like">👍 {{ post.likes }}</button>
            <button @click="post.prays++" class="reaction-btn" aria-label="Pray">🙏 {{ post.prays }}</button>
            <button @click="post.celebrates++" class="reaction-btn" aria-label="Celebrate">🎉 {{ post.celebrates }}</button>
          </div>
          <div class="post-comments">
            <div v-for="comment in post.comments" :key="comment.id" class="post-comment">
              <span class="comment-user">{{ comment.user }}</span>
              <span class="comment-text">{{ comment.text }}</span>
              <span class="comment-time">{{ comment.time }}</span>
            </div>
            <form @submit.prevent="addComment(post)" class="post-comment-form">
              <input v-model="post.newComment" placeholder="Add a comment..." class="post-comment-input" />
              <button type="submit" class="post-comment-btn">Send</button>
            </form>
          </div>
          <button class="share-btn" @click="copyPostLink(post.id)">Share</button>
        </div>
      </section>

      <!-- FEATURES SECTION -->
      <section class="features glass-card">
        <h2 class="section-title">Connect. Grow. Thrive.</h2>
        <div class="features-grid">
          <div class="feature-tile" v-for="feature in features" :key="feature.title">
            <div class="feature-icon-big">{{ feature.icon }}</div>
            <div class="feature-title-big">{{ feature.title }}</div>
            <div class="feature-desc-big">{{ feature.desc }}</div>
          </div>
        </div>
      </section>

      <!-- DAILY VERSE SECTION -->
      <div class="daily-verse glass-card">
        <span class="verse-icon">📖</span>
        <span class="verse-text">{{ dailyVerse }}</span>
      </div>

    </main>

    <!-- FOOTER -->
    <footer class="footer">
      <div class="footer-main">
        <div class="footer-logo">
          <img :src="logo" alt="FaithSpace Logo" />
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
    <!-- Floating Action Button for Quick Post -->
    <button class="fab" @click="alert('Quick Post!')">+</button>

    <!-- Motivational Toast -->
    <div v-if="showToast" class="motivational-toast">
      🌟 Welcome back, {{ user.name }}! Shine your light today.
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import logo from '@/assets/logo.png'
import heroImg from '@/assets/Untitled-2-1.png'

const profileDropdownOpen = ref(false)
const showNotificationsNav = ref(false)
const showNotificationsProfile = ref(false)
const quickPostMsg = ref('')
const quickPostImage = ref('');
const showEmojiPicker = ref(false);
const isDark = ref(false)
const navOpen = ref(false)
const user = ref({
  name: 'Sara',
  avatar: '', // No image
  emoji: '😊',
  isVerified: true,
  role: 'Community Builder'
})
const userSelf = ref({
  name: 'Sara',
  avatar: '', // No image
  emoji: '😊',
  isVerified: true,
  role: 'Community Builder'
})
const greetingTime = computed(() => {
  const h = new Date().getHours()
  if (h < 12) return 'morning'
  if (h < 18) return 'afternoon'
  return 'evening'
})
const trending = ref([
  { tag: 'PrayerWall', text: '200+ prayers shared today' },
  { tag: 'FaithGoals', text: 'Share your 2025 faith goals!' },
  { tag: 'NewGroups', text: '3 new groups started this week' }
])
const onlineUsers = ref([
  { name: 'Sara', avatar: '', emoji: '😊' },
  { name: 'Jordan', avatar: '', emoji: '😃' },
  { name: 'Jesus', avatar: '', emoji: '🕊️' },
  { name: 'Cross', avatar: '', emoji: '✝️' },
  { name: 'Bible', avatar: '', emoji: '📖' },
  { name: 'Fish', avatar: '', emoji: '🐟' },
  { name: 'Tiny Jesus', avatar: '', emoji: '👼' },
  { name: 'Heart', avatar: '', emoji: '💙' }
])
const navLinks = ref([
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/features', label: 'Features' },
  { to: '/community', label: 'Community' },
  { to: '/join', label: 'Join Now' },
  { to: '/login', label: 'Log In' }
])
const latestPosts = ref([
  { id: 1, user: 'Sara', msg: 'Blessed to be here!', time: '1m ago', likes: 2, prays: 1, celebrates: 0, comments: [], newComment: '' },
  { id: 2, user: 'Jordan', msg: 'Praying for everyone today 🙏', time: '3m ago', likes: 1, prays: 3, celebrates: 1, comments: [], newComment: '' }
])
const userBadges = ref([
  { name: "Early Adopter", icon: "🚀" },
  { name: "Prayer Warrior", icon: "🙏" },
  { name: "Community Builder", icon: "🤝" },
  { name: "Bible Reader", icon: "📖" },
  { name: "Peacemaker", icon: "🕊️" },
  { name: "Faithful", icon: "✝️" }
])
const notifications = ref([
  { id: 1, type: 'like', user: 'Jordan', action: 'liked your post.', time: '2m ago' },
  { id: 2, type: 'comment', user: 'Sara', action: 'commented on your prayer.', time: '5m ago' }
])
const unreadCount = computed(() => notifications.value.length)
const features = ref([
  { icon: "🙏", title: "Prayer Wall", desc: "Share and pray for requests in a safe, loving space." },
  { icon: "✝️", title: "Faith Groups", desc: "Join or start groups for study, support, and fellowship." },
  { icon: "📖", title: "Bible Study", desc: "Read and discuss the Word together." },
  { icon: "🕊️", title: "Peace & Encouragement", desc: "Send encouragement and peace to others." }
])
const showConfetti = ref(false)
const friendSuggestions = ref([
  { name: 'John Doe', avatar: '', emoji: '😎' },
  { name: 'Jane Smith', avatar: '', emoji: '😊' },
  { name: 'Emily Johnson', avatar: '', emoji: '😇' }
])
const trendingGroups = ref([
  { name: 'Prayer Warriors' },
  { name: 'Bible Study Group' },
  { name: 'Youth Fellowship' }
])
const emojiList = ['🙏','✝️','🕊️','💙','🎉','😊','😇','📖','🤲','🙌','❤️'];
const musicUrl = ref('https://cdn.pixabay.com/audio/2023/03/27/audio_128bfae7c7.mp3');
const audioRef = ref(null);
const musicPlaying = ref(false);

const searchQuery = ref('');
function performSearch() {
  alert(`Search for: ${searchQuery.value}`);
}

const storyIndex = ref(0)
const storyCount = computed(() => onlineUsers.value.length)
const visibleCount = 5 // Number of stories visible at once (odd number looks best)
const centerIdx = Math.floor(visibleCount / 2)

const visibleStories = computed(() => {
  const arr = []
  for (let i = 0; i < visibleCount; i++) {
    arr.push(onlineUsers.value[(storyIndex.value + i) % storyCount.value])
  }
  return arr
})

function removeNotification(id) {
  notifications.value = notifications.value.filter(n => n.id !== id)
}
function addQuickPost() {
  if (!quickPostMsg.value.trim() && !quickPostImage.value) return;
  latestPosts.value.unshift({
    id: Date.now(),
    user: user.value.name,
    msg: quickPostMsg.value,
    image: quickPostImage.value,
    time: 'Just now',
    likes: 0,
    prays: 0,
    celebrates: 0,
    crosses: 0,
    doves: 0,
    comments: [],
    newComment: ''
  });
  quickPostMsg.value = '';
  quickPostImage.value = '';
  playPostSound();
  showConfetti.value = true
  setTimeout(() => showConfetti.value = false, 1200)
}
function addComment(post) {
  if (!post.newComment.trim()) return
  post.comments.push({
    id: Date.now(),
    user: user.value.name,
    text: post.newComment,
    time: 'Just now'
  })
  post.newComment = ''
}
function toggleDarkMode() {
  isDark.value = !isDark.value
  document.body.classList.toggle('dark', isDark.value)
}
function toggleEmojiPicker() {
  showEmojiPicker.value = !showEmojiPicker.value;
}
function addEmoji(emoji) {
  quickPostMsg.value += emoji;
  showEmojiPicker.value = false;
}
function onImageUpload(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      quickPostImage.value = reader.result;
    };
    reader.readAsDataURL(file);
  }
}
function removeImage() {
  quickPostImage.value = '';
}
function playInputSound() {
  const audio = new Audio('https://cdn.pixabay.com/audio/2022/03/15/audio_115b9b7bfa.mp3');
  audio.play();
}
function formatPostMsg(msg) {
  // Simple hashtag and mention highlighting
  return msg
    .replace(/#(\w+)/g, '<span class="hashtag">#$1</span>')
    .replace(/@(\w+)/g, '<span class="mention">@$1</span>')
}
function addFriend(suggest) {
  alert(`Send friend request to ${suggest.name}`)
}
function joinGroup(group) {
  alert(`Join group: ${group.name}`)
}
function playNotificationSound() {
  const audio = new Audio('https://cdn.pixabay.com/audio/2022/07/26/audio_124bfa8c7b.mp3');
  audio.play();
}

watch([showNotificationsNav, showNotificationsProfile], ([valNav, valProfile]) => {
  if ((valNav || valProfile) && unreadCount.value > 0) playNotificationSound();
});

function prevStory() {
  storyIndex.value = (storyIndex.value - 1 + storyCount.value) % storyCount.value
}
function nextStory() {
  storyIndex.value = (storyIndex.value + 1) % storyCount.value
}

// 3D style for each story
function getStoryStyle(idx) {
  const offset = idx - centerIdx;
  const baseZ = 10 - Math.abs(offset);
  const scale = idx === centerIdx ? 1.18 : 0.98;
  const translateX = offset * 70; // was 110 or 90, now tighter
  const translateY = Math.abs(offset) * 18;
  const rotateY = offset * 12; // was 18, now less
  const opacity = Math.abs(offset) > 2 ? 0 : 1;
  return `
    transform:
      translateX(${translateX}px)
      translateY(${translateY}px)
      scale(${scale})
      rotateY(${rotateY}deg);
    z-index: ${baseZ};
    opacity: ${opacity};
  `;
}

const showScrollTop = ref(false)
function handleScroll() {
  showScrollTop.value = window.scrollY > 300
}
onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))

const verses = [
  '"Let us consider how we may spur one another on toward love and good deeds." – Hebrews 10:24',
  '"The Lord is my shepherd; I shall not want." – Psalm 23:1',
  '"I can do all things through Christ who strengthens me." – Philippians 4:13',
  '"Be strong and courageous. Do not be afraid." – Joshua 1:9'
];
const dailyVerse = ref(verses[Math.floor(Math.random() * verses.length)]);
const showToast = ref(true)
setTimeout(() => { showToast.value = false }, 3500)

function copyPostLink(id) {
  const url = `${window.location.origin}/post/${id}`
  navigator.clipboard.writeText(url)
  alert('Post link copied!')
}

// Add this to your <script setup>
let profileDropdownTimeout = null;
function openProfileDropdown() {
  clearTimeout(profileDropdownTimeout);
  profileDropdownOpen.value = true;
}
function closeProfileDropdown() {
  profileDropdownTimeout = setTimeout(() => {
    profileDropdownOpen.value = false;
  }, 150); // small delay for UX
}
let notificationDropdownTimeoutNav = null;
let notificationDropdownTimeoutProfile = null;

function openNotificationDropdownNav() {
  clearTimeout(notificationDropdownTimeoutNav);
  showNotificationsNav.value = true;
}
function closeNotificationDropdownNav() {
  notificationDropdownTimeoutNav = setTimeout(() => {
    showNotificationsNav.value = false;
  }, 150);
}

function openNotificationDropdownProfile() {
  clearTimeout(notificationDropdownTimeoutProfile);
  showNotificationsProfile.value = true;
}
function closeNotificationDropdownProfile() {
  notificationDropdownTimeoutProfile = setTimeout(() => {
    showNotificationsProfile.value = false;
  }, 150);
}

const unreadMessagesCount = ref(2) // Example, update with your logic
function openMessages() {
  alert('Open messages inbox (coming soon!)')
}
</script>

<style scoped>
/* --- FaithSpace Modern Purple/Blue Theme --- */

/* Navbar */
.navigationbar {
  background: linear-gradient(90deg, #eaf1ff 60%, #7c4dff 100%);
  box-shadow: 0 8px 32px #7c4dff22, 0 2px 12px #2256c722;
  display: flex;
  align-items: center;
  padding: 0 2.5rem;
  height: 120px;
  border-bottom: 0;
  border-radius: 0 0 2rem 2rem;
  transition: box-shadow 0.2s, background 0.2s;
  position: sticky;
  top: 0;
  z-index: 1002;
}
.logoWrap .logo {
  height: 56px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 2px 8px #7c4dff22;
  margin-right: 1.5rem;
}
.search-bar {
  border: none;
  outline: none;
  background: #f3edff;           /* Soft purple */
  border-radius: 2rem;
  padding: 0.7rem 1.5rem;
  font-size: 1.15rem;
  color: #555;
  width: 270px;
  box-shadow: 0 4px 24px #bbaaff22;
  transition: box-shadow 0.2s, background 0.2s;
  font-weight: 400;
  margin: 0 auto;
  display: block;
}
.search-bar::placeholder {
  color: #888;
  opacity: 1;
}
.search-bar:focus {
  background: #ede7ff;
  box-shadow: 0 2px 12px #bbaaff44;
}
.navLinks {
  display: flex;
  gap: 2rem;
  list-style: none;
  margin: 0;
  padding: 0;
  flex: 1;
  justify-content: center;
  align-items: center; /* Ensure vertical alignment */
  flex-wrap: nowrap;   /* Prevent wrapping to next line */
}
.navLinks li {
  display: flex;
  align-items: center;
  /* Prevent line breaks inside nav items */
  white-space: nowrap;
}
.navLinks li a {
  color: #2256c7;
  font-weight: 700;
  font-size: 1.1rem;
  text-decoration: none;
  padding: 0.5rem 1.2rem;
  border-radius: 8px;
  transition: background 0.2s, color 0.2s;
  display: inline-block;
  /* Prevent line breaks in links */
  white-space: nowrap;
}
.navbar-profile-area {
  position: relative; /* Ensure dropdown is positioned relative to this */
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-left: auto;
}
.navbar-profile-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2.5px solid #7c4dff;
  object-fit: cover;
  box-shadow: 0 2px 8px #7c4dff33;
  transition: box-shadow 0.2s, border 0.2s;
}
.navbar-profile-menu:hover .navbar-profile-avatar,
.navbar-profile-menu:focus-within .navbar-profile-avatar {
  box-shadow: 0 8px 32px #7c4dff44;
  border-color: #488ae7;
}
.navbar-profile-menu {
  position: relative;
  display: inline-block;
}
.navbar-profile-dropdown {
  position: absolute;
  top: 60px;
  right: 0;
  background: #fff;
  border-radius: 1.2rem;
  box-shadow: 0 8px 32px #7c4dff22, 0 2px 12px #2256c722;
  padding: 1.2rem 2rem;
  min-width: 240px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  z-index: 1003;
  animation: fadeIn 0.2s;
}
.navbar-profile-dropdown-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}
.dropdown-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2px solid #7c4dff;
  object-fit: cover;
}
.navbar-profile-name {
  font-weight: 900;
  color: #7c4dff;
  font-size: 1.25rem;
  margin-left: 0.7rem;
  letter-spacing: 0.02em;
  text-shadow: 0 2px 8px #7c4dff22;
  background: #eaf1ff;
  padding: 0.2rem 1rem;
  border-radius: 1rem;
  box-shadow: 0 2px 8px #7c4dff11;
}
.navbar-profile-role {
  font-size: 1rem;
  color: #488ae7;
  margin-top: 0.2rem;
}
.modern-toggle {
  background: linear-gradient(90deg, #eaf1ff 60%, #7c4dff22 100%);
  border: none;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  font-size: 1.4rem;
  color: #7c4dff;
  box-shadow: 0 2px 8px #7c4dff22;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, transform 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modern-toggle:hover, .modern-toggle:focus {
  background: #7c4dff;
  color: #fff;
  transform: scale(1.08);
}
.navbar-notification {
  position: relative;
  margin-left: 0.7rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  background: #eaf1ff;
  color: #7c4dff;
  border: none;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  justify-content: center;
  transition: background 0.2s, color 0.2s, transform 0.2s;
  box-shadow: 0 2px 8px #7c4dff22;
  font-size: 1.5rem;
}
.navbar-notification:hover,
.navbar-notification:focus-within {
  background: #7c4dff;
  color: #fff;
  transform: scale(1.08);
}
.notification-badge {
  position: absolute;
  top: -6px;
  right: -6px;
  background: #e53935;
  color: #fff;
  border-radius: 50%;
  font-size: 0.8rem;
  padding: 2px 6px;
  font-weight: bold;
  animation: bellpop 0.7s;
}
@keyframes bellpop {
  0% { transform: scale(0.7);}
  60% { transform: scale(1.3);}
  100% { transform: scale(1);}
}
.notification-dropdown {
  position: absolute;
  top: 36px;
  right: 0;
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 8px 32px #7c4dff22;
  min-width: 260px;
  z-index: 1003;
  padding: 1rem;
}
.notification-item {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.7rem 0;
  border-bottom: 1px solid #eaf1ff;
  font-size: 1.04rem;
}
.notification-item:last-child {
  border-bottom: none;
}
.notification-dot {
  font-size: 1.3rem;
}
.notification-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}
.notification-user {
  font-weight: 700;
  color: #7c4dff;
}
.notification-action {
  color: #2256c7;
}
.notification-time {
  color: #aaa;
  font-size: 0.92rem;
}
.notification-close.modern-x {
  background: none;
  border: none;
  color: #e53935;
  font-size: 1.2rem;
  border-radius: 50%;
  padding: 0.2rem 0.5rem;
  cursor: pointer;
  transition: background 0.18s, color 0.18s;
}
.notification-close.modern-x:hover {
  background: #ffe0e0;
  color: #b71c1c;
}
.notification-viewall {
  width: 100%;
  margin-top: 0.7rem;
  background: #7c4dff;
  color: #fff;
  border: none;
  border-radius: 1rem;
  padding: 0.6rem 0;
  font-weight: 700;
  font-size: 1.08rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.7rem;
  transition: background 0.18s;
}
.notification-viewall:hover {
  background: #488ae7;
}

/* Stories Bar */
.stories-bar-container {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
  margin-bottom: 2rem;
}
.stories-bar-wide {
  width: 100%;
  background: linear-gradient(90deg, #eaf1ff 60%, #488ae7 100%);
  border-radius: 1rem;
  margin: 2rem 0 2rem 0;
  padding: 2rem 2.5rem 2.5rem 2.5rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  box-shadow: 0 4px 24px #488ae722;
}
.stories-carousel {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-width: 0;
  margin: 0 auto;
  gap: 1.5rem;
}
.carousel-btn {
  background: #488ae7;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  font-size: 1.7rem;
  margin: 0 1.2rem;
  cursor: pointer;
  box-shadow: 0 2px 8px #488ae733;
  transition: background 0.2s, transform 0.15s;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
}
.carousel-btn:hover {
  background: #7c4dff;
  transform: scale(1.1);
}
.stories-bar-3d {
  position: relative;
  width: 380px; /* Try 360-420px for 5 stories */
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 1200px;
  margin: 0 auto;
}

.story-avatar {
  position: absolute;
  top: 50%;
  transition:
    transform 0.5s cubic-bezier(.4,2,.6,1),
    filter 0.3s,
    opacity 0.3s,
    z-index 0.3s;
  will-change: transform, filter, opacity, z-index;
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 1;
  z-index: 1;
  pointer-events: auto;
}
.story-avatar img, .story-emoji {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 3px solid #488ae7;
  background: #fff;
  object-fit: cover;
  font-size: 2.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.3rem;
  box-shadow: 0 2px 8px #488ae733;
}
.story-name {
  color: #2256c7;
  font-size: 1rem;
  margin-top: 0.1rem;
  font-weight: 700;
  text-align: center;
  background: #fff;
  border-radius: 0.5rem;
  padding: 0.1rem 0.7rem;
  box-shadow: 0 2px 8px #488ae722;
}
@media (max-width: 900px) {
  .nav-hamburger {
    display: block;
  }
}
@media (max-width: 900px) {
  .stories-bar-wide {
    padding: 1rem 0.5rem;
  }
  .stories-bar-3d {
    width: 95vw;
    min-width: 0;
    height: 80px;
  }
  .carousel-btn {
    width: 36px;
    height: 36px;
    font-size: 1.2rem;
    margin: 0 0.5rem;
  }
  .story-avatar img, .story-emoji {
    width: 40px;
    height: 40px;
    font-size: 1.3rem;
  }
}

/* Stories Scroll Bar */
.stories-scroll-bar {
  width: 100%;
  overflow-x: auto;
  background: linear-gradient(90deg, #eaf1ff 60%, #488ae7 100%);
  border-radius: 1rem;
  padding: 1.2rem 0.7rem;
  margin: 2rem 0;
  box-shadow: 0 4px 24px #488ae722;
}
.stories-scroll-inner {
  display: flex;
  gap: 1.5rem;
  align-items: center;
  min-width: 400px;
}
.story-scroll-avatar {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 70px;
}
.story-scroll-avatar img, .story-emoji {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 3px solid #488ae7;
  background: #fff;
  object-fit: cover;
  font-size: 2.3rem;
  margin-bottom: 0.3rem;
  box-shadow: 0 2px 8px #488ae733;
}
.story-scroll-avatar .story-name {
  color: #2256c7;
  font-size: 1rem;
  margin-top: 0.1rem;
  font-weight: 700;
  text-align: center;
  background: #fff;
  border-radius: 0.5rem;
  padding: 0.1rem 0.7rem;
  box-shadow: 0 2px 8px #488ae722;
}
.story-scroll-avatar.add-story {
  border: 2px dashed #7c4dff;
  background: #eaf1ff;
  cursor: pointer;
}

/* Main Content */
.main-content {
  max-width: 900px;
  margin: 2rem auto;
  padding: 0 1rem;
}

/* Glass Card */
.glass-card {
  background: rgba(255,255,255,0.85);
  border-radius: 1.5rem;
  border: 2px solid #488ae733;
  box-shadow: 0 4px 24px #488ae722;
  margin-bottom: 2rem;
  padding: 2rem;
  animation: fadeIn 0.7s;
}
.glass-card:hover {
  box-shadow: 0 8px 32px #488ae744;
  border-color: #7c4dff;
  transition: box-shadow 0.2s, border 0.2s;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(30px);}
  to { opacity: 1; transform: none;}
}

/* Hero Section */
.hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  background: linear-gradient(90deg, #eaf1ff 60%, #488ae7 100%);
}
.hero-content {
  flex: 1;
}
.hero-title {
  font-size: 2.3rem;
  font-weight: 900;
  color: #7c4dff;
  margin-bottom: 0.5rem;
}
.hero-subtitle {
  font-size: 1.2rem;
  color: #2256c7;
  margin-bottom: 1.5rem;
}
.hero-img {
  width: 220px;
  border-radius: 1.2rem;
  box-shadow: 0 2px 12px #7c4dff22;
}
.hero-btn {
  position: relative;
  animation: pulse 1.8s infinite;
}
@keyframes pulse {
  0% { box-shadow: 0 0 0 0 #7c4dff55; }
  70% { box-shadow: 0 0 0 12px #7c4dff00; }
  100% { box-shadow: 0 0 0 0 #7c4dff00; }
}

/* Trending Section */
.trending-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.trending-tag {
  color: #7c4dff;
  font-weight: 700;
  margin-right: 0.7rem;
}
.trending-text {
  color: #2256c7;
}

/* Quick Post Section */
.quick-post-form {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  align-items: flex-start;
}
.quick-post-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 2px solid #488ae7;
  margin-bottom: 0.3rem;
}
.quick-post-input {
  width: 100%;
  border: 2px solid #eaf1ff;
  border-radius: 1rem;
  padding: 0.8rem 1rem;
  font-size: 1.08rem;
  resize: vertical;
  transition: border 0.2s, box-shadow 0.2s;
}
.quick-post-input:focus {
  border-color: #488ae7;
  box-shadow: 0 0 0 2px #488ae733;
}
.quick-post-actions {
  display: flex;
  gap: 1rem;
  align-items: center;
  width: 100%;
}
.emoji-btn {
  background: #eaf1ff;
  border: none;
  border-radius: 50%;
  font-size: 1.3rem;
  cursor: pointer;
  color: #488ae7;
  width: 36px;
  height: 36px;
  transition: background 0.2s;
}
.emoji-btn:hover { background: #488ae7; color: #fff; }
.emoji-picker {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  background: #fff;
  border: 1px solid #488ae7;
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  margin-top: 0.3rem;
}
.emoji-choice {
  font-size: 1.3rem;
  cursor: pointer;
  transition: transform 0.1s;
}
.emoji-choice:hover { transform: scale(1.2);}
.quick-post-preview {
  position: relative;
  margin-top: 0.5rem;
}
.quick-post-preview img {
  max-width: 120px;
  border-radius: 0.7rem;
  border: 2px solid #488ae7;
}
.remove-img-btn {
  position: absolute;
  top: 0;
  right: 0;
  background: #e53935;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  font-size: 1rem;
  cursor: pointer;
}
.big-btn {
  background: linear-gradient(90deg, #488ae7 60%, #7c4dff 100%);
  color: #fff;
  border: none;
  border-radius: 2rem;
  padding: 0.7rem 2rem;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s, transform 0.15s;
}
.big-btn:hover {
  background: #2256c7;
  transform: scale(1.05);
}

/* POSTS FEED */
.posts-feed {
  margin-top: 2rem;
  background: none;
  box-shadow: none;
  padding: 0;
}
.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.2rem;
  color: #222b55;
  text-align: center; /* Add this line */
}
.post-card {
  background: #fff;
  border-radius: 1.2rem;
  box-shadow: 0 2px 12px #488ae722;
  padding: 1.5rem 1.5rem 1rem 1.5rem;
  margin-bottom: 2rem;
  transition: box-shadow 0.2s;
  position: relative; /* Add this for positioning */
}
.post-header {
  display: flex;
  align-items: center;
  margin-bottom: 0.7rem;
}
.post-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 2px solid #7c4dff;
  object-fit: cover;
  margin-right: 1rem;
}
.post-user-info {
  display: flex;
  flex-direction: column;
}
.post-user {
  font-weight: 700;
  color: #7c4dff;
  font-size: 1.1rem;
}
.post-time {
  color: #aaa;
  font-size: 0.95rem;
}
.post-message {
  font-size: 1.1rem;
  color: #2256c7;
  margin-bottom: 1rem;
  margin-left: 3.2rem; /* aligns with text under avatar */
}
.post-image {
  border-radius: 1rem;
  margin: 0.5rem 0;
}
.post-reactions {
  display: flex;
  gap: 1.2rem;
  margin-left: 3.2rem;
  margin-bottom: 0.7rem;
}
.reaction-btn {
  background: none;
  border: none;
  color: #488ae7;
  font-size: 1.1rem;
  cursor: pointer;
  font-weight: 700;
  transition: color 0.2s;
}
.reaction-btn:hover {
  color: #7c4dff;
}
.reaction-btn:active {
  animation: popLike 0.3s;
}
@keyframes popLike {
  0% { transform: scale(1);}
  50% { transform: scale(1.3);}
  100% { transform: scale(1);}
}
.post-comments {
  margin-left: 3.2rem;
}
.post-comment {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  margin-bottom: 0.4rem;
  font-size: 0.98rem;
}
.comment-user {
  font-weight: 700;
  color: #7c4dff;
}
.comment-text {
  color: #2256c7;
}
.comment-time {
  color: #aaa;
  font-size: 0.9rem;
  margin-left: auto;
}
.post-comment-form {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}
.post-comment-input {
  flex: 1;
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #7c4dff44;
}
.post-comment-btn {
  background: #7c4dff;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-weight: 700;
  cursor: pointer;
}
.post-comment-btn:hover {
  background: #2256c7;
}
/* Comments */
.quick-post-comments {
  margin-top: 1rem;
}
.quick-post-comment {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  margin-bottom: 0.5rem;
  font-size: 0.98rem;
}
.comment-user {
  font-weight: 700;
  color: #7c4dff;
}
.comment-text {
  color: #2256c7;
}
.comment-time {
  color: #aaa;
  font-size: 0.9rem;
  margin-left: auto;
}
.quick-post-comment-form {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}
.quick-post-comment-input {
  flex: 1;
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #7c4dff44;
}
.quick-post-comment-btn {
  background: #7c4dff;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-weight: 700;
  cursor: pointer;
}
.quick-post-comment-btn:hover {
  background: #2256c7;
}
.comment-reply-btn, .comment-emoji-btn {
  background: none;
  border: none;
  color: #488ae7;
  margin-left: 0.5rem;
  cursor: pointer;
  font-size: 1rem;
}
.comment-reply-btn:hover, .comment-emoji-btn:hover {
  color: #7c4dff;
}

/* Features Section */
.features-grid {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
}
.feature-tile {
  background: #ede7ff;
  border-radius: 1rem;
  padding: 1.2rem 1.5rem;
  box-shadow: 0 2px 8px #7c4dff11;
  min-width: 180px;
  text-align: center;
}
.feature-icon-big {
  font-size: 2.2rem;
  margin-bottom: 0.5rem;
}
.feature-title-big {
  font-weight: 700;
  color: #7c4dff;
  font-size: 1.1rem;
  margin-bottom: 0.3rem;
}
.feature-desc-big {
  color: #2256c7;
  font-size: 0.98rem;
}

/* Footer */
.footer {
  background: linear-gradient(90deg, #eaf1ff 60%, #7c4dff 100%);
  color: #2256c7;
  padding: 2.5rem 0 1.5rem 0;
  box-shadow: 0 -8px 32px #488ae722;
}
.footer-main {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}
.footer-logo {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  font-size: 1.3rem;
  font-weight: 700;
  color: #7c4dff;
}
.footer-logo img {
  height: 48px;
  border-radius: 10px;
  box-shadow: 0 2px 8px #1741a6aa;
  background: #fff;
  padding: 0.2rem;
}
.footer-tagline {
  font-size: 1.1rem;
  color: #2256c7;
  font-weight: 700;
  letter-spacing: 0.01em;
}
.footer-links {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  list-style: none;
  padding: 0;
  margin: 0;
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

.footer-links a,
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

.footer-links a:hover,
.footer-links .router-link-active:hover,
.footer-links .router-link-exact-active:hover {
  background: #7c4dff !important;
  color: #fff !important;
}

.footer-social {
  display: flex;
  gap: 1.2rem;
  margin-top: 0.5rem;
}
.footer-social-icon {
  color: #7c4dff;
  font-size: 1.5rem;
  transition: color 0.2s, background 0.2s, transform 0.2s;
  background: #fff;
  border-radius: 50%;
  padding: 0.4rem;
  box-shadow: 0 2px 8px #7c4dff22;
}
.footer-social-icon:hover {
  color: #fff;
  background: #7c4dff;
  transform: scale(1.15);
}
.footer-badges {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}
.footer-badge {
  background: #eaf1ff;
  color: #2256c7;
  border-radius: 8px;
  padding: 0.3rem 1rem;
  font-size: 1rem;
  font-weight: 700;
}
.footer-badge.safe {
  background: #c8e6c9;
  color: #388e3c;
}
.footer-badge.privacy {
  background: #ffe0b2;
  color: #f57c00;
}
.footer-badge.ministry {
  background: #ede7ff;
  color: #7c4dff;
}
.footer-badge.cross {
  background: #e3eaff;
  color: #2256c7;
}
.footer-badge.bible {
  background: #fffde7;
  color: #fbc02d;
}
.footer-badge.dove {
  background: #e1f5fe;
  color: #0288d1;
}
.footer-ministry-message {
  text-align: center;
  font-size: 1.08rem;
  color: #2256c7;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  line-height: 1.5;
}
.footer-contact-link {
  color: #7c4dff;
  text-decoration: underline;
  font-weight: 700;
}
.footer-contact-link:hover {
  color: #488ae7;
}
.footer-bottom {
  text-align: center;
  margin-top: 1.2rem;
  font-size: 1.08rem;
  color: #7c4dff;
  opacity: 0.85;
}
.footer-scripture {
  display: block;
  margin-top: 0.5rem;
  font-size: 1rem;
  color: #2256c7;
  font-style: italic;
}
@media (max-width: 900px) {
  .navbar-profile-area {
    gap: 1rem;
  }
  .navbar-profile-name {
    font-size: 1rem;
    margin-left: 0.3rem;
  }
  .navbar-profile-avatar {
    width: 38px;
    height: 38px;
  }
  .features-grid {
    flex-direction: column;
    gap: 1rem;
  }
  .glass-card {
    padding: 1rem;
  }
  .main-content {
    padding: 0 0.5rem;
  }
}
@media (max-width: 700px) {
  .footer-main {
    gap: 1.2rem;
    padding: 0 1rem;
  }
  .footer-links {
    gap: 0.7rem;
    font-size: 1rem;
  }
  .footer-logo img {
    height: 36px;
  }
  .stories-bar {
    gap: 0.7rem;
    padding: 0.5rem 0;
  }
  .story-avatar img, .story-emoji {
    width: 40px;
    height: 40px;
    font-size: 1.3rem;
  }
}
@media (max-width: 600px) {
  .navbar-profile-area {
    gap: 0.7rem;
  }
  .footer-main {
    padding: 0 0.5rem;
  }
  .features-grid {
    flex-direction: column;
    gap: 1rem;
  }
}

/* Fade-in for cards */
.glass-card, .post-card, .feature-tile {
  animation: fadeInUp 0.7s;
  transition: box-shadow 0.2s, transform 0.2s;
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px);}
  to { opacity: 1; transform: none;}
}
/* Card hover effect */
.post-card:hover, .feature-tile:hover {
  box-shadow: 0 8px 32px #7c4dff33;
  transform: translateY(-4px) scale(1.01);
}
.reaction-btn:hover, .big-btn:hover, .fab:hover {
  filter: brightness(1.1);
  transform: scale(1.08);
}

/* Dark Mode Styles */
body.dark {
  background: #181c2f;
  color: #eaf1ff;
}
body.dark .glass-card, body.dark .sidebar {
  background: #23284a;
  border-color: #488ae7;
}
body.dark .sidebar {
  background: #1a1e33;
}
body.dark .big-btn {
  background: linear-gradient(90deg, #2256c7 60%, #7c4dff 100%);
}

/* Sidebar */
.sidebar {
  position: fixed;
  right: 0;
  top: 140px;
  width: 260px;
  background: #f7f5ff;
  border-radius: 1rem;
  box-shadow: 0 2px 8px #488ae722;
  padding: 1rem;
  z-index: 1001;
}
.sidebar-section { margin-bottom: 2rem; }
.sidebar-avatar { width: 36px; height: 36px; border-radius: 50%; margin-right: 0.7rem; }
.sidebar-user, .sidebar-group { display: flex; align-items: center; margin-bottom: 1rem; }
.sidebar-user button, .sidebar-group button {
  margin-left: auto;
  background: #488ae7;
  color: #fff;
  border: none;
  border-radius: 1rem;
  padding: 0.3rem 1rem;
  cursor: pointer;
}
.sidebar-user button:hover, .sidebar-group button:hover { background: #7c4dff; }
@media (max-width: 1100px) { .sidebar { display: none; } }

input:focus, button:focus {
  outline: 2px solid #488ae7;
  box-shadow: 0 0 0 2px #488ae733;
}
::-webkit-scrollbar {
  height: 8px;
  background: #eaf1ff;
}
::-webkit-scrollbar-thumb {
  background: #488ae7;
  border-radius: 4px;
}
.confetti {
  position: fixed;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 2.5rem;
  pointer-events: none;
  animation: pop 1.2s;
  z-index: 9999;
}
@keyframes pop {
  0% { opacity: 0; transform: translateX(-50%) scale(0.7);}
  30% { opacity: 1; transform: translateX(-50%) scale(1.2);}
  100% { opacity: 0; transform: translateX(-50%) scale(0.7);}
}
.hashtag { color: #488ae7; font-weight: 700; cursor: pointer; }
.mention { color: #7c4dff; font-weight: 700; cursor: pointer; }
.post-image { max-width: 100%; border-radius: 1rem; margin: 0.5rem 0; }
.quick-post-upload { margin-bottom: 0.5rem; }

/* Floating Action Button */
.fab {
  position: fixed;
  right: 1.5rem;
  bottom: 1.5rem;
  width: 56px;
  height: 56px;
  background: linear-gradient(45deg, #7c4dff, #488ae7);
  color: #fff;
  border: none;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  font-size: 2.5rem;
  line-height: 56px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s;
  z-index: 1004;
}
.fab:hover {
  transform: translateY(-2px);
}
.dm-btn {
  background: #488ae7;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  margin-left: 0.5rem;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.2s;
}
.dm-btn:hover { background: #7c4dff; }

/* Announcement Bar */
.announcement-bar {
  background: linear-gradient(90deg, #488ae7 60%, #eaf1ff 100%);
  color: #fff;
  font-weight: 700;
  padding: 0.8rem 1.5rem;
  border-radius: 0 0 1.2rem 1.2rem;
  text-align: center;
  margin-bottom: 1.2rem;
  font-size: 1.08rem;
  letter-spacing: 0.01em;
  box-shadow: 0 2px 8px #488ae733;
}
.announcement-bar b {
  font-weight: 700;
}
.badge {
  display: inline-block;
  margin-right: 0.2rem;
  font-size: 1.2rem;
  background: #eaf1ff;
  border-radius: 6px;
  padding: 0.1rem 0.5rem;
  color: #488ae7;
  border: 1px solid #488ae7;
}
.music-player {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: #eaf1ff;
  border-radius: 1rem;
  padding: 0.7rem 1.2rem;
  margin: 1.5rem auto 0 auto;
  max-width: 400px;
  box-shadow: 0 2px 8px #488ae733;
}
.music-title {
  color: #2256c7;
  font-size: 1rem;
  font-weight: 700;
}
.music-player audio {
  height: 32px;
}

/* Footer Marquee */
.footer-marquee-mini-wrap {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1.5rem 0 1.2rem 0; /* Added bottom margin for spacing */
  pointer-events: none;
}

.footer-marquee-mini {
  background: #488ae7;
  border-radius: 2rem;
  overflow: hidden;
  width: 420px;       /* fixed width for centering */
  min-width: 220px;
  max-width: 90vw;
  height: 2.4em;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: auto;
  box-shadow: 0 2px 12px #488ae733;
  position: relative;
  margin: 0 auto;       /* ensures horizontal centering */
}
.footer-marquee-track {
  display: flex;
  white-space: nowrap;
  color: #fff;
  font-size: 1.08rem;
  font-weight: 700;
  animation: marquee-scroll 18s linear infinite;
  align-items: center;
}

.footer-marquee-track span {
  color: #fff; /* Ensures text is white */
  padding-right: 2rem; /* Space between repeats */
}

@keyframes marquee-scroll {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
}
.navbar-notification .fa-bell {
  transition: transform 0.2s;
}
.navbar-notification:active .fa-bell {
  transform: rotate(-15deg) scale(1.2);
}
@keyframes bell-shake {
  0%, 100% { transform: rotate(0);}
  20% { transform: rotate(-15deg);}
  40% { transform: rotate(10deg);}
  60% { transform: rotate(-10deg);}
  80% { transform: rotate(5deg);}
}
.navbar-notification.has-unread .fa-bell {
  animation: bell-shake 0.7s;
}
.motivational-toast {
  position: fixed;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  background: #7c4dff;
  color: #fff;
  padding: 1rem 2rem;
  border-radius: 2rem;
  box-shadow: 0 2px 12px #7c4dff33;
  font-size: 1.1rem;
  z-index: 2001;
  animation: fadeInUp 0.7s;
}
.share-btn {
  background: #eaf1ff;
  color: #7c4dff;
  border: none;
  border-radius: 1rem;
  padding: 0.3rem 1rem;
  font-weight: 700;
  cursor: pointer;
  margin-left: 1rem;
  transition: background 0.2s, color 0.2s;
  margin-top: 1rem; /* Add this line for spacing from comments */
  display: block;   /* Makes the button take its own line */
}
.dropdown-link {
  display: flex;
  align-items: center;
  gap: 0.7rem;
 
  color: #2256c7;
  font-weight: 700;
  font-size: 1.08rem;
  padding: 0.6rem 0;
  border: none;
  background: none;
  text-decoration: none;
  width: 100%;
  border-radius: 0.7rem;
  transition: background 0.18s, color 0.18s;
  cursor: pointer;
}
.dropdown-link i {
  font-size: 1.1rem;
  color: #7c4dff;
}
.dropdown-link:hover, .dropdown-link:focus {
  background: #eaf1ff;
  color: #7c4dff;
}
.dropdown-link.logout {
  color: #e53935;
}
.dropdown-link.logout i {
  color: #e53935;
}
.modern-file-upload {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #eaf1ff;
  color: #7c4dff;
  border-radius: 1.2rem;
  padding: 0.5rem 1.2rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.18s, color 0.18s;
  border: 2px solid #7c4dff22;
  box-shadow: 0 2px  8px #7c4dff11;
  font-size: 1.08rem;
  margin-right: 1rem;
}
.modern-file-upload:hover {
  background: #7c4dff;
  color: #fff;
}
.modern-file-upload input[type="file"] {
  display: none;
}
.modern-file-upload i {
  font-size: 1.1rem;
}
.navbar-messages-btn {
  position: relative;
  background: #eaf1ff;
  color: #7c4dff;
  border: none;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  font-size: 1.5rem;
  margin-left: 0.7rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s, color 0.2s, transform 0.2s;
  box-shadow: 0 2px 8px #7c4dff22;
}
.navbar-messages-btn:hover,
.navbar-messages-btn:focus {
   background: #7c4dff;
  color: #fff;
  transform: scale(1.08);
}
.messages-badge {
  position: absolute;
  top: -6px;
  right: -6px;
  background: #e53935;
  color: #fff;
  border-radius: 50%;
  font-size: 0.8rem;
  padding: 2px 6px;
  font-weight: bold;
}
.notification-emoji,
.messages-emoji {
  font-size: 1.2rem;
  margin-right: 0.2rem;
}
.messages-emoji {
   font-size: 1.2rem;
  margin-right: 0.2rem;
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

/* Style for Join Now link */
.join-now-link {
  background: #7c4dff;
  color: #fff !important;
  border-radius: 8px;
  padding: 0.5rem 1.2rem;
  box-shadow: 0 2px 8px #7c4dff33;
  transition: background 0.2s, color 0.2s;
}
.join-now-link:hover {
  background: #488ae7;
  color: #fff !important;
}
</style>