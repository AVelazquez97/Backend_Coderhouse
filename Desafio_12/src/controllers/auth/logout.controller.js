import path from 'path';

const logoutController = {
<<<<<<< HEAD
  postLogout: (req, res) => {
    const email = req.user.email;

=======
  getLogout: (req, res) => {
    const email = req.user.email;
>>>>>>> 17010ff2cf077b8d6fc60c63c333bb34b7bb398b
    req.logout((err) => {
      if (err) {
        return console.info(err.message);
      }
<<<<<<< HEAD
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
=======
    });

    res.render(path.join(process.cwd(), '/src/views/layouts/logout.hbs'), {
      email,
>>>>>>> 17010ff2cf077b8d6fc60c63c333bb34b7bb398b
    });
  },
};

export default logoutController;
