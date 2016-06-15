var iopipe = require("iopipe")()
var elasticsearch = require("elasticsearch")

const ESHOST = "192.241.174.50:9200"

function elasticsearch_create(client, params) {
  return function (event, context) {
    params["body"] = event
    client.create(params, context)
  }
}

exports.handle = function(event, context) {
  var esclient = new elasticsearch.Client({
    host: ESHOST,
    log: 'trace'
  })
  elasticsearch_create(esclient, {
            index: 'myindex',
            type: 'mytype',
          })(event, context.succeed)
}

exports.handle("hello", iopipe.make_context(function() {}))
