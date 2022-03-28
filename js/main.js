/*!
 * Item: CodeX
 * Description:  Personal Portfolio / Resume / CV / vCard Template
 * Author/Developer: Exill
 * Author/Developer URL: https://themeforest.net/user/exill
 * Version: v1.0.0
 * License: Themeforest Standard Licenses: https://themeforest.net/licenses
 */

/*----------- Table of Contents -----------*/

/**
 * Globals
 * Sidebar
 * Home
 * Portfolio
 * Testimonials
 * Contact
 * Preloader
 */

(function ($) {
  "use strict";
  $(function () {
    /*----------- Globals -----------*/

    // Scrolling animation if the user clicks on a Hash link that has 'data-scroll' attribute
    $(document).on("click", 'a[data-scroll][href^="#"]', function (e) {
      var id = $(this).attr("href");
      var $id = $(id);
      if ($id.length === 0) {
        return;
      }
      e.preventDefault();
      $("body, html").animate(
        {
          scrollTop: $id.offset().top,
        },
        600
      );
    });

    /*----------- Sidebar -----------*/

    $("body").scrollspy({
      target: ".sidebar .list-menu",
    });

    $(".sidebar .list-menu")
      .clone()
      .children()
      .appendTo(".mobile-navbar .navbar-nav")
      .find(".nav-link")
      .removeClass("active");

    $(document).on("mouseup", function (event) {
      if ($(".mobile-navbar #mobileNavbarSupportedContent").hasClass("show")) {
        // The mobile Bootstrap navbar dropdown
        var navbarToggler = $(".mobile-navbar .navbar-toggler");
        if (
          !navbarToggler.is(event.target) &&
          navbarToggler.has(event.target).length === 0
        ) {
          navbarToggler.trigger("click");
        }
      }
    });

    /*----------- Home -----------*/

    /* Animated heading text */
    (function () {
      // Set animation timing
      var animationDelay = 2500,
        // Clip effect
        revealDuration = 660,
        revealAnimationDelay = 1500;

      initHeadline();

      function initHeadline() {
        // Initialise headline animation
        animateHeadline($(".cd-headline"));
      }

      function animateHeadline($headlines) {
        var duration = animationDelay;
        $headlines.each(function () {
          var headline = $(this);
          if (headline.hasClass("clip")) {
            var spanWrapper = headline.find(".cd-words-wrapper"),
              newWidth = spanWrapper.width() + 10;
            spanWrapper.css("width", newWidth);
          }

          //trigger animation
          setTimeout(function () {
            hideWord(headline.find(".is-visible").eq(0));
          }, duration);
        });
      }

      function hideWord($word) {
        var nextWord = takeNext($word);

        if ($word.parents(".cd-headline").hasClass("clip")) {
          $word.parents(".cd-words-wrapper").animate(
            {
              width: "2px",
            },
            revealDuration,
            function () {
              switchWord($word, nextWord);
              showWord(nextWord);
            }
          );
        }
      }

      function showWord($word, $duration) {
        if ($word.parents(".cd-headline").hasClass("clip")) {
          $word.parents(".cd-words-wrapper").animate(
            {
              width: $word.width() + 10,
            },
            revealDuration,
            function () {
              setTimeout(function () {
                hideWord($word);
              }, revealAnimationDelay);
            }
          );
        }
      }

      function takeNext($word) {
        return !$word.is(":last-child")
          ? $word.next()
          : $word.parent().children().eq(0);
      }

      function takePrev($word) {
        return !$word.is(":first-child")
          ? $word.prev()
          : $word.parent().children().last();
      }

      function switchWord($oldWord, $newWord) {
        $oldWord.removeClass("is-visible").addClass("is-hidden");
        $newWord.removeClass("is-hidden").addClass("is-visible");
      }
    })();
  });
  $(window).on("load", function () {
    /*----------- Preloader -----------*/

    $(".preloader-icon").fadeOut(400);
    $(".preloader").delay(500).fadeOut("slow");

    /*----------- Portfolio -----------*/

    (function () {
      var grid = $(".portfolio-area .portfolio-grid");
      var filters = $(".portfolio-area .filter-control li");

      grid.isotope({
        itemSelector: ".single-item",
      });
      filters.on("click", function () {
        filters.removeClass("tab-active");
        $(this).addClass("tab-active");
        var selector = $(this).data("filter");
        grid.isotope({
          filter: selector,
          transitionDuration: ".25s",
        });
      });
    })();

    $(".portfolio-area .portfolio-grid .portfolio-item").each(function () {
      var element = $(this);
      var target = element.attr("href");
      $(element).animatedModal({
        animatedIn: "fadeIn",
        animatedOut: "fadeOut",
        animationDuration: ".15s",
        beforeOpen: function () {
          $(target + ".lightbox-wrapper .lightbox-gallery").owlCarousel({
            loop: true,
            margin: 10,
            nav: false,
            items: 1,
            smartSpeed: 400,
          });
        },
        afterClose: function () {
          $(target + ".lightbox-wrapper .lightbox-gallery").trigger(
            "destroy.owl.carousel"
          );
        },
      });
    });
  });
})(jQuery);
