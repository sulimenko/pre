<script setup>
import { inject } from 'vue'
import { draftActionKey } from './context'

const props = defineProps({
  label: { type: String, required: true },
  href: { type: String, default: '' },
  context: { type: String, default: '' },
  tone: { type: String, default: 'primary' },
  arrow: { type: Boolean, default: false }
})
const placeholderAction = inject(draftActionKey)
const handleClick = () => placeholderAction?.(props.context || props.label)
</script>

<template>
  <a v-if="href" :href="href" class="draft-btn" :class="'draft-btn--' + tone">
    {{ label }} <span v-if="arrow" aria-hidden="true">↗</span>
  </a>
  <button v-else type="button" class="draft-btn" :class="'draft-btn--' + tone" @click="handleClick">
    {{ label }} <span v-if="arrow" aria-hidden="true">↗</span>
  </button>
</template>
