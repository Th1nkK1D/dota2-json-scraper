const scrapeIt = require("scrape-it")
const jsonfile = require('jsonfile')
const getJSON = require('get-json')

var heroFile = './json_output/heroes.json'

// Get Heroes List from OpenDota
getJSON('https://api.opendota.com/api/heroStats', function(error, response){

    if(error) {
        console.log(error)
    } else {
        console.log("Gotcha")

        let heroes = response.map(function(hero) {
            return {
                'name': hero.localized_name,
                'avatar': 'https://api.opendota.com' + hero.img,
                'attribute': hero.primary_attr,
                'roles': hero.roles,
                'lore': '',
                'strBase': hero.base_str,
                'agiBase': hero.base_agi,
                'intBase': hero.base_int,
                'strGain': hero.str_gain,
                'agiGain': hero.agi_gain,
                'intGain': hero.int_gain,
                'hp': hero.base_health,
                'mana': hero.base_mana,
                'hpRegen': hero.base_health_regen,
                'manaRegen': hero.base_mana_regen,
                'damage': (hero.base_attack_min + hero.base_attack_max) / 2,
                'armor': hero.base_armor,
                'magicResistance': hero.base_mr,
                'moveSpeed': hero.move_speed,
                'attackRange': hero.attack_range,
                'attackSpeed': hero.attack_rate,
                'skills': [],
                'talents': []
            }
        })

        //console.log(heroes);

        jsonfile.writeFile(heroFile, heroes, function (err) {
            if(err) {
                console.error(err)
            }
        })
    }
})