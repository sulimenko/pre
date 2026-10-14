<script setup>
import DraftButton from './DraftButton.vue'
</script>

<template>
  <section id="hero" class="hero-block">
    <div class="hero-layout">
      <div class="section-shell hero-copy">
        <h1>Инвестируйте в <em>Pre-IPO компании</em> раньше рынка</h1>
        <p class="hero-description">Покупайте акции частных компаний по актуальным условиям уже сейчас. Скоро — с возможностью прямой торговли через терминал Partner Finance.</p>
        <div class="hero-buttons">
          <DraftButton label="Смотреть доступные компании" href="#companies" tone="primary" arrow />
          <DraftButton label="Скачать приложение" tone="outline" />
        </div>
      </div>
      <div class="hero-art" aria-label="Реальные экраны торгового терминала Partner Finance">
        <div class="desktop-frame">
          <img
            class="hero-desktop-screenshot"
            src="/assets/hero-trading-desktop.png"
            width="1918"
            height="961"
            alt="Десктопный терминал Partner Finance: график AVPT, портфель и форма торговой заявки"
            decoding="async"
          />
        </div>
        <div class="phone-frame hero-phone">
          <img
            class="hero-phone-screenshot"
            src="/assets/hero-trading-mobile.png"
            width="367"
            height="790"
            alt="Мобильный терминал Partner Finance: график AVPT и форма покупки или продажи"
            decoding="async"
          />
        </div>
      </div>
    </div>
    <div class="hero-bottomline section-shell"><span>01 / 10</span><span>Листайте, чтобы изучить возможности <span aria-hidden="true">↓</span></span></div>
  </section>
</template>
