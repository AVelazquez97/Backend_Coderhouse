import path from 'path';

const logoutController = {
  postLogout: (req, res) => {
    const email = req.user.email;

    req.logout((err) => {
      if (err) {
        return console.info(err.message);
      }
      req.session.destroy((err) => {
        if (!err) {
          res.render(
            path.join(process.cwd(), '/src/views/layouts/logout.hbs'),
            {
              email,
            }
          );
        } else {
          res.redirect('/');
        }
      });
    });
  },
};

export default logoutController;
