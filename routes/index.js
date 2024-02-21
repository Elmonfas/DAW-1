const express = require('express');
const router = express.Router();
const fs = require('fs')

let videojuegos = JSON.parse(fs.readFileSync('bd.json'))

router.get('/',(req, res, next)  => {
  res.send('Welcome to VideoGame SHOP')
});

router.get('/videojuegos', (req, res) => {
  
  let respuesta = fs.readFileSync('./bd.json', "utf-8")
  res.send(respuesta)
})

router.get('/videojuegos/:id', (req ,res) => {
  let e = videojuegos.find(e => e.id == req.params.id)
  console.log(e)
  if (e == undefined){
    res.sendStatus(404)
  }
  res.send(e)
})

router.post('/videojuegos', (req, res) => {
  const videogame = {
    "id": req.body.id,
    "name":req.body.name
  }
  res.send(videogame)
  videojuegos.push(videogame)
  videojuegos = JSON.stringify(videojuegos)
  fs.writeFileSync('./bd.json', videojuegos)
})

router.delete('/videojuegos/:id', (req, res) => {
  let e = videojuegos.find(e => e.id == req.params.id)
  if (e == undefined){
    res.sendStatus(404)
  }
  
  videojuegos = videojuegos.filter(e => e.id != req.params.id)

  res.send(videojuegos)

  videojuegos = JSON.stringify(videojuegos)
  fs.writeFileSync('./bd.json', videojuegos)

})

router.put('/videojuegos/:id', (req, res) => {
  let e = videojuegos.find(e => e.id == req.params.id)
  if (e == undefined){
    res.sendStatus(404)
  }
  
  for(let i = 0; i < videojuegos.length ; i++){
    console.log(videojuegos[i])
    if(videojuegos[i].id == req.params.id){
      videojuegos[i].name = req.body.nombre
    }
  }
  
  videojuegos = JSON.stringify(videojuegos)
  fs.writeFileSync('./bd.json', videojuegos)

  res.send(videojuegos)
})
module.exports = router;
