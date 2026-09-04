(function() {
    const toggleBtn = document.getElementById('themeToggle');
    const icon = toggleBtn.querySelector('i');
    
    // Verifica preferência salva
    if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark');
      icon.className = 'fas fa-sun';
    }
  
    toggleBtn.addEventListener('click', function() {
      document.body.classList.toggle('dark');
      const isDark = document.body.classList.contains('dark');
      icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  })();