<script setup>
import { ref } from 'vue'
import { navItems } from './siteData'
import DraftButton from './DraftButton.vue'
const menuOpen = ref(false)
</script>

<template>
  <header class="draft-header" @keydown.esc="menuOpen=false">
    <div class="nav-shell">
      <a class="brand" href="#hero" aria-label="Partner Finance — к началу страницы" @click="menuOpen=false">
        <span class="brand-mark">P<span>F</span></span>
        <span class="brand-label">PARTNER FINANCE<small>PRIVATE MARKETS</small></span>
      </a>
      <nav id="draft-navigation" class="top-nav" :class="{ 'top-nav--open': menuOpen }" aria-label="Основное меню">
        <a v-for="item in navItems" :key="item.href" :href="item.href" @click="menuOpen=false">{{ item.label }}</a>
      </nav>
      <div class="nav-actions">
        <DraftButton label="Запросить доступ" href="#cta" tone="dark" />
        <button type="button" class="nav-toggle" :aria-expanded="menuOpen" aria-controls="draft-navigation"
          :aria-label="menuOpen ? 'Закрыть меню' : 'Открыть меню'"
          @click="menuOpen=!menuOpen"><span></span><span></span><span></span></button>
      </div>
    </div>
  </header>
</template>
