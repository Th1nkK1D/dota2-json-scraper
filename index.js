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

function scrapeHeroDotaBlog(heroName) {
    let hero = {}
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
                rightAttribute: {
                    selector: 'div .abilityFooterBoxRight',
                },
                leftAttribute: {
                    selector: 'div .abilityFooterBoxLeft',
                },
                cooldownmana: {
                    listItem: '.cooldownMana > div',
                }
            }
        }
    
    }).then(page => {
        //console.log(page)

        hero = page

        // Clean Up
        hero.skills = hero.skills.map((skill) => {
            skill.rightAttribute = skill.rightAttribute.split("\n")

            let lastChar = ' '

            for(let i = 0; i < skill.leftAttribute.length; i++) {
                
                if(lastChar !== ' ' && skill.leftAttribute[i] !== ' ' && lastChar !== ',' && skill.leftAttribute[i] !== ',' && (lastChar === lastChar.toLowerCase() || parseInt(lastChar,10)) && skill.leftAttribute[i] === skill.leftAttribute[i].toUpperCase()) {
                    skill.leftAttribute = skill.leftAttribute.substr(0,i) + "_" + skill.leftAttribute.substr(i)
                    i++
                }

                lastChar = skill.leftAttribute[i]
            }

            skill.leftAttribute = skill.leftAttribute.split("_")

            skill.attributes = skill.cooldownmana.concat(skill.leftAttribute).concat(skill.rightAttribute)

            delete skill.rightAttribute
            delete skill.leftAttribute
            delete skill.cooldownmana

            console.log(skill.attributes)

            skill.attributes = skill.attributes.map((attr) => {
                attr = {
                    name: attr.substr(0,attr.indexOf(':')),
                    value: attr.substr(attr.indexOf(': ') + 2)
                }
                return attr
            })

            return skill
        })

        console.log(hero)

        jsonfile.writeFile(dotaBlogFile, hero, function (err) {
            if(err) {
                console.error(err)
            }
        })
    })
}

scrapeHeroDotaBlog("Windrunner")