function positionAfterElement() {
	const h1s = document.querySelectorAll('h1');
	const range = document.createRange();

	// Get the text content of the element
	h1s.forEach(h1 => {
		const textNode = h1.firstChild;
		const text = h1.textContent;
		if (!textNode) return;

		// Adjust range to the last word
		const words = text.split(' ');
		const lastWordStartIndex = text.lastIndexOf(words[words.length - 1]);
		range.setStart(textNode, lastWordStartIndex);
		range.setEnd(textNode, text.length);

		// Get the bounding box of the last word
		const rect = range.getBoundingClientRect();
		const parentRect = h1.getBoundingClientRect();

		// Calculate the position relative to the parent element
		const leftPosition = rect.left - parentRect.left;
		const width = rect.width;

		// Apply styles to the pseudo-element
		h1.style.setProperty('--after-left', `${leftPosition}px`);
		h1.style.setProperty('--after-width', `${width}px`);

	});
}

//Initiate Swiper
const initializeSwiper = () => {
    const testimonalWrappers = document.querySelectorAll('.testimonial-wrapper');
	if(testimonalWrappers){
		testimonalWrappers.forEach((testimonialEl) => {
			const swiperContainer = testimonialEl.querySelector('.swiper-container')
			new Swiper(swiperContainer, {
				slidesPerView: 1,
				loop: true,
				autoplay: {
				delay: 2500,
				disableOnInteraction: false,
				},	  
				pagination: {
				el: testimonialEl.querySelector('.swiper-pagination'),
				clickable: true,
				},
				navigation: {
				nextEl: testimonialEl.querySelector('.swiper-button-next'),
				prevEl: testimonialEl.querySelector('.swiper-button-prev'),
				},
			});
		});
	}
};


const initSteps = () =>{
	const counters = document.querySelectorAll(".step-counter-item");
    const steps = document.querySelectorAll(".step-item");
	if(counters){
		// Add event listeners to each counter
		counters.forEach(counter => {
			counter.addEventListener("click", function() {
				const stepIndex = parseInt(counter.getAttribute("data-step"));

				// Remove 'active' class from all counters and 'show' class from all steps
				counters.forEach(counter => counter.classList.remove("active"));
				steps.forEach(step => step.classList.remove("show"));

				// Add 'active' to the clicked counter and 'show' to the corresponding step
				counter.classList.add("active");
				steps[stepIndex].classList.add("show");
			});
		});
	}
}
document.querySelector('.menu-toggle').addEventListener('click', function() {
    this.classList.toggle('active');
	document.querySelector('.menu-header-menu-container').classList.toggle('active')
	document.querySelector('body').classList.toggle('menu-open')
});
// Adjust on load and resize
positionAfterElement();
window.addEventListener('resize', positionAfterElement);
initializeSwiper();
initSteps();