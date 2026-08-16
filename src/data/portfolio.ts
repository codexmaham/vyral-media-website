export type Piece = {
  src: string;
  title: string;
  client: string;
  type: "video" | "graphic";
  /** First-frame JPEG so the card paints instantly instead of black. */
  poster?: string;
};

/** Videos are huge (up to 123 MB), so each one ships with a ~40 KB poster
 *  frame generated from it. Cards show the poster; the video itself is only
 *  fetched on hover or in the lightbox. */
const vid = (file: string, title: string, client: string): Piece => ({
  src: `/Video Portfolio/${encodeURIComponent(file)}`,
  poster: `/Video Posters/${encodeURIComponent(file.replace(/\.[^.]+$/, ""))}.jpg`,
  title,
  client,
  type: "video",
});

const gfx = (file: string, title: string, client: string): Piece => ({
  src: `/Graphic Portfolio/${encodeURIComponent(file)}`,
  title,
  client,
  type: "graphic",
});

export const videos: Piece[] = [
  vid("Speedster Windbreaker.mp4", "Speedster Windbreaker", "Forever Lit"),
  vid("kickster Product #1.mp4", "Kickster", "Forever Lit"),
  vid("DE STONER .mp4", "De Stoner", "Forever Lit"),
  vid("gemstone jacket v1.mp4.mp4", "Gemstone Jacket", "Forever Lit"),
  vid("windbrreaker.mp4", "Windbreaker Drop", "Forever Lit"),
  vid("Avora May  P4.mp4", "Avora — Chapter IV", "Avora"),
  vid("Avora may P#2.mp4", "Avora — Chapter II", "Avora"),
  vid("Final Dr Zarak C#2.mp4", "Dr. Zarak", "Healthcare"),
  vid("Creative 1 Lasnia medical complex  - Copy.mp4", "Lasnia Medical Complex", "Healthcare"),
  vid("Sialkot Mandi 2026.mp4", "Sialkot Mandi 2026", "Event"),
  vid("Mela .1.mp4", "Mela", "Event"),
  vid("SS Intro.mp4", "Brand Film", "SS Flour Mills"),
  vid("Do you Know 1 to 5.mp4", "Did You Know", "SS Flour Mills"),
  vid("TH 1.mp4", "Tourism Hub I", "Tourism Hub"),
  vid("Th 2 final.mp4", "Tourism Hub II", "Tourism Hub"),
  vid("Th 2.mp4", "Tourism Hub III", "Tourism Hub"),
  vid("c3 final.mp4", "Creative Three", "Social"),
  vid("C4.mp4", "Creative Four", "Social"),
  vid("1..mp4", "Product Reel", "Commercial"),
  vid("lv_0_20241014134514.mp4", "Brand Reel", "Commercial"),
  vid("IMG_1195.MP4", "Studio Session 01", "In-House"),
  vid("IMG_1503.MP4", "Studio Session 02", "In-House"),
  vid("IMG_7783.MP4", "Studio Session 03", "In-House"),
  vid("IMG_0198.MOV", "Studio Session 04", "In-House"),
  vid("IMG_0199.MOV", "Studio Session 05", "In-House"),
  vid("IMG_4701.MOV", "Studio Session 06", "In-House"),
  vid("IMG_9050.MOV", "Studio Session 07", "In-House"),
];

export const graphics: Piece[] = [
  gfx("alnoortownsialkot_1757140059_3715482569388094541_54847221192.jpg", "Defence Day", "Al Noor Town"),
  gfx("alnoortownsialkot_1760012700_3739580030373081280_54847221192.jpg", "Fountain View — Residential", "Al Noor Town"),
  gfx("alnoortownsialkot_1760541862_3744018966600225708_54847221192.jpg", "Fountain View — Commercial", "Al Noor Town"),
  gfx("alnoortownsialkot_1766624362_3795042668712086294_54847221192.jpg", "Quaid-e-Azam Day", "Al Noor Town"),
  gfx("alnoortownsialkot_1771421315_3835277426406492914_54847221192.jpg", "Silver Prime Extension", "Al Noor Town"),
  gfx("officialvynixo.co_1781704871_3921547138899174291_42014251022.jpg", "Systems That Work Smarter", "Vynixo"),
  gfx("officialvynixo.co_1781964007_3923720931553442068_42014251022.jpg", "Qualified Leads", "Vynixo"),
  gfx("officialvynixo.co_1783112410_3933354434221955642_42014251022.jpg", "Perfect Seller Leads", "Vynixo"),
  gfx("officialvynixo.co_1783162806_3933777190092648352_42014251022.jpg", "The Right Leads I", "Vynixo"),
  gfx("officialvynixo.co_1783162806_3933777190092648352_42014251022 (1).jpg", "The Right Leads II", "Vynixo"),
  gfx("officialvynixo.co_1783198817_3934079268045049251_42014251022.jpg", "Stop Chasing Leads", "Vynixo"),
  gfx("officialvynixo.co_1783508418_3936676395644421431_42014251022.jpg", "Lead Generation", "Vynixo"),
  gfx("ssflourmills_1774270602_3859183640584708111_77639780635.jpg", "Mill Craft I", "SS Flour Mills"),
  gfx("ssflourmills_1775770938_3871769678549155115_77639780635.jpg", "Mill Craft II", "SS Flour Mills"),
  gfx("ssflourmills_1779883592_3906269154751969537_77639780635.jpg", "Mill Craft III", "SS Flour Mills"),
  gfx("ssflourmills_1780236253_3909227455406159077_77639780635.jpg", "Mill Craft IV", "SS Flour Mills"),
  gfx("yemekdoner.skt_1743500112_3601062397686797594_45215707328.jpg", "Doner Series I", "Yemek Doner"),
  gfx("yemekdoner.skt_1751986827_3672254126007435182_45215707328.jpg", "Doner Series II", "Yemek Doner"),
  gfx("yemekdoner.skt_1755511565_3701821775159502275_45215707328.jpg", "Doner Series III", "Yemek Doner"),
  gfx("yemekdoner.skt_1755511565_3701821775159502275_45215707328(1).jpg", "Doner Series IV", "Yemek Doner"),
  gfx("yemekdoner.skt_1756217770_3707745845338334029_45215707328.jpg", "Doner Series V", "Yemek Doner"),
  gfx("yemekdoner.skt_1780376415_3910403237882813378_45215707328.jpg", "Doner Series VI", "Yemek Doner"),
  gfx("yemekdoner.skt_1781460034_3919493304438029639_45215707328.jpg", "Doner Series VII", "Yemek Doner"),
];

export const allPieces: Piece[] = [...videos, ...graphics];

/** Homepage teaser sets — each medium keeps its own showcase. */
export const featuredVideos: Piece[] = videos.slice(0, 8);
export const featuredGraphics: Piece[] = [
  graphics[1], graphics[5], graphics[12], graphics[16],
  graphics[2], graphics[6], graphics[13], graphics[17],
];
