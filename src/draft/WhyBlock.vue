<script setup>
import { futurePrinciples } from './siteData'
</script>

<template>
  <section id="why" class="section-pad why-block">
    <div class="section-shell why-layout">
      <div class="why-copy">
        <p class="section-kicker section-kicker--light">03 / ПОЧЕМУ PRE-IPO СЕЙЧАС</p>
        <h2>Инвестировать раньше — значит <em>видеть тренды до рынка</em></h2>
        <p class="why-lead">Иногда самые интересные компании становятся очевидными для всех слишком поздно. Pre-IPO дает возможность увидеть их раньше — до публичного листинга, широкой известности и массового интереса рынка.</p>
        <div class="principle-list">
          <div v-for="point in futurePrinciples" :key="point.number" class="principle">
            <span class="principle-index">{{ point.number }}</span>
            <div><h3>{{ point.title }}</h3><p>{{ point.description }}</p></div>
          </div>
        </div>
      </div>
      <div class="robot-area">
        <img
          class="robot-image"
          src="/assets/apptronik-robot.jpg"
          alt="Гуманоидный робот Apptronik Apollo"
          width="1600"
          height="1018"
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  </section>
</template>
