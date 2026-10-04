import type { Destination } from "@/types";
// slug|title|district slug|category ids. ONLY name, location and category are filled in (well-known places).
// Description, history, coordinates, best time, how to reach, budget and photos stay null/empty until verified: add them per entry (see README).
const RAW = `
coxs-bazar-sea-beach|Cox's Bazar Sea Beach|coxs-bazar|beach
saint-martins-island|Saint Martin's Island|coxs-bazar|beach,nature
sixty-dome-mosque|Sixty Dome Mosque|bagerhat|historical,architecture
paharpur-buddhist-vihara|Paharpur Buddhist Vihara|naogaon|archaeology,historical
mahasthangarh|Mahasthangarh|bogura|archaeology,historical
lalbagh-fort|Lalbagh Fort|dhaka|historical,architecture
ahsan-manzil|Ahsan Manzil|dhaka|historical,architecture
sajek-valley|Sajek Valley|rangamati|nature
ratargul-swamp-forest|Ratargul Swamp Forest|sylhet|forest,nature
jaflong|Jaflong|sylhet|river,nature
kuakata|Kuakata|patuakhali|beach
lawachara-national-park|Lawachara National Park|moulvibazar|forest,nature
kantajew-temple|Kantajew Temple|dinajpur|architecture,historical
tanguar-haor|Tanguar Haor|sunamganj|nature
puthia-temple-complex|Puthia Temple Complex|rajshahi|architecture,historical
nilgiri-bandarban|Nilgiri (Bandarban)|bandarban|nature
mainamati|Mainamati|cumilla|archaeology,historical
madhabkunda-waterfall|Madhabkunda Waterfall|moulvibazar|waterfall,nature
hum-hum-waterfall|Hum Hum Waterfall|moulvibazar|waterfall,nature
nafakhum-waterfall|Nafakhum Waterfall|bandarban|waterfall,nature
amiakhum-waterfall|Amiakhum Waterfall|bandarban|waterfall,nature
remakri-waterfall|Remakri Waterfall|bandarban|waterfall,nature
shuvolong-waterfall|Shuvolong Waterfall|rangamati|waterfall,nature
khoiyachora-waterfall|Khoiyachora Waterfall|chattogram|waterfall,nature
jadipai-waterfall|Jadipai Waterfall|sylhet|waterfall,nature
national-museum|Bangladesh National Museum|dhaka|culture,historical
jatiya-sangsad-bhaban|National Parliament House|dhaka|architecture,culture
shaheed-minar|Central Shaheed Minar|dhaka|historical,culture
liberation-war-museum|Liberation War Museum|dhaka|culture,historical
dhakeshwari-temple|Dhakeshwari National Temple|dhaka|architecture,historical
star-mosque|Star Mosque|dhaka|architecture,historical
baitul-mukarram|Baitul Mukarram National Mosque|dhaka|architecture
national-martyrs-memorial|National Martyrs' Memorial|dhaka|historical,culture
new-market-dhaka|New Market|dhaka|shopping
bashundhara-city|Bashundhara City|dhaka|shopping
mangal-shobhajatra|Mangal Shobhajatra|dhaka|culture
old-dhaka-bakarkhani|Bakarkhani (Old Dhaka)|dhaka|food
sonargaon|Sonargaon|narayanganj|historical,archaeology
panam-city|Panam City|narayanganj|historical,architecture
idrakpur-fort|Idrakpur Fort|munshiganj|historical
bhawal-national-park|Bhawal National Park|gazipur|forest,nature
atia-mosque|Atia Mosque|tangail|architecture,historical
porabari-chomchom|Porabari Chomchom|tangail|food
patenga-sea-beach|Patenga Sea Beach|chattogram|beach
foys-lake|Foy's Lake|chattogram|nature,tourist
chattogram-mezban-beef|Chattogram Mezban Beef|chattogram|food
inani-beach|Inani Beach|coxs-bazar|beach
shalban-vihara|Shalban Vihara|cumilla|archaeology,historical
cumilla-roshmalai|Cumilla Roshmalai|cumilla|food
kaptai-lake|Kaptai Lake|rangamati|nature,river
rangamati-hanging-bridge|Rangamati Hanging Bridge|rangamati|tourist
boga-lake|Boga Lake|bandarban|nature
keokradong|Keokradong|bandarban|nature
buddha-dhatu-jadi|Buddha Dhatu Jadi (Golden Temple)|bandarban|architecture,culture
alutila-cave|Alutila Cave|khagrachhari|nature
nijhum-dwip|Nijhum Dwip|noakhali|nature,beach
chandpur-ilish|Chandpur Hilsa (Ilish)|chandpur|food
choto-sona-mosque|Choto Sona Mosque|chapainawabganj|architecture,historical
chapainawabganj-mango|Chapainawabganj Mango|chapainawabganj|food
rajshahi-silk|Rajshahi Silk|rajshahi|shopping,culture
uttara-gana-bhaban|Uttara Gana Bhaban (Dighapatia Palace)|natore|architecture,historical
natore-kachagolla|Natore Kachagolla|natore|food
bogurar-doi|Bogurar Doi|bogura|food
shahzadpur-kachari-bari|Rabindra Kachari Bari (Shahzadpur)|sirajganj|historical,culture
sundarbans|Sundarbans|khulna|forest,nature
khan-jahan-ali-mazar|Khan Jahan Ali Mazar|bagerhat|historical,architecture
shilaidaha-kuthibari|Shilaidaha Kuthibari|kushtia|historical,culture
sagardari-madhusudan|Sagardari (Madhusudan Dutt House)|jashore|historical,culture
mujibnagar|Mujibnagar|meherpur|historical
floating-guava-market|Floating Guava Market|pirojpur|culture,tourist
bichanakandi|Bichanakandi|sylhet|nature,river
shah-jalal-dargah|Shah Jalal Dargah|sylhet|historical,culture
srimangal-tea-gardens|Srimangal Tea Gardens|moulvibazar|nature,tourist
satchari-national-park|Satchari National Park|habiganj|forest,nature
birishiri|Birishiri|netrokona|culture,tourist
muktagacha-monda|Muktagacha Monda|mymensingh|food
tajhat-palace|Tajhat Palace|rangpur|historical,architecture
ramsagar-national-park|Ramsagar National Park|dinajpur|nature,tourist
teesta-barrage|Teesta Barrage|lalmonirhat|tourist
hardinge-bridge|Hardinge Bridge|pabna|tourist,architecture
durga-sagar|Durga Sagar|barishal|nature,tourist`;
const nil = { value: null, source: null };
export const destinations: Destination[] = RAW.trim().split("\n").map((l) => {
  const [slug, title, district, cats] = l.split("|");
  return { slug, title, district, categories: cats.split(","), description: null, history: null, coordinates: nil,
    bestTime: null, howToReach: null, budget: null, cover: null, gallery: [], sources: [] };
});
export const getDestination = (s: string) => destinations.find((d) => d.slug === s);
