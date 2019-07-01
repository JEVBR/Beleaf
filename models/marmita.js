const mongoose = require('mongoose')

const marmitaSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  preco: {
    type: Number,
    required: true
  },
  desconto: {
    type: Number
  },
  estoque: {
    type: Number,
    required: true
  },
  ingredientes: {
    type: String,
    required: true
  },
  productImage: {
    type: Buffer,
    required: true
  },
  productImageType: {
    type: String,
    required: true
  }
})

marmitaSchema.virtual('productImagePath').get(function() {
  if (this.productImage != null && this.productImageType != null) {
    return `data:${this.productImageType};charset=utf-8;base64,${this.productImage.toString('base64')}`
  }
})

module.exports = mongoose.model('Marmita', marmitaSchema)
