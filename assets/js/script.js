document.addEventListener('DOMContentLoaded', () => {

    const sm = 800

    window.addEventListener('resize', e => {
        if (document.documentElement.clientWidth > sm) {
            $('.menu__body').show()
        } else {
            $('.menu__body').hide()
        }
    })

    window.addEventListener('click', e => {
        const target = e.target
        if (!(target).closest('.header__menu')) {
            $('.menu__body').slideUp()
        }
    })

})