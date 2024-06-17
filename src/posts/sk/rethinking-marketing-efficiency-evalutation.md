---
title: '[SK] Čas prehodnotiť vyhodnocovanie marketingových kampaní'
# alternativeTitle: 'How to enrich server-side data without using Firestore — A thorough guide.'
imgUrl: 'img/rethinking-marketing-efficiency-evalutation/main.jpg'
imgAlt: 'Article photo'
imgSourceText: 'Photo by'
imgSourceUrl: 'https://unsplash.com/@pawel_czerwinski?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash) on [Unsplash](https://unsplash.com/photos/blue-and-orange-abstract-painting-yn97LNy0bao?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash'
imgSourceUrlText: 'Pawel Czerwinski' 
published: true
datePublished: '2024-04-06'
dateEdited: '2024-05-02'
summary: 'Sledovanie správania používateľov na internete nebolo nikdy jednoduché, najmä ak sa spoliehate iba na službu Google Analytics. Aj keď to bola v minulosti účinná metóda, teraz čelíme čoraz väčším výzvam. Sledovanie používateľov online je čoraz zložitejšie.'
tags: ['Marketing measurement', 'Marketing evaluation',]
---

# Úvod
Sledovanie správania používateľov na internete nebolo nikdy jednoduché, najmä ak sa spoliehate iba na službu Google Analytics. Aj keď to bola v minulosti účinná metóda, teraz čelíme čoraz väčším výzvam. Sledovanie používateľov online je čoraz zložitejšie.

Súbory cookie navyše postupne strácajú svoj význam a poskytujú menej užitočných údajov. V dôsledku toho získavame menej signálov a údajov, ktoré by sme mohli použiť na sledovanie používateľov na internete. Všetky tieto faktory potom obmedzujú naše možnosti digitálnej analýzy.

Sledovanie používateľov na individuálnej úrovni je základom digitálnej atribúcie – súboru vzorcov, ktoré vidíte v Google Analytics a všetkých ostatných reklamných platformách, na ktoré si spomeniete. Digitálna atribúcia má stále veľmi dôležité miesto a účelom tohto článku nie je len poukázať na jej nedostatky. Naopak, naším cieľom je, aby si tieto nedostatky všetci uvedomili a zamysleli sa nad tým, kedy je táto metóda rozumnou variantou pre vyhodnocovanie kampaní a kedy nie.

