<script setup>
import { inject } from 'vue'
import { landingActionsKey } from '../composables/landingActions'
const { openTerminal } = inject(landingActionsKey)
</script>
<template>
<section class="terminal-sec" id="terminal">
  <div class="wrap">
    <div class="kicker reveal">Терминал Partner Finance</div>
    <h2 class="h2 reveal">Полный инвестиционный опыт.<br>От Pre-IPO — к вторичной торговле.</h2>
    <p class="lead reveal">Покупайте эксклюзивные Pre-IPO сделки сейчас — и скоро торгуйте ими в терминале Partner Finance.</p>
    <button class="demo-btn reveal" @click="openTerminal()">▶ Открыть интерактивную презентацию терминала</button>
    <div class="sticky-grid">
      <div class="steps">
        <div class="step" data-screen="0"><div class="step-num">ШАГ 01</div><div class="step-title">Выбор компании</div><p class="step-text">Изучите эксклюзивные Pre-IPO возможности: сектор, тезис, ключевые метрики.</p></div>
        <div class="step" data-screen="1"><div class="step-num">ШАГ 02</div><div class="step-title">Просмотр условий</div><p class="step-text">Цена, оценка, минимум $5 000 и ключевые документы — до принятия решения.</p></div>
        <div class="step" data-screen="2"><div class="step-num">ШАГ 03</div><div class="step-title">Размещение заявки</div><p class="step-text">Одна clean-кнопка. Инвестируйте за минуты — безопасно и прозрачно.</p></div>
        <div class="step" data-screen="3"><div class="step-num">ШАГ 04</div><div class="step-title">Статус исполнения</div><p class="step-text">Pending → Confirmed → Completed. Обновления в реальном времени на каждом этапе.</p></div>
        <div class="step" data-screen="4"><div class="step-num">ШАГ 05</div><div class="step-title">Уведомления</div><p class="step-text">Order received, allocation updated, deal confirmed — каждое событие приходит мгновенно.</p></div>
        <div class="step" data-screen="5"><div class="step-num">ШАГ 06</div><div class="step-title">Ваша позиция</div><p class="step-text">Отслеживайте результат в портфеле: стоимость, статус и динамика — в одном месте.</p></div>
      </div>
      <div class="sticky-mock">
        <div class="term" style="cursor:default" @click.stop>
          <div class="term-bar"><div class="dot"></div><div class="dot"></div><div class="dot"></div><span class="term-title" id="screenTitle">Terminal — Шаг 01 / 06</span></div>
          <div class="screen" id="screen"></div>
        </div>
      </div>
    </div>
  </div>
</section>
</template>
