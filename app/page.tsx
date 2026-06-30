'use client';

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { BatteryCharging, Bike, ChevronDown, CircleGauge, Download, Gauge, MapPin, Menu, Play, ShieldCheck, Sparkles, X, Zap } from "lucide-react";
import { company, faq, productCategories, specs } from "../data/site";

const nav = ["Story", "Design", "Tech", "Specs", "Company"];
const images = [
  { src: "/media/hero-commute-latest.png", label: "都市を軽く抜ける" },
  { src: "/media/studio-folded.png", label: "折りたたむ美学" },
  { src: "/media/display.png", label: "視線を落とすだけ" },
  { src: "/media/tail-light.png", label: "夜を見方にする" },
  { src: "/media/camp.png", label: "週末まで連れていく" }
];
const story = [
  ["Freedom", "電車の時間に縛られない。駐輪場を探し続けない。半径数キロの街が、ふっと自分のものになる。"],
  ["Urban", "狭い道、坂道、駅からのラストワンマイル。都市の細かなストレスを、静かな加速でほどいていく。"],
  ["Lifestyle", "通学、通勤、カフェ、夜の買い物。移動が目的ではなく、その日の気分を変える小さなスイッチになる。"],
  ["Trust", "家電やAV機器を扱ってきたTOHOが、毎日の道具として向き合うコンパクトモビリティ。"]
];
const features = [
  [BatteryCharging, "48V 10Ah", "大容量バッテリー", "最大80kmの走行を想定。平日の移動も、週末の寄り道も一本の充電で軽やかに。"],
  [Zap, "500W", "ハブモーター", "発進時のもたつきを抑え、坂道でも自然に前へ。街乗りに必要な余裕を静かに備えます。"],
  [CircleGauge, "LCD", "ディスプレイ", "速度、バッテリー残量、走行距離をひと目で確認。情報は多すぎず、必要な瞬間にだけ。"],
  [ShieldCheck, "Disc", "前後ディスクブレーキ", "毎日の停止を安定させる制動力。夜間走行を支えるLEDライトも搭載。"]
];

function useMotionSetup() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
    const tick = (time: number) => { lenis.raf(time * 1000); };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(el, { y: 54, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 82%" } });
      });
      gsap.to("[data-track]", { xPercent: -38, ease: "none", scrollTrigger: { trigger: "[data-gallery]", start: "top top", end: "+=2200", scrub: 1, pin: true } });
      gsap.to("[data-battery-fill]", { width: "100%", ease: "none", scrollTrigger: { trigger: "[data-battery]", start: "top 70%", end: "bottom 40%", scrub: true } });
    });
    return () => { ctx.revert(); gsap.ticker.remove(tick); lenis.destroy(); };
  }, []);
}

function Loader() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 1450);
    return () => window.clearTimeout(timer);
  }, []);
  return <AnimatePresence>{visible && <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: .8, ease: "easeInOut" } }} className="fixed inset-0 z-[90] grid place-items-center bg-ink">
    <div className="relative flex flex-col items-center gap-8">
      <motion.div initial={{ scale: .92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: .7, ease: "easeOut" }}><Image src="/media/toho-logo.png" alt="TOHO" width={180} height={54} className="h-auto w-40" /></motion.div>
      <div className="h-[2px] w-56 overflow-hidden rounded-full bg-white/12"><motion.div initial={{ x: "-100%" }} animate={{ x: "100%" }} transition={{ duration: 1.15, ease: "easeInOut" }} className="h-full w-1/2 bg-signal" /></div>
      <p className="text-xs font-bold uppercase tracking-[.35em] text-white/42">Compact Electric Mobility</p>
    </div>
  </motion.div>}</AnimatePresence>;
}

