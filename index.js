var Imap = require('imap'),
    inspect = require('util').inspect;
		
var config = require('./config.json')

var imap = new Imap(config);
 

function openInbox(cb) {
  imap.openBox('INBOX', true, cb);
}

imap.once('ready', function() {
  openInbox(function(err, box) {
    if (err) throw err;
		// var f = imap.seq.fetch(box.messages.total + ':*', { bodies: ['HEADER.FIELDS (FROM)','TEXT'] });
    var f = imap.seq.fetch('163:1740', {
      bodies: 'HEADER.FIELDS (FROM)',
      struct: true
    });
		
		var folder =  box.messages
	  console.log("收件箱中共" + folder.total + "封邮件!");
		console.log("收件箱中共" + folder.new + "封未读邮件!");
		console.log("收件箱中共" + folder.unseen + "封新邮件!");
		// console.log("收件箱中共" + folder.getDeletedMessageCount() + "封已删除邮件!");

		// f = imap.seq.fetch(box.messages.total + ':*', { bodies: ['HEADER.FIELDS (FROM)','TEXT'] });
		
		// return;
    f.on('message', function(msg, seqno) {
      console.log('Message #%d', seqno);
      var prefix = '(#' + seqno + ') ';
      msg.on('body', function(stream, info) {
        var buffer = '';
        stream.on('data', function(chunk) {
          buffer += chunk.toString('utf8');
        });
        stream.once('end', function() {
          console.log(prefix + 'Parsed header: %s', inspect(Imap.parseHeader(buffer)));
        });
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

imap.once('error', function(err) {
  console.log(err);
});

imap.once('end', function() {
  console.log('Connection ended');
});

imap.connect();