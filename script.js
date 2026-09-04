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
  })();