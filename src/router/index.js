import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Features from '../views/Features.vue'
import Community from '../views/Community.vue'
import Join from '../views/Join.vue'
import Login from '../views/Login.vue'
import Profile from '../views/Profile.vue'
import NotFound from '../views/NotFound.vue'
import Dashboard from '../views/Dashboard.vue'
import Settings from '../views/Settings.vue'
import Terms from '../views/Terms.vue'
import Privacy from '../views/Privacy.vue'
import Contact from '../views/Contact.vue'
import ForgotPassword from '../views/ForgotPassword.vue'
import ResetPassword from '../views/ResetPassword.vue'
import VerifyEmail from '../views/VerifyEmail.vue'
import Events from '../views/Events.vue'
import Notifications from '../views/Notifications.vue'
import GroupDetails from '../views/GroupDetails.vue'
import PrayerWall from '../views/PrayerWall.vue'
import Inbox from '../views/Inbox.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  { path: '/features', name: 'Features', component: Features },
  { path: '/community', name: 'Community', component: Community },
  { path: '/join', name: 'Join', component: Join },
  { path: '/login', name: 'Login', component: Login },
  { path: '/profile', name: 'Profile', component: Profile },
  { path: '/profile/:username', name: 'ProfileUser', component: Profile },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/settings', name: 'Settings', component: Settings },
  { path: '/terms', name: 'Terms', component: Terms },
  { path: '/privacy', name: 'Privacy', component: Privacy },
  { path: '/contact', name: 'Contact', component: Contact },
  { path: '/forgot-password', name: 'ForgotPassword', component: ForgotPassword },
  { path: '/reset-password', name: 'ResetPassword', component: ResetPassword },
  { path: '/verify-email', name: 'VerifyEmail', component: VerifyEmail },
  { path: '/events', name: 'Events', component: Events },
  { path: '/notifications', name: 'Notifications', component: Notifications },
  { path: '/groups/:id', name: 'GroupDetails', component: GroupDetails },
  { path: '/prayer-wall', name: 'PrayerWall', component: PrayerWall },
  { path: '/inbox', name: 'Inbox', component: Inbox },
  { path: '/:catchAll(.*)', name: 'NotFound', component: NotFound }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router