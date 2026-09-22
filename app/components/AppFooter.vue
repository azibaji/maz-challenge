<template>
  <footer class="footer">
    <div class="footer__inner container">
      <div class="footer__col">
        <span class="footer__heading">Quick Access</span>
        <NuxtLink
          to="/"
          class="footer__link footer__link--active"
        >
          Home
        </NuxtLink>
        <a
          href="#"
          class="footer__link"
        >About Us</a>
        <a
          href="#"
          class="footer__link"
        >Contact Us</a>
        <a
          href="#"
          class="footer__link"
        >After-Sales Service</a>
      </div>

      <div class="footer__col">
        <span class="footer__heading">Site Guide</span>
        <a
          href="#"
          class="footer__link"
        >Terms & Conditions</a>
        <a
          href="#"
          class="footer__link"
        >FAQ</a>
        <a
          href="#"
          class="footer__link"
        >Complaints & Suggestions</a>
      </div>

      <div class="footer__col">
        <span class="footer__heading">Social Networks</span>
        <a
          href="#"
          class="footer__social-link"
        >
          <Telegram />
          Telegram
        </a>
        <a
          href="#"
          class="footer__social-link"
        >
          <Instagram />
          Instagram
        </a>
        <a
          href="#"
          class="footer__social-link"
        >
          <Linkedin />
          LinkedIn
        </a>
      </div>
    </div>

    <div class="footer__bottom">
      <p class="footer__copyright">
        © {{ new Date().getFullYear() }} — All rights reserved.
      </p>
      <div class="footer__socials">
        <a
          href="#"
          aria-label="Telegram"
        ><Telegram /></a>
        <a
          href="#"
          aria-label="Instagram"
        ><Instagram /></a>
        <a
          href="#"
          aria-label="Twitter"
        ><Twitter /></a>
        <a
          href="#"
          aria-label="YouTube"
        ><Youtube /></a>
        <a
          href="#"
          aria-label="LinkedIn"
        ><Linkedin /></a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { Instagram, Linkedin, Telegram, Twitter, Youtube } from '~/components/Icons'
</script>

<style scoped>
.footer {
  margin-top: 40px;
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
}

.footer__inner {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  padding-block: 40px;
}

.footer__col {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.footer__heading {
  font-size: 13px;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 4px;
}

.footer__link,
.footer__social-link {
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text-muted);
}

.footer__link:hover,
.footer__social-link:hover,
.footer__link--active {
  color: var(--color-accent-dark);
}

.footer__social-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.footer__social-link svg {
  width: 16px;
  height: 16px;
}

.footer__bottom {
  border-top: 1px solid var(--color-border);
  padding-block: 18px;
}

.footer__bottom {
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  gap: 14px;
  max-width: var(--container-width);
  margin-inline: auto;
  padding-inline: 20px;
}

.footer__copyright {
  margin: 0;
  font-size: 12.5px;
  color: var(--color-text-muted);
  text-align: center;
}

.footer__socials {
  display: flex;
  align-items: center;
  gap: 10px;
}

.footer__socials a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--color-accent-soft);
  color: var(--color-accent-dark);
}

.footer__socials svg {
  width: 15px;
  height: 15px;
}

@media (max-width: 640px) {
  .footer__inner {
    grid-template-columns: 1fr;
    gap: 28px;
    padding-block: 32px;
  }
}
</style>
