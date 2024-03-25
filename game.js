let moldLeft = 225
let score = 0
const mold = document.getElementsByClassName('mold')[0]
const egg = document.getElementsByClassName('egg')[0]

// HW2:put some limits
const moveMold = (e) => {
    switch (e.code) {
        case 'ArrowRight':
           if (moldLeft < 450) {
            moldLeft += 5}
            break
        case 'ArrowLeft':
            if (moldLeft > 0) {
            moldLeft -= 5}
            break
    }
    mold.style.left = `${moldLeft}px`
}
const animationEnd = (e) => {
    if (e.animationName == 'move') {
        if (125 <= moldLeft && moldLeft <= 150) {
            score++
            // egg.classList.remove('move')
            egg.className = egg.className.replace("move", "")
            setTimeout(() => {
                // egg.classList.add('move')
                egg.className += ' move'
            }, 500)
            document.querySelector('.mold').innerText = score
        } else {
            score--
            // HM3: do the same using .className
            // egg.classList.remove('move')
            // egg.classList.add('fall')
            egg.className = egg.className.replace("move", " fall")         
            if (score > 0) {
            document.querySelector('.mold').innerHTML = score
            } else {
                alert ('GAME OVER!')
            }
        }
    }
    if (e.animationName == 'fall') {
        // egg.classList.add('egg-broken')
        egg.className += ' egg-broken'
        setTimeout(() => {
            egg.classList.remove('egg-broken')
            egg.classList.remove('fall')
            egg.classList.add('move')
        }, 1000);
    }

}

document.body.addEventListener('keydown', moveMold)
egg.addEventListener('animationend', animationEnd)