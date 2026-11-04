const $ = s => document.querySelector(s);
const money = c => '$' + (c / 100).toFixed(2);
const getCookie = n => (document.cookie.match('(^|;)\\s*' + n + '=([^;]*)') || [])[2] || null;
window.__pixelLog = [];
async function loadConfig() {
  const cfg = await (await fetch('/api/config')).json();
  if (cfg.pixelId && !cfg.pixelId.startsWith('YOUR_')) {
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', cfg.pixelId);
  } else { window.fbq = () => {}; } // no pixel configured
  const orig = window.fbq; window.fbq = (...a) => { window.__pixelLog.push(a); return orig.apply(null, a); };
  fbq('track', 'PageView');
  return cfg;
}
function fbcValue() { const c = getCookie('_fbc'); if (c) return c; const id = new URLSearchParams(location.search).get('fbclid'); return id ? `fb.1.${Date.now()}.${id}` : null; }
const LOCK = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="11" width="14" height="10" rx="1"/><path d="M8 11V7a4 4 0 018 0v4"/></svg>';
(function chrome() {
  const noAnn = document.body.dataset.noann;
  document.body.insertAdjacentHTML('afterbegin', (noAnn ? '' : '<div class="ann">Free US shipping &middot; 30-day money-back guarantee</div>') +
    `<header><div class="in"><a class="logo" href="https://ciracove.com">CIRA</a><span class="secure">${LOCK} Secure checkout</span></div></header>`);
  document.body.insertAdjacentHTML('beforeend', '<footer><nav><a href="./refund-policy">Refund policy</a><a href="./shipping-policy">Shipping</a><a href="./privacy-policy">Privacy</a><a href="./terms">Terms</a><a href="./contact">Contact</a></nav>&copy; 2026 CIRA &middot; ciracove.com</footer>');
})();