> __Last-Click v Google Analytics 4__: GA4 používajú model Last non-direct click. Ten priraďuje 100% podiel na konverzii poslednému zdroju návštevy, ktorý nebol priamy. [Odkaz na dokumentáciu Google.](https://support.google.com/analytics/answer/10596866?hl=en)

# 1. Problémy spojené s digitálnou atribúciou

Digitálna atribúcia má stále veľmi široké uplatnenie. Hlavným dôvodom tohto využitia je, že je z veľkej časti bezplatná a poskytuje veľmi podrobný pohľad na výkonnosť marketingových aktivít. Vďaka službe Google Analytics môžeme zistiť, aké sú najčastejšie cesty zákazníkov ku konverzii. Kombináciou rôznych modelov si potom môžeme sami overiť, ktoré kanály a v akej fáze nákupného procesu mali podiel na príjmoch a konverziách. Získame tak skvelý nástroj pre každodenný prehľad o tom, kde a ako efektívne využívame svoje investície. Predpokladá to však, že sa o analýzu dát skutočne zaujímame a nespokojíme sa len s tým, čo vidíme v prehľadoch „zdroj/médium", kde sa bežne používa iba model Last-Click.

Problém nastáva, ak máte komplexný mediálny mix, ktorý zahŕňa nielen online reklamu, ale aj množstvo offline aktivít. Tie samozrejme v prehľade neuvidíte. Rovnako tak ak vás zaujíma inkrementalita, budete ju pomocou atribúcie vyhodnocovať len veľmi ťažko.

Napriek tomu, že využívate všetky dostupné signály, nemusia byť dostatočné, pretože sa napríklad prekrývajú, alebo sú dáta neúplné. Dôvody, prečo tomu tak je, uvedieme nižšie.

## 1.1. Nekompletné dáta

V posledných rokoch sú údaje v nástroji Google Analytics stále nepresnejšie. Adblockery a problémy so sledovaním používateľov na rôznych zariadeniach vedú k neúplným údajom o konverzných cestách.

Spoločnosť Apple so svojím systémom ITP (Intelligent Tracking Prevention) skracuje životnosť súborov cookie, čo skresľuje cestu používateľa na dlhšiu dobu. Ďalšie komplikácie prináša nové nariadenie o súboroch cookie z roku 2022, ktoré vyžaduje súhlas používateľa so sledovaním jeho aktivity.

Predpokladáme, že vzhľadom na rastúce opatrenia na ochranu súkromia používateľov na internete budú údaje v budúcnosti ešte obmedzenejšie.

## 1.2. Preferencie „klikacích” kanálov a problém s inkrementalitou

Reklamné platformy často uprednostňujú modely „last-click", ktoré nadhodnocujú kanály ako vyhľadávanie Google a podhodnocujú kanály ako Facebook alebo YouTube, ktoré často generujú dopyt.

Príkladom môže byť, že ste začali intenzívne propagovať svoje produkty a svoju značku. Používate niekoľko kanálov, ako je televízia, OOH, YouTube atď. a niektoré z nich už v minulosti mohli používateľa podnietiť, aby vďaka nim na stránky prišiel.

Niekoľko ľudí sa po zhliadnutí vašej reklamy rozhodne navštíviť vaše stránky a urobí to, čo robí veľa ľudí – „vygooglia" si vás. Pretože je váš trh pomerne vysoko konkurenčný, používate platené brandové reklamy, aby ste sa pri vyhľadávaní vašej značky zobrazovali na prvom mieste. Používateľ teda na reklamu klikne a vy vidíte jeho návštevu po vyhľadaní značky. A ak vykoná konverziu, je pripísaná práve tomuto vyhľadávaniu. Televízna reklama, OOH alebo akýkoľvek iný kanál, ktorý prakticky vyvolal dopyt po vašom produkte, nedostane ani korunu.

Namiesto toho vám budú Google Analytics tvrdiť, že brandové vyhľadávanie prinieslo 300 tisíc korún mesačne. V skutočnosti však vďaka tomu, že si platíte reklamu v brandovom vyhľadávaní, mohlo do vášho rozpočtu prísť len 30 tisíc korún (zvyšok by skončil u konkurencie). Ide o problém s inkrementalitou, ktorý je tým horší, čím známejší je váš brand. Efekt zobrazenia platenej reklamy je potom nízky.

## 1.3. Krátkodobé vnímanie

Digitálna atribúcia často priraďuje konverzie okamžite a na základe krátkodobého vnímania. To môže byť problematické, ak propagujete svoju značku a svoje produkty na kanáloch s dlhodobým dosahom, ktorých efekt sa môže prejaviť až po dlhšej dobe. Je dosť možné, že televízna reklama, ktorú ste pred mesiacom vypli, generuje príjmy ešte dnes – ale vy o tom neviete. Digitálna atribúcia tak nezohľadňuje dlhodobý účinok reklamy.

## 1.4. Nezohľadňovanie zmien v efektívnosti kanálov

Nezohľadnenie oneskoreného účinku reklamy pridáva ďalší nedostatok, a to, že digitálna atribúcia nezohľadňuje nasýtenie kanálov. Efekt nasýtenia vysvetlíme na príklade.

Ak ste napríklad začali inzerovať na Facebooku s nižšími investíciami, pravdepodobne ste oslovili najviac potenciálnych používateľov. Ale ako ste postupne zvyšovali investície, začali ste oslovovať aj používateľov, u ktorých bola pravdepodobnosť nákupu nižšia. To znamenalo, že postupom času bola jedna investovaná koruna stále menej účinná. Tento efekt sa nazýva efekt saturácie investície.

Digitálna atribúcia ho jednoducho nepostrehne a z dát ho možno len ťažko extrahovať. Zohľadnenie tohto efektu je dôležité pri optimalizácii rozpočtu, pretože má väčší zmysel investovať do efektívnejších kanálov.

## 1.5. Nezohľadňovanie externých faktorov a sezónnosti

Digitálna atribúcia často opomína vonkajšie faktory a sezónne vplyvy, ktoré môžu významne ovplyvniť efektivitu marketingu. Medzi tieto faktory môžu patriť zmeny správania spotrebiteľov, dostupnosť produktov alebo služieb, médiá a komunikácia a konkurencia. Je dôležité ich pri vyhodnocovaní svojho úsilia zohľadniť.

# 2. Alternatívy k digitálnej atribúcii

Našťastie existujú alternatívy, ktoré môžeme využiť. Je však dôležité si uvedomiť, že žiadna z týchto metód nemá nahradiť digitálnu atribúciu. Tieto metódy sa navzájom dopĺňajú – efektívnosť vyhodnocovania kampaní sa zvyšuje tým, že všetky tieto dostupné nástroje používate na správne účely, pretože ste si vedomí ich nedostatkov. Inými slovami, bližšie k pravde sa dostanete, ak budete všetky metódy používať v kombinácii.

* Dotazníky „Ako ste sa o nás dozvedeli": Povinné dotazníky pred dokončením nákupu alebo iného typu konverzie.

* Náhodné experimenty (A/B testy): Používatelia sú rozdelení do náhodných skupín, pričom jedna skupina vykoná zmenu a druhá nie. Experimenty možno vykonávať aj priamo v platformách, ako sú Google Ads a Facebook. Môžete testovať rôzne parametre kampaní.

* GEO experimenty: Táto metóda sa používa hlavne v prípadoch, keď nemôžeme využiť náhodné experimenty. Princíp spočíva v zavedení zmien pre rôzne geografické oblasti, keď sa náhodne rozhodujeme, či v nich kampaň spustíme, alebo nie. Potom porovnáme výsledky a vyhodnotíme účinnosť kampane. K dispozícii sú metódy ako Causal Impact spoločnosti Google alebo GeoLift spoločnosti Meta. Je dôležité si uvedomiť, že rozdelenie nemusí byť nutne podľa geografickej jednotky – môže byť aj podľa kľúčového slova alebo produktu.

## 2.1. Marketing Mix Modeling (MMM)

MMM je atribučný model, ktorý nepotrebuje individuálne vstupné údaje používateľov (a teda nepresnosť merania neznižuje jeho účinok) a môže zohľadniť všetky vyššie uvedené nedostatky. Modely možno navyše spoľahlivo kombinovať s experimentálnymi výsledkami. MMM bohužiaľ neponúka taký podrobný pohľad ako digitálna atribúcia. Výsledky sú zvyčajne na úrovni kanála. Pre vhľad do efektívnosti kampaní je nutné ho kombinovať s experimentmi alebo atribúciou.

# 3. Čo si z toho odniesť?

Nedávne udalosti zamerané na ochranu súkromia používateľov na internete zintenzívnili debatu medzi marketérmi o predsudkoch a nedostatkoch používania služby Google Analytics na analýzu marketingového mixu a investícií. Postupom času stále nepresnejšie sledovanie správania na webe, a teda neúplné pochopenie cesty zákazníka, vedie k nižšej presnosti priraďovania konverzií a menej efektívnemu vyhodnocovaniu marketingových aktivít.

Medzi hlavné problémy patrí neúplnosť údajov, preferencie „klikacích kanálov", krátkodobé vnímanie, nezohľadnenie zmien v účinnosti kanálov, vonkajších faktorov a sezónnosti. Tieto problémy môžu viesť k nesprávnej interpretácii údajov a zlým marketingovým rozhodnutiam.

Na druhej strane existujú alternatívy k digitálnej atribúcii, ktoré v kombinácii s ňou môžu poskytnúť oveľa realistickejší a hodnotnejší pohľad na efektívnosť marketingových investícií. Patrí medzi ne dotazníky „Ako ste sa o nás dozvedeli", náhodné experimenty (A/B testy), GEO experimenty a modelovanie marketingového mixu (MMM). Tieto metódy môžu poskytnúť presnejšie a užitočnejšie údaje pre hodnotenie a optimalizáciu marketingových investícií.

<span class="divider mb-6 print:mb-0" />

> Tento článok nechce diskreditovať Google Analytics, ktoré majú v marketingu a webovej analytike nepochybne stále svoje miesto a môžu byť veľmi užitočné. Je však dôležité, aby marketéri kriticky premýšľali o skresleniach a nedokonalých signáloch digitálnej atribúcie. A tiež aby sme všetci zaujali dôslednejší prístup k atribúcii a vyhodnocovaniu marketingových aktivít. Len vďaka tomu získame presnejší obraz o tom, čo je skutočne inkrementálne a čo nie.





