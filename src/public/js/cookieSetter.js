console.log('estamos acá')
const form = document.querySelector('#cookieForm')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const data = new FormData(form)
    // const obj = Object.fromEntries(data.entries())
    console.log(data)
    const obj = {}
    data.forEach((value, key) =>  obj[key] = value)
    // console.log(obj)

    fetch('http://localhost:8080/cookie/setSigned', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    })
    .then(respuesta => respuesta.json())
    .then(respuesta => console.log(respuesta))

})

const getCookie = () => {
    console.log(document.cookie)
}