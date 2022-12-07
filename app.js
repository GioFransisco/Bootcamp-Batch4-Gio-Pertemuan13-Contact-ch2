const express = require('express')
const func = require('./callfunction')
const app = express()
const path = require('path');
const fs = require('fs')
// const morgan = require('morgan')
const expressLayout = require('express-ejs-layouts');
const { name } = require('ejs');
const port = 3000

// membuat direktori data jika belum ada
const dirPath = './data';
if(!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath);
}

//membuat file dengan nama contact.json didalam folder data jika belum ada
const dataPath = './data/contacts.json';
if(!fs.existsSync(dataPath)){
    fs.writeFileSync(dataPath,'[]','utf-8');
}

//information using EJS
app.set('view engine', 'ejs')

//using third party express layout
app.use(expressLayout)

// app.use(morgan('dev'))

//fungsi middleware
app.use((req, res, next) => {
  console.log('Time:', Date.now())
  next()
})

//untuk memanggil file static (contoh kasus disini adalah untuk memanggil file gambar yang  )
app.use(express.static(path.join(__dirname, 'public')))

// app.set('layout','layouts/layout')
// routing untuk path pada browser
app.get('/', (req,res) => {
  res.render('index', {
    layout : "layouts/main",
    title : "Halaman Index"
  })
})

//routing untuk path pada browser
app.get('/about', (req, res) => {
  res.render('about', {
    layout : "layouts/main",
    title : "Halaman About"
  })
})

//routing untuk path pada browser
app.get('/contact', (req, res) => {
  const cont = func.readJSON()
  console.log(cont); //opsional
  res.render('contact', {
    layout : "layouts/main",
    title : "Halaman Contact",
    cont,
  })
})

//routing untuk path pada browser
app.get('/detail/:name', (req, res) => {
  //untuk mengirimkan nilai ke parameter dengan menggunakan req.params (contoh kasus disini menggunakan :name)
  const cont = func.findContact(req.params.name) 
  const url = req.params.name
  res.render('detail', {
    layout : "layouts/main",
    title : "Halaman Detail",
    cont,
    url
  })
})

//route untuk menunjukkan status code 404 jika path url tidak ditentukan
app.use('/', (req, res) => {
  res.status(404)
  res.send('page not found')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})  