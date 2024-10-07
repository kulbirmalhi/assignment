var last_recap_id;

// $(window).scroll(function(){
//     var scrollPos = $(document).scrollTop();
//     if(scrollPos > 0)
//         $('body').addClass('scrolling');
//     else
//         $('body').removeClass('scrolling');
// });

$(window).on("load resize scroll", function() {
  $(".scroller").each(function() {
    var windowTop = $(window).scrollTop();
    var elementTop = $(this).offset().top;
    var leftPosition = windowTop - elementTop;
      $(this)
        .find(".wrapper")
        .css({ left: leftPosition });
  });
});


$(function() {

    $('body').on('click', '.meal .meal-info h5', function(e) {
        $(this).parent('.meal-info').toggleClass('open');
    });

    $('section#b4 .follow .socials').append($('section.footer .socials').html());

    $('.accordion .accordion-panel .accordion-head').on('click', function(e) {
        e.preventDefault();
        var $panel = $(this).parents('.accordion-panel').first();
        $panel.toggleClass('open');
    });

    $('.js-modal-close').on('click', function(e) {
        e.preventDefault();
        $('html').removeClass('is-clipped');
        $('.is-active').removeClass('is-active');
    });

    AOS.init({
      offset: -100,
      once: true,
      duration: 1000,
      easing: 'ease-in-out',
      delay: 100,
    });

    $('.recaptcha_form').submit(function(event) {
        last_recap_id = $(this).data('recap-id');
        var widgetID = $(this).data('widgetid');
        if (!grecaptcha.getResponse(widgetID)) {
            event.preventDefault();
            console.warn('widgetID', widgetID);
            grecaptcha.execute(widgetID);
        }
    });
    verifyCallback = function(response) {
        console.log('response', response);
        console.log('verifyCallback', last_recap_id);
        $('form[data-recap-id="'+last_recap_id+'"] [name="g-recaptcha-response"]').val(response);
        $('form[data-recap-id="'+last_recap_id+'"]').submit();
    }

    // $(document).ready(function() {

    //   // Check for click events on the navbar burger icon
    //   $(".navbar-burger").click(function() {

    //       // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
    //       $(".navbar-burger").toggleClass("is-active");
    //       $(".navbar-menu").toggleClass("is-active");

    //   });
    // });

    let $marquee = $('section.block_type_logo_marquee .marquee3k');
    if($marquee.length > 0)
    {
        Marquee3k.init({
            selector: 'uspoints',
        });
    }

    if($('section.uspoints').length > 0)
    {
        Marquee3k.init({
            selector: 'uspoints',
        });
    }

    var $menu = $('#mmenu').clone().prependTo('body');
    $menu.removeAttr('id');
    $menu.removeAttr('class');
    $menu.find('[id]').removeAttr('id');
    $menu.find('[class]').removeAttr('class');
    $menu.attr('id', 'menu');
    $menu.mmenu({
        // navbar: {
            // add: true
        // }
    }, {
        // configuration
        offCanvas: {
            pageSelector: ".outerwrapper"
        },
        clone: false
    });

    $('.mag-inline').magnificPopup({
        type:'inline',
        overflowY: 'auto'
    });
    $('.mag-close').on('click', function(e) {
        e.preventDefault();
        $.magnificPopup.close();
    });

    $('.image-link').magnificPopup({type:'image'});

    $('.mag-gallery').each(function(u, v) {
        $(this).magnificPopup({
            delegate: 'a',
            type: 'image',
            mainClass: 'mfp-img-mobile',
            gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [0,1] // Will preload 0 - before current, and 1 after the current image
            },
            image: {
                tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
                titleSrc: function(item) {
                    return item.el.attr('title');
                }
            },
            callbacks: {
                open: function() {
                    $('body').hasClass('popupOpen');
                },
                close: function() {
                    $('body').removeClass('popupOpen');
                }
            }
        });
    });

    $('.mag,a[href*="youtube"]').magnificPopup({
        type: 'iframe',
    });

    $('section.hero .owl-carousel').owlCarousel({
        autoplay: true,
        autoplayTimeout: 2000,
        autoplaySpeed: 2000,
        loop: true,
        nav: false,
        navText: [
            '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 36.1 65.6" xml:space="preserve"><path fill="#f99235" d="M34 65.6l1.9-1.9-32-30.8L36.1 2l-1.9-2L0 32.9z"/></svg>',
            '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 36.1 65.6" xml:space="preserve"><path fill="#f99235" d="M2.1 0l-2 1.9 32 30.8L0 63.6l1.9 2 34.2-32.9z"/></svg>'
        ],
        dots: true,
        items: 1
    });

    var galleryslider = $('section.gallery .slider .owl-carousel').owlCarousel({
        autoplay: false,
        loop: true,
        nav: true,
        navText: [
            '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 36.1 65.6" xml:space="preserve"><path fill="#f99235" d="M34 65.6l1.9-1.9-32-30.8L36.1 2l-1.9-2L0 32.9z"/></svg>',
            '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 36.1 65.6" xml:space="preserve"><path fill="#f99235" d="M2.1 0l-2 1.9 32 30.8L0 63.6l1.9 2 34.2-32.9z"/></svg>'
        ],
        dots: true,
        items: 1,
        onInitialized: function(event) {
            var text = $('section.gallery .slider .owl-carousel .item').eq(0).attr('data-text');
            $('section.gallery .owl-carousel .owl-controls .owl-nav p').remove();
            if(text)
                $('section.gallery .owl-carousel .owl-controls .owl-nav .owl-prev').after('<p>'+text+'</p>');
        }
    });
    galleryslider.on('changed.owl.carousel', function(event) {
        currentIndex = event.item.index;
        var $currentSlide = $(event.relatedTarget.$stage.children()[currentIndex]); // Do something with the slide
        var text = $currentSlide.find('.item').attr('data-text');
        $('section.gallery .owl-carousel .owl-controls .owl-nav p').remove();
        if(text)
            $('section.gallery .owl-carousel .owl-controls .owl-nav .owl-prev').after('<p>'+text+'</p>');
    });

    $('section.testimonials .owl-carousel').owlCarousel({
        autoplay: true,
        autoplayTimeout: 2000,
        autoplaySpeed: 2000,
        loop: true,
        margin: 40,
        nav: false,
        navText: [
            '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 36.1 65.6" xml:space="preserve"><path fill="#f99235" d="M34 65.6l1.9-1.9-32-30.8L36.1 2l-1.9-2L0 32.9z"/></svg>',
            '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 36.1 65.6" xml:space="preserve"><path fill="#f99235" d="M2.1 0l-2 1.9 32 30.8L0 63.6l1.9 2 34.2-32.9z"/></svg>'
        ],
        dots: true,
        items: 3,
        slideBy: 3
    });

    $('.uploader').each(function(index, el) {
        var $uploader = $(this);
        init_uploader($uploader);
    });

});

