document.addEventListener('DOMContentLoaded', () => {

    const   sm = 800,
            wrapperSize = 1170
            
    let     docWidth,
            bannerHeight,
            bannerTextHeight,
            delta,
            resizeTimeoutId
            
    let calculateDelta = () => {
        docWidth = document.documentElement.clientWidth
        bannerHeight = $('.banner').height()
        bannerTextHeight = $('.banner__text').height()
        if (docWidth > wrapperSize) { bannerHeight -= 100 }
        delta = Math.round((bannerHeight - bannerTextHeight) / 2)
        return delta
    }

    window.addEventListener('resize', e => {
        clearTimeout(resizeTimeoutId)
        resizeTimeoutId = setTimeout(() => {
            docWidth = document.documentElement.clientWidth

            if (docWidth > sm) {
                $('.menu__body').show()
            } else {
                $('.menu__body').hide()
            }
    
            delta = calculateDelta()
            $('.banner__text').css('paddingTop', delta+'px')
        }, 500);
    })

    window.addEventListener('click', e => {
        const target = e.target
        docWidth = document.documentElement.clientWidth
        if (!(target).closest('.header__menu') && docWidth <= 800) {
            console.log(sm)
            $('.menu__body').slideUp()
        }
    })

    delta = calculateDelta()
    $('.banner__text').css('paddingTop', delta+'px')

    
    /* order form */
    setRange = () => {
        let userPercentValue = $('input[name=userPercent]').val();
        if (userPercentValue) $('.order__range-result').html(userPercentValue+'%');
    }

    setAttach = () => {
        let userAttachName = document.forms['orderForm']['userAttach'].files[0]['name'];
        if (userAttachName) $('.order__label-file-input span').html(userAttachName);
    }

    /* form validation */
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
        textError = 'Форма не отправлена \n'

        if (isEmptyTypeOfSystem()) {
            formValidSuccess = false
            textError += 'Заполните поле "Выберите тип системы" \n'
        }

        if (isEmptyUserEmail()) {
            formValidSuccess = false
            textError += 'Заполните поле "Ваш e-mail" \n'
        }

        if (!isEmptyUserEmail() && !isValidUserEmail()) {
            formValidSuccess = false
            textError += 'Поле "Ваш e-mail" заполнено неверно \n'
        }

        if (isEmptyUserName()) {
            formValidSuccess = false
            textError += 'Заполните поле "Ваше имя" \n'
        }

        if (!formValidSuccess) {
            showError()
            e.preventDefault()
        } else {
            alert('Спасибо, ваша заявка отправлена.')
            orderForm.reset()
            $('.order__label-file-input span').html('Прикрепить файл')
        }
    })
})
