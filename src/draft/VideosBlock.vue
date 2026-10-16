<script setup>
import { videos } from './siteData'
import DraftButton from './DraftButton.vue'
</script>

<template>
  <section id="videos" class="section-pad videos-block">
    <div class="section-shell">
      <div class="section-heading">
        <p class="section-kicker">08 / ВИДЕО И ИНТЕРВЬЮ</p>
        <h2>Видео и интервью</h2>
        <p>Познакомьтесь с особенностями Pre-IPO, возможностями терминала и инвестиционными направлениями через короткие видео и комментарии экспертов.</p>
      </div>
      <div class="videos-grid">
        <article v-for="video in videos" :key="video.number" class="video-card">
          <div class="video-cover">
            <span class="video-cover-number">{{ video.number }}</span>
            <div class="video-play">▶</div>
            <span class="video-placeholder-tag">МЕСТО ДЛЯ ВИДЕО</span>
          </div>
          <div class="video-content">
            <div class="video-meta"><span>{{ video.category }}</span><span>{{ video.duration }}</span></div>
            <h3>{{ video.title }}</h3>
            <p>{{ video.description }}</p>
            <DraftButton label="Смотреть видео" :context="'Видео: ' + video.title" tone="link" arrow />
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
