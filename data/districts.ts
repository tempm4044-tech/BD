import type { District } from "@/types";
// slug|name|bn|division. Names and division membership only; every other field stays null until verified (see README).
const RAW = `
dhaka|Dhaka|ঢাকা|dhaka
faridpur|Faridpur|ফরিদপুর|dhaka
gazipur|Gazipur|গাজীপুর|dhaka
gopalganj|Gopalganj|গোপালগঞ্জ|dhaka
kishoreganj|Kishoreganj|কিশোরগঞ্জ|dhaka
madaripur|Madaripur|মাদারীপুর|dhaka
manikganj|Manikganj|মানিকগঞ্জ|dhaka
munshiganj|Munshiganj|মুন্সিগঞ্জ|dhaka
narayanganj|Narayanganj|নারায়ণগঞ্জ|dhaka
narsingdi|Narsingdi|নরসিংদী|dhaka
rajbari|Rajbari|রাজবাড়ী|dhaka
shariatpur|Shariatpur|শরীয়তপুর|dhaka
tangail|Tangail|টাঙ্গাইল|dhaka
jamalpur|Jamalpur|জামালপুর|mymensingh
mymensingh|Mymensingh|ময়মনসিংহ|mymensingh
netrokona|Netrokona|নেত্রকোনা|mymensingh
sherpur|Sherpur|শেরপুর|mymensingh
bandarban|Bandarban|বান্দরবান|chattogram
brahmanbaria|Brahmanbaria|ব্রাহ্মণবাড়িয়া|chattogram
chandpur|Chandpur|চাঁদপুর|chattogram
chattogram|Chattogram|চট্টগ্রাম|chattogram
cumilla|Cumilla|কুমিল্লা|chattogram
coxs-bazar|Cox's Bazar|কক্সবাজার|chattogram
feni|Feni|ফেনী|chattogram
khagrachhari|Khagrachhari|খাগড়াছড়ি|chattogram
lakshmipur|Lakshmipur|লক্ষ্মীপুর|chattogram
noakhali|Noakhali|নোয়াখালী|chattogram
rangamati|Rangamati|রাঙ্গামাটি|chattogram
bogura|Bogura|বগুড়া|rajshahi
joypurhat|Joypurhat|জয়পুরহাট|rajshahi
naogaon|Naogaon|নওগাঁ|rajshahi
natore|Natore|নাটোর|rajshahi
chapainawabganj|Chapainawabganj|চাঁপাইনবাবগঞ্জ|rajshahi
pabna|Pabna|পাবনা|rajshahi
rajshahi|Rajshahi|রাজশাহী|rajshahi
sirajganj|Sirajganj|সিরাজগঞ্জ|rajshahi
bagerhat|Bagerhat|বাগেরহাট|khulna
chuadanga|Chuadanga|চুয়াডাঙ্গা|khulna
jashore|Jashore|যশোর|khulna
jhenaidah|Jhenaidah|ঝিনাইদহ|khulna
khulna|Khulna|খুলনা|khulna
kushtia|Kushtia|কুষ্টিয়া|khulna
magura|Magura|মাগুরা|khulna
meherpur|Meherpur|মেহেরপুর|khulna
narail|Narail|নড়াইল|khulna
satkhira|Satkhira|সাতক্ষীরা|khulna
barguna|Barguna|বরগুনা|barishal
barishal|Barishal|বরিশাল|barishal
bhola|Bhola|ভোলা|barishal
jhalakathi|Jhalakathi|ঝালকাঠি|barishal
patuakhali|Patuakhali|পটুয়াখালী|barishal
pirojpur|Pirojpur|পিরোজপুর|barishal
habiganj|Habiganj|হবিগঞ্জ|sylhet
moulvibazar|Moulvibazar|মৌলভীবাজার|sylhet
sunamganj|Sunamganj|সুনামগঞ্জ|sylhet
sylhet|Sylhet|সিলেট|sylhet
dinajpur|Dinajpur|দিনাজপুর|rangpur
gaibandha|Gaibandha|গাইবান্ধা|rangpur
kurigram|Kurigram|কুড়িগ্রাম|rangpur
lalmonirhat|Lalmonirhat|লালমনিরহাট|rangpur
nilphamari|Nilphamari|নীলফামারী|rangpur
panchagarh|Panchagarh|পঞ্চগড়|rangpur
rangpur|Rangpur|রংপুর|rangpur
thakurgaon|Thakurgaon|ঠাকুরগাঁও|rangpur`;
const nil = { value: null, source: null };
export const districts: District[] = RAW.trim().split("\n").map((l) => {
  const [slug, name, bn, division] = l.split("|");
  return { slug, name, bn, division, shortDescription: null, area: nil, population: nil,
    coordinates: nil, cover: null, gallery: [], destinations: [] };
});
export const getDistrict = (s: string) => districts.find((d) => d.slug === s);
