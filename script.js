(function() {
  // Dark Mode Toggle
  const toggleBtn = document.getElementById('themeToggle');
  const icon = toggleBtn.querySelector('i');
  const label = toggleBtn.querySelector('.theme-label');
  
  // Verifica preferência salva
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
    icon.className = 'fas fa-sun';
    label.textContent = 'Claro';
  } else {
    label.textContent = 'Escuro';
  }

  toggleBtn.addEventListener('click', function() {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    label.textContent = isDark ? 'Claro' : 'Escuro';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    // Atualiza o mapa se existir
    if (window.map) {
      setTimeout(() => {
        window.map.invalidateSize();
      }, 300);
    }
  });

  // Mobile Menu Toggle
  const menuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');
  const menuIcon = menuBtn.querySelector('i');

  menuBtn.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    if (navLinks.classList.contains('active')) {
      menuIcon.className = 'fas fa-times';
    } else {
      menuIcon.className = 'fas fa-bars';
    }
  });

  // Fecha o menu ao clicar em um link (mobile)
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuIcon.className = 'fas fa-bars';
    });
  });

  // Smooth scroll para links internos
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // Ajuste: em desktop, o menu nunca deve ter a classe active
  function handleResize() {
    if (window.innerWidth >= 768) {
      navLinks.classList.remove('active');
      menuIcon.className = 'fas fa-bars';
    }
  }

  window.addEventListener('resize', handleResize);

  // ===== INICIALIZAÇÃO DO MAPA =====
  // Aguarda o DOM carregar completamente
  if (document.readyState === 'complete') {
    initMap();
  } else {
    window.addEventListener('load', initMap);
  }

  function initMap() {
    // Verifica se o container do mapa existe
    const mapContainer = document.getElementById('map');
    if (!mapContainer) return;

    // Coordenadas: Pemba (-12.973, 40.517) e Nampula (-15.116, 39.266)
    const pemba = [-12.973, 40.517];
    const nampula = [-15.116, 39.266];
    const center = [-13.5, 39.9]; // Centro entre as duas cidades

    // Cria o mapa
    const map = L.map('map', {
      center: center,
      zoom: 7,
      zoomControl: true,
      fadeAnimation: true,
      attributionControl: true
    });

    // Salva referência global para ajustes de tamanho
    window.map = map;

    // Camada de tiles (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
      minZoom: 4
    }).addTo(map);

    // Ícone personalizado para a sede (Pemba)
    const iconSede = L.divIcon({
      className: 'custom-marker',
      html: `<div style="background: #6c3eb8; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px; box-shadow: 0 4px 16px rgba(108,62,184,0.5); border: 3px solid white;"><i class="fas fa-building"></i></div>`,
      iconSize: [28, 28],
      iconAnchor: [14, 14],
      popupAnchor: [0, -18]
    });

    // Ícone para fase piloto (Nampula)
    const iconPiloto = L.divIcon({
      className: 'custom-marker',
      html: `<div style="background: #f9b23f; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 12px; box-shadow: 0 4px 16px rgba(249,178,63,0.5); border: 3px solid white;"><i class="fas fa-flag"></i></div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      popupAnchor: [0, -16]
    });

    // Sede - Pemba
    L.marker(pemba, { icon: iconSede })
      .addTo(map)
      .bindPopup(`
        <div style="font-family: 'Inter', sans-serif; padding: 4px 0;">
          <strong style="color: #6c3eb8; font-size: 1.1rem;">🏢 Sede Moya</strong><br>
          <span style="font-size: 0.85rem; color: #3d3d5c;">Av. Marginal, 1234 · Pemba</span><br>
          <span style="font-size: 0.75rem; color: #7a7a9a;"><i class="fas fa-phone"></i> +258 84 123 4567</span>
        </div>
      `, { maxWidth: 220, className: 'custom-popup' });

    // Fase piloto - Nampula
    L.marker(nampula, { icon: iconPiloto })
      .addTo(map)
      .bindPopup(`
        <div style="font-family: 'Inter', sans-serif; padding: 4px 0;">
          <strong style="color: #f9b23f; font-size: 1.1rem;">🚀 Fase Piloto</strong><br>
          <span style="font-size: 0.85rem; color: #3d3d5c;">Nampula</span><br>
          <span style="font-size: 0.75rem; color: #7a7a9a;"><i class="fas fa-calendar"></i> Operacional desde 2026</span>
        </div>
      `, { maxWidth: 200, className: 'custom-popup' });

    // Adiciona um círculo para indicar a área de cobertura
    L.circle(pemba, {
      radius: 15000, // 15km
      color: '#6c3eb8',
      fillColor: '#6c3eb8',
      fillOpacity: 0.08,
      weight: 2,
      dashArray: '4, 6'
    }).addTo(map);

    L.circle(nampula, {
      radius: 12000, // 12km
      color: '#f9b23f',
      fillColor: '#f9b23f',
      fillOpacity: 0.08,
      weight: 2,
      dashArray: '4, 6'
    }).addTo(map);

    // Linha conectando as duas cidades
    L.polyline([pemba, nampula], {
      color: '#6c3eb8',
      weight: 2,
      opacity: 0.3,
      dashArray: '8, 8'
    }).addTo(map);

    // Ajusta o tamanho do mapa após um pequeno delay
    setTimeout(() => {
      map.invalidateSize();
    }, 400);

    // Reajusta o tamanho ao redimensionar a janela
    let resizeTimeout;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (window.map) {
          window.map.invalidateSize();
        }
      }, 300);
    });

    // Adiciona controle de zoom personalizado no canto superior direito
    L.control.zoom({
      position: 'topright'
    }).addTo(map);
  }
})();