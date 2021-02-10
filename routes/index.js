var express = require('express');
var router = express.Router();
var menus = require('./../inc/menus');
var reservations = require('./../inc/reservations');
var contacts = require('./../inc/contacts');
var seo = require('./../inc/seo');

/* GET home page. */
router.get('/', function(req, res, next) {

  menus.getMenus().then(foods => {

    res.render('index', { 
      title: seo.title,
      menus: foods,
      isHome: true,
      body: req.body 
    });

  }).catch(error => {

    console.error(error)

  });

});

router.get('/menu', function(req, res, next) {

  menus.getMenus().then(foods => {

    res.render('menu', { 
      menus: foods,
      title: `Menu - ${seo.title}`,
      background: 'images/img_bg_1.jpg',
      h1: 'Saboreie nosso menu!'
    });

  }).catch(error => {

    console.error(error)

  });
  
});

router.get('/servicos', function(req, res, next) {
  
  res.render('services', { 
    title: `Serviços - ${seo.title}`,
    background: 'images/img_bg_1.jpg',
    h1: 'É um prazer poder servir!'
  });
  
});

router.get('/contato', function(req, res, next) {
  
  contacts.render(req, res, seo.title);
  
});

router.post('/contato', function(req, res) {
  
  let { name, email, message } = req.body;

  if(!name) {
    contacts.render(req, res, seo.title, 'Digite o nome');
  } else if (!email) {
    contacts.render(req, res, seo.title, 'Digite o e-mail');
  } else if (!message) {
    contacts.render(req, res, seo.title, 'Digite uma mensagem');
  } else {
    
    contacts.save(req.body).then(results => {

      req.body = {};

      contacts.render(req, res, seo.title, null, 'Contato enviado com sucesso');

    }).catch(error => {

      contacts.render(req, res, seo.title, 'Tente novamente');

    });

  }

  
});

router.get('/reserva', function(req, res, next) {
  
  reservations.render(req, res, seo.title);
  
});

router.post('/reserva', function(req, res) {

  if(!req.body.name) {
    reservations.render(req, res, seo.title, 'Digite o nome');
  } else if (!req.body.email) {
    reservations.render(req, res, seo.title, 'Digite o e-mail');
  } else if (!req.body.people) {
    reservations.render(req, res, seo.title, 'Digite a quantidade de reservas');
  } else if (!req.body.date) {
    reservations.render(req, res, seo.title, 'Digite a data da reserva');
  } else if (!req.body.time) {
    reservations.render(req, res, seo.title, 'Digite a hora da reserva');
  } else {
    
    reservations.save(req.body).then(results => {

      req.body = {};

      reservations.render(req, res, seo.title, null, 'Reserva realizada com sucesso');
    
    }).catch(error => {
    
      reservations.render(req, res, seo.title, error.message, null);
    
    });

  }
  
  
});

module.exports = router;
