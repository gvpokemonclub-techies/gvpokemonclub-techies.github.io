// Mini Gallery Nav Btns
let counter = 0;
let slidercounter = 0;
let sliders = document.querySelectorAll('.slider');
let sections = document.querySelectorAll('section');
let sliderNavs = document.querySelectorAll('.slider-nav');

// creates IDs for each navbtn and slide, so that they link btns to specific slides
sliders.forEach(slider => {
    let slides = slider.querySelectorAll('.slide');
    slides.forEach(slide => {
        slide.id = counter;
        const newNavBtn = document.createElement('a');
        newNavBtn.href = '#' + counter;
        newNavBtn.role = 'button';
        sliderNavs[slidercounter].appendChild(newNavBtn);
        counter += 1;
    })
    sliderNavs[slidercounter].firstElementChild.classList.add('active');
    slidercounter += 1;
})


sections.forEach(section => {
    let sectionContent = section.querySelector('.section-content');
    let btn = section.querySelector('.mini-gallery-btn');
    let btnCircle = section.querySelector('.button-circle');
    let sliderBtns = section.querySelectorAll('.slider-nav a');

    // Open/Close Mini Gallery and turn off the glowing animation
    btn.addEventListener('click', () => {
        section.classList.toggle('active');
        btnCircle.classList.remove('glow');
    });

    // Mini Gallery Nav Btn Color Toggle
    sliderBtns.forEach(button => {
        button.addEventListener('click', e => {
            sliderBtns.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

});