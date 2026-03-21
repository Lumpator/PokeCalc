// PokeCalc - Pokemon Data (Gen 1-4, #1-493)
// Format: POKEMON_NAMES[id] = "DisplayName"
// File: {id}_{filesuffix}.png

const POKEMON_NAMES = [
    null, // 0 - unused
    // === GEN 1 (1-151) ===
    "Bulbasaur",
    "Ivysaur",
    "Venusaur",
    "Charmander",
    "Charmeleon",
    "Charizard",
    "Squirtle",
    "Wartortle",
    "Blastoise",
    "Caterpie",
    "Metapod",
    "Butterfree",
    "Weedle",
    "Kakuna",
    "Beedrill",
    "Pidgey",
    "Pidgeotto",
    "Pidgeot",
    "Rattata",
    "Raticate",
    "Spearow",
    "Fearow",
    "Ekans",
    "Arbok",
    "Pikachu",
    "Raichu",
    "Sandshrew",
    "Sandslash",
    "Nidoran♀",
    "Nidorina",
    "Nidoqueen",
    "Nidoran♂",
    "Nidorino",
    "Nidoking",
    "Clefairy",
    "Clefable",
    "Vulpix",
    "Ninetales",
    "Jigglypuff",
    "Wigglytuff",
    "Zubat",
    "Golbat",
    "Oddish",
    "Gloom",
    "Vileplume",
    "Paras",
    "Parasect",
    "Venonat",
    "Venomoth",
    "Diglett",
    "Dugtrio",
    "Meowth",
    "Persian",
    "Psyduck",
    "Golduck",
    "Mankey",
    "Primeape",
    "Growlithe",
    "Arcanine",
    "Poliwag",
    "Poliwhirl",
    "Poliwrath",
    "Abra",
    "Kadabra",
    "Alakazam",
    "Machop",
    "Machoke",
    "Machamp",
    "Bellsprout",
    "Weepinbell",
    "Victreebel",
    "Tentacool",
    "Tentacruel",
    "Geodude",
    "Graveler",
    "Golem",
    "Ponyta",
    "Rapidash",
    "Slowpoke",
    "Slowbro",
    "Magnemite",
    "Magneton",
    "Farfetch'd",
    "Doduo",
    "Dodrio",
    "Seel",
    "Dewgong",
    "Grimer",
    "Muk",
    "Shellder",
    "Cloyster",
    "Gastly",
    "Haunter",
    "Gengar",
    "Onix",
    "Drowzee",
    "Hypno",
    "Krabby",
    "Kingler",
    "Voltorb",
    "Electrode",
    "Exeggcute",
    "Exeggutor",
    "Cubone",
    "Marowak",
    "Hitmonlee",
    "Hitmonchan",
    "Lickitung",
    "Koffing",
    "Weezing",
    "Rhyhorn",
    "Rhydon",
    "Chansey",
    "Tangela",
    "Kangaskhan",
    "Horsea",
    "Seadra",
    "Goldeen",
    "Seaking",
    "Staryu",
    "Starmie",
    "Mr. Mime",
    "Scyther",
    "Jynx",
    "Electabuzz",
    "Magmar",
    "Pinsir",
    "Tauros",
    "Magikarp",
    "Gyarados",
    "Lapras",
    "Ditto",
    "Eevee",
    "Vaporeon",
    "Jolteon",
    "Flareon",
    "Porygon",
    "Omanyte",
    "Omastar",
    "Kabuto",
    "Kabutops",
    "Aerodactyl",
    "Snorlax",
    "Articuno",
    "Zapdos",
    "Moltres",
    "Dratini",
    "Dragonair",
    "Dragonite",
    "Mewtwo",
    "Mew",
    // === GEN 2 (152-251) ===
    "Chikorita",
    "Bayleef",
    "Meganium",
    "Cyndaquil",
    "Quilava",
    "Typhlosion",
    "Totodile",
    "Croconaw",
    "Feraligatr",
    "Sentret",
    "Furret",
    "Hoothoot",
    "Noctowl",
    "Ledyba",
    "Ledian",
    "Spinarak",
    "Ariados",
    "Crobat",
    "Chinchou",
    "Lanturn",
    "Pichu",
    "Cleffa",
    "Igglybuff",
    "Togepi",
    "Togetic",
    "Natu",
    "Xatu",
    "Mareep",
    "Flaaffy",
    "Ampharos",
    "Bellossom",
    "Marill",
    "Azumarill",
    "Sudowoodo",
    "Politoed",
    "Hoppip",
    "Skiploom",
    "Jumpluff",
    "Aipom",
    "Sunkern",
    "Sunflora",
    "Yanma",
    "Wooper",
    "Quagsire",
    "Espeon",
    "Umbreon",
    "Murkrow",
    "Slowking",
    "Misdreavus",
    "Unown",
    "Wobbuffet",
    "Girafarig",
    "Pineco",
    "Forretress",
    "Dunsparce",
    "Gligar",
    "Steelix",
    "Snubbull",
    "Granbull",
    "Qwilfish",
    "Scizor",
    "Shuckle",
    "Heracross",
    "Sneasel",
    "Teddiursa",
    "Ursaring",
    "Slugma",
    "Magcargo",
    "Swinub",
    "Piloswine",
    "Corsola",
    "Remoraid",
    "Octillery",
    "Delibird",
    "Mantine",
    "Skarmory",
    "Houndour",
    "Houndoom",
    "Kingdra",
    "Phanpy",
    "Donphan",
    "Porygon2",
    "Stantler",
    "Smeargle",
    "Tyrogue",
    "Hitmontop",
    "Smoochum",
    "Elekid",
    "Magby",
    "Miltank",
    "Blissey",
    "Raikou",
    "Entei",
    "Suicune",
    "Larvitar",
    "Pupitar",
    "Tyranitar",
    "Lugia",
    "Ho-Oh",
    "Celebi",
    // === GEN 3 (252-386) ===
    "Treecko",
    "Grovyle",
    "Sceptile",
    "Torchic",
    "Combusken",
    "Blaziken",
    "Mudkip",
    "Marshtomp",
    "Swampert",
    "Poochyena",
    "Mightyena",
    "Zigzagoon",
    "Linoone",
    "Wurmple",
    "Silcoon",
    "Beautifly",
    "Cascoon",
    "Dustox",
    "Lotad",
    "Lombre",
    "Ludicolo",
    "Seedot",
    "Nuzleaf",
    "Shiftry",
    "Taillow",
    "Swellow",
    "Wingull",
    "Pelipper",
    "Ralts",
    "Kirlia",
    "Gardevoir",
    "Surskit",
    "Masquerain",
    "Shroomish",
    "Breloom",
    "Slakoth",
    "Vigoroth",
    "Slaking",
    "Nincada",
    "Ninjask",
    "Shedinja",
    "Whismur",
    "Loudred",
    "Exploud",
    "Makuhita",
    "Hariyama",
    "Azurill",
    "Nosepass",
    "Skitty",
    "Delcatty",
    "Sableye",
    "Mawile",
    "Aron",
    "Lairon",
    "Aggron",
    "Meditite",
    "Medicham",
    "Electrike",
    "Manectric",
    "Plusle",
    "Minun",
    "Volbeat",
    "Illumise",
    "Roselia",
    "Gulpin",
    "Swalot",
    "Carvanha",
    "Sharpedo",
    "Wailmer",
    "Wailord",
    "Numel",
    "Camerupt",
    "Torkoal",
    "Spoink",
    "Grumpig",
    "Spinda",
    "Trapinch",
    "Vibrava",
    "Flygon",
    "Cacnea",
    "Cacturne",
    "Swablu",
    "Altaria",
    "Zangoose",
    "Seviper",
    "Lunatone",
    "Solrock",
    "Barboach",
    "Whiscash",
    "Corphish",
    "Crawdaunt",
    "Baltoy",
    "Claydol",
    "Lileep",
    "Cradily",
    "Anorith",
    "Armaldo",
    "Feebas",
    "Milotic",
    "Castform",
    "Kecleon",
    "Shuppet",
    "Banette",
    "Duskull",
    "Dusclops",
    "Tropius",
    "Chimecho",
    "Absol",
    "Wynaut",
    "Snorunt",
    "Glalie",
    "Spheal",
    "Sealeo",
    "Walrein",
    "Clamperl",
    "Huntail",
    "Gorebyss",
    "Relicanth",
    "Luvdisc",
    "Bagon",
    "Shelgon",
    "Salamence",
    "Beldum",
    "Metang",
    "Metagross",
    "Regirock",
    "Regice",
    "Registeel",
    "Latias",
    "Latios",
    "Kyogre",
    "Groudon",
    "Rayquaza",
    "Jirachi",
    "Deoxys",
    // === GEN 4 (387-493) ===
    "Turtwig",
    "Grotle",
    "Torterra",
    "Chimchar",
    "Monferno",
    "Infernape",
    "Piplup",
    "Prinplup",
    "Empoleon",
    "Starly",
    "Staravia",
    "Staraptor",
    "Bidoof",
    "Bibarel",
    "Kricketot",
    "Kricketune",
    "Shinx",
    "Luxio",
    "Luxray",
    "Budew",
    "Roserade",
    "Cranidos",
    "Rampardos",
    "Shieldon",
    "Bastiodon",
    "Burmy",
    "Wormadam",
    "Mothim",
    "Combee",
    "Vespiquen",
    "Pachirisu",
    "Buizel",
    "Floatzel",
    "Cherubi",
    "Cherrim",
    "Shellos",
    "Gastrodon",
    "Ambipom",
    "Drifloon",
    "Drifblim",
    "Buneary",
    "Lopunny",
    "Mismagius",
    "Honchkrow",
    "Glameow",
    "Purugly",
    "Chingling",
    "Stunky",
    "Skuntank",
    "Bronzor",
    "Bronzong",
    "Bonsly",
    "Mime Jr.",
    "Happiny",
    "Chatot",
    "Spiritomb",
    "Gible",
    "Gabite",
    "Garchomp",
    "Munchlax",
    "Riolu",
    "Lucario",
    "Hippopotas",
    "Hippowdon",
    "Skorupi",
    "Drapion",
    "Croagunk",
    "Toxicroak",
    "Carnivine",
    "Finneon",
    "Lumineon",
    "Mantyke",
    "Snover",
    "Abomasnow",
    "Weavile",
    "Magnezone",
    "Lickilicky",
    "Rhyperior",
    "Tangrowth",
    "Electivire",
    "Magmortar",
    "Togekiss",
    "Yanmega",
    "Leafeon",
    "Glaceon",
    "Gliscor",
    "Mamoswine",
    "Porygon-Z",
    "Gallade",
    "Probopass",
    "Dusknoir",
    "Froslass",
    "Rotom",
    "Uxie",
    "Mesprit",
    "Azelf",
    "Dialga",
    "Palkia",
    "Heatran",
    "Regigigas",
    "Giratina",
    "Cresselia",
    "Phione",
    "Manaphy",
    "Darkrai",
    "Shaymin",
    "Arceus",
];

