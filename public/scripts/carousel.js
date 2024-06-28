const carouselArea = document.getElementById('carousel-area');
let carouselSlides;


async function fetchCarouselData(){
    try {
        let response = await fetch("http://localhost:3000/carousel");
        if(!response.ok){
            console.log("There was a problem fetching the slides's data for the carousel");
        }
        carouselSlides = await response.json();
        displaySlides();
    } catch (error) {
        console.log(error);
    }
}

function displaySlides(){
    carouselSlides.forEach(slide => {
        carouselArea.innerHTML += `<div class="carousel-item active">
                                        <img src="${slide.img_url}" class="d-block w-100" alt="...">
                                        <div class="carousel-caption d-none d-md-block">
                                            <h5>${slide.title}</h5>
                                            <p><a href="${slide.content_url}" class="text-white">${slide.description}</a></p>
                                        </div>
                                    </div>`
    });
}

fetchCarouselData();