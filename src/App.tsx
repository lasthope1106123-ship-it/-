/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useSpring, AnimatePresence } from "motion/react";
import { 
  ChevronRight, 
  Users, 
  Lightbulb, 
  ShieldCheck, 
  ArrowRight, 
  BookOpen, 
  FileText, 
  Mail, 
  Phone, 
  Globe,
  Instagram,
  Music2,
  Menu,
  X,
  Target,
  Award
} from "lucide-react";
import { useState, useEffect } from "react";

const ARTICLES_DATA: any[] = [];

const LANGUAGES = [
  { code: "th", label: "ไทย", flag: "🇹🇭" },
  { code: "en", label: "EN", flag: "🇺🇸" },
  { code: "zh", label: "中文", flag: "🇨🇳" },
  { code: "ja", label: "日本語", flag: "🇯🇵" },
];

const TRANSLATIONS: Record<string, any> = {
  th: {
    name: "พรรคชาติเสรี",
    tagline: "ก้าวไปข้างหน้าด้วยปัญญาและความหวัง",
    heroTitle: "พรรคชาติเสรี เพื่ออนาคตที่โปร่งใสของคนไทย",
    heroDesc: "เราเชื่อในพลังของประชาชน รากฐานที่แข็งแกร่ง และการบริหารงานที่ตรวจสอบได้ เพื่อสร้างชาติที่เสรีและมั่นคงอย่างยั่งยืน",
    joinBtn: "สมัครสมาชิกพรรค",
    policyBtn: "อ่านนโยบายของเรา",
    visionTitle: "วิสัยทัศน์ของเรา",
    visionDesc: "พรรคชาติเสรี ก่อตั้งขึ้นเมื่อวันที่ 5 มกราคม พ.ศ. 2569 โดยมีเป้าหมายหลักในการปฏิรูปโครงสร้างการบริหารงานของประเทศ เน้นความโปร่งใสและการมีส่วนร่วมของประชาชนเป็นหัวใจสำคัญ",
    wisdom: "ปัญญา",
    wisdomDesc: "ใช้ความรู้และนวัตกรรมในการแก้ปัญหาชาติ",
    transparency: "ความโปร่งใส",
    transparencyDesc: "ทุกการตัดสินใจต้องตรวจสอบได้และเปิดเผยต่อสาธารณะ",
    hope: "ความหวัง",
    hopeDesc: "สร้างรากฐานที่มั่นคงเพื่อให้คนไทยทุกคนมีโอกาสที่เท่าเทียม",
    logoTitle: "ความหมายแห่งตราสัญลักษณ์",
    logoDesc: "สัญลักษณ์ที่สะท้อนถึงอุดมการณ์และทิศทางที่เราจะมุ่งไป",
    blueCircle: "วงกลมสีน้ำเงิน",
    blueCircleDesc: "สื่อถึงความมุ่งมั่น ความเป็นน้ำหนึ่งใจเดียวกัน และการขับเคลื่อนประเทศไปข้างหน้าอย่างมีเสถียรภาพ",
    whiteText: "ตัวอักษรสีขาว",
    whiteTextDesc: "คือความบริสุทธิ์ ความโปร่งใส และการยึดมั่นในความถูกต้องในการทำงานเพื่อประชาชน",
    articlesTitle: "บทความและแนวคิด",
    articlesBy: "โดย พณพญา อุรบุญนวลชาติ และคณะทำงาน",
    viewAll: "ดูบทความทั้งหมด",
    policyTitle: "นโยบายของพรรค",
    comingSoon: "กำลังดำเนินการ (Coming Soon)",
    policyWait: "คณะทำงานนโยบายกำลังรวบรวมข้อมูลและรับฟังความคิดเห็นจากภาคส่วนต่างๆ เพื่อจัดทำนโยบายที่ตอบโจทย์ความต้องการของประชาชนอย่างแท้จริง",
    subscribeBtn: "รับข่าวสารนโยบาย",
    foundersTitle: "สมาชิกและแกนนำพรรค",
    foundersDesc: "เครือข่ายสมาชิกพรรคกว่า 18 ท่าน นำโดย 5 แกนนำหลักผู้มุ่งมั่นขับเคลื่อนนโยบายเพื่อประชาชน",
    historyTitle: "ร่วมสร้างประวัติศาสตร์ ไปกับพรรคชาติเสรี",
    historyDesc: "เสียงของคุณคือพลังสำคัญในการขับเคลื่อนประเทศ สมัครสมาชิกวันนี้เพื่อร่วมกำหนดทิศทางของชาติ",
    footerDesc: "มุ่งมั่นสร้างชาติด้วยปัญญา ความโปร่งใส และความหวัง เพื่อคุณภาพชีวิตที่ดีขึ้นของคนไทยทุกคน",
    menu: "เมนู",
    home: "หน้าแรก",
    joinUs: "สมัครสมาชิก",
    location: "กรุงเทพมหานคร, ประเทศไทย",
    leaders: [
      { name: "คุณโอฬาร์", role: "หัวหน้าพรรค / ผู้ร่วมก่อตั้ง", desc: "เป็นผู้นำในการกำหนดทิศทางและนโยบายหลักของพรรค มุ่งเน้นการบริหารงานที่โปร่งใสและตรวจสอบได้" },
      { name: "คุณพญา", role: "หัวหน้าพรรค / ผู้ร่วมก่อตั้ง", desc: "ร่วมขับเคลื่อนอุดมการณ์ของพรรค พร้อมผลักดันนโยบายเพื่อการพัฒนาคุณภาพชีวิตของประชาชน" },
      { name: "คุณธิเบต", role: "รองหัวหน้าพรรค", desc: "สนับสนุนการดำเนินงานของพรรคในทุกมิติ และเป็นกำลังสำคัญในการประสานงานกับภาคส่วนต่างๆ" },
      { name: "คุณตูน", role: "จัดการตรวจสอบ 3 จังหวัดชายแดนภาคใต้", desc: "ดูแลและตรวจสอบการดำเนินงานในพื้นที่ชายแดนใต้ เพื่อส่งเสริมสันติภาพและการพัฒนาที่ยั่งยืน" },
      { name: "คุณเป๋า", role: "จัดการงานออกแบบและสื่อสิ่งพิมพ์", desc: "รับผิดชอบการสื่อสารภาพลักษณ์ของพรรคผ่านงานออกแบบและสื่อต่างๆ เพื่อให้เข้าถึงประชาชนอย่างมีประสิทธิภาพ" }
    ],
    policies: [
      { title: "เศรษฐกิจก้าวหน้า", desc: "ส่งเสริมการลงทุน นวัตกรรม และเทคโนโลยี เพื่อยกระดับรายได้และสร้างการเติบโตทางเศรษฐกิจอย่างยั่งยืน" },
      { title: "ลดมลพิษด้วยยุค EV", desc: "สนับสนุนการใช้ยานยนต์ไฟฟ้าและพลังงานสะอาด เพื่อแก้ปัญหาฝุ่น PM 2.5 และลดการปล่อยก๊าซเรือนกระจก" },
      { title: "การเมือง", desc: "สร้างระบบการเมืองที่โปร่งใส ตรวจสอบได้ และเปิดโอกาสให้ประชาชนมีส่วนร่วมในการตัดสินใจอย่างแท้จริง" },
      { title: "ปฏิรูปกองทัพ", desc: "ปรับปรุงโครงสร้างกองทัพให้ทันสมัย โปร่งใส และสอดคล้องกับหลักการประชาธิปไตย" },
      { title: "การศึกษาดี", desc: "พัฒนาหลักสูตรการศึกษาให้ทันโลก ลดความเหลื่อมล้ำ และเน้นทักษะที่นำไปใช้ได้จริงในชีวิตและการทำงาน" },
      { title: "ความสะอาด", desc: "ยกระดับการจัดการขยะและสิ่งแวดล้อมในชุมชน เพื่อสุขอนามัยและคุณภาพชีวิตที่ดีของประชาชน" },
      { title: "การต่อรองกับเอกชน", desc: "สร้างมาตรฐานการทำสัญญารัฐและเอกชนที่โปร่งใส เป็นธรรม และรักษาผลประโยชน์สูงสุดของประเทศ" },
      { title: "สวัสดิการไทยใหม่", desc: "ปรับปรุงระบบสวัสดิการแห่งรัฐให้ครอบคลุม ลดความเหลื่อมล้ำ และดูแลประชาชนทุกช่วงวัยอย่างเหมาะสม" },
      { title: "ไทยนิยม", desc: "ส่งเสริมศิลปวัฒนธรรมและภูมิปัญญาไทยให้เป็น Soft Power ที่สร้างมูลค่าทางเศรษฐกิจในระดับสากล" },
      { title: "เกษตรกรยุคดิจิทัล", desc: "นำเทคโนโลยีและข้อมูลมาช่วยเพิ่มผลผลิต ลดต้นทุน และยกระดับคุณภาพชีวิตเกษตรกรไทย" },
      { title: "กระจายอำนาจ", desc: "คืนอำนาจและงบประมาณสู่ท้องถิ่น เพื่อให้ชุมชนสามารถจัดการและพัฒนาพื้นที่ของตนเองได้อย่างมีประสิทธิภาพ" },
      { title: "คมนาคมก้าวหน้า", desc: "พัฒนาระบบขนส่งสาธารณะให้ครอบคลุม สะดวก ปลอดภัย และมีราคาที่เข้าถึงได้สำหรับทุกคน" },
      { title: "สวัสดิการชนเผ่า", desc: "คุ้มครองสิทธิ ส่งเสริมคุณภาพชีวิต และรักษาอัตลักษณ์ทางวัฒนธรรมของกลุ่มชาติพันธุ์อย่างเท่าเทียม" }
    ]
  },
  en: {
    name: "Chart Seri Party",
    tagline: "Moving forward with wisdom and hope",
    heroTitle: "Chart Seri Party: For a Transparent Future for All Thais",
    heroDesc: "We believe in the power of the people, strong foundations, and accountable governance to build a free and sustainably stable nation.",
    joinBtn: "Join the Party",
    policyBtn: "Read Our Policies",
    visionTitle: "Our Vision",
    visionDesc: "Founded on January 5, 2026, the Chart Seri Party aims to reform the country's administrative structure, with transparency and public participation at its heart.",
    wisdom: "Wisdom",
    wisdomDesc: "Applying knowledge and innovation to solve national challenges.",
    transparency: "Transparency",
    transparencyDesc: "Ensuring every decision is verifiable and open to the public.",
    hope: "Hope",
    hopeDesc: "Building a solid foundation to provide equal opportunities for all Thais.",
    logoTitle: "The Meaning Behind Our Logo",
    logoDesc: "A symbol that reflects our ideology and the path forward.",
    blueCircle: "The Blue Circle",
    blueCircleDesc: "Represents determination, unity, and the steady advancement of our nation.",
    whiteText: "The White Letters",
    whiteTextDesc: "Signifies purity, transparency, and an unwavering commitment to integrity in serving the people.",
    articlesTitle: "Articles & Perspectives",
    articlesBy: "By Panpaya Urubunnuanchat and the Working Committee",
    viewAll: "View All Articles",
    policyTitle: "Our Policies",
    comingSoon: "In Development (Coming Soon)",
    policyWait: "Our policy committee is actively gathering data and listening to public feedback to craft policies that truly address the needs of the people.",
    subscribeBtn: "Subscribe for Policy Updates",
    foundersTitle: "Party Members & Core Leaders",
    foundersDesc: "A network of 18 party members, led by 5 core leaders dedicated to driving policies for the people.",
    historyTitle: "Make History with the Chart Seri Party",
    historyDesc: "Your voice is the driving force of our nation. Join us today to help shape the future of Thailand.",
    footerDesc: "Dedicated to building the nation with wisdom, transparency, and hope, ensuring a better quality of life for all Thais.",
    menu: "Menu",
    home: "Home",
    joinUs: "Join Us",
    location: "Bangkok, Thailand",
    leaders: [
      { name: "Mr. Olan", role: "Party Leader / Co-Founder", desc: "Leads the strategic direction and core policies of the party, focusing on transparent and accountable governance." },
      { name: "Mr. Phaya", role: "Party Leader / Co-Founder", desc: "Co-drives the party's ideology and pushes forward policies aimed at improving the quality of life for citizens." },
      { name: "Mr. Tibet", role: "Deputy Party Leader", desc: "Supports party operations across all dimensions and serves as a key coordinator with various sectors." },
      { name: "Mr. Toon", role: "Inspector General for the 3 Southern Border Provinces", desc: "Oversees and monitors operations in the southern border region to promote peace and sustainable development." },
      { name: "Mr. Pao", role: "Head of Design and Publications", desc: "Manages the party's visual communication and media to effectively engage and connect with the public." }
    ],
    policies: [
      { title: "Progressive Economy", desc: "Promote investment, innovation, and technology to raise incomes and create sustainable economic growth." },
      { title: "EV Era Pollution Reduction", desc: "Support electric vehicles and clean energy to tackle PM 2.5 and reduce greenhouse gas emissions." },
      { title: "Politics", desc: "Build a transparent, accountable political system that truly allows public participation in decision-making." },
      { title: "Military Reform", desc: "Modernize the military structure to be transparent and aligned with democratic principles." },
      { title: "Quality Education", desc: "Develop modern curricula, reduce inequality, and focus on practical skills for life and work." },
      { title: "Cleanliness", desc: "Upgrade waste management and community environments for better hygiene and public health." },
      { title: "Private Sector Negotiation", desc: "Establish transparent and fair standards for public-private contracts to protect national interests." },
      { title: "New Thai Welfare", desc: "Improve state welfare to be comprehensive, reduce inequality, and support citizens across all age groups." },
      { title: "Thai Identity (Soft Power)", desc: "Promote Thai arts, culture, and wisdom as Soft Power to generate economic value globally." },
      { title: "Digital Era Farmers", desc: "Utilize technology and data to increase yields, reduce costs, and improve the livelihoods of Thai farmers." },
      { title: "Decentralization", desc: "Return power and budget to local governments, empowering communities to manage and develop their own areas effectively." },
      { title: "Progressive Transportation", desc: "Develop a comprehensive, convenient, safe, and affordable public transportation system for all." },
      { title: "Indigenous Welfare", desc: "Protect the rights, improve the quality of life, and preserve the cultural identity of ethnic groups equally." }
    ]
  },
  zh: {
    name: "查特塞里党",
    tagline: "以智慧与希望，阔步前行",
    heroTitle: "查特塞里党：共创泰国透明未来",
    heroDesc: "我们坚信人民的力量、稳固的根基与问责制治理，致力于建设一个自由且长治久安的国家。",
    joinBtn: "加入本党",
    policyBtn: "了解我们的政策",
    visionTitle: "我们的愿景",
    visionDesc: "查特塞里党成立于2026年1月5日，其核心目标是改革国家行政结构，将透明度和公众参与置于首位。",
    wisdom: "智慧",
    wisdomDesc: "运用知识与创新解决国家难题。",
    transparency: "透明",
    transparencyDesc: "确保每一项决策都公开透明、有迹可循。",
    hope: "希望",
    hopeDesc: "筑牢根基，为所有泰国人创造平等的机遇。",
    logoTitle: "党徽释义",
    logoDesc: "彰显本党理念与未来方向的象征。",
    blueCircle: "蓝色圆环",
    blueCircleDesc: "象征着决心、团结，以及推动国家稳步前行的力量。",
    whiteText: "白色字样",
    whiteTextDesc: "代表着纯洁、透明，以及为民服务时坚守的正道。",
    articlesTitle: "文章与观点",
    articlesBy: "作者：Panpaya Urubunnuanchat 及工作团队",
    viewAll: "查看所有文章",
    policyTitle: "本党政策",
    comingSoon: "正在制定中 (敬请期待)",
    policyWait: "政策委员会正在广泛收集数据并倾听各界意见，以制定真正符合民众需求的政策。",
    subscribeBtn: "订阅政策动态",
    foundersTitle: "政党成员与核心领导",
    foundersDesc: "由18名政党成员组成的网络，在5位核心领导的带领下，致力于为人民推动政策。",
    historyTitle: "与查特塞里党共创历史",
    historyDesc: "您的声音是推动国家前行的核心力量。立即加入我们，共同决定国家的未来方向。",
    footerDesc: "致力于以智慧、透明与希望建设国家，全面提升全体泰国人民的生活福祉。",
    menu: "菜单",
    home: "首页",
    joinUs: "加入我们",
    location: "泰国 曼谷",
    leaders: [
      { name: "奥兰 (Olan)", role: "党魁 / 联合创始人", desc: "领导政党的战略方向和核心政策，致力于透明和负责任的治理。" },
      { name: "帕雅 (Phaya)", role: "党魁 / 联合创始人", desc: "共同推动政党理念，积极推进旨在改善公民生活质量的政策。" },
      { name: "提贝 (Tibet)", role: "副党魁", desc: "全方位支持政党运作，并作为与各界沟通的关键协调人。" },
      { name: "敦 (Toon)", role: "泰南三府视察专员", desc: "负责监督和管理南部边境地区的事务，以促进和平与可持续发展。" },
      { name: "保 (Pao)", role: "设计与出版主管", desc: "负责政党的视觉传达和媒体工作，以确保与公众的有效沟通。" }
    ],
    policies: [
      { title: "进步经济", desc: "促进投资、创新和技术发展，以提高收入并创造可持续的经济增长。" },
      { title: "电动车时代减排", desc: "支持电动汽车和清洁能源，以解决PM 2.5问题并减少温室气体排放。" },
      { title: "政治", desc: "建立一个透明、问责的政治体系，真正允许公众参与决策。" },
      { title: "军队改革", desc: "实现军队结构现代化，使其透明并符合民主原则。" },
      { title: "优质教育", desc: "开发与时俱进的课程，减少不平等，注重生活和工作的实用技能。" },
      { title: "清洁卫生", desc: "升级废物管理和社区环境，以改善公共卫生和生活质量。" },
      { title: "私营部门谈判", desc: "建立透明公平的公私合同标准，以保护国家利益。" },
      { title: "泰国新福利", desc: "完善国家福利体系，使其全面覆盖，减少不平等，并为各年龄段的公民提供支持。" },
      { title: "泰国特色 (软实力)", desc: "推广泰国艺术、文化和智慧作为软实力，在全球范围内创造经济价值。" },
      { title: "数字时代农民", desc: "利用技术和数据提高产量、降低成本，并改善泰国农民的生活。" },
      { title: "权力下放", desc: "将权力和预算交还给地方政府，赋予社区有效管理和发展自身区域的能力。" },
      { title: "进步交通", desc: "发展全面、便捷、安全且人人都能负担得起的公共交通系统。" },
      { title: "原住民福利", desc: "平等保护少数民族的权利，改善他们的生活质量，并保护其文化认同。" }
    ]
  },
  ja: {
    name: "チャートセーリー党",
    tagline: "知恵と希望を胸に、前へ",
    heroTitle: "チャートセーリー党：タイ国民の透明な未来のために",
    heroDesc: "私たちは、人々の力、強固な基盤、そして透明性のある国政運営を信じ、自由で持続可能な安定した国家の構築を目指します。",
    joinBtn: "入党する",
    policyBtn: "政策を見る",
    visionTitle: "私たちのビジョン",
    visionDesc: "2026年1月5日に結党されたチャートセーリー党は、透明性と国民の政治参加を中核に据え、国の行政構造の改革を目指しています。",
    wisdom: "知恵",
    wisdomDesc: "知識とイノベーションを活用し、国家の課題を解決します。",
    transparency: "透明性",
    transparencyDesc: "すべての意思決定プロセスを公開し、検証可能にします。",
    hope: "希望",
    hopeDesc: "強固な基盤を築き、すべてのタイ国民に平等な機会を提供します。",
    logoTitle: "党のシンボル（ロゴ）の意味",
    logoDesc: "私たちの理念と進むべき道を示すシンボル。",
    blueCircle: "青い円",
    blueCircleDesc: "決意と団結、そして国を安定して前進させる原動力を象徴しています。",
    whiteText: "白い文字",
    whiteTextDesc: "純粋さ、透明性、そして国民のために尽くす誠実さを表しています。",
    articlesTitle: "記事と視点",
    articlesBy: "執筆：Panpaya Urubunnuanchat およびワーキングチーム",
    viewAll: "すべての記事を見る",
    policyTitle: "党の政策",
    comingSoon: "策定中 (近日公開)",
    policyWait: "政策委員会は、国民の皆様の真のニーズに応える政策を策定するため、現在データ収集と意見聴取を行っております。",
    subscribeBtn: "政策の最新情報を受け取る",
    foundersTitle: "党員および中核リーダー",
    foundersDesc: "18名の党員ネットワーク。国民のための政策を推進する5名の中核リーダーが率いています。",
    historyTitle: "チャートセーリー党と共に歴史を創ろう",
    historyDesc: "あなたの声は国を動かす大きな力です。今すぐ入党し、共に国の未来を築きましょう。",
    footerDesc: "知恵、透明性、そして希望をもって国作りに専念し、すべてのタイ国民の生活の質向上に尽力します。",
    menu: "メニュー",
    home: "ホーム",
    joinUs: "参加する",
    location: "タイ バンコク",
    leaders: [
      { name: "オラーン (Olan)", role: "党首 / 共同創設者", desc: "党の戦略的方針と主要政策を主導し、透明で説明責任のあるガバナンスに注力します。" },
      { name: "パヤー (Phaya)", role: "党首 / 共同創設者", desc: "党の理念を共同で推進し、市民の生活の質を向上させるための政策を推進します。" },
      { name: "チベット (Tibet)", role: "副党首", desc: "党の運営をあらゆる側面からサポートし、各部門との重要な調整役を務めます。" },
      { name: "トゥーン (Toon)", role: "南部国境3県担当監査官", desc: "平和と持続可能な開発を促進するため、南部国境地域での活動を監督・管理します。" },
      { name: "パオ (Pao)", role: "デザイン・出版責任者", desc: "党の視覚的コミュニケーションとメディアを管理し、国民との効果的なつながりを構築します。" }
    ],
    policies: [
      { title: "進歩的な経済", desc: "投資、イノベーション、技術を促進し、所得を向上させ、持続可能な経済成長を生み出します。" },
      { title: "EV時代の汚染削減", desc: "電気自動車とクリーンエネルギーを支援し、PM2.5問題に取り組み、温室効果ガスの排出を削減します。" },
      { title: "政治", desc: "透明性があり、説明責任を果たし、国民が意思決定に真に参加できる政治システムを構築します。" },
      { title: "軍の改革", desc: "軍の構造を近代化し、透明性を持たせ、民主主義の原則に沿ったものにします。" },
      { title: "質の高い教育", desc: "現代的なカリキュラムを開発し、不平等を減らし、生活や仕事のための実践的なスキルに焦点を当てます。" },
      { title: "清潔さ", desc: "廃棄物管理と地域環境を向上させ、公衆衛生と生活の質を改善します。" },
      { title: "民間部門との交渉", desc: "国益を保護するために、透明で公正な官民契約の基準を確立します。" },
      { title: "新しいタイの福祉", desc: "国家福祉を包括的なものに改善し、不平等を減らし、すべての年齢層の市民を支援します。" },
      { title: "タイのアイデンティティ（ソフトパワー）", desc: "タイの芸術、文化、知恵をソフトパワーとして推進し、世界的に経済価値を生み出します。" },
      { title: "デジタル時代の農家", desc: "技術とデータを活用して収穫量を増やし、コストを削減し、タイの農家の生活を向上させます。" },
      { title: "地方分権", desc: "権限と予算を地方自治体に返還し、地域社会が自らの地域を効果的に管理・発展できるようにします。" },
      { title: "進歩的な交通", desc: "包括的で、便利で、安全で、誰もが利用できる公共交通機関を開発します。" },
      { title: "先住民族の福祉", desc: "少数民族の権利を保護し、生活の質を向上させ、文化的アイデンティティを平等に保護します。" }
    ]
  }
};