function Nav() {
  const [open, setOpen] = useState(false);
  const [lightNav, setLightNav] = useState(false);
  useEffect(() => {
    let frame = 0;
    const updateTheme = () => {
      frame = 0;
      const sampleY = 34;
      const themedSections = Array.from(document.querySelectorAll<HTMLElement>("[data-nav-theme]"));
      const active = themedSections.find((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= sampleY && rect.bottom >= sampleY;
      });
      const nextLight = active?.dataset.navTheme === "light";
      setLightNav((current) => (current === nextLight ? current : nextLight));
    };
    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateTheme);
    };
    updateTheme();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);
  const navShell = lightNav ? "border-black/10 bg-white/[.82] text-ink shadow-[0_18px_50px_rgba(0,0,0,.10)]" : "border-white/15 bg-white/[.08] text-white shadow-none";
  const navItem = lightNav ? "hover:bg-black/[.08] hover:text-ink" : "hover:bg-white/10 hover:text-white";
  const logoTone = lightNav ? "invert" : "";
  return <>
    <header className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-5 py-4 md:px-8">
      <a href="#top" className={`flex h-11 items-center rounded-full border px-4 backdrop-blur-xl transition-colors duration-300 ${navShell}`} aria-label="TOHO 電動バイク トップ"><Image src="/media/toho-logo.png" alt="TOHO" width={92} height={28} className={`h-5 w-auto transition duration-300 ${logoTone}`} /></a>
      <nav className={`hidden items-center gap-1 rounded-full border p-1 text-sm backdrop-blur-xl transition-colors duration-300 md:flex ${navShell}`}>
        {nav.map((n) => <a key={n} href={"#" + n.toLowerCase()} className={`rounded-full px-4 py-2 transition ${navItem}`}>{n}</a>)}
      </nav>
      <div className="flex items-center gap-2">
        <a href="#crowdfunding" className="group hidden rounded-full bg-signal px-5 py-3 text-sm font-semibold text-ink shadow-glow transition hover:scale-[1.03] md:block">先行案内を受け取る</a>
        <button onClick={() => setOpen(true)} className={`grid h-11 w-11 place-items-center rounded-full border backdrop-blur-xl transition-colors duration-300 md:hidden ${navShell}`} aria-label="メニューを開く"><Menu size={20} /></button>
      </div>
    </header>
    <AnimatePresence>{open && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70] bg-ink/96 p-6 md:hidden">
      <button onClick={() => setOpen(false)} className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full border border-white/20" aria-label="メニューを閉じる"><X /></button>
      <div className="mt-24 grid gap-6 text-4xl font-semibold">{nav.map((n) => <a onClick={() => setOpen(false)} href={"#" + n.toLowerCase()} key={n}>{n}</a>)}</div>
    </motion.div>}</AnimatePresence>
  </>;
}

function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  return <section id="top" ref={ref} data-nav-theme="dark" className="relative min-h-[112vh] overflow-hidden">
    <motion.div style={{ scale }} className="absolute inset-0"><Image src="/media/hero-commute-latest.png" alt="都市を走るTOHO電動バイク" fill priority sizes="100vw" className="object-cover" /></motion.div>
    <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/15 to-ink" />
    <motion.div style={{ y }} className="relative z-10 flex min-h-screen flex-col justify-end px-5 pb-20 md:px-10 lg:px-16">
      <p className="mb-4 text-sm font-semibold uppercase tracking-[.35em] text-signal">Compact Electric Mobility</p>
      <h1 className="max-w-6xl text-[16vw] font-black leading-[.82] tracking-normal md:text-[9vw]">街を、<br />もっと軽く。</h1>
      <div className="mt-8 grid max-w-5xl gap-6 md:grid-cols-[1.2fr_.8fr] md:items-end">
        <p className="text-xl leading-relaxed text-white/78 md:text-2xl">TOHOのコンパクト電動バイク。折りたたんで、走って、暮らしの隙間に自由をつくる。</p>
        <div className="glass flex items-center justify-between rounded-full p-2 pl-5"><span className="text-sm text-white/70">2026年7月 先行開始予定</span><a href="#story" className="grid h-12 w-12 place-items-center rounded-full bg-white text-ink"><ChevronDown /></a></div>
      </div>
    </motion.div>
  </section>;
}

function Story() { return <section id="story" data-nav-theme="light" className="relative bg-mist py-28 text-ink md:py-40"><div className="mx-auto max-w-7xl px-5 md:px-10"><p data-reveal className="mb-8 text-sm font-bold uppercase tracking-[.35em] text-black/45">Story</p><h2 data-reveal className="max-w-5xl text-6xl font-black leading-[.92] md:text-8xl">移動は、予定をこなすためだけのものじゃない。</h2><div className="mt-24 grid gap-8 md:grid-cols-4">{story.map(([k,t]) => <article data-reveal key={k} className="border-t border-black/18 pt-6"><span className="text-sm font-bold text-black/38">{k}</span><p className="mt-5 text-lg leading-relaxed text-black/72">{t}</p></article>)}</div></div></section>; }

