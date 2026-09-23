<template>
  <footer class="footer">
    <div class="footer__inner container">
      <div class="footer__col">
        <span class="footer__heading">{{ t('footer.quickAccess') }}</span>
        <NuxtLink
          to="/"
          class="footer__link footer__link--active"
        >
          {{ t('footer.home') }}
        </NuxtLink>
        <a
          href="#"
          class="footer__link"
        >{{ t('footer.aboutUs') }}</a>
        <a
          href="#"
          class="footer__link"
        >{{ t('footer.contactUs') }}</a>
        <a
          href="#"
          class="footer__link"
        >{{ t('footer.afterSalesService') }}</a>
      </div>

      <div class="footer__col">
        <span class="footer__heading">{{ t('footer.siteGuide') }}</span>
        <a
          href="#"
          class="footer__link"
        >{{ t('footer.termsConditions') }}</a>
        <a
          href="#"
          class="footer__link"
        >{{ t('footer.faq') }}</a>
        <a
          href="#"
          class="footer__link"
        >{{ t('footer.complaintsSuggestions') }}</a>
      </div>

      <div class="footer__col">
        <span class="footer__heading">{{ t('footer.socialNetworks') }}</span>
        <a
          href="#"
          class="footer__social-link"
        >
          <span class="footer__social-icon"><Telegram /></span>
          {{ t('footer.telegram') }}
        </a>
        <a
          href="#"
          class="footer__social-link"
        >
          <span class="footer__social-icon"><Instagram /></span>
          {{ t('footer.instagram') }}
        </a>
        <a
          href="#"
          class="footer__social-link"
        >
          <span class="footer__social-icon"><Linkedin /></span>
          {{ t('footer.linkedin') }}
        </a>
      </div>
    </div>

    <div class="footer__bottom">
      <p class="footer__copyright">
        {{ t('footer.copyright', { year: new Date().getFullYear() }) }}
      </p>
      <div class="footer__socials">
        <a
          href="#"
          :aria-label="t('footer.telegram')"
        ><Telegram /></a>
        <a
          href="#"
          :aria-label="t('footer.instagram')"
        ><Instagram /></a>
        <a
          href="#"
          :aria-label="t('footer.twitter')"
        ><Twitter /></a>
        <a
          href="#"
          :aria-label="t('footer.youtube')"
        ><Youtube /></a>
        <a
          href="#"
          :aria-label="t('footer.linkedin')"
        ><Linkedin /></a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { Instagram, Linkedin, Telegram, Twitter, Youtube } from '~/components/Icons'

const { t } = useI18n()
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

.footer__link {
  font-size: 13px;
  font-weight: 500;
  color: var(--color-navy);
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
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-strong);
}

.footer__social-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--color-slate);
  color: var(--color-surface);
  flex-shrink: 0;
}

.footer__social-icon svg {
  width: 15px;
  height: 15px;
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
