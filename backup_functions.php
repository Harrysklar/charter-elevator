<?php
/**
 * Charter Elevator Theme Functions
 * Hybrid version: Working foundation + safe improvements
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Theme setup (keeping your working version + WebP support)
function charter_elevator_setup() {
    // Add theme support
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', array('search-form', 'comment-form', 'comment-list', 'gallery', 'caption'));
    
    // Register navigation menus
    register_nav_menus(array(
        'primary' => __('Primary Menu', 'charter-elevator'),
        'mobile' => __('Mobile Menu', 'charter-elevator'),
    ));
    
    // SAFE ADDITION: Enable WebP support
    add_filter('wp_check_filetype_and_ext', 'charter_add_webp_support', 10, 4);
}
add_action('after_setup_theme', 'charter_elevator_setup');

// Define SMTP settings for email functions (keeping your working version)
if (!defined('SMTP_FROM')) {
    define('SMTP_FROM', 'noreply@charterelevator.com');
}

// SAFE ADDITION: Basic performance preconnects (minimal, non-intrusive)
add_action('wp_head', 'charter_basic_preconnects', 1);
function charter_basic_preconnects() {
    echo '<link rel="preconnect" href="https://cdn.tailwindcss.com">';
    echo '<link rel="dns-prefetch" href="https://cdn.tailwindcss.com">';
}

// Enqueue scripts and styles (your working version + contact form)
function charter_elevator_scripts() {
    $theme_version = wp_get_theme()->get('Version') ?: '1.0.0';
    
    // Add Tailwind config inline in the header (keeping your working config)
    wp_add_inline_script('jquery-core', '
        window.tailwind = {
            config: {
                theme: {
                    extend: {
                        colors: {
                            coolgray1: "#D9D8D6",
                            brandgreen: "#59796D",
                            darkgray: "#2C2E2F",
                            darkgreen: "#1F2A23"
                        }
                    }
                }
            }
        };
    ', 'before');
    
    // Enqueue Tailwind CDN (keeping your working version)
    wp_enqueue_script('tailwind-cdn', 'https://cdn.tailwindcss.com', array(), null, false);
    
    // Enqueue custom CSS
    wp_enqueue_style('charter-elevator-custom', get_template_directory_uri() . '/assets/css/custom.css', array(), $theme_version);
    
    // Enqueue custom JavaScript (keeping your working approach)
    wp_enqueue_script('charter-elevator-nav', get_template_directory_uri() . '/assets/js/nav.js', array(), $theme_version, true);
    wp_enqueue_script('charter-elevator-survey', get_template_directory_uri() . '/assets/js/survey.js', array(), $theme_version, true);
    wp_enqueue_script('charter-elevator-floatbuttons', get_template_directory_uri() . '/assets/js/float-buttons.js', array(), $theme_version, true);
    
    // SAFE ADDITION: Contact form script
    wp_enqueue_script('charter-elevator-contact', get_template_directory_uri() . '/assets/js/contact.js', array(), $theme_version, true);
    
    // SAFE ADDITION: AJAX data for both survey and contact scripts
    $ajax_data = array(
        'ajax_url' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('feedback_nonce'),
        'contact_nonce' => wp_create_nonce('contact_nonce')
    );
    
    wp_localize_script('charter-elevator-survey', 'charter_ajax', $ajax_data);
    wp_localize_script('charter-elevator-contact', 'charter_ajax', $ajax_data);
}
add_action('wp_enqueue_scripts', 'charter_elevator_scripts');

// SAFE ADDITION: Enhanced custom image URL function with WebP support
function get_charter_image($filename, $webp_fallback = true) {
    $base_url = get_template_directory_uri() . '/assets/images/';
    
    // Check if WebP version exists and browser supports it
    if ($webp_fallback && function_exists('wp_get_webp_info')) {
        $webp_filename = preg_replace('/\.(jpg|jpeg|png)$/i', '.webp', $filename);
        $webp_path = get_template_directory() . '/assets/images/' . $webp_filename;
        
        if (file_exists($webp_path)) {
            return $base_url . $webp_filename;
        }
    }
    
    return $base_url . $filename;
}

// SAFE ADDITION: WebP MIME type support
function charter_add_webp_support($data, $file, $filename, $mimes) {
    $filetype = wp_check_filetype($filename, $mimes);
    
    if (empty($filetype['ext']) && strpos($filename, '.webp') !== false) {
        $data['ext'] = 'webp';
        $data['type'] = 'image/webp';
    }
    
    return $data;
}

// Desktop Menu Walker (keeping your working version)
class Charter_Desktop_Walker extends Walker_Nav_Menu {
    function start_lvl(&$output, $depth = 0, $args = null) {
        $output .= '<ul class="flex flex-1 justify-evenly font-medium text-lg">';
    }
    
    function start_el(&$output, $item, $depth = 0, $args = null, $id = 0) {
        $classes = 'nav-link px-4 py-2 text-black hover:text-[var(--color-cta)]';
        $output .= '<li>';
        $output .= '<a href="' . $item->url . '" class="' . $classes . '">' . $item->title . '</a>';
    }
}

// Mobile Menu Walker (keeping your working version)
class Charter_Mobile_Walker extends Walker_Nav_Menu {
    function start_lvl(&$output, $depth = 0, $args = null) {
        $output .= '<ul class="p-4 space-y-3">';
    }
    
    function start_el(&$output, $item, $depth = 0, $args = null, $id = 0) {
        $output .= '<li>';
        $output .= '<a href="' . $item->url . '" class="block text-black font-medium">' . $item->title . '</a>';
    }
}

// Footer Menu Walker (keeping your working version)
class Charter_Footer_Walker extends Walker_Nav_Menu {
    function start_lvl(&$output, $depth = 0, $args = null) {
        $output .= '<ul class="space-y-2">';
    }
    
    function start_el(&$output, $item, $depth = 0, $args = null, $id = 0) {
        $output .= '<li>';
        $output .= '<a href="' . $item->url . '" class="hover:text-orange-500 hover:underline">' . $item->title . '</a>';
    }
}

// UPDATED: Configure PHPMailer for GoDaddy Production SMTP (was MailHog)
add_action('phpmailer_init', 'configure_production_smtp');
function configure_production_smtp($phpmailer) {
    $phpmailer->isSMTP();
    $phpmailer->Host = 'relay-hosting.secureserver.net'; // GoDaddy SMTP
    $phpmailer->Port = 25;
    $phpmailer->SMTPAuth = false; // GoDaddy hosting typically doesn't need auth
    $phpmailer->From = 'noreply@charterelevator.com';
    $phpmailer->FromName = 'Charter Elevator';
}

// Handle feedback form submission (keeping your working version)
add_action('wp_ajax_submit_feedback', 'handle_feedback_submission');
add_action('wp_ajax_nopriv_submit_feedback', 'handle_feedback_submission');

function handle_feedback_submission() {
    // Verify nonce for security
    if (!isset($_POST['nonce']) || !wp_verify_nonce($_POST['nonce'], 'feedback_nonce')) {
        wp_send_json_error('Security check failed');
        return;
    }
    
    // Get form data
    $email = sanitize_email($_POST['email']);
    $feedback = sanitize_textarea_field($_POST['feedback']);
    $rating = intval($_POST['rating']);
    
    // Email to admin
    $to = 'Info@CharterElevator.com'; // Change this to your desired email
    $subject = 'Charter Elevator - Customer Feedback (Rating: ' . $rating . ' stars)';
    
    $message = "<html><body>";
    $message .= "<h2>New Customer Feedback</h2>";
    $message .= "<p><strong>Customer Email:</strong> " . $email . "</p>";
    $message .= "<p><strong>Rating:</strong> " . $rating . " stars</p>";
    $message .= "<p><strong>Feedback:</strong></p>";
    $message .= "<p>" . nl2br($feedback) . "</p>";
    $message .= "<hr>";
    $message .= "<p><em>Submitted on: " . date('F j, Y, g:i a') . "</em></p>";
    $message .= "</body></html>";
    
    $headers = array(
        'Content-Type: text/html; charset=UTF-8',
        'From: Charter Elevator <' . SMTP_FROM . '>',
        'Reply-To: ' . $email
    );
    
    $email_sent = wp_mail($to, $subject, $message, $headers);
    
    // Send confirmation to customer
    if ($email_sent) {
        $customer_subject = 'Thank you for your feedback - Charter Elevator';
        
        $customer_message = "<html><body>";
        $customer_message .= "<h2>Thank you for your feedback!</h2>";
        $customer_message .= "<p>Dear Customer,</p>";
        $customer_message .= "<p>We appreciate you taking the time to provide feedback about our services. Your input helps us continually improve and better serve our customers.</p>";
        $customer_message .= "<p>We take all feedback seriously and will review your comments with our team.</p>";
        $customer_message .= "<p>If you need immediate assistance, please don't hesitate to call us at <strong>877-632-4278</strong>.</p>";
        $customer_message .= "<br>";
        $customer_message .= "<p>Best regards,<br>The Charter Elevator Team</p>";
        $customer_message .= "</body></html>";
        
        $customer_headers = array(
            'Content-Type: text/html; charset=UTF-8',
            'From: Charter Elevator <' . SMTP_FROM . '>'
        );
        
        wp_mail($email, $customer_subject, $customer_message, $customer_headers);
    }
    
    if ($email_sent) {
        wp_send_json_success(array('message' => 'Feedback submitted successfully'));
    } else {
        wp_send_json_error('Failed to send email. Please try again.');
    }
}

// SAFE ADDITION: Handle contact form submission (enhanced version)
add_action('wp_ajax_submit_contact', 'handle_contact_submission');
add_action('wp_ajax_nopriv_submit_contact', 'handle_contact_submission');

function handle_contact_submission() {
    // Verify nonce for security
    if (!isset($_POST['nonce']) || !wp_verify_nonce($_POST['nonce'], 'contact_nonce')) {
        wp_send_json_error('Security check failed');
        return;
    }
    
    // Get and sanitize form data
    $email = sanitize_email($_POST['email']);
    $phone = sanitize_text_field($_POST['phone']);
    $message = sanitize_textarea_field($_POST['message']);
    
    // Validate required fields
    if (empty($email) || empty($message)) {
        wp_send_json_error('Please fill in all required fields.');
        return;
    }
    
    if (!is_email($email)) {
        wp_send_json_error('Please enter a valid email address.');
        return;
    }
    
    // Email to admin
    $to = 'Info@CharterElevator.com'; // Your admin email
    $subject = 'Charter Elevator - New Contact Form Submission';
    
    $admin_message = "<html><body>";
    $admin_message .= "<h2>New Contact Form Submission</h2>";
    $admin_message .= "<p><strong>Customer Email:</strong> " . $email . "</p>";
    
    if (!empty($phone)) {
        $admin_message .= "<p><strong>Phone:</strong> " . $phone . "</p>";
    }
    
    $admin_message .= "<p><strong>Message:</strong></p>";
    $admin_message .= "<div style='background-color: #f5f5f5; padding: 15px; border-left: 4px solid #005587; margin: 10px 0;'>";
    $admin_message .= nl2br($message);
    $admin_message .= "</div>";
    $admin_message .= "<hr>";
    $admin_message .= "<p><em>Submitted on: " . date('F j, Y, g:i a') . "</em></p>";
    $admin_message .= "<p><em>From website contact form</em></p>";
    $admin_message .= "</body></html>";
    
    $headers = array(
        'Content-Type: text/html; charset=UTF-8',
        'From: Charter Elevator <' . SMTP_FROM . '>',
        'Reply-To: ' . $email
    );
    
    $email_sent = wp_mail($to, $subject, $admin_message, $headers);
    
    // Send confirmation to customer
    if ($email_sent) {
        $customer_subject = 'Thank you for contacting Charter Elevator';
        
        $customer_message = "<html><body>";
        $customer_message .= "<h2>Thank you for contacting us!</h2>";
        $customer_message .= "<p>Dear " . (strpos($email, '@') ? substr($email, 0, strpos($email, '@')) : 'Customer') . ",</p>";
        $customer_message .= "<p>We have received your message and appreciate you reaching out to Charter Elevator. Our team will review your inquiry and respond as soon as possible.</p>";
        
        $customer_message .= "<div style='background-color: #f8f9fa; padding: 15px; border: 1px solid #dee2e6; border-radius: 5px; margin: 20px 0;'>";
        $customer_message .= "<h3 style='margin-top: 0; color: #005587;'>Your Message:</h3>";
        $customer_message .= "<p>" . nl2br($message) . "</p>";
        $customer_message .= "</div>";
        
        $customer_message .= "<p>For urgent matters or immediate assistance, please don't hesitate to call us at <strong>877-632-4278</strong> - we provide 24/7 emergency service.</p>";
        $customer_message .= "<br>";
        $customer_message .= "<p>Best regards,<br>";
        $customer_message .= "<strong>The Charter Elevator Team</strong><br>";
        $customer_message .= "Phone: 877-632-4278<br>";
        $customer_message .= "Email: Info@CharterElevator.com</p>";
        $customer_message .= "</body></html>";
        
        $customer_headers = array(
            'Content-Type: text/html; charset=UTF-8',
            'From: Charter Elevator <' . SMTP_FROM . '>'
        );
        
        wp_mail($email, $customer_subject, $customer_message, $customer_headers);
    }
    
    if ($email_sent) {
        wp_send_json_success(array('message' => 'Thank you! Your message has been sent successfully. We will get back to you soon.'));
    } else {
        wp_send_json_error('Sorry, there was an error sending your message. Please try calling us at 877-632-4278 or try again later.');
    }
}
?>