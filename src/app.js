import {render} from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';
import {logout} from './api/data.js';

const main = document.getElementById('site-content');
setUserNav();
import {homePage} from './views/home.js';
import {loginPage} from "./views/login.js";
import {registerPage} from "./views/register.js";
import {catalogPage} from "./views/catalog.js";
import {createPage} from "./views/create.js";
import {editPage} from "./views/edit.js";
import {detailsPage} from "./views/details.js";
import {profilePage} from "./views/profile.js";
import {searchPage} from "./views/search.js";


page('/' , decorateContext, homePage);
page('/login' , decorateContext, loginPage);
page('/register' , decorateContext, registerPage);
page('/catalog' , decorateContext, catalogPage);
page('/create/car' , decorateContext, createPage);
page('/edit/:id' , decorateContext, editPage);
page('/details/:id' , decorateContext, detailsPage);
page('/profile' , decorateContext, profilePage);
page('/search' , decorateContext, searchPage);
//page('/search/:year' , decorateContext, searchPage);
page.start();


function decorateContext(context,next) {
    context.render = (content)=> render(content, main);
    context.setUserNav = setUserNav;
    next();
}
document.getElementById('profile').children[3].addEventListener('click',logoutBtn);

function setUserNav() {
    const username = sessionStorage.getItem('username');
    if (username !== null){
        document.querySelector('#guest').style.display = 'none';
        document.querySelector('#profile').children[0].textContent = `Welcome ${username}`;
        document.querySelector('#profile').style.display = 'block';
    }else {
        document.querySelector('#guest').style.display = 'block';
        document.querySelector('#profile').style.display = 'none';
    }
}

async function logoutBtn() {
    await logout();
    setUserNav();
    page.redirect('/');
}

