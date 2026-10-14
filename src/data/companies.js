export const MIN = '$5 000';
export const COMPANIES = [
 {id:'polymarket', name:'Polymarket', sec:'Prediction markets · Future of information', logo:'/assets/polymarket.png',
  price:'$170', valuation:'$15,5 млрд', status:'hot', statusText:'Доступно сейчас', live:true,
  why:'Крупнейший в мире рынок предсказаний: 1 342 активных рынка, объём $96.7M за 24ч.',
  desc:'Polymarket — ведущая блокчейн-платформа prediction markets. Инвестиционная возможность в самой быстрорастущей категории Web3, на пересечении data, media и behavioral finance.',
  facts:['Основана в 2020, Нью-Йорк','Инфраструктура: Polygon, расчёты в USDC','1 342 активных рынка, total volume (24h) $96.7M','Open interest $128.4M, вероятности по топ-событиям 73%'],
  cells:[['Цена акции','$170'],['Оценка по последнему раунду','$15,5 млрд'],['Минимум','$5 000'],['Основана','2020'],['Активных рынков','1 342'],['Volume 24h','$96.7M']]},
 {id:'apptronik', name:'Apptronik', sec:'Humanoid robotics · Future of labor', logo:'/assets/apptronik.png',
  price:'$45', valuation:'$5,39 млрд', status:'hot', statusText:'Доступно сейчас', live:true,
  why:'Гуманоидные роботы Apollo. Партнёрства: Mercedes-Benz, JABIL, Google DeepMind.',
  desc:'Apptronik — разработчик гуманоидных роботов Apollo для производства, логистики и автоматизации. Инвестиционная возможность в одной из самых перспективных категорий physical AI и robotics.',
  facts:['Основана в 2016, Остин, Техас','Привлечено $965M, Series A Ext $520M','TAM 2030: $40 млрд (humanoid robotics)','Enterprise-сигналы: Mercedes-Benz, JABIL, Google DeepMind'],
  cells:[['Цена входа','$45'],['Оценка по последнему раунду','$5,39 млрд'],['Минимум','$5 000'],['Привлечено','$965M'],['TAM 2030','$40B'],['Робот','Apollo']]},
 {id:'lambda', name:'Lambda', sec:'AI infrastructure', logo:'/assets/lambda.svg',
  price:'$62.50', valuation:'≈ $11,43 млрд', status:'lim', statusText:'Limited', live:true,
  why:'Вычислительная инфраструктура для эпохи ИИ. NVIDIA 7× Partner of the Year.',
  desc:'Lambda зарабатывает не на том, какая ИИ-модель победит. Вычисления нужны всем: GPU-инфраструктура для обучения и инференса моделей с коммерческой валидацией.',
  facts:['Series E: >$1,5 млрд привлечено (ноябрь 2025)','Многомиллиардное соглашение с Microsoft на ИИ-инфраструктуру','NVIDIA 7× Partner of the Year, Exemplar Cloud','Потенциальный горизонт IPO: 2027–2028'],
  cells:[['Цена входа','$62.50'],['Ориент. оценка','≈ $11,43 млрд'],['Минимум','$5 000'],['Горизонт IPO','2027–2028'],['Раунд','Series E'],['Партнёр','NVIDIA']]},
 {id:'perplexity', name:'Perplexity', sec:'AI search · Исследования · Агенты', logo:'/assets/perplexity.png',
  price:'$92.40', valuation:'≈ $27,28B', status:'open', statusText:'Open', live:true,
  why:'Мультимодальная ИИ-платформа поиска. Выручка >$750M, дистрибуция Samsung.',
  desc:'Perplexity — мультимодальная ИИ-платформа для поиска, глубоких исследований и агентных рабочих процессов. Тезис основан на расширении продукта и его монетизации, а не только на следующем раунде.',
  facts:['Текущая оферта $92.40; последний подтверждённый раунд ≈ $20.53B ($69.54/акция)','Годовая выручка >$750M (в пересчёте на год)','50 000+ организаций, дистрибуция Samsung','Работает с ведущими ИИ-моделями: OpenAI, Anthropic, Google, Meta, xAI, Mistral'],
  cells:[['Цена входа','$92.40'],['Ориент. оценка','≈ $27.28B'],['Минимум','$5 000'],['Выручка','> $750M'],['Организации','50 000+'],['Статус','Текущая оферта']]},
 {id:'sambanova', name:'SambaNova', sec:'AI chips · Inference infrastructure', logo:'/assets/sambanova.png',
  price:'по запросу', valuation:'по запросу', status:'open', statusText:'Open', live:true,
  why:'Инфраструктура для ИИ: быстрее и энергоэффективнее универсальных GPU.',
  desc:'SambaNova создаёт специализированную инфраструктуру для ИИ, оптимизированную для быстрого и энергоэффективного запуска больших ИИ-моделей: «скоростная железная дорога» вместо «универсального грузовика».',
  facts:['Специализация: инференс больших ИИ-моделей','Выше скорость обработки, ниже стоимость запуска ИИ на масштабе','Энергоэффективность — ключевое преимущество при росте цен на электроэнергию','Полный путь: от запроса до ответа — на оптимизированной инфраструктуре'],
  cells:[['Цена входа','по запросу'],['Оценка','по запросу'],['Минимум','$5 000'],['Фокус','Инференс'],['Категория','AI chips'],['Статус','Open']]}
];
export const badgeClass = s => s==='hot'?'badge hot':(s==='lim'?'badge lim':'badge');
export const share = p => p.startsWith('$')?' / share':'';

