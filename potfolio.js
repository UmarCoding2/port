 const skillsSection = document.getElementById('skills-section');
        const skillBars = document.querySelectorAll('.skill-bar');
        let skillsAnimated = false;

        const animateSkills = () => {
            skillBars.forEach(bar => {
                const level = bar.getAttribute('data-level');
                const progress = bar.querySelector('.bar-progress');
                // Set the width based on the data-level attribute, triggering the CSS transition
                progress.style.width = level + '%';
            });
            skillsAnimated = true;
        };

        const checkScroll = () => {
            if (skillsAnimated) return;

            // Get the position of the skills section
            const sectionPos = skillsSection.getBoundingClientRect().top;
            const screenHeight = window.innerHeight;

            // Animate if the section is visible (when its top position is less than 3/4 of the screen height)
            if (sectionPos < screenHeight * 0.75) {
                animateSkills();
                // Remove the event listener once the animation runs
                window.removeEventListener('scroll', checkScroll);
            }
        };

        window.addEventListener('scroll', checkScroll);
        // Also check on load in case the section is already visible
        checkScroll();


        // === 2. Typing Animation in Home Section ===
        const typingElement = document.getElementById('element');
        const roles = ["Web Developer", "UI/UX Designer", "Front-End Engineer"];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        const type = () => {
            const currentRole = roles[roleIndex];
            const display = currentRole.substring(0, charIndex);
            typingElement.textContent = display;

            if (!isDeleting) {
                // Typing forward
                charIndex++;
                if (charIndex > currentRole.length) {
                    // Finished typing, start waiting and then deleting
                    isDeleting = true;
                    setTimeout(type, 1500); // Wait time before deleting
                    return;
                }
            } else {
                // Deleting
                charIndex--;
                if (charIndex < 0) {
                    // Finished deleting, move to the next role
                    isDeleting = false;
                    roleIndex = (roleIndex + 1) % roles.length;
                    charIndex = 0;
                    setTimeout(type, 500); // Wait time before typing the next word
                    return;
                }
            }

            const speed = isDeleting ? 75 : 150;
            setTimeout(type, speed);
        };

        document.addEventListener('DOMContentLoaded', () => {
            // Start the typing effect when the page loads
            type();
        });

        // === 3. Hamburger Menu Toggle Logic ===
        const nav = document.getElementById('main-nav');
        const hamburger = document.getElementById('hamburger-menu');

        const toggleMenu = () => {
            // Toggle the 'nav-open' class on the nav element
            nav.classList.toggle('nav-open');
            const isExpanded = nav.classList.contains('nav-open');
            // Update ARIA attribute for accessibility
            hamburger.setAttribute('aria-expanded', isExpanded);

            // Toggle the icon (bars to times/close)
            const icon = hamburger.querySelector('i');
            if (isExpanded) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            
                 // 'fa-times' is the 'X' close icon
            } else {
                icon.classList.remove('fa-times')
                icon.classList.add('fa-bars');
            }
        };

        // Event listener for the hamburger button click
        hamburger.addEventListener('click', toggleMenu);

        // Close the menu when a navigation link is clicked (for smooth scrolling)
        nav.querySelectorAll('a').forEach(e => {
            e.addEventListener('click', () => {
                // Check if the mobile menu is currently open (indicated by the class)
                console.log('Link clicked');
                if (nav.classList.contains('nav-open')) {
                    // Call the toggle function to close it gracefully
                    toggleMenu();
                }
            });
        });