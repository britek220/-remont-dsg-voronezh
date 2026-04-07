<!-- analytics.js v2 - ФИКС ленивой загрузки Яндекс Метрика -->
<script>
(function(){
    let loaded = false;
    
    const YANDEX_ID = '108433312';
    const YANDEX_SRC = 'https://mc.yandex.ru/metrika/tag.js';
    
    // Debounce функция (1 раз в 100мс)
    let timeout;
    function debounce(fn, delay) {
        return function() {
            clearTimeout(timeout);
            timeout = setTimeout(fn, delay);
        };
    }
    
    // Ленивая загрузка
    function lazyLoad() {
        if (loaded) return;
        
        const scrolled = window.pageYOffset || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const percent = height > 0 ? (scrolled / height) * 100 : 0;
        
        if (percent > 10 || window.innerHeight >= document.documentElement.scrollHeight) {
            loadYandex();
        }
    }
    
    // Загрузка Метрики
    function loadYandex() {
        if (window.ym || loaded) return;
        loaded = true;
        
        (function(m,e,t,r,i,k,a){
            m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            k=e.createElement(t);a=e.getElementsByTagName(t)[0];k.async=1;k.src=r;a.parentNode.insertBefore(k,a);
        })(window,document,'script',YANDEX_SRC,'ym');
        
        ym(YANDEX_ID, 'init', {
            ssr:true, webvisor:true, clickmap:true, 
            ecommerce:"dataLayer", 
            accurateTrackBounce:true, trackLinks:true
        });
        
        console.log('✅ Яндекс Метрика загружена!');
    }
    
    // Noscript fallback
    function addNoscript() {
        if (document.body) {
            const noscript = document.createElement('noscript');
            noscript.innerHTML = `<div><img src="https://mc.yandex.ru/watch/${YANDEX_ID}" style="position:absolute; left:-9999px;" alt="YaMetrika"/></div>`;
            document.body.appendChild(noscript);
        }
    }
    
    // Инициализация
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            addNoscript();
            window.addEventListener('scroll', debounce(lazyLoad, 100), {passive: true});
            lazyLoad(); // Проверка сразу
        });
    } else {
        addNoscript();
        window.addEventListener('scroll', debounce(lazyLoad, 100), {passive: true});
        lazyLoad();
    }
    
})();
</script>
