export type Piece = {
  src: string;
  title: string;
  client: string;
  type: "video" | "graphic";
  /** grid weight — 1 = standard, 2 = feature (spans wider) */
  span?: 1 | 2;
};

const V = (f: string) => `/Video Portfolio/${encodeURIComponent(f)}`;
const G = (f: string) => `/Graphic Portfolio/${encodeURIComponent(f)}`;

export const videos: Piece[] = [
  { src: V("Speedster Windbreaker.mp4"), title: "Speedster Windbreaker", client: "Forever Lit", type: "video", span: 2 },
  { src: V("kickster Product #1.mp4"), title: "Kickster", client: "Forever Lit", type: "video" },
  { src: V("DE STONER .mp4"), title: "De Stoner", client: "Forever Lit", type: "video" },
  { src: V("gemstone jacket v1.mp4.mp4"), title: "Gemstone Jacket", client: "Forever Lit", type: "video" },
  { src: V("windbrreaker.mp4"), title: "Windbreaker Drop", client: "Forever Lit", type: "video" },
  { src: V("Avora May  P4.mp4"), title: "Avora — Chapter IV", client: "Avora", type: "video", span: 2 },
  { src: V("Avora may P#2.mp4"), title: "Avora — Chapter II", client: "Avora", type: "video" },
  { src: V("Final Dr Zarak C#2.mp4"), title: "Dr. Zarak", client: "Healthcare", type: "video" },
  { src: V("Creative 1 Lasnia medical complex  - Copy.mp4"), title: "Lasnia Medical Complex", client: "Healthcare", type: "video" },
  { src: V("Sialkot Mandi 2026.mp4"), title: "Sialkot Mandi 2026", client: "Event", type: "video", span: 2 },
  { src: V("Mela .1.mp4"), title: "Mela", client: "Event", type: "video" },
  { src: V("SS Intro.mp4"), title: "Brand Film", client: "SS Flour Mills", type: "video" },
  { src: V("Do you Know 1 to 5.mp4"), title: "Did You Know", client: "SS Flour Mills", type: "video" },
  { src: V("TH 1.mp4"), title: "Tourism Hub I", client: "Tourism Hub", type: "video" },
  { src: V("Th 2 final.mp4"), title: "Tourism Hub II", client: "Tourism Hub", type: "video" },
  { src: V("Th 2.mp4"), title: "Tourism Hub III", client: "Tourism Hub", type: "video" },
  { src: V("c3 final.mp4"), title: "Creative Three", client: "Social", type: "video" },
  { src: V("C4.mp4"), title: "Creative Four", client: "Social", type: "video" },
  { src: V("1..mp4"), title: "Product Reel", client: "Commercial", type: "video" },
  { src: V("lv_0_20241014134514.mp4"), title: "Brand Reel", client: "Commercial", type: "video" },
  { src: V("IMG_1195.MP4"), title: "Studio Session 01", client: "In-House", type: "video" },
  { src: V("IMG_1503.MP4"), title: "Studio Session 02", client: "In-House", type: "video" },
  { src: V("IMG_7783.MP4"), title: "Studio Session 03", client: "In-House", type: "video" },
  { src: V("IMG_0198.MOV"), title: "Studio Session 04", client: "In-House", type: "video" },
  { src: V("IMG_0199.MOV"), title: "Studio Session 05", client: "In-House", type: "video" },
  { src: V("IMG_4701.MOV"), title: "Studio Session 06", client: "In-House", type: "video" },
  { src: V("IMG_9050.MOV"), title: "Studio Session 07", client: "In-House", type: "video" },
];

