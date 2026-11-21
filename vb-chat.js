/*!
 * Vectorbridge AI — mentor assistant for SNBP University, School of Business Management.
 * Text + hands-free voice chat in English, हिंदी and मराठी. No server, no tracking.
 * Include with: <script src="https://snbpwakadcampus.github.io/mentor-Details/vb-chat.js" defer></script>
 */
(function () {
  if (window.__vbChat) return;
  window.__vbChat = true;

  var BASE = "https://snbpwakadcampus.github.io/";
  var L_FORM = BASE + "mentor/";
  var L_LIST = BASE + "mentor-Details/mentors.html";
  var L_UPD = BASE + "mentor-Details/update.html";
  var L_SITE = "https://snbpuniversity.edu.in/wakad/";
  var L_WA = "https://chat.whatsapp.com/J7D4sTFG9VGKo5Us4apWtC";
  var L_MAP = "https://www.google.com/maps/search/?api=1&query=18.601856,73.752281";
  var PHONE = "+91 90283 88150";
  var LOGO = "https://snbpuniversity.com/assets/golden%20logo-BS4muviq.webp";

  /* ---------------- knowledge ---------------- */
  // each intent: keywords (lower-case; latin matched as words, Devanagari as substrings), answers per language, links
  var K = [
    { id: "greet", w: 2, k: ["hi", "hello", "hey", "namaste", "namaskar", "good morning", "good evening", "नमस्ते", "नमस्कार", "हॅलो", "हेलो"],
      a: { en: "Namaste! I’m Vectorbridge AI. Ask me anything about mentoring at SNBP University — how to join, time, honorarium, sessions or your profile.",
           hi: "नमस्ते! मैं Vectorbridge AI हूँ। SNBP University में मेंटॉरिंग के बारे में कुछ भी पूछिए — जुड़ना, समय, मानदेय, सत्र या आपकी प्रोफ़ाइल।",
           mr: "नमस्कार! मी Vectorbridge AI. SNBP University मधील मेंटॉरिंगबद्दल काहीही विचारा — सहभाग, वेळ, मानधन, सत्रे किंवा तुमची प्रोफाइल." } },
    { id: "thanks", w: 2, k: ["thanks", "thank you", "thank", "dhanyavad", "shukriya", "धन्यवाद", "शुक्रिया", "आभार"],
      a: { en: "Thank you for guiding our students! Join the mentors’ WhatsApp group to get the next session requests first.",
           hi: "हमारे छात्रों का मार्गदर्शन करने के लिए धन्यवाद! अगले सत्रों की जानकारी सबसे पहले पाने के लिए मेंटॉर्स के WhatsApp ग्रुप से जुड़िए।",
           mr: "आमच्या विद्यार्थ्यांना मार्गदर्शन केल्याबद्दल धन्यवाद! पुढील सत्रांची माहिती सर्वात आधी मिळवण्यासाठी मेंटॉर्सच्या WhatsApp ग्रुपमध्ये सामील व्हा." },
      links: ["wa"] },
    { id: "about", w: 3, k: ["about", "university", "snbp", "sbm", "college", "institute", "first", "unique", "special", "why snbp", "website", "industry led", "युनिव्हर्सिटी", "यूनिवर्सिटी", "विद्यापीठ", "विश्वविद्यालय", "कॉलेज", "वेबसाइट", "वेबसाईट", "खास", "वेगळे", "पहिल"],
      a: { en: "**SNBP University – School of Business Management, Pune** is India’s first university campus led by an industry leader. Our promise is **One Student – One Industry Mentor**: every BBA, BCA, MBA and MCA student is guided one-to-one by a working professional. Born in the AI generation, guided by an industry mentor.",
           hi: "**SNBP University – School of Business Management, पुणे** भारत का पहला यूनिवर्सिटी कैंपस है जिसका नेतृत्व एक इंडस्ट्री लीडर करते हैं। हमारा वादा: **एक छात्र – एक इंडस्ट्री मेंटॉर** — BBA, BCA, MBA और MCA के हर छात्र को एक कार्यरत प्रोफेशनल व्यक्तिगत मार्गदर्शन देता है।",
           mr: "**SNBP University – School of Business Management, पुणे** हे इंडस्ट्री लीडरच्या नेतृत्वाखालील भारतातील पहिले विद्यापीठ कॅम्पस आहे. आमचे वचन: **एक विद्यार्थी – एक इंडस्ट्री मेंटॉर** — BBA, BCA, MBA आणि MCA च्या प्रत्येक विद्यार्थ्याला एक कार्यरत प्रोफेशनल वैयक्तिक मार्गदर्शन करतो." },
      links: ["site"] },
    { id: "pool", w: 3, k: ["mentor pool", "advisor pool", "what is mentor", "role", "roles", "responsibility", "responsibilities", "what do mentors do", "what will i do", "advisor", "adviser", "mentor or advisor", "kaam", "kya karna", "काम", "भूमिका", "जबाबदारी", "जिम्मेदारी", "सलाहकार", "सल्लागार", "काय करावे", "क्या करना"],
      a: { en: "You can join as a **Mentor** (guide students on careers, projects and skills), an **Advisor** (advise on curriculum, industry links and strategy) or **Both**. We only reach out for opportunities that match your profile.",
           hi: "आप **मेंटॉर** (छात्रों को करियर, प्रोजेक्ट और कौशल में मार्गदर्शन), **एडवाइज़र** (पाठ्यक्रम, इंडस्ट्री लिंक और रणनीति पर सलाह) या **दोनों** के रूप में जुड़ सकते हैं। हम केवल आपकी प्रोफ़ाइल से मेल खाने वाले अवसरों के लिए ही संपर्क करते हैं।",
           mr: "तुम्ही **मेंटॉर** (विद्यार्थ्यांना करिअर, प्रोजेक्ट आणि कौशल्यांवर मार्गदर्शन), **सल्लागार** (अभ्यासक्रम, इंडस्ट्री संबंध आणि धोरणावर सल्ला) किंवा **दोन्ही** म्हणून सहभागी होऊ शकता. तुमच्या प्रोफाइलशी जुळणाऱ्या संधींसाठीच आम्ही संपर्क करतो." } },
    { id: "join", w: 4, k: ["join", "register", "registration", "become a mentor", "become mentor", "sign up", "signup", "apply", "how to join", "enroll", "form", "judna", "jude", "judu", "judne", "kaise jude", "join karna", "sahbhagi", "jodaycha", "जुड़", "जुड", "सामील", "नोंदणी", "रजिस्टर", "फॉर्म", "अर्ज", "सहभागी"],
      a: { en: "Joining takes **about 3 minutes in 3 short steps**: About you → How you’ll help → Consent & sign. You’ll need your LinkedIn link and a clear photo (a CV is optional). You get a **Mentor Pass** number immediately.",
           hi: "जुड़ना **3 आसान चरणों में लगभग 3 मिनट** का काम है: आपके बारे में → आप कैसे मदद करेंगे → सहमति और हस्ताक्षर। LinkedIn लिंक और एक साफ़ फ़ोटो चाहिए (CV वैकल्पिक)। आपको तुरंत **मेंटॉर पास** नंबर मिलता है।",
           mr: "सहभागी होणे **3 सोप्या टप्प्यांत सुमारे 3 मिनिटांचे** आहे: तुमच्याबद्दल → तुम्ही कशी मदत कराल → संमती व स्वाक्षरी. LinkedIn लिंक आणि स्पष्ट फोटो लागतो (CV ऐच्छिक). तुम्हाला लगेच **मेंटॉर पास** क्रमांक मिळतो." },
      links: ["form"] },
    { id: "time", w: 4, k: ["time", "hours", "hour", "how much time", "commitment", "per month", "monthly", "weekend", "weekends", "busy", "schedule", "kitna samay", "kiti vel", "समय", "वेळ", "तास", "घंटे", "घंटा", "महिन्यात", "महीने", "वेळापत्रक"],
      a: { en: "You choose your time: **1 to 12 hours a month**. Most mentors give **about 4 hours** — roughly 2 sessions of 2 hours. Every engagement is agreed with you beforehand, so it fits your schedule.",
           hi: "समय आप तय करते हैं: **महीने में 1 से 12 घंटे**। ज़्यादातर मेंटॉर **लगभग 4 घंटे** देते हैं — यानी 2 घंटे के करीब 2 सत्र। हर सत्र पहले आपसे तय किया जाता है।",
           mr: "वेळ तुम्ही ठरवता: **महिन्याला 1 ते 12 तास**. बहुतेक मेंटॉर **सुमारे 4 तास** देतात — म्हणजे 2 तासांची सुमारे 2 सत्रे. प्रत्येक सत्र आधी तुमच्याशी ठरवले जाते." } },
    { id: "pay", w: 5, k: ["honorarium", "honararium", "paid", "pay", "payment", "remuneration", "fees", "fee", "money", "compensation", "charges", "salary", "free", "unpaid", "paisa", "paise", "मानदेय", "मानधन", "पैसे", "पेमेंट", "भुगतान", "शुल्क", "फी", "मोबदला", "पगार"],
      a: { en: "**Every session is paid.** The honorarium depends on the session type — Expert Talk, Workshop, Mentoring or Advisory — and the mode (online or on campus). Details are shared with you before each engagement.",
           hi: "**हर सत्र का भुगतान किया जाता है।** मानदेय सत्र के प्रकार — एक्सपर्ट टॉक, वर्कशॉप, मेंटॉरिंग या एडवाइज़री — और माध्यम (ऑनलाइन या कैंपस) पर निर्भर करता है। हर सत्र से पहले विवरण साझा किया जाता है।",
           mr: "**प्रत्येक सत्र सशुल्क आहे.** मानधन सत्राच्या प्रकारावर — एक्सपर्ट टॉक, वर्कशॉप, मेंटॉरिंग किंवा सल्लागार — आणि माध्यमावर (ऑनलाइन किंवा कॅम्पस) अवलंबून असते. प्रत्येक सत्रापूर्वी तपशील कळवला जातो." } },
    { id: "mode", w: 4, k: ["online", "offline", "mode", "remote", "virtual", "zoom", "google meet", "in person", "on campus", "visit campus", "hybrid", "ऑनलाइन", "ऑफलाइन", "माध्यम", "प्रत्यक्ष", "कैंपस", "कॅम्पस"],
      a: { en: "Choose what suits you: **Online**, **At Wakad Campus**, or **Both**. Many mentors start online and visit the campus for talks and project reviews.",
           hi: "जो आपके लिए सुविधाजनक हो: **ऑनलाइन**, **वाकड कैंपस पर**, या **दोनों**। कई मेंटॉर ऑनलाइन शुरू करते हैं और टॉक या प्रोजेक्ट समीक्षा के लिए कैंपस आते हैं।",
           mr: "तुमच्या सोयीनुसार निवडा: **ऑनलाइन**, **वाकड कॅम्पसवर**, किंवा **दोन्ही**. अनेक मेंटॉर ऑनलाइन सुरुवात करतात आणि टॉक किंवा प्रोजेक्ट परीक्षणासाठी कॅम्पसला भेट देतात." } },
    { id: "contribute", w: 4, k: ["contribute", "contribution", "guest lecture", "lecture", "workshop", "expert talk", "talk", "project", "projects", "internship", "placement", "placements", "research", "publication", "startup", "innovation", "curriculum", "board of studies", "hackathon", "judge", "how can i help", "ways", "योगदान", "लेक्चर", "व्याख्यान", "कार्यशाळा", "वर्कशॉप", "प्रोजेक्ट", "प्रकल्प", "इंटर्नशिप", "प्लेसमेंट", "संशोधन", "रिसर्च", "स्टार्टअप", "हॅकाथॉन", "हैकाथॉन", "अभ्यासक्रम", "पाठ्यक्रम"],
      a: { en: "Ways you can contribute:\n• Career mentoring\n• Guest lectures & workshops\n• Live industry projects\n• Internships & placements\n• Research & publication guidance\n• Startup & innovation mentoring\n• Curriculum & Board of Studies\n• Hackathon / competition judging",
           hi: "आप इन तरीकों से योगदान दे सकते हैं:\n• करियर मेंटॉरिंग\n• गेस्ट लेक्चर और वर्कशॉप\n• लाइव इंडस्ट्री प्रोजेक्ट\n• इंटर्नशिप और प्लेसमेंट\n• रिसर्च और पब्लिकेशन मार्गदर्शन\n• स्टार्टअप और इनोवेशन मेंटॉरिंग\n• पाठ्यक्रम और बोर्ड ऑफ स्टडीज़\n• हैकाथॉन / प्रतियोगिता जज",
           mr: "तुम्ही या प्रकारे योगदान देऊ शकता:\n• करिअर मेंटॉरिंग\n• गेस्ट लेक्चर व वर्कशॉप\n• लाइव्ह इंडस्ट्री प्रोजेक्ट\n• इंटर्नशिप व प्लेसमेंट\n• संशोधन व प्रकाशन मार्गदर्शन\n• स्टार्टअप व इनोव्हेशन मेंटॉरिंग\n• अभ्यासक्रम व अभ्यास मंडळ\n• हॅकाथॉन / स्पर्धा परीक्षक" } },
    { id: "programmes", w: 3, k: ["programme", "programmes", "program", "programs", "course", "courses", "bba", "bca", "mba", "mca", "students", "student", "batch", "कोर्स", "प्रोग्राम", "अभ्यासक्रम", "विद्यार्थी", "छात्र", "बीबीए", "बीसीए", "एमबीए", "एमसीए"],
      a: { en: "You can support one or more programmes: **BBA**, **BCA** (undergraduate) and **MBA**, **MCA** (postgraduate). Every programme includes applied AI, live projects and a one-to-one industry mentor for each student.",
           hi: "आप एक या अधिक प्रोग्राम में मदद कर सकते हैं: **BBA**, **BCA** (स्नातक) और **MBA**, **MCA** (स्नातकोत्तर)। हर प्रोग्राम में अप्लाइड AI, लाइव प्रोजेक्ट और हर छात्र के लिए एक इंडस्ट्री मेंटॉर है।",
           mr: "तुम्ही एक किंवा अधिक प्रोग्राममध्ये मदत करू शकता: **BBA**, **BCA** (पदवी) आणि **MBA**, **MCA** (पदव्युत्तर). प्रत्येक प्रोग्राममध्ये अप्लाइड AI, लाइव्ह प्रोजेक्ट आणि प्रत्येक विद्यार्थ्यासाठी इंडस्ट्री मेंटॉर आहे." },
      links: ["site"] },
    { id: "withdraw", w: 4, k: ["withdraw", "leave", "quit", "exit", "cancel", "obligation", "compulsory", "mandatory", "bond", "contract", "commitment free", "stop", "chhod", "सोड", "छोड़", "बाहेर", "बंधन", "बंधनकारक", "अनिवार्य", "करार"],
      a: { en: "There is **no obligation**. Each engagement is agreed with you beforehand, and you can **withdraw at any time** just by informing the campus.",
           hi: "कोई **बाध्यता नहीं** है। हर सत्र पहले आपसे तय होता है, और आप कैंपस को सूचित करके **कभी भी हट सकते हैं**।",
           mr: "कोणतेही **बंधन नाही**. प्रत्येक सत्र आधी तुमच्याशी ठरवले जाते, आणि कॅम्पसला कळवून तुम्ही **कधीही बाहेर पडू शकता**." } },
    { id: "profile", w: 4, k: ["profile", "update", "edit", "change", "correct", "photo", "picture", "linkedin", "designation", "my card", "hide", "remove", "delete", "details wrong", "प्रोफाइल", "प्रोफ़ाइल", "फोटो", "फ़ोटो", "बदल", "सुधार", "अपडेट", "लिंक्डइन", "हटव", "छुपा", "लपव"],
      a: { en: "Use **Check & Update Your Profile**: find your name, correct your details, add your photo and LinkedIn, or choose to hide your card. Changes appear on the mentors page after the SNBP team approves them.",
           hi: "**Check & Update Your Profile** पर जाएँ: अपना नाम खोजें, विवरण सुधारें, फ़ोटो और LinkedIn जोड़ें, या अपना कार्ड छुपाएँ। SNBP टीम की स्वीकृति के बाद बदलाव दिखते हैं।",
           mr: "**Check & Update Your Profile** वर जा: तुमचे नाव शोधा, तपशील दुरुस्त करा, फोटो आणि LinkedIn जोडा, किंवा तुमचे कार्ड लपवा. SNBP टीमच्या मंजुरीनंतर बदल दिसतात." },
      links: ["upd"] },
    { id: "privacy", w: 3, k: ["privacy", "private", "data", "safe", "consent", "public", "visible", "show my", "share my", "गोपनीय", "प्रायव्हसी", "सहमती", "सहमति", "डेटा", "सार्वजनिक"],
      a: { en: "Your details are used **only to manage the Mentor & Advisor Pool**. Your card appears on the mentors page **only if you choose “Yes, show my profile”** — you can switch it off any time.",
           hi: "आपके विवरण **केवल मेंटॉर और एडवाइज़र पूल के लिए** उपयोग होते हैं। आपका कार्ड **तभी दिखता है जब आप “हाँ, मेरी प्रोफ़ाइल दिखाएँ”** चुनते हैं — इसे कभी भी बंद कर सकते हैं।",
           mr: "तुमचे तपशील **फक्त मेंटॉर व सल्लागार पूलसाठी** वापरले जातात. **तुम्ही “हो, माझी प्रोफाइल दाखवा” निवडल्यासच** तुमचे कार्ड दिसते — ते कधीही बंद करता येते." } },
    { id: "whatsapp", w: 5, k: ["whatsapp", "group", "community", "watsapp", "whatsap", "व्हॉट्सॲप", "व्हॉट्सअ‍ॅप", "व्हाट्सएप", "व्हॉट्सएप", "ग्रुप", "समूह"],
      a: { en: "Join the **Mentors’ WhatsApp group** to get session requests, student project briefs and campus events first.",
           hi: "सत्र अनुरोध, छात्र प्रोजेक्ट और कैंपस कार्यक्रमों की जानकारी सबसे पहले पाने के लिए **मेंटॉर्स WhatsApp ग्रुप** से जुड़िए।",
           mr: "सत्र विनंत्या, विद्यार्थी प्रोजेक्ट आणि कॅम्पस कार्यक्रमांची माहिती सर्वात आधी मिळवण्यासाठी **मेंटॉर्स WhatsApp ग्रुप**मध्ये सामील व्हा." },
      links: ["wa"] },
    { id: "faculty", w: 4, k: ["faculty", "employee", "employment", "job", "full time", "full-time", "permanent", "staff", "naukri", "नोकरी", "नौकरी", "कर्मचारी", "प्राध्यापक", "फॅकल्टी", "फैकल्टी", "पूर्णवेळ", "पूर्णकालिक"],
      a: { en: "Mentors and advisors are **visiting experts** associated with the campus. They are not full-time faculty or employees of SNBP — you guide students alongside our faculty, on your own schedule.",
           hi: "मेंटॉर और एडवाइज़र कैंपस से जुड़े **विज़िटिंग विशेषज्ञ** हैं। वे SNBP के पूर्णकालिक फैकल्टी या कर्मचारी नहीं हैं — आप अपने समय पर हमारे फैकल्टी के साथ छात्रों का मार्गदर्शन करते हैं।",
           mr: "मेंटॉर आणि सल्लागार हे कॅम्पसशी संलग्न **भेट देणारे तज्ज्ञ** आहेत. ते SNBP चे पूर्णवेळ प्राध्यापक किंवा कर्मचारी नाहीत — तुम्ही तुमच्या वेळेनुसार आमच्या प्राध्यापकांसोबत विद्यार्थ्यांना मार्गदर्शन करता." } },
    { id: "next", w: 3, k: ["after joining", "what next", "next step", "next steps", "what happens", "when will", "contact me", "selected", "approval", "approved", "पुढे काय", "आगे क्या", "नंतर", "बाद में", "मंजूरी", "मंजुरी", "स्वीकृति"],
      a: { en: "What happens next:\n1. We match your profile to the programmes you chose.\n2. We contact you with a specific session, project or advisory role.\n3. You confirm the date and format — nothing is scheduled without your agreement.\n4. An honorarium is paid for every session.",
           hi: "आगे क्या होता है:\n1. हम आपकी प्रोफ़ाइल को आपके चुने प्रोग्राम से मिलाते हैं।\n2. किसी विशेष सत्र, प्रोजेक्ट या सलाहकार भूमिका के लिए संपर्क करते हैं।\n3. आप तारीख और माध्यम तय करते हैं — आपकी सहमति के बिना कुछ तय नहीं होता।\n4. हर सत्र के लिए मानदेय दिया जाता है।",
           mr: "पुढे काय होते:\n1. तुमची प्रोफाइल तुम्ही निवडलेल्या प्रोग्रामशी जुळवली जाते.\n2. विशिष्ट सत्र, प्रोजेक्ट किंवा सल्लागार भूमिकेसाठी संपर्क केला जातो.\n3. तुम्ही तारीख आणि माध्यम ठरवता — तुमच्या संमतीशिवाय काहीही ठरत नाही.\n4. प्रत्येक सत्रासाठी मानधन दिले जाते." } },
    { id: "needs", w: 3, k: ["documents", "required", "requirement", "requirements", "need to submit", "cv", "resume", "eligibility", "qualification", "experience", "who can join", "कागदपत्र", "दस्तावेज़", "रिझ्युम", "बायोडाटा", "पात्रता", "योग्यता", "अनुभव"],
      a: { en: "Academicians, researchers and industry professionals can join. You’ll need your **LinkedIn profile link** and a **clear photo**; a **CV is optional** (PDF or Word, up to 5 MB).",
           hi: "शिक्षाविद, शोधकर्ता और इंडस्ट्री प्रोफेशनल जुड़ सकते हैं। **LinkedIn प्रोफ़ाइल लिंक** और **साफ़ फ़ोटो** चाहिए; **CV वैकल्पिक** है (PDF या Word, 5 MB तक)।",
           mr: "शिक्षणतज्ज्ञ, संशोधक आणि इंडस्ट्री प्रोफेशनल सहभागी होऊ शकतात. **LinkedIn प्रोफाइल लिंक** आणि **स्पष्ट फोटो** लागतो; **CV ऐच्छिक** आहे (PDF किंवा Word, 5 MB पर्यंत)." },
      links: ["form"] },
    { id: "mentors", w: 3, k: ["mentors list", "all mentors", "how many mentors", "who are the mentors", "other mentors", "existing mentors", "मेंटॉर कोण", "मेंटॉर कौन", "किती मेंटॉर", "कितने मेंटॉर", "सर्व मेंटॉर", "सभी मेंटॉर"],
      a: { en: "Our pool has industry leaders and academicians from companies and institutions across India. See every mentor, filter by programme and search by organisation on the Mentors & Advisors page.",
           hi: "हमारे पूल में देशभर की कंपनियों और संस्थानों के इंडस्ट्री लीडर और शिक्षाविद हैं। सभी मेंटॉर Mentors & Advisors पेज पर देखें।",
           mr: "आमच्या पूलमध्ये देशभरातील कंपन्या आणि संस्थांचे इंडस्ट्री लीडर व शिक्षणतज्ज्ञ आहेत. सर्व मेंटॉर Mentors & Advisors पानावर पहा." },
      links: ["list"] },
    { id: "contact", w: 3, k: ["contact", "phone", "call", "number", "email", "mail", "talk to", "coordinator", "help", "support", "संपर्क", "फोन", "नंबर", "कॉल", "ईमेल", "मदत", "मदद"],
      a: { en: "Talk to the SNBP team: **" + PHONE + "** (call / WhatsApp) · snbpwakadcampus@gmail.com",
           hi: "SNBP टीम से बात करें: **" + PHONE + "** (कॉल / WhatsApp) · snbpwakadcampus@gmail.com",
           mr: "SNBP टीमशी बोला: **" + PHONE + "** (कॉल / WhatsApp) · snbpwakadcampus@gmail.com" },
      links: ["call", "wa"] },
    { id: "location", w: 4, k: ["location", "address", "where", "campus address", "map", "directions", "reach", "kaha", "kuthe", "पता", "पत्ता", "कुठे", "कहाँ", "कहां", "ठिकाण", "लोकेशन"],
      a: { en: "SNBP University – School of Business Management, Shankar Kalat Nagar, Wakad, Pune 411057 — near Phoenix Mall of the Millennium, minutes from the Hinjawadi IT parks.",
           hi: "SNBP University – School of Business Management, शंकर कलाट नगर, वाकड, पुणे 411057 — फीनिक्स मॉल ऑफ द मिलेनियम के पास, हिंजवडी IT पार्क से कुछ मिनट।",
           mr: "SNBP University – School of Business Management, शंकर कलाट नगर, वाकड, पुणे 411057 — फिनिक्स मॉल ऑफ द मिलेनियमजवळ, हिंजवडी IT पार्कपासून काही मिनिटांवर." },
      links: ["map"] },
    { id: "pass", w: 3, k: ["mentor pass", "pass number", "pass no", "certificate", "id card", "पास", "प्रमाणपत्र", "सर्टिफिकेट"],
      a: { en: "You receive a **Mentor & Advisor Pass** with a unique number as soon as you submit the joining form. For certificates or letters for a session, please contact the SNBP team.",
           hi: "जॉइनिंग फॉर्म भरते ही आपको एक यूनिक नंबर वाला **मेंटॉर और एडवाइज़र पास** मिलता है। किसी सत्र के प्रमाणपत्र या पत्र के लिए SNBP टीम से संपर्क करें।",
           mr: "सहभाग फॉर्म भरताच तुम्हाला विशिष्ट क्रमांकाचा **मेंटॉर व सल्लागार पास** मिळतो. सत्राचे प्रमाणपत्र किंवा पत्रासाठी SNBP टीमशी संपर्क करा." },
      links: ["call"] }
  ];

  var LINKS = {
    form: { en: "Become a Mentor", hi: "मेंटॉर बनें", mr: "मेंटॉर व्हा", href: L_FORM },
    upd: { en: "Check & update profile", hi: "प्रोफ़ाइल अपडेट करें", mr: "प्रोफाइल अपडेट करा", href: L_UPD },
    list: { en: "See all mentors", hi: "सभी मेंटॉर देखें", mr: "सर्व मेंटॉर पहा", href: L_LIST },
    wa: { en: "Join WhatsApp group", hi: "WhatsApp ग्रुप से जुड़ें", mr: "WhatsApp ग्रुपमध्ये सामील व्हा", href: L_WA, wa: true },
    site: { en: "Visit SBM website", hi: "SBM वेबसाइट देखें", mr: "SBM वेबसाइट पहा", href: L_SITE },
    map: { en: "Open in Google Maps", hi: "Google Maps में खोलें", mr: "Google Maps मध्ये उघडा", href: L_MAP },
    call: { en: "Call " + PHONE, hi: "कॉल " + PHONE, mr: "कॉल " + PHONE, href: "tel:+919028388150" }
  };

  var T = {
    en: { title: "Vectorbridge AI", sub: "Mentor help · English · हिंदी · मराठी", ph: "Ask about joining, time, honorarium…", talk: "Talk",
          chips: ["How do I join?", "Is it paid?", "How much time?", "Online or campus?", "Update my profile", "WhatsApp group"],
          fallback: "I’m not sure about that yet. I can help with joining, time, honorarium, modes, ways to contribute and your profile — or talk to the SNBP team:",
          listening: "Listening… speak now", thinking: "Thinking…", speaking: "Speaking — tap the orb to interrupt", idle: "Tap the mic and ask your question",
          noSpeech: "I didn’t hear anything. Tap the mic and try again.", noMic: "Microphone is blocked. Allow it from the lock icon next to the address, then tap the mic.",
          noDevice: "No microphone found. You can type your question.", network: "Voice needs an internet connection.", noSupport: "This browser can’t listen. Use Chrome, Edge or Safari, or type your question.",
          heard: "You said", back: "Back to chat", ack: "Great! What else would you like to know — joining, time, honorarium or your profile?" },
    hi: { title: "Vectorbridge AI", sub: "मेंटॉर सहायता · English · हिंदी · मराठी", ph: "जुड़ना, समय, मानदेय के बारे में पूछें…", talk: "बोलें",
          chips: ["कैसे जुड़ें?", "क्या भुगतान मिलता है?", "कितना समय?", "ऑनलाइन या कैंपस?", "प्रोफ़ाइल अपडेट", "WhatsApp ग्रुप"],
          fallback: "इसका उत्तर अभी मेरे पास नहीं है। मैं जुड़ने, समय, मानदेय, माध्यम, योगदान और प्रोफ़ाइल में मदद कर सकता हूँ — या SNBP टीम से बात करें:",
          listening: "सुन रहा हूँ… अब बोलिए", thinking: "सोच रहा हूँ…", speaking: "बोल रहा हूँ — रोकने के लिए गोले पर टैप करें", idle: "माइक दबाएँ और सवाल पूछें",
          noSpeech: "कुछ सुनाई नहीं दिया। माइक दबाकर फिर बोलिए।", noMic: "माइक्रोफ़ोन बंद है। पते के पास ताले वाले आइकन से अनुमति दें, फिर माइक दबाएँ।",
          noDevice: "माइक्रोफ़ोन नहीं मिला। आप सवाल लिख सकते हैं।", network: "वॉइस के लिए इंटरनेट चाहिए।", noSupport: "यह ब्राउज़र सुन नहीं सकता। Chrome, Edge या Safari इस्तेमाल करें या सवाल लिखें।",
          heard: "आपने कहा", back: "चैट पर वापस", ack: "बढ़िया! और क्या जानना चाहेंगे — जुड़ना, समय, मानदेय या प्रोफ़ाइल?" },
    mr: { title: "Vectorbridge AI", sub: "मेंटॉर मदत · English · हिंदी · मराठी", ph: "सहभाग, वेळ, मानधन याबद्दल विचारा…", talk: "बोला",
          chips: ["कसे सामील व्हायचे?", "मानधन मिळते का?", "किती वेळ?", "ऑनलाइन की कॅम्पस?", "प्रोफाइल अपडेट", "WhatsApp ग्रुप"],
          fallback: "याचे उत्तर सध्या माझ्याकडे नाही. मी सहभाग, वेळ, मानधन, माध्यम, योगदान आणि प्रोफाइलबद्दल मदत करू शकतो — किंवा SNBP टीमशी बोला:",
          listening: "ऐकत आहे… आता बोला", thinking: "विचार करत आहे…", speaking: "बोलत आहे — थांबवण्यासाठी गोलावर टॅप करा", idle: "माइक दाबा आणि प्रश्न विचारा",
          noSpeech: "काही ऐकू आले नाही. माइक दाबून पुन्हा बोला.", noMic: "मायक्रोफोन बंद आहे. पत्त्याजवळील कुलूप चिन्हावरून परवानगी द्या, मग माइक दाबा.",
          noDevice: "मायक्रोफोन सापडला नाही. तुम्ही प्रश्न लिहू शकता.", network: "व्हॉइससाठी इंटरनेट हवे.", noSupport: "हा ब्राउझर ऐकू शकत नाही. Chrome, Edge किंवा Safari वापरा किंवा प्रश्न लिहा.",
          heard: "तुम्ही म्हणालात", back: "चॅटवर परत", ack: "छान! आणखी काय जाणून घ्यायचे आहे — सहभाग, वेळ, मानधन की प्रोफाइल?" }
  };
  var SPEECH = { en: "en-IN", hi: "hi-IN", mr: "mr-IN" };

  /* ---------------- understanding ---------------- */
  var DEV = /[ऀ-ॿ]/;
  var MR = /(आहे|आहेत|काय|कसे|कसा|किती|मला|माझ|कुठे|पाहिजे|करायचे|आणि|साठी|मिळेल|मिळते|सांगा|बद्दल|लागतो|लागते|होते|तुम्ही|आम्ही|व्हायचे|करू|शकतो|पहा|नाही|का\?)/;
  var MR_ROMAN = /\b(aahe|ahe|kay|kiti|mala|majha|kuthe|pahije|karaycha|sanga|milel|milte|baddal|ani|kasa|kase)\b/i;
  var HI_ROMAN = /\b(kya|hai|kitna|kitni|kaise|kahan|kaha|mujhe|mera|chahiye|batao|milega|milta|ke liye|aur|sakte|sakta|hota|hoga)\b/i;
  function detect(t) {
    if (DEV.test(t)) return MR.test(t) ? "mr" : "hi";
    if (MR_ROMAN.test(t)) return "mr";
    if (HI_ROMAN.test(t)) return "hi";
    return null;
  }
  // light typo tolerance for latin keywords
  var VOCAB = [];
  K.forEach(function (i) { i.k.forEach(function (w) { if (/^[a-z]+$/.test(w) && w.length >= 5) VOCAB.push(w); }); });
  function ed(a, b) {
    if (Math.abs(a.length - b.length) > 2) return 9;
    var d = [], i, j;
    for (i = 0; i <= a.length; i++) { d[i] = [i]; }
    for (j = 0; j <= b.length; j++) d[0][j] = j;
    for (i = 1; i <= a.length; i++) for (j = 1; j <= b.length; j++) {
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
    }
    return d[a.length][b.length];
  }
  var KEEP = "kaise kitna kitni kitne milega milegi milta sakte sakta chahiye batao bataiye kahan mujhe hamara humara apna karna karne samay paisa paise kuthe sanga ahe aahe pahije milel milte kasa kase dyava lagel karaycha jodaycha mentor mentors about after where which there their would could should other student students".split(" ");
  function fix(t) {
    return t.replace(/[a-z]{5,}/g, function (w) {
      if (VOCAB.indexOf(w) > -1 || KEEP.indexOf(w) > -1) return w;
      var best = w, bd = w.length >= 8 ? 2 : 1;
      for (var i = 0; i < VOCAB.length; i++) { var x = ed(w, VOCAB[i]); if (x <= bd) { best = VOCAB[i]; bd = x - 1; } }
      return best;
    });
  }
  function esc(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }
  var RX = K.map(function (i) {
    return i.k.map(function (w) { return DEV.test(w) ? new RegExp(esc(w)) : new RegExp("(^|[^a-z])" + esc(w) + "([^a-z]|$)"); });
  });
  var ACK = /^\s*(ok(ay)?|k|yes|yeah|hmm+|fine|great|nice|good|cool|achha|accha|thik( hai)?|theek( hai)?|haan?|ho|ठीक( है)?|हाँ|हां|अच्छा|ओके|हो|बरं|छान|चांगलं)[.!\s]*$/i;

  function answer(q, lang) {
    var raw = String(q || "").trim();
    var t = " " + fix(raw.toLowerCase()) + " ";
    var d = detect(raw);
    var use = d || lang;
    if (d === "hi" && lang === "mr" && DEV.test(raw) && raw.split(/\s+/).length <= 3) use = "mr";
    var sw = /(hindi|हिंदी|हिन्दी)/i.test(raw) ? "hi" : /(marathi|मराठी)/i.test(raw) ? "mr" : /(english|इंग्लिश|इंग्रजी|अंग्रेजी|अंग्रेज़ी)/i.test(raw) ? "en" : null;
    if (sw && (raw.split(/\s+/).length <= 2 || /(speak|talk|reply|language|bolo|bol|बोल|भाषा|please|में|मध्ये)/i.test(raw))) return { lang: sw, text: K[0].a[sw], links: [], id: "switch" };
    if (ACK.test(raw)) return { lang: use, text: T[use].ack, links: [], id: "ack" };
    var best = null, bestS = 0;
    K.forEach(function (it, n) {
      var s = 0;
      RX[n].forEach(function (rx) { if (rx.test(t)) s += it.w; });
      if (s > bestS) { bestS = s; best = it; }
    });
    if (!best) return { lang: use, text: T[use].fallback, links: ["call", "wa"], id: "fallback" };
    return { lang: use, text: best.a[use], links: best.links || [], id: best.id };
  }
  window.vbMentorAnswer = answer; // handy for testing

  /* ---------------- speech ---------------- */
  var Rec = window.SpeechRecognition || window.webkitSpeechRecognition;
  var canSpeak = "speechSynthesis" in window;
  var keep = [], session = 0, voices = [];
  function loadVoices() { if (canSpeak) voices = speechSynthesis.getVoices(); }
  if (canSpeak) { loadVoices(); speechSynthesis.onvoiceschanged = loadVoices; }
  function pickVoice(lang) {
    if (!voices.length) loadVoices();
    var order = { en: ["en-IN", "en-GB", "en-US", "en"], hi: ["hi-IN", "hi"], mr: ["mr-IN", "mr", "hi-IN", "hi"] }[lang];
    for (var i = 0; i < order.length; i++) {
      var m = voices.filter(function (v) { return v.lang.replace("_", "-").toLowerCase().indexOf(order[i].toLowerCase()) === 0; });
      if (m.length) return m.filter(function (v) { return /(google|natural|online|neural|premium|enhanced)/i.test(v.name); })[0] || m[0];
    }
    return null;
  }
  function plain(text, lang) {
    return String(text).replace(/\*\*/g, "").replace(/[•→]/g, "").replace(/\s*·\s*/g, ", ").replace(/\s*—\s*/g, ", ")
      .replace(/\+91 90283 88150/g, lang === "en" ? "nine zero two eight, three eight eight, one five zero" : "9 0 2 8 3 8 8 1 5 0")
      .replace(/\S+@\S+/g, "").replace(/\n+/g, ". ").replace(/\.\s*\./g, ".").trim();
  }
  function unlock() { if (!canSpeak) return; try { var u = new SpeechSynthesisUtterance(" "); u.volume = 0; keep.push(u); speechSynthesis.speak(u); } catch (e) {} }
  function stopSpeak() { session++; if (canSpeak) speechSynthesis.cancel(); }
  function speak(text, lang) {
    return new Promise(function (resolve) {
      if (!canSpeak) return resolve();
      var id = ++session; speechSynthesis.cancel();
      var parts = plain(text, lang).split(/(?<=[.!?।])\s+/).filter(Boolean);
      var voice = pickVoice(lang), i = 0;
      setTimeout(function next() {
        if (id !== session || i >= parts.length) return resolve();
        var p = parts[i++], done = false;
        var u = new SpeechSynthesisUtterance(p);
        u.lang = voice ? voice.lang : SPEECH[lang]; if (voice) u.voice = voice; u.rate = lang === "en" ? 1.02 : 0.95;
        keep.push(u); if (keep.length > 20) keep.splice(0, keep.length - 20);
        var fin = function () { if (done) return; done = true; clearTimeout(tm); next(); };
        var tm = setTimeout(fin, 1500 + p.length * (lang === "en" ? 70 : 85));
        u.onend = fin; u.onerror = fin;
        speechSynthesis.speak(u);
      }, 60);
    });
  }

  /* ---------------- UI ---------------- */
  var css = "#vbc,#vbc *{box-sizing:border-box}#vbc{--p:#2d1b4d;--p2:#432a6e;--g:#e0a43a;font:15px/1.5 'Public Sans','Segoe UI',system-ui,sans-serif;color:#1d1530}"
    + "#vbc-fab{position:fixed;right:18px;bottom:18px;z-index:2147483000;display:flex;align-items:center;gap:10px;border:0;border-radius:999px;background:var(--p);color:#fff;padding:7px 18px 7px 7px;box-shadow:0 14px 36px rgba(45,27,77,.45);cursor:pointer;font-weight:700;font-size:14.5px;line-height:1.2;font-family:inherit}"
    + "#vbc-fab .o{width:46px;height:46px;border-radius:50%;background:var(--g);display:grid;place-items:center;color:var(--p)}#vbc-fab small{display:block;font-weight:500;font-size:11.5px;color:#d9cdf0}"
    + "@media(max-width:520px){#vbc-fab{padding:6px}#vbc-fab .tx{display:none}}"
    + "#vbc-p{position:fixed;right:18px;bottom:18px;z-index:2147483001;width:min(400px,calc(100vw - 24px));height:min(640px,calc(100dvh - 30px));background:#f6f4fa;border-radius:22px;box-shadow:0 30px 80px rgba(20,10,40,.4);display:flex;flex-direction:column;overflow:hidden}"
    + "@media(max-width:520px){#vbc-p{right:0;bottom:0;width:100vw;height:100dvh;border-radius:0}}"
    + "#vbc-p[hidden],#vbc-v[hidden]{display:none!important}"
    + "#vbc-h{background:var(--p);color:#fff;padding:12px 12px 10px 14px;display:flex;align-items:center;gap:10px}#vbc-h img{width:40px;height:40px;object-fit:contain;background:#fff;border-radius:10px;padding:3px}"
    + "#vbc-h .t{flex:1;min-width:0}#vbc-h b{display:block;font-size:16.5px}#vbc-h span{display:block;font-size:11.5px;color:#d9cdf0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}"
    + ".vbc-ib{width:38px;height:38px;border-radius:50%;border:0;background:transparent;color:#fff;display:grid;place-items:center;cursor:pointer}.vbc-ib:hover{background:rgba(255,255,255,.12)}"
    + "#vbc-talk{border:0;border-radius:999px;background:var(--g);color:var(--p);font-weight:800;font-size:13.5px;line-height:1;font-family:inherit;padding:10px 13px;display:flex;gap:6px;align-items:center;cursor:pointer}"
    + "#vbc-h #vbc-talk span{display:inline;color:inherit;font-size:13.5px;white-space:nowrap}#vbc-l{display:flex;gap:4px;background:var(--p);padding:0 12px 10px}#vbc-l button{flex:1;border:0;border-radius:999px;padding:6px 0;font-weight:700;font-size:13px;line-height:1;font-family:inherit;cursor:pointer;background:rgba(255,255,255,.12);color:#efe7fb}#vbc-l button[aria-checked=true]{background:var(--g);color:var(--p)}"
    + "#vbc-m{flex:1;overflow-y:auto;padding:16px 14px;display:flex;flex-direction:column;gap:12px}"
    + ".vbc-b{max-width:88%;border-radius:16px;padding:10px 13px;white-space:pre-line;word-wrap:break-word}.vbc-b.bot{background:#fff;border-bottom-left-radius:6px;box-shadow:0 2px 6px rgba(45,27,77,.08)}.vbc-b.me{align-self:flex-end;background:var(--p);color:#fff;border-bottom-right-radius:6px}"
    + ".vbc-ls{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}.vbc-ls a{border-radius:999px;background:#f3e8c8;color:var(--p);font-weight:700;font-size:12.5px;line-height:1;font-family:inherit;padding:8px 11px;text-decoration:none}.vbc-ls a.wa{background:#25d366;color:#fff}"
    + "#vbc-c{display:flex;gap:6px;overflow-x:auto;padding:0 12px 8px}#vbc-c button{flex:none;border:1.5px solid #d8cfe6;background:#fff;color:var(--p);border-radius:999px;padding:7px 12px;font-weight:600;font-size:13px;line-height:1;font-family:inherit;cursor:pointer}"
    + "#vbc-n{min-height:0;font-size:12px;font-weight:700;padding:0 14px;color:#802030}"
    + "#vbc-f{display:flex;gap:6px;padding:10px;border-top:1px solid #e2dcec;background:#fff}#vbc-f input{flex:1;min-width:0;border:1.5px solid #e2dcec;border-radius:999px;padding:10px 14px;font-size:15px;font-family:inherit;color:#1d1530;background:#fff}"
    + "#vbc-f input:focus{outline:2px solid var(--g);border-color:transparent}#vbc-f button{width:42px;height:42px;border-radius:50%;border:0;display:grid;place-items:center;cursor:pointer}#vbc-mic{background:#efeaf7;color:var(--p)}#vbc-mic.on{background:var(--g)}#vbc-send{background:var(--p);color:#fff}"
    + "#vbc-v{position:absolute;inset:0;background:linear-gradient(#432a6e,#1d1132);color:#fff;display:flex;flex-direction:column;align-items:center;padding:16px;text-align:center;z-index:2}"
    + "#vbc-v .top{align-self:stretch;display:flex;justify-content:space-between;align-items:center}#vbc-v .top b{font-size:16px}"
    + "#vbc-orb{margin-top:26px;width:116px;height:116px;border-radius:50%;border:0;background:var(--g);color:var(--p);display:grid;place-items:center;cursor:pointer;box-shadow:0 0 60px rgba(224,164,58,.45);position:relative}"
    + "#vbc-orb.listening::before,#vbc-orb.listening::after{content:'';position:absolute;inset:0;border-radius:50%;border:2px solid rgba(224,164,58,.6);animation:vbr 1.6s ease-out infinite}#vbc-orb.listening::after{animation-delay:.8s}"
    + "#vbc-orb.speaking{animation:vbp .9s ease-in-out infinite alternate}@keyframes vbr{from{transform:scale(1);opacity:.8}to{transform:scale(1.7);opacity:0}}@keyframes vbp{to{transform:scale(1.07)}}"
    + "#vbc-st{margin-top:16px;font-weight:700;color:var(--g);min-height:22px}#vbc-st.err{color:#f3c3c9}#vbc-hd{margin-top:6px;font-size:13.5px;color:#d9cdf0;min-height:20px}"
    + "#vbc-rp{margin-top:10px;background:rgba(255,255,255,.1);border-radius:16px;padding:12px 14px;font-size:14.5px;text-align:left;white-space:pre-line;max-height:34%;overflow-y:auto;align-self:stretch}"
    + "#vbc-vl{margin-top:10px}#vbc-vc{display:flex;flex-wrap:wrap;justify-content:center;gap:6px;margin-top:auto;padding-top:12px}#vbc-vc button{border:1.5px solid rgba(255,255,255,.3);background:transparent;color:#fff;border-radius:999px;padding:7px 11px;font-weight:600;font-size:12.5px;line-height:1;font-family:inherit;cursor:pointer}"
    + "#vbc-back{margin-top:10px;border:0;border-radius:999px;background:rgba(255,255,255,.14);color:#fff;padding:9px 16px;font-weight:700;font-size:13.5px;line-height:1;font-family:inherit;cursor:pointer}"
    + "@media(prefers-reduced-motion:reduce){#vbc *{animation:none!important}}";

  var I = {
    chat: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1.1-4.6A8 8 0 1 1 21 12z"/></svg>',
    mic: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>',
    bigmic: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>',
    send: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4z"/></svg>',
    x: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    wave: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M4 10v4M8 6v12M12 9v6M16 4v16M20 10v4"/></svg>'
  };

  function el(tag, attrs, html) { var e = document.createElement(tag); for (var k in attrs || {}) e.setAttribute(k, attrs[k]); if (html != null) e.innerHTML = html; return e; }
  function rich(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>"); }

  function build() {
    var st = el("style", {}, css); document.head.appendChild(st);
    var root = el("div", { id: "vbc" }); document.body.appendChild(root);
    var lang = (function () { try { return localStorage.getItem("vbc-lang") || "en"; } catch (e) { return "en"; } })();

    var fab = el("button", { id: "vbc-fab", type: "button", "aria-label": "Open Vectorbridge AI mentor help" }, '<span class="o">' + I.chat + '</span><span class="tx">Ask Vectorbridge AI<small>Voice · English · हिंदी · मराठी</small></span>');
    var panel = el("section", { id: "vbc-p", role: "dialog", "aria-label": "Vectorbridge AI mentor help", hidden: "" });
    panel.innerHTML =
      '<div id="vbc-h"><img src="' + LOGO + '" alt="" onerror="this.style.display=\'none\'"><div class="t"><b>Vectorbridge AI</b><span id="vbc-sub"></span></div>'
      + (Rec ? '<button type="button" id="vbc-talk" aria-label="Start voice chat">' + I.wave + '<span id="vbc-talkt"></span></button>' : "")
      + '<button type="button" class="vbc-ib" id="vbc-x" aria-label="Close">' + I.x + "</button></div>"
      + '<div id="vbc-l" role="radiogroup" aria-label="Language"><button type="button" role="radio" data-l="en">English</button><button type="button" role="radio" data-l="hi">हिंदी</button><button type="button" role="radio" data-l="mr">मराठी</button></div>'
      + '<div id="vbc-m" aria-live="polite"></div><div id="vbc-c"></div><div id="vbc-n" aria-live="polite"></div>'
      + '<form id="vbc-f"><label for="vbc-i" style="position:absolute;left:-9999px">Your question</label><input id="vbc-i" autocomplete="off">'
      + (Rec ? '<button type="button" id="vbc-mic" aria-label="Ask by voice">' + I.mic + "</button>" : "")
      + '<button type="submit" id="vbc-send" aria-label="Send">' + I.send + "</button></form>"
      + '<div id="vbc-v" hidden><div class="top"><b>Vectorbridge AI · Voice</b><button type="button" class="vbc-ib" id="vbc-vx" aria-label="End voice chat">' + I.x + "</button></div>"
      + '<button type="button" id="vbc-orb" aria-label="Start talking">' + I.bigmic + '</button><div id="vbc-st" aria-live="polite"></div><div id="vbc-hd"></div><div id="vbc-rp"></div><div id="vbc-vl" class="vbc-ls"></div><div id="vbc-vc"></div><button type="button" id="vbc-back"></button></div>';
    root.appendChild(fab); root.appendChild(panel);

    var $ = function (s) { return panel.querySelector(s); };
    var msgs = $("#vbc-m"), chips = $("#vbc-c"), input = $("#vbc-i"), note = $("#vbc-n");

    function linksHtml(keys, l) {
      if (!keys || !keys.length) return "";
      return '<div class="vbc-ls">' + keys.map(function (k) { var x = LINKS[k]; return '<a href="' + x.href + '"' + (x.href.indexOf("tel:") ? ' target="_blank" rel="noopener"' : "") + (x.wa ? ' class="wa"' : "") + ">" + x[l] + "</a>"; }).join("") + "</div>";
    }
    function add(from, text, keys, l) {
      var b = el("div", { class: "vbc-b " + from }, rich(text) + (from === "bot" ? linksHtml(keys, l || lang) : ""));
      msgs.appendChild(b); msgs.scrollTop = msgs.scrollHeight;
    }
    function setLang(l, greet) {
      lang = l; try { localStorage.setItem("vbc-lang", l); } catch (e) {}
      [].forEach.call(panel.querySelectorAll("#vbc-l button"), function (b) { b.setAttribute("aria-checked", b.dataset.l === l ? "true" : "false"); });
      $("#vbc-sub").textContent = T[l].sub; input.placeholder = T[l].ph; if ($("#vbc-talkt")) $("#vbc-talkt").textContent = T[l].talk;
      $("#vbc-back").textContent = T[l].back;
      chips.innerHTML = ""; T[l].chips.forEach(function (c) { var b = el("button", { type: "button" }, c); b.onclick = function () { ask(c); }; chips.appendChild(b); });
      var vc = $("#vbc-vc"); vc.innerHTML = ""; T[l].chips.forEach(function (c) { var b = el("button", { type: "button" }, c); b.onclick = function () { voiceAsk(c, false); }; vc.appendChild(b); });
      if (greet) add("bot", K[0].a[l], [], l);
    }
    function ask(q) {
      q = String(q || "").trim(); if (!q) return null;
      add("me", q); input.value = "";
      var r = answer(q, lang);
      if (r.lang !== lang) setLang(r.lang, false);
      add("bot", r.text, r.links, r.lang);
      return r;
    }
    input.form.onsubmit = function (e) { e.preventDefault(); stopSpeak(); ask(input.value); };
    [].forEach.call(panel.querySelectorAll("#vbc-l button"), function (b) { b.onclick = function () { if (b.dataset.l !== lang) { setLang(b.dataset.l, true); } }; });

    // one-shot mic in chat
    var micBusy = false;
    if ($("#vbc-mic")) $("#vbc-mic").onclick = function () {
      if (micBusy) return; stopSpeak();
      var r = new Rec(), fin = "", err = ""; r.lang = SPEECH[lang]; r.interimResults = true;
      r.onresult = function (e) { var it = ""; for (var i = e.resultIndex; i < e.results.length; i++) { if (e.results[i].isFinal) fin += e.results[i][0].transcript; else it += e.results[i][0].transcript; } input.value = (fin + it).trim(); };
      r.onerror = function (e) { err = e.error; };
      r.onend = function () { micBusy = false; $("#vbc-mic").classList.remove("on"); if (fin.trim()) { note.textContent = ""; ask(fin); } else note.textContent = err === "not-allowed" || err === "service-not-allowed" ? T[lang].noMic : err === "audio-capture" ? T[lang].noDevice : err === "network" ? T[lang].network : T[lang].noSpeech; };
      micBusy = true; $("#vbc-mic").classList.add("on"); note.textContent = T[lang].listening;
      try { r.start(); } catch (e) { micBusy = false; }
    };

    // hands-free voice mode
    var vRec = null, vOn = false, misses = 0;
    var orb = $("#vbc-orb"), vst = $("#vbc-st"), vhd = $("#vbc-hd"), vrp = $("#vbc-rp"), vl = $("#vbc-vl");
    function vState(s, err) { orb.className = s; vst.className = err ? "err" : ""; vst.textContent = err ? T[lang][err] : T[lang][s] || T[lang].idle; }
    function vStop() { var r = vRec; vRec = null; try { r && r.abort(); } catch (e) {} }
    function voiceAsk(q, again) {
      vStop(); stopSpeak();
      var r = ask(q); if (!r) return;
      vhd.textContent = T[r.lang].heard + ": “" + q + "”";
      vrp.innerHTML = rich(r.text); vl.innerHTML = linksHtml(r.links, r.lang).replace(/^<div class="vbc-ls">|<\/div>$/g, "");
      vState("speaking");
      speak(r.text, r.lang).then(function () { if (!vOn) return; if (again && Rec) vListen(); else vState("idle"); });
    }
    function vListen() {
      if (!Rec || !vOn) return;
      stopSpeak(); vStop();
      var r; try { r = new Rec(); } catch (e) { vState("idle", "noSupport"); return; }
      vRec = r; r.lang = SPEECH[lang]; r.interimResults = true; r.continuous = false;
      var fin = "", err = "";
      r.onresult = function (e) { var it = ""; for (var i = e.resultIndex; i < e.results.length; i++) { if (e.results[i].isFinal) fin += e.results[i][0].transcript; else it += e.results[i][0].transcript; } vhd.textContent = T[lang].heard + ": “" + (fin + it).trim() + "”"; };
      r.onerror = function (e) { err = e.error; };
      r.onend = function () {
        if (vRec !== r || !vOn) return; vRec = null;
        if (fin.trim()) { misses = 0; voiceAsk(fin.trim(), true); return; }
        if (err === "not-allowed" || err === "service-not-allowed") return vState("idle", "noMic");
        if (err === "audio-capture") return vState("idle", "noDevice");
        if (err === "network") return vState("idle", "network");
        if (err === "aborted") return vState("idle");
        if (misses++ < 1) return vListen();
        vState("idle", "noSpeech");
      };
      vState("listening");
      try { r.start(); } catch (e) { vState("idle"); }
    }
    function openVoice() {
      unlock(); vOn = true; misses = 0; $("#vbc-v").hidden = false;
      vhd.textContent = ""; vrp.innerHTML = rich(K[0].a[lang]); vl.innerHTML = "";
      vListen();
    }
    function closeVoice() { vOn = false; vStop(); stopSpeak(); $("#vbc-v").hidden = true; }
    orb.onclick = function () { if (orb.className === "listening") { vStop(); vState("idle"); } else { stopSpeak(); misses = 0; vListen(); } };
    if ($("#vbc-talk")) $("#vbc-talk").onclick = openVoice;
    $("#vbc-vx").onclick = closeVoice; $("#vbc-back").onclick = closeVoice;

    function open(voice) { fab.hidden = true; panel.hidden = false; if (!msgs.children.length) add("bot", K[0].a[lang], [], lang); if (voice && Rec) openVoice(); else setTimeout(function () { input.focus(); }, 50); }
    function close() { closeVoice(); panel.hidden = true; fab.hidden = false; }
    fab.onclick = function () { open(false); };
    $("#vbc-x").onclick = close;
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !panel.hidden) { if (!$("#vbc-v").hidden) closeVoice(); else close(); } });
    window.vbChatOpen = function (voice) { if (voice) unlock(); open(voice); };
    setLang(lang, false);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", build); else build();
})();
