const carousel = document.querySelector('.carousel');
const arrowLeft = document.getElementById('left');
const arrowRight = document.getElementById('right');
const radioButtons = document.querySelectorAll('.carousel-radio');
const firstCardWidth = carousel.querySelector('.card').offsetWidth;
const carouselChildrens = [...carousel.children];

let isDragging = false, startX, startScrollLeft;

let cardPreView = Math.round(carousel.offsetWidth / firstCardWidth);

carouselChildrens.slice(-cardPreView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

carouselChildrens.slice(0, cardPreView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

arrowLeft.addEventListener("click", () => {
    carousel.scrollLeft -= firstCardWidth * 1; 
});

arrowRight.addEventListener("click", () => {
    carousel.scrollLeft += firstCardWidth * 1; 
});

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    startX = e.pageX || e.touches[0].pageX;
    startScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
    if (!isDragging) return;
    const x = e.pageX || e.touches[0].pageX;
    carousel.scrollLeft = startScrollLeft - (x - startX);
};

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
};
carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("mouseup", dragStop);
carousel.addEventListener("mouseleave", dragStop);

carousel.addEventListener("touchstart", dragStart);
carousel.addEventListener("touchmove", dragging);
carousel.addEventListener("touchend", dragStop);

radioButtons.forEach((radio, index) => {
    radio.addEventListener('click', () => {
        carousel.scrollLeft = index * firstCardWidth * Math.min(1,carouselChildrens.length- cardPreView);
    });
});

