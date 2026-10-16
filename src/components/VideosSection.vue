<script setup>
import { inject } from 'vue'
import { landingActionsKey } from '../composables/landingActions'
const { openTerminal } = inject(landingActionsKey)
</script>
<template>
<section>
  <div class="wrap">
    <div class="kicker reveal">Инсайты и интервью</div>
    <h2 class="h2 reveal">Учитесь у лидеров отрасли</h2>
    <div class="videos">
      <div class="video reveal"><div class="video-thumb"><span class="video-tag">Видео · 2 мин</span><div class="play"></div></div><div class="video-body"><b>Следующая волна private markets</b><span>Команда Partner Finance о ценности продукта и логике private markets.</span></div></div>
      <div class="video reveal"><div class="video-thumb" style="background:linear-gradient(135deg,var(--blue2),var(--blue3))"><span class="video-tag">Демо · 30 сек</span><div class="play" @click="openTerminal()"></div></div><div class="video-body"><b>Демо терминала</b><span>Интерактивная презентация: от карточки компании до позиции в портфеле.</span></div></div>
      <div class="video reveal"><div class="video-thumb" style="background:linear-gradient(135deg,var(--blue),var(--red))"><span class="video-tag">Аналитика</span><div class="play"></div></div><div class="video-body"><b>Почему Polymarket и Apptronik вызывают интерес</b><span>Интервью и аналитический тезис от наших экспертов.</span></div></div>
    </div>
  </div>
</section>
</template>
