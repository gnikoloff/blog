
/**
 * Module dependencies.
 */var prismic = require('prismic-nodejs');
var compression = require('compression');
var app = require('./config');
var configuration = require('./prismic-configuration');
var PORT = app.get('port');

// Returns a Promise
function api(req, res) {
  // So we can use this information in the views
  res.locals.ctx = {
    endpoint: configuration.apiEndpoint,
    linkResolver: configuration.linkResolver
  };
  return prismic.api(configuration.apiEndpoint, {
    accessToken: configuration.accessToken,
    req: req
  });
}

function handleError(err, req, res) {
  if (err.status == 404) {
    res.status(404).send("404 not found");
  } else {
    res.status(500).send("Error 500: " + err.message);
  }
}

app.use(compression());
app.listen(PORT, function() {
  console.log('Express server listening on port ' + PORT);
});

app.route('/').get(function(req, res){
  api(req, res).then(function(api) {
    return api.query(prismic.Predicates.at('document.type', 'blogarticle'));
  }).then(function(postsContent) {
    res.render('index', {
      articles: postsContent.results
    });
  });
});

app.route('/about').get(function(req, res){
  api(req, res).then(function(api) {
    return api.query(prismic.Predicates.at('document.type', 'about'));
  }).then(function(postsContent) {
    res.render('about', {
      article: postsContent.results[0]
    });
  });
});

app.route('/articles/:uid').get(function(req, res){
  api(req, res).then(function(api) {
    return api.getByUID('blogarticle', req.params.uid);
  }).then(function(postContent) {
    res.render('article', {
      postContent: postContent
    });
  });
});
