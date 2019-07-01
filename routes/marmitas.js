const express = require('express')
const router = express.Router()
const Marmita = require('../models/marmita')
const imageMimeTypes = ['image/jpeg', 'image/png', 'images/gif']
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// All marmitas Route
router.get('/', async (req, res) => {
  let query = Marmita.find()
  if (req.query.nome != null && req.query.nome != '') {
    query = query.regex('nome', new RegExp(req.query.nome, 'i'))
  }
  try {
    const marmitas = await query.exec()
    res.render('marmitas/index', {
      marmitas: marmitas,
      searchOptions: req.query
    })
  } catch {
    res.redirect('/')
  }
})

// New marmita Route
router.get('/new', ensureAuthenticated, async (req, res) => {
  renderNewPage(res, new Marmita())
})

// Create marmita Route
router.post('/', ensureAuthenticated, async (req, res) => {
  const marmita = new Marmita({
    nome: req.body.nome,
    preco: req.body.preco,
    desconto: req.body.desconto,
    ingredientes: req.body.ingredientes,
    estoque: req.body.estoque,
    description: req.body.description
  })
  saveProductImg(marmita, req.body.product)

  try {
    const newmarmita = await marmita.save()
    res.redirect(`marmitas/${newmarmita.id}`)
  } catch (e){
    console.log(e)
    renderNewPage(res, marmita, true)
  }
})

// Show marmita Route
router.get('/:id', async (req, res) => {
  try {
    const marmita = await Marmita.findById(req.params.id).exec()
    res.render('marmitas/show', { marmita: marmita })
  } catch {
    res.redirect('/')
  }
})

// Edit marmita Route
router.get('/:id/edit', ensureAuthenticated, async (req, res) => {
  try {
    const marmita = await Marmita.findById(req.params.id)
    renderEditPage(res, marmita)
  } catch {
    res.redirect('/')
  }
})

// Update marmita Route
router.put('/:id', ensureAuthenticated, async (req, res) => {
  let marmita
  try {
    marmita = await Marmita.findById(req.params.id)
    marmita.nome = req.body.nome
    marmita.preco = req.body.preco
    marmita.desconto = req.body.desconto
    marmita.ingredientes = req.body.ingredientes
    marmita.estoque = req.body.estoque
    marmita.description = req.body.description
    if (req.body.mproduct != null && req.body.product !== '') {
      saveProductImg(marmita, req.body.product)
    }
    await marmita.save()
    res.redirect(`/marmitas/${marmita.id}`)
  } catch (e){
    console.log(e)
    if (marmita != null) {
      renderEditPage(res,marmita,true)
    } else {
      res.render('marmitas/show', {
        marmita: marmita,
        errorMessage: ' oopps'
      })
    }
  }
})

// Delete marmita
router.delete('/:id', ensureAuthenticated, async (req,res ) => {
  let marmita
  try {
    marmita= await Marmita.findById(req.params.id)
    await marmita.remove()
    res.redirect('/marmitas')
  } catch (e){
    console.log(e)
    if (marmita != null) {
      res.render('marmitas/show', {
        marmita: marmita,
        errorMessage: ' Could not remove marmita'
      })
    } else {
      res.redirect('/')
    }
  }
})

async function renderEditPage(res, marmita, form, hasError = false) {
  renderFormPage(res,marmita, 'edit', hasError)
}

async function renderNewPage(res, marmita, hasError = false) {
  renderFormPage(res,marmita, 'new', hasError)
}

async function renderFormPage(res, marmita, form, hasError = false) {
  try {
    const params = { marmita: marmita }
    if (hasError) params.errorMessage = 'Error Creating marmita'
    res.render(`marmitas/${form}`, params)
  } catch (e) {
    console.log(e)
    res.redirect('/marmitas')
  }
}

async function renderNewPage(res, marmita, hasError = false) {
  renderFormPage(res,marmita, 'new', hasError)
}

function saveProductImg(marmita, productEncoded) {
  if (productEncoded == null) return
  const product = JSON.parse(productEncoded)
  if (product != null && imageMimeTypes.includes(product.type)) {
    marmita.productImage = new Buffer.from(product.data, 'base64')
    marmita.productImageType = product.type
  }
}

module.exports = router
