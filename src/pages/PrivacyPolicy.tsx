import { useEffect } from 'react';
import { useLanguage } from '../LanguageContext';
import SEO from '../components/SEO';

// Русская версия политики (оригинал, без изменений)
const PolicyRu = () => (
  <>
          <section>
            <h2 className="text-xl font-display font-bold text-white uppercase tracking-tight mb-4">1. Общие положения</h2>
            <p>Настоящая политика обработки персональных данных составлена в соответствии с требованиями Федерального закона от 27.07.2006 № 152-ФЗ «О персональных данных» (далее — Закон о персональных данных) и определяет порядок обработки персональных данных и меры по обеспечению безопасности персональных данных, предпринимаемые ИП Усачева Ксения Олеговна (далее — Оператор).</p>
            <p>1.1. Оператор ставит своей важнейшей целью и условием осуществления своей деятельности соблюдение прав и свобод человека и гражданина при обработке его персональных данных, в том числе защиты прав на неприкосновенность частной жизни, личную и семейную тайну.</p>
            <p>1.2. Настоящая политика Оператора в отношении обработки персональных данных (далее — Политика) применяется ко всей информации, которую Оператор может получить о посетителях веб-сайта https://royaleventandmice.ru.</p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-white uppercase tracking-tight mb-4">2. Основные понятия, используемые в Политике</h2>
            <p>2.1. Автоматизированная обработка персональных данных — обработка персональных данных с помощью средств вычислительной техники.</p>
            <p>2.2. Блокирование персональных данных — временное прекращение обработки персональных данных (за исключением случаев, если обработка необходима для уточнения персональных данных).</p>
            <p>2.3. Веб-сайт — совокупность графических и информационных материалов, а также программ для ЭВМ и баз данных, обеспечивающих их доступность в сети интернет по сетевому адресу https://royaleventandmice.ru.</p>
            <p>2.4. Информационная система персональных данных — совокупность содержащихся в базах данных персональных данных и обеспечивающих их обработку информационных технологий и технических средств.</p>
            <p>2.5. Обезличивание персональных данных — действия, в результате которых невозможно определить без использования дополнительной информации принадлежность персональных данных конкретному Пользователю или иному субъекту персональных данных.</p>
            <p>2.6. Обработка персональных данных — любое действие (операция) или совокупность действий (операций), совершаемых с использованием средств автоматизации или без использования таких средств с персональными данными, включая сбор, запись, систематизацию, накопление, хранение, уточнение (обновление, изменение), извлечение, использование, передачу (распространение, предоставление, доступ), обезличивание, блокирование, удаление, уничтожение персональных данных.</p>
            <p>2.7. Оператор — государственный орган, муниципальный орган, юридическое или физическое лицо, самостоятельно или совместно с другими лицами организующие и/или осуществляющие обработку персональных данных, а также определяющие цели обработки персональных данных, состав персональных данных, подлежащих обработке, действия (операции), совершаемые с персональными данными.</p>
            <p>2.8. Персональные данные — любая информация, относящаяся прямо или косвенно к определенному или определяемому Пользователю веб-сайта https://royaleventandmice.ru.</p>
            <p>2.9. Персональные данные, разрешенные субъектом персональных данных для распространения, — персональные данные, доступ неограниченного круга лиц к которым предоставлен субъектом персональных данных путём дачи согласия на обработку персональных данных, разрешённых субъектом персональных данных для распространения в порядке, предусмотренном Законом о персональных данных (далее — персональные данные, разрешённые для распространения).</p>
            <p>2.10. Пользователь — любой посетитель веб-сайта https://royaleventandmice.ru.</p>
            <p>2.11. Предоставление персональных данных — действия, направленные на раскрытие персональных данных определённому лицу или определённому кругу лиц.</p>
            <p>2.12. Распространение персональных данных — любые действия, направленные на раскрытие персональных данных неопределённому кругу лиц (передача персональных данных) или на ознакомление с персональными данными неограниченного круга лиц, в том числе обнародование персональных данных в средствах массовой информации, размещение в информационно-телекоммуникационных сетях или предоставление доступа к персональным данным каким-либо иным способом.</p>
            <p>2.13. Трансграничная передача персональных данных — передача персональных данных на территорию иностранного государства органу власти иностранного государства, иностранному физическому или иностранному юридическому лицу.</p>
            <p>2.14. Уничтожение персональных данных — любые действия, в результате которых персональные данные уничтожаются безвозвратно с невозможностью дальнейшего восстановления содержания персональных данных в информационной системе персональных данных и/или уничтожаются материальные носители персональных данных.</p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-white uppercase tracking-tight mb-4">3. Основные права и обязанности Оператора</h2>
            <p>3.1. Оператор имеет право:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>получать от субъекта персональных данных достоверные информацию и/или документы, содержащие персональные данные;</li>
              <li>в случае отзыва субъектом персональных данных согласия на обработку персональных данных, а также направления обращения с требованием о прекращении обработки персональных данных, Оператор вправе продолжить обработку персональных данных без согласия субъекта персональных данных при наличии оснований, указанных в Законе о персональных данных;</li>
              <li>самостоятельно определять состав и перечень мер, необходимых и достаточных для обеспечения выполнения обязанностей, предусмотренных Законом о персональных данных и принятыми в соответствии с ним нормативными правовыми актами, если иное не предусмотрено Законом о персональных данных или другими федеральными законами.</li>
            </ul>
            <p className="mt-4">3.2. Оператор обязан:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>предоставлять субъекту персональных данных по его просьбе информацию, касающуюся обработки его персональных данных;</li>
              <li>организовывать обработку персональных данных в порядке, установленном действующим законодательством РФ;</li>
              <li>отвечать на обращения и запросы субъектов персональных данных и их законных представителей в соответствии с требованиями Закона о персональных данных;</li>
              <li>сообщать в уполномоченный орган по защите прав субъектов персональных данных по запросу этого органа необходимую информацию в течение 10 дней с даты получения такого запроса;</li>
              <li>публиковать или иным образом обеспечивать неограниченный доступ к настоящей Политике в отношении обработки персональных данных;</li>
              <li>принимать правовые, организационные и технические меры для защиты персональных данных от неправомерного или случайного доступа к ним, уничтожения, изменения, блокирования, копирования, предоставления, распространения персональных данных, а также от иных неправомерных действий в отношении персональных данных;</li>
              <li>прекратить передачу (распространение, предоставление, доступ) персональных данных, прекратить обработку и уничтожить персональные данные в порядке и случаях, предусмотренных Законом о персональных данных;</li>
              <li>исполнять иные обязанности, предусмотренные Законом о персональных данных.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-white uppercase tracking-tight mb-4">4. Основные права и обязанности субъектов персональных данных</h2>
            <p>4.1. Субъекты персональных данных имеют право:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>получать информацию, касающуюся обработки его персональных данных, за исключением случаев, предусмотренных федеральными законами. Сведения предоставляются субъекту персональных данных Оператором в доступной форме, и в них не должны содержаться персональные данные, относящиеся к другим субъектам персональных данных, за исключением случаев, когда имеются законные основания для раскрытия таких персональных данных. Перечень информации и порядок её получения установлен Законом о персональных данных;</li>
              <li>требовать от оператора уточнения его персональных данных, их блокирования или уничтожения в случае, если персональные данные являются неполными, устаревшими, неточными, незаконно полученными или не являются необходимыми для заявленной цели обработки, а также принимать предусмотренные законом меры по защите своих прав;</li>
              <li>выдвигать условие предварительного согласия при обработке персональных данных в целях продвижения на рынке товаров, работ и услуг;</li>
              <li>на отзыв согласия на обработку персональных данных, а также на направление требования о прекращении обработки персональных данных;</li>
              <li>обжаловать в уполномоченный орган по защите прав субъектов персональных данных или в судебном порядке неправомерные действия или бездействие Оператора при обработке его персональных данных;</li>
              <li>на осуществление иных прав, предусмотренных законодательством РФ.</li>
            </ul>
            <p className="mt-4">4.2. Субъекты персональных данных обязаны:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>предоставлять Оператору достоверные данные о себе;</li>
              <li>сообщать Оператору об уточнении (обновлении, изменении) своих персональных данных.</li>
            </ul>
            <p className="mt-4">4.3. Лица, передавшие Оператору недостоверные сведения о себе, либо сведения о другом субъекте персональных данных без согласия последнего, несут ответственность в соответствии с законодательством РФ.</p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-white uppercase tracking-tight mb-4">5. Принципы обработки персональных данных</h2>
            <p>5.1. Обработка персональных данных осуществляется на законной и справедливой основе.</p>
            <p>5.2. Обработка персональных данных ограничивается достижением конкретных, заранее определённых и законных целей. Не допускается обработка персональных данных, несовместимая с целями сбора персональных данных.</p>
            <p>5.3. Не допускается объединение баз данных, содержащих персональные данные, обработка которых осуществляется в целях, несовместимых между собой.</p>
            <p>5.4. Обработке подлежат только персональные данные, которые отвечают целям их обработки.</p>
            <p>5.5. Содержание и объём обрабатываемых персональных данных соответствуют заявленным целям обработки. Не допускается избыточность обрабатываемых персональных данных по отношению к заявленным целям их обработки.</p>
            <p>5.6. При обработке персональных данных обеспечивается точность персональных данных, их достаточность, а в необходимых случаях и актуальность по отношению к целям обработки персональных данных. Оператор принимает необходимые меры и/или обеспечивает их принятие по удалению или уточнению неполных или неточных данных.</p>
            <p>5.7. Хранение персональных данных осуществляется в форме, позволяющей определить субъекта персональных данных, не дольше, чем этого требуют цели обработки персональных данных, если срок хранения персональных данных не установлен федеральным законом, договором, стороной которого, выгодоприобретателем или поручителем по которому является субъект персональных данных. Обрабатываемые персональные данные уничтожаются либо обезличиваются по достижении целей обработки или в случае утраты необходимости в достижении этих целей, если иное не предусмотрено федеральным законом.</p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-white uppercase tracking-tight mb-4">6. Цели обработки персональных данных</h2>
            <p><strong className="text-white">Цель обработки:</strong> информирование Пользователя посредством отправки электронных писем.</p>
            <p><strong className="text-white">Персональные данные:</strong> фамилия, имя, отчество; электронный адрес; номера телефонов.</p>
            <p><strong className="text-white">Правовые основания:</strong> Федеральный закон «Об информации, информационных технологиях и о защите информации» от 27.07.2006 № 149-ФЗ.</p>
            <p><strong className="text-white">Виды обработки персональных данных:</strong> сбор, запись, систематизация, накопление, хранение, уничтожение и обезличивание персональных данных; отправка информационных писем на адрес электронной почты.</p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-white uppercase tracking-tight mb-4">7. Условия обработки персональных данных</h2>
            <p>7.1. Обработка персональных данных осуществляется с согласия субъекта персональных данных на обработку его персональных данных.</p>
            <p>7.2. Обработка персональных данных необходима для достижения целей, предусмотренных международным договором Российской Федерации или законом, для осуществления возложенных законодательством Российской Федерации на оператора функций, полномочий и обязанностей.</p>
            <p>7.3. Обработка персональных данных необходима для осуществления правосудия, исполнения судебного акта, акта другого органа или должностного лица, подлежащих исполнению в соответствии с законодательством Российской Федерации об исполнительном производстве.</p>
            <p>7.4. Обработка персональных данных необходима для исполнения договора, стороной которого либо выгодоприобретателем или поручителем по которому является субъект персональных данных, а также для заключения договора по инициативе субъекта персональных данных или договора, по которому субъект персональных данных будет являться выгодоприобретателем или поручителем.</p>
            <p>7.5. Обработка персональных данных необходима для осуществления прав и законных интересов оператора или третьих лиц либо для достижения общественно значимых целей при условии, что при этом не нарушаются права и свободы субъекта персональных данных.</p>
            <p>7.6. Осуществляется обработка персональных данных, доступ неограниченного круга лиц к которым предоставлен субъектом персональных данных либо по его просьбе (далее — общедоступные персональные данные).</p>
            <p>7.7. Осуществляется обработка персональных данных, подлежащих опубликованию или обязательному раскрытию в соответствии с федеральным законом.</p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-white uppercase tracking-tight mb-4">8. Порядок сбора, хранения, передачи и других видов обработки персональных данных</h2>
            <p>Безопасность персональных данных, которые обрабатываются Оператором, обеспечивается путём реализации правовых, организационных и технических мер, необходимых для выполнения в полном объёме требований действующего законодательства в области защиты персональных данных.</p>
            <p>8.1. Оператор обеспечивает сохранность персональных данных и принимает все возможные меры, исключающие доступ к персональным данным неуполномоченных лиц.</p>
            <p>8.2. Персональные данные Пользователя никогда, ни при каких условиях не будут переданы третьим лицам, за исключением случаев, связанных с исполнением действующего законодательства либо в случае, если субъектом персональных данных дано согласие Оператору на передачу данных третьему лицу для исполнения обязательств по гражданско-правовому договору.</p>
            <p>8.3. В случае выявления неточностей в персональных данных Пользователь может актуализировать их самостоятельно, путём направления Оператору уведомления на адрес электронной почты Оператора sale@royaleventandmice.ru с пометкой «Актуализация персональных данных».</p>
            <p>8.4. Срок обработки персональных данных определяется достижением целей, для которых были собраны персональные данные, если иной срок не предусмотрен договором или действующим законодательством. Пользователь может в любой момент отозвать своё согласие на обработку персональных данных, направив Оператору уведомление посредством электронной почты на электронный адрес Оператора sale@royaleventandmice.ru с пометкой «Отзыв согласия на обработку персональных данных».</p>
            <p>8.5. Вся информация, которая собирается сторонними сервисами, в том числе платёжными системами, средствами связи и другими поставщиками услуг, хранится и обрабатывается указанными лицами (Операторами) в соответствии с их Пользовательским соглашением и Политикой конфиденциальности. Оператор не несёт ответственность за действия третьих лиц, в том числе указанных в настоящем пункте поставщиков услуг.</p>
            <p>8.6. Установленные субъектом персональных данных запреты на передачу (кроме предоставления доступа), а также на обработку или условия обработки (кроме получения доступа) персональных данных, разрешённых для распространения, не действуют в случаях обработки персональных данных в государственных, общественных и иных публичных интересах, определённых законодательством РФ.</p>
            <p>8.7. Оператор при обработке персональных данных обеспечивает конфиденциальность персональных данных.</p>
            <p>8.8. Оператор осуществляет хранение персональных данных в форме, позволяющей определить субъекта персональных данных, не дольше, чем этого требуют цели обработки персональных данных, если срок хранения персональных данных не установлен федеральным законом, договором, стороной которого, выгодоприобретателем или поручителем по которому является субъект персональных данных.</p>
            <p>8.9. Условием прекращения обработки персональных данных может являться достижение целей обработки персональных данных, истечение срока действия согласия субъекта персональных данных, отзыв согласия субъектом персональных данных или требование о прекращении обработки персональных данных, а также выявление неправомерной обработки персональных данных.</p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-white uppercase tracking-tight mb-4">9. Перечень действий, производимых Оператором с полученными персональными данными</h2>
            <p>9.1. Оператор осуществляет сбор, запись, систематизацию, накопление, хранение, уточнение (обновление, изменение), извлечение, использование, передачу (распространение, предоставление, доступ), обезличивание, блокирование, удаление и уничтожение персональных данных.</p>
            <p>9.2. Оператор осуществляет автоматизированную обработку персональных данных с получением и/или передачей полученной информации по информационно-телекоммуникационным сетям или без таковой.</p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-white uppercase tracking-tight mb-4">10. Трансграничная передача персональных данных</h2>
            <p>10.1. Оператор до начала осуществления деятельности по трансграничной передаче персональных данных обязан уведомить уполномоченный орган по защите прав субъектов персональных данных о своём намерении осуществлять трансграничную передачу персональных данных (такое уведомление направляется отдельно от уведомления о намерении осуществлять обработку персональных данных).</p>
            <p>10.2. Оператор до подачи вышеуказанного уведомления обязан получить от органов власти иностранного государства, иностранных физических лиц, иностранных юридических лиц, которым планируется трансграничная передача персональных данных, соответствующие сведения.</p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-white uppercase tracking-tight mb-4">11. Конфиденциальность персональных данных</h2>
            <p>Оператор и иные лица, получившие доступ к персональным данным, обязаны не раскрывать третьим лицам и не распространять персональные данные без согласия субъекта персональных данных, если иное не предусмотрено федеральным законом.</p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-white uppercase tracking-tight mb-4">12. Заключительные положения</h2>
            <p>12.1. Пользователь может получить любые разъяснения по интересующим вопросам, касающимся обработки его персональных данных, обратившись к Оператору с помощью электронной почты sale@royaleventandmice.ru.</p>
            <p>12.2. В данном документе будут отражены любые изменения политики обработки персональных данных Оператором. Политика действует бессрочно до замены её новой версией.</p>
            <p>12.3. Актуальная версия Политики в свободном доступе расположена в сети Интернет по адресу https://royaleventandmice.ru.</p>
          </section>
  </>
);

