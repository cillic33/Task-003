document.addEventListener('DOMContentLoaded', () => {

    const sm = 800

    window.addEventListener('resize', e => {
        const docWidth = document.documentElement.clientWidth
        if (docWidth > sm) {
            $('.menu__body').show()
        } else {
            $('.menu__body').hide()
        }
    })

    window.addEventListener('click', e => {
        const target = e.target
        const docWidth = document.documentElement.clientWidth
        if (!(target).closest('.header__menu') && docWidth <= 800) {
            console.log(sm)
            $('.menu__body').slideUp()
        }
    })

})