// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded affix "><a href="welcome.html">Welcome to the SRL Docs</a></li><li class="chapter-item expanded affix "><a href="editing.html">Editing the docs</a></li><li class="chapter-item expanded affix "><li class="part-title">Avionics</li><li class="chapter-item expanded "><a href="avionics/centralpage.html"><strong aria-hidden="true">1.</strong> About Avionics</a></li><li class="chapter-item expanded "><a href="avionics/gettinginvolved.html"><strong aria-hidden="true">2.</strong> Getting Involved</a></li><li class="chapter-item expanded "><a href="avionics/resumeadvice.html"><strong aria-hidden="true">3.</strong> Resume Advice</a></li><li class="chapter-item expanded "><a href="avionics/resources/resources.html"><strong aria-hidden="true">4.</strong> Resources</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="avionics/resources/common_practices/avionics_common_practices.html"><strong aria-hidden="true">4.1.</strong> SRL Avionics Common Practices</a></li><li class="chapter-item expanded "><a href="avionics/resources/common_practices/dev_cycle.html"><strong aria-hidden="true">4.2.</strong> SRL Avionics Project Development Cycle</a></li><li class="chapter-item expanded "><a href="avionics/resources/git/git.html"><strong aria-hidden="true">4.3.</strong> Git Resources</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="avionics/resources/git/git_procedure.html"><strong aria-hidden="true">4.3.1.</strong> SRL Git Workflow</a></li></ol></li><li class="chapter-item expanded "><a href="avionics/resources/embedded/embedded.html"><strong aria-hidden="true">4.4.</strong> Embedded Resources</a></li><li class="chapter-item expanded "><a href="avionics/resources/zephyr/zephyr.html"><strong aria-hidden="true">4.5.</strong> ZephyrRTOS Resources</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="avionics/resources/zephyr/zephyr_install.html"><strong aria-hidden="true">4.5.1.</strong> Installation</a></li><li class="chapter-item expanded "><a href="avionics/resources/zephyr/zephyr_peripherals.html"><strong aria-hidden="true">4.5.2.</strong> Peripheral Interface</a></li><li class="chapter-item expanded "><a href="avionics/resources/zephyr/zephyr_threading.html"><strong aria-hidden="true">4.5.3.</strong> Threading</a></li></ol></li><li class="chapter-item expanded "><a href="avionics/resources/pcb/pcb.html"><strong aria-hidden="true">4.6.</strong> PCB Resources</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="avionics/resources/pcb/heritage_designs.html"><strong aria-hidden="true">4.6.1.</strong> Heritage Designs</a></li><li class="chapter-item expanded "><a href="avionics/resources/pcb/pcb_standards.html"><strong aria-hidden="true">4.6.2.</strong> PCB Design Standards</a></li><li class="chapter-item expanded "><a href="avionics/resources/pcb/pcb_bringup_procedure.html"><strong aria-hidden="true">4.6.3.</strong> PCB Bringup Procedure</a></li></ol></li><li class="chapter-item expanded "><a href="avionics/resources/structures/structures.html"><strong aria-hidden="true">4.7.</strong> Structures Resources</a></li><li class="chapter-item expanded "><a href="avionics/resources/rf/rf.html"><strong aria-hidden="true">4.8.</strong> RF Resources</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="avionics/resources/rf/rf_basics.html"><strong aria-hidden="true">4.8.1.</strong> RF Basics</a></li><li class="chapter-item expanded "><a href="avionics/resources/rf/rf_antennas.html"><strong aria-hidden="true">4.8.2.</strong> Antennas</a></li></ol></li></ol></li><li class="chapter-item expanded "><a href="avionics/currentprojects/current_projects.html"><strong aria-hidden="true">5.</strong> Current Projects</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="avionics/currentprojects/phoenix/phoenix.html"><strong aria-hidden="true">5.1.</strong> Phoenix Flight Computer</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="avionics/currentprojects/phoenix/phx_software.html"><strong aria-hidden="true">5.1.1.</strong> Phoenix Software</a></li></ol></li><li class="chapter-item expanded "><a href="avionics/currentprojects/WALRUS.html"><strong aria-hidden="true">5.2.</strong> WALRUS Video Streaming</a></li><li class="chapter-item expanded "><a href="avionics/currentprojects/lighthouse/lighthouse.html"><strong aria-hidden="true">5.3.</strong> Lighthouse Cooperative Radar</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="avionics/currentprojects/lighthouse/antennadesign.html"><strong aria-hidden="true">5.3.1.</strong> Lighthouse Antenna Design</a></li></ol></li><li class="chapter-item expanded "><a href="avionics/currentprojects/avbay.html"><strong aria-hidden="true">5.4.</strong> Spaceshot Avionics Bay</a></li><li class="chapter-item expanded "><a href="avionics/currentprojects/groundstation.html"><strong aria-hidden="true">5.5.</strong> Ground Station</a></li></ol></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0].split("?")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
