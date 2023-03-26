const Sequelize = require('sequelize');
const fs = require('fs');
const { QueryTypes } = require('sequelize');
const moment = require('moment');
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))


const sequelize = new Sequelize('eduard72_consultagoogle', 'eduard72_felipe', 'oQnD~rzZWG&9', {
    host: 'sh-pro20.hostgator.com.br',
    dialect: "mysql",
    define: {
        freezeTableName: true,
        timestamps: false,
    },
    logging: false
});

const sequelize2 = new Sequelize('mautic_cadbr', 'mautic_cadbr', 'Webmaster1231*', {
    host: 'mysql246.umbler.com',
    dialect: "mysql",
    port: 41890,
    define: {
        freezeTableName: true,
        timestamps: false,
    },
    dialectOptions: {
        options: {
          requestTimeout: 3000000
        }
      },
     
    logging: false
});



const dataHoraAtual = moment().format('YYYY-MM-DD HH:mm:ss');

var id = 0 

main()

function main(){

async function app() {   
    
   try{ 
    
    const getEmails = await sequelize.query("SELECT * FROM `emails` WHERE status=1 && id > 1274202", {
    type: QueryTypes.SELECT
    });

    getEmails.forEach(async function (email) {

    var name = email.email
    name = name.split("@")
    name = name[0]
    await sequelize2.query("INSERT INTO `leads`(`is_published`,`created_by_user`, `firstname`,`email`,`state`,`internal`,`social_cache`,`date_identified`,`date_added`,`date_modified`,`position`) VALUES (1,'Cadastro Industrial Brasil','" + name + "','" + email.email + "','" + email.estado + "','a:0:{}','a:0:{}','" + dataHoraAtual + "','" + dataHoraAtual + "','" + dataHoraAtual + "','" + email.categoria + "')")
    console.log(email.id)

    id = email.id
    return id

});}
   catch(err){
    app()
    console.log(err);
   }


}

app()
}