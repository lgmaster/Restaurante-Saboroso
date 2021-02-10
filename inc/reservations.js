let conn = require('./db');

module.exports = {

  render(req, res, titleSite, error = null, success = null) {

    res.render('reservation', { 
      title: `Reserva - ${titleSite}`,
      background: 'images/img_bg_2.jpg',
      h1: 'Reserve uma Mesa!',
      body: req.body,
      error,
      success
    });

  },

  getReservations() {

    return new Promise((resolve, reject) => {

      conn.query(
        'SELECT * FROM tb_reservations ORDER BY date',
        (error, reservations) => {

          if (error) {

            reject(error);

          }

          resolve(reservations);

        }
      )

    });

  },

  save(fields) {

    return new Promise((resolve, reject) => {

      if(fields.date.indexOf('/') > -1) {

        let date = fields.date.split('/');

        fields.date = `${date[2]}-${date[1]}-${date[0]}`;

      }      

      let query, params = [fields.name, fields.email, fields.people, fields.date, fields.time];

      if(parseInt(fields.id) > 0) {

        params.push(fields.id);

        query = `UPDATE tb_reservations SET name = ?, email = ?, people = ?, date = ?, time = ? WHERE id = ?`

      } else {

        query = 'INSERT INTO tb_reservations (name, email, people, date, time) VALUES (?, ?, ?, ?, ?)'

      }

      conn.query(query, params, (error, results)=>{
  
          if(error) {
          
            reject(error);
          
          } else {

            resolve(results);
          
          }
  
        }
      );

    });

  },

  delete(id) {

    return new Promise((resolve, reject) => {

      conn.query(
        'DELETE FROM tb_reservations WHERE id = ?',
        [
          id
        ],
        (error, results) => {

          if(error) {
            reject(error)
          } else {
            resolve(results)
          }

        }
      )

    });

  }

};