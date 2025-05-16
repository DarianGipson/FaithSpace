<template>
    <nav class="navbar">
        <div class="navbar-container">
            <div class="logo">
                <img :src="logo" alt="FaithSpace Logo" />
            </div>
            <ul class="nav-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
            <button class="cta-button">Get Started</button>
        </div>
    </nav>
</template>

<script>
import logo from '@/assets/logo.png';
export default {
    name: "NavigationBar",
    data() {
        return {
            logo
        };
    }
};
</script>

<style scoped>
.navbar {
    background-color: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 1rem 2rem;
}

.navbar-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo img {
    height: 40px;
}

.nav-links {
    list-style: none;
    display: flex;
    gap: 1.5rem;
    margin: 0;
    padding: 0;
}

.nav-links a {
    text-decoration: none;
    color: #333333;
    font-weight: 500;
}

.nav-links a:hover {
    color: #007bff;
}

.cta-button {
    background-color: #007bff;
    color: #ffffff;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 600;
}

.cta-button:hover {
    background-color: #0056b3;
}
</style>