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
      <div class="hero-art" aria-label="Заглушки реальных экранов терминала и мобильного приложения">
        <div class="hero-halo"></div>
        <div class="desktop-frame">
          <div class="frame-bar"><span></span><span></span><span></span><b>PBULL TERMINAL</b></div>
          <div class="desktop-placeholder">
            <div class="placeholder-icon">▤</div>
            <div class="placeholder-kicker">ЗАГЛУШКА · DESKTOP</div>
            <strong>Терминал Partner Finance</strong>
            <p>Сюда поставим реальный скриншот<br>десктопного интерфейса</p>
          </div>
        </div>
        <div class="phone-frame hero-phone">
          <div class="phone-island"></div>
          <div class="phone-screen">
            <div class="phone-brand">PBULL <span>BY PARTNER FINANCE</span></div>
            <div class="placeholder-icon">▦</div>
            <div class="placeholder-kicker">ЗАГЛУШКА · MOBILE</div>
            <strong>Pre-IPO предложения</strong>
            <p>Apptronik · Polymarket<br>Lambda · Perplexity<br>SambaNova</p>
            <span class="phone-screen-note">Будущий экран Pre-IPO. Реальный скриншот добавим после готовности функции.</span>
          </div>
        </div>
      </div>
    </div>
    <div class="hero-bottomline section-shell"><span>01 / 10</span><span>Листайте, чтобы изучить возможности <span aria-hidden="true">↓</span></span></div>
  </section>
</template>
