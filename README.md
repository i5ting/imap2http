# imap2http


## api

- 获取最近20条邮件 get_mail_latest
- get_mail_with_last_id(分页pagecount = 20)
- 获取邮箱概况，登陆后（多少封邮件，多少未读）
	- 收件箱中共" + messages.length + "封邮件!"
	- 收件箱中共" + folder.getUnreadMessageCount() + "封未读邮件!"
	- 收件箱中共" + folder.getNewMessageCount() + "封新邮件!"
	- 收件箱中共" + folder.getDeletedMessageCount() + "封已删除邮件!"
- 获取未读邮件

## Usage

send mail 

	npm run send
	
get mail 

	npm run get

send && get mail

	npm run gs

get unseen mail

	npm run unseen

send && get unseen mail

	npm run unseen2

## Resources

- https://github.com/andris9/Nodemailer
- https://github.com/mscdex/node-imap
- https://github.com/chirag04/mail-listener2
- https://github.com/hiddentao/browsermail
- https://github.com/tualo/tualo-imap

http://mobile.emoze.com/android/Emoze-Android-User-Guide.pdf