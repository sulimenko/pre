<script setup>
import { inject } from 'vue'
import { landingActionsKey } from '../composables/landingActions'
const { openTerminal } = inject(landingActionsKey)
</script>
<template>
<section id="how" style="padding-top:0">
  <div class="wrap">
    <div class="kicker reveal">Экосистема</div>
    <h2 class="h2 reveal">Создано для полного инвестиционного цикла</h2>
    <div class="bento">
      <div class="bento-cell bento-big reveal" @click="openTerminal()">
        <div class="bento-num">01</div>
        <h3>Терминал Partner Finance</h3>
        <p>Выбор компании, условия, заявка, статус исполнения, уведомления и портфель — единый контур без посредников. Нажмите, чтобы открыть интерактивную презентацию.</p>
        <span class="btn btn-red" style="align-self:flex-start">▶ Смотреть презентацию</span>
      </div>
      <div class="bento-cell reveal"><div class="bento-num">02</div><div class="bento-ico">⚡</div><h4>Быстрый онбординг</h4><p>Аккаунт, KYC и подключение — один последовательный процесс в приложении.</p></div>
      <div class="bento-cell reveal"><div class="bento-num">03</div><div class="bento-ico">◎</div><h4>Прозрачные условия</h4><p>Цена, минимум $5 000 и комиссия видны до сделки. Без скрытых пунктов.</p></div>
      <div class="bento-cell reveal"><div class="bento-num">04</div><div class="bento-ico">⛨</div><h4>Многоуровневый контроль</h4><p>Банк отправителя → платёжная инфраструктура → банк в KZ → KYC/AML Partner Finance.</p></div>
      <div class="bento-cell reveal"><div class="bento-num">05</div><div class="bento-ico">✆</div><h4>Поддержка 24/7</h4><p>Персональный менеджер на всех этапах — от первой заявки до портфеля.</p></div>
    </div>
  </div>
</section>
</template>
