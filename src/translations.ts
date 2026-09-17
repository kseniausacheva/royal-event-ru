// Блог-статьи живут в отдельном файле как единый источник правды.
// Чтобы добавить новую статью — отредактируй ТОЛЬКО src/content/blog-articles.mjs.
// Sitemap, prerender и категории обновятся автоматически при npm run build.
import { blogArticles } from './content/blog-articles.mjs';

// Преобразуем общую структуру блог-статей в "плоский" формат, который ожидают компоненты
// (id + поля выбранной локали + общий image).
const ruArticles = blogArticles.map((a) => ({
  id: a.id,
  title: a.ru.title,
  date: a.ru.date,
  category: a.ru.category,
  excerpt: a.ru.excerpt,
  content: a.ru.content,
  image: a.image,
}));

const enArticles = blogArticles.map((a) => ({
  id: a.id,
  title: a.en.title,
  date: a.en.date,
  category: a.en.category,
  excerpt: a.en.excerpt,
  content: a.en.content,
  image: a.image,
}));

export const translations = {
  ru: {
    nav: {
      home: 'Главная',
      about: 'О компании',
      services: 'Услуги',
      programs: 'Программы',
      cruises: 'Круизы',
      dmc: 'DMC',
      egypt: 'Египет',
      russia: 'Россия',
      portfolio: 'Кейсы',
      delegations: 'Делегации',
      blog: 'Блог',
      contact: 'Контакты',
    },
    hero: {
      tag: 'La Royal Event — MICE и DMC в Египте',
      title: 'СОЗДАЁМ СОБЫТИЯ, КОТОРЫЕ СТАНОВЯТСЯ',
      titleAccent: 'ИСТОРИЕЙ',
      subtitle: 'Мероприятия полного цикла в Египте. От камерного ужина на 20 человек до конференции на 1000+ гостей. Собственное производство, прямые контракты, команда на месте. 20+ лет на Ближнем Востоке.',
      stats: [
        { value: '20+', label: 'ЛЕТ ОПЫТА' },
        { value: '1 000+', label: 'ГОСТЕЙ НА СОБЫТИИ' },
        { value: '10', label: 'АВТОРСКИХ ПРОГРАММ' },
        { value: '40+', label: 'В КОМАНДЕ' },
      ],
      cta: 'ЗАПРОСИТЬ ПРЕДЛОЖЕНИЕ',
    },
    whyUs: {
      title: 'ПОЧЕМУ ВЫБИРАЮТ НАС',
      subtitle: 'Наши преимущества',
      items: [
        { title: '20+ лет опыта', desc: 'Глубокое понимание специфики и культуры арабского региона.' },
        { title: 'Собственная база', desc: 'Свое производство декораций и мебели в Египте.' },
        { title: 'Прямые контракты', desc: 'Эксклюзивные условия в Four Seasons, Kempinski и других топ-отелях.' },
        { title: 'Полный цикл', desc: 'От идеи и логистики до технического продакшена и букинга звезд.' }
      ]
    },
    production: {
      title: 'СОБСТВЕННОЕ ПРОИЗВОДСТВО',
      subtitle: 'Мы не зависим от посредников',
      desc: 'У нас собственная база в Египте по производству конструкций и мебели для мероприятий. Мы обеспечиваем полный цикл технического оснащения.',
      items: [
        { title: 'Мебель и декор', desc: 'Собственные цеха по производству дизайнерской мебели.' },
        { title: 'Свет и звук', desc: 'Профессиональное оборудование мировых брендов.' },
        { title: 'LED экраны', desc: 'Любые конфигурации и высокое разрешение.' },
        { title: 'Конструкции', desc: 'Застройка стендов и сцен любой сложности.' }
      ]
    },
    cases: {
      title: 'НАШИ КЕЙСЫ',
      subtitle: 'Масштабные проекты',
      items: [
        {
          id: 'carlsberg',
          client: 'Carlsberg',
          people: '1000 человек',
          desc: 'Грандиозная конференция в Domina Coral Bay: 1000 участников и безупречный сервис.',
          fullDesc: 'Масштабная конференция для компании Carlsberg, объединившая 1000 участников в легендарном отеле Domina Coral Bay. Мы обеспечили полный цикл технического продакшена, разработали эксклюзивную развлекательную программу и организовали высококлассный кейтеринг. Наша команда также предоставила профессиональных хостес и обеспечила комплексную координацию всех этапов мероприятия. От сложной логистики до финального гала-ужина — каждый элемент был проработан до мелочей, чтобы создать атмосферу истинного триумфа бренда.',
          image: '/carlsberg-0.JPG',
          gallery: [
            '/carlsberg-0.JPG', '/carlsberg-1.JPG', '/carlsberg-2.JPG', '/carlsberg-3.JPG', '/carlsberg-4.JPG',
            '/carlsberg-5.JPG', '/carlsberg-6.JPG', '/carlsberg-7.JPG', '/carlsberg-8.JPG', '/carlsberg-9.JPG',
            '/carlsberg-10.JPG', '/carlsberg-11.JPG', '/carlsberg-12.JPG'
          ]
        },
        {
          id: 'nl-international',
          client: 'NL International',
          people: '300 человек',
          desc: 'Корпоративное событие длительностью 7 дней. Полное сопровождение.',
          fullDesc: 'Масштабный и амбициозный проект, объединивший 300 участников на 7 дней в роскошном отеле Park Regency. Мы обеспечили полную техническую поддержку и комплексную организацию события. Программа была насыщена разнообразными активностями: от профессиональных мастер-классов по йоге, визажу, танцам и изобразительному искусству до захватывающих тимбилдинг-квестов, направленных на сплочение команды. Деловая часть форума прошла в современных конференц-залах отеля, а кульминацией стали эксклюзивные вечеринки: атмосферный вечер в стиле «Luxury Egypt» и элегантная «Белая вечеринка» на живописной скале под открытым небом. Мы взяли на себя всё: от сложной логистики и размещения до организации уникальных экскурсионных маршрутов.',
          image: '/nl-7.jpg',
          videos: [
            { url: '/videos/nl-horizontal.mp4', type: 'horizontal' },
            { url: '/videos/nl-vertical1.mp4', type: 'vertical' },
            { url: '/videos/nl-vertical3.mp4', type: 'vertical' },
            { url: '/videos/nl-vertical3-1.mp4', type: 'vertical' }
          ],
          gallery: [
            '/nl-7.jpg',
            '/nl-2.jpg',
            '/nl-3.jpg',
            '/nl-4.jpg',
            '/nl-5.jpg',
            '/nl-6.jpg',
            '/nl-8.jpg',
            '/nl-9.jpg',
            '/nl-10.jpg',
            '/nl-11.jpg',
            '/nl-12.jpg',
            '/nl-13.jpg',
            '/nl-14.jpg',
            '/nl-15.jpg',
            '/nl-16.jpg',
            '/nl-17.jpg',
            '/nl-18.jpg',
            '/nl-19.jpg',
            '/nl-20.jpg',
            '/nl-21.jpg',
            '/nl-22.jpg',
            '/nl-23.jpg',
            '/nl-24.jpg',
            '/nl-25.jpg',
            '/nl-26.jpg',
            '/nl-27.jpg',
            '/nl-28.jpg',
            '/nl-29.jpg',
            '/nl-30.jpg'
          ]
        },
        {
          id: 'ewa-product',
          client: 'EWA product',
          people: '200 человек',
          desc: '5 дней драйва, инсайтов и безупречной организации в Rixos Seagate.',
          fullDesc: 'Мы превратили корпоративный выезд EWA Product в незабываемое 5-дневное путешествие в Шарм-эль-Шейхе. Проект охватил лучшие локации: от высокотехнологичных конференц-залов отеля Rixos Seagate до атмосферных площадок Marlin и Space. Наша команда обеспечила полный технический продакшн, создание эксклюзивных декораций и разработку креативной концепции развлечений. Программа была наполнена глубокими воркшопами, вдохновляющими мастер-классами и активным тимбилдингом. Мы создали среду для роста, где каждый элемент декора и каждая минута шоу работали на общую цель и сплочение команды.',
          image: '/ewa-14.jpg',
          videos: [
            { url: '/videos/ewa-horizontal.mp4', type: 'horizontal', poster: '/ewa-14.jpg' },
            { url: '/videos/ewa-vertical1.mp4', type: 'vertical', poster: '/ewa-5.jpg' },
            { url: '/videos/ewa-vertical3.MP4', type: 'vertical', poster: '/ewa-6.jpg' },
            { url: '/videos/IMG_7742.MP4', type: 'vertical', poster: '/ewa-7.jpg' }
          ],
          gallery: [
            '/ewa-4.jpg', '/ewa-5.jpg', '/ewa-6.jpg', '/ewa-7.jpg', '/ewa-8.jpg', '/ewa-9.jpg', '/ewa-10.jpg',
            '/ewa-11.jpg', '/ewa-12.jpg', '/ewa-13.jpg', '/ewa-14.jpg', '/ewa-15.jpg',
            '/ewa-16.jpg', '/ewa-17.jpg', '/ewa-18.jpg', '/ewa-19.jpg', '/ewa-20.jpg',
            '/ewa-21.jpg', '/ewa-22.jpg', '/ewa-23.jpg', '/ewa-24.jpg', '/ewa-25.jpg',
            '/ewa-26.jpg', '/ewa-27.jpg', '/ewa-28.jpg'
          ]
        },
        {
          id: 'afa-agricultural',
          client: 'AFA conference',
          people: '250 человек',
          desc: 'Сельскохозяйственная конференция в Grand Rotana и Savoy: мост между российским бизнесом и арабскими партнерами.',
          fullDesc: 'Конференция AFA стала важной платформой для укрепления деловых связей в сельскохозяйственном секторе. Мы организовали событие на 250 участников, задействовав лучшие площадки отелей Grand Rotana и Savoy. Наша команда обеспечила полный технический цикл (звук, свет, LED-экраны, сцена), а также создала изысканную атмосферу через декор, флористику и профессиональный кейтеринг. Особое внимание было уделено работе с делегациями: мы координировали встречи российских участников с арабскими партнерами, обеспечивали профессиональный перевод и протоколирование переговоров. Мы взяли на себя всю логистику — от трансферов и размещения до детального планирования деловой программы и подведения итогов встреч.',
          image: '/afa-0.JPG',
          gallery: [
            '/afa-0.JPG', '/afa-1.JPG', '/afa-2.JPG', '/afa-3.JPG', '/afa-4.JPG'
          ]
        },
        {
          id: 'world-stars',
          client: 'Мировые звезды',
          people: 'VIP проекты',
          desc: 'Букинг и организация концертов артистов мирового уровня: от переговоров до шоу.',
          fullDesc: 'Мы обладаем уникальным опытом и ресурсами для организации выступлений артистов любого масштаба. Наша команда берет на себя весь цикл: от прямых переговоров с менеджментом звезд до безупречного выполнения сложнейших технических и бытовых райдеров. В нашем портфолио — успешная организация приезда в Египет таких имен, как David Guetta, Son of Son, Tom Enzy, Koroleva и многих других. Мы гарантируем полную конфиденциальность, безопасность и высочайший уровень технического продакшена, превращая каждое выступление в грандиозное шоу мирового уровня.',
          image: '/ws-3.jpeg',
          videos: [
            { url: '/videos/IMG_7742.MP4', type: 'vertical' },
            { url: '/videos/ws-1.mp4', type: 'vertical' },
            { url: '/videos/ws-2.mp4', type: 'vertical' }
          ]
        },
        {
          id: 'bedouin-dinner',
          client: 'VIP Бедуинский ужин',
          people: 'VIP',
          desc: 'VIP Бедуинский ужин в отеле Four Seasons: дизайн-концепция, развлекательная программа, техническое сопровождение и подарочная продукция.',
          fullDesc: 'Эксклюзивный проект для VIP-гостей в роскошном отеле Four Seasons. Мы разработали уникальную дизайн-концепцию, объединяющую аутентичные бедуинские традиции с современным люксом. Наша команда обеспечила полное техническое сопровождение мероприятия, создала захватывающую развлекательную программу и подготовила брендированную подарочную продукцию высочайшего качества. Каждый элемент ужина был продуман до мелочей, чтобы создать атмосферу истинного восточного гостеприимства и статуса.',
          image: '/bd-1.jpg',
          gallery: [
            '/bd-1.jpg', '/bd-2.jpg', '/bd-3.jpg', '/bd-4.jpg', '/bd-5.jpg', '/bd-6.jpg'
          ],
          videos: [
            { url: '/videos/bd-v1.mp4', type: 'vertical' },
            { url: '/videos/bd-v2.mp4', type: 'vertical' },
            { url: '/videos/bd-v3.MOV', type: 'vertical' }
          ]
        }
      ]
    },
    team: {
      title: 'НАША КОМАНДА',
      subtitle: 'Лидеры индустрии',
      ceos: [
        { name: 'Ксения Усачева', role: 'CEO / Основатель', image: '/ksenia-usacheva.jpg' },
        { name: 'Екатерина Гайдук', role: 'CEO / Партнер', image: '/ekaterina-gaiduk.jpg' }
      ],
      desc: 'Наша команда — это 40+ профессиональных сотрудников. Многие из нас свободно владеют английским и арабским языками, обеспечивая безупречную коммуникацию на международном уровне.',
      fullTeam: 'Наша команда в сборе'
    },
    videos: {
      title: 'ПОЧУВСТВУЙТЕ МАСШТАБ',
      subtitle: 'Жизнь Royal Event',
      instruction: 'Перетащите или нажмите, чтобы увидеть наши моменты',
      videoLabel: 'Видео',
      featuredLabel: 'FEATURED',
      items: [
        { id: 1, url: '/videos/nl-vertical4.MP4', poster: '/ewa-14.jpg', label: 'Главное событие года' },
        { id: 2, url: '/videos/ewa-vertical1.mp4', poster: '/ewa-5.jpg', label: 'Яркие моменты' },
        { id: 3, url: '/videos/IMG_7742.MP4', poster: '/ewa-6.jpg', label: 'Наши проекты' },
        { id: 4, url: '/videos/nl-vertical1.mp4', poster: '/ewa-7.jpg', label: 'Эмоции' },
        { id: 5, url: '/videos/ws-1.mp4', poster: '/ewa-8.jpg', label: 'Команда' },
        { id: 6, url: '/videos/bd-v1.mp4', poster: '/ewa-9.jpg', label: 'Локации' },
        { id: 7, url: '/videos/nl-vertical3.mp4', poster: '/ewa-10.jpg', label: 'Партнеры' },
      ]
    },
    servicesOverview: {
      title: 'ЧТО МЫ ДЕЛАЕМ',
      titleAccent: 'ЛУЧШЕ ВСЕГО',
      cta: 'ВСЕ УСЛУГИ',
      items: [
        { title: 'Конференции', desc: 'Полный цикл организации деловых мероприятий, форумов и саммитов.' },
        { title: 'Тимбилдинг', desc: 'Уникальные программы для укрепления корпоративной культуры и командного духа.' },
        { title: 'Международный\nпротокол', desc: 'Проведение дипломатических и государственных мероприятий высокого уровня.' },
        { title: 'Делегации', desc: 'Перевод, протокол, культурные программы. Арабские делегации в России и российские на Ближнем Востоке.' }
      ]
    },
    locations: {
      title: 'ГЕОГРАФИЯ ПРИСУТСТВИЯ',
      subtitle: 'Наши локации',
      items: [
        { name: 'Каир', country: 'Египет' },
        { name: 'Шарм-эль-шейх', country: 'Египет' },
        { name: 'Москва', country: 'Россия' },
        { name: 'Вся Россия', country: 'РФ' }
      ]
    },
    philosophy: {
      title: 'ИСКУССТВО ДЕТАЛЕЙ',
      subtitle: 'Наша философия',
      items: [
        { title: 'Конфиденциальность', desc: 'Полная защита информации и приватность.' },
        { title: 'Статус', desc: 'События, подчеркивающие ваш уровень.' },
        { title: 'Мультикультурность', desc: 'Глубокое понимание традиций и этикета.' }
      ]
    },
    aboutPage: {
      title: 'LA ROYAL EVENT',
      subtitle: 'Ваш стратегический DMC партнер в арабском мире и России',
      description: 'Мы специализируемся на организации мероприятий в арабских странах, выступая в роли надежного DMC (Destination Management Company) партнера. Наша экспертиза охватывает как проведение событий для иностранных компаний в Египте, так и организацию мероприятий для арабских компаний в России.',
      history: 'Основанная на принципах совершенства и культурной синергии, La Royal Event (ранее La Royal Event) уже более двух десятилетий является мостом между международными стандартами и местного опыта. Мы понимаем тонкости ведения бизнеса в обоих регионах и обеспечиваем безупречную коммуникацию и логистику.',
      mission: {
        title: 'НАША МИССИЯ',
        desc: 'Создавать события, которые становятся легендами. Мы стремимся к тому, чтобы каждое мероприятие не просто соответствовало ожиданиям, а превосходило их, становясь мощным инструментом для развития бизнеса наших клиентов.'
      },
      values: {
        title: 'НАШИ ЦЕННОСТИ',
        items: [
          { title: 'Безупречность', desc: 'Внимание к каждой детали, от первого звонка до финального отчета.' },
          { title: 'Инновации', desc: 'Использование передовых технологий и креативных подходов в организации.' },
          { title: 'Партнерство', desc: 'Мы строим долгосрочные отношения, основанные на доверии и прозрачности.' }
        ]
      },
      seo: {
        title: 'О компании: MICE-агентство и DMC в Египте с 2004 года',
        description: 'История и команда La Royal Event: MICE-агентство и DMC полного цикла в Египте с 2004 года. Своя команда в Каире и Шарм-эль-Шейхе, прямые контракты.'
      }
    },
    servicesPage: {
      title: 'НАША ЭКСПЕРТИЗА',
      process: {
        title: 'КАК МЫ РАБОТАЕМ',
        items: [
          { step: '01', title: 'Брифинг', desc: 'Глубокое погружение в цели и задачи вашего проекта.' },
          { step: '02', title: 'Концепция', desc: 'Разработка уникальной идеи и детального плана реализации.' },
          { step: '03', title: 'Производство', desc: 'Техническое оснащение, застройка и подготовка локации.' },
          { step: '04', title: 'Реализация', desc: 'Безупречное проведение мероприятия под ключ.' }
        ]
      },
      seo: {
        title: 'Услуги: конференции, тимбилдинги, инсентив-туры в Египте',
        description: 'Организация корпоративных событий в Египте: конференции, делегации, тимбилдинги, инсентив-туры, шоу и VIP-ретриты. Технический продакшн и логистика.'
      },
      faq: [
        {
          question: 'В каких странах вы организуете мероприятия?',
          answer: 'La Royal Event работает в Египте и России. Главные офисы — в Шарм-эль-Шейхе и Москве. Также организуем MICE-проекты в других странах Ближнего Востока по запросу клиента.'
        },
        {
          question: 'Какие форматы мероприятий вы организуете?',
          answer: 'Корпоративные конференции, тимбилдинги, инсентив-туры, делегации, гала-ужины, выставки, дилерские конференции, ретриты для VIP-клиентов и закрытые частные мероприятия.'
        },
        {
          question: 'Сколько стоит организация корпоративного мероприятия?',
          answer: 'Бюджет зависит от количества участников, страны, формата и длительности. Минимальный пакет под ключ для группы 20–30 человек на 3 дня стартует от 15 000 USD. Точная стоимость рассчитывается индивидуально под задачу — оставьте заявку.'
        },
        {
          question: 'Сколько времени занимает подготовка мероприятия?',
          answer: 'В среднем 6–8 недель для группы до 100 человек и 3–4 месяца для крупных проектов от 500 участников. Срочные проекты делаем от 2 недель при наличии свободных площадок.'
        },
        {
          question: 'У вас собственное оборудование или арендуете у подрядчиков?',
          answer: 'У нас собственная производственная база в Египте: цеха по производству декораций и мебели, склад светового, звукового и LED-оборудования. Это позволяет не зависеть от подрядчиков и держать высокий стандарт качества.'
        },
        {
          question: 'Работаете ли вы с иностранными артистами и звёздами?',
          answer: 'Да. У нас есть опыт букинга артистов мирового уровня: David Guetta, Son of Son, Tom Enzy, Koroleva и других. Берём на себя переговоры с менеджментом, выполнение технических и бытовых райдеров, логистику и безопасность.'
        },
        {
          question: 'Какие у вас гарантии и условия оплаты?',
          answer: 'Заключаем официальный договор (есть публичная оферта). Финансовые этапы: предоплата + поэтапная оплата по факту выполнения работ. Бюджет фиксируется в смете. 20+ лет опыта без сорванных проектов.'
        }
      ],
      items: [
        { title: 'Корпоративные конференции', desc: 'Полный цикл организации деловых мероприятий, форумов и саммитов.' },
        { title: 'Тимбилдинг', desc: 'Уникальные программы для укрепления корпоративной культуры и командного духа.' },
        { title: 'Международный протокол', desc: 'Проведение дипломатических и государственных мероприятий высокого уровня.' },
        { title: 'Делегации', desc: 'Перевод, протокол, культурные программы. Арабские делегации в России и российские на Ближнем Востоке.' },
        { title: 'Технический продакшн', desc: 'Собственное звуковое, световое и LED оборудование для безупречного исполнения.' },
        { title: 'Безопасность и приватность', desc: 'Обеспечение полной конфиденциальности и высокого уровня безопасности для VIP-гостей.' },
        { title: 'Премиальный Консьерж', desc: 'Премиальный тревел и лайфстайл менеджмент для участников мероприятий.' }
      ]
    },
    portfolioPage: {
      title: 'КРУПНЫЕ ПРОЕКТЫ',
    },
    delegationsPage: {
      title: 'ДЕЛЕГАЦИИ',
      subtitle: 'Безупречный protocol, профессиональный перевод и VIP-сервис мирового уровня. Мы обеспечиваем сопровождение, которое подчеркивает ваш статус.',
      backToHome: 'Назад на главную',
      sections: [
        {
          title: 'Что входит в услугу',
          items: [
            { title: 'Перевод', desc: 'Арабский, английский, русский. Синхронный и последовательный перевод.' },
            { title: 'Протокол', desc: 'Соблюдение дипломатических норм, логистика и безопасность.' },
            { title: 'Логистика', desc: 'Визовое сопровождение, VIP-трансферы и бронирование отелей.' },
            { title: 'VIP Сервис', desc: 'Культурные программы и персональное обслуживание 24/7.' }
          ]
        },
        {
          title: 'Уникальность подхода',
          desc: 'Мы первые выводим услугу делегаций в формате полного сопровождения: от момента приглашения до финального отчета.',
          features: [
            'Глубокое знание этикета',
            'Собственный парк авто',
            'Конфиденциальность 100%',
            'Международная команда'
          ]
        }
      ],
      cta: {
        title: 'ЛУЧШЕЕ ПРЕДЛОЖЕНИЕ',
        desc: 'Свяжитесь с нами для получения индивидуального плана приема вашей делегации.',
        button: 'ОТПРАВИТЬ ЗАПРОС'
      },
      seo: {
        title: 'Сопровождение делегаций: протокол и перевод',
        description: 'Организация приема иностранных делегаций в России и российских за рубежом. Полный спектр услуг: от виз до VIP-сопровождения.'
      },
      faq: [
        {
          question: 'Что входит в услугу сопровождения делегаций?',
          answer: 'Полный цикл: визовая поддержка, бронирование отелей, VIP-трансферы, синхронный и последовательный перевод (арабский, английский, русский), протокольное сопровождение, культурная программа, координация переговоров и финальная отчётность.'
        },
        {
          question: 'На каких языках вы предоставляете перевод?',
          answer: 'Арабский, английский и русский — синхронный и последовательный перевод. Все наши переводчики имеют опыт работы на дипломатических, государственных и крупных корпоративных мероприятиях.'
        },
        {
          question: 'Можете ли вы организовать визовое сопровождение?',
          answer: 'Да. Делаем визовую поддержку для арабских делегаций в Россию и для российских делегаций в Египет и другие страны региона. Помогаем с приглашениями, пакетом документов и подачей.'
        },
        {
          question: 'Какие гарантии конфиденциальности вы предоставляете?',
          answer: 'Подписываем NDA. Опыт работы с государственными и корпоративными делегациями высокого уровня. Сотрудники с допусками к чувствительной информации, полный режим неразглашения до и после мероприятия.'
        },
        {
          question: 'Есть ли у вас опыт работы с государственными делегациями?',
          answer: 'Да, регулярно сопровождаем как государственные, так и корпоративные делегации. Глубокое знание протокола, дипломатического этикета и культурных особенностей арабского региона.'
        },
        {
          question: 'Сколько стоит сопровождение делегации?',
          answer: 'От 200 USD/час за работу переводчика и от 1500 USD/день за полное протокольное сопровождение группы. Точная стоимость рассчитывается под задачу: количество дней, число делегатов и формат программы.'
        }
      ]
    },
    contactPage: {
      title: 'СВЯЖИТЕСЬ С НАМИ',
      formTitle: 'Отправить сообщение',
      labels: {
        email: 'Email',
        phone: 'Телефон',
        location: 'Локация',
        name: 'Полное имя',
        emailAddr: 'Электронная почта',
        phoneNumber: 'Номер телефона',
        messenger: 'Мессенджер для связи',
        message: 'Сообщение',
        submit: 'Отправить запрос'
      },
      locations: '19090 Египет, Шарм-эль-Шейх, Генина Сити молл, офис 3090'
    },
    accessibleSection: {
      header: "ROYAL EVENT",
      title: "Любой масштаб. Любая локация. Любая идея.",
      titleLine1: "Любой масштаб.",
      titleLine2: "Любая локация.",
      titleLine3: "Любая идея.",
      cards: [
        {
          number: "1",
          title: "Полный контроль",
          desc: "Команда живёт в Египте и контролирует каждую деталь лично. На нас можно положиться на 100%."
        },
        {
          number: "2",
          title: "Своё производство",
          desc: "Собственные цеха, своё оборудование, прямые контракты с отелями. Вы работаете напрямую."
        },
        {
          number: "3",
          title: "Без границ",
          desc: "Любые площадки, концепции, бюджеты. От камерного ужина на 20 человек в пустыне до конференции на 1000+ гостей.",
          partners: "Four Seasons, Kempinski, Domina"
        }
      ],
      footer: "Никаких лимитов. Во всём."
    },
    destinations: {
      stats: {
        events: 'Мероприятия',
        guests: 'Гости',
        rating: 'Рейтинг',
        venues: 'Площадки'
      },
      egypt: {
        name: 'ЕГИПЕТ',
        tagline: 'НАШ ПРОИЗВОДСТВЕННЫЙ ХАБ',
        description: 'Египет — идеальное направление для масштабных MICE-мероприятий с круглогодичным солнцем и развитой инфраструктурой. Наш производственный хаб в Шарм-эль-Шейхе и Каире позволяет реализовывать проекты любой сложности: от конференций на 1000+ человек до эксклюзивных тимбилдингов в пустыне и на Красном море. Мы предлагаем лучшие площадки, отели и полную техническую поддержку без посредников.',
        seo: {
          title: 'Корпоративные мероприятия и тимбилдинги в Египте',
          description: 'MICE в Египте: организация конференций, корпоративов и бизнес-ретритов в Шарм-эль-Шейхе и Каире. Собственное производство и 20 лет опыта.'
        }
      },
      russia: {
        name: 'РОССИЯ',
        tagline: 'СТРАТЕГИЧЕСКОЕ ПАРТНЕРСТВО',
        description: 'Мы строим надежный мост для вашего бизнеса между Россией и арабским миром. Наша команда обеспечивает комплексную поддержку российским компаниям, планирующим мероприятия в арабском регионе, а также сопровождает арабские делегации в России. Мы берем на себя все вопросы: от логистики и протокола до культурной программы и технического оснащения, гарантируя безупречный результат на стыке двух культур.',
        seo: {
          title: 'Арабские делегации и мероприятия в Москве',
          description: 'Организация мероприятий в Москве для иностранных компаний и сопровождение арабских делегаций в России. Профессиональный протокол и перевод.'
        }
      }
    },
    footer: {
      rights: '© 2026 LA ROYAL EVENT. ВСЕ ПРАВА ЗАЩИЩЕНЫ.',
      legal: {
        ip: 'ИП УСАЧЕВА КСЕНИЯ ОЛЕГОВНА',
        inn: 'ИНН 772206846997',
        ogrnip: 'ОГРНИП 324774600436282',
        privacy: 'Политика конфиденциальности',
        offer: 'Оферта',
        disclaimer: '* Facebook/Instagram — проекты Meta Platforms Inc. (признана экстремистской организацией на территории РФ)'
      }
    },
    partners: {
      // В сетке и клиенты (Carlsberg, Samsung, Adidas), и площадки-партнёры
      // (Four Seasons, Rixos) — «Нам доверяют» покрывает обоих и работает
      // как соцдоказательство сильнее нейтрального «Партнёры»
      title: 'НАМ ДОВЕРЯЮТ',
      subtitle: 'Клиенты и площадки-партнёры: от мировых брендов до лучших отелей региона',
    },
    ctaSection: {
      title: 'СТАНЬ ЧАСТЬЮ НОВОЙ БОЛЬШОЙ И КРАСИВОЙ ИСТОРИИ',
      subtitle: 'Расскажите о вашем мероприятии — мы подготовим индивидуальное предложение',
      button: 'НАПИСАТЬ НАМ',
    },
    blogPage: {
      title: 'БЛОГ И СТАТЬИ',
      subtitle: 'Инсайты индустрии событий, тренды и наши новости',
      readMore: 'Читать далее',
      backToBlog: 'Назад в блог',
      share: 'Поделиться',
      articles: ruArticles,
    }
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About Us',
      services: 'Services',
      programs: 'Programs',
      cruises: 'Nile Cruises',
      dmc: 'DMC',
      egypt: 'Egypt',
      russia: 'Russia',
      portfolio: 'Portfolio',
      delegations: 'Delegations',
      blog: 'Blog',
      contact: 'Contact',
    },
    hero: {
      tag: 'La Royal Event — MICE & DMC in Egypt',
      title: 'WE CREATE',
      titleAccent: 'HISTORY',
      subtitle: 'Full-cycle corporate events in Egypt. From an intimate dinner for 20 to a conference for 1,000+ guests. In-house production, direct contracts, on-site team. 20+ years in the Middle East.',
      stats: [
        { value: '20+', label: 'YEARS OF EXPERIENCE' },
        { value: '1,000+', label: 'EVENTS DELIVERED' },
        { value: '6', label: 'COUNTRIES' },
        { value: '40+', label: 'TEAM MEMBERS' },
      ],
      cta: 'DISCUSS PROJECT',
    },
    whyUs: {
      title: 'WHY CHOOSE US',
      subtitle: 'Our Advantages',
      items: [
        { title: '20+ Years Experience', desc: 'Deep understanding of the Arab region\'s specifics and culture.' },
        { title: 'In-house Production', desc: 'Our own production facilities for decor and furniture in Egypt.' },
        { title: 'Direct Contracts', desc: 'Exclusive terms at Four Seasons, Kempinski, and other top hotels.' },
        { title: 'Full Cycle', desc: 'From concept and logistics to technical production and celebrity booking.' }
      ]
    },
    production: {
      title: 'OWN PRODUCTION',
      subtitle: 'No Intermediaries',
      desc: 'We have our own production base in Egypt for structures and furniture. We provide a full cycle of technical equipment.',
      items: [
        { title: 'Furniture & Decor', desc: 'In-house workshops for designer furniture production.' },
        { title: 'Light & Sound', desc: 'Professional equipment from world-leading brands.' },
        { title: 'LED Screens', desc: 'Any configurations and high resolution.' },
        { title: 'Structures', desc: 'Construction of stands and stages of any complexity.' }
      ]
    },
    cases: {
      title: 'OUR CASES',
      subtitle: 'Large-scale Projects',
      items: [
        {
          id: 'carlsberg',
          client: 'Carlsberg',
          people: '1000 people',
          desc: 'Grand conference at Domina Coral Bay: 1000 participants and flawless service.',
          fullDesc: 'A large-scale conference for Carlsberg, bringing together 1000 participants at the legendary Domina Coral Bay Hotel. We provided a full cycle of technical production, developed an exclusive entertainment program, and organized high-class catering. Our team also provided professional hostesses and ensured comprehensive coordination of all stages of the event. From complex logistics to the final gala dinner, every element was worked out to the smallest detail to create an atmosphere of true brand triumph.',
          image: '/carlsberg-0.JPG',
          gallery: [
            '/carlsberg-0.JPG', '/carlsberg-1.JPG', '/carlsberg-2.JPG', '/carlsberg-3.JPG', '/carlsberg-4.JPG',
            '/carlsberg-5.JPG', '/carlsberg-6.JPG', '/carlsberg-7.JPG', '/carlsberg-8.JPG', '/carlsberg-9.JPG',
            '/carlsberg-10.JPG', '/carlsberg-11.JPG', '/carlsberg-12.JPG'
          ]
        },
        {
          id: 'nl-international',
          client: 'NL International',
          people: '300 people',
          desc: '7-day corporate event. Full support and logistics.',
          fullDesc: 'This was a challenging but very large-scale project. 300 people attended, and the conference lasted for 7 days. It took place at the Park Regency Hotel, where the guests were accommodated. Our tasks included technical support, product preparation, and a wide variety of workshops—yoga, makeup, dancing, and fine arts. We organized various team-building quests to unite the team. Of course, there were business sessions in the Park Regency conference hall. The event concluded with entertainment activities: a luxury Egyptian-style party and a \'White Party\' at an open-air location on a cliff. We also handled logistics, excursions, and everything else.',
          image: '/nl-7.jpg',
          videos: [
            { url: '/videos/nl-horizontal.mp4', type: 'horizontal' },
            { url: '/videos/nl-vertical1.mp4', type: 'vertical' },
            { url: '/videos/nl-vertical3.mp4', type: 'vertical' },
            { url: '/videos/nl-vertical3-1.mp4', type: 'vertical' }
          ],
          gallery: [
            '/nl-7.jpg',
            '/nl-2.jpg',
            '/nl-3.jpg',
            '/nl-4.jpg',
            '/nl-5.jpg',
            '/nl-6.jpg',
            '/nl-8.jpg',
            '/nl-9.jpg',
            '/nl-10.jpg',
            '/nl-11.jpg',
            '/nl-12.jpg',
            '/nl-13.jpg',
            '/nl-14.jpg',
            '/nl-15.jpg',
            '/nl-16.jpg',
            '/nl-17.jpg',
            '/nl-18.jpg',
            '/nl-19.jpg',
            '/nl-20.jpg',
            '/nl-21.jpg',
            '/nl-22.jpg',
            '/nl-23.jpg',
            '/nl-24.jpg',
            '/nl-25.jpg',
            '/nl-26.jpg',
            '/nl-27.jpg',
            '/nl-28.jpg',
            '/nl-29.jpg',
            '/nl-30.jpg'
          ]
        },
        {
          id: 'ewa-product',
          client: 'Ewa Product',
          people: '200 people',
          desc: '5 days of drive, insights, and flawless organization at Rixos Seagate.',
          fullDesc: 'We transformed the EWA Product corporate retreat into an unforgettable 5-day journey in Sharm El Sheikh. The project covered the best locations: from the high-tech conference halls of the Rixos Seagate hotel to the atmospheric Marlin and Space venues. Our team provided full technical production, creation of exclusive decorations, and development of a creative entertainment concept. The program was filled with deep workshops, inspiring masterclasses, and active team building. We created an environment for growth, where every decor element and every minute of the show worked towards the common goal and team unity.',
          image: '/ewa-14.jpg',
          videos: [
            { url: '/videos/ewa-horizontal.mp4', type: 'horizontal', poster: '/ewa-14.jpg' },
            { url: '/videos/ewa-vertical1.mp4', type: 'vertical', poster: '/ewa-5.jpg' },
            { url: '/videos/ewa-vertical3.MP4', type: 'vertical', poster: '/ewa-6.jpg' },
            { url: '/videos/IMG_7742.MP4', type: 'vertical', poster: '/ewa-7.jpg' }
          ],
          gallery: [
            '/ewa-4.jpg', '/ewa-5.jpg', '/ewa-6.jpg', '/ewa-7.jpg', '/ewa-8.jpg', '/ewa-9.jpg', '/ewa-10.jpg',
            '/ewa-11.jpg', '/ewa-12.jpg', '/ewa-13.jpg', '/ewa-14.jpg', '/ewa-15.jpg',
            '/ewa-16.jpg', '/ewa-17.jpg', '/ewa-18.jpg', '/ewa-19.jpg', '/ewa-20.jpg',
            '/ewa-21.jpg', '/ewa-22.jpg', '/ewa-23.jpg', '/ewa-24.jpg', '/ewa-25.jpg',
            '/ewa-26.jpg', '/ewa-27.jpg', '/ewa-28.jpg'
          ]
        },
        {
          id: 'afa-agricultural',
          client: 'AFA Agricultural',
          people: '250 people',
          desc: 'Agricultural conference at Grand Rotana and Savoy: a bridge between Russian business and Arab partners.',
          fullDesc: 'The AFA conference became an important platform for strengthening business ties in the agricultural sector. We organized an event for 250 participants, utilizing the best venues of the Grand Rotana and Savoy hotels. Our team provided a full technical cycle (sound, light, LED screens, stage), as well as created a refined atmosphere through decor, floristry, and professional catering. Special attention was paid to working with delegations: we coordinated meetings between Russian participants and Arab partners, provided professional translation, and took minutes of the negotiations. We handled all logistics — from transfers and accommodation to detailed planning of the business program and summarizing the results of the meetings.',
          image: '/afa-0.JPG',
          gallery: [
            '/afa-0.JPG', '/afa-1.JPG', '/afa-2.JPG', '/afa-3.JPG', '/afa-4.JPG'
          ]
        },
        {
          id: 'world-stars',
          client: 'World-class Stars',
          people: 'VIP Projects',
          desc: 'Booking and organizing concerts for world-class artists: from negotiations to the show.',
          fullDesc: 'We possess unique experience and resources to organize performances by artists of any scale. Our team handles the entire cycle: from direct negotiations with star management to the flawless execution of the most complex technical and hospitality riders. Our portfolio includes the successful organization of visits to Egypt by names such as David Guetta, Son of Son, Tom Enzy, Koroleva, and many others. We guarantee complete confidentiality, security, and the highest level of technical production, turning every performance into a grand world-class show.',
          image: '/ws-3.jpeg',
          videos: [
            { url: '/videos/IMG_7742.MP4', type: 'vertical' },
            { url: '/videos/ws-1.mp4', type: 'vertical' },
            { url: '/videos/ws-2.mp4', type: 'vertical' }
          ]
        },
        {
          id: 'bedouin-dinner',
          client: 'VIP Bedouin Dinner',
          people: 'VIP',
          desc: 'VIP Bedouin Dinner at Four Seasons Hotel: design concept, entertainment program, technical support, and gift products.',
          fullDesc: 'An exclusive project for VIP guests at the luxurious Four Seasons Hotel. We developed a unique design concept blending authentic Bedouin traditions with modern luxury. Our team provided full technical support for the event, created a captivating entertainment program, and prepared high-quality branded gift products. Every element of the dinner was meticulously planned to create an atmosphere of true oriental hospitality and status.',
          image: '/bd-1.jpg',
          gallery: [
            '/bd-1.jpg', '/bd-2.jpg', '/bd-3.jpg', '/bd-4.jpg', '/bd-5.jpg', '/bd-6.jpg'
          ],
          videos: [
            { url: '/videos/bd-v1.mp4', type: 'vertical' },
            { url: '/videos/bd-v2.mp4', type: 'vertical' },
            { url: '/videos/bd-v3.MOV', type: 'vertical' }
          ]
        }
      ]
    },
    team: {
      title: 'OUR TEAM',
      subtitle: 'Industry Leaders',
      ceos: [
        { name: 'Ksenia Usacheva', role: 'CEO / Founder', image: '/ksenia-usacheva.jpg' },
        { name: 'Ekaterina Gaiduk', role: 'CEO / Partner', image: '/ekaterina-gaiduk.jpg' }
      ],
      desc: 'Our team consists of 40+ professional employees. Many of us are fluent in English and Arabic, ensuring flawless communication at an international level.',
      fullTeam: 'Our Team Together'
    },
    videos: {
      title: 'FEEL THE SCALE',
      subtitle: 'Royal Event Life',
      instruction: 'Drag or click to explore our moments',
      videoLabel: 'Video',
      featuredLabel: 'FEATURED',
      items: [
        { id: 1, url: '/videos/nl-vertical4.MP4', poster: '/ewa-14.jpg', label: 'Main Event of the Year' },
        { id: 2, url: '/videos/ewa-vertical1.mp4', poster: '/ewa-5.jpg', label: 'Event Highlights' },
        { id: 3, url: '/videos/IMG_7742.MP4', poster: '/ewa-6.jpg', label: 'Our Projects' },
        { id: 4, url: '/videos/nl-vertical1.mp4', poster: '/ewa-7.jpg', label: 'Emotions' },
        { id: 5, url: '/videos/ws-1.mp4', poster: '/ewa-8.jpg', label: 'Team' },
        { id: 6, url: '/videos/bd-v1.mp4', poster: '/ewa-9.jpg', label: 'Locations' },
        { id: 7, url: '/videos/nl-vertical3.mp4', poster: '/ewa-10.jpg', label: 'Partners' },
      ]
    },
    servicesOverview: {
      title: 'WHAT WE DO',
      titleAccent: 'BEST',
      cta: 'VIEW ALL SERVICES',
      items: [
        { title: 'Conferences', desc: 'Full-cycle organization of business events, forums, and summits.' },
        { title: 'Team Building', desc: 'Unique programs designed to strengthen corporate culture and team spirit.' },
        { title: 'International Protocol', desc: 'Handling high-level diplomatic and government events with precision.' },
        { title: 'Delegations', desc: 'Translation, protocol, cultural programs. Arab delegations in Russia and Russian ones in the Middle East.' }
      ]
    },
    locations: {
      title: 'GLOBAL PRESENCE',
      subtitle: 'Our Locations',
      items: [
        { name: 'Cairo', country: 'Egypt' },
        { name: 'Sharm El Sheikh', country: 'Egypt' },
        { name: 'Moscow', country: 'Russia' },
        { name: 'All of Russia', country: 'RF' }
      ]
    },
    philosophy: {
      title: 'ART OF DETAILS',
      subtitle: 'Our Philosophy',
      items: [
        { title: 'Confidentiality', desc: 'Full information protection and privacy.' },
        { title: 'Status', desc: 'Events that emphasize your level.' },
        { title: 'Multiculturalism', desc: 'Deep understanding of traditions and etiquette.' }
      ]
    },
    aboutPage: {
      title: 'LA ROYAL EVENT',
      subtitle: 'Your Strategic DMC Partner in the Arab World and Russia',
      description: 'We specialize in organizing events in Arab countries, serving as a reliable DMC (Destination Management Company) partner. Our expertise covers both hosting events for foreign companies in Egypt, and organizing events for Arab companies in Russia.',
      history: 'Founded on the principles of excellence and cultural synergy, La Royal Event (formerly La Royal Event) has been the bridge between international standards and local expertise for over two decades. We understand the nuances of doing business in both regions and ensure flawless communication and logistics.',
      mission: {
        title: 'OUR MISSION',
        desc: 'To create events that become legends. We strive to ensure that every event not only meets expectations but exceeds them, becoming a powerful tool for our clients\' business development.'
      },
      values: {
        title: 'OUR VALUES',
        items: [
          { title: 'Perfection', desc: 'Attention to every detail, from the first call to the final report.' },
          { title: 'Innovation', desc: 'Using cutting-edge technology and creative approaches in organization.' },
          { title: 'Partnership', desc: 'We build long-term relationships based on trust and transparency.' }
        ]
      },
      seo: {
        title: 'About Us: MICE Agency and DMC in Egypt Since 2004',
        description: 'The story and team behind La Royal Event: a full-service MICE agency and DMC in Egypt since 2004, with its own team in Cairo and Sharm El Sheikh.'
      }
    },
    servicesPage: {
      title: 'OUR EXPERTISE',
      process: {
        title: 'HOW WE WORK',
        items: [
          { step: '01', title: 'Briefing', desc: 'Deep dive into the goals and objectives of your project.' },
          { step: '02', title: 'Concept', desc: 'Development of a unique idea and a detailed implementation plan.' },
          { step: '03', title: 'Production', desc: 'Technical equipment, construction, and location preparation.' },
          { step: '04', title: 'Execution', desc: 'Flawless turnkey event management.' }
        ]
      },
      seo: {
        title: 'Services: Conferences, Team Building, Incentives in Egypt',
        description: 'Corporate event services in Egypt: conferences, delegations, team building, incentive trips, shows and VIP retreats. Technical production and logistics.'
      },
      faq: [
        {
          question: 'Which countries do you organize events in?',
          answer: 'La Royal Event operates in Egypt and Russia. Our main offices are in Sharm El Sheikh and Moscow. We also handle MICE projects in other Middle Eastern countries on request.'
        },
        {
          question: 'What types of events do you organize?',
          answer: 'Corporate conferences, team-building programs, incentive tours, delegation support, gala dinners, exhibitions, dealer conferences, VIP retreats, and private events.'
        },
        {
          question: 'How much does it cost to organize a corporate event?',
          answer: 'The budget depends on the number of participants, country, format, and duration. Turnkey packages for a group of 20–30 people for 3 days start at USD 15,000. Exact pricing is calculated individually — please send a request.'
        },
        {
          question: 'How long does event preparation take?',
          answer: 'On average, 6–8 weeks for groups up to 100 people and 3–4 months for major 500+ participant projects. Rush projects can be delivered in as little as 2 weeks, subject to venue availability.'
        },
        {
          question: 'Do you own equipment or rent from contractors?',
          answer: 'We operate our own production base in Egypt: workshops for decor and furniture, warehouses of lighting, sound, and LED equipment. This lets us avoid third-party dependencies and maintain quality standards.'
        },
        {
          question: 'Do you work with international artists?',
          answer: 'Yes. We have experience booking world-class artists such as David Guetta, Son of Son, Tom Enzy, Koroleva, and others. We handle negotiations with management, technical and hospitality riders, logistics, and security.'
        },
        {
          question: 'What guarantees and payment terms do you offer?',
          answer: 'We sign an official contract (public offer available). Payment is structured in stages: prepayment plus milestone-based payments. Budget is fixed in the estimate. 20+ years of experience without a single failed project.'
        }
      ],
      items: [
        { title: 'Corporate Conferences', desc: 'Full-cycle organization of business events, forums, and summits.' },
        { title: 'Team Building', desc: 'Unique programs designed to strengthen corporate culture and team spirit.' },
        { title: 'International Protocol', desc: 'Handling high-level diplomatic and government events with precision.' },
        { title: 'Delegations', desc: 'Translation, protocol, cultural programs. Arab delegations in Russia and Russian ones in the Middle East.' },
        { title: 'Technical Production', desc: 'Own sound, light, and LED equipment for flawless execution.' },
        { title: 'Security & Privacy', desc: 'Ensuring complete confidentiality and high-level security for VIP guests.' },
        { title: 'Luxury Concierge', desc: 'Premium travel and lifestyle management for event participants.' }
      ]
    },
    portfolioPage: {
      title: 'LARGE-SCALE PROJECTS',
    },
    delegationsPage: {
      title: 'DELEGATIONS',
      subtitle: 'Flawless protocol, professional translation, and world-class VIP service. We provide support that highlights your status.',
      backToHome: 'Back to home',
      sections: [
        {
          title: 'What\'s included',
          items: [
            { title: 'Translation', desc: 'Arabic, English, Russian. Simultaneous and consecutive translation.' },
            { title: 'Protocol', desc: 'Compliance with diplomatic norms, logistics, and security.' },
            { title: 'Logistics', desc: 'Visa support, VIP transfers, and hotel bookings.' },
            { title: 'VIP Service', desc: 'Cultural programs and personal service 24/7.' }
          ]
        },
        {
          title: 'Unique Approach',
          desc: 'We are the first to launch a delegation service in a full-support format: from the moment of invitation to the final report.',
          features: [
            'Deep knowledge of etiquette',
            'Own car fleet',
            '100% Confidentiality',
            'International team'
          ]
        }
      ],
      cta: {
        title: 'BEST OFFER',
        desc: 'Contact us for a personalized reception plan for your delegation.',
        button: 'SEND REQUEST'
      },
      seo: {
        title: 'Delegation Support: Protocol and Translation',
        description: 'Organization of foreign delegations in Russia and Russian delegations abroad. A full range of services: from visas to VIP support.'
      },
      faq: [
        {
          question: 'What\'s included in the delegation support service?',
          answer: 'A full cycle: visa support, hotel bookings, VIP transfers, simultaneous and consecutive translation (Arabic, English, Russian), protocol escort, cultural program, negotiation coordination, and final reporting.'
        },
        {
          question: 'Which languages do you provide translation in?',
          answer: 'Arabic, English, and Russian — both simultaneous and consecutive translation. All our translators have experience working at diplomatic, government, and major corporate events.'
        },
        {
          question: 'Can you arrange visa support?',
          answer: 'Yes. We provide visa support for Arab delegations visiting Russia and for Russian delegations traveling to Egypt and other countries in the region. We help with invitation letters, document packages, and submissions.'
        },
        {
          question: 'What confidentiality guarantees do you offer?',
          answer: 'We sign NDAs. Experience working with high-level government and corporate delegations. Staff with clearances for sensitive information and full non-disclosure regime before and after the event.'
        },
        {
          question: 'Do you have experience with government delegations?',
          answer: 'Yes, we regularly support both government and corporate delegations. Deep knowledge of protocol, diplomatic etiquette, and the cultural specifics of the Arab region.'
        },
        {
          question: 'How much does delegation support cost?',
          answer: 'Starting at USD 200/hour for translator services and USD 1,500/day for full protocol support of a group. Exact pricing depends on the task: number of days, delegation size, and program format.'
        }
      ]
    },
    contactPage: {
      title: 'GET IN TOUCH',
      formTitle: 'Send a Message',
      labels: {
        email: 'Email',
        phone: 'Phone',
        location: 'Location',
        name: 'Full Name',
        emailAddr: 'Email Address',
        phoneNumber: 'Phone Number',
        messenger: 'Preferred Messenger',
        message: 'Message',
        submit: 'Submit Request'
      },
      locations: '19090 Egypt, Sharm El Sheikh, Genena City Mall, office 3090'
    },
    accessibleSection: {
      header: "ROYAL EVENT",
      title: "Any scale. Any location. Any idea.",
      titleLine1: "Any scale.",
      titleLine2: "Any location.",
      titleLine3: "Any idea.",
      cards: [
        {
          number: "1",
          title: "no risks",
          desc: "We are your eyes and ears on location. You can rely on us 100%. The team lives in Egypt and controls every detail personally"
        },
        {
          number: "2",
          title: "no intermediaries",
          desc: "Own production, own equipment, direct contracts with hotels. You work directly"
        },
        {
          number: "3",
          title: "no limits",
          desc: "Any venues, concepts, budgets. From an intimate dinner for 20 people in the desert to a conference for 1000+ guests",
          partners: "Direct partners of Four Seasons, Kempinski, Domina"
        }
      ],
      footer: "No limits. In everything."
    },
    destinations: {
      stats: {
        events: 'Events',
        guests: 'Guests',
        rating: 'Rating',
        venues: 'Venues'
      },
      egypt: {
        name: 'EGYPT',
        tagline: 'OUR PRODUCTION HUB',
        description: 'Egypt is the perfect destination for large-scale MICE events with year-round sun and developed infrastructure. Our production hub in Sharm El Sheikh and Cairo allows us to implement projects of any complexity: from conferences for 1000+ people to exclusive team buildings in the desert and on the Red Sea. We offer the best venues, hotels, and full technical support without intermediaries.',
        seo: {
          title: 'Corporate Events and Team Building in Egypt',
          description: 'MICE in Egypt: organizing conferences, corporate retreats, and business events in Sharm El Sheikh and Cairo. 20 years of experience and in-house production.'
        }
      },
      russia: {
        name: 'RUSSIA',
        tagline: 'STRATEGIC PARTNERSHIPS',
        description: 'We build a reliable bridge for your business between Russia and the Arab world. Our team provides comprehensive support for Russian companies planning events in the Arab region, and also accompanies Arab delegations in Russia. We handle everything from logistics and protocol to cultural programs and technical equipment, ensuring flawless results at the intersection of two cultures.',
        seo: {
          title: 'Arabic Delegations and Events in Moscow',
          description: 'Organizing events in Moscow for international companies and supporting Arabic delegations in Russia. Professional protocol and translation services.'
        }
      }
    },
    footer: {
      rights: '© 2026 LA ROYAL EVENT. ALL RIGHTS RESERVED.',
      legal: {
        ip: 'IE USACHEVA KSENIA OLEGOVNA',
        inn: 'INN 772206846997',
        ogrnip: 'OGRNIP 324774600436282',
        privacy: 'Privacy Policy',
        offer: 'Public Offer',
        disclaimer: '* Facebook/Instagram are projects of Meta Platforms Inc. (recognized as an extremist organization in the Russian Federation)'
      }
    },
    partners: {
      title: 'TRUSTED BY',
      subtitle: 'Clients and venue partners — from global brands to the region\'s top hotels',
    },
    ctaSection: {
      title: 'BECOME PART OF A NEW BIG AND BEAUTIFUL STORY',
      subtitle: 'Tell us about your event — we will prepare an individual proposal',
      button: 'WRITE TO US',
    },
    blogPage: {
      title: 'BLOG & ARTICLES',
      subtitle: 'Event industry insights, trends, and our news',
      readMore: 'Read More',
      backToBlog: 'Back to Blog',
      share: 'Share',
      articles: enArticles,
    }
  }
};
