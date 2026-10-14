<script setup>
import { ref, nextTick } from 'vue'
const active=ref(-1)
const answerHeights=ref([])
const answers=[]
const setAnswer=(el,i)=>{if(el)answers[i]=el}
const toggle=async(i)=>{active.value=active.value===i?-1:i;await nextTick();if(active.value>=0)answerHeights.value[active.value]=answers[active.value]?.scrollHeight||200}
const items=[{"q": "Что такое Pre-IPO инвестиции?", "a": "Это покупка акций частных компаний до их выхода на биржу. Инвестор входит по условиям частного рынка — до того, как цена и спрос формируются публичным листингом."}, {"q": "Какой минимальный порог входа?", "a": "Минимальный порог входа по текущим Pre-IPO предложениям — $5 000. Доступный объём зависит от аллокации и указывается в карточке каждой компании."}, {"q": "Как проходит онбординг и KYC?", "a": "Открытие аккаунта, верификация личности и подключение к платформе проходят в одном последовательном процессе внутри приложения."}, {"q": "Где хранятся мои активы и деньги?", "a": "Денежные средства учитываются на сегрегированных счетах, активы — через custodian/brokerage инфраструктуру. Пополнения проходят многоуровневый контроль: банк отправителя → платёжная инфраструктура → банк в Казахстане → KYC/AML Partner Finance."}, {"q": "Какие риски у Pre-IPO?", "a": "Это высокорисковый класс активов: компания может не выйти на IPO, листинг может состояться позже ожиданий или по цене ниже оценки. Возможна частичная или полная потеря вложенных средств."}, {"q": "Когда будет доступна торговля в терминале?", "a": "Мы запускаем инфраструктуру прямой торговли Pre-IPO в экосистеме Partner Finance. Клиенты из waitlist получат доступ первыми."}]
</script>
<template>
<section id="faq" style="background:var(--soft)">
  <div class="wrap">
    <div class="kicker reveal">Вопросы и ответы</div>
    <h2 class="h2 reveal">FAQ</h2>
    <div class="faq-list">
      <div v-for="(item,i) in items" :key="i" class="faq-item" :class="{open:active===i}"><button class="faq-q" @click="toggle(i)">{{ item.q }}</button><div class="faq-a" :ref="el => setAnswer(el,i)" :style="{maxHeight:active===i ? answerHeights[i]+'px' : null}"><p>{{ item.a }}</p></div></div>
    </div>
  </div>
</section>
</template>
