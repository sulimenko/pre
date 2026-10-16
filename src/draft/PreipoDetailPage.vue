<script setup>
import { computed, ref } from 'vue'
import DraftButton from './DraftButton.vue'
import { companyDetailHref, detailCompanies } from './preipoDetailData'
import './preipoDetail.css'

const props = defineProps({
  company: { type: Object, required: true },
  backHref: { type: String, required: true },
})
defineEmits(['back'])
const index = computed(() => detailCompanies.findIndex(company => company.id === props.company.id))
const previous = computed(() => detailCompanies[(index.value + detailCompanies.length - 1) % detailCompanies.length])
const next = computed(() => detailCompanies[(index.value + 1) % detailCompanies.length])
const terms = ['Цена за акцию', 'Оценка компании', 'Минимальная инвестиция', 'Допуск', 'Структура', 'Комиссия брокера', 'Комиссия за управление', 'Вознаграждение за успех']
const metrics = ['Годовая выручка', 'Рост за год', 'Акций в обращении', 'Привлечённый капитал']
const extraMetrics = ['Операционные показатели', 'Клиентские показатели', 'Рыночные показатели']
const amount = ref('')
const price = ref('')

// Integer minor units avoid fractional-share and currency rounding surprises.
// Inputs are hypothetical USD amounts only, with at most two decimal places.
function cents(value) {
  const normalized = value.trim().replace(',', '.')
  if (!/^\d{1,12}(\.\d{1,2})?$/.test(normalized)) return null
  const [whole, fraction = ''] = normalized.split('.')
  const result = Number(whole) * 100 + Number(fraction.padEnd(2, '0'))
  return result > 0 ? result : null
}
const money = value => new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'USD' }).format(value / 100)
const calculation = computed(() => {
  if (!amount.value && !price.value) return { message: 'Введите пример суммы и учебную цену. Значения не связаны с условиями компании.' }
  const budget = cents(amount.value)
  const unitPrice = cents(price.value)
  if (budget === null || unitPrice === null) return { message: 'Укажите два положительных числа: до 12 цифр и до двух знаков после запятой.', invalid: true }
  const shares = Math.floor(budget / unitPrice)
  return { shares, cost: money(shares * unitPrice), remainder: money(budget % unitPrice) }
})
</script>

