import fs from 'fs';
import path from 'path';

// Correct 22 pages in exact numerical sequence Page 1 to 22
const orderedPages = [
  { page: 1,  name: 'Physics-HandNote-Page-01.jpg', url: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi5cG07_qD8ApXXa_iwX207Kj8shDjXAY5jZ9tyJJJBRBxuYvOjQBXj6T0Fd58LrQ_yAQlC_Mnw2xSUgsfrudGTMOT8l17soTARbKxBqCXOsRmOkq__0vGQ0HpjATXNNGYTQ6M-WDFjozdpmCSwlUevBsSVs6aNVwuDqNEEN72PhO7teYtS5Sm4JydfDWM/s2048/Physics-HandNote-Page-01.jpg' },
  { page: 2,  name: 'Physics-HandNote-Page-02.jpg', url: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjn7EPDfdLxa5O-YUZWuEnMdahDueXIEcXZxAnqj6zjmrpWgMetkyOJkcxLtbJwK5uCioCf7kPuAzJzETNXCBOKcd-REe-WONPb57sekHXA4Vm4noAGeIprxfKn0k4lVBTMpKM8pmtbQbdTHweveBcZWRHNAKB4VNslcfalqVuKCT4m1VcpoQLmaYsIS1U/s2048/Physics-HandNote-Page-02.jpg' },
  { page: 3,  name: 'Physics-HandNote-Page-03.jpg', url: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhmzULsYDbMRgoUjG1QgIRuBZsY8vgaQiV7h86l3b5-LuNenWhgRKiwxBAAyOHZB_diYBj7-bQTxZhHqL0X816KeWrzVdE1ZuK5lQgjJTBFCjVP3O71z8QAy-NbLhdDHf4xylaZCQEIzq8YIewOFBgz25P3OXqVAinwpsLm83pN8hcvZbauVC-76caqfPQ/s2048/Physics-HandNote-Page-03.jpg' },
  { page: 4,  name: 'Physics-HandNote-Page-04.jpg', url: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh_brvlgkXeCUUI57u7V8Lm15lveG3-WXy2ktbnU6YVF-kaBEklDOQ2ZeKGz5RYT4M7WqXyk9NN7_hJk3dw8SRled4Y0VwFsve5hwbV2JamnxvK0Y0I1cJF0tmI2is3IFNLdDHxUniv-5U_aL5EJwn8EKphVf5K7-2FA0O_8U4AoUtn56H5qA7DB6U3cT0/s2048/Physics-HandNote-Page-04.jpg' },
  { page: 5,  name: 'Physics-HandNote-Page-05.jpg', url: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj_MrlelRoBf1mNq4BdY0yu_YJAromAQZqXNBVkbVAyWwoJ3qtzwbbGGZ7hI-o5f7ke8ieWq9cMDxrRb-agpBY19pfzJjRHRwaXoHLpdsAQGaWkZNZSjtBgZzbqaeEVT9srIBedgvlUujKWSvcdh5DZ5TClIYDDarKSO8wY1UZPkvjs9BU1kZshrawOzNM/s2048/Physics-HandNote-Page-05.jpg' },
  { page: 6,  name: 'Physics-HandNote-Page-06.jpg', url: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEieCUAGd9MwQ8C7VopR1Zr8DEIzI_eH6O6WkKKSksIUx8UfXgixRFfk9U7WO37N8O17cNvS29_E48zxGyHMtLHpxewCqHTxodE_xTnJAHot9HvG-MnTdjLda3KXxxK1h6x8j8gU2yarHWK5QXQIxp9NnvU-eJUHVe-1kPOgryyYbd4hENGRzw9hgJAWA2A/s2048/Physics-HandNote-Page-06.jpg' },
  { page: 7,  name: 'Physics-HandNote-Page-07.jpg', url: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjUAS_6j132Upvfu8r0aPr-D4TKCOzT2Mrm1coXxMSjpdcNZsRa_uUlWdWL8d_qoZinax78Xe9I2Mp2pGuKz3qVe46IzoBtR_WV4k1nW32QBN2Hc9xTH9-SUYA20uxnHjomN9WbMFx3xklNlibQc2M7jVdGmhdUUw5LJACHeb4nHcix7-SglFN8tgOcZkQ/s2048/Physics-HandNote-Page-07.jpg' },
  { page: 8,  name: 'Physics-HandNote-Page-08.jpg', url: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgIwiWgMFVNVTaKKh9gaynSC5hOIPhOjxH4HUZ9dieVzYAuU4bhGQFofVUDtQ_vkHESljy2UgQKonEu7bbx0H8ppo65Mz4T30pMGKStAgyypdgt2DbPqwDeYh9EMDcRN451Onyd3rJDUE1l2lSGuqgMWDX3vx_XMUkPMzEeIZ6uqTfSBc3-Dbi-C_pZjks/s2048/Physics-HandNote-Page-08.jpg' },
  { page: 9,  name: 'Physics-HandNote-Page-09.jpg', url: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgdWMqZwdOMKFNS16roxSVZWG_RQ194-A_mqYrD8N7-vdGAPPZKdUexUOzcb96N2NnxfQlC4Bzg4DWQyrMWI79WtS6uPablwPbjNhdjUb6FzvupAxYOzzfeOiUNBIPWjN6rwvxmNZdZB74w_oML5kn3HPZNgOwDkfbpgJmdQjw7wfbijKLfdk8HoTq2peY/s2048/Physics-HandNote-Page-09.jpg' },
  { page: 10, name: 'Physics-HandNote-Page-10.jpg', url: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhQfix9Myyse5WFqe9RKylVbR6EDUAdxTmNNlQvIWzbDoKV-Hxc7QaNW0J2nlBOLsSTfq0N85ebDp2F87qKGY5TFNwrZ5tWHwvR6huYrBwJISmfcoZFoDuUsiayVJ57eH1gCl0gBQt189PjbMSHQNtntxZKSJ2ffgAzyVd5lGkDIu7KACYUjhCbhejRQKI/s2048/Physics-HandNote-Page-10.jpg' },
  { page: 11, name: 'Physics-HandNote-Page-11.jpg', url: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhU30TOV7G8NqRRSxym4q7-cSv2z6PXUzxCSEOdppxETirwRekFjKOe2j16sj81L4YFKGJ-CzV3-02G9p0aMIAXt007cEseB0bfbuAM97Kpf0Tv5KVSGcMrEYZAHTY8nb-Kr9H3Lb8tKJ9_mbRPBBFI4_sLkSqN8GxL33IpfM6Y0QaV_M2p_ujNdM3KCUU/s2048/Physics-HandNote-Page-11.jpg' },
  { page: 12, name: 'Physics-HandNote-Page-12.jpg', url: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi8Oatfg7v54-R8HqI_gAUxxrCB7sBV8Jut9Tg64f9WN6dHa02xrTBzcQSJbaxz6hdf-UpdWUN9BN_qa9b1ga0rFDEq4ntDgZVpAzGMWjyZ-3Js6BOQmy69x6fC1jIb8Loz6Wn0HoCWk2Eb-PKvGZjV6lBUtEnfimW_viNaaKAjUq-7SLpBms3x5B46IVo/s2048/Physics-HandNote-Page-12.jpg' },
  { page: 13, name: 'Physics-HandNote-Page-13.jpg', url: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgY3Szq3lE48xl7odiEpvmhIkLH70P4de75AvGCE5bLbXmNFWnmda99eKc0BeVH8dDNjy6ia5LeyqCMU6KQa35Gvn0uDljBS0_Tlq03e1TUcB2IaZUoOJCgajneciUMtS8eH1Z84jYPz2mOOOMEIINr8Qa0bTlCcLluhqXBUjUPseW6Hct2IpwWBdvbSTc/s2048/Physics-HandNote-Page-13.jpg' },
  { page: 14, name: 'Physics-HandNote-Page-14.jpg', url: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiU0Djl3IzV-wN9uvo_jf1wltB1guPUd0C-UIzQytu_QuPP0KQl_yMH7RVxUr7FX_VhYSJkacozQAB4btvtVnopBzaQJMMURLw92glZETpBzlRZmBpOgGBJYS4ep737AzDCS_a_YpofBaNqa4uXbkjY2kReKuGcMNEbjXvQEtvnRnhtNK9JOQY-twquOrA/s2048/Physics-HandNote-Page-14.jpg' },
  { page: 15, name: 'Physics-HandNote-Page-15.jpg', url: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEifCTQyff9wo62FlcIhldhlHFhqBLzVVwSYsZy2tTkF4bRA83IybOJVRZB1gTfI7jlrCo934ryoyASWHLL1QwPSTZ0bl_owwDXvCGNbnAvO7u67UGnuYbHNGbACSo0KSsSUofYoQ4dCTZZylf_bB08UWF2odeUJ2DBpiPM_0I41d4q6jlnAkpiVTxIPE6w/s2048/Physics-HandNote-Page-15.jpg' },
  { page: 16, name: 'Physics-HandNote-Page-16.jpg', url: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjg_zfjnHptpOAik_kDNE3SDwEQaZsCxXhn2FQJWWq3kvqbOcO-3FkzvC0dTrLNUP-2d1OvFzLEGYyevEmwoMoZnWOkQKPVywX_7K7leVY-Xf-x-ADNZfJo7X9P_iR8Z6P9Lgt2hoPieX5zDucNcGkZPpAWZBBXsSF5Ta0OKgiFUbpBjB0S7mosBw7p3YI/s2048/Physics-HandNote-Page-16.jpg' },
  { page: 17, name: 'Physics-HandNote-Page-17.jpg', url: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhcxWWQiBic_5mSdKlSb9ud78U2uCMwbwNjFzd8P7f9riTd5uc4SdBFPMGUa1UB2_73fr3ys_qZBnBuTCkF7od9_L8Iey3hXnZdH8uu09wHfvrEdlSqcOFDLwTadbqZIBonwqGLsXU4SnmamHtDkphqDWomd8agFlsMYACvInMohlI-LTO8l6xo29MNXQ0/s2048/Physics-HandNote-Page-17.jpg' },
  { page: 18, name: 'Physics-HandNote-Page-18.jpg', url: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgaOlXgnNq5wsHfhJYFFgvsVJuUl1MOLv8nPMZ7l01porIqyrZC-zFtXDhyD6JqDOiJPWevN3FngUdTS0ZE9OYtbJh-TOu0ai2WKIqtvdT1nCAUVljW7m6R0fb8Sm9Xn56fGTr886Rs37Yb8ioIkYZH81KH-VVFKp3234P6TvXzmwQKzv2v30RM4f1xwwM/s2048/Physics-HandNote-Page-18.jpg' },
  { page: 19, name: 'Physics-HandNote-Page-19.jpg', url: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiFZiSR7r4B1Fcxc4WMmXU5Ek0GEfax1JA_MZ4-cucz9f0QfpTbEfiSiXMZluMfl0RMtGi3rDI2YwAY5qNkDtFUXIr7eHuC1-O7yiMvZk8ZKrJ7bgr1fsl5VdvBHap49q02ygUyiJlQFXBCTfuVHLzXgHQgg6baqhM0N9x_MATGyq9EwXdJheYYPJYR7Gs/s2048/Physics-HandNote-Page-19.jpg' },
  { page: 20, name: 'Physics-HandNote-Page-20.jpg', url: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEitdEtTROEC55kcG1ujD4LH1i1oZTZ2qa8_SvE_9tRrTRloWbcE0t_Ty5mgjrN_8oOp1df40yGUYUqSAE7XWsomLyLCCIiJGXmVsVw4CfgLOhEw02tyJ7eiLb4vCOntFjR2q3n4Jcq7-7KafuexeQaBIgeLZnqLTgXILVKJKS1uiP5c8NEPp9_fYyDi6sY/s2048/Physics-HandNote-Page-20.jpg' },
  { page: 21, name: 'Physics-HandNote-Page-21.jpg', url: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgBMGhsX2bpooQWFZWBEBNmqctXm7YXBhmsGRTTBDyE7JSiStPaVjogMNX7Od32yWh9eTzs1m7kTGuilEKE8e330v6tdZwAHvtU-aE2FYNimO5mtkLoG3bCH0brufpj4XVpLzTDpXlcDN74CEbXiBlsb5w9QMTFJ8Isy3-2jKbc9wLrBGsLJtGVs17OTh8/s2048/Physics-HandNote-Page-21.jpg' },
  { page: 22, name: 'Physics-HandNote-Page-22.jpg', url: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjGnfOhbNcdjtnkkiI7mH3Qy4IYNV1VU2lL3IhmqE2TyO_cuKm0y4L03roVf0gDaTENj25raPBZTx9TQhUymvaUtc9NYwQu-cSwE81EQ366x_2GjRBxnoQgI_r4eqMv5pVIgImbaGeFHhLPAyZIamQauh-1tyTZcT056ew_hbs1P3Ib2xIOoFueWBAkfAE/s2048/Physics-HandNote-Page-22.jpg' },
];

async function main() {
  const destDir = 'D:\\HAND NOTE';
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

  console.log('Downloading and saving exact page order into D:\\HAND NOTE...');
  for (const p of orderedPages) {
    const num = String(p.page).padStart(2, '0');
    console.log(`Downloading Page ${num}...`);
    const res = await fetch(p.url);
    if (res.ok) {
      const arrayBuffer = await res.arrayBuffer();
      fs.writeFileSync(path.join(destDir, p.name), Buffer.from(arrayBuffer));
    }
  }

  // Generate HTML blocks for lib/hsc-hand-note-data.ts
  const htmlBlocks = orderedPages.map(p => {
    const num = String(p.page).padStart(2, '0');
    return `<div style="clear: both; text-align: center; margin-bottom: 2rem;">
  <h3 style="text-align: center; margin-bottom: 0.5rem; font-weight: bold; color: #047857;">পৃষ্ঠা - ${num}</h3>
  <img decoding="async" alt="HSC Physics Hand Note Page ${p.page}" border="0" src="${p.url}" style="max-width:100%; height:auto; display:inline-block; border-radius:12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);" />
</div>`;
  }).join('\n\n');

  const fileContent = `import { CategoryPost } from './categories-data';

export const HSC_HAND_NOTE_POSTS: CategoryPost[] = [
  {
    id: 9901,
    title: \`এইচএসসি পদার্থবিজ্ঞান ১ম পত্র - কাজ, ক্ষমতা ও শক্তি হ্যান্ড নোট (HSC Physics 1st Paper Hand Note PDF)\`,
    slug: "hsc-hand-note-pdf",
    excerpt: \`এইচএসসি পদার্থবিজ্ঞান ১ম পত্রের ৫ম অধ্যায় 'কাজ, ক্ষমতা ও শক্তি' এর সম্পূর্ণ হ্যান্ড নোট। পৃষ্ঠা ০১ থেকে ২২ পর্যন্ত প্রতিটি পৃষ্ঠা সিরিয়াল অনুযায়ী সুন্দর ও পরিষ্কারভাবে উপস্থাপন করা হলো।\`,
    content: \`<p><b>Dying Field (BD Edu Books)</b> এর পক্ষ থেকে এইচএসসি শিক্ষার্থীদের জন্য <b>পদার্থবিজ্ঞান ১ম পত্র (৫ম অধ্যায়: কাজ, ক্ষমতা ও শক্তি)</b> এর সম্পূর্ণ ২২ পৃষ্ঠার বিশেষ <b>এইচএসসি হ্যান্ড নোট (HSC Hand Note)</b> ক্রমানুসারে (সিরিয়াল অনুযায়ী ১ থেকে ২২ নম্বর পৃষ্ঠা) নিচে প্রকাশ করা হলো:</p>

${htmlBlocks}

<p><b>Tag</b>: HSC Physics Hand Note, HSC Note PDF, পদার্থবিজ্ঞান ১ম পত্র হ্যান্ড নোট, কাজ ক্ষমতা ও শক্তি নোট, এইচএসসি সাজেশন ও লেকচার শিট</p>\`,
    image: "${orderedPages[0].url}",
    date: "2026-08-24",
    link: "http://localhost:3000/category/hsc-hand-note/hsc-hand-note-pdf",
    category: "HSC Hand Note",
    categorySlug: "hsc-hand-note",
  },
];
`;

  fs.writeFileSync('lib/hsc-hand-note-data.ts', fileContent, 'utf8');
  console.log('Successfully re-ordered all pages in lib/hsc-hand-note-data.ts and D:\\HAND NOTE!');
}

main().catch(err => console.error(err));
