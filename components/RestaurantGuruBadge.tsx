"use client";
import { useLanguage } from "@/components/LanguageProvider";
const URL = "https://restaurantguru.com/Hot-Tacos-Restaurant-Leamington";
// Structure/classes supplied by Restaurant Guru, with accessible link replacing inline onclick.
export default function RestaurantGuruBadge() {
 const {locale} = useLanguage();
 return <div className="flex flex-col items-center justify-center gap-3">
 <link rel="stylesheet" href="https://awards.infcdn.net/2026/r_rcm.css" />
 <a href={URL} target="_blank" rel="noopener noreferrer" aria-label={locale === "es" ? "Restaurant Guru 2026: recomendado, Hot Tacos Leamington" : "Restaurant Guru 2026: recommended, Hot Tacos Leamington"}>
  <div id="b-rcircle" data-length="29" className={`b-rcircle_black ${locale === "es" ? "rg-award-lang-es_ES" : "rg-award-lang-en_US"}`}>
   <span className="b-rcircle_r-link" style={{display:"none"}}>Hot Tacos Leamington</span>
   <p className="b-rcircle_year">2026</p><div className="b-rcircle_bottom"><p className="b-rcircle_str1">{locale === "es" ? "Recomendado" : "Recommended"}</p></div>
   <div className="b-rcircle_heading"><svg xmlns="http://www.w3.org/2000/svg" width="144" height="144" viewBox="0 0 144 144"><defs><path id="b-rcircle-arc" d="M 12 72 a 60 60 0 0 0 120 0" /></defs><text className="b-rcircle_headingbottom" fill="#fff" textAnchor="middle"><textPath startOffset="50%" href="#b-rcircle-arc">Restaurant Guru</textPath></text></svg></div>
  </div>
 </a><a className="text-sm font-bold underline underline-offset-4" href={URL} target="_blank" rel="noopener noreferrer">{locale === "es" ? "Ver reconocimiento" : "View recognition"} ↗</a>
 </div>;
}
