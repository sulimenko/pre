<script setup>
import { inject } from 'vue'
import { COMPANIES, MIN, share, badgeClass } from '../data/companies'
import { landingActionsKey } from '../composables/landingActions'
const { openTerminal, openCompany } = inject(landingActionsKey)



</script>

<template>
<section id="cine" style="padding:0">
  <div class="cine-stage" id="cineStage">
    <div class="cine-cap" id="cineCap">
      <div class="kicker">Терминал Partner Finance</div>
      <h2 id="cineCapText">Полный цикл инвестиций.<br>От Pre-IPO — к вторичной торговле.</h2>
    </div>
    <div class="cine-term" id="cineTerm">
      <div class="term" @click="openTerminal()">
        <div class="term-bar"><div class="dot"></div><div class="dot"></div><div class="dot"></div><span class="term-title">Partner Finance Terminal — Pre-IPO</span></div>
        <div class="term-body" id="cineRows"><div v-for="c in COMPANIES" :key="c.id" class="trow"><div class="co"><div class="co-logo"><img :src="c.logo" :alt="c.name"></div><div><div class="co-name">{{ c.name }}</div><div class="co-sec">{{ c.sec.split("·")[0] }}</div></div></div><div class="price"><b>{{ c.price }}{{ share(c.price) }}</b><span :class="badgeClass(c.status)">{{ c.statusText }}</span></div></div></div>
        <span class="term-open">▶ Демо</span>
      </div>
    </div>
    <div class="cine-cards" id="cineCards"><div v-for="c in COMPANIES" :key="c.id" class="cine-card" @click="openCompany(c.id)"><div class="cc-top"><div class="co-logo"><img :src="c.logo" alt=""></div><span class="badge live">● LIVE</span></div><div><div class="cc-name">{{ c.name }}</div><div class="cc-sec">{{ c.sec.split("·")[0] }}</div></div><div class="cc-meta"><div><span>Цена</span><b>{{ c.price }}</b></div><div><span>Минимум</span><b>{{ MIN }}</b></div></div></div></div>
  </div>
</section>
</template>
