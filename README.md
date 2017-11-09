# dota2-json-scraper
Scrape Dota 2 Database into JSON

## Features
Fetch all Dota 2 Heroes
- Basic stat
- Skills
- Talent

## How to use
```
node index.js 
```
json will be generated in `json_output` directory

## Example Output
``` json
"anti-mage": {
    "name": "Anti-Mage",
    "avatar": "https://api.opendota.com//apps/dota2/images/heroes/antimage_full.png?",
    "attribute": "agi",
    "roles": [
      "Carry",
      "Escape",
      "Nuker"
    ],
    "lore": "The monks of Turstarkuri watched the rugged valleys below their mountain monastery as wave after wave of invaders swept through the lower kingdoms. Ascetic and pragmatic, in their remote monastic eyrie they remained aloof from mundane strife, wrapped in meditation that knew no gods or elements of magic. Then came the Legion of the Dead God, crusaders with a sinister mandate to replace all local worship with their Unliving Lord's poisonous nihilosophy. From a landscape that had known nothing but blood and battle for a thousand years, they tore the souls and bones of countless fallen legions and pitched them against Turstarkuri. The monastery stood scarcely a fortnight against the assault, and the few monks who bothered to surface from their meditations believed the invaders were but demonic visions sent to distract them from meditation. They died where they sat on their silken cushions. Only one youth survived--a pilgrim who had come as an acolyte, seeking wisdom, but had yet to be admitted to the monastery. He watched in horror as the monks to whom he had served tea and nettles were first slaughtered, then raised to join the ranks of the Dead God's priesthood. With nothing but a few of Turstarkuri's prized dogmatic scrolls, he crept away to the comparative safety of other lands, swearing to obliterate not only the Dead God's magic users--but to put an end to magic altogether.",
    "strBase": 22,
    "agiBase": 22,
    "intBase": 15,
    "strGain": 1.5,
    "agiGain": 2.8,
    "intGain": 1.8,
    "hp": 200,
    "mana": 75,
    "hpRegen": 1.5,
    "manaRegen": 0.9,
    "damageMin": 27,
    "damageMax": 31,
    "armor": -1,
    "magicResistance": 25,
    "moveSpeed": 310,
    "attackRange": 150,
    "attackSpeed": 1.45,
    "skills": [
      {
        "name": "Mana Break",
        "icon": "http://cdn.dota2.com/apps/dota2/images/abilities/antimage_mana_break_hp2.png?v=4223247",
        "attibutes": [
          {
            "name": "ABILITY",
            "value": "Passive"
          },
          {
            "name": "DAMAGE TYPE",
            "value": "Physical"
          },
          {
            "name": "PIERCES SPELL IMMUNITY",
            "value": "No"
          },
          {
            "name": "MANA BURNED PER HIT",
            "value": "28 / 40 / 52 / 64"
          }
        ]
      },
      {
        "name": "Blink",
        "icon": "http://cdn.dota2.com/apps/dota2/images/abilities/antimage_blink_hp2.png?v=4223247",
        "attibutes": [
          {
            "name": "MANA COST",
            "value": "60"
          },
          {
            "name": "COOLDOWN",
            "value": "12/9/7/5"
          },
          {
            "name": "ABILITY",
            "value": "Point Target"
          }
        ]
      },
      {
        "name": "Spell Shield",
        "icon": "http://cdn.dota2.com/apps/dota2/images/abilities/antimage_spell_shield_hp2.png?v=4223247",
        "attibutes": [
          {
            "name": "ABILITY",
            "value": "Passive"
          }
        ]
      },
      {
        "name": "Mana Void",
        "icon": "http://cdn.dota2.com/apps/dota2/images/abilities/antimage_mana_void_hp2.png?v=4223247",
        "attibutes": [
          {
            "name": "MANA COST",
            "value": "125/200/275"
          },
          {
            "name": "COOLDOWN",
            "value": "70"
          },
          {
            "name": "ABILITY",
            "value": "Unit Target"
          },
          {
            "name": "AFFECTS",
            "value": "Enemy Units"
          },
          {
            "name": "DAMAGE TYPE",
            "value": "Magical"
          },
          {
            "name": "PIERCES SPELL IMMUNITY",
            "value": "Yes"
          },
          {
            "name": "DAMAGE",
            "value": "0.6 / 0.85 / 1.1"
          },
          {
            "name": "STUN DURATION",
            "value": "0.3"
          },
          {
            "name": "RADIUS",
            "value": "500"
          }
        ]
      }
    ],
    "talents": [
      [
        "+20 Attack Speed",
        "+175 Health"
      ],
      [
        "Blink Uncontrollable Illusion",
        "-1s Blink Cooldown"
      ],
      [
        "+300 Blink Cast Range",
        "+10 All Stats"
      ],
      [
        "-50s Mana Void Cooldown",
        "+30% Spell Shield"
      ]
    ]
  },
```

## Resources
- [OpenDota API](https://docs.opendota.com)
- [Dota 2 Official Blog - Heropedia](http://www.dota2.com/hero)
- [List of all talents - Liquidpedia](http://wiki.teamliquid.net/dota2/List_of_all_talents)