// Special filename mappings (where name.toLowerCase() doesn't match the file suffix)
const SPECIAL_FILES = {
    29: "nidoran", // Nidoran♀
    32: "nidoran", // Nidoran♂
    83: "farfetchd", // Farfetch'd
    122: "mr_mime", // Mr. Mime
    233: "porygon2", // Porygon2
    250: "ho_oh", // Ho-Oh
    439: "mime_jr", // Mime Jr.
    474: "porygon_z", // Porygon-Z
};

// Generation ranges [startId, endId]
const GEN_RANGES = {
    1: [1, 151],
    2: [152, 251],
    3: [252, 386],
    4: [387, 493],
};

// Generation unlock thresholds (total pokemon caught)
const GEN_UNLOCK = {
    1: 0, // available from start
    2: 50, // after 50 catches
    3: 100, // after 100 catches
    4: 150, // after 150 catches
};

// Evolution map: pokemonId -> nextEvolution (single id or array for branching)
const EVOLUTIONS = {
    // Gen 1 chains
    1: 2,
    2: 3, // Bulbasaur -> Ivysaur -> Venusaur
    4: 5,
    5: 6, // Charmander -> Charmeleon -> Charizard
    7: 8,
    8: 9, // Squirtle -> Wartortle -> Blastoise
    10: 11,
    11: 12, // Caterpie -> Metapod -> Butterfree
    13: 14,
    14: 15, // Weedle -> Kakuna -> Beedrill
    16: 17,
    17: 18, // Pidgey -> Pidgeotto -> Pidgeot
    19: 20, // Rattata -> Raticate
    21: 22, // Spearow -> Fearow
    23: 24, // Ekans -> Arbok
    25: 26, // Pikachu -> Raichu
    27: 28, // Sandshrew -> Sandslash
    29: 30,
    30: 31, // Nidoran♀ -> Nidorina -> Nidoqueen
    32: 33,
    33: 34, // Nidoran♂ -> Nidorino -> Nidoking
    35: 36, // Clefairy -> Clefable
    37: 38, // Vulpix -> Ninetales
    39: 40, // Jigglypuff -> Wigglytuff
    41: 42, // Zubat -> Golbat
    42: 169, // Golbat -> Crobat
    43: 44, // Oddish -> Gloom
    44: [45, 182], // Gloom -> Vileplume / Bellossom
    46: 47, // Paras -> Parasect
    48: 49, // Venonat -> Venomoth
    50: 51, // Diglett -> Dugtrio
    52: 53, // Meowth -> Persian
    54: 55, // Psyduck -> Golduck
    56: 57, // Mankey -> Primeape
    58: 59, // Growlithe -> Arcanine
    60: 61, // Poliwag -> Poliwhirl
    61: [62, 186], // Poliwhirl -> Poliwrath / Politoed
    63: 64,
    64: 65, // Abra -> Kadabra -> Alakazam
    66: 67,
    67: 68, // Machop -> Machoke -> Machamp
    69: 70,
    70: 71, // Bellsprout -> Weepinbell -> Victreebel
    72: 73, // Tentacool -> Tentacruel
    74: 75,
    75: 76, // Geodude -> Graveler -> Golem
    77: 78, // Ponyta -> Rapidash
    79: [80, 199], // Slowpoke -> Slowbro / Slowking
    81: 82, // Magnemite -> Magneton
    82: 462, // Magneton -> Magnezone
    84: 85, // Doduo -> Dodrio
    86: 87, // Seel -> Dewgong
    88: 89, // Grimer -> Muk
    90: 91, // Shellder -> Cloyster
    92: 93,
    93: 94, // Gastly -> Haunter -> Gengar
    95: 208, // Onix -> Steelix
    96: 97, // Drowzee -> Hypno
    98: 99, // Krabby -> Kingler
    100: 101, // Voltorb -> Electrode
    102: 103, // Exeggcute -> Exeggutor
    104: 105, // Cubone -> Marowak
    108: 463, // Lickitung -> Lickilicky
    109: 110, // Koffing -> Weezing
    111: 112, // Rhyhorn -> Rhydon
    112: 464, // Rhydon -> Rhyperior
    113: 242, // Chansey -> Blissey
    114: 465, // Tangela -> Tangrowth
    116: 117, // Horsea -> Seadra
    117: 230, // Seadra -> Kingdra
    118: 119, // Goldeen -> Seaking
    120: 121, // Staryu -> Starmie
    123: 212, // Scyther -> Scizor
    125: 466, // Electabuzz -> Electivire
    126: 467, // Magmar -> Magmortar
    129: 130, // Magikarp -> Gyarados
    133: [134, 135, 136, 196, 197, 470, 471], // Eevee -> Eeveelutions
    137: 233, // Porygon -> Porygon2
    138: 139, // Omanyte -> Omastar
    140: 141, // Kabuto -> Kabutops
    147: 148,
    148: 149, // Dratini -> Dragonair -> Dragonite

    // Gen 2 chains
    152: 153,
    153: 154, // Chikorita -> Bayleef -> Meganium
    155: 156,
    156: 157, // Cyndaquil -> Quilava -> Typhlosion
    158: 159,
    159: 160, // Totodile -> Croconaw -> Feraligatr
    161: 162, // Sentret -> Furret
    163: 164, // Hoothoot -> Noctowl
    165: 166, // Ledyba -> Ledian
    167: 168, // Spinarak -> Ariados
    170: 171, // Chinchou -> Lanturn
    172: 25, // Pichu -> Pikachu
    173: 35, // Cleffa -> Clefairy
    174: 39, // Igglybuff -> Jigglypuff
    175: 176, // Togepi -> Togetic
    176: 468, // Togetic -> Togekiss
    177: 178, // Natu -> Xatu
    179: 180,
    180: 181, // Mareep -> Flaaffy -> Ampharos
    183: 184, // Marill -> Azumarill
    187: 188,
    188: 189, // Hoppip -> Skiploom -> Jumpluff
    190: 424, // Aipom -> Ambipom
    191: 192, // Sunkern -> Sunflora
    193: 469, // Yanma -> Yanmega
    194: 195, // Wooper -> Quagsire
    198: 430, // Murkrow -> Honchkrow
    200: 429, // Misdreavus -> Mismagius
    204: 205, // Pineco -> Forretress
    207: 472, // Gligar -> Gliscor
    209: 210, // Snubbull -> Granbull
    215: 461, // Sneasel -> Weavile
    216: 217, // Teddiursa -> Ursaring
    218: 219, // Slugma -> Magcargo
    220: 221, // Swinub -> Piloswine
    221: 473, // Piloswine -> Mamoswine
    223: 224, // Remoraid -> Octillery
    228: 229, // Houndour -> Houndoom
    231: 232, // Phanpy -> Donphan
    233: 474, // Porygon2 -> Porygon-Z
    236: [106, 107, 237], // Tyrogue -> Hitmonlee/Hitmonchan/Hitmontop
    238: 124, // Smoochum -> Jynx
    239: 125, // Elekid -> Electabuzz
    240: 126, // Magby -> Magmar
    246: 247,
    247: 248, // Larvitar -> Pupitar -> Tyranitar

    // Gen 3 chains
    252: 253,
    253: 254, // Treecko -> Grovyle -> Sceptile
    255: 256,
    256: 257, // Torchic -> Combusken -> Blaziken
    258: 259,
    259: 260, // Mudkip -> Marshtomp -> Swampert
    261: 262, // Poochyena -> Mightyena
    263: 264, // Zigzagoon -> Linoone
    265: [266, 268], // Wurmple -> Silcoon / Cascoon
    266: 267, // Silcoon -> Beautifly
    268: 269, // Cascoon -> Dustox
    270: 271,
    271: 272, // Lotad -> Lombre -> Ludicolo
    273: 274,
    274: 275, // Seedot -> Nuzleaf -> Shiftry
    276: 277, // Taillow -> Swellow
    278: 279, // Wingull -> Pelipper
    280: 281, // Ralts -> Kirlia
    281: [282, 475], // Kirlia -> Gardevoir / Gallade
    283: 284, // Surskit -> Masquerain
    285: 286, // Shroomish -> Breloom
    287: 288,
    288: 289, // Slakoth -> Vigoroth -> Slaking
    290: [291, 292], // Nincada -> Ninjask / Shedinja
    293: 294,
    294: 295, // Whismur -> Loudred -> Exploud
    296: 297, // Makuhita -> Hariyama
    298: 183, // Azurill -> Marill
    299: 476, // Nosepass -> Probopass
    300: 301, // Skitty -> Delcatty
    304: 305,
    305: 306, // Aron -> Lairon -> Aggron
    307: 308, // Meditite -> Medicham
    309: 310, // Electrike -> Manectric
    315: 407, // Roselia -> Roserade
    316: 317, // Gulpin -> Swalot
    318: 319, // Carvanha -> Sharpedo
    320: 321, // Wailmer -> Wailord
    322: 323, // Numel -> Camerupt
    325: 326, // Spoink -> Grumpig
    328: 329,
    329: 330, // Trapinch -> Vibrava -> Flygon
    331: 332, // Cacnea -> Cacturne
    333: 334, // Swablu -> Altaria
    339: 340, // Barboach -> Whiscash
    341: 342, // Corphish -> Crawdaunt
    343: 344, // Baltoy -> Claydol
    345: 346, // Lileep -> Cradily
    347: 348, // Anorith -> Armaldo
    349: 350, // Feebas -> Milotic
    353: 354, // Shuppet -> Banette
    355: 356, // Duskull -> Dusclops
    356: 477, // Dusclops -> Dusknoir
    360: 202, // Wynaut -> Wobbuffet
    361: [362, 478], // Snorunt -> Glalie / Froslass
    363: 364,
    364: 365, // Spheal -> Sealeo -> Walrein
    366: [367, 368], // Clamperl -> Huntail / Gorebyss
    371: 372,
    372: 373, // Bagon -> Shelgon -> Salamence
    374: 375,
    375: 376, // Beldum -> Metang -> Metagross

    // Gen 4 chains
    387: 388,
    388: 389, // Turtwig -> Grotle -> Torterra
    390: 391,
    391: 392, // Chimchar -> Monferno -> Infernape
    393: 394,
    394: 395, // Piplup -> Prinplup -> Empoleon
    396: 397,
    397: 398, // Starly -> Staravia -> Staraptor
    399: 400, // Bidoof -> Bibarel
    401: 402, // Kricketot -> Kricketune
    403: 404,
    404: 405, // Shinx -> Luxio -> Luxray
    406: 315, // Budew -> Roselia
    408: 409, // Cranidos -> Rampardos
    410: 411, // Shieldon -> Bastiodon
    412: [413, 414], // Burmy -> Wormadam / Mothim
    415: 416, // Combee -> Vespiquen
    418: 419, // Buizel -> Floatzel
    420: 421, // Cherubi -> Cherrim
    422: 423, // Shellos -> Gastrodon
    425: 426, // Drifloon -> Drifblim
    427: 428, // Buneary -> Lopunny
    431: 432, // Glameow -> Purugly
    433: 358, // Chingling -> Chimecho
    434: 435, // Stunky -> Skuntank
    436: 437, // Bronzor -> Bronzong
    438: 185, // Bonsly -> Sudowoodo
    439: 122, // Mime Jr. -> Mr. Mime
    440: 113, // Happiny -> Chansey
    443: 444,
    444: 445, // Gible -> Gabite -> Garchomp
    446: 143, // Munchlax -> Snorlax
    447: 448, // Riolu -> Lucario
    449: 450, // Hippopotas -> Hippowdon
    451: 452, // Skorupi -> Drapion
    453: 454, // Croagunk -> Toxicroak
    456: 457, // Finneon -> Lumineon
    458: 226, // Mantyke -> Mantine
    459: 460, // Snover -> Abomasnow
};

// === HELPER FUNCTIONS ===

function getPokemonName(id) {
    return POKEMON_NAMES[id] || "???";
}

function getPokemonFile(id) {
    const name = POKEMON_NAMES[id];
    if (!name) return null;
    const suffix = SPECIAL_FILES[id] || name.toLowerCase().replace(/ /g, "_");
    return `assets/${id}_${suffix}.png`;
}

function getPokemonGen(id) {
    for (const [gen, [start, end]] of Object.entries(GEN_RANGES)) {
        if (id >= start && id <= end) return parseInt(gen);
    }
    return null;
}

function canEvolve(id) {
    return id in EVOLUTIONS;
}

function isMaxEvolved(id) {
    return !(id in EVOLUTIONS);
}

function getEvolution(id) {
    const evo = EVOLUTIONS[id];
    if (!evo) return null;
    if (Array.isArray(evo)) {
        return evo[Math.floor(Math.random() * evo.length)];
    }
    return evo;
}

function getEvolutions(id) {
    const evo = EVOLUTIONS[id];
    if (!evo) return [];
    return Array.isArray(evo) ? evo : [evo];
}