const COLORS = {
  primary: "#0F172A", // Deep Navy
  secondary: "#2563EB", // Blue
  accent: "#1D4ED8", // Dark Blue
  bg: "#F8FAFC",
  text: "#1E293B"
};

const SECTIONS = [
  { id: "hero", label: "หน้าแรก" },
  { id: "about", label: "เกี่ยวกับพรรค" },
  { id: "logo", label: "ความหมายโลโก้" },
  { id: "policies", label: "นโยบาย" },
  { id: "founders", label: "ผู้ก่อตั้ง" },
  { id: "articles", label: "บทความ" },
  { id: "membership", label: "สมัครสมาชิก" },
];

const PartyLogo = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="50" fill="#1D4ED8" />
    <text x="50%" y="56%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="46" fontWeight="900" fontFamily="'FC Iconic', 'Prompt', sans-serif" letterSpacing="-1.5">ชสร</text>
  </svg>
);

export default function App() {
  const [lang, setLang] = useState("th");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isMobileLangOpen, setIsMobileLangOpen] = useState(false);
  
  const t = (key: string) => TRANSLATIONS[lang as keyof typeof TRANSLATIONS][key as keyof typeof TRANSLATIONS["th"]] || key;

  const SECTIONS = [
    { id: "hero", label: t("home") },
    { id: "about", label: t("visionTitle") },
    { id: "logo", label: t("logoTitle") },
    { id: "policies", label: t("policyTitle") },
    { id: "founders", label: t("foundersTitle") },
    { id: "articles", label: t("articlesTitle") },
    { id: "membership", label: t("joinUs") },
  ];

  useEffect(() => {
    const sectionIds = ["hero", "about", "logo", "policies", "founders", "articles", "membership"];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen font-sans text-slate-900 bg-slate-50 selection:bg-blue-200">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-600 origin-left z-[100]"
        style={{ scaleX }}
      />

      {/* Responsive Floating Navigation */}
      <>
        {/* Desktop: Side Dots */}
        <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-5">
          {SECTIONS.map((section, i) => (
            <button
              key={`desktop-nav-${section.id}`}
              onClick={() => scrollTo(section.id)}
              className="group relative flex items-center justify-end w-8 h-8"
              aria-label={section.label}
            >
              <span className={`absolute right-10 px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg transition-all duration-300 pointer-events-none whitespace-nowrap ${
                activeSection === section.id 
                  ? "opacity-100 translate-x-0" 
                  : "opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0"
              }`}>
                {section.label}
              </span>
              <div className={`w-2.5 h-2.5 rounded-full transition-all duration-300 shadow-sm ${
                activeSection === section.id 
                  ? "bg-blue-600 scale-150" 
                  : "bg-slate-300 group-hover:bg-blue-400 group-hover:scale-125"
              }`} />
            </button>
          ))}
        </div>

        {/* Mobile/Tablet: Bottom Bar */}
        <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white/95 backdrop-blur-xl border-t border-slate-200 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] pb-[env(safe-area-inset-bottom)]">
          <div className="flex overflow-x-auto thin-scrollbar px-4 py-3 sm:py-4 gap-2 snap-x">
            {SECTIONS.map((section) => (
              <button
                key={`mobile-nav-${section.id}`}
                onClick={() => scrollTo(section.id)}
                className={`snap-center whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                  activeSection === section.id
                    ? "bg-blue-600 text-white shadow-md scale-105"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center cursor-pointer hover:scale-105 transition-transform duration-300" onClick={() => scrollTo("logo")}>
              <PartyLogo className="w-12 h-12 md:w-14 md:h-14 drop-shadow-md" />
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-6">
              {/* Language Switcher */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-full border border-slate-200">
                {LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => setLang(l.code)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${
                      lang === l.code 
                        ? "bg-white text-slate-900 shadow-sm scale-105" 
                        : "text-slate-500 hover:text-slate-700 hover:bg-white/50"
                    }`}
                  >
                    <span>{l.flag}</span>
                    <span>{l.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile/Tablet Actions */}
            <div className="lg:hidden flex items-center relative">
              <button 
                onClick={() => setIsMobileLangOpen(!isMobileLangOpen)}
                className="p-2 bg-slate-100 text-slate-700 rounded-full border border-slate-200 flex items-center gap-2 shadow-sm"
              >
                <Globe className="w-5 h-5" />
                <span className="text-xs font-bold uppercase pr-1">{lang}</span>
              </button>
              
              <AnimatePresence>
                {isMobileLangOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 mt-3 bg-white border border-slate-200 shadow-xl rounded-2xl p-2 flex flex-col gap-1 min-w-[140px] z-50"
                  >
                    {LANGUAGES.map((l) => (
                      <button
                        key={`mobile-lang-${l.code}`}
                        onClick={() => { setLang(l.code); setIsMobileLangOpen(false); }}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                          lang === l.code ? "bg-blue-50 text-blue-600" : "text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        <span className="text-lg">{l.flag}</span>
                        <span>{l.label}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <motion.img 
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1.1, opacity: 0.15 }}
            transition={{ duration: 2 }}
            src="https://images.unsplash.com/photo-1590059397615-649069695673?q=80&w=2070&auto=format&fit=crop" 
            alt="Democracy Monument Background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-transparent to-slate-50" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-100/10 blur-[120px] rounded-full" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-blue-600 tracking-tighter leading-[1.1] md:leading-[0.95] mb-6 md:mb-10 font-['FC_Iconic','Prompt',sans-serif]">
              {t("name")}
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl lg:text-2xl text-slate-500 font-medium leading-relaxed mb-10 md:mb-12 px-4 md:px-0">
              {t("heroDesc")}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 px-4 md:px-0">
              <button 
                onClick={() => scrollTo("membership")}
                className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-slate-900 text-white rounded-2xl font-bold text-lg md:text-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-3 shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)] hover:-translate-y-1"
              >
                {t("joinBtn")} <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
              </button>
              <button 
                onClick={() => scrollTo("policies")}
                className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-white text-slate-900 border border-slate-200 rounded-2xl font-bold text-lg md:text-xl hover:bg-slate-50 transition-all hover:-translate-y-1"
              >
                {t("policyBtn")}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img 
                  src="https://static.thairath.co.th/media/dFQROr7oWzulq5FZUEKljU3EFZ1pR32byy9geqdHgf44kapO3RVLvOIEb5tgKgzLw0F.webp" 
                  alt="National Freedom Party Vision" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-blue-600 p-6 rounded-2xl shadow-xl hidden md:block">
                <p className="text-white font-bold text-3xl mb-1">2026</p>
                <p className="text-blue-100 text-xs font-medium uppercase tracking-wider">ESTABLISHED</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
                {t("visionTitle")}
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                {t("visionDesc")}
              </p>
              <div className="space-y-6">
                {[
                  { icon: Lightbulb, title: t("wisdom"), desc: t("wisdomDesc") },
                  { icon: ShieldCheck, title: t("transparency"), desc: t("transparencyDesc") },
                  { icon: Users, title: t("hope"), desc: t("hopeDesc") }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 mb-1">{item.title}</h4>
                      <p className="text-slate-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Logo Meaning Section */}
      <section id="logo" className="py-16 md:py-24 bg-slate-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">{t("logoTitle")}</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">{t("logoDesc")}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
            {[
              { 
                color: "bg-blue-600", 
                title: t("blueCircle"), 
                desc: t("blueCircleDesc") 
              },
              { 
                color: "bg-slate-900 border-2 border-slate-700", 
                title: t("whiteText"), 
                desc: t("whiteTextDesc"),
                textColor: "text-white",
                content: "ชสร"
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700 hover:border-blue-500/50 transition-all group"
              >
                <div className={`w-16 h-16 ${item.color} rounded-full mb-6 shadow-lg group-hover:scale-110 transition-transform flex items-center justify-center`}>
                  {item.content && <span className="text-white text-2xl font-black font-['FC_Iconic','Prompt',sans-serif] tracking-tighter">{item.content}</span>}
                </div>
                <h3 className={`text-xl font-bold mb-3 ${item.textColor || "text-white"}`}>{item.title}</h3>
                <p className="text-slate-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Policies Section */}
      <section id="policies" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">{t("policyTitle")}</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {(TRANSLATIONS[lang as keyof typeof TRANSLATIONS].policies || []).map((policy: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-slate-50 border border-slate-100 p-6 md:p-8 rounded-3xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <span className="text-xl font-black font-['FC_Iconic','Prompt',sans-serif]">{index + 1}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{policy.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm md:text-base">{policy.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <a 
              href="https://www.instagram.com/nlpyth?igsh=ZWJydXZnaHBwMmwx&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-600/25 hover:-translate-y-1"
            >
              {t("subscribeBtn")}
            </a>
          </div>
        </div>
      </section>

      {/* Members Section */}
      <section id="founders" className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">{t("foundersTitle")}</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">{t("foundersDesc")}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {(TRANSLATIONS[lang as keyof typeof TRANSLATIONS].leaders || []).map((leader: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-[32px] text-center shadow-xl shadow-slate-200/50 border border-slate-100 hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-50 rounded-full mx-auto mb-4 md:mb-6 flex items-center justify-center text-blue-600">
                  <Users className="w-8 h-8 md:w-10 md:h-10" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">{leader.name}</h3>
                <p className="text-blue-600 font-semibold uppercase tracking-wider text-xs md:text-sm mb-4">{leader.role}</p>
                <p className="text-slate-600 text-sm leading-relaxed">{leader.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section id="articles" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">{t("articlesTitle")}</h2>
            <div className="bg-slate-50 border border-slate-200 p-8 md:p-12 rounded-[32px] md:rounded-[40px] relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-50 md:opacity-100">
                <FileText className="w-16 h-16 md:w-24 md:h-24 text-slate-200" />
              </div>
              <p className="text-xl md:text-2xl font-bold text-slate-800 mb-3 md:mb-4 relative z-10">{t("comingSoon")}</p>
              <p className="text-sm md:text-base text-slate-600 mb-6 md:mb-8 relative z-10">
                {t("articlesBy")}
              </p>
              <button 
                disabled
                className="inline-block bg-slate-200 text-slate-500 px-6 md:px-8 py-3 rounded-xl md:rounded-2xl font-bold cursor-not-allowed relative z-10"
              >
                {t("viewAll")}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Section */}
      <section id="membership" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 rounded-[40px] md:rounded-[60px] p-8 md:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute top-10 left-10 w-48 h-48 md:w-64 md:h-64 bg-blue-600 rounded-full blur-[80px] md:blur-[100px]" />
              <div className="absolute bottom-10 right-10 w-48 h-48 md:w-64 md:h-64 bg-blue-500 rounded-full blur-[80px] md:blur-[100px]" />
            </div>
            
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white mb-4 md:mb-8 leading-tight">
                {t("historyTitle")}
              </h2>
              <p className="text-slate-400 text-base md:text-xl max-w-2xl mx-auto mb-8 md:mb-12">
                {t("historyDesc")}
              </p>
              <a 
                href="https://forms.gle/Lv5hsLkAL9uZE6ZQ7" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 md:gap-3 px-8 md:px-10 py-4 md:py-5 bg-blue-600 text-white rounded-xl md:rounded-2xl font-black text-lg md:text-xl hover:bg-blue-500 transition-all shadow-2xl shadow-blue-600/20"
              >
                {lang === "th" ? "สมัครสมาชิกพรรค 1.0" : "Join the Party 1.0"} <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-200 pt-16 md:pt-20 pb-8 md:pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-10 md:gap-12 mb-12 md:mb-16">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-slate-900 flex items-center justify-center rounded-lg border border-slate-800">
                  <PartyLogo className="w-7 h-7" />
                </div>
                <span className="text-xl font-bold tracking-tight text-slate-900">{t("name")}</span>
              </div>
              <p className="text-slate-500 max-w-sm mb-8 text-sm md:text-base">
                {t("footerDesc")}
              </p>
              <div className="flex gap-4">
                <a 
                  href="https://www.instagram.com/nlpyth?igsh=ZWJydXZnaHBwMmwx&utm_source=qr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-600 transition-all"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href="https://vt.tiktok.com/ZSmrCNNaG" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-600 transition-all"
                >
                  <Music2 className="w-5 h-5" />
                </a>
                <button className="w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-600 transition-all">
                  <Globe className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-slate-900 mb-4 md:mb-6 uppercase tracking-wider text-sm">{t("menu")}</h4>
              <ul className="space-y-3 md:space-y-4">
                {SECTIONS.map(s => (
                  <li key={s.id}>
                    <button onClick={() => scrollTo(s.id)} className="text-slate-500 hover:text-blue-600 transition-colors text-sm md:text-base">
                      {s.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <p className="text-slate-400 text-xs md:text-sm">
              © 2026 {t("name")}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
