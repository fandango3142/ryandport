/*
  Portfolio website interactions for Ryan D'Souza
*/

document.addEventListener('DOMContentLoaded', () => {
  // Typed text effect in hero
  const words = [
    'Retention',
    'Personalization',
    'AI‑First',
    'Vibe‑Coding',
    'Experimentation',
  ];
  const typedSpan = document.querySelector('.typed-text');
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentWord = words[wordIndex];
    if (!isDeleting) {
      typedSpan.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(type, 1200);
        return;
      }
    } else {
      typedSpan.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }
    }
    setTimeout(type, isDeleting ? 80 : 150);
  }
  // Only run the typed effect if the element exists on the page
  if (typedSpan) {
    type();
  }

  // Animate counters when scrolled into view
  const counters = document.querySelectorAll('.counter');
  const speed = 2000; // total duration for counting
  const counterObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = +counter.getAttribute('data-target');
          const start = 0;
          const increment = Math.ceil(target / (speed / 20));
          let current = start;
          function updateCounter() {
            current += increment;
            if (current > target) current = target;
            counter.textContent = current;
            if (current < target) {
              setTimeout(updateCounter, 20);
            }
          }
          updateCounter();
          observer.unobserve(counter);
        }
      });
    },
    {
      threshold: 0.4,
    }
  );
  counters.forEach((c) => counterObserver.observe(c));

  // Experience timeline data
  const timelineItems = [
    {
      title: 'Early Experience',
      period: '2016 – 2018',
      desc:
        'Marketing Specialist at Amazon (#GiftABook campaign with 94% CTR) and Project Management at BookMyShow (Cirque du Soleil & Bryan Adams tours).',
    },
    {
      title: 'Graduate Trainee, L&T',
      period: 'Oct 2017 – Apr 2018',
      desc:
        'Reduced procurement spend by 10% and coordinated multi-location infrastructure projects.',
    },
    {
      title: 'Solution Leader (PM), Brane Enterprises',
      period: 'Apr 2021 – Oct 2023',
      desc:
        'Launched NLP-powered solutions adopted by 50 clients (~$56M revenue). Accelerated onboarding by well over 80% and led hybrid builder experiments.',
    },
    {
      title: 'Product Manager, Xfinite (ErosNow)',
      period: 'Oct 2023 – Oct 2024',
      desc:
        'Drove generative AI strategy and first AI-generated theatrical release; mentored two APMs; transcoded over 6k assets; secured alliances and partnerships expanding reach to millions.',
    },
    {
      title: 'Product Manager, WebEngage',
      period: 'Oct 2024 – Present',
      desc:
        'Launched CDPx; built a dynamic criteria engine powering personalization; piloted recommendations delivering double‑digit lifts in engagement; improved product discovery and received Rookie Rockstar recognition.',
    },
    {
      title: 'Awards & Recognition',
      period: '',
      desc:
        'Rookie Rockstar Award at WebEngage for early impact and leadership in flagship platform launches.',
    },
  ];

  // Set CSS variable for each timeline segment and attach click events
  const wheel = document.querySelector('.wheel');
  const segments = wheel.querySelectorAll('li');
  segments.forEach((segment, index) => {
    segment.style.setProperty('--i', index);
    segment.addEventListener('click', () => {
      showTimeline(index);
      segments.forEach((el) => el.classList.remove('active'));
      segment.classList.add('active');
    });
  });

  const titleEl = document.getElementById('timeline-title');
  const periodEl = document.getElementById('timeline-period');
  const descEl = document.getElementById('timeline-desc');

  function showTimeline(index) {
    const data = timelineItems[index];
    titleEl.textContent = data.title;
    periodEl.textContent = data.period;
    descEl.textContent = data.desc;
  }

  // Pre-select first segment on load
  showTimeline(0);
  segments[0].classList.add('active');

  // Update footer year
  document.getElementById('year').textContent = new Date().getFullYear();
});