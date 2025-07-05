document.addEventListener('DOMContentLoaded', () => {

  // --- THEME TOGGLE ---
  const themeToggleBtn = document.getElementById('themeToggle');
  
  if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  themeToggleBtn.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
  // --- ANIMATED GRADIENT CURSOR ---
    const cursorGlow = document.querySelector('.cursor-glow');
    document.addEventListener('mousemove', e => {
        // Use GSAP for smoother animation
        gsap.to(cursorGlow, {
            duration: 0.5,
            x: e.clientX,
            y: e.clientY,
            ease: "power2.out"
        });
    });



  // --- MODAL LOGIC ---
  const modalOverlay = document.getElementById("modalOverlay");
  const modalContent = document.getElementById("modalContent");
  const modalTitle = document.getElementById("modalTitle");
  const modalDescription = document.getElementById("modalDescription");
  const modalTech = document.getElementById("modalTech");
  const modalMedia = document.getElementById("modalMedia");
  const modalLinks = document.getElementById("modalLinks");
  const closeModalBtn = document.getElementById("closeModal");

  const closeModal = () => modalOverlay.classList.remove("active");

  closeModalBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', e => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });
  window.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });


  // --- PROJECT DATA ---
  const projects = [
    {
      title: "Branding Design – Premium Meats",
      coverImage: "assets/premium1.jpg",
      media: [
        { type: "image", src: "assets/premium1.jpg" },
        { type: "image", src: "assets/premium2.jpg" },
        { type: "video", src: "assets/premium1-preview.mp4" },
        { type: "video", src: "assets/premium2-preview.mp4" }
      ],
      description: "Created digital flyers, social media posts, and a brand logo for a humane, high-quality meat business. Focused on a clean, premium aesthetic.",
      tech: "Html, css, Canva, Adobe Illustrator, Figma",
      liveUrl: null, 
      repoUrl: null,
    },
    {
      title: "Internship Hiring Task – Web Page (Google Services UI Clone)",
      coverImage: "assets/google-ui-preview.jpg", 
      media: [
        { type: "video", src: "assets/hiring-task1.mp4" },
        { type: "video", src: "assets/hiring-task2.mp4" }
      ],
      description: "A responsive landing page inspired by Google’s design system. Built using HTML, CSS, and GSAP for animations, layout, and UI practice.",
      tech: "HTML, CSS, Gsap",
      liveUrl: "https://farheen-google-clone.netlify.app", 
      repoUrl: "https://github.com/FarheenSultana0615/google-services-ui",
    },
    {
      title: "Web Developer Intern – Sam Data Services",
      coverImage: "assets/project4.jpg",
      media: [{ type: "image", src: "assets/project4.jpg" }],
      description: "As part of my internship, I developed and maintained WordPress landing pages, created product pages using .NET and Bootstrap, wrote technical blog posts, and performed software testing.",
      tech: "WordPress, .NET, Bootstrap 5, SEO",
      liveUrl: null, 
      repoUrl: null,
    },
    {
      title: "HTML/CSS/JS Freelance Tutor – Drexel University",
      coverImage: "assets/project1.jpg",
      media: [{ type: "image", src: "assets/project1.jpg" }],
      description: "Provided remote, one-on-one tutoring sessions for university students, covering fundamental and advanced topics in HTML, CSS, and JavaScript to help them succeed in their coursework.",
      tech: "HTML, CSS, JavaScript, VS Code Live Share",
      liveUrl: null,
      repoUrl: null,
    }
  ];
  const projectGrid = document.getElementById("projectsGrid");
  projects.forEach((project, index) => {
    const card = document.createElement("div");
    card.className = "group cursor-pointer bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden shadow-md transform transition duration-300 hover:scale-105 hover:shadow-xl";
    card.onclick = () => openModal(index);
    
    card.innerHTML = `
      <div class="relative">
        <img src="${project.coverImage || 'https://placehold.co/600x400/a78bfa/FFFFFF?text=Work+Experience'}" alt="Cover image for ${project.title}" class="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110" onerror="this.src='https://placehold.co/600x400/a78bfa/FFFFFF?text=Work+Experience'; this.onerror=null;"/>
        <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
            <p class="text-white opacity-0 group-hover:opacity-100 font-semibold">View Details</p>
        </div>
      </div>
      <div class="p-4">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white">${project.title}</h3>
      </div>
    `;
    projectGrid.appendChild(card);
  });

  // --- FUNCTION TO OPEN AND POPULATE MODAL ---
  function openModal(index) {
    const p = projects[index];
    modalTitle.textContent = p.title;
    modalDescription.textContent = p.description;
    modalTech.textContent = `Technologies: ${p.tech}`;
    
    modalMedia.innerHTML = "";
    modalLinks.innerHTML = "";

    p.media.forEach(m => {
      let el;
      if (m.type === "image") {
        el = document.createElement("img");
        el.src = m.src;
        el.alt = `Image for ${p.title}`;
        el.className = "rounded-lg w-full max-h-[400px] object-contain shadow-md";
        el.onerror = "this.style.display='none'";
      } else if (m.type === "video") {
        el = document.createElement("video");
        el.controls = true;
        el.className = "rounded-lg w-full shadow-md";
        el.innerHTML = `<source src="${m.src}" type="video/mp4">Your browser does not support the video tag.`;
      }
      if (el) modalMedia.appendChild(el);
    });

    if (p.liveUrl) {
      const liveLink = document.createElement('a');
      liveLink.href = p.liveUrl;
      liveLink.target = "_blank";
      liveLink.rel = "noopener noreferrer";
      liveLink.className = "inline-block bg-pink-500 text-white px-5 py-2 rounded-full hover:bg-pink-600 shadow transform hover:scale-105 transition-all";
      liveLink.textContent = "Live Demo";
      modalLinks.appendChild(liveLink);
    }

    if (p.repoUrl) {
      const repoLink = document.createElement('a');
      repoLink.href = p.repoUrl;
      repoLink.target = "_blank";
      repoLink.rel = "noopener noreferrer";
      repoLink.className = "inline-block bg-gray-600 text-white px-5 py-2 rounded-full hover:bg-gray-700 shadow transform hover:scale-105 transition-all";
      repoLink.textContent = "Source Code";
      modalLinks.appendChild(repoLink);
    }

    modalOverlay.classList.add("active");
  }
});