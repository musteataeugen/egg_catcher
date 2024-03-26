let moldLeft = 225
let score = 0
let duration = 5
const mold = document.getElementsByClassName('mold')[0]
const eggs = document.getElementsByClassName('egg')
const scoreDiv = document.getElementsByClassName('scoreDiv')[0]

// HW2:put some limits
const moveMold = (e) => {
    switch (e.code) {
        case 'ArrowRight':
            if (moldLeft < 450) {
                moldLeft += 5
            }
            break
        case 'ArrowLeft':
            if (moldLeft > 0) {
                moldLeft -= 5
            }
            break
    }
    mold.style.left = `${moldLeft}px`
}
const animationEnd = (e) => {
    let egg = e.target
    if (e.animationName == 'move') {
        if (125 <= moldLeft && moldLeft <= 150 
            &&
            egg.classList.contains('left') // HW4:Use className
            ||
            305 <= moldLeft && moldLeft <= 330 
            &&
            egg.classList.contains('right')//HW4:Use className
            ) {
            score++
            // egg.classList.remove('move')
            egg.className = egg.className.replace("move", "")
            setTimeout(() => {
                // egg.classList.add('move')
                egg.className += ' move'
            }, 500)
            document.querySelector('.mold').innerText = score
            duration--
            if (duration <= 0)
                duration = 0.5
            egg.style.setProperty('animation-duration', `${duration}s`)

        } else {
            score--
            // HM3: do the same using .className
            // egg.classList.remove('move')
            // egg.classList.add('fall')
            egg.className = egg.className.replace("move", " fall")
            egg.style.removeProperty('animation-duration')
            if (score > 0) {
                document.querySelector('.mold').innerHTML = score
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
    scoreDiv.innerHTML = `score: ${score}`

}

document.body.addEventListener('keydown', moveMold)
const eggElements = [...eggs]
eggElements.forEach((egg) => {
    egg.addEventListener('animationend', animationEnd)
});