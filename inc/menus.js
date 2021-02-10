let conn = require('./db');
let path = require('path');

module.exports = {

  getMenus() {

    return new Promise((resolve, reject) => {

      conn.query(
        'SELECT * FROM tb_menus ORDER BY title',
        (error, foods) => {

          if (error) {

            reject(error);

          }

          resolve(foods);

        }
      )

    });

  },

  save(fields, files) {

    return new Promise((resolve, reject) => {

      fields.photo = `images/${path.parse(files.photo.path).base}`;

      let query, queryPhoto = '', params = [
        fields.title,
        fields.description,
        fields.price,       
      ];

      if(files.photo.name) {

        queryPhoto = ',photo = ?'

        params.push(fields.photo)

      }

      if(parseInt(fields.id) > 0) {

        
        params.push(parseInt(fields.id))

        console.log(params)

        query = `UPDATE tb_menus SET title = ?, description = ?, price = ? ${queryPhoto} WHERE id = ?`;

      } else {

        if(!files.photo) {

          reject('Envie a foto do prato')
  
        }

        query = 'INSERT INTO tb_menus (title, description, price, photo) VALUES (?, ?, ?, ?)';

      }

      conn.query(query, params, (error, results) => {

          if(error) {
            reject(error)
          } else {
            resolve(results)
          }

        }
      )

    })

  },

  delete(id) {

    return new Promise((resolve, reject) => {

      conn.query(
        'DELETE FROM tb_menus WHERE id = ?',
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

}