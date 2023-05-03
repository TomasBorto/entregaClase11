const { Router } = require('express')
// import { Router } from 'express'



const router = Router()


router.use((req, res, next)=>{
    console.log('Time: ', Date())
    next()
})

// GET api/productos /
router.get('/', (request, response) =>{
    
    response.status(200).send({
        dato1: request.dato1,
        dato2: request.dato2
    })
})

// GET api/productos /
router.post('/', (request, response) =>{
    const {name, price} = request.body
    response.status(200).send({name, price})
})

module.exports = router
// export default router