<template>
  <main class="preipo-detail section-shell">
    <div class="preipo-backline">
      <a :href="backHref" @click="$emit('back', $event)"><span aria-hidden="true">‹</span> Назад к компаниям</a>
      <span class="preipo-label">ДЕМО · PRE-IPO</span>
    </div>
    <header class="preipo-titlebar">
      <div class="preipo-identity">
        <span class="preipo-logo"><img :src="company.logo" :alt="'Логотип ' + company.name" /></span>
        <div><h1 id="preipo-title" tabindex="-1">{{ company.name }}</h1><p>{{ company.sector }}</p></div>
      </div>
      <nav class="preipo-switcher" aria-label="Переключение компаний">
        <a :href="companyDetailHref(previous.id)" :data-company-id="previous.id" :aria-label="'Предыдущая компания: ' + previous.name">←</a>
        <span>{{ String(index + 1).padStart(2, '0') }} <small>/ 05</small></span>
        <a :href="companyDetailHref(next.id)" :data-company-id="next.id" :aria-label="'Следующая компания: ' + next.name">→</a>
      </nav>
    </header>
    <p class="preipo-banner">Демонстрационный макет. Реальные условия ожидают подтверждения. Финансовые показатели и доступность участия не подтверждены.</p>

    <div class="preipo-layout">
      <div class="preipo-left-column">
        <section class="preipo-box preipo-terms" aria-labelledby="preipo-terms-title">
          <header class="preipo-box-head"><h2 id="preipo-terms-title">Условия Pre-IPO</h2><span class="preipo-label">Ожидает подтверждения</span></header>
          <dl class="preipo-fields preipo-terms-grid">
            <div v-for="term in terms" :key="term"><dt>{{ term }}</dt><dd>Уточняется</dd></div>
          </dl>
          <p class="preipo-footnote">Параметры предложения для {{ company.name }} пока не подтверждены.</p>
        </section>

        <section class="preipo-box preipo-about" aria-labelledby="preipo-about-title">
          <header class="preipo-box-head"><h2 id="preipo-about-title">О компании</h2><span class="preipo-label">Черновое описание</span></header>
          <div class="preipo-about-grid preipo-body">
            <div><h3>Индустрия</h3><dl class="preipo-fields"><div><dt>Сектор</dt><dd>{{ company.industry }}</dd></div><div><dt>Подсектор</dt><dd>{{ company.subsector }}</dd></div></dl></div>
            <div><h3>{{ company.name }}</h3><p>{{ company.description }}</p><p class="preipo-help">Черновое описание из пользовательского архива; ожидает согласования.</p></div>
          </div>
          <figure class="preipo-photo">
            <img v-if="company.photo" :src="company.photo" :alt="company.photoAlt" />
            <div v-else class="preipo-photo-placeholder" role="img" aria-label="Графическая заглушка Polymarket. Фотография ожидает подтверждения.">
              <span aria-hidden="true">◇</span><strong>Polymarket</strong><p>Место для изображения</p>
            </div>
            <figcaption>{{ company.photo ? 'Изображение из пользовательского архива · ' + company.name : 'Графическая заглушка · фотография ожидает подтверждения' }}</figcaption>
          </figure>
        </section>

        <section class="preipo-box preipo-financials" aria-labelledby="preipo-financials-title">
          <header class="preipo-box-head"><h2 id="preipo-financials-title">Финансовые показатели</h2></header>
          <dl class="preipo-fields preipo-metrics"><div v-for="metric in metrics" :key="metric"><dt>{{ metric }}</dt><dd>Уточняется</dd></div></dl>
          <dl class="preipo-fields preipo-extra-metrics"><div v-for="metric in extraMetrics" :key="metric"><dt>{{ metric }}</dt><dd>Уточняется</dd></div></dl>
          <p class="preipo-footnote">Подтверждённые данные ожидаются. График появится после подтверждения набора данных.</p>
        </section>
        <section class="preipo-box preipo-investors" aria-labelledby="preipo-investors-title">
          <header class="preipo-box-head"><h2 id="preipo-investors-title">Ключевые инвесторы</h2></header>
          <p class="preipo-body">Список ожидает подтверждения</p>
        </section>
        <div class="preipo-notes">
          <section class="preipo-box" aria-labelledby="preipo-prospects-title">
            <header class="preipo-box-head"><h2 id="preipo-prospects-title">Перспективы</h2></header>
            <div class="preipo-body"><p class="preipo-label">Черновой материал · ДЕМО</p><p class="preipo-help">Темы для изучения сектора, не прогноз роста компании.</p><ul><li v-for="topic in company.topics" :key="topic">{{ topic }}</li></ul></div>
          </section>
          <section class="preipo-box" aria-labelledby="preipo-risks-title">
            <header class="preipo-box-head"><h2 id="preipo-risks-title">Инвестиционные риски</h2></header>
            <div class="preipo-body"><p class="preipo-label">Черновой материал · ДЕМО</p><p class="preipo-help">Примеры отраслевых тем, не оценка конкретной компании.</p><ul><li v-for="risk in company.risks" :key="risk">{{ risk }}</li></ul><p>Pre-IPO связан с низкой ликвидностью и риском полной потери вложений. IPO может не состояться; сроки выхода не определены.</p></div>
          </section>
        </div>
      </div>
      <aside class="preipo-right-column" aria-label="Учебный расчёт и условная модель SPV">
        <section class="preipo-box preipo-calculator" aria-labelledby="preipo-calculator-title">
          <header class="preipo-box-head"><h2 id="preipo-calculator-title">Учебный калькулятор</h2><span class="preipo-label">ДЕМО</span></header>
          <div class="preipo-body">
            <p class="preipo-demo-note">Только условный пример. Это не расчёт инвестиции в {{ company.name }}.</p>
            <label class="preipo-input" for="preipo-amount">Пример суммы, USD
              <input id="preipo-amount" v-model="amount" type="text" inputmode="decimal" autocomplete="off" maxlength="15" placeholder="Введите сумму" :aria-invalid="calculation.invalid || undefined" aria-describedby="preipo-calculation" />
            </label>
            <label class="preipo-input" for="preipo-price">Учебная цена за акцию, USD
              <input id="preipo-price" v-model="price" type="text" inputmode="decimal" autocomplete="off" maxlength="15" placeholder="Задайте условную цену" :aria-invalid="calculation.invalid || undefined" aria-describedby="preipo-price-source preipo-calculation" />
            </label>
            <p id="preipo-price-source" class="preipo-help">Условная цена для примера, не цена компании.</p>
            <div id="preipo-calculation" class="preipo-result" role="status" aria-live="polite" aria-atomic="true">
              <p v-if="calculation.message">{{ calculation.message }}</p>
              <template v-else>
                <p>Целых учебных акций: <strong>{{ calculation.shares.toLocaleString('ru-RU') }}</strong></p>
                <p>Условная стоимость: {{ calculation.cost }}</p>
                <p>Остаток примера суммы: {{ calculation.remainder }}</p>
                <p v-if="calculation.shares === 0">Примера суммы недостаточно для одной целой учебной акции.</p>
              </template>
            </div>
            <p class="preipo-help">Округление вниз до целых акций. Комиссии в учебном расчёте не учитываются; реальные тарифы уточняются. Доходность не рассчитывается.</p>
            <DraftButton label="Запросить условия" :context="'Запросить условия: ' + company.name" tone="primary" arrow />
            <p class="preipo-help">Демо: заявка не отправляется, средства не списываются. Персональные данные не собираются.</p>
          </div>
        </section>

        <section class="preipo-box preipo-guide" aria-labelledby="preipo-guide-title">
          <header class="preipo-box-head"><h2 id="preipo-guide-title">Как может работать SPV</h2></header>
          <div class="preipo-body">
            <p class="preipo-demo-note">Учебная условная модель. SPV не подтверждена как структура участия в {{ company.name }}.</p>
            <ol class="preipo-guide-list">
              <li>Для сделки может создаваться отдельное юридическое лицо — SPV.</li>
              <li>В такой модели инвестор получает долю или паи SPV; это может отличаться от прямого владения акциями компании.</li>
              <li>SPV может приобретать ценные бумаги на условиях конкретной сделки. Права инвестора определяются документами.</li>
              <li>Продажа доли и выход могут быть ограничены. Ликвидность, IPO и доходность не гарантированы.</li>
            </ol>
            <div class="preipo-example">
              <h3>Пример условий (не оферта)</h3>
              <p>Полностью гипотетический сценарий, не условия {{ company.name }}: SPV / фонд, допуск — квалифицированный инвестор.</p>
              <ul><li>Пример комиссии брокера — 0%.</li><li>Пример комиссии за управление — 5%.</li><li>Пример вознаграждения за успех — 15%.</li></ul>
              <p>Ставки приведены только для знакомства с видами комиссий. Период, база и порядок расчёта в этом примере не заданы; эти ставки не применяются в калькуляторе.</p>
            </div>
          </div>
        </section>
      </aside>
    </div>

    <nav class="preipo-bottom-nav" aria-label="Навигация по компаниям">
      <a :href="companyDetailHref(previous.id)" :data-company-id="previous.id">← {{ previous.name }}</a>
      <a :href="backHref" @click="$emit('back', $event)">Назад к компаниям</a>
      <a :href="companyDetailHref(next.id)" :data-company-id="next.id">{{ next.name }} →</a>
    </nav>
    <p class="preipo-disclaimer">Демонстрационный макет. Реальные условия ожидают подтверждения. Pre-IPO связан с рисками.</p>
  </main>
</template>