function ProductIntro() { return <section id="design" data-nav-theme="dark" className="relative min-h-screen overflow-hidden bg-ink py-24 md:py-36"><div className="mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-[.8fr_1.2fr] md:px-10"><div className="sticky top-28 h-fit"><p data-reveal className="text-sm font-bold uppercase tracking-[.35em] text-signal">Design Philosophy</p><h2 data-reveal className="mt-6 text-5xl font-black leading-none md:text-7xl">小さくなるほど、行ける場所は広がる。</h2><p data-reveal className="mt-8 text-lg leading-relaxed text-white/66">折りたたみ式の構造、14インチタイヤ、白と黒のコントラスト。住まい、駅前、キャンパス、車載先の景色まで想定したデザインです。</p></div><div className="space-y-5"><div data-reveal className="relative aspect-[4/5] overflow-hidden rounded-lg"><Image src="/media/studio-folded.png" alt="折りたたまれたTOHO電動バイク" fill className="object-cover" /></div><div className="grid gap-5 md:grid-cols-2"><div data-reveal className="glass rounded-lg p-7"><Bike className="mb-8 text-signal" /><h3 className="text-2xl font-bold">工具不要で折りたたみ</h3><p className="mt-4 text-white/62">コンパクトに収納でき、玄関や車内にも収まりやすい設計。</p></div><div data-reveal className="glass rounded-lg p-7"><MapPin className="mb-8 text-signal" /><h3 className="text-2xl font-bold">ラストワンマイルへ</h3><p className="mt-4 text-white/62">駅から目的地までの数キロを、気持ちよく短縮します。</p></div></div></div></div></section>; }

function Tech() { return <section id="tech" data-nav-theme="dark" className="bg-[#0b1014] py-28 md:py-40"><div className="mx-auto max-w-7xl px-5 md:px-10"><div className="grid gap-10 md:grid-cols-[1fr_1fr]"><div><p data-reveal className="text-sm font-bold uppercase tracking-[.35em] text-signal">Technology</p><h2 data-reveal className="mt-6 text-5xl font-black leading-none md:text-8xl">見えない力を、感じる走りへ。</h2></div><p data-reveal className="self-end text-xl leading-relaxed text-white/68">スペックは数字で終わらせない。発進、停止、充電、夜間走行。毎日の小さな不安をひとつずつ消すための機能です。</p></div><div className="mt-16 grid gap-5 md:grid-cols-4">{features.map(([Icon, stat, title, text]) => { const I = Icon as typeof BatteryCharging; return <motion.article whileHover={{ y: -8 }} data-reveal key={title as string} className="glass rounded-lg p-6"><I className="mb-10 text-signal" /><div className="text-5xl font-black">{stat as string}</div><h3 className="mt-6 text-xl font-bold">{title as string}</h3><p className="mt-4 text-sm leading-relaxed text-white/60">{text as string}</p></motion.article>; })}</div><div data-battery data-reveal className="mt-20 rounded-lg border border-white/12 bg-white/[.04] p-8 md:p-12"><div className="mb-8 flex items-center justify-between"><h3 className="text-3xl font-black">充電アニメーション</h3><span className="text-signal">4〜5時間</span></div><div className="h-8 overflow-hidden rounded-full border border-white/20 p-1"><div data-battery-fill className="h-full w-[12%] rounded-full bg-gradient-to-r from-volt to-signal shadow-glow" /></div></div></div></section>; }

