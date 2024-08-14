/**
 * Main JavaScript file for Incremental Capital LLC website
 * @file
 * @author Incremental Capital LLC
 * @version 1.0.0
 */

(function() {
    "use strict"; // Enforce stricter parsing and error handling

    /**
     * DOM element representing the body of the document
     * @type {HTMLElement}
     */
    var $body = document.querySelector('body');

    /**
     * Removes the 'is-preload' class from the body after a short delay
     * This is typically used to trigger initial animations or reveal content
     */
    window.addEventListener('load', function() {
        window.setTimeout(function() {
            $body.classList.remove('is-preload');
        }, 100);
    });

    /**
     * Slideshow Background
     * Creates a slideshow effect for the background images
     */
    (function() {
        // Configuration for the slideshow
        var settings = {
            // Images to be used in the slideshow
            images: {
                'images/bg01.jpg': 'center',
                'images/bg02.jpg': 'center',
                'images/bg03.jpg': 'center'
            },
            // Delay between image transitions (in milliseconds)
            delay: 6000
        };

        var pos = 0, lastPos = 0;
        var $wrapper, $bgs = [], $bg;

        // Create background wrapper
        $wrapper = document.createElement('div');
        $wrapper.id = 'bg';
        $body.appendChild($wrapper);

        // Create individual background elements
        for (var k in settings.images) {
            $bg = document.createElement('div');
            $bg.style.backgroundImage = 'url("' + k + '")';
            $bg.style.backgroundPosition = settings.images[k];
            $wrapper.appendChild($bg);
            $bgs.push($bg); // Add it to array.
        }

        // Initialize the first background
        $bgs[pos].classList.add('visible');
        $bgs[pos].classList.add('top');

        // If there's only one background or transitions aren't supported, exit
        if ($bgs.length == 1 || !canUse('transition')) return;

        // Set up the slideshow interval
        window.setInterval(function() {
            lastPos = pos;
            pos++;

            // Wrap to beginning if necessary
            if (pos >= $bgs.length) pos = 0;

            // Swap top images
            $bgs[lastPos].classList.remove('top');
            $bgs[pos].classList.add('visible');
            $bgs[pos].classList.add('top');

            // Hide last image after a short delay
            window.setTimeout(function() {
                $bgs[lastPos].classList.remove('visible');
            }, settings.delay / 2);

        }, settings.delay);
    })();

    /**
     * Signup Form Handler
     * Manages form submission and feedback
     */
    (function() {
        var $form = document.querySelector('#signup-form');
        var $submit = $form.querySelector('input[type="submit"]');
        var $message;

        // Create message element
        $message = document.createElement('span');
        $message.classList.add('message');
        $form.appendChild($message);

        /**
         * Displays a message to the user
         * @param {string} type - The type of message ('success' or 'failure')
         * @param {string} text - The message text
         */
        $message._show = function(type, text) {
            $message.innerHTML = text;
            $message.classList.add(type);
            $message.classList.add('visible');

            window.setTimeout(function() {
                $message._hide();
            }, 3000);
        };

        /**
         * Hides the message element
         */
        $message._hide = function() {
            $message.classList.remove('visible');
        };

        // Form submission event handler
        $form.addEventListener('submit', function(event) {
            event.preventDefault();
            $message._hide(); // Hide message.
            $submit.disabled = true; // Disable submit.

            // Simulate form processing (replace with actual form submission logic)
            window.setTimeout(function() {
                $form.reset(); // Reset form.
                $submit.disabled = false; // Enable submit.
                $message._show('success', 'Thank you!'); // Show message.
            }, 750);
        });
    })();

    /**
	 * Updates the current year in the footer
	 */
	function updateCurrentYear() {
		var currentYearElement = document.getElementById('current-year');
		if (currentYearElement) {
			currentYearElement.textContent = new Date().getFullYear();
		}
	}

	// Call the updateCurrentYear function immediately
	updateCurrentYear();

	// Also call the updateCurrentYear function when the DOM is fully loaded
	document.addEventListener('DOMContentLoaded', updateCurrentYear);

})();

/**
 * Utility function to check if a CSS property or feature can be used
 * @param {string} p - The property or feature to check
 * @returns {boolean} True if the property can be used, false otherwise
 */
window.canUse = function(p) {
    if (!window._canUse) window._canUse = document.createElement("div");
    var e = window._canUse.style,
        up = p.charAt(0).toUpperCase() + p.slice(1);
    return p in e || "Moz" + up in e || "Webkit" + up in e || "O" + up in e || "ms" + up in e;
};