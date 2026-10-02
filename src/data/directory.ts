import type { DeptSlug } from "@/lib/site";

/**
 * EBCB 2026–2027. Edit this list when the board changes; the Directory page
 * and the contact cards on each guide read from it.
 */
export interface Officer {
  name: string;
  role: string;
  email: string;
  facebook: string;
  /** Extra responsibility shown on the card, e.g. "Website point person". */
  note?: string;
}

export interface DirectoryGroup {
  dept: DeptSlug;
  title: string;
  officers: Officer[];
}

export const DIRECTORY: DirectoryGroup[] = [
  {
    dept: "op",
    title: "Office of the President",
    officers: [
      { name: "Josh Lee", role: "President", email: "josh.anthony.lee@student.ateneo.edu", facebook: "https://fb.com/joshanthony.lee.9" },
      { name: "Bernstein Chua", role: "Executive Vice President", email: "bernstein.joachim.chua@student.ateneo.edu", facebook: "https://fb.com/bernsteinjoachim.chua" },
    ],
  },
  {
    dept: "commpub",
    title: "Communications and Publications",
    officers: [
      { name: "Jillian Yu", role: "VP for Communications and Publications", email: "jillian.yu@student.ateneo.edu", facebook: "https://fb.com/jillian.yu.758" },
      { name: "Jill Dy", role: "AVP for Creative Branding and Design", email: "jillian.dy@student.ateneo.edu", facebook: "https://fb.com/jillian.dy.961" },
      { name: "Dia Fernando", role: "AVP for Creative Branding and Design", email: "dia.ainsly.fernando@student.ateneo.edu", facebook: "https://fb.com/dia.fernando.9" },
      { name: "Simone Chua", role: "AVP for Documentation and Publications", email: "simone.chua@student.ateneo.edu", facebook: "https://fb.com/simoneabigailc" },
      { name: "Abby Tan", role: "AVP for Documentation and Publications", email: "elise.tan@student.ateneo.edu", facebook: "https://fb.com/abbytann" },
    ],
  },
  {
    dept: "cul",
    title: "Cultural Affairs",
    officers: [
      { name: "Therese Yap", role: "VP for Cultural Affairs", email: "anne.therese.yap@student.ateneo.edu", facebook: "https://fb.com/yap.reese04" },
    ],
  },
  {
    dept: "exrel",
    title: "External Relations",
    officers: [
      { name: "Yomi Tan", role: "VP for External Relations", email: "caoimhe.elise.tan@student.ateneo.edu", facebook: "https://fb.com/share/1FUBkQijF4/" },
      { name: "Vin Ong", role: "AVP for External Relations", email: "vin.cedric.ong@student.ateneo.edu", facebook: "https://fb.com/vin.cedric.ong.2024/" },
      { name: "Kyle Tan", role: "AVP for External Relations", email: "kyle.bennett.tan@student.ateneo.edu", facebook: "https://fb.com/Kyle.Bennett.Tan" },
      { name: "Ashley Yu", role: "AVP for External Relations", email: "ashley.denise.yu@student.ateneo.edu", facebook: "https://fb.com/ashley.yu.327309/" },
    ],
  },
  {
    dept: "fin",
    title: "Financial Affairs",
    officers: [
      { name: "Jill Lee", role: "VP for Financial Affairs", email: "jillian.lee@student.ateneo.edu", facebook: "https://fb.com/jillian.lee.7789" },
      { name: "Leander Lee", role: "AVP for Financial Affairs", email: "leander.marcus.lee@student.ateneo.edu", facebook: "https://fb.com/leandermarcus.lee" },
      { name: "Andrew Tan", role: "AVP for Financial Affairs", email: "andrew.k.tan@student.ateneo.edu", facebook: "https://fb.com/andrewkyletan" },
      { name: "Dy Sia", role: "AVP for Financial Affairs", email: "dyanne.rachel.sia@student.ateneo.edu", facebook: "https://fb.com/share/19jeVi42AH/" },
    ],
  },
  {
    dept: "hr",
    title: "Human Resources",
    officers: [
      { name: "Yzzie Yu", role: "VP for Human Resources", email: "bianca.ysabel.yu@student.ateneo.edu", facebook: "https://fb.com/share/1B52TUZ4wv/" },
      { name: "Andre Lee", role: "AVP for Human Resources", email: "john.andre.lee@student.ateneo.edu", facebook: "https://fb.com/johnandrelee36" },
      { name: "Keng Lin", role: "AVP for Human Resources", email: "keng.wei.lin@student.ateneo.edu", facebook: "https://fb.com/mxrphem/" },
    ],
  },
  {
    dept: "osr",
    title: "Organization Strategies and Research",
    officers: [
      { name: "Kyle Co", role: "VP for Organization Strategies and Research", email: "kyle.dominic.co@student.ateneo.edu", facebook: "https://fb.com/Kyledominic.co" },
      { name: "Sofia Diño", role: "AVP for Organization Strategies and Research", email: "sofia.giulia.dino@student.ateneo.edu", facebook: "https://fb.com/sofiag.dino" },
      { name: "Lyss Orquina", role: "AVP for Organization Strategies and Research", email: "alyssa.andrea.orquina@student.ateneo.edu", facebook: "https://fb.com/alyssa.orquina" },
      { name: "Keene Brigado", role: "AVP for Organization Strategies and Research", email: "keene.xander.brigado@student.ateneo.edu", facebook: "https://fb.com/kbrigado", note: "Point person for website issues" },
    ],
  },
];

export function officersFor(dept: DeptSlug): Officer[] {
  return DIRECTORY.find((g) => g.dept === dept)?.officers ?? [];
}
