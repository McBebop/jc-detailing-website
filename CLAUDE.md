# CLAUDE.md — Janetzke Car Detailing (jc-detailing.de)

## Projekt

Neue statische Website für ein Premium-Fahrzeugpflege-Studio in Pforzheim,
offizielles **GYEON Prime Studio**. Ersetzt die bestehende WordPress-Seite komplett.

**Zielgruppe:** Besitzer von Porsche, Mercedes-AMG und Sportwagen im Raum
Stuttgart / Pforzheim / Karlsruhe. Porsche Weissach liegt in unmittelbarer Nähe.
Die Seite spricht die Creme de la Creme an: **kompromisslos premium**.

**Kontakt (überall identisch verwenden):**
Kaulbachstraße 48, 75175 Pforzheim · +49 162 4389941 · info@jc-detailing.de

## Design (WICHTIG)

Referenz und Vorbild: **https://gyeon.co** — deren Designsprache wird als
Prime Studio bewusst übernommen:

- Monumentale Versalien-Typografie (condensed, bold), große Statements statt Marketing-Floskeln
- Full-Screen-Sections: jede Leistung = ein bildschirmfüllender Block mit
  Hintergrundbild, kurzem Text, **einem einzigen Link**
- Laufende Marquee-Textbänder zwischen Sections (Stil: "CAR CARE REDEFINED").
  Das Marken-Band führt die verwendeten Marken als **Logos** (GYEON, RUPES,
  Koch-Chemie, Labocosmetica, HEXIS) aus `assets/logos/brands/` — alle werden
  per CSS-Filter (`brightness(0) invert(1)`) einheitlich weiß eingefärbt,
  Originaldateien dürfen also farbig sein, brauchen aber transparenten
  Hintergrund. Weiße Hintergründe/Flächen per ffmpeg-`colorkey` ausstanzen;
  KochChemie-SVG ist eine Markenbibliothek (nur Gruppe `excellence-messe`
  sichtbar, Claim-Zeile entfernt, viewBox 0 0 172 23).
- Viel Ruhe, wenig Elemente, nichts schreit

### Farben (offizielle Gyeon-Brand-Paletten — vom Kunden bestätigt)

- **KEIN reines Schwarz (`#000`)** — der Gyeon Brand Guide verbietet das explizit.
- **Primärfarbe Navy: `#21314D`** (RGB 33 49 77 · CMYK 92/80/43/40 ·
  Pantone 533 C · Purpose: Print & Digital) — **vom Kunden bevorzugte Palette**,
  als Grundton für die Website verwenden.
- Alternative Brand-Palette (dokumentiert, nicht primär verwenden):
  `#1C355E` (RGB 28 53 94 · CMYK 100/85/36/27 · Pantone 534 C · Purpose: Digital)
- Zu jeder Palette gehört eine Tint-Skala von Navy Richtung Hellgrau (Navy mit
  Weiß aufgehellt, ca. 9 Stufen) für Flächen, Linien und sekundäre Typo — als
  CSS-Variablen anlegen (z. B. `--navy`, `--navy-800` … `--navy-100`).
- Sehr dunkle Hintergründe: **abgedunkeltes Navy** verwenden (aus `#21314D`
  abgeleitet), niemals `#000`.
- Weiß/Off-White für Typografie. **Maximal eine** dezente Akzentfarbe, sparsam:
  das **JC-Detailing-Rot `#A32530`** aus dem Firmenlogo (die Red-Accent-Variante
  nutzt ein helleres `#C1252F`). Nur punktuell einsetzen — Linien, Hover,
  kleine Details — nie flächig.

### Logos

**JC Detailing (Firmenlogo):** `assets/logos/jc-detailing/` —
`JC_Detailing_logo_{black,dark,silver,white,red_accent}` je als `.svg` und
`_2000px.png`. Auf Navy-Grund die White- oder Silver-Variante verwenden.

**GYEON Prime Studio:** `assets/logos/prime-studio/` — `prime-studio-black`,
`prime-studio-rgb` (Navy), `prime-studio-white` — je als `.png` und `.svg`.
Das Logo ist quadratisch (150×150 viewBox).

## Leistungen (= Unterseiten)

1. **Keramikversiegelung** — Kernleistung, GYEON-zertifiziert
2. **Lackschutzfolierung / PPF** — Kernleistung. NUR Frontpaket (ab 1.900 €)
   und Teilfolierung; KEINE Vollfolierung (kein Plotter vorhanden, Stand 07/2026)
3. **Keramikpflege** — Maintenance-Programm für bereits keramikversiegelte
   Fahrzeuge. Differenzierungsmerkmal: Werterhalt-Abo-Gedanke.

**BEWUSST NICHT auf dieser Seite:** Innenraumreinigung, Standardpolitur,
Billig-Angebote (bekommen später eine separate Zweitseite, anderes Projekt).
**Leasingrückgabe wurde komplett gestrichen** (Kundenentscheidung 07/2026) —
keine Section, keine Unterseite, nirgends erwähnen.

## Conversion-Elemente (Pflicht, aber im Gyeon-Stil dezent)

- "Termin anfragen"-CTA permanent erreichbar (Header + Section-CTAs),
  typografisch elegant, **kein knalliger Button**
- "ab"-Preise auf den Leistungsseiten — Platzhalter im Format `ab X.XXX €`
  (echte Werte liefert der Kunde nach)
- Google-Bewertungen einbinden: echte Reviews von der alten Seite
  jc-detailing.de übernehmen (dort im Abschnitt "Zufriedene Kunden")
- GYEON-Prime-Studio-Status prominent als Trust-Element im Hero-Bereich

## SEO

- Lokales SEO für: Keramikversiegelung Pforzheim/Stuttgart, Lackschutzfolie
  Stuttgart, Car Detailing Pforzheim, PPF Stuttgart
