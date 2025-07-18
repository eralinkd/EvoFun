<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-logo">
        <NuxtLink to="/" class="logo">EVO FUN</NuxtLink>
        <p class="tagline">Play your favorite games and try your luck</p>
      </div>
    </div>

    <div class="footer-bottom">
      <p class="copyright">
        © {{ new Date().getFullYear() }} EVO FUN. All rights reserved.
      </p>
      <div class="social-links">
        <a href="#" class="social-link">Telegram</a>
        <a href="#" class="social-link">TikTok</a>
        <a href="#" class="social-link">Instagram</a>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
@use "~/assets/css/variables.module.scss" as *;

.footer {
  background-color: $dark-background;
  color: $light-text;
  padding: 60px 20px 30px;
}

.footer-content {
  max-width: $container-max-width;
  margin: 0 auto;
  display: flex;
  gap: 40px;
}

.footer-logo {
  flex: 1;
  min-width: 250px;

  .logo {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 12px;
  }

  .tagline {
    color: rgba($light-text, 0.7);
    font-size: 14px;
  }
}

.footer-bottom {
  max-width: $container-max-width;
  margin: 50px auto 0;
  padding-top: 20px;
  border-top: 1px solid rgba($light-text, 0.1);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.copyright {
  color: rgba($light-text, 0.5);
  font-size: 14px;
}

.social-links {
  display: flex;
  gap: 20px;

  .social-link {
    color: rgba($light-text, 0.7);
    text-decoration: none;
    transition: color $transition-speed $transition-ease;

    &:hover {
      color: $primary-color;
    }
  }
}

@media (max-width: $tablet) {
  .footer-content,
  .footer-bottom {
    flex-direction: column;
    text-align: center;
  }

  .footer-links {
    justify-content: center;
  }

  .link-group {
    text-align: center;
  }
}
</style>
