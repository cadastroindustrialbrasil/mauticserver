const Sequelize = require('sequelize');
const fs = require('fs');
const { QueryTypes } = require('sequelize');
const moment = require('moment');
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

const sequelize = new Sequelize('mautic_cadbr', 'mautic_cadbr', 'Webmaster1231*', {
    host: 'mysql246.umbler.com',
    dialect: "mysql",
    port: 41890,
    define: {
        freezeTableName: true,
        timestamps: false,
    },
    logging: false
});


main()

function main() {

    async function app() {

        try {

            var x = 0
            id = 0

            while(x < 100){
                

                const getLeads = await sequelize.query("SELECT id, position, state FROM `leads` WHERE id > "+id+" LIMIT 1000", {
                type: QueryTypes.SELECT
            });

            getLeads.forEach(async function (lead) {

                id = lead.id

                var tag = await sequelize.query("SELECT * FROM `lead_tags` WHERE tag='" + lead.position + "'", {
                    type: QueryTypes.SELECT
                });

                await sequelize.query("INSERT INTO `lead_tags_xref` (lead_id, tag_id) VALUES ('" + lead.id +"','" + tag[0].id +"')")

                 tag = await sequelize.query("SELECT * FROM `lead_tags` WHERE tag='" + lead.state + "'", {
                    type: QueryTypes.SELECT
                });

                await sequelize.query("INSERT INTO `lead_tags_xref` (lead_id, tag_id) VALUES ('" + lead.id +"','" + tag[0].id +"')")
                await sequelize.query("INSERT INTO `lead_tags_xref` (lead_id, tag_id) VALUES ('" + lead.id +"','113')")

               tag = []

               return id

            });
            x++
            var total = await sequelize.query("SELECT * FROM `lead_tags_xref`", {
                type: QueryTypes.SELECT
            });
            console.log("Esperando 40s - "+id)
            await delay(36000)
            console.log("Total: " + total.length)
            await delay(6000)

        
        }
        }
        catch (err) {
        }

        
    }

    app()
}