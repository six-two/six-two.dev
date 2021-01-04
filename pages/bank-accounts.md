---
layout: simple
title: Bank accounts
permalink: /bank-accounts
footer: "Last updated in January 2021"
sitemap: False
custom_menu:
  - { menu_title: "EUR", url: "#eur" }
  - { menu_title: "USD", url: "#usd" }
  - { menu_title: "NZD", url: "#nzd" }
custom_js:
 - click-to-decrypt
 - sjcl
---

<h1 class="section-header">International bank accounts</h1>
If you want to send me money you can use one of the bank accounts below.

Don't like banks? See other [ways to send me money](/#send-money).


<h2 class="section-header" id="eur">Euro (EUR)</h2>
{% include encrypted-info.html class="ctd-bank-eur" data=site.ctd-bank-eur %}


<h2 class="section-header" id="usd">US Dollar (USD)</h2>
{% include encrypted-info.html class="ctd-bank-usd" data=site.ctd-bank-usd %}


<h2 class="section-header" id="nzd">New Zealand Dollar (NZD)</h2>
{% include encrypted-info.html class="ctd-bank-nzd" data=site.ctd-bank-nzd %}
