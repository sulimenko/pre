<script setup>
import { ref, nextTick, watch, onMounted, onBeforeUnmount } from 'vue'
import { COMPANIES, badgeClass } from '../data/companies'
import { WL } from '../data/terminal'

const props = defineProps({
  open: { type:Boolean,default:false },
  initialPane: { type:String,default:'chart' }
})
defineEmits(['close','open-company'])
const pane = ref('chart')
const ticker = ref(0)
const timers = new Set()

function tmTab(which) { pane.value = which }
function selectTicker(index) { ticker.value = index; pane.value='chart'; nextTick(drawCandles) }
function feedback(e,msg) {
  const btn=e.currentTarget
  if (btn.disabled) return
  const original=btn.textContent
  btn.textContent='✓ '+msg
  btn.disabled=true
  btn.style.opacity='.85'
  const timeout=setTimeout(()=>{btn.textContent=original;btn.disabled=false;btn.style.opacity='1';timers.delete(timeout)},2200)
  timers.add(timeout)
}
function drawCandles() {
  const cv=document.getElementById('candleCanvas')
  if(!props.open || !cv) return
  const W=cv.clientWidth,H=cv.clientHeight
  if(!W || !H) return
  const dpr=window.devicePixelRatio||1
  cv.width=W*dpr; cv.height=H*dpr
  const ctx=cv.getContext('2d');ctx.scale(dpr,dpr);ctx.clearRect(0,0,W,H)
  ctx.strokeStyle='#1c2a5e';ctx.lineWidth=1
  for(let y=0;y<H;y+=44){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke()}
  const n=Math.floor(W/14),cw=7,base=WL[ticker.value].p
  let price=base*.9
  const series=[]
  for(let i=0;i<n;i++){
    const o=price,drift=(Math.random()-.44)*base*.025
    const cl=o+drift,hi=Math.max(o,cl)+Math.random()*base*.01,lo=Math.min(o,cl)-Math.random()*base*.01
    series.push({o,cl,hi,lo});price=cl
  }
  if(!series.length)return
  const mn=Math.min(...series.map(s=>s.lo)),mx=Math.max(...series.map(s=>s.hi))
  const pad=24,map=v=>pad+(mx-v)/(mx-mn)*(H-2*pad)
  series.forEach((s,i)=>{
    const x=i*14+4,up=s.cl>=s.o
    ctx.strokeStyle=ctx.fillStyle=up?'#17C784':'#BF1736'
    ctx.beginPath();ctx.moveTo(x+cw/2,map(s.hi));ctx.lineTo(x+cw/2,map(s.lo));ctx.stroke()
    ctx.fillRect(x,map(Math.max(s.o,s.cl)),cw,Math.max(2,Math.abs(map(s.o)-map(s.cl))))
  })
  ctx.setLineDash([4,4]);ctx.strokeStyle='#5E74C9'
  ctx.beginPath();ctx.moveTo(0,map(price));ctx.lineTo(W,map(price));ctx.stroke();ctx.setLineDash([])
  ctx.fillStyle='#5E74C9';ctx.font='11px Montserrat,sans-serif'
  ctx.fillText('$'+price.toFixed(2),W-64,map(price)-6)
}
watch(()=>props.open, async(open)=>{
  if(open){pane.value=props.initialPane;await nextTick();requestAnimationFrame(drawCandles)}
})
watch(()=>props.initialPane,value=>{if(props.open)pane.value=value})
function onResize(){if(props.open)drawCandles()}
onMounted(()=>window.addEventListener('resize',onResize))
onBeforeUnmount(()=>{window.removeEventListener('resize',onResize);timers.forEach(clearTimeout)})
</script>
<template>
<div class="overlay" :class="{show:open}" id="tOverlay" @click.self="$emit('close')">
  <div class="modal t-modal">
    <button class="modal-close" @click="$emit('close')">✕</button>
    <div class="tm-top">
      <div class="tm-logo">PBULL <small>by Partner Finance</small></div>
      <div class="tm-tabs">
        <button class="tm-tab" :class="{active:pane==='chart'}" id="tabChart" @click="tmTab('chart')">График</button>
        <button class="tm-tab" :class="{active:pane==='preipo'}" id="tabPreipo" @click="tmTab('preipo')">Pre-IPO</button>
      </div>
      <div class="tm-bal"><span>Оценка портфеля</span><b>616 419,26 $</b></div>
    </div>
    <div class="tm-body">
      <div class="tm-chart">
        <div class="tm-chart-head"><b id="chTicker">{{ WL[ticker].n.toUpperCase() }} · Pre-IPO</b><span class="chg" :class="WL[ticker].c>=0?'up':'dn'" id="chChg">{{ WL[ticker].c>=0?'+':'' }}{{ WL[ticker].c }}% за неделю</span></div>
        <canvas id="candleCanvas"></canvas>
        <div class="tm-preipo" :class="{show:pane==='preipo'}" id="preipoPane"><h4>Pre-IPO · доступные компании</h4><div id="piList"><div v-for="c in COMPANIES" :key="c.id" class="pi-row" @click="$emit('close');$emit('open-company',c.id)"><div class="pi-co"><div class="co-logo"><img :src="c.logo" alt=""></div><div><b>{{ c.name }}</b><span>{{ c.sec.split('·')[0] }}</span></div></div><div class="pi-right"><b>{{ c.price }}</b><span :class="badgeClass(c.status)">{{ c.statusText }}</span><button class="pi-btn" @click.stop="feedback($event,'Заявка отправлена')">Купить</button></div></div></div></div>
      </div>
      <div class="tm-side">
        <h5>Watch List</h5>
        <div id="wlList"><div v-for="(w,i) in WL" :key="i" class="wl-row" @click="selectTicker(i)"><b>{{ w.t }}</b><div class="p"><b>${{ w.p.toFixed(2) }}</b><span class="chg" :class="w.c>=0?'up':'dn'" style="font-size:10px">{{ w.c>=0?'+':'' }}{{ w.c }}%</span></div></div></div>
        <div class="tm-order">
          <div class="meta"><span>Последняя цена</span><b id="ordPrice">${{ WL[ticker].p.toFixed(2) }}</b></div>
          <div class="meta"><span>Доступно</span><b>88 542,18 $</b></div>
          <div class="row2"><button class="btn-buy" @click="feedback($event,'Заявка на покупку отправлена')">КУПИТЬ</button><button class="btn-sell" @click="feedback($event,'Заявка на продажу отправлена')">ПРОДАТЬ</button></div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
