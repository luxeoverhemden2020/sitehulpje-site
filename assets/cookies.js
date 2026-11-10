// Siteregelaar – cookiemelding + Google Analytics (pas meten NA toestemming)
// Google Consent Mode v2: alles staat standaard op "geweigerd"; Analytics laadt pas als de bezoeker op Accepteren klikt.
(function () {
  var MEET_ID = "G-Z0LMFR9M6X";
  var SLEUTEL = "sr_cookies"; // "ja" of "nee"

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;
  gtag("consent", "default", {
    ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied", analytics_storage: "denied",
  });

  function lees() { try { return localStorage.getItem(SLEUTEL); } catch (e) { return null; } }
  function bewaar(w) { try { localStorage.setItem(SLEUTEL, w); } catch (e) { /* geen opslag: dan vragen we volgende keer opnieuw */ } }

  var geladen = false;
  function laadAnalytics() {
    if (geladen) return; geladen = true;
    gtag("consent", "update", { analytics_storage: "granted" });
    var s = document.createElement("script");
    s.async = true; s.src = "https://www.googletagmanager.com/gtag/js?id=" + MEET_ID;
    document.head.appendChild(s);
    gtag("js", new Date());
    gtag("config", MEET_ID, { anonymize_ip: true });
  }

  function melding() {
    if (document.getElementById("sr-cookies")) return;
    var css = document.createElement("style");
    css.textContent =
      "#sr-cookies{position:fixed;left:16px;right:16px;bottom:16px;z-index:9999;max-width:560px;margin:0 auto;" +
      "background:#0c1a36;color:#e8f0ff;border:1px solid rgba(34,227,196,.45);border-radius:16px;padding:16px 18px;" +
      "font:15px/1.5 Inter,system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;box-shadow:0 18px 40px -12px rgba(0,0,0,.55)}" +
      "#sr-cookies p{margin:0 0 12px}#sr-cookies .r{display:flex;gap:10px;flex-wrap:wrap}" +
      "#sr-cookies button{cursor:pointer;border-radius:10px;padding:10px 16px;font:inherit;font-weight:600;border:1.5px solid transparent;color:#e8f0ff;background:linear-gradient(rgba(7,11,20,.6),rgba(7,11,20,.6)) padding-box,linear-gradient(135deg,#22e3c4,#3b82f6) border-box;box-shadow:0 0 0 3px rgba(34,227,196,.08);transition:box-shadow .2s,background .2s}" +
      "#sr-cookies button:hover{box-shadow:0 0 22px rgba(34,227,196,.45)}" +
      "#sr-cookies button.ja{color:#e6fffa;background:linear-gradient(135deg,rgba(34,227,196,.18),rgba(59,130,246,.18)) padding-box,linear-gradient(135deg,#22e3c4,#3b82f6) border-box;box-shadow:0 0 18px -2px rgba(34,227,196,.45)}";
    document.head.appendChild(css);
    var d = document.createElement("div");
    d.id = "sr-cookies"; d.setAttribute("role", "dialog"); d.setAttribute("aria-label", "Cookies");
    d.innerHTML = "<p><b>Mogen we meten hoe onze site wordt gebruikt?</b><br>We gebruiken Google Analytics om te zien welke pagina's bezocht worden, zodat we de site beter kunnen maken. Geen advertenties, geen verkoop van gegevens.</p>" +
      "<div class=\"r\"><button class=\"ja\" type=\"button\">Accepteren</button><button class=\"nee\" type=\"button\">Alleen noodzakelijk</button></div>";
    document.body.appendChild(d);
    d.querySelector(".ja").onclick = function () { bewaar("ja"); d.remove(); laadAnalytics(); };
    d.querySelector(".nee").onclick = function () { bewaar("nee"); d.remove(); };
  }

  // Keuze later wijzigen: een link met data-cookie-keuze opent de melding opnieuw
  window.cookieKeuze = function () { try { localStorage.removeItem(SLEUTEL); } catch (e) {} melding(); };

  var keuze = lees();
  if (keuze === "ja") laadAnalytics();
  else if (keuze !== "nee") {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", melding); else melding();
  }
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("[data-cookie-keuze]");
    if (a) { e.preventDefault(); window.cookieKeuze(); }
  });
})();
