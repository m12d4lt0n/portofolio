// Animate skill bars on DOMContentLoaded
window.addEventListener('DOMContentLoaded', () => {
  // Animate skill bars
  document.querySelectorAll('.bar-inner').forEach(bar => {
    const width = bar.getAttribute('data-width');
    setTimeout(() => {
      bar.style.width = width;
    }, 300);
  });

  // Animate skill bar counters
  document.querySelectorAll('.skill-bar .label span').forEach(span => {
    const target = parseInt(span.textContent.replace('%',''));
    let count = 0;
    const step = () => {
      count += Math.ceil(target / 30);
      if (count > target) count = target;
      span.textContent = count + '%';
      if (count < target) requestAnimationFrame(step);
    };
    span.textContent = '0%';
    setTimeout(step, 400);
  });

  // Scroll-triggered animations
  const observer = new window.IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.animate-fade, .animate-slide').forEach(el => {
    observer.observe(el);
  });

  // Portfolio filter logic
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      portfolioItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Animated hero text typing effect
  const heroText = [
    'Cyber Security Specialist',
    'Web Developer',
    'UI/UX Designer',
    'Mobile App Developer',
    'SOC Analyst',
    'Penetration Tester'
  ];
  let heroIndex = 0, charIndex = 0, typing = true;
  const heroAnimated = document.getElementById('hero-animated-text');
  function typeHero() {
    if (!heroAnimated) return;
    if (typing) {
      if (charIndex < heroText[heroIndex].length) {
        heroAnimated.textContent += heroText[heroIndex][charIndex++];
        setTimeout(typeHero, 70);
      } else {
        typing = false;
        setTimeout(typeHero, 1200);
      }
    } else {
      if (charIndex > 0) {
        heroAnimated.textContent = heroText[heroIndex].slice(0, --charIndex);
        setTimeout(typeHero, 30);
      } else {
        typing = true;
        heroIndex = (heroIndex + 1) % heroText.length;
        setTimeout(typeHero, 400);
      }
    }
  }
  if (heroAnimated) {
    heroAnimated.textContent = '';
    setTimeout(typeHero, 800);
  }

  // --- NEW FEATURES BELOW ---

  // Theme toggle functionality
  const themeToggle = document.querySelector('.theme-toggle');
  const themeIcon = themeToggle.querySelector('i');
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeIcon.className = savedTheme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
  }
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    themeIcon.className = newTheme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
    localStorage.setItem('theme', newTheme);
  });

  // Progress bar functionality
  const progressBar = document.querySelector('.progress-bar');
  window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = `${scrolled}%`;
  });

  // Back to top button functionality
  const backToTop = document.querySelector('.back-to-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });
  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Add portfolio overlay
  document.querySelectorAll('.portfolio-item').forEach(item => {
    const overlay = document.createElement('div');
    overlay.className = 'portfolio-overlay';
    overlay.innerHTML = `
      <div class="overlay-content">
        <h4>${item.querySelector('h4').textContent}</h4>
        <p>${item.querySelector('p').textContent}</p>
        <a href="${item.querySelector('a').href}" class="view-project" target="_blank">View Project</a>
      </div>
    `;
    item.appendChild(overlay);
  });

  // Section navigation logic
  function showSection(section) {
    //Hide all sections with animation
    document.querySelectorAll('.section-content').forEach(sec => {
      sec.classList.remove('active');
      // After transition, hide the section
      setTimeout(() => {
        if (!sec.classList.contains('active')) {
          sec.style.display = 'none';
        }
      }, 500); // Match the CSS transition duration
    });

    // Show the target section
    const target = document.querySelector(`.${section}.section-content`);
    if (target) {
      target.style.display = 'block';
      // Force reflow for transition
      void target.offsetWidth;
      target.classList.add('active');
    }

    // Update nav button active state
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll(`.nav-btn[data-section="${section}"]`).forEach(btn => btn.classList.add('active'));
  }

  // On load, show only About section

  const homeSection = document.querySelector('.home.section-content');
  const portfolioSection = document.querySelector('.portfolio.section-content');

  // أخفِ البورتفوليو
  if (portfolioSection) {
    portfolioSection.style.display = 'none';
    portfolioSection.classList.remove('active');
  }

  // أظهر الهوم فقط
  if (homeSection) {
    homeSection.style.display = 'block';
    void homeSection.offsetWidth;
    homeSection.classList.add('active');
  }

  // فعّل زر Home فقط
  document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.nav-btn[data-section="home"]').forEach(btn => btn.classList.add('active'));

  // Nav button event listeners
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const section = btn.getAttribute('data-section');
      showSection(section);
      document.querySelector('main').scrollIntoView({behavior: 'smooth'});
    });
  });
}); 