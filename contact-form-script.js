// Contact Form Modal Functionality
let isInitialized = false;
let initAttempts = 0;
const maxInitAttempts = 50; // Try for up to 5 seconds (50 * 100ms)
let eventDelegationSetup = false;

// Open modal function - dynamically look up modal each time
function openContactModal() {
    const modal = document.getElementById('contactModal');
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    } else {
        console.warn('Contact modal not found. Retrying...');
        // Retry after a short delay in case modal is still loading
        setTimeout(function() {
            const retryModal = document.getElementById('contactModal');
            if (retryModal) {
                retryModal.classList.add('show');
                document.body.style.overflow = 'hidden';
            } else {
                // If still not found, try multiple times with increasing delays
                let attempts = 0;
                const maxAttempts = 10;
                const checkModal = setInterval(function() {
                    attempts++;
                    const finalModal = document.getElementById('contactModal');
                    if (finalModal) {
                        finalModal.classList.add('show');
                        document.body.style.overflow = 'hidden';
                        clearInterval(checkModal);
                    } else if (attempts >= maxAttempts) {
                        console.error('Contact modal could not be found after multiple attempts');
                        clearInterval(checkModal);
                    }
                }, 200);
            }
        }, 100);
    }
}

// Make openContactModal available globally
window.openContactModal = openContactModal;

// Initialize button listeners using event delegation (works for dynamically added buttons)
function initContactButtons() {
    if (eventDelegationSetup) {
        return;
    }
    eventDelegationSetup = true;
    
    // Use event delegation on document body to catch all contact button clicks
    document.addEventListener('click', function(e) {
        // Check if clicked element or its parent has one of the contact button classes
        let target = e.target;
        let button = null;
        
        // Check the target and all its parents
        while (target && target !== document.body) {
            if (target.classList && (
                target.classList.contains('btn-contact') ||
                target.classList.contains('ready-btn-primary') ||
                target.classList.contains('mobile-cta') ||
                target.classList.contains('mobile-cta-small') ||
                target.classList.contains('contact-us-button') ||
                target.classList.contains('mobile-contact-us-btn')
            )) {
                button = target;
                break;
            }
            // Also check if it's a link or button inside a contact button container
            if (target.tagName === 'A' || target.tagName === 'BUTTON') {
                const parent = target.closest('.btn-contact, .ready-btn-primary, .mobile-cta, .mobile-cta-small, .contact-us-button, .mobile-contact-us-btn');
                if (parent) {
                    button = parent;
                    break;
                }
            }
            target = target.parentElement;
        }
        
        if (button) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Contact button clicked, opening modal...', button);
            openContactModal();
            return false;
        }
    });
}

function initContactForm() {
    const contactModal = document.getElementById('contactModal');
    if (!contactModal) {
        // If modal not found, try again after a short delay
        initAttempts++;
        if (initAttempts < maxInitAttempts) {
            setTimeout(initContactForm, 100);
        }
        return;
    }
    
    // Prevent multiple initializations
    if (isInitialized) {
        return;
    }
    isInitialized = true;
    initAttempts = 0; // Reset counter on successful initialization
    
    const contactForm = document.getElementById('contactForm');
    const contactFormSuccess = document.getElementById('contactFormSuccess');
    const closeBtn = document.querySelector('.contact-modal-close');

    // Close modal function - dynamically look up modal each time
    function closeContactModal() {
        const modal = document.getElementById('contactModal');
        const form = document.getElementById('contactForm');
        const success = document.getElementById('contactFormSuccess');
        
        if (modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
            // Reset form after a delay
            setTimeout(function() {
                if (form) {
                    form.reset();
                    form.style.display = 'block';
                }
                if (success) {
                    success.classList.remove('show');
                }
            }, 300);
        }
    }

    // Make closeContactModal available globally
    window.closeContactModal = closeContactModal;
    
    // Ensure openContactModal is available (should already be set, but just in case)
    if (!window.openContactModal) {
        window.openContactModal = openContactModal;
    }

    // Close modal when clicking outside
    contactModal.addEventListener('click', function(e) {
        if (e.target === contactModal) {
            closeContactModal();
        }
    });

    // Close modal with close button
    if (closeBtn) {
        closeBtn.addEventListener('click', closeContactModal);
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && contactModal.classList.contains('show')) {
            closeContactModal();
        }
    });

    // Handle form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('.contact-form-submit');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            // Collect form data
            const formData = {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value || 'Not provided',
                company: document.getElementById('company').value || 'Not provided',
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            // EmailJS configuration
            const serviceId = 'service_e2w7kzo';
            const templateId = 'template_7i4in4n';
            const publicKey = 'CKYUSJWCHRXIC9j-E';
            
            // Ensure EmailJS is initialized
            if (typeof emailjs === 'undefined') {
                alert('Email service is not loaded. Please refresh the page and try again.');
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
                return;
            }

            // Initialize if not already done
            try {
                emailjs.init(publicKey);
            } catch(e) {
                // Already initialized, continue
            }
            
            // Prepare template parameters for EmailJS
            const templateParams = {
                from_name: `${formData.firstName} ${formData.lastName}`,
                from_email: formData.email,
                phone: formData.phone || 'Not provided',
                company: formData.company || 'Not provided',
                subject: formData.subject,
                message: formData.message,
                to_email: 'khanshaharyar083@gmail.com'
            };

            // Send email using EmailJS
            emailjs.send(serviceId, templateId, templateParams)
                .then(function(response) {
                    // Success
                    contactForm.style.display = 'none';
                    contactFormSuccess.classList.add('show');
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Send Message';
                    contactForm.reset();
                })
                .catch(function(error) {
                    // Error handling
                    console.error('EmailJS Error Details:', {
                        status: error.status,
                        text: error.text,
                        error: error
                    });
                    alert('Sorry, there was an error sending your message. Please check the console for details or try again later.');
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Send Message';
                });
        });
    }
}

// Initialize button listeners immediately (don't wait for modal)
// Event delegation works even if DOM isn't fully ready, but we'll set it up properly
if (document.readyState === 'loading') {
    // Initialize buttons as soon as DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        initContactButtons();
        // Wait a bit for form to be loaded via fetch
        setTimeout(initContactForm, 200);
    });
} else {
    // DOM already loaded, initialize buttons immediately
    initContactButtons();
    // Wait a bit for form to be loaded via fetch
    setTimeout(initContactForm, 200);
}

// Also initialize buttons immediately (event delegation will work)
// This ensures buttons work even if script loads after DOMContentLoaded
if (document.body) {
    initContactButtons();
}

// Also expose initContactForm globally so it can be called after form loads
window.initContactForm = initContactForm;

