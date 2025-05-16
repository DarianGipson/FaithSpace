<template>
  <div class="verify-email-page">
    <h1>Verify Your Email</h1>
    <p>
      We’ve sent a verification link to your email address.<br>
      Please check your inbox and click the link to verify your account.
    </p>
    <p>
      Didn’t get the email? <button class="resend-btn">Resend Verification</button>
    </p>
  </div>
</template>

<script setup>
// No script needed for static verify email page
</script>

<style scoped>
.verify-email-page {
  max-width: 400px;
  margin: 3rem auto;
  background: #fff;
  border-radius: 1.5rem;
  box-shadow: 0 2px 24px #7c4dff22;
  padding: 2rem;
  font-family: 'Inter', Arial, sans-serif;
  text-align: center;
}
.resend-btn {
  background: none;
  color: #7c4dff;
  border: none;
  font-weight: 700;
  cursor: pointer;
  text-decoration: underline;
  font-size: 1em;
  margin-left: 0.2em;
}
.resend-btn:hover {
  color: #488ae7;
}
</style>