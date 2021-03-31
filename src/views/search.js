import {html} from '../../node_modules/lit-html/lit-html.js';
import {getCarByYear} from "../api/data.js";

const searchTemplate = (onClick,car,year) => html`
    <section id="search-cars">
        <h1>Filter by year</h1>

        <div class="container">
            <input id="search-input" type="text" name="search" placeholder="Enter desired production year" .value=${year ? year : ''}>
            <button @click=${onClick} class="button-list">Search</button>
        </div>

        <h2>Results:</h2>
        <div class="listings">

            <!-- Display all records -->
            ${car.length > 0 ? car.map(carTemplate) : html`<p class="no-cars"> No results.</p>`}

            <!-- Display if there are no matches -->
            
        </div>
    </section>
    `;
const carTemplate = (car) => html`
    <div class="listing">
        <div class="preview">
            <img src=${car.imageUrl}>
        </div>
        <h2>${car.brand + ' ' + car.model}</h2>
        <div class="info">
            <div class="data-info">
                <h3>Year: ${car.year}</h3>
                <h3>Price: ${car.price} $</h3>
            </div>
            <div class="data-buttons">
                <a href="/details/${car._id}" class="button-carDetails">Details</a>
            </div>
        </div>
    </div>
`;
export async function searchPage(context) {
     const carYear = Number(context.querystring.split('=')[1]);
     const car = Number.isNaN(carYear) ? [] : await getCarByYear(carYear);

    context.render(searchTemplate(onClick,car,carYear))
    async function onClick(ev) {
       const value = Number(ev.target.parentNode.querySelector('input').value);
       if (Number.isNaN(value) === false){
           context.page.redirect('/search?query=' + value);
       }else {
           alert('Year must be a positive number!');
       }

    }
}