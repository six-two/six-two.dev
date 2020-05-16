---
layout: simple
title: Lebenslauf
footer: "Aktualisiert im Mai 2020"
permalink: /cv/de
custom_menu:
  - { menu_title: "Choose language", url: "/cv/" }
  - { menu_title: "Kontakt", url: "/#contact" }
custom_css:
 - cv
---

<h1 class="section-header">Lebenslauf</h1>

Name | Patrick Schlüter
Adresse | Auckland, Neuseeland
Angestrebte Stelle(n) | - Pentester<br>- Softwareentwickler<br>- Praktikant (bezahlt)
Verfügbar | Bis Mitte Sebtember 2020

<h2 class="section-header">Fähigkeiten</h2>

- Aufsetzen und Konfigurieren von Servern
- Erstellen von statischen Webseiten mit HTML, CSS, Java-/TypeScript, React, und Jekyll
- Programmieren:
  - Mehrere Jahre Erfahrung mit Java und Python
  - Erste Erfahrungen mit C/C++, Assembly (x86, x64), Rust, TypeScript
- Erste Erfahrungen in diversen Cybersicherheitsgebieten: WLAN, Web-Apps, Reverse engineering
- Sehr gute Kentnisse in verschiedenen Linux-Distrubutionen: ArchLinux, Ubuntu, Kali
- Gut im Umgang mit Markdown, LaTeX, und Git

<h2 class="section-header">Berufserfahrung</h2>

<table class="past-jobs">
  <tbody>
    {% for entry in site.data.cv.de.past_jobs %}
      <tr>
        <td class="date">{{ entry.date }}</td>
        <td class="entry">
          <span class="title">{{ entry.title }}</span>
          <span class="employer">{{ entry.employer }}</span>
          <span class="summary">{{ entry.summary }}</span>
        </td>
      </tr>
    {% endfor %}
  </tbody>
</table>

<h2 class="section-header">Schul- und Berufsbildung</h2>

<table class="education">
  <tbody>
    {% for entry in site.data.cv.de.education %}
      <tr>
        <td class="date">{{ entry.date }}</td>
        <td class="entry">
          <span class="title">{{ entry.title }}</span>
          <span class="employer">{{ entry.employer }}</span>
          <span class="summary">{{ entry.summary }}</span>
        </td>
      </tr>
    {% endfor %}
  </tbody>
</table>

<h2 class="section-header">Sonstiges</h2>
Ich mache zur Zeit ein Auslandsjahr in Neuseeland. Mein Visa erlaubt mir dort zu arbeiten und es endet Ende Februar 2021.

Interessiert? [Kontaktieren](/#contact) Sie mich!
