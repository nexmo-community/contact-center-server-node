exports.api_get = (req, res) => {
  const appUrl = `${req.protocol}://${req.get('host')}`;
  const jwtUrl = `${appUrl}/api/jwt`;

  res.render('api', {
    title: 'SDK Integration',
    key: process.env.MOBILE_API_KEY,
    jwtUrl: jwtUrl
  });
}