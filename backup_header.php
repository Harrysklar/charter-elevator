<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<header role="banner" class="fixed top-0 left-0 right-0 z-50 bg-[#EAF3EE] text-black w-full">
    <!-- Mobile Mini-Bar -->
    <div class="md:hidden">
        <div class="relative h-16 bg-[#EAF3EE] flex items-center">
            <!-- hamburger (left) -->
            <button id="mob-hamburger" aria-label="Toggle mobile menu" class="absolute left-3 top-1/2 transform -translate-y-1/2 p-2 focus:outline-none z-20">
                <svg class="h-6 w-6" fill="none" stroke="black" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
            
            <!-- logo (centered) - IMMEDIATE SIZE FIX -->
<div class="absolute inset-0 flex items-center justify-center z-10">
    <a href="<?php echo home_url(); ?>">
        <img src="<?php echo get_charter_image('charter_logo.png'); ?>" 
             alt="Charter Elevator Logo" 
             class="h-12 w-auto max-w-full object-contain" 
             style="height: 48px !important; max-width: 200px !important; width: auto !important; object-fit: contain !important;" />
    </a>
</div>
            
            <!-- survey trigger (right) -->
            <button id="mob-survey" aria-label="Open feedback survey" class="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 focus:outline-none text-black z-20">
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
            </button>
        </div>
        
        <!-- dropdown panel -->
        <nav id="mob-menu" style="display:none;" class="hidden absolute top-full left-0 w-full flex flex-col bg-[#EAF3EE] z-[9999]">
            <?php
            wp_nav_menu(array(
                'theme_location' => 'primary',
                'container'      => false,
                'menu_class'     => 'p-4 space-y-3',
                'fallback_cb'    => false,
                'walker'         => new Charter_Mobile_Walker(),
            ));
            ?>
        </nav>
    </div>
    
    <!-- desktop header grid -->
    <div class="w-full grid grid-cols-12 grid-rows-2 h-32 hidden md:grid items-center content-center">
        <!-- Logo (25% width) -->
        <div class="col-span-3 row-span-2 px-4 flex items-center">
            <a href="<?php echo home_url(); ?>" class="block w-full">
                <img src="<?php echo get_charter_image('charter_logo.png'); ?>" alt="Charter Elevator Logo" class="charter-logo-desktop w-full h-auto object-contain" />
            </a>
        </div>
        
        <!-- Top-right contact -->
        <div class="col-span-9 row-span-1 flex justify-end items-center pr-4">
            <div class="flex flex-col items-center">
                <div class="text-sm font-semibold">24/7 emergency service</div>
                <a href="tel:877-632-4278" class="font-bold text-xl underline text-black">877-632-4278</a>
            </div>
        </div>
        
        <!-- Nav -->
        <nav role="navigation" aria-label="Primary" class="col-span-9 row-span-1 flex items-center">
            <?php
            wp_nav_menu(array(
                'theme_location' => 'primary',
                'container' => false,
                'menu_class' => 'flex flex-1 justify-evenly font-medium text-lg',
                'fallback_cb' => false,
                'walker' => new Charter_Desktop_Walker(),
            ));
            ?>
        </nav>
    </div>
</header>

<div class="site-wrapper">

<!-- MINIMAL: Just fix header transparency issue -->
<style>
/* Fix header transparency on services/locations/contact pages */
header {
    background-color: #EAF3EE !important;
}

header .bg-\[#EAF3EE\] {
    background-color: #EAF3EE !important;
}
</style>