<script setup>
import { ref } from 'vue'
import { faqs } from './siteData'
const active = ref(0)
const toggle = (index) => { active.value = active.value===index ? -1 : index }
</script>

<template>
  <section id="faq" class="section-pad faq-block">
    <div class="section-shell faq-layout">
      <div class="faq-heading">
        <p class="section-kicker">09 / FAQ</p>
        <h2>Частые вопросы о Pre-IPO</h2>
        <p>Основная информация об инвестициях в частные компании, этапах участия и рисках.</p>
        <span class="faq-side-mark">?</span>
      </div>
      <div class="faq-list">
        <div v-for="(item,i) in faqs" :key="i" class="faq-item" :class="{ 'faq-item--active': active===i }">
          <button type="button" class="faq-question" :aria-expanded="active===i" @click="toggle(i)">
            <span>{{ item.question }}</span><span class="faq-plus">{{ active===i ? '−' : '+' }}</span>
          </button>
          <div v-if="active===i" class="faq-answer"><p>{{ item.answer }}</p></div>
        </div>
      </div>
    </div>
  </section>
</template>
