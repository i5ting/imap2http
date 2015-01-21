var nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');

var config_send = require("./config.send.json")
// 开启一个 SMTP 连接池
// var smtpTransport = nodemailer.createTransport(config_send);
var smtpTransport = nodemailer.createTransport(smtpTransport(config_send));

// 设置邮件内容
var mailOptions = {
  from: "桑世龙 <shiren1118@126.com>", // 发件地址
  to: "sangshilong@nationsky.com", // 收件列表
  subject: "Hello world", // 标题
  html: "<b>thanks a for visiting!</b> 世界，你好！" // html 内容
}

var inspect = require('util').inspect;

// 发送邮件
smtpTransport.sendMail(mailOptions, function(error, response){
  if(error){
    console.log(error);
  }else{
		// console.dir(response)
		// console.log(inspect(response))
    console.log("Message sent: " + response.response);
  }
  smtpTransport.close(); // 如果没用，关闭连接池
});