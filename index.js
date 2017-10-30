const scrapeIt = require("scrape-it")
const jsonfile = require('jsonfile')
const getJSON = require('get-json')

var heroFile = './json_output/heroes.json'
var dotaBlogFile = './json_output/dotaBlog.json'

var heroes = {}
var dotaBlog = {}

// Get Heroes List from OpenDota
function fetchOpenDota() { 
    getJSON('https://api.opendota.com/api/heroStats', function(error, response){
    
        if(error) {
            console.log(error)
        } else {
            console.log("Gotcha")
    
            heroes = response.map(function(hero) {
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
}

function scrapeDotaBlog(heroName) {
    let url = 'http://www.dota2.com/hero/'+heroName.replace(' ','_').toLowerCase();

    scrapeIt(url, {
        name: 'h1',
        lore: '#bioInner',
        skills: {
            listItem: '.abilitiesInsetBoxInner'
          , data: {    
                name: {
                    selector: '.abilityHeaderRowDescription > h2'
                },
                icon: {
                    selector: '.abilityIconHolder2 > img',
                    attr: 'src'
                },
                leftAttribute: {
                    selector: '.abilityFooterBoxLeft',
                    convert: attr => attr.split("\n")
                },
                leftAttribute: {
                    selector: '.abilityFooterBoxRight',
                    convert: attr => attr.split("\n")
                },
                cooldownmana: {
                    listItem: '.cooldownMana > div',
                }
            }
        }
    
    }).then(page => {
        console.log(page)

        dotaBlog = page

        jsonfile.writeFile(dotaBlogFile, dotaBlog, function (err) {
            if(err) {
                console.error(err)
            }
        })
    })
}

scrapeDotaBlog("Phoenix")