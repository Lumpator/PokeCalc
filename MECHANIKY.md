# PokeCalc - Mechaniky hry

## Koncept
Hra na procvičování malé násobilky (1-10 × 1-10) ve stylu Pokémon her pro děti.

## Technické požadavky
- Jednoduchá HTML aplikace (lokální použití)
- Lokální HTTP server s otevřenými porty pro přístup z mobilu
- Optimalizace pro mobilní zařízení a tablety (responsive design)
- 493 pokémonů z generací 1-4
- Formát assetů: `cislo_nazev.png` (např. `477_dusknoir.png`)

## Herní mechaniky

### Začátek hry
- Hráč si vybere 1 základního pokémona: Bulbasaur, Charmander, nebo Squirtle
- Uloží se do localStorage pro persistenci

### Evoluční systém
- Každý pokémon, který má dostupnou evoluci, získá za vítězství v boji +1 EXP
- Po dosažení 5 EXP se pokémon vyvine na další evoluční stupeň
- Pokémon s maximální evolucí bude mít označení "MAX"
- Evoluce zahrnuje animaci: pomalé a postupně se zrychlující přeblikávání mezi původním a vyvinutým pokémonem

### Bojový systém
1. Náhodně se vybere soupeř (základní pokémon z dostupných generací)
2. Zobrazí se příklad z násobilky (1-10 × 1-10)
3. Nabídnou se 3 možnosti odpovědi (1 správná, 2 špatné)
4. Hráč má 10 vteřin na odpověď
5. **Správná odpověď** → soupeři se ubere 20% HP
6. **Špatná odpověď / vypršení času** → hráčovu pokémonovi se ubere 20% HP
7. **Soupeř na 0% HP** → hráč získá soupeře + aktivní pokémon +1 EXP
8. **Hráčův pokémon na 0% HP** → prohra, nic se nestane, hráč může jít do dalšího zápasu

### Pokédex
- Zobrazení všech pokémonů přepínatelné podle generace
- Získaní pokémoni jsou barevní
- Nezískaní pokémoni zobrazeni jako siluety (CSS filter)
- Pokémon, který se vyvinul, zůstává v pokédexu jako získaný (i když ho hráč již nemá)

### Odemykání generací
- **Start**: Dostupná pouze Generace 1 (pokémoni #1-151)
- **50 získaných pokémonů** (nemusí být unikátní): Odemkne se Generace 2 (#152-251)
- **100 získaných pokémonů**: Odemkne se Generace 3 (#252-386)
- **150 získaných pokémonů**: Odemkne se Generace 4 (#387-493)
- Soupeři se vybírají náhodně ze všech odemčených generací
- Stránky pokédexu se zobrazí až po odemčení příslušné generace

### Hlavní menu
- **Další zápas** - zahájí nový boj
- **Vybrat pokémona** - otevře pokédex pro výběr aktivního pokémona
