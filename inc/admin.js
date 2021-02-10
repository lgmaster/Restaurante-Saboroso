var conn = require('./db');

module.exports = {

  dashboard() {

    return new Promise((resolve, reject) => {

      conn.query(
        `SELECT
          (SELECT COUNT(*) FROM tb_contacts) AS nrcontacts,
          (SELECT COUNT(*) FROM tb_menus) AS nrmenus,
          (SELECT COUNT(*) FROM tb_reservations) AS nrreservations,
          (SELECT COUNT(*) FROM tb_users) AS nrusers;`,
          (error, results) => {

            if(error) {

              reject(error)

            } else {

              resolve(results[0])

            }

          }
      )

    });

  },

  getParams(req, params) {

    return Object.assign({}, {
      menus: this.getMenus(req),
      user: req.session.user
    }, params);

  },
  getMenus(req) {

    let menus = [
      {
        text: 'Tela Inicial',
        href: '/admin/',
        icon: 'home',
        active: false
      },
      {
        text: 'Menu',
        href: '/admin/menus',
        icon: 'cutlery',
        active: false
      },
      {
        text: 'Reservas',
        href: '/admin/reservas',
        icon: 'calendar-check-o',
        active: false
      },
      {
        text: 'Contatos',
        href: '/admin/contatos',
        icon: 'comments',
        active: false
      },
      {
        text: 'Usuários',
        href: '/admin/usuarios',
        icon: 'users',
        active: false
      },
      {
        text: 'E-mails',
        href: '/admin/emails',
        icon: 'envelope',
        active: false
      }
    ]

    menus.map(menu => {

      let urlBody = '/admin' + req.url

      if(menu.href === urlBody) menu.active = true

    });

    return menus;

  }

}