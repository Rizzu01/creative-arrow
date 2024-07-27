(function ($) {
    "use strict";

    // Navbar on scrolling
    // $(window).scroll(function () {
    //     if ($(this).scrollTop() > 200) {
    //         $('.navbar').fadeIn('slow').css('display', 'flex');
    //     } else {
    //         $('.navbar').fadeOut('slow').css('display', 'none');
    //     }
    // });


    // Smooth scrolling on the navbar links
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 45
            }, 1500, 'easeInOutExpo');
            
            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });


    // Typed Initiate
    if ($('.typed-text-output').length == 1) {
        var typed_strings = $('.typed-text').text();
        var typed = new Typed('.typed-text-output', {
            strings: typed_strings.split(', '),
            typeSpeed: 100,
            backSpeed: 20,
            smartBackspace: false,
            loop: true
        });
    }


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });


    // Scroll to Bottom
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scroll-to-bottom').fadeOut('slow');
        } else {
            $('.scroll-to-bottom').fadeIn('slow');
        }
    });


    // Skills
    $('.skill').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});


    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });
    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');

        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        dots: true,
        loop: true,
        items: 1
    });
    
})(jQuery);

        const { useEffect, useState, useRef } = React;

function ImageSquare(props) {
  const [flipped, setFlipped] = useState(false);
  const [scaleFactor, setScaleFactor] = useState(1);
  const squareRef = useRef(null);
  
  useEffect(() => {
    const img = new Image();
    img.src = props.frontImage;
    img.onload = () => {
      let width = img.naturalWidth;
      let height = img.naturalHeight;
      const TARGET_WIDTH = 1920;
      const TARGET_HEIGHT = 1080;
      let scaleWidth = TARGET_WIDTH / width;
      let scaleHeight = TARGET_HEIGHT / height;
      let scale = Math.max(scaleWidth, scaleHeight);
      scale *= 1.1;
      setScaleFactor(scale);
    };
  }, [props.frontImage]);

const updateParallaxPosition = (xOffset, yOffset, row) => {
  const element = squareRef.current;
  const parallaxFactor = row === 'top' ? 1 : -1; // Adjust as needed
  element.style.backgroundPosition = `${50 + xOffset}% ${50 + parallaxFactor * yOffset}%`;
}

  useEffect(() => {
    const element = squareRef.current;
    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect();
      const xPos = e.clientX - rect.left - rect.width / 2;
      const yPos = e.clientY - rect.top - rect.height / 2;
      const xOffset = ((flipped ? 1 : -1) * xPos / rect.width) * 15;
      const yOffset = ((flipped ? 1 : -1) * yPos / rect.height) * 15;
      updateParallaxPosition(xOffset, yOffset);
    };
    element.addEventListener('mousemove', handleMouseMove);
    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
    };
  }, [flipped]);

  useEffect(() => {
    const handleScroll = () => {
      const element = squareRef.current;
      const rect = element.getBoundingClientRect();
      const midPoint = (rect.top + rect.bottom) / 2;
      const viewportHeight = window.innerHeight;
      const offsetFromCenter = (midPoint - viewportHeight / 2) / viewportHeight;
      const yOffset = offsetFromCenter * 15;
      updateParallaxPosition(0, yOffset);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const element = squareRef.current;
    const handleFlip = () => {
      setFlipped(prev => !prev);
    };
    element.addEventListener('click', handleFlip);
    return () => {
      element.removeEventListener('click', handleFlip);
    };
  }, []);

  useEffect(() => {
    const element = squareRef.current;
    if (flipped) {
      setTimeout(() => {
        element.style.backgroundImage = `url("${props.backImage}")`;
      }, 250);
      element.style.transform = 'rotateY(180deg)';
    } else {
      setTimeout(() => {
        element.style.backgroundImage = `url("${props.frontImage}")`;
      }, 250);
      element.style.transform = 'rotateY(0deg)';
    }
  }, [flipped]);

  return (
    <div className="card">
      <div ref={squareRef} className="square">
        <p className={flipped ? 'hidden' : ''}>{props.frontText}</p>
        <div style={{ transform: 'rotateY(180deg)', width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
          <p className={flipped ? '' : 'hidden'}>{props.backText}</p>
        </div>
      </div>
    </div>
  );
}
const frontImages = [
  "https://images.unsplash.com/photo-1696350865870-1bc760e347cd?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTgyMTQ4MjV8&ixlib=rb-4.0.3&q=85",
  "https://images.unsplash.com/photo-1696246847440-bb0047ba93ca?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTgyMjAyMDl8&ixlib=rb-4.0.3&q=85",
  "https://images.unsplash.com/photo-1697789344805-bc64b0874465?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTgyMTU0NDl8&ixlib=rb-4.0.3&q=85",
  "https://images.unsplash.com/photo-1696779917953-c5c0592d1d3b?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTgyMjAyMDl8&ixlib=rb-4.0.3&q=85",
  "https://images.unsplash.com/photo-1695334702343-877903386dc5?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTgyMjAyNjB8&ixlib=rb-4.0.3&q=85",
  "https://images.unsplash.com/photo-1696922088982-87071fc72b98?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTgyMTU0NjJ8&ixlib=rb-4.0.3&q=85",
  "https://images.unsplash.com/photo-1696456156332-cf12d44d57e6?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTgyMTU0NzV8&ixlib=rb-4.0.3&q=85",
  "https://images.unsplash.com/photo-1696321832425-a6871f33420f?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTgyMjAyNjB8&ixlib=rb-4.0.3&q=85",
  "https://images.unsplash.com/photo-1697603206408-5a44f13272db?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTgyMTU0NzV8&ixlib=rb-4.0.3&q=85"
];

const backImages = [
  "https://images.unsplash.com/photo-1696484958150-ae2a11fd0449?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTgyMjAyNjB8&ixlib=rb-4.0.3&q=85",
  "https://images.unsplash.com/photo-1696841212541-449ca29397cc?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTgyMjAyNjB8&ixlib=rb-4.0.3&q=85",
  "https://images.unsplash.com/photo-1656137124571-2feb75aa4ff5?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTgyMjAzNjZ8&ixlib=rb-4.0.3&q=85",
  "https://images.unsplash.com/photo-1696805122343-73c8f24c9196?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTgyMTU1MjR8&ixlib=rb-4.0.3&q=85",
  "https://images.unsplash.com/photo-1696889168405-35a9ccac2d6a?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTgyMTU1MjR8&ixlib=rb-4.0.3&q=85",
  "https://images.unsplash.com/photo-1695754190533-0a1136658dee?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTgyMTU1MjR8&ixlib=rb-4.0.3&q=85",
  "https://images.unsplash.com/photo-1697168248031-7a8333f70930?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTgyMjAzNjZ8&ixlib=rb-4.0.3&q=85",
  "https://images.unsplash.com/photo-1694974299859-17fc8cfde2ce?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTgyMjAzNjZ8&ixlib=rb-4.0.3&q=85",
  "https://images.unsplash.com/photo-1659096543343-93e5e50854dc?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTgyMjAzNjZ8&ixlib=rb-4.0.3&q=85"
];
const frontTexts = [
  "Vibrant Creations",
  "Serenity in Nature",
  "Urban Elegance",
  "Abstract Wonders",
  "Majestic Landscapes",
  "Infinite Horizons",
  "Ethereal Beauty",
  "Architectural Marvels",
  "Whimsical Delights",
];

const backTexts = [
  "Endless Inspiration",
  "Harmony and Tranquility",
  "Cityscape Chronicles",
  "Creative Imagination",
  "Nature's Grandeur",
  "Journey Beyond",
  "Timeless Enchantment",
  "Designing Dreams",
  "Fantasy Escapades",
];


function App() {
  return (
   <div className="grid-container">
    <div className="grid">
      {frontImages.map((img, index) => (
        <ImageSquare
          key={index}
          frontImage={img}
          backImage={backImages[index]}
          frontText={frontTexts[index]}
          backText={backTexts[index]}
          row={index < 3 ? 'top' : 'bottom'}
        />
      ))}
    </div>
   </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));
