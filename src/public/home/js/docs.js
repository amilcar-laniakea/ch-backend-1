"use strict";

const sidebarToggler = document.getElementById("docs-sidebar-toggler");
const sidebar = document.getElementById("docs-sidebar");
const sidebarLinks = document.querySelectorAll("#docs-sidebar .scrollto");

window.onload = function () {
  responsiveSidebar();
};

window.onresize = function () {
  responsiveSidebar();
};

function responsiveSidebar() {
  let w = window.innerWidth;
  if (w >= 1200) {
    sidebar.classList.remove("sidebar-hidden");
    sidebar.classList.add("sidebar-visible");
  } else {
    sidebar.classList.remove("sidebar-visible");
    sidebar.classList.add("sidebar-hidden");
  }
}

sidebarToggler.addEventListener("click", () => {
  if (sidebar.classList.contains("sidebar-visible")) {
    sidebar.classList.remove("sidebar-visible");
    sidebar.classList.add("sidebar-hidden");
  } else {
    sidebar.classList.remove("sidebar-hidden");
    sidebar.classList.add("sidebar-visible");
  }
});

sidebarLinks.forEach((sidebarLink) => {
  sidebarLink.addEventListener("click", (e) => {
    e.preventDefault();

    var target = sidebarLink.getAttribute("href").replace("#", "");

    document.getElementById(target).scrollIntoView({ behavior: "smooth" });

    if (
      sidebar.classList.contains("sidebar-visible") &&
      window.innerWidth < 1200
    ) {
      sidebar.classList.remove("sidebar-visible");
      sidebar.classList.add("sidebar-hidden");
    }
  });
});

var lightbox = new SimpleLightbox(".simplelightbox-gallery a", {});
