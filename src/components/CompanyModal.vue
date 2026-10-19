<script setup>
defineProps({ company: { type: Object, default: null } })
defineEmits(['close','request-details','open-terminal'])
</script>
<template>
<div class="overlay" :class="{ show: company }" id="coOverlay" @click.self="$emit('close')">
  <div class="modal co-modal">
    <button class="modal-close" @click="$emit('close')">✕</button>
    <span class="cm-tag">Pre-IPO · Private Markets</span>
    <div class="cm-head">
      <div class="cm-logo"><img id="cmLogo" :src="company?.logo || ''" alt=""></div>
      <div><div class="cm-name" id="cmName">{{ company?.name }}</div><div class="cm-sec" id="cmSec">{{ company?.sec }}</div></div>
    </div>
    <p class="cm-desc" id="cmDesc">{{ company?.desc }}</p>
    <div class="cm-grid" id="cmGrid"><div v-for="(cell,i) in company?.cells || []" :key="i" class="cm-cell"><span>{{ cell[0] }}</span><b>{{ cell[1] }}</b></div></div>
    <div class="cm-facts" id="cmFacts"><div v-for="(fact,i) in company?.facts || []" :key="i" class="cm-fact">{{ fact }}</div></div>
    <div class="cm-cta">
      <button class="btn btn-red" @click="$emit('request-details')">Запросить детали</button>
      <button class="btn-ghostw" @click="$emit('open-terminal')">Смотреть в терминале</button>
    </div>
    <p class="cm-disc">Указанная оценка — по последнему раунду финансирования, не является публичной рыночной капитализацией. Информация носит информационный характер и не является публичной офертой.</p>
  </div>
</div>
</template>
