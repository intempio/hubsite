import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
//import './NavMenu.css';

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {

        super(props);
        this.state = {
            firstName: '', lastName: '', email: 'aa', loading: false, menus: [], subMenu: false, submenus: [], colour: '#FFFFFF', menufolder: 'menu'
        };
        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true
        };
    }


    openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    hidesubmenuGeneric = (mainmenuid, submenuid) => {

        const subMenuListResources = document.getElementById(mainmenuid);
        const subMenuListSubMenu = document.getElementById(submenuid);


        if (subMenuListSubMenu.classList.contains('hide')) {
            subMenuListSubMenu.classList.remove('hide');
            subMenuListResources.style.borderBottom = 'none';
        } else {
            subMenuListSubMenu.classList.add('hide');
            subMenuListResources.style.borderBottom = '1px solid rgba(207, 207, 207, 0.3)';
        }

    }

    hidepopupoversubmenuGeneric = (mainmenuid, submenuid) => {




        const popOverSubMenuListResources = document.getElementById(mainmenuid);
        const popOverListSubMenu = document.getElementById(submenuid);


        if (popOverListSubMenu.classList.contains('hide')) {
            popOverListSubMenu.classList.remove('hide');
            popOverSubMenuListResources.style.borderBottom = 'none';
        } else {
            popOverListSubMenu.classList.add('hide');
            popOverSubMenuListResources.style.borderBottom = '1px solid rgba(207, 207, 207, 0.3)';
        }


    }

    hidemobilesubmenuGeneric = (mainmenuid, submenuid) => {




        const itemSubMenuItemResources = document.getElementById(mainmenuid);
        const itemSubMenuSubmenu = document.getElementById(submenuid);


        if (itemSubMenuSubmenu.classList.contains('hide')) {
            itemSubMenuSubmenu.classList.remove('hide');
            itemSubMenuItemResources.style.borderBottom = 'none';
        } else {
            itemSubMenuSubmenu.classList.add('hide');
            itemSubMenuItemResources.style.borderBottom = '1px solid rgba(207, 207, 207, 0.3)';
        }


    }



    async getSubLevelMenu(level) {
        this.setState({ loading: true });
        const response = await fetch('Meeting/GetMenuItems?container=' + this.state.menufolder + '&levels=' + level, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }

        });

        const finalresult = await response.json().then(async (resonse) => {
            this.setState({ loading: false });
            var item = resonse;
            this.setState({ submenus: item });
        });
    }

    async getSettings() {
        this.setState({ loading: true });
        const response = await fetch('Meeting/GetMeetingInfo', {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }

        });

        const finalresult = await response.json().then(async (resonse) => {
            this.setState({ loading: false });
            var item = JSON.parse(resonse.value);
            this.setState({ loading: false });

            if (item && item.value[0].fields.Colour) {
                document
                    .documentElement.style.setProperty("--color-surface", item.value[0].fields.Colour);
            }

            if (item && item.value[0].fields.Menus) {

                this.setState({ menus: item.value[0].fields.Menus.split(","), colour: item.value[0].fields.Colour, menufolder: item.value[0].fields.Menufolder });
                let token = localStorage.getItem('userToken')
                token = JSON.parse(token);
                if (token) {


                    var fname = token.inputFirstName;
                    var lname = token.inputLastName;
                    var unrecognizedLogin = token.unrecognizedLogin;

                    if (token.firstName) {
                        fname = token.firstName;

                    }
                    if (token.lastName) {
                        lname = token.lastName;
                    }

                    this.setState({ firstName: fname, lastName: lname });
                }

                this.getSubLevelMenu("2");



                /*Menu build starts ################################################################################################################################*/


                const menuFunction = () => {
                    const elements = document.getElementsByClassName('menu-button');
                    const navbar = document.getElementById('navbar');
                    const logo = document.getElementById('logo');
                    const navHeader = document.getElementById('nav-header');
                    const menuTitle = document.getElementById('menu-title');
                    const arrowIcon = document.getElementById('arrow-icon');
                    const wrapper = document.getElementById('wrapper');
                    const footer = document.getElementById('footer');
                    const menuItems = document.getElementsByClassName('menu-item');
                    const navArrow = document.getElementById('nav-arrow');
                    const menuItemArrow = document.getElementById('menu-item-arrow');

                    for (let i = 0; i < elements.length; i++) {
                        const element = elements.item(i);
                        if (element.classList.contains('hide')) {
                            menuOverlayed = false;
                            setTimeout(() => element.classList.remove('hide'), 150);
                            navbar.style.width = '200px';
                            menuTitle.style.margin = '54px 31px 25px 30px';
                            navArrow.style.left = '145px'
                            logo.style.width = '100px';
                            logo.style.height = '60px';
                            navHeader.style.padding = '18px 50px';
                            arrowIcon.style.transform = 'rotate(0)';
                            wrapper.style.marginLeft = '200px';
                            footer.style.marginLeft = '200px';
                            setTimeout(() => menuItemArrow.style.display = 'block', 500);
                            for (let i = 0; i < menuItems.length; i++) {
                                menuItems[i].style.width = '200px';
                                menuItems[i].style.padding = '10px 0 10px 30px';
                                menuItems[i].style.margin = '0';
                                menuItems[i].style.justifyContent = 'space-between';
                            }
                        } else {
                            menuOverlayed = true;
                            element.classList.add('hide');
                            navbar.style.width = '84px';
                            menuTitle.style.margin = '54px 18px 25px 18px';
                            navArrow.style.left = '42px';
                            logo.style.width = '66px';
                            logo.style.height = '40px';
                            navHeader.style.padding = '30px 9px 26px';
                            arrowIcon.style.transform = 'rotate(180deg)';
                            wrapper.style.marginLeft = '84px';
                            footer.style.marginLeft = '84px';
                            menuItemArrow.style.display = 'none';
                            for (let i = 0; i < menuItems.length; i++) {
                                menuItems[i].style.width = '64px';
                                menuItems[i].style.padding = '0';
                                menuItems[i].style.margin = '0 10px';
                                menuItems[i].style.justifyContent = 'center';
                            }
                        }
                    }
                };
                const navArrow = document.getElementById('nav-arrow');
                const menu = document.getElementById('menu');
                const menuTile = document.getElementById('menu-tile')

                menu.addEventListener('click', menuFunction);
                menuTile.addEventListener('click', menuFunction);

                //const swiperStuff = new Swiper('.swiper-container', {
                //    direction: 'horizontal',
                //    slidesPerView: 'auto',
                //    spaceBetween: 20,
                //    centeredSlides: true,
                //    loop: true,

                //    pagination: {
                //        el: '.swiper-pagination',
                //        clickable: true,
                //    },
                //});

                //swiperStuff.slideTo(1, false, false);



                const popOverMenuFunction = () => {
                    if (popOverMenu.classList.contains('hide')) {
                        popOverMenu.classList.remove('hide');
                        body.style.overflowY = 'hidden';
                    } else {
                        popOverMenu.classList.add('hide');
                        body.style.overflowY = 'auto';
                    }
                }

                const body = document.getElementById('body');
                const overlayMenu = document.getElementById('overlay-menu');
                const popOverMenu = document.getElementById('popover-menu');
                const close = document.getElementById('close');

                overlayMenu.addEventListener('click', popOverMenuFunction);
                close.addEventListener('click', popOverMenuFunction);

                //const swiperPresenters = new Swiper('.presenters-container-swiper', {
                //    direction: 'horizontal',
                //    slidesPerView: 'auto',
                //    spaceBetween: 16,
                //    centeredSlides: true,
                //    loop: true,

                //    pagination: {
                //        el: '.swiper-pagination',
                //        clickable: true,
                //    },
                //});

                //const swiperRecent = new Swiper('.recent-container-swiper', {
                //    direction: 'horizontal',
                //    slidesPerView: 'auto',
                //    spaceBetween: 20,
                //    centeredSlides: true,
                //    loop: true,

                //    pagination: {
                //        el: '.swiper-pagination',
                //        clickable: true,
                //    },
                //});

                //swiperPresenters.slideTo(2, false, false);
                //swiperRecent.slideTo(1, false, false);

                //getBoundingClientRect()

                const subMenu = document.getElementById('submenu');
                const subMenuList = document.getElementById('submenu-list');
                const subMenuWrapper = document.getElementById('submenu-wrapper');

                const resourcesButtonDesktop = document.getElementById('resources-desktop');

                let submenuDisabled = false;

                resourcesButtonDesktop.addEventListener('click', () => {
                    const currentPosition = resourcesButtonDesktop.getBoundingClientRect().top;

                    subMenuList.style.top = `${(window.innerHeight - currentPosition) > 220
                        ? currentPosition : (currentPosition - (220 - (window.innerHeight - currentPosition)))}px`;
                    if (!submenuDisabled) {
                        if (!menuOverlayed) {
                            subMenu.style.marginLeft = '200px';
                        } else {
                            subMenu.style.marginLeft = '84px';
                        }
                        subMenuWrapper.classList.remove('hide');
                        navArrow.classList.add('hide');
                        submenuDisabled = true;
                        body.style.overflowY = 'hidden';
                    } else {
                        subMenu.style.marginLeft = '-300px';
                        subMenuWrapper.classList.add('hide');
                        navArrow.classList.remove('hide');
                        submenuDisabled = false;
                        body.style.overflowY = 'auto';
                    }
                });

                subMenuWrapper.addEventListener('click', (e) => {
                    console.log(e.target.id);
                    if (e.target.id === 'submenu-wrapper') {
                        subMenu.style.marginLeft = '-300px';
                        subMenuWrapper.classList.add('hide');
                        navArrow.classList.remove('hide');
                        submenuDisabled = false;
                        body.style.overflowY = 'auto';
                    }
                });

                let menuOverlayed = false;

                let submenuTabletDisabled = false;

                const resourcesButtonTablet = document.getElementById('resources-tablet');
                const popOverSubMenu = document.getElementById('popover-submenu');
                const popOverSubMenuList = document.getElementById('popover-submenu-list');
                const popOverMenuWindow = document.getElementById('popover-menu-window');
                const subMenuMobile = document.getElementById('submenu-mobile');

                resourcesButtonTablet.addEventListener('click', () => {
                    const currentPositionTop = resourcesButtonTablet.getBoundingClientRect().top;
                    const currentPositionLeft = resourcesButtonTablet.getBoundingClientRect().left;

                    popOverSubMenuList.style.top = `${(window.innerHeight - currentPositionTop) > 220
                        ? currentPositionTop : (currentPositionTop - (220 - (window.innerHeight - currentPositionTop)))}px`;
                    hideSubMenu(currentPositionLeft);
                });

                popOverMenu.addEventListener('click', (e) => {
                    if (e.target.id === 'popover-menu') {
                        popOverMenuFunction();
                    }
                })

                const menuArrowMobile = document.getElementById('menu-arrow-mobile');

                const hideSubMenu = (currentPositionLeft) => {
                    if (window.innerWidth > 720) {
                        if (!submenuTabletDisabled) {
                            popOverSubMenu.style.marginLeft = `${currentPositionLeft - 240}px`;
                            popOverMenuWindow.style.boxShadow = 'none';
                            resourcesButtonTablet.style.background = '#FFFFFF';
                            resourcesButtonTablet.style.color = this.state.colour;
                            resourcesButtonTablet.children[0].children[0].style.fill = this.state.colour;
                            submenuTabletDisabled = true;
                        } else {
                            popOverSubMenu.style.marginLeft = '800px';
                            popOverMenuWindow.style.boxShadow = '-30px 0px 44px rgba(0, 0, 0, 0.4)';
                            resourcesButtonTablet.style.background = 'transparent';
                            resourcesButtonTablet.style.color = '#F4FFED';
                            resourcesButtonTablet.children[0].children[0].style.fill = '#F4FFED';
                            submenuTabletDisabled = false;
                        }
                    } else {
                        if (subMenuMobile.classList.contains('hide')) {
                            subMenuMobile.classList.remove('hide');
                            resourcesButtonTablet.style.background = '#FFFFFF';
                            resourcesButtonTablet.style.color = this.state.colour;
                            resourcesButtonTablet.children[0].children[0].style.fill = this.state.colour;
                            menuArrowMobile.style.transform = 'rotate(-90deg)';
                        } else {
                            subMenuMobile.classList.add('hide');
                            resourcesButtonTablet.style.background = 'transparent';
                            resourcesButtonTablet.style.color = '#F4FFED';
                            resourcesButtonTablet.children[0].children[0].style.fill = '#F4FFED';
                            menuArrowMobile.style.transform = 'rotate(90deg)';
                        }
                    }
                }


                const main = document.getElementById('main');
                const footer = document.getElementById('footer');
                const presentersPage = document.getElementById('presenters-page');
                const presenters = document.querySelectorAll('.presenter');

                presenters.forEach(presenter => {
                    presenter.addEventListener('click', () => {
                        presentersPage.style.display = 'flex';
                        main.style.display = 'none';
                        footer.style.display = 'none';
                    })
                });


                //const subMenuListResources = document.getElementById('submenu-list-resources');
                //const subMenuListSubMenu = document.getElementById('submenu-list-submenu');

                //subMenuListResources.addEventListener('click', () => {
                //    if (subMenuListSubMenu.classList.contains('hide')) {
                //        subMenuListSubMenu.classList.remove('hide');
                //        subMenuListResources.style.borderBottom = 'none';
                //    } else {
                //        subMenuListSubMenu.classList.add('hide');
                //        subMenuListResources.style.borderBottom = '1px solid rgba(207, 207, 207, 0.3)';
                //    }

                //})




                /*Menu build Ends ################################################################################################################################*/


                const messages = document.getElementById('messages');
                const messagesMobile = document.getElementById('messagesMobile')
                const messagesContainer = document.getElementById('messages-container');
                const messagesIcon = document.getElementById('messages-icon');

                messages.addEventListener('click', event => {
                    if (messagesContainer.classList.contains('hide')) {
                        messagesContainer.classList.remove('hide');
                        messagesIcon.style.fill = '#5E5E5E';
                    } else {
                        messagesContainer.classList.add('hide');
                        messagesIcon.style.fill = '#D7D7D7';
                    }
                });

                messagesMobile.addEventListener('click', event => {
                    console.log('here!')
                    if (messagesContainer.classList.contains('hide')) {
                        messagesContainer.classList.remove('hide');
                        messagesIcon.style.fill = '#5E5E5E';
                    } else {
                        messagesContainer.classList.add('hide');
                        messagesIcon.style.fill = '#D7D7D7;';
                    }
                });

                return true;

            } else {
                return false;
            }

        }).catch((error) => {
            this.setState({ loading: false });
            return false;
        });
        return finalresult;
    }


    async getSettingsv2() {




        this.setState({ loading: true });
        const response = await fetch('Meeting/GetConfigInfo?validate=0&key=' + this.state.key, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }

        });



        const finalresult = await response.json().then(async (resonse) => {
            this.setState({ loading: false });
            var item = resonse.value;
            this.setState({ loading: false });


            if (item) {


                if (item && item.intempioSettings.colour) {
                    document
                        .documentElement.style.setProperty("--color-surface",'#'+ item.intempioSettings.colour);
                }

                if (item && item.intempioSettings.menus) {

                    this.setState({ menus: item.intempioSettings.menus.split(","), colour: item.intempioSettings.colour, menufolder: item.intempioSettings.menuFolder });
                    let token = localStorage.getItem('userToken')
                    token = JSON.parse(token);
                    if (token) {


                        var fname = token.inputFirstName;
                        var lname = token.inputLastName;
                        var unrecognizedLogin = token.unrecognizedLogin;

                        if (token.firstName) {
                            fname = token.firstName;

                        }
                        if (token.lastName) {
                            lname = token.lastName;
                        }

                        this.setState({ firstName: fname, lastName: lname });
                    }

                    this.getSubLevelMenu("2");



                    /*Menu build starts ################################################################################################################################*/


                    const menuFunction = () => {
                        const elements = document.getElementsByClassName('menu-button');
                        const navbar = document.getElementById('navbar');
                        const logo = document.getElementById('logo');
                        const navHeader = document.getElementById('nav-header');
                        const menuTitle = document.getElementById('menu-title');
                        const arrowIcon = document.getElementById('arrow-icon');
                        const wrapper = document.getElementById('wrapper');
                        const footer = document.getElementById('footer');
                        const menuItems = document.getElementsByClassName('menu-item');
                        const navArrow = document.getElementById('nav-arrow');
                        const menuItemArrow = document.getElementById('menu-item-arrow');

                        for (let i = 0; i < elements.length; i++) {
                            const element = elements.item(i);
                            if (element.classList.contains('hide')) {
                                menuOverlayed = false;
                                setTimeout(() => element.classList.remove('hide'), 150);
                                navbar.style.width = '200px';
                                menuTitle.style.margin = '54px 31px 25px 30px';
                                navArrow.style.left = '145px'
                                logo.style.width = '100px';
                                logo.style.height = '60px';
                                navHeader.style.padding = '18px 50px';
                                arrowIcon.style.transform = 'rotate(0)';
                                wrapper.style.marginLeft = '200px';
                                footer.style.marginLeft = '200px';
                                setTimeout(() => menuItemArrow.style.display = 'block', 500);
                                for (let i = 0; i < menuItems.length; i++) {
                                    menuItems[i].style.width = '200px';
                                    menuItems[i].style.padding = '10px 0 10px 30px';
                                    menuItems[i].style.margin = '0';
                                    menuItems[i].style.justifyContent = 'space-between';
                                }
                            } else {
                                menuOverlayed = true;
                                element.classList.add('hide');
                                navbar.style.width = '84px';
                                menuTitle.style.margin = '54px 18px 25px 18px';
                                navArrow.style.left = '42px';
                                logo.style.width = '66px';
                                logo.style.height = '40px';
                                navHeader.style.padding = '30px 9px 26px';
                                arrowIcon.style.transform = 'rotate(180deg)';
                                wrapper.style.marginLeft = '84px';
                                footer.style.marginLeft = '84px';
                                menuItemArrow.style.display = 'none';
                                for (let i = 0; i < menuItems.length; i++) {
                                    menuItems[i].style.width = '64px';
                                    menuItems[i].style.padding = '0';
                                    menuItems[i].style.margin = '0 10px';
                                    menuItems[i].style.justifyContent = 'center';
                                }
                            }
                        }
                    };
                    const navArrow = document.getElementById('nav-arrow');
                    const menu = document.getElementById('menu');
                    const menuTile = document.getElementById('menu-tile')

                    menu.addEventListener('click', menuFunction);
                    menuTile.addEventListener('click', menuFunction);

                    //const swiperStuff = new Swiper('.swiper-container', {
                    //    direction: 'horizontal',
                    //    slidesPerView: 'auto',
                    //    spaceBetween: 20,
                    //    centeredSlides: true,
                    //    loop: true,

                    //    pagination: {
                    //        el: '.swiper-pagination',
                    //        clickable: true,
                    //    },
                    //});

                    //swiperStuff.slideTo(1, false, false);



                    const popOverMenuFunction = () => {
                        if (popOverMenu.classList.contains('hide')) {
                            popOverMenu.classList.remove('hide');
                            body.style.overflowY = 'hidden';
                        } else {
                            popOverMenu.classList.add('hide');
                            body.style.overflowY = 'auto';
                        }
                    }

                    const body = document.getElementById('body');
                    const overlayMenu = document.getElementById('overlay-menu');
                    const popOverMenu = document.getElementById('popover-menu');
                    const close = document.getElementById('close');

                    overlayMenu.addEventListener('click', popOverMenuFunction);
                    close.addEventListener('click', popOverMenuFunction);

                    //const swiperPresenters = new Swiper('.presenters-container-swiper', {
                    //    direction: 'horizontal',
                    //    slidesPerView: 'auto',
                    //    spaceBetween: 16,
                    //    centeredSlides: true,
                    //    loop: true,

                    //    pagination: {
                    //        el: '.swiper-pagination',
                    //        clickable: true,
                    //    },
                    //});

                    //const swiperRecent = new Swiper('.recent-container-swiper', {
                    //    direction: 'horizontal',
                    //    slidesPerView: 'auto',
                    //    spaceBetween: 20,
                    //    centeredSlides: true,
                    //    loop: true,

                    //    pagination: {
                    //        el: '.swiper-pagination',
                    //        clickable: true,
                    //    },
                    //});

                    //swiperPresenters.slideTo(2, false, false);
                    //swiperRecent.slideTo(1, false, false);

                    //getBoundingClientRect()

                    const subMenu = document.getElementById('submenu');
                    const subMenuList = document.getElementById('submenu-list');
                    const subMenuWrapper = document.getElementById('submenu-wrapper');

                    const resourcesButtonDesktop = document.getElementById('resources-desktop');

                    let submenuDisabled = false;

                    resourcesButtonDesktop.addEventListener('click', () => {
                        const currentPosition = resourcesButtonDesktop.getBoundingClientRect().top;

                        subMenuList.style.top = `${(window.innerHeight - currentPosition) > 220
                            ? currentPosition : (currentPosition - (220 - (window.innerHeight - currentPosition)))}px`;
                        if (!submenuDisabled) {
                            if (!menuOverlayed) {
                                subMenu.style.marginLeft = '200px';
                            } else {
                                subMenu.style.marginLeft = '84px';
                            }
                            subMenuWrapper.classList.remove('hide');
                            navArrow.classList.add('hide');
                            submenuDisabled = true;
                            body.style.overflowY = 'hidden';
                        } else {
                            subMenu.style.marginLeft = '-300px';
                            subMenuWrapper.classList.add('hide');
                            navArrow.classList.remove('hide');
                            submenuDisabled = false;
                            body.style.overflowY = 'auto';
                        }
                    });

                    subMenuWrapper.addEventListener('click', (e) => {
                        console.log(e.target.id);
                        if (e.target.id === 'submenu-wrapper') {
                            subMenu.style.marginLeft = '-300px';
                            subMenuWrapper.classList.add('hide');
                            navArrow.classList.remove('hide');
                            submenuDisabled = false;
                            body.style.overflowY = 'auto';
                        }
                    });

                    let menuOverlayed = false;

                    let submenuTabletDisabled = false;

                    const resourcesButtonTablet = document.getElementById('resources-tablet');
                    const popOverSubMenu = document.getElementById('popover-submenu');
                    const popOverSubMenuList = document.getElementById('popover-submenu-list');
                    const popOverMenuWindow = document.getElementById('popover-menu-window');
                    const subMenuMobile = document.getElementById('submenu-mobile');

                    resourcesButtonTablet.addEventListener('click', () => {
                        const currentPositionTop = resourcesButtonTablet.getBoundingClientRect().top;
                        const currentPositionLeft = resourcesButtonTablet.getBoundingClientRect().left;

                        popOverSubMenuList.style.top = `${(window.innerHeight - currentPositionTop) > 220
                            ? currentPositionTop : (currentPositionTop - (220 - (window.innerHeight - currentPositionTop)))}px`;
                        hideSubMenu(currentPositionLeft);
                    });

                    popOverMenu.addEventListener('click', (e) => {
                        if (e.target.id === 'popover-menu') {
                            popOverMenuFunction();
                        }
                    })

                    const menuArrowMobile = document.getElementById('menu-arrow-mobile');

                    const hideSubMenu = (currentPositionLeft) => {
                        if (window.innerWidth > 720) {
                            if (!submenuTabletDisabled) {
                                popOverSubMenu.style.marginLeft = `${currentPositionLeft - 240}px`;
                                popOverMenuWindow.style.boxShadow = 'none';
                                resourcesButtonTablet.style.background = '#FFFFFF';
                                resourcesButtonTablet.style.color = this.state.colour;
                                resourcesButtonTablet.children[0].children[0].style.fill = this.state.colour;
                                submenuTabletDisabled = true;
                            } else {
                                popOverSubMenu.style.marginLeft = '800px';
                                popOverMenuWindow.style.boxShadow = '-30px 0px 44px rgba(0, 0, 0, 0.4)';
                                resourcesButtonTablet.style.background = 'transparent';
                                resourcesButtonTablet.style.color = '#F4FFED';
                                resourcesButtonTablet.children[0].children[0].style.fill = '#F4FFED';
                                submenuTabletDisabled = false;
                            }
                        } else {
                            if (subMenuMobile.classList.contains('hide')) {
                                subMenuMobile.classList.remove('hide');
                                resourcesButtonTablet.style.background = '#FFFFFF';
                                resourcesButtonTablet.style.color = this.state.colour;
                                resourcesButtonTablet.children[0].children[0].style.fill = this.state.colour;
                                menuArrowMobile.style.transform = 'rotate(-90deg)';
                            } else {
                                subMenuMobile.classList.add('hide');
                                resourcesButtonTablet.style.background = 'transparent';
                                resourcesButtonTablet.style.color = '#F4FFED';
                                resourcesButtonTablet.children[0].children[0].style.fill = '#F4FFED';
                                menuArrowMobile.style.transform = 'rotate(90deg)';
                            }
                        }
                    }


                    const main = document.getElementById('main');
                    const footer = document.getElementById('footer');
                    const presentersPage = document.getElementById('presenters-page');
                    const presenters = document.querySelectorAll('.presenter');

                    presenters.forEach(presenter => {
                        presenter.addEventListener('click', () => {
                            presentersPage.style.display = 'flex';
                            main.style.display = 'none';
                            footer.style.display = 'none';
                        })
                    });


                    //const subMenuListResources = document.getElementById('submenu-list-resources');
                    //const subMenuListSubMenu = document.getElementById('submenu-list-submenu');

                    //subMenuListResources.addEventListener('click', () => {
                    //    if (subMenuListSubMenu.classList.contains('hide')) {
                    //        subMenuListSubMenu.classList.remove('hide');
                    //        subMenuListResources.style.borderBottom = 'none';
                    //    } else {
                    //        subMenuListSubMenu.classList.add('hide');
                    //        subMenuListResources.style.borderBottom = '1px solid rgba(207, 207, 207, 0.3)';
                    //    }

                    //})




                    /*Menu build Ends ################################################################################################################################*/


                    const messages = document.getElementById('messages');
                    const messagesMobile = document.getElementById('messagesMobile')
                    const messagesContainer = document.getElementById('messages-container');
                    const messagesIcon = document.getElementById('messages-icon');

                    messages.addEventListener('click', event => {
                        if (messagesContainer.classList.contains('hide')) {
                            messagesContainer.classList.remove('hide');
                            messagesIcon.style.fill = '#5E5E5E';
                        } else {
                            messagesContainer.classList.add('hide');
                            messagesIcon.style.fill = '#D7D7D7';
                        }
                    });

                    messagesMobile.addEventListener('click', event => {
                        console.log('here!')
                        if (messagesContainer.classList.contains('hide')) {
                            messagesContainer.classList.remove('hide');
                            messagesIcon.style.fill = '#5E5E5E';
                        } else {
                            messagesContainer.classList.add('hide');
                            messagesIcon.style.fill = '#D7D7D7;';
                        }
                    });

                    return true;

                } else {
                    return false;
                }

            } else {

                this.setState({ invalidKey: true, load: true });

                return false;
            }

        }).catch((error) => {
            return false;
        });
        return finalresult;
    }


    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }


    componentDidMount() {
        this.getSettingsv2();


    }

    helpclick() {
        const helpdiv = document.getElementById('help-session');
        helpdiv.click();
    }
    render() {
        return (
            <>
                <nav id="navbar">
                    <div id="nav-header" class="nav-header">
                        <svg id="logo" width="110" height="60" viewBox="0 0 110 60" fill="none" xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink">
                            <rect width="100" height="60" fill="url(#pattern150)" />
                            <defs>
                                <pattern id="pattern150" patternContentUnits="objectBoundingBox" width="1" height="1">
                                    <use xlinkHref="#image150" transform="translate(-0.00231481) scale(0.000925926 0.00154321)" />
                                </pattern>
                                <image id="image150" width="1085" height="648"
                                    xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABD0AAAKICAYAAAEEJLESAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkRBMUQyQTZBRDcxMTExRUFCMUI1QjFFRDU2NDJCNUJFIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkRBMUQyQTZCRDcxMTExRUFCMUI1QjFFRDU2NDJCNUJFIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6REExRDJBNjhENzExMTFFQUIxQjVCMUVENTY0MkI1QkUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6REExRDJBNjlENzExMTFFQUIxQjVCMUVENTY0MkI1QkUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4chQlJAABcgElEQVR42uyd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" />
                            </defs>
                        </svg>
                    </div>
                    <div id="menu-title" class="menu-title">MENU</div>
                    <div class="menu">
                        {this.state.loading && <div class="sessions-item">loading...</div>}
                        {

                            this.state.menus && this.state.menus.map((item, i) => {
                                var x = i % 2;
                                let menuText = item;
                                let menuKey = menuText;
                                let url = '#';

                                if (menuText.indexOf('>') > 0) {

                                    if (menuText.split('>').length === 3) {
                                        url = menuText.split('>')[2]
                                    }
                                    let tempmenuText = menuText.split('>')[0];
                                    menuText = menuText.split('>')[1];
                                    menuKey = tempmenuText;
                                }


                                switch (menuKey.toLowerCase()) {

                                    case "home":
                                        return <a href="/" class="menu-item">
                                            <div class="menu-item-wrapper">
                                                <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M2.38034
           9.46151C1.78899 9.81901
            1.01836 9.62986 0.660785
             9.03864C0.303206 8.44743
             0.492396 7.67697 1.08374
              7.31947L11.351 1.10081C11.7685
               0.848285 12.2752 0.868587 12.6625
                1.10973L17.7667 4.20148L22.901
                 7.21548C23.4978 7.56506 23.6974
                  8.33305 23.3478 8.92971C22.9981
                   9.52637 22.23 9.72592 21.6332
                    9.37634C18.3961 7.47544 15.2096
                     5.57999 11.9993 3.63551L2.38034 9.46151Z" fill="#F4FFED" />
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M20.6789 10.2742C20.8012
           10.346 20.8763 10.4772 20.8763 10.6191V20.6107C20.8763 20.8316 20.6972
            21.0107 20.4763 21.0107H14.6031C14.3822 21.0107 14.2031 20.8316 14.2031
             20.6107V14.1151C14.2031 13.8942 14.024 13.7151 13.8031 13.7151H10.1953C9.97438 13.7151
              9.79529 13.8942 9.79529 14.1151V20.6107C9.79529 20.8316 9.61621 21.0107 9.39529
               21.0107H3.52262C3.30171 21.0107 3.12262 20.8316 3.12262 20.6107V10.7071C3.12262
                10.5672 3.19572 10.4375 3.31539 10.365L11.7927 5.23023C11.92 5.15315 12.0795
                 5.15308 12.2068 5.22999C15.0204 6.92893 17.8451 8.60859 20.6789 10.2742Z" fill="#F4FFED" />
                                                </svg>
                                                <span class="menu-button">{menuText}</span>
                                            </div>
                                        </a>


                                    case "resources":

                                        return <a href="#" id={"resources-desktop"} class="menu-item">
                                            <div class="menu-item-wrapper">
                                                <svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M16.4575 4.99125C16.4575 3.9975 15.6475 3.1875 14.6537 3.1875H0.849976V23.4375H16.4575V4.99125ZM4.29248 6.83625C4.29248 6.73125 4.37498 6.64875 4.47998 6.64875H12.8237C12.9287 6.64875 13.0112 6.73125 13.0112 6.83625V10.635C13.0112 10.74 12.9287 10.8225 12.8237 10.8225H4.47998C4.37498 10.8225 4.29248 10.74 4.29248 10.635V6.83625ZM13.8887 19.6C13.7837 19.6 3.52373 19.6 3.41873 19.6C3.31373 19.6 3.23123 19.3984 3.23123 19.2C3.23123 19.095 3.31373 18.87 3.41873 18.87H13.8887C13.9937 18.87 14.0762 19.095 14.0762 19.2C14.0762 19.4219 13.9937 19.6 13.8887 19.6ZM13.8887 16.1H3.41873C3.31373 16.1 3.23123 15.805 3.23123 15.7C3.23123 15.595 3.31373 15.33 3.41873 15.33H13.8887C13.9937 15.33 14.0762 15.595 14.0762 15.7C14.0762 15.805 13.9937 16.1 13.8887 16.1Z"
                                                        fill="#F4FFED" />
                                                    <path
                                                        d="M19.0825 2.36625C19.0825 1.3725 18.2725 0.5625 17.2787 0.5625H3.47498V2.4375H15.7787C16.6072 2.4375 17.2787 3.10907 17.2787 3.9375V20.8125H19.0825V2.36625Z"
                                                        fill="#F4FFED" />
                                                </svg>
                                                <span class="menu-button">{this.state.submenus ? this.state.submenus[0] : "loading..."} </span>
                                            </div>
                                            <svg id={"menu-item-arrow"} class="menu-item-arrow" width="6" height="11" viewBox="0 0 6 11" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd"
                                                    d="M5.36435 5.89072L1.43022 9.83832C1.20118 10.0539 0.850878 10.0539 0.635309 9.83832C0.419741 9.62275 0.419741 9.25898 0.635309 9.04341L4.17872 5.5L0.635309 1.95659C0.419741 1.72754 0.419741 1.37725 0.635309 1.16168C0.850878 0.946108 1.20118 0.946108 1.43022 1.16168L5.36435 5.09581C5.57992 5.32485 5.57992 5.67515 5.36435 5.89072Z"
                                                    fill="#F4FFED" stroke="#F4FFED" stroke-width="0.2" />
                                            </svg>
                                        </a>
                                    case "people":
                                        return <a href={url} class="menu-item">
                                            <div class="menu-item-wrapper">
                                                <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M17.0857 8.65714C18.8206 8.65714 20.216 7.24914 20.216 5.51429C20.216 3.77943 18.8206 2.37143 17.0857 2.37143C15.3509 2.37143 13.9429 3.77943 13.9429 5.51429C13.9429 7.24914 15.3509 8.65714 17.0857 8.65714ZM8.8 7.54286C10.8869 7.54286 12.5589 5.85829 12.5589 3.77143C12.5589 1.68457 10.8869 0 8.8 0C6.71314 0 5.02857 1.68457 5.02857 3.77143C5.02857 5.85829 6.71314 7.54286 8.8 7.54286ZM17.0857 10.1714C14.7851 10.1714 10.1714 11.328 10.1714 13.6286V17.6H24V13.6286C24 11.328 19.3863 10.1714 17.0857 10.1714ZM8.8 10.0571C5.87086 10.0571 0 11.528 0 14.4571V17.6H8.8V14.7714C8.8 13.7029 8.57143 12 11.7794 10.4091C10.6857 10.1829 9.62972 10.0571 8.8 10.0571Z"
                                                        fill="#F4FFED" />
                                                </svg>
                                                <span class="menu-button">{menuText}</span>
                                            </div>
                                        </a>
                                    case "favorites":
                                        return <a href={url} class="menu-item">
                                            <div class="menu-item-wrapper">
                                                <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M18.4526 1.48943C20.3489 3.55237 19.7112 7.71515 17.5618 10.0534C16.2077 11.5265 16.2077 11.5265 14.2835 13.6197L10.4351 17.8063C10.1977 18.0646 9.79014 18.0646 9.55273 17.8063L5.70431 13.6197L2.42603 10.0534C0.276637 7.71515 -0.361124 3.55237 1.53519 1.48943C3.67625 -0.839754 7.90629 -0.418343 9.9939 2.62162C12.0815 -0.418343 16.3116 -0.839754 18.4526 1.48943Z"
                                                        fill="#F4FFED" />
                                                </svg>
                                                <span class="menu-button">{menuText}</span>
                                            </div>
                                        </a>

                                    case "social":
                                        return <a href={url} class="menu-item">
                                            <div class="menu-item-wrapper">
                                                <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M18.4526 1.48943C20.3489 3.55237 19.7112 7.71515 17.5618 10.0534C16.2077 11.5265 16.2077 11.5265 14.2835 13.6197L10.4351 17.8063C10.1977 18.0646 9.79014 18.0646 9.55273 17.8063L5.70431 13.6197L2.42603 10.0534C0.276637 7.71515 -0.361124 3.55237 1.53519 1.48943C3.67625 -0.839754 7.90629 -0.418343 9.9939 2.62162C12.0815 -0.418343 16.3116 -0.839754 18.4526 1.48943Z"
                                                        fill="#F4FFED" />
                                                </svg>
                                                <span class="menu-button">{menuText}</span>
                                            </div>
                                        </a>
                                    case "custom":
                                        return <a href={url} target="_blank" class="menu-item">
                                            <div class="menu-item-wrapper">
                                                <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M18.4526 1.48943C20.3489 3.55237 19.7112 7.71515 17.5618 10.0534C16.2077 11.5265 16.2077 11.5265 14.2835 13.6197L10.4351 17.8063C10.1977 18.0646 9.79014 18.0646 9.55273 17.8063L5.70431 13.6197L2.42603 10.0534C0.276637 7.71515 -0.361124 3.55237 1.53519 1.48943C3.67625 -0.839754 7.90629 -0.418343 9.9939 2.62162C12.0815 -0.418343 16.3116 -0.839754 18.4526 1.48943Z"
                                                        fill="#F4FFED" />
                                                </svg>
                                                <span class="menu-button">{menuText}</span>
                                            </div>
                                        </a>
                                    case "anchor":
                                        return <a onClick={() => {
                                            var tag = '#' + url;
                                            const section = document.querySelector(tag);
                                            section && section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                        }} class="menu-item">
                                            <div class="menu-item-wrapper">  {x == 0 ?
                                                <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M18.4526 1.48943C20.3489 3.55237 19.7112 7.71515 17.5618 10.0534C16.2077 11.5265 16.2077 11.5265 14.2835 13.6197L10.4351 17.8063C10.1977 18.0646 9.79014 18.0646 9.55273 17.8063L5.70431 13.6197L2.42603 10.0534C0.276637 7.71515 -0.361124 3.55237 1.53519 1.48943C3.67625 -0.839754 7.90629 -0.418343 9.9939 2.62162C12.0815 -0.418343 16.3116 -0.839754 18.4526 1.48943Z"
                                                        fill="#F4FFED" />
                                                </svg>

                                                :

                                                <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M17.0857 8.65714C18.8206 8.65714 20.216 7.24914 20.216 5.51429C20.216 3.77943 18.8206 2.37143 17.0857 2.37143C15.3509 2.37143 13.9429 3.77943 13.9429 5.51429C13.9429 7.24914 15.3509 8.65714 17.0857 8.65714ZM8.8 7.54286C10.8869 7.54286 12.5589 5.85829 12.5589 3.77143C12.5589 1.68457 10.8869 0 8.8 0C6.71314 0 5.02857 1.68457 5.02857 3.77143C5.02857 5.85829 6.71314 7.54286 8.8 7.54286ZM17.0857 10.1714C14.7851 10.1714 10.1714 11.328 10.1714 13.6286V17.6H24V13.6286C24 11.328 19.3863 10.1714 17.0857 10.1714ZM8.8 10.0571C5.87086 10.0571 0 11.528 0 14.4571V17.6H8.8V14.7714C8.8 13.7029 8.57143 12 11.7794 10.4091C10.6857 10.1829 9.62972 10.0571 8.8 10.0571Z"
                                                        fill="#F4FFED" />
                                                </svg>

                                            }
                                                <span class="menu-button">{menuText}</span>  </div>
                                        </a>
                                    case "help":
                                        return <a href="https://support.intemp.io" target="_blank" class="menu-item">
                                            <div class="menu-item-wrapper">
                                                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M22.0006 11.0074C22.0006 11.6111 21.953 12.2147 21.8577 12.8024H17.2511C17.2511 12.7865 17.2669 12.7707 17.2669 12.7548C17.2987 12.6436 17.3305 12.5324 17.3464 12.4212C17.3464 12.3894 17.3622 12.3576 17.3622 12.31C17.394 12.1829 17.4099 12.0558 17.4258 11.9129C17.4258 11.897 17.4258 11.8811 17.4258 11.8652C17.4417 11.7381 17.4576 11.6269 17.4576 11.4999C17.4576 11.4681 17.4576 11.4204 17.4576 11.3887C17.4734 11.2457 17.4734 11.1186 17.4734 10.9757C17.4734 10.8327 17.4734 10.7056 17.4576 10.5627C17.4576 10.5309 17.4576 10.4832 17.4576 10.4515C17.4417 10.3244 17.4417 10.2132 17.4258 10.0861C17.4258 10.0702 17.4258 10.0543 17.4258 10.0543C17.4099 9.92727 17.3781 9.7843 17.3622 9.65722C17.3622 9.62545 17.3464 9.59369 17.3464 9.56192C17.3146 9.45072 17.2987 9.32364 17.2511 9.21245C17.2511 9.19656 17.2511 9.18068 17.2352 9.16479H21.8418C21.953 9.80019 22.0006 10.4038 22.0006 11.0074Z"
                                                        fill="#F4FFED" />
                                                    <path
                                                        d="M12.7866 17.2502V21.8568C11.5953 22.0475 10.3721 22.0475 9.18079 21.8568V17.2502C9.19667 17.2502 9.21256 17.2502 9.22844 17.2661C9.33963 17.2979 9.45083 17.3297 9.57791 17.3456C9.60968 17.3456 9.62556 17.3614 9.65733 17.3614C9.92737 17.425 10.2133 17.4567 10.4992 17.4726C10.5151 17.4726 10.531 17.4726 10.5469 17.4726C10.6898 17.4885 10.8328 17.4885 10.9758 17.4885C11.1187 17.4885 11.2617 17.4885 11.4047 17.4726C11.4205 17.4726 11.4364 17.4726 11.4523 17.4726C11.7382 17.4567 12.0242 17.4091 12.2942 17.3614C12.326 17.3614 12.3419 17.3456 12.3736 17.3456C12.5007 17.3138 12.6119 17.2979 12.7231 17.2502C12.7708 17.2661 12.7708 17.2661 12.7866 17.2502Z"
                                                        fill="#F4FFED" />
                                                    <path
                                                        d="M4.73368 12.7712C4.73368 12.7871 4.73368 12.803 4.74956 12.8188H0.142964C0.0476547 12.2311 0 11.6275 0 11.0239C0 10.4202 0.0476547 9.81662 0.142964 9.22888H4.74956C4.74956 9.24477 4.73368 9.26065 4.73368 9.27654C4.70191 9.38773 4.67014 9.49892 4.65425 9.61012C4.65425 9.64189 4.63837 9.67366 4.63837 9.70543C4.6066 9.8325 4.59071 9.95958 4.57483 10.1025C4.57483 10.1184 4.57483 10.1343 4.57483 10.1502C4.55894 10.2773 4.54306 10.3885 4.54306 10.5156C4.54306 10.5473 4.54306 10.5791 4.54306 10.6267C4.52717 10.7538 4.52717 10.8968 4.52717 11.0397C4.52717 11.1827 4.52717 11.3098 4.54306 11.4528C4.54306 11.4845 4.54306 11.5163 4.54306 11.5639C4.55894 11.691 4.55894 11.8022 4.57483 11.9293C4.57483 11.9452 4.57483 11.9611 4.57483 11.977C4.59071 12.104 4.62248 12.247 4.63837 12.3741C4.63837 12.4058 4.65425 12.4376 4.65425 12.4694C4.67014 12.5329 4.70191 12.6441 4.73368 12.7712Z"
                                                        fill="#F4FFED" />
                                                    <path
                                                        d="M12.7856 0.142963V4.74956C12.7697 4.74956 12.7538 4.73368 12.7379 4.73368C12.6267 4.70191 12.5155 4.67014 12.4043 4.65425C12.3726 4.65425 12.3408 4.63837 12.309 4.63837C12.1819 4.6066 12.039 4.59071 11.9119 4.57483C11.896 4.57483 11.8801 4.57483 11.8642 4.57483C11.7372 4.55894 11.626 4.54306 11.4989 4.54306C11.4671 4.54306 11.4354 4.54306 11.3877 4.54306C11.2447 4.52717 11.1177 4.52717 10.9747 4.52717C10.8317 4.52717 10.7046 4.52717 10.5617 4.54306C10.5299 4.54306 10.4981 4.54306 10.4505 4.54306C10.3234 4.55894 10.2122 4.55894 10.0851 4.57483C10.0693 4.57483 10.0534 4.57483 10.0375 4.57483C9.89452 4.59071 9.76744 4.62248 9.64036 4.63837C9.60859 4.63837 9.57682 4.65425 9.54506 4.65425C9.43386 4.68602 9.32267 4.70191 9.21147 4.73368C9.19559 4.73368 9.1797 4.73367 9.16382 4.74956V0.142963C10.387 -0.0476544 11.5942 -0.0476544 12.7856 0.142963Z"
                                                        fill="#F4FFED" />
                                                    <path
                                                        d="M21.6665 8.29167H16.917C16.8375 8.13282 16.7581 7.97397 16.6787 7.83101C16.6628 7.81512 16.6469 7.78335 16.6469 7.76747C16.5675 7.6245 16.4722 7.48154 16.3769 7.33858C16.361 7.32269 16.3451 7.29092 16.3292 7.25915C16.2339 7.11619 16.1227 6.98911 16.0274 6.86203C16.0115 6.84615 15.9956 6.83026 15.9798 6.81438C15.7415 6.54434 15.5032 6.29018 15.2173 6.05191C15.2014 6.03602 15.1855 6.02014 15.1696 6.00425C15.0426 5.89306 14.8996 5.79775 14.7566 5.68656C14.7407 5.67067 14.709 5.65479 14.6931 5.6389C14.5501 5.54359 14.4072 5.44828 14.2642 5.36886C14.2483 5.35298 14.2165 5.35298 14.2007 5.33709C14.0418 5.25767 13.883 5.16236 13.7241 5.09882V0.333374C17.6318 1.33412 20.6658 4.36812 21.6665 8.29167Z"
                                                        fill="#F4FFED" />
                                                    <path
                                                        d="M21.6655 13.7081C20.6806 17.6317 17.6307 20.6816 13.7072 21.6664V16.901C13.866 16.8216 14.0249 16.7421 14.1678 16.6627C14.1837 16.6468 14.2155 16.6309 14.2314 16.6151C14.3743 16.5356 14.5173 16.4403 14.6602 16.345C14.692 16.3291 14.7079 16.3132 14.7397 16.2974C14.8826 16.202 15.0097 16.0909 15.1368 15.9955C15.1527 15.9797 15.1686 15.9638 15.1844 15.9479C15.4545 15.7255 15.7086 15.4713 15.931 15.2013C15.9469 15.1854 15.9628 15.1695 15.9787 15.1536C16.0899 15.0266 16.1852 14.8836 16.2964 14.7565C16.3123 14.7406 16.3281 14.7089 16.344 14.693C16.4393 14.55 16.5347 14.4071 16.6141 14.2641C16.63 14.2482 16.6458 14.2164 16.6458 14.2006C16.7253 14.0417 16.8206 13.8987 16.8841 13.724H21.6655V13.7081Z"
                                                        fill="#F4FFED" />
                                                    <path
                                                        d="M8.27476 16.9179V21.6834C4.35121 20.6985 1.30133 17.6486 0.316467 13.7251H5.06603C5.14545 13.8839 5.22487 14.0428 5.3043 14.1858C5.32018 14.2175 5.33607 14.2334 5.35195 14.2652C5.43138 14.4081 5.52669 14.5511 5.62199 14.6941C5.63788 14.7258 5.65376 14.7417 5.66965 14.7735C5.76496 14.9165 5.87615 15.0435 5.97146 15.1706C5.98735 15.1865 6.00323 15.2024 6.01911 15.2183C6.25739 15.4883 6.49566 15.7425 6.7657 15.9649C6.78159 15.9807 6.79747 15.9966 6.81336 16.0125C6.94043 16.1237 7.0834 16.219 7.22636 16.3302C7.24225 16.3461 7.27402 16.362 7.2899 16.3779C7.43286 16.4732 7.57583 16.5685 7.71879 16.6479C7.73468 16.6638 7.76645 16.6638 7.78233 16.6797C7.95706 16.7591 8.11591 16.8385 8.27476 16.9179Z"
                                                        fill="#F4FFED" />
                                                    <path
                                                        d="M8.27476 0.333374V5.09882C8.11591 5.17824 7.95706 5.25767 7.8141 5.33709C7.79821 5.35298 7.76644 5.36886 7.75056 5.38474C7.6076 5.46417 7.46463 5.55948 7.32167 5.65479C7.2899 5.67067 7.27402 5.68656 7.24225 5.70244C7.09928 5.79775 6.9722 5.90894 6.84513 6.00425C6.82924 6.02014 6.81336 6.03602 6.79747 6.05191C6.52743 6.29018 6.27327 6.52845 6.035 6.81438C6.01912 6.83026 6.00323 6.84615 5.98735 6.86203C5.87615 6.98911 5.76496 7.13207 5.66965 7.27504C5.65376 7.29092 5.63788 7.32269 5.62199 7.33858C5.52669 7.48154 5.43138 7.6245 5.35195 7.76747C5.33607 7.78335 5.33607 7.81512 5.32018 7.83101C5.22488 7.98985 5.14545 8.1487 5.08191 8.30755H0.316467C1.31721 4.36812 4.36709 1.33412 8.27476 0.333374Z"
                                                        fill="#F4FFED" />
                                                </svg>
                                                <span class="menu-button">{menuText}</span>
                                            </div>
                                        </a>

                                    case "logout":
                                        return <a href="/logout" class="menu-item">
                                            <div class="menu-item-wrapper">
                                                <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                                        d="M0.769434 3.91343L8.27432 0.317395C8.81609 -0.00676043 9.52334 0.37945 9.52334 1.02663V2.10677H15.106C15.5622 2.10677 15.9317 2.47655 15.9317 2.93246V6.3735C15.9317 7.45959 14.2803 7.45959 14.2803 6.3735V3.75815H9.52334V16.2347H14.2803V13.6194C14.2803 12.5336 15.9317 12.5336 15.9317 13.6194V17.0604C15.9317 17.5166 15.5622 17.8861 15.106 17.8861H9.52334L9.52023 18.9666C9.52079 19.5636 8.89317 19.9716 8.34289 19.7084L0.838005 16.1123C0.522917 15.9959 0.298218 15.6927 0.298218 15.3377L0.301618 4.65553C0.301901 4.34866 0.474463 4.05454 0.769434 3.91343ZM12.0273 8.95031C10.6531 8.95031 10.6531 11.04 12.0273 11.04H18.1254L16.9418 12.2233C15.9705 13.1947 17.4476 14.6721 18.4192 13.7007L21.38 10.7397C21.7789 10.3407 21.8124 9.68306 21.38 9.25066L18.4192 6.28963C17.4476 5.31829 15.9705 6.79569 16.9418 7.76703L18.1254 8.95031H12.0273Z"
                                                        fill="#F4FFED" />
                                                </svg>
                                                <span class="menu-button">{menuText}</span>
                                            </div>
                                        </a>

                                    case "upload":
                                        return <a href="/file" class="menu-item">
                                            <div class="menu-item-wrapper">
                                                <svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M16.4575 4.99125C16.4575 3.9975 15.6475 3.1875 14.6537 3.1875H0.849976V23.4375H16.4575V4.99125ZM4.29248 6.83625C4.29248 6.73125 4.37498 6.64875 4.47998 6.64875H12.8237C12.9287 6.64875 13.0112 6.73125 13.0112 6.83625V10.635C13.0112 10.74 12.9287 10.8225 12.8237 10.8225H4.47998C4.37498 10.8225 4.29248 10.74 4.29248 10.635V6.83625ZM13.8887 19.6C13.7837 19.6 3.52373 19.6 3.41873 19.6C3.31373 19.6 3.23123 19.3984 3.23123 19.2C3.23123 19.095 3.31373 18.87 3.41873 18.87H13.8887C13.9937 18.87 14.0762 19.095 14.0762 19.2C14.0762 19.4219 13.9937 19.6 13.8887 19.6ZM13.8887 16.1H3.41873C3.31373 16.1 3.23123 15.805 3.23123 15.7C3.23123 15.595 3.31373 15.33 3.41873 15.33H13.8887C13.9937 15.33 14.0762 15.595 14.0762 15.7C14.0762 15.805 13.9937 16.1 13.8887 16.1Z"
                                                        fill="#F4FFED" />
                                                    <path
                                                        d="M19.0825 2.36625C19.0825 1.3725 18.2725 0.5625 17.2787 0.5625H3.47498V2.4375H15.7787C16.6072 2.4375 17.2787 3.10907 17.2787 3.9375V20.8125H19.0825V2.36625Z"
                                                        fill="#F4FFED" />
                                                </svg>
                                                <span class="menu-button">{menuText}</span>
                                            </div>

                                        </a>
                                }

                            })}

                        <a class="menu-item" onClick={() => this.helpclick()}>
                            <div class="menu-item-wrapper" >
                                <svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M16.4575 4.99125C16.4575 3.9975 15.6475 3.1875 14.6537 3.1875H0.849976V23.4375H16.4575V4.99125ZM4.29248 6.83625C4.29248 6.73125 4.37498 6.64875 4.47998 6.64875H12.8237C12.9287 6.64875 13.0112 6.73125 13.0112 6.83625V10.635C13.0112 10.74 12.9287 10.8225 12.8237 10.8225H4.47998C4.37498 10.8225 4.29248 10.74 4.29248 10.635V6.83625ZM13.8887 19.6C13.7837 19.6 3.52373 19.6 3.41873 19.6C3.31373 19.6 3.23123 19.3984 3.23123 19.2C3.23123 19.095 3.31373 18.87 3.41873 18.87H13.8887C13.9937 18.87 14.0762 19.095 14.0762 19.2C14.0762 19.4219 13.9937 19.6 13.8887 19.6ZM13.8887 16.1H3.41873C3.31373 16.1 3.23123 15.805 3.23123 15.7C3.23123 15.595 3.31373 15.33 3.41873 15.33H13.8887C13.9937 15.33 14.0762 15.595 14.0762 15.7C14.0762 15.805 13.9937 16.1 13.8887 16.1Z"
                                        fill="#F4FFED" />
                                    <path
                                        d="M19.0825 2.36625C19.0825 1.3725 18.2725 0.5625 17.2787 0.5625H3.47498V2.4375H15.7787C16.6072 2.4375 17.2787 3.10907 17.2787 3.9375V20.8125H19.0825V2.36625Z"
                                        fill="#F4FFED" />
                                </svg>
                                <span class="menu-button">Help</span>
                            </div>

                        </a>

                    </div>
                    <div id="nav-arrow" class="nav-arrow">
                        <svg id="arrow-icon" width="91" height="80" viewBox="0 0 91 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="menu" filter="url(#filter0_dd)">
                                <circle cx="51" cy="40" r="24" fill="white" />
                            </g>
                            <path id="menu-tile" d="M54.8915 30.5996L45.1992 40.2919L54.8915 48.5996" stroke="#592d5f" stroke-width="2"
                                stroke-linejoin="round" />
                            <defs>
                                <filter id="filter0_dd" x="0" y="0" width="91" height="80" filterUnits="userSpaceOnUse"
                                    color-interpolation-filters="sRGB">
                                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                                    <feOffset dx="-15" dy="1" />
                                    <feGaussianBlur stdDeviation="6" />
                                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0" />
                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                                    <feOffset />
                                    <feGaussianBlur stdDeviation="8" />
                                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                                    <feBlend mode="normal" in2="effect1_dropShadow" result="effect2_dropShadow" />
                                    <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow" result="shape" />
                                </filter>
                            </defs>
                        </svg>
                    </div>
                    <div class="overlay-menu">
                        <div id="messagesMobile" class="msgs">
                            <div class="msgs-number">
                                {this.props.msgCount}
        </div>
                            <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path id="messages-icon" fill-rule="evenodd" clip-rule="evenodd"
                                    d="M16.6534 14.915H9.58143C9.16009 15.3843 8.65609 15.9256 8.18676 16.4563C7.12276 17.659 4.62943 18.6483 4.26676 18.7443C3.90409 18.8403 2.93609 18.7923 3.51743 18.1176C4.09876 17.443 4.67743 15.7096 4.67743 14.915H3.00809C1.46676 14.915 0.202759 13.659 0.202759 12.1203V3.16297C0.202759 1.62697 1.46676 0.370972 3.00809 0.370972H16.6534C18.1974 0.370972 19.4614 1.62697 19.4614 3.16297V12.1203C19.4614 13.659 18.1974 14.915 16.6534 14.915ZM14.5734 6.14964C13.8268 6.14964 13.2188 6.75231 13.2188 7.49897C13.2188 8.24297 13.8268 8.84564 14.5734 8.84564C15.3228 8.84564 15.9281 8.24297 15.9281 7.49897C15.9281 6.75231 15.3228 6.14964 14.5734 6.14964ZM9.92809 6.29364C9.18143 6.29364 8.57343 6.89897 8.57343 7.64297C8.57343 8.38697 9.18143 8.99231 9.92809 8.99231C10.6774 8.99231 11.2828 8.38697 11.2828 7.64297C11.2828 6.89897 10.6774 6.29364 9.92809 6.29364ZM5.28276 6.43764C4.53609 6.43764 3.92809 7.04297 3.92809 7.78697C3.92809 8.53097 4.53609 9.13631 5.28276 9.13631C6.03209 9.13631 6.63743 8.53097 6.63743 7.78697C6.63743 7.04297 6.03209 6.43764 5.28276 6.43764ZM21.5894 5.04297H21.1921C21.2081 5.15231 21.2161 5.26431 21.2161 5.37897V13.9043C21.2161 15.3336 20.0401 16.5043 18.6028 16.5043H10.3628C9.82676 17.0856 8.92809 18.059 8.92809 18.059C8.92809 18.059 9.21609 18.7683 10.1228 18.7683H17.3548C17.6294 19.643 18.3654 20.3763 18.8561 20.755C19.3894 21.163 20.3201 21.7283 21.0934 21.7656C21.8668 21.8003 21.9521 21.5496 21.8188 21.379C21.6854 21.211 21.2988 20.2963 21.1414 19.8856C21.0401 19.6216 21.0508 19.1016 21.0694 18.7683H21.5894C23.0268 18.7683 24.2028 17.5976 24.2028 16.1656V7.64297C24.2028 6.21097 23.0268 5.04297 21.5894 5.04297Z"
                                    fill={this.props.msgCount > 0 ? '#EC9A1D' : '#FFFFFF'}/>
                            </svg>
                        </div>
                        <div class="vertical-line"></div>
                        <svg id="overlay-menu" width="35" height="22" viewBox="0 0 35 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip130)">
                                <line x1="34" y1="21" x2="1" y2="21" stroke="white" stroke-width="2" stroke-linecap="round" />
                                <line x1="34" y1="11" x2="10" y2="11" stroke="white" stroke-width="2" stroke-linecap="round" />
                                <line x1="34" y1="1" x2="1" y2="0.999997" stroke="white" stroke-width="2" stroke-linecap="round" />
                            </g>
                            <defs>
                                <clipPath id="clip130">
                                    <rect width="35" height="22" fill="white" transform="translate(35 22) rotate(-180)" />
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                    <div id="popover-menu" class="popover-menu hide">
                        <div id="popover-menu-window" class="popover-menu-window">
                            <div class="close">
                                <svg id="close" width="35" height="23" viewBox="0 0 35 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip140)">
                                        <path d="M7 1L29 22M29 1L7 22" stroke="white" stroke-width="2" stroke-linecap="round" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip140">
                                            <rect width="35" height="23" fill="white" transform="translate(35 23) rotate(-180)" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>
                            <div class="popover-menu-window-wrapper">
                                <div class="popover-header" style={{ display: "none" }}>
                                    <svg id="logo" width="100" height="60" viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg"
                                        xmlnsXlink="http://www.w3.org/1999/xlink">
                                        <rect width="100" height="60" fill="url(#pattern0)" />
                                        <defs>
                                            <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                                                <use xlinkHref="#image0" transform="translate(-0.00231481) scale(0.000925926 0.00154321)" />
                                            </pattern>
                                            <image id="image0" width="1085" height="648"
                                                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABD0AAAKICAYAAAEEJLESAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkRBMUQyQTZBRDcxMTExRUFCMUI1QjFFRDU2NDJCNUJFIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkRBMUQyQTZCRDcxMTExRUFCMUI1QjFFRDU2NDJCNUJFIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6REExRDJBNjhENzExMTFFQUIxQjVCMUVENTY0MkI1QkUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6REExRDJBNjlENzExMTFFQUIxQjVCMUVENTY0MkI1QkUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4chQlJAABcgElEQVR42uyd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" />
                                        </defs>
                                    </svg>
                                </div>
                                <div class="popover-header-auth">
                                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M24 0C10.752 0 0 10.752 0 24C0 37.248 10.752 48 24 48C37.248 48 48 37.248 48 24C48 10.752 37.248 0 24 0Z"
                                            fill="white" />
                                        <path
                                            d="M24 0C10.752 0 0 10.752 0 24C0 37.248 10.752 48 24 48C37.248 48 48 37.248 48 24C48 10.752 37.248 0 24 0ZM24 7.2C27.984 7.2 31.2 10.416 31.2 14.4C31.2 18.384 27.984 21.6 24 21.6C20.016 21.6 16.8 18.384 16.8 14.4C16.8 10.416 20.016 7.2 24 7.2ZM24 41.28C18 41.28 12.696 38.208 9.6 33.552C9.672 28.776 19.2 26.16 24 26.16C28.776 26.16 38.328 28.776 38.4 33.552C35.304 38.208 30 41.28 24 41.28Z"
                                            fill="#D7D7D7" />
                                    </svg>
                                    <div class="info">
                                        <div class="info-name">
                                            <span>{this.state.firstName}</span>
                                            <svg width="15" height="8" viewBox="0 0 15 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M13.5719 0.375926C14.3227 -0.439818 15.5115 0.752424 14.7607 1.50542L8.56639 7.71763C8.25354 8.09412 7.69042 8.09412 7.37758 7.71763L1.18328 1.50542C0.369883 0.752424 1.55869 -0.439819 2.37208 0.375926L7.9407 5.96064L13.5719 0.375926Z"
                                                    fill="#F4FFED" />
                                            </svg>
                                        </div>
                                        <div class="info-position">
                                            Participant
              </div>
                                    </div>
                                </div>
                                <svg width="248" height="1" viewBox="0 0 248 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect opacity="0.25" width="248" height="1" fill="#F4FFED" />
                                </svg>
                                <div class="popover-window-menu">
                                    {this.state.loading && <div class="sessions-item">loading...</div>}
                                    {
                                        //mobile
                                        this.state.menus && this.state.menus.map((item, i) => {
                                            var x = i % 2;
                                            let menuText = item;
                                            let menuKey = menuText;
                                            let url = '#';

                                            if (menuText.indexOf('>') > 0) {

                                                if (menuText.split('>').length === 3) {
                                                    url = menuText.split('>')[2]
                                                }
                                                let tempmenuText = menuText.split('>')[0];
                                                menuText = menuText.split('>')[1];
                                                menuKey = tempmenuText;
                                            }


                                            switch (menuKey.toLowerCase()) {

                                                case "home":
                                                    return <a href="/" class="popover-window-menu-item">
                                                        <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M2.38034
           9.46151C1.78899 9.81901
            1.01836 9.62986 0.660785
             9.03864C0.303206 8.44743
             0.492396 7.67697 1.08374
              7.31947L11.351 1.10081C11.7685
               0.848285 12.2752 0.868587 12.6625
                1.10973L17.7667 4.20148L22.901
                 7.21548C23.4978 7.56506 23.6974
                  8.33305 23.3478 8.92971C22.9981
                   9.52637 22.23 9.72592 21.6332
                    9.37634C18.3961 7.47544 15.2096
                     5.57999 11.9993 3.63551L2.38034 9.46151Z" fill="#F4FFED" />
                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M20.6789 10.2742C20.8012
           10.346 20.8763 10.4772 20.8763 10.6191V20.6107C20.8763 20.8316 20.6972
            21.0107 20.4763 21.0107H14.6031C14.3822 21.0107 14.2031 20.8316 14.2031
             20.6107V14.1151C14.2031 13.8942 14.024 13.7151 13.8031 13.7151H10.1953C9.97438 13.7151
              9.79529 13.8942 9.79529 14.1151V20.6107C9.79529 20.8316 9.61621 21.0107 9.39529
               21.0107H3.52262C3.30171 21.0107 3.12262 20.8316 3.12262 20.6107V10.7071C3.12262
                10.5672 3.19572 10.4375 3.31539 10.365L11.7927 5.23023C11.92 5.15315 12.0795
                 5.15308 12.2068 5.22999C15.0204 6.92893 17.8451 8.60859 20.6789 10.2742Z" fill="#F4FFED" />
                                                        </svg>
                                                        <span>{menuText}</span>
                                                    </a>


                                                case "resources":
                                                    return <>
                                                        <a href="#" id="resources-tablet" class="popover-window-menu-item">
                                                            <svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path
                                                                    d="M16.4575 4.99125C16.4575 3.9975 15.6475 3.1875 14.6537 3.1875H0.849976V23.4375H16.4575V4.99125ZM4.29248 6.83625C4.29248 6.73125 4.37498 6.64875 4.47998 6.64875H12.8237C12.9287 6.64875 13.0112 6.73125 13.0112 6.83625V10.635C13.0112 10.74 12.9287 10.8225 12.8237 10.8225H4.47998C4.37498 10.8225 4.29248 10.74 4.29248 10.635V6.83625ZM13.8887 19.6C13.7837 19.6 3.52373 19.6 3.41873 19.6C3.31373 19.6 3.23123 19.3984 3.23123 19.2C3.23123 19.095 3.31373 18.87 3.41873 18.87H13.8887C13.9937 18.87 14.0762 19.095 14.0762 19.2C14.0762 19.4219 13.9937 19.6 13.8887 19.6ZM13.8887 16.1H3.41873C3.31373 16.1 3.23123 15.805 3.23123 15.7C3.23123 15.595 3.31373 15.33 3.41873 15.33H13.8887C13.9937 15.33 14.0762 15.595 14.0762 15.7C14.0762 15.805 13.9937 16.1 13.8887 16.1Z"
                                                                    fill="#F4FFED" />
                                                                <path
                                                                    d="M19.0825 2.36625C19.0825 1.3725 18.2725 0.5625 17.2787 0.5625H3.47498V2.4375H15.7787C16.6072 2.4375 17.2787 3.10907 17.2787 3.9375V20.8125H19.0825V2.36625Z"
                                                                    fill="#F4FFED" />
                                                            </svg>
                                                            <span>{this.state.submenus ? this.state.submenus[0] : "loading..."}</span>
                                                            <svg id="menu-arrow-mobile"
                                                                class="menu-item-arrow" width="6" height="11" viewBox="0 0 6 11" fill="none"
                                                                xmlns="http://www.w3.org/2000/svg">
                                                                <path fill-rule="evenodd" clip-rule="evenodd"
                                                                    d="M5.36435 5.89072L1.43022 9.83832C1.20118 10.0539 0.850878 10.0539 0.635309 9.83832C0.419741 9.62275 0.419741 9.25898 0.635309 9.04341L4.17872 5.5L0.635309 1.95659C0.419741 1.72754 0.419741 1.37725 0.635309 1.16168C0.850878 0.946108 1.20118 0.946108 1.43022 1.16168L5.36435 5.09581C5.57992 5.32485 5.57992 5.67515 5.36435 5.89072Z"
                                                                    fill="#F4FFED" stroke="#F4FFED" stroke-width="0.2" />
                                                            </svg>
                                                        </a>
                                                        <div id="submenu-mobile" class="item-submenu hide">

                                                            {
                                                                this.state.submenus && this.state.submenus.map((item, i) => {
                                                                    let menucount = 0;
                                                                    if (i > 0) {
                                                                        if (item.indexOf('#') < 0) {
                                                                            let htmlsubmenu = "";
                                                                            var html = <>

                                                                                <div id={"item-submenu-item-resources" + i} class="item-submenu-item" onClick={() => this.hidemobilesubmenuGeneric("item-submenu-item-resources" + i, "item-submenu-submenu" + i)}>
                                                                                    <div>
                                                                                        <svg width="7" height="7" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                            <rect x="1" y="1" width="5" height="5" rx="2.5" fill="#C2C2C2" stroke="#C2C2C2" />
                                                                                        </svg>
                                                                                        <span>{item}</span>
                                                                                    </div>
                                                                                    <div class="messages">{
                                                                                        this.state.submenus.map((submenu, subindex) => {
                                                                                            let submenuprifix = item + '#';
                                                                                            if (submenu.includes(submenuprifix)) {
                                                                                                menucount = menucount + 1;



                                                                                            }

                                                                                            if (this.state.submenus.length == subindex + 1)
                                                                                                return (menucount)
                                                                                        })
                                                                                    }</div>
                                                                                </div>
                                                                                <div id={"item-submenu-submenu" + i} class="item-submenu-submenu hide">
                                                                                    {this.state.submenus.map((submenu, subindex) => {
                                                                                        let submenuprifix = item + '#';
                                                                                        let url = submenu.split('#')[2];
                                                                                        if (submenu.includes(submenuprifix)) {
                                                                                            menucount++;


                                                                                            return (

                                                                                                <div class="item-submenu-submenu-item" onClick={() => this.openInNewTab(url)}>
                                                                                                    <span>{submenu.split('#')[1]}</span>
                                                                                                    <svg width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                                                                                            d="M4.63694 5.0756L1.3585 8.36527C1.16763 8.54491 0.875712 8.54491 0.696071 8.36527C0.51643 8.18563 0.51643 7.88249 0.696071 7.70284L3.64892 4.75L0.696071 1.79716C0.51643 1.60629 0.51643 1.31437 0.696071 1.13473C0.875712 0.95509 1.16763 0.95509 1.3585 1.13473L4.63694 4.41317C4.81658 4.60404 4.81658 4.89596 4.63694 5.0756Z"
                                                                                                            fill="#A6A6A6" stroke="#A6A6A6" stroke-width="0.2" />
                                                                                                    </svg>
                                                                                                </div>)
                                                                                        }
                                                                                    })}
                                                                                </div>

                                                                            </>
                                                                            return (html)
                                                                        }
                                                                    }
                                                                })
                                                            }


                                                        </div>
                                                    </>

                                                case "people":
                                                    return <a href={url} class="popover-window-menu-item">
                                                        <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M17.0857 8.65714C18.8206 8.65714 20.216 7.24914 20.216 5.51429C20.216 3.77943 18.8206 2.37143 17.0857 2.37143C15.3509 2.37143 13.9429 3.77943 13.9429 5.51429C13.9429 7.24914 15.3509 8.65714 17.0857 8.65714ZM8.8 7.54286C10.8869 7.54286 12.5589 5.85829 12.5589 3.77143C12.5589 1.68457 10.8869 0 8.8 0C6.71314 0 5.02857 1.68457 5.02857 3.77143C5.02857 5.85829 6.71314 7.54286 8.8 7.54286ZM17.0857 10.1714C14.7851 10.1714 10.1714 11.328 10.1714 13.6286V17.6H24V13.6286C24 11.328 19.3863 10.1714 17.0857 10.1714ZM8.8 10.0571C5.87086 10.0571 0 11.528 0 14.4571V17.6H8.8V14.7714C8.8 13.7029 8.57143 12 11.7794 10.4091C10.6857 10.1829 9.62972 10.0571 8.8 10.0571Z"
                                                                fill="#F4FFED" />
                                                        </svg>
                                                        <span>{menuText}</span>
                                                    </a>

                                                case "favorites":
                                                    return <a href={url} class="popover-window-menu-item">
                                                        <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M18.4526 1.48943C20.3489 3.55237 19.7112 7.71515 17.5618 10.0534C16.2077 11.5265 16.2077 11.5265 14.2835 13.6197L10.4351 17.8063C10.1977 18.0646 9.79014 18.0646 9.55273 17.8063L5.70431 13.6197L2.42603 10.0534C0.276637 7.71515 -0.361124 3.55237 1.53519 1.48943C3.67625 -0.839754 7.90629 -0.418343 9.9939 2.62162C12.0815 -0.418343 16.3116 -0.839754 18.4526 1.48943Z"
                                                                fill="#F4FFED" />
                                                        </svg>
                                                        <span>{menuText} </span>
                                                    </a>

                                                case "social":
                                                    return <a href={url} class="popover-window-menu-item">
                                                        <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M16.5147 0C15.7722 7.96019e-06 15.0601 0.295015 14.535 0.820051C14.01 1.34509 13.715 2.05717 13.715 2.79968C13.7164 3.00714 13.7409 3.21377 13.788 3.41582L8.25428 7.5788C7.42388 6.90336 6.38651 6.53401 5.3161 6.53259C4.07858 6.53259 2.89175 7.02429 2.01669 7.89934C1.14164 8.7744 0.65003 9.96122 0.650024 11.1987C0.65003 12.4362 1.14164 13.6231 2.01669 14.4981C2.89175 15.3732 4.07858 15.8647 5.3161 15.8647C6.49789 15.8636 7.63525 15.4142 8.49852 14.6071L13.788 18.5878C13.7438 18.7853 13.715 18.9896 13.715 19.2003C13.7151 20.7466 14.9685 22 16.5147 22C18.0609 22 19.3143 20.7466 19.3143 19.2003C19.3143 17.6542 18.0609 16.4006 16.5147 16.4006C15.8615 16.4006 15.2703 16.6345 14.7941 17.0095L9.58119 13.0834C9.84454 12.4899 9.98112 11.848 9.98219 11.1987C9.9819 10.4402 9.79672 9.69327 9.44267 9.02248L14.7868 5.00164C15.2796 5.38866 15.8881 5.5991 16.5147 5.59937C17.2572 5.59936 17.9693 5.30435 18.4943 4.77931C19.0194 4.25428 19.3143 3.54219 19.3143 2.79968C19.3143 2.05717 19.0194 1.34509 18.4943 0.820051C17.9693 0.295015 17.2572 7.96019e-06 16.5147 0H16.5147Z"
                                                                fill="#F4FFED" />
                                                        </svg>
                                                        <span>{menuText} </span>
                                                    </a>

                                                case "custom":
                                                    return <a href={url} target="_blank" class="popover-window-menu-item">
                                                        <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M16.5147 0C15.7722 7.96019e-06 15.0601 0.295015 14.535 0.820051C14.01 1.34509 13.715 2.05717 13.715 2.79968C13.7164 3.00714 13.7409 3.21377 13.788 3.41582L8.25428 7.5788C7.42388 6.90336 6.38651 6.53401 5.3161 6.53259C4.07858 6.53259 2.89175 7.02429 2.01669 7.89934C1.14164 8.7744 0.65003 9.96122 0.650024 11.1987C0.65003 12.4362 1.14164 13.6231 2.01669 14.4981C2.89175 15.3732 4.07858 15.8647 5.3161 15.8647C6.49789 15.8636 7.63525 15.4142 8.49852 14.6071L13.788 18.5878C13.7438 18.7853 13.715 18.9896 13.715 19.2003C13.7151 20.7466 14.9685 22 16.5147 22C18.0609 22 19.3143 20.7466 19.3143 19.2003C19.3143 17.6542 18.0609 16.4006 16.5147 16.4006C15.8615 16.4006 15.2703 16.6345 14.7941 17.0095L9.58119 13.0834C9.84454 12.4899 9.98112 11.848 9.98219 11.1987C9.9819 10.4402 9.79672 9.69327 9.44267 9.02248L14.7868 5.00164C15.2796 5.38866 15.8881 5.5991 16.5147 5.59937C17.2572 5.59936 17.9693 5.30435 18.4943 4.77931C19.0194 4.25428 19.3143 3.54219 19.3143 2.79968C19.3143 2.05717 19.0194 1.34509 18.4943 0.820051C17.9693 0.295015 17.2572 7.96019e-06 16.5147 0H16.5147Z"
                                                                fill="#F4FFED" />
                                                        </svg>
                                                        <span>{menuText} </span>
                                                    </a>
                                                case "anchor":
                                                    return <a onClick={() => {
                                                        var tag = '#' + url;
                                                        const section = document.querySelector(tag);
                                                        section && section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                                    }} class="menu-item">
                                                        <div class="menu-item-wrapper">  {x == 0 ?
                                                            <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path
                                                                    d="M18.4526 1.48943C20.3489 3.55237 19.7112 7.71515 17.5618 10.0534C16.2077 11.5265 16.2077 11.5265 14.2835 13.6197L10.4351 17.8063C10.1977 18.0646 9.79014 18.0646 9.55273 17.8063L5.70431 13.6197L2.42603 10.0534C0.276637 7.71515 -0.361124 3.55237 1.53519 1.48943C3.67625 -0.839754 7.90629 -0.418343 9.9939 2.62162C12.0815 -0.418343 16.3116 -0.839754 18.4526 1.48943Z"
                                                                    fill="#F4FFED" />
                                                            </svg>

                                                            :

                                                            <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path
                                                                    d="M17.0857 8.65714C18.8206 8.65714 20.216 7.24914 20.216 5.51429C20.216 3.77943 18.8206 2.37143 17.0857 2.37143C15.3509 2.37143 13.9429 3.77943 13.9429 5.51429C13.9429 7.24914 15.3509 8.65714 17.0857 8.65714ZM8.8 7.54286C10.8869 7.54286 12.5589 5.85829 12.5589 3.77143C12.5589 1.68457 10.8869 0 8.8 0C6.71314 0 5.02857 1.68457 5.02857 3.77143C5.02857 5.85829 6.71314 7.54286 8.8 7.54286ZM17.0857 10.1714C14.7851 10.1714 10.1714 11.328 10.1714 13.6286V17.6H24V13.6286C24 11.328 19.3863 10.1714 17.0857 10.1714ZM8.8 10.0571C5.87086 10.0571 0 11.528 0 14.4571V17.6H8.8V14.7714C8.8 13.7029 8.57143 12 11.7794 10.4091C10.6857 10.1829 9.62972 10.0571 8.8 10.0571Z"
                                                                    fill="#F4FFED" />
                                                            </svg>

                                                        }
                                                            <span class="menu-button">{menuText}</span>  </div>
                                                    </a>
                                                case "help":
                                                    return <a href="https://support.intemp.io" class="popover-window-menu-item">
                                                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M22.0006 11.0074C22.0006 11.6111 21.953 12.2147 21.8577 12.8024H17.2511C17.2511 12.7865 17.2669 12.7707 17.2669 12.7548C17.2987 12.6436 17.3305 12.5324 17.3464 12.4212C17.3464 12.3894 17.3622 12.3576 17.3622 12.31C17.394 12.1829 17.4099 12.0558 17.4258 11.9129C17.4258 11.897 17.4258 11.8811 17.4258 11.8652C17.4417 11.7381 17.4576 11.6269 17.4576 11.4999C17.4576 11.4681 17.4576 11.4204 17.4576 11.3887C17.4734 11.2457 17.4734 11.1186 17.4734 10.9757C17.4734 10.8327 17.4734 10.7056 17.4576 10.5627C17.4576 10.5309 17.4576 10.4832 17.4576 10.4515C17.4417 10.3244 17.4417 10.2132 17.4258 10.0861C17.4258 10.0702 17.4258 10.0543 17.4258 10.0543C17.4099 9.92727 17.3781 9.7843 17.3622 9.65722C17.3622 9.62545 17.3464 9.59369 17.3464 9.56192C17.3146 9.45072 17.2987 9.32364 17.2511 9.21245C17.2511 9.19656 17.2511 9.18068 17.2352 9.16479H21.8418C21.953 9.80019 22.0006 10.4038 22.0006 11.0074Z"
                                                                fill="#F4FFED" />
                                                            <path
                                                                d="M12.7866 17.2502V21.8568C11.5953 22.0475 10.3721 22.0475 9.18079 21.8568V17.2502C9.19667 17.2502 9.21256 17.2502 9.22844 17.2661C9.33963 17.2979 9.45083 17.3297 9.57791 17.3456C9.60968 17.3456 9.62556 17.3614 9.65733 17.3614C9.92737 17.425 10.2133 17.4567 10.4992 17.4726C10.5151 17.4726 10.531 17.4726 10.5469 17.4726C10.6898 17.4885 10.8328 17.4885 10.9758 17.4885C11.1187 17.4885 11.2617 17.4885 11.4047 17.4726C11.4205 17.4726 11.4364 17.4726 11.4523 17.4726C11.7382 17.4567 12.0242 17.4091 12.2942 17.3614C12.326 17.3614 12.3419 17.3456 12.3736 17.3456C12.5007 17.3138 12.6119 17.2979 12.7231 17.2502C12.7708 17.2661 12.7708 17.2661 12.7866 17.2502Z"
                                                                fill="#F4FFED" />
                                                            <path
                                                                d="M4.73368 12.7712C4.73368 12.7871 4.73368 12.803 4.74956 12.8188H0.142964C0.0476547 12.2311 0 11.6275 0 11.0239C0 10.4202 0.0476547 9.81662 0.142964 9.22888H4.74956C4.74956 9.24477 4.73368 9.26065 4.73368 9.27654C4.70191 9.38773 4.67014 9.49892 4.65425 9.61012C4.65425 9.64189 4.63837 9.67366 4.63837 9.70543C4.6066 9.8325 4.59071 9.95958 4.57483 10.1025C4.57483 10.1184 4.57483 10.1343 4.57483 10.1502C4.55894 10.2773 4.54306 10.3885 4.54306 10.5156C4.54306 10.5473 4.54306 10.5791 4.54306 10.6267C4.52717 10.7538 4.52717 10.8968 4.52717 11.0397C4.52717 11.1827 4.52717 11.3098 4.54306 11.4528C4.54306 11.4845 4.54306 11.5163 4.54306 11.5639C4.55894 11.691 4.55894 11.8022 4.57483 11.9293C4.57483 11.9452 4.57483 11.9611 4.57483 11.977C4.59071 12.104 4.62248 12.247 4.63837 12.3741C4.63837 12.4058 4.65425 12.4376 4.65425 12.4694C4.67014 12.5329 4.70191 12.6441 4.73368 12.7712Z"
                                                                fill="#F4FFED" />
                                                            <path
                                                                d="M12.7856 0.142963V4.74956C12.7697 4.74956 12.7538 4.73368 12.7379 4.73368C12.6267 4.70191 12.5155 4.67014 12.4043 4.65425C12.3726 4.65425 12.3408 4.63837 12.309 4.63837C12.1819 4.6066 12.039 4.59071 11.9119 4.57483C11.896 4.57483 11.8801 4.57483 11.8642 4.57483C11.7372 4.55894 11.626 4.54306 11.4989 4.54306C11.4671 4.54306 11.4354 4.54306 11.3877 4.54306C11.2447 4.52717 11.1177 4.52717 10.9747 4.52717C10.8317 4.52717 10.7046 4.52717 10.5617 4.54306C10.5299 4.54306 10.4981 4.54306 10.4505 4.54306C10.3234 4.55894 10.2122 4.55894 10.0851 4.57483C10.0693 4.57483 10.0534 4.57483 10.0375 4.57483C9.89452 4.59071 9.76744 4.62248 9.64036 4.63837C9.60859 4.63837 9.57682 4.65425 9.54506 4.65425C9.43386 4.68602 9.32267 4.70191 9.21147 4.73368C9.19559 4.73368 9.1797 4.73367 9.16382 4.74956V0.142963C10.387 -0.0476544 11.5942 -0.0476544 12.7856 0.142963Z"
                                                                fill="#F4FFED" />
                                                            <path
                                                                d="M21.6665 8.29167H16.917C16.8375 8.13282 16.7581 7.97397 16.6787 7.83101C16.6628 7.81512 16.6469 7.78335 16.6469 7.76747C16.5675 7.6245 16.4722 7.48154 16.3769 7.33858C16.361 7.32269 16.3451 7.29092 16.3292 7.25915C16.2339 7.11619 16.1227 6.98911 16.0274 6.86203C16.0115 6.84615 15.9956 6.83026 15.9798 6.81438C15.7415 6.54434 15.5032 6.29018 15.2173 6.05191C15.2014 6.03602 15.1855 6.02014 15.1696 6.00425C15.0426 5.89306 14.8996 5.79775 14.7566 5.68656C14.7407 5.67067 14.709 5.65479 14.6931 5.6389C14.5501 5.54359 14.4072 5.44828 14.2642 5.36886C14.2483 5.35298 14.2165 5.35298 14.2007 5.33709C14.0418 5.25767 13.883 5.16236 13.7241 5.09882V0.333374C17.6318 1.33412 20.6658 4.36812 21.6665 8.29167Z"
                                                                fill="#F4FFED" />
                                                            <path
                                                                d="M21.6655 13.7081C20.6806 17.6317 17.6307 20.6816 13.7072 21.6664V16.901C13.866 16.8216 14.0249 16.7421 14.1678 16.6627C14.1837 16.6468 14.2155 16.6309 14.2314 16.6151C14.3743 16.5356 14.5173 16.4403 14.6602 16.345C14.692 16.3291 14.7079 16.3132 14.7397 16.2974C14.8826 16.202 15.0097 16.0909 15.1368 15.9955C15.1527 15.9797 15.1686 15.9638 15.1844 15.9479C15.4545 15.7255 15.7086 15.4713 15.931 15.2013C15.9469 15.1854 15.9628 15.1695 15.9787 15.1536C16.0899 15.0266 16.1852 14.8836 16.2964 14.7565C16.3123 14.7406 16.3281 14.7089 16.344 14.693C16.4393 14.55 16.5347 14.4071 16.6141 14.2641C16.63 14.2482 16.6458 14.2164 16.6458 14.2006C16.7253 14.0417 16.8206 13.8987 16.8841 13.724H21.6655V13.7081Z"
                                                                fill="#F4FFED" />
                                                            <path
                                                                d="M8.27476 16.9179V21.6834C4.35121 20.6985 1.30133 17.6486 0.316467 13.7251H5.06603C5.14545 13.8839 5.22487 14.0428 5.3043 14.1858C5.32018 14.2175 5.33607 14.2334 5.35195 14.2652C5.43138 14.4081 5.52669 14.5511 5.62199 14.6941C5.63788 14.7258 5.65376 14.7417 5.66965 14.7735C5.76496 14.9165 5.87615 15.0435 5.97146 15.1706C5.98735 15.1865 6.00323 15.2024 6.01911 15.2183C6.25739 15.4883 6.49566 15.7425 6.7657 15.9649C6.78159 15.9807 6.79747 15.9966 6.81336 16.0125C6.94043 16.1237 7.0834 16.219 7.22636 16.3302C7.24225 16.3461 7.27402 16.362 7.2899 16.3779C7.43286 16.4732 7.57583 16.5685 7.71879 16.6479C7.73468 16.6638 7.76645 16.6638 7.78233 16.6797C7.95706 16.7591 8.11591 16.8385 8.27476 16.9179Z"
                                                                fill="#F4FFED" />
                                                            <path
                                                                d="M8.27476 0.333374V5.09882C8.11591 5.17824 7.95706 5.25767 7.8141 5.33709C7.79821 5.35298 7.76644 5.36886 7.75056 5.38474C7.6076 5.46417 7.46463 5.55948 7.32167 5.65479C7.2899 5.67067 7.27402 5.68656 7.24225 5.70244C7.09928 5.79775 6.9722 5.90894 6.84513 6.00425C6.82924 6.02014 6.81336 6.03602 6.79747 6.05191C6.52743 6.29018 6.27327 6.52845 6.035 6.81438C6.01912 6.83026 6.00323 6.84615 5.98735 6.86203C5.87615 6.98911 5.76496 7.13207 5.66965 7.27504C5.65376 7.29092 5.63788 7.32269 5.62199 7.33858C5.52669 7.48154 5.43138 7.6245 5.35195 7.76747C5.33607 7.78335 5.33607 7.81512 5.32018 7.83101C5.22488 7.98985 5.14545 8.1487 5.08191 8.30755H0.316467C1.31721 4.36812 4.36709 1.33412 8.27476 0.333374Z"
                                                                fill="#F4FFED" />
                                                        </svg>
                                                        <span>{menuText} </span>
                                                    </a>

                                                case "logout":
                                                    return <a href="/logout" class="popover-window-menu-item">
                                                        <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                                d="M0.769434 3.91343L8.27432 0.317395C8.81609 -0.00676043 9.52334 0.37945 9.52334 1.02663V2.10677H15.106C15.5622 2.10677 15.9317 2.47655 15.9317 2.93246V6.3735C15.9317 7.45959 14.2803 7.45959 14.2803 6.3735V3.75815H9.52334V16.2347H14.2803V13.6194C14.2803 12.5336 15.9317 12.5336 15.9317 13.6194V17.0604C15.9317 17.5166 15.5622 17.8861 15.106 17.8861H9.52334L9.52023 18.9666C9.52079 19.5636 8.89317 19.9716 8.34289 19.7084L0.838005 16.1123C0.522917 15.9959 0.298218 15.6927 0.298218 15.3377L0.301618 4.65553C0.301901 4.34866 0.474463 4.05454 0.769434 3.91343ZM12.0273 8.95031C10.6531 8.95031 10.6531 11.04 12.0273 11.04H18.1254L16.9418 12.2233C15.9705 13.1947 17.4476 14.6721 18.4192 13.7007L21.38 10.7397C21.7789 10.3407 21.8124 9.68306 21.38 9.25066L18.4192 6.28963C17.4476 5.31829 15.9705 6.79569 16.9418 7.76703L18.1254 8.95031H12.0273Z"
                                                                fill="#F4FFED" />
                                                        </svg>
                                                        <span>{menuText} </span>
                                                    </a>



                                            }
                                        })}
                                </div>
                                <svg width="248" height="1" viewBox="0 0 248 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect opacity="0.25" width="248" height="1" fill="#F4FFED" />
                                </svg>
                                <button class="buy-tickets" style={{ display: "none" }}>Buy Tickets</button>
                                <button class="log-in" style={{ display: "none" }}>Log in</button>
                            </div>
                        </div>


                        <div id="popover-submenu" class="popover-submenu">
                            <div id="popover-submenu-list" class="popover-submenu-list">


                                {
                                    this.state.submenus && this.state.submenus.map((item, i) => {
                                        let menucount = 0;
                                        if (i > 0) {
                                            if (item.indexOf('#') < 0) {
                                                let htmlsubmenu = "";
                                                var html = <>

                                                    <div id={"popover-submenu-list-resources" + i} class="popover-submenu-list-item" onClick={() => this.hidepopupoversubmenuGeneric("popover-submenu-list-resources" + i, "popover-list-submenu" + i)}>
                                                        <div>
                                                            <svg width="7" height="7" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <rect x="1" y="1" width="5" height="5" rx="2.5" fill="#C2C2C2" stroke="#C2C2C2" />
                                                            </svg>
                                                            <span>{item}</span>
                                                        </div>
                                                        <div class="messages">{
                                                            this.state.submenus.map((submenu, subindex) => {
                                                                let submenuprifix = item + '#';
                                                                if (submenu.includes(submenuprifix)) {
                                                                    menucount = menucount + 1;



                                                                }

                                                                if (this.state.submenus.length == subindex + 1)
                                                                    return (menucount)
                                                            })
                                                        }</div>
                                                    </div>
                                                    <div id={"popover-list-submenu" + i} class="submenu-list-submenu hide">
                                                        {this.state.submenus.map((submenu, subindex) => {
                                                            let submenuprifix = item + '#';
                                                            let url = submenu.split('#')[2];
                                                            if (submenu.includes(submenuprifix)) {
                                                                menucount++;


                                                                return (

                                                                    <div class="submenu-list-submenu-item" onClick={() => this.openInNewTab(url)}>
                                                                        <span>{submenu.split('#')[1]}</span>
                                                                        <svg width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                                                d="M4.63694 5.0756L1.3585 8.36527C1.16763 8.54491 0.875712 8.54491 0.696071 8.36527C0.51643 8.18563 0.51643 7.88249 0.696071 7.70284L3.64892 4.75L0.696071 1.79716C0.51643 1.60629 0.51643 1.31437 0.696071 1.13473C0.875712 0.95509 1.16763 0.95509 1.3585 1.13473L4.63694 4.41317C4.81658 4.60404 4.81658 4.89596 4.63694 5.0756Z"
                                                                                fill="#A6A6A6" stroke="#A6A6A6" stroke-width="0.2" />
                                                                        </svg>
                                                                    </div>)
                                                            }
                                                        })}
                                                    </div>

                                                </>
                                                return (html)
                                            }
                                        }
                                    })
                                }


                            </div>
                        </div>
                    </div>


                </nav>


                <div id="submenu-wrapper" class="submenu-wrapper hide">
                    <div id="submenu" class="submenu">
                        <div id="submenu-list" class="submenu-list">

                            {
                                this.state.submenus && this.state.submenus.map((item, i) => {
                                    let menucount = 0;
                                    if (i > 0) {
                                        if (item.indexOf('#') < 0) {
                                            let htmlsubmenu = "";
                                            var html = <><div id={"submenu-list-resources" + i} class="submenu-list-item" onClick={() => this.hidesubmenuGeneric("submenu-list-resources" + i, "submenu-list-submenu" + i)}>
                                                <div>
                                                    <svg width="7" height="7" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <rect x="1" y="1" width="5" height="5" rx="2.5" fill="#C2C2C2" stroke="#C2C2C2" />
                                                    </svg>
                                                    <span>{item}</span>
                                                </div>
                                                <div class="messages">{
                                                    this.state.submenus.map((submenu, subindex) => {
                                                        let submenuprifix = item + '#';
                                                        if (submenu.includes(submenuprifix)) {
                                                            menucount = menucount + 1;



                                                        }

                                                        if (this.state.submenus.length == subindex + 1)
                                                            return (menucount)
                                                    })
                                                }</div>
                                            </div>
                                                <div id={"submenu-list-submenu" + i} class="submenu-list-submenu hide">
                                                    {this.state.submenus.map((submenu, subindex) => {
                                                        let submenuprifix = item + '#';
                                                        let url = submenu.split('#')[2];
                                                        if (submenu.includes(submenuprifix)) {
                                                            menucount++;


                                                            return (

                                                                <div class="submenu-list-submenu-item" onClick={() => this.openInNewTab(url)}>
                                                                    <span>{submenu.split('#')[1]}</span>
                                                                    <svg width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                                                            d="M4.63694 5.0756L1.3585 8.36527C1.16763 8.54491 0.875712 8.54491 0.696071 8.36527C0.51643 8.18563 0.51643 7.88249 0.696071 7.70284L3.64892 4.75L0.696071 1.79716C0.51643 1.60629 0.51643 1.31437 0.696071 1.13473C0.875712 0.95509 1.16763 0.95509 1.3585 1.13473L4.63694 4.41317C4.81658 4.60404 4.81658 4.89596 4.63694 5.0756Z"
                                                                            fill="#A6A6A6" stroke="#A6A6A6" stroke-width="0.2" />
                                                                    </svg>
                                                                </div>)
                                                        }
                                                    })}
                                                </div>

                                            </>
                                            return (html)
                                        }
                                    }
                                })
                            }

                        </div>
                    </div>
                </div>

            </>

        );
    }
}