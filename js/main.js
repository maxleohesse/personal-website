/* Bazil rebuild — interaction layer (vanilla JS, no dependencies) */
(function () {
  'use strict';

  var body = document.body;
  var isHome = !!document.querySelector('.preloader');

  /* ---------------- page enter ---------------- */
  function pageReady() {
    body.classList.remove('is-entering');
    body.classList.add('page-ready');
    var pre = document.querySelector('.preloader');
    if (pre) {
      pre.classList.add('is-done');
      setTimeout(function () { pre.classList.add('is-gone'); }, 1000);
    }
    var loader = document.querySelector('.loader');
    if (loader) {
      setTimeout(function () { loader.classList.add('is-gone'); }, 950);
    }
  }
  if (document.readyState === 'complete') {
    setTimeout(pageReady, isHome ? 900 : 350);
  } else {
    window.addEventListener('load', function () {
      setTimeout(pageReady, isHome ? 900 : 350);
    });
    /* safety net if some CDN asset hangs */
    setTimeout(pageReady, isHome ? 3200 : 2500);
  }

  /* reload when arriving via back/forward cache so the enter animation replays */
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) window.location.reload();
  });

  /* ---------------- page leave (black curtain) ---------------- */
  var curtain = document.querySelector('.black-curtain_transition');
  function leaveTo(href) {
    if (!curtain) { window.location = href; return; }
    curtain.classList.add('is-active');
    void curtain.offsetWidth; /* reflow so the transition runs */
    curtain.classList.add('is-covering');
    setTimeout(function () { window.location = href; }, 850);
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a');
    if (!a) return;
    var href = a.getAttribute('href');
    if (!href || href === '#' || a.target === '_blank') return;
    if (/^(mailto:|tel:|http)/.test(href)) return;
    if (a.closest('.js-open-form')) return;
    e.preventDefault();
    if (body.classList.contains('menu-open')) toggleMenu(false);
    leaveTo(href);
  });

  /* ---------------- custom cursor ---------------- */
  var circle = document.querySelector('.cursor__circle');
  if (circle && window.matchMedia('(hover:hover) and (pointer:fine)').matches) {
    var cx = innerWidth / 2, cy = innerHeight / 2, tx = cx, ty = cy;
    document.addEventListener('mousemove', function (e) { tx = e.clientX; ty = e.clientY; });
    (function loop() {
      cx += (tx - cx) * 0.22;
      cy += (ty - cy) * 0.22;
      circle.style.transform = 'translate(' + (cx - circle.offsetWidth / 2) + 'px,' + (cy - circle.offsetHeight / 2) + 'px)';
      requestAnimationFrame(loop);
    })();
    var hoverSel = '.heading-outline__wrapper, .splide__link, .photos__single--link, .photos__link';
    document.querySelectorAll(hoverSel).forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        circle.classList.add('is--larger', 'shadow');
        circle.querySelector('.cursor__img').classList.add('is--visible');
      });
      el.addEventListener('mouseleave', function () {
        circle.classList.remove('is--larger', 'shadow');
        circle.querySelector('.cursor__img').classList.remove('is--visible');
      });
    });
  }

  /* home: hovering "& Photographer" outlines "Webdesigner" */
  document.querySelectorAll('.intro__link-photo').forEach(function (t) {
    t.addEventListener('mouseover', function () {
      document.querySelectorAll('.intro__link-web').forEach(function (w) { w.classList.add('is--outline-text'); });
    });
    t.addEventListener('mouseout', function () {
      document.querySelectorAll('.intro__link-web').forEach(function (w) { w.classList.remove('is--outline-text'); });
    });
  });

  /* ---------------- overlay menu ---------------- */
  var menuBtn = document.getElementById('menuButton');
  function toggleMenu(open) {
    body.classList.toggle('menu-open', open);
    body.classList.toggle('no-scroll', open);
  }
  if (menuBtn) {
    menuBtn.addEventListener('click', function () {
      toggleMenu(!body.classList.contains('menu-open'));
    });
  }

  /* ---------------- project form wizard ---------------- */
  var formContainer = document.querySelector('.form__container');
  function openForm(e) {
    if (e) e.preventDefault();
    body.classList.add('form-open');
    showStep('1');
  }
  function closeForm(e) {
    if (e) e.preventDefault();
    body.classList.remove('form-open');
    var wrap = document.querySelector('.form__wrap');
    if (wrap) wrap.classList.remove('is-success');
  }
  function showStep(step) {
    document.querySelectorAll('.form .q').forEach(function (q) {
      q.classList.toggle('is-current', q.getAttribute('data-step') === String(step));
    });
  }
  document.querySelectorAll('.js-open-form').forEach(function (el) {
    el.addEventListener('click', openForm);
  });
  document.querySelectorAll('.js-close-form').forEach(function (el) {
    el.addEventListener('click', closeForm);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeForm(); toggleMenu(false); }
  });
  document.querySelectorAll('.js-step-choice').forEach(function (label) {
    label.addEventListener('click', function (e) {
      e.preventDefault();
      var next = label.getAttribute('data-next');
      setTimeout(function () { showStep(next); }, 180);
    });
  });
  document.querySelectorAll('.js-step-back').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      showStep(btn.getAttribute('data-back'));
    });
  });
  var projectForm = document.getElementById('projectForm');
  if (projectForm) {
    projectForm.addEventListener('submit', function (e) {
      e.preventDefault();
      document.querySelector('.form__wrap').classList.add('is-success');
    });
  }

  /* ---------------- scroll reveal ---------------- */
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in-view'); io.unobserve(en.target); }
      });
    }, { threshold: 0.15 });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in-view'); });
  }

  /* ---------------- scroll-linked effects ---------------- */
  var superFirst = document.querySelector('.super-text.first');
  var superSecond = document.querySelector('.super-text.second');
  var webpages = document.querySelectorAll('.webpages__container');
  var photosTicker = document.querySelector('.photos__text-slider');
  var galleryWraps = document.querySelectorAll('.photos-bg__wrapper');
  function onScroll() {
    var y = window.scrollY;
    if (superFirst) superFirst.style.transform = 'translateX(' + (-y * 0.22) + 'px)';
    if (superSecond) superSecond.style.transform = 'translateX(' + (-1800 + y * 0.22) + 'px)';
    webpages.forEach(function (el, i) {
      el.style.transform = 'translateY(' + (-y * (0.05 + (i % 4) * 0.02)) + 'px)';
    });
    if (photosTicker) photosTicker.style.transform = 'translateX(' + (-y * 0.35) + 'px)';
    galleryWraps.forEach(function (el) {
      var r = el.getBoundingClientRect();
      var p = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
      el.style.transform = 'scale(1.1) translateY(' + (p * 40) + 'px)';
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------------- projects slider (design) ---------------- */
  var splideList = document.querySelector('.splide__list');
  if (splideList) {
    var slides = splideList.children.length;
    var perView = window.innerWidth <= 767 ? 1 : window.innerWidth <= 991 ? 2 : 3;
    var idx = 0;
    function renderSlider() {
      var max = Math.max(0, slides - perView);
      if (idx < 0) idx = max;
      if (idx > max) idx = 0;
      splideList.style.transform = 'translateX(' + (-idx * (100 / perView)) + '%)';
    }
    document.querySelectorAll('.next-splide').forEach(function (b) {
      b.addEventListener('click', function (e) { e.preventDefault(); idx++; renderSlider(); });
    });
    document.querySelectorAll('.prev-splide').forEach(function (b) {
      b.addEventListener('click', function (e) { e.preventDefault(); idx--; renderSlider(); });
    });
    window.addEventListener('resize', function () {
      perView = window.innerWidth <= 767 ? 1 : window.innerWidth <= 991 ? 2 : 3;
      renderSlider();
    });
  }

  /* ---------------- testimonial slider (design) ---------------- */
  var tSlides = document.querySelectorAll('.testimonial__slide');
  if (tSlides.length) {
    var tIdx = 0;
    var nav = document.querySelector('.slider__nav');
    if (nav) {
      tSlides.forEach(function (_, i) {
        var d = document.createElement('div');
        d.className = 'slider__dot' + (i === 0 ? ' is-active' : '');
        d.addEventListener('click', function () { goT(i); });
        nav.appendChild(d);
      });
    }
    function goT(i) {
      tIdx = (i + tSlides.length) % tSlides.length;
      tSlides.forEach(function (s, j) { s.classList.toggle('is-current', j === tIdx); });
      if (nav) nav.querySelectorAll('.slider__dot').forEach(function (d, j) {
        d.classList.toggle('is-active', j === tIdx);
      });
    }
    var left = document.querySelector('.slider__arrow.left');
    var right = document.querySelector('.slider__arrow.right');
    if (left) left.addEventListener('click', function () { goT(tIdx - 1); });
    if (right) right.addEventListener('click', function () { goT(tIdx + 1); });
    setInterval(function () { goT(tIdx + 1); }, 6000);
  }

  /* ---------------- FAQ accordion ---------------- */
  document.querySelectorAll('.faq__question').forEach(function (q) {
    q.addEventListener('click', function () {
      q.parentElement.classList.toggle('is-open');
    });
  });

  /* ---------------- photos page filters ---------------- */
  document.querySelectorAll('.js-filter').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var f = link.getAttribute('data-filter');
      document.querySelectorAll('.js-filter').forEach(function (l) { l.classList.remove('is-active'); });
      link.classList.add('is-active');
      document.querySelectorAll('.photos-slide').forEach(function (card) {
        card.classList.toggle('is-hidden', f !== 'all' && card.getAttribute('data-cat') !== f);
      });
    });
  });

  /* ---------------- look book filters ---------------- */
  function lbFilter(cat) {
    document.querySelectorAll('.lookbook_item').forEach(function (item) {
      item.classList.toggle('is-hidden', cat && item.getAttribute('data-cat') !== cat);
    });
  }
  document.querySelectorAll('.js-lb-filter').forEach(function (label) {
    label.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelectorAll('.js-lb-filter').forEach(function (l) { l.classList.remove('is-active'); });
      label.classList.add('is-active');
      lbFilter(label.getAttribute('data-filter'));
    });
  });
  var lbReset = document.querySelector('.js-lb-reset');
  if (lbReset) {
    lbReset.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelectorAll('.js-lb-filter').forEach(function (l) { l.classList.remove('is-active'); });
      lbFilter(null);
    });
  }

  /* ---------------- lightbox (design hero screenshots, posters) ---------------- */
  var lightbox = document.getElementById('lightbox');
  if (lightbox) {
    var lbImg = lightbox.querySelector('img');
    document.querySelectorAll('.js-lightbox, .lookbook_url[href="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        var img = a.querySelector('img');
        if (!img) return;
        lbImg.src = img.src;
        lightbox.classList.add('is-open');
      });
    });
    lightbox.addEventListener('click', function () { lightbox.classList.remove('is-open'); });
  }
})();
