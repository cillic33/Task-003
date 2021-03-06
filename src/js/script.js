const   sm = 800,
        wrapperSize = 1170,
        headerHeight = 100

let     docWidth, /* document width without scroll */
        bannerHeight,
        divBannerImg = $('.banner__img'),
        divBannerWrapper = $('.banner__wrapper')

setBannerHeight = () => {
    docWidth = document.documentElement.clientWidth
    bannerHeight = divBannerImg.height()
    if (docWidth > wrapperSize) { bannerHeight -= headerHeight }
    divBannerWrapper.css('height', bannerHeight+'px')
}

window.onload = () => {
    setBannerHeight()
 }

document.addEventListener('DOMContentLoaded', () => {

    window.addEventListener('resize', e => {
        docWidth = document.documentElement.clientWidth

        /* hiding the header menu in the mobile version */
        if (docWidth > sm) {
            $('.menu__body').show()
        } else {
            $('.menu__body').hide()
        }

        setBannerHeight()
    })

    /* hiding the header menu when clicking outside it */
    window.addEventListener('click', e => {
        const target = e.target
        docWidth = document.documentElement.clientWidth
        if (!(target).closest('.header__menu') && docWidth <= 800) {
            $('.menu__body').slideUp()
        }
    })

    
    /* order form */
    setRange = () => {
        let userPercentValue = $('input[name=userPercent]').val();
        if (userPercentValue) $('.order__range-result').html(userPercentValue+'%');
    }

    setAttach = () => {
        let userAttachName = document.forms['orderForm']['userAttach'].files[0]['name'];
        if (userAttachName) $('.order__label-file-input span').html(userAttachName);
    }

    /* order form validation */
    const   orderForm = document.forms.orderForm,
            typeOfSystem = orderForm.elements.typeOfSystem,
            userEmail = orderForm.elements.userEmail,
            userName = orderForm.elements.userName

    let     formValidSuccess,
            textError

    showError = () => {
        alert(textError)
    }

    isEmptyTypeOfSystem = () => {
        if (typeOfSystem.value == '') { return true } else { return false }
    }

    isEmptyUserEmail = () => {
        if (userEmail.value == '') { return true } else { return false }
    }

    isValidUserEmail = () => {
        let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/
        if (userEmail.value.match(pattern)) { return true } else { return false }
    }

    isEmptyUserName = () => {
        if (userName.value == '') { return true } else { return false }
    }
    

    orderForm.addEventListener('submit', e => {
        formValidSuccess = true
        textError = '?????????? ???? ???????????????????? \n'

        if (isEmptyTypeOfSystem()) {
            formValidSuccess = false
            textError += '?????????????????? ???????? "???????????????? ?????? ??????????????" \n'
        }

        if (isEmptyUserEmail()) {
            formValidSuccess = false
            textError += '?????????????????? ???????? "?????? e-mail" \n'
        }

        if (!isEmptyUserEmail() && !isValidUserEmail()) {
            formValidSuccess = false
            textError += '???????? "?????? e-mail" ?????????????????? ?????????????? \n'
        }

        if (isEmptyUserName()) {
            formValidSuccess = false
            textError += '?????????????????? ???????? "???????? ??????" \n'
        }

        if (!formValidSuccess) {
            showError()
            e.preventDefault()
        } else {
            alert('??????????????, ???????? ???????????? ????????????????????.')
            orderForm.reset()
            $('.order__label-file-input span').html('???????????????????? ????????')
        }
    })
})
