/**
* Template Name: MyPortfolio
* Template URL: https://bootstrapmade.com/myportfolio-bootstrap-portfolio-website-template/
* Updated: Aug 08 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });


  
  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
 function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      const configScript = swiperElement.querySelector(".swiper-config");
      let config = {};

      if (configScript) {
        try {
          config = JSON.parse(configScript.innerHTML.trim());
        } catch (e) {
          console.error('Errore nel parsing della configurazione Swiper:', e);
        }
      }

      // Collega gli elementi delle frecce (next e prev) all'oggetto config
      // solo se i selettori sono definiti nel JSON config e gli elementi esistono
      if (config.navigation) {
          if (config.navigation.nextEl) {
              config.navigation.nextEl = swiperElement.querySelector(config.navigation.nextEl);
          }
          if (config.navigation.prevEl) {
              config.navigation.prevEl = swiperElement.querySelector(config.navigation.prevEl);
          }
      }

      // Collega l'elemento della paginazione all'oggetto config
      // solo se il selettore è definito nel JSON config e l'elemento esiste
      if (config.pagination && config.pagination.el) {
          config.pagination.el = swiperElement.querySelector(config.pagination.el);
      }

      if (swiperElement.classList.contains("swiper-tab")) {
        // Questo ramo è per tipi specifici di Swiper con paginazione personalizzata
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);


  // Aggiungi queste variabili nel tuo file assets/js/main.js
  // da qui parte il setting del video
  

 // Questa è una IIFE (Immediately Invoked Function Expression) per incapsulare il codice
  const video = document.getElementById('myVideo');
  const playPauseButton = document.getElementById('playPauseButton');
  // Rimosso: const stopButton = document.getElementById('stopButton');
  const progressBar = document.getElementById('progressBar');
  const currentTimeSpan = document.getElementById('currentTime');
  const totalTimeSpan = document.getElementById('totalTime');

  // Rimosso stopButton dalla condizione di verifica iniziale
  if (video && playPauseButton && progressBar && currentTimeSpan && totalTimeSpan) {

    // Funzione per formattare il tempo (es. 90 secondi -> 01:30)
    function formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = Math.floor(seconds % 60);
      const formattedMinutes = String(minutes).padStart(2, '0');
      const formattedSeconds = String(remainingSeconds).padStart(2, '0');
      return `${formattedMinutes}:${formattedSeconds}`;
    }

    // Event listener per caricare la durata totale del video
    video.addEventListener('loadedmetadata', () => {
      totalTimeSpan.textContent = formatTime(video.duration);
      progressBar.max = video.duration; // Imposta il massimo della barra di avanzamento sulla durata totale
    });

    // Funzione per gestire Play/Pause
    function togglePlayPause() {
      if (video.paused || video.ended) {
        video.play();
        video.classList.add('playing');
        playPauseButton.innerHTML = '<i class="bi bi-pause-fill"></i>';
      } else {
        video.pause();
        video.classList.remove('playing');
        playPauseButton.innerHTML = '<i class="bi bi-play-fill"></i>';
      }
    }

    // Event listener per il pulsante Play/Pause
    playPauseButton.addEventListener('click', togglePlayPause);

    // Rimosso: Event listener per il pulsante Stop
    // stopButton.addEventListener('click', () => {
    //   video.pause();
    //   video.currentTime = 0; // Riporta il video all'inizio
    //   video.classList.remove('playing');
    //   playPauseButton.innerHTML = '<i class="bi bi-play-fill"></i>'; // Reimposta icona a play
    //   progressBar.value = 0; // Reimposta la barra di avanzamento
    //   currentTimeSpan.textContent = '00:00'; // Reimposta il tempo corrente
    // });

    // Aggiorna la barra di avanzamento e il tempo corrente durante la riproduzione
    video.addEventListener('timeupdate', () => {
      progressBar.value = video.currentTime;
      currentTimeSpan.textContent = formatTime(video.currentTime);
    });

    // Gestisce il trascinamento del thumb della barra di avanzamento
    progressBar.addEventListener('input', () => {
      video.currentTime = progressBar.value;
    });

    // Event listener per quando il video termina (resetta i controlli)
    video.addEventListener('ended', () => {
      video.classList.remove('playing');
      playPauseButton.innerHTML = '<i class="bi bi-play-fill"></i>';
      progressBar.value = 0;
      currentTimeSpan.textContent = '00:00';
    });

    // Event listener per quando il video viene messo in pausa (manualmente o da click sul pulsante)
    video.addEventListener('pause', () => {
      if (!video.ended) { // Evita di sovrascrivere lo stato "ended"
        video.classList.remove('playing');
        playPauseButton.innerHTML = '<i class="bi bi-play-fill"></i>';
      }
    });

    // Gestione dell'interazione con l'overlay (per mostrare/nascondere controlli quando si clicca sul video)
    // Se vuoi che i controlli scompaiano e riappaiano cliccando sul video stesso
    video.addEventListener('click', () => {
        if (!video.paused && !video.ended) {
            video.pause(); // Metti in pausa se sta riproducendo
        } else {
            video.play(); // Riproduci se è in pausa
        }
    });

  }
})();