(() => {
  // 1) Reserve scrollbar space so pages don’t jump
  const styleTag = document.createElement('style');
  styleTag.textContent = `
    .site-wrapper {
      display: flex;
      flex-direction: column;
      min-height: calc(100vh - 4rem);
    }
    #site-footer {
      margin-top: auto;
    }
    html { overflow-y: scroll; }
  `;
  document.head.appendChild(styleTag);

  // 2) Inject a fixed header without a link on the logo
  const headerHTML = `
    <header role="banner" class="fixed top-0 left-0 right-0 z-50 bg-white">
      <!-- Top Bar: Logo (no link) + Contact -->
      <div class="border-b bg-white">
        <div class="container mx-auto flex items-center justify-between py-3 px-4">
          <!-- Logo only -->
          <div class="flex items-center space-x-2">
            <a href="index.html">
              <img
                src="https://charterelevator.com/wp-content/uploads/2022/09/logo-centered.png"
                alt="Company Logo"
                class="h-12 w-auto"
              />
            </a>
          </div>
          <!-- Prominent Contact Us -->
          <div class="flex flex-col items-center">
            <div class="text-sm font-semibold">Available 24/7 for Emergencies!</div>
            <a
              href="tel:877-632-4278"
              class="font-bold text-xl"
              aria-label="Call Charter Elevator at 877-632-4278"
            >877-632-4278</a>
          </div>
        </div>
      </div>

      <!-- Main Nav Bar (solid white background) -->
      <nav role="navigation" aria-label="Primary" class="bg-white">
        <div class="container mx-auto flex items-center justify-between py-3 px-4">
          <!-- Hamburger (mobile) -->
          <button id="nav-toggle" class="md:hidden focus:outline-none">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <!-- Desktop nav links aligned to the right -->
          <ul id="nav-links" class="hidden md:flex ml-auto space-x-8 font-medium">
            <li><a href="index.html"      class="nav-link" aria-label="About Us">About Us</a></li>
            <li><a href="services.html"   class="nav-link" aria-label="Services">Services</a></li>
            <li><a href="locations.html"  class="nav-link" aria-label="Locations">Locations</a></li>
            <li><a href="contact.html"    class="nav-link" aria-label="Contact Us">Contact Us</a></li>
          </ul>
        </div>

        <!-- Mobile menu (four items) -->
        <div id="mobile-menu" class="md:hidden hidden bg-white">
          <ul class="flex flex-col space-y-2 p-4">
            <li><a href="index.html"     class="nav-link" aria-label="About Us">About Us</a></li>
            <li><a href="services.html"  class="nav-link" aria-label="Services">Services</a></li>
            <li><a href="locations.html" class="nav-link" aria-label="Locations">Locations</a></li>
            <li><a href="contact.html"   class="nav-link" aria-label="Contact Us">Contact Us</a></li>
          </ul>
        </div>
      </nav>
    </header>
  `;

  // 3) Footer unchanged
  const footerHTML = `
    <footer id="contact" class="py-8 bg-bg">
      <div class="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 class="font-semibold">Contact Us</h3>
          <p>877-632-4278</p>
          <p><a href="mailto:info@charterelevator.com" aria-label="Email Charter Elevator">info@charterelevator.com</a></p>
        </div>
        <div>
          <h3 class="font-semibold">Address</h3>
          <p>123 Main Street</p>
          <p>City, State ZIP</p>
        </div>
        <div>
          <h3 class="font-semibold">Follow Us</h3>
          <div class="flex space-x-4" aria-label="Social media links">
            <a href="#" aria-label="Follow us on Facebook"><div class="w-6 h-6 rounded-full"></div></a>
            <a href="#" aria-label="Follow us on Twitter"><div class="w-6 h-6 rounded-full"></div></a>
          </div>
        </div>
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
