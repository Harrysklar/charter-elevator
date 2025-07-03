(() => {  
  // 1) Reserve scrollbar space so pages don’t jump
  const styleTag = document.createElement('style');
  styleTag.textContent = `
    .site-wrapper {
      display: flex;
      flex-direction: column;
      min-height: calc(100vh - 8rem); /* header is 8rem tall */
    }
    #site-footer {
      margin-top: auto;
    }
    html { overflow-y: scroll; }
  `;
  document.head.appendChild(styleTag);

  // 2) Build your header
  const headerHTML = `
  <header
    role="banner"
    class="fixed top-0 left-0 right-0 z-50 bg-[#EAF3EE] text-black w-full"
  >
    <!-- Mobile Mini-Bar -->
<div class="md:hidden">
  <div class="relative h-16 bg-[#EAF3EE]">
    <!-- hamburger (left) -->
    <button id="mob-hamburger"
            class="absolute left-3 top-1/2 transform -translate-y-1/2 p-2 focus:outline-none z-20">
      <svg class="h-6 w-6" fill="none" stroke="black" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>

    <!-- logo (centered) -->
    <div class="absolute inset-0 flex items-center justify-center z-10">
      <a href="index.html">
        <img src="images/charter_logo.png"
             alt="Charter Elevator Logo"
             class="h-32 w-auto max-w-full object-contain" />
      </a>
    </div>

    <!-- survey trigger (right) -->
    <button id="mob-survey"
            class="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 focus:outline-none text-black z-20">
      <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 
                 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
    </button>
  </div>
</div>

      <!-- dropdown panel -->
      <nav id="mob-menu" class="hidden flex-col bg-[#EAF3EE]">
        <ul class="p-4 space-y-3">
          <li><a href="index.html"     class="block text-black font-medium">About Us</a></li>
          <li><a href="services.html"  class="block text-black font-medium">Services</a></li>
          <li><a href="locations.html" class="block text-black font-medium">Locations</a></li>
          <li><a href="contact.html"   class="block text-black font-medium">Contact Us</a></li>
          <li>
            <button
              id="mob-survey-2"
              class="w-full text-left text-black font-medium"
            >Leave Feedback</button>
          </li>
        </ul>
      </nav>
    </div>

      <!-- desktop header grid -->
      <div class="w-full grid grid-cols-12 grid-rows-2 h-32 hidden md:grid items-center content-center">
      <!-- Logo (25% width) -->
      <div class="col-span-3 row-span-2 px-4 flex items-center">
        <a href="index.html" class="block w-full">
          <img
            src="images/charter_logo.png"
            alt="Charter Elevator Logo"
            class="w-full h-auto max-w-[260px] object-contain"
          />
        </a>
      </div>

        <!-- Top-right contact -->
        <div class="col-span-9 row-span-1 flex justify-end items-center pr-4">
          <div class="flex flex-col items-center">
            <div class="text-sm font-semibold">24/7 emergency service</div>
            <a
              href="tel:877-632-4278"
              class="font-bold text-xl underline text-black"
            >877-632-4278</a>
          </div>
        </div>

        <!-- Nav -->
        <nav
          role="navigation"
          aria-label="Primary"
          class="col-span-9 row-span-1 flex items-center"
        >
          <!-- Desktop links -->
          <ul id="nav-links" class="flex flex-1 justify-evenly font-medium text-lg">
            <li><a href="index.html"      class="nav-link px-4 py-2 text-black hover:text-[var(--color-cta)]">About Us</a></li>
            <li><a href="services.html"   class="nav-link px-4 py-2 text-black hover:text-[var(--color-cta)]">Services</a></li>
            <li><a href="locations.html"  class="nav-link px-4 py-2 text-black hover:text-[var(--color-cta)]">Locations</a></li>
            <li><a href="contact.html"    class="nav-link px-4 py-2 text-black hover:text-[var(--color-cta)]">Contact Us</a></li>
          </ul>
          <!-- mobile hamburger sits here only on md:hidden screens, but we've already handled that above -->
        </nav>
      </div>

      <!-- ─── Shared Mobile Menu Panel (hidden by default) ──────── -->
      <div id="mobile-menu" class="md:hidden hidden bg-[var(--color-accent)]">
        <ul class="flex flex-col space-y-2 p-4">
          <li><a href="index.html"     class="nav-link text-white hover:text-[var(--color-cta)]">About Us</a></li>
          <li><a href="services.html"  class="nav-link text-white hover:text-[var(--color-cta)]">Services</a></li>
          <li><a href="locations.html" class="nav-link text-white hover:text-[var(--color-cta)]">Locations</a></li>
          <li><a href="contact.html"   class="nav-link text-white hover:text-[var(--color-cta)]">Contact Us</a></li>
        </ul>
      </div>

    </header>
  `;

  // 3) Inject header + footer
  const headerContainer = document.getElementById('site-header');
  if (headerContainer) headerContainer.innerHTML = headerHTML;

  const footerHTML = `
  <footer id="site-footer" class="bg-gray-800 text-white py-8">
    <div class="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
      <!-- Quick Links -->
      <div>
        <h4 class="font-semibold mb-4">Quick Links</h4>
        <ul class="space-y-2">
          <li><a href="index.html" class="hover:text-orange-500">About Us</a></li>
          <li><a href="services.html" class="hover:text-orange-500">Services</a></li>
          <li><a href="locations.html" class="hover:text-orange-500">Locations</a></li>
          <li><a href="contact.html" class="hover:text-orange-500">Contact Us</a></li>
        </ul>
      </div>

      <!-- Headquarters -->
      <div>
        <h4 class="font-semibold mb-4">Our Headquarters</h4>
        <p class="text-gray-200">
          <a href="https://www.google.com/maps/place/Charter+Elevator/@33.5874691,-79.0304563,15.77z/data=!4m15!1m8!3m7!1s0x89003fd2e07c75db:0x80fed9cd60432d5f!2sCharter+Elevator!8m2!3d33.5877564!4d-79.0284156!10e1!16s%2Fg%2F11xmx751v3!3m5!1s0x89003fd2e07c75db:0x80fed9cd60432d5f!8m2!3d33.5877564!4d-79.0284156!16s%2Fg%2F11xmx751v3?entry=ttu&g_ep=EgoyMDI1MDYzMC4wIKXMDSoASAFQAw%3D%3D" class="hover:text-orange-500">9751 Moose Road, Unit 9<br />
          Murrells Inlet, SC 29576
          </a>
        </p>
      </div>

      <!-- Contact Info -->
      <div>
        <h4 class="font-semibold mb-4">Contact</h4>
        <p class="text-gray-200">
          Phone: <a href="tel:877-632-4278" class="hover:text-orange-500">877-632-4278</a><br />
          Email: <a href="mailto:Info@CharterElevator.com" class="hover:text-orange-500">Info@CharterElevator.com</a>
        </p>
      </div>
    </div>
    <div class="mt-8 text-center text-sm text-gray-500">
      © 2025 Charter Elevator. All Rights Reserved.
    </div>
  </footer>
`;

  const footerContainer = document.getElementById('site-footer');
  if (footerContainer) footerContainer.innerHTML = footerHTML;

  document.getElementById('mob-survey').addEventListener('click', () =>
    document.getElementById('open-survey').click()
  );

  // ─── Wire up mobile menu toggle alongside logo on desktop hamburger if desired
  //    (you can hook #nav-toggle here to toggle #mobile-menu, but since mobile hamburger is above,
  //     your desktop hamburger is hidden on mobile anyway)
})();
