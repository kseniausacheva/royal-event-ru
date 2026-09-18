/**
 * SINGLE SOURCE OF TRUTH для блога Royal Event Group.
 *
 * Добавление новой статьи:
 * 1. Скопируй блок последней статьи ниже (от { до }), вставь после неё
 * 2. Поменяй: id, datePublished, image, ru.title/excerpt/content/category/date
 * 3. (Опционально) сделай en.* — если статья только на русском, можно скопировать ru
 * 4. Запусти `npm run build` — sitemap и prerender обновятся автоматически
 *
 * Правила выбора картинок:
 * - Используем ТОЛЬКО Unsplash (https://images.unsplash.com/photo-XXXXX...)
 * - Каждая картинка должна точно соответствовать теме раздела
 * - Каждый URL уникален в рамках всего блога (не повторяется в разных статьях)
 * - Перед публикацией проверять curl -I что URL отдаёт 200 OK
 *   (Unsplash иногда удаляет фото — тогда придёт 404 и картинка не отобразится)
 *
 * Два формата для поля content:
 *
 * 1) ПРОСТОЙ (строка) — параграфы разделяются \n\n, строки "N. Заголовок" → h3
 *    content: `Параграф 1.\n\nПараграф 2.\n\n1. Подзаголовок\n\nПараграф 3.`
 *
 * 2) БОГАТЫЙ (массив блоков) — magazine-style с картинками, цитатами, статистикой:
 *    content: [
 *      { type: 'paragraph', text: '...' },
 *      { type: 'heading', text: '1. Заголовок', level: 3 },
 *      { type: 'quote', text: 'Цитата', author: 'Имя источника' },
 *      { type: 'stat', number: '75%', label: 'описание', source: 'опционально' },
 *      { type: 'image', url: 'https://...', alt: '...', caption: 'опциональная подпись' },
 *      { type: 'list', items: ['пункт 1', 'пункт 2'], ordered: false },
 *      { type: 'divider' },
 *      { type: 'callout', title: 'Что делать:', text: '...', variant: 'info'|'warning'|'success' },
 *      { type: 'video', url: 'https://youtu.be/XXX | /videos/foo.mp4', title: 'alt', caption: 'опц.' },
 *      { type: 'table', headers: ['Кол.1', 'Кол.2'], rows: [['а','б'],['в','г']], caption: 'опц.' },
 *      { type: 'diagram', svg: '<svg>...</svg>', title: 'alt', caption: 'опц.' },
 *      { type: 'comparison',
 *        title: 'Что in / что out',
 *        left:  { title: 'OUT', items: ['пункт', 'пункт'] },
 *        right: { title: 'IN',  items: ['пункт', 'пункт'] },
 *      },
 *    ]
 *
 * Описание полей:
 *   id              — URL-slug латиницей через дефис (попадёт в /ru/blog/{id})
 *   datePublished   — ISO-дата (YYYY-MM-DD) — для Schema.org BlogPosting + sitemap lastmod
 *   image           — URL hero-картинки (Unsplash или /название-файла из public/)
 *   ru.title        — заголовок (1 строка, не дублируй "Royal Event Group" — SEO добавит)
 *   ru.excerpt      — короткое описание для превью + meta description (1-2 предложения)
 *   ru.content      — либо строка (простой формат), либо массив блоков (богатый)
 *   ru.category     — категория (отображается на странице)
 *   ru.date         — человекочитаемая дата для отображения (например "15 Июня, 2026")
 */

/** @type {BlogArticle[]} */
export const blogArticles = [
  // ───────────────────────────────────────────────────────────────────────
  {
    "id": "mice4u-2026-egipet-mice-dmc",
    "datePublished": "2026-09-18",
    "image": "/carlsberg-3.JPG",
    "ru": {
      "title": "MICE4U 2026: представили Египет как MICE-направление",
      "category": "Индустрия",
      "date": "18 сентября 2026",
      "excerpt": "9 сентября в московском The Carlton прошёл воркшоп MICE4U: более 250 MICE-агентств, корпоративных заказчиков, отелей и принимающих компаний. Мы приехали с Египтом — рассказываем, о чём спрашивали заказчики и что мы отвечали.",
      "links": [
        {
          "path": "/dmc",
          "label": "Что мы делаем в Египте как DMC"
        },
        {
          "path": "/programmy",
          "label": "Авторские программы для групп"
        },
        {
          "path": "/cruises",
          "label": "Круизы по Нилу и дахабии"
        },
        {
          "path": "/contact",
          "label": "Обсудить проект в Египте"
        }
      ],
      "content": [
        {
          "type": "paragraph",
          "text": "MICE в Египте перестал быть экзотикой из презентаций и вернулся в рабочие короткие списки. 9 сентября 2026 года мы приехали на воркшоп MICE4U в Москве и весь день говорили об этом с корпоративными заказчиками и агентствами: что сегодня реально собрать в Каире и Шарм-эль-Шейхе, за какие сроки и с кем на месте. Ниже — как прошёл день, какие вопросы звучали чаще всего и что мы на них отвечали."
        },
        {
          "type": "stat",
          "number": "250+",
          "label": "представителей MICE-агентств, корпоративных заказчиков, турорганизаций, отелей, авиакомпаний и принимающих компаний собирает MICE4U. Воркшоп проходит в отеле The Carlton на Тверской третий год подряд"
        },
        {
          "type": "heading",
          "text": "Что такое MICE4U",
          "level": 2
        },
        {
          "type": "paragraph",
          "text": "MICE4U — воркшоп в формате быстрых встреч: каждые десять минут за столом новый собеседник, без выставочной толкотни и без очереди к стенду. Организатор — агентство IM Marketing, площадка — The Carlton на Тверской, 3. В 2026 году воркшоп прошёл 9 сентября, с десяти утра до девяти вечера, и завершился вечерней интерактивной программой в двух потоках."
        },
        {
          "type": "paragraph",
          "text": "Формат жёсткий, и этим он хорош. Десять минут не оставляют места общим словам про «индивидуальный подход»: за это время нужно назвать направление, показать, что конкретно вы делаете руками, и услышать, какая задача у человека напротив. К концу дня становится видно не то, кто красивее презентует, а кто действительно работает на месте."
        },
        {
          "type": "heading",
          "text": "Мы представляли Египет — и как направление, и как принимающую сторону",
          "level": 2
        },
        {
          "type": "paragraph",
          "text": "Мы приехали на MICE4U с Египтом: как с MICE-направлением для корпоративных групп и как с собственной принимающей компанией — DMC, которая ведёт проект на земле. Это принципиальная разница. Одно дело продать направление и передать группу подрядчику, другое — самим встретить её в аэропорту, договориться о пермитах, поставить свет и звук в зале и отвечать за каждый трансфер. Мы работаем по прямым контрактам с судовладельцами и отелями, а команда сидит в Каире и Шарм-эль-Шейхе, а не в переписке через посредника."
        },
        {
          "type": "paragraph",
          "text": "Что показывали за столом:"
        },
        {
          "type": "list",
          "items": [
            "Авторские программы для групп от 20 до 100 гостей: квесты на плато Гизы, в Большом Египетском музее, в историческом Каире и на Синае",
            "Круизы по Нилу: 5★ суда на 37 и 53 каюты, приватный чартер на 20 гостей и парусные дахабии Nour El Nil по маршруту Эсна — Асуан",
            "Площадки, которых нет в открытых каталогах: приватные вечера в храмах, ужины с видом на пирамиды, стоянки там, куда большие суда не заходят",
            "Полный DMC-цикл: пермиты и согласования, транспорт, гиды-египтологи, технический продакшн, сопровождение делегаций и протокол",
            "Поездки вокруг больших событий — включая концерты на плато Гизы"
          ]
        },
        {
          "type": "heading",
          "text": "О чём спрашивали корпоративные заказчики",
          "level": 2
        },
        {
          "type": "heading",
          "text": "Насколько это сложно логистически",
          "level": 3
        },
        {
          "type": "paragraph",
          "text": "Это первый вопрос почти на каждой встрече — и он справедливый. Ответ короткий: перелёт из Москвы короче, чем кажется, а дальше начинается зона ответственности принимающей компании. Группа не пересаживается сама, не ищет автобусы и не выясняет, кто встречает у трапа. Для организатора Египет устроен проще многих европейских направлений именно потому, что вся наземная часть собирается у одного подрядчика."
        },
        {
          "type": "heading",
          "text": "Что с площадками для деловой части",
          "level": 3
        },
        {
          "type": "paragraph",
          "text": "Спрашивали о конференц-залах на 300–1000 человек, о синхронном переводе и о технике. Отвечали честно: залы в Египте есть, а вот технический продакшн нельзя отдавать «отельному подрядчику по умолчанию» — это самый частый источник провалов на зарубежных конференциях. Мы возим своё оборудование и свою команду, а зал принимаем инспекционным визитом заранее, а не по фотографиям с сайта отеля."
        },
        {
          "type": "heading",
          "text": "Можно ли получить закрытый доступ к памятникам",
          "level": 3
        },
        {
          "type": "paragraph",
          "text": "Можно, и это одна из причин, по которым Египет вообще попадает в короткий список. Приватный доступ, вечерние программы на археологических площадках и стоянки в местах, закрытых для больших судов, — вопрос не денег, а сроков и согласований. Поэтому такие блоки закладываются в проект первыми, а не «если успеем»."
        },
        {
          "type": "heading",
          "text": "Сколько времени нужно на подготовку",
          "level": 3
        },
        {
          "type": "paragraph",
          "text": "На авторскую программу — от четырёх до шести недель: разведка площадки, изготовление реквизита, персональные детали под компанию. Программы с декорациями, которые мы привозим в зал, требуют восьми–десяти недель на первый показ. Круиз и приватные доступы бронируются под конкретные даты, поэтому чем раньше известен месяц, тем шире выбор."
        },
        {
          "type": "heading",
          "text": "Кто отвечает на месте",
          "level": 3
        },
        {
          "type": "paragraph",
          "text": "Вопрос, который задают те, у кого уже был неудачный выезд. На проекте есть конкретный человек с телефоном, который находится в той же стране, в том же часовом поясе и на той же площадке, что и группа. Не колл-центр и не «наш партнёр в Каире»."
        },
        {
          "type": "callout",
          "title": "Короткий ответ, который мы повторяли весь день",
          "text": "Египет сегодня — это не «пирамиды и всё». Это готовая отельная база с полным пансионом, короткий перелёт, площадки, которых нет больше нигде, и принимающая компания, которая отвечает за всю наземную часть одним контрактом.",
          "variant": "info"
        },
        {
          "type": "heading",
          "text": "Почему Египет снова в коротких списках",
          "level": 2
        },
        {
          "type": "list",
          "items": [
            "Короткий перелёт из России — сезон длится с сентября по май, то есть охватывает и осенние конференции, и весенние инсентивы",
            "Отели работают по системе полного пансиона: питание группы уже внутри, а не отдельной строкой сметы",
            "Площадки с собственной историей: плато Гизы, Большой Египетский музей, Нил, Синай — фон, который не купишь декорациями",
            "Один подрядчик на наземную часть: пермиты, транспорт, гиды, техника и программа не разваливаются между пятью компаниями",
            "Формат масштабируется: от правления на восемь человек до дилерской конференции на тысячу участников"
          ]
        },
        {
          "type": "heading",
          "text": "Что дальше",
          "level": 2
        },
        {
          "type": "paragraph",
          "text": "После воркшопа остаётся самое полезное — конкретные задачи конкретных компаний: осенние конференции, весенние инсентивы, юбилеи и выездные стратегические сессии. Если ваша задача из этого списка, напишите: мы посчитаем и покажем, как это выглядит на площадке, а не на слайде."
        }
      ]
    },
    "en": {
      "title": "MICE4U 2026: presenting Egypt as a MICE destination",
      "category": "Industry",
      "date": "18 September 2026",
      "excerpt": "On 9 September the MICE4U workshop took place at The Carlton in Moscow: more than 250 MICE agencies, corporate buyers, hotels and destination management companies. We came with Egypt — here is what buyers asked and how we answered.",
      "links": [
        {
          "path": "/dmc",
          "label": "What we do in Egypt as a DMC"
        },
        {
          "path": "/programmy",
          "label": "Signature programmes for groups"
        },
        {
          "path": "/cruises",
          "label": "Nile cruises and dahabiyas"
        },
        {
          "path": "/contact",
          "label": "Discuss a project in Egypt"
        }
      ],
      "content": [
        {
          "type": "paragraph",
          "text": "Egypt has stopped being the exotic slide in a deck and is back on real shortlists. On 9 September 2026 we joined the MICE4U workshop in Moscow and spent the day talking to corporate buyers and agencies about exactly that: what can realistically be built in Cairo and Sharm El Sheikh today, on what lead time, and with whom on the ground. Here is how the day went, which questions came up most often and what we answered."
        },
        {
          "type": "stat",
          "number": "250+",
          "label": "representatives of MICE agencies, corporate buyers, tour operators, hotels, airlines and destination management companies attend MICE4U. The workshop has run at The Carlton on Tverskaya for three years running"
        },
        {
          "type": "heading",
          "text": "What MICE4U is",
          "level": 2
        },
        {
          "type": "paragraph",
          "text": "MICE4U is a workshop built on speed meetings: a new person across the table every ten minutes, with none of the trade-show scrum and no queue at a booth. It is run by the IM Marketing agency at The Carlton, 3 Tverskaya Street. In 2026 it took place on 9 September, from ten in the morning until nine in the evening, and closed with an interactive evening programme in two streams."
        },
        {
          "type": "paragraph",
          "text": "The format is unforgiving, and that is its virtue. Ten minutes leave no room for talk of a bespoke approach: you have to name the destination, show what you actually do with your own hands, and hear what the person opposite is trying to solve. By the end of the day what shows is not who presents best, but who genuinely works on the ground."
        },
        {
          "type": "heading",
          "text": "We presented Egypt — as a destination and as the receiving side",
          "level": 2
        },
        {
          "type": "paragraph",
          "text": "We came to MICE4U with Egypt: as a MICE destination for corporate groups, and with our own receiving company — a DMC that runs the project on the ground. That distinction matters. Selling a destination and handing the group to a contractor is one thing; meeting them at the airport yourself, securing the permits, rigging light and sound in the room and answering for every transfer is another. We work on direct contracts with ship owners and hotels, and our team sits in Cairo and Sharm El Sheikh rather than in an email thread through an intermediary."
        },
        {
          "type": "paragraph",
          "text": "What we put on the table:"
        },
        {
          "type": "list",
          "items": [
            "Signature programmes for groups of 20 to 100 guests: quests on the Giza plateau, in the Grand Egyptian Museum, in historic Cairo and in Sinai",
            "Nile cruises: five-star ships with 37 and 53 cabins, a private charter for 20 guests, and the sailing dahabiyas of Nour El Nil on the Esna–Aswan route",
            "Venues that are not in any open catalogue: private evenings inside temples, dinners with the pyramids in view, moorings where large ships cannot go",
            "The full DMC cycle: permits and approvals, transport, Egyptologist guides, technical production, delegation handling and protocol",
            "Travel built around major events, including concerts on the Giza plateau"
          ]
        },
        {
          "type": "heading",
          "text": "What corporate buyers asked",
          "level": 2
        },
        {
          "type": "heading",
          "text": "How hard is the logistics",
          "level": 3
        },
        {
          "type": "paragraph",
          "text": "This came up at almost every meeting, and it is a fair question. The short answer: the flight is shorter than people assume, and everything after it is the receiving company's responsibility. The group does not arrange its own connections, hunt for coaches or work out who is meeting them at the aircraft door. For an organiser Egypt is in fact simpler than many European destinations, precisely because the whole ground operation sits with one contractor."
        },
        {
          "type": "heading",
          "text": "What about venues for the business programme",
          "level": 3
        },
        {
          "type": "paragraph",
          "text": "People asked about halls for 300 to 1,000 delegates, simultaneous interpretation and technical kit. We answered honestly: the halls exist, but technical production must not be left to the hotel's default contractor — that is the single most common source of failure at conferences abroad. We bring our own equipment and our own crew, and we inspect the room in person beforehand rather than trusting photographs on a hotel website."
        },
        {
          "type": "heading",
          "text": "Can you get private access to the monuments",
          "level": 3
        },
        {
          "type": "paragraph",
          "text": "You can, and it is one of the reasons Egypt makes a shortlist at all. Private access, evening programmes on archaeological sites and moorings closed to large vessels are a question of lead time and approvals rather than budget. That is why those elements go into the plan first, not as an afterthought."
        },
        {
          "type": "heading",
          "text": "How long does preparation take",
          "level": 3
        },
        {
          "type": "paragraph",
          "text": "A signature programme needs four to six weeks: site reconnaissance, prop making, the personal details tied to the company. Programmes that travel with their own set design need eight to ten weeks for a first staging. Cruises and private access are booked against specific dates, so the earlier the month is known, the wider the choice."
        },
        {
          "type": "heading",
          "text": "Who is accountable on site",
          "level": 3
        },
        {
          "type": "paragraph",
          "text": "The question asked by anyone who has already had a trip go wrong. Every project has a named person with a phone, in the same country, the same time zone and the same venue as the group. Not a call centre, and not \"our partner in Cairo\"."
        },
        {
          "type": "callout",
          "title": "The short answer we repeated all day",
          "text": "Egypt today is not \"the pyramids and nothing else\". It is a ready hotel base on full board, a short flight, venues that exist nowhere else, and a receiving company that answers for the entire ground operation under one contract.",
          "variant": "info"
        },
        {
          "type": "heading",
          "text": "Why Egypt is back on shortlists",
          "level": 2
        },
        {
          "type": "list",
          "items": [
            "A short flight, and a season running from September to May — covering autumn conferences and spring incentives alike",
            "Hotels run on full board: feeding the group is already inside the package rather than a separate budget line",
            "Venues with a history of their own: the Giza plateau, the Grand Egyptian Museum, the Nile, Sinai — a backdrop no set build can buy",
            "One contractor for the ground operation, so permits, transport, guides, technical production and programme do not fall apart between five companies",
            "The format scales: from a board of eight to a dealer conference of a thousand delegates"
          ]
        },
        {
          "type": "heading",
          "text": "What happens next",
          "level": 2
        },
        {
          "type": "paragraph",
          "text": "What remains after a workshop is the useful part: specific briefs from specific companies — autumn conferences, spring incentives, anniversaries and offsite strategy sessions. If your brief is on that list, write to us: we will cost it and show you how it looks on site rather than on a slide."
        }
      ]
    }
  },
  {
    "id": "shakira-piramidy-gizy-bilety",
    "datePublished": "2026-09-17",
    "image": "/carlsberg-12.JPG",
    "ru": {
      "title": "Шакира у пирамид Гизы: билеты на концерт 28 ноября 2027",
      "category": "Локации",
      "date": "17 сентября 2026",
      "excerpt": "Концерт Шакиры у пирамид Гизы 28 ноября 2027: что известно о площадке, когда старт продаж и как забронировать VIP-места в лаунжах категорий А и Б.",
      "links": [
        {
          "path": "/tickets",
          "label": "Билеты и VIP-лаунжи: условия брони"
        },
        {
          "path": "/dmc",
          "label": "Что мы делаем в Египте как DMC"
        },
        {
          "path": "/cruises",
          "label": "Круизы по Нилу после концерта"
        },
        {
          "path": "/contact",
          "label": "Запросить бронь"
        }
      ],
      "content": [
        {
          "type": "paragraph",
          "text": "Билеты на Шакиру в Египте — запрос, который появится у тысяч людей в один день: 28 ноября 2027 года певица выступит у пирамид Гизы. Площадка такого масштаба сама по себе становится новостью, а мест в закрытых зонах всегда меньше, чем желающих. Ниже — что известно о концерте, чем отличаются категории билетов и как спланировать поездку, чтобы вечер у пирамид не превратился в перелёт ради трёх часов музыки."
        },
        {
          "type": "stat",
          "number": "28 ноября 2027",
          "label": "день концерта у пирамид Гизы. Старт открытых продаж — 1 октября 2026 года"
        },
        {
          "type": "heading",
          "text": "Что известно о концерте",
          "level": 2
        },
        {
          "type": "paragraph",
          "text": "Выступление проходит в рамках мирового тура Las Mujeres Ya No Lloran. Сцену ставят на плато Гизы — там же, где стоят пирамида Хеопса, Хефрена и Микерина и Большой Сфинкс. Для Египта формат не новый: плато принимало крупные концерты и раньше, но каждый такой вечер остаётся событием отдельного порядка, потому что площадку нельзя расширить, перенести или повторить."
        },
        {
          "type": "list",
          "items": [
            "Артист: Шакира, мировой тур Las Mujeres Ya No Lloran",
            "Дата: 28 ноября 2027 года",
            "Площадка: пирамиды Гизы, Каир, Египет",
            "Старт открытых продаж: 1 октября 2026 года",
            "Через нас: VIP-билеты в лаунжи категорий А и Б плюс поездка вокруг концерта"
          ]
        },
        {
          "type": "callout",
          "title": "Коротко",
          "text": "Общие сектора продаются у официальных операторов. Мы работаем с закрытыми зонами: бронируем места в VIP-лаунжах категорий А и Б на ваше имя и собираем вокруг даты трансферы, отель и программу в Каире.",
          "variant": "info"
        },
        {
          "type": "heading",
          "text": "Почему площадка решает половину впечатления",
          "level": 2
        },
        {
          "type": "paragraph",
          "text": "Обычный стадион одинаков в любой стране: чаша, экраны, свет. На плато Гизы фон заменить нечем. За сценой стоит единственное уцелевшее чудо света, по сторонам — пустыня, а звук уходит в открытое небо, а не отражается от бетонных ярусов. Пирамиды подсвечивают вечером, и к началу концерта силуэты читаются полностью."
        },
        {
          "type": "paragraph",
          "text": "Есть и практическая сторона. Плато — охраняемая зона с собственным режимом доступа, поэтому вход, парковка и маршруты движения здесь работают не так, как на городской площадке. Это как раз тот случай, когда местная команда и заранее выстроенная логистика экономят вам несколько часов и пару нервных ситуаций."
        },
        {
          "type": "image",
          "url": "/carlsberg-12.JPG",
          "alt": "Вечерняя концертная площадка под открытым небом в Египте",
          "caption": "Открытая площадка вечером: свет, сцена и небо вместо потолка. Наш кадр с другого события в Египте"
        },
        {
          "type": "heading",
          "text": "Билеты: общие сектора и VIP-лаунжи",
          "level": 2
        },
        {
          "type": "paragraph",
          "text": "На крупных событиях билеты делят на общие сектора и закрытые зоны. Общие сектора — это вход в фан-зону или на нумерованные места, они продаются массово и разлетаются в первые часы. Закрытые зоны меньше по вместимости: отдельный вход, своя зона обслуживания, спокойный доступ к сцене без давки на входе и выходе."
        },
        {
          "type": "table",
          "headers": [
            "Тип билета",
            "Где покупать",
            "Что учесть"
          ],
          "rows": [
            [
              "Общий сектор",
              "Официальные операторы события",
              "Продаётся массово, разбирается в первые часы после старта"
            ],
            [
              "VIP-лаундж категории А",
              "Через нас, бронь на ваше имя",
              "Верхняя категория закрытой зоны; состав мест и сервис подтверждаем при бронировании"
            ],
            [
              "VIP-лаундж категории Б",
              "Через нас, бронь на ваше имя",
              "Вторая категория закрытой зоны; точные места и вход фиксируем в подтверждении"
            ]
          ],
          "caption": "Организатор объявляет наполнение каждой категории отдельно — мы передаём условия в момент подтверждения брони"
        },
        {
          "type": "paragraph",
          "text": "Для пары или семьи важнее место и комфортный вход. Для партнёрской или корпоративной группы — возможность посадить всех рядом и не собирать людей по разным секторам. Это как раз то, что решается на этапе брони, а не на входе в день концерта."
        },
        {
          "type": "heading",
          "text": "Когда открываются продажи и почему стоит бронировать заранее",
          "level": 2
        },
        {
          "type": "paragraph",
          "text": "Открытые продажи стартуют 1 октября 2026 года. Разрыв между стартом и самим концертом большой, и это нормально для событий такого масштаба: логистика, пермиты и монтаж на охраняемой территории планируются сильно заранее. Для покупателя это скорее плюс — есть время спокойно собрать поездку, а не ловить последние места за месяц до даты."
        },
        {
          "type": "paragraph",
          "text": "Но закрытые зоны заканчиваются первыми и почти всегда до общих секторов. Концерты Шакиры собирают стадионы в каждом городе тура, а выступление у пирамид ждут далеко за пределами Египта — от Европы до Залива. Практический вывод простой: если нужен VIP-лаундж, заявку имеет смысл оставить до старта продаж, чтобы бронь ушла в работу в первый же день."
        },
        {
          "type": "divider"
        },
        {
          "type": "heading",
          "text": "Как спланировать поездку в Каир",
          "level": 2
        },
        {
          "type": "heading",
          "text": "Перелёт и документы",
          "level": 3
        },
        {
          "type": "paragraph",
          "text": "Основной аэропорт — Каирский международный. Для многих направлений есть и прямые рейсы, и удобные стыковки через хабы Залива и Турции. Визовые правила Египта меняются, поэтому порядок въезда лучше проверять ближе к дате: мы подскажем актуальный на момент бронирования и предупредим, если по вашему паспорту есть нюансы."
        },
        {
          "type": "heading",
          "text": "Где остановиться",
          "level": 3
        },
        {
          "type": "paragraph",
          "text": "Два рабочих варианта. Отели рядом с плато — минимальный путь до площадки и вид на пирамиды прямо с террасы. Отели в центре Каира или на берегу Нила — больше выбора по ресторанам и городской жизни, дорога до площадки длиннее. Мы работаем по прямым контрактам с отелями обеих зон и подбираем под состав группы."
        },
        {
          "type": "heading",
          "text": "Сколько дней брать",
          "level": 3
        },
        {
          "type": "paragraph",
          "text": "Минимум — три ночи: день на акклиматизацию и город, день концерта, день на отъезд без спешки. Комфортно — пять-семь: тогда концерт становится финалом поездки, а не единственной её точкой."
        },
        {
          "type": "image",
          "url": "/nl-11.jpg",
          "alt": "Вечерняя площадка под открытым небом со сценой и световым оформлением",
          "caption": "Вечерний формат под открытым небом — то, ради чего в Египет и едут в ноябре"
        },
        {
          "type": "heading",
          "text": "Что добавить к концерту",
          "level": 2
        },
        {
          "type": "paragraph",
          "text": "Ноябрь — лучшее время для Египта: жары уже нет, вечера тёплые, на плато комфортно даже днём. Вокруг даты легко собирается программа, ради которой сюда едут отдельно."
        },
        {
          "type": "list",
          "items": [
            "Приватный доступ к пирамидам до открытия плато или после закрытия — все три камеры Великой пирамиды и время у подножия без других посетителей",
            "Большой Египетский музей в Гизе — коллекция, ради которой стоит заложить полдня",
            "Круиз по Нилу из Луксора или Асуана, включая приватный чартер и парусные дахабии",
            "Старый Каир: улица Аль-Муизз, медные мастерские, чайные"
          ]
        },
        {
          "type": "heading",
          "text": "Как забронировать через нас",
          "level": 2
        },
        {
          "type": "list",
          "ordered": true,
          "items": [
            "Оставляете заявку: дата, число гостей, желаемая категория лаунжа.",
            "Подтверждаем наличие мест и присылаем условия: состав, сроки, порядок оплаты.",
            "Фиксируем бронь на ваше имя после оплаты.",
            "Передаём билеты и, если нужно, собираем остальную поездку: отель, трансферы, программу."
          ]
        },
        {
          "type": "callout",
          "title": "Важно знать до брони",
          "text": "Стоимость фиксируется в момент подтверждения брони и до этого может измениться. Билеты возврату не подлежат. Если концерт отменят, возврат идёт по курсу на день возврата, и курсовую разницу компенсирует конечный клиент.",
          "variant": "warning"
        },
        {
          "type": "paragraph",
          "text": "Мы работаем в Египте с 2004 года: собственная команда в Каире и Шарм-эль-Шейхе, прямые контракты с отелями и транспортом, пермиты на охраняемые зоны. Поэтому билет у нас — не единичная услуга, а часть поездки, за которую отвечает одна команда от прилёта до вылета."
        }
      ]
    },
    "en": {
      "title": "Shakira at the Pyramids of Giza: Tickets for 28 November 2027",
      "category": "Locations",
      "date": "September 17, 2026",
      "excerpt": "Shakira plays the Pyramids of Giza on 28 November 2027: what is known about the venue, when tickets go on sale and how to book VIP lounge seats.",
      "links": [
        {
          "path": "/tickets",
          "label": "Tickets and VIP lounges: booking terms"
        },
        {
          "path": "/dmc",
          "label": "What we do in Egypt as a DMC"
        },
        {
          "path": "/cruises",
          "label": "Nile cruises after the show"
        },
        {
          "path": "/contact",
          "label": "Request a booking"
        }
      ],
      "content": [
        {
          "type": "paragraph",
          "text": "Shakira tickets in Egypt will become a search thousands of people run on the same day: on 28 November 2027 she performs at the Pyramids of Giza. A venue of that order is news in itself, and the closed areas always hold fewer seats than there is demand for. Here is what is known about the concert, how the ticket categories differ, and how to plan the trip so that an evening at the pyramids is more than a flight for three hours of music."
        },
        {
          "type": "stat",
          "number": "28 November 2027",
          "label": "the concert at the Pyramids of Giza. Public sale opens on 1 October 2026"
        },
        {
          "type": "heading",
          "text": "What is known about the concert",
          "level": 2
        },
        {
          "type": "paragraph",
          "text": "The show is part of the Las Mujeres Ya No Lloran world tour. The stage goes up on the Giza plateau, alongside the pyramids of Khufu, Khafre and Menkaure and the Great Sphinx. The format is not new for Egypt: the plateau has hosted major concerts before. Each one still stands apart, because the venue cannot be widened, moved or recreated."
        },
        {
          "type": "list",
          "items": [
            "Artist: Shakira, Las Mujeres Ya No Lloran world tour",
            "Date: 28 November 2027",
            "Venue: the Pyramids of Giza, Cairo, Egypt",
            "Public sale opens: 1 October 2026",
            "Through us: VIP tickets in lounge categories A and B, plus the trip around the show"
          ]
        },
        {
          "type": "callout",
          "title": "In short",
          "text": "General sectors are sold by the official operators. We work with the closed areas: seats in VIP lounges A and B booked in your name, with transfers, hotels and a programme in Cairo built around the date.",
          "variant": "info"
        },
        {
          "type": "heading",
          "text": "Why the venue is half the experience",
          "level": 2
        },
        {
          "type": "paragraph",
          "text": "An ordinary stadium is the same in every country: a bowl, screens, lights. On the Giza plateau there is nothing to swap the backdrop for. The only surviving wonder of the ancient world stands behind the stage, desert runs off to either side, and the sound rises into open sky instead of bouncing off concrete tiers. The pyramids are lit in the evening, so by showtime the silhouettes read in full."
        },
        {
          "type": "paragraph",
          "text": "There is a practical side too. The plateau is a protected site with its own access regime, so entrances, parking and traffic routes work differently from a city venue. This is exactly where a local team and logistics arranged in advance save you a couple of hours and a couple of tense moments."
        },
        {
          "type": "image",
          "url": "/carlsberg-12.JPG",
          "alt": "An open-air concert venue in Egypt in the evening",
          "caption": "An open-air venue after dark: light, a stage and sky instead of a ceiling. Our own photograph from another event in Egypt"
        },
        {
          "type": "heading",
          "text": "Tickets: general sectors and VIP lounges",
          "level": 2
        },
        {
          "type": "paragraph",
          "text": "At large events tickets split into general sectors and closed areas. General sectors cover the fan zone or numbered seats; they sell in volume and go in the first hours. Closed areas are far smaller: a separate entrance, their own service area, and calm access to the stage without a crush on the way in or out."
        },
        {
          "type": "table",
          "headers": [
            "Ticket type",
            "Where to buy",
            "What to keep in mind"
          ],
          "rows": [
            [
              "General sector",
              "Official event operators",
              "Sold in volume, usually gone within hours of the on-sale"
            ],
            [
              "VIP lounge, category A",
              "Through us, booked in your name",
              "Upper tier of the closed area; seating and service confirmed at booking"
            ],
            [
              "VIP lounge, category B",
              "Through us, booked in your name",
              "Second tier of the closed area; exact seats and entrance fixed in the confirmation"
            ]
          ],
          "caption": "The promoter publishes what each category includes separately; we pass the terms on when your booking is confirmed"
        },
        {
          "type": "paragraph",
          "text": "For a couple or a family, the seat and an easy entrance matter most. For a partner or corporate group, what matters is seating everyone together instead of collecting people from three different sectors afterwards. That is settled at the booking stage, not at the gate on the day."
        },
        {
          "type": "heading",
          "text": "When tickets go on sale, and why to book early",
          "level": 2
        },
        {
          "type": "paragraph",
          "text": "The public sale opens on 1 October 2026. The gap between the on-sale and the concert is wide, which is normal at this scale: logistics, permits and build on a protected site are planned far ahead. For a buyer that is mostly good news, since there is time to assemble the trip properly rather than chase the last seats a month out."
        },
        {
          "type": "paragraph",
          "text": "Closed areas, though, run out first, almost always before the general sectors. Shakira fills stadiums in every city of the tour, and a show at the pyramids is awaited well beyond Egypt, from Europe to the Gulf. The practical conclusion is simple: if you want a VIP lounge, send the request before the sale opens so the booking goes in on day one."
        },
        {
          "type": "divider"
        },
        {
          "type": "heading",
          "text": "Planning the trip to Cairo",
          "level": 2
        },
        {
          "type": "heading",
          "text": "Flights and paperwork",
          "level": 3
        },
        {
          "type": "paragraph",
          "text": "The main gateway is Cairo International. Many markets have both direct flights and comfortable connections through the Gulf and Turkish hubs. Egyptian entry rules change, so check them closer to the date: we confirm the current procedure at the time of booking and flag anything specific to your passport."
        },
        {
          "type": "heading",
          "text": "Where to stay",
          "level": 3
        },
        {
          "type": "paragraph",
          "text": "Two workable options. Hotels beside the plateau give the shortest route to the venue and a view of the pyramids from the terrace. Hotels downtown or on the Nile offer more restaurants and city life, with a longer drive to the site. We hold direct contracts in both areas and match the hotel to the group."
        },
        {
          "type": "heading",
          "text": "How many days to take",
          "level": 3
        },
        {
          "type": "paragraph",
          "text": "Three nights is the minimum: a day to land and see the city, the day of the concert, and a day to leave without rushing. Five to seven is comfortable, and then the concert becomes the finale of a trip rather than its only point."
        },
        {
          "type": "image",
          "url": "/nl-11.jpg",
          "alt": "An open-air evening venue with a stage and show lighting",
          "caption": "The open-air evening format is exactly what November in Egypt is for"
        },
        {
          "type": "heading",
          "text": "What to add around the concert",
          "level": 2
        },
        {
          "type": "paragraph",
          "text": "November is the best month for Egypt: the heat is gone, the evenings are warm, and the plateau is comfortable even at midday. A programme worth travelling for on its own assembles easily around the date."
        },
        {
          "type": "list",
          "items": [
            "Private access to the pyramids before the plateau opens or after it closes: all three chambers of the Great Pyramid and time at its foot with no other visitors",
            "The Grand Egyptian Museum in Giza, a collection worth half a day of anyone’s itinerary",
            "A Nile cruise from Luxor or Aswan, including a private charter or a sailing dahabiya",
            "Old Cairo: Al-Muizz street, the coppersmiths, the tea houses"
          ]
        },
        {
          "type": "heading",
          "text": "How to book through us",
          "level": 2
        },
        {
          "type": "list",
          "ordered": true,
          "items": [
            "Send a request: date, number of guests, preferred lounge category.",
            "We confirm availability and send the terms: what is included, deadlines, how payment works.",
            "The booking is held in your name once payment is made.",
            "You receive the tickets, and we assemble the rest of the trip if you want it: hotel, transfers, programme."
          ]
        },
        {
          "type": "callout",
          "title": "Before you book",
          "text": "The price is fixed at the moment your booking is confirmed and may change until then. Tickets are non-refundable. If the concert is cancelled, refunds follow the exchange rate on the day of the refund, and any currency difference is covered by the end client.",
          "variant": "warning"
        },
        {
          "type": "paragraph",
          "text": "We have worked in Egypt since 2004: our own team in Cairo and Sharm El Sheikh, direct contracts with hotels and transport, permits for protected sites. A ticket from us is therefore not a standalone purchase but part of a trip that one team owns from arrival to departure."
        }
      ]
    }
  },
  // ───────────────────────────────────────────────────────────────────────
  {
    "id": "dmc-v-egipte",
    "datePublished": "2026-09-17",
    "image": "/nl-5.jpg",
    "ru": {
      "title": "DMC в Египте: что делает принимающая компания и как её выбрать",
      "category": "Деловые мероприятия",
      "date": "17 сентября 2026",
      "excerpt": "Что такое DMC в Египте, чем принимающая компания отличается от турагентства, как она работает по шагам и какие вопросы задать ей до договора.",
      "links": [
          {
            "path": "/dmc",
            "label": "DMC в Египте: что мы берём на себя"
          },
          {
            "path": "/programmy",
            "label": "Десять программ для компаний"
          },
          {
            "path": "/cruises",
            "label": "Круизы по Нилу для групп"
          },
          {
            "path": "/contact",
            "label": "Запросить предложение"
          }
        ],
        "content": [
        {
          "type": "paragraph",
          "text": "«DMC в Египте» — запрос, который появляется, когда мероприятие уже почти решено: даты согласованы, руководство сказало «да» пирамидам или Красному морю, и дальше начинается работа, которую нельзя сделать из другой страны. Разрешение на съёмку у Сфинкса выдаёт не отель, автобусы для группы нужно откуда-то взять, а кто-то должен встретить ночной рейс. Всё это — зона ответственности принимающей компании, destination management company, или коротко DMC."
        },
        {
          "type": "paragraph",
          "text": "Мы работаем в Египте как DMC с 2004 года и разбираем в этой статье без рекламных формул: что принимающая сторона делает на самом деле, чем отличается от турагентства и ивент-агентства, что в Египте решается только на месте и какие вопросы задать любой DMC до договора — включая нас."
        },
        {
          "type": "stat",
          "number": "с 2004 года",
          "label": "La Royal Event принимает корпоративные группы в Египте: собственная команда в Каире и Шарм-эль-Шейхе, прямые контракты с отелями, судовладельцами и площадками"
        },
        {
          "type": "heading",
          "text": "Что такое DMC и чем она отличается от турагентства и ивент-агентства",
          "level": 2
        },
        {
          "type": "paragraph",
          "text": "Destination management company находится в стране проведения и отвечает за всё, что происходит с группой на её территории: отели и площадки, транспорт, гиды, разрешения, локальный продакшн, координация в день мероприятия. Принимающая сторона не придумывает идею события и не продаёт билеты на самолёт — она делает так, чтобы идея заказчика была исполнена в чужой стране с той же точностью, что и дома."
        },
        {
          "type": "paragraph",
          "text": "Путаница возникает потому, что все три типа компаний могут написать в презентации «организуем мероприятия за рубежом». Разница — в том, кто и где физически делает работу."
        },
        {
          "type": "table",
          "headers": [
            "Кто",
            "Что делает",
            "Чего обычно не делает"
          ],
          "rows": [
            [
              "Турагентство",
              "Билеты, отели, страховки, визы. Работает из вашей страны через системы бронирования",
              "Само мероприятие: площадки вне отеля, продакшн, пермиты, работа на месте"
            ],
            [
              "Ивент-агентство",
              "Концепция, сценарий, программа, режиссура, общение с заказчиком. За рубежом ищет местного партнёра",
              "Прямые контракты с отелями и площадками, локальную логистику"
            ],
            [
              "DMC",
              "Всё, что происходит с группой в стране: площадки, транспорт, гиды, разрешения, продакшн, работа на месте",
              "Креативную концепцию, если у заказчика есть своё агентство; перелёт"
            ]
          ],
          "caption": "Роли пересекаются, но у каждой есть ядро. Вопрос к подрядчику один: что он делает своими руками, а что перекупает"
        },
        {
          "type": "paragraph",
          "text": "Самая надёжная схема для корпоративной группы — DMC, которая совмещает роль принимающей стороны с полным циклом ивент-агентства: собственная команда в стране, прямые контракты, свой продакшн. Между заказчиком и площадкой нет цепочки посредников — нет и потерь на «испорченном телефоне»."
        },
        {
          "type": "heading",
          "text": "Что делает DMC в Египте: семь шагов от брифа до отчёта",
          "level": 2
        },
        {
          "type": "paragraph",
          "text": "Работа принимающей стороны выглядит одинаково, кто бы ни был заказчиком — корпорация напрямую или агентство, которое ведёт своего клиента. Вот последовательность, по которой мы проводим каждую группу."
        },
        {
          "type": "list",
          "ordered": true,
          "items": [
            "Бриф. Цели, формат, число участников, даты, города, ограничения. DMC на этом этапе задаёт вопросы, а не присылает шаблон: что для вас «успех», кто аудитория, что должно остаться после события.",
            "Инспекция площадок. Отели, залы и локации проверяются под конкретную задачу: вместимость, техника, монтаж, подъезд транспорта, свет в нужное время суток. Инспекционный визит заказчика DMC собирает в один-два дня.",
            "Предложение. Сценарий дней, площадки по каждому блоку, схема логистики, перечень включённого. Хорошее предложение читается как план мероприятия, а не как брошюра.",
            "Договоры. DMC заключает контракты с отелем, судовладельцем, площадками, транспортом и артистами от своего имени по прямым соглашениям. Заказчик получает один договор и одну точку ответственности.",
            "Логистика. Списки участников, распределение по номерам, графики прилётов и трансферов, пермиты, райдеры, меню, тайминги — всё сводится в единый документ для команды на месте.",
            "Работа на месте. Встреча в аэропорту, fast-track, заселение, координаторы на каждом блоке программы, техническая команда, круглосуточный duty-office. Заказчик видит одного руководителя проекта, за которым стоит вся команда.",
            "Отчёт. Закрывающие документы по каждой позиции, фото и видео, разбор: что сработало, что изменить в следующий раз. Для агентств — документация на английском и арабском."
          ]
        },
        {
          "type": "callout",
          "variant": "info",
          "title": "Один документ вместо десяти переписок",
          "text": "К заезду у заказчика должна быть рабочая книга проекта: кто, где и когда встречает группу, где она живёт, что происходит в каждый час программы и кто за это отвечает — по имени и телефону. Если DMC не может её собрать, на месте будут импровизировать."
        },
        {
          "type": "image",
          "url": "/nl-12.jpg",
          "alt": "Корпоративный выезд NL International в Шарм-эль-Шейхе — семидневная программа в Park Regency",
          "caption": "Семидневный выезд NL International в Park Regency: деловая часть, тимбилдинг, тематические вечера — семь логистических планов, сведённых в один"
        },
        {
          "type": "heading",
          "text": "Специфика Египта: что решается только на месте",
          "level": 2
        },
        {
          "type": "paragraph",
          "text": "Египет — направление с очень щедрой «сценой»: пирамиды, Нил, Красное море, храмы Луксора. Но именно поэтому принимающая сторона должна быть здесь физически и работать с местными структурами напрямую. Пять отличий от привычного европейского сценария."
        },
        {
          "type": "heading",
          "text": "Пермиты: плато Гизы, музеи, исторический Каир",
          "level": 3
        },
        {
          "type": "paragraph",
          "text": "Мероприятие, ужин или съёмка на плато Гизы, в музее или на улицах старого Каира проходят в охраняемых зонах, где нужны отдельные разрешения. Их получает не отель и не заказчик, а лицензированная принимающая компания — заранее, с документами на группу. Приватный доступ к пирамидам до открытия и после закрытия плато, включая камеры Великой пирамиды и ограждение Сфинкса, тоже работает через пермиты: до 50 гостей на один пермит. Если DMC говорит «решим на месте», пермита не будет."
        },
        {
          "type": "heading",
          "text": "Сезон и жара",
          "level": 3
        },
        {
          "type": "paragraph",
          "text": "Комфортный сезон для программ на открытом воздухе — с октября по апрель. Летом дневную часть в Каире и на плато Гизы строят вокруг раннего утра и вечера, в Шарм-эль-Шейхе — вокруг моря и кондиционированных залов. Отдельный фактор — Рамадан: персонал и площадки работают в особом режиме, и программу планируют с учётом этого заранее."
        },
        {
          "type": "heading",
          "text": "Каир или Шарм-эль-Шейх: две разные логистики",
          "level": 3
        },
        {
          "type": "paragraph",
          "text": "Каир — большой город с плотным трафиком, историческими площадками и деловыми отелями; здесь главное умение DMC — честно считать время в пути и держать резерв транспорта. Шарм-эль-Шейх — курорт, где конференц-отели, пустыня и море расположены рядом, а логистика упирается в графики рейсов и вместимость залов. Многим группам подходит связка: деловая часть у моря в Шарме, культурный блок с пирамидами в Каире. Тогда у принимающей компании должна быть команда в обоих городах, а не «партнёр» в одном из них."
        },
        {
          "type": "heading",
          "text": "Безопасность и сопровождение",
          "level": 3
        },
        {
          "type": "paragraph",
          "text": "Корпоративная группа в Египте передвигается по согласованным маршрутам, с сопровождением, на транспорте принимающей стороны — со своими водителями, а не на арендованных автобусах со случайным экипажем. Для закрытых форматов DMC организует приватную охрану. Это не про страх, а про то, что группа из ста человек не должна зависеть от импровизации."
        },
        {
          "type": "heading",
          "text": "Языки и документы",
          "level": 3
        },
        {
          "type": "paragraph",
          "text": "Рабочие языки Египта — арабский и английский: на них ведутся договоры с площадками, разрешения, счета и переписка с госструктурами. Поэтому принимающая компания должна выставлять документацию на английском и арабском, а для русскоязычных групп — иметь гидов-египтологов, координаторов и duty-office на русском. «Гид, который немного говорит по-русски» — не то же самое, что египтолог, ведущий экскурсию на вашем языке."
        },
        {
          "type": "stat",
          "number": "24/7",
          "label": "режим duty-office во время заезда группы: ночной рейс, потерянный багаж, замена номера или маршрута решаются в момент, когда возникают"
        },
        {
          "type": "image",
          "url": "/carlsberg-8.JPG",
          "alt": "Конференция Carlsberg на 1000 участников в Domina Coral Bay, Шарм-эль-Шейх",
          "caption": "Конференция Carlsberg на 1000 участников в Domina Coral Bay. На таком масштабе DMC — не «помощь с трансферами», а операционная система всего события"
        },
        {
          "type": "heading",
          "text": "Чек-лист: что спросить у DMC до подписания договора",
          "level": 2
        },
        {
          "type": "paragraph",
          "text": "Эти вопросы стоит задать любой принимающей компании в Египте. Ответ «уточним позже» считается ответом «нет»."
        },
        {
          "type": "list",
          "ordered": true,
          "items": [
            "Своя команда или субподряд? Кто конкретно будет работать с нашей группой в Каире и Шарм-эль-Шейхе — штатные сотрудники или партнёры?",
            "Прямые контракты или посредники? С какими отелями, судовладельцами и площадками у вас прямые соглашения?",
            "Лицензии и пермиты. Есть ли лицензия на приём групп и опыт получения разрешений на мероприятия и съёмку на плато Гизы, в музеях и историческом Каире?",
            "Как устроен duty-office? Кто отвечает ночью и в выходные, как быстро и на каком языке?",
            "Документы. Выставите ли договор, счета и закрывающие документы на английском и арабском под требования нашей бухгалтерии?",
            "Условия для агентств. Работаете ли по нетто-тарифам и не выходите ли на клиентов агентства напрямую?",
            "Кейсы нашего масштаба. Покажите проекты с сопоставимым числом участников и форматом и дайте контакты заказчиков.",
            "Кто руководитель проекта? Один человек с именем и телефоном или «отдел», в котором ответственность растворяется?",
            "Что при изменениях? Как меняется предложение, если участников становится меньше или больше, сдвигаются даты, отель предлагает замену?"
          ]
        },
        {
          "type": "callout",
          "variant": "warning",
          "title": "Красные флаги",
          "text": "Площадку не показывают до подписания договора. На связи один менеджер — и он же «на всех проектах». «Всё включено» без письменного перечня включённого. Не задают вопросов о целях мероприятия. Говорят, что разрешения «не нужны» там, где они нужны по умолчанию."
        },
        {
          "type": "heading",
          "text": "Как выглядит хорошее сотрудничество агентства и DMC",
          "level": 2
        },
        {
          "type": "paragraph",
          "text": "Значительная часть наших групп приходит через агентства, которые ведут своего клиента и ищут принимающую сторону в Египте. Хорошая связка выглядит так: агентство владеет отношениями с клиентом, концепцией и коммуникацией, а DMC — страной. Роли разведены, ответственность не дублируется."
        },
        {
          "type": "list",
          "items": [
            "Агентство: бриф от клиента, концепция и сценарий, согласование условий с заказчиком, коммуникация с участниками, брендинг и контент.",
            "DMC: инспекция и подбор площадок, прямые контракты, пермиты, транспорт и гиды, локальный продакшн, работа на месте, документация.",
            "Общее: единая рабочая книга проекта, одна точка ответственности с каждой стороны, статусы до заезда и ежедневный брифинг во время события.",
            "Правило долгого партнёрства: DMC работает по нетто-тарифам и не выходит на клиента агентства в обход партнёра."
          ]
        },
        {
          "type": "image",
          "url": "/cruises/fayan-ship.webp",
          "alt": "Судно Le Fayan Suites на Ниле — круизный формат для корпоративных групп",
          "caption": "Le Fayan Suites, 37 сьютов. Круиз по Нилу для группы — фрахт судна, гид-египтолог, разрешения в храмах и логистика Луксор — Асуан в одной программе"
        },
        {
          "type": "heading",
          "text": "Когда DMC нужна, а когда достаточно отеля",
          "level": 2
        },
        {
          "type": "paragraph",
          "text": "Честный ответ: не каждой группе нужна принимающая компания. Если всё мероприятие проходит в одном отеле, а программа — зал, банкет и пляж, банкетный отдел отеля справится сам. DMC нужна в тот момент, когда группа выходит за ворота отеля."
        },
        {
          "type": "comparison",
          "title": "Отель или принимающая компания",
          "left": {
            "title": "Достаточно отеля, если",
            "items": [
              "Вся программа внутри одного отеля: зал, банкет, бассейн",
              "Группа летит одним рейсом, трансфер организует отель",
              "Не нужны съёмка, внешние площадки и разрешения",
              "Нет многодневной программы с выездами",
              "Заказчик сам ведёт переписку с отелем на английском"
            ]
          },
          "right": {
            "title": "Нужна DMC, если",
            "items": [
              "В программе пирамиды, музеи, старый Каир, Нил или пустыня",
              "Несколько городов или отелей",
              "Участники летят разными рейсами, нужен fast-track",
              "Нужны продакшн, декор, сцена, артисты, съёмка",
              "Нужна одна точка ответственности и duty-office 24/7"
            ]
          }
        },
        {
          "type": "divider"
        },
        {
          "type": "heading",
          "text": "Вместо вывода",
          "level": 2
        },
        {
          "type": "paragraph",
          "text": "Хорошая DMC в Египте не продаёт «Египет вообще» — она продаёт исполнение. La Royal Event работает как принимающая компания полного цикла с 2004 года: своя команда в Каире и Шарм-эль-Шейхе, прямые контракты с отелями, судовладельцами и площадками, разрешения на плато Гизы, в музеях и историческом Каире, гиды-египтологи на русском и английском, свои водители, кейтеринг, декор, звук и свет, duty-office 24/7, документы на английском и арабском, нетто-тарифы для агентств. От конференции Carlsberg на 1000 человек до приватного чартера Lumière на восемь кают. Задайте нам вопросы из чек-листа — мы любим заказчиков, которые их задают."
        }
      ]
    },
    "en": {
      "title": "DMC in Egypt: What a Destination Management Company Does and How to Choose One",
      "category": "Business Events",
      "date": "September 17, 2026",
      "excerpt": "What a DMC in Egypt actually does, how it differs from a travel agent or event agency, how ground handling works step by step and what to ask before you sign.",
      "links": [
          {
            "path": "/dmc",
            "label": "What our DMC in Egypt covers"
          },
          {
            "path": "/programmy",
            "label": "Ten programs for corporate groups"
          },
          {
            "path": "/cruises",
            "label": "Nile cruises for groups"
          },
          {
            "path": "/contact",
            "label": "Request a proposal"
          }
        ],
        "content": [
        {
          "type": "paragraph",
          "text": "“DMC in Egypt” is the search that starts once the event is almost decided: the dates are set, the board has said yes to the pyramids or the Red Sea, and someone now has to make it happen on the ground. The permit to film at the Sphinx is not the hotel’s to give, coaches for a hundred delegates have to come from somewhere, and someone has to meet a night arrival at Cairo airport. All of that is the job of a destination management company, or DMC."
        },
        {
          "type": "paragraph",
          "text": "We have worked in Egypt as a DMC since 2004. This article sets out, without brochure language, what a destination management company in Egypt actually does, how it differs from a travel agent and an event agency, what can only be solved locally, and what to ask any Egypt DMC before you sign — including us."
        },
        {
          "type": "stat",
          "number": "since 2004",
          "label": "La Royal Event has handled corporate groups in Egypt: an in-house team in Cairo and Sharm El Sheikh, direct contracts with hotels, ship owners and venues"
        },
        {
          "type": "heading",
          "text": "What a DMC is, and how it differs from a travel agent and an event agency",
          "level": 2
        },
        {
          "type": "paragraph",
          "text": "A destination management company is based in the destination and owns everything that happens to a group inside the country: hotels and venues, transport, guides, permits, local production and coordination on the day. It does not invent the creative idea and does not sell the flights; its job is to deliver the client’s idea abroad with the same precision as at home."
        },
        {
          "type": "paragraph",
          "text": "The confusion exists because all three types of company can put “events abroad” on a slide. The difference is who does the work, and where."
        },
        {
          "type": "table",
          "headers": [
            "Who",
            "What they do",
            "What they usually do not do"
          ],
          "rows": [
            [
              "Travel agent",
              "Flights, rooms, insurance, visas. Works from your home market through booking systems",
              "The event itself: venues outside the hotel, production, permits, on-site coordination"
            ],
            [
              "Event agency",
              "Concept, script, programme, show direction, client communication. Abroad, it looks for a local partner",
              "Direct contracts with hotels and venues in the destination, local logistics"
            ],
            [
              "DMC",
              "Everything that happens to the group in-country: venues, transport, guides, permits, production, on-site operations",
              "The creative concept when the client has an agency; flights from home"
            ]
          ],
          "caption": "The roles overlap, but each has a core. The question to any supplier is the same: what do you deliver yourself, and what do you resell"
        },
        {
          "type": "paragraph",
          "text": "The most reliable set-up for a corporate group is a DMC that also runs the full event cycle: its own team in the country, direct contracts and its own production. There is no chain of intermediaries between the client and the venue, so nothing gets lost or marked up along the way."
        },
        {
          "type": "heading",
          "text": "What a DMC in Egypt does: seven steps from brief to report",
          "level": 2
        },
        {
          "type": "paragraph",
          "text": "Ground handling in Egypt follows the same sequence whether the client is a corporation working with us directly or an agency managing its own client. This is how we take every group through it."
        },
        {
          "type": "list",
          "ordered": true,
          "items": [
            "Brief. Objectives, format, headcount, dates, cities, constraints. At this stage a DMC asks questions rather than sending a template: what does success look like, who is the audience, what should remain after the event.",
            "Site inspection. Hotels, halls and locations are checked against the specific task: capacity, technical set-up, load-in, coach access, the light at the right time of day. A client’s inspection visit is built to cover everything in a day or two.",
            "Proposal. A day-by-day scenario, venues for each block, the logistics scheme and a list of what is included. A good proposal reads like an event plan, not a brochure.",
            "Contracts. The DMC contracts the hotel, the ship owner, venues, transport and artists in its own name under direct agreements. The client receives one contract and one point of accountability.",
            "Logistics. Rooming lists, arrival and transfer schedules, permits, technical riders, menus, timings — all merged into one working document for the on-site team.",
            "On-site operations. Airport meet and greet, fast-track, check-in, coordinators on every block of the programme, the technical crew, a duty office that answers around the clock. The client sees one project lead with the whole team behind them.",
            "Report. Closing documents for every line, photo and video, and a debrief: what worked, what to change next time. For agencies, paperwork in English and Arabic."
          ]
        },
        {
          "type": "callout",
          "variant": "info",
          "title": "One working document instead of ten email threads",
          "text": "By arrival day the client should hold the project book: who meets the group where and when, where it stays, what happens in every hour of the programme and who is responsible, by name and phone number. If a DMC cannot produce it, the operation will be improvised on the ground."
        },
        {
          "type": "image",
          "url": "/nl-12.jpg",
          "alt": "NL International corporate retreat in Sharm El Sheikh — a seven-day programme at Park Regency",
          "caption": "NL International, seven days at Park Regency: business sessions, team building, themed evenings — seven logistics plans merged into one"
        },
        {
          "type": "heading",
          "text": "What is specific to Egypt: the tasks only solved on the ground",
          "level": 2
        },
        {
          "type": "paragraph",
          "text": "Egypt offers an unusually generous stage: the pyramids, the Nile, the Red Sea, the temples of Luxor. That is exactly why the receiving party has to be physically here and work directly with local authorities and suppliers. Five differences from a familiar European scenario."
        },
        {
          "type": "heading",
          "text": "Permits: the Giza Plateau, museums and historic Cairo",
          "level": 3
        },
        {
          "type": "paragraph",
          "text": "An event, a dinner or a film shoot on the Giza Plateau, inside a museum or in the streets of old Cairo takes place in a protected zone and needs its own permit. It is issued not to the hotel or the client but to a licensed receiving company, in advance, with the group’s documents. Private access to the pyramids before the plateau opens and after it closes — including the chambers of the Great Pyramid and the Sphinx enclosure — also runs on permits, up to 50 guests per permit. If a DMC says it will “sort it out on the day”, it will not have one."
        },
        {
          "type": "heading",
          "text": "Season and heat",
          "level": 3
        },
        {
          "type": "paragraph",
          "text": "The comfortable season for outdoor programmes runs from October to April. In summer the daytime part in Cairo and on the Giza Plateau is built around early morning and evening, and in Sharm El Sheikh around the sea and air-conditioned halls. Ramadan is a separate factor: local staff and venues work to a different rhythm, and the programme is planned around it in advance."
        },
        {
          "type": "heading",
          "text": "Cairo or Sharm El Sheikh: two different logistics",
          "level": 3
        },
        {
          "type": "paragraph",
          "text": "Cairo is a large city with heavy traffic, historic venues and business hotels; the key DMC skill here is counting travel time honestly and keeping transport in reserve. Sharm El Sheikh is a resort where conference hotels, the desert and the sea sit close together, and logistics come down to flight schedules and hall capacity. Many groups combine the two: business sessions by the sea in Sharm, a cultural block with the pyramids in Cairo. That takes an event DMC with a team in both cities, not a “partner” in one of them."
        },
        {
          "type": "heading",
          "text": "Security and escort",
          "level": 3
        },
        {
          "type": "paragraph",
          "text": "A corporate group in Egypt moves along agreed routes, with an escort, on the receiving company’s own transport with its own drivers — not hired coaches with a random crew. For closed formats the DMC arranges private security. This is not about fear; it is about a hundred people never depending on improvisation."
        },
        {
          "type": "heading",
          "text": "Languages and paperwork",
          "level": 3
        },
        {
          "type": "paragraph",
          "text": "Egypt’s working languages are Arabic and English: venue contracts, permits, invoices and correspondence with the authorities are conducted in them, so a receiving company must issue documentation in both. For the group itself the DMC should provide Egyptologist guides and coordinators in the delegates’ language; we work in English and Russian. “A guide who speaks some English” is not the same as a trained Egyptologist leading the tour in your language."
        },
        {
          "type": "stat",
          "number": "24/7",
          "label": "the duty-office regime while a group is in the country: a night flight, lost luggage, a room change or a route change is solved the moment it comes up"
        },
        {
          "type": "image",
          "url": "/carlsberg-8.JPG",
          "alt": "Carlsberg conference for 1,000 delegates at Domina Coral Bay, Sharm El Sheikh",
          "caption": "The Carlsberg conference for 1,000 delegates at Domina Coral Bay. At this scale the DMC is not “help with transfers” but the operating system of the whole event"
        },
        {
          "type": "heading",
          "text": "Checklist: what to ask an Egypt DMC before you sign",
          "level": 2
        },
        {
          "type": "paragraph",
          "text": "These questions are worth putting to any destination management company in Egypt. “We will confirm later” counts as a no."
        },
        {
          "type": "list",
          "ordered": true,
          "items": [
            "In-house team or subcontractors? Who exactly will work with our group in Cairo and Sharm El Sheikh — your own staff or partners?",
            "Direct contracts or intermediaries? Which hotels, ship owners and venues do you hold direct agreements with?",
            "Licences and permits. Is the company licensed to receive groups, and has it obtained permits for events and filming on the Giza Plateau, in museums and in historic Cairo?",
            "How does the duty office work? Who answers at night and at weekends, how fast, and in which language?",
            "Paperwork. Can you issue the contract, invoices and closing documents in English and Arabic to match our accounting requirements?",
            "Terms for agencies. Do you work on net rates, and do you commit not to approach the agency’s clients directly?",
            "Cases at our scale. Show us projects with a comparable headcount and format, and give us client references we can call.",
            "Who is the project lead? One named person with a phone number, or a “department” in which responsibility dissolves?",
            "What happens when things change? How does the proposal change if the headcount moves, the dates shift or the hotel offers a substitute?"
          ]
        },
        {
          "type": "callout",
          "variant": "warning",
          "title": "Red flags",
          "text": "The venue is not shown before the contract is signed. One manager is your only contact — and he is “on all the projects”. “All inclusive” without a written list of what is included. Nobody asks about the objectives of the event. Permits are “not needed” where they are required by default."
        },
        {
          "type": "heading",
          "text": "What a good agency-and-DMC partnership looks like",
          "level": 2
        },
        {
          "type": "paragraph",
          "text": "A large share of our groups arrive through agencies that manage their own client and are looking for a receiving partner in Egypt. A good partnership works like this: the agency owns the client relationship, the concept and the communication; the DMC owns the country. Roles are separate and responsibility is not duplicated."
        },
        {
          "type": "list",
          "items": [
            "Agency: the client brief, concept and script, agreeing terms with the client, delegate communication, branding and content.",
            "DMC: site inspection and venue selection, direct contracts, permits, transport and guides, local production, on-site operations, documentation.",
            "Shared: one project book, one accountable person on each side, status calls before arrival and a daily briefing during the event.",
            "The rule that keeps a partnership long-term: the DMC works on net rates and never goes around its partner to the agency’s client."
          ]
        },
        {
          "type": "image",
          "url": "/cruises/fayan-ship.webp",
          "alt": "Le Fayan Suites on the Nile — a cruise format for corporate groups",
          "caption": "Le Fayan Suites, 37 suites. A Nile cruise for a group: the vessel charter, an Egyptologist guide, temple permits and Luxor–Aswan logistics in one programme"
        },
        {
          "type": "heading",
          "text": "When you need a DMC, and when the hotel is enough",
          "level": 2
        },
        {
          "type": "paragraph",
          "text": "The honest answer: not every group needs a destination management company. If the whole event takes place in one hotel and the programme is a hall, a banquet and a beach, the hotel’s banqueting team can handle it. A DMC becomes necessary the moment the group leaves the hotel gates."
        },
        {
          "type": "comparison",
          "title": "Hotel or DMC",
          "left": {
            "title": "The hotel is enough if",
            "items": [
              "The entire programme is inside one hotel: hall, banquet, pool",
              "The group arrives on one flight and the hotel arranges the transfer",
              "No filming, external venues or permits",
              "No multi-day programme with excursions",
              "The client handles all correspondence with the hotel"
            ]
          },
          "right": {
            "title": "You need a DMC if",
            "items": [
              "The programme includes the pyramids, museums, old Cairo, the Nile or the desert",
              "Several cities or several hotels",
              "Delegates arrive on different flights and need fast-track",
              "You need production, décor, a stage, artists, filming",
              "You need one point of accountability and a 24/7 duty office"
            ]
          }
        },
        {
          "type": "divider"
        },
        {
          "type": "heading",
          "text": "In place of a conclusion",
          "level": 2
        },
        {
          "type": "paragraph",
          "text": "A good DMC in Egypt does not sell “Egypt in general” — it sells delivery. La Royal Event has operated as a full-cycle destination management company since 2004: an in-house team in Cairo and Sharm El Sheikh, direct contracts with hotels, ship owners and venues, permits for the Giza Plateau, museums and historic Cairo, Egyptologist guides in English and Russian, our own drivers, catering, décor, sound and light, a 24/7 duty office, documentation in English and Arabic and net rates for agencies. From the Carlsberg conference for 1,000 delegates to a private charter of Lumière with eight cabins. Ask us the questions from the checklist above — we like clients who ask them."
        }
      ]
    }
  },
  // ───────────────────────────────────────────────────────────────────────
  {
    "id": "organizaciya-meropriyatiya-za-granicej-s-dmc",
    "datePublished": "2026-09-17",
    "image": "/afa-1.JPG",
    "ru": {
      "title": "Организация мероприятия за границей: как работать с принимающей стороной, чтобы ничего не сорвалось",
      "category": "Деловые мероприятия",
      "date": "17 сентября 2026",
      "excerpt": "Кто за что отвечает при организации мероприятия за границей: документы и пермиты, инспекция площадки, райдер, договоры, план Б и контроль на месте.",
      "links": [
          {
            "path": "/dmc",
            "label": "Принимающая компания в Египте"
          },
          {
            "path": "/services",
            "label": "Услуги: конференции, инсентивы, делегации"
          },
          {
            "path": "/portfolio",
            "label": "Кейсы: как это было на практике"
          },
          {
            "path": "/contact",
            "label": "Обсудить мероприятие"
          }
        ],
        "content": [
        {
          "type": "paragraph",
          "text": "Организация мероприятий за границей отличается от домашнего проекта одним принципиальным моментом: вы не можете «доехать и посмотреть». Площадка, подрядчики, разрешения, водители, повара — всё находится в другой стране, в другом часовом поясе и часто на другом языке. Поэтому главный вопрос зарубежного проекта не «что делать», а «кто за что отвечает» — и как построить работу с принимающей стороной так, чтобы каждый участок был закрыт конкретным человеком."
        },
        {
          "type": "paragraph",
          "text": "Чек-лист по срокам подготовки мы уже публиковали. Эта статья — о модели работы: как распределить ответственность между заказчиком, агентством и принимающей компанией, какие документы понадобятся за рубежом, зачем нужна инспекция площадки, как устроены договоры и что происходит на площадке в день мероприятия. Примеры — из Египта: Каир и Шарм-эль-Шейх, где мы работаем как принимающая сторона."
        },
        {
          "type": "heading",
          "text": "Организация мероприятий за границей: три стороны и одна точка ответственности",
          "level": 2
        },
        {
          "type": "paragraph",
          "text": "В выездном корпоративном мероприятии участвуют три стороны. Заказчик — компания, которая ставит цели, утверждает бюджет и отвечает за содержание: программу, спикеров, состав участников. Агентство — команда, которая превращает цели в проект: концепция, сценарий, продакшн, координация. Принимающая сторона, или DMC (Destination Management Company), — компания в стране проведения, у которой есть контракты с отелями и площадками, лицензии для получения разрешений, собственные водители, гиды и подрядчики."
        },
        {
          "type": "table",
          "headers": [
            "Зона",
            "Заказчик",
            "Агентство",
            "Принимающая сторона"
          ],
          "rows": [
            [
              "Цели и программа",
              "Ставит задачу, утверждает контент и спикеров",
              "Пишет сценарий и тайминг, режиссирует",
              "Адаптирует сценарий под площадку и местные правила"
            ],
            [
              "Участники",
              "Собирает список, паспортные данные, анкеты",
              "Ведёт ростер и коммуникацию с гостями",
              "Визовая поддержка, размещение, встреча в аэропорту"
            ],
            [
              "Площадка и отель",
              "Утверждает выбор",
              "Формирует шорт-лист и требования",
              "Бронирует по прямым контрактам, ведёт отель до и во время события"
            ],
            [
              "Документы и разрешения",
              "Предоставляет данные и доверенности",
              "Собирает пакет, контролирует сроки",
              "Получает пермиты на площадки, съёмку и мероприятия в охраняемых зонах"
            ],
            [
              "Техника и декор",
              "Согласует райдер и визуал",
              "Составляет технический райдер",
              "Подбирает локальных подрядчиков, монтирует, отвечает за прогон"
            ],
            [
              "Логистика",
              "Даёт расписание рейсов",
              "Строит схему перемещений",
              "Трансферы со своими водителями, fast-track, сопровождение"
            ],
            [
              "На месте",
              "Принимает решения по программе",
              "Руководитель проекта на площадке",
              "Duty-office 24/7, координаторы, связь с подрядчиками"
            ]
          ],
          "caption": "Распределение ответственности при организации мероприятия за границей. Каждая строка должна быть закрыта именем и телефоном, а не названием компании"
        },
        {
          "type": "paragraph",
          "text": "Агентство и принимающая сторона могут быть одной компанией: так работаем мы в Египте. Своя команда в Каире и Шарм-эль-Шейхе, прямые контракты с отелями, судовладельцами и площадками — и мероприятие не передаётся субподрядчику. Но даже когда стороны разные, у заказчика должна быть одна точка ответственности: человек, который отвечает за весь проект и сам разбирается с отелем, подрядчиками и разрешениями. Если заказчику приходится звонить отелю напрямую, модель уже сломана."
        },
        {
          "type": "callout",
          "variant": "warning",
          "title": "Главное правило",
          "text": "У каждой задачи в проекте один владелец. Не «отель обещал» и не «подрядчик сказал», а конкретный человек на стороне принимающей компании, который знает текущий статус и несёт ответственность за результат. Все остальные — исполнители в его зоне."
        },
        {
          "type": "image",
          "url": "/afa-3.JPG",
          "alt": "Зал конференции AFA в Шарм-эль-Шейхе: рассадка «класс», экраны и драпировка потолка",
          "caption": "Конференция AFA в Шарм-эль-Шейхе: зал, свет, экраны и рассадка — результат согласованного райдера и инспекции, а не фотографий из брошюры отеля"
        },
        {
          "type": "heading",
          "text": "Какие документы и разрешения нужны за границей",
          "level": 2
        },
        {
          "type": "paragraph",
          "text": "Документальная часть зарубежного мероприятия делится на два потока: документы участников и документы самого события. Первый поток заказчик знает и по домашним проектам, второй за рубежом часто становится сюрпризом."
        },
        {
          "type": "heading",
          "text": "Визы и страховки участников",
          "level": 3
        },
        {
          "type": "paragraph",
          "text": "Визовые условия зависят от паспорта участника и региона проведения: для Шарм-эль-Шейха и Каира они различаются, и первое, что делает принимающая сторона, — сверяет список группы с актуальными правилами въезда. Заказчик собирает паспортные данные и анкеты, агентство ведёт ростер, принимающая компания готовит визовую поддержку и подтверждения размещения, если они требуются. Медицинская страховка должна действовать в стране проведения и покрывать активности программы: день на яхте, вечер в пустыне или погружение — это не «отдых в отеле»."
        },
        {
          "type": "heading",
          "text": "Пермиты на площадки, съёмку и мероприятия в охраняемых зонах",
          "level": 3
        },
        {
          "type": "paragraph",
          "text": "В Египте мероприятие или съёмка на плато Гизы, в музеях и историческом Каире проходят только по разрешению. Пермит оформляется на конкретную дату, локацию, число гостей и формат — и запросить его может только лицензированная местная компания. Заказчику важно понимать три вещи: разрешение запрашивается заранее и на основании сценария; изменение формата после выдачи пермита означает новое согласование; съёмка — отдельное разрешение, которое не входит в «аренду площадки»."
        },
        {
          "type": "list",
          "items": [
            "Список участников с паспортными данными — для виз, размещения и пропусков на площадки",
            "Сценарий и тайминг мероприятия — на его основании оформляются пермиты на охраняемые зоны",
            "Перечень техники и декора, которые ввозятся или монтируются на площадке",
            "Задание на фото- и видеосъёмку: локации, оборудование, использование дронов",
            "Реквизиты и доверенности для договоров с отелем и площадками",
            "Диетические и медицинские анкеты участников — для кейтеринга и страховки"
          ]
        },
        {
          "type": "callout",
          "variant": "info",
          "title": "Язык документов",
          "text": "Договоры с египетскими площадками и подрядчиками, разрешения и счета существуют на арабском. Принимающая сторона должна выдавать заказчику документацию на английском и арабском — и отвечать за то, что версии совпадают. Это не формальность: именно по этим документам бухгалтерия заказчика закроет проект."
        },
        {
          "type": "heading",
          "text": "Инспекция площадки: зачем ехать и что проверять",
          "level": 2
        },
        {
          "type": "paragraph",
          "text": "Фотографии отеля и планы залов показывают, как площадка выглядит. Инспекция показывает, как она работает. Принимающая сторона проводит её вместе с руководителем проекта от заказчика или агентства, и на выходе появляется не «впечатление», а документ: схема залов с размерами, список ограничений и решение по каждому спорному пункту."
        },
        {
          "type": "paragraph",
          "text": "На конференции Carlsberg на 1000 человек в Domina Coral Bay инспекция касалась не только главного зала. Тысяча гостей — это потоки: регистрация, кофе-брейки, рассадка на гала-ужине, движение автобусов, работа хостес. Каждый поток проверяется ногами — где образуется очередь, сколько занимает переход, откуда заезжает техника."
        },
        {
          "type": "list",
          "items": [
            "Залы: реальные размеры, высота потолка, колонны, точки подвеса для света и экранов, нагрузка на пол",
            "Электрика: мощность, расположение вводов, отдельные линии под сцену и кухню кейтеринга",
            "Монтаж: грузовой въезд, размеры дверей и лифтов, время, с которого отель пускает на монтаж",
            "Интернет: выделенный канал под трансляцию и регистрацию, а не гостевой Wi-Fi",
            "Потоки гостей: путь от номера до зала, регистрация, кофе-брейки, эвакуационные выходы",
            "Open-air зоны: ветер, солнце, освещение после заката, шумовые ограничения отеля",
            "Кухня и кейтеринг: дегустация, возможности по диетам, время подачи для больших групп",
            "Резервные помещения: куда переносится программа при дожде, ветре или ремонте в зале"
          ]
        },
        {
          "type": "callout",
          "variant": "warning",
          "title": "Что не видно на фотографиях",
          "text": "Колонна посреди зала, низкий потолок, единственный грузовой лифт, чужая свадьба в соседнем зале в тот же вечер. Всё это выясняется только на площадке — и только до подписания договора с отелем, пока ещё можно поменять зал или даты."
        },
        {
          "type": "heading",
          "text": "Технический райдер и локальные подрядчики",
          "level": 2
        },
        {
          "type": "paragraph",
          "text": "Технический райдер переводит замысел в требования: сцена, экраны, звук, свет, синхронный перевод, трансляция, электропитание. Его составляет агентство, а принимающая сторона отвечает на главный вопрос: чем каждая позиция обеспечивается на месте. Что даёт отель, что привозит локальный подрядчик, что нужно везти с собой — и какие разрешения потребуются на ввоз."
        },
        {
          "type": "paragraph",
          "text": "Локальные подрядчики — зона ответственности принимающей стороны, и это закрепляется в договоре. Заказчику не нужно знать имя монтажника, но нужно знать, что за звук отвечает та же компания, которая отвечает за всё остальное. Райдер согласовывается письменно, со схемами и списком оборудования, а не «по телефону». Инструкции для монтажных бригад в Египте готовятся на арабском."
        },
        {
          "type": "image",
          "url": "/carlsberg-5.JPG",
          "alt": "Монтаж LED-экрана и звукового оборудования в конференц-зале перед мероприятием",
          "caption": "Монтаж перед конференцией: экран, свет и звук ставятся по согласованной схеме, а не по памяти. Прогон с трансляцией и переводом проходит до того, как в зал войдёт первый гость"
        },
        {
          "type": "list",
          "items": [
            "Схема сцены и зала с размерами и точками подвеса",
            "Список оборудования по позициям с указанием, кто его предоставляет",
            "Электропитание: мощность, фазы, разъёмы и переходники",
            "Расписание монтажа, прогона и демонтажа, согласованное с отелем",
            "Резерв ключевых позиций: микрофоны, медиасервер, ноутбук спикера",
            "Ответственный техник на всё время события, а не только на настройку"
          ]
        },
        {
          "type": "heading",
          "text": "Договоры и этапность оплаты",
          "level": 2
        },
        {
          "type": "paragraph",
          "text": "Организация корпоративного мероприятия за рубежом держится на трёх уровнях договоров: заказчик — агентство, агентство — принимающая сторона, принимающая сторона — отели, площадки и подрядчики. Для заказчика удобна модель, в которой он подписывает один договор с одним исполнителем, а всю цепочку ниже исполнитель держит сам. Когда агентство и принимающая сторона — одна компания, так и происходит."
        },
        {
          "type": "paragraph",
          "text": "Оплата строится по вехам, а не по календарю: аванс закрепляет даты и блок номеров, следующие платежи привязаны к подтверждениям от отеля и подрядчиков, финальный расчёт — к сверке после мероприятия. Доли и сроки зависят от проекта, но принцип один: каждый платёж что-то фиксирует, и заказчик получает подтверждение этого до перевода."
        },
        {
          "type": "table",
          "headers": [
            "Что должно быть в договоре",
            "Зачем"
          ],
          "rows": [
            [
              "Перечень услуг по позициям",
              "Чтобы у «полного цикла» были границы, а «дополнительно» не появлялось в финальном счёте"
            ],
            [
              "Ростер и дедлайн изменений",
              "Отель и авиакомпания живут по своим срокам; после дедлайна каждое имя — отдельное согласование"
            ],
            [
              "Условия отмены и сокращения группы",
              "Правила отелей и площадок в стране проведения отличаются от привычных"
            ],
            [
              "Форс-мажор и план Б",
              "Кто и как принимает решение о переносе и что считается основанием"
            ],
            [
              "Язык договора и документов",
              "Английский плюс арабский для площадок; какая версия имеет силу"
            ],
            [
              "Ответственный руководитель проекта",
              "Имя, телефон, часы доступности — одна точка ответственности"
            ]
          ],
          "caption": "Минимальный состав договора с принимающей стороной. Суммы и доли платежей — предмет переговоров, структура — нет"
        },
        {
          "type": "callout",
          "variant": "info",
          "title": "Что попросить до подписания",
          "text": "Подтверждение бронирования от отеля напрямую, копии лицензий принимающей стороны, примеры пермитов на аналогичные площадки, контакты duty-office. Компания, которая работает легально и давно, показывает это без задержки."
        },
        {
          "type": "heading",
          "text": "План Б: погода, логистика, люди",
          "level": 2
        },
        {
          "type": "paragraph",
          "text": "Зарубежное мероприятие живёт в реальной среде: в Шарм-эль-Шейхе к вечеру поднимается ветер, в Каире летом жарко уже с утра, рейс может задержаться, а ключевой спикер — заболеть. План Б — это не «что-нибудь придумаем», а заранее согласованные и оплаченные резервы с порогом принятия решения и человеком, который это решение принимает."
        },
        {
          "type": "list",
          "items": [
            "Open-air формат: закрытый резервный зал в том же отеле и время, до которого принимается решение о переносе",
            "Уличные программы в Каире и на плато Гизы: ранний старт летом, тень и вода на каждой точке, сокращённый маршрут в запасе",
            "Трансферы: резервный транспорт на маршруте, свои водители, VIP-встреча и fast-track в аэропорту на случай задержки рейса",
            "Люди: дублёр на каждую ключевую роль — ведущий, звукорежиссёр, руководитель площадки",
            "Техника: резервный комплект микрофонов, медиасервера и питания на площадке, а не на складе подрядчика",
            "Медицина: ближайшая клиника, контакты страховой, человек, который сопровождает гостя"
          ]
        },
        {
          "type": "image",
          "url": "/nl-6.jpg",
          "alt": "Деловая сессия корпоративного выезда NL International: сцена, LED-экран и дублирующий экран в зале",
          "caption": "Семидневный выезд NL International в Park Regency: деловая программа в зале и вечерние форматы под открытым небом. Для каждого open-air вечера резервная площадка согласуется заранее"
        },
        {
          "type": "heading",
          "text": "Коммуникация: одна точка ответственности и duty-office 24/7",
          "level": 2
        },
        {
          "type": "paragraph",
          "text": "Большинство срывов за границей происходит не из-за нехватки ресурсов, а из-за разрыва в коммуникации: заказчик договорился с отелем, отель не сказал подрядчику, подрядчик приехал не в то время. Рабочая модель проста: один руководитель проекта со стороны заказчика, один — со стороны исполнителя, общий рабочий чат и единый документ с таймингом, который обновляется в одном месте."
        },
        {
          "type": "comparison",
          "title": "Как устроена коммуникация",
          "left": {
            "title": "ПРОЕКТ СОРВЁТСЯ",
            "items": [
              "Заказчик пишет отелю, агентству и подрядчикам параллельно",
              "Тайминг живёт в пяти версиях в разных переписках",
              "На площадке никто не знает, кто принимает решение",
              "Инструкции подрядчикам передаются устно и на английском",
              "Ночью и в выходные связаться не с кем"
            ]
          },
          "right": {
            "title": "ПРОЕКТ СРАБОТАЕТ",
            "items": [
              "Одна точка ответственности со стороны исполнителя",
              "Единый run-sheet на двух языках с одним владельцем",
              "Порядок эскалации: кто решает и в какие сроки",
              "Письменные инструкции подрядчикам на арабском, со схемами",
              "Duty-office 24/7 на всё время мероприятия"
            ]
          }
        },
        {
          "type": "stat",
          "number": "24/7",
          "label": "duty-office принимающей стороны работает круглосуточно на всё время мероприятия: один номер, по которому решается любой вопрос — от опоздавшего трансфера до замены микрофона"
        },
        {
          "type": "heading",
          "text": "Контроль на месте: день мероприятия",
          "level": 2
        },
        {
          "type": "paragraph",
          "text": "Команда принимающей стороны выходит на площадку раньше гостей: монтаж, приёмка залов по чек-листу, прогон со звуком, светом, трансляцией и переводом. В день мероприятия у каждого потока свой координатор — регистрация, зал, кейтеринг, трансферы, вечерняя программа, — и все они выходят на одного руководителя площадки. Заказчик видит одного человека и получает статусы, а не проблемы."
        },
        {
          "type": "paragraph",
          "text": "Отклонения неизбежны, важно, как они обрабатываются. Задержался автобус — гостей встречает координатор, программа сдвигается по заранее согласованному сценарию. Вышел из строя микрофон — резерв уже на сцене. Ни одно из этих решений не требует звонка заказчику: он узнаёт о них из отчёта, а не в момент кризиса."
        },
        {
          "type": "heading",
          "text": "Разбор после мероприятия",
          "level": 2
        },
        {
          "type": "paragraph",
          "text": "Проект заканчивается не отъездом гостей, а закрытием: сверка счетов отеля и подрядчиков с договором, акты и документы на английском и арабском, передача фото- и видеоматериалов с правами на использование, обратная связь от участников. И короткий разбор с принимающей стороной: что сработало, что пришлось менять на ходу и что заложить в следующий проект."
        },
        {
          "type": "list",
          "items": [
            "Сверка финального счёта с договором и ростером — построчно",
            "Пакет закрывающих документов на нужных языках",
            "Фото, видео и материалы съёмки с правами и разрешениями",
            "Отчёт о ходе мероприятия: отклонения от сценария и принятые решения",
            "Рекомендации для следующего выезда: площадка, сезон, формат"
          ]
        },
        {
          "type": "divider"
        },
        {
          "type": "heading",
          "text": "Что спросить у принимающей стороны до старта",
          "level": 2
        },
        {
          "type": "list",
          "ordered": true,
          "items": [
            "Кто именно будет руководителем нашего проекта и как с ним связаться в любое время?",
            "Какие договоры с отелями и площадками у вас прямые, а какие — через посредников?",
            "Какие разрешения потребуются для нашей программы и кто их оформляет?",
            "Кто отвечает за локальных подрядчиков и как согласуется технический райдер?",
            "Как устроен план Б для уличных форматов и логистики?",
            "Какие документы мы получим на выходе и на каких языках?"
          ]
        },
        {
          "type": "paragraph",
          "text": "La Royal Event работает в Египте с 2004 года как MICE-агентство и DMC полного цикла: собственная команда в Каире и Шарм-эль-Шейхе, прямые контракты с отелями, судовладельцами и площадками, разрешения на мероприятия и съёмку в охраняемых зонах, гиды-египтологи на русском и английском, трансферы со своими водителями, кейтеринг, декор, техника и duty-office 24/7. Если вы планируете выездное корпоративное мероприятие в Каире или Шарм-эль-Шейхе, начните с разговора о модели работы — мы предложим схему ответственности под ваш проект до того, как будет подписан первый договор."
        }
      ]
    },
    "en": {
      "title": "Organizing a Corporate Event Abroad: How to Work With a Local DMC So Nothing Falls Through",
      "category": "Business Events",
      "date": "September 17, 2026",
      "excerpt": "Who does what at a corporate event abroad: permits and visas, site inspection, the tech rider, contracts, plan B and on-site control when working with a DMC.",
      "links": [
          {
            "path": "/dmc",
            "label": "Our DMC in Egypt"
          },
          {
            "path": "/services",
            "label": "Services: conferences, incentives, delegations"
          },
          {
            "path": "/portfolio",
            "label": "Case studies"
          },
          {
            "path": "/contact",
            "label": "Discuss your event"
          }
        ],
        "content": [
        {
          "type": "paragraph",
          "text": "A corporate event abroad differs from a home project in one fundamental way: you cannot simply drive over and take a look. The venue, the contractors, the permits, the drivers and the kitchen are all in another country, another time zone and, more often than not, another language. So the central question of organizing an event overseas is not what to do but who owns each piece, and how to structure the work with a local DMC so that every task has a name attached to it."
        },
        {
          "type": "paragraph",
          "text": "We have already published a month-by-month preparation checklist. This article is about the operating model instead: how responsibility is split between the client, the agency and the destination management company, which documents and permits you will need abroad, why a site inspection is non-negotiable, how contracts and payment stages are structured, and what actually happens on the ground on event day. The examples come from Egypt, from Cairo and Sharm El Sheikh, where we act as the receiving party."
        },
        {
          "type": "heading",
          "text": "A corporate event abroad has three parties and one point of accountability",
          "level": 2
        },
        {
          "type": "paragraph",
          "text": "Destination event planning involves three parties. The client sets the goals, approves the budget and owns the content: the program, the speakers, the guest list. The agency turns those goals into a project: concept, script, production, coordination. The DMC, the destination management company, is the receiving party in the host country. It holds the contracts with hotels and venues, the licenses needed to obtain permits, and its own drivers, guides and contractors."
        },
        {
          "type": "table",
          "headers": [
            "Area",
            "Client",
            "Agency",
            "DMC (receiving party)"
          ],
          "rows": [
            [
              "Goals and program",
              "Sets the brief, approves content and speakers",
              "Writes the script and timing, directs the show",
              "Adapts the script to the venue and local rules"
            ],
            [
              "Participants",
              "Collects the list, passport data and questionnaires",
              "Manages the roster and guest communication",
              "Visa support, rooming, airport meet-and-greet"
            ],
            [
              "Venue and hotel",
              "Approves the choice",
              "Builds the shortlist and requirements",
              "Books on direct contracts, manages the hotel before and during the event"
            ],
            [
              "Documents and permits",
              "Provides data and authorizations",
              "Assembles the package, tracks deadlines",
              "Obtains permits for venues, filming and protected sites"
            ],
            [
              "Technical and decor",
              "Approves the rider and visuals",
              "Writes the technical rider",
              "Sources local contractors, builds, runs the rehearsal"
            ],
            [
              "Logistics",
              "Provides flight schedules",
              "Designs the movement plan",
              "Transfers with in-house drivers, fast-track, escort"
            ],
            [
              "On site",
              "Makes program decisions",
              "Project lead on the floor",
              "Duty office 24/7, coordinators, contractor liaison"
            ]
          ],
          "caption": "How responsibility is split when organizing an event overseas. Every row should end in a name and a phone number, not a company name"
        },
        {
          "type": "paragraph",
          "text": "The agency and the DMC can be the same company; that is how we work in Egypt, with our own team in Cairo and Sharm El Sheikh, direct contracts with hotels, ship owners and venues, and no subcontracting of the event itself. But even when the two are separate, the client needs a single point of accountability: one person who owns the whole project and deals with the hotel, the contractors and the permits personally. The moment the client has to call the hotel directly, the model is already broken."
        },
        {
          "type": "callout",
          "variant": "warning",
          "title": "The one rule",
          "text": "Every task has exactly one owner. Not 'the hotel promised' or 'the contractor said', but a named person on the DMC side who knows the current status and answers for the result. Everyone else is a supplier within that person's area."
        },
        {
          "type": "image",
          "url": "/afa-3.JPG",
          "alt": "AFA conference hall in Sharm El Sheikh: classroom seating, screens and a draped ceiling",
          "caption": "AFA conference in Sharm El Sheikh: the hall, the light, the screens and the seating come out of an agreed rider and a site inspection, not out of the hotel brochure"
        },
        {
          "type": "heading",
          "text": "Documents and permits you will need abroad",
          "level": 2
        },
        {
          "type": "paragraph",
          "text": "The paperwork of an international event runs in two streams: documents for the participants and documents for the event itself. Clients know the first stream from their home projects; the second is where overseas surprises live."
        },
        {
          "type": "heading",
          "text": "Visas and insurance for participants",
          "level": 3
        },
        {
          "type": "paragraph",
          "text": "Entry rules depend on the passport of each participant and on the region: for Sharm El Sheikh and Cairo they differ, and the first thing a DMC does is check the group list against the current regulations. The client collects passport data and questionnaires, the agency keeps the roster, the receiving party prepares visa support and accommodation confirmations where required. Medical insurance must be valid in the host country and cover the actual program: a yacht day, a desert evening or a dive are not a stay at the hotel."
        },
        {
          "type": "heading",
          "text": "Permits for venues, filming and protected sites",
          "level": 3
        },
        {
          "type": "paragraph",
          "text": "In Egypt, an event or a shoot on the Giza Plateau, in a museum or in historic Cairo happens only with a permit. It is issued for a specific date, location, headcount and format, and only a licensed local company can apply for it. Three things matter to the client here: the permit is requested in advance and on the basis of the script; changing the format after the permit is issued means a new approval; and filming is a separate permit that is not part of renting the venue."
        },
        {
          "type": "list",
          "items": [
            "Participant list with passport data, for visas, rooming and site access",
            "Event script and timing, which is the basis for permits in protected zones",
            "Inventory of equipment and decor being imported or installed at the venue",
            "Photo and video brief: locations, equipment, drone use",
            "Company details and authorizations for contracts with the hotel and venues",
            "Dietary and medical questionnaires, for catering and insurance"
          ]
        },
        {
          "type": "callout",
          "variant": "info",
          "title": "The language of the paperwork",
          "text": "Contracts with Egyptian venues and suppliers, permits and invoices exist in Arabic. The DMC should issue the client documentation in English and Arabic and take responsibility for the two versions matching. This is not a formality: these are the documents your finance team will use to close the project."
        },
        {
          "type": "heading",
          "text": "Site inspection: why you go and what you check",
          "level": 2
        },
        {
          "type": "paragraph",
          "text": "Hotel photos and floor plans show what a venue looks like. An inspection shows how it works. The DMC walks it together with the project lead from the client or the agency, and the output is not an impression but a document: hall drawings with real dimensions, a list of constraints and a decision on every disputed point."
        },
        {
          "type": "paragraph",
          "text": "At the Carlsberg conference for 1,000 participants at Domina Coral Bay, the inspection was never only about the main hall. A thousand guests are flows: registration, coffee breaks, gala dinner seating, bus movements, hostess positions. Each flow is checked on foot: where the queue forms, how long the walk takes, where the equipment comes in."
        },
        {
          "type": "list",
          "items": [
            "Halls: real dimensions, ceiling height, columns, rigging points for light and screens, floor load",
            "Power: capacity, location of feeds, separate lines for the stage and the catering kitchen",
            "Load-in: service entrance, door and lift sizes, the hour the hotel allows the build to start",
            "Internet: a dedicated line for streaming and registration, not the guest Wi-Fi",
            "Guest flows: room to hall, registration, coffee breaks, emergency exits",
            "Open-air areas: wind, sun, lighting after sunset, the hotel noise curfew",
            "Kitchen and catering: tasting, dietary options, service time for large groups",
            "Backup rooms: where the program moves in case of rain, wind or works in the hall"
          ]
        },
        {
          "type": "callout",
          "variant": "warning",
          "title": "What photos never show",
          "text": "A column in the middle of the hall, a low ceiling, a single service lift, a wedding in the next room on the same night. All of this surfaces only on site, and only before the hotel contract is signed, while the hall or the dates can still be changed."
        },
        {
          "type": "heading",
          "text": "The technical rider and local contractors",
          "level": 2
        },
        {
          "type": "paragraph",
          "text": "The technical rider translates the idea into requirements: stage, screens, sound, light, simultaneous interpretation, streaming, power. The agency writes it; the DMC answers the key question of how each line is delivered on site. What the hotel provides, what a local contractor brings, what has to travel with the group, and which import permits that requires."
        },
        {
          "type": "paragraph",
          "text": "Local contractors are the DMC's responsibility, and the contract should say so. The client does not need the name of the rigger, but does need to know that the company answering for everything else also answers for the sound. The rider is agreed in writing, with drawings and an equipment list, not over the phone. In Egypt, instructions for the build crews are prepared in Arabic."
        },
        {
          "type": "image",
          "url": "/carlsberg-5.JPG",
          "alt": "LED wall and sound equipment being installed in a conference hall before an event",
          "caption": "Build day before a conference: screen, light and sound go up according to the agreed drawing, not from memory. The full rehearsal with streaming and interpretation happens before the first guest walks in"
        },
        {
          "type": "list",
          "items": [
            "Stage and hall drawing with dimensions and rigging points",
            "Equipment list by line item, stating who supplies each one",
            "Power: capacity, phases, connectors and adapters",
            "Build, rehearsal and strike schedule agreed with the hotel",
            "Backup for critical items: microphones, media server, speaker laptop",
            "A named technician for the whole event, not just for the setup"
          ]
        },
        {
          "type": "heading",
          "text": "Contracts and payment stages",
          "level": 2
        },
        {
          "type": "paragraph",
          "text": "Working with a DMC means three layers of contracts: client to agency, agency to DMC, DMC to hotels, venues and suppliers. The convenient model for the client is one contract with one provider, with the provider holding the entire chain below. When the agency and the DMC are the same company, that is exactly what happens."
        },
        {
          "type": "paragraph",
          "text": "Payments follow milestones rather than the calendar: a deposit secures the dates and the room block, the following payments are tied to confirmations from the hotel and the suppliers, and the final settlement follows the post-event reconciliation. The shares and timing depend on the project, but the principle is constant: every payment locks something in, and the client sees proof of it before the transfer."
        },
        {
          "type": "table",
          "headers": [
            "What the contract must include",
            "Why"
          ],
          "rows": [
            [
              "Itemized list of services",
              "So that full service has boundaries and nothing extra appears on the final invoice"
            ],
            [
              "Roster and change deadline",
              "Hotels and airlines run on their own deadlines; after the cutoff every name is a separate approval"
            ],
            [
              "Cancellation and attrition terms",
              "Hotel and venue terms in the host country differ from what you are used to"
            ],
            [
              "Force majeure and plan B",
              "Who decides on a change of plan, how, and what counts as grounds"
            ],
            [
              "Language of the contract and documents",
              "English plus Arabic for venues; which version prevails"
            ],
            [
              "Named project lead",
              "Name, phone, hours of availability: the single point of accountability"
            ]
          ],
          "caption": "The minimum content of a contract with a DMC. Amounts and payment shares are negotiable; the structure is not"
        },
        {
          "type": "callout",
          "variant": "info",
          "title": "Ask for this before you sign",
          "text": "A booking confirmation from the hotel itself, copies of the DMC's licenses, examples of permits for similar venues, and the duty office contacts. A company that has been operating legally for years produces these without delay."
        },
        {
          "type": "heading",
          "text": "Plan B: weather, logistics, people",
          "level": 2
        },
        {
          "type": "paragraph",
          "text": "An event abroad lives in a real environment. In Sharm El Sheikh the wind picks up in the evening, in Cairo the summer heat starts early in the morning, a flight can be delayed and a keynote speaker can fall ill. Plan B is not a promise to figure something out, but reserves that are agreed and paid for in advance, with a decision threshold and a person who makes the call."
        },
        {
          "type": "list",
          "items": [
            "Open-air formats: an indoor backup room in the same hotel and a cutoff time for the decision to move",
            "Outdoor programs in Cairo and on the Giza Plateau: early start in summer, shade and water at every stop, a shortened route in reserve",
            "Transfers: backup vehicles on the route, in-house drivers, VIP meet-and-greet and fast-track at the airport in case of flight delays",
            "People: an understudy for every critical role, from the host to the sound engineer to the floor manager",
            "Equipment: a backup set of microphones, media server and power on site, not in the supplier warehouse",
            "Medical: the nearest clinic, the insurer hotline, a person who accompanies the guest"
          ]
        },
        {
          "type": "image",
          "url": "/nl-6.jpg",
          "alt": "Business session at the NL International corporate retreat: stage, LED screen and a relay screen in the hall",
          "caption": "The seven-day NL International retreat at Park Regency: business sessions in the hall and evening formats outdoors. For every open-air evening, the backup venue is agreed in advance"
        },
        {
          "type": "heading",
          "text": "Communication: one point of accountability and a 24/7 duty office",
          "level": 2
        },
        {
          "type": "paragraph",
          "text": "Most failures abroad come not from a lack of resources but from a gap in communication: the client agreed something with the hotel, the hotel did not tell the contractor, the contractor arrived at the wrong hour. The working model is simple. One project lead on the client side, one on the provider side, a shared working chat and a single run sheet that is updated in one place only."
        },
        {
          "type": "comparison",
          "title": "How the communication is set up",
          "left": {
            "title": "IT FALLS THROUGH",
            "items": [
              "The client writes to the hotel, the agency and the contractors in parallel",
              "The timing exists in five versions across different threads",
              "Nobody on site knows who makes the decision",
              "Contractor instructions are passed on verbally and in English",
              "Nobody answers at night or on weekends"
            ]
          },
          "right": {
            "title": "IT HOLDS",
            "items": [
              "A single point of accountability on the provider side",
              "One bilingual run sheet with one owner",
              "An escalation path: who decides and how fast",
              "Written instructions to contractors in Arabic, with drawings",
              "A duty office working 24/7 for the whole event"
            ]
          }
        },
        {
          "type": "stat",
          "number": "24/7",
          "label": "the DMC duty office runs around the clock for the entire event: one number that resolves any issue, from a late transfer to a microphone swap"
        },
        {
          "type": "heading",
          "text": "On-site control: event day",
          "level": 2
        },
        {
          "type": "paragraph",
          "text": "The DMC team is on site before the guests: build, hall acceptance against a checklist, full rehearsal with sound, light, streaming and interpretation. On event day every flow has its own coordinator, from registration and the hall to catering, transfers and the evening program, and all of them report to one floor manager. The client sees one person and receives status updates, not problems."
        },
        {
          "type": "paragraph",
          "text": "Deviations are inevitable; what matters is how they are handled. A bus is late: a coordinator meets the guests and the program shifts according to a scenario agreed in advance. A microphone fails: the backup is already on stage. None of these decisions requires a call to the client, who learns about them from the report rather than in the middle of a crisis."
        },
        {
          "type": "heading",
          "text": "The post-event review",
          "level": 2
        },
        {
          "type": "paragraph",
          "text": "The project ends not when the guests leave but when it is closed: hotel and supplier invoices reconciled against the contract, closing documents in English and Arabic, photo and video handed over with usage rights, participant feedback collected. And a short review with the DMC: what worked, what had to change on the fly, and what to build into the next project."
        },
        {
          "type": "list",
          "items": [
            "Line-by-line reconciliation of the final invoice against the contract and the roster",
            "A closing document package in the required languages",
            "Photo, video and shoot materials with rights and permits",
            "An event report: deviations from the script and the decisions taken",
            "Recommendations for the next trip: venue, season, format"
          ]
        },
        {
          "type": "divider"
        },
        {
          "type": "heading",
          "text": "What to ask a DMC before you start",
          "level": 2
        },
        {
          "type": "list",
          "ordered": true,
          "items": [
            "Who exactly will lead our project and how do we reach that person at any hour?",
            "Which hotel and venue contracts are direct and which go through intermediaries?",
            "Which permits will our program require and who obtains them?",
            "Who is responsible for local contractors and how is the technical rider agreed?",
            "How is plan B set up for outdoor formats and logistics?",
            "Which documents do we receive at the end and in which languages?"
          ]
        },
        {
          "type": "paragraph",
          "text": "La Royal Event has worked in Egypt since 2004 as a full-cycle MICE agency and DMC: an in-house team in Cairo and Sharm El Sheikh, direct contracts with hotels, ship owners and venues, permits for events and filming in protected sites, Russian- and English-speaking Egyptologist guides, transfers with our own drivers, catering, decor, technical production and a 24/7 duty office. If you are planning a corporate event abroad in Cairo or Sharm El Sheikh, start with a conversation about the operating model, and we will propose a responsibility scheme for your project before the first contract is signed."
        }
      ]
    }
  },
  // ───────────────────────────────────────────────────────────────────────
  {
    "id": "insentiv-tur-v-egipet",
    "datePublished": "2026-09-17",
    "image": "/nl-16.jpg",
    "ru": {
      "title": "Инсентив-тур в Египет: маршруты, сезон и программы, которые запоминаются",
      "category": "Корпоративная культура",
      "date": "17 сентября 2026",
      "excerpt": "Инсентив-тур в Египет: три маршрута по дням — Шарм, Каир и Нил, — сезон, размер группы, приватный доступ к пирамидам и что прислать в брифе.",
      "links": [
          {
            "path": "/programmy",
            "label": "Программы и квесты для групп"
          },
          {
            "path": "/cruises",
            "label": "Круизы по Нилу и дахабии"
          },
          {
            "path": "/dmc",
            "label": "Приватный доступ к пирамидам"
          },
          {
            "path": "/contact",
            "label": "Собрать маршрут под группу"
          }
        ],
        "content": [
        {
          "type": "paragraph",
          "text": "Инсентив-тур в Египет — это поездка, в которой за одну неделю умещаются три разные среды: Красное море, пустыня Синая и пять тысяч лет истории. Компания награждает лучших сотрудников или партнёров не отелем, а доступом: к рифу с борта своей яхты, к плато Гизы без других посетителей, к храму, куда большие суда не заходят. В этой статье — конкретика по направлению: когда ехать, как выстроить маршрут по дням в Шарм-эль-Шейхе, Каире и на Ниле, из чего собирается программа и что нужно прислать нам, чтобы получить её в ответ."
        },
        {
          "type": "paragraph",
          "text": "О том, чем мотивационная поездка отличается от корпоратива и как считать её эффект, мы писали отдельно. Здесь исходим из того, что решение принято, и разбираем только Египет."
        },
        {
          "type": "stat",
          "number": "20–100",
          "label": "гостей — расчётный размер группы для каждой из десяти авторских программ. Команды по пять человек, у каждого своя роль и свой предмет, без которого станция не решается"
        },
        {
          "type": "heading",
          "text": "Почему Египет подходит для инсентив-тура",
          "level": 2
        },
        {
          "type": "paragraph",
          "text": "Поощрительная поездка для сотрудников живёт впечатлениями, а не переездами. Египет выигрывает тем, что впечатления здесь лежат близко друг к другу: из отеля на Красном море за час можно оказаться в горах Синая, а между каирским отелем и пирамидами — дорога через город. Прямой перелёт из Москвы занимает около четырёх часов, и группа прилетает без потерянного дня на акклиматизацию."
        },
        {
          "type": "list",
          "items": [
            "Море: риф прямо от берега Шарм-эль-Шейха, яхты под приватный фрахт, снорклинг и первое погружение с инструктором для тех, кто никогда не нырял.",
            "Пустыня: горы Синая в часе езды от отелей, чай у бедуинов, лагерь, который зажигается в темноте, и небо, ради которого стоит выключить фары.",
            "История: плато Гизы, Большой Египетский музей, улица Аль-Муизз в старом Каире, храмы Луксора и Асуана — с гидами-египтологами на русском и английском.",
            "Инфраструктура: отели, где вся группа живёт под одной крышей, а конференц-зал, пляж и площадка для гала-вечера находятся в пяти минутах друг от друга."
          ]
        },
        {
          "type": "heading",
          "text": "Сезон: с октября по май и летнее правило",
          "level": 3
        },
        {
          "type": "paragraph",
          "text": "Основной сезон для инсентива в Египте — с октября по май: комфортная температура для уличных программ, прозрачное небо для вечера в пустыне, тёплое море. Дахабии Nour El Nil ходят по Нилу с сентября по май, и это хороший ориентир для речной части поездки. Лето не закрыто, но у него свои правила."
        },
        {
          "type": "callout",
          "variant": "warning",
          "title": "Летнее правило",
          "text": "С мая по сентябрь уличные программы стартуют рано утром или после четырёх. Летом мы не ставим Гизу в полдень ни за какие деньги: квест на плато выходит на рассвете, вечер в пустыне начинается по закату, а середина дня отдаётся морю, спа и залам с кондиционером."
        },
        {
          "type": "image",
          "url": "/ewa-25.jpg",
          "alt": "Команда на верхней палубе яхты в Красном море во время инсентив-тура в Шарм-эль-Шейхе",
          "caption": "Яхта под приватный фрахт — самый простой способ собрать всю группу в одном кадре. Наш проект для EWA product в Шарм-эль-Шейхе"
        },
        {
          "type": "heading",
          "text": "Три шаблона маршрута по дням",
          "level": 2
        },
        {
          "type": "paragraph",
          "text": "Ниже — три каркаса, с которых мы обычно начинаем разговор. Их можно соединять: Шарм плюс Каир — самая частая связка, Каир плюс Нил — самая насыщенная. Дни указаны без цен и без расписания по минутам: это карта, а не смета."
        },
        {
          "type": "heading",
          "text": "Шарм-эль-Шейх: «море и пустыня»",
          "level": 3
        },
        {
          "type": "paragraph",
          "text": "Формат для групп, которым нужен один отель на всю поездку и максимум времени на воздухе. Всё, кроме перелёта, происходит в радиусе часа от номера."
        },
        {
          "type": "table",
          "headers": [
            "День",
            "Что происходит"
          ],
          "rows": [
            [
              "День 1",
              "Прилёт, VIP-встреча и fast-track в аэропорту, трансфер своими водителями, заселение. Вечером — приветственный ужин на берегу без сцены и речей."
            ],
            [
              "День 2",
              "Свободное утро на пляже. После обеда — «Последняя запись археолога»: два с половиной часа в музее Шарм-эль-Шейха в вечерний заход, между морем и ужином."
            ],
            [
              "День 3",
              "«Ладья идёт за солнцем»: восемь часов на четырёхпалубной яхте под приватный фрахт. Половина группы уходит на риф со снорклингом или первым погружением, половина работает в штабе на борту. Возвращение в закат."
            ],
            [
              "День 4",
              "День без программы: спа, море, дайвинг для сертифицированных. Вечером — гала-ужин с награждением."
            ],
            [
              "День 5",
              "«Путь к звёздам»: выезд в горы Синая по закату, чай у бедуинов, лагерь в темноте, ужин под небом и своя звезда в телескопе у каждого."
            ],
            [
              "День 6",
              "Поздний завтрак, выезд, fast-track на вылете."
            ]
          ],
          "caption": "Шесть дней, один отель, два выезда за его пределы. Порядок дней меняется под даты и погоду"
        },
        {
          "type": "heading",
          "text": "Каир: «история и приватный доступ»",
          "level": 3
        },
        {
          "type": "paragraph",
          "text": "Формат для тех, кто уже видел пирамиды из окна автобуса и хочет провести с ними день, где надо думать. Ядро маршрута — плато Гизы до открытия или после закрытия для публики: только ваша группа, все три камеры Великой пирамиды и вход внутрь ограждения Сфинкса."
        },
        {
          "type": "table",
          "headers": [
            "День",
            "Что происходит"
          ],
          "rows": [
            [
              "День 1",
              "Прилёт в Каир, VIP-встреча, заселение. Вечером — «Последний кадр»: иммерсивный ужин из трёх подач на премьере 1959 года, где финал фильма выбирает зал. В Каире его можно провести на судне на Ниле целиком."
            ],
            [
              "День 2",
              "«Код пирамид»: четыре часа на плато Гизы с ранним стартом. Шесть команд, дневник археолога, в котором половина написанного — ложь, и ларец, который откроется только всем вместе."
            ],
            [
              "День 3",
              "«Последняя страница»: четыре часа в Большом Египетском музее. Группа становится редакцией каталога и ловит ошибки, глядя на оригиналы. Дополнительно — первая лодка Хуфу."
            ],
            [
              "День 4",
              "«Четыре руки, одно письмо»: улица Аль-Муизз, каллиграф, медник и чайная. Каждый пишет тушью одно слово, и во дворе из этих слов собирается письмо, последняя строка которого — про вашу компанию."
            ],
            [
              "День 5",
              "Приватный доступ к пирамидам. Утренний слот: выезд из отеля затемно, плато без других людей, панорамная площадка на рассвете, завтрак с видом на пирамиды. Или вечерний слот — после закрытия плато, в закатном свете. Вылет вечером или переезд в Шарм-эль-Шейх."
            ]
          ],
          "caption": "Пять дней в Каире. Приватный доступ ставим последним днём: после него любая обычная экскурсия выглядит бледно"
        },
        {
          "type": "image",
          "url": "/cruises/lumiere-island-dinner.webp",
          "alt": "Ужин у костра на острове Хербиаб во время приватного чартера по Нилу",
          "caption": "Приватный чартер Lumière: стоянка у острова Хербиаб и ужин у костра — вечер, который есть только у группы, идущей на своём судне"
        },
        {
          "type": "heading",
          "text": "Нил: «круиз как инсентив»",
          "level": 3
        },
        {
          "type": "paragraph",
          "text": "Круиз решает главную задачу инсентива без усилий: группа несколько дней живёт вместе, без переездов и чемоданов, а маршрут сам приводит к Карнаку, Долине Царей, Эдфу, Ком-Омбо и Филе. Три варианта — по размеру группы и характеру поездки."
        },
        {
          "type": "list",
          "items": [
            "Классический круиз Луксор — Асуан на 3, 4 или 7 ночей: Le Fayan Suites, где нет обычных кают, только сьюты с панорамными окнами, или Soleil — самое вместительное из наших судов с самым большим спа на Ниле. Формат для групп от 20 до 80 человек и больше.",
            "Приватный чартер Lumière: восемь кают, до 20 гостей, пять ночей Луксор — Асуан по вашему расписанию. Ночёвки у островов Фавза и Хербиаб, ужин у костра, приватные вечера в храмах. Формат для правления и ключевых партнёров.",
            "Дахабия Nour El Nil: парусная лодка на 16–24 гостя, шесть дней Эсна — Асуан. Стоянки у пустынных берегов и ночь у подсвеченного храма в Гебель-эль-Сильсила, куда большим судам нельзя. Для тех, кому нужен не маршрут, а ритм."
          ]
        },
        {
          "type": "table",
          "headers": [
            "День",
            "Приватный чартер Lumière, Луксор → Асуан"
          ],
          "rows": [
            [
              "День 1",
              "Прилёт в Луксор, посадка на судно. Карнак и Луксорский храм до заката, первый ужин на борту."
            ],
            [
              "День 2",
              "Долина Царей, храм Хатшепсут и Колоссы Мемнона с утра. Отход, ночёвка у острова Фавза."
            ],
            [
              "День 3",
              "Эдфу: храм Гора, подъезд на конных экипажах. Вечером — ужин у костра на острове Хербиаб."
            ],
            [
              "День 4",
              "Гебель-эль-Сильсила и Ком-Омбо: храм Собека на излучине реки. Вечер на солнечной палубе."
            ],
            [
              "День 5",
              "Асуан: остров Филе, нубийская деревня на лодках. Приватный вечер в храме и церемония награждения."
            ],
            [
              "День 6",
              "Высадка. По желанию — Абу-Симбел, затем вылет из Асуана."
            ]
          ],
          "caption": "Судно идёт по расписанию группы, поэтому остановки и вечера двигаются под программу"
        },
        {
          "type": "image",
          "url": "/cruises/dahabiya-sail-sunset.webp",
          "alt": "Дахабия Nour El Nil под парусом на закате — круиз по Нилу для небольшой группы",
          "caption": "Дахабия идёт под парусом: до 24 гостей, вся лодка под группу и шесть дней, в которые никто никуда не спешит"
        },
        {
          "type": "heading",
          "text": "Из чего складывается программа",
          "level": 2
        },
        {
          "type": "paragraph",
          "text": "Шаблон маршрута — это каркас. Программой он становится, когда в нём есть четыре элемента, и у каждого своя роль."
        },
        {
          "type": "list",
          "items": [
            "Гала-вечер с награждением. Кульминация поездки, ради которой её объявляли. В Шарме это площадка на берегу или на скале под открытым небом, в Каире — судно на Ниле, в круизе — верхняя палуба.",
            "Квест на настоящем месте. Одна из десяти авторских программ: плато, музей, улица, яхта или горы становятся полем игры, а гиды-египтологи рассказывают их подлинную историю. Роли в команде разные, и не все они про говорить: обычно к середине самые тихие гости оказываются самыми вовлечёнными.",
            "Свободный день. Инсентив — не конференция: минимум обязательного, максимум выбора. Один день без программы делает остальные сильнее.",
            "Финал, который остаётся. У каждой программы есть предмет, который гость увозит домой, и это не сувенир с логотипом."
          ]
        },
        {
          "type": "heading",
          "text": "Что остаётся после программы",
          "level": 3
        },
        {
          "type": "paragraph",
          "text": "Мы проектируем финал так, чтобы у него был физический след. Вот что увозят гости из разных программ:"
        },
        {
          "type": "list",
          "items": [
            "«Ладья идёт за солнцем» — именная печать с вашим именем египетскими знаками и съёмка с камер инструкторов.",
            "«Путь к звёздам» — именная карточка со «своей» звездой и подписью астронома.",
            "«Код пирамид» — восстановленный маршрут с фотографиями всех команд, письмо экспедиции и фрагмент солнечной печати каждому гостю.",
            "«Последняя страница» — вёрстка собранной последней страницы каталога с подписями всех команд и именем вашей компании в выходных данных.",
            "«Четыре руки, одно письмо» — карточка со своим словом, написанным тушью под рукой мастера, и копия собранного письма.",
            "«Последний кадр» — общий снимок с хлопушкой в рамке из киноплёнки, напечатанный к выходу, и имя в титрах."
          ]
        },
        {
          "type": "callout",
          "variant": "success",
          "title": "Правило финала",
          "text": "Ошибиться можно, остаться без финала нельзя — это правило записано в каждом сценарии отдельной строкой. Развязку услышат все, и предмет получит каждый гость, а не только команда-победитель."
        },
        {
          "type": "heading",
          "text": "Размер группы и логистика",
          "level": 2
        },
        {
          "type": "paragraph",
          "text": "Авторские программы рассчитаны на группы от 20 до 100 гостей. На приватный доступ к пирамидам действует ограничение — до 50 гостей на один пермит, поэтому большая группа делится на два слота, утренний и вечерний. На реке размер группы задаёт судно: Lumière берёт до 20 гостей, дахабия — до 24, Le Fayan Suites — до 74, Soleil — до 106."
        },
        {
          "type": "paragraph",
          "text": "Группы больше ста мы тоже возим, но это уже гибрид инсентива и конференции, где отель становится базой. Так был устроен семидневный выезд NL International на 300 участников в Park Regency: деловые сессии в конференц-залах, мастер-классы по йоге, визажу, танцам и живописи, тимбилдинг-квесты, вечер в стиле «Luxury Egypt» и «Белая вечеринка» на скале под открытым небом. Пятидневный выезд EWA product в Rixos Seagate соединил воркшопы, мастер-классы и тимбилдинг с вечерами на площадках Marlin и Space. А конференция Carlsberg на тысячу участников в Domina Coral Bay прошла с полным техническим продакшном — от логистики до финального гала-ужина."
        },
        {
          "type": "image",
          "url": "/ewa-21.jpg",
          "alt": "Большая группа в куфиях на фоне гор Синая — выезд в пустыню в рамках инсентив-тура",
          "caption": "Выезд в пустыню Синая: горы в часе езды от отелей Шарм-эль-Шейха. Наш проект для EWA product"
        },
        {
          "type": "heading",
          "text": "Что берём на себя",
          "level": 3
        },
        {
          "type": "list",
          "items": [
            "VIP-встреча и fast-track в аэропортах Каира и Шарм-эль-Шейха, трансферы по всему Египту своими водителями.",
            "Пермиты на плато Гизы, в музеях и историческом Каире, разрешения на съёмку и мероприятия в охраняемых зонах.",
            "Гиды-египтологи на русском и английском. Программы ведём на обоих языках одинаково, международной группе это подходит.",
            "Отели, суда и площадки по прямым контрактам — без субподрядчика между вами и исполнителем.",
            "Координация и duty-office 24/7 на всё время поездки."
          ]
        },
        {
          "type": "paragraph",
          "text": "На подготовку авторской программы нужно от четырёх до шести недель: разведка площадки, изготовление реквизита, персональные детали — имя компании, дата, факт из её истории. «Сокровища Ра» и «Фараон. Пропавшая экспедиция», которые мы привозим с декорациями в ваш зал, требуют восемь–десять недель на первый показ. Круиз и приватный доступ к пирамидам бронируются под конкретные даты, поэтому чем раньше известен месяц поездки, тем шире выбор."
        },
        {
          "type": "heading",
          "text": "Что прислать в брифе",
          "level": 2
        },
        {
          "type": "paragraph",
          "text": "Чтобы вернуться с маршрутом, а не с вопросами, нам нужны пять вещей:"
        },
        {
          "type": "list",
          "ordered": true,
          "items": [
            "Дата или месяц поездки — от этого зависит сезонная логика: стартуем ли на рассвете, ходит ли дахабия, свободно ли судно.",
            "Число гостей — оно задаёт судно, количество пермитов и формат гала-вечера.",
            "Отель, если он уже выбран, или город: Шарм-эль-Шейх, Каир, Луксор.",
            "Язык группы — русский, английский или оба.",
            "Цели поездки: кого награждаете, за что и какой момент должен стать главным. Из ответов на короткий вопросник мы собираем финал программы."
          ]
        },
        {
          "type": "callout",
          "variant": "info",
          "title": "Прогон без обязательств",
          "text": "Для тех, кто принимает решение, мы проводим сорокапятиминутный прогон одной станции выбранной программы. Без обязательств и без оплаты — чтобы вы увидели формат до того, как объявите поездку команде."
        },
        {
          "type": "divider"
        },
        {
          "type": "paragraph",
          "text": "La Royal Event работает в Египте с 2004 года: собственная команда в Каире и Шарм-эль-Шейхе, прямые контракты с отелями, судовладельцами и площадками, пермиты и гиды-египтологи — всё внутри одной компании. Напишите дату и число гостей — вернёмся с маршрутом по дням."
        }
      ]
    },
    "en": {
      "title": "Incentive Travel to Egypt: Itineraries, Seasons and Programs Teams Remember",
      "category": "Corporate Culture",
      "date": "September 17, 2026",
      "excerpt": "Incentive travel to Egypt: three day-by-day itineraries for Sharm El Sheikh, Cairo and the Nile, the best season, group sizes and what to put in your brief.",
      "links": [
          {
            "path": "/programmy",
            "label": "Programs and quests for groups"
          },
          {
            "path": "/cruises",
            "label": "Nile cruises and dahabiyas"
          },
          {
            "path": "/dmc",
            "label": "Private access to the pyramids"
          },
          {
            "path": "/contact",
            "label": "Build an itinerary for your group"
          }
        ],
        "content": [
        {
          "type": "paragraph",
          "text": "Incentive travel to Egypt works because three very different worlds sit within an hour of each other: the Red Sea, the Sinai desert and five thousand years of history. A company that rewards its best people here is not buying them a hotel; it is buying access. A reef from the deck of a private yacht. The Giza plateau with no other visitors on it. A temple that cruise ships cannot reach. This guide is about Egypt specifically: when to travel, how to build a day-by-day itinerary in Sharm El Sheikh, Cairo or on the Nile, what turns a route into a program, and what we need from you to send one back."
        },
        {
          "type": "paragraph",
          "text": "If you are still deciding whether an incentive trip is the right tool at all, we have covered formats and impact in a separate piece. Here we assume the decision is made and the only questions are where and how."
        },
        {
          "type": "stat",
          "number": "20–100",
          "label": "guests is the group size each of our ten signature programs is built for: teams of five, every member with a role and an object the team cannot solve the station without"
        },
        {
          "type": "heading",
          "text": "Why Egypt works for corporate incentive travel",
          "level": 2
        },
        {
          "type": "paragraph",
          "text": "An incentive trip lives on impressions, not transfers, and Egypt keeps its impressions close together. An hour from a Red Sea resort you are in the mountains of Sinai; from a Cairo hotel the pyramids are a drive across town. The group arrives without losing a day to recovery and spends its time in the water, in the desert or in front of a temple wall rather than on a coach."
        },
        {
          "type": "list",
          "items": [
            "Sea: house reefs straight off the shore in Sharm El Sheikh, private yacht charters, snorkelling and a first supervised dive for people who have never been under water.",
            "Desert: the Sinai mountains an hour from the hotels, tea with Bedouin hosts, a camp that lights up in the dark and a sky worth switching the headlights off for.",
            "History: the Giza plateau, the Grand Egyptian Museum, Al-Muizz Street in historic Cairo, the temples of Luxor and Aswan, all with Egyptologist guides working in English and Russian.",
            "Infrastructure: resorts where the whole group stays under one roof, with the conference hall, the beach and the gala venue a few minutes apart."
          ]
        },
        {
          "type": "heading",
          "text": "Season: October to May, and the summer rule",
          "level": 3
        },
        {
          "type": "paragraph",
          "text": "The main season for an incentive trip to Egypt runs from October to May: comfortable temperatures for outdoor programs, clear skies for a desert evening, warm sea. The Nour El Nil dahabiyas sail from September to May, which is a useful anchor for the river part of a trip. Summer is not off the table, but it has its own rules."
        },
        {
          "type": "callout",
          "variant": "warning",
          "title": "The summer rule",
          "text": "From May to September, outdoor programs start early in the morning or after four in the afternoon. We will not put a group on the Giza plateau at noon in summer at any price: the plateau quest starts at dawn, the desert evening starts at sunset, and the middle of the day belongs to the sea, the spa and air-conditioned halls."
        },
        {
          "type": "image",
          "url": "/ewa-25.jpg",
          "alt": "Corporate group on the upper deck of a private yacht in the Red Sea during an incentive trip to Sharm El Sheikh",
          "caption": "A privately chartered yacht is the easiest way to get the whole group into one frame. Our project for EWA product in Sharm El Sheikh"
        },
        {
          "type": "heading",
          "text": "Three itinerary templates, day by day",
          "level": 2
        },
        {
          "type": "paragraph",
          "text": "These are the three skeletons we usually open a conversation with. They combine well: Sharm El Sheikh plus Cairo is the most common pairing, Cairo plus the Nile the richest. Days are listed without prices and without a minute-by-minute schedule. This is a map, not a quote."
        },
        {
          "type": "heading",
          "text": "Sharm El Sheikh: sea and desert",
          "level": 3
        },
        {
          "type": "paragraph",
          "text": "For groups that want one hotel for the whole trip and as much time outdoors as possible. Everything except the flight happens within an hour of the room."
        },
        {
          "type": "table",
          "headers": [
            "Day",
            "What happens"
          ],
          "rows": [
            [
              "Day 1",
              "Arrival, VIP meet and greet with airport fast-track, transfer with our own drivers, check-in. A welcome dinner on the beach in the evening, with no stage and no speeches."
            ],
            [
              "Day 2",
              "A free morning on the beach. In the afternoon, The Archaeologist's Last Entry: two and a half hours in the Sharm El Sheikh museum on an evening slot, between the sea and dinner."
            ],
            [
              "Day 3",
              "The Barque Follows the Sun: eight hours on a privately chartered four-deck yacht. Half the group goes to the reef for snorkelling or a first dive, the other half runs the headquarters on board. The yacht turns for home straight into the sunset."
            ],
            [
              "Day 4",
              "A day with nothing scheduled: spa, sea, diving for certified divers. Gala dinner and awards in the evening."
            ],
            [
              "Day 5",
              "The Way to the Stars: departure for the Sinai mountains timed to the sunset, tea with Bedouin hosts, a camp in the dark, dinner under the sky and a star of their own in the telescope for every guest."
            ],
            [
              "Day 6",
              "Late breakfast, departure, fast-track at the airport."
            ]
          ],
          "caption": "Six days, one hotel, two outings beyond it. The order of days shifts with dates and weather"
        },
        {
          "type": "heading",
          "text": "Cairo: history and private access",
          "level": 3
        },
        {
          "type": "paragraph",
          "text": "For people who have already seen the pyramids through a bus window and want a day with them where they have to think. The core of this route is the Giza plateau before it opens or after it closes to the public: only your group, all three chambers of the Great Pyramid and access inside the Sphinx enclosure."
        },
        {
          "type": "table",
          "headers": [
            "Day",
            "What happens"
          ],
          "rows": [
            [
              "Day 1",
              "Arrival in Cairo, VIP meet and greet, check-in. In the evening, The Last Frame: a three-course immersive dinner set at a 1959 premiere, where the room votes on how the film ends. In Cairo it can take over a whole boat on the Nile."
            ],
            [
              "Day 2",
              "The Pyramid Code: four hours on the Giza plateau with an early start. Six teams, an archaeologist's diary in which half of what is written is a lie, and a chest that opens only when every team has done its part."
            ],
            [
              "Day 3",
              "The Last Page: four hours in the Grand Egyptian Museum. The group becomes the editorial board of a catalogue and catches the errors by looking at the originals. Optional extension: the first boat of Khufu."
            ],
            [
              "Day 4",
              "Four Hands, One Letter: Al-Muizz Street with a calligrapher, a coppersmith and a tea house. Every guest writes a single word in ink, and in a courtyard the words become a letter whose last line is about your company."
            ],
            [
              "Day 5",
              "Private access to the pyramids. Morning slot: leave the hotel in the dark, the plateau with nobody else on it, the panorama at sunrise, breakfast with a view of the pyramids. Or the evening slot after the plateau closes, in sunset light. Fly out in the evening or continue to Sharm El Sheikh."
            ]
          ],
          "caption": "Five days in Cairo. We put private access last: after it, any ordinary excursion looks pale"
        },
        {
          "type": "image",
          "url": "/cruises/lumiere-island-dinner.webp",
          "alt": "Dinner by the fire on Herbiab island during a private Nile charter",
          "caption": "Private charter on Lumière: a night moored at Herbiab island and dinner by the fire, an evening that only exists for a group travelling on its own boat"
        },
        {
          "type": "heading",
          "text": "The Nile: a cruise as the incentive",
          "level": 3
        },
        {
          "type": "paragraph",
          "text": "A cruise solves the central task of an incentive without effort. The group lives together for several days with no transfers and no suitcases, and the route itself delivers Karnak, the Valley of the Kings, Edfu, Kom Ombo and Philae. Three options, depending on group size and the character of the trip."
        },
        {
          "type": "list",
          "items": [
            "Classic cruise, Luxor to Aswan, 3, 4 or 7 nights: Le Fayan Suites, an all-suite ship with panoramic windows in every cabin, or Soleil, the largest ship in our fleet with the largest spa on the Nile. For groups from 20 to 80 and beyond.",
            "Private charter on Lumière: eight cabins, up to 20 guests, five nights from Luxor to Aswan on your own schedule. Nights moored at Fawza and Herbiab islands, dinner by the fire, private evenings in temples. For boards, key partners and executive retreats.",
            "A dahabiya from the Nour El Nil fleet: a twin-masted sailing boat for 16 to 24 guests, six days from Esna to Aswan. Stops on empty desert banks and a night beside the lit temple at Gebel el-Silsila, where large ships cannot go. For groups that need a rhythm more than a route."
          ]
        },
        {
          "type": "table",
          "headers": [
            "Day",
            "Private charter on Lumière, Luxor to Aswan"
          ],
          "rows": [
            [
              "Day 1",
              "Arrival in Luxor, embarkation. Karnak and Luxor Temple before sunset, first dinner on board."
            ],
            [
              "Day 2",
              "Valley of the Kings, the temple of Hatshepsut and the Colossi of Memnon in the morning. Departure, night moored at Fawza island."
            ],
            [
              "Day 3",
              "Edfu: the temple of Horus, approached by horse-drawn carriage. Dinner by the fire on Herbiab island."
            ],
            [
              "Day 4",
              "Gebel el-Silsila and Kom Ombo, the temple of Sobek on a bend in the river. Evening on the sun deck."
            ],
            [
              "Day 5",
              "Aswan: Philae and the Nubian village by boat. A private evening in a temple and the awards ceremony."
            ],
            [
              "Day 6",
              "Disembarkation. Abu Simbel as an option, then the flight out of Aswan."
            ]
          ],
          "caption": "The ship runs on the group's schedule, so stops and evenings move to fit the program"
        },
        {
          "type": "image",
          "url": "/cruises/dahabiya-sail-sunset.webp",
          "alt": "Nour El Nil dahabiya under sail at sunset, a Nile cruise for a small incentive group",
          "caption": "A dahabiya under sail: up to 24 guests, the whole boat for one group, and six days in which nobody hurries anywhere"
        },
        {
          "type": "heading",
          "text": "What turns an itinerary into a program",
          "level": 2
        },
        {
          "type": "paragraph",
          "text": "A template is a skeleton. It becomes a program when four elements are in place, each with its own job."
        },
        {
          "type": "list",
          "items": [
            "A gala evening with the awards. The climax the trip was announced for. In Sharm El Sheikh that means a venue on the beach or on a cliff under the open sky; in Cairo, a boat on the Nile; on a cruise, the sun deck.",
            "A quest in a real place. One of our ten signature programs turns the plateau, the museum, the street, the yacht or the mountains into the playing field, while Egyptologist guides tell the real history. Roles within a team differ, and not every role is about talking: by the halfway point the quietest guests are usually the most involved.",
            "A free day. An incentive is not a conference: the minimum of mandatory, the maximum of choice. One day with nothing scheduled makes the other days stronger.",
            "A finale that stays. Every program ends with an object the guest takes home, and it is not a branded pen."
          ]
        },
        {
          "type": "heading",
          "text": "What guests take home",
          "level": 3
        },
        {
          "type": "paragraph",
          "text": "We design each finale to leave a physical trace. This is what stays after some of the programs:"
        },
        {
          "type": "list",
          "items": [
            "The Barque Follows the Sun: a personal seal with the guest's name in Egyptian signs, plus footage from the instructors' cameras.",
            "The Way to the Stars: a personal card with a star of their own, signed by the astronomer.",
            "The Pyramid Code: the restored route with photographs of every team, the expedition letter and a fragment of the solar seal for each guest.",
            "The Last Page: the layout of the assembled last catalogue page with every team's captions and your company's name in the imprint.",
            "Four Hands, One Letter: a card with the guest's own word written in ink under the calligrapher's hand, and a copy of the assembled letter.",
            "The Last Frame: the group photo with the clapperboard, printed in a film-strip frame by the time guests leave, and their names in the credits."
          ]
        },
        {
          "type": "callout",
          "variant": "success",
          "title": "The finale rule",
          "text": "You can get it wrong, but you cannot be left without a finale; that line is written into every script. Everyone hears the resolution, and every guest receives the object, not just the winning team."
        },
        {
          "type": "heading",
          "text": "Group size and logistics",
          "level": 2
        },
        {
          "type": "paragraph",
          "text": "The signature programs are built for groups of 20 to 100 guests. Private access to the pyramids is limited to 50 guests per permit, so a larger group is split into two slots, morning and evening. On the river the ship sets the number: Lumière takes up to 20 guests, a dahabiya up to 24, Le Fayan Suites up to 74 and Soleil up to 106."
        },
        {
          "type": "paragraph",
          "text": "We also handle groups well above a hundred, but that becomes a hybrid of incentive and conference with the hotel as the base. That is how the seven-day NL International trip for 300 participants at Park Regency was built: business sessions in the conference halls, workshops in yoga, make-up, dance and fine art, team-building quests, a Luxury Egypt evening and a White Party on an open-air cliff. The five-day EWA product retreat at Rixos Seagate combined workshops, master classes and team building with evenings at the Marlin and Space venues. And the Carlsberg conference for 1,000 participants at Domina Coral Bay ran with full technical production from logistics through to the closing gala dinner."
        },
        {
          "type": "image",
          "url": "/ewa-21.jpg",
          "alt": "Large corporate group in keffiyehs against the Sinai mountains during a desert outing on an incentive trip",
          "caption": "A desert outing in Sinai: the mountains are an hour from the hotels of Sharm El Sheikh. Our project for EWA product"
        },
        {
          "type": "heading",
          "text": "What we take care of",
          "level": 3
        },
        {
          "type": "list",
          "items": [
            "VIP meet and greet with fast-track at Cairo and Sharm El Sheikh airports, transfers across Egypt with our own drivers.",
            "Permits for the Giza plateau, the museums and historic Cairo, plus filming and event permissions in protected areas.",
            "Egyptologist guides in English and Russian. Programs run identically in both languages, so a mixed international group is not a problem.",
            "Hotels, ships and venues under direct contracts, with no subcontractor between you and the people delivering the event.",
            "Coordination and a 24/7 duty office for the whole trip."
          ]
        },
        {
          "type": "paragraph",
          "text": "A signature program needs four to six weeks of preparation: a site survey, props, and the personal details, such as your company's name, the date and a fact from its history. Treasures of Ra and Pharaoh: The Lost Expedition, the two programs we bring with full sets into your hotel ballroom, need eight to ten weeks before the first show. Cruises and private pyramid access are booked against specific dates, so the earlier the month is known, the wider the choice."
        },
        {
          "type": "heading",
          "text": "What to put in your brief",
          "level": 2
        },
        {
          "type": "paragraph",
          "text": "To come back with an itinerary rather than a list of questions, we need five things:"
        },
        {
          "type": "list",
          "ordered": true,
          "items": [
            "The date or the month. It drives the seasonal logic: whether we start at dawn, whether the dahabiyas are sailing, whether the ship is free.",
            "The number of guests. It sets the ship, the number of permits and the format of the gala.",
            "The hotel, if it is already chosen, or the city: Sharm El Sheikh, Cairo or Luxor.",
            "The language of the group: English, Russian or both.",
            "The goals: who is being rewarded, for what, and which moment should be the main one. A short questionnaire on this is what we build the finale from."
          ]
        },
        {
          "type": "callout",
          "variant": "info",
          "title": "A run-through with no strings",
          "text": "For the people making the decision we run a forty-five-minute walkthrough of one station of the chosen program. No commitment and no charge, so you see the format before you announce the trip to the team."
        },
        {
          "type": "divider"
        },
        {
          "type": "paragraph",
          "text": "La Royal Event has worked in Egypt since 2004, with its own team in Cairo and Sharm El Sheikh, direct contracts with hotels, ship owners and venues, permits and Egyptologist guides all inside one company. Send us the date and the number of guests, and we will come back with a day-by-day itinerary."
        }
      ]
    }
  },
  // ───────────────────────────────────────────────────────────────────────
  {
    "id": "timbilding-v-egipte",
    "datePublished": "2026-09-17",
    "image": "/nl-14.jpg",
    "ru": {
      "title": "Тимбилдинг в Египте: 10 форматов от квеста на плато Гизы до регаты в Красном море",
      "category": "Корпоративная культура",
      "date": "17 сентября 2026",
      "excerpt": "Десять форматов тимбилдинга в Египте: авторские квесты на плато Гизы, в музеях и на яхте, сафари, мастер-классы. Для кого, где и какой уровень активности.",
      "links": [
          {
            "path": "/programmy",
            "label": "Все десять программ подробно"
          },
          {
            "path": "/portfolio",
            "label": "Кейсы корпоративных выездов"
          },
          {
            "path": "/dmc",
            "label": "Площадки, пермиты и логистика"
          },
          {
            "path": "/contact",
            "label": "Подобрать формат под команду"
          }
        ],
        "content": [
        {
          "type": "paragraph",
          "text": "Тимбилдинг в Египте — редкий случай, когда выездной тимбилдинг не приходится собирать из компромиссов. В одну поездку помещаются настоящие пирамиды, музей с подлинными экспонатами, Красное море и горы Синая, а перелёт и отели здесь давно отработаны. Вопрос обычно не «где», а «что именно делать с командой», чтобы день у пирамид не превратился в очередную экскурсию с фотографией на фоне."
        },
        {
          "type": "paragraph",
          "text": "В этой статье — десять форматов, с которыми мы работаем в Каире и Шарм-эль-Шейхе: авторские программы La Royal Event и форматы, проверенные на корпоративных выездах наших клиентов. Для каждого — где проходит, для кого и какой уровень активности и напряжения по шкале от одного до пяти. Активность — сколько ходить, нырять и ехать. Напряжение — сколько в сценарии темноты, актёров и обратного отсчёта."
        },
        {
          "type": "callout",
          "variant": "info",
          "title": "Как читать шкалу",
          "text": "Активность 1 — сидеть, смотреть, спорить; 5 — целый день на воде и в движении. Напряжение 1 — светло, спокойно, без гонки; 4 — темнота, живые актёры и ощущение, что за стеной кто-то есть. В «Фараоне» уровень напряжения вы выбираете заранее."
        },
        {
          "type": "stat",
          "number": "20–100",
          "label": "гостей — рабочий диапазон каждой авторской программы. Команды по пять человек, у каждого своя роль и свой предмет, без которого станция не решается. Группы больше ста ведём параллельными потоками — так прошёл семидневный выезд NL International на 300 участников в Park Regency"
        },
        {
          "type": "heading",
          "text": "Тимбилдинг в Египте: 10 форматов по уровню активности и напряжения",
          "level": 2
        },
        {
          "type": "heading",
          "text": "1. Квест на плато Гизы: «Код пирамид»",
          "level": 3
        },
        {
          "type": "paragraph",
          "text": "Дневник археолога подменили, и половина написанного в нём — ложь. Сверить его можно только с самой кладкой: команды выходят на плато рано, пока известняк не раскалился, и четыре часа ходят между Хуфу, Хафрой и Сфинксом с папкой свидетельств. В каждой подлинной странице спрятана цифра, и ларец в финале открывается только тогда, когда все шесть команд принесут свои. Для команд от 20 человек, которые уже фотографировались на фоне пирамид и хотят провести здесь день, где надо думать, а не кивать. Плато Гизы, 4 часа, 20–100 гостей. Активность 3, напряжение 1."
        },
        {
          "type": "heading",
          "text": "2. Квест в Большом Египетском музее: «Последняя страница»",
          "level": 3
        },
        {
          "type": "paragraph",
          "text": "Каталог выставки уходит в печать завтра, а его последнюю страницу напишете вы. Команда становится редакцией: у шести предметов ей вручают уверенные, красиво свёрстанные подписи, и поймать, где они врут, можно только глядя на оригинал в витрине. Самый спокойный из форматов на локации и лучший вариант для тех, кто музеи уже видел и хочет не слушать про экспонаты, а спорить о них. Гиза, Большой Египетский музей, 4 часа, три потока по десять. Активность 1, напряжение 1."
        },
        {
          "type": "heading",
          "text": "3. Квест в старом Каире: «Четыре руки, одно письмо»",
          "level": 3
        },
        {
          "type": "paragraph",
          "text": "Тимбилдинг в Каире, который идёт не через стекло автобуса, а на своих ногах. Письмо шло к вашей команде семьсот лет и не дошло: его несли каллиграф, чайханщик, медник и переписчик, и один из четверых соврал. Команды читают фасады улицы Аль-Муизз в поисках одной резной детали, пишут тростниковым пером своё слово арабской вязью под рукой настоящего каллиграфа и слушают в чайной две версии одной истории. Письмо собирается во дворе из слов, написанных вашей рукой, и его последняя строка адресована вашей компании. Исторический Каир, 4 часа, три потока. Активность 3, напряжение 1."
        },
        {
          "type": "heading",
          "text": "4. Вечерний квест в музее Шарм-эль-Шейха: «Последняя запись археолога»",
          "level": 3
        },
        {
          "type": "paragraph",
          "text": "Короткий умный вечер для группы, у которой день занят морем, а ужин ещё впереди. Залы уже без дневной толпы, шесть витрин, шесть подписей, и ни одной, которой можно верить на слово: команда сначала ставит жетоны на свою версию и только потом получает перевод музейной этикетки. Если нужен целый вечер, продолжение «Музей оживает» добавляет полтора часа с актёрами, ужином и очной ставкой среди витрин. Шарм-эль-Шейх, 2,5 часа или 4 с продолжением, вечерний заход. Активность 1, напряжение 1."
        },
        {
          "type": "heading",
          "text": "5. Квесты в зале отеля: «Сокровища Ра» и «Фараон. Пропавшая экспедиция»",
          "level": 3
        },
        {
          "type": "paragraph",
          "text": "Два формата, которые мы привозим с декорациями к вам: конференц-зал отеля в Каире или Шарм-эль-Шейхе за одну ночь становится залом храма или лагерем пропавшей экспедиции. «Сокровища Ра» — 90 минут, из них час игры: команда делится надвое, работает параллельно, и ни одна находка не срабатывает в одиночку, потому что половина ключей у коллег. Активность 2, напряжение 2. «Фараон» — 100 минут с живыми актёрами, рацией с помехами и силуэтом за полупрозрачной панелью; уровень напряжения выбираете заранее, от сумерек до полной гробницы. Активность 2, напряжение до 4. Оба формата — для команд, которые предпочитают думать руками и получать результат за вечер."
        },
        {
          "type": "heading",
          "text": "6. Вечер в горах Синая: «Путь к звёздам»",
          "level": 3
        },
        {
          "type": "paragraph",
          "text": "Для тех, кто уже катался по пустыне на джипах и хочет вечер, который держится не на скорости, а на небе. Днём команды сверяют настоящий хребет с рисунком из дневника пропавшего картографа, потом пьют обжигающий чай у бедуинов и слушают человека, который находит север без карты и телефона. Последнюю подсказку приносит закат, а в лагере астроном показывает каждому его звезду в телескоп. Единственная из программ, куда можно с детьми: здесь нет соревнования и темноты без взрослого рядом. Шарм-эль-Шейх, 6 часов с трансферами, старт по закату. Активность 3, напряжение 1."
        },
        {
          "type": "image",
          "url": "/ewa-21.jpg",
          "alt": "Команда EWA product в куфиях на выезде в пустыню под Шарм-эль-Шейхом",
          "caption": "Выезд в пустыню на корпоративе EWA product: общий кадр на фоне гор Синая — формат, который держит и двести человек"
        },
        {
          "type": "heading",
          "text": "7. Пустынное сафари",
          "level": 3
        },
        {
          "type": "paragraph",
          "text": "Самый простой способ вытащить большую группу из отеля на полдня. Джипы, горы Синая, бедуинский лагерь, чай и ужин под небом. Формат не требует сценария и хорошо держит группу от ста человек, когда квест с командами по пять уже не собрать в один поток. Так прошёл выезд в пустыню на корпоративе EWA product в Rixos Seagate: общий кадр в куфиях на фоне скал и вечер в лагере. Летом сафари ставим ближе к закату — о жаре ниже. Шарм-эль-Шейх, полдня. По нашей шкале — активность 3, напряжение 1."
        },
        {
          "type": "image",
          "url": "/nl-17.jpg",
          "alt": "Мастер-класс живописи на корпоративном выезде NL International в Шарм-эль-Шейхе",
          "caption": "Мольберты у барной стойки Park Regency: мастер-класс живописи шёл параллельно с деловой частью форума NL International"
        },
        {
          "type": "heading",
          "text": "8. Творческие мастер-классы",
          "level": 3
        },
        {
          "type": "paragraph",
          "text": "Живопись, визаж, танцы — форматы, в которых человек, обычно молчащий на планёрках, вдруг оказывается самым заметным в комнате. На семидневном выезде NL International в Park Regency мастер-классы шли параллельно с деловой частью: утром сессии в конференц-зале, днём мольберты и коврики для йоги. Сила формата — в масштабе: сто человек делятся по интересам, и каждый выбирает своё. Из авторских программ сюда же относится каллиграфия внутри «Четырёх рук»: слово, написанное тушью под рукой мастера, гость увозит с собой. Каир или Шарм-эль-Шейх, в отеле. Активность 1–2, напряжение 1."
        },
        {
          "type": "image",
          "url": "/nl-26.jpg",
          "alt": "Йога на траве на корпоративном выезде NL International в Park Regency",
          "caption": "Йога на газоне отеля — утренний формат, который не требует ни реквизита, ни трансфера"
        },
        {
          "type": "heading",
          "text": "9. Спортивные и вечерние форматы",
          "level": 3
        },
        {
          "type": "paragraph",
          "text": "Стрельба из лука, йога на газоне, танцевальные мастер-классы — лёгкая нагрузка, после которой идут на ужин, а не спать. Вечера — отдельный жанр. У NL International кульминацией недели стали вечер в стиле «Luxury Egypt» и «Белая вечеринка» на скале под открытым небом, где лук и стрелы оказались частью шоу, а не спортзала. У EWA product вечерние шоу прошли на площадках Marlin и Space с нашими декорациями. Если вечеру нужен сюжет, есть «Последний кадр»: ужин из трёх подач внутри премьеры 1959 года, четыре подозреваемых за столами и финал, за который голосует зал. Активность 1, напряжение 2."
        },
        {
          "type": "image",
          "url": "/ewa-22.jpg",
          "alt": "Команда EWA product в гидрокостюмах на палубе яхты в Красном море",
          "caption": "Яхта на день для всей группы: выезд EWA product в Шарм-эль-Шейхе"
        },
        {
          "type": "heading",
          "text": "10. День на яхте и регата в Красном море: «Ладья идёт за солнцем»",
          "level": 3
        },
        {
          "type": "paragraph",
          "text": "Командообразование в Шарм-эль-Шейхе логично заканчивать морем. Простой вариант — яхта на день для всей группы, как на выезде EWA product: гидрокостюмы, снаряжение, обед на борту; с несколькими лодками тот же день превращается в регату между командами. Вариант со сценарием — «Ладья идёт за солнцем»: восемь часов, четыре палубы и два мира. Половина команды уходит с гидом на риф, делает первый вдох под водой или пробует фридайвинг; половина работает в штабе на палубе над картой и двумя бортовыми журналами, в одном из которых переписана строка. Доказать подделку без наблюдений с воды нельзя, поэтому ларец открывают все вместе — когда яхта ложится на обратный курс в закат. Формат для команд, где есть и сертифицированные дайверы, и те, кто в воду не пойдёт: вклад у них одинаковый. Шарм-эль-Шейх, 8 часов, яхта и рабочие лодки. Активность 4, напряжение 1."
        },
        {
          "type": "divider"
        },
        {
          "type": "heading",
          "text": "Как выбрать формат по цели и размеру группы",
          "level": 2
        },
        {
          "type": "paragraph",
          "text": "Все десять авторских программ рассчитаны на 20–100 гостей и команды по пять. Разница — в цели. Ниже — как мы обычно раскладываем запрос клиента."
        },
        {
          "type": "table",
          "headers": [
            "Цель",
            "Размер группы",
            "Что подойдёт",
            "Активность / напряжение"
          ],
          "rows": [
            [
              "Смешать отделы, познакомить новичков",
              "20–100",
              "«Код пирамид», «Четыре руки, одно письмо»: команды по пять, у каждого своя роль",
              "3 / 1"
            ],
            [
              "Думать и спорить без беготни",
              "20–100",
              "«Последняя страница» в GEM, «Последняя запись археолога» в музее Шарма",
              "1 / 1"
            ],
            [
              "Результат за один вечер, не выходя из отеля",
              "20–100",
              "«Сокровища Ра», «Фараон. Пропавшая экспедиция»",
              "2 / 2–4"
            ],
            [
              "Объединить дайверов и тех, кто не пойдёт в воду",
              "20–100",
              "«Ладья идёт за солнцем»",
              "4 / 1"
            ],
            [
              "Семьи с детьми, вечер без соревнования",
              "20–100",
              "«Путь к звёздам»",
              "3 / 1"
            ],
            [
              "Вечер с едой, музыкой и разговором",
              "20–100",
              "«Последний кадр»",
              "1 / 2"
            ],
            [
              "Большая группа, перезагрузка и общий кадр",
              "от 100",
              "Сафари, яхта, мастер-классы и вечерние форматы параллельными потоками",
              "по выбору"
            ]
          ],
          "caption": "Шкала активности и напряжения — от 1 до 5. Для форматов из кейсов уровень указан по нашей оценке"
        },
        {
          "type": "paragraph",
          "text": "Для выезда на несколько дней форматы обычно комбинируют: один квест на локации, один вечер и одно море. Так семидневная программа NL International собралась из деловых сессий, мастер-классов, тимбилдинг-квестов и двух вечеринок, и ни один день не повторил предыдущий."
        },
        {
          "type": "heading",
          "text": "Жара, сезон и время старта",
          "level": 2
        },
        {
          "type": "paragraph",
          "text": "Главное правило уличных программ в Египте — время старта. С мая по сентябрь квесты на плато и на Аль-Муизз, как и сафари, начинаются рано утром или после четырёх часов дня. Гизу в полдень летом мы не ставим ни за какие деньги: в «Код пирамид» заложены тень и вода на каждой остановке и ранний старт. Вечерние форматы — музей Шарма, «Путь к звёздам», «Последний кадр» — от жары не зависят по определению, а «Сокровища Ра», «Фараон» и Большой Египетский музей проходят в помещении. На море восемь часов идут с зонами отдыха, полотенцами и водой, и глубину каждый выбирает под себя — от штаба на палубе до первого погружения."
        },
        {
          "type": "callout",
          "variant": "warning",
          "title": "Что уточнить до выбора даты",
          "text": "Язык группы: русский и английский ведём одинаково, арабский звучит у мастеров с переводом гида; в «Ладье» и «Сокровищах Ра» задания устроены так, что язык не даёт преимущества. Дети: только «Путь к звёздам», остальные программы — от четырнадцати лет. Те, кто не любит игры: роли в команде разные, и не все они про говорить — хранитель работает с бумагами, картограф с картой, глаз с деталью на камне."
        },
        {
          "type": "heading",
          "text": "Что остаётся у команды после",
          "level": 2
        },
        {
          "type": "paragraph",
          "text": "Мы против сувениров ради сувениров, поэтому у каждой программы предмет на выходе привязан к тому, что команда сделала сама."
        },
        {
          "type": "list",
          "items": [
            "«Код пирамид» — восстановленный маршрут с фотографиями всех команд, письмо экспедиции и фрагмент солнечной печати каждому гостю.",
            "«Последняя страница» — вёрстка собранной страницы каталога с подписями всех команд и именем компании в выходных данных.",
            "«Четыре руки, одно письмо» — карточка со словом, написанным тушью под рукой мастера, и копия собранного письма.",
            "«Последняя запись археолога» — страница дневника с шестью штампами станций и вашей строкой; в «Музей оживает» — личная печать с именем египетскими знаками.",
            "«Ладья идёт за солнцем» — именная печать с именем иероглифами и съёмка с камер инструкторов.",
            "«Путь к звёздам» — карточка со «своей» звездой и подписью астронома.",
            "«Сокровища Ра» — «золотой» жетон экспедиции и кадр общего прохода через портал под обратный отсчёт.",
            "«Фараон» — печать экспедиции с именем вашего археолога и фотографии с актёрами у подсвеченного саркофага.",
            "«Последний кадр» — общий снимок в рамке из киноплёнки и имя в титрах."
          ]
        },
        {
          "type": "paragraph",
          "text": "Остальное предметом не измеряется. Финал каждого сценария устроен так, что ошибиться можно, а остаться без развязки нельзя: её услышат все. Это правило записано в каждом сценарии отдельной строкой."
        },
        {
          "type": "heading",
          "text": "Как это готовится",
          "level": 2
        },
        {
          "type": "list",
          "items": [
            "Сроки: от четырёх недель на «Ладью» и «Путь к звёздам» до восьми–десяти на первый показ «Сокровищ Ра» и «Фараона» с декорациями. В эти недели входят разведка площадки, изготовление реквизита и персональные детали: имя компании, дата, факт из её истории.",
            "Что мы просим у вас: дату, число гостей, отель, язык группы и один вопросник — из ответов на него собирается финал.",
            "Что входит: сценарий, ведущий, гиды-египтологи, актёры, координаторы, реквизит, трансферы по маршруту на своих водителях и входные билеты. Пермиты на плато Гизы и в музеях берём на себя.",
            "Как решиться: для тех, кто принимает решение, мы проводим сорокапятиминутный прогон одной станции — без обязательств и без оплаты."
          ]
        },
        {
          "type": "paragraph",
          "text": "Тимбилдинг за границей стоит выбирать по одному критерию: что команда будет вспоминать через год. Пирамиды и Красное море запомнятся и сами по себе; наша работа — чтобы вместе с ними вспоминали спор у витрины, слово, написанное тушью, и щелчок замка, который открылся только всем вместе. La Royal Event работает в Египте с 2004 года: своя команда в Каире и Шарм-эль-Шейхе, прямые контракты с отелями и площадками, duty-office 24/7. Напишите дату и число гостей — вернёмся с предложением в тот же день."
        }
      ]
    },
    "en": {
      "title": "Team Building in Egypt: 10 Formats From a Giza Plateau Quest to a Red Sea Regatta",
      "category": "Corporate Culture",
      "date": "September 17, 2026",
      "excerpt": "Ten team building formats in Egypt: signature quests at Giza, in museums and on a yacht, desert safari, workshops. Who each suits, where it runs, how intense it is.",
      "links": [
          {
            "path": "/programmy",
            "label": "All ten programs in detail"
          },
          {
            "path": "/portfolio",
            "label": "Corporate retreat case studies"
          },
          {
            "path": "/dmc",
            "label": "Venues, permits and logistics"
          },
          {
            "path": "/contact",
            "label": "Find the right format for your team"
          }
        ],
        "content": [
        {
          "type": "paragraph",
          "text": "Team building in Egypt solves the problem that most corporate team building abroad never quite gets past: the choice between a memorable place and a programme that actually does something for the group. Here the two sit in the same trip. The pyramids, a museum full of originals, the Red Sea and the mountains of Sinai are all within reach of one hotel, and the flights and venues have been worked out for years. The real question is what to do with the team once it is there, so that a day at the pyramids does not turn into one more guided tour with a group photo at the end."
        },
        {
          "type": "paragraph",
          "text": "Below are ten formats we run in Cairo and Sharm El Sheikh: signature programmes written by La Royal Event, plus formats proven on our clients' corporate retreats. For each one you will find where it runs, who it suits, and two scores from one to five. Activity is how much walking, diving and driving is involved. Tension is how much darkness, live acting and countdown the script contains."
        },
        {
          "type": "callout",
          "variant": "info",
          "title": "How to read the scale",
          "text": "Activity 1 means sitting, looking and arguing; 5 means a whole day on the water and on the move. Tension 1 is daylight, calm and no race; 4 is darkness, live actors and the feeling that someone is behind the wall. In Pharaoh you choose the tension level in advance."
        },
        {
          "type": "stat",
          "number": "20–100",
          "label": "guests is the working range of every signature programme. Teams of five, each member with a role and an object of their own, without which the station cannot be solved. Larger groups run in parallel streams, as on the seven-day NL International retreat for 300 people at Park Regency"
        },
        {
          "type": "heading",
          "text": "Team building in Egypt: 10 formats by activity and tension",
          "level": 2
        },
        {
          "type": "heading",
          "text": "1. A quest on the Giza Plateau: The Pyramid Code",
          "level": 3
        },
        {
          "type": "paragraph",
          "text": "An archaeologist's diary has been tampered with, and half of what it says is a lie. The only way to check it is against the stones themselves. Teams arrive on the plateau early, before the limestone heats up, and spend four hours moving between Khufu, Khafre and the Sphinx with a folder of evidence to test. Each genuine page hides a digit, and the chest at the finale opens only when all six teams bring theirs. Built for groups of twenty or more who have already posed in front of the pyramids and want a day here that asks them to think rather than nod. Giza Plateau, 4 hours, 20–100 guests. Activity 3, tension 1."
        },
        {
          "type": "heading",
          "text": "2. A quest in the Grand Egyptian Museum: The Last Page",
          "level": 3
        },
        {
          "type": "paragraph",
          "text": "The exhibition catalogue goes to print tomorrow, and its last page will be written by you. The group becomes the editorial team. At six objects it receives a confident, beautifully laid-out caption, and the only way to catch where it lies is to look at the original in the case. This is the calmest of the location formats and the right choice for people who have seen museums and would rather argue about the exhibits than hear a lecture about them. Giza, Grand Egyptian Museum, 4 hours, three streams of ten. Activity 1, tension 1."
        },
        {
          "type": "heading",
          "text": "3. A quest in historic Cairo: Four Hands, One Letter",
          "level": 3
        },
        {
          "type": "paragraph",
          "text": "Of all team building activities in Cairo, this is the one that happens on foot rather than through a coach window. A letter has been travelling to your team for seven hundred years and never arrived. Four people carried it, a calligrapher, a tea-house keeper, a coppersmith and a scribe, and one of them lied. Teams read the facades of Al-Muizz Street for a single carved detail, write one word of their own in Arabic script with a reed pen under a real calligrapher's hand, and hear two versions of the same story in a tea house. The letter is assembled in a courtyard from words written by your own hands, and its last line is addressed to your company. Historic Cairo, 4 hours, three streams. Activity 3, tension 1."
        },
        {
          "type": "heading",
          "text": "4. An evening quest in the Sharm El Sheikh Museum: The Archaeologist's Last Entry",
          "level": 3
        },
        {
          "type": "paragraph",
          "text": "A short, clever evening for a group whose day belongs to the sea and whose dinner is still ahead. The halls are empty of the daytime crowd, six display cases carry six captions, and not one can be taken on trust: the team places its tokens on its own version first and only then receives the translation of the museum label. If you want the whole evening, the sequel The Museum Comes Alive adds an hour and a half with actors, dinner and a confrontation among the cases. Sharm El Sheikh, 2.5 hours or 4 with the sequel, evening slot. Activity 1, tension 1."
        },
        {
          "type": "heading",
          "text": "5. Quests in your hotel ballroom: Treasures of Ra and Pharaoh: The Lost Expedition",
          "level": 3
        },
        {
          "type": "paragraph",
          "text": "Two formats we bring to you with full set design: overnight, a conference hall in Cairo or Sharm El Sheikh becomes a temple hall or the camp of a missing expedition. Treasures of Ra runs 90 minutes, 60 of them pure play. The team splits in two and works in parallel, and no find works on its own, because half of the keys are held by colleagues. Activity 2, tension 2. Pharaoh runs 100 minutes with live actors, a radio full of static and a silhouette behind a translucent panel; you set the tension level in advance, from dusk to full tomb. Activity 2, tension up to 4. Both are for teams that like to think with their hands and want a result by the end of the evening."
        },
        {
          "type": "heading",
          "text": "6. An evening in the Sinai mountains: Path to the Stars",
          "level": 3
        },
        {
          "type": "paragraph",
          "text": "For people who have done the jeep ride and want an evening that rests on the sky rather than on speed. By day, teams match a real ridge against the drawing in a missing cartographer's diary; then they sit on a rug with scalding tea and listen to a man who grew up here and finds north without a map or a phone. The last clue arrives with the sunset, and after dark an astronomer shows each guest their own star through a telescope. This is the one programme that welcomes families: no competition and no darkness without an adult nearby. Sharm El Sheikh, 6 hours including transfers, timed to the sunset. Activity 3, tension 1."
        },
        {
          "type": "image",
          "url": "/ewa-21.jpg",
          "alt": "EWA product team in keffiyehs on a desert trip near Sharm El Sheikh",
          "caption": "Desert day on the EWA product retreat: a group shot against the Sinai mountains, a format that holds two hundred people with ease"
        },
        {
          "type": "heading",
          "text": "7. Desert safari",
          "level": 3
        },
        {
          "type": "paragraph",
          "text": "The simplest way to get a large group out of the hotel for half a day. Jeeps, the Sinai mountains, a Bedouin camp, tea and dinner under the open sky. The format needs no script and holds a group of a hundred or more comfortably, at the point where a quest in teams of five can no longer run as a single stream. This is how the desert day went on the EWA product retreat at Rixos Seagate: a group shot in keffiyehs against the rocks and an evening in camp. In summer we schedule it towards sunset; more on heat below. Sharm El Sheikh, half a day. On our scale, activity 3, tension 1."
        },
        {
          "type": "image",
          "url": "/nl-17.jpg",
          "alt": "Painting workshop at the NL International corporate retreat in Sharm El Sheikh",
          "caption": "Easels along the bar at Park Regency: the painting workshop ran alongside the business agenda of the NL International forum"
        },
        {
          "type": "heading",
          "text": "8. Creative workshops",
          "level": 3
        },
        {
          "type": "paragraph",
          "text": "Painting, make-up artistry, dance: formats in which the person who never speaks at meetings suddenly becomes the most visible one in the room. On the seven-day NL International retreat at Park Regency the workshops ran alongside the business agenda, with sessions in the conference hall in the morning and easels and yoga mats in the afternoon. The strength of the format is scale: a hundred people split by interest and everyone picks their own. Among the signature programmes, the calligraphy inside Four Hands, One Letter belongs here too; the word written in ink under a master's hand goes home with the guest. Cairo or Sharm El Sheikh, in the hotel. Activity 1–2, tension 1."
        },
        {
          "type": "image",
          "url": "/nl-26.jpg",
          "alt": "Yoga on the lawn at the NL International retreat at Park Regency",
          "caption": "Yoga on the hotel lawn: a morning format that needs neither props nor a transfer"
        },
        {
          "type": "heading",
          "text": "9. Sport and evening formats",
          "level": 3
        },
        {
          "type": "paragraph",
          "text": "Archery, yoga on the lawn, dance classes: light physical formats that leave the group ready for dinner rather than for bed. Evenings are a genre of their own. For NL International the week peaked with a Luxury Egypt night and a White Party on a cliff under the open sky, where the bow and arrows became part of the show rather than a gym exercise. For EWA product the evening shows ran at the Marlin and Space venues with our set design. When an evening needs a plot, there is The Final Frame: a three-course dinner inside a 1959 film premiere, four suspects dining in the same room and an ending the audience votes for. Activity 1, tension 2."
        },
        {
          "type": "image",
          "url": "/ewa-22.jpg",
          "alt": "EWA product team in wetsuits on the deck of a yacht in the Red Sea",
          "caption": "A yacht for the whole group for a day: the EWA product retreat in Sharm El Sheikh"
        },
        {
          "type": "heading",
          "text": "10. A yacht day and regatta in the Red Sea: The Barque Follows the Sun",
          "level": 3
        },
        {
          "type": "paragraph",
          "text": "Team building in Sharm El Sheikh should end at sea. The simple version is a yacht for the whole group for a day, as on the EWA product retreat: wetsuits, gear and lunch on board; with several boats the same day becomes a regatta between teams. The scripted version is The Barque Follows the Sun: eight hours, four decks and two worlds. Half the team goes out to the reef with a guide, takes its first breath underwater or tries freediving; the other half works at a headquarters on the main deck over a chart and two logbooks, one of which has a rewritten line. The forgery cannot be proven without observations from the water, so the chest is opened by everyone together, at the moment the yacht turns onto its homeward course into the sunset. Made for teams with certified divers and people who will not go near the water: their contributions count the same. Sharm El Sheikh, 8 hours, a yacht plus working boats. Activity 4, tension 1."
        },
        {
          "type": "divider"
        },
        {
          "type": "heading",
          "text": "How to choose a format by goal and group size",
          "level": 2
        },
        {
          "type": "paragraph",
          "text": "All ten signature programmes are designed for 20–100 guests in teams of five. What differs is the purpose. This is how we usually sort a client's brief."
        },
        {
          "type": "table",
          "headers": [
            "Goal",
            "Group size",
            "What fits",
            "Activity / tension"
          ],
          "rows": [
            [
              "Mix departments, integrate newcomers",
              "20–100",
              "The Pyramid Code, Four Hands, One Letter: teams of five, a role for everyone",
              "3 / 1"
            ],
            [
              "Think and argue, no running around",
              "20–100",
              "The Last Page at the GEM, The Archaeologist's Last Entry in the Sharm museum",
              "1 / 1"
            ],
            [
              "A result in one evening without leaving the hotel",
              "20–100",
              "Treasures of Ra, Pharaoh: The Lost Expedition",
              "2 / 2–4"
            ],
            [
              "Unite divers and people who will not go in the water",
              "20–100",
              "The Barque Follows the Sun",
              "4 / 1"
            ],
            [
              "Families with children, an evening with no contest",
              "20–100",
              "Path to the Stars",
              "3 / 1"
            ],
            [
              "An evening of food, music and conversation",
              "20–100",
              "The Final Frame",
              "1 / 2"
            ],
            [
              "A large group, a reset and one big photo",
              "100+",
              "Safari, yacht, workshops and evening formats in parallel streams",
              "your choice"
            ]
          ],
          "caption": "Activity and tension are scored from 1 to 5. For the case-study formats the level is our own estimate"
        },
        {
          "type": "paragraph",
          "text": "For a multi-day retreat the formats are usually combined: one location quest, one evening and one day at sea. The seven-day NL International programme was built that way, from business sessions, workshops, team quests and two parties, and no two days repeated each other."
        },
        {
          "type": "heading",
          "text": "Heat, season and start times",
          "level": 2
        },
        {
          "type": "paragraph",
          "text": "The first rule of outdoor programmes in Egypt is the start time. From May to September the quests on the plateau and on Al-Muizz, like the safari, begin early in the morning or after four in the afternoon. We do not put Giza at noon in summer at any price: The Pyramid Code is built with shade and water at every stop and an early start. The evening formats, the Sharm museum, Path to the Stars and The Final Frame, are independent of the heat by definition, while Treasures of Ra, Pharaoh and the Grand Egyptian Museum run indoors. At sea the eight hours come with rest areas, towels and water, and everyone chooses their own depth, from the headquarters on deck to a first dive."
        },
        {
          "type": "callout",
          "variant": "warning",
          "title": "Check before you fix the date",
          "text": "Language: we run Russian and English equally, and Arabic is spoken by the craftsmen with the guide translating; in The Barque and Treasures of Ra the tasks are built so that language gives no advantage. Children: only Path to the Stars; every other programme is for ages fourteen and up. People who do not like games: the roles in a team are different, and not all of them are about talking. The keeper works with papers, the cartographer with the map, the eye with a detail on the stone."
        },
        {
          "type": "heading",
          "text": "What the team keeps afterwards",
          "level": 2
        },
        {
          "type": "paragraph",
          "text": "We are against souvenirs for the sake of souvenirs, so in every programme the object you take away is tied to something the team made itself."
        },
        {
          "type": "list",
          "items": [
            "The Pyramid Code: the restored route with photographs of every team, the expedition letter and a fragment of the solar seal for each guest.",
            "The Last Page: the layout of the assembled catalogue page with the captions of all teams and your company's name in the imprint.",
            "Four Hands, One Letter: a card with your word written in ink under a master's hand, and a copy of the assembled letter.",
            "The Archaeologist's Last Entry: a diary page with six station stamps and your own line; in The Museum Comes Alive, a personal seal with your name in Egyptian signs.",
            "The Barque Follows the Sun: a personal seal with your name in hieroglyphs and footage from the instructors' cameras.",
            "Path to the Stars: a card with your own star, signed by the astronomer.",
            "Treasures of Ra: the golden expedition token and the shot of the whole group passing through the portal under the countdown.",
            "Pharaoh: an expedition seal with your archaeologist's name and photographs with the actors by the lit sarcophagus.",
            "The Final Frame: a group shot framed in film stock, and your name in the credits."
          ]
        },
        {
          "type": "paragraph",
          "text": "The rest cannot be measured by an object. Every script is built so that a team can get it wrong but can never be left without the ending: everyone hears it. That rule is written into each scenario as a separate line."
        },
        {
          "type": "heading",
          "text": "How a programme is prepared",
          "level": 2
        },
        {
          "type": "list",
          "items": [
            "Lead time: from four weeks for The Barque and Path to the Stars to eight to ten for the first staging of Treasures of Ra and Pharaoh with their sets. Those weeks cover a site survey, prop making and the personal details: your company's name, the date, a fact from its history.",
            "What we ask of you: the date, the number of guests, the hotel, the group's language and one questionnaire, from which the finale is assembled.",
            "What is included: the script, host, Egyptologist guides, actors, coordinators, all props, transfers along the route with our own drivers, and entrance tickets. Permits for the Giza Plateau and the museums are on us.",
            "How to decide: for the people making the decision we run a forty-five-minute rehearsal of one station, with no obligation and no charge."
          ]
        },
        {
          "type": "paragraph",
          "text": "Corporate team building abroad is worth choosing by one criterion: what the team will still be talking about a year later. The pyramids and the Red Sea will be remembered on their own; our job is to make sure the argument at a display case, the word written in ink and the click of a lock that opened only for everyone together are remembered with them. La Royal Event has worked in Egypt since 2004, with its own team in Cairo and Sharm El Sheikh, direct contracts with hotels and venues, and a duty office around the clock. Send us the date and the number of guests, and we will come back with a proposal the same day."
        }
      ]
    }
  },
  // ───────────────────────────────────────────────────────────────────────
  {
    "id": "korporativnyj-kruiz-po-nilu",
    "datePublished": "2026-09-17",
    "image": "/cruises/soleil-ship.webp",
    "ru": {
      "title": "Корпоративный круиз по Нилу: как устроен фрахт судна и что успеет группа за четыре ночи",
      "category": "Локации",
      "date": "17 сентября 2026",
      "excerpt": "Корпоративный круиз по Нилу: три судна, полный фрахт или блок кают, маршрут на четыре ночи из Луксора по дням и альтернативы — от дахабии до гала в Каире.",
      "links": [
          {
            "path": "/cruises",
            "label": "Флот и маршруты круизов"
          },
          {
            "path": "/programmy",
            "label": "Программы на борту и на берегу"
          },
          {
            "path": "/dmc",
            "label": "Прямые контракты с судовладельцами"
          },
          {
            "path": "/contact",
            "label": "Подобрать судно под группу"
          }
        ],
        "content": [
        {
          "type": "paragraph",
          "text": "Корпоративный круиз по Нилу — это формат, в котором отель, конференц-зал, ресторан и экскурсионная программа собраны на одном судне, и это судно само везёт группу от храма к храму. Утром — Карнак или Долина Царей с гидом-египтологом, днём — переход по реке и бассейн на верхней палубе, вечером — ужин и программа на борту. Никаких переездов между отелями, никаких чемоданов посреди недели: группа один раз заселяется в Луксоре и сходит на берег в Асуане."
        },
        {
          "type": "paragraph",
          "text": "La Royal Event работает в Египте как MICE- и DMC-компания с 2004 года. С судовладельцами у нас прямые контракты — без посредников и наценок, а гиды-египтологи ведут программу на русском и английском. В этой статье разбираем, чем круиз удобен для группы, какое из трёх судов под какой формат подходит, что даёт полный фрахт по сравнению с блоком кают, как выглядит маршрут на четыре ночи из Луксора по дням и какие есть альтернативы — от парусной дахабии до вечернего круиза по Каиру для гала-ужина."
        },
        {
          "type": "heading",
          "text": "Корпоративный круиз по Нилу: почему группе удобнее на судне, чем в отеле",
          "level": 2
        },
        {
          "type": "paragraph",
          "text": "Главный аргумент — всё в одном месте. Круиз по Нилу для группы уже включает программу на берегу: гид-египтолог, входные билеты и трансферы к храмам входят в круиз, как и полный пансион. Организатору не нужно собирать логистику из десятка подрядчиков: судно идёт по расписанию, автобусы ждут у причала, гид встречает у трапа. Когда судно вечером уходит на юг, группа уже на борту — и вечерняя программа начинается там же, где закончился ужин."
        },
        {
          "type": "list",
          "items": [
            "Один заезд и один выезд: посадка в Луксоре, высадка в Асуане, между ними — ни одного переезда с багажом.",
            "Программа на берегу уже входит: гид-египтолог, билеты в храмы и некрополи, трансферы к каждому объекту.",
            "Вечера на борту: ужин в ресторане, лаундж-бар, солнечная палуба — ничего не нужно арендовать отдельно.",
            "Закрытый контур: на судне группа не пересекается с городом, и это одинаково удобно для конфиденциальной сессии и для инсентива.",
            "Ритм: утром — храмы, днём — река, вечером — палуба. У группы появляется то, чего не бывает в отеле у конференц-зала: общее пространство и общее время."
          ]
        },
        {
          "type": "image",
          "url": "/cruises/fayan-lounge.webp",
          "alt": "Лаундж-бар Le Fayan Suites — вечернее пространство группы на борту",
          "caption": "Лаундж-бар Le Fayan Suites. Вечером сюда переходит вся группа — без аренды отдельного зала и без трансферов"
        },
        {
          "type": "heading",
          "text": "Три судна: какое подходит вашей группе",
          "level": 2
        },
        {
          "type": "paragraph",
          "text": "Мы работаем напрямую с тремя судами на маршруте Луксор — Асуан. Они закрывают три разные задачи: инсентив или конференция до 74 гостей, где каждому нужен одинаково высокий уровень; конференция на 80–100 человек с пленарной сессией на борту; приватный чартер для правления или ключевых партнёров."
        },
        {
          "type": "table",
          "headers": [
            "Судно",
            "Каюты",
            "Вместимость",
            "Формат",
            "Для какой группы"
          ],
          "rows": [
            [
              "Le Fayan Suites",
              "37 сьютов, all-suite: 36 сьютов по 39 м² и Royal Suite 58 м² с террасой и джакузи",
              "До 74 гостей",
              "Классический круиз 3, 4 или 7 ночей; возможен полный фрахт",
              "Конференции и инсентивы, где каждому гостю нужен одинаково высокий уровень"
            ],
            [
              "Soleil",
              "53 каюты: 41 люкс-каюта с балконом, 8 junior-сьютов, 2 Royal, 2 Soleil Suite с джакузи",
              "До 106 гостей",
              "Классический круиз 3, 4 или 7 ночей; для группы от 80 человек — фрахт целиком",
              "Конференции на 80–100 человек: пленарка в лаундже, ужины в ресторане"
            ],
            [
              "Lumière",
              "8 кают: 5 люкс-кают, 2 junior-сьюта и Lumière Suite с джакузи и батлером",
              "До 20 гостей",
              "Только полный фрахт: 5 ночей Луксор → Асуан по вашему расписанию",
              "Правление, ключевые партнёры, executive-ретрит"
            ]
          ],
          "caption": "Все три судна — по прямым контрактам с судовладельцами. Категории кают и расселение подбираем под состав группы"
        },
        {
          "type": "heading",
          "text": "Le Fayan Suites: all-suite для инсентива и конференции",
          "level": 3
        },
        {
          "type": "paragraph",
          "text": "На Le Fayan Suites нет обычных кают — только сьюты с панорамными окнами на воду: 36 сьютов по 39 м² и Royal Suite 58 м² с террасой и джакузи. Это снимает вечный вопрос инсентива: кому достанется каюта хуже. Здесь она не достанется никому. Четыре палубы плюс солнечная с бассейном и баром, ресторан с панорамными окнами, лаундж-бар, велнес-центр с массажем, сауной и хаммамом, тренажёрный зал. В каждом сьюте — Wi-Fi, кофе-машина и сейф. Маршруты: 3 ночи из Асуана, 4 ночи из Луксора с понедельника по пятницу и 7 ночей из любого из двух портов. Полный фрахт под группу возможен."
        },
        {
          "type": "heading",
          "text": "Soleil: конференция на корабле для 80–100 человек",
          "level": 3
        },
        {
          "type": "paragraph",
          "text": "Soleil — самое вместительное из наших судов: 53 каюты и до 106 гостей. 41 люкс-каюта площадью 21 м² с балконом в пол, восемь junior-сьютов по 39 м², два Royal по 44 м² и два Soleil Suite по 58 м² с джакузи. Для организатора важнее другое: ресторан на 110 мест, куда вся группа садится одновременно; лаундж 260 м², который на день превращается в зал пленарной сессии; верхняя палуба для вечеров. Спа здесь самое большое на Ниле: крытый джакузи в два этажа окон, две массажные, сауна и хаммам. На борту есть лифт и клиника, ресторан готовит диетические меню по запросу. Для группы от 80 человек мы берём судно целиком."
        },
        {
          "type": "stat",
          "number": "53 каюты",
          "label": "на Soleil — самом вместительном судне, с которым мы работаем: до 106 гостей, ресторан на 110 мест и лаундж 260 м² под пленарную сессию"
        },
        {
          "type": "heading",
          "text": "Lumière: судно на одну компанию",
          "level": 3
        },
        {
          "type": "paragraph",
          "text": "Lumière — не круизный лайнер, а плавучий дом на одну компанию: восемь кают и до 20 гостей. Пять люкс-кают по 24 м², два junior-сьюта по 39 м² и Lumière Suite 68 м² с джакузи и батлером. Судно ходит только полным фрахтом и идёт по вашему расписанию: встаёт на ночь у островов, где нет других судов, и на пятый день приводит в Асуан группу, которая успела поговорить обо всём. Ресторан a la carte, лаундж-бар открыт весь день, бассейн на солнечной палубе, массажный кабинет с окном в пол, йога на палубе. Формат для правления, ключевых партнёров и семьи владельца."
        },
        {
          "type": "heading",
          "text": "Фрахт судна на Ниле или блок кают: что меняется",
          "level": 2
        },
        {
          "type": "paragraph",
          "text": "Есть два способа посадить группу на судно. Первый — блок кают на регулярном рейсе: группа занимает часть судна, остальные каюты продаются другим пассажирам, судно идёт по своему расписанию, а ресторан и лаундж общие. Второй — полный фрахт: судно целиком под вашу компанию. Разница не только в приватности — меняется сама природа программы."
        },
        {
          "type": "comparison",
          "title": "Блок кают против полного фрахта",
          "left": {
            "title": "Блок кают на регулярном рейсе",
            "items": [
              "Расписание судна: отправление, стоянки и время выхода на берег заданы рейсом",
              "Ресторан и лаундж делятся с другими пассажирами — пленарную сессию провести негде",
              "Вечерняя программа общая для всего судна",
              "Подходит небольшой группе, которой нужен именно круиз, а не мероприятие",
              "Гид-египтолог и программа на берегу при этом работают отдельно для вашей группы"
            ]
          },
          "right": {
            "title": "Полный фрахт",
            "items": [
              "Своё расписание: можно задержаться у храма, сдвинуть выход, добавить стоянку",
              "Лаундж — зал пленарной сессии, ресторан — гала-ужин, верхняя палуба — вечер компании",
              "Брендинг общих пространств и своя вечерняя программа на борту",
              "Приватные вечера в храмах и ужины на берегу — формат Lumière",
              "Никого постороннего: конфиденциальные сессии и инсентив в закрытом контуре"
            ]
          }
        },
        {
          "type": "paragraph",
          "text": "Конференция на корабле при полном фрахте выглядит так: утром группа выходит к храмам с гидом, к обеду возвращается, после обеда — пленарная сессия в лаундже, пока судно идёт на юг, вечером — ужин в ресторане и вечер на верхней палубе. На Soleil под это есть всё нужное: лаундж 260 м², ресторан на 110 мест, где вся группа садится за один заход, и открытая палуба с бассейном и баром. На Le Fayan Suites тот же сценарий работает для группы до 74 гостей."
        },
        {
          "type": "callout",
          "variant": "info",
          "title": "Когда фрахт — единственный вариант",
          "text": "Lumière ходит только полным фрахтом: судно на 20 гостей не продаётся по каютам. Дахабии Nour El Nil мы тоже берём целиком под группу. Вечерний круиз по Каиру для гала-ужина — всегда фрахт судна. На Soleil для группы от 80 человек имеет смысл брать судно целиком: группа и так занимает большую его часть."
        },
        {
          "type": "image",
          "url": "/cruises/soleil-deck-dinner.webp",
          "alt": "Ужин на верхней палубе Soleil в сумерках",
          "caption": "Верхняя палуба Soleil в сумерках. При полном фрахте это площадка для вечера компании — с баром, бассейном и рекой вместо декораций"
        },
        {
          "type": "heading",
          "text": "Маршрут на четыре ночи из Луксора: по дням",
          "level": 2
        },
        {
          "type": "paragraph",
          "text": "Четыре ночи из Луксора — самый востребованный формат для корпоративной группы: он укладывается в рабочую неделю (Le Fayan Suites выходит из Луксора в понедельник и приходит в Асуан в пятницу) и при этом закрывает все главные объекты между Луксором и Асуаном. Порядок остановок зависит от направления и числа ночей, поэтому ниже — логика маршрута, а не расписание по часам."
        },
        {
          "type": "heading",
          "text": "День 1. Луксор: Карнак и Луксорский храм",
          "level": 3
        },
        {
          "type": "paragraph",
          "text": "Посадка на судно и первый выход на берег — Карнак и Луксорский храм, два храма, с которых начинается любой разговор о Древнем Египте. Вечером — приветственный ужин на борту: группа осваивает судно, лаундж и верхнюю палубу."
        },
        {
          "type": "heading",
          "text": "День 2. Западный берег: Долина Царей, храм Хатшепсут, Колоссы Мемнона",
          "level": 3
        },
        {
          "type": "paragraph",
          "text": "Для желающих день начинается затемно: воздушный шар над Луксором идёт по желанию, как дополнение к базовой программе. Затем весь западный берег: Долина Царей, храм Хатшепсут, Колоссы Мемнона. После обеда судно отходит от Луксора и берёт курс на юг; вторая половина дня — палуба, вечер — ужин и программа на борту. При полном фрахте это удобное время для первой рабочей сессии."
        },
        {
          "type": "heading",
          "text": "День 3. Эдфу и Ком-Омбо",
          "level": 3
        },
        {
          "type": "paragraph",
          "text": "Утро в Эдфу: к храму Гора группа подъезжает на конных экипажах. Дальше судно идёт до Ком-Омбо, где на излучине реки стоит двойной храм Собека и Гора. Между двумя храмами — переход по реке, и это лучшее время для сессии в лаундже или просто для палубы с бассейном."
        },
        {
          "type": "heading",
          "text": "День 4. Асуан: Филе, нубийская деревня и заповедник",
          "level": 3
        },
        {
          "type": "paragraph",
          "text": "Судно приходит в Асуан. В программе — храм Исиды на острове Филе, нубийская деревня и заповедник Асуана, куда группу везут на лодках. Вечер — заключительный ужин на борту; при фрахте это гала-вечер компании на верхней палубе."
        },
        {
          "type": "heading",
          "text": "День 5. Высадка в Асуане",
          "level": 3
        },
        {
          "type": "paragraph",
          "text": "Завтрак и высадка. Для тех, кто хочет продлить программу, Абу-Симбел организуем по желанию — как и воздушный шар, это дополнение к базовому маршруту. Дальше группа либо летит домой, либо продолжает поездку: Каир с пирамидами или Красное море мы собираем в ту же программу."
        },
        {
          "type": "divider"
        },
        {
          "type": "heading",
          "text": "Альтернативы классическому маршруту",
          "level": 2
        },
        {
          "type": "paragraph",
          "text": "Не каждой группе нужен большой пятизвёздочный лайнер. Три других формата из нашей практики — под другой размер группы и другой ритм. Есть и длинный круиз Каир → Асуан на 10–17 ночей с Абидосом и Дендерой — для тех, у кого есть время на полный Нил."
        },
        {
          "type": "heading",
          "text": "Приватный чартер Lumière: пять ночей только для вашей группы",
          "level": 3
        },
        {
          "type": "paragraph",
          "text": "Базовый маршрут Lumière — пять ночей Луксор → Асуан с ночёвками у островов Фавза и Хербиаб, у Гебель-эль-Сильсила, в Ком-Омбо и у Филе. Судно встаёт на ночь там, где нет других судов; один из вечеров — ужин у костра на острове Хербиаб, другой — приватный вечер в храме, когда группа остаётся в нём одна. Программа и остановки — под группу: это формат для правления, стратегической сессии партнёров или executive-ретрита, где разговор важнее количества увиденного."
        },
        {
          "type": "image",
          "url": "/cruises/lumiere-private-night.webp",
          "alt": "Приватный вечер в храме — формат чартера Lumière",
          "caption": "Приватный вечер в храме: один из форматов чартера Lumière, когда группа остаётся в храме одна"
        },
        {
          "type": "heading",
          "text": "Дахабия Nour El Nil: шесть дней под парусом из Эсны",
          "level": 3
        },
        {
          "type": "paragraph",
          "text": "Дахабия — парусная лодка с двумя мачтами, какие ходили по Нилу в XIX веке, только с кондиционером, душем в каждой каюте и солнечными панелями на крыше. Nour El Nil держит флот из десяти таких лодок на 16–24 гостя, и мы берём их целиком под группу. Маршрут один: Эсна → Асуан, шесть дней, отправления по понедельникам и вторникам, сезон — с сентября по май. Полный пансион и все экскурсии с гидом входят."
        },
        {
          "type": "list",
          "ordered": true,
          "items": [
            "Эсна: посадка, храм Хнума, который стоит на девять метров ниже улицы, торговые ряды.",
            "Эль-Каб и Эдфу: храм Нехбет и гробницы в склоне горы, затем храм Гора на конных экипажах.",
            "Просто Нил: день под парусом, стоянка у пустынного берега — прогулка или купание.",
            "Гебель-эль-Сильсила: ночь у подсвеченного храма Хоремхеба в самом узком месте Нила. Большим судам сюда нельзя — обычно вы единственные гости.",
            "Ком-Омбо: храм Собека и музей крокодилов, остаток дня под парусом.",
            "Асуан: утро у Асуанского моста, где пустыня подходит к самой воде. Высадка."
          ]
        },
        {
          "type": "image",
          "url": "/cruises/dahabiya-two-sails.webp",
          "alt": "Две дахабии Nour El Nil под полосатыми парусами на Ниле",
          "caption": "Дахабии Nour El Nil под парусом. Формат для группы до 24 гостей, которой нужен не маршрут, а ритм"
        },
        {
          "type": "heading",
          "text": "Вечерний круиз по Каиру для гала-ужина",
          "level": 3
        },
        {
          "type": "paragraph",
          "text": "Если программа группы проходит в Каире и нужен один сильный вечер, а не неделя на реке, — вечерний круиз по Каиру. Два-три часа на воде, ужин на борту с видом на ночной город, живая музыка, до 200 гостей. Судно берётся целиком: формат для гала-вечеров, корпоративных приёмов и делегаций. Хорошо сочетается с конференцией в Каире или как финальный вечер программы с пирамидами."
        },
        {
          "type": "heading",
          "text": "Сезон и горизонт бронирования",
          "level": 2
        },
        {
          "type": "paragraph",
          "text": "Дахабии Nour El Nil ходят с сентября по май. У классических судов ограничение другое — фиксированные дни отправления: четыре ночи на Le Fayan Suites начинаются в Луксоре по понедельникам, дахабии выходят из Эсны по понедельникам и вторникам. Для группы это значит, что даты поездки подстраиваются под расписание судна, а не наоборот, — и чем раньше вы приходите с датами, тем шире выбор: судно, категории кают, свободные недели под полный фрахт."
        },
        {
          "type": "callout",
          "variant": "success",
          "title": "Чем раньше, тем шире выбор",
          "text": "Полный фрахт — это целое судно на конкретную неделю, а таких недель в году столько, сколько рейсов. Присылайте даты, как только они появились, даже если состав группы ещё не финальный: судно и неделю мы подбираем раньше, чем закрывается список гостей."
        },
        {
          "type": "heading",
          "text": "Что прислать для подбора судна",
          "level": 2
        },
        {
          "type": "paragraph",
          "text": "Чтобы предложить судно, категории кают и маршрут под вашу группу, нам достаточно короткого письма."
        },
        {
          "type": "list",
          "items": [
            "Даты или диапазон дат и желаемое число ночей: 3, 4, 5 или 7.",
            "Число гостей и схема расселения: по двое, по одному, VIP-гости в сьютах.",
            "Формат: инсентив, конференция с пленарной сессией, ретрит правления, гала-вечер.",
            "Нужна ли рабочая сессия на борту и на сколько человек — от этого зависит выбор между Le Fayan Suites и Soleil.",
            "Язык гида — русский или английский.",
            "Дополнения: Абу-Симбел, воздушный шар над Луксором, приватный вечер в храме, ужин на берегу.",
            "Что до и после круиза: Каир, Красное море или только Нил."
          ]
        },
        {
          "type": "paragraph",
          "text": "Инсентив-круиз по Египту или конференция на Ниле — в любом формате мы ведём группу сами: от подбора судна и категорий кают до координации на борту и duty-office 24/7. Напишите даты и число гостей — подберём судно и маршрут и скажем, есть ли под ваши даты возможность полного фрахта."
        }
      ]
    },
    "en": {
      "title": "Corporate Nile Cruise: How a Full-Ship Charter Works and What a Group Can Do in Four Nights",
      "category": "Locations",
      "date": "September 17, 2026",
      "excerpt": "A corporate Nile cruise for groups: three ships, full charter vs cabin block, a four-night Luxor itinerary by day, and alternatives from dahabiya to a Cairo gala.",
      "links": [
          {
            "path": "/cruises",
            "label": "Fleet and cruise routes"
          },
          {
            "path": "/programmy",
            "label": "Programs on board and ashore"
          },
          {
            "path": "/dmc",
            "label": "Direct contracts with ship owners"
          },
          {
            "path": "/contact",
            "label": "Match a ship to your group"
          }
        ],
        "content": [
        {
          "type": "paragraph",
          "text": "A corporate Nile cruise puts the hotel, the meeting room, the restaurant and the excursion programme on one vessel, and that vessel carries the group from temple to temple. Mornings are for Karnak or the Valley of the Kings with an Egyptologist guide, afternoons for the river and the pool on the sun deck, evenings for dinner and the programme on board. Nobody changes hotels mid-week and nobody repacks a suitcase: the group checks in once in Luxor and steps ashore in Aswan."
        },
        {
          "type": "paragraph",
          "text": "La Royal Event has been running MICE and DMC operations in Egypt since 2004. We hold direct contracts with the ship owners, with no intermediaries in between, and our Egyptologist guides work in English and Russian. This article covers why a cruise suits a group, which of the three ships fits which format, what a full-ship charter changes compared with a block of cabins, how a four-night itinerary from Luxor unfolds day by day, and which alternatives exist, from a sailing dahabiya to an evening cruise in Cairo for a gala dinner."
        },
        {
          "type": "heading",
          "text": "Corporate Nile cruise: why a group is better off on a ship than in a hotel",
          "level": 2
        },
        {
          "type": "paragraph",
          "text": "The core argument is that everything is in one place. A Nile cruise for groups already includes the shore programme: the Egyptologist guide, entrance tickets and transfers to the temples come with the cruise, and so does full board. The organiser does not have to assemble logistics from a dozen suppliers; the ship sails on schedule, the coaches wait at the pier, the guide meets the group at the gangway. When the ship moves south in the evening, the group is already back on board, and the evening programme starts where dinner ends."
        },
        {
          "type": "list",
          "items": [
            "One check-in and one check-out: embark in Luxor, disembark in Aswan, and not a single hotel transfer with luggage in between.",
            "The shore programme is already included: Egyptologist guide, tickets to the temples and necropolises, transfers to every site.",
            "Evenings on board: dinner in the restaurant, the lounge bar, the sun deck. Nothing has to be rented separately.",
            "A closed environment: on the ship the group does not mix with the city, which suits a confidential session as much as it suits an incentive.",
            "A rhythm: temples in the morning, the river in the afternoon, the deck in the evening. The group gets what a hotel next to a conference hall never gives it: shared space and shared time."
          ]
        },
        {
          "type": "image",
          "url": "/cruises/fayan-lounge.webp",
          "alt": "Lounge bar on Le Fayan Suites, the evening space for a group on board",
          "caption": "The lounge bar on Le Fayan Suites. In the evening the whole group moves here, with no separate venue to rent and no transfers"
        },
        {
          "type": "heading",
          "text": "Three ships and the groups they fit",
          "level": 2
        },
        {
          "type": "paragraph",
          "text": "We work directly with three ships on the Luxor to Aswan route. Each answers a different brief: an incentive or conference of up to 74 guests where everyone gets the same high standard, a conference of 80 to 100 people with a plenary session on board, and a private charter for a board or key partners."
        },
        {
          "type": "table",
          "headers": [
            "Ship",
            "Cabins",
            "Capacity",
            "Format",
            "Best for"
          ],
          "rows": [
            [
              "Le Fayan Suites",
              "37 suites, all-suite: 36 suites of 39 m² and a Royal Suite of 58 m² with terrace and jacuzzi",
              "Up to 74 guests",
              "Classic cruise of 3, 4 or 7 nights; full charter possible",
              "Conferences and incentives where every guest must get the same level"
            ],
            [
              "Soleil",
              "53 cabins: 41 deluxe cabins with balcony, 8 junior suites, 2 Royal, 2 Soleil Suites with jacuzzi",
              "Up to 106 guests",
              "Classic cruise of 3, 4 or 7 nights; full charter for groups of 80 and more",
              "Conferences of 80 to 100: plenary in the lounge, dinners in the restaurant"
            ],
            [
              "Lumière",
              "8 cabins: 5 deluxe cabins, 2 junior suites and the Lumière Suite with jacuzzi and butler",
              "Up to 20 guests",
              "Full charter only: 5 nights Luxor to Aswan on your own schedule",
              "Board, key partners, executive retreat"
            ]
          ],
          "caption": "All three ships are booked under direct contracts with the owners. Cabin categories and the rooming plan are matched to the make-up of the group"
        },
        {
          "type": "heading",
          "text": "Le Fayan Suites: all-suite for incentives and conferences",
          "level": 3
        },
        {
          "type": "paragraph",
          "text": "There are no ordinary cabins on Le Fayan Suites, only suites with panoramic windows onto the water: 36 suites of 39 m² and a Royal Suite of 58 m² with a terrace and jacuzzi. That settles the eternal incentive question of who gets the worse cabin. Here nobody does. Four decks plus a sun deck with pool and bar, a restaurant with panoramic windows, a lounge bar, a wellness centre with massage, sauna and hammam, and a gym. Every suite has Wi-Fi, a coffee machine and a safe. Itineraries: 3 nights from Aswan, 4 nights from Luxor running Monday to Friday, and 7 nights from either port. A full charter for a group is possible."
        },
        {
          "type": "heading",
          "text": "Soleil: a conference on a Nile cruise ship for 80 to 100 people",
          "level": 3
        },
        {
          "type": "paragraph",
          "text": "Soleil is the largest ship we work with: 53 cabins and up to 106 guests. 41 deluxe cabins of 21 m² with floor-to-ceiling balconies, eight junior suites of 39 m², two Royal suites of 44 m² and two Soleil Suites of 58 m² with jacuzzi. What matters more to an organiser is the rest: a 110-seat restaurant where the whole group sits down at once, a 260 m² lounge that becomes the plenary room for the day, and the upper deck for the evenings. The spa is the largest on the Nile, with an indoor jacuzzi under two storeys of windows, two massage rooms, a sauna and a hammam. There is a lift and a clinic on board, and the restaurant prepares dietary menus on request. For groups of 80 and more we take the whole ship."
        },
        {
          "type": "stat",
          "number": "53 cabins",
          "label": "on Soleil, the largest ship we work with: up to 106 guests, a 110-seat restaurant and a 260 m² lounge for the plenary session"
        },
        {
          "type": "heading",
          "text": "Lumière: a ship for one company",
          "level": 3
        },
        {
          "type": "paragraph",
          "text": "Lumière is not a cruise liner but a floating house for one company: eight cabins and up to 20 guests. Five deluxe cabins of 24 m², two junior suites of 39 m² and the Lumière Suite of 68 m² with jacuzzi and butler. The ship sails on full charter only and keeps your schedule: it moors for the night at islands where there are no other vessels, and on the fifth day it brings to Aswan a group that has had time to talk everything through. An à la carte restaurant, a lounge bar open all day, a pool on the sun deck, a massage room with a floor-to-ceiling window, yoga on deck. The format for a board, key partners or the owner’s family."
        },
        {
          "type": "heading",
          "text": "Nile cruise charter or a block of cabins: what changes",
          "level": 2
        },
        {
          "type": "paragraph",
          "text": "There are two ways to put a group on a ship. The first is a block of cabins on a scheduled departure: the group takes part of the ship, the remaining cabins go to other passengers, the ship keeps its own timetable, and the restaurant and lounge are shared. The second is a full-ship charter: the entire vessel for your company. The difference is not only privacy; it changes what kind of programme is possible at all."
        },
        {
          "type": "comparison",
          "title": "Cabin block versus full charter",
          "left": {
            "title": "Cabin block on a scheduled departure",
            "items": [
              "The ship’s timetable: departure, stops and shore times are fixed by the sailing",
              "Restaurant and lounge are shared with other passengers, so there is nowhere to hold a plenary",
              "The evening programme is the ship’s, for everyone on board",
              "Works for a small group that wants a cruise rather than an event",
              "Your Egyptologist guide and shore programme still run separately for your group"
            ]
          },
          "right": {
            "title": "Full-ship charter",
            "items": [
              "Your own schedule: linger at a temple, shift a departure, add a stop",
              "The lounge becomes the plenary room, the restaurant the gala dinner, the upper deck the company evening",
              "Branding of the public spaces and your own evening programme on board",
              "Private evenings in temples and dinners ashore, the Lumière format",
              "Nobody outside the company: confidential sessions and incentives in a closed environment"
            ]
          }
        },
        {
          "type": "paragraph",
          "text": "A conference on a chartered ship runs like this: the group goes out to the temples with the guide in the morning, returns for lunch, holds the plenary session in the lounge in the afternoon while the ship sails south, then dinner in the restaurant and an evening on the upper deck. Soleil has everything this needs: the 260 m² lounge, the 110-seat restaurant where the whole group sits in one seating, and the open deck with pool and bar. On Le Fayan Suites the same scenario works for a group of up to 74 guests."
        },
        {
          "type": "callout",
          "variant": "info",
          "title": "When a charter is the only option",
          "text": "Lumière sails on full charter only; a ship for 20 guests is not sold cabin by cabin. The Nour El Nil dahabiyas are also taken as whole boats for a group. An evening cruise in Cairo for a gala dinner is always a full charter. On Soleil, a group of 80 or more makes sense as a full charter: it occupies most of the ship anyway."
        },
        {
          "type": "image",
          "url": "/cruises/soleil-deck-dinner.webp",
          "alt": "Dinner on the upper deck of Soleil at dusk",
          "caption": "The upper deck of Soleil at dusk. Under a full charter this is the company evening, with the bar, the pool and the river instead of decor"
        },
        {
          "type": "heading",
          "text": "A four-night itinerary from Luxor, day by day",
          "level": 2
        },
        {
          "type": "paragraph",
          "text": "Four nights from Luxor is the most requested format for a corporate group: it fits inside a working week (Le Fayan Suites leaves Luxor on Monday and reaches Aswan on Friday) and still covers every major site between Luxor and Aswan. The order of stops depends on the direction and the number of nights, so what follows is the logic of the route rather than an hour-by-hour timetable."
        },
        {
          "type": "heading",
          "text": "Day 1. Luxor: Karnak and Luxor Temple",
          "level": 3
        },
        {
          "type": "paragraph",
          "text": "Embarkation and the first shore excursion: Karnak and Luxor Temple, the two temples where any conversation about ancient Egypt begins. In the evening, a welcome dinner on board; the group gets to know the ship, the lounge and the upper deck."
        },
        {
          "type": "heading",
          "text": "Day 2. The West Bank: Valley of the Kings, Hatshepsut, Colossi of Memnon",
          "level": 3
        },
        {
          "type": "paragraph",
          "text": "For those who want it, the day starts before dawn: the hot-air balloon over Luxor is optional and comes as an add-on to the base programme. Then the whole West Bank: the Valley of the Kings, the temple of Hatshepsut, the Colossi of Memnon. After lunch the ship leaves Luxor and heads south; the afternoon belongs to the deck, the evening to dinner and the programme on board. On a full charter this is a convenient slot for the first working session."
        },
        {
          "type": "heading",
          "text": "Day 3. Edfu and Kom Ombo",
          "level": 3
        },
        {
          "type": "paragraph",
          "text": "Morning in Edfu, where the group reaches the temple of Horus by horse-drawn carriage. The ship then continues to Kom Ombo and the double temple of Sobek and Horus on a bend of the river. Between the two temples there is a stretch of sailing, the best time for a session in the lounge or simply for the pool deck."
        },
        {
          "type": "heading",
          "text": "Day 4. Aswan: Philae, the Nubian village and the reserve",
          "level": 3
        },
        {
          "type": "paragraph",
          "text": "The ship arrives in Aswan. On the programme: the temple of Isis on the island of Philae, then the Nubian village and the Aswan reserve, which the group visits by boat. The evening is the farewell dinner on board; on a charter this is the company gala on the upper deck."
        },
        {
          "type": "heading",
          "text": "Day 5. Disembarkation in Aswan",
          "level": 3
        },
        {
          "type": "paragraph",
          "text": "Breakfast and disembarkation. For those who want to extend the programme, Abu Simbel is arranged on request; like the balloon, it is an add-on to the base route. From here the group either flies home or continues: Cairo with the pyramids or the Red Sea can be built into the same trip."
        },
        {
          "type": "divider"
        },
        {
          "type": "heading",
          "text": "Alternatives to the classic route",
          "level": 2
        },
        {
          "type": "paragraph",
          "text": "Not every group needs a large five-star ship. Three other formats from our practice suit a different group size and a different pace. There is also the long cruise, Cairo to Aswan over 10 to 17 nights with Abydos and Dendera, for groups that have the time for the whole Nile."
        },
        {
          "type": "heading",
          "text": "Private charter on Lumière: five nights for your group alone",
          "level": 3
        },
        {
          "type": "paragraph",
          "text": "The base route on Lumière is five nights from Luxor to Aswan with overnight moorings at the islands of Fawza and Herbiab, at Gebel el-Silsila, at Kom Ombo and at Philae. The ship stops for the night where there are no other vessels; one evening is a campfire dinner on Herbiab island, another a private evening in a temple with the group there alone. The programme and the stops are built around the group: this is the format for a board, a partners’ strategy session or an executive retreat where the conversation matters more than the number of sights."
        },
        {
          "type": "image",
          "url": "/cruises/lumiere-private-night.webp",
          "alt": "A private evening in a temple, the Lumière charter format",
          "caption": "A private evening in a temple: one of the Lumière charter formats, with the group alone inside"
        },
        {
          "type": "heading",
          "text": "Nour El Nil dahabiya: six days under sail from Esna",
          "level": 3
        },
        {
          "type": "paragraph",
          "text": "A dahabiya is a two-masted sailing boat of the kind that plied the Nile in the nineteenth century, now with air conditioning, a shower in every cabin and solar panels on the roof. Nour El Nil runs a fleet of ten such boats for 16 to 24 guests, and we take them as whole boats for a group. There is one route: Esna to Aswan in six days, departing on Mondays and Tuesdays, in season from September to May. Full board and all guided excursions are included."
        },
        {
          "type": "list",
          "ordered": true,
          "items": [
            "Esna: embarkation, the temple of Khnum, which stands nine metres below street level, and the market streets.",
            "El Kab and Edfu: the temple of Nekhbet and the tombs in the hillside, then the temple of Horus by horse-drawn carriage.",
            "Just the Nile: a day under sail, a stop at a desert bank for a walk or a swim.",
            "Gebel el-Silsila: a night beside the illuminated temple of Horemheb at the narrowest point of the Nile. Large ships cannot come here, so the group is usually the only one.",
            "Kom Ombo: the temple of Sobek and the crocodile museum, the rest of the day under sail.",
            "Aswan: morning by the Aswan bridge, where the desert comes down to the water. Disembarkation."
          ]
        },
        {
          "type": "image",
          "url": "/cruises/dahabiya-two-sails.webp",
          "alt": "Two Nour El Nil dahabiyas under striped sails on the Nile",
          "caption": "Nour El Nil dahabiyas under sail. A format for a group of up to 24 that wants a pace rather than an itinerary"
        },
        {
          "type": "heading",
          "text": "An evening cruise in Cairo for a gala dinner",
          "level": 3
        },
        {
          "type": "paragraph",
          "text": "If the group’s programme is in Cairo and what it needs is one strong evening rather than a week on the river, there is the evening cruise in Cairo. Two to three hours on the water, dinner on board with the night city as the view, live music, up to 200 guests. The ship is taken whole: a format for gala evenings, corporate receptions and delegations. It pairs well with a conference in Cairo or as the closing night of a programme built around the pyramids."
        },
        {
          "type": "heading",
          "text": "Season and how far ahead to book",
          "level": 2
        },
        {
          "type": "paragraph",
          "text": "The Nour El Nil dahabiyas sail from September to May. For the classic ships the constraint is different: departures are tied to days of the week. The four-night sailing on Le Fayan Suites starts in Luxor on Mondays, and the dahabiyas leave Esna on Mondays and Tuesdays. For a group this means the trip dates follow the ship’s calendar rather than the other way round, and the earlier you come with dates, the wider the choice: the ship, the cabin categories and the free weeks for a full charter."
        },
        {
          "type": "callout",
          "variant": "success",
          "title": "The earlier, the wider the choice",
          "text": "A full charter means the whole ship for a specific week, and there are only as many such weeks in a year as there are sailings. Send us your dates as soon as they exist, even if the guest list is not final: we match the ship and the week before the list is closed."
        },
        {
          "type": "heading",
          "text": "What to send us to match a ship",
          "level": 2
        },
        {
          "type": "paragraph",
          "text": "To propose a ship, cabin categories and a route for your group, a short email is enough."
        },
        {
          "type": "list",
          "items": [
            "Dates or a date range, and the preferred length: 3, 4, 5 or 7 nights.",
            "Number of guests and the rooming pattern: twin, single, VIP guests in suites.",
            "The format: incentive, conference with a plenary, board retreat, gala evening.",
            "Whether a working session on board is needed and for how many people; this decides between Le Fayan Suites and Soleil.",
            "Guide language: English or Russian.",
            "Add-ons: Abu Simbel, the balloon over Luxor, a private evening in a temple, a dinner ashore.",
            "What comes before and after the cruise: Cairo, the Red Sea, or the Nile alone."
          ]
        },
        {
          "type": "paragraph",
          "text": "An incentive Nile cruise or a conference on the river: whatever the format, we run the group ourselves, from choosing the ship and cabin categories to coordination on board and a 24/7 duty office. Send us the dates and the number of guests, and we will propose a ship and a route and tell you whether a full charter is available for your week."
        }
      ]
    }
  },
  // ───────────────────────────────────────────────────────────────────────
  {
    id: 'organizaciya-konferencii-za-rubezhom',
    datePublished: '2026-07-18',
    image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&q=80&w=1600',
    ru: {
      title: 'Организация конференции за рубежом: чек-лист подготовки за 6 месяцев',
      category: 'Деловые мероприятия',
      date: '18 Июля, 2026',
      excerpt: 'Пошаговый план подготовки зарубежной конференции: что делать за 6, 4, 2 месяца и за неделю до события, как выбрать зал и не провалить технику, где чаще всего срываются сроки — и почему поздний список участников стоит дороже всего.',
      content: [
        { type: 'paragraph', text: 'Конференция за рубежом — самый сложный жанр корпоративных мероприятий. В отличие от корпоратива, здесь есть контент-программа со спикерами, техника, от которой зависит каждая минута, регистрация участников и репутация компании перед партнёрами и клиентами. Переделать что-то «на месте» в чужой стране почти невозможно — поэтому конференции выигрываются и проигрываются на этапе подготовки.' },
        { type: 'paragraph', text: 'Ниже — рабочий чек-лист, по которому мы готовим конференции от 100 до 1000 участников в Египте и ОАЭ. Он устроен по принципу обратного отсчёта: от полугода до недели перед событием.' },

        { type: 'stat', number: '6 месяцев', label: 'минимальный комфортный горизонт подготовки зарубежной конференции от 100 участников. Быстрее возможно, но каждый «сэкономленный» месяц оборачивается доплатой: дорогие билеты, занятые залы, спешка в программе' },

        { type: 'heading', text: 'Общий таймлайн: что и когда должно быть сделано', level: 2 },
        {
          type: 'table',
          headers: ['Срок до события', 'Ключевые задачи', 'Что будет, если опоздать'],
          rows: [
            ['6 месяцев', 'Цели, бюджет, страна, шорт-лист отелей, запрос корпоративных тарифов', 'Лучшие залы под ваши даты уже заняты'],
            ['5 месяцев', 'Контракт с отелем, блоки мест на рейсах, аванс', 'Тарифы отелей и авиакомпаний растут на 15–30%'],
            ['4 месяца', 'Программа, спикеры, модераторы, концепция вечерних форматов', 'Сильные спикеры расписаны, остаются «кто свободен»'],
            ['3 месяца', 'Запуск регистрации, брендинг, подрядчики по продакшну', 'Участники не успевают спланировать командировки'],
            ['2 месяца', 'Технический райдер, меню банкетов, предварительный ростер', 'Отель уже не гарантирует нужную рассадку и меню'],
            ['1 месяц', 'Финальный ростер, логистика трансферов, репетиционный план', 'Каждое изменение — за доплату и нервы'],
            ['1 неделя', 'Документы группы, финальные брифинги, авансовый расчёт с площадкой', 'Права на ошибку уже нет'],
          ],
          caption: 'Обратный отсчёт подготовки. Первые два пункта определяют 60% бюджета — см. нашу статью «Сколько стоит корпоратив за рубежом»',
        },

        { type: 'heading', text: 'Выбор страны и площадки: с чего начать', level: 2 },
        { type: 'paragraph', text: 'Для конференций из России и СНГ реально работают два направления. Египет (Шарм-эль-Шейх) — конференц-центры до 1500 человек, перелёт 4 часа, без визы, бюджет $700–1 800 на участника при формате 3–5 дней. ОАЭ (Дубай) — статусная инфраструктура мирового уровня и бюджет $2 000–4 500. Подробные раскладки по отелям и ценам — в наших разборах по Шарм-эль-Шейху и Дубаю.' },
        {
          type: 'list',
          items: [
            'Зал: вместимость с запасом 10–15% к ростеру, потолки от 4 метров под сцену и экраны, отсутствие колонн в зоне видимости.',
            'Второй контур: комнаты для секций, переговорные для B2B-встреч, зона выставки партнёров.',
            'Проживание в том же отеле: конференция «без трансферов» экономит по часу в день каждому участнику.',
            'Интернет: отдельный канал под трансляцию и синхроперевод, а не общий Wi-Fi отеля.',
            'Право раннего монтажа: сцена и свет ставятся ночью накануне, и это должно быть в контракте.',
          ],
        },

        { type: 'image', url: 'https://images.unsplash.com/photo-1594122230689-45899d9e6f69?auto=format&fit=crop&q=80&w=1600', alt: 'Зал конференции с участниками во время деловой сессии', caption: 'Правильный зал — тот, где последний ряд видит спикера и экран без бинокля. Проверяется только инспекционным визитом, а не фотографиями отеля' },

        { type: 'heading', text: 'Техника: где конференции ломаются чаще всего', level: 2 },
        { type: 'paragraph', text: 'По нашему опыту, девять из десяти «провалов» зарубежных конференций — это не программа и не логистика, а техника: не заработал синхроперевод, «упал» звук, презентации не открылись на местном оборудовании. Причина всегда одна — техническим продакшном занимался «отельный подрядчик по умолчанию» без внешнего контроля.' },
        {
          type: 'list',
          items: [
            'Синхронный перевод: кабины, приёмники по числу участников плюс 10% запас, два переводчика на язык на смену.',
            'Звук: линейный массив под размер зала, радиомикрофоны с запасными комплектами, звукорежиссёр на весь день, а не «на настройку».',
            'Видео: экран основной + дублирующие боковые от 300 участников, конфиденс-монитор для спикера, запись сессий.',
            'Свет: сценический свет отдельно от дежурного освещения зала — «конференция при люстрах» убивает картинку трансляции.',
            'Резерв: запасной проектор/медиасервер и человек, который знает, где что лежит.',
          ],
        },

        { type: 'heading', text: 'Логистика делегаций', level: 2 },
        { type: 'paragraph', text: 'Сто и более человек — это уже не «купить билеты», а управление потоками: блоки мест на рейсах из разных городов, стыковка прилётов с трансферами, распределение по номерам, учёт особых запросов. Здесь же — документы: для Египта виза не нужна (Sinai Free Zone), для ОАЭ — $65–90 с человека, и оформить их нужно до, а не в аэропорту.' },
        { type: 'callout', variant: 'warning', title: 'Самая дорогая ошибка — поздний список участников', text: 'Каждое имя, добавленное за две недели до вылета, стоит в полтора-два раза дороже: билеты по высокому тарифу, номер вне блока, доплаты за банкет. Закрывайте ростер за месяц — и закладывайте 5% резервных мест в блоках заранее.' },

        { type: 'image', url: 'https://images.unsplash.com/photo-1774205884989-37f0f2271503?auto=format&fit=crop&q=80&w=1600', alt: 'Организатор мероприятия работает с документами и ноутбуком', caption: 'За кулисами конференции — сотни строк ростеров, райдеров и таймингов. Именно эта невидимая работа отличает событие, которое «прошло гладко», от событий, о которых вспоминают с содроганием' },

        { type: 'heading', text: 'Делать самим или с агентством', level: 2 },
        {
          type: 'comparison',
          title: 'Два способа готовить зарубежную конференцию',
          left: { title: 'СВОИМИ СИЛАМИ', items: ['Работает при опыте команды и до ~50 участников', 'Открытые тарифы отелей (дороже на 15–40%)', 'Переговоры с площадкой через часовые пояса и языковой барьер', 'Нет своих людей на месте при форс-мажоре', 'HR и маркетинг выключены из основной работы на месяцы'], },
          right: { title: 'С MICE-АГЕНТСТВОМ', items: ['Корпоративные тарифы и знание площадок изнутри', 'Команда в стране проведения и контроль продакшна', 'Один договор и одна точка ответственности', 'Организационный сбор 10–15% — обычно меньше, чем экономия на тарифах', 'Ваша команда занимается контентом, а не логистикой'], },
        },

        { type: 'quote', text: 'Хорошая конференция выглядит так, будто организаторов вообще не было: всё просто работает. Столько же усилий, сколько в программу, нужно вложить в то, чего участники никогда не заметят.', author: 'Ксения Усачева, CEO Royal Event Group' },

        { type: 'paragraph', text: 'Royal Event Group проводит зарубежные конференции больше 20 лет — от отраслевых форумов на 100 персон до конференции Carlsberg на 1000 участников в Шарм-эль-Шейхе. Пришлите даты, ожидаемое число участников и формат — вернёмся с планом подготовки и постатейной сметой в течение 48 часов.' },
      ],
    },
    en: {
      title: 'Organizing a Conference Abroad: a 6-Month Preparation Checklist',
      category: 'Business Events',
      date: 'July 18, 2026',
      excerpt: 'A month-by-month checklist for international corporate conferences: venue selection, technical production, delegation logistics and the mistakes that cost the most.',
      content: `A conference abroad needs at least 6 months of preparation: destination and venue at month six, contracts and flight blocks at five, program and speakers at four, registration at three, technical riders at two, final rosters at one. Nine out of ten failures are technical production issues — simultaneous interpretation, sound, video — so never leave AV to the default hotel contractor without external control. The most expensive mistake is a late participant list: every name added two weeks before departure costs 1.5–2x more. Royal Event Group has run conferences from 100 to 1,000 participants in Egypt and UAE for 20+ years — send us your dates and headcount for a preparation plan and itemized quote within 48 hours.`,
    },
  },
  // ───────────────────────────────────────────────────────────────────────
  {
    id: 'insentiv-tur-dlya-sotrudnikov',
    datePublished: '2026-07-18',
    image: 'https://images.unsplash.com/photo-1778109375899-078e1f741422?auto=format&fit=crop&q=80&w=1600',
    ru: {
      title: 'Инсентив-тур для сотрудников: форматы, бюджеты и как посчитать эффект',
      category: 'Корпоративная культура',
      date: '18 Июля, 2026',
      excerpt: 'Что такое инсентив-тур и почему это не «корпоратив подороже»: пять рабочих форматов мотивационных поездок, бюджеты по направлениям, программа, которая даёт вау-эффект, и метрики, по которым бизнес видит возврат вложений.',
      content: [
        { type: 'paragraph', text: 'Инсентив-тур — это поездка-награда: компания вывозит лучших сотрудников или партнёров туда, куда они вряд ли поехали бы сами, и так, как они сами бы не съездили. От корпоратива инсентив отличается принципиально: корпоратив собирает всех, инсентив — избранных. Именно эта избранность и делает его одним из самых сильных инструментов мотивации в арсенале HR.' },
        { type: 'paragraph', text: 'Разбираем, какие форматы работают, сколько это стоит по направлениям, из чего складывается программа уровня «расскажу внукам» — и как посчитать эффект, чтобы финансовый директор подписал бюджет не из вежливости.' },

        { type: 'stat', number: '2 квартала', label: 'столько в среднем работает мотивационный эффект анонсированного инсентива: сотрудники бьются за место в поездке до неё и удерживают планку после. Поэтому инсентив анонсируют заранее — как приз, а не как сюрприз' },

        { type: 'heading', text: 'Пять рабочих форматов', level: 2 },
        {
          type: 'table',
          headers: ['Формат', 'Для кого', 'Длительность', 'Бюджет на человека'],
          rows: [
            ['Люкс-уикенд', 'Топ-менеджмент, 10–20 чел', '3 дня', '$2 500–4 500 (ОАЭ, Four Seasons Шарм)'],
            ['Тур для лучших продавцов', 'Победители годового конкурса, 30–100 чел', '4–5 дней', '$1 200–2 000 (Египет 5★)'],
            ['Партнёрский инсентив', 'Дилеры и ключевые клиенты', '4 дня', '$1 500–2 500'],
            ['Спорт/приключение', 'Команды-победители, молодые коллективы', '4–5 дней', '$1 100–1 800 (дайвинг, пустыня, яхты)'],
            ['Wellness-ретрит', 'Выгорающие ключевые специалисты', '5 дней', '$1 400–2 200 (спа-курорты, Анантара-формат)'],
          ],
          caption: 'Бюджеты «под ключ» с перелётом из Москвы. Верхняя граница — ОАЭ и эксклюзивная программа, нижняя — Египет со стандартным наполнением',
        },

        { type: 'heading', text: 'Программа: из чего складывается «вау»', level: 2 },
        { type: 'paragraph', text: 'Главное правило инсентива: в программе должно быть то, что нельзя купить как турист. Отель 5★ сегодня никого не удивляет — удивляет доступ к закрытому и персональное отношение.' },
        {
          type: 'list',
          items: [
            'Эксклюзивные локации: ужин в пустыне на закате с бедуинским лагерем «только для вас», а не экскурсия по расписанию.',
            'Приватный формат: яхта на день с командой, закрытый пляж, шеф-повар, который готовит при гостях.',
            'Персонализация: встреча по именам, подарки со смыслом, а не «ручка с логотипом», видеофильм о поездке каждому.',
            'Церемония: момент признания заслуг — награждение на фоне моря работает сильнее, чем в московском ресторане.',
            'Свободное пространство: инсентив — не конференция, минимум обязательных активностей, максимум выбора.',
          ],
        },

        { type: 'image', url: 'https://images.unsplash.com/photo-1762538190374-310cda4382dc?auto=format&fit=crop&q=80&w=1600', alt: 'Группа на верблюдах в песчаных дюнах на закате — выездная программа инсентив-тура', caption: 'Закатный караван в пустыне — классика инсентива в Египте и ОАЭ: впечатление, которое невозможно повторить самостоятельно и невозможно забыть' },

        { type: 'heading', text: 'Как посчитать эффект', level: 2 },
        { type: 'paragraph', text: 'Инсентив — из немногих HR-инструментов с честно измеримым результатом, потому что у него есть контрольная точка: показатели тех, кто боролся за поездку, против тех, кто нет.' },
        {
          type: 'list',
          items: [
            'Выполнение плана в квартал анонса и квартал после поездки — против той же базы год назад.',
            'Удержание ключевых людей: стоимость замены менеджера — 6–12 его окладов; инсентив на $1 500 дешевле одного ушедшего продавца.',
            'eNPS до и после: поездка двигает лояльность заметнее, чем индексация на те же деньги.',
            'Контент-эффект: фото и видео из поездки — лучший материал для HR-бренда и рекрутинга на год вперёд.',
          ],
        },
        { type: 'callout', variant: 'success', title: 'Правило анонса', text: 'Инсентив объявляют в начале мотивационного периода с понятными критериями: кто, за что и куда едет. Сама гонка за место в самолёте приносит бизнесу больше, чем поездка, — а поездка закрепляет результат.' },

        { type: 'image', url: 'https://images.unsplash.com/photo-1758691737584-a8f17fb34475?auto=format&fit=crop&q=80&w=1600', alt: 'Команда празднует успех в офисе — мотивационный эффект инсентив-программы', caption: 'Инсентив начинает работать в момент анонса: план продаж закрывают люди, которые уже видят себя на палубе яхты' },

        { type: 'heading', text: 'Частые ошибки', level: 2 },
        {
          type: 'comparison',
          title: 'Почему один инсентив меняет год, а другой забывают за неделю',
          left: { title: 'НЕ РАБОТАЕТ', items: ['Поездка «всем отделом за компанию» — исчезает статус награды', 'Программа как у турфирмы: автобус, экскурсия, шведский стол', 'Экономия на мелочах: доплаты с сотрудников, эконом-стыковки по 8 часов', 'Сюрприз-формат: о поездке узнают за неделю — мотивационный эффект равен нулю'], },
          right: { title: 'РАБОТАЕТ', items: ['Прозрачные критерии отбора и публичный анонс заранее', 'Эксклюзив, недоступный туристу: закрытые локации, персональный сервис', 'Церемония признания заслуг как кульминация', 'Пост-эффект: фильм о поездке, мерч, истории внутри компании'], },
        },

        { type: 'quote', text: 'Лучший вопрос для проверки программы инсентива: «Смог бы человек купить это себе сам?» Если да — это просто путешествие за счёт компании. Если нет — это награда, о которой будут говорить.', author: 'Ксения Усачева, CEO Royal Event Group' },

        { type: 'paragraph', text: 'Royal Event Group делает инсентив-программы в Египте и ОАЭ: от люкс-уикендов для правления до туров на сто лучших продавцов — с закрытыми ужинами в пустыне, яхтами и церемониями награждения на Красном море. Расскажите, кого и за что хотите наградить, — соберём формат, программу и постатейную смету за 48 часов.' },
      ],
    },
    en: {
      title: 'Incentive Travel for Employees: Formats, Budgets and Measurable Impact',
      category: 'Corporate Culture',
      date: 'July 18, 2026',
      excerpt: 'What makes incentive travel different from a corporate party: five working formats, budgets by destination, wow-level programs and the metrics that prove ROI.',
      content: `Incentive travel is a reward trip for your best people — and one of the few HR tools with measurable ROI. Working formats range from luxury executive weekends ($2,500–4,500 per person in UAE) to top-seller tours in Egypt ($1,200–2,000). The golden rule: the program must include what money cannot buy as a tourist — private desert dinners, yachts, personal recognition ceremonies. Announce the trip at the start of the motivation period with transparent criteria: the race for a seat drives more results than the trip itself. Royal Event Group builds incentive programs in Egypt and UAE — tell us who you want to reward and we will return a format, program and itemized budget within 48 hours.`,
    },
  },
  // ───────────────────────────────────────────────────────────────────────
  {
    id: 'novogodnij-korporativ-za-granicej',
    datePublished: '2026-07-18',
    image: 'https://images.unsplash.com/photo-1766856925165-94997a2104b4?auto=format&fit=crop&q=80&w=1600',
    ru: {
      title: 'Новогодний корпоратив за границей: направления, бюджеты и почему бронировать нужно уже в августе',
      category: 'Деловые мероприятия',
      date: '18 Июля, 2026',
      excerpt: 'Куда вывезти команду на Новый год: сравнение направлений и бюджетов, реальная смета на 80 человек, лайфхак с январскими датами, который экономит треть сметы, и календарь бронирования — почему выигрывают те, кто решает до сентября.',
      content: [
        { type: 'paragraph', text: 'Новогодний корпоратив за границей планируют летом. Это не фигура речи: декабрь — самый высокий сезон в тёплых странах, и к октябрю лучшие отели под групповые даты уже расписаны, а тарифы — на пике. Компании, которые принимают решение в августе-сентябре, получают выбор площадок и цены на 20–40% ниже тех, кто спохватился в ноябре.' },
        { type: 'paragraph', text: 'Разбираем, куда везти команду, сколько это стоит, как выглядит смета на 80 человек — и главный лайфхак жанра: почему «новогодний» корпоратив в январе выгоднее декабрьского.' },

        { type: 'stat', number: '+30–50%', label: 'настолько выше стандартных тарифы отелей и авиабилетов на датах 28 декабря — 7 января. Смещение корпоратива на середину января возвращает эти деньги в бюджет — при той же погоде на Красном море' },

        { type: 'heading', text: 'Куда везти: три сценария', level: 2 },
        {
          type: 'table',
          headers: ['Направление', 'Бюджет на человека (4 дня)', 'Погода в декабре–январе', 'Кому подходит'],
          rows: [
            ['Египет (Шарм-эль-Шейх)', '$1 100–2 000 (НГ-даты), $900–1 500 (январь)', '+22–26°, море +24°', 'Команды 50–500 чел, лучший прайс/качество'],
            ['ОАЭ (Дубай)', '$2 500–5 000', '+24–27°', 'Статусные форматы, VIP и топ-менеджмент'],
            ['Россия (Красная Поляна и др.)', '₽70 000–150 000', 'Зима, горы', 'Когда загранпаспорта есть не у всех'],
          ],
          caption: 'Вилки «под ключ» с перелётом из Москвы. На новогодних датах к любому направлению прибавляйте банкет в ночь 31-го — он тарифицируется отдельно и дорого',
        },

        { type: 'heading', text: 'Главный лайфхак: январь вместо декабря', level: 2 },
        { type: 'paragraph', text: 'Новогодний корпоратив не обязан проходить до Нового года. Формат «встречаем рабочий год» в середине января решает сразу три проблемы: тарифы падают на 30–40% от пиковых, сотрудники не разрываются между корпоративом и семейными праздниками, а отели пусты — группа получает лучшие залы и внимание персонала. На Красном море при этом всё те же +25° и тёплое море.' },
        { type: 'callout', variant: 'success', title: 'Проверено на практике', text: 'Перенос корпоратива на 100 человек с 28 декабря на 16 января экономит $30 000–45 000 только на отеле и перелёте — этого хватает на люкс-программу: яхты, ужин в пустыне и артистов, на которых «не хватало» в декабрьской смете.' },

        { type: 'image', url: 'https://images.unsplash.com/photo-1605744435823-b88e4e9bc044?auto=format&fit=crop&q=80&w=1600', alt: 'Бокалы с напитками на праздничном банкете — новогодний корпоративный ужин', caption: 'Гала-ужин — сердце новогоднего корпоратива. На пиковых датах банкетные меню отелей дорожают в полтора-два раза: ещё один аргумент за январь' },

        { type: 'heading', text: 'Смета: 80 человек, 4 дня, Шарм-эль-Шейх, середина января', level: 2 },
        {
          type: 'table',
          headers: ['Статья', 'Сумма'],
          rows: [
            ['Перелёт Москва — Шарм (блоки мест)', '$38 000'],
            ['Проживание: 40 номеров × 3 ночи, 5★ all-inclusive', '$22 000'],
            ['Новогодний гала-ужин на террасе + шоу', '$14 000'],
            ['Дневная программа: яхты, пустыня, тимбилдинг', '$11 000'],
            ['Свет, звук, диджей, ведущий', '$6 500'],
            ['Трансферы, декор, подарки', '$6 000'],
            ['Организационный сбор', '$11 500'],
            ['ИТОГО', '$109 000 (~$1 360 на человека)'],
          ],
          caption: 'Та же программа на датах 28.12–02.01 стоила бы $145 000–155 000 — январь экономит четверть бюджета',
        },

        { type: 'heading', text: 'Календарь бронирования', level: 2 },
        {
          type: 'list',
          items: [
            'Июль–август: решение по направлению и бюджету, запрос корпоративных тарифов, бронь отеля под опцион.',
            'Сентябрь: контракт с отелем, блоки мест на рейсах — до осеннего подорожания.',
            'Октябрь: программа, артисты, ведущий, концепция гала-ужина.',
            'Ноябрь: ростер участников, меню, рассадка, брендинг.',
            'Декабрь: только финальные штрихи — всё крупное уже зафиксировано по летним ценам.',
          ],
          ordered: true,
        },
        { type: 'callout', variant: 'warning', title: 'Чего не делать', text: 'Не ждать ноября («ещё рано, доживём до осени») — к ноябрю остаются худшие залы по лучшим ценам… для отеля. И не устраивать банкет в ночь с 31-го на 1-е без запроса тарифа заранее: новогодняя ночь у отелей тарифицируется как отдельное дорогое событие.' },

        { type: 'image', url: 'https://images.unsplash.com/photo-1533230408708-8f9f91d1235a?auto=format&fit=crop&q=80&w=1600', alt: 'Праздничный фейерверк в ночном небе над курортом', caption: 'Фейерверк над Красным морем вместо серого декабрьского неба — то, ради чего командам и устраивают Новый год за границей' },

        { type: 'heading', text: 'Египет или Дубай на Новый год', level: 2 },
        {
          type: 'comparison',
          title: 'Два тёплых сценария новогоднего корпоратива',
          left: { title: 'ЕГИПЕТ', items: ['$1 100–2 000 на человека на НГ-датах', 'Без визы, 4 часа лёту', 'All-inclusive: банкетная часть предсказуема по деньгам', 'Идеален для команд от 50 человек'], },
          right: { title: 'ДУБАЙ', items: ['$2 500–5 000 на человека', 'Новогодний салют у Burj Khalifa — топ-впечатление мира', 'Виза $65–90, билеты дорожают раньше всех', 'Формат для топ-состава и VIP-клиентов'], },
        },

        { type: 'quote', text: 'Лучший новогодний корпоратив — тот, что забронирован в августе. Всё, что компания «выигрывает», откладывая решение, она потом отдаёт отелю и авиакомпании — с процентами.', author: 'Ксения Усачева, CEO Royal Event Group' },

        { type: 'paragraph', text: 'Royal Event Group проводит новогодние корпоративы в Египте и ОАЭ больше 20 лет: свои команды на местах, прямые контракты с отелями и опыт декабрьских пиков. Напишите нам до конца августа — успеем взять лучшие площадки под ваши даты и вернём смету в течение 48 часов.' },
      ],
    },
    en: {
      title: 'New Year Corporate Party Abroad: Destinations, Budgets and Why to Book in August',
      category: 'Business Events',
      date: 'July 18, 2026',
      excerpt: 'Where to take your team for New Year: destination comparison, a real budget for 80 people, the January hack that saves a third of the budget, and a booking calendar.',
      content: `December is peak season in warm destinations: hotel and flight rates rise 30–50% around New Year dates, and the best group venues are booked by October. Companies deciding in August–September get both the choice and prices 20–40% lower. The biggest hack: hold your «New Year» event in mid-January — same +25° weather on the Red Sea, 30–40% lower rates, empty venues and no conflict with family holidays. A 4-day event for 80 people in Sharm El Sheikh costs about $109,000 in mid-January versus $145,000+ on peak dates. Royal Event Group has run New Year corporate events in Egypt and UAE for 20+ years — contact us before the end of August to secure the best venues.`,
    },
  },
  // ───────────────────────────────────────────────────────────────────────
  {
    id: 'skolko-stoit-korporativ-za-rubezhom',
    datePublished: '2026-07-18',
    image: 'https://images.unsplash.com/photo-1653821355736-0c2598d0a63e?auto=format&fit=crop&q=80&w=1600',
    ru: {
      title: 'Сколько стоит корпоратив за рубежом в 2026: бюджеты по странам, реальные сметы и на чём нельзя экономить',
      category: 'Деловые мероприятия',
      date: '18 Июля, 2026',
      excerpt: 'Разбираем бюджет зарубежного корпоратива по статьям: сколько закладывать на человека в Египте, ОАЭ и Турции, как выглядит реальная смета на 50 и 150 участников, где прячутся скрытые расходы и на чём можно сэкономить без потери качества.',
      content: [
        { type: 'paragraph', text: 'Первый вопрос, который задаёт любой заказчик корпоратива за рубежом: «Сколько это стоит?» И это единственный вопрос, на который честное агентство не ответит одной цифрой. Вилка реальна: одна и та же компания на 100 человек может уложиться в $80 000, а может потратить $400 000 — и оба мероприятия будут «корпоративом за границей». Разница — в стране, отеле, длительности и наполнении программы.' },
        { type: 'paragraph', text: 'В этой статье мы разложим бюджет по полочкам: из чего складывается смета, сколько закладывать на человека в разных странах, как выглядят реальные сметы, где обычно прячутся незапланированные расходы — и на каких статьях можно экономить, а на каких это выйдет дороже.' },

        { type: 'stat', number: '55–65%', label: 'бюджета зарубежного корпоратива уходит на две статьи: перелёт и проживание. Именно поэтому выбор страны и отеля определяет смету сильнее, чем любые решения по программе' },

        { type: 'heading', text: 'Из чего складывается бюджет: 8 статей расходов', level: 2 },
        { type: 'paragraph', text: 'Любая смета зарубежного корпоратива — независимо от страны и масштаба — состоит из одних и тех же блоков. Понимая их структуру, вы сможете читать предложения агентств осознанно и сравнивать их корректно.' },
        {
          type: 'list',
          items: [
            'Перелёт — 20–35% бюджета. Регулярные рейсы, блоки мест или чартер: на группах от 150 человек чартер часто выгоднее и всегда удобнее.',
            'Проживание — 25–35%. Корпоративные тарифы отелей ниже открытых цен на 15–40% — это главная точка экономии, доступная только через агентство с прямыми контрактами.',
            'Питание и банкеты — 10–15%. В all-inclusive отелях Египта и Турции частично «зашито» в проживание; в ОАЭ и Европе считается отдельно и ощутимо.',
            'Конференц-часть — 5–10%. Залы, свет, звук, экраны, синхронный перевод, техперсонал.',
            'Программа и активности — 8–15%. Ведущие, артисты, тимбилдинг, выездные форматы, шоу.',
            'Трансферы и логистика на месте — 3–5%. Аэропорт—отель, выездные локации, VIP-транспорт для спикеров.',
            'Брендинг и продакшн — 3–7%. Застройка сцены, декор, welcome-зоны, полиграфия, подарки.',
            'Организационный сбор агентства — 10–15% от сметы. В честной смете он виден отдельной строкой, а не «размазан» по позициям.',
          ],
        },

        { type: 'heading', text: 'Бюджеты по странам: сколько закладывать на человека', level: 2 },
        { type: 'paragraph', text: 'Ориентиры ниже — на полный пакет «под ключ»: перелёт из Москвы, размещение 4–5★, питание, конференц-часть и вечерняя программа, длительность 4–5 дней. Это средние вилки по нашим проектам последних двух лет.' },
        {
          type: 'table',
          headers: ['Направление', 'Бюджет на человека', 'Перелёт из Москвы', 'Когда выбирать'],
          rows: [
            ['Египет (Шарм-эль-Шейх)', '$1 000–1 800', '4 часа, прямые рейсы', 'Массовые корпоративы, конференции, лучший прайс/качество'],
            ['ОАЭ (Дубай)', '$2 000–4 500', '5 часов, прямые рейсы', 'Премиум-инсентивы, VIP-форматы, вау-эффект'],
            ['Турция (Анталья/Белек)', '$1 100–2 000', '3,5 часа, прямые рейсы', 'Сезон май–октябрь, гольф- и спорт-форматы'],
            ['Россия (Сочи/Алтай)', '₽90 000–180 000', '—', 'Когда загранпаспорта есть не у всех участников'],
          ],
          caption: 'Вилки на 4–5-дневный корпоратив «под ключ». Нижняя граница — отели 4★ и стандартная программа, верхняя — 5★ и насыщенное наполнение',
        },
        { type: 'paragraph', text: 'Важная деталь: внутри одной страны разброс тоже значительный. В том же Шарм-эль-Шейхе конференция на 500 человек в Domina Coral Bay за счёт корпоративных тарифов обойдётся в $700–1 200 на участника, а премиум-выезд топ-менеджмента в Four Seasons — в $2 500–4 500.' },

        { type: 'image', url: 'https://images.unsplash.com/photo-1700514077430-3659e38eb5e7?auto=format&fit=crop&q=80&w=1600', alt: 'Банкетный зал отеля, подготовленный к корпоративному гала-ужину', caption: 'Гала-ужин — статья, где виден класс мероприятия. В смете это 10–15% бюджета, в впечатлениях гостей — половина эффекта' },

        { type: 'divider' },

        { type: 'heading', text: 'Две реальные сметы: 50 и 150 человек, Египет, 4 дня', level: 2 },
        { type: 'paragraph', text: 'Чтобы вилки стали осязаемыми — две обезличенные сметы из нашей практики. Формат: 4 дня / 3 ночи в Шарм-эль-Шейхе, отель 5★, конференц-день, гала-ужин, выездная активность.' },
        {
          type: 'table',
          headers: ['Статья', '50 человек', '150 человек'],
          rows: [
            ['Перелёт (регулярные рейсы)', '$27 500', '$78 000'],
            ['Проживание, 3 ночи, 5★ (корп. тариф)', '$16 500', '$45 000'],
            ['Питание сверх пакета + гала-ужин', '$7 500', '$19 500'],
            ['Конференц-зал + техника + синхрон', '$5 500', '$9 000'],
            ['Программа: ведущий, шоу, тимбилдинг', '$8 000', '$16 500'],
            ['Трансферы и логистика', '$2 500', '$6 000'],
            ['Брендинг, декор, подарки', '$3 500', '$8 500'],
            ['Организационный сбор', '$8 500', '$21 500'],
            ['ИТОГО', '$79 500 (~$1 590/чел)', '$204 000 (~$1 360/чел)'],
          ],
          caption: 'На больших группах цена на человека снижается: корпоративные тарифы отелей, чартерная логика перелёта и «неделимые» расходы (сцена, техника), которые распределяются на всех',
        },

        { type: 'heading', text: 'Скрытые расходы: где сметы «худеют» на бумаге и «толстеют» в жизни', level: 2 },
        { type: 'callout', variant: 'warning', title: 'Проверьте до подписания договора', text: 'Если предложение агентства заметно дешевле рынка — почти всегда из сметы «выпало» что-то из списка ниже. Дешёвая смета на входе регулярно оборачивается доплатами в 15–25% по ходу проекта.' },
        {
          type: 'list',
          items: [
            'Городские и туристические сборы отелей — в ОАЭ это Tourism Dirham, который часто «забывают» включить.',
            'Сервисный сбор и налоги на банкеты — в ОАЭ +17–22% к прайсу банкетного меню.',
            'Техперсонал сверх нормы: монтаж сцены ночью, работа звукорежиссёра после 23:00.',
            'Виза и страховки — для ОАЭ $65–90 с человека, о которых вспоминают в последний момент.',
            'Курсовая разница: смета в рублях без фиксации курса — мина замедленного действия.',
            'Доплата за одноместное размещение: если половина участников не готова жить по двое, бюджет проживания вырастает на 30–40%.',
            'Провоз оборудования и брендинга: перевес багажа, таможня, локальная печать.',
          ],
        },

        { type: 'heading', text: 'На чём можно экономить — и на чём нельзя', level: 2 },
        {
          type: 'comparison',
          title: 'Куда смотреть при оптимизации бюджета',
          left: { title: 'ЭКОНОМИТЬ НЕЛЬЗЯ', items: ['Технический продакшн конференции: звук и синхрон, которые «упали», обесценивают всё мероприятие', 'Трансферная логистика: час ожидания автобусов помнят дольше, чем гала-ужин', 'Питание в день конференции: голодный зал не слушает спикеров', 'Резерв 5–7% на непредвиденное — он будет израсходован всегда'], },
          right: { title: 'ЭКОНОМИТЬ МОЖНО', items: ['Даты: сдвиг на низкий сезон даёт минус 20–30% по отелю', 'Отель 4★+ вместо 5★ под массовую часть группы', 'Локальные артисты и ведущие вместо «звёзд» из Москвы', 'All-inclusive форматы, где питание уже в пакете', 'Готовые декорации отеля вместо полной застройки'], },
        },

        { type: 'stat', number: '20–30%', label: 'экономии даёт бронирование за 5–6 месяцев: ранние корпоративные тарифы отелей плюс дешёвые блоки мест на рейсах. Планирование «за месяц» — самый дорогой способ провести корпоратив' },

        { type: 'heading', text: 'Как получить честную смету', level: 2 },
        { type: 'paragraph', text: 'Запрашивая предложения у агентств, дайте всем одинаковую вводную: количество участников, даты (или гибкость по датам), уровень отеля, обязательные элементы программы. Тогда сметы можно будет сравнивать построчно, а не «общими суммами», за которыми у каждого агентства своё наполнение.' },
        { type: 'quote', text: 'Смета, в которой видна каждая строка — включая наш организационный сбор, — экономит заказчику больше, чем любая скидка. Потому что прозрачность на входе избавляет от доплат на выходе.', author: 'Ксения Усачева, CEO Royal Event Group' },
        { type: 'paragraph', text: 'Royal Event Group организует корпоративы в Египте, ОАЭ и России больше 20 лет: у нас прямые контракты с отелями, собственный продакшн и команда на местах. Пришлите вводные — количество людей, примерные даты, ожидания по формату — и мы вернёмся с постатейной сметой в течение 48 часов. Это бесплатно и ни к чему не обязывает.' },
      ],
    },
    en: {
      title: 'How Much Does a Corporate Event Abroad Cost in 2026: Budgets by Country',
      category: 'Business Events',
      date: 'July 18, 2026',
      excerpt: 'Real budget breakdown for corporate events abroad: per-person costs in Egypt, UAE and Turkey, sample budgets for 50 and 150 participants, hidden costs and where to save.',
      content: `A corporate event abroad costs $1,000–1,800 per person in Egypt, $2,000–4,500 in Dubai, and $1,100–2,000 in Turkey for a full 4–5 day package including flights, 4–5★ accommodation, conference facilities and evening program. Flights and accommodation take 55–65% of any budget, so the choice of country and hotel defines your costs more than any program decision. Booking 5–6 months ahead saves 20–30% through early corporate rates. Royal Event Group provides itemized quotes within 48 hours — with direct hotel contracts in Egypt and UAE and 20+ years of experience.`,
    },
  },
  // ───────────────────────────────────────────────────────────────────────
  {
    id: 'korporativ-v-egipte-ceny-2026',
    datePublished: '2026-07-17',
    image: 'https://images.unsplash.com/photo-1708694423464-0f5b19fb2444?auto=format&fit=crop&q=80&w=1600',
    ru: {
      title: 'Корпоратив в Египте: цены 2026 — реальная смета на 100 человек, тарифы отелей и сезонность',
      category: 'Локации',
      date: '17 Июля, 2026',
      excerpt: 'Полный разбор цен на корпоратив в Египте в 2026 году: сколько стоят отели Шарм-эль-Шейха для групп, как выглядит смета выезда на 100 человек, в какие месяцы дешевле и как сэкономить 20–30% без потери уровня.',
      content: [
        { type: 'paragraph', text: 'Египет — самое рациональное направление для зарубежного корпоратива из России: четыре часа прямого перелёта, посадка без визы, отели 5★ с собственными конференц-центрами и ценник в 2–2,5 раза ниже Дубая при сопоставимом уровне сервиса. Именно поэтому сюда везут и корпоративы на сто человек, и конференции на тысячу.' },
        { type: 'paragraph', text: 'В этой статье — только конкретика по деньгам: тарифы отелей для групп, постатейная смета реального формата на 100 человек, сезонные колебания цен и работающие способы оптимизации бюджета.' },

        { type: 'stat', number: '$1 000–1 800', label: 'полный бюджет качественного 4–5-дневного корпоратива в Египте на одного участника: перелёт, отель 5★, питание, конференц-часть и программа. В Дубае аналогичный формат стоит $2 000–4 500' },

        { type: 'heading', text: 'Почему Египет выигрывает по деньгам', level: 2 },
        {
          type: 'list',
          items: [
            'Прямые рейсы из Москвы, Петербурга, Казани, Екатеринбурга — 4 часа лёту, без пересадок и потерянного рабочего дня.',
            'Без визы: Sinai Visa Free Zone позволяет находиться в Шарм-эль-Шейхе до 14 дней бесплатно.',
            'All-inclusive: питание группы уже в пакете отеля — статья, которая в ОАЭ добавляет к смете десятки тысяч долларов, здесь почти закрыта.',
            'Круглогодичный сезон: Красное море тёплое даже в январе — можно планировать корпоратив на «мёртвые» зимние месяцы по низким тарифам.',
            'Русскоговорящий персонал в крупных отелях и наша команда на месте — ниже расходы на сопровождение и переводчиков.',
          ],
        },

        { type: 'heading', text: 'Тарифы отелей Шарм-эль-Шейха для групп, 2026', level: 2 },
        { type: 'paragraph', text: 'Цены ниже — корпоративные тарифы за номер в сутки при групповом бронировании (от 30 номеров), которые мы получаем по прямым контрактам. Открытые цены на сайтах бронирования выше на 15–40%.' },
        {
          type: 'table',
          headers: ['Отель', 'Зона', 'Вместимость залов', 'Тариф за номер'],
          rows: [
            ['Domina Coral Bay', 'Sharks Bay', 'до 1500 чел', 'от $120'],
            ['Grand Rotana', 'Naama Bay', 'до 300 чел', 'от $140'],
            ['Park Regency', 'Hadaba', 'до 400 чел', 'от $160'],
            ['Savoy / Soho Square', 'Nabq', 'до 500 чел', 'от $180'],
            ['Rixos Seagate', 'Nabq Bay', 'до 600 чел', 'от $200'],
            ['Four Seasons Resort', 'Sharks Bay', 'до 200 чел', 'от $350'],
          ],
          caption: 'Корпоративные тарифы при групповом бронировании, сезон 2026. Точная цена зависит от дат, глубины бронирования и загрузки отеля',
        },

        { type: 'image', url: 'https://images.unsplash.com/photo-1641966153139-98999b3eb6bb?auto=format&fit=crop&q=80&w=1600', alt: 'Бассейн курортного отеля в окружении пальм — территория для корпоративного выезда', caption: 'Курорты Шарма строились под большие группы: собственные пляжи, бассейны и банкетные террасы означают, что вечернюю программу не нужно «выносить» на сторонние площадки' },

        { type: 'heading', text: 'Реальная смета: 100 человек, 4 дня, отель 5★', level: 2 },
        { type: 'paragraph', text: 'Формат из нашей практики: 4 дня / 3 ночи, Rixos-уровень, день конференции, гала-ужин на пляже, выездной тимбилдинг в пустыне. Числа округлены, структура — настоящая.' },
        {
          type: 'table',
          headers: ['Статья', 'Сумма', 'Доля'],
          rows: [
            ['Перелёт Москва — Шарм, 100 мест', '$52 000', '36%'],
            ['Проживание: 50 номеров × 3 ночи, all-inclusive', '$31 500', '22%'],
            ['Гала-ужин на пляже + банкетные доплаты', '$12 000', '8%'],
            ['Конференц-зал, техника, синхронный перевод', '$7 500', '5%'],
            ['Программа: ведущий, шоу, тимбилдинг в пустыне', '$14 000', '10%'],
            ['Трансферы, логистика, сопровождение', '$4 500', '3%'],
            ['Брендинг, welcome-зона, подарки', '$6 500', '5%'],
            ['Организационный сбор агентства', '$16 000', '11%'],
            ['ИТОГО', '$144 000', '$1 440 на человека'],
          ],
          caption: 'Смета «под ключ» без скрытых доплат. Обратите внимание: питание почти не отдельная статья — all-inclusive закрывает завтраки, обеды и ужины кроме гала-вечера',
        },

        { type: 'heading', text: 'Сезонность: когда ехать дешевле', level: 2 },
        { type: 'paragraph', text: 'Цены отелей Шарма гуляют в пределах 30–40% в зависимости от сезона — и этим стоит пользоваться, если даты корпоратива гибкие.' },
        {
          type: 'table',
          headers: ['Период', 'Уровень цен', 'Комментарий'],
          rows: [
            ['Сентябрь — начало декабря', 'Высокий', 'Бархатный сезон, пик спроса — бронировать за 5–6 месяцев'],
            ['Новогодние праздники', 'Пиковый', 'Максимальные тарифы, залы заняты — не лучшее время для бюджета'],
            ['Середина января — февраль', 'Низкий', 'Море +24°, воздух +22–25° — лучшее соотношение цены и погоды'],
            ['Март — май', 'Средний', 'Комфортная погода, умеренные цены'],
            ['Июнь — август', 'Низкий', 'Жарко (+35°+), но конференц-форматы в залах работают отлично'],
          ],
          caption: 'Зимний корпоратив в Египте — недооценённый формат: пока в Москве −15°, группа работает и отдыхает при +25°, а отель стоит на треть дешевле осеннего',
        },

        { type: 'divider' },

        { type: 'heading', text: 'Перелёт: регулярка, блоки, чартер', level: 2 },
        {
          type: 'list',
          items: [
            'До 100 человек — блоки мест на регулярных рейсах: $450–600 на человека туда-обратно в зависимости от сезона и глубины бронирования.',
            '150–200 человек — комбинация блоков на нескольких рейсах либо чартер: группа летит вместе, багажные нормы под оборудование.',
            'От 200 человек — собственный чартер почти всегда выгоднее: $500–650 на человека при полной загрузке борта плюс полный контроль расписания.',
          ],
        },

        { type: 'image', url: 'https://images.unsplash.com/photo-1718846526824-f7f30a177d3a?auto=format&fit=crop&q=80&w=1600', alt: 'Панорама пляжа Красного моря с пирсом — место проведения выездных корпоративных программ', caption: 'Пляжные гала-ужины и морские активности — то, ради чего корпоратив вывозят из конференц-залов Москвы. В Египте это входит в базовый бюджет, а не в премиальный' },

        { type: 'heading', text: 'Египет или ОАЭ: короткая шпаргалка', level: 2 },
        {
          type: 'comparison',
          title: 'Куда везти корпоратив',
          left: { title: 'ЕГИПЕТ', items: ['$1 000–1 800 на человека', 'Без визы, перелёт 4 часа', 'All-inclusive упрощает бюджет', 'Массовые корпоративы и конференции', 'Лучшее прайс/качество на рынке'], },
          right: { title: 'ОАЭ', items: ['$2 000–4 500 на человека', 'Виза $65–90, перелёт 5 часов', 'Статусные локации, вау-эффект', 'Премиум-инсентивы и VIP-форматы', 'Когда цель — впечатлить, а не сэкономить'], },
        },

        { type: 'heading', text: 'Кейс вместо теории', level: 2 },
        { type: 'paragraph', text: 'Крупнейший наш проект в Шарме — конференция Carlsberg на 1000 участников в Domina Coral Bay: за счёт корпоративных тарифов и масштаба бюджет на человека получился ниже, чем у многих московских мероприятий той же компании. А для NL International мы делали семидневный выезд в Park Regency — пример того, как all-inclusive формат держит смету под контролем даже на длинной программе.' },
        { type: 'callout', variant: 'success', title: 'Как сэкономить 20–30% без потери уровня', text: 'Бронируйте за 5–6 месяцев, рассматривайте зимние даты (январь–февраль), берите all-inclusive и отдайте переговоры с отелем агентству с прямыми контрактами — разница между открытым и корпоративным тарифом окупает организационный сбор целиком.' },
        { type: 'paragraph', text: 'Royal Event Group работает в Египте больше 20 лет: офис в Шарм-эль-Шейхе, прямые контракты со всеми отелями из таблицы выше, собственный продакшн и русскоговорящая команда на месте. Пришлите количество участников и примерные даты — вернёмся с постатейной сметой в течение 48 часов.' },
      ],
    },
    en: {
      title: 'Corporate Event in Egypt: 2026 Prices — Real Budget for 100 People, Hotel Rates and Seasons',
      category: 'Locations',
      date: 'July 17, 2026',
      excerpt: 'Full price breakdown for corporate events in Egypt 2026: group hotel rates in Sharm El Sheikh, a real itemized budget for 100 participants, seasonal pricing and how to save 20–30%.',
      content: `Egypt remains the best value MICE destination for groups from Russia and CIS: $1,000–1,800 per person for a full 4–5 day package (flights, 5★ all-inclusive hotel, conference facilities, gala dinner and activities) — 2–2.5x cheaper than Dubai at a comparable service level. Group hotel rates in Sharm El Sheikh start from $120/night at Domina Coral Bay and reach $350+ at Four Seasons. Winter dates (January–February) cut hotel costs by up to 30%. Royal Event Group has operated in Egypt for 20+ years with direct hotel contracts and an office in Sharm El Sheikh — send us your group size and dates for an itemized quote within 48 hours.`,
    },
  },
  // ───────────────────────────────────────────────────────────────────────
  {
    id: 'kak-vybrat-mice-agentstvo',
    datePublished: '2026-07-16',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1600',
    ru: {
      title: 'Как выбрать MICE-агентство: 12 вопросов, которые нужно задать до подписания договора',
      category: 'Деловые мероприятия',
      date: '16 Июля, 2026',
      excerpt: 'Чек-лист для тех, кто выбирает подрядчика на корпоратив или конференцию: 12 вопросов агентству, красные флаги в сметах и договорах, разница между ивент-агентством и DMC — и почему самая низкая цена почти всегда самая дорогая.',
      content: [
        { type: 'paragraph', text: 'Ошибка в выборе площадки стоит денег. Ошибка в выборе агентства стоит мероприятия целиком: перед залом на пятьсот человек нельзя «переиграть» подрядчика, у которого не вышел на связь локальный партнёр или «внезапно» подорожала смета. При этом рынок непрозрачен: у всех красивые презентации, у всех «двадцать лет опыта», у всех «прямые контракты».' },
        { type: 'paragraph', text: 'Мы сами — агентство, и нам выгодно, чтобы вы выбрали нас. Но ещё выгоднее нам рынок, на котором заказчик умеет отличать профессионала от посредника с презентацией. Поэтому ниже — честный чек-лист: 12 вопросов, которые мы советуем задать каждому претенденту, включая нас.' },

        { type: 'stat', number: '×2–3', label: 'во столько раз, по нашему опыту, вырастает цена ошибки при выборе подрядчика на зарубежном мероприятии по сравнению с российским: переделывать что-то в чужой стране за три дня до события — самая дорогая операция в ивент-индустрии' },

        { type: 'heading', text: 'Сначала разберитесь, кто перед вами', level: 2 },
        {
          type: 'list',
          items: [
            'Ивент-агентство — придумывает и делает само мероприятие: концепция, программа, продакшн, артисты. За рубежом работает через местных партнёров.',
            'DMC (Destination Management Company) — «принимающая сторона»: отели, трансферы, площадки, локальный продакшн в своей стране. Концепцию обычно не делает.',
            'Тревел-агентство — билеты, отели, визы. Мероприятие как таковое — не его профессия.',
            'Оптимальная схема для зарубежного корпоратива — подрядчик, совмещающий обе роли: агентство с собственной командой в стране проведения. Меньше посредников — меньше наценок и потерь на «испорченном телефоне».',
          ],
        },

        { type: 'heading', text: '12 вопросов агентству', level: 2 },
        {
          type: 'list',
          ordered: true,
          items: [
            'Покажете три реализованных проекта нашего масштаба в этой стране? Не «портфолио вообще», а конкретные кейсы с числом участников и форматом.',
            'Кто ваша команда на месте: штат или субподряд? Если субподряд — кто именно и сколько лет вы с ними работаете?',
            'У вас прямые контракты с отелями или бронируете через посредников? Разница — 15–40% на тарифах.',
            'Кто персонально ведёт наш проект и сколько проектов у него параллельно? Один менеджер на восемь проектов — это не менеджмент.',
            'Как выглядит ваша смета: постатейно с открытым организационным сбором или «пакетом»? Что произойдёт со сметой, если участников станет на 20% меньше?',
            'В какой валюте фиксируются обязательства и что с курсовой разницей?',
            'Какие гарантии по ключевым позициям: что будет, если отель овербукнет номера или артист отменится?',
            'Кто отвечает за технический продакшн — своя команда или площадка? Кто дежурит на площадке в день мероприятия?',
            'Какая схема оплат: сколько аванс, к чему привязаны платежи, есть ли постоплата?',
            'Как устроена отчётность: получим ли мы закрывающие документы по каждой статье, включая зарубежных поставщиков?',
            'Что входит в организационный сбор, а что оплачивается сверх — есть ли список?',
            'Дайте два контакта заказчиков, которым можно позвонить. Не письменные отзывы — телефоны.',
          ],
        },
        { type: 'paragraph', text: 'Обратите внимание: ни один из вопросов не про «сделаете ли красиво». Красиво сделают все — по крайней мере, в презентации. Вопросы — про устройство работы, потому что мероприятие ломается не в концепции, а в исполнении.' },

        { type: 'image', url: 'https://images.unsplash.com/photo-1681505531034-8d67054e07f6?auto=format&fit=crop&q=80&w=1600', alt: 'Рукопожатие над договором — этап выбора подрядчика мероприятия', caption: 'Договор с агентством — единственный документ, который защитит бюджет, когда что-то пойдёт не так. Всё важное — курс, штрафы, замены — должно быть в нём, а не в переписке' },

        { type: 'heading', text: 'Красные флаги: когда стоит насторожиться', level: 2 },
        { type: 'callout', variant: 'warning', title: 'Главный красный флаг — аномально низкая цена', text: 'Если одно предложение на 25–30% дешевле остальных при одинаковой вводной — из него что-то выпало: налоги, сервисные сборы, техперсонал, трансферы. Вы всё равно заплатите эти деньги, только уже без конкуренции — доплатами по ходу проекта.' },
        {
          type: 'list',
          items: [
            'Смета «одной строкой» или блоками без детализации — невозможно понять, за что вы платите.',
            'Отказ показать площадку/отель до подписания (инспекционный визит — нормальная практика, а не каприз).',
            'Нет юридического лица, договор предлагают с физлицом или иностранной прокладкой без обязательств.',
            '«Всё включено, никаких доплат» без письменного перечня включённого.',
            'Агентство не задаёт вам вопросов про цели мероприятия — значит, будет продавать шаблон.',
            'На вопросы из чек-листа выше отвечают «давайте это обсудим позже».',
          ],
        },

        { type: 'heading', text: 'Как читать смету', level: 2 },
        {
          type: 'comparison',
          title: 'Смета, которой можно верить, и смета-ловушка',
          left: { title: 'ЧЕСТНАЯ СМЕТА', items: ['Постатейная детализация до позиций', 'Организационный сбор отдельной строкой', 'Зафиксирован курс или валюта платежа', 'Указано, что будет при изменении числа участников', 'Резерв на непредвиденное — открыто'], },
          right: { title: 'СМЕТА-ЛОВУШКА', items: ['«Пакет» без расшифровки', 'Сбор «размазан» наценками по строкам', 'Рубли без курса на длинном горизонте', 'Любое изменение — «пересчитаем»', 'Слово «доплата» появляется после подписания'], },
        },

        { type: 'heading', text: 'Что зафиксировать в договоре', level: 2 },
        {
          type: 'list',
          items: [
            'Курс валюты или валюту обязательств — на зарубежных проектах это вопрос номер один.',
            'Постатейную смету как приложение к договору, а не «презентацию по мотивам».',
            'Условия замены ключевых позиций: отель той же категории и зоны, эквивалентный артист — с вашим согласованием.',
            'График платежей, привязанный к вехам (бронь отеля, выкуп билетов), а не к датам «просто так».',
            'Ответственность сторон при отмене: что возвращается, что нет, в какие сроки.',
            'Персональный состав: кто руководитель проекта, право заказчика на замену менеджера.',
          ],
        },

        { type: 'quote', text: 'Хорошее агентство узнаётся не по презентации, а по вопросам, которые оно задаёт вам. Если подрядчика интересует только бюджет и даты — он продаёт шаблон. Если он спрашивает про цели, аудиторию и что для вас «успех» — он собирается делать ваше мероприятие, а не своё.', author: 'Ксения Усачева, CEO Royal Event Group' },

        { type: 'image', url: 'https://images.unsplash.com/photo-1542732351-fa2c82b0c746?auto=format&fit=crop&q=80&w=1600', alt: 'Сценический свет на площадке мероприятия — зона ответственности технического продакшна', caption: 'Технический продакшн — то, что заказчик не видит в презентациях и что решает всё в день мероприятия. Вопрос «кто дежурит на площадке» важнее вопроса «какая у вас концепция»' },

        { type: 'heading', text: 'Вместо вывода: проверьте нас', level: 2 },
        { type: 'paragraph', text: 'Royal Event Group — MICE-агентство полного цикла с собственными командами в Египте, ОАЭ и России: 20+ лет на рынке, прямые контракты с отелями, свой продакшн, проекты от камерных ужинов на 20 персон до конференции Carlsberg на 1000 участников. Задайте нам все 12 вопросов из этой статьи — мы любим заказчиков, которые их задают: с ними получаются лучшие мероприятия.' },
      ],
    },
    en: {
      title: 'How to Choose a MICE Agency: 12 Questions to Ask Before Signing',
      category: 'Business Events',
      date: 'July 16, 2026',
      excerpt: 'A practical checklist for choosing an event partner: 12 questions to ask any agency, red flags in quotes and contracts, and why the lowest price is almost always the most expensive.',
      content: `Choosing the wrong venue costs money; choosing the wrong agency costs the entire event. Ask every candidate 12 questions: from real cases of your scale and in-country teams to direct hotel contracts, itemized quotes with visible agency fees, currency terms and technical production responsibility. The biggest red flag is an abnormally low quote — taxes, service charges and tech staff have simply been left out, and you will pay for them later without competition. Royal Event Group is a full-cycle MICE agency with own teams in Egypt, UAE and Russia, 20+ years in the market and projects up to 1,000 participants. Ask us all 12 questions — we enjoy clients who do.`,
    },
  },
  // ───────────────────────────────────────────────────────────────────────
  {
    id: 'gde-provesti-korporativ-v-oae-dubai',
    datePublished: '2026-05-27',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=1600',
    ru: {
      title: 'Где провести корпоратив в ОАЭ: 7 отелей Дубая, зоны, бюджеты и логистика для российских делегаций',
      category: 'Локации',
      date: '27 Мая, 2026',
      excerpt: 'Дубай — топовое направление для премиум-корпоративов. Разбираем ключевые MICE-зоны города, 7 проверенных отелей с реальными ценами, бюджеты и особенности логистики для делегаций из России.',
      content: [
        { type: 'paragraph', text: 'Дубай — самое дорогое и одновременно самое статусное MICE-направление Ближнего Востока. Компании выбирают его, когда нужно произвести впечатление на топ-клиентов, наградить лучших сотрудников премиум-инсентивом или провести флагманскую конференцию с международным составом делегаций. Взамен вы получаете инфраструктуру мирового уровня, узнаваемые локации (Burj Khalifa, Palm Jumeirah, Marina), и «вау-эффект», который сам работает на PR мероприятия.' },
        { type: 'paragraph', text: 'Разбираем подробно: какие зоны Дубая под какие задачи, семь топовых отелей для корпоратива с реальными ценами, что делать с бюджетом и логистикой для российских делегаций.' },

        { type: 'stat', number: '+27%', label: 'рост числа деловых мероприятий в Дубае в 2024–2025 годах. ОАЭ стали крупнейшим MICE-хабом Ближнего Востока', source: 'отраслевая аналитика' },

        { type: 'heading', text: 'Основные MICE-зоны Дубая', level: 2 },
        { type: 'paragraph', text: 'Дубай — большой город, и разные его зоны заточены под разные форматы мероприятий. От правильного выбора локации зависит логистика, бюджет и общее впечатление гостей.' },
        {
          type: 'list',
          items: [
            'Downtown Dubai — историческое сердце с Burj Khalifa и Dubai Mall. Отели-суперзвёзды (Address Downtown, Armani Hotel), идеально для VIP-приёмов с видом на башню.',
            'Palm Jumeirah — искусственный остров-пальма с премиум-курортами (Atlantis, One&Only, Waldorf Astoria). Формат «изолированный luxury», лучший для executive-ретритов и премиум-инсентивов.',
            'Dubai Marina — район небоскрёбов с яхтенной набережной. Ritz-Carlton JBR, Address Dubai Marina. Идеально для нетворкинг-форматов с активной вечерней программой.',
            'JBR (Jumeirah Beach Residence) — променад с пляжами и ресторанами. Подходит для комбинации корпоратив + пляжный отдых.',
            'Business Bay — деловой район с конгресс-центрами (Dubai World Trade Centre). Для масштабных конференций и выставок.',
            'DIFC (Dubai International Financial Centre) — финансовый район с бутик-отелями и переговорными пространствами. Для executive-встреч и B2B-форматов.',
          ],
        },

        { type: 'image', url: 'https://images.unsplash.com/photo-1677632227880-4d21073ef8f4?auto=format&fit=crop&q=80&w=1600', alt: 'Palm Jumeirah — искусственный остров-пальма Дубая с премиум-курортами', caption: 'Palm Jumeirah — «изолированный luxury» на воде. Здесь расположены Atlantis, One&Only Royal Mirage, Waldorf Astoria — лучшие площадки для executive-ретритов и премиум-инсентивов' },

        { type: 'divider' },

        { type: 'heading', text: 'Топ-7 отелей Дубая для корпоратива', level: 2 },

        { type: 'heading', text: '1. Atlantis The Palm (Palm Jumeirah)', level: 3 },
        { type: 'paragraph', text: 'Знаковый курорт-мегакомплекс на конце Palm Jumeirah с собственным аквапарком, дельфинарием и одним из крупнейших конференц-центров региона. Идеален для масштабных мероприятий 500+ человек с развлекательной программой для сопровождающих (супруги/дети). Цена: $400–800 за номер в сутки. Вместимость зала: до 1500 человек.' },

        { type: 'heading', text: '2. Burj Al Arab (Jumeirah Beach)', level: 3 },
        { type: 'paragraph', text: 'Легендарный «7-звёздочный» отель-парус — самый статусный адрес Дубая. Подходит только для камерных VIP-форматов на 20–80 человек. Здесь имеет смысл проводить приёмы для ключевых партнёров, executive-ретриты для C-level, награждения топ-клиентов. Цена: от $2 500 за номер в сутки (стартовая категория Deluxe Suite).' },

        { type: 'heading', text: '3. Address Downtown (Downtown Dubai)', level: 3 },
        { type: 'paragraph', text: 'Премиум-отель в центре Downtown с прямым видом на Burj Khalifa и Dubai Fountain. Идеален для VIP-мероприятий, где сама локация становится главной «фишкой» вечера. Гала-ужин с фоном танцующих фонтанов Дубая — момент, который гости запоминают надолго. Цена: $500–900 за номер. Вместимость: до 300 человек.' },

        { type: 'heading', text: '4. Waldorf Astoria Palm Jumeirah', level: 3 },
        { type: 'paragraph', text: 'Классический luxury-отель на «стволе» Palm Jumeirah. Более сдержанная атмосфера, чем Atlantis — фокус на элегантный сервис. Хорошо подходит для executive-конференций и премиум-корпоративов финансового и юридического сектора. Цена: $600–1 100 за номер. Вместимость: до 400 человек.' },

        { type: 'heading', text: '5. Ritz-Carlton JBR (Jumeirah Beach Residence)', level: 3 },
        { type: 'paragraph', text: 'Курортный отель с прямым выходом на пляж JBR и близостью к Dubai Marina. Оптимальный баланс премиум-сервиса и удобной локации. Хорошо работает для корпоративов среднего масштаба с элементами incentive-программы. Цена: $400–700 за номер. Вместимость: до 500 человек.' },

        { type: 'heading', text: '6. Address Dubai Marina', level: 3 },
        { type: 'paragraph', text: 'Отель в самом сердце Dubai Marina с видом на яхтенную набережную. Идеален для нетворкинг-форматов, потому что после рабочей программы гости легко выходят в живой район с ресторанами и барами. Цена: $350–600 за номер. Вместимость: до 400 человек.' },

        { type: 'heading', text: '7. Anantara The Palm Dubai Resort', level: 3 },
        { type: 'paragraph', text: 'Более доступный по цене премиум-курорт на Palm Jumeirah с азиатской эстетикой. Overwater-виллы, спа мирового уровня. Хороший выбор для wellness-корпоративов и executive-ретритов с фокусом на восстановление. Цена: $300–500 за номер. Вместимость: до 250 человек.' },

        { type: 'image', url: 'https://images.unsplash.com/photo-1582120042072-d01e2fc8f3ea?auto=format&fit=crop&q=80&w=1600', alt: 'Dubai Marina с яхтами и небоскрёбами — популярная зона для нетворкинг-корпоративов', caption: 'Dubai Marina — район, где корпоративная программа естественно перетекает в яхт-круиз или вечеринку на 78-м этаже с панорамным видом' },

        { type: 'divider' },

        { type: 'heading', text: 'Сравнение отелей: цены и вместимость', level: 2 },
        {
          type: 'table',
          headers: ['Отель', 'Зона', 'Вместимость', 'Цена/номер', 'Идеален для'],
          rows: [
            ['Atlantis The Palm', 'Palm Jumeirah', 'До 1500 чел', '$400–800', 'Крупные конференции с развлечениями'],
            ['Burj Al Arab', 'Jumeirah', 'До 80 чел', 'от $2 500', 'VIP приёмы, executive-ретриты'],
            ['Address Downtown', 'Downtown', 'До 300 чел', '$500–900', 'VIP с видом на Burj Khalifa'],
            ['Waldorf Astoria Palm', 'Palm Jumeirah', 'До 400 чел', '$600–1 100', 'Executive конференции'],
            ['Ritz-Carlton JBR', 'JBR', 'До 500 чел', '$400–700', 'Средние корпоративы + пляж'],
            ['Address Dubai Marina', 'Marina', 'До 400 чел', '$350–600', 'Нетворкинг-форматы'],
            ['Anantara The Palm', 'Palm Jumeirah', 'До 250 чел', '$300–500', 'Wellness-ретриты, executive'],
          ],
          caption: 'Ориентировочные цены за номер в сутки для стандартных категорий, включая завтрак. Корпоративные тарифы при бронировании групп от 30+ номеров обычно на 15–25% ниже',
        },

        { type: 'heading', text: 'Активности для программы в Дубае', level: 2 },
        { type: 'image', url: 'https://images.unsplash.com/photo-1617374128851-c84e37dc9f37?auto=format&fit=crop&q=80&w=1600', alt: 'Пустынные дюны — базовый формат incentive-программы в ОАЭ', caption: 'Desert Safari в Rub\' al Khali — классика incentive-программ в ОАЭ. Джип-ралли по дюнам + ужин в бедуинском лагере + шоу с танцами' },
        { type: 'paragraph', text: 'Дубай даёт огромный выбор активностей, которые сложно повторить где-то ещё. Программы, которые мы регулярно включаем в корпоративные выезды в ОАЭ:' },
        {
          type: 'list',
          items: [
            'Desert Safari в Rub\' al Khali — джипы, дюны, бедуинский лагерь с ужином, танцы Tanoura, катание на верблюдах.',
            'Ужин на 122-м этаже At.mosphere в Burj Khalifa — самое статусное место в городе, требует бронирования за 2–3 месяца.',
            'Yacht-круиз по Marina — от камерного 30-местного до 200-местного катамарана. Идеально для гала-ужинов.',
            'Полёт на гидросамолёте над Palm Jumeirah — премиум-активность для VIP-гостей (25 минут, $500+ на человека).',
            'Ferrari World Abu Dhabi — тематический парк для тимбилдинга (в часе от Дубая).',
            'Louvre Abu Dhabi — культурная программа с частной экскурсией (тоже в Абу-Даби).',
            'Гольф в Emirates Golf Club, Jumeirah Golf Estates — для executive-ретритов.',
            'Мастер-классы в Dubai Chocolate Museum, кулинарные студии — активити для камерных групп.',
          ],
        },

        { type: 'divider' },

        {
          type: 'comparison',
          title: 'Дубай vs Шарм-эль-Шейх для корпоратива',
          left: {
            title: 'Дубай — премиум-формат',
            items: [
              'Топ-мировая инфраструктура (мировые сети отелей, ведущие рестораны)',
              'Бюджет $2 000–4 500 на человека за 4–5 дней',
              'Знаковые локации (Burj Khalifa, Palm, Marina) — вау-эффект',
              'Развитая B2B-инфраструктура (переговорные, коворкинги)',
              'Виза ~$65–90 для российских паспортов',
              'Пролёт из Москвы 5 часов',
              'Идеален для VIP-форматов и премиум-инсентивов',
            ],
          },
          right: {
            title: 'Шарм-эль-Шейх — оптимальный формат',
            items: [
              'Отличная инфраструктура (те же бренды), но проще и камернее',
              'Бюджет $1 000–1 800 на человека за 4–5 дней (в 2–2,5 раза дешевле)',
              'Море, дайвинг, пустыня — активити доступнее',
              'All-inclusive отели упрощают логистику',
              'Без визы (Sinai Visa Free Zone до 14 дней)',
              'Пролёт из Москвы 4 часа',
              'Идеален для массовых корпоративов и бюджетных инсентивов',
            ],
          },
        },

        { type: 'heading', text: 'Бюджеты и логистика', level: 2 },
        { type: 'stat', number: '$2 000–4 500', label: 'средний бюджет корпоратива в Дубае на 1 участника за 4–5 дней (перелёт, размещение в 5★, кейтеринг, программа)' },
        { type: 'paragraph', text: 'Что учитывать в бюджете:' },
        {
          type: 'list',
          items: [
            'Проживание: $300–2 500/номер/сутки в зависимости от отеля.',
            'Виза для российского паспорта: $65–90 (быстрая eVisa) или $150+ за срочную.',
            'Трансферы от аэропорта DXB: 15–45 минут в зависимости от локации.',
            'Активности: $50–500+/человек (от групповых экскурсий до VIP-форматов).',
            'DMC-комиссия: 10–15% от общего бюджета.',
            'Резерв на непредвиденное: 10–15% от бюджета.',
          ],
        },
        {
          type: 'callout',
          variant: 'info',
          title: 'Лучшее время для корпоратива',
          text: 'Оптимальный сезон в Дубае — с октября по апрель (комфортные +22–28°C днём). Летом (июнь–август) в Дубае +40–45°C, что делает open-air программы невозможными, и практически все активности проходят в кондиционированных пространствах. Многие сети отелей делают серьёзные летние скидки — можно сэкономить 30–50% бюджета, но потерять в качестве впечатлений.',
        },

        { type: 'heading', text: 'Вывод', level: 2 },
        { type: 'paragraph', text: 'Дубай — направление №1, когда цель мероприятия — статус, вау-эффект и премиум-впечатления. Бюджет здесь высокий, но соответствует уровню сервиса и инфраструктуры. Для массовых корпоративов и бюджетных инсентивов чаще эффективнее выбрать Шарм-эль-Шейх; для флагманских проектов и VIP-программ Дубай — лучший вариант.' },
        { type: 'paragraph', text: 'Royal Event Group работает в ОАЭ с 2010 года, у нас команда в Дубае и прямые контракты с большинством топовых отелей. Если вы планируете корпоратив в ОАЭ — поговорите с нами на этапе выбора локации, это сэкономит существенную часть бюджета за счёт правильных тарифов и знания сезонных особенностей.' },
      ],
    },
    en: {
      title: 'Where to Hold a Corporate Event in UAE: 7 Dubai Hotels, Zones, Budgets and Logistics',
      category: 'Locations',
      date: 'May 27, 2026',
      excerpt: 'Dubai is the top destination for premium corporate events. We break down the key MICE zones, 7 proven hotels with real prices, budgets, and logistics for Russian delegations.',
      content: `Dubai is the most expensive and most prestigious MICE destination in the Middle East. Companies choose it when they need to impress top clients, reward best employees with premium incentives, or hold a flagship conference with international delegations.

Main MICE zones: Downtown Dubai (Burj Khalifa, Address Downtown), Palm Jumeirah (Atlantis, One&Only, Waldorf Astoria), Dubai Marina (Ritz-Carlton JBR), JBR, Business Bay, DIFC.

Top 7 hotels for corporate events:
1. Atlantis The Palm — up to 1500 people, $400-800/night — mega-conferences with entertainment
2. Burj Al Arab — up to 80 people, from $2500/night — VIP receptions
3. Address Downtown — up to 300 people, $500-900/night — VIP with Burj Khalifa view
4. Waldorf Astoria Palm — up to 400 people, $600-1100/night — executive conferences
5. Ritz-Carlton JBR — up to 500 people, $400-700/night — mid-size + beach
6. Address Dubai Marina — up to 400 people, $350-600/night — networking format
7. Anantara The Palm — up to 250 people, $300-500/night — wellness retreats

Average budget for 4-5 day corporate event in Dubai: $2,000-4,500 per participant.

Royal Event Group has been working in UAE since 2010 with a team in Dubai and direct contracts with most top hotels.`,
    },
  },

  // ───────────────────────────────────────────────────────────────────────
  {
    id: 'kak-vybrat-vedushchego-dlya-korporativa',
    datePublished: '2026-05-27',
    image: 'https://images.unsplash.com/photo-1633775218380-30c7ab85a5c5?auto=format&fit=crop&q=80&w=1600',
    ru: {
      title: 'Как выбрать ведущего для корпоратива: чек-лист из 12 критериев и типичные ошибки',
      category: 'Деловые мероприятия',
      date: '27 Мая, 2026',
      excerpt: 'Ведущий определяет 40% общего впечатления от мероприятия. Разбираем типы ведущих, критерии выбора, стоимость и главные ошибки, которые убивают даже хорошие корпоративы.',
      content: [
        { type: 'paragraph', text: 'Ведущий — самый недооценённый элемент корпоратива. Компании тратят миллионы на площадку, декор, кейтеринг и артистов — а на выборе MC экономят или пускают процесс на самотёк. Результат предсказуемый: неуместные шутки, затянутый тайминг, потеря темпа программы, замороженные гости. Хороший ведущий делает мероприятие; плохой — портит любую подготовку.' },

        { type: 'stat', number: '40%', label: 'общего впечатления гостей от корпоратива определяется работой ведущего. Это больше, чем от еды или декора, и сопоставимо с общим уровнем программы', source: 'исследования event-индустрии 2024–2025' },

        { type: 'paragraph', text: 'Разбираем подробно: какие бывают типы ведущих, чем «тамада» отличается от executive MC, 12 критериев выбора, стоимость и главные ошибки, которые допускают заказчики.' },

        { type: 'heading', text: '5 типов ведущих: под какой формат кто подходит', level: 2 },
        { type: 'paragraph', text: 'Ведущий — это не одна профессия, а несколько разных. Каждый специализируется на своём типе мероприятий, и попытка использовать «универсального» обычно заканчивается плохо.' },
        {
          type: 'list',
          items: [
            'Тамада — классический вариант для свадеб и семейных праздников. Активно вовлекает гостей в конкурсы, работает с алкоголем в зале. Для делового корпоратива — почти всегда плохой выбор.',
            'Шоу-мен — фокус на развлечение, юмор, интерактив. Хорош для лёгких корпоративов (Новый год, день рождения компании), не подходит для протокольных мероприятий.',
            'TV-ведущий — узнаваемое лицо с телеэкрана. Даёт дополнительный статус мероприятию, но часто дороже и негибче в программе. Хорош для крупных статусных событий.',
            'Конферансье / профессиональный МС — специализируется на деловых мероприятиях. Держит тайминг, представляет спикеров, ведёт награждения. Оптимален для конференций и большинства корпоративов.',
            'Executive MC / модератор — деловой ведущий с индустриальной экспертизой. Может модерировать панельные дискуссии, задавать спикерам глубокие вопросы. Для форумов и дилерских конференций.',
          ],
        },

        { type: 'divider' },

        {
          type: 'comparison',
          title: 'Тамада vs Профессиональный MC — почему нельзя перепутать',
          left: {
            title: 'Тамада (свадебный стиль) — что не работает',
            items: [
              'Панибратские шутки с гостями «в стол»',
              'Конкурсы «поймай палку зубами»',
              'Затянутые тосты на 15+ минут',
              'Работа «с чувством» — импровизация без тайминга',
              'Универсальный сценарий «для любой аудитории»',
              'Апеллирование к алкоголю и «а давайте выпьем»',
              'Отсутствие делового этикета и протокола',
              'Одежда — «под настроение», а не dress-code',
            ],
          },
          right: {
            title: 'Профессиональный MC — что работает на корпоративе',
            items: [
              'Уважительная работа с аудиторией, без панибратства',
              'Структурные интерактивы под цели заказчика',
              'Строгий контроль тайминга с секундомером',
              'Проработанный сценарий с готовыми переходами',
              'Индивидуальная подготовка под конкретную компанию',
              'Умеренная работа с алкоголем, без навязывания',
              'Знание делового этикета и протокола',
              'Строгий dress-code, соответствующий формату мероприятия',
            ],
          },
        },

        { type: 'heading', text: 'Стоимость ведущих: сколько закладывать в бюджет', level: 2 },
        {
          type: 'table',
          headers: ['Тип ведущего', 'Стоимость за вечер', 'Опыт', 'Идеален для'],
          rows: [
            ['Начинающий MC', '30 000 – 60 000 ₽', '1–2 года', 'Небольшие корпоративы до 50 чел'],
            ['Профессиональный MC', '80 000 – 200 000 ₽', '5+ лет', 'Стандартные корпоративы 100–300 чел'],
            ['Топовый MC / модератор', '250 000 – 500 000 ₽', '10+ лет', 'Дилерские конференции, крупные события'],
            ['TV-ведущий 2-го эшелона', '300 000 – 700 000 ₽', 'Медийный', 'Статусные мероприятия 200+ чел'],
            ['TV-ведущий 1-го эшелона', 'от 1 000 000 ₽', 'Хедлайнер', 'Флагманские события, юбилеи компаний'],
            ['Двуязычный MC (RU/EN)', '150 000 – 400 000 ₽', '5+ лет', 'Международные мероприятия'],
            ['Executive-модератор с экспертизой', '400 000 – 1 500 000 ₽', 'Индустриальный', 'Отраслевые форумы, панельные дискуссии'],
          ],
          caption: 'Цены для рынка Москвы и мероприятий на территории России. Работа за рубежом (Дубай, Шарм) — плюс 30–50% за перелёт и гонорар «за выезд»',
        },

        { type: 'image', url: 'https://images.unsplash.com/photo-1627931539006-d5c4677e05ea?auto=format&fit=crop&q=80&w=1600', alt: 'Профессиональный ведущий в костюме перед корпоративной аудиторией', caption: 'Хороший ведущий незаметен — он не «тянет одеяло на себя», а держит внимание аудитории на программе и спикерах' },

        { type: 'heading', text: '12 критериев выбора ведущего', level: 2 },
        { type: 'paragraph', text: 'Комплексный чек-лист для оценки кандидатов на роль MC вашего мероприятия. Прогоните каждого кандидата по этим 12 пунктам.' },
        {
          type: 'list',
          ordered: true,
          items: [
            'Опыт именно корпоративных мероприятий (не свадеб!) — минимум 3 года.',
            'Портфолио с видео работы — не фото, а полноценные ролики по 5–10 минут с реальных событий.',
            'Отзывы от клиентов, которых можно перепроверить (лично созвониться с 2–3).',
            'Опыт работы с вашей индустрией (или похожей) — MC должен понимать контекст.',
            'Гибкость сценария — готовность подстроиться под ваши правки, а не «работать по шаблону».',
            'Умение работать с тайминг-контролем (профессиональные MC работают с cue-системой, не с бумажкой).',
            'Внешний вид и дресс-код — соответствие уровню вашего мероприятия.',
            'Дикция, темп речи, харизма — оцениваются по видео и на встрече.',
            'Умение представить спикеров интересно (не «а теперь слово имеет...»).',
            'Опыт награждений — умеет держать темп в церемонии с 10+ номинациями.',
            'Работа с VIP-гостями — понимание протокола, деликатность.',
            'Двуязычность (если мероприятие международное) — уверенный английский, не «школьный».',
          ],
        },

        { type: 'heading', text: 'Где искать ведущих', level: 2 },
        {
          type: 'list',
          items: [
            'Event-агентства (Royal Event Group и другие) — у нас есть проверенный пул MC под разные форматы, и мы берём на себя все риски с их подбором.',
            'Специализированные агентства артистов (Cast, Sky Show, Special Booking).',
            'Прямой поиск через YouTube — по запросам «ведущий корпоратив [город]» с фильтром по последним видео.',
            'Instagram, Telegram-каналы ведущих — здесь можно посмотреть их актуальные работы.',
            'Рекомендации коллег — самый надёжный источник, но требует «нетворкинга».',
          ],
        },

        { type: 'heading', text: 'Как проверить кандидата перед подписанием договора', level: 2 },
        {
          type: 'callout',
          variant: 'info',
          title: 'Обязательные шаги перед подписанием',
          text: 'Встреча вживую (не только созвон) — оценить харизму и внешний вид. Просмотр 2–3 полных видео с корпоративов (не нарезки-showreel, которые всегда выглядят хорошо). Разговор с 2–3 предыдущими клиентами по вашей индустрии. Тестовое обсуждение сценария — посмотреть насколько гибок и включён MC в вашу задачу.',
        },

        { type: 'image', url: 'https://images.unsplash.com/photo-1527261834078-9b37d35a4a32?auto=format&fit=crop&q=80&w=1600', alt: 'Микрофон крупным планом на подставке — символ работы профессионального ведущего', caption: 'Даже техника имеет значение: у профессионального MC собственный любимый микрофон, с которым он работал сотни раз — это гарантирует привычную акустику голоса' },

        { type: 'heading', text: 'Типичные ошибки заказчиков', level: 2 },
        {
          type: 'callout',
          variant: 'warning',
          title: 'Главные ошибки при выборе ведущего',
          text: 'Выбор по стоимости («самый дешёвый») — почти всегда провал. Отсутствие брифа для MC — ведущий приходит без понимания вашей компании. Игнорирование репетиции — на «сюрприз» вечера превращается в неловкость. Найм тамады на протокольное мероприятие — гарантированный провал протокольной части. Отказ от speech-coach для спикеров — MC не может «спасти» слабо подготовленные выступления.',
        },
        { type: 'paragraph', text: 'Ещё одна частая ошибка — не подготовить бриф для MC. Профессиональному ведущему нужна информация: цели мероприятия, аудитория (портрет и настроение), список ключевых спикеров с фактами о них, программа с таймингом, dress-code, стоп-темы (что нельзя упоминать), CTA к аудитории в финале.' },

        { type: 'heading', text: 'Чек-лист брифа для ведущего', level: 2 },
        {
          type: 'list',
          items: [
            'О компании: краткая история, миссия, продукт, аудитория (кто ваши клиенты).',
            'Цель мероприятия в одной фразе: что должно произойти после того как все разъедутся.',
            'Портрет аудитории: возраст, пол, должности, отрасли, настроение (уставшие/энергичные, знакомые/новые).',
            'Ключевые спикеры и о чём они будут говорить (плюс 2–3 интересных факта о каждом).',
            'Программа поминутно с таймингами каждого блока.',
            'Dress-code: black tie / smart casual / business.',
            'Стоп-темы: политика, конкуренты, увольнения — что нельзя упоминать ни в каком виде.',
            'Награждения: полный список номинантов заранее (с фото и краткой биографией).',
            'CTA в финале: что должен сделать гость после мероприятия (подписать документ, оставить контакт, зарегистрироваться на что-то).',
            'Технический райдер: микрофон, teleprompter, wardrobe area, время прогона.',
          ],
        },

        { type: 'heading', text: 'Вывод', level: 2 },
        { type: 'paragraph', text: 'Выбор правильного ведущего — вопрос стратегического значения для успеха корпоратива. Не экономьте на MC (нанимая тамаду или начинающего) для делового мероприятия — потратите те же деньги, но получите фиаско. Не переплачивайте за медийное имя, если мероприятие не требует статуса — TV-ведущий в маленьком корпоративе смотрится странно и раздражает гостей.' },
        { type: 'paragraph', text: 'Royal Event Group работает с проверенным пулом ведущих и модераторов под любые форматы — от небольших корпоративов до международных дилерских конференций. Мы подбираем MC под задачи вашего мероприятия, аудиторию и бюджет, готовим подробный бриф и обеспечиваем репетиции. Если вам нужен ведущий для корпоративного события — поговорите с нами на этапе выбора концепции, чтобы MC мог участвовать в проработке программы с самого начала.' },
      ],
    },
    en: {
      title: 'How to Choose an Event Host for Your Corporate Event: 12-Point Checklist and Common Mistakes',
      category: 'Business Events',
      date: 'May 27, 2026',
      excerpt: 'The event host determines 40% of the overall event impression. We break down the types of hosts, selection criteria, pricing, and the main mistakes that kill even good corporate events.',
      content: `The event host is the most undervalued element of a corporate event. Companies spend millions on venue, decor, catering, and performers — but save on the MC selection or leave the process to chance. The result is predictable: inappropriate jokes, prolonged timing, loss of program pace, frozen guests. A good host makes the event; a bad one ruins any preparation.

5 types of hosts: Tamada (wedding style — bad for business), Showman (fun events), TV Presenter (status events), Professional MC (best for business), Executive Moderator (industry forums).

12 criteria for choosing:
1. Corporate event experience (not weddings!) — minimum 3 years
2. Video portfolio (not photos)
3. Verifiable client references
4. Industry expertise
5. Scenario flexibility
6. Timing control skills
7. Appropriate dress code
8. Diction, pace, charisma
9. Speaker introduction skills
10. Awards ceremony pacing
11. VIP guest handling
12. Bilingual capability (if international)

Pricing (Moscow rates): Beginner MC 30-60K ₽, Professional 80-200K ₽, Top 250-500K ₽, TV 2nd tier 300-700K ₽, TV top from 1M ₽, Executive moderator 400K-1.5M ₽.

Main mistakes: choosing by lowest price, no brief for MC, ignoring rehearsal, hiring tamada for protocol event, no speech coach for speakers.

Royal Event Group has a proven pool of MCs for any format — from small corporate events to international dealer conferences.`,
    },
  },

  // ───────────────────────────────────────────────────────────────────────
  {
    id: '6-trendov-v-b2b-pr-na-2026-god',
    datePublished: '2026-05-27',
    image: 'https://images.unsplash.com/photo-1769739576456-0aefcff3f4b9?auto=format&fit=crop&q=80&w=1600',
    ru: {
      title: '6 трендов в B2B PR на 2026 год',
      category: 'Тренды',
      date: '27 Мая, 2026',
      excerpt: 'От AI-генерации пресс-релизов до executive thought leadership и data-driven PR — что меняется в B2B-коммуникациях и почему «охваты в СМИ» больше не главная метрика.',
      content: [
        { type: 'paragraph', text: 'B2B PR в 2026 году выглядит совсем не так, как пять лет назад. Текстовые пресс-релизы теряют эффективность, охваты в СМИ перестали быть главной метрикой, а главным каналом коммуникации часто становится не корпоративный аккаунт, а личный LinkedIn-профиль CEO. Параллельно AI меняет процессы создания контента, а ESG-нарратив переходит из маркетинговой обёртки в реальную стратегию.' },

        { type: 'paragraph', text: 'Разбираем шесть ключевых трендов, которые определяют B2B PR прямо сейчас — и как российским и арабским компаниям адаптировать свои стратегии под новые правила игры.' },

        { type: 'stat', number: '+18%', label: 'ежегодный рост бюджетов B2B PR в 2025–2026 годах. Но структура расходов кардинально меняется — деньги уходят из традиционных СМИ в новые форматы', source: 'отраслевая аналитика 2024–2025' },

        { type: 'heading', text: '1. AI как помощник, но не заменитель', level: 2 },
        { type: 'image', url: 'https://images.unsplash.com/photo-1758626099012-2904337e9c60?auto=format&fit=crop&q=80&w=1600', alt: 'Ноутбук с открытым AI-инструментом на экране — типичное рабочее место PR-специалиста 2026 года', caption: 'AI стал стандартным инструментом PR-команды: черновики пресс-релизов, питч-лист для медиа, аналитика репутации — всё проходит через AI-этап на каком-то уровне' },
        { type: 'paragraph', text: 'AI прошёл стадию «модной игрушки» и стал рабочим инструментом PR-команд. В 2026 году ChatGPT, Claude, Gemini и их корпоративные аналоги используются для генерации черновиков пресс-релизов, составления питч-листов для журналистов, аналитики тональности упоминаний, перевода материалов на другие языки в реальном времени и автоматического создания social media контента под разные платформы.' },
        { type: 'paragraph', text: 'Но 2026 год также стал годом «прозрения» — компании поняли, что AI без человеческого контроля приводит к репутационным рискам. Галлюцинации в фактах, неточные цитаты, странные формулировки в чувствительных темах — всё это попадало в публикации в 2024–2025 годах и привело к крупным скандалам.' },
        {
          type: 'callout',
          variant: 'warning',
          title: 'Главный риск AI в PR',
          text: 'AI отлично пишет красивые тексты, но плохо отличает правду от правдоподобной выдумки. Каждый сгенерированный AI факт должен быть проверен человеком до публикации. Появилась новая роль — «AI-editor» — специалист, который занимается верификацией и доводкой AI-черновиков. Это уже не «волшебная кнопка», а полноценный воркфлоу.',
        },

        { type: 'heading', text: '2. CEO как медиа-персонаж', level: 2 },
        { type: 'image', url: 'https://images.unsplash.com/photo-1769755449051-5e90bc9cd691?auto=format&fit=crop&q=80&w=1600', alt: 'Руководитель компании выступает на отраслевом мероприятии перед аудиторией', caption: 'Личный бренд CEO стал главным каналом B2B PR: подписчики на LinkedIn-аккаунт руководителя ценнее, чем подписчики корпоративной страницы' },
        { type: 'paragraph', text: 'Самый сильный тренд последних двух лет — рост важности executive thought leadership. В B2B сегменте люди покупают у людей, а не у логотипов. Личный блог CEO в LinkedIn или Telegram даёт компании в 4–7 раз больше вовлечённости, чем корпоративный аккаунт. И клиенты охотнее общаются с компанией, в которой видят живого, понятного, экспертного лидера.' },
        { type: 'stat', number: '7×', label: 'разница в вовлечённости между постом CEO с личного аккаунта и тем же постом с корпоративной страницы компании на LinkedIn' },
        { type: 'paragraph', text: 'Что это значит на практике: компании инвестируют в подготовку руководителей как медиа-персонажей. Появляются роли «head of executive communications» и «personal branding manager». CEO регулярно записывают видео, ведут блоги, выступают на отраслевых конференциях, дают интервью подкастам. Это уже не «факультативная активность» — это часть рабочих обязанностей.' },
        { type: 'paragraph', text: 'Для российского рынка особенно ценны площадки: LinkedIn (где это возможно), Telegram-каналы экспертов, отраслевые подкасты, выступления на конференциях и мероприятиях с участием профильной B2B-аудитории.' },

        { type: 'heading', text: '3. Видео и подкасты заменяют пресс-релизы', level: 2 },
        { type: 'image', url: 'https://images.unsplash.com/photo-1627667050609-d4ba6483a368?auto=format&fit=crop&q=80&w=1600', alt: 'Профессиональный микрофон для подкастов на студийном столе', caption: 'Подкасты стали премиум-каналом B2B PR: 30-минутное интервью с CEO в нишевом подкасте даёт глубину контакта, которой не достичь через пресс-релиз' },
        { type: 'paragraph', text: 'Текстовый пресс-релиз — формат, который теряет эффективность быстрее всех. Журналисты получают сотни релизов в день, читают единицы. В то же время аудитория B2B всё чаще потребляет контент в видео- и аудио-форматах: подкасты по дороге на работу, короткие видео в обеденный перерыв, длинные интервью на YouTube вечером.' },
        { type: 'paragraph', text: 'Лидеры рынка в 2026 году делают «multi-format storytelling»: одна история разворачивается в нескольких форматах одновременно. Например, кейс клиента: длинная статья на сайте → 30-минутный подкаст → серия коротких роликов для соцсетей → инфографика для LinkedIn → email-newsletter. Один материал — семь точек контакта.' },
        { type: 'stat', number: '+62%', label: 'рост времени потребления подкастов B2B-аудиторией за последние два года. Подкасты — самый быстрорастущий формат корпоративных коммуникаций' },

        { type: 'heading', text: '4. Private channels вытесняют public media', level: 2 },
        { type: 'image', url: 'https://images.unsplash.com/photo-1770368787756-c02439ce475f?auto=format&fit=crop&q=80&w=1600', alt: 'Рука держит смартфон с открытым мобильным приложением для общения', caption: 'Закрытые сообщества в Telegram, Slack и Discord становятся важнее открытых СМИ для серьёзной B2B-аудитории' },
        { type: 'paragraph', text: 'Парадокс 2026 года: чем больше «открытого» контента вокруг, тем ценнее становятся закрытые каналы. Серьёзная B2B-аудитория (CEO, директора, топ-менеджеры) всё реже читает массовые публичные СМИ и всё чаще — приватные newsletter\'ы, закрытые Telegram-каналы экспертов, Slack-сообщества по индустриям.' },
        { type: 'paragraph', text: 'Для PR это означает кардинальный сдвиг приоритетов. Раньше цель была — «попасть в РБК или Ведомости». Сейчас стратегическая цель — «попасть в правильное закрытое сообщество и стать там естественной частью разговора». Это сложнее, требует другого подхода и других контактов, но даёт несравнимо более качественный контакт с ЛПР.' },
        { type: 'paragraph', text: 'Конкретные форматы работы с private channels: спонсорство нишевых newsletter\'ов с экспертным контентом, участие в роли спикера в закрытых клубных мероприятиях, гостевые посты в Telegram-каналах отраслевых лидеров, организация собственных закрытых event\'ов для топ-клиентов и партнёров.' },

        { type: 'heading', text: '5. ESG переходит из маркетинга в реальную стратегию', level: 2 },
        { type: 'image', url: 'https://images.unsplash.com/photo-1529554522213-91373332dd2b?auto=format&fit=crop&q=80&w=1600', alt: 'Зелёное растение в горшке внутри современного офисного здания — символ устойчивого подхода в бизнесе', caption: 'ESG в 2026 году — это уже не отчёт для галочки, а часть реальной операционной стратегии компании. И PR должен говорить об этом честно, а не маркетингово' },
        { type: 'paragraph', text: 'Sustainability и ESG-нарратив проходят серьёзную трансформацию. В 2020–2022 годах компании активно рассказывали про свои ESG-инициативы как часть маркетинга — часто это было «зелёное мытьё» без реальной субстанции. К 2026 году аудитория научилась отличать настоящее от показного, и наказывает компании за greenwashing особенно жёстко.' },
        { type: 'paragraph', text: 'Что работает теперь: конкретные цифры (углеродный след, % переработанных материалов, ESG-сертификация), прозрачные отчёты (опубликованные в open access), реальные инвестиции в устойчивое развитие (а не декларации), интеграция ESG в продуктовую стратегию (а не отдельная PR-функция).' },
        {
          type: 'callout',
          variant: 'warning',
          title: 'Greenwashing-риск',
          text: 'Если ваше ESG-сообщение нельзя подкрепить независимо проверенными данными — лучше его не делать вовсе. В эпоху социальных сетей разоблачение greenwashing может произойти за несколько часов. Репутационный ущерб от такого скандала перекрывает любой эффект от месяцев PR-усилий.',
        },

        { type: 'heading', text: '6. Data-driven PR с привязкой к выручке', level: 2 },
        { type: 'image', url: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&q=80&w=1600', alt: 'Экран компьютера с включённой аналитической панелью и графиками', caption: 'Современный PR — это работа с метриками: от тональности упоминаний до конверсии PR-активностей в реальные продажи. Без аналитики бюджеты больше не утверждают' },
        { type: 'paragraph', text: 'Самое важное изменение, которое произошло за последние два года — финансовые директора начали требовать от PR-отделов реальной аналитики ROI. Эпоха «мы попали в 50 СМИ за квартал — отлично!» закончилась. Сейчас CFO задают вопросы: «Сколько лидов пришло с этой публикации?», «Какая конверсия PR-контактов в подписанные контракты?», «Какой LTV у клиентов, пришедших через PR-канал по сравнению с performance-маркетингом?»' },
        { type: 'paragraph', text: 'Для ответа на эти вопросы PR-команды 2026 года используют комплексные системы атрибуции: UTM-метки на каждом упоминании, специальные landing page для каждого крупного материала, интеграция CRM с PR-инструментами, отслеживание дискуссий в социальных сетях с привязкой к воронке продаж. Это серьёзная аналитическая работа, но именно она оправдывает PR-бюджеты в новых реалиях.' },
        { type: 'stat', number: '3.2×', label: 'разница в стоимости привлечения клиента (CAC) между PR-каналом и performance-маркетингом для B2B SaaS-компаний. PR даёт более качественные лиды дешевле — но только если правильно измерять' },

        { type: 'quote', text: 'Самое опасное в современном B2B PR — действовать «по старым лекалам». Компании, которые в 2026 году продолжают мерить успех количеством пресс-релизов и охватом в СМИ, фактически сжигают бюджет. Те же, кто адаптировал процессы под executive personal brand, multi-format storytelling и data-driven подход, получают конкурентное преимущество, которое накапливается годами.', author: 'Команда Royal Event Group' },

        { type: 'divider' },

        {
          type: 'comparison',
          title: 'B2B PR 2020 vs B2B PR 2026',
          left: {
            title: 'Старый подход — что больше не работает',
            items: [
              'Текстовые пресс-релизы как главный продукт PR-команды',
              'Цель — «попасть в 10 крупных СМИ за квартал»',
              'Корпоративный аккаунт LinkedIn = главный канал',
              'ESG как маркетинговая обёртка без субстанции',
              '«Охваты» и «упоминания» — главные KPI',
              'Ручная аналитика тональности постфактум',
              'CEO не появляется в публичном поле',
              'Один формат материала на один канал',
            ],
          },
          right: {
            title: 'Современный подход — что работает в 2026',
            items: [
              'Multi-format storytelling: один материал в 5–7 форматах',
              'Цель — попасть в правильные closed communities и newsletter\'ы',
              'Личный LinkedIn/Telegram CEO даёт ×7 вовлечённости',
              'ESG с подкреплёнными данными и независимой верификацией',
              'Метрики привязаны к выручке и CAC',
              'AI-аналитика тональности в реальном времени',
              'CEO ведёт блог, выступает, даёт интервью еженедельно',
              'Каждая история разворачивается во всех форматах',
            ],
          },
        },

        { type: 'heading', text: 'Каналы B2B PR в 2026 году: эффективность и стоимость', level: 2 },
        {
          type: 'table',
          headers: ['Канал', 'Стоимость входа', 'Качество контакта', 'Когда использовать'],
          rows: [
            ['LinkedIn (личный аккаунт CEO)', 'Низкая (время)', 'Очень высокое', 'Постоянная работа над personal brand'],
            ['Telegram-каналы лидеров', 'Низкая–средняя', 'Высокое', 'Гостевые посты, спонсорство, экспертные комментарии'],
            ['Подкасты (как гость)', 'Низкая (время)', 'Очень высокое', 'Глубокий контент, доверие, длинный контакт'],
            ['Подкаст компании', 'Высокая ($30k+/год)', 'Высокое (накопительно)', 'Стратегия 2+ лет, не для разовых задач'],
            ['Закрытые сообщества (Slack, клубы)', 'Высокая (доступ)', 'Очень высокое', 'Прямой контакт с топ-ЛПР'],
            ['Корпоративные мероприятия (свои)', 'Высокая ($50k+)', 'Премиум', 'Длинные циклы продаж, премиум-сегмент'],
            ['Спонсорство отраслевых конференций', 'Средняя–высокая', 'Высокое', 'Бренд-видимость в индустрии'],
            ['Отраслевые СМИ (РБК, Forbes, Ведомости)', 'Средняя', 'Среднее', 'Бренд-доверие, цитируемость'],
            ['Email-newsletter (свой/спонсорство)', 'Средняя', 'Высокое', 'Нишевая аудитория, длинный контент'],
            ['Корпоративный блог + SEO', 'Средняя (системно)', 'Среднее–высокое', 'Долгосрочная стратегия органического трафика'],
          ],
          caption: 'Оценки приблизительные и зависят от индустрии. Самые эффективные стратегии — комбинация 3–5 каналов с фокусом на multi-format storytelling',
        },

        { type: 'heading', text: 'Что делать вашей компании прямо сейчас', level: 2 },
        {
          type: 'list',
          items: [
            'Аудит текущей PR-стратегии: посчитайте сколько % бюджета уходит на текстовые пресс-релизы и публикации в массовых СМИ. Если больше 30% — это сигнал к перераспределению.',
            'Подготовить CEO к роли медиа-персонажа: speech-coach, контент-план на LinkedIn/Telegram, расписание выступлений на отраслевых событиях.',
            'Внедрить AI-инструменты в воркфлоу с обязательной верификационной ступенью человеком.',
            'Подключить нормальную аналитику: UTM-метки, integration CRM с PR-инструментами, метрики CAC и conversion по PR-каналам.',
            'Выделить бюджет на multi-format продакшн: подкаст-студия, видеограф, дизайнер для multi-channel-распространения каждого материала.',
            'Идентифицировать топ-5 закрытых сообществ в вашей индустрии и разработать стратегию органического вхождения в них.',
            'Перестроить ESG-коммуникацию: только конкретные цифры, независимая верификация, прозрачность.',
          ],
        },

        { type: 'heading', text: 'Вывод', level: 2 },
        { type: 'paragraph', text: 'B2B PR в 2026 году — это не профессия про «написать пресс-релиз и разослать его в редакции». Это стратегическая дисциплина на пересечении контента, технологий, аналитики и executive communications. Компании, которые понимают этот сдвиг, получают непропорционально большое влияние на свой рынок. Те, кто продолжает работать «по-старому», постепенно становятся невидимыми для целевой аудитории.' },
        { type: 'paragraph', text: 'Корпоративные мероприятия — конференции, дилерские встречи, executive-ретриты, тематические форумы — остаются одним из самых сильных каналов B2B PR в 2026 году. Они дают то, чего не дают никакие digital-каналы: живой контакт, глубину впечатлений, материал для multi-format storytelling. Если ваша B2B PR-стратегия включает мероприятия — Royal Event Group поможет спроектировать их так, чтобы они работали на бизнес-цели, а не были «отдельным праздником». Поговорите с нами на этапе планирования годового PR-календаря.' },
      ],
    },
    en: {
      title: '6 B2B PR Trends for 2026',
      category: 'Trends',
      date: 'May 27, 2026',
      excerpt: 'From AI-generated press releases to executive thought leadership and data-driven PR — what is changing in B2B communications and why "media coverage" is no longer the main metric.',
      content: `B2B PR in 2026 looks nothing like it did five years ago. Text press releases are losing effectiveness, media reach is no longer the main metric, and the main communication channel often is not the corporate account but the CEO's personal LinkedIn profile.

Six key trends shaping B2B PR right now:

1. AI as helper, not replacement. ChatGPT/Claude/Gemini have become standard tools for press release drafts, journalist pitching, sentiment analytics. But hallucination risk requires human verification at every step — the new "AI-editor" role is full-fledged workflow.

2. CEO as media personality. CEO's personal blog on LinkedIn or Telegram gives 4–7× more engagement than corporate accounts. Companies invest in executive thought leadership as a strategic priority.

3. Video and podcasts replace press releases. Multi-format storytelling: one story unfolds across 5–7 formats simultaneously. Podcasts grew +62% in B2B consumption time over last two years.

4. Private channels displace public media. Closed Telegram channels, Slack communities, and private newsletters give higher-quality contact with decision-makers than mass media.

5. ESG moves from marketing to real strategy. Greenwashing is punished severely. Only concrete numbers, independently verified data, and real investments work.

6. Data-driven PR tied to revenue. CFOs require ROI analytics: UTM tracking, CRM integration, conversion measurement. PR delivers 3.2× cheaper CAC than performance marketing — but only if measured correctly.

Corporate events — conferences, dealer meetings, executive retreats, themed forums — remain one of the strongest B2B PR channels in 2026. They deliver what no digital channel can: live contact, depth of impressions, material for multi-format storytelling.

If your B2B PR strategy includes events — Royal Event Group helps design them to work for business goals, not just be "a separate celebration." Talk to us at the stage of planning your annual PR calendar.`,
    },
  },

  // ───────────────────────────────────────────────────────────────────────
  {
    id: 'gde-provesti-korporativ-v-sharm-el-sheikh',
    datePublished: '2026-06-04',
    image: 'https://images.unsplash.com/photo-1669544553496-252ed4e9573d?auto=format&fit=crop&q=80&w=1600',
    ru: {
      title: 'Где провести корпоратив в Шарм-эль-Шейхе: 7 топ-отелей, районы, активности и реальные бюджеты',
      category: 'Локации',
      date: '4 Июня, 2026',
      excerpt: 'Подробный разбор Шарм-эль-Шейха как MICE-направления: чем отличаются районы (Naama Bay, Sharks Bay, Nabq), какой отель выбрать под формат, активности, бюджеты, логистика и реальные цены.',
      content: [
        { type: 'paragraph', text: 'Шарм-эль-Шейх — самый «MICE-готовый» город Египта и одно из лучших направлений в мире для корпоративов «всё включено». Здесь сошлось редкое сочетание: прямые рейсы из Москвы за 4 часа, развитая инфраструктура международных отелей, Красное море с лучшими в мире рифами для дайвинга, пустыня для бедуинских ужинов в шаговой доступности, простая виза по прилёту и стабильный климат +22–28°C большую часть года.' },

        { type: 'stat', number: '4 часа', label: 'прямой перелёт из Москвы. Для делегатов это не утомительная командировка, а лёгкая поездка с минимальным джетлагом' },

        { type: 'paragraph', text: 'Шарм — единственный город в радиусе тысячи километров, где можно провести деловую конференцию утром, тимбилдинг в пустыне днём и гала-ужин на яхте вечером. Разбираем подробно: какие районы Шарма под какие задачи, ТОП-7 отелей с реальными ценами, активности для корпоративной программы и бюджеты.' },

        { type: 'heading', text: 'Главное о Шарме как MICE-направлении', level: 2 },
        { type: 'paragraph', text: 'Шарм-эль-Шейх — это не один город в обычном понимании. Это длинная полоса вдоль побережья Красного моря с несколькими автономными туристическими районами, каждый со своим характером и набором отелей. Понимание этих районов критично для выбора правильной локации под корпоратив.' },
        { type: 'image', url: 'https://images.unsplash.com/photo-1729717949948-56b52db111dd?auto=format&fit=crop&q=80&w=1600', alt: 'Премиум-курортный отель на побережье — типичный формат для Шарма', caption: 'Премиум-отели Шарма по уровню сервиса соответствуют международным стандартам (Four Seasons, Hilton, Marriott, Kempinski), но стоят в 2–3 раза дешевле аналогичных площадок в Дубае или Лондоне' },

        { type: 'heading', text: 'Районы Шарма — куда ехать под какой формат', level: 2 },
        { type: 'paragraph', text: 'Главные туристические районы Шарма расположены вдоль побережья с юга на север:' },
        {
          type: 'list',
          items: [
            'Naama Bay (Наама Бэй) — историческое сердце Шарма, центр ночной жизни, рестораны и пешеходный променад. Отели старее, но в шаговой доступности всё.',
            'Sharks Bay (Шаркс Бэй) — северный район с премиум-отелями (Four Seasons, Domina, Hyatt). Более камерно и тихо, чем Naama Bay.',
            'Nabq Bay (Набк Бэй) — самый северный район, ближайший к аэропорту. Крупные all-inclusive комплексы (Rixos, Savoy, Reef Oasis), длинные пляжи, более молодая инфраструктура.',
            'Hadaba (Хадаба) — район южнее Naama Bay на возвышенности. Отели с панорамным видом на залив (Park Regency и другие).',
            'Old Market / Sharm El Maya — старый порт и базар, для культурных активностей в свободное время.',
          ],
        },

        { type: 'divider' },

        { type: 'heading', text: 'Топ-7 отелей для корпоратива', level: 2 },

        { type: 'heading', text: '1. Domina Coral Bay (Sharks Bay)', level: 3 },
        { type: 'paragraph', text: 'Крупнейший all-inclusive комплекс Шарма с собственным конференц-центром на 1500+ человек. Несколько уровней размещения — от стандартных категорий до Aquamarine VIP-отдельной территории. Идеален для масштабных конференций и корпоративов с большим числом участников. У комплекса есть собственная морская набережная и казино, что добавляет атмосферы для вечерней программы.' },
        { type: 'paragraph', text: 'Цена: $120–180 за номер в сутки. Вместимость конференц-зала: до 1500 человек. Подходит для: крупных конференций, дилерских встреч, выставочных программ.' },

        { type: 'heading', text: '2. Four Seasons Resort Sharm El Sheikh (Sharks Bay)', level: 3 },
        { type: 'paragraph', text: 'Премиум-отель уровня luxury, спроектированный в восточном стиле с террасированной планировкой. Несколько ресторанов мишленовского уровня, собственный частный пляж, спа-комплекс. Идеален для VIP-мероприятий, executive-ретритов, премиальных приёмов. Здесь мы провели наш проект VIP-Бедуинского ужина — отель идеально работает с эксклюзивными форматами.' },
        { type: 'paragraph', text: 'Цена: $350–600 за номер в сутки. Вместимость зала: до 200 человек. Подходит для: VIP-приёмов, executive-ретритов, премиум-инсентивов, важных переговоров с международными партнёрами.' },

        { type: 'heading', text: '3. Rixos Seagate Sharm (Nabq Bay)', level: 3 },
        { type: 'image', url: 'https://images.unsplash.com/photo-1729673766564-618fce6c835e?auto=format&fit=crop&q=80&w=1600', alt: 'Аэрофото большого курортного all-inclusive комплекса с бассейном', caption: 'Современные all-inclusive отели в Nabq Bay — оптимальный формат для многодневных корпоративных выездов: всё включено, минимум логистики, большая собственная территория' },
        { type: 'paragraph', text: 'Современный all-inclusive отель с большой территорией и качественным сервисом ultra all inclusive. Несколько ресторанов, аквапарк, конференц-залы на 600+ человек. Здесь мы делали 5-дневный корпоратив EWA Product на 200 человек с workshop-программой. Отель хорошо работает с группами от 100 до 500 человек.' },
        { type: 'paragraph', text: 'Цена: $200–280 за номер в сутки (ultra all inclusive). Вместимость зала: до 600 человек. Подходит для: многодневных корпоративов, мероприятий с насыщенной программой, инсентив-туров.' },

        { type: 'heading', text: '4. Park Regency Sharm El Sheikh (Hadaba)', level: 3 },
        { type: 'paragraph', text: 'Расположен на возвышенности с панорамным видом на Naama Bay и Красное море. Отель славится сильной экспертизой именно в многодневных корпоративных программах. У них хороший конференц-центр, опытная event-команда и широкая база для разноплановых активностей. Здесь мы делали наш кейс NL International — 300 участников, 7 дней программы с двумя тематическими вечеринками.' },
        { type: 'paragraph', text: 'Цена: $160–220 за номер в сутки. Вместимость зала: до 400 человек. Подходит для: длительных программ (5–7 дней), многоформатных мероприятий с тимбилдингом, бизнес-сессиями и развлечениями.' },

        { type: 'heading', text: '5. Grand Rotana Resort & Spa (Naama Bay)', level: 3 },
        { type: 'paragraph', text: 'Премиум-отель в шаговой доступности от центра Naama Bay. Хорошо подходит для конференций с упором на networking — гости могут легко выходить в город после рабочего дня. У отеля современный конференц-центр, удобные переговорные комнаты. Здесь мы делали часть нашего проекта AFA — сельскохозяйственная конференция на 250 человек.' },
        { type: 'paragraph', text: 'Цена: $140–200 за номер в сутки. Вместимость зала: до 300 человек. Подходит для: конференций среднего размера (150–300 человек), мероприятий с упором на content и networking.' },

        { type: 'heading', text: '6. Savoy Sharm El Sheikh (Soho/Nabq)', level: 3 },
        { type: 'paragraph', text: 'Часть туристического комплекса Soho Square — крупная территория с собственной набережной, ресторанами и развлечениями. Отель класса 5★ deluxe с серьёзной MICE-инфраструктурой. Преимущество в том, что комплекс Soho Square позволяет проводить часть программы (вечерние развлечения, бары, шоу) прямо «под боком», не выезжая никуда.' },
        { type: 'paragraph', text: 'Цена: $180–260 за номер в сутки. Вместимость зала: до 500 человек. Подходит для: масштабных мероприятий с развлекательной программой, корпоративов с активной вечерней частью.' },

        { type: 'heading', text: '7. Reef Oasis Blue Bay Resort (Sharks Bay/Nabq)', level: 3 },
        { type: 'paragraph', text: 'Большой курортный комплекс среднего ценового сегмента с длинным песчаным пляжем. Хорошее соотношение цены и качества для корпоративов с ограниченным бюджетом. Семейный формат отеля идеально работает для бюджетных тимбилдингов и инсентивов с большим числом участников.' },
        { type: 'paragraph', text: 'Цена: $90–140 за номер в сутки. Вместимость зала: до 300 человек. Подходит для: бюджетных корпоративов, тимбилдингов на 100–300 человек, инсентивов с экономичной программой.' },

        { type: 'divider' },

        { type: 'heading', text: 'Сводная таблица отелей Шарма', level: 2 },
        {
          type: 'table',
          headers: ['Отель', 'Район', 'Вместимость', 'Цена/ночь', 'Идеален для'],
          rows: [
            ['Domina Coral Bay', 'Sharks Bay', 'До 1500 чел', '$120–180', 'Крупные конференции 500+'],
            ['Four Seasons', 'Sharks Bay', 'До 200 чел', '$350–600', 'VIP, executive, бедуинский ужин'],
            ['Rixos Seagate', 'Nabq Bay', 'До 600 чел', '$200–280', 'Многодневные корпоративы 200+'],
            ['Park Regency', 'Hadaba', 'До 400 чел', '$160–220', 'Длительные программы 5–7 дней'],
            ['Grand Rotana', 'Naama Bay', 'До 300 чел', '$140–200', 'Конференции 150–300 чел'],
            ['Savoy / Soho', 'Soho/Nabq', 'До 500 чел', '$180–260', 'Корпоративы с активной вечерней программой'],
            ['Reef Oasis Blue Bay', 'Sharks/Nabq', 'До 300 чел', '$90–140', 'Бюджетные тимбилдинги 100–300'],
          ],
          caption: 'Цены ориентировочные для премиум-сегмента, включают завтрак или all-inclusive (где применимо). Корпоративные тарифы при бронировании групп от 50 человек обычно на 15–25% ниже',
        },

        { type: 'divider' },

        { type: 'heading', text: 'Дополнительные локации для развлекательной программы', level: 2 },
        { type: 'paragraph', text: 'Помимо самих отелей, для вечерней программы и тимбилдинга в Шарме есть несколько проверенных площадок:' },
        {
          type: 'list',
          items: [
            'Marlin Restaurant & Lounge — открытая площадка на скале с панорамным видом на море. Идеально для тематических вечеринок (мы делали «Luxury Egypt» и «Белую вечеринку» для NL International именно здесь).',
            'Space — клубное пространство для танцевальных вечеринок и DJ-сетов. Молодёжный формат, премиум-уровень.',
            'Soho Square — комплекс ресторанов, баров и развлекательных площадок с собственной набережной. Универсальное место для разноплановых программ.',
            'Бедуинские лагеря в пустыне — выезды на ужин с традиционной кухней, шоу, костром и звездным небом. Топовый формат для VIP-аудитории.',
            'Яхты и катера в Naama Bay — для камерных мероприятий до 30–50 человек с круизом по заливу.',
            'Дайв-центры (Camel Dive Club, Sinai Divers) — для команд от 10 до 100 человек, программы от ознакомительного погружения до 3-дневного PADI-курса.',
          ],
        },

        { type: 'heading', text: 'Тимбилдинг-активности в Шарме', level: 2 },
        { type: 'image', url: 'https://images.unsplash.com/photo-1777553203575-ebd3be8f89a0?auto=format&fit=crop&q=80&w=1600', alt: 'Коралловые рифы Красного моря с тропическими рыбами — основа дайвинг-программ в Шарме', caption: 'Красное море с лучшими в мире коралловыми рифами — естественный плюс Шарма для тимбилдингов с дайвингом и снорклинг-программами' },
        { type: 'paragraph', text: 'Шарм даёт уникальный набор активностей, которых нет в большинстве MICE-направлений. Программы, которые мы регулярно включаем в корпоративные выезды:' },
        {
          type: 'list',
          items: [
            'Дайвинг на рифах Красного моря — от ознакомительного погружения до сертификации PADI Open Water (3 дня).',
            'Снорклинг-сафари на катере с обедом — для команд, не готовых к погружениям с аквалангом.',
            'Сафари в пустыне на квадроциклах + бедуинский ужин — самый популярный активити-формат для корпоративов.',
            'Парусный круиз вдоль побережья или к острову Тиран — премиум-формат на полдня.',
            'Гольф в Soma Bay (1.5 часа от Шарма) — для executive-ретритов.',
            'Кулинарные мастер-классы с местными шефами — аутентичный формат для камерных групп.',
            'Восхождение на гору Моисея (Sinai) — для команд, которые хотят необычного опыта (ночное восхождение к рассвету).',
          ],
        },
        { type: 'image', url: 'https://images.unsplash.com/photo-1723505821895-fe91b6272542?auto=format&fit=crop&q=80&w=1600', alt: 'Группа путешественников на верблюдах пересекает пустыню', caption: 'Сафари в пустыне на верблюдах или квадроциклах + бедуинский ужин — самый запоминающийся формат тимбилдинга в Шарме' },

        { type: 'divider' },

        { type: 'heading', text: 'Какой район выбрать под формат', level: 2 },
        {
          type: 'comparison',
          title: 'Naama Bay vs Sharks/Nabq Bay',
          left: {
            title: 'Naama Bay — для нетворкинга и атмосферы',
            items: [
              'Центр ночной жизни, рестораны, бары, променад',
              'Лёгкий выход «в город» вечером без трансфера',
              'Атмосфера интернационального курорта',
              'Меньшие отели среднего размера',
              'Подходит для камерных групп до 200 человек',
              'Аэропорт — 15 минут',
              'Идеален для конференций с упором на networking',
            ],
          },
          right: {
            title: 'Sharks / Nabq Bay — для масштаба и комфорта',
            items: [
              'Премиум-отели с большой территорией',
              'Длинные приватные пляжи без посторонних',
              'Тихая атмосфера, фокус на корпоративе',
              'Крупные конференц-центры на 500–1500 человек',
              'Большие all-inclusive комплексы',
              'Аэропорт — 5–20 минут (Nabq ближе всего)',
              'Идеален для больших корпоративов и VIP-форматов',
            ],
          },
        },

        { type: 'heading', text: 'Бюджеты корпоратива в Шарме', level: 2 },
        { type: 'stat', number: '$1 000–1 800', label: 'средний бюджет качественного 4–5-дневного корпоратива в Шарм-эль-Шейхе на 1 участника (включая перелёт, размещение, кейтеринг, программу)' },
        { type: 'paragraph', text: 'Бюджет зависит от выбранного отеля, формата размещения (all inclusive vs только завтрак), длительности программы и сложности активностей. Несколько практических ориентиров:' },
        {
          type: 'list',
          items: [
            'Бюджетный корпоратив 100+ чел в Reef Oasis или аналоге на 4 дня — $700–1 000 на человека.',
            'Стандартный корпоратив 100–200 чел в Rixos/Domina/Park Regency на 4–5 дней — $1 000–1 800 на человека.',
            'Крупная конференция 500+ чел в Domina на 3 дня — $700–1 200 на человека (за счёт корпоративных тарифов).',
            'Премиум-корпоратив 30–50 чел в Four Seasons на 4 дня — $2 500–4 500 на человека.',
            'VIP-формат с эксклюзивной программой (Бедуинский ужин, букинг артистов) — от $3 500 на участника.',
          ],
        },

        { type: 'heading', text: 'Логистика: как добираться, расстояния, трансферы', level: 2 },
        { type: 'paragraph', text: 'Аэропорт Шарм-эль-Шейх (SSH) обслуживает прямые рейсы из Москвы (Аэрофлот, Red Wings и др.), Санкт-Петербурга, Казани, Екатеринбурга. Перелёт из Москвы — 4 часа без пересадок. Из европейских городов — 4–5 часов.' },
        { type: 'paragraph', text: 'Время трансфера от аэропорта до отелей:' },
        {
          type: 'list',
          items: [
            'Nabq Bay — 5–15 минут (самый ближний к аэропорту район).',
            'Sharks Bay (Four Seasons, Domina) — 15–25 минут.',
            'Naama Bay (Grand Rotana, центр) — 20–30 минут.',
            'Hadaba (Park Regency) — 25–35 минут.',
            'Old Market — 35–45 минут.',
          ],
        },
        {
          type: 'callout',
          variant: 'info',
          title: 'Виза в Шарм',
          text: 'Sinai Visa Free Zone — для туристических поездок до 14 дней в Шарм-эль-Шейх и южный Синай виза НЕ требуется (бесплатный sticker по прилёту). Для делегаций с программой за пределы зоны (например в Каир к пирамидам) — нужна обычная египетская виза $25 по прилёту.',
        },

        { type: 'heading', text: 'Когда лучше всего проводить корпоратив в Шарме', level: 2 },
        {
          type: 'callout',
          variant: 'success',
          title: 'Оптимальный сезон',
          text: 'Лучший период для корпоративов в Шарме — октябрь–апрель: температура +22–28°C, низкая влажность, идеальная погода для open-air программ. Май и сентябрь — переходные месяцы, ещё комфортно. Июнь–август — жарко (+35–40°C), для длинных программ некомфортно, лучше для коротких 2–3-дневных выездов с фокусом на пляж и кондиционированные залы.',
        },
        { type: 'paragraph', text: 'Также учитывайте Рамадан (плавающие даты в марте–апреле в зависимости от года). В этот месяц местный персонал работает в особом режиме, кейтеринг днём более скромный, многие сервисы закрыты до заката. Если корпоратив попадает на Рамадан — лучше планировать программу с учётом этого: дневные сессии в зале, вечером — открытие после ифтара.' },

        { type: 'heading', text: 'Чек-лист подготовки корпоратива в Шарме', level: 2 },
        {
          type: 'list',
          items: [
            'За 90 дней: подписан контракт с отелем по корпоративным тарифам, оформлена страховка для всех делегатов.',
            'За 60 дней: согласован технический райдер (LED-экраны, звук, свет), забронированы вечерние активности (бедуинский ужин, дайвинг, сафари).',
            'За 30 дней: тест-визит на площадку или подробный walk-through с DMC, окончательный список участников, food tasting кейтеринга.',
            'За 14 дней: собраны диетические анкеты, заказаны резервные трансферы, согласованы артисты и шоу-программа.',
            'За 7 дней: финальный технический прогон, проверка готовности Wi-Fi на ожидаемую нагрузку, брифинг локальной команды.',
            'За 3 дня: координаторы Royal Event Group уже на площадке, отрабатывают сценарий с подрядчиками.',
            'День X: на месте работает координатор + локальная команда + переводчик по необходимости.',
          ],
        },

        { type: 'heading', text: 'Вывод', level: 2 },
        { type: 'paragraph', text: 'Шарм-эль-Шейх — это направление, которое одинаково хорошо работает для корпоративов любого формата: от бюджетных тимбилдингов на 100 человек до VIP-конференций на 1000+ участников с премиум-программой. Главное — правильно выбрать отель и район под задачу, заранее согласовать активности и работать с локальным DMC-партнёром, который знает особенности каждой площадки изнутри.' },
        { type: 'quote', text: 'У нас в Шарме за последние 20 лет было больше 50 крупных корпоративных проектов. Каждая площадка имеет свою «личность»: где сильная техника, где умеют работать с русскими группами, где можно реально вписать 800 человек в один зал, а где это только на бумаге. Это знание невозможно получить из брошюр — только из реального опыта работы.', author: 'Команда Royal Event Group' },
        { type: 'paragraph', text: 'Royal Event Group работает в Шарм-эль-Шейхе более 20 лет, у нас собственная команда на месте и прямые контракты со всеми перечисленными отелями. Если вы планируете корпоратив, конференцию или инсентив в Шарме — поговорите с нами на этапе выбора локации. Это сэкономит и бюджет (за счёт правильных тарифов и DMC-комиссий), и нервы (за счёт реального знания каждой площадки).' },
      ],
    },
    en: {
      title: 'Where to Hold a Corporate Event in Sharm El Sheikh: 7 Top Hotels, Districts, Activities and Real Budgets',
      category: 'Locations',
      date: 'June 4, 2026',
      excerpt: 'Detailed breakdown of Sharm El Sheikh as a MICE destination: districts (Naama Bay, Sharks Bay, Nabq), top hotels, activities, budgets, logistics and real prices.',
      content: `Sharm El Sheikh is the most "MICE-ready" city in Egypt and one of the best destinations in the world for all-inclusive corporate events. Direct flights from Moscow (4 hours), Red Sea with world-class reefs, desert for Bedouin dinners, simple visa, and stable +22–28°C most of the year.

Main tourist districts:
- Naama Bay — historic heart, nightlife, restaurants
- Sharks Bay — northern area with premium hotels (Four Seasons, Domina, Hyatt)
- Nabq Bay — northernmost, closest to airport, large all-inclusive complexes
- Hadaba — south of Naama on elevated terrain with panoramic views
- Old Market — old port and bazaar for cultural activities

Top 7 hotels:
1. Domina Coral Bay (Sharks Bay) — up to 1500 people, $120-180/night
2. Four Seasons Resort (Sharks Bay) — up to 200 people, $350-600/night (VIP)
3. Rixos Seagate (Nabq) — up to 600 people, $200-280/night (ultra all inclusive)
4. Park Regency (Hadaba) — up to 400 people, $160-220/night
5. Grand Rotana (Naama Bay) — up to 300 people, $140-200/night
6. Savoy / Soho Square (Nabq) — up to 500 people, $180-260/night
7. Reef Oasis Blue Bay — up to 300 people, $90-140/night (budget option)

Tim-building activities: diving, snorkeling safari, desert quad bikes + Bedouin dinner, sailing cruise, golf at Soma Bay, culinary masterclass, Mount Sinai climb.

Average budget for 4-5 day Sharm corporate event: $1,000-1,800 per person (including flights).

Sinai Visa Free Zone — no visa required for Sharm El Sheikh and southern Sinai for tourist trips up to 14 days. Egyptian visa $25 on arrival needed for trips beyond the zone (e.g., to Cairo).

Best season: October-April. Royal Event Group has 20+ years in Sharm with direct hotel contracts to all listed venues.`,
    },
  },

  // ───────────────────────────────────────────────────────────────────────
  {
    id: 'kak-podgotovit-programmu-protokolnogo-meropriyatiya',
    datePublished: '2026-06-02',
    image: 'https://images.unsplash.com/photo-1738160507907-74c3d65010ed?auto=format&fit=crop&q=80&w=1600',
    ru: {
      title: 'Как подготовить программу протокольного мероприятия: спикеры, награждения, банкетно-развлекательная часть',
      category: 'Деловые мероприятия',
      date: '2 Июня, 2026',
      excerpt: 'Подробный гайд по структуре протокольного мероприятия: как написать программу спикеров, провести награждения без накладок, организовать банкет и развлекательную часть. Тайминг, бюджеты, типичные ошибки.',
      content: [
        { type: 'paragraph', text: 'Протокольное мероприятие — это особый формат корпоративных событий с жёсткой структурой, высокими ставками и нулевой толерантностью к импровизации. Юбилей компании, ежегодное награждение лучших сотрудников, приём в честь подписания крупного контракта, дилерская конференция с участием первых лиц — все эти мероприятия объединяет одно: ошибка в программе видна всем, и репутационные потери высокие.' },

        { type: 'paragraph', text: 'Разбираем подробно, как спроектировать программу протокольного мероприятия так, чтобы спикеры не растягивали выступления, награждения не превращались в часовой марафон, банкет не выпадал из ритма, а развлекательная часть не подрывала формальный тон события.' },

        { type: 'stat', number: '70%', label: 'протокольных мероприятий выходят за запланированный тайминг минимум на 30 минут. Главная причина — спикеры, которые «уложатся в 5 минут», говорят по 15' },

        { type: 'heading', text: 'Что такое протокольное мероприятие', level: 2 },
        { type: 'paragraph', text: 'Протокольное мероприятие — это формальное корпоративное событие с обязательной официальной частью, чёткой иерархией спикеров, регламентированной программой и часто — VIP-гостями или представителями власти. От обычного корпоратива оно отличается тремя вещами: повышенными требованиями к организации, обязательной церемониальной частью и необходимостью соблюдать деловой этикет на всех этапах.' },
        { type: 'paragraph', text: 'Типичные форматы протокольных мероприятий: юбилей компании, ежегодная корпоративная премия, дилерская конференция с премированием лучших партнёров, приём в честь VIP-гостя, торжественное открытие нового подразделения, отраслевая премия или forum award ceremony.' },

        { type: 'heading', text: 'Классическая структура программы', level: 2 },
        { type: 'paragraph', text: 'Грамотно спроектированная программа протокольного мероприятия состоит из четырёх последовательных блоков:' },
        {
          type: 'list',
          ordered: true,
          items: [
            'Welcome-часть (welcome-drink, регистрация, networking) — 30–45 минут.',
            'Официальная часть (выступления, награждения) — 60–90 минут.',
            'Банкетная часть (ужин с возможными короткими интерполяциями) — 90–120 минут.',
            'Развлекательная часть (концерт, шоу, танцы) — 60–120 минут.',
          ],
        },
        { type: 'paragraph', text: 'Каждый блок имеет свою логику и свои правила. Главная задача организатора — сделать переходы между блоками плавными, чтобы гость не чувствовал «обрыва» формата.' },

        { type: 'divider' },

        { type: 'heading', text: 'Блок 1. Выступления спикеров', level: 2 },
        { type: 'image', url: 'https://images.unsplash.com/photo-1762968274962-20c12e6e8ecd?auto=format&fit=crop&q=80&w=1600', alt: 'Спикер на сцене выступает перед аудиторией на корпоративной конференции', caption: 'Грамотная подача спикера = чёткая структура + правильный микрофон + контролируемый свет. Любая из этих составляющих может убить даже сильный контент' },
        { type: 'paragraph', text: 'Спикерская часть — самая рискованная часть протокольного мероприятия. Здесь чаще всего срывается тайминг, теряется внимание зала и возникают неловкости от неподготовленных выступлений. Несколько важных принципов проектирования спикерского блока:' },

        { type: 'heading', text: 'Длительность и количество', level: 3 },
        { type: 'paragraph', text: 'Оптимальная длительность одного выступления — 5–7 минут. Это формат, который держит внимание зала и не утомляет аудиторию. Главное выступление (например, CEO на юбилее или ключевой партнёр на дилерской конференции) — максимум 15 минут.' },
        { type: 'stat', number: '18 мин', label: 'максимальная длительность одного выступления по TED-стандарту — после этого внимание аудитории падает на 40–60%' },
        { type: 'paragraph', text: 'Общее количество спикеров в официальной части — не более 5–6. Если вам нужно дать слово большему числу людей (например, всем партнёрам или всем руководителям отделов), разнесите выступления по разным блокам программы: часть в welcome-части коротко, часть в банкетной части, часть в видеообращениях.' },

        { type: 'heading', text: 'Порядок выступлений', level: 3 },
        { type: 'paragraph', text: 'Классический протокольный порядок: от менее статусного к более статусному. Сначала ведущий приветствует гостей, затем — выступление организатора (CEO компании), затем — почётные гости в порядке возрастания статуса, и в финале — главное лицо мероприятия (если есть VIP-гость).' },
        {
          type: 'callout',
          variant: 'info',
          title: 'Исключение из правила',
          text: 'Если на мероприятии присутствует представитель власти высокого ранга (министр, посол), его приветствие обычно даётся первым после welcome-приветствия ведущего — это знак уважения. После него выступает CEO компании и далее по протоколу.',
        },

        { type: 'heading', text: 'Подготовка спикеров', level: 3 },
        { type: 'paragraph', text: 'Самая частая ошибка — отсутствие подготовки. Спикер выходит с листком, читает с листа, теряет нить, превышает тайминг в 2–3 раза. Решение: за 2–3 недели до мероприятия проводить speech-сессию с каждым ключевым спикером.' },
        {
          type: 'list',
          items: [
            'Помочь спикеру сформулировать главное сообщение в одной фразе — это «якорь», к которому он будет возвращаться.',
            'Прописать структуру выступления: завязка (30 сек) → 2–3 основных тезиса → финал с конкретным призывом.',
            'Провести репетицию по таймингу с секундомером. Если спикер не укладывается — резать текст безжалостно.',
            'Установить teleprompter (телесуфлёр) для тех, кто не умеет говорить без бумажки — это нормально и не зазорно.',
            'Прописать «выход с сцены» — куда идти после выступления, чтобы не было неловкой паузы.',
          ],
        },

        { type: 'divider' },

        { type: 'heading', text: 'Блок 2. Награждения и официальная часть', level: 2 },
        { type: 'image', url: 'https://images.unsplash.com/photo-1766722906733-609eebf3b63a?auto=format&fit=crop&q=80&w=1600', alt: 'Лауреат на сцене с наградой в руках во время церемонии награждения', caption: 'Торжественное вручение — момент, ради которого делается всё мероприятие. Подсветка лауреата, чёткое объявление, профессиональная подача статуэтки' },
        { type: 'paragraph', text: 'Награждения — самая эмоциональная часть протокольного мероприятия. Здесь рождаются те самые «моменты», которые попадают в корпоративные ролики и запоминаются на годы. Но плохо организованные награждения превращаются в усыпляющий марафон с очередями к сцене и невнятными аплодисментами.' },

        { type: 'heading', text: 'Типы наград и формат вручения', level: 3 },
        {
          type: 'table',
          headers: ['Тип награды', 'Подача', 'Длительность', 'Когда уместно'],
          rows: [
            ['Диплом + цветы', 'Стандартная — вручение на сцене', '~1–2 мин/чел', 'Массовое награждение 10+ человек'],
            ['Именная статуэтка', 'Подсветка экрана + видео-врезка', '~2–3 мин/чел', 'Топ-номинации 3–5 человек'],
            ['Памятный подарок (часы, ручка)', 'Хранится в коробке, вручается на сцене', '~2 мин/чел', 'VIP-награждение топ-партнёров'],
            ['Корпоративный значок / медаль', 'Прикалывается на пиджак на сцене', '~1 мин/чел', 'Юбилейные награды (5/10/15 лет)'],
            ['Денежная премия / сертификат', 'Анонс на сцене, выплата отдельно', '~1 мин/чел', 'Бонусные программы'],
            ['Сертификат на путешествие', 'Большой fake-чек + видео-врезка', '~3–5 мин/чел', 'Главная номинация года'],
            ['Внесение в Hall of Fame', 'Открытие именной таблички + речь', '~5 мин/чел', 'Высшее признание заслуг'],
          ],
          caption: 'Длительность включает выход номинанта на сцену, объявление, вручение, аплодисменты и сход со сцены',
        },

        { type: 'heading', text: 'Структура церемонии награждения', level: 3 },
        { type: 'paragraph', text: 'Грамотная церемония строится по принципу crescendo — от менее значимых наград к самым важным. Это держит внимание зала: гости понимают, что «главное впереди». Финальная награда дня — всегда самая прстижная.' },
        {
          type: 'callout',
          variant: 'warning',
          title: 'Главная ошибка награждений',
          text: 'Награждение «всех подряд по списку» убивает эффект. Если у вас 30 номинантов, разделите их на 3 блока по 10, между блоками — короткое видео, музыкальная пауза или выступление. Иначе после 10-го номинанта зал перестаёт реагировать, и финальные награждения проходят в тишине.',
        },
        { type: 'paragraph', text: 'Оптимальная общая длительность блока награждений — 30–45 минут. Если число номинантов больше, чем позволяет уложиться в это время — часть награждений выносится в видеоформат («Все наши герои этого года») с фотографиями всех на экране и аплодисментами стоя, а на сцену выходят только top-номинанты.' },

        { type: 'divider' },

        { type: 'heading', text: 'Блок 3. Банкетная часть', level: 2 },
        { type: 'image', url: 'https://images.unsplash.com/photo-1770140304098-46700a5c45c8?auto=format&fit=crop&q=80&w=1600', alt: 'Сервировка формального банкетного стола для крупного мероприятия', caption: 'Банкетная часть начинается ещё до прихода гостей: рассадка, сервировка, расстановка карточек с именами — всё подготовлено заранее' },
        { type: 'paragraph', text: 'Банкет — это не «просто ужин», а часть программы со своей драматургией. Главная задача организатора — продумать ритм: между подачей блюд должны быть паузы для разговоров, между разговорами — короткие интерполяции (видео, музыкальный номер, тост) для удержания общего внимания.' },

        { type: 'heading', text: 'Меню и подача', level: 3 },
        { type: 'paragraph', text: 'Протокольный банкет — это обычно 4–5 перемен блюд: welcome-закуски при рассадке → холодные закуски → горячее блюдо → десерт → кофе/чай. Для VIP-формата добавляется amuse-bouche («приветствие шефа» — маленькая порция, подаваемая перед основной программой) и сорбе между основными блюдами.' },
        { type: 'paragraph', text: 'Время на каждую перемену — 25–35 минут. Между переменами — паузы 10–15 минут для общения и неформальных тостов. Общая длительность банкетной части — 90–120 минут, не больше: дольше теряется внимание, появляется усталость.' },

        { type: 'heading', text: 'Рассадка гостей', level: 3 },
        { type: 'paragraph', text: 'Рассадка в протокольном мероприятии — отдельная сложная задача. Главные принципы российского протокола:' },
        {
          type: 'list',
          items: [
            'Главный стол (стол №1) — для VIP-гостей и хозяев мероприятия. Размещение лицом к залу.',
            'Самый почётный гость сидит справа от хозяина мероприятия (правая рука — знак уважения).',
            'Супруги обычно НЕ сидят рядом друг с другом — это позволяет каждому свободно общаться.',
            'Дипломатические представители рассаживаются по старшинству должности, а не по алфавиту страны.',
            'Иностранные гости — рядом с теми, кто говорит на их языке (чтобы не было «изолированных столов»).',
            'За столами 8–10 человек — оптимальный размер для общения. 12+ человек за круглым столом уже плохо.',
          ],
        },

        { type: 'divider' },

        { type: 'heading', text: 'Блок 4. Развлекательная часть', level: 2 },
        { type: 'image', url: 'https://images.unsplash.com/photo-1635961726947-0f821cf9ba28?auto=format&fit=crop&q=80&w=1600', alt: 'Артист на сцене перед зрительным залом во время вечернего концерта', caption: 'Главное правило развлекательной части — НЕ возвращать аудиторию к формальному тону. Только развлечение, музыка и общение' },
        { type: 'paragraph', text: 'Развлекательная часть начинается после официальной программы и банкета. Её задача — снять формальное напряжение и дать гостям возможность общаться в свободном формате. Главное правило — НЕ возвращать аудиторию к формальному тону: никаких новых выступлений, длинных тостов или дополнительных награждений. Только развлечение и общение.' },

        { type: 'heading', text: 'Форматы развлекательной программы', level: 3 },
        {
          type: 'list',
          items: [
            'Концерт приглашённой звезды — самый дорогой и эффектный вариант. Цены — от 500 000 ₽ (российские артисты второго эшелона) до 5–15 млн ₽ (хедлайнеры).',
            'Кавер-группа премиум-уровня — оптимальный баланс цены и эффекта. Стоимость — 200–600 тысяч ₽.',
            'DJ-сет в премиум-формате — для молодёжной аудитории. От 100 000 ₽ за вечер.',
            'Шоу-балет, акробатика, артисты оригинального жанра — короткие 5–10 минутные номера-интерполяции. От 50 000 ₽ за номер.',
            'Танцевальный мастер-класс (танго, латино) — интерактивный формат. Подходит для камерных мероприятий.',
            'Файер-шоу, лазер-шоу, проекционные инсталляции — визуальные форматы без музыки. От 80 000 ₽.',
          ],
        },
        { type: 'stat', number: '60–90 мин', label: 'оптимальная длительность развлекательной части. После этого даже хорошее шоу начинает утомлять, и гости постепенно расходятся' },

        { type: 'heading', text: 'Темпоритм развлекательной части', level: 3 },
        { type: 'paragraph', text: 'Самая частая ошибка в развлекательной программе — равномерный темп без эмоциональных пиков. Хорошая программа строится волнами: разогрев (15 мин лёгкая музыка / фоновое шоу) → пик (главный артист или фишка вечера, 30–40 мин) → спад (свободная музыка, общение, фуршет) → опциональный поздний пик (танцевальная музыка для тех, кто остаётся, ещё 30 мин).' },

        { type: 'divider' },

        { type: 'heading', text: 'Типичный тайминг протокольного мероприятия', level: 2 },
        { type: 'paragraph', text: 'Пример детального тайминга для протокольного мероприятия на 200 гостей с банкетом и шоу-программой:' },
        {
          type: 'list',
          ordered: true,
          items: [
            '18:00–18:45 — Welcome-зона: регистрация, welcome-drink, лёгкие канапе, фотозона, фоновый джаз.',
            '18:45–19:00 — Сбор гостей в зале, рассадка по столам, фоновая музыка.',
            '19:00–19:10 — Открытие: ведущий, краткое приветствие, представление почётных гостей.',
            '19:10–19:25 — Выступление CEO (главное обращение года, 15 минут максимум).',
            '19:25–19:40 — Выступление 1–2 ключевых гостей или партнёров (по 7 минут).',
            '19:40–20:10 — Церемония награждения (топ-номинации с видео-врезками, 30 минут).',
            '20:10–20:15 — Тост-переход: «А теперь приглашаем к столу!» (короткий, без длинных речей).',
            '20:15–22:00 — Банкет: 4–5 перемен блюд, паузы для общения, 1–2 короткие интерполяции (видео клиентского успеха, музыкальный номер).',
            '22:00–23:30 — Главное шоу (концерт / звезда / премиум кавер-группа).',
            '23:30–01:00 — Свободная танцевальная программа + late-night sweet bar для оставшихся.',
          ],
        },

        { type: 'divider' },

        {
          type: 'comparison',
          title: 'Старый протокол vs Современный',
          left: {
            title: 'Старый формат — что больше не работает',
            items: [
              'Длинные речи без структуры (15–20+ минут)',
              'Награждение «всех подряд по списку» по 30+ человек',
              'Стандартное меню «оливье + горячее + торт»',
              'Тамада с шутками 90-х и натянутыми играми',
              'Спикеры без подготовки, выходят с листком',
              'Жёсткая формальность весь вечер без отдушин',
              'Бумажный сценарий у ведущего, без cue-системы',
              'Кавер-группа репертуара «90-е и 2000-е»',
            ],
          },
          right: {
            title: 'Современный формат — что работает в 2026',
            items: [
              'Структурированные речи 5–7 минут, главная — до 15',
              'Топ-номинации на сцене + остальные в видео-формате',
              'Авторское меню от шефа с диетическими опциями',
              'Профессиональный MC + speech-coach для спикеров',
              'Подготовка с teleprompter и репетициями по таймингу',
              'Чёткое деление формальной и неформальной части',
              'Цифровой сценарий с автоподсчётом времени',
              'Премиум-артисты, шоу-номера, лазер-шоу',
            ],
          },
        },

        { type: 'heading', text: 'Бюджеты протокольного мероприятия', level: 2 },
        { type: 'stat', number: '$200–600/чел', label: 'диапазон бюджета на одного гостя для протокольного мероприятия с банкетом и шоу-программой среднего и премиум уровня в России' },
        { type: 'paragraph', text: 'Структура бюджета (для мероприятия на 200 гостей, без аренды площадки):' },
        {
          type: 'list',
          items: [
            'Кейтеринг (4–5 перемен блюд + welcome): $80–150/чел = $16 000–30 000.',
            'Технический продакшн (сцена, свет, звук, экраны): $15 000–40 000.',
            'Декор зала и фотозоны: $8 000–25 000.',
            'Награды (статуэтки, дипломы, гравировка): $50–300/номинация.',
            'Артисты и шоу-программа: $5 000–80 000 (зависит от уровня).',
            'Ведущий и speech-coach: $3 000–8 000.',
            'Фото- и видеосъёмка: $3 000–10 000.',
            'Координация и DMC: 10–15% от общего бюджета.',
          ],
        },

        { type: 'quote', text: 'В протокольном мероприятии главное — не «красиво», а «работает». Каждые 30 секунд тайминга должны быть оправданы. Если на сцене пауза дольше — гость теряет связь с мероприятием. Поэтому хороший protocol-сценарий пишется не в Word, а в Excel: с секундомером по каждой реплике.', author: 'Команда Royal Event Group' },

        { type: 'heading', text: 'Чек-лист подготовки протокольного мероприятия', level: 2 },
        {
          type: 'list',
          items: [
            'За 8 недель: согласован список ключевых спикеров и их роли в программе.',
            'За 6 недель: финализирован сценарий с поминутным таймингом, согласован с организатором.',
            'За 4 недели: первые speech-сессии с ключевыми спикерами, утверждение текстов выступлений.',
            'За 3 недели: финальный список номинантов, согласованы статуэтки и наградная продукция.',
            'За 2 недели: рассадка гостей утверждена, диетические анкеты собраны, репетиция выступлений по таймингу.',
            'За 1 неделя: технический прогон с площадкой, тестирование teleprompter, отработка cue-системы с MC.',
            'За 2 дня: финальная репетиция всей программы с участием ведущего, артистов и подмены ключевых ролей.',
            'День X: на сцене работает координатор Royal Event Group с цифровым сценарием и связью со всеми ответственными.',
          ],
        },

        { type: 'heading', text: 'Вывод', level: 2 },
        { type: 'paragraph', text: 'Протокольное мероприятие — это формат, где импровизация недопустима, а внимание к деталям окупается стократно. Правильно спроектированная программа держит внимание гостей все 5–6 часов, переход между блоками выглядит органичным, а ключевые моменты (выступление CEO, главное награждение, выход звезды) производят максимальный эффект.' },
        { type: 'paragraph', text: 'Royal Event Group проводит протокольные мероприятия любого уровня — от юбилеев компаний на 50 человек до дилерских конференций на 1000+ участников с приглашёнными звёздами и государственными представителями. У нас есть своя команда сценаристов, speech-coach\'и для подготовки спикеров и многолетний опыт построения сложных программ с десятками номинантов и VIP-гостей. Если планируете протокольное мероприятие — поговорите с нами на этапе формулирования концепции, а не когда уже забронирована площадка и подписан контракт с артистом.' },
      ],
    },
    en: {
      title: 'How to Design a Protocol Event Program: Speeches, Awards, Banquet & Entertainment',
      category: 'Business Events',
      date: 'June 2, 2026',
      excerpt: 'A detailed guide to structuring a protocol event: speaker program, awards without delays, banquet pacing, entertainment. Timing, budgets, common mistakes.',
      content: `A protocol event is a special format of corporate gatherings with rigid structure, high stakes, and zero tolerance for improvisation. Company anniversaries, annual awards, contract signing receptions, dealer conferences with top executives — all of these are united by one thing: a mistake in the program is visible to everyone, and reputational losses are high.

Classic structure of a protocol event consists of four sequential blocks:
1. Welcome (welcome-drink, registration, networking) — 30–45 min
2. Official part (speeches, awards) — 60–90 min
3. Banquet (dinner with possible short interludes) — 90–120 min
4. Entertainment (concert, show, dancing) — 60–120 min

Speakers: optimal duration of one speech — 5–7 minutes. Main speech (CEO at anniversary or key partner) — maximum 15 minutes. TED standard says 18 minutes is the maximum before attention drops 40–60%.

Awards: organize in crescendo from less significant to top-tier. If you have 30 nominees, split into 3 blocks of 10 with video/music intermissions. Optimal block length — 30–45 minutes total.

Banquet: 4–5 courses with 10–15 minute pauses between, total 90–120 minutes. Russian protocol seating: most honored guest sits to the RIGHT of the host (right hand — sign of respect). Spouses don't sit next to each other.

Entertainment: starts after official program and banquet. 60–90 minutes optimal length. Don't return to formal tone — only entertainment and free conversation.

Royal Event Group designs and runs protocol events from 50-person company anniversaries to 1000+ dealer conferences with celebrity performers and government officials. We have in-house scriptwriters, speech coaches, and years of experience building complex programs.`,
    },
  },

  // ───────────────────────────────────────────────────────────────────────
  {
    id: 'gde-provesti-korporativ-v-egipte',
    datePublished: '2026-05-31',
    image: '/ewa-14.jpg',
    ru: {
      title: 'Где провести корпоратив в Египте: 5 городов, 12 проверенных площадок и реальные кейсы',
      category: 'Локации',
      date: '31 Мая, 2026',
      excerpt: 'Сравнение городов и площадок Египта для корпоративных мероприятий — от Шарм-эль-Шейха до Каира. Реальные бюджеты, имена отелей, кейсы Royal Event Group.',
      content: [
        { type: 'paragraph', text: 'Египет — одно из самых выгодных направлений для российского корпоратива в 2026 году. Сильный курс рубля делает европейские площадки болезненными для бюджета, а Дубай — традиционно дорогим. Египет на этом фоне предлагает соотношение «цена/сервис», которое сложно найти где-либо ещё: международные сети отелей (Four Seasons, Hilton, Marriott, Kempinski), русскоязычный персонал во многих местах, простая виза по прилёту и температура +25°C даже зимой.' },

        { type: 'paragraph', text: 'Но «провести корпоратив в Египте» — это слишком общая формулировка. Страна большая, и каждый город заточен под свой формат мероприятий. Разбираем 5 главных MICE-направлений Египта с конкретными площадками, реальными бюджетами и примерами из нашей практики.' },

        { type: 'stat', number: '6', label: 'крупных корпоративных мероприятий Royal Event Group провела в Египте только за последний год — от камерных бедуинских ужинов до конференций на 1000+ человек' },

        { type: 'heading', text: '1. Шарм-эль-Шейх — топ выбор для большинства корпоративов', level: 2 },
        { type: 'paragraph', text: 'Шарм-эль-Шейх — самый «MICE-готовый» город Египта. Здесь развитая инфраструктура крупных all-inclusive отелей с собственными конференц-залами, прямые рейсы из Москвы (4 часа), Красное море с лучшими в мире рифами для дайвинга и пустыня для бедуинских ужинов в шаговой доступности. Именно здесь проходила COP27 — климатическая конференция ООН, что подтверждает уровень площадок.' },

        { type: 'image', url: '/carlsberg-0.JPG', alt: 'Конференция Carlsberg на 1000 человек в Domina Coral Bay, Шарм-эль-Шейх', caption: 'Наш кейс: международная конференция Carlsberg на 1000 человек в Domina Coral Bay (Шарм-эль-Шейх). Полный технический продакшн, хостесы, кейтеринг — всё под ключ' },

        { type: 'paragraph', text: 'Топовые площадки Шарм-эль-Шейха для корпоративов:' },
        {
          type: 'list',
          items: [
            'Domina Coral Bay — крупный all-inclusive комплекс с конференц-центром на 1500+ человек. Здесь мы провели международную конференцию Carlsberg на 1000 участников.',
            'Four Seasons Sharm El Sheikh — премиум-уровень для VIP-мероприятий, бедуинские ужины и executive-ретриты.',
            'Rixos Seagate — современный отель с большими конференц-залами и активити-программой. Наш кейс EWA Product — 5-дневный корпоратив на 200 человек.',
            'Park Regency — отель с экспертизой в многодневных корпоративных программах. Кейс NL International — 300 участников, 7 дней.',
            'Grand Rotana и Savoy — пара отелей на бухте Naama Bay, удобно для конференций на 200–300 человек. Наш кейс AFA на 250 участников.',
            'Marlin Inn — площадка для развлекательных программ и тематических вечеринок (наш кейс — Luxury Egypt Party для NL International).',
          ],
        },
        {
          type: 'callout',
          variant: 'info',
          title: 'Почему именно Шарм',
          text: 'Шарм-эль-Шейх — единственный город Египта, где в радиусе 30 км сочетаются: международный аэропорт с прямыми рейсами, 5★ отели с конференц-залами 500+ человек, пустыня для бедуинских ужинов, Красное море с дайвингом мирового уровня, и стабильный климат +22–28°C большую часть года.',
        },

        { type: 'heading', text: '2. Хургада — альтернатива Шарму с другой атмосферой', level: 2 },
        { type: 'paragraph', text: 'Хургада — вторая по популярности MICE-локация Египта. Климат, море и инфраструктура сопоставимы с Шармом, но город расположен на материке (а не на полуострове), что даёт другой характер. Здесь больше пляжных all-inclusive отелей, фокус на семейный и корпоративный отдых, чуть меньше «премиум-сегмента», но и цены ниже на 10–20%.' },

        { type: 'paragraph', text: 'Топовые площадки Хургады:' },
        {
          type: 'list',
          items: [
            'Kempinski Hotel Soma Bay — премиум-отель с собственным гольф-полем, идеален для камерных executive-форматов.',
            'Steigenberger Aqua Magic — большой курортный комплекс с конференц-залами для групп 300+ человек.',
            'Sahl Hasheesh — район курортных отелей премиум-сегмента, подходит для bleisure-программ.',
            'Hurghada Marina — для развлекательных вечерних программ и яхт-туров.',
          ],
        },
        { type: 'paragraph', text: 'Хургада подходит для команд, которые хотят больше «отдыха» в формате корпоратива. Если основная цель — спокойный wellness-формат с пляжем и СПА, Хургада часто выигрывает у Шарма по бюджету.' },

        { type: 'heading', text: '3. Каир — деловой формат с историей в фоне', level: 2 },
        { type: 'image', url: 'https://images.unsplash.com/photo-1539768942893-daf53e448371?auto=format&fit=crop&q=80&w=1600', alt: 'Каир — деловая столица Египта с пирамидами Гизы в фоне', caption: 'Каир — единственное место в мире, где деловую конференцию можно провести с видом на пирамиды Гизы' },
        { type: 'paragraph', text: 'Каир — деловая столица Египта и одно из самых атмосферных мест для конференций в мире. Здесь работает Каирский международный конференц-центр (CICC) — более 58 000 м² площадей, конференц-залы на 2500 человек. Это серьёзная инфраструктура мирового уровня.' },
        { type: 'paragraph', text: 'Главное преимущество Каира — культурный контекст. Гала-ужин на фоне подсвеченных пирамид Гизы — это вау-эффект, который невозможно повторить ни в одном другом городе мира. Для брендов, которые хотят сделать «событие, о котором будут говорить ещё долго», Каир — лучший выбор.' },

        { type: 'paragraph', text: 'Топовые площадки Каира:' },
        {
          type: 'list',
          items: [
            'Каирский международный конференц-центр (CICC) — крупнейший в Африке, для масштабных конференций и выставок.',
            'Marriott Mena House — легендарный отель с прямым видом на пирамиды. Премиум-уровень для VIP-приёмов.',
            'Four Seasons Cairo at Nile Plaza — для executive-форматов с видом на Нил.',
            'St. Regis Cairo — современный отель с большими конференц-залами в центре делового района.',
            'Fairmont Nile City — большие залы и панорамный вид на Нил.',
          ],
        },

        { type: 'heading', text: '4. Луксор — уникальная атмосфера для камерных мероприятий', level: 2 },
        { type: 'paragraph', text: 'Луксор — менее очевидный выбор, но для камерных корпоративов на 20–80 человек подходит идеально. Здесь сосредоточены крупнейшие египетские храмы (Карнак, Луксорский) и Долина Царей. Отелей премиум-сегмента не так много, но те что есть — высокого уровня (Hilton Luxor Resort & Spa, Sofitel Winter Palace). Идеален для executive-ретритов с культурной программой.' },
        { type: 'paragraph', text: 'Атмосфера Луксора — это «гипер-местный» Египет: меньше туристов, больше аутентичности, ужины на крышах с видом на ночные храмы, поездки на воздушных шарах над Долиной Царей на рассвете. Для команд, уставших от стандартных корпоративных форматов, это совсем другой опыт.' },

        { type: 'heading', text: '5. Новый Аламейн — премиум-средиземноморье', level: 2 },
        { type: 'paragraph', text: 'Новый Аламейн на средиземноморском побережье — самое молодое и динамично развивающееся MICE-направление Египта. Здесь строится новая туристическая зона с пятизвёздочными резортами, частными резиденциями, гольф-полями и яхтенными мариноями. Уровень — сопоставимый с лучшими средиземноморскими курортами Европы, но цены пока ниже.' },
        { type: 'paragraph', text: 'Главные плюсы Аламейна для корпоратива: чистые пляжи Средиземного моря (более прохладная вода, чем в Красном — комфортно для тех, кто плохо переносит +30°C), новая премиум-инфраструктура, близость к Александрии и Каиру (1.5–2 часа дорога). Минусы: меньше готовых конференц-площадок (большинство отелей рассчитаны на резидентов и туристов, а не на event-индустрию), сезонность сильнее — лучшее время с апреля по октябрь.' },

        { type: 'divider' },

        { type: 'heading', text: 'Топ-12 площадок для корпоратива в Египте: сводная таблица', level: 2 },
        {
          type: 'table',
          headers: ['Площадка', 'Город', 'Вместимость', 'Стоимость/чел/ночь', 'Подходит для'],
          rows: [
            ['Domina Coral Bay', 'Шарм-эль-Шейх', 'До 1500 чел', '$120–180', 'Крупные конференции 500+'],
            ['Four Seasons Sharm', 'Шарм-эль-Шейх', 'До 200 чел', '$350–600', 'VIP, executive, бедуинский ужин'],
            ['Rixos Seagate', 'Шарм-эль-Шейх', 'До 600 чел', '$200–280', 'Многодневные корпоративы'],
            ['Park Regency', 'Шарм-эль-Шейх', 'До 400 чел', '$160–220', 'Корпоративы 200–300 чел'],
            ['Grand Rotana', 'Шарм-эль-Шейх', 'До 300 чел', '$140–200', 'Конференции 200–300 чел'],
            ['Kempinski Soma Bay', 'Хургада', 'До 200 чел', '$280–450', 'Executive, гольф-ретриты'],
            ['Steigenberger Aqua Magic', 'Хургада', 'До 500 чел', '$150–220', 'Семейные корпоративы, тимбилдинг'],
            ['CICC', 'Каир', 'До 2500 чел', '— (только аренда зала)', 'Масштабные конференции, выставки'],
            ['Marriott Mena House', 'Каир', 'До 400 чел', '$300–500', 'VIP с видом на пирамиды'],
            ['Four Seasons Cairo', 'Каир', 'До 500 чел', '$320–550', 'Executive, деловые встречи'],
            ['Hilton Luxor', 'Луксор', 'До 150 чел', '$180–280', 'Камерные ретриты с историей'],
            ['Premium Alamein Resorts', 'Новый Аламейн', 'До 300 чел', '$250–400', 'Средиземноморский премиум'],
          ],
          caption: 'Цены ориентировочные для премиум-сегмента, включают завтрак. Корпоративные тарифы при бронировании групп от 50 человек обычно на 15–25% ниже',
        },

        { type: 'divider' },

        { type: 'heading', text: 'Какой город выбрать под формат мероприятия', level: 2 },
        {
          type: 'comparison',
          title: 'Деловой Каир vs Курортный Шарм/Хургада',
          left: {
            title: 'Выбрать КАИР, если',
            items: [
              'Нужна максимальная деловая инфраструктура (CICC, конгресс-центры)',
              'Цель — статусное мероприятие с культурным контекстом',
              'Программа включает международных делегатов с европейских направлений',
              'Планируется гала-ужин у пирамид или культурная программа',
              'Это научная, медицинская или ассоциативная конференция',
              'Нужны встречи с государственными или дипломатическими структурами',
              'Бюджет позволяет premium-логистику в большом городе',
            ],
          },
          right: {
            title: 'Выбрать ШАРМ или ХУРГАДУ, если',
            items: [
              'Главная цель — bleisure и совмещение с отдыхом',
              'Команда устала и нуждается в перезагрузке',
              'Это тимбилдинг или инсентив-формат',
              'Хотите программу с дайвингом, яхтингом или сафари',
              'Open-air ужины на берегу моря — часть концепции',
              'Бюджет ограничен (Шарм на 30–40% дешевле Каира)',
              'Команда вылетает из России — прямые рейсы из Москвы 4 часа',
            ],
          },
        },

        { type: 'heading', text: 'Кейсы Royal Event Group в Египте', level: 2 },
        { type: 'image', url: '/nl-7.jpg', alt: 'Корпоративный выезд NL International — 7 дней в Park Regency', caption: 'NL International: 300 участников, 7 дней, бизнес + тимбилдинг + культурная программа. Полное сопровождение от Royal Event Group' },
        { type: 'paragraph', text: 'За 20 лет работы в Египте у нас накопилось более 100 корпоративных проектов разного масштаба. Несколько показательных кейсов:' },
        {
          type: 'list',
          items: [
            'Carlsberg — международная конференция на 1000 человек в Domina Coral Bay. Полный технический продакшн, премиум-кейтеринг, развлекательная программа, координация делегаций. Один из крупнейших корпоративных проектов 2024 года.',
            'NL International — 300 участников, 7 дней в Park Regency. Деловая программа в современных конференц-залах + мастер-классы (йога, визаж, танцы) + тимбилдинг-квесты + две тематические вечеринки (Luxury Egypt + Белая вечеринка на скале).',
            'EWA Product — 5 дней, 200 человек в Rixos Seagate. Полный продакшн с привлечением площадок Marlin и Space, эксклюзивные декорации, креативные воркшопы.',
            'AFA Conference — сельскохозяйственная конференция на 250 человек в Grand Rotana и Savoy. Координация встреч российских участников с арабскими партнёрами, синхронный перевод, протокол.',
            'VIP Бедуинский ужин в Four Seasons — эксклюзивный формат для топ-клиента: уникальная дизайн-концепция, аутентичная программа, брендированная подарочная продукция.',
            'Букинг мировых звёзд — David Guetta, Son of Son, Tom Enzy, Koroleva и другие. Опыт работы со сложными техническими и бытовыми райдерами, безопасность, конфиденциальность.',
          ],
        },

        { type: 'image', url: '/bd-1.jpg', alt: 'VIP Бедуинский ужин в Four Seasons Шарм-эль-Шейх', caption: 'Аутентичный бедуинский ужин в пустыне — фирменный формат, который мы делаем именно в Египте' },

        { type: 'quote', text: 'Главная ошибка организаторов, которые впервые делают корпоратив в Египте — выбрать локацию по красивым фото без понимания особенностей. Площадки в Шарме сильно различаются по уровню MICE-готовности. Мы знаем «изнутри» каждый отель: где сильный технический подрядчик, где умеют работать с русскими группами, где можно реально вписать 500 человек в один зал, а где это на бумаге.', author: 'Команда Royal Event Group' },

        { type: 'heading', text: 'Бюджеты корпоратива в Египте', level: 2 },
        { type: 'stat', number: '$1 200–2 000', label: 'средний бюджет качественного 4–5-дневного корпоратива в Шарм-эль-Шейхе на 1 участника, всё включено (перелёт, размещение, кейтеринг, программа, продакшн)' },
        { type: 'paragraph', text: 'Бюджет на одного участника зависит от формата, города и звёздности отеля. Несколько ориентиров:' },
        {
          type: 'list',
          items: [
            'Камерный корпоратив 20–40 человек в премиум-отеле (Four Seasons) на 3 дня — $2 500–4 500 на человека.',
            'Стандартный корпоратив 100–200 человек в Domina/Rixos/Park Regency на 4–5 дней — $1 200–2 000 на человека.',
            'Крупная конференция 500+ человек в Domina или CICC на 3 дня — $800–1 500 на человека.',
            'Executive-ретрит 8–15 человек в премиум-вилле с фасилитатором — $4 000–7 000 на человека.',
            'VIP-программа с букингом артистов и эксклюзивными активностями — от $5 000 на участника.',
          ],
        },

        { type: 'heading', text: 'Когда лучше всего проводить корпоратив в Египте', level: 2 },
        {
          type: 'callout',
          variant: 'success',
          title: 'Оптимальный сезон',
          text: 'Лучшее время для корпоративов в Египте — октябрь–апрель. В этот период погода идеальна: +22–28°C, низкая влажность, прозрачное небо. Open-air мероприятия, бедуинские ужины, экскурсии и активная программа реально комфортны. Летом (июнь–август) в Каире и южных городах +38–42°C — это уже за гранью комфорта для длинных программ. Шарм и Хургада переносятся легче за счёт морского бриза, но кондиционеры работают на максимум.',
        },
        { type: 'paragraph', text: 'Также учитывайте Рамадан — в этот месяц (примерно март–апрель в зависимости от года) местный персонал работает в особом режиме, кейтеринг должен быть менее видимым из уважения к традициям, многие сервисы вечером закрыты. Если ваш корпоратив попадает на Рамадан — лучше планировать программу с учётом этого, а не игнорировать.' },

        { type: 'heading', text: 'Чек-лист подготовки корпоратива в Египте', level: 2 },
        {
          type: 'list',
          items: [
            'За 90 дней: подписать контракт с площадкой, запустить визовое сопровождение (если есть нероссийские паспорта), оформить международную страховку.',
            'За 60 дней: согласовать технический райдер с местным AV-подрядчиком, проверить календарь местных праздников и Рамадана, забронировать развлекательную программу (бедуинский ужин, дайвинг и т.д.).',
            'За 30 дней: тест-визит на площадку или подробный walk-through с DMC, окончательный список участников, food tasting кейтеринга.',
            'За 14 дней: собрать диетические анкеты, заказать резервный транспорт, проверить готовность Wi-Fi на ожидаемую нагрузку.',
            'За 3 дня: технический прогон со светом/звуком, дублирующие копии всех файлов, брифинг локального персонала.',
            'День X: на месте работает координатор Royal Event Group + локальная команда + переводчик по необходимости.',
          ],
        },

        { type: 'heading', text: 'Вывод', level: 2 },
        { type: 'paragraph', text: 'Египет в 2026 году — одно из самых сильных предложений для российского корпоратива по совокупности факторов: цена, инфраструктура, климат, культурный контекст, простая логистика. Главное — правильно выбрать город и площадку под формат мероприятия. Шарм-эль-Шейх — для большинства корпоративов и тимбилдингов. Каир — для деловых конференций со статусом. Хургада — для бюджетных вариантов с пляжем. Луксор — для камерных ретритов с историей. Новый Аламейн — для премиум-средиземноморья.' },
        { type: 'paragraph', text: 'Royal Event Group работает в Египте более 20 лет, у нас собственная команда в Шарм-эль-Шейхе и прямые контракты со всеми перечисленными отелями. Мы знаем каждую площадку «изнутри» — где сильный технический подрядчик, где умеют работать с русскими группами, где можно реально вписать 500 человек в один зал. Если планируете корпоратив в Египте — поговорите с нами на этапе выбора локации, это сэкономит и бюджет, и потом нервы.' },
      ],
    },
    en: {
      title: 'Where to Hold a Corporate Event in Egypt: 5 Cities, 12 Venues and Real Cases',
      category: 'Locations',
      date: 'May 31, 2026',
      excerpt: 'Comparison of cities and venues in Egypt for corporate events — from Sharm El Sheikh to Cairo. Real budgets, hotel names, Royal Event Group case studies.',
      content: `Egypt is one of the most cost-effective destinations for Russian corporate events in 2026. A strong international hotel infrastructure (Four Seasons, Hilton, Marriott, Kempinski), Russian-speaking staff in many places, simple visa on arrival, and +25°C even in winter.

But "hold a corporate event in Egypt" is too broad. The country is large, and each city is suited for a specific event format.

Sharm El Sheikh — top choice for most corporate events. Direct flights from Moscow (4 hours), Red Sea, desert for Bedouin dinners. Top venues: Domina Coral Bay (up to 1500 people, our Carlsberg case), Four Seasons Sharm (VIP), Rixos Seagate (our EWA Product case), Park Regency (our NL International case), Grand Rotana (our AFA case).

Hurghada — alternative to Sharm with focus on resort format. Kempinski Soma Bay, Steigenberger Aqua Magic. 10–20% cheaper than Sharm.

Cairo — business format with history in the background. Cairo International Conference Center (CICC, up to 2500 people), Marriott Mena House (with pyramids view), Four Seasons Cairo Nile Plaza.

Luxor — unique atmosphere for intimate retreats 20–80 people. Hilton Luxor, Sofitel Winter Palace. Karnak temples, Valley of the Kings.

New Alamein — emerging premium Mediterranean coast. New 5-star resorts, similar to European Mediterranean but cheaper.

Royal Event Group has been working in Egypt for 20+ years with direct contracts to all major hotels. If you're planning a corporate event in Egypt — talk to us at the venue selection stage.`,
    },
  },

  // ───────────────────────────────────────────────────────────────────────
  {
    id: 'biznes-retraity-dlya-kompanij-formaty-celi',
    datePublished: '2026-05-29',
    image: '/ewa-7.jpg',
    ru: {
      title: 'Бизнес-ретриты для компаний: форматы, цели и особенности проведения',
      category: 'Корпоративная культура',
      date: '29 Мая, 2026',
      excerpt: 'Бизнес-ретрит — не «корпоратив с йогой» и не «выездная стратсессия». Это отдельный формат с собственными правилами, целями и метриками. Разбираем 6 типов ретритов, бюджеты и типичный день программы.',
      content: [
        { type: 'paragraph', text: 'Бизнес-ретрит — один из самых растущих и одновременно самых неправильно понимаемых форматов корпоративных мероприятий. Его путают с тимбилдингом, корпоративом, выездной стратегической сессией и «йога-туром с шефом». На самом деле ретрит — это отдельный формат с собственной логикой: глубокая работа над фундаментальными вопросами компании или команды, в максимально изолированной от рутины обстановке.' },

        { type: 'stat', number: '$8 млрд', label: 'оценка глобального рынка корпоративных ретритов в 2025 году. Прогноз роста до 2030 — +12% в год', source: 'отраслевая аналитика' },

        { type: 'paragraph', text: 'Российские и арабские компании активно открывают для себя этот формат — особенно executive-команды и стартапы на этапе масштабирования. Разбираем, чем ретрит отличается от других форматов, какие у него цели, форматы и бюджеты — и как организовать его правильно.' },

        { type: 'heading', text: 'Что такое бизнес-ретрит и его ключевые цели', level: 2 },
        { type: 'paragraph', text: 'Бизнес-ретрит — это многодневное выездное мероприятие, в рамках которого команда выходит из ежедневного операционного контекста, чтобы сфокусированно работать над стратегическими, культурными или личностными задачами. Главное отличие от других форматов — глубина и продолжительность.' },
        { type: 'paragraph', text: 'Корпоратив длится один вечер и решает задачу празднования. Тимбилдинг — 1–2 дня и работает над командной динамикой. Ретрит — 3–7 дней и работает над фундаментальными вопросами: стратегией, ценностями, выгоранием, переосмыслением модели работы.' },

        {
          type: 'comparison',
          title: 'Ретрит vs другие корпоративные форматы',
          left: {
            title: 'Корпоратив / тимбилдинг',
            items: [
              '1 вечер или 1–2 дня',
              'Цель — отметить или сплотить',
              'Алкоголь и развлечения — центр программы',
              'Стандартные локации (отели в городе)',
              'Бюджет — $100–500 на человека',
              'Эффект — кратковременный заряд',
              'Подход «сверху вниз» (формат для всех)',
            ],
          },
          right: {
            title: 'Бизнес-ретрит',
            items: [
              '3–7 дней погружения',
              'Цель — стратегическая работа над компанией',
              'Wellness, рефлексия, фасилитированные сессии',
              'Уединённые локации (виллы, ретрит-центры)',
              'Бюджет — $1 500–5 000 на человека',
              'Эффект — структурные изменения в команде',
              'Индивидуальный дизайн под цель',
            ],
          },
        },

        { type: 'heading', text: '6 форматов бизнес-ретритов', level: 2 },
        { type: 'paragraph', text: 'Под разные цели — разные форматы. Вот основные типы ретритов с диапазонами стоимости и временем проведения.' },
        {
          type: 'table',
          headers: ['Формат', 'Длительность', 'Бюджет/чел', 'Главная цель'],
          rows: [
            ['Стратегический (executive)', '3–5 дней', '$3 000–6 000', 'Согласование стратегии, разрешение конфликтов в топ-команде'],
            ['Командообразующий', '4–7 дней', '$1 500–3 500', 'Глубокая интеграция, формирование общих ценностей'],
            ['Wellness / антивыгорание', '3–5 дней', '$2 000–4 500', 'Восстановление ресурсов, снижение стресса'],
            ['Креативный / визионерский', '3–4 дня', '$1 800–4 000', 'Брейнсторм, переосмысление продукта или подхода'],
            ['Инсентив-ретрит', '4–6 дней', '$2 000–5 000', 'Премирование топ-сотрудников, удержание талантов'],
            ['Лидерский / coaching-ретрит', '5–7 дней', '$3 500–8 000', 'Развитие лидерских качеств у high-potential'],
          ],
          caption: 'Бюджеты для премиум-уровня в Египте/ОАЭ. В европейских странах — на 40–60% дороже при сопоставимом сервисе',
        },

        { type: 'heading', text: 'Кому подходит каждый формат', level: 2 },
        { type: 'paragraph', text: 'Выбор формата зависит от текущих задач компании и состояния команды. Несколько практических ориентиров:' },
        {
          type: 'list',
          items: [
            'Стратегический — для C-level команд перед запуском нового продукта, выходом на рынок, после M&A.',
            'Командообразующий — после быстрого роста, найма большого количества новых людей, реорганизации структуры.',
            'Wellness — после интенсивного года, перед началом нового сложного этапа, для команд с признаками выгорания.',
            'Креативный — на этапах поиска нового product-market fit, инноваций, переосмысления позиционирования.',
            'Инсентив — раз в год для топ-10% сотрудников по результатам, как часть программы удержания.',
            'Лидерский — для high-potential менеджеров, готовящихся к повышению, как часть программы развития.',
          ],
        },

        { type: 'heading', text: 'Локации: где проводить ретрит', level: 2 },
        { type: 'image', url: '/bd-3.jpg', alt: 'Закрытая локация в пустыне — формат executive-ретрита от Royal Event Group', caption: 'Закрытая пустынная локация в стиле бедуинского лагеря — образец «изолированной от рутины» площадки для executive-ретрита' },
        { type: 'paragraph', text: 'Главный критерий выбора локации для ретрита — степень изоляции от рутины. Конференц-зал в Москве не подходит — слишком близко к офису, слишком много отвлекающих факторов. Идеальная локация — за границей или в удалённой части страны, с минимальным количеством внешних раздражителей.' },
        { type: 'paragraph', text: 'Топ направлений для бизнес-ретритов из России: Египет (Шарм-эль-Шейх, Хургада, Луксор) — оптимально по цене/сервису/атмосфере; ОАЭ (Рас-эль-Хайма, виллы на островах Дубая) — для премиум-сегмента; Турция (Каппадокия, эгейское побережье) — для wellness-форматов; Грузия и Армения — для камерных групп до 20 человек; Бали и Шри-Ланка — для wellness-ретритов на 7+ дней.' },

        { type: 'heading', text: 'Типичный день ретрита', level: 2 },
        { type: 'paragraph', text: 'Программа ретрита кардинально отличается от обычной конференции. Меньше публичных выступлений, больше работы в малых группах. Меньше плотных слайдов, больше времени на рефлексию. Меньше «обязаловки», больше выбора активностей.' },
        { type: 'paragraph', text: 'Пример сбалансированного дня executive-ретрита:' },
        {
          type: 'list',
          ordered: true,
          items: [
            '7:00–8:30 — Wellness-блок (йога, плавание, медитация, прогулка на восход).',
            '8:30–10:00 — Завтрак в формате family-style (общий стол, разговор).',
            '10:00–13:00 — Глубокая сессия с фасилитатором (стратегия / ценности / выгорание).',
            '13:00–15:00 — Обед + свободное время (контакты вне работы, неформальное общение).',
            '15:00–17:30 — Воркшоп в малых группах (3–5 человек) с обменом инсайтов.',
            '17:30–19:00 — Активность по выбору (СПА / прогулка / спорт / тишина).',
            '19:00–22:00 — Ужин в нестандартной локации (бедуинский ужин, ресторан на скале, винодельня).',
            '22:00–23:00 — Опционально: спикер / документальный фильм / музыка.',
          ],
        },
        {
          type: 'callout',
          variant: 'info',
          title: 'Ключевой принцип',
          text: 'В программе должно быть не более 5–6 часов обязательного контента в день. Остальное — выборные активности или свободное время. Перегрузка убивает эффект ретрита: команда уезжает не отдохнувшей, а ещё более уставшей, чем приехала.',
        },

        { type: 'heading', text: 'Логистика и приватность', level: 2 },
        { type: 'paragraph', text: 'Ретрит — это closed-door мероприятие. Команда работает над чувствительными темами (стратегия, конфликты, выгорание), которые не должны утечь наружу. Поэтому особое внимание — приватности.' },
        {
          type: 'list',
          items: [
            'Локация должна быть buyout — арендуется целиком, без посторонних гостей в отеле/вилле.',
            'Персонал отеля подписывает NDA, особенно если на ретрите обсуждаются М&А-сценарии или замены в топ-команде.',
            'Фото/видеосъёмка — только согласованная, без выкладки в соцсети персоналом.',
            'Wi-Fi — выделенный сегмент только для участников, без доступа сотрудников отеля.',
            'Переговоры за пределами зала — на пляже, в саду, во время прогулок — стандартная практика, площадка должна это поддерживать.',
          ],
        },

        { type: 'heading', text: 'Бюджет и сроки подготовки', level: 2 },
        { type: 'stat', number: '$2 500/чел', label: 'средний бюджет качественного 4–5-дневного executive-ретрита в Египте или ОАЭ, всё включено: проживание, кейтеринг, фасилитатор, активности' },
        { type: 'paragraph', text: 'Подготовка ретрита — это 8–12 недель. Меньше — рискованно, потому что хорошие фасилитаторы и эксклюзивные локации бронируются заранее. Больше — нормально, если планируется кастомная программа со специально приглашённым speaker’ом.' },
        { type: 'paragraph', text: 'Структура бюджета (для группы 30 человек, 5 дней, Египет):' },
        {
          type: 'list',
          items: [
            'Проживание (премиум-вилла или buyout-отель): ~$30 000.',
            'Кейтеринг (3 разовое питание + кофе-брейки, healthy-меню): ~$15 000.',
            'Фасилитатор / coach (включая подготовку): $8 000–25 000.',
            'Активности (wellness, экскурсии, тимбилдинг): $5 000–10 000.',
            'Логистика (визы, трансферы, авиабилеты): зависит от страны проживания.',
            'Технический продакшн (если есть presentation-блоки): $3 000–5 000.',
            'DMC-сопровождение и координация: 10–15% от общего бюджета.',
          ],
        },

        { type: 'quote', text: 'Бизнес-ретрит — это не «подарок» команде. Это инвестиция с измеримым возвратом. Если через 3 месяца после ретрита нет структурных изменений в работе — значит, ретрит был неправильно спроектирован.', author: 'Команда Royal Event Group' },

        { type: 'divider' },

        { type: 'heading', text: 'Когда стоит проводить ретрит', level: 2 },
        {
          type: 'list',
          items: [
            'Перед запуском нового продукта или выходом на рынок — синхронизация видения у команды.',
            'После M&A или серьёзной реструктуризации — формирование новой культуры из двух разных.',
            'При признаках выгорания в команде — превентивная пауза вместо потери ключевых сотрудников.',
            'Раз в год для топ-команды — переосмысление стратегии и снятие накопленного напряжения.',
            'При входе high-potential менеджеров в новые роли — ускорение адаптации.',
            'Как часть программы удержания топ-10% сотрудников — инсентив-ретрит вместо денежного бонуса.',
          ],
        },

        { type: 'heading', text: 'Метрики успешного ретрита', level: 2 },
        { type: 'paragraph', text: 'Хороший ретрит — измеримый ретрит. Метрики, по которым оценивается результат:' },
        {
          type: 'list',
          items: [
            'Конкретные решения, принятые на ретрите — должны быть зафиксированы в письменном виде до отъезда команды.',
            'eNPS до и через 1 месяц после — изменение должно быть положительным минимум на 10 пунктов.',
            'Уровень выгорания (по корпоративной анкете) — снижение через 1–3 месяца.',
            'Скорость принятия решений в C-level команде в квартале после.',
            'Текучесть кадров среди участников в полугодии после — должна быть ниже общекорпоративной.',
            'Количество новых инициатив, запущенных в первый месяц после.',
          ],
        },

        { type: 'heading', text: 'Вывод', level: 2 },
        { type: 'paragraph', text: 'Бизнес-ретрит — это не модное слово и не вариант корпоративного отдыха. Это серьёзный инвестиционный инструмент, который работает только при правильном проектировании: с чёткой целью, профессиональным фасилитатором, изолированной локацией и измеримыми метриками результата.' },
        { type: 'paragraph', text: 'Royal Event Group проектирует и проводит бизнес-ретриты в Египте, ОАЭ, Турции и России — от executive-ретритов на 8 человек в Four Seasons до командообразующих программ на 80+ участников в buyout-резортах. Если рассматриваете формат ретрита для своей компании — поговорите с нами на этапе формулирования целей. Мы поможем подобрать формат, локацию, фасилитатора и спроектировать программу, которая действительно изменит работу команды.' },
      ],
    },
    en: {
      title: 'Business Retreats for Companies: Formats, Goals and Specifics',
      category: 'Corporate Culture',
      date: 'May 29, 2026',
      excerpt: 'A business retreat is not a "corporate event with yoga" and not an "offsite strategy session." It is a separate format with its own rules, goals, and metrics.',
      content: `A business retreat is one of the fastest-growing and most misunderstood formats of corporate events. It gets confused with team building, corporate parties, offsite strategy sessions, and "yoga tours with a chef." In reality, a retreat is a separate format with its own logic: deep work on fundamental questions of the company or team, in maximally isolated surroundings.

The global market for corporate retreats is estimated at $8 billion in 2025, with projected growth of +12% per year through 2030. Russian and Arab companies are actively discovering this format — especially executive teams and scaling startups.

What makes a retreat different

A corporate party lasts one evening and solves the task of celebration. Team building takes 1–2 days and works on team dynamics. A retreat takes 3–7 days and works on fundamental questions: strategy, values, burnout, rethinking the way of working.

Six formats of business retreats

— Strategic (executive) — 3–5 days, $3 000–6 000/person — aligning strategy in the top team
— Team-integration — 4–7 days, $1 500–3 500/person — deep integration of values
— Wellness / anti-burnout — 3–5 days, $2 000–4 500/person — resource recovery
— Creative / visionary — 3–4 days, $1 800–4 000/person — brainstorm, rethinking product
— Incentive retreat — 4–6 days, $2 000–5 000/person — rewarding top performers
— Leadership / coaching retreat — 5–7 days, $3 500–8 000/person — developing high-potential

A balanced executive retreat day

7:00–8:30 wellness (yoga, swim, meditation) → breakfast → 3-hour deep session with facilitator → lunch + free time → small-group workshop → afternoon activity by choice → dinner in non-standard location → optional evening content.

Key principle: no more than 5–6 hours of mandatory content per day. Overload kills the retreat effect.

Royal Event Group designs and runs business retreats in Egypt, UAE, Turkey, and Russia — from executive retreats for 8 people at Four Seasons to team-integration programs for 80+ participants at buyout resorts. If you're considering a retreat format for your company — talk to us at the stage of formulating goals.`,
    },
  },

  // ───────────────────────────────────────────────────────────────────────
  {
    id: 'top-8-tendencii-kejteringa-2026',
    datePublished: '2026-05-27',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=1600',
    ru: {
      title: 'Топ-8 тенденций кейтеринга в 2026 году',
      category: 'Кейтеринг',
      date: '27 Мая, 2026',
      excerpt: 'От plant-forward меню и action stations до AI-планирования и съедобной упаковки — что меняется в кейтеринге для корпоративных мероприятий, и почему «обычный фуршет» уже не работает.',
      content: [
        { type: 'paragraph', text: 'Кейтеринг на корпоративном мероприятии перестал быть «технической паузой между сессиями». В 2026 году еда — это полноценный продукт мероприятия: то, что обсуждают в кулуарах, постят в соцсети и упоминают в обратной связи. Организаторы, которые подходят к меню так же стратегически, как к контенту сессий, получают на выходе совершенно другой уровень впечатлений у гостей. Разбираем восемь главных трендов, которые определяют MICE-кейтеринг прямо сейчас.' },

        { type: 'stat', number: '78%', label: 'участников отраслевых опросов называют качество кейтеринга одним из ТОП-3 факторов общей оценки мероприятия', source: 'обобщённая статистика индустрии MICE' },

        { type: 'heading', text: '1. Sustainable: устойчивый кейтеринг как базовое требование', level: 2 },
        { type: 'paragraph', text: 'Sustainability перестала быть «галочкой в брифе» и стала обязательным условием при выборе поставщика. Корпоративные клиенты, особенно с ESG-стратегией, требуют конкретики: откуда мясо, какие продукты местные, что происходит с пищевыми отходами после мероприятия, какая упаковка используется.' },
        { type: 'image', url: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&q=80&w=1600', alt: 'Sustainable catering — местные продукты и сезонные ингредиенты на корпоративном мероприятии', caption: 'Locally-sourced, seasonal ingredients — основа sustainable-меню 2026 года' },
        { type: 'paragraph', text: 'Конкретные практики, которые становятся стандартом: локальные продукты в радиусе 200 км от площадки, сезонные ингредиенты вместо круглогодичных, отказ от одноразового пластика в пользу биоразлагаемой или съедобной упаковки (рисовая бумага, пресс-формы из овощей), компостирование органических отходов, передача излишков еды партнёрским фудбанкам.' },
        {
          type: 'callout',
          variant: 'success',
          title: 'Практический эффект',
          text: 'Sustainable-меню обычно на 10–15% дороже обычного, но эта разница окупается двумя способами: positive PR в отчёте мероприятия и право использовать sustainability как маркетинговый аргумент перед клиентом. Многие площадки сами субсидируют переход на eco-практики ради сертификации.',
        },

        { type: 'heading', text: '2. Action stations: театр на тарелке', level: 2 },
        { type: 'paragraph', text: 'Action stations — это интерактивные кулинарные точки, где шеф готовит блюдо в реальном времени на глазах у гостя. Pasta-station, где паста выливается из кругa сыра пармезан. Ramen-станция, где бульон наливают из медной кеттла. Sushi-bar, где роллы крутят прямо перед тобой. Это уже не просто еда — это шоу.' },
        { type: 'video', url: '/videos/ewa-horizontal.mp4', title: 'Атмосфера корпоративного выезда — пример качественного фуд-сервиса', caption: 'Пример: атмосфера корпоративного выезда EWA Product в Шарм-эль-Шейхе. Action stations работали в формате «гость подходит — шеф готовит индивидуальную порцию»' },
        { type: 'paragraph', text: 'Зачем это организатору, кроме «вау-эффекта»: action stations естественно растягивают приём пищи и создают зоны общения вокруг себя. Гость подошёл за порцией — рядом ещё двое-трое — завязался разговор. Это работает на нетворкинг сильнее, чем любые специальные icebreakers.' },
        { type: 'quote', text: 'Action station — это не про еду. Это про микровстречи, которые случаются вокруг неё. Хороший шеф у плиты ценнее, чем посредственный спикер на сцене — он работает с гостем один на один, и эта memory долго не уходит.', author: 'Команда Royal Event Group' },

        { type: 'heading', text: '3. Plant-forward: растительное по умолчанию', level: 2 },
        { type: 'paragraph', text: 'Раньше веганская опция была «галочкой в анкете», и её получали 1–2 человека из 100. В 2026 году картина перевернулась: растительные блюда становятся основой меню, а мясо — одной из опций. Это не идеология — это реакция на запрос. Гости устают от тяжёлых мясных шведских столов; шеф-повара уважают растительные блюда как полноценное гастрономическое направление.' },
        {
          type: 'diagram',
          title: 'Рост доли растительных блюд в меню корпоративных мероприятий 2020–2026',
          svg: `<svg viewBox="0 0 600 320" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto" preserveAspectRatio="xMidYMid meet">
  <text x="300" y="28" text-anchor="middle" font-family="system-ui, sans-serif" font-size="16" font-weight="700" fill="#1a1a1a">Доля растительных блюд в MICE-меню</text>
  <line x1="60" y1="50" x2="60" y2="270" stroke="#cbd5e1" stroke-width="1"/>
  <line x1="60" y1="270" x2="560" y2="270" stroke="#cbd5e1" stroke-width="1"/>
  <line x1="60" y1="50" x2="560" y2="50" stroke="#f1f5f9" stroke-dasharray="3,3"/>
  <line x1="60" y1="116" x2="560" y2="116" stroke="#f1f5f9" stroke-dasharray="3,3"/>
  <line x1="60" y1="182" x2="560" y2="182" stroke="#f1f5f9" stroke-dasharray="3,3"/>
  <line x1="60" y1="248" x2="560" y2="248" stroke="#f1f5f9" stroke-dasharray="3,3"/>
  <text x="50" y="55" text-anchor="end" font-family="system-ui" font-size="11" fill="#64748b">50%</text>
  <text x="50" y="121" text-anchor="end" font-family="system-ui" font-size="11" fill="#64748b">37%</text>
  <text x="50" y="187" text-anchor="end" font-family="system-ui" font-size="11" fill="#64748b">25%</text>
  <text x="50" y="253" text-anchor="end" font-family="system-ui" font-size="11" fill="#64748b">12%</text>
  <text x="50" y="275" text-anchor="end" font-family="system-ui" font-size="11" fill="#64748b">0</text>
  <rect x="105" y="217" width="60" height="53" fill="#F72585" fill-opacity="0.35" rx="4"/>
  <text x="135" y="208" text-anchor="middle" font-family="system-ui" font-size="13" font-weight="700" fill="#1a1a1a">12%</text>
  <text x="135" y="293" text-anchor="middle" font-family="system-ui" font-size="11" fill="#64748b">2020</text>
  <rect x="225" y="190" width="60" height="80" fill="#F72585" fill-opacity="0.55" rx="4"/>
  <text x="255" y="181" text-anchor="middle" font-family="system-ui" font-size="13" font-weight="700" fill="#1a1a1a">18%</text>
  <text x="255" y="293" text-anchor="middle" font-family="system-ui" font-size="11" fill="#64748b">2022</text>
  <rect x="345" y="151" width="60" height="119" fill="#F72585" fill-opacity="0.75" rx="4"/>
  <text x="375" y="142" text-anchor="middle" font-family="system-ui" font-size="13" font-weight="700" fill="#1a1a1a">27%</text>
  <text x="375" y="293" text-anchor="middle" font-family="system-ui" font-size="11" fill="#64748b">2024</text>
  <rect x="465" y="94" width="60" height="176" fill="#F72585" rx="4"/>
  <text x="495" y="85" text-anchor="middle" font-family="system-ui" font-size="13" font-weight="700" fill="#1a1a1a">40%</text>
  <text x="495" y="293" text-anchor="middle" font-family="system-ui" font-size="11" fill="#64748b">2026</text>
</svg>`,
          caption: 'За шесть лет доля растительных блюд в корпоративных меню выросла в три раза. К 2028 году ожидается выход на 50%+',
        },

        { type: 'heading', text: '4. Hyper-personalization: меню под каждого', level: 2 },
        { type: 'paragraph', text: 'Допустим, у вас 200 гостей. У 18 — непереносимость глютена, у 24 — лактозы, у 9 — аллергия на орехи, у 12 — кошерное питание, у 7 — халяль, у 31 — веганство. Раньше это решалось одной строчкой «Vegan menu available on request». Сейчас — индивидуальной плашкой на каждом блюде с маркерами аллергенов, мобильным приложением, где гость заранее указал предпочтения, и кухней, которая готовит персонализированные тарелки.' },
        { type: 'paragraph', text: 'Цифровые инструменты для этого уже доступны: системы вроде Tripleseat, BizBash или внутренние event-приложения позволяют собрать ВСЕ диетические данные за 2 недели до мероприятия и автоматически передать их на кухню. Шеф получает чёткий список: 12 веганских боулов на стол 4, 9 безглютеновых десертов в зону кофе-брейка, 7 халяль-наборов в lunch-box.' },
        {
          type: 'callout',
          variant: 'info',
          title: 'Маленькая деталь, большой эффект',
          text: 'Карточки с маркировкой аллергенов и диетических свойств у каждого блюда (V — vegan, GF — gluten free, без лактозы, без свинины) — это не перфекционизм. Это +15% к оценке мероприятия в анкетах обратной связи. Гость с особенностями питания чувствует уважение, а остальные просто узнают что едят.',
        },

        { type: 'heading', text: '5. Cultural authenticity: локальная кухня без туристического акцента', level: 2 },
        { type: 'paragraph', text: 'Раньше «египетская тематика» на мероприятии в Шарм-эль-Шейхе означала кускус и хумус, приготовленные европейским шефом по «универсальной» рецептуре. В 2026 году это уже неинтересно. Гости ожидают аутентичности: рецепты от местных шеф-поваров, ингредиенты с локального рынка, традиционные техники приготовления (тажин, бедуинский ужин в пустыне, рыба на углях у Красного моря).' },
        { type: 'image', url: '/bd-2.jpg', alt: 'VIP Бедуинский ужин — аутентичная региональная подача от Royal Event Group', caption: 'VIP Бедуинский ужин — пример experiential catering с настоящей региональной кухней и аутентичной подачей. Кейс Royal Event Group в Шарм-эль-Шейхе' },
        { type: 'paragraph', text: 'Это работает на двух уровнях. Во-первых, аутентичная локальная еда запоминается лучше — она часть культурного опыта поездки. Во-вторых, организатор может рассказать историю каждого блюда: откуда специи, как готовили предки, кто из местных шефов это делал. Storytelling вокруг еды превращает кейтеринг в самостоятельный элемент программы.' },

        { type: 'heading', text: '6. Functional food: еда, которая работает', level: 2 },
        { type: 'paragraph', text: 'Конференция с плотной программой — это умственная работа на пределе. Тяжёлый кейтеринг с обильной выпечкой и сладкой газировкой даёт быстрый скачок энергии и резкий спад через час. К концу дня аудитория полусонная. Functional food решает эту проблему: продукты подбираются по их влиянию на когнитивную активность.' },
        {
          type: 'list',
          items: [
            'Матча-латте — стабильная энергия 3–4 часа без резкого спада (в отличие от эспрессо).',
            'Чиа-пудинги — омега-3 и клетчатка, поддерживают концентрацию.',
            'Шоты из имбиря и куркумы — противовоспалительный эффект, иммунитет.',
            'Адаптогены: ашваганда, родиола — снижение стресса перед презентацией.',
            'Орехово-фруктовые миксы вместо печенья — белок + сложные углеводы.',
            'Smoothie-bar с шпинатом, бананом, ягодами — витамины + энергия после обеда.',
          ],
        },
        { type: 'paragraph', text: 'Wellness-меню стало нормой для индустриальных конференций (Tech, Pharma, Finance), где аудитория сама следит за здоровьем и ожидает того же от организатора.' },

        { type: 'heading', text: '7. Instagram-worthy: подача как визуальное событие', level: 2 },
        { type: 'paragraph', text: 'Если еда не годится в Stories — значит её плохо подали. Звучит цинично, но реальность 2026 года такова: каждое мероприятие выкладывается в соцсети участниками, и визуальная подача блюд напрямую влияет на охват вашего бренда. Хорошее фото гала-ужина в Instagram у одного делегата с 10 000 подписчиков — это бесплатный охват, который не купить рекламой.' },
        { type: 'image', url: '/nl-10.jpg', alt: 'Эстетичная подача гала-ужина на корпоративе NL International', caption: 'Гала-ужин NL International в Park Regency — пример Instagram-worthy подачи, которая работает на бесплатный PR в соцсетях участников' },
        { type: 'paragraph', text: 'Что работает: цветовые контрасты в тарелке (зелёное + розовое + золотое), необычные текстуры (мраморные доски, дым жидкого азота, золотая фольга), мини-форматы (verrines, тапасы, амюз-буши), геометрия (sphere-формы, призмы шоколада), сезонные цветы как украшение. Минимализм и чёткие цвета — лучшая основа для фото.' },

        { type: 'heading', text: '8. Tech-enabled: AI на службе кейтеринга', level: 2 },
        { type: 'paragraph', text: 'Технологии меняют не только подачу, но и backend кейтеринга. Системы умного инвентаря отслеживают потребление в реальном времени и сигналят шефу когда заканчивается тот или иной снэк. AI-планировщики меню анализируют историю мероприятий клиента и его аудитории, предлагают оптимальный баланс блюд. QR-коды на каждой тарелке открывают полный состав с аллергенами на 5 языках. Smart-роботы доставляют тарелки к столам в гала-форматах с 500+ гостей.' },
        { type: 'paragraph', text: 'Для организатора это означает три практических плюса: меньше пищевых отходов (умный инвентарь), точный расчёт бюджета (AI-планировщик), и снижение риска ошибок с аллергиями (QR-коды).' },

        { type: 'divider' },

        { type: 'heading', text: 'Сравнение форматов кейтеринга в 2026 году', level: 2 },
        { type: 'paragraph', text: 'Выбор формата напрямую влияет на бюджет, логистику и впечатления гостей. Сводная таблица — где какой формат уместен.' },
        {
          type: 'table',
          headers: ['Формат', 'Стоимость на персону (USD)', 'Wow-фактор', 'Логистика', 'Когда выбирать'],
          rows: [
            ['Фуршет / шведский стол', '25–50', 'Средний', 'Простая', 'Нетворкинг 100+ человек, кофе-брейки'],
            ['Сидячий ужин (plated)', '80–200', 'Высокий', 'Сложная', 'Гала, VIP-приёмы, до 300 гостей'],
            ['Family-style (общие блюда)', '50–90', 'Высокий', 'Средняя', 'Камерные ужины 20–80 человек'],
            ['Action stations', '60–120', 'Очень высокий', 'Сложная', 'Премиум-мероприятия 50–200 гостей'],
            ['Кофе-станция с бариста', '8–15', 'Низкий', 'Простая', 'Дополнение к деловой программе'],
            ['Late-night sweet bar', '15–30', 'Средний', 'Простая', 'Финальный аккорд после гала'],
          ],
          caption: 'Цены ориентировочные для премиум-уровня в Египте/ОАЭ, без учёта алкоголя и сервисного сбора',
        },

        { type: 'divider' },

        {
          type: 'comparison',
          title: 'Что OUT и что IN в кейтеринге 2026',
          left: {
            title: 'OUT — больше не работает',
            items: [
              'Тяжёлые мясные шведские столы как основа',
              'Одинаковое меню «для всех» без диетических опций',
              'Пластиковые тарелки, стаканчики и приборы',
              'Печенье + газировка на кофе-брейках',
              'Безликий buffet без storytelling',
              'Игнорирование Рамадана и местных праздников',
              'Презентация еды «на дешёвых пластиковых подносах»',
              'Шеф-повар как невидимая фигура за кулисами',
            ],
          },
          right: {
            title: 'IN — становится стандартом',
            items: [
              'Plant-forward основное меню с мясом как опцией',
              'Hyper-personalization по диетическим анкетам',
              'Биоразлагаемая / съедобная упаковка',
              'Smoothie + матча + functional snacks',
              'Action stations с chef-storytelling',
              'Учёт религиозного и культурного контекста',
              'Эстетика Instagram-worthy — контрасты, текстуры, минимализм',
              'Шеф в зале, готовит и общается с гостями',
            ],
          },
        },

        { type: 'heading', text: 'Бюджеты и реалистичные ожидания', level: 2 },
        { type: 'paragraph', text: 'Качественный кейтеринг 2026 года стоит дороже, чем «корпоратив 2015». Но разрыв сокращается за счёт двух факторов: action stations и plant-forward позиции часто дешевле в производстве, чем мясные plated-блюда; технологические решения снижают потери на 15–25%.' },
        { type: 'stat', number: '$45–75', label: 'средний бюджет качественного кейтеринга на персону для конференции среднего уровня в 2026 году (без алкоголя и сервиса)', source: 'опыт Royal Event Group, Египет/ОАЭ' },

        { type: 'heading', text: 'Чек-лист для организатора', level: 2 },
        {
          type: 'list',
          items: [
            'За 30 дней: разослать диетические анкеты делегатам, собрать ответы.',
            'За 21 день: согласовать sustainable-практики с площадкой (источники продуктов, упаковка).',
            'За 14 дней: food tasting с шеф-поваром, утверждение меню по блокам (кофе-брейк, обед, гала, late-night).',
            'За 7 дней: финальная маркировка блюд с аллергенами, заказ растительных альтернатив, проверка action-station оборудования.',
            'День X-1: технический прогон action stations, проверка smart-инвентаря, брифинг персонала.',
            'День X: фотограф с food-фокусом для контента в соцсети, координация QR-кодов для гостей.',
          ],
        },

        { type: 'heading', text: 'Вывод', level: 2 },
        { type: 'paragraph', text: 'Кейтеринг в 2026 году — это не «технический момент в программе», а полноценный продукт мероприятия. От него зависит обратная связь, фотоконтент в соцсетях, энергия аудитории на сессиях и долгосрочная репутация бренда-организатора.' },
        { type: 'paragraph', text: 'Royal Event Group работает с проверенными кейтеринговыми партнёрами в Египте, ОАЭ и России. Мы проектируем меню под формат мероприятия и аудиторию — от plant-forward бизнес-завтраков до action-stations гала на 500 человек. Если планируете корпоративное мероприятие и хотите, чтобы про еду говорили — поговорите с нами на этапе концепции, а не за две недели до даты.' },
      ],
    },
    en: {
      title: 'Top 8 Catering Trends in 2026',
      category: 'Catering',
      date: 'May 27, 2026',
      excerpt: 'From plant-forward menus and action stations to AI planning and edible packaging — what is changing in corporate event catering, and why a "regular buffet" no longer works.',
      content: `Catering at corporate events is no longer "a technical pause between sessions." In 2026, food is a full-fledged event product: what people discuss in the hallways, post to social media, and mention in feedback. Organizers who approach the menu as strategically as session content get a completely different level of attendee experience.

We break down the eight main trends shaping MICE catering right now.

1. Sustainable catering as a baseline requirement

Sustainability is no longer a "checkbox in the brief" but a mandatory condition when choosing a supplier. Corporate clients, especially those with ESG strategy, demand specifics: where does the meat come from, which products are local, what happens to food waste after the event, what packaging is used.

Standard practices in 2026: local ingredients within 200 km of the venue, seasonal over year-round, no single-use plastic in favor of biodegradable or edible packaging, composting organic waste, donating excess food to partner food banks.

2. Action stations: theatre on a plate

Action stations — interactive culinary points where a chef prepares dishes in real time in front of the guest. Pasta-station with pasta poured from a wheel of Parmesan. Ramen-station where broth is served from a copper kettle. Sushi-bar where rolls are made right in front of you.

Why this matters beyond the "wow factor": action stations naturally extend meal time and create conversation zones around them. Guests come for a portion — two or three others are nearby — a conversation starts. This works for networking better than any specialized icebreakers.

3. Plant-forward by default

Vegan options used to be a "checkbox in the form" picked up by 1–2 people out of 100. In 2026 the picture has flipped: plant-based dishes become the menu foundation, and meat is one of the options. This isn't ideology — it's a response to demand. Guests are tired of heavy meat buffets; chefs respect plant-based as a full gastronomic direction.

4. Hyper-personalization: a menu for each

Say you have 200 guests. 18 are gluten-intolerant, 24 lactose, 9 nut allergies, 12 kosher, 7 halal, 31 vegan. Earlier this was solved with one line "Vegan menu available on request." Now — with individual labels on each dish with allergen markers, mobile apps where guests pre-indicate preferences, and a kitchen preparing personalized plates.

5. Cultural authenticity

The "Egyptian theme" at an event in Sharm El Sheikh used to mean couscous and hummus prepared by a European chef to a "universal" recipe. In 2026 this is no longer interesting. Guests expect authenticity: recipes from local chefs, ingredients from local markets, traditional cooking techniques.

6. Functional food: food that works

A conference with a packed program is mental work at the limit. Heavy catering with abundant pastries and sugary sodas gives a quick energy spike and a sharp drop an hour later. Functional food solves this: products are selected for their effect on cognitive activity — matcha lattes, chia puddings, ginger-turmeric shots, adaptogens.

7. Instagram-worthy: presentation as a visual event

If food isn't Instagram-worthy, it was poorly presented. Sounds cynical, but the reality of 2026: every event is posted on social media by participants, and visual presentation directly affects your brand's reach.

8. Tech-enabled: AI in catering service

Technology changes not only presentation but also catering backend. Smart inventory systems track consumption in real time and alert the chef when snacks run out. AI menu planners analyze the client's event history and audience, suggesting an optimal balance of dishes. QR codes on each plate open full composition with allergens in 5 languages.

Royal Event Group works with proven catering partners in Egypt, UAE, and Russia. We design menus for the event format and audience — from plant-forward business breakfasts to 500-guest gala action stations. If you're planning a corporate event and want people to talk about the food, talk to us at the concept stage, not two weeks before the date.`,
    },
  },

  // ───────────────────────────────────────────────────────────────────────
  {
    id: 'podvodnye-kamni-konferencii-za-rubezhom',
    datePublished: '2026-05-25',
    image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=1000',
    ru: {
      title: 'Подводные камни в организации конференции за рубежом',
      category: 'Деловые мероприятия',
      date: '25 Мая, 2026',
      excerpt: 'Чек-лист из 9 рисков, на которых горят организаторы зарубежных конференций — от виз и валютных скачков до Рамадана и розеток на 110V. И как их обойти.',
      content: [
        { type: 'paragraph', text: 'Конференция за границей выглядит привлекательно с любой стороны: новые впечатления для участников, нестандартный фон для контента, повышенная мотивация делегатов. Но за фасадом «зарубежного мероприятия» прячется десяток ловушек, способных превратить премиальный проект в финансовую и репутационную катастрофу. Разбираем 9 самых болезненных подводных камней и даём практичный чек-лист, который снижает риски до минимума.' },
        { type: 'paragraph', text: 'Российские компании всё активнее проводят корпоративные мероприятия за рубежом — особенно в Египте, ОАЭ, Турции, странах Юго-Восточной Азии. Логика понятна: уникальная локация, лучшее соотношение цены и сервиса, возможность совместить деловую программу с релокацией для участников. Но если внутри страны организатор контролирует почти всё сам, то за границей он работает в чужой инфраструктуре, с чужими подрядчиками, по чужим правилам. Чтобы мероприятие прошло так же безупречно, как дома, нужно знать, где именно расположены риски.' },

        { type: 'stat', number: '1 из 5', label: 'международных мероприятий выходит за бюджет более чем на 20% — и в 80% случаев виноваты непредвиденные локальные расходы', source: 'обобщённая статистика DMC-индустрии, 2024–2025' },

        { type: 'heading', text: '1. Визы: главная мина замедленного действия', level: 2 },
        { type: 'paragraph', text: 'Самая частая катастрофа в зарубежных мероприятиях случается на этапе оформления виз. Не потому что визу «не дали» — а потому что не успели подать вовремя.' },
        { type: 'paragraph', text: 'Каждая страна имеет свои сроки и требования. Шенгенская виза в высокий сезон оформляется 15–30 рабочих дней, в проблемные годы — до 60. ОАЭ оформляют электронную визу за 3–7 дней, но требуют пакет документов, который нужно собрать с каждого делегата. Египет даёт визу по прилёту, но не для всех паспортов. Саудовская Аравия для делового туризма требует приглашение от местной компании, что добавляет ещё 10–14 дней.' },
        { type: 'image', url: 'https://images.unsplash.com/photo-1569974498991-d3c12a504f95?auto=format&fit=crop&q=80&w=1600', alt: 'Паспорта и визовые документы для международной делегации', caption: 'Для группы 50+ делегатов с разными паспортами вы получаете 4–5 параллельных визовых процессов' },
        { type: 'paragraph', text: 'Если делегатов 50+, и часть из них имеет российские паспорта, а часть — иностранные, у вас будет 4–5 разных визовых процессов параллельно. Один забытый паспорт на этапе сбора — и сотрудник не летит.' },
        {
          type: 'callout',
          variant: 'success',
          title: 'Что делать',
          text: 'Запускать визовое оформление за 60–90 дней до мероприятия (не за 30 — это уже зона риска). Назначить отдельного менеджера именно на визовую часть. Сделать резервный список делегатов на случай отказа (5–10% от общего числа — нормальная статистика). Работать с DMC-партнёром, имеющим прямой контакт с консульствами страны проведения.',
        },

        { type: 'heading', text: '2. Логистика и трансферы: где теряется час и репутация', level: 2 },
        { type: 'paragraph', text: 'Логистика на зарубежной площадке — это не «забронировать автобус». Это цепочка: аэропорт → таможня → багаж → трансфер → отель → registration → конференц-зал. На каждом стыке возможна задержка. И если один автобус с 40 делегатами застрял в пробке Каира, открытие конференции откладывается на час.' },
        { type: 'paragraph', text: 'Особенно болезненно это в крупных мегаполисах. Час пик в Дубае — это парализованный Sheikh Zayed Road. Час пик в Каире — это в принципе сюрприз каждый день. Час пик в Стамбуле — это любое время с 7 до 22. Если ты заложил на трансфер 40 минут «по карте» — в реальности это 90–120.' },
        { type: 'stat', number: '+50%', label: 'буфер времени, который нужно закладывать на трансферы в незнакомом городе. Без этого мероприятие начинается с опозданием в 80% случаев' },
        {
          type: 'callout',
          variant: 'success',
          title: 'Что делать',
          text: 'Применять «сценарий обратной разработки»: от времени начала мероприятия отсчитывать назад все этапы и закладывать буфер на каждом. Иметь резервный автобус на маршруте. Отправлять делегатам чёткие SMS-уведомления с временем выезда.',
        },

        { type: 'heading', text: '3. Языковой барьер: не там, где ожидаешь', level: 2 },
        { type: 'paragraph', text: 'Английский язык кажется универсальным, пока ты не приезжаешь в страну, где персонал отеля 4 звезды его не знает. В Египте, особенно в Хургаде и Шарм-эль-Шейхе, английский на низком уровне у части линейного персонала. В ОАЭ всё лучше, но локальные подрядчики (флористы, кейтеринговые повара, водители микроавтобусов) часто говорят только на арабском или урду. В Турции вне Стамбула и Анталии — турецкий или ничего.' },
        { type: 'paragraph', text: 'Это создаёт проблемы там, где их не ждёшь: технический рабочий не понимает, что надо переставить колонки, кейтеринг не понимает диетические ограничения, водитель не знает английского названия отеля и едет не туда.' },
        { type: 'quote', text: 'Главная ошибка — предположить, что „все говорят по-английски\". В арабском регионе ниже линейного менеджмента английский становится бесполезным. Письменные инструкции на арабском с фотографиями работают втрое лучше любой устной коммуникации.', author: 'Команда Royal Event Group' },
        {
          type: 'callout',
          variant: 'success',
          title: 'Что делать',
          text: 'Иметь арабоговорящего/туркоговорящего координатора на месте на всё время мероприятия. Переводить технические инструкции на местный язык письменно. Делать предмероприятийный walk-through с подрядчиками лично, с переводчиком. Использовать визуальные схемы (фото, чертежи) вместо текстовых описаний — они понятнее любых слов.',
        },

        { type: 'heading', text: '4. Скрытые расходы и валютные скачки', level: 2 },
        { type: 'paragraph', text: 'Бюджет мероприятия за рубежом всегда оказывается выше плановой сметы. Не из-за плохого планирования — из-за того, что местная экономика устроена иначе.' },
        { type: 'paragraph', text: 'Типовые скрытые статьи расходов, о которых редко предупреждают на этапе сметы:' },
        {
          type: 'list',
          items: [
            'Сервисный сбор в счетах отеля (10–15% сверху, нигде не упоминается заранее).',
            'Городской налог / туристический сбор (3–10 USD с номера в сутки).',
            'Чаевые персоналу — в арабских странах негласная обязанность. На крупном мероприятии с 200+ участниками это 1500–3000 USD за неделю.',
            'DMC-комиссия — местный партнёр берёт 10–20% за свою работу. Нормально, но должно быть в смете.',
            'Курсовая разница — если рубль/доллар сместился на 5% между этапами оплаты, бюджет сместился на ту же величину.',
          ],
        },
        { type: 'stat', number: '10–15%', label: 'резерв от общего бюджета, который нужно заложить на непредвиденные расходы. Это не «может быть» — это «точно будет»' },
        {
          type: 'callout',
          variant: 'warning',
          title: 'Тонкость, на которой горят',
          text: 'Если в счёте отеля мелким шрифтом упомянуто «excluded: service charge 12%» — это плюс 12% к КАЖДОЙ строке счёта, не к итоговой сумме. Для мероприятия на 100 000 USD это разница в 12 000 USD, о которой узнают только при выставлении финального инвойса.',
        },

        { type: 'heading', text: '5. Юридические подводные камни', level: 2 },
        { type: 'paragraph', text: 'В каждой стране своя юрисдикция, и российские шаблоны договоров там не работают. Это особенно критично для условий отмены, ответственности за инциденты, прав на фото- и видеосъёмку, импорта оборудования.' },
        { type: 'paragraph', text: 'В арабских странах стандартная неустойка при отмене за 30 дней — 50% бюджета. За 60 дней — 25%. Это нормально для них, но шок для российского заказчика. Если делегат отравится или получит травму, чья страховка покрывает? Чьё законодательство применяется? В ОАЭ и Саудовской Аравии съёмка людей без согласия — нарушение. Брендированные баннеры, мерч, призы пересекают таможню — может быть импортный налог 30–50% от стоимости.' },
        {
          type: 'callout',
          variant: 'success',
          title: 'Что делать',
          text: 'Работать только с DMC-партнёром, у которого есть местные юристы. Контракт обязательно в двух языках: оригинал на местном + английский для арбитража. Международная страховка с покрытием в стране проведения. Использовать карнет ATA для временного ввоза оборудования — это снимает таможенный налог.',
        },

        { type: 'heading', text: '6. Технический продакшн в чужой инфраструктуре', level: 2 },
        { type: 'paragraph', text: 'Свет, звук, экраны, синхронный перевод — это не «привезти своё», это «работать с местным». И местное оборудование может оказаться не таким, как обещали.' },
        { type: 'image', url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1600', alt: 'Сценическое освещение и техническое оборудование на крупном мероприятии', caption: 'Местный AV-подрядчик может оказаться сюрпризом — от частот микрофонов до качества LED-экранов' },
        { type: 'paragraph', text: 'Самые частые сюрпризы: розетки 110V вместо 220V (Латинская Америка, Япония) или другие типы вилок (Type G в ОАЭ, Type C/F в Египте). Wi-Fi отеля рассчитан на 100 пользователей — у вас 500, никто не проверил заранее. LED-экран есть, но в разрешении 4K показывает только серый шум. Радиомикрофоны работают на частотах, запрещённых в этой стране без лицензии.' },
        {
          type: 'callout',
          variant: 'success',
          title: 'Что делать',
          text: 'Технический райдер согласовать письменно с местным AV-подрядчиком за 30 дней (с фотографиями оборудования). Полный технический прогон со светом, звуком, экранами, переводом за 1–2 дня до мероприятия. Резервный комплект ключевого оборудования (микрофоны, ноутбуки спикеров, переходники питания). Выделенный Wi-Fi сегмент под мероприятие, отдельно от гостевого отеля.',
        },

        { type: 'heading', text: '7. Кейтеринг и диетические особенности', level: 2 },
        { type: 'paragraph', text: 'Еда — это то, что запомнят все, особенно если кому-то стало плохо. В международной аудитории всегда есть веганы, вегетарианцы, аллергики, люди с непереносимостями. А в мусульманских странах добавляются нюансы: алкоголь в публичных местах запрещён или жёстко регулируется (полный запрет в Саудовской Аравии, лицензированные локации в ОАЭ), свинина не подаётся ни в каком виде, кошерное и халяльное меню — это отдельная цепочка приготовления, а не «версия обычного».' },
        { type: 'image', url: '/afa-2.JPG', alt: 'Кейтеринг международной конференции AFA в Шарм-эль-Шейхе', caption: 'Кейс AFA: международная конференция на 250 человек в Grand Rotana и Savoy. Маркировка аллергенов и диетических опций — базовое требование' },
        { type: 'paragraph', text: 'Отдельно — Рамадан (примерно март–апрель в зависимости от года). Местный персонал постится днём, и кейтеринг должен быть тише и менее видимый для уважения к традициям. Многие рестораны днём закрыты, поставщики работают вяло.' },
        {
          type: 'callout',
          variant: 'success',
          title: 'Что делать',
          text: 'Собирать диетические анкеты с делегатов за 2–3 недели до мероприятия. Согласовать меню с шеф-поваром лично, с food tasting за день. Маркировать каждое блюдо: название + аллергены + диетические свойства (V, VG, GF, без лактозы, без свинины). Учитывать местные религиозные особенности при выборе даты.',
        },

        { type: 'heading', text: '8. Страховка и форс-мажоры', level: 2 },
        { type: 'paragraph', text: 'То, что нельзя контролировать — это то, что чаще всего ломается. Песчаная буря отменила вылеты. Внезапная политическая нестабильность ввела запрет на массовые мероприятия. Болезнь ключевого спикера за день до выступления. Землетрясение. Пандемия. Без страховки эти события полностью съедают бюджет. Со страховкой — частично или полностью компенсируются.' },
        { type: 'stat', number: '10 000+ USD', label: 'счёт за день госпитализации в местной клинике без медицинской страховки. Туристическая страховка таких сумм почти никогда не покрывает' },
        {
          type: 'callout',
          variant: 'warning',
          title: 'Главное',
          text: 'Оформить event cancellation insurance (покрывает невозможность проведения мероприятия), медицинскую страховку для всех делегатов с покрытием в стране проведения, страхование оборудования и грузов. Прописать в контракте force majeure clause: какие события снимают взаимные обязательства. Иметь резервный план Б — альтернативная дата, локация или hybrid-формат.',
        },

        { type: 'heading', text: '9. Тайминг, праздники и часовые пояса', level: 2 },
        { type: 'paragraph', text: 'Расписание зарубежного мероприятия должно учитывать местные особенности, а не только удобство организатора из Москвы.' },
        { type: 'paragraph', text: 'Самые частые ошибки: назначить мероприятие на пятницу в мусульманской стране (выходной, кадровый дефицит, многие сервисы закрыты до полудня), игнорировать Рамадан, не учесть местные праздники (День независимости ОАЭ 2 декабря, плавающие Eid al-Fitr и Eid al-Adha, Saudi National Day), не согласовать удобное время для онлайн-участников.' },
        { type: 'paragraph', text: 'Если ваш форум в Дубае идёт с 10:00 по местному, это 9:00 МСК — терпимо. А если в Сингапуре с 9:00 — это 4:00 МСК, и онлайн-часть провалится.' },
        {
          type: 'callout',
          variant: 'success',
          title: 'Что делать',
          text: 'Проверить локальный календарь праздников и рабочих дней заранее — у DMC-партнёра он всегда под рукой. Избегать пятниц для активных дней программы в Persian Gulf. Ключевые сессии онлайн-части назначать на пересечение часовых поясов основной аудитории. Не планировать перелёты делегатов в день начала мероприятия — минимум за сутки.',
        },

        { type: 'divider' },

        { type: 'heading', text: 'Чек-лист безопасной организации зарубежной конференции', level: 2 },
        {
          type: 'list',
          items: [
            'За 90 дней: запущено визовое оформление, подписан контракт с площадкой, оформлена страховка.',
            'За 60 дней: согласован технический райдер, выбран DMC-партнёр, проверен календарь местных праздников.',
            'За 30 дней: тест-визит на площадку, walk-through с подрядчиками, окончательный список делегатов.',
            'За 14 дней: собраны диетические анкеты, заказан резервный транспорт, проведён tasting кейтеринга.',
            'За 3 дня: полный технический прогон, проверка Wi-Fi нагрузки, дублирующие копии всех файлов.',
            'День X: на месте работает локальная команда с переводчиком и менеджером по логистике.',
          ],
        },

        { type: 'heading', text: 'Вывод', level: 2 },
        { type: 'paragraph', text: 'Подводные камни в зарубежной организации не страшны, если знать, где они лежат. Все 9 рисков, перечисленных выше, — управляемые: их можно предусмотреть, заложить в бюджет и план, нейтрализовать опытом локального партнёра.' },
        { type: 'paragraph', text: 'Royal Event Group работает в Египте и ОАЭ более 20 лет. У нас собственная команда на местах, отлаженные процессы визового сопровождения, прямые контракты с топ-отелями и проверенные DMC-связи. Большая часть подводных камней, описанных в этой статье, для нас давно превратилась в стандартные процедуры — и именно поэтому наши клиенты не сталкиваются с ними впервые. Если вы планируете конференцию или корпоративное мероприятие за рубежом — поговорите с нами на этапе идеи, а не когда уже подписан контракт с площадкой. Это сэкономит и бюджет, и нервы.' },
      ],
    },
    en: {
      title: 'Pitfalls in Organizing a Conference Abroad',
      category: 'Business Events',
      date: 'May 25, 2026',
      excerpt: 'A checklist of 9 risks that burn organizers of international conferences — from visas and currency swings to Ramadan and 110V outlets. And how to avoid them.',
      content: `A conference abroad looks attractive from any angle: new experiences for participants, an unusual backdrop for content, increased delegate motivation. But behind the facade of an "international event" lurk a dozen traps capable of turning a premium project into a financial and reputational disaster. Let's break down the 9 most painful pitfalls and provide a practical checklist that minimizes the risks.

Companies are increasingly holding corporate events abroad — especially in Egypt, UAE, Turkey, and Southeast Asian countries. The logic is clear: unique location, the best price-to-service ratio, the opportunity to combine business with relocation for participants. But while inside the country the organizer controls almost everything themselves, abroad they work in someone else's infrastructure, with someone else's contractors, by someone else's rules. To ensure the event runs as flawlessly as at home, you need to know exactly where the risks lie.

1. Visas: the main time bomb

The most common disaster in international events happens at the visa application stage. Not because visas "were denied" — but because they weren't submitted on time.

Each country has its own deadlines and requirements. A Schengen visa during high season is processed in 15–30 business days, in problem years — up to 60. The UAE issues an electronic visa in 3–7 days but requires a document package collected from each delegate. Egypt issues a visa on arrival, but not for all passports. Saudi Arabia for business tourism requires an invitation from a local company, adding another 10–14 days.

If you have 50+ delegates, and some have Russian passports while others have foreign ones, you'll have 4–5 different visa processes running in parallel. One forgotten passport at the collection stage — and an employee doesn't fly.

What to do:

— Start visa processing 60–90 days before the event. Not 30 — that's already the risk zone.
— Assign a dedicated manager specifically for the visa part. This is not a side task, it's a full project within the project.
— Maintain a backup list of delegates in case of visa refusal (5–10% of the total is normal denial or delay statistics).
— Work with a DMC partner in the destination country who has experience with group visa support and direct contact with consulates.

2. Logistics and transfers: where an hour and reputation are lost

Logistics at an international venue isn't just "book a bus." It's a chain: airport → customs → baggage → transfer → hotel → registration → conference hall. Delays are possible at every junction. And if one bus with 40 delegates gets stuck in Cairo traffic, the conference opening is delayed by an hour.

This is especially painful in major megacities. Rush hour in Dubai is a paralyzed Sheikh Zayed Road. Rush hour in Cairo is basically a surprise every day. Rush hour in Istanbul is any time from 7 AM to 10 PM. If you've allocated 40 minutes for transfer "by map" — in reality it's 90–120.

What to do:

— Build in a 50% minimum buffer for transfers in an unfamiliar city. If the navigator says 45 minutes, plan for 1 hour 15.
— Backup bus on the route. One breaks down — the second is already on the way.
— "Reverse engineering" scenario: from the event start time, count back all stages and add a buffer to each.
— Give delegates clear SMS notifications with departure times. Those who are late themselves — that's already a different problem.

3. Language barrier: not where you expect it

English seems universal until you arrive in a country where 4-star hotel staff doesn't know it. In Egypt, especially in Hurghada and Sharm El Sheikh, English is at a low level among some line staff. In the UAE everything is better, but local contractors (florists, catering chefs, minibus drivers) often speak only Arabic or Urdu.

This creates problems where you don't expect them:

— A technical worker doesn't understand that the speakers need to be repositioned.
— Catering doesn't understand dietary restrictions.
— A driver doesn't know the English name of the hotel and goes to the wrong place.

What to do:

— Have an Arabic-speaking coordinator on site throughout the event.
— Translate all technical instructions into the local language in advance, in writing.
— Conduct a pre-event walk-through with contractors in person, with a translator.
— Use visual diagrams instead of text descriptions (for arranging equipment, furniture, lighting — photos and drawings are clearer than any words).

4. Hidden costs and currency swings

Event budgets abroad always end up higher than planned. Not because of poor planning — because the local economy is structured differently.

Typical hidden line items:

— Service charge in hotel bills (10–15% on top, nowhere mentioned in advance).
— City tax / tourist fee (3–10 USD per room per night).
— Tips for staff — in Arab countries this is an unspoken obligation. At major events with 200+ participants this turns into 1500–3000 USD for the week.
— DMC commission — the local partner takes 10–20% for their work. This is normal but must be in the budget.
— Currency differences — payment is made in parts over several months. If the dollar exchange rate shifted by 5% between payment stages, the budget also shifted.

What to do:

— Get a complete cost estimate from the venue listing ALL additional fees before signing the contract.
— Lock the conversion rate in the contract.
— Pay prepayment in large tranches in one currency, not in fractions.
— Build in a 10–15% reserve from the budget for unforeseen expenses.

5. Legal pitfalls

Each country has its own jurisdiction, and Russian contract templates don't work there. This is especially critical for cancellation terms, incident liability, photo and video rights, and equipment import.

What to do:

— Work only with a DMC partner who has local lawyers.
— Contract must be in two languages: original in local + English for arbitration.
— Insurance must be international, with coverage in the destination country.
— Declare equipment at customs in advance. Use an ATA carnet for temporary import-export.

6. Technical production in unfamiliar infrastructure

Light, sound, screens, simultaneous translation — this isn't "bring your own," it's "work with local." And local equipment may turn out not to be as promised. Surprises: outlets at 110V instead of 220V, different plug types, hotel Wi-Fi can't handle 500 concurrent users, the LED screen actually has terrible resolution, wireless microphones work on frequencies banned without a license.

What to do:

— Agree on the technical rider in writing with the local AV contractor 30 days in advance.
— Full rehearsal with light, sound, screens, translation 1–2 days before.
— Have a backup kit of key equipment.
— Negotiate a dedicated Wi-Fi segment for the event.

7. Catering and dietary specifics

Food is what everyone will remember, especially if someone gets sick. An international audience always has vegans, vegetarians, people with allergies and intolerances. And in Muslim countries there are additional nuances: alcohol restrictions, no pork, kosher and halal menus require separate kitchens, Ramadan affects local staff.

What to do:

— Collect dietary questionnaires from delegates 2–3 weeks before.
— Coordinate menu with the chef personally, with food tasting.
— Label every dish at coffee breaks and buffets.
— Account for local religious specifics.

8. Insurance and force majeure

What can't be controlled is what most often breaks. Sandstorm cancels flights. Sudden political instability bans mass events. Key speaker illness the day before. Earthquake. Pandemic.

What to do:

— Get event cancellation insurance.
— Medical insurance for all delegates with coverage in the destination country.
— Equipment and cargo insurance against damage, theft, delay.
— Specify a force majeure clause in the contract.
— Have a backup Plan B: alternative date, alternative location, hybrid format.

9. Timing, holidays, and time zones

The schedule of an international event must account for local specifics. Most common mistakes: scheduling on a Friday in a Muslim country, ignoring Ramadan, missing local holidays, not coordinating convenient times for online participants.

What to do:

— Check the local calendar of holidays and working days in advance.
— Avoid Fridays for active program days in the Persian Gulf.
— If there's an online portion — schedule key sessions at the intersection of main audience time zones.
— Don't plan delegate flights for the day the event starts. Minimum 24 hours before.

Conclusion

Pitfalls in international organization aren't scary if you know where they lie. All 9 risks listed above are manageable: they can be anticipated, budgeted for, and neutralized by the experience of a local partner.

Royal Event Group has been working in Egypt and the UAE for over 20 years. We have our own team on the ground, established visa support processes, direct contracts with top hotels, and proven DMC connections. Most of the pitfalls described in this article have long become standard procedures for us — and that's exactly why our clients don't encounter them for the first time. If you're planning a conference or corporate event abroad, talk to us at the idea stage, not when the contract with the venue is already signed. It will save both budget and nerves.`,
    },
  },

  // ───────────────────────────────────────────────────────────────────────
  {
    id: 'trends-2026',
    datePublished: '2026-04-01',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1000',
    ru: {
      title: 'Тренды MICE-индустрии в 2026 году',
      category: 'Тренды',
      date: '1 Апреля, 2026',
      excerpt: 'Что меняется и куда движется рынок деловых мероприятий: AI, гибридные форматы, устойчивое развитие и experience-first подход.',
      content: [
        { type: 'paragraph', text: 'Глобальный рынок MICE преодолел отметку в триллион долларов и продолжает расти. Но количественный рост — лишь часть истории. Гораздо интереснее то, как меняется сама природа деловых мероприятий: от форматов и технологий до ожиданий участников. Разбираем ключевые тренды, которые определяют индустрию встреч, инсентивов, конференций и выставок в 2026 году.' },

        { type: 'stat', number: '$1+ трлн', label: 'глобальный рынок MICE преодолел отметку в триллион долларов и продолжает расти двузначными темпами', source: 'отраслевая аналитика 2024–2025' },

        { type: 'paragraph', text: 'Индустрия MICE (Meetings, Incentives, Conferences, Exhibitions) переживает период, который аналитики называют парадоксальным. С одной стороны, мир нестабилен: инфляция, геополитические конфликты, визовые ограничения и стремительное развитие AI создают давление на бюджеты и логистику. С другой — живые встречи ценятся как никогда.' },

        { type: 'stat', number: '75%', label: 'корпоративных клиентов по-прежнему предпочитают живое взаимодействие. Одна очная встреча даёт тот же эффект, что три виртуальных' },

        { type: 'heading', text: '1. «Меньше, но лучше»: flight to quality', level: 2 },
        { type: 'paragraph', text: 'Одна из самых заметных тенденций — сдвиг от количества мероприятий к их качеству. Компании проводят меньше событий, но вкладывают в каждое значительно больше. Вместо десяти региональных конференций — одно флагманское мероприятие с продуманной программой, сильными спикерами и измеримым результатом.' },
        { type: 'image', url: '/carlsberg-3.JPG', alt: 'Carlsberg — флагманская конференция, технический продакшн', caption: 'Кейс Carlsberg в Domina Coral Bay — пример flight to quality: один масштабный проект с полным техническим продакшном вместо десяти средних конференций' },
        { type: 'paragraph', text: 'Этот подход продиктован экономикой: стоимость размещения, AV-оборудования и кейтеринга продолжает расти, и более 70% организаторов сталкиваются с повышением цен на отели. В таких условиях распылять бюджет на множество средних мероприятий — невыгодно. Выгоднее сконцентрировать ресурсы на одном событии, которое действительно двигает бизнес вперёд.' },
        { type: 'paragraph', text: 'Параллельно растёт сегмент «бутик-MICE» — небольших, но высокобюджетных инсентив-программ в нестандартных локациях: от сельской Испании и Прибалтики до островов Юго-Восточной Азии.' },

        { type: 'heading', text: '2. Искусственный интеллект: от эксперимента к рабочему инструменту', level: 2 },
        { type: 'paragraph', text: 'AI в ивент-индустрии прошёл стадию хайпа и превратился в повседневный инструмент. В 2026 году организаторы используют искусственный интеллект на всех этапах — от планирования до анализа результатов.' },
        { type: 'paragraph', text: 'На этапе подготовки AI помогает формировать персонализированные программы: платформы анализируют поведение, интересы и историю участия, чтобы рекомендовать каждому делегату релевантные сессии, спикеров и потенциальных партнёров для нетворкинга. Больше не нужно листать программу из 50 докладов — система сама выстраивает индивидуальный маршрут.' },
        { type: 'paragraph', text: 'Во время мероприятия AI управляет вовлечённостью: напоминания о начале выбранных сессий, уведомления о совпадении интересов с другими участниками, автоматическая модерация вопросов. После мероприятия — аналитика: метрики вовлечённости, время участия в каждой сессии, качество нетворкинга, прогнозирование ROI.' },
        {
          type: 'callout',
          variant: 'info',
          title: 'Практический вывод',
          text: 'AI-генерация контента — отдельное направление: автоматические саммари докладов, транскрибация сессий в реальном времени, мгновенный перевод на десятки языков. Это не просто экономит время — это принципиально меняет масштаб доступности мероприятий.',
        },

        { type: 'heading', text: '3. Гибридные мероприятия: новый стандарт', level: 2 },
        { type: 'paragraph', text: 'Гибридный формат — сочетание очного участия с онлайн-трансляцией — окончательно перестал быть «временной мерой пандемии» и стал нормой. Но в 2026 году подход к нему изменился.' },
        { type: 'paragraph', text: 'Если раньше гибрид означал просто камеру, направленную на сцену, то теперь это полноценный параллельный опыт: виртуальные участники получают свои сетевые залы для общения, интерактивные сессии, доступ к экспо-зонам в формате 360°. Лучшие платформы обеспечивают равное вовлечение обоих форматов — и организаторы уже измеряют это не только количеством подключений, а качеством взаимодействия.' },

        { type: 'heading', text: '4. Experience-first: мероприятия как переживание', level: 2 },
        { type: 'paragraph', text: 'Пожалуй, самый фундаментальный сдвиг 2026 года — переход от информационной модели мероприятий к experience-first. Участники больше не хотят просто слушать доклады. Они хотят переживать, чувствовать, запоминать.' },
        { type: 'image', url: '/ewa-10.jpg', alt: 'Experiential мероприятие EWA Product — workshops и интерактив', caption: 'Кейс EWA Product: workshops и интерактивные форматы вместо стандартных докладов — пример experience-first подхода в действии' },
        { type: 'stat', number: '68%', label: 'организаторов MICE планируют инвестировать в AR/VR-инструменты в 2026 году для усиления вовлечённости участников' },
        { type: 'paragraph', text: 'Форматы меняются: вместо классических панельных дискуссий — иммерсивные воркшопы, круглые столы в формате «обед с экспертом», мастер-классы в необычных локациях. Технологии дополняют: AR-туры по площадке, VR-нетворкинг-лаунджи, проекционные инсталляции.' },
        { type: 'paragraph', text: 'Культурное погружение становится обязательным элементом: кулинарные мастер-классы с местными шефами, экскурсии к историческим памятникам, интеграция локальных традиций в программу.' },

        { type: 'heading', text: '5. Устойчивое развитие: от галочки к базовому требованию', level: 2 },
        { type: 'paragraph', text: 'Sustainability в MICE-индустрии совершила переход, который многие предсказывали, но не все ожидали так быстро. В 2026 году экологическая ответственность — это уже не конкурентное преимущество, а базовое ожидание клиентов.' },
        { type: 'paragraph', text: 'Подавляющее большинство корпоративных заказчиков предпочитают работать с площадками и поставщиками, которые могут подтвердить свои ESG-практики. Это означает конкретные вещи: цифровые бейджи вместо пластиковых, углеродно-нейтральный транспорт, локальные продукты в кейтеринге, отказ от одноразового пластика, компенсация углеродного следа мероприятия.' },
        {
          type: 'callout',
          variant: 'success',
          title: 'Что это значит для организатора',
          text: 'Sustainable-практики обычно повышают бюджет на 10–15%, но эта разница окупается двумя способами: позитивный PR в отчёте мероприятия для клиента и право использовать sustainability как маркетинговый аргумент. Многие площадки сами субсидируют переход на eco-практики.',
        },

        { type: 'heading', text: '6. Смена поколений: пять поколений за одним столом', level: 2 },
        { type: 'paragraph', text: 'Современная деловая аудитория — это одновременно бэби-бумеры, поколение X, миллениалы, зумеры и даже первые представители поколения «Альфа» в роли стажёров. Такого поколенческого разнообразия в истории MICE ещё не было, и это серьёзно влияет на дизайн мероприятий.' },
        { type: 'paragraph', text: 'Молодые участники ожидают гибридных форматов, мобильного приложения вместо бумажной программы, возможности взаимодействия через чаты и соцсети прямо во время сессий. Старшее поколение ценит живое общение, структурированную программу и традиционные форматы нетворкинга.' },
        { type: 'paragraph', text: 'Задача организатора — создать пространство, в котором комфортно всем. На практике это означает: мультиформатные сессии (лекция + дискуссия + воркшоп), параллельные треки для разных уровней погружения, цифровые инструменты как дополнение, а не замена живого контакта.' },

        { type: 'heading', text: '7. Bleisure: деловые поездки с продлённым пребыванием', level: 2 },
        { type: 'paragraph', text: 'Bleisure (business + leisure) — не новый тренд, но в 2026 году он достиг масштаба, который невозможно игнорировать. Участники MICE-мероприятий всё чаще продлевают поездку на несколько дней, чтобы совместить деловую программу с отдыхом: экскурсии, спа, гастрономические туры, активности на природе.' },
        { type: 'image', url: '/nl-15.jpg', alt: 'NL International — bleisure программа в Park Regency', caption: 'Кейс NL International — пример bleisure: деловая программа естественно перетекает в культурную и развлекательную часть' },
        { type: 'paragraph', text: 'Для организаторов это двойная возможность. Bleisure повышает привлекательность мероприятия — участники охотнее соглашаются на командировку, если могут «прихватить» пару дней отпуска. Это также аргумент при выборе дестинации: площадки, которые предлагают богатую пост-конференционную программу, выигрывают у безликих конгресс-центров.' },

        { type: 'heading', text: '8. Новая география: диверсификация дестинаций', level: 2 },
        { type: 'paragraph', text: 'Карта MICE-индустрии расширяется. Если традиционно доминировали Европа (около 50% глобального рынка) и Северная Америка, то в 2026 году Азиатско-Тихоокеанский регион вышел на первое место по доле выручки — более 44%.' },
        { type: 'stat', number: '44%', label: 'доля Азиатско-Тихоокеанского региона в глобальной выручке MICE-индустрии. Впервые в истории — больше Европы' },
        { type: 'paragraph', text: 'Китай, Индия, Сингапур, Индонезия и Малайзия привлекают всё больше международных мероприятий благодаря современной инфраструктуре, конкурентным ценам и растущему корпоративному сектору. Ближний Восток и Северная Африка укрепляют позиции благодаря инвестициям в инфраструктуру: новые конгресс-центры, люксовые отели, программы визовой поддержки для деловых делегаций.' },

        { type: 'heading', text: '9. Данные и ROI: мероприятия как измеримый бизнес-инструмент', level: 2 },
        { type: 'paragraph', text: 'MICE-мероприятия всё меньше воспринимаются как «расходная статья» и всё больше — как стратегический инструмент с измеримой отдачей. В 2026 году организаторы оперируют метриками, которые ещё пять лет назад казались экзотикой: время пребывания в зоне нетворкинга, индекс вовлечённости участника, конверсия из контакта в сделку, Net Promoter Score мероприятия.' },
        { type: 'paragraph', text: 'Аналитические платформы собирают данные в реальном времени и позволяют корректировать программу прямо в процессе: если вовлечённость на секции падает — следующий перерыв начнётся раньше; если нетворкинг-зона пустует — система отправит участникам персонализированные приглашения.' },

        { type: 'quote', text: 'Главный сдвиг 2026 года — мероприятия перестали быть «корпоративной обязанностью» и стали стратегическим инструментом с измеримым ROI. Те организаторы, кто умеет объединить технологии, эмоциональный опыт и устойчивость, выигрывают рынок.', author: 'Команда Royal Event Group' },

        { type: 'divider' },

        {
          type: 'comparison',
          title: 'MICE 2020 vs MICE 2026',
          left: {
            title: 'MICE 2020 — как было',
            items: [
              '10 региональных конференций в год',
              'Камера на сцене = «гибридный формат»',
              'Бумажная программа в зале',
              'Стандартное меню для всех',
              'ROI = «приехали довольные»',
              'Sustainability — добавочный люкс',
              'Mass events на 1000+ человек',
              'AI воспринимался как игрушка',
            ],
          },
          right: {
            title: 'MICE 2026 — как стало',
            items: [
              '1 флагман + бутик-форматы (flight to quality)',
              'Параллельный виртуальный опыт с 360°-сценами',
              'Мобильное приложение с AI-рекомендациями маршрута',
              'Hyper-personalization по диете и интересам',
              'ROI = NPS, engagement metrics, conversion to deal',
              'Sustainability — базовое требование',
              'Камерные форматы 30–80 человек ценятся выше',
              'AI — повседневный инструмент во всех этапах',
            ],
          },
        },

        { type: 'heading', text: 'Что делать организаторам прямо сейчас', level: 2 },
        {
          type: 'list',
          items: [
            'Инвестируйте в AI-инструменты — не как в модную игрушку, а как в инфраструктуру, которая экономит время и повышает качество.',
            'Делайте устойчивость частью стратегии, а не маркетинговой обёртки. ESG — это не отчёт, это процесс на всех этапах.',
            'Проектируйте мероприятия как опыт, а не как расписание. Каждый элемент должен запоминаться.',
            'Измеряйте всё, что можно измерить — и принимайте решения на основе данных, а не интуиции.',
            'Учитывайте поколенческое разнообразие — мультиформатные сессии для разных аудиторий.',
            'Закладывайте bleisure в программу — даже короткая культурная активность повышает оценку мероприятия.',
          ],
        },

        { type: 'heading', text: 'Вывод', level: 2 },
        { type: 'paragraph', text: 'Тренды 2026 года складываются в единую картину: MICE-индустрия взрослеет. Мероприятия перестают быть «просто встречами» и становятся стратегическими инструментами с измеримым влиянием на бизнес. Организаторы, которые смогут объединить технологии, персонализацию, устойчивость и эмоциональный опыт в единое целое, окажутся в выигрышной позиции.' },
        { type: 'paragraph', text: 'И помните: в мире, где всё можно обсудить по Zoom, очная встреча — это заявление о ценности. Royal Event Group помогает организовать мероприятие, которое стоит потраченного времени каждого участника. Если вы планируете флагманскую конференцию, инсентив-программу или executive-ретрит — поговорите с нами на этапе концепции.' },
      ],
    },
    en: {
      title: 'MICE Industry Trends in 2026',
      category: 'Trends',
      date: 'April 1, 2026',
      excerpt: "What's changing and where the business events market is headed: AI, hybrid formats, sustainability, and the experience-first approach.",
      content: `MICE Industry Trends in 2026: What's Changing and Where the Business Events Market Is Headed

The global MICE market has surpassed the trillion-dollar mark and continues to grow. But quantitative growth is only part of the story. What's far more interesting is how the very nature of business events is changing: from formats and technologies to attendee expectations. Let's explore the key trends shaping the meetings, incentives, conferences, and exhibitions industry in 2026.

The MICE industry (Meetings, Incentives, Conferences, Exhibitions) is experiencing what analysts call a paradoxical period. On one hand, the world is unstable: inflation, geopolitical conflicts, visa restrictions, and the rapid development of AI create pressure on budgets and logistics. On the other hand, live meetings are valued more than ever. According to industry research, one in-person meeting delivers the same impact as three virtual ones. Over 75% of corporate clients still prefer live interaction. This paradox — external uncertainty and growing value of personal contact — sets the tone for everything happening in MICE in 2026.

1. "Less but better": flight to quality

One of the most noticeable trends is a shift from event quantity to quality. Companies are holding fewer events but investing significantly more in each one. Instead of ten regional conferences — one flagship event with a well-designed program, strong speakers, and measurable results.

This approach is driven by economics: the cost of accommodation, AV equipment, and catering continues to rise, with over 70% of organizers facing hotel price increases. Under these conditions, spreading the budget across many average events is inefficient. It's more profitable to concentrate resources on one event that truly moves the business forward.

At the same time, the "boutique MICE" segment is growing — small but high-budget incentive programs in unconventional locations: from rural Spain and the Baltics to Southeast Asian islands. An intimate format, exclusive venues, and a personalized program — that's what attracts organizers looking for a memorable experience rather than mass attendance.

2. Artificial intelligence: from experiment to everyday tool

AI in the event industry has passed the hype stage and become an everyday tool. In 2026, organizers use artificial intelligence at every stage — from planning to results analysis.

During preparation, AI helps create personalized programs: platforms analyze behavior, interests, and attendance history to recommend relevant sessions, speakers, and potential networking partners. No more scrolling through a 50-talk program — the system builds an individual route.

During the event, AI manages engagement: reminders about selected sessions, notifications about shared interests with other attendees, automatic question moderation. After the event — analytics: engagement metrics, session attendance time, networking quality, ROI forecasting.

A separate area is AI content generation: automatic talk summaries, real-time session transcription, instant translation into dozens of languages. All of this doesn't just save time — it fundamentally changes the scale of event accessibility.

3. Hybrid events: the new standard, not a compromise

The hybrid format — combining in-person attendance with online streaming — has definitively stopped being a "temporary pandemic measure" and become the norm. But in 2026, the approach has changed.

If hybrid used to mean just a camera pointed at the stage, now it's a full parallel experience: virtual attendees get their own networking rooms, interactive sessions, and access to expo zones in 360° format. The best platforms ensure equal engagement across both formats — and organizers now measure this not only by connection count but by interaction quality.

A practical tip from the industry: split the team between formats. Executives attend in person — for networking and negotiations. Specialists connect online — for content and learning. This maximizes event ROI while controlling costs.

4. Experience-first: events as experiences, not schedules

Perhaps the most fundamental shift of 2026 is the transition from the informational model to experience-first. Attendees no longer want to just listen to talks. They want to experience, feel, remember.

This manifests on several levels. Formats are changing: instead of classic panel discussions — immersive workshops, roundtables in "lunch with an expert" format, masterclasses in unusual locations. Technologies enhance the experience: AR tours of the venue, VR networking lounges, projection installations. According to industry data, about 68% of MICE organizers plan to invest in AR/VR tools.

Cultural immersion is becoming a mandatory element: cooking masterclasses with local chefs, excursions to historical monuments, integration of local traditions into the program. Organizers who can combine global scale with local authenticity gain a competitive advantage.

5. Sustainability: from checkbox to baseline requirement

Sustainability in the MICE industry has made a transition that many predicted but not everyone expected so quickly. In 2026, environmental responsibility is no longer a competitive advantage but a baseline client expectation.

The vast majority of corporate clients prefer to work with venues and suppliers that can verify their ESG practices. This means concrete things: digital badges instead of plastic, carbon-neutral transportation, local products in catering, no single-use plastic, carbon offset for the event.

6. Generational shift: five generations at one table

Today's business audience simultaneously includes baby boomers, Generation X, millennials, zoomers, and even the first representatives of Generation Alpha as interns. This level of generational diversity has never existed in MICE history, and it significantly affects event design.

Younger attendees expect hybrid formats, a mobile app instead of a paper program, and the ability to interact through chats and social media during sessions. The older generation values live communication, structured programs, and traditional networking formats.

The organizer's task is to create a space where everyone feels comfortable. In practice, this means: multi-format sessions (lecture + discussion + workshop), parallel tracks for different engagement levels, digital tools as supplements rather than replacements for live contact.

7. Bleisure: business trips with extended stays

Bleisure (business + leisure) is not a new trend, but in 2026 it has reached a scale impossible to ignore. MICE event attendees increasingly extend their trips by a few days to combine the business program with leisure: excursions, spa, gastronomic tours, outdoor activities.

For organizers, this is a dual opportunity. First, bleisure increases event attractiveness — attendees more readily agree to business trips if they can "tack on" a couple of vacation days. Second, it's an argument when choosing a destination: venues offering a rich post-conference program win over generic convention centers.

8. New geography: destination diversification

The MICE industry map is expanding. While Europe (about 50% of the global market) and North America traditionally dominated, in 2026 the Asia-Pacific region has taken the lead in revenue share — over 44%. China, India, Singapore, Indonesia, and Malaysia attract more international events thanks to modern infrastructure, competitive prices, and a growing corporate sector.

The Middle East and North Africa are strengthening their positions through infrastructure investments: new convention centers, luxury hotels, visa support programs for business delegations.

9. Data and ROI: events as measurable business tools

MICE events are increasingly perceived not as an "expense item" but as a strategic tool with measurable returns. In 2026, organizers work with metrics that seemed exotic just five years ago: networking zone dwell time, attendee engagement index, contact-to-deal conversion, event Net Promoter Score.

Analytical platforms collect data in real time and allow program adjustments on the fly: if session engagement drops — the next break starts earlier; if the networking zone is empty — the system sends personalized invitations.

What does this all mean for organizers?

The 2026 trends paint a unified picture: the MICE industry is maturing. Events are no longer "just meetings" but strategic tools with measurable business impact. Organizers who can combine technology, personalization, sustainability, and emotional experience into a cohesive whole will be in a winning position.

Several practical takeaways:

— Invest in AI tools — not as a trendy toy, but as infrastructure that saves time and improves quality.
— Make sustainability part of your strategy, not a marketing wrapper.
— Design events as experiences, not schedules.
— Measure everything you can measure — and make decisions based on data, not intuition.
— And remember: in a world where everything can be discussed over Zoom, an in-person meeting is a statement of value. Make sure that statement is worth the time spent.`,
    },
  },

  // ───────────────────────────────────────────────────────────────────────
  {
    id: 'coffee-break-organization',
    datePublished: '2026-03-31',
    image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=1600',
    ru: {
      title: 'Организация кофе-брейков: healthy-перекусы, ПП-меню и эффективный тайминг',
      category: 'Деловые мероприятия',
      date: '31 Марта, 2026',
      excerpt: 'Современный кофе-брейк — это не просто фуршет, а инструмент нетворкинга и управления вниманием аудитории.',
      content: [
        { type: 'paragraph', text: 'Современный кофе-брейк — это не просто фуршет, а инструмент нетворкинга и управления вниманием аудитории. Healthy-перекусы, продуманный тайминг и грамотная организация потока напрямую влияют на общее впечатление от мероприятия. Полезные перекусы, кофе-станция и смузи-бар работают не только на энергию гостей, но и на качество нетворкинга во время пауз.' },

        { type: 'stat', number: '#3', label: 'качество кейтеринга стабильно входит в тройку факторов, влияющих на общую оценку мероприятия в анкетах обратной связи' },

        { type: 'heading', text: '1. Кофе-брейк как часть сценария мероприятия', level: 2 },
        { type: 'paragraph', text: 'Распространённая ошибка организаторов — относиться к кофе-брейку как к технической паузе, которую нужно просто «закрыть» подносами с печеньем. На практике перерыв — это полноценный элемент сценария, который решает сразу несколько задач: переключение внимания, нетворкинг и формирование общего впечатления от события.' },
        { type: 'paragraph', text: 'После 60–90 минут насыщенного контента способность аудитории воспринимать информацию резко падает. Кофе-брейк возвращает концентрацию, но только в том случае, если он сам по себе не превращается в хаос — с очередями к единственному кофейному аппарату и толкучкой у стола с бутербродами.' },
        { type: 'paragraph', text: 'Именно на кофе-брейках завязываются знакомства, обсуждаются только что услышанные идеи, обмениваются контактами. Организатор может усилить этот эффект, продумав зонирование: отдельные столики для стоячего общения, зоны с мягкой мебелью для более долгих разговоров, тематические уголки с табличками-айсбрейкерами.' },

        { type: 'heading', text: '2. Тайминг пауз и организация потока', level: 2 },
        { type: 'paragraph', text: 'Золотое правило — перерыв каждые 60–90 минут. Для утренних сессий допустимо 90 минут (аудитория свежая), после обеда лучше сократить интервал до 60 минут, когда внимание рассеивается быстрее.' },
        { type: 'stat', number: '20–30 мин', label: 'оптимальная длительность одного кофе-брейка. Меньше — гости не успеют пообщаться; больше — энергия рассеивается, и собрать аудиторию обратно сложно' },
        { type: 'paragraph', text: 'Ключевой момент — организация потока. Одна точка раздачи на 100+ человек — гарантированная очередь. Решение: несколько станций, распределённых по периметру зоны, каждая с полным набором напитков и еды. Если пространство позволяет, имеет смысл развести «быструю линию» (кофе + снэк навынос) и «зону общения» (столики, десерты, более расслабленная атмосфера).' },
        {
          type: 'callout',
          variant: 'info',
          title: 'Приём опытных организаторов',
          text: 'Асимметричный тайминг — вместо единого перерыва для всех на параллельных секциях сдвигают кофе-брейки на 10–15 минут относительно друг друга. Это снижает нагрузку на зону кейтеринга и избавляет от ощущения давки.',
        },

        { type: 'heading', text: '3. ПП-меню и полезные перекусы', level: 2 },
        { type: 'paragraph', text: 'Эпоха корзинок с круассанами и тарелок с нарезкой колбасы в качестве единственного варианта уходит в прошлое. Участники — особенно на международных мероприятиях — всё чаще ожидают healthy-перекусы, которые поддерживают энергию, а не вызывают послеобеденную сонливость.' },
        { type: 'image', url: '/afa-3.JPG', alt: 'Современный кофе-брейк на конференции AFA — healthy-перекусы и эстетичная подача', caption: 'Наш кофе-брейк на конференции AFA в Grand Rotana: эстетичная подача, маркировка аллергенов, функциональные продукты' },
        { type: 'paragraph', text: 'Формула, которая работает: белок + сложные углеводы + полезные жиры. Конкретные варианты — хумус с овощными палочками и цельнозерновыми крекерами, ореховые миксы с сухофруктами без добавленного сахара, мини-боулы с киноа и авокадо, роллы в рисовой бумаге с овощами и тофу.' },
        { type: 'paragraph', text: 'Фрукты и ягоды — казалось бы, очевидно, но подача имеет значение. Целые яблоки на подносе — плохая идея (никто не хочет хрустеть в кулуарах). Нарезанные фрукты на шпажках, ягодные стаканчики, фруктовые чипсы — гораздо удобнее и привлекательнее.' },

        { type: 'heading', text: '4. Суперфуды, смузи-бар и энергия участников', level: 2 },
        { type: 'paragraph', text: 'Смузи-бар — один из самых заметных трендов последних лет на конференциях. Визуально яркий, Instagram-friendly и при этом функциональный: свежие смузи на основе шпината, банана и ягод дают заряд витаминов, который заметно отличается от очередной чашки кофе.' },
        { type: 'paragraph', text: 'Продвинутые организаторы идут дальше и включают в меню суперфуды: чиа-пудинги, асаи-боулы, матча-латте, шоты из имбиря и куркумы. Это не просто модная тенденция — эти продукты реально работают на поддержание когнитивной активности. Куркумин из куркумы обладает противовоспалительным действием, матча обеспечивает мягкий и продолжительный прилив энергии без резкого спада (в отличие от эспрессо), а семена чиа — источник омега-3 и клетчатки.' },
        { type: 'stat', number: '15–20%', label: 'участников любой современной конференции выбирают растительные альтернативы (овсяное, миндальное, кокосовое молоко). Это уже не «нишевый запрос», а норма' },

        { type: 'heading', text: '5. Кофе-станция и подача', level: 2 },
        { type: 'paragraph', text: 'Кофе остаётся напитком номер один на любой конференции. Но между растворимым кофе из термоса и профессиональной кофе-станцией — пропасть, которую участники чувствуют мгновенно.' },
        { type: 'paragraph', text: 'Минимальный стандарт для серьёзного мероприятия — кофемашина с бариста, который готовит эспрессо, капучино, латте и американо. Идеальный вариант — мобильная кофейня с возможностью приготовления альтернативы (пуровер, фильтр) и выбором растительного молока. Не забывайте про тех, кто не пьёт кофе: качественный листовой чай, травяные настои, вода с добавками (огурец и мята, лимон и розмарин) должны быть доступны наравне.' },
        { type: 'paragraph', text: 'Подача тоже имеет значение. Экологичная посуда (бумажные стаканчики с крафтовой эстетикой, деревянные приборы, стеклянные бутылки вместо пластика) не только соответствует тренду на устойчивое развитие, но и выглядит стильно. А красивая подача — это фото в соцсетях, бесплатный PR для вашего мероприятия.' },

        { type: 'heading', text: '6. Инклюзивность: безглютеновое, веганское, халяль', level: 2 },
        { type: 'paragraph', text: 'Инклюзивность в питании — уже не бонус, а базовое требование. На любом мероприятии с числом участников от 50 человек гарантированно будут люди с аллергиями, непереносимостями и особыми предпочтениями. Игнорировать это — значит создать неприятный опыт для значимой части аудитории.' },
        { type: 'paragraph', text: 'Что должно быть по умолчанию: веганские и вегетарианские опции, безглютеновые снэки, безлактозные альтернативы молока. Всё — с понятной маркировкой. Карточки с составом и иконками аллергенов у каждого блюда — не перфекционизм, а проявление уважения к участникам и забота об их безопасности.' },

        { type: 'heading', text: '7. Пауза для рекламодателей: спонсорские возможности', level: 2 },
        { type: 'paragraph', text: 'Для организаторов, работающих с партнёрами и спонсорами, кофе-брейк — это ещё и рекламная площадка с высоким уровнем вовлечения. Участники расслаблены, открыты к общению и гораздо более восприимчивы к брендовым сообщениям, чем во время формальной программы.' },
        { type: 'paragraph', text: 'Варианты интеграции спонсоров: брендированные стаканчики и салфетки, именная кофе-станция («Кофе-брейк от компании X»), промо-стойки рядом с зоной кейтеринга, брендированные энергетические батончики или бутылки воды. Продвинутые форматы — тематический корнер: мини-мастер-класс по приготовлению смузи от бренда здорового питания, дегустационный сет от производителя чая.' },

        { type: 'divider' },

        { type: 'heading', text: 'Форматы кофе-брейков 2026 года', level: 2 },
        {
          type: 'table',
          headers: ['Формат', 'Стоимость/гость', 'Описание', 'Когда выбирать'],
          rows: [
            ['Базовый', '$5–8', 'Кофе, чай, печенье, минимум опций', 'Короткие сессии до 2 часов'],
            ['Wellness', '$12–18', 'Smoothie-бар, суперфуды, растительное молоко', 'Tech / Pharma / Finance конференции'],
            ['Тематический', '$15–25', 'Меню в стиле страны или индустрии', 'Культурный контекст мероприятия'],
            ['Спонсорский', '$5–10', 'Брендирование стаканчиков и снэков спонсором', 'Дополнительный доход и PR-формат'],
            ['Late-night sweet bar', '$15–30', 'Премиум-десерты в конце вечера', 'Финал гала-программы'],
          ],
          caption: 'Ориентировочные цены для премиум-уровня в Египте/ОАЭ. В Москве и европейских столицах — умножайте на 1,5–2',
        },

        { type: 'divider' },

        {
          type: 'comparison',
          title: 'Старый кофе-брейк vs Современный',
          left: {
            title: 'Старый формат',
            items: [
              'Растворимый кофе из термоса',
              'Чайные пакетики',
              'Магазинное печенье в упаковке',
              'Без диетических опций',
              'Одна точка раздачи → очередь',
              'Без подачи и эстетики',
              'Пластиковые стаканчики',
              'Свинина в составе бутербродов без маркировки',
            ],
          },
          right: {
            title: 'Современный формат',
            items: [
              'Бариста с эспрессо-машиной + альтернативное молоко',
              'Листовой чай, smoothie, матча-латте',
              'Healthy-перекусы с маркировкой аллергенов',
              'Веган / GF / халяль / кошер опции',
              'Несколько станций по периметру + быстрая линия',
              'Эстетичная Instagram-friendly подача',
              'Эко-посуда (крафт, дерево, стекло)',
              'Карточки с составом у каждого блюда',
            ],
          },
        },

        { type: 'heading', text: 'Чек-лист: идеальный кофе-брейк', level: 2 },
        {
          type: 'list',
          items: [
            'Перерыв каждые 60–90 минут, продолжительность 20–30 минут.',
            'Несколько точек раздачи (минимум одна на 80–100 человек).',
            'Кофе-станция с бариста и выбором растительного молока.',
            'Чай листовой, вода с добавками, свежевыжатые соки или смузи.',
            'ПП-меню: белок + сложные углеводы + полезные жиры.',
            'Маркировка аллергенов и диетических опций у каждого блюда.',
            'Веганские, безглютеновые и безлактозные варианты.',
            'Удобный формат порций (есть стоя, одной рукой).',
            'Зонирование: быстрая линия + зона для общения.',
            'Экологичная посуда и подача (без пластика).',
          ],
        },

        { type: 'heading', text: 'Вывод', level: 2 },
        { type: 'paragraph', text: 'Грамотно организованный кофе-брейк — это инвестиция, которая возвращается в виде довольных участников, удачного нетворкинга и мероприятия, о котором говорят не только «было полезно», но и «было вкусно». Royal Event Group проектирует кейтеринг под формат мероприятия и аудиторию — от wellness-брейков на executive-ретритах до спонсорских корнеров на конференциях 1000+ человек.' },
      ],
    },
    en: {
      title: 'Coffee Break Organization: Healthy Snacks, Wellness Menus, and Effective Timing',
      category: 'Business Events',
      date: 'March 31, 2026',
      excerpt: "A modern coffee break isn't just a buffet — it's a networking tool and a way to manage audience attention.",
      content: `A modern coffee break isn't just a buffet — it's a networking tool and a way to manage audience attention. Healthy snacks, well-planned timing, and smart flow management directly impact the overall impression of an event. Nutritious snacks, a coffee station, and a smoothie bar work not only for guest energy but also for networking quality during breaks.

1. Coffee break as part of the event script

A common mistake organizers make is treating the coffee break as a technical pause that just needs to be "covered" with trays of cookies. In practice, a break is a full-fledged element of the script that serves multiple purposes.

First, it's an attention reset. After 60-90 minutes of intensive content, the audience's ability to absorb information drops sharply. A coffee break restores concentration, but only if it doesn't turn into chaos — with lines at a single coffee machine and crowding around a sandwich table.

Second, it's networking. It's during coffee breaks that connections are made, ideas just heard are discussed, and contacts are exchanged. Organizers can amplify this effect by planning the zoning: separate standing tables for quick conversations, areas with soft furniture for longer discussions, themed corners with icebreaker signs.

Third, the coffee break shapes the overall event impression. Attendees may forget the third of five talks, but they'll definitely remember whether the coffee was good and if there was enough food. A small thing? Not quite. In feedback surveys, catering quality consistently ranks among the top three factors affecting overall event ratings.

2. Break timing and flow management

The golden rule: a break every 60-90 minutes. For morning sessions, 90 minutes is acceptable (the audience is fresh); after lunch, it's better to shorten the interval to 60 minutes when attention fades faster.

Optimal coffee break duration: 20-30 minutes. Less — attendees won't have time to eat or chat. More — energy dissipates, and getting the audience back becomes harder. For events with 200+ attendees, plan for 30 minutes: physically, more people can't get through the catering zone in 15-20 minutes.

The key point: flow management. One serving point for 100+ people guarantees a queue. Solution: multiple stations distributed around the perimeter, each with a full range of drinks and food. If space allows, it makes sense to create a "fast lane" (coffee + grab-and-go snack for those who need to get back quickly) and a "socializing zone" (tables, desserts, a more relaxed atmosphere).

Another technique experienced organizers use: asymmetric timing. Instead of announcing a single break for everyone, parallel sessions can stagger coffee breaks by 10-15 minutes. This reduces pressure on the catering zone and eliminates the feeling of overcrowding.

3. Wellness menus and healthy snacks

The era of croissant baskets and cold cuts as the only option is fading. Attendees — especially at international events — increasingly expect healthy snacks that sustain energy rather than causing post-lunch drowsiness.

What works well:

Protein + complex carbs + healthy fats — this formula maintains stable energy levels for several hours. Specific options: hummus with veggie sticks and whole-grain crackers, nut mixes with dried fruits (no added sugar), mini quinoa and avocado bowls, rice paper rolls with vegetables and tofu.

Fruits and berries — seems obvious, but presentation matters. Whole apples on a tray — bad idea (nobody wants to crunch in the hallways). Sliced fruits on skewers, berry cups, fruit chips — much more convenient and appealing.

Protein snacks — energy balls made from dates and nuts, granola bars without refined sugar, rice cakes with nut butter. Portions should be small: the coffee break's job is to recharge, not replace a full meal.

What to avoid: white flour pastries with lots of sugar (quick glucose spike → sharp energy crash), heavy meat appetizers, anything difficult to eat standing up or on the go.

4. Superfoods, smoothie bars, and attendee energy

The smoothie bar is one of the most visible trends at conferences in recent years. Visually vibrant, Instagram-friendly, and functional: fresh smoothies made with spinach, banana, and berries provide a vitamin boost that's noticeably different from yet another cup of coffee.

Advanced organizers go further and include superfoods on the menu: chia puddings, açaí bowls, matcha lattes, ginger and turmeric shots. This isn't just a fad — these products genuinely support cognitive function. Curcumin in turmeric has anti-inflammatory properties, matcha provides smooth, sustained energy without a sharp crash (unlike espresso), and chia seeds are a source of omega-3 and fiber.

Practical tip: if the budget is limited, you don't need a full smoothie bar. One or two "highlights" are enough — for example, a matcha latte station or baskets with house-made energy balls. Even one non-standard element will make your coffee break stand out.

5. Coffee stations and presentation

Coffee remains the number one beverage at any conference. But between instant coffee from a thermos and a professional coffee station — there's a gap that attendees feel instantly.

The minimum standard for a serious event: an espresso machine with a barista making espresso, cappuccino, latte, and americano. The ideal: a mobile café with pour-over and filter options and plant-based milk choices (oat, almond, coconut). This isn't a whim — it's a real need: by various estimates, 15-20% of attendees at any conference choose plant-based alternatives.

Don't forget those who don't drink coffee. Quality loose-leaf tea (not bags), herbal infusions, infused water (cucumber and mint, lemon and rosemary) — all should be available equally alongside coffee, not hidden in a corner as a secondary option.

Presentation matters too. Eco-friendly tableware (paper cups with a craft aesthetic, wooden utensils, glass bottles instead of plastic) not only aligns with the sustainability trend but also looks stylish. And beautiful presentation means social media photos — free PR for your event.

6. Buffet, gluten-free, and vegan menus

Dietary inclusivity is no longer a bonus — it's a baseline requirement. At any event with 50+ attendees, there will invariably be people with allergies, intolerances, and specific preferences. Ignoring this means creating an unpleasant experience for a significant portion of the audience.

What should be default: vegan and vegetarian options, gluten-free snacks, lactose-free milk alternatives. All with clear labeling. Cards with ingredients and allergen icons next to each dish aren't perfectionism — they're a sign of respect for attendees and care for their safety.

A standing buffet format is preferable to a seated coffee break for several reasons. Standing naturally stimulates conversation — people move, cross paths, start talking. It's more space-efficient. And it's more flexible with timing: attendees can come and go when convenient, without feeling they're "late" or "too early."

When organizing a buffet line, arrange food from light to substantial: first water and fruits, then salads and veggie snacks, then heartier options. This naturally structures choices and helps attendees avoid overeating.

7. Sponsor breaks and additional opportunities

For organizers working with partners and sponsors, the coffee break is also an advertising platform with high engagement. Attendees are relaxed, open to conversation, and much more receptive to brand messages than during the formal program.

Sponsor integration options: branded cups and napkins, named coffee stations ("Coffee break by Company X"), promo stands near the catering zone, branded energy bars or water bottles. Some organizers go further — offering sponsors a themed corner: a smoothie-making mini-masterclass by a health food brand, a tasting set by a tea or coffee producer.

Another opportunity: digital integration. QR codes on cups linking to the sponsor's landing page; screens with partner content in the lounge area; an in-app raffle that launches specifically during the coffee break. All of this transforms the break from a cost item into a revenue source.

Checklist: the perfect coffee break

— Break every 60-90 minutes, duration 20-30 minutes
— Multiple serving points (minimum one per 80-100 people)
— Coffee station with barista and plant-based milk options
— Tea, infused water, fresh juices or smoothies
— Wellness menu: protein + complex carbs + healthy fats
— Allergen and dietary labeling
— Vegan, gluten-free, and lactose-free options
— Convenient portion sizes (eat standing, one-handed)
— Zoning: fast lane + socializing area
— Eco-friendly tableware and presentation

A well-organized coffee break is an investment that pays off through satisfied attendees, successful networking, and an event that's remembered not just as "useful" but also "delicious."`,
    },
  },

  // ───────────────────────────────────────────────────────────────────────
  {
    id: 'egypt-events',
    datePublished: '2026-03-27',
    image: 'https://images.unsplash.com/photo-1539768942893-daf53e448371?auto=format&fit=crop&q=80&w=1000',
    ru: {
      title: 'Почему Египет — идеальное место для конференций: 7 причин выбрать страну фараонов для делового мероприятия',
      category: 'Локации',
      date: '27 Марта, 2026',
      excerpt: 'Когда деловой туризм встречает тысячелетнюю историю, рождаются мероприятия, которые участники запоминают на всю жизнь.',
      content: [
        { type: 'paragraph', text: 'Когда деловой туризм встречает тысячелетнюю историю, рождаются мероприятия, которые участники запоминают на всю жизнь. Разбираемся, почему именно Египет становится одним из самых востребованных направлений MICE-индустрии — и почему всё больше российских компаний выбирают страну фараонов вместо привычного Дубая или европейских столиц.' },

        { type: 'stat', number: '$2 трлн', label: 'прогнозируемый объём глобального рынка MICE к 2032 году. Египет уверенно набирает долю в этой гонке', source: 'отраслевые прогнозы 2024–2025' },

        { type: 'paragraph', text: 'В этой гонке за внимание корпоративных организаторов Египет уверенно набирает очки, предлагая сочетание, которое трудно найти где-либо ещё: мировую инфраструктуру по конкурентным ценам, уникальный культурный контекст и климат, позволяющий проводить мероприятия круглый год.' },

        { type: 'paragraph', text: 'Но давайте разберём конкретнее. Вот семь весомых причин, по которым организаторы конференций всё чаще смотрят в сторону Египта.' },

        { type: 'heading', text: '1. Инфраструктура мирового уровня', level: 2 },
        { type: 'paragraph', text: 'Каирский международный конференц-центр (CICC) — это более 58 000 квадратных метров площадей, включая конференц-залы на 2 500 человек, пять выставочных холлов и десятки переговорных комнат различной вместимости. Но одним Каиром дело не ограничивается.' },
        { type: 'paragraph', text: 'Шарм-эль-Шейх давно зарекомендовал себя как площадка для международных саммитов — именно здесь проходила COP27, климатическая конференция ООН, и множество встреч на высшем уровне. Хургада, Луксор, Александрия — в каждом из этих городов есть современные отели и площадки, адаптированные под деловые мероприятия.' },
        { type: 'stat', number: '58 000 м²', label: 'площадей в одном только Каирском международном конференц-центре. Это сопоставимо с крупнейшими европейскими конгресс-центрами' },
        { type: 'image', url: '/carlsberg-7.JPG', alt: 'Carlsberg — масштаб мероприятия в Domina Coral Bay, Египет', caption: 'Один из наших проектов в Египте: международная конференция Carlsberg на 1000 человек в отеле Domina Coral Bay, Шарм-эль-Шейх' },
        { type: 'paragraph', text: 'Отдельного внимания заслуживает средиземноморское побережье: Новый Аламейн и Рас-эль-Хикма активно превращаются в новые центры делового туризма с пятизвёздочными курортами, брендированными резиденциями и площадками, рассчитанными на корпоративные мероприятия и инсентив-туры.' },

        { type: 'heading', text: '2. Географическое положение — на перекрёстке трёх континентов', level: 2 },
        { type: 'paragraph', text: 'Египет расположен на стыке Африки, Азии и Европы, а Каирский международный аэропорт связан прямыми рейсами с большинством крупных городов мира. Для участников из Европы перелёт занимает 4–5 часов, из стран Персидского залива — 2–3 часа, из Москвы — 4 часа. Это делает Египет удобной точкой сбора для международных делегаций с разных континентов, без необходимости мучительных пересадок и длинных перелётов.' },
        { type: 'stat', number: '4 часа', label: 'прямой перелёт из Москвы до Шарм-эль-Шейха. Для делегатов это не утомительная командировка, а лёгкая поездка с минимальным джетлагом' },
        { type: 'paragraph', text: 'Удобная логистика — это не просто комфорт. Это реальная экономия бюджета: когда участникам не приходится лететь через полмира, организатор тратит меньше на трансферы, а процент подтверждённых участников оказывается выше.' },

        { type: 'heading', text: '3. Конкурентная стоимость при высоком уровне сервиса', level: 2 },
        { type: 'paragraph', text: 'Вот где Египет по-настоящему удивляет. Стоимость аренды конференц-залов, проживания и питания здесь ощутимо ниже, чем в Дубае, Лондоне или Сингапуре, при этом уровень сервиса в ведущих отелях — Marriott, Hilton, Four Seasons, Kempinski — соответствует международным стандартам.' },
        { type: 'paragraph', text: 'Чтобы это было нагляднее — вот сравнение типовых затрат на трёхдневную конференцию на 200 человек в разных MICE-столицах мира (USD, без учёта перелётов).' },
        {
          type: 'table',
          headers: ['Статья расходов', 'Каир', 'Дубай', 'Лондон', 'Сингапур'],
          rows: [
            ['Аренда конференц-зала (500 чел/день)', '$4 000–6 000', '$10 000–14 000', '$15 000–22 000', '$12 000–16 000'],
            ['Отель 4–5★ (за номер/ночь)', '$120–180', '$250–450', '$350–600', '$280–450'],
            ['Кейтеринг (обед на персону)', '$35–50', '$80–120', '$90–130', '$70–100'],
            ['AV-оборудование (день)', '$2 000–3 000', '$5 000–7 000', '$7 000–10 000', '$5 000–8 000'],
            ['Виза для российского паспорта', '$25 (по прилёту)', '$65–90', '$200+', '$30 (eVisa)'],
            ['Итого на 1 делегата (3 дня)', '$800–1 200', '$2 000–3 000', '$3 000–4 500', '$2 200–3 200'],
          ],
          caption: 'Ориентировочные цены для среднего уровня площадок и стандартного формата конференции. Реальная смета зависит от сезона и конкретных площадок',
        },
        {
          type: 'callout',
          variant: 'success',
          title: 'Что это значит для бюджета',
          text: 'Та же конференция на 200 человек в Каире обойдётся в 2,5–3 раза дешевле, чем в Лондоне. Сэкономленные $300 000+ можно вложить в развлекательную программу мирового уровня (включая букинг звёзд и эксклюзивные локации) — и всё равно остаться в плюсе.',
        },
        { type: 'paragraph', text: 'Для организаторов из стран СНГ есть дополнительный плюс: многие отели и площадки в Египте привыкли работать с русскоязычными клиентами, что упрощает коммуникацию и снижает риски при планировании.' },

        { type: 'heading', text: '4. Климат, который работает на организатора', level: 2 },
        { type: 'paragraph', text: 'Солнечных дней в Египте — более 300 в году. Зимой, когда в Москве или Берлине метели, в Шарм-эль-Шейхе +25°C и прозрачное небо. Это делает страну привлекательной для конференций в любое время года, но особенно — в осенне-зимний сезон, когда организаторы в северном полушарии ищут тёплые направления.' },
        { type: 'stat', number: '300+', label: 'солнечных дней в году в Шарм-эль-Шейхе и Хургаде. Open-air мероприятия можно планировать без оглядки на прогноз погоды' },
        { type: 'paragraph', text: 'Предсказуемая погода — это не мелочь. Это возможность спланировать open-air мероприятия, вечерние приёмы на террасах отелей с видом на Красное море или ужин у подножия пирамид, не переживая, что дождь испортит программу.' },
        {
          type: 'callout',
          variant: 'info',
          title: 'Когда лучше всего',
          text: 'Идеальный сезон — октябрь–апрель. Летом (июнь–август) в Каире и южных городах жарко (+38–42°C), что некомфортно для длинных программ. Шарм-эль-Шейх и Хургада переносятся легче за счёт морского бриза, но кондиционеры в зале всё равно работают на максимум.',
        },

        { type: 'heading', text: '5. Уникальный культурный контекст — вау-эффект, который невозможно повторить', level: 2 },
        { type: 'paragraph', text: 'Ни одна другая страна в мире не может предложить гала-ужин с видом на пирамиды Гизы, кофе-брейк в тени древних храмов Луксора или тимбилдинг с дайвингом на рифах Красного моря. Культурное наследие Египта — это не просто фон, а мощный инструмент для создания эмоционального отклика у участников.' },
        { type: 'image', url: '/bd-5.jpg', alt: 'VIP Бедуинский ужин в пустыне под Шарм-эль-Шейхом', caption: 'VIP Бедуинский ужин под Шарм-эль-Шейхом — пример experiential dining, который невозможно повторить в Дубае или Лондоне' },
        { type: 'paragraph', text: 'Исследования в сфере ивент-менеджмента подтверждают: мероприятия, проведённые в нестандартных локациях, запоминаются значительно лучше, чем те, что проходят в безликих отельных конференц-залах. Египет позволяет превратить обычную конференцию в незабываемый опыт — а это именно то, чего ждут современные участники.' },
        { type: 'quote', text: 'За 20 лет в Египте мы провели мероприятия на бюджеты, на которые в Лондоне можно было бы организовать одно средней руки. И каждое из них помнят клиенты — потому что в Каире невозможно сделать «безликое» мероприятие. Город сам создаёт контекст.', author: 'Команда Royal Event Group' },
        { type: 'paragraph', text: 'Тенденции MICE-индустрии подтверждают растущий интерес к подобным форматам: партнёрства с историческими и культурными объектами расширяются, предоставляя организаторам эксклюзивный доступ к храмам, дворцам и музейным пространствам.' },

        { type: 'heading', text: '6. Технологии и устойчивое развитие', level: 2 },
        { type: 'paragraph', text: 'Египет не стоит на месте. Ведущие отели и площадки активно внедряют технологические решения: от AI-платформ для управления мероприятиями и иммерсивных проекционных систем до высокоскоростного интернета и профессионального AV-оборудования. Это особенно важно для гибридных конференций, где часть участников подключается онлайн.' },
        { type: 'paragraph', text: 'Параллельно растёт внимание к устойчивому развитию. Отели и площадки инвестируют в солнечную энергию, системы водосбережения и программы сокращения отходов. Для компаний, работающих в рамках ESG-стандартов, это весомый аргумент: Египет позволяет организовать мероприятие, которое соответствует корпоративной политике устойчивого развития, вплоть до интеграции в программу CSR-активностей — от волонтёрских проектов до экологических инициатив на побережье.' },

        { type: 'heading', text: '7. Богатый выбор пост-конференционных активностей', level: 2 },
        { type: 'image', url: '/nl-12.jpg', alt: 'NL International — 7-дневный корпоративный выезд в Шарм-эль-Шейхе', caption: 'Кейс NL International: 300 участников, 7 дней, бизнес-программа + инсентив-активности — формат, идеально подходящий для Египта' },
        { type: 'paragraph', text: 'Конференция закончилась — а впечатления только начинаются. Участники могут отправиться на дайвинг в Красном море, совершить круиз по Нилу, исследовать гробницы Долины Царей или просто провести несколько дней на курорте. Такая возможность совместить деловую программу с отдыхом (так называемый формат bleisure) значительно повышает мотивацию к участию и помогает организаторам собрать более представительную аудиторию.' },

        { type: 'divider' },

        {
          type: 'comparison',
          title: 'Египет vs «классические» MICE-направления',
          left: {
            title: 'Дубай / Лондон / Сингапур',
            items: [
              'Высокие цены: $2 000–4 500 на одного делегата за 3 дня',
              'Типовые отельные конференц-залы без характера',
              'Сложная виза для российских паспортов ($65–200+)',
              'Минимум культурного контекста — «ещё один Hilton»',
              'Дорогие excursions: $200+ за обзорный тур',
              'Персонал работает на английском, без знания русского',
              'Высокая стоимость алкоголя и кейтеринга',
            ],
          },
          right: {
            title: 'Египет',
            items: [
              'Доступные цены: $800–1 200 на делегата за 3 дня',
              'Уникальные локации: пирамиды, храмы, побережье Красного моря',
              'Простая виза по прилёту ($25)',
              '7 000 лет истории как естественный фон каждого мероприятия',
              'Эксклюзивные программы: дайвинг, бедуинский ужин, круиз по Нилу',
              'Многие отели работают с русскоязычной аудиторией',
              'Сервис международного уровня (Four Seasons, Kempinski) по местным ценам',
            ],
          },
        },

        { type: 'heading', text: 'Кому подойдёт Египет для проведения конференции', level: 2 },
        { type: 'paragraph', text: 'Практически любому организатору, который ищет баланс между стоимостью и качеством, хочет удивить участников нестандартной программой и нуждается в удобной логистике для международной аудитории. Среди сегментов, для которых Египет особенно привлекателен:' },
        {
          type: 'list',
          items: [
            'Корпоративные конференции и стратегические сессии — сочетание деловой программы и культурного погружения идеально для командообразования.',
            'Инсентив-туры — Египет создан для поощрительных поездок: от роскошных курортов до уникальных приключений.',
            'Международные ассоциации и профессиональные форумы — удобное расположение и конкурентные цены упрощают сбор делегатов из разных стран.',
            'Научные и медицинские конференции — Каир уже принимает десятки международных академических конференций ежегодно.',
            'Дилерские конференции и road-show — отличный фон для презентации продукта, плюс мотивирующая программа.',
          ],
        },

        { type: 'heading', text: 'Практические советы для организаторов', level: 2 },
        {
          type: 'list',
          items: [
            'Лучшее время для конференций: октябрь–апрель. В этот период погода комфортна для любых форматов, а цены на размещение остаются разумными.',
            'Визовый вопрос: для граждан большинства стран оформление визы в Египет — быстрая и понятная процедура ($25 по прилёту). Для больших делегаций возможно групповое визовое сопровождение.',
            'Выбор города: Каир — для масштабных конференций и выставок. Шарм-эль-Шейх и Хургада — для мероприятий, совмещённых с отдыхом. Луксор и Асуан — для камерных событий с уникальной атмосферой. Новый Аламейн — для премиальных мероприятий на средиземноморском побережье.',
            'Местный DMC-партнёр обязателен. Самостоятельная организация без локального опыта приводит к 20–30% перерасходу бюджета на скрытых сборах и несогласованной логистике.',
            'Закладывать резерв 10–15% от бюджета на непредвиденные расходы — стандартная практика для любых международных мероприятий.',
          ],
        },

        { type: 'heading', text: 'Вывод', level: 2 },
        { type: 'paragraph', text: 'Египет — это не просто «ещё одно направление» для деловых мероприятий. Это страна, которая предлагает уникальную комбинацию: современную инфраструктуру, конкурентные цены, удобную географию, идеальный климат и культурный контекст, которому нет аналогов в мире. Для организаторов конференций, которые хотят выйти за рамки стандартных решений и создать мероприятие, о котором будут говорить ещё долго, — Египет стоит рассмотреть в первую очередь.' },
        { type: 'paragraph', text: 'Royal Event Group работает в Египте более 20 лет: у нас собственная команда в Каире и Шарм-эль-Шейхе, прямые контракты с топ-отелями (Four Seasons, Domina, Rixos, Kempinski, Park Regency, Grand Rotana) и опыт проведения мероприятий от камерных бедуинских ужинов на 20 человек до международных конференций на 1 000+ делегатов. Если вы планируете корпоративное мероприятие в Египте — поговорите с нами на этапе идеи, а не когда уже подписан контракт с площадкой.' },
      ],
    },
    en: {
      title: 'Why Egypt Is the Perfect Place for Conferences: 7 Reasons to Choose the Land of Pharaohs for Your Business Event',
      category: 'Locations',
      date: 'March 27, 2026',
      excerpt: 'When business tourism meets millennia of history, events are born that attendees remember for a lifetime.',
      content: `When business tourism meets millennia of history, events are born that attendees remember for a lifetime. Let's explore why Egypt is becoming one of the most sought-after destinations in the MICE industry.

The global MICE market (Meetings, Incentives, Conferences, Exhibitions) is growing rapidly — analysts forecast it will reach nearly $2 trillion by 2032. In this race for corporate organizers' attention, Egypt is steadily gaining ground, offering a combination that's hard to find anywhere else: world-class infrastructure at competitive prices, a unique cultural context, and a climate that allows year-round events.

But let's get specific. Here are seven compelling reasons why conference organizers are increasingly looking toward Egypt.

1. Infrastructure that rivals world capitals

The Cairo International Conference Center (CICC) offers over 58,000 square meters of space, including conference halls for 2,500 people, five exhibition halls, and dozens of meeting rooms of various capacities. But it's not just Cairo. Sharm El Sheikh has long established itself as a venue for international summits — COP27, the UN climate conference, and numerous high-level meetings were held here. Hurghada, Luxor, Alexandria — each of these cities has modern hotels and venues adapted for business events.

The Mediterranean coast deserves special mention: New Alamein and Ras El Hekma are actively transforming into new business tourism centers with five-star resorts, branded residences, and venues designed for corporate events and incentive trips.

2. Geographic location — at the crossroads of three continents

Egypt sits at the junction of Africa, Asia, and Europe, and Cairo International Airport is connected by direct flights to most major cities worldwide. For European participants, the flight takes 4-5 hours, from Gulf countries — 2-3 hours. This makes Egypt a convenient gathering point for international delegations from different continents, without exhausting layovers and long flights.

Convenient logistics isn't just about comfort. It's real budget savings: when participants don't have to fly halfway around the world, the organizer spends less on transfers, and the confirmed attendance rate is higher.

3. Competitive pricing with high-level service

This is where Egypt truly surprises. The cost of conference hall rentals, accommodation, and catering is noticeably lower than in Dubai, London, or Singapore, while the service level at leading hotels — Marriott, Hilton, Four Seasons, Kempinski — meets international standards. The savings can fund a memorable cultural program or expand the event's scale.

For CIS organizers, there's an additional advantage: many hotels and venues in Egypt are accustomed to working with Russian-speaking clients, simplifying communication and reducing planning risks.

4. Climate that works for the organizer

Egypt has over 300 sunny days per year. In winter, when Moscow or Berlin faces blizzards, Sharm El Sheikh enjoys +25°C and clear skies. This makes the country attractive for conferences at any time of year, but especially during the fall-winter season when organizers in the northern hemisphere seek warm destinations.

Predictable weather isn't a trivial matter. It enables planning open-air events, evening receptions on hotel terraces overlooking the Red Sea, or dinner at the foot of the pyramids without worrying that rain will ruin the program.

5. Unique cultural context — a wow factor impossible to replicate

No other country in the world can offer a gala dinner with a view of the Giza Pyramids, a coffee break in the shadow of Luxor's ancient temples, or team building with diving on Red Sea reefs. Egypt's cultural heritage isn't just a backdrop — it's a powerful tool for creating emotional resonance among participants.

Event management research confirms: events held in unconventional locations are remembered significantly better than those in generic hotel conference rooms. Egypt transforms an ordinary conference into an unforgettable experience — exactly what modern attendees expect.

MICE industry trends confirm the growing interest in such formats: partnerships with historical and cultural sites are expanding, giving organizers exclusive access to temples, palaces, and museum spaces.

6. Technology and sustainability development

Egypt isn't standing still. Leading hotels and venues are actively implementing technological solutions: from AI platforms for event management and immersive projection systems to high-speed internet and professional AV equipment. This is especially important for hybrid conferences where some participants join online.

Simultaneously, attention to sustainability is growing. Hotels and venues invest in solar energy, water conservation systems, and waste reduction programs. For companies operating under ESG standards, this is a compelling argument: Egypt allows organizing events that comply with corporate sustainability policies, including integration of CSR activities — from volunteer projects to environmental initiatives on the coast.

7. Rich selection of post-conference activities

The conference is over — but the impressions are just beginning. Participants can go diving in the Red Sea, take a Nile cruise, explore the tombs of the Valley of the Kings, or simply spend a few days at a resort. The ability to combine a business program with leisure (the so-called bleisure format) significantly increases motivation to attend and helps organizers assemble a more representative audience.

Who should consider Egypt for their conference?

Practically any organizer seeking a balance between cost and quality, wanting to surprise attendees with an unconventional program, and needing convenient logistics for an international audience. Segments for which Egypt is particularly attractive include:

— Corporate conferences and strategic sessions — the combination of business program and cultural immersion is ideal for team building.
— Incentive trips — Egypt is made for reward travel: from luxury resorts to unique adventures.
— International associations and professional forums — convenient location and competitive prices simplify gathering delegates from different countries.
— Scientific and medical conferences — Cairo already hosts dozens of international academic conferences annually.

Practical tips for organizers

Best time for conferences: October through April. During this period, weather is comfortable for any format, and accommodation prices remain reasonable.

Visa matters: for citizens of most countries, obtaining an Egyptian visa is a quick and straightforward process. Group visa support is available for large delegations.

Choosing a city: Cairo — for large-scale conferences and exhibitions. Sharm El Sheikh and Hurghada — for events combined with leisure. Luxor and Aswan — for intimate events with a unique atmosphere. New Alamein — for premium events on the Mediterranean coast.

Conclusion

Egypt isn't just "another destination" for business events. It's a country that offers a unique combination: modern infrastructure, competitive prices, convenient geography, ideal climate, and a cultural context with no parallel in the world. For conference organizers who want to go beyond standard solutions and create an event people will talk about long after — Egypt should be at the top of the list.`,
    },
  },

  // ───────────────────────────────────────────────────────────────────────
  {
    id: 'team-building-culture',
    datePublished: '2024-01-25',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000',
    ru: {
      title: 'Тимбилдинг как инструмент развития культуры',
      category: 'Корпоративная культура',
      date: '25 Января, 2024',
      excerpt: 'Современный тимбилдинг — это не корпоратив с шашлыками и не верёвочный курс. Это стратегический инструмент развития корпоративной культуры. Разбираем форматы, бюджеты и метрики успешного тимбилдинга в 2026 году.',
      content: [
        { type: 'paragraph', text: 'Тимбилдинг — одно из самых неправильно понимаемых направлений в корпоративных мероприятиях. Для одних это синоним пьяного корпоратива в выходной день. Для других — обязательный «верёвочный курс» с боулингом по итогам года. На самом деле грамотный современный тимбилдинг — это стратегический инструмент управления корпоративной культурой, у которого есть измеримый ROI.' },

        { type: 'stat', number: '21%', label: 'средний рост производительности команд после программ тимбилдинга с правильно поставленными целями. Без целей — рост не зафиксирован', source: 'отраслевая аналитика HR-исследований' },

        { type: 'heading', text: 'Зачем компании нужен тимбилдинг', level: 2 },
        { type: 'paragraph', text: 'Тимбилдинг решает задачи, которые не решаются ни обучением, ни KPI, ни денежной мотивацией. В первую очередь — это вопросы доверия и неформальных связей внутри команды. Сотрудники, которые знают друг друга только по корпоративным мессенджерам, в кризисной ситуации действуют разрозненно. Те, кто прошёл совместный экспириенс — действуют слаженно.' },
        { type: 'paragraph', text: 'Вторая задача — адаптация новых сотрудников и интеграция распределённых команд. Когда часть людей сидит в Москве, часть в Дубае, часть удалённо — единственный способ дать им ощущение «одной компании» — собрать в одном месте под нестандартную задачу.' },
        { type: 'paragraph', text: 'Третья задача — управление конфликтами и снятие напряжения, накопленного в течение года. Тимбилдинг даёт «выпустить пар» в формате, в котором это не вредит работе.' },

        { type: 'heading', text: 'Типичные ошибки в организации тимбилдингов', level: 2 },
        {
          type: 'callout',
          variant: 'warning',
          title: 'Главная ошибка',
          text: 'Самая частая ошибка — отсутствие чётко сформулированной цели. «Сплотить команду» — это не цель, это лозунг. Цель — «снизить количество межотдельных конфликтов на 30% за квартал» или «ускорить адаптацию 12 новых сотрудников до 2 недель». От цели зависит формат, локация, активности и метрики оценки.',
        },
        { type: 'paragraph', text: 'Вторая частая ошибка — выбор активности без учёта аудитории. IT-команда из интровертов на верёвочном курсе с публичными выступлениями получит стресс, а не сплочение. Команда продаж в спокойной wellness-программе будет скучать. Формат должен соответствовать темпераменту и опыту участников.' },
        { type: 'paragraph', text: 'Третья ошибка — отсутствие фасилитатора или модератора. Без профессионального ведущего тимбилдинг превращается в обычную корпоративную поездку, после которой ничего не меняется в работе.' },

        { type: 'image', url: '/nl-21.jpg', alt: 'NL International — корпоративный тимбилдинг в Шарм-эль-Шейхе', caption: 'Кейс NL International: 300 участников, 7 дней комбинированной программы (бизнес + тимбилдинг + культурный опыт)' },

        {
          type: 'comparison',
          title: 'OUT vs IN: тимбилдинг 2026',
          left: {
            title: 'Что уже не работает',
            items: [
              'Верёвочный курс «по умолчанию»',
              'Корпоратив с алкоголем как главный «тимбилдинг» года',
              'Боулинг или картинг — формальная активность без цели',
              'Одинаковая программа для отделов разного профиля',
              'Тимбилдинг без чётко поставленной цели',
              'Игнорирование интровертов и предпочтений участников',
              'Только физические активности (excludes тех, кто не в форме)',
            ],
          },
          right: {
            title: 'Что работает в 2026',
            items: [
              'Программы с целью и метриками успеха',
              'Wellness-форматы (йога, СПА, ретрит)',
              'Кулинарные мастер-классы с местными шефами',
              'Креативные мастерские (живопись, керамика, аромадизайн)',
              'Outdoor-приключения (дайвинг, треккинг, сафари)',
              'Стратегические сессии с фасилитатором',
              'Микс активностей под разные группы внутри команды',
            ],
          },
        },

        { type: 'heading', text: 'Форматы тимбилдинга 2026', level: 2 },
        { type: 'paragraph', text: 'Современный тимбилдинг — это не один формат, а целый набор активностей под разные цели и аудитории. Вот основные форматы с диапазонами стоимости.' },
        {
          type: 'table',
          headers: ['Формат', 'Стоимость на чел/день', 'Цель', 'Подходит для'],
          rows: [
            ['Адвенчур (дайвинг, сафари, треккинг)', '$150–400', 'Преодоление, доверие, адреналин', 'Молодые команды, продажники'],
            ['Креативный (живопись, керамика)', '$80–200', 'Раскрытие, новые роли, сторителлинг', 'IT, инженеры, аналитики'],
            ['Кулинарный мастер-класс', '$100–250', 'Сотрудничество, чувство потока', 'Универсально для любых команд'],
            ['Wellness-ретрит (йога, СПА)', '$200–500', 'Снятие выгорания, перезагрузка', 'Senior-менеджмент, executive'],
            ['Стратегическая сессия с фасилитатором', '$300–800', 'Согласование целей, разрешение конфликтов', 'Управленческие команды'],
            ['Outdoor-квест / городское ориентирование', '$60–150', 'Командное решение задач', 'Большие группы 50–200 чел'],
            ['Корпоративный выезд за рубеж (3–5 дней)', '$1 500–3 500', 'Комплексная перезагрузка + интеграция', 'Годовые программы 30–150 чел'],
          ],
          caption: 'Цены в Москве/Подмосковье для премиум-уровня. Программы в Египте/ОАЭ — на 20–40% дешевле при том же качестве',
        },

        { type: 'heading', text: 'Где проводить: Россия vs ОАЭ vs Египет', level: 2 },
        { type: 'paragraph', text: 'Локация выбирается под формат и сезон. В России — Подмосковье, Сочи, Алтай, Карелия — хороший выбор весной/летом для outdoor-программ. ОАЭ — для зимних wellness-программ и executive-ретритов. Египет — оптимален по соотношению цена/wow-фактор: можно сделать дайвинг в Красном море, бедуинский ужин в пустыне и стратегическую сессию на вилле Four Seasons в рамках одной программы.' },
        { type: 'stat', number: '40–50%', label: 'экономия бюджета на тимбилдинге в Египте/ОАЭ по сравнению с европейскими направлениями при сопоставимом уровне сервиса' },

        { type: 'heading', text: 'Метрики успешного тимбилдинга', level: 2 },
        { type: 'paragraph', text: 'Тимбилдинг должен быть измерим. Иначе это просто корпоративный отдых за счёт компании. Метрики, по которым оценивается результат:' },
        {
          type: 'list',
          items: [
            'NPS (Net Promoter Score) программы среди участников — собирается через 1 неделю после.',
            'eNPS (Employee NPS) — измеряется до и через 1 месяц после, изменение должно быть положительным.',
            'Количество межотдельных коммуникаций в первый месяц после — отслеживается по корпоративному мессенджеру.',
            'Time-to-decision на повторяющиеся типы задач — у сплочённой команды быстрее.',
            'Текучесть кадров в полугодии после — у команд с регулярным тимбилдингом ниже на 15–25%.',
            'Качественная обратная связь от руководителей — изменилась ли атмосфера в отделах.',
          ],
        },

        { type: 'quote', text: 'Тимбилдинг без целей и метрик — это просто корпоративная поездка. Эффективный тимбилдинг начинается с вопроса «что именно мы хотим изменить в работе команды через 3 месяца» — и заканчивается через 3 месяца сверкой ответов.', author: 'Команда Royal Event Group' },

        { type: 'heading', text: 'Чек-лист подготовки тимбилдинга', level: 2 },
        {
          type: 'list',
          items: [
            'Сформулировать цель в измеримых терминах (не «сплотить», а «снизить X на Y%»).',
            'Собрать данные о команде: возраст, темперамент, физическая форма, культурные особенности.',
            'Выбрать формат под цель и аудиторию (см. таблицу выше).',
            'Заложить бюджет: $150–500/чел/день — реалистичный диапазон для качественной программы.',
            'Найти профессионального фасилитатора с опытом в вашей отрасли.',
            'За 2 недели — анкетирование участников на ожидания и ограничения (диеты, аллергии, физические).',
            'После программы — анкета NPS через неделю + анализ метрик через 1 и 3 месяца.',
          ],
        },

        { type: 'heading', text: 'Вывод', level: 2 },
        { type: 'paragraph', text: 'Современный тимбилдинг — это не корпоратив с шашлыками, а инструмент развития корпоративной культуры с измеримым результатом. Royal Event Group разрабатывает программы под конкретные цели команды: от 1-дневных мастер-классов в Москве до 5-дневных корпоративных выездов в Египет и ОАЭ. Если планируете тимбилдинг — поговорите с нами на этапе целеполагания, а не когда уже выбрана дата и локация. Это поможет сделать программу, которая действительно изменит работу команды, а не просто красиво проведёт время.' },
      ],
    },
    en: {
      title: 'Team Building as a Culture Development Tool',
      category: 'Corporate Culture',
      date: 'January 25, 2024',
      excerpt: 'How a well-organized trip can unite a team and increase efficiency.',
      content: `Modern team building is not just a joint vacation, but a strategic tool. We develop programs that help employees reach their potential, establish communication, and feel involved in the company's common goals. Our cases in the UAE and Egypt prove that a change of scenery and unusual tasks work wonders for team spirit.`,
    },
  },
];
