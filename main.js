
    // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• PRELOADER â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
    window.addEventListener('load', function () { setTimeout(function () { document.getElementById('preloader').classList.add('done') }, 600) });

    // HERO VIDEO FALLBACK
    (function () { var v = document.getElementById('heroVid'); if (!v) return; v.addEventListener('error', function () { v.style.display = 'none'; var d = v.parentElement, f = document.createElement('iframe'); f.src = 'https://www.youtube.com/embed/_InqQJRqGW4?autoplay=1&mute=1&loop=1&playlist=_InqQJRqGW4&controls=0&showinfo=0&modestbranding=1&rel=0'; f.style = 'position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:100vw;height:56.25vw;min-height:100vh;min-width:177.77vh;border:0'; f.allow = 'autoplay;encrypted-media'; f.allowFullscreen = true; d.appendChild(f) }); setTimeout(function () { if (v.paused || v.ended || v.readyState === 0) v.dispatchEvent(new Event('error')) }, 3000) })();

    // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• LENIS + SCROLLTRIGGER â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
    gsap.registerPlugin(ScrollTrigger);
    var lenis = new Lenis({ duration: 1.3, easing: function (t) { return 1 - Math.pow(1 - t, 3) }, smooth: true, smoothTouch: false });
    function raf(t) { lenis.raf(t); requestAnimationFrame(raf) } requestAnimationFrame(raf);
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function (t) { lenis.raf(t * 1000) });
    gsap.ticker.lagSmoothing(0);

    // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• NAV â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
    var nav = document.getElementById('nav'), tt = document.getElementById('toTop');
    ScrollTrigger.create({ trigger: document.body, start: 'top+=50 top', onEnter: function () { nav.classList.add('scrolled') }, onLeaveBack: function () { nav.classList.remove('scrolled') } });
    ScrollTrigger.create({ trigger: document.body, start: 'top+=600 top', onEnter: function () { tt.classList.add('visible') }, onLeaveBack: function () { tt.classList.remove('visible') } });
    function tm() { document.getElementById('nl').classList.toggle('open') }
    function cm() { document.getElementById('nl').classList.remove('open') }
    document.querySelectorAll('#nl a').forEach(function (a) { a.addEventListener('click', function () { cm(); var t = document.querySelector(a.getAttribute('href')); if (t) { lenis.scrollTo(t, { offset: -70 }) } }) });
    document.querySelectorAll('a[href^="#"]').forEach(function (a) { if (a.closest('#nl')) return; a.addEventListener('click', function (e) { e.preventDefault(); var t = document.querySelector(this.getAttribute('href')); if (t) lenis.scrollTo(t, { offset: -70 }) }) });

    // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• THREE.JS â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
    (function () {
      var scene = new THREE.Scene(), cam = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, .1, 100); cam.position.z = 12;
      var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true }); renderer.setSize(window.innerWidth, window.innerHeight); renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
      document.getElementById('three-bg').appendChild(renderer.domElement);
      var orbs = [], geo = new THREE.SphereGeometry(.07, 16, 16), mat = new THREE.MeshBasicMaterial({ color: 0xcc0000, transparent: true, opacity: .35 });
      for (var i = 0; i < 35; i++) { var o = new THREE.Mesh(geo, mat); o.position.set((Math.random() - .5) * 22, (Math.random() - .5) * 14, (Math.random() - .5) * 6 - 3); o.userData = { sx: (Math.random() - .5) * .008, sy: (Math.random() - .5) * .006, sz: (Math.random() - .5) * .004 }; scene.add(o); orbs.push(o) }
      var t = 0; (function a3() { t += .004; orbs.forEach(function (o) { o.position.x += o.userData.sx + Math.sin(t + o.position.y) * .004; o.position.y += o.userData.sy + Math.cos(t + o.position.x) * .004; o.position.z += o.userData.sz; if (Math.abs(o.position.x) > 11) o.position.x *= -.9; if (Math.abs(o.position.y) > 7) o.position.y *= -.9; if (Math.abs(o.position.z) > 6) o.position.z *= -.9 }); cam.position.x = Math.sin(t * .25) * .4; cam.position.y = Math.cos(t * .35) * .25; cam.lookAt(0, 0, 0); renderer.render(scene, cam); requestAnimationFrame(a3) })();
      window.addEventListener('resize', function () { cam.aspect = window.innerWidth / window.innerHeight; cam.updateProjectionMatrix(); renderer.setSize(window.innerWidth, window.innerHeight) });
    })();

    // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• PARTICLES.JS â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
    particlesJS('particles-bg', { particles: { number: { value: 65, density: { enable: true, value_area: 800 } }, color: { value: '#cc0000' }, shape: { type: 'circle' }, opacity: { value: .4, random: true, anim: { enable: true, speed: .4, opacity_min: .08, sync: false } }, size: { value: 2, random: true, anim: { enable: true, speed: .8, size_min: .4, sync: false } }, line_linked: { enable: true, distance: 130, color: '#cc0000', opacity: .1, width: 1 }, move: { enable: true, speed: .8, direction: 'none', random: true, straight: false, out_mode: 'out', bounce: false, attract: { enable: true, rotateX: 500, rotateY: 1000 } } }, interactivity: { detect_on: 'canvas', events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' }, resize: true }, modes: { grab: { distance: 160, line_linked: { opacity: .3 } }, push: { particles_nb: 4 } } }, retina_detect: true });

    // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• IMAGE SEQUENCE (AUTO-PLAY 5 IMAGES) â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
    (function () {
      var images = ['https://image.tmdb.org/t/p/w1280/gFZriCkpJYsApPZEF3jhxL4yLzG.jpg', 'https://image.tmdb.org/t/p/w1280/xGexTKCJDkl12dTW4YCBDXWb1AD.jpg', 'https://image.tmdb.org/t/p/w1280/tNlkKrypFs6QSUjFVQntFISoFv5.jpg', 'https://image.tmdb.org/t/p/w1280/gFRHLjysseRgbZmMUS3e2oNdFQK.jpg', 'https://image.tmdb.org/t/p/w1280/piuRhGiQBYWgW668eSNJ2ug5uAO.jpg'];
      var container = document.getElementById('imgSeq'), frames = [], currentIdx = 0;
      images.forEach(function (src, i) { var f = document.createElement('div'); f.className = 'seq-frame'; f.style.backgroundImage = 'url(' + src + ')'; container.insertBefore(f, container.firstChild); frames.push(f) });
      frames[0].classList.add('active');
      var seqTitle = document.getElementById('seqTitle'), seqSub = document.getElementById('seqSub');
      var titles = ['The Crew Assembled', 'Red Revolution', 'The Mastermind', 'Inside the Royal Mint', 'Symbol of Resistance'];
      seqTitle.textContent = titles[0]; seqSub.textContent = '';
      setInterval(function () {
        currentIdx = (currentIdx + 1) % images.length;
        frames.forEach(function (f, i) { f.classList.toggle('active', i === currentIdx) });
        seqTitle.textContent = titles[currentIdx];
      }, 2400);
    })();

    // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• FLOATING OBJECTS (SCRUB) â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
    (function () {
      var mask = document.getElementById('dali-mask-float'), gold = document.getElementById('gold-bar-float');
      ScrollTrigger.create({
        trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 1.5,
        onUpdate: function (self) { var p = self.progress; if (mask) { mask.style.transform = 'translateY(' + (p * 300) + '%) rotate(' + (p * 200) + 'deg)'; mask.style.opacity = .08 + p * .06 } if (gold) { gold.style.transform = 'translateY(' + (p * 200) + '%) rotate(' + (-p * 150) + 'deg)'; gold.style.opacity = .06 + p * .06 } }
      });
    })();

    // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• GSAP SCRUB: HERO TEXT â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
    gsap.fromTo('#hero .hc', { opacity: .2, scale: .95 }, { opacity: 1, scale: 1, duration: 1.5, ease: 'power3.out' });
    gsap.fromTo('#hero .si', { opacity: 0 }, { opacity: .6, scrollTrigger: { trigger: '#hero', start: 'top top', end: 'top+=200 top', scrub: 1 } });

    // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• PARALLAX SCRUB â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
    document.querySelectorAll('.about-grid .ab').forEach(function (card, i) {
      gsap.fromTo(card, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: card, start: 'top bottom-=100', end: 'top center', scrub: .8, toggleActions: 'play none none reverse' } })
    });
    document.querySelectorAll('.cg .ch').forEach(function (card, i) {
      gsap.fromTo(card, { y: 50, opacity: 0, scale: .92 }, { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: card, start: 'top bottom-=100', end: 'top center', scrub: .6, toggleActions: 'play none none reverse' } })
    });
    document.querySelectorAll('.tl').forEach(function (row, i) {
      gsap.fromTo(row, { opacity: 0, x: i % 2 === 0 ? -30 : 30 }, { opacity: 1, x: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: row, start: 'top bottom-=80', end: 'top center', scrub: .8 } })
    });

    // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• COUNTERS â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
    (function () {
      var done = false; ScrollTrigger.create({
        trigger: '#stats', start: 'top bottom-=100', onEnter: function () {
          if (!done) {
            done = true;
            document.querySelectorAll('.stb .n').forEach(function (el) { var t = parseFloat(el.getAttribute('data-t')), ft = t % 1 !== 0, dur = 2200, st = null; function step(ts) { if (!st) st = ts; var p = Math.min((ts - st) / dur, 1); el.textContent = ft ? (p * t).toFixed(1) : Math.floor(p * t); if (p < 1) requestAnimationFrame(step); else el.textContent = t } requestAnimationFrame(step) })
          }
        }
      });
    })();

    // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• SWIPER â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
    (function () {
      var slides = document.querySelectorAll('#swW .slide'), idx = 0, total = slides.length; if (!total) return;
      function spv() { if (window.innerWidth >= 1024) return 3; if (window.innerWidth >= 768) return 2; return 1 }
      function go(n) { var s = spv(), max = total - s; if (n < 0) n = 0; if (n > max) n = max; idx = n; document.getElementById('swW').style.transform = 'translateX(-' + (idx * (100 / s)) + '%)'; document.getElementById('swW').style.transition = 'transform .5s ease' }
      document.getElementById('pb').addEventListener('click', function () { go(idx - 1) }); document.getElementById('nb').addEventListener('click', function () { go(idx + 1) }); setInterval(function () { go(idx + 1) }, 4000);
    })();

    // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• LIGHTBOX â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
    var lb = document.getElementById('lb'), lbi = document.getElementById('lbi'); document.querySelectorAll('.gi2 img').forEach(function (img) { img.addEventListener('click', function () { lbi.src = img.src; lb.classList.add('show') }) }); lb.addEventListener('click', function (e) { if (e.target === lb || e.target.classList.contains('lbx')) lb.classList.remove('show') });

    // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• CONTACT â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
    document.getElementById('cf2').addEventListener('submit', function (e) { e.preventDefault(); var m = document.getElementById('msg2'), n = this.querySelector('[name="name"]').value.trim(), em = this.querySelector('[name="email"]').value.trim(), ms = this.querySelector('[name="message"]').value.trim(); m.className = 'msg2'; if (!n || !em || !ms) { m.className = 'msg2 err'; m.textContent = 'All fields required.'; return } if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) { m.className = 'msg2 err'; m.textContent = 'Invalid email.'; return } m.className = 'msg2 ok'; m.textContent = 'Message sent! The Professor will respond.'; this.reset() });

    console.log('%cðŸ’° MONEY HEIST %c| La Casa de Papel %câ€” Premium Live',
      'color:#cc0000;font-size:18px;font-weight:bold', 'color:#fff;font-size:13px', 'color:#888;font-size:10px');
  
