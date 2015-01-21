var Imap = require('imap'),
    inspect = require('util').inspect;
		
var config = require('../config.json')

var imap = new Imap(config);
var fs = require('fs'), fileStream;

function openInbox(cb) {
  imap.openBox('INBOX', true, cb);
}

imap.once('ready', function() {
	openInbox(function(err, box) {
	  if (err) throw err;
			imap.search([ 'UNSEEN', ['SINCE', 'May 20, 2014'] ], function(err, results) {
	    if (err) throw err;
			console.log("收件箱中共" + results.length + "封未读邮件!");
	    var f = imap.fetch(results, { bodies: '' });
	    f.on('message', function(msg, seqno) {
	      console.log('Message #%d', seqno);
	      var prefix = '(#' + seqno + ') ';
	      msg.on('body', function(stream, info) {
	        console.log(prefix + 'Body');
	        stream.pipe(fs.createWriteStream('msg-' + seqno + '-body.txt'));
	      });
	      msg.once('attributes', function(attrs) {
	        console.log(prefix + 'Attributes: %s', inspect(attrs, false, 8));
	      });
	      msg.once('end', function() {
	        console.log(prefix + 'Finished');
	      });
	    });
	    f.once('error', function(err) {
	      console.log('Fetch error: ' + err);
	    });
	    f.once('end', function() {
	      console.log('Done fetching all messages!');
	      imap.end();
	    });
	  });
	});
});

imap.once('error', function(err) {
  console.log(err);
});

imap.once('end', function() {
  console.log('Connection ended');
});

imap.connect();