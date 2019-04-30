!(function() {
  var t = document.createElement('script');
  (t.type = 'text/javascript'),
    (t.async = !0),
    (t.src = 'https://vk.com/js/api/openapi.js?160'),
    (t.onload = function() {
      VK.Retargeting.Init('VK-RTRG-331575-1Zazc'), VK.Retargeting.Hit();
    }),
    document.head.appendChild(t);
})();