function Gallery() { return <section data-gallery data-nav-theme="light" className="relative h-screen overflow-hidden bg-mist text-ink"><div className="absolute left-5 top-24 z-10 md:left-10"><p className="text-sm font-bold uppercase tracking-[.35em] text-black/40">Gallery</p><h2 className="mt-4 text-5xl font-black md:text-7xl">一台で、日常の景色を変える。</h2></div><div data-track className="flex h-full w-[220vw] items-end gap-6 px-[35vw] pb-16 pt-48">{images.concat(images.slice(0,2)).map((img,i)=><figure key={i} className="relative h-[58vh] w-[58vw] shrink-0 overflow-hidden rounded-lg md:w-[38vw]"><Image src={img.src} alt={img.label} fill className="object-cover" /><figcaption className="absolute bottom-5 left-5 rounded-full bg-white/80 px-4 py-2 text-sm font-bold backdrop-blur">{img.label}</figcaption></figure>)}</div></section>; }

function Specs() { return <section id="specs" data-nav-theme="dark" className="bg-ink py-28 md:py-40"><div className="mx-auto max-w-7xl px-5 md:px-10"><div className="grid gap-10 md:grid-cols-[1.1fr_.9fr]"><div data-reveal className="relative min-h-[560px] overflow-hidden rounded-lg border border-white/10"><Image src="/media/spec-product-latest.png" alt="TOHO電動バイクの製品写真" fill sizes="(min-width: 768px) 52vw, 100vw" className="object-cover" /></div><div><p data-reveal className="text-sm font-bold uppercase tracking-[.35em] text-signal">Specifications</p><h2 data-reveal className="mt-6 text-5xl font-black leading-none md:text-7xl">走る、止まる、しまう。必要な性能を一枚に。</h2><dl className="mt-10 divide-y divide-white/12">{specs.map(([k,v])=><div data-reveal key={k} className="grid grid-cols-[.9fr_1.2fr] gap-4 py-4 text-sm"><dt className="text-white/48">{k}</dt><dd className="font-semibold text-white/88">{v}</dd></div>)}</dl><p className="mt-6 text-xs leading-relaxed text-white/42">※仕様・デザインは予告なく変更される場合があります。画像内資料に基づくプロトタイプ表記です。</p></div></div></div></section>; }

function Campaign() { return <section id="crowdfunding" data-nav-theme="light" className="relative overflow-hidden bg-mist py-28 text-ink md:py-36"><div className="mx-auto max-w-7xl px-5 md:px-10"><div className="grid gap-10 md:grid-cols-[1fr_1fr]"><div><p data-reveal className="text-sm font-bold uppercase tracking-[.35em] text-black/42">Crowdfunding</p><h2 data-reveal className="mt-6 text-6xl font-black leading-[.9] md:text-8xl">はじまりを、一緒に走る。</h2></div><div data-reveal className="glass !bg-black/[.06] rounded-lg p-7 text-ink"><p className="text-xl leading-relaxed">2026年7月中旬〜下旬、クラウドファンディング開始予定。2026年10月ごろ、公式サイト販売開始予定。</p><form className="mt-8 grid gap-3 sm:grid-cols-[1fr_auto]"><input aria-label="メールアドレス" className="rounded-full border border-black/15 bg-white px-5 py-4 text-ink outline-none" placeholder="メールアドレス" /><button className="rounded-full bg-ink px-7 py-4 font-bold text-white transition hover:bg-black">先行案内を登録</button></form></div></div></div><div className="mt-20 flex w-[200%] gap-8 text-7xl font-black text-black/10 marquee"><span>FREEDOM / URBAN / COMPACT / ELECTRIC / TOHO /</span><span>FREEDOM / URBAN / COMPACT / ELECTRIC / TOHO /</span></div></section>; }

function Company() { return <section id="company" data-nav-theme="dark" className="bg-[#0b1014] py-28 md:py-36"><div className="mx-auto max-w-7xl px-5 md:px-10"><p data-reveal className="text-sm font-bold uppercase tracking-[.35em] text-signal">Company Profile</p><div className="mt-8 grid gap-10 md:grid-cols-[.8fr_1.2fr]"><div data-reveal className="glass rounded-lg p-8"><Image src="/media/toho-logo.png" alt="TOHO公式ロゴ" width={190} height={58} className="mb-12 h-auto w-40" /><h2 className="text-4xl font-black">{company.name}</h2><p className="mt-6 text-white/62">株式会社TOHOの公式サイト掲載情報に基づく会社概要です。</p></div><dl className="grid gap-3">{[["代表者",company.representative],["設立",company.established],["資本金",company.capital],["本社所在地",company.address],["事業内容",company.business],["製品カテゴリ",productCategories.join(" / ")],["サポートコールセンター",company.supportPhone],["営業窓口",company.salesPhone]].map(([k,v])=><div data-reveal key={k} className="grid gap-2 border-b border-white/10 py-5 md:grid-cols-[180px_1fr]"><dt className="text-sm text-white/42">{k}</dt><dd className="text-lg font-semibold text-white/88">{v}</dd></div>)}</dl></div></div></section>; }

