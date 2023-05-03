const {Router} = require('express')

const router = Router()

router.get('/set', (req, res)=>{

    res.cookie('CoderCookie', 'Este es el valor de la cookie', {maxAge: 10000000}).send('Cookie seteada')
})

router.get('/', (req,res)=>{
    res.render('login', {})
})

router.get('/get', (req, res)=>{
    
    res.send(req.cookies)
})
// con firma
router.post('/setSigned', (req, res)=>{
    const {username, password} = req.body
    console.log(username, password)

    res.cookie('username', username, { maxAge: 10000000, signed: true}).send({message: 'Cookie seteada'})
})

router.get('/getSigned', (req, res)=>{
    console.log(req.signedCookies)
    res.send(req.signedCookies)
})

router.get('/delete', (req, res)=>{

    res.clearCookie('CoderCookie').send('Cookie removed')
})



module.exports = router