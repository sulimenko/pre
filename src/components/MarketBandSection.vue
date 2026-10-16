<script setup>
import { COMPANIES } from '../data/companies'
import { t1,t2 } from '../data/marquee'
const first = t1.concat(t1)
const second = t2.concat(t2)
const findLogo = (t) => COMPANIES.find(c => c.name.slice(0,3).toUpperCase() === t.slice(0,3))?.logo
</script>
<template>
<section class="band">
  <div class="wrap">
    <div class="band-grid">
      <div class="reveal">
        <h2>Более 200 компаний вышли на IPO в прошлом году</h2>
        <p>Все они были доступны на стадии Pre-IPO. Инвесторы, вошедшие раньше листинга, получили доступ к росту, которого уже не было на публичном рынке.</p>
      </div>
      <div class="band-stats reveal">
        <div class="band-stat"><b>200+</b><span>IPO за год</span></div>
        <div class="band-stat"><b>5</b><span>компаний доступно сейчас</span></div>
        <div class="band-stat"><b>$5 000</b><span>минимальный вход</span></div>
      </div>
    </div>
  </div>
  <div class="marquee reveal"><div class="marquee-track" id="mqTrack1"><div v-for="(t,i) in first" :key="i" class="mq-tile"><img v-if="findLogo(t)" :src="findLogo(t)" alt="">{{ t }}<span>IPO ✓</span></div></div></div>
  <div class="marquee rev reveal"><div class="marquee-track" id="mqTrack2"><div v-for="(t,i) in second" :key="i" class="mq-tile"><img v-if="findLogo(t)" :src="findLogo(t)" alt="">{{ t }}<span>IPO ✓</span></div></div></div>
</section>
</template>
