// =====  Content data  =====
const features = [
  { icon: "🤖", title: "Modular Kits", text: "Snap‑together parts. Zero soldering." },
  { icon: "🚚", title: "Fast Shipping", text: "Worldwide delivery in 24 h." },
  { icon: "🎥", title: "Video Guides", text: "Step‑by‑step tutorials for every kit." },
  { icon: "🛠️", title: "Lifetime Support", text: "Real engineers, real answers." },
  { icon: "🌐", title: "Open Source Projects", text: "Collaborative development for all." },
  { icon: "📜", title: "Certificate Upon Course Completion", text: "Earn recognition for your skills." },
];
  
  const stats = [
    { number: "25k+", label: "Robots shipped" },
    { number: "4.9★", label: "Average rating" },
    { number: "120+", label: "Countries served" },
    { number: "3h", label: "Avg. build time" }
  ];
  
  const partners = [
    "partner-arduino.png",
    "partner-nasa.png",
    "partner-mit.png",
    "partner-google.png",
    "partner-meta.png"
  ];
  
  const testimonials = [
    { quote: "RoboRoots cut our prototype time from weeks to hours!", author: "Alex K., IoT Founder" },
    { quote: "Finally, hardware that feels like software.", author: "Samira D., Robotics Teacher" },
    { quote: "My students can build a line‑following bot before lunch.", author: "Dr. Lee, STEM Lab" }
  ];
  
  const pricing = [
    { tier: "Starter", price: 49, perks: ["1× Core board", "2× Motor drivers", "Docs & videos"] },
    { tier: "Pro", price: 99, perks: ["Everything in Starter", "Sensor pack", "Bluetooth module"] },
    { tier: "Ultimate", price: 199, perks: ["Everything in Pro", "LIDAR module", "Lifetime priority support"] }
  ];
  
  const faqs = [
    { 
      q: "Do I need advanced technical skills to use the RoboRoots app?", 
      a: "Not at all! The RoboRoots app is built for beginners and experts alike, offering interactive tutorials and plug-and-play support that eliminate the need for soldering or complex setups."
    },
    { 
      q: "What warranty or support does the app and hardware come with?", 
      a: "All our kits come with a two‑year warranty, and the RoboRoots app is regularly updated with bug fixes, new features, and in‑app support from our engineering team."
    },
    { 
      q: "Can I use the RoboRoots app internationally?", 
      a: "Yes! Our kits are available in over 120 countries, and the app is fully localized, so you can enjoy its features no matter where you are."
    },
    { 
      q: "Will I be able to upgrade or add new features to the app later?", 
      a: "Absolutely! The RoboRoots app supports add‑on modules and regular updates, allowing you to expand and enhance your robotics experience as new features become available."
    },
  ];
  
  // =====  Helper  =====
  const $ = (tag, cls, html) => {
    const el = document.createElement(tag);
    if (cls) el.className = cls;
    if (html) el.innerHTML = html;
    return el;
  };
  
  // =====  Inject features  =====
  const featureGrid = document.getElementById("features-grid");
  features.forEach(f => {
    const card = $("article", "feature-card");
    card.append($("span", "icon", f.icon));
    card.append($("h3", null, f.title));
    card.append($("p", null, f.text));
    featureGrid.append(card);
  });
  
  // =====  Inject stats  =====
  const statsGrid = document.getElementById("stats-grid");
  stats.forEach(s => {
    const item = $("div", "stat");
    item.append($("p", "stat__number", s.number));
    item.append($("p", "stat__label", s.label));
    statsGrid.append(item);
  });
  
  // =====  Inject partners  =====
  const logosWrap = document.getElementById("partners-logos");
  partners.forEach(src => {
    const img = new Image();
    img.src = `./${src}`;
    img.alt = "Partner logo";
    logosWrap.append(img);
  });
  
  // =====  Inject pricing  =====
  const pricingGrid = document.getElementById("pricing-grid");
  pricing.forEach(p => {
    const card = $("article", "price-card");
    card.append($("h3", null, p.tier));
    card.append($("p", "price", `$${p.price}`));
    const ul = $("ul");
    p.perks.forEach(item => ul.append($("li", null, item)));
    card.append(ul);
    card.append($("a", "btn btn--primary", "Choose"));
    pricingGrid.append(card);
  });
  
  // =====  Testimonial slider  =====
  const slider = document.getElementById("testimonial-slider");
  let slideIdx = 0;
  const renderSlide = () => {
    slider.innerHTML = "";
    const t = testimonials[slideIdx];
    const slide = $("div", "slide active");
    slide.append($("p", null, `“${t.quote}”`));
    slide.append($("p", "author", t.author));
    slider.append(slide);
  };
  renderSlide();
  setInterval(() => {
    slideIdx = (slideIdx + 1) % testimonials.length;
    renderSlide();
  }, 5000);
  
  // =====  FAQ accordion  =====
  const faqList = document.getElementById("faq-list");
  faqs.forEach(({ q, a }) => {
    const item = $("div", "faq-item");
    const question = $("button", "faq-q", q);
    const answer = $("div", "faq-a", a);
    item.append(question, answer);
    question.addEventListener("click", () => {
      answer.classList.toggle("open");
    });
    faqList.append(item);
  });
  
  // =====  Newsletter  =====
  const newsletterForm = document.getElementById("newsletter-form");
  newsletterForm.addEventListener("submit", e => {
    e.preventDefault();
    document.getElementById("newsletter-msg").textContent = "Thanks! Check your inbox.";
    newsletterForm.reset();
  });
  
  // =====  Contact form (demo)  =====
  const contactForm = document.getElementById("contact-form");
  contactForm.addEventListener("submit", e => {
    e.preventDefault();
    document.getElementById("contact-msg").textContent = "Message sent! We'll reply soon.";
    contactForm.reset();
  });
  
  // =====  Smooth‑scroll  =====
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const id = link.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
  
  // =====  Dynamic year  =====
  document.getElementById("year").textContent = new Date().getFullYear();


  // Function to show the modal
const showModal = () => {
  document.getElementById("downloadModal").style.display = "block";
};

// Function to hide the modal
const closeModal = () => {
  document.getElementById("downloadModal").style.display = "none";
};

// Attach click event to all Choose buttons within the pricing cards
document.querySelectorAll(".pricing__grid .btn.btn--primary").forEach(btn => {
  btn.addEventListener("click", e => {
    e.preventDefault(); // Prevent default navigation
    showModal();
  });
});

// Attach click event to the close button
document.querySelector("#downloadModal .close").addEventListener("click", closeModal);

// Optionally, allow closing the modal by clicking outside the modal content
window.addEventListener("click", e => {
  const modal = document.getElementById("downloadModal");
  if (e.target === modal) {
    closeModal();
  }
});
