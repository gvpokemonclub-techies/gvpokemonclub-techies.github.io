// Mini Gallery Nav Btns
let counter = 0;
let slidercounter = 0;
let sliders = document.querySelectorAll('.slider');
let sections = document.querySelectorAll('section');
let sliderNavs = document.querySelectorAll('.slider-nav');

// creates IDs for each navbtn and slide, so that they link btns to specific slides
sliders.forEach(slider => {
    let slides = slider.querySelectorAll('.slide');

    // Create and Assign Project Nav Btns
    slides.forEach(slide => {
        slide.id = counter;
        const newNavBtn = document.createElement('a');
        newNavBtn.href = '#' + counter;
        newNavBtn.role = 'button';
        sliderNavs[slidercounter].appendChild(newNavBtn);
        counter += 1;
    })

    // Create Left/Right Project Nav Btns
    sliderNavs[slidercounter].firstElementChild.classList.add('active');
    let leftBtn = document.createElement('div');
    leftBtn.role = 'button';
    leftBtn.innerHTML = "⮜";
    leftBtn.classList.add('left-navBtn');
    leftBtn.classList.add('active');
    sliderNavs[slidercounter].prepend(leftBtn);
    let rightBtn = document.createElement('div');
    rightBtn.role = 'button';
    rightBtn.innerHTML = "⮞";
    rightBtn.classList.add('right-navBtn');
    sliderNavs[slidercounter].appendChild(rightBtn);
    slidercounter += 1;

    // Left/Right Nav Btn Events
    leftBtn.addEventListener('click', e => { 
        changeSlide("left");
    })
    rightBtn.addEventListener('click', e => { 
        changeSlide("right");
    })

    // Mobile Swipping
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;
    const threshold = 50; 

    // 1. Capture initial touch position
    slider.addEventListener('touchstart', (event) => {
        touchStartX = event.changedTouches[0].screenX;
        touchStartY = event.changedTouches[0].screenY;
    }, { passive: true });

    // 2. Capture final touch position and process direction
    slider.addEventListener('touchend', (event) => {
        touchEndX = event.changedTouches[0].screenX;
        touchEndY = event.changedTouches[0].screenY;
    
        handleSwipe();
    }, { passive: true });

    // 3. Mathematical comparison logic
    function handleSwipe() {
        const diffX = touchEndX - touchStartX;
        const diffY = touchEndY - touchStartY;

        // Check if horizontal movement is greater than vertical movement
        if (Math.abs(diffX) > Math.abs(diffY)) {
            if (Math.abs(diffX) > threshold) {
                if (diffX > 0) {
                    console.log('right');
                    changeSlide("left");
                } else {
                    console.log('left');
                    changeSlide("right");
                }
            }
        } 
    }

    // Project Nav Btn Active Class Toggle
    sliderNavs.forEach(button => {
        button.addEventListener('click', e => {
            sliderNavs.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const sliderCheck = sliderMinMaxCheck();
            console.log(sliderCheck);
            if (sliderCheck == "left") {
                leftBtn.classList.add('active');
                rightBtn.classList.remove('active');
            } else if (sliderCheck == "right") {
                rightBtn.classList.add('active');
                leftBtn.classList.remove('active');
            } else {
                leftBtn.classList.remove('active');
                rightBtn.classList.remove('active');
            }
        });
    });
})

function sliderMinMaxCheck() {
    let sliderBtns = document.querySelectorAll('.slider-nav a');
    let activeBtn = document.querySelector('.slider-nav a.active');
    let btnsArray = Array.from(sliderBtns);
    let slideLength = btnsArray.length;
    let activeIndex = btnsArray.indexOf(activeBtn);

    if (activeIndex == 0) {
        return "left";
    } else if (activeIndex == (slideLength - 1)) {
        return "right";
    } else {
        return "none";
    }
}

function changeSlide(direction) {
    let sliderBtns = document.querySelectorAll('.slider-nav a');
    let activeBtn = document.querySelector('.slider-nav a.active');
    let btnsArray = Array.from(sliderBtns);
    console.log(btnsArray);
    let slideLength = btnsArray.length;
    let activeIndex = btnsArray.indexOf(activeBtn);

    if (direction == "left" && activeIndex > 0) {
        btnsArray[activeIndex - 1].click();
    } else if (direction == "right" && activeIndex < (slideLength - 1)) {
        btnsArray[activeIndex + 1].click();
    }
}

sections.forEach(section => {
    let sectionContent = section.querySelector('.section-content');
    let btn = section.querySelector('.mini-gallery-btn');
    let btnCircle = section.querySelector('.button-circle');
    let sliderBtns = section.querySelectorAll('.slider-nav a');

    // Open/Close Mini Gallery and turn off the glowing animation
    btn.addEventListener('click', () => {
        section.classList.toggle('active');
        btnCircle.classList.remove('glow');

        if (section.classList.contains('active')) { 
            section.scrollIntoView({ 
                behavior: 'smooth', // This creates the "sliding" animation
                block: 'start'      // Aligns the element to the top of the viewport
            });
        } 
    });

    // Mini Gallery Nav Btn Color Toggle
    sliderBtns.forEach(button => {
        button.addEventListener('click', e => {
            sliderBtns.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

});

//IMAGE SLIDER

const galslides = document.querySelectorAll(".gal-slides img");
let slideIndex = 0;
let intervalId = null;

//initializeSlider()

document.addEventListener("DOMContentLoaded", initializeSlider);

function initializeSlider(){
    if(galslides.length > 0){
        galslides[slideIndex].classList.add("displaySlide");

        //intervalId = setInterval(nextSlide, 30000);
    }
}

function showSlide(index){
    if(index >= galslides.length){
        slideIndex = 0;
    }

    else if (index < 0){
        slideIndex = galslides.length - 1;
    }

    galslides.forEach(slide =>{
        slide.classList.remove("displaySlide")
    });
    galslides[slideIndex].classList.add("displaySlide");
}

function prevSlide(){
    slideIndex--;
    showSlide(slideIndex);
    resetInterval();
}

function nextSlide(){
    slideIndex++;
    showSlide(slideIndex);
    resetInterval();
}

//This would be auto advance if wanted to implement that 
// function resetInterval(){
//     clearInterval(intervalId);
//     intervalId = setInterval(nextSlide, 5000);
// }