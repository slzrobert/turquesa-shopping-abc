(function($) {
  
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  // Initiate the wowjs
  new WOW().init();

  /* Envia E-mail */

  function enviarEmail(dados){

    let parametros = dados;

    console.log(parametros);

    return;

    if (typeof axios === 'function') {

      axios.post('enviaemail.php', parametros).then(function (response) {
        console.log(response);
      }).catch(function (error) {
        console.log(error);
      });
    }

  }

  //$('.btn-envia-email').on('click', enviarEmail);

  $('#form-contato').submit((e) => {

    e.preventDefault();
    
    let formdata = $('#form-contato').serializeArray()
    .reduce(function (json, { name, value }) {
      json[name] = value;
      return json;
    }, {});

    enviarEmail(formdata);

  });


  /**
   * Mosaic
   */
  let mosaics = document.querySelectorAll(".mosaic");

  function autoAjustMosaic(){
      
    mosaics.forEach(mosaic => {

        let largura = mosaic.clientWidth;
        
        let aspect = 0;

        if (largura >= 768 ){
          aspect = (largura / 3);
        }else if( largura < 768 && mosaic.classList.contains('mosaic-about')){
          aspect = (largura / 2);
        }else{
          aspect = largura;
        }

        let mosaicItems = mosaic.querySelectorAll('.mosaic-item');
        mosaicItems.forEach(item => {
            item.style.width = aspect + 'px';
            item.style.height = aspect + 'px';
        });
    });
  }

  window.addEventListener('load', autoAjustMosaic);
  window.addEventListener('resize', autoAjustMosaic);


    /**
     * Navmenu Scrollspy
     */
    let navmenulinks = document.querySelectorAll('.menu-turquesa a');
  
    function navmenuScrollspy() {
      navmenulinks.forEach(navmenulink => {
        if (!navmenulink.hash) return;
        let section = document.querySelector(navmenulink.hash);
        if (!section) return;
        let position = window.scrollY + 200;
        if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
          document.querySelectorAll('.menu-turquesa a.active').forEach(link => link.classList.remove('active'));
          navmenulink.classList.add('active');
        } else {
          navmenulink.classList.remove('active');
        }
      })
    }
    window.addEventListener('load', navmenuScrollspy);
    document.addEventListener('scroll', navmenuScrollspy);

    /**
     * Slick Team
     */
    function initSlickTeam(){

      let options = {
        slidesToShow: 3,
        autoplay: true,
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              arrows: false,
              dots: true,
              slidesToShow: 3
            }
          },{
            breakpoint: 768,
            settings: {
              arrows: false,
              dots: true,
              slidesToShow: 2
            }
          },{
            breakpoint: 576,
            settings: {
              arrows: false,
              dots: true,
              slidesToShow: 1
            }
          }
        ]
      };

      $('.slick-team').slick(options);
    }

    window.addEventListener('load', initSlickTeam);
  
  })(jQuery);