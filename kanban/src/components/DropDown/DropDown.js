function createUserMenu() {
    const userMenu = document.querySelector('.user__menu');
    const menuArrow = document.querySelector('.menu__arrow');

    let dropDownTemplate = `
        <li class="drop-down__item">Profile</li>
        <li class="drop-down__item">My tasks</li>
        <li class="drop-down__item">Log out</li>
    `;

    let dropDownMenu = document.createElement('ul');
    dropDownMenu.className = 'drop-down';
    dropDownMenu.innerHTML = dropDownTemplate;

    userMenu.addEventListener('click', () => {
        if (menuArrow.classList.contains('menu__arrow_shown')) {
            dropDownMenu.remove();
            menuArrow.classList.remove('menu__arrow_shown');
        } else {
            menuArrow.classList.add('menu__arrow_shown');
            userMenu.appendChild(dropDownMenu);
        }
    });

    return userMenu;
}

module.exports = createUserMenu;
    
