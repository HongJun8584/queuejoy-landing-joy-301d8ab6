import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "ms" | "zh";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Nav
    "nav.home": "Home",
    "nav.about": "About",
    "nav.demo": "Demo",
    "nav.testimonials": "Testimonials",
    "nav.pricing": "Pricing",
    "nav.contact": "Contact",
    
    // Hero
    "hero.headline": "Enhance Experience. Build Loyalty.",
    "hero.subhead": "No app. Works with Telegram. Setup in 10 minutes. RM10/month.",
    "hero.cta.buy": "Buy Now — RM10/month",
    "hero.cta.demo": "Watch Demo",
    "hero.trust": "30-day money-back · 100+ businesses · Cancel anytime",
    "hero.benefit1": "Reduce perceived wait by up to 40%",
    "hero.benefit2": "100+ businesses trust QueueJoy",
    "hero.benefit3": "No app needed — Telegram works",
    
    // Features
    "feature1.title": "Instant Telegram Alerts",
    "feature1.subtitle": "Your customers get notified the moment their turn is near.",
    "feature1.bullet1": "No app install — works instantly on any phone.",
    "feature1.bullet2": "Reduces no-shows and crowding.",
    "feature1.bullet3": "Keeps customers calm and informed.",
    "feature1.cta": "See Telegram Demo",
    
    "feature2.title": "Live Queue Status",
    "feature2.subtitle": "Customers always know their number, position, and progress.",
    "feature2.bullet1": "Real-time sync across all screens.",
    "feature2.bullet2": "Less confusion for staff and customers.",
    "feature2.bullet3": "Works on any browser or display device.",
    "feature2.cta": "View Status Screen",
    
    "feature3.title": "Direct Announcements to Customers",
    "feature3.subtitle": "Send updates, promotions, and news straight via Telegram DM.",
    "feature3.bullet1": "Promote offers while customers wait.",
    "feature3.bullet2": "Optional ad space to earn extra revenue.",
    "feature3.bullet3": "Schedule announcements effortlessly.",
    "feature3.cta": "See Announcement Features",
    
    "feature4.title": "Enhance Customer Experience",
    "feature4.subtitle": "Optional engagement features that make waiting less painful.",
    "feature4.bullet1": "Optional mini-games (lightweight).",
    "feature4.bullet2": "Custom welcome messages.",
    "feature4.bullet3": "Audio callouts for busy venues.",
    "feature4.cta": "Preview Experience Tools",
    
    // Comparison Section
    "comparison.title": "Stop losing customers to long lines",
    "comparison.subtitle": "See the difference QueueJoy makes across industries",
    "comparison.hospital.title": "Hospitals & Clinics",
    "comparison.hospital.old": "Long waits to see a doctor. Staff manage lines manually.",
    "comparison.hospital.new": "Patients join via Telegram or kiosk. See position & wait time. Less stress and crowding.",
    "comparison.bank.title": "Banks & Service Counters",
    "comparison.bank.old": "Long lines, slow service, confusing for staff.",
    "comparison.bank.new": "One-tap 'Call Next.' Staff see last customer. Service is faster and easier.",
    "comparison.food.title": "Fast Food & Coffee Shops",
    "comparison.food.old": "Busy mornings and lunches slow orders. Customers frustrated.",
    "comparison.food.new": "Customers join virtually. Staff manage counters smoothly. Orders move faster.",
    "comparison.transport.title": "Public Transport & Events",
    "comparison.transport.old": "Crowded entrances, delays, safety risks.",
    "comparison.transport.new": "QueueJoy handles large crowds. Notifications and alerts keep flow safe and organized.",
    "comparison.old": "Old Way 👎",
    "comparison.new": "QueueJoy Way 👍",
    
    // Testimonials
    "testimonials.title": "Trusted by 100+ businesses",
    "testimonials.subtitle": "See what our customers say",
    "testimonials.1.quote": "Wait times dropped by 40%. Customers love the Telegram notifications!",
    "testimonials.1.name": "Sarah Chen",
    "testimonials.1.role": "Café Owner",
    "testimonials.2.quote": "No more crowding at registration. Patients feel safer and more informed.",
    "testimonials.2.name": "Dr. Ahmad",
    "testimonials.2.role": "Clinic Director",
    "testimonials.3.quote": "Setup took 8 minutes. Now we handle lunch rush smoothly every day.",
    "testimonials.3.name": "John Tan",
    "testimonials.3.role": "Restaurant Manager",
    
    // How It Works
    "howitworks.title": "Setup in 10 minutes",
    "howitworks.subtitle": "Start managing queues smarter today",
    "howitworks.step1.title": "1. Subscribe",
    "howitworks.step1.desc": "Choose your plan and complete payment",
    "howitworks.step2.title": "2. Setup Site",
    "howitworks.step2.desc": "Create your business slug and customize settings",
    "howitworks.step3.title": "3. Go Live",
    "howitworks.step3.desc": "Share the link with customers and start managing queues",
    
    // FAQ
    "faq.title": "Frequently Asked Questions",
    "faq.q1": "Do customers need to install an app?",
    "faq.a1": "No! QueueJoy works through Telegram, which most people already have. No downloads needed.",
    "faq.q2": "How quickly can I set this up?",
    "faq.a2": "Most businesses are live within 10 minutes. Just subscribe, create your site, and start.",
    "faq.q3": "Can I cancel anytime?",
    "faq.a3": "Yes! Cancel anytime, no long-term contracts. 30-day money-back guarantee.",
    "faq.q4": "What if I need multiple counters?",
    "faq.a4": "QueueJoy supports unlimited counters, all synced in real-time.",
    
    // Contact
    "contact.title": "Get in touch",
    "contact.subtitle": "Have questions? We're here to help",
    "contact.name": "Your name",
    "contact.email": "Your email",
    "contact.message": "Your message",
    "contact.send": "Send Message",
    
    // Footer
    "footer.tagline": "Smart queue management for modern businesses",
    "footer.links": "Quick Links",
    "footer.legal": "Legal",
    "footer.terms": "Terms of Service",
    "footer.privacy": "Privacy Policy",
  },
  ms: {
    // Nav
    "nav.home": "Laman Utama",
    "nav.about": "Tentang",
    "nav.demo": "Demo",
    "nav.testimonials": "Testimoni",
    "nav.pricing": "Harga",
    "nav.contact": "Hubungi",
    
    // Hero
    "hero.headline": "Tingkatkan Pengalaman. Bina Kesetiaan.",
    "hero.subhead": "Tanpa aplikasi. Berfungsi dengan Telegram. Persediaan 10 minit. RM10/bulan.",
    "hero.cta.buy": "Beli Sekarang — RM10/bulan",
    "hero.cta.demo": "Tonton Demo",
    "hero.trust": "Jaminan wang kembali 30 hari · 100+ perniagaan · Batal bila-bila masa",
    "hero.benefit1": "Kurangkan masa menunggu sehingga 40%",
    "hero.benefit2": "100+ perniagaan mempercayai QueueJoy",
    "hero.benefit3": "Tiada aplikasi diperlukan — Telegram berfungsi",
    
    // Features
    "feature1.title": "Makluman Telegram Segera",
    "feature1.subtitle": "Pelanggan anda dimaklumkan apabila giliran mereka hampir.",
    "feature1.bullet1": "Tanpa pemasangan aplikasi — berfungsi serta-merta.",
    "feature1.bullet2": "Mengurangkan ketidakhadiran dan kesesakan.",
    "feature1.bullet3": "Memastikan pelanggan tenang dan bermaklumat.",
    "feature1.cta": "Lihat Demo Telegram",
    
    "feature2.title": "Status Giliran Langsung",
    "feature2.subtitle": "Pelanggan sentiasa tahu nombor, kedudukan, dan kemajuan mereka.",
    "feature2.bullet1": "Sinkronisasi masa nyata di semua skrin.",
    "feature2.bullet2": "Kurang kekeliruan untuk kakitangan dan pelanggan.",
    "feature2.bullet3": "Berfungsi pada mana-mana pelayar atau peranti paparan.",
    "feature2.cta": "Lihat Skrin Status",
    
    "feature3.title": "Pengumuman Terus kepada Pelanggan",
    "feature3.subtitle": "Hantar kemas kini, promosi, dan berita terus melalui Telegram DM.",
    "feature3.bullet1": "Promosikan tawaran semasa pelanggan menunggu.",
    "feature3.bullet2": "Ruang iklan pilihan untuk pendapatan tambahan.",
    "feature3.bullet3": "Jadualkan pengumuman dengan mudah.",
    "feature3.cta": "Lihat Ciri Pengumuman",
    
    "feature4.title": "Tingkatkan Pengalaman Pelanggan",
    "feature4.subtitle": "Ciri penglibatan pilihan yang menjadikan menunggu kurang menyakitkan.",
    "feature4.bullet1": "Permainan mini pilihan (ringan).",
    "feature4.bullet2": "Mesej alu-aluan tersuai.",
    "feature4.bullet3": "Panggilan audio untuk tempat yang sibuk.",
    "feature4.cta": "Pratonton Alat Pengalaman",
    
    // Comparison Section
    "comparison.title": "Hentikan kehilangan pelanggan akibat giliran panjang",
    "comparison.subtitle": "Lihat perbezaan yang QueueJoy buat merentasi industri",
    "comparison.hospital.title": "Hospital & Klinik",
    "comparison.hospital.old": "Menunggu lama untuk berjumpa doktor. Kakitangan uruskan giliran secara manual.",
    "comparison.hospital.new": "Pesakit sertai melalui Telegram atau kiosk. Lihat kedudukan & masa menunggu. Kurang tekanan dan kesesakan.",
    "comparison.bank.title": "Bank & Kaunter Perkhidmatan",
    "comparison.bank.old": "Giliran panjang, perkhidmatan lambat, mengelirukan kakitangan.",
    "comparison.bank.new": "Satu ketukan 'Panggil Seterusnya.' Kakitangan lihat pelanggan terakhir. Perkhidmatan lebih cepat dan mudah.",
    "comparison.food.title": "Makanan Segera & Kedai Kopi",
    "comparison.food.old": "Pagi dan tengah hari sibuk perlahan pesanan. Pelanggan kecewa.",
    "comparison.food.new": "Pelanggan sertai secara maya. Kakitangan urus kaunter dengan lancar. Pesanan bergerak lebih cepat.",
    "comparison.transport.title": "Pengangkutan Awam & Acara",
    "comparison.transport.old": "Pintu masuk sesak, kelewatan, risiko keselamatan.",
    "comparison.transport.new": "QueueJoy kendalikan orang ramai. Pemberitahuan dan makluman menjaga aliran selamat dan teratur.",
    "comparison.old": "Cara Lama 👎",
    "comparison.new": "Cara QueueJoy 👍",
    
    // Testimonials
    "testimonials.title": "Dipercayai oleh 100+ perniagaan",
    "testimonials.subtitle": "Lihat apa kata pelanggan kami",
    "testimonials.1.quote": "Masa menunggu turun 40%. Pelanggan suka pemberitahuan Telegram!",
    "testimonials.1.name": "Sarah Chen",
    "testimonials.1.role": "Pemilik Kafe",
    "testimonials.2.quote": "Tiada lagi kesesakan di pendaftaran. Pesakit rasa lebih selamat dan bermaklumat.",
    "testimonials.2.name": "Dr. Ahmad",
    "testimonials.2.role": "Pengarah Klinik",
    "testimonials.3.quote": "Persediaan ambil 8 minit. Kini kami kendalikan rush tengah hari dengan lancar setiap hari.",
    "testimonials.3.name": "John Tan",
    "testimonials.3.role": "Pengurus Restoran",
    
    // How It Works
    "howitworks.title": "Persediaan dalam 10 minit",
    "howitworks.subtitle": "Mula urus giliran dengan lebih bijak hari ini",
    "howitworks.step1.title": "1. Langgan",
    "howitworks.step1.desc": "Pilih pelan anda dan lengkapkan pembayaran",
    "howitworks.step2.title": "2. Sediakan Laman",
    "howitworks.step2.desc": "Cipta slug perniagaan anda dan sesuaikan tetapan",
    "howitworks.step3.title": "3. Mulakan",
    "howitworks.step3.desc": "Kongsi pautan dengan pelanggan dan mula urus giliran",
    
    // FAQ
    "faq.title": "Soalan Lazim",
    "faq.q1": "Adakah pelanggan perlu memasang aplikasi?",
    "faq.a1": "Tidak! QueueJoy berfungsi melalui Telegram, yang kebanyakan orang sudah ada. Tiada muat turun diperlukan.",
    "faq.q2": "Berapa cepat saya boleh sediakan ini?",
    "faq.a2": "Kebanyakan perniagaan hidup dalam 10 minit. Hanya langgan, cipta laman anda, dan mulakan.",
    "faq.q3": "Bolehkah saya batal bila-bila masa?",
    "faq.a3": "Ya! Batal bila-bila masa, tiada kontrak jangka panjang. Jaminan wang kembali 30 hari.",
    "faq.q4": "Bagaimana jika saya perlukan beberapa kaunter?",
    "faq.a4": "QueueJoy menyokong kaunter tanpa had, semua disegerakkan masa nyata.",
    
    // Contact
    "contact.title": "Hubungi kami",
    "contact.subtitle": "Ada soalan? Kami di sini untuk membantu",
    "contact.name": "Nama anda",
    "contact.email": "E-mel anda",
    "contact.message": "Mesej anda",
    "contact.send": "Hantar Mesej",
    
    // Footer
    "footer.tagline": "Pengurusan giliran pintar untuk perniagaan moden",
    "footer.links": "Pautan Pantas",
    "footer.legal": "Undang-undang",
    "footer.terms": "Terma Perkhidmatan",
    "footer.privacy": "Dasar Privasi",
  },
  zh: {
    // Nav
    "nav.home": "首页",
    "nav.about": "关于",
    "nav.demo": "演示",
    "nav.testimonials": "推荐",
    "nav.pricing": "价格",
    "nav.contact": "联系",
    
    // Hero
    "hero.headline": "提升体验。建立忠诚度。",
    "hero.subhead": "无需应用。通过Telegram运行。10分钟设置。RM10/月。",
    "hero.cta.buy": "立即购买 — RM10/月",
    "hero.cta.demo": "观看演示",
    "hero.trust": "30天退款保证 · 100+企业 · 随时取消",
    "hero.benefit1": "减少等待时间达40%",
    "hero.benefit2": "100+企业信赖QueueJoy",
    "hero.benefit3": "无需应用 — Telegram即可使用",
    
    // Features
    "feature1.title": "即时Telegram提醒",
    "feature1.subtitle": "客户在轮到时立即收到通知。",
    "feature1.bullet1": "无需安装应用 — 即刻运行。",
    "feature1.bullet2": "减少缺席和拥挤。",
    "feature1.bullet3": "让客户保持冷静和知情。",
    "feature1.cta": "查看Telegram演示",
    
    "feature2.title": "实时队列状态",
    "feature2.subtitle": "客户始终了解他们的号码、位置和进度。",
    "feature2.bullet1": "所有屏幕实时同步。",
    "feature2.bullet2": "减少员工和客户的困惑。",
    "feature2.bullet3": "适用于任何浏览器或显示设备。",
    "feature2.cta": "查看状态屏幕",
    
    "feature3.title": "直接向客户发布公告",
    "feature3.subtitle": "通过Telegram DM直接发送更新、促销和新闻。",
    "feature3.bullet1": "在客户等待时推广优惠。",
    "feature3.bullet2": "可选广告空间以获得额外收入。",
    "feature3.bullet3": "轻松安排公告。",
    "feature3.cta": "查看公告功能",
    
    "feature4.title": "提升客户体验",
    "feature4.subtitle": "可选的互动功能，让等待不再痛苦。",
    "feature4.bullet1": "可选迷你游戏（轻量级）。",
    "feature4.bullet2": "自定义欢迎消息。",
    "feature4.bullet3": "为繁忙场所提供音频呼叫。",
    "feature4.cta": "预览体验工具",
    
    // Comparison Section
    "comparison.title": "停止因长队而失去客户",
    "comparison.subtitle": "看看QueueJoy在各行业中的不同",
    "comparison.hospital.title": "医院和诊所",
    "comparison.hospital.old": "长时间等待看医生。员工手动管理队伍。",
    "comparison.hospital.new": "患者通过Telegram或自助终端加入。查看位置和等待时间。减少压力和拥挤。",
    "comparison.bank.title": "银行和服务柜台",
    "comparison.bank.old": "长队，服务慢，员工困惑。",
    "comparison.bank.new": "一键'呼叫下一个'。员工看到最后一位客户。服务更快更容易。",
    "comparison.food.title": "快餐和咖啡店",
    "comparison.food.old": "早上和午餐忙碌减慢订单。客户沮丧。",
    "comparison.food.new": "客户虚拟加入。员工顺利管理柜台。订单移动更快。",
    "comparison.transport.title": "公共交通和活动",
    "comparison.transport.old": "拥挤的入口，延误，安全风险。",
    "comparison.transport.new": "QueueJoy处理大量人群。通知和警报保持流动安全有序。",
    "comparison.old": "旧方法 👎",
    "comparison.new": "QueueJoy方式 👍",
    
    // Testimonials
    "testimonials.title": "受100+企业信赖",
    "testimonials.subtitle": "看看我们的客户怎么说",
    "testimonials.1.quote": "等待时间减少40%。客户喜欢Telegram通知！",
    "testimonials.1.name": "Sarah Chen",
    "testimonials.1.role": "咖啡馆老板",
    "testimonials.2.quote": "注册处不再拥挤。患者感到更安全和知情。",
    "testimonials.2.name": "Dr. Ahmad",
    "testimonials.2.role": "诊所主任",
    "testimonials.3.quote": "设置只需8分钟。现在我们每天顺利处理午餐高峰。",
    "testimonials.3.name": "John Tan",
    "testimonials.3.role": "餐厅经理",
    
    // How It Works
    "howitworks.title": "10分钟内设置",
    "howitworks.subtitle": "今天开始更智能地管理队列",
    "howitworks.step1.title": "1. 订阅",
    "howitworks.step1.desc": "选择您的计划并完成付款",
    "howitworks.step2.title": "2. 设置网站",
    "howitworks.step2.desc": "创建您的业务slug并自定义设置",
    "howitworks.step3.title": "3. 上线",
    "howitworks.step3.desc": "与客户分享链接并开始管理队列",
    
    // FAQ
    "faq.title": "常见问题",
    "faq.q1": "客户需要安装应用程序吗？",
    "faq.a1": "不需要！QueueJoy通过Telegram工作，大多数人已经拥有。无需下载。",
    "faq.q2": "我能多快设置这个？",
    "faq.a2": "大多数企业在10分钟内上线。只需订阅，创建您的网站，然后开始。",
    "faq.q3": "我可以随时取消吗？",
    "faq.a3": "是的！随时取消，无长期合同。30天退款保证。",
    "faq.q4": "如果我需要多个柜台怎么办？",
    "faq.a4": "QueueJoy支持无限柜台，全部实时同步。",
    
    // Contact
    "contact.title": "联系我们",
    "contact.subtitle": "有问题吗？我们在这里帮助",
    "contact.name": "您的姓名",
    "contact.email": "您的电子邮件",
    "contact.message": "您的留言",
    "contact.send": "发送消息",
    
    // Footer
    "footer.tagline": "现代企业的智能队列管理",
    "footer.links": "快速链接",
    "footer.legal": "法律",
    "footer.terms": "服务条款",
    "footer.privacy": "隐私政策",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
};
