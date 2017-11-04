const scrapeIt = require("scrape-it")
const jsonfile = require('jsonfile')
const getJSON = require('get-json')

var heroFile = './json_output/heroes.json'

var heroes = {}
var counter = 0;
var heroesNumber = 0;


function getHeroes() {
    console.log("fetching Heroes List...")

    getJSON('https://api.opendota.com/api/heroStats', function(error, response){
        if(error) {
            console.log(error)
        } else {    
            response.forEach(function(hero) {                
                 heroes[hero.localized_name] = {
                    'name': hero.localized_name,
                    'link': 'http://www.dota2.com/hero/' + hero.name.substr("npc_dota_hero_".length),
                    'avatar': 'https://api.opendota.com/' + hero.img,
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
                    'talents': [[null,null],[null,null],[null,null],[null,null]]
                }

                heroesNumber++
            })
    
            console.log("fetching each hero info...")

            Object.keys(heroes).forEach((heroName) => {
                scrapeHero(heroes[heroName])
            })
        }
    })
}

function scrapeHero(heroObj) {
    let hero = heroObj

    scrapeIt(hero.link, {
        lore: '#bioInner',
        skills: {
            listItem: '.abilitiesInsetBoxInner'
          , data: {    
                name: {
                    selector: '.abilityHeaderRowDescription > h2'
                },
                icon: {
                    selector: '.abilityIconHolder2 > img',
                    attr: 'src',
                    conv: url => url.substr(0,attr.indexOf('?')),
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
    
    }).then(res => {
        // Clean Up
        heroes[hero.name].skills = res.skills.map((skill) => {
            // Clean right attributes
            skill.rightAttribute = skill.rightAttribute.split("\n")

            // Clean left attribute
            let lastChar = ' '

            for(let i = 0; i < skill.leftAttribute.length; i++) {
                
                if(lastChar !== ' ' && skill.leftAttribute[i] !== ' ' && lastChar !== ',' && skill.leftAttribute[i] !== ',' && (lastChar === lastChar.toLowerCase() || parseInt(lastChar,10)) && skill.leftAttribute[i] === skill.leftAttribute[i].toUpperCase()) {
                    skill.leftAttribute = skill.leftAttribute.substr(0,i) + "_" + skill.leftAttribute.substr(i)
                    i++
                }

                lastChar = skill.leftAttribute[i]
            }

            skill.leftAttribute = skill.leftAttribute.split("_")

            // Merge attribute
            let attributes = skill.cooldownmana.concat(skill.leftAttribute).concat(skill.rightAttribute)

            // Delete old attribute
            delete skill.rightAttribute
            delete skill.leftAttribute
            delete skill.cooldownmana

            skill.attibutes = []

            // Extract attribute
            attributes.forEach((attr) => {
                attr = {
                    name: attr.substr(0,attr.indexOf(':')).toUpperCase(),
                    value: attr.substr(attr.indexOf(': ') + 2)
                }
                if(attr.name.length > 0 && attr.value.length > 0){
                    skill.attibutes.push(attr)
                }
                
            })

            return skill
        })

        heroes[hero.name].lore = res.lore

        delete  heroes[hero.name].link

        counter++
        
        console.log(hero.name + ' ('+counter+'/'+heroesNumber+')')

        if(counter === heroesNumber) {
            console.log("writing file...")

            // Write JSON
            jsonfile.writeFile(heroFile, heroes,{spaces: 2}, function (err) {
                if(err) {
                    console.error(err)
                } else {
                    console.log("completed!")
                }
            })
        }
    })
}

getHeroes()