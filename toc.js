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
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded affix "><a href="welcome.html">Welcome to the SRL Docs</a></li><li class="chapter-item expanded affix "><a href="editing.html">Editing the docs</a></li><li class="chapter-item expanded affix "><li class="part-title">Avionics</li><li class="chapter-item expanded "><a href="avionics/centralpage.html"><strong aria-hidden="true">1.</strong> About Avionics</a></li><li class="chapter-item expanded "><a href="avionics/gettinginvolved.html"><strong aria-hidden="true">2.</strong> Getting Involved</a></li><li class="chapter-item expanded "><a href="avionics/resumeadvice.html"><strong aria-hidden="true">3.</strong> Resume Advice</a></li><li class="chapter-item expanded "><a href="avionics/avionics_testrocket/testingrocket.html"><strong aria-hidden="true">4.</strong> Avionics Test Rocket</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="avionics/avionics_testrocket/testrocketrequirementsmeetingnotes.html"><strong aria-hidden="true">4.1.</strong> Requirements Meeting Notes</a></li><li class="chapter-item expanded "><a href="avionics/avionics_testrocket/testingprocessdocumentation.html"><strong aria-hidden="true">4.2.</strong> Testing Process Documentation</a></li></ol></li><li class="chapter-item expanded "><a href="avionics/RF/RF.html"><strong aria-hidden="true">5.</strong> RF</a></li><li class="chapter-item expanded "><a href="avionics/hardware/hardware.html"><strong aria-hidden="true">6.</strong> Hardware</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="avionics/hardware/setup.html"><strong aria-hidden="true">6.1.</strong> Getting Set Up</a></li><li class="chapter-item expanded "><a href="avionics/hardware/altiumlicensing.html"><strong aria-hidden="true">6.2.</strong> License Renewal</a></li><li class="chapter-item expanded "><a href="avionics/hardware/applicationnotes.html"><strong aria-hidden="true">6.3.</strong> Useful Links and Application Notes</a></li><li class="chapter-item expanded "><a href="avionics/hardware/designprocess.html"><strong aria-hidden="true">6.4.</strong> Design Process</a></li><li class="chapter-item expanded "><a href="avionics/hardware/freesampleslist.html"><strong aria-hidden="true">6.5.</strong> Free Samples</a></li><li class="chapter-item expanded "><a href="avionics/hardware/pastprojects/pastprojects.html"><strong aria-hidden="true">6.6.</strong> Past Projects</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="avionics/hardware/pastprojects/adaptorboard.html"><strong aria-hidden="true">6.6.1.</strong> Adaptor Board</a></li></ol></li></ol></li><li class="chapter-item expanded "><a href="avionics/software/software.html"><strong aria-hidden="true">7.</strong> Software</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="avionics/software/newmember.html"><strong aria-hidden="true">7.1.</strong> New Software Members</a></li><li class="chapter-item expanded "><a href="avionics/software/devnotes.html"><strong aria-hidden="true">7.2.</strong> Development Notes</a></li><li class="chapter-item expanded "><a href="avionics/software/usefullinks.html"><strong aria-hidden="true">7.3.</strong> Useful Links</a></li><li class="chapter-item expanded "><a href="avionics/software/currentprojects/currentprojects.html"><strong aria-hidden="true">7.4.</strong> Current Projects</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="avionics/software/currentprojects/sensorapps.html"><strong aria-hidden="true">7.4.1.</strong> Sensor Apps</a></li><li class="chapter-item expanded "><a href="avionics/software/currentprojects/gpstesting.html"><strong aria-hidden="true">7.4.2.</strong> GPS Testing</a></li><li class="chapter-item expanded "><a href="avionics/software/currentprojects/bbbtoolchain.html"><strong aria-hidden="true">7.4.3.</strong> BBB Toolchain</a></li></ol></li><li class="chapter-item expanded "><a href="avionics/software/pastprojects/pastprojects.html"><strong aria-hidden="true">7.5.</strong> Past Projects</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="avionics/software/pastprojects/cfs.html"><strong aria-hidden="true">7.5.1.</strong> cFS</a></li><li class="chapter-item expanded "><a href="avionics/software/pastprojects/cosmos.html"><strong aria-hidden="true">7.5.2.</strong> COSMOS</a></li></ol></li></ol></li><li class="chapter-item expanded "><a href="avionics/archive/archive.html"><strong aria-hidden="true">8.</strong> Archive</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="avionics/archive/currentprojects/currentprojects.html"><strong aria-hidden="true">8.1.</strong> Current Projects</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="avionics/archive/currentprojects/testingboard/testingboard.html"><strong aria-hidden="true">8.1.1.</strong> Testing Board</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="avionics/archive/currentprojects/testingboard/testingboardrequirements.html"><strong aria-hidden="true">8.1.1.1.</strong> Requirements</a></li><li class="chapter-item expanded "><a href="avionics/archive/currentprojects/testingboard/microcontroller.html"><strong aria-hidden="true">8.1.1.2.</strong> Microcontroller Notes</a></li><li class="chapter-item expanded "><a href="avionics/archive/currentprojects/testingboard/LT3080.html"><strong aria-hidden="true">8.1.1.3.</strong> LDO (LT3080)</a></li><li class="chapter-item expanded "><a href="avionics/archive/currentprojects/testingboard/ceramiccapacitors.html"><strong aria-hidden="true">8.1.1.4.</strong> Ceramic Capacitors Notes</a></li><li class="chapter-item expanded "><a href="avionics/archive/currentprojects/testingboard/testingboard_calcsANDsims.html"><strong aria-hidden="true">8.1.1.5.</strong> Simulations and Calcs</a></li><li class="chapter-item expanded "><a href="avionics/archive/currentprojects/testingboard/powerbudget.html"><strong aria-hidden="true">8.1.1.6.</strong> Power Budget</a></li></ol></li></ol></li><li class="chapter-item expanded "><a href="avionics/archive/futurenotes.html"><strong aria-hidden="true">8.2.</strong> Future Recruitment Notes</a></li></ol></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0];
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
