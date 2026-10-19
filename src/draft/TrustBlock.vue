<script setup>
import { trustTopics } from './siteData'
</script>

<template>
  <section id="trust" class="section-pad trust-block">
    <div class="section-shell">
      <div class="section-heading">
        <p class="section-kicker">07 / НАДЁЖНОСТЬ И ИНФРАСТРУКТУРА</p>
        <h2>Основа для доверия</h2>
        <p>За удобным интерфейсом должна стоять понятная инфраструктура и проверяемые процессы. Здесь разместим документы и фактические сведения о работе Partner Finance.</p>
      </div>
      <div class="trust-grid">
        <article v-for="topic in trustTopics" :key="topic.number" class="trust-card">
          <span class="trust-number">{{ topic.number }}</span>
          <div class="trust-symbol">◎</div>
          <h3>{{ topic.title }}</h3>
          <p>{{ topic.description }}</p>
          <span class="trust-card-footer">МАТЕРИАЛЫ ОЖИДАЮТСЯ <span aria-hidden="true">↗</span></span>
        </article>
      </div>
      <p class="data-note">Этот раздел пока содержит только примеры содержания. Утверждения о лицензиях, сегрегации средств, хранении и защите активов не публикуем до подтверждения документами.</p>
    </div>
  </section>
</template>