// English version of the same policy (same numbering, same legal references)
const PolicyEn = () => (
  <>
          <section>
            <h2 className="text-xl font-display font-bold text-white uppercase tracking-tight mb-4">1. General Provisions</h2>
            <p>This Personal Data Processing Policy has been prepared in accordance with the requirements of Federal Law No. 152-FZ of July 27, 2006 “On Personal Data” (the “Personal Data Law”). It sets out the procedure for processing personal data and the measures taken to protect personal data by Individual Entrepreneur Ksenia Olegovna Usacheva (the “Operator”).</p>
            <p>1.1. The Operator regards respect for the rights and freedoms of individuals in the processing of their personal data, including protection of the right to privacy and to personal and family confidentiality, as its most important objective and as a condition of its activity.</p>
            <p>1.2. This Operator policy on the processing of personal data (the “Policy”) applies to all information the Operator may obtain about visitors to the website https://www.royaleventandmice.com.</p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-white uppercase tracking-tight mb-4">2. Key Terms Used in This Policy</h2>
            <p>2.1. Automated processing of personal data means the processing of personal data by means of computer technology.</p>
            <p>2.2. Blocking of personal data means temporarily suspending the processing of personal data (except where processing is required to clarify the personal data).</p>
            <p>2.3. Website means the collection of graphic and informational materials, together with the computer programs and databases that make them available on the internet at the network address https://www.royaleventandmice.com.</p>
            <p>2.4. Personal data information system means the collection of personal data held in databases, together with the information technologies and technical means that enable its processing.</p>
            <p>2.5. Depersonalization of personal data means actions that make it impossible, without the use of additional information, to attribute personal data to a specific User or other personal data subject.</p>
            <p>2.6. Processing of personal data means any action (operation) or set of actions (operations) performed on personal data, with or without the use of automated means, including the collection, recording, systematization, accumulation, storage, clarification (updating, modification), retrieval, use, transfer (dissemination, provision, access), depersonalization, blocking, deletion and destruction of personal data.</p>
            <p>2.7. Operator means a state body, municipal body, legal entity or individual that, alone or jointly with others, organizes and/or carries out the processing of personal data and determines the purposes of processing, the composition of the personal data to be processed, and the actions (operations) performed on personal data.</p>
            <p>2.8. Personal data means any information relating directly or indirectly to an identified or identifiable User of the website https://www.royaleventandmice.com.</p>
            <p>2.9. Personal data permitted by the personal data subject for dissemination means personal data to which the personal data subject has granted access to an unlimited number of persons by giving consent to the processing of personal data permitted for dissemination in the manner prescribed by the Personal Data Law (“personal data permitted for dissemination”).</p>
            <p>2.10. User means any visitor to the website https://www.royaleventandmice.com.</p>
            <p>2.11. Provision of personal data means actions aimed at disclosing personal data to a specific person or a specific group of persons.</p>
            <p>2.12. Dissemination of personal data means any actions aimed at disclosing personal data to an indefinite group of persons (transfer of personal data) or at making personal data available to an unlimited number of persons, including publishing personal data in the media, posting it on information and telecommunication networks, or providing access to personal data in any other way.</p>
            <p>2.13. Cross-border transfer of personal data means the transfer of personal data to the territory of a foreign state, to a foreign government authority, a foreign individual or a foreign legal entity.</p>
            <p>2.14. Destruction of personal data means any actions as a result of which personal data is destroyed irreversibly, so that its content can no longer be restored in the personal data information system, and/or the physical media containing the personal data are destroyed.</p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-white uppercase tracking-tight mb-4">3. Principal Rights and Obligations of the Operator</h2>
            <p>3.1. The Operator has the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>receive accurate information and/or documents containing personal data from the personal data subject;</li>
              <li>where the personal data subject withdraws consent to the processing of personal data or submits a request to stop processing, continue processing the personal data without the subject’s consent where the grounds specified in the Personal Data Law exist;</li>
              <li>independently determine the composition and list of measures necessary and sufficient to fulfill the obligations set out in the Personal Data Law and the regulations adopted under it, unless otherwise provided by the Personal Data Law or other federal laws.</li>
            </ul>
            <p className="mt-4">3.2. The Operator is obliged to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>provide the personal data subject, at their request, with information concerning the processing of their personal data;</li>
              <li>organize the processing of personal data in the manner established by the current legislation of the Russian Federation;</li>
              <li>respond to requests and inquiries from personal data subjects and their legal representatives in accordance with the requirements of the Personal Data Law;</li>
              <li>provide the authorized body for the protection of the rights of personal data subjects, at its request, with the necessary information within 10 days of receiving the request;</li>
              <li>publish this Policy on the processing of personal data or otherwise ensure unrestricted access to it;</li>
              <li>take legal, organizational and technical measures to protect personal data from unlawful or accidental access, destruction, modification, blocking, copying, provision or dissemination, and from other unlawful actions involving personal data;</li>
              <li>stop the transfer (dissemination, provision, access) of personal data, stop processing and destroy personal data in the manner and in the cases provided for by the Personal Data Law;</li>
              <li>fulfill other obligations provided for by the Personal Data Law.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-white uppercase tracking-tight mb-4">4. Principal Rights and Obligations of Personal Data Subjects</h2>
            <p>4.1. Personal data subjects have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>receive information concerning the processing of their personal data, except in the cases provided for by federal law. The Operator provides this information to the personal data subject in an accessible form, and it must not contain personal data relating to other personal data subjects unless there are legal grounds for disclosing such data. The list of information and the procedure for obtaining it are established by the Personal Data Law;</li>
              <li>require the Operator to clarify, block or destroy their personal data if it is incomplete, outdated, inaccurate, unlawfully obtained or not necessary for the stated purpose of processing, and take the measures provided for by law to protect their rights;</li>
              <li>make prior consent a condition of the processing of their personal data for the purpose of marketing goods, works and services;</li>
              <li>withdraw consent to the processing of personal data and submit a request to stop the processing of personal data;</li>
              <li>appeal unlawful actions or inaction by the Operator in the processing of their personal data to the authorized body for the protection of the rights of personal data subjects or in court;</li>
              <li>exercise other rights provided for by the legislation of the Russian Federation.</li>
            </ul>
            <p className="mt-4">4.2. Personal data subjects are obliged to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>provide the Operator with accurate information about themselves;</li>
              <li>inform the Operator of any clarification (updating, modification) of their personal data.</li>
            </ul>
            <p className="mt-4">4.3. Persons who provide the Operator with inaccurate information about themselves, or with information about another personal data subject without that subject’s consent, are liable under the legislation of the Russian Federation.</p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-white uppercase tracking-tight mb-4">5. Principles of Personal Data Processing</h2>
            <p>5.1. Personal data is processed on a lawful and fair basis.</p>
            <p>5.2. The processing of personal data is limited to the achievement of specific, predetermined and legitimate purposes. Processing personal data in a manner incompatible with the purposes of its collection is not permitted.</p>
            <p>5.3. Databases containing personal data processed for mutually incompatible purposes may not be combined.</p>
            <p>5.4. Only personal data that meets the purposes of its processing is processed.</p>
            <p>5.5. The content and scope of the personal data processed correspond to the stated purposes of processing. Personal data that is excessive in relation to the stated purposes of processing may not be processed.</p>
            <p>5.6. In processing personal data, the Operator ensures that the data is accurate and sufficient and, where necessary, up to date in relation to the purposes of processing. The Operator takes the necessary measures, or ensures they are taken, to delete or clarify incomplete or inaccurate data.</p>
            <p>5.7. Personal data is stored in a form that allows the personal data subject to be identified for no longer than the purposes of processing require, unless a retention period is established by federal law or by a contract to which the personal data subject is a party, beneficiary or guarantor. Processed personal data is destroyed or depersonalized once the purposes of processing have been achieved, or when those purposes no longer need to be achieved, unless otherwise provided by federal law.</p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-white uppercase tracking-tight mb-4">6. Purposes of Personal Data Processing</h2>
            <p><strong className="text-white">Purpose of processing:</strong> informing the User by sending e-mails.</p>
            <p><strong className="text-white">Personal data:</strong> surname, first name, patronymic; e-mail address; telephone numbers.</p>
            <p><strong className="text-white">Legal grounds:</strong> Federal Law No. 149-FZ of July 27, 2006 “On Information, Information Technologies and Information Protection”.</p>
            <p><strong className="text-white">Types of processing:</strong> collection, recording, systematization, accumulation, storage, destruction and depersonalization of personal data; sending informational e-mails to the e-mail address provided.</p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-white uppercase tracking-tight mb-4">7. Conditions of Personal Data Processing</h2>
            <p>7.1. Personal data is processed with the consent of the personal data subject to the processing of their personal data.</p>
            <p>7.2. Processing of personal data is necessary to achieve the purposes provided for by an international treaty of the Russian Federation or by law, or to perform the functions, powers and duties assigned to the Operator by the legislation of the Russian Federation.</p>
            <p>7.3. Processing of personal data is necessary for the administration of justice, or for the enforcement of a judicial act or an act of another body or official that is subject to enforcement under the legislation of the Russian Federation on enforcement proceedings.</p>
            <p>7.4. Processing of personal data is necessary to perform a contract to which the personal data subject is a party, beneficiary or guarantor, or to conclude a contract at the initiative of the personal data subject or a contract under which the personal data subject will be a beneficiary or guarantor.</p>
            <p>7.5. Processing of personal data is necessary to exercise the rights and legitimate interests of the Operator or third parties, or to achieve socially significant purposes, provided that the rights and freedoms of the personal data subject are not violated.</p>
            <p>7.6. The Operator processes personal data to which the personal data subject has granted access to an unlimited number of persons, or which has been made accessible at the subject’s request (“publicly available personal data”).</p>
            <p>7.7. The Operator processes personal data that is subject to publication or mandatory disclosure under federal law.</p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-white uppercase tracking-tight mb-4">8. Procedure for the Collection, Storage, Transfer and Other Processing of Personal Data</h2>
            <p>The security of the personal data processed by the Operator is ensured through the legal, organizational and technical measures necessary to comply in full with the requirements of the current legislation on personal data protection.</p>
            <p>8.1. The Operator safeguards personal data and takes every possible measure to prevent access to personal data by unauthorized persons.</p>
            <p>8.2. The User’s personal data will never, under any circumstances, be transferred to third parties, except where required by current legislation or where the personal data subject has given the Operator consent to transfer the data to a third party in order to perform obligations under a civil-law contract.</p>
            <p>8.3. If the User identifies inaccuracies in their personal data, they may update it themselves by sending a notice to the Operator’s e-mail address sale@royaleventandmice.ru with the subject line “Personal data update”.</p>
            <p>8.4. The period of personal data processing is determined by the achievement of the purposes for which the personal data was collected, unless a different period is provided for by contract or current legislation. The User may withdraw consent to the processing of their personal data at any time by sending a notice to the Operator’s e-mail address sale@royaleventandmice.ru with the subject line “Withdrawal of consent to personal data processing”.</p>
            <p>8.5. All information collected by third-party services, including payment systems, communication tools and other service providers, is stored and processed by those parties (operators) in accordance with their own User Agreements and Privacy Policies. The Operator is not responsible for the actions of third parties, including the service providers referred to in this clause.</p>
            <p>8.6. Prohibitions set by the personal data subject on the transfer (other than granting access) of personal data permitted for dissemination, and on its processing or the conditions of its processing (other than obtaining access), do not apply where personal data is processed in the state, public or other public interests defined by the legislation of the Russian Federation.</p>
            <p>8.7. The Operator ensures the confidentiality of personal data during processing.</p>
            <p>8.8. The Operator stores personal data in a form that allows the personal data subject to be identified for no longer than the purposes of processing require, unless a retention period is established by federal law or by a contract to which the personal data subject is a party, beneficiary or guarantor.</p>
            <p>8.9. Processing of personal data may be terminated upon achievement of the purposes of processing, expiry of the personal data subject’s consent, withdrawal of consent by the personal data subject or a request to stop processing, or upon detection of unlawful processing of personal data.</p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-white uppercase tracking-tight mb-4">9. Actions Performed by the Operator on the Personal Data Received</h2>
            <p>9.1. The Operator collects, records, systematizes, accumulates, stores, clarifies (updates, modifies), retrieves, uses, transfers (disseminates, provides, grants access to), depersonalizes, blocks, deletes and destroys personal data.</p>
            <p>9.2. The Operator carries out automated processing of personal data, with or without receiving and/or transmitting the information obtained via information and telecommunication networks.</p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-white uppercase tracking-tight mb-4">10. Cross-Border Transfer of Personal Data</h2>
            <p>10.1. Before beginning any cross-border transfer of personal data, the Operator must notify the authorized body for the protection of the rights of personal data subjects of its intention to carry out cross-border transfers of personal data (this notice is sent separately from the notice of intention to process personal data).</p>
            <p>10.2. Before submitting the above notice, the Operator must obtain the relevant information from the foreign government authorities, foreign individuals and foreign legal entities to which the cross-border transfer of personal data is planned.</p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-white uppercase tracking-tight mb-4">11. Confidentiality of Personal Data</h2>
            <p>The Operator and any other persons who have gained access to personal data must not disclose it to third parties or disseminate it without the consent of the personal data subject, unless otherwise provided by federal law.</p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-white uppercase tracking-tight mb-4">12. Final Provisions</h2>
            <p>12.1. The User may obtain clarification on any question concerning the processing of their personal data by contacting the Operator by e-mail at sale@royaleventandmice.ru.</p>
            <p>12.2. Any changes to the Operator’s personal data processing policy will be reflected in this document. The Policy remains in force indefinitely until it is replaced by a new version.</p>
            <p>12.3. The current version of the Policy is freely available online at https://www.royaleventandmice.com.</p>
          </section>
  </>
);

const PrivacyPolicy = () => {
  const { language } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-royal-black text-white pt-32 pb-20">
      <SEO
        title={language === 'ru' ? 'Политика обработки персональных данных' : 'Privacy Policy'}
        description={language === 'ru' ? 'Политика La Royal Event в отношении обработки персональных данных посетителей сайта и клиентов.' : 'How La Royal Event processes and protects the personal data of website visitors and clients.'}
      />
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tighter leading-none mb-12">
          {language === 'ru' ? 'Политика обработки персональных данных' : 'Privacy Policy'}
        </h1>

        <div className="prose prose-invert prose-lg max-w-none space-y-8 text-white/70 leading-relaxed">
          {language === 'ru' ? <PolicyRu /> : <PolicyEn />}
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