- Einzugsgebiet im Text verankern: Pforzheim, Stuttgart, Karlsruhe, Weissach
- Saubere Meta-Tags, Open Graph, semantisches HTML, sprechende URLs
- Schema.org **LocalBusiness (AutoDetailing)** als JSON-LD
- **GEO (Generative Engine Optimization) ist dem Kunden wichtig:** ChatGPT hat
  ihm nachweislich Aufträge gebracht. Strategie: Ratgeber-Seiten mit ehrlichen,
  Antwort-zuerst-formulierten Frage-Überschriften (auch "für wen lohnt es sich
  NICHT"), FAQPage-/Article-Schema, robots.txt ohne Bot-Sperren, sitemap.xml.
  Ehrlichkeit ist Positionierung UND Zitierbarkeits-Strategie — keine
  Marketing-Superlative in Ratgeber-Inhalten.
- **Header-Nav:** Leistungen (Dropdown: Keramikversiegelung / Lackschutzfolierung /
  Keramikpflege) · Studio · Ratgeber · CTA "Termin anfragen"
  (KEIN separater Kontakt-Navpunkt — der CTA ist der Weg zur Kontaktseite;
  Kontakt-Link steht zusätzlich im Footer. Im Mobile-Overlay entfällt das
  Dropdown, die Leistungs-Links stehen direkt in der Liste.)
- **Galerie: zurückgestellt** (Stand 07/2026): Kunde erwägt eine kuratierte
  "Arbeiten"-Seite (6–12 beste Fahrzeuge, Label-Stil) als Beweis für Skeptiker —
  kommt aber erst NACH dem Launch, falls nötig. Nicht proaktiv bauen.
- **Kontakt-Kanal Nr. 1 ist WhatsApp** (wa.me-Link mit vorgefülltem Text auf
  kontakt.html) — bewusst kein Formular, keine Backend-Abhängigkeit.
- **Launch-Priorität** (Kundenansage 07/2026): schnell online gehen; wichtig
  sind Conversion-Rate und Ranking — klares Wording, gute Copy, wenig Widerstand.

## Technik

- Statisches HTML/CSS/Vanilla-JS — **KEINE Frameworks, kein Build-Prozess**
- Ein zentrales Design-System in **einer** CSS-Datei (CSS-Variablen für Farben,
  Typo-Skala, Abstände) — wird von allen Seiten genutzt
- Mobile-first responsive, Ladezeit-optimiert (lazy loading, moderne
  Bildformate vorbereiten)
- **Hero-Video:** offizielles GYEON Project Reel, komprimiert in
  `assets/video/hero.webm` (VP9) + `hero.mp4` (H.264-Fallback), Poster in
  `assets/img/hero-poster.jpg`. `main.js` lädt die Quellen nur auf großen
  Screens ohne Reduced-Motion/Datensparmodus — sonst bleibt das Poster.
  (Original: ~/Downloads/hero.mp4, 41 MB — nicht ins Repo/Deployment nehmen.)
- **Bilder:** Alle Sections nutzen echte Standbilder aus dem offiziellen
  GYEON Project Reel (aus dem 4K-Master extrahiert, Overlay-Text weggecroppt,
  ~1800×1080, je 70–140 KB, in `assets/img/`). Sobald Bilder aus dem
  GYEON-Presse-Pool oder eigene Studiofotos vorliegen: einfach die Datei
  unter gleichem Namen ersetzen (z. B. `studio-hero.jpg`) — kein Code-Umbau
  nötig. Eigene Fotos sind v. a. für `studio-hero.jpg`, `studio-ueberblick.jpg`
  und `studio-arbeit.jpg` sinnvoll (zeigen aktuell das GYEON-Referenzstudio,
  nicht das eigene).
- Impressum & Datenschutz als Seiten anlegen, Inhalte klar als Platzhalter markieren
- **Fonts lokal gehostet** (`assets/fonts/*.woff2`, Variable Fonts, @font-face
  in style.css) — KEINE Google-Fonts-Links in den HTML-Köpfen (DSGVO).
- **Favicon** (Auto-Silhouette aus JC-Logo auf Navy, `assets/img/favicon-*.png`,
  `apple-touch-icon.png`), **og-image.jpg** (1200×630, GT3-Szene + JC-Logo) und
  `theme-color` (#0C111C) sind auf allen Seiten eingebunden.
- **Studio-Seite:** GYEON-Reel-Bilder bleiben (Kundenentscheidung — eigene Halle
  sieht ähnlich aus, kein Täuschungsrisiko). Porträt-Sektion (Hochformat,
  `.portrait`-Komponente) wartet auf Foto + Über-mich-Text des Kunden.

## Hosting & Migration (Stand 07/2026)

- **Hosting: GitHub Pages** (statisch, kostenlos, HTTPS). Domain jc-detailing.de
  bleibt beim bisherigen Registrar, nur DNS-Einträge zeigen auf GitHub Pages
  (A-Records 185.199.108-111.153 + CNAME www). CNAME-Datei im Repo nötig.
- **Alte WordPress-URLs:** 24 Weiterleitungs-Stubs als `ordner/index.html` mit
  Meta-Refresh + Canonical (GitHub Pages kann keine echten 301er).
  `404.html` im Site-Stil fängt den Rest.
- Kein Formular-Backend nötig (WhatsApp/Mail/Telefon), keine Serverlogik.

## Seitenstruktur

| Datei | Inhalt |
|---|---|
| `index.html` | Startseite |
| `keramikversiegelung.html` | Kernleistung 1 |
| `lackschutzfolierung.html` | Kernleistung 2 |
| `keramikpflege.html` | Maintenance-Programm |
| `keramikversiegelung-ratgeber.html` | Ehrlicher Ratgeber/FAQ (GEO-Strategie, s. u.) |
| `studio.html` | Studio/Über-uns: Person, Zertifizierung, Arbeitsweise (E-E-A-T) |
| `kontakt.html` | Kontakt, Anfahrt, Google-Maps-Einbindung vorbereitet |
| `impressum.html` | Platzhalter-Inhalte |
| `datenschutz.html` | Platzhalter-Inhalte |

## Arbeitsweise

1. **ZUERST nur Design-System + komplette Startseite bauen. Dann STOPPEN** —
   der Kunde gibt Feedback, Look und Tonalität werden kalibriert.
2. Erst nach Freigabe die Unterseiten im selben Stil.
3. **Texte:** Deutsch, selbstbewusst, reduziert, keine Superlativ-Floskeln.
   Qualität wird gezeigt, nicht behauptet.
   **WICHTIG, Kundenfeedback 07/2026: KEINE Gedankenstriche (—) in Texten,
   Titeln oder Meta-Tags.** Sie gelten als KI-Erkennungsmerkmal. Stattdessen
   Punkt, Doppelpunkt oder Komma. Als Design-Trenner (Labels, Title-Tags)
   dient der Mittelpunkt „·".
4. **GANZ AM ENDE** (Kunde sagt Bescheid): eine `SKILL.md` erstellen, die den
   kompletten Bauprozess generalisiert dokumentiert (Trigger,
   Briefing-Checkliste, Build-Sequenz, Design-System-Patterns mit echten
   CSS-Snippets, Verifikations-Checkliste), damit künftige Kundenseiten im
   Detailing-Bereich von einem günstigeren Modell nach diesem Muster gebaut
   werden können.
