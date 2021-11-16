document.addEventListener('DOMContentLoaded', () => {

    const   sm = 800
            
    let     docWidth,
            bannerHeight,
            bannerTextHeight,
            delta
            
    let calculateDelta = () => {
        docWidth = document.documentElement.clientWidth
        bannerHeight = $('.banner').height()
        bannerTextHeight = $('.banner__text').height()
        if (docWidth > sm) { bannerHeight -= 100 }
        delta = Math.round((bannerHeight - bannerTextHeight) / 2)
        return delta
    }

    window.addEventListener('resize', e => {
        docWidth = document.documentElement.clientWidth

        if (docWidth > sm) {
            $('.menu__body').show()
        } else {
            $('.menu__body').hide()
        }

        delta = calculateDelta()
        $('.banner__text').css('paddingTop', delta+'px')
    })

    window.addEventListener('click', e => {
        const target = e.target
        const docWidth = document.documentElement.clientWidth
        if (!(target).closest('.header__menu') && docWidth <= 800) {
            console.log(sm)
            $('.menu__body').slideUp()
        }
    })

    delta = calculateDelta()
    $('.banner__text').css('paddingTop', delta+'px')

})