function addMessage(msg, type = 'success', selector = '.msg')
{
    $(selector).prepend('<div class="notification is-'+type+'"><button class="delete"></button><div class="container">'+msg+'</div></div>');
    if(selector == '.msg')
        $("html, body").animate({ scrollTop: 0 });
}

function clearMessages()
{
    $('.notification').remove();
}

function escapeTags(str)
{
  return String( str )
    .replace( /&/g, '&amp;' )
    .replace( /"/g, '&quot;' )
    .replace( /'/g, '&#39;' )
    .replace( /</g, '&lt;' )
    .replace( />/g, '&gt;' );
}

function init_uploader($uploader)
{
    var data = $uploader.data();
    var btn = $uploader.find('.file-input')[0],
        label = $uploader.find('.file-text')[0],
        progressBar = $uploader.find('progress')[0],
        hiddenInput = $uploader.find('input[type="hidden"]')[0];

    if(data.preview)
        var preview = $(data.preview)[0];

    var uploader = new ss.SimpleUpload({
        button: btn,
        url: ADMIN_AJAX_URL+'/upload.php',
        name: 'file',
        data: data,
        multipart: true,
        queue: false,
        debug: true,
        hoverClass: 'hover',
        focusClass: 'focus',
        responseType: 'json',
        startXHR: function() {
            // progressOuter.style.display = 'block'; // make progress bar visible
            this.setProgressBar( progressBar );
        },
        onSubmit: function() {
            clearMessages(); // empty the message box
            $('.is-buttons button, .field_type_button button').prop('disabled', true);
            label.innerHTML = 'Uploading...'; // change button text to "Uploading..."
          },
        onComplete: function( filename, response ) {
            console.log('response', response);
            label.innerHTML = 'Choose a file...';
            $('.is-buttons button, .field_type_button button').prop('disabled', false);
            progressBar.value = 0; // hide progress bar when upload is completed
            if ( !response ) {
                addMessage('Unable to upload file', 'error');
                return;
            }

            if ( response.success === true ) {
                label.innerHTML = 'Uploaded';
                console.log('success', response);
                // addMessage('<strong>' + escapeTags( filename ) + '</strong>' + ' successfully uploaded.');
                hiddenInput.value = response.file;
                if(response.image)
                {
                    if(preview)
                    {
                        // if($(preview).hasClass('preview-img'))
                        // {
                        //     // $(preview).slideDown();
                        //     // $(preview).find('img').attr('src', response.image);
                        //     $(preview).css('background-image', 'url('+response.image+')');
                        // } else
                            $(preview).css('background-image', 'url('+response.image+')').addClass('has-preview');
                    }
                } else {
                    var $existing_filename = $uploader.find('.file-name');
                    if($existing_filename.length > 0)
                        $existing_filename.text(response.name);
                    else
                        $uploader.find('label.file-label').append('<span class="file-name">'+response.name+'</span>')
                }
            } else {
                console.log('error', response);
                label.innerHTML = 'Upload Failed';
                if ( response.msg )  {
                    addMessage(escapeTags( response.msg ), 'error');

                } else {
                    addMessage('An error occurred and the upload failed.', 'error');
                }
            }
          },
        onError: function(filename, type, status, statusText, response, uploadBtn, size) {
            console.log('filename', filename);
            console.log('type', type);
            console.log('status', status);
            console.log('statusText', statusText);
            console.log('response', response);
            console.log('uploadBtn', uploadBtn);
            console.log('size', size);
            progressBar.value = 0;
            addMessage('Unable to upload file', 'error');
            $('.is-buttons button, .field_type_button button').prop('disabled', false);
          }
    });
}

function numberFormat(number, dec, dsep, tsep) {
    if (isNaN(number)) return "";
    number = number.toFixed(dec || 0);
    var pindex = number.indexOf('.'), fnums, decimals, parts = [];
    if (pindex > -1) {
        fnums = number.substring(0, pindex).split('');
        decimals = (dsep || '.') + number.substr(pindex+1);
    }
    else {
        fnums = number.split('');
        decimals = '';
    }
    do {
        parts.unshift(fnums.splice(-3, 3).join(''));
    } while (fnums.length);
    return parts.join(tsep || ',') + decimals;
}