export const graphics: Piece[] = [
  { src: G("alnoortownsialkot_1760012700_3739580030373081280_54847221192.jpg"), title: "Fountain View — Residential", client: "Al Noor Town", type: "graphic", span: 2 },
  { src: G("alnoortownsialkot_1760541862_3744018966600225708_54847221192.jpg"), title: "Fountain View — Commercial", client: "Al Noor Town", type: "graphic" },
  { src: G("alnoortownsialkot_1757140059_3715482569388094541_54847221192.jpg"), title: "Defence Day", client: "Al Noor Town", type: "graphic" },
  { src: G("alnoortownsialkot_1766624362_3795042668712086294_54847221192.jpg"), title: "Quaid-e-Azam Day", client: "Al Noor Town", type: "graphic" },
  { src: G("alnoortownsialkot_1771421315_3835277426406492914_54847221192.jpg"), title: "Silver Prime Extension", client: "Al Noor Town", type: "graphic" },
  { src: G("officialvynixo.co_1781704871_3921547138899174291_42014251022.jpg"), title: "Systems That Work Smarter", client: "Vynixo", type: "graphic", span: 2 },
  { src: G("officialvynixo.co_1781964007_3923720931553442068_42014251022.jpg"), title: "Qualified Leads", client: "Vynixo", type: "graphic" },
  { src: G("officialvynixo.co_1783112410_3933354434221955642_42014251022.jpg"), title: "Perfect Seller Leads", client: "Vynixo", type: "graphic" },
  { src: G("officialvynixo.co_1783162806_3933777190092648352_42014251022.jpg"), title: "The Right Leads I", client: "Vynixo", type: "graphic" },
  { src: G("officialvynixo.co_1783162806_3933777190092648352_42014251022 (1).jpg"), title: "The Right Leads II", client: "Vynixo", type: "graphic" },
  { src: G("officialvynixo.co_1783198817_3934079268045049251_42014251022.jpg"), title: "Stop Chasing Leads", client: "Vynixo", type: "graphic" },
  { src: G("officialvynixo.co_1783508418_3936676395644421431_42014251022.jpg"), title: "Lead Generation", client: "Vynixo", type: "graphic" },
  { src: G("ssflourmills_1774270602_3859183640584708111_77639780635.jpg"), title: "Mill Craft I", client: "SS Flour Mills", type: "graphic", span: 2 },
  { src: G("ssflourmills_1775770938_3871769678549155115_77639780635.jpg"), title: "Mill Craft II", client: "SS Flour Mills", type: "graphic" },
  { src: G("ssflourmills_1779883592_3906269154751969537_77639780635.jpg"), title: "Mill Craft III", client: "SS Flour Mills", type: "graphic" },
  { src: G("ssflourmills_1780236253_3909227455406159077_77639780635.jpg"), title: "Mill Craft IV", client: "SS Flour Mills", type: "graphic" },
  { src: G("yemekdoner.skt_1743500112_3601062397686797594_45215707328.jpg"), title: "Doner Series I", client: "Yemek Doner", type: "graphic", span: 2 },
  { src: G("yemekdoner.skt_1751986827_3672254126007435182_45215707328.jpg"), title: "Doner Series II", client: "Yemek Doner", type: "graphic" },
  { src: G("yemekdoner.skt_1755511565_3701821775159502275_45215707328.jpg"), title: "Doner Series III", client: "Yemek Doner", type: "graphic" },
  { src: G("yemekdoner.skt_1755511565_3701821775159502275_45215707328(1).jpg"), title: "Doner Series IV", client: "Yemek Doner", type: "graphic" },
  { src: G("yemekdoner.skt_1756217770_3707745845338334029_45215707328.jpg"), title: "Doner Series V", client: "Yemek Doner", type: "graphic" },
  { src: G("yemekdoner.skt_1780376415_3910403237882813378_45215707328.jpg"), title: "Doner Series VI", client: "Yemek Doner", type: "graphic" },
  { src: G("yemekdoner.skt_1781460034_3919493304438029639_45215707328.jpg"), title: "Doner Series VII", client: "Yemek Doner", type: "graphic" },
];

export const allPieces: Piece[] = [...videos, ...graphics];

/** Homepage teaser sets — each medium keeps its own showcase. */
export const featuredVideos: Piece[] = videos.slice(0, 8);
export const featuredGraphics: Piece[] = [
  graphics[0], graphics[5], graphics[12], graphics[16],
  graphics[1], graphics[6], graphics[13], graphics[17],
];
