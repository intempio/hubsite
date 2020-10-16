const dropdown = document.getElementById('dropdown');
//const selector = document.getElementById('selector');

//selector.addEventListener('click', () => {
//    const selectorArrow = document.getElementById('selector-arrow');
//    if (dropdown.classList.contains('hide')) {
//        dropdown.classList.remove('hide');
//        selectorArrow.style.transform = 'rotate(0)';
//    } else {
//        dropdown.classList.add('hide');
//        selectorArrow.style.transform = 'rotate(180deg)';
//    }
//});

const menuFunction = () => {
    const elements = document.getElementsByClassName('menu-button');
    const navbar = document.getElementById('navbar');
    const logo = document.getElementById('logo');
    const navHeader = document.getElementById('nav-header');
    const menuTitle = document.getElementById('menu-title');
    const navArrow = document.getElementById('nav-arrow');
    const arrowIcon = document.getElementById('arrow-icon');
    const wrapper = document.getElementById('wrapper');
    for(let i = 0; i < elements.length; i++){
        const element = elements.item(i);
        const menuItems = document.getElementsByClassName('menu-item');
        if (element.classList.contains('hide')) {
            setTimeout(() => element.classList.remove('hide'), 150);
            navbar.style.width = '200px';
            menuTitle.style.margin = '54px 31px 25px 30px';
            navArrow.style.left = '145px'
            setTimeout(() => {
                logo.style.width = '100px';
                logo.style.height = '60px';
            }, 250);
            navHeader.style.padding = '18px 50px';
            arrowIcon.style.transform = 'rotate(0)';
            wrapper.style.marginLeft = '200px';
            for(let i = 0; i < menuItems.length; i++) {
                menuItems[i].style.width = '220px';
                menuItems[i].style.padding = '10px 30px';
                menuItems[i].style.margin = '0';
                menuItems[i].style.justifyContent = 'flex-start';
            }
        } else {
            element.classList.add('hide');
            navbar.style.width = '84px';
            menuTitle.style.margin = '54px 18px 25px 18px';
            navArrow.style.left = '42px';
            logo.style.width = '66px';
            logo.style.height = '40px';
            navHeader.style.padding = '30px 9px 26px';
            arrowIcon.style.transform = 'rotate(180deg)';
            wrapper.style.marginLeft = '84px';
            for(let i = 0; i < menuItems.length; i++) {
                menuItems[i].style.width = '64px';
                menuItems[i].style.padding = '0';
                menuItems[i].style.margin = '0 10px';
                menuItems[i].style.justifyContent = 'center';
            }
        }
    }
};

const menu = document.getElementById('menu');
const menuTile = document.getElementById('menu-tile')

menu.addEventListener('click', menuFunction);
menuTile.addEventListener('click', menuFunction);
