import {html} from '../../node_modules/lit-html/lit-html.js';
import {getMyCars} from '../api/data.js';

const profileTemplate = (car) => html`
    <section id="my-listings">
        <h1>My car listings</h1>
        <div class="listings">

            <!-- Display all records -->
            ${car.length > 0 ? car.map(carTemplate) : html`<p class="no-cars"> You haven't listed any cars yet.</p>`}

            <!-- Display if there are no records -->
            
        </div>
    </section>
`;

const carTemplate = (car) => html`
    <div class="listing">
        <div class="preview">
            <img src=${car.imageUrl}>
        </div>
        <h2>${car.brand +' '+ car.model }</h2>
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

export async function profilePage(context) {
    const cars = await getMyCars();
    context.render(profileTemplate(cars));
}