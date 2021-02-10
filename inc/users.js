var conn = require('./db');
var seo = require('./seo');

module.exports = {

  render(req, res, error) {

    res.render('admin/login', {
      title: 'Login - ' + seo.title,
      body: req.body,
      error
    });

  },

  login(email, password) {

    return new Promise((resolve, reject) => {
      
      conn.query(
        'SELECT * FROM tb_users WHERE email = ?',
        [ email ],
        (error, results) => {


          if(error) {
            reject(error)
          } else {
            
            if(!results.length > 0) {

              reject('Usuário ou senha incorretos')

            } else {
              
              let user = results[0];

              if(user.password !== password) {

                reject('Usuário ou senha incorretos')

              } else {

                resolve(user);

              }

            }


          }
        
        }
      );

    });

  }

}