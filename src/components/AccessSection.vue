<script setup>
import { ref } from 'vue'
const submitted = ref(false)
</script>
<template>
<section class="final" id="access">
  <div class="final-bg" id="finalBg"></div>
  <div class="final-shade"></div>
  <div class="wrap final-grid">
    <div>
      <h2 class="reveal">Станьте частью следующего.</h2>
      <p class="reveal">Получите ранний доступ к эксклюзивным Pre-IPO возможностям и терминалу Partner Finance. Оставьте заявку — менеджер свяжется с вами и поможет пройти онбординг.</p>
      <div class="final-links reveal">
        <a href="#access">Запросить доступ к Pre-IPO предложениям</a>
        <a href="#companies">Получить информацию по доступным компаниям</a>
        <a href="#terminal">Запросить демо терминала</a>
      </div>
    </div>
    <div class="form reveal">
      <div id="formBody" v-show="!submitted">
        <h3>Запросить доступ</h3>
        <p>Имя, телефон и e-mail — этого достаточно для первого шага.</p>
        <form id="leadForm" @submit.prevent="submitted=true">
          <div class="field"><label>Имя</label><input type="text" required placeholder="Как к вам обращаться"></div>
          <div class="field"><label>Телефон</label><input type="tel" required placeholder="+7 ___ ___ __ __"></div>
          <div class="field"><label>E-mail</label><input type="email" required placeholder="you@example.com"></div>
          <button class="btn btn-red" type="submit">Отправить заявку</button>
        </form>
        <p class="form-note">Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных. [Текст — placeholder для юристов.]</p>
      </div>
      <div class="form-ok" id="formOk" :style="{display:submitted?'block':'none'}">
        <b>Заявка отправлена</b>
        <span>Менеджер Partner Finance свяжется с вами в ближайшее время.</span>
      </div>
    </div>
  </div>
</section>
</template>