function FAQ() { const [open,setOpen]=useState(0); return <section className="bg-ink py-24"><div className="mx-auto max-w-4xl px-5"><h2 data-reveal className="text-5xl font-black">FAQ</h2><div className="mt-10 divide-y divide-white/12">{faq.map(([q,a],i)=><button key={q} onClick={()=>setOpen(open===i?-1:i)} className="w-full py-6 text-left"><div className="flex items-center justify-between gap-6"><span className="text-xl font-bold">{q}</span><ChevronDown className={open===i?"rotate-180 transition":"transition"}/></div><AnimatePresence>{open===i&&<motion.p initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} className="overflow-hidden pt-4 leading-relaxed text-white/62">{a}</motion.p>}</AnimatePresence></button>)}</div></div></section>; }

function Footer() { return <footer className="bg-mist px-5 py-12 text-ink md:px-10"><div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-end md:justify-between"><div><Image src="/media/toho-logo.png" alt="TOHO" width={120} height={36} className="mb-6 invert" /><p className="max-w-xl text-sm leading-relaxed text-black/58">本サイトは株式会社TOHO 電動バイクのプレゼンテーション用フロントエンドプロトタイプです。企業情報は公式サイト掲載情報に基づきます。</p></div><div className="flex gap-3"><a className="rounded-full border border-black/15 px-5 py-3 text-sm font-bold" href={company.officialSite} target="_blank">公式サイト</a><a className="rounded-full bg-ink px-5 py-3 text-sm font-bold text-white" href="#top">トップへ</a></div></div></footer>; }

export default function Page() { useMotionSetup(); return <main className="noise"><Loader /><Nav /><Hero /><Story /><ProductIntro /><Tech /><Gallery /><Specs /><section data-nav-theme="dark" className="relative grid min-h-screen place-items-center overflow-hidden bg-ink px-5"><Image src="/media/tail-light.png" alt="テールライト" fill className="object-cover opacity-65" /><div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/40" /><div data-reveal className="relative max-w-5xl text-center"><Play className="mx-auto mb-8 text-signal" size={48}/><h2 className="text-6xl font-black leading-[.9] md:text-9xl">夜の街にも、輪郭を。</h2><p className="mx-auto mt-8 max-w-2xl text-xl leading-relaxed text-white/68">LEDヘッドライト、テールライト、ウィンカー。視認性もデザインの一部として、移動の安心感を高めます。</p></div></section><Campaign /><FAQ /><section data-nav-theme="dark" className="bg-[#0b1014] py-24"><div className="mx-auto grid max-w-7xl gap-5 px-5 md:grid-cols-3 md:px-10"><article data-reveal className="glass rounded-lg p-7"><Sparkles className="mb-8 text-signal"/><h3 className="text-2xl font-bold">News</h3><p className="mt-4 text-white/62">2026年7月 先行販売開始予定。公開日決定後、ニュース欄で告知します。</p></article><article data-reveal className="glass rounded-lg p-7"><Download className="mb-8 text-signal"/><h3 className="text-2xl font-bold">Manual</h3><p className="mt-4 text-white/62">取扱説明書は発売前にPDFで掲載予定。現在は差し替え用の導線です。</p></article><article data-reveal className="glass rounded-lg p-7"><Gauge className="mb-8 text-signal"/><h3 className="text-2xl font-bold">Support</h3><p className="mt-4 text-white/62">製品サポート: {company.supportPhone}<br/>営業窓口: {company.salesPhone}</p></article></div></section><Company /><Footer /><a href="#crowdfunding" className="fixed bottom-5 right-5 z-50 rounded-full bg-signal px-5 py-3 text-sm font-black text-ink shadow-glow">先行案内</a></main>; }
