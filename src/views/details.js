import {html} from '../../node_modules/lit-html/lit-html.js';
import {getCarById,deleteCar} from '../api/data.js';

const detailsTemplate = (car, onDelete, isOwner) => html`
    <section id="listing-details">
        <h1>Details</h1>
        <div class="details-info">
            <img src=${car.imageUrl}>
            <hr>
            <ul class="listing-props">
                <li><span>Brand:</span>${car.brand}</li>
                <li><span>Model:</span>${car.model}</li>
                <li><span>Year:</span>${car.year}</li>
                <li><span>Price:</span>${car.price}</li>
            </ul>

            <p class="description-para">${car.description}</p>

            <div class="listings-buttons">
                ${isOwner ? html`<a href="/edit/${car._id}" class="button-list">Edit</a>
                <a href="#" @click=${onDelete} class="button-list">Delete</a>` : ''}
            </div>
        </div>
    </section>
`;

export async function detailsPage(context) {
    const carId = context.params.id;
    const car = await getCarById(carId);

    const userId = sessionStorage.getItem('userId');

    const isOwner = userId === car._ownerId;


    context.render(detailsTemplate(car, onDelete, isOwner));

    async function onDelete(ev) {
        ev.preventDefault();
        // have to write here !
        await deleteCar(carId);
        context.page.redirect('/catalog');
    }
}