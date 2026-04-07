<!-- analytics.js - ЕДИНСТВЕННЫЙ ФАЙЛ для всех счетчиков. Ленивая загрузка по скроллу 10% -->
<script>
(function(){
    // Настройки счетчиков (добавляй/меняй здесь)
    const counters = {
        yandex: {
            id: '108433312',
            src: 'https://mc.yandex.ru/metrika/tag.js',
            init: {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", 
                   referrer: document.referrer, url: location.href, 
                   accurateTrackBounce:true, trackLinks:true}
        },
    };

    // Функция ленивой загрузки по скроллу
    function lazyLoadAnalytics() {
        const scrolled = window.pageYOffset || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolledPercent = scrolled / height * 100;

        if (scrolledPercent > 10) { // Загрузка после скролла 10%
            loadCounters();
            window.removeEventListener('scroll', lazyLoadAnalytics);
        }
    }

    // Загрузка всех счетчиков
    function loadCounters() {
        Object.entries(counters).forEach(([name, config]) => {
            if (name === 'yandex') loadYandex(config);
            // if (name === 'google') loadGoogle(config);
        });
    }

    // Yandex Metrika
    function loadYandex(config) {
        if (window['ym']) return; // Уже загружен
        (function(m,e,t,r,i,k,a){
            m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {
                if (document.scripts[j].src === r) return;
            }
            k=e.createElement(t),a=e.getElementsByTagName(t)[0];
            k.async=1; k.src=r; a.parentNode.insertBefore(k,a);
        })(window, document,'script',config.src, 'ym');
        ym(config.id, 'init', config.init);
    }

    // Noscript fallback (всегда)
    const noscript = document.createElement('noscript');
    noscript.innerHTML = `<div><img src="https://mc.yandex.ru/watch/${counters.yandex.id}" style="position:absolute;left:-9999px;" alt=""/></div>`;
    document.body.appendChild(noscript);

    // Запуск
    window.addEventListener('scroll', lazyLoadAnalytics);
    lazyLoadAnalytics(); // Проверка сразу

})();
</script>
