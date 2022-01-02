exports.getOverview = (req, res) => {
  res.status(200).render('overview', {
    title: 'Все туры',
  });
};

exports.getTour = (req, res) => {
  res.status(200).render('tour', {
    title: 'Лесное путешествие',
  });
};

exports.base = (req, res) => {
  res.status(200).render('base', {
    tour: 'Лесное исследование',
    user: 'Vladislav',
  });
};
