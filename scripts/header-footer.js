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

  // 2) Inject a two-row grid header; logo spans both rows on left
  const headerHTML = `
  <header
    role="banner"
    class="
      fixed top-0 left-0 right-0 z-50
      bg-darkgray text-white
      h-auto py-4 px-4
      md:h-32 md:py-0 md:px-0
      flex flex-col md:grid
      md:grid-cols-12 md:grid-rows-2
      items-center
    "
  >
    <!-- Logo -->
    <div class="flex items-center mb-4 md:mb-0 md:col-span-3 md:row-span-2">
      <a href="index.html">
        <img
          src="https://charterelevator.com/wp-content/uploads/2022/09/logo-centered.png"
          alt="Company Logo"
          class="h-12 md:h-full w-auto"
        />
      </a>
    </div>

    <!-- Top-right contact (under logo on mobile) -->
    <div class="flex flex-col items-center mb-4 md:mb-0 md:col-span-9 md:row-span-1 md:justify-end md:pr-4">
      <div class="text-sm font-semibold">Available 24/7 for Emergencies!</div>
      <a
        href="tel:877-632-4278"
        class="font-bold text-lg md:text-xl underline"
      >877-632-4278</a>
    </div>

    <!-- Nav -->
    <nav
      role="navigation"
      aria-label="Primary"
      class="w-full md:col-span-9 md:row-span-1 flex items-center justify-between"
    >
      <!-- Mobile hamburger -->
      <button id="nav-toggle" class="md:hidden text-white focus:outline-none">
        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <!-- Desktop links (hidden mobile) -->
      <ul id="nav-links" class="hidden md:flex flex-1 justify-evenly font-medium">
        <li><a href="index.html"      class="nav-link text-white hover:text-[var(--color-cta)]">About Us</a></li>
        <li><a href="services.html"   class="nav-link text-white hover:text-[var(--color-cta)]">Services</a></li>
        <li><a href="locations.html"  class="nav-link text-white hover:text-[var(--color-cta)]">Locations</a></li>
        <li><a href="contact.html"    class="nav-link text-white hover:text-[var(--color-cta)]">Contact Us</a></li>
      </ul>
    </nav>

    <!-- Mobile menu -->
    <div id="mobile-menu" class="md:hidden hidden w-full bg-darkgray mt-4">
      <ul class="flex flex-col space-y-2 p-4">
        <li><a href="index.html"     class="nav-link text-white hover:text-[var(--color-cta)]">About Us</a></li>
        <li><a href="services.html"  class="nav-link text-white hover:text-[var(--color-cta)]">Services</a></li>
        <li><a href="locations.html" class="nav-link text-white hover:text-[var(--color-cta)]">Locations</a></li>
        <li><a href="contact.html"   class="nav-link text-white hover:text-[var(--color-cta)]">Contact Us</a></li>
      </ul>
    </div>
  </header>
`;



  // 3) Inject updated footer
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
            9751 Moose Rd., Unit #9<br />
            Murrells Inlet, SC 29576
          </p>
        </div>

        <!-- Contact Info -->
        <div>
          <h4 class="font-semibold mb-4">Contact</h4>
          <p class="text-gray-200">
            Phone: <a href="tel:877-632-4278" class="hover:text-orange-500">877-632-4278</a><br />
            Email: <a href="mailto:info@charterelevator.com" class="hover:text-orange-500">info@charterelevator.com</a>
          </p>
        </div>
      </div>
      <div class="mt-8 text-center text-sm text-gray-500">
        © 2025 Charter Elevator. All Rights Reserved.
      </div>
    </footer>
  `;

  // Inject header
  const headerContainer = document.getElementById('site-header');
  if (headerContainer) headerContainer.innerHTML = headerHTML;

  // Inject footer
  const footerContainer = document.getElementById('site-footer');
  if (footerContainer) footerContainer.innerHTML = footerHTML;
})();
