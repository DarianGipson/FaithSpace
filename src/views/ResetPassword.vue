<template>
  <div class="reset-password-page">
    <h1>Reset Password</h1>
    <p>Enter your new password below.</p>
    <form class="reset-form">
      <label>
        New Password:
        <input type="password" placeholder="New Password" required />
      </label>
      <label>
        Confirm Password:
        <input type="password" placeholder="Confirm Password" required />
      </label>
      <button type="submit" class="reset-btn">Reset Password</button>
    </form>
  </div>
</template>

<script setup>
// No script needed for static reset password page
</script>

<style scoped>
.reset-password-page {
  max-width: 400px;
  margin: 3rem auto;
  background: #fff;
  border-radius: 1.5rem;
  box-shadow: 0 2px 24px #7c4dff22;
  padding: 2rem;
  font-family: 'Inter', Arial, sans-serif;
}
.reset-form label {
  display: block;
  margin-bottom: 1.2rem;
  color: #2256c7;
  font-weight: 600;
}
.reset-form input {
  width: 100%;
  padding: 0.5em;
  border-radius: 0.7em;
  border: 1.5px solid #eaf1ff;
  font-size: 1.08em;
  background: #fafdff;
  color: #2256c7;
  margin-top: 0.3em;
  margin-bottom: 0.5em;
}
.reset-btn {
  background: linear-gradient(90deg, #488ae7 60%, #7c4dff 100%);
  color: #fff;
  font-weight: 700;
  font-size: 1.1em;
  padding: 0.7em 2em;
  border-radius: 24px;
  border: none;
  box-shadow: 0 2px 8px #488ae733;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
}
.reset-btn:hover {
  background: linear-gradient(90deg, #7c4dff 60%, #488ae7 100%);
  transform: scale(1.07);
  box-shadow: 0 4px 16px #7c4dff33;
  outline: none;
}
</style>