var express = require('express');
var router = express.Router();
var seo = require('./../inc/seo');
var users = require('./../inc/users');
var admin = require('./../inc/admin');
var menus = require('./../inc/menus');
var reservations = require('./../inc/reservations');

router.use((req, res, next) => {

  if(['/login'].indexOf(req.url) === -1 && !req.session.user) {
    res.redirect('/admin/login');
  } else if(['/login'].indexOf(req.url) === 0 && req.session.user) {
    res.redirect('/admin');;
  } else {
    next()
  }

});

router.get('/logout', (req, res, next) => {

  delete req.session.user;

  res.redirect('/admin/login');

});

router.get('/', (req, res, next) => {

  admin.dashboard().then(data => {
    
    res.render('admin/index', admin.getParams(req, {
      title: 'Admin - ' + seo.title, 
      data
    }));

  }).catch(error => {

    console.error(error);

  })


})

router.post('/login', (req, res, next) => {

  if(!req.body.email) {
    users.render(req, res, "Email é obrigatório")
  } else if(!req.body.password) {
    users.render(req, res, "Senha é obrigatório")
  } else {

    users.login(req.body.email, req.body.password).then(user => {

      req.session.user = user;

      res.redirect('/admin');

    }).catch(error => {

      users.render(req, res, error.message || error)

    });

  }

});

router.get('/login', (req, res, next) => {

  users.render(req, res, null);

})

router.get('/contatos', (req, res, next) => {

  res.render('admin/contacts', admin.getParams(req, {title: 'Contatos - ' + seo.title}));

})

router.get('/emails', (req, res, next) => {

  res.render('admin/emails', admin.getParams(req, {title: 'E-mails - ' + seo.title}));

})

router.get('/menus', (req, res, next) => {

  menus.getMenus().then(data => {

    res.render('admin/menus', admin.getParams(req, {
      title: 'Menus - ' + seo.title,
      foods: data
    }));

  }).catch(error => {

    console.error(error);

  });


})

router.post('/menus', (req, res, next) => {

  menus.save(req.fields, req.files).then(results => {

    res.send(results);

  }).catch(error => {
    res.send(error);
  })

});

router.delete('/menus/:id', (req, res, next) => {

  let { id } = req.params;

  menus.delete(id).then(results => {

    res.send(results);

  }).catch(error => {
    res.send(error);
  });

});

router.get('/reservas', (req, res, next) => {

  reservations.getReservations().then(data => {

    res.render('admin/reservations', admin.getParams(req, {
      title: 'Reservas - ' + seo.title,
      reservations: data,
      date: '',
    }));

  }).catch(error => {

    console.error(error);

  });

})

router.post('/reservas', (req, res, next) => {

  reservations.save(req.fields).then(results => {

    res.send(results);

  }).catch(error => {
    res.send(error);
  })

});

router.delete('/reservas/:id', (req, res, next) => {

  let { id } = req.params;

  reservations.delete(id).then(results => {

    res.send(results);

  }).catch(error => {
    res.send(error);
  });

});

router.get('/usuarios', (req, res, next) => {

  res.render('admin/users', admin.getParams(req, {title: 'Usuários - ' + seo.title}));

})

module.exports = router;