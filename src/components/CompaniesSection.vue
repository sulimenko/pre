<script setup>
import { inject } from 'vue'
import { COMPANIES, MIN } from '../data/companies'
import { landingActionsKey } from '../composables/landingActions'
const { openCompany } = inject(landingActionsKey)
</script>
<template>
<section id="companies">
  <div class="wrap" style="text-align:center">
    <div class="kicker reveal">5 эксклюзивных компаний · доступно сейчас</div>
    <h2 class="h2 reveal">Инвестируйте в 5 перспективных компаний уже сегодня</h2>
    <p class="lead reveal" style="margin:0 auto">Минимальный порог входа — $5 000. Нажмите на карточку, чтобы открыть инвестиционный профиль.</p>
    <div class="strip-grid" id="strip"><div v-for="c in COMPANIES" :key="c.id" class="strip-card reveal" @click="openCompany(c.id)"><div class="cc-top"><div class="co-logo" style="width:44px;height:44px;border-radius:11px"><img :src="c.logo" style="width:28px;height:28px" alt=""></div><span class="badge live">● LIVE</span></div><div><div class="cc-name">{{ c.name }}</div><div class="cc-sec">{{ c.sec.split("·")[0] }}</div></div><p class="cc-why">{{ c.why }}</p><div class="cc-meta"><div><span>за акцию</span><b>{{ c.price }}</b></div><div><span>мин. инвестиции</span><b>{{ MIN }}</b></div></div><div class="cc-btn">Инвестировать →</div></div></div>
  </div>
</section>
</template>
