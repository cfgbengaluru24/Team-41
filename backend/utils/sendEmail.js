const nodemailer=require('nodemailer');
const nodemailerConfig=require('./nodemailerConfig');

const sendEmail = async({to,html,subject})=>{
    const transporter=nodemailer.createTransport(nodemailerConfig);
    
    return transporter.sendMail({
        from:'"cfg-team41" <aspire&glee@example.com>',
        to,subject,html
    });
}

module.exports=sendEmail;