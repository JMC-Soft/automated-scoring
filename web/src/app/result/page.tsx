'use client';

import React from 'react';
// import {
//   Filler,
//   Legend,
//   LineElement,
//   PointElement,
//   RadialLinearScale,
//   Tooltip,
//   Chart as ChartJS,
//   ChartOptions,
// } from 'chart.js';
// import { Radar } from 'react-chartjs-2';

// ChartJS.register(
//   RadialLinearScale,
//   PointElement,
//   LineElement,
//   Filler,
//   Tooltip,
//   Legend,
// );
//
// const chartData = {
//   labels: ['표현', '문맥', '어휘'],
//   datasets: [
//     {
//       label: '팀 점수',
//       data: [8, 5, 5],
//       backgroundColor: 'rgba(255, 108, 61, 0.2)',
//     },
//   ],
// };
//
// const chartOptions: ChartOptions<'radar'> & ChartOptions = {
//   elements: {
//     line: {
//       borderWidth: 2,
//       borderColor: 'orange',
//     },
//   },
//   scales: {
//     r: {
//       ticks: {
//         stepSize: 2,
//       },
//       pointLabels: {
//         font: {
//           size: 10,
//           weight: '500',
//           family: 'Pretendard',
//         },
//         color: 'black',
//       },
//       suggestedMin: 0,
//       suggestedMax: 12,
//     },
//   },
// };

function Page() {
  // const resultText =
  //   'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur eligendi, et fugit, ipsa magnam natus neque nihil optio ratione repellat soluta voluptatum. Animi aspernatur blanditiis cupiditate error harum labore, libero nulla officiis perferendis quaerat quam reprehenderit suscipit tenetur ullam voluptate voluptates voluptatum! Cumque eveniet facilis harum in molestias nam, nisi odio quaerat quod repellat, repellendus sed vero voluptatem.\nAliquid aut beatae debitis dolor dolore doloremque eius eum hic labore magnam modi molestiae nobis quaerat quibusdam quod, similique sint tenetur? Ab adipisci aliquam consectetur consequatur dolorem inventore, molestias nihil nostrum, quas quod ratione repellendus vitae voluptate. Ab accusantium alias aspernatur consectetur cumque dolores doloribus dolorum ducimus excepturi harum id impedit ipsam ipsum, itaque nemo neque nesciunt nisi officia omnis quae quisquam, quo quos! Aut hic mollitia nihil sint. Asperiores cupiditate dolor dolores eius fugiat nam recusandae rerum.\nAperiam at atque, consequatur dolorem dolorum eaque est eum eveniet exercitationem fugiat harum illo illum incidunt ipsa labore laudantium magni minima, minus molestiae nemo nisi odio odit pariatur perferendis quaerat quam quas qui quo reprehenderit saepe sint totam veniam veritatis. At consequatur eius nobis omnis reprehenderit vero. A amet animi atque culpa, eius id ipsum, minus nemo nobis ratione rem repellat similique sunt unde vitae voluptatem voluptatibus! A ab autem exercitationem expedita illum laborum quas vitae. Ducimus eum eveniet impedit modi neque nostrum numquam perspiciatis quibusdam quidem quis repudiandae tempora, unde.\nAccusamus aspernatur, aut commodi consequatur debitis, expedita itaque laborum, molestias non quaerat sint sit tenetur ullam! Debitis, ea eligendi eum fuga nisi nulla rem repellendus vero voluptate voluptatem. Architecto aspernatur blanditiis deleniti dolore itaque libero maiores natus omnis voluptates voluptatibus. Dolor dolores nostrum quis quos sed. Aliquam amet architecto at, culpa harum hic modi nobis obcaecati officia optio perferendis recusandae, sapiente sed ut veritatis.\nConsectetur debitis, deleniti dignissimos illum ipsam itaque libero nihil officia porro, provident quasi saepe sapiente tenetur totam, ut vel veniam! Ab amet aperiam assumenda beatae consectetur cumque distinctio dolor ea expedita explicabo id in laborum libero molestiae nesciunt odio, perspiciatis quidem quisquam repellendus repudiandae saepe sed, soluta tempora ullam voluptatum. Architecto autem consequuntur debitis dolore dolorem doloribus dolorum ducimus earum esse est eveniet, fugit harum id impedit incidunt inventore itaque laudantium maiores minima, nam nemo nihil omnis pariatur perferendis quia, quo quos ratione sequi soluta tempore velit veritatis voluptates voluptatibus. Aliquam amet deleniti eaque eligendi minima necessitatibus optio possimus ullam ut voluptate! Architecto fugit natus quibusdam vitae.\nAb alias aperiam, deserunt dignissimos distinctio dolor quis! Atque eius eligendi impedit ipsa labore magni maiores perspiciatis quas, quasi ratione rem sapiente tempore voluptatem! A harum obcaecati perferendis quae similique. Enim in libero magnam placeat possimus. Commodi doloremque earum eligendi itaque necessitatibus neque possimus. Accusantium aliquam, aspernatur aut consectetur, dicta nam nemo nesciunt nisi odit pariatur repellat repellendus, vel vitae. Alias, aperiam commodi consequatur culpa deserunt dolor eligendi enim ex excepturi ipsa maxime minus mollitia nemo nesciunt non quisquam repudiandae similique soluta totam ullam! Architecto, commodi corporis cum doloribus eius error eum impedit laborum laudantium molestiae nemo nihil nulla quam quibusdam ratione rem sequi? Amet asperiores consectetur dolore eum hic iste laborum, magnam magni neque perferendis porro, possimus, quo quos rem saepe velit voluptas! Accusantium ad, beatae dolore esse mollitia quae quos ut velit. Commodi cum, inventore modi quisquam voluptate voluptates! Atque impedit perferendis temporibus. Distinctio fugit impedit magnam placeat quas quos recusandae tempore. Accusantium aliquid aperiam architecto culpa doloribus enim eos et ex harum itaque labore laboriosam magnam molestias nam natus, non nostrum omnis porro quae quam quisquam, quos rem soluta! Alias blanditiis dolore doloremque hic praesentium recusandae soluta tempora tempore. Asperiores atque commodi cumque eaque eveniet exercitationem facilis libero modi necessitatibus nisi quae sunt tenetur unde, ut velit. Aliquid amet asperiores assumenda consectetur culpa cupiditate enim est facilis fuga incidunt iste labore magnam magni, nemo, nostrum nulla porro sequi ullam ut voluptas. Ab aliquam architecto consequatur culpa, doloribus ducimus est expedita molestias nisi officia, perspiciatis quae recusandae sed similique veniam. Atque consectetur cum distinctio ea facilis inventore libero magnam minima molestiae odio odit officiis quisquam quod, recusandae rem repellendus saepe sit soluta suscipit voluptatibus. Animi aperiam culpa cumque cupiditate deleniti dolores dolorum ea eos excepturi explicabo fugiat id in incidunt ipsa non numquam obcaecati quae, quia quo quod reprehenderit ut velit? Eos exercitationem id laudantium optio quas! Animi, autem consectetur consequuntur cumque debitis dolores eaque error fuga fugit impedit ipsum iste, maxime modi molestiae nemo neque numquam odio quasi quia quidem quisquam saepe velit voluptates. Deleniti eius nulla sequi totam? Accusantium alias amet aperiam cumque cupiditate dignissimos ducimus et ex expedita fuga harum id incidunt magnam magni nesciunt quisquam tempore temporibus, unde vel veritatis. Alias, aut consequatur eius impedit magni maiores necessitatibus non, nulla numquam officiis quis ratione, reiciendis tempora vero voluptatem? At culpa ex expedita explicabo inventore itaque nobis omnis praesentium repellendus sit! Aliquam animi assumenda atque consectetur deserunt distinctio, dolore dolorem doloremque eius hic labore libero molestias neque officiis, omnis quae quidem sequi vel. Amet autem dolorem dolorum eos, eveniet exercitationem id nostrum obcaecati odit officiis quos, rerum ullam unde. Ad autem delectus eos minus nam, nihil numquam, officiis pariatur perspiciatis praesentium quaerat quasi quidem totam ut veritatis. Cumque id quos sunt? Aspernatur cum dolorum ducimus iste iure libero numquam tenetur vitae. Alias aut dolor explicabo laboriosam magnam perspiciatis ullam vel. Aperiam beatae corporis deleniti eaque enim ipsam itaque, modi natus officiis porro provident quaerat quam quo sed totam. Aliquid animi, beatae consequuntur corporis, debitis eos et in minus nam odio optio quisquam sapiente? Ab, autem debitis dignissimos dolor dolorem ducimus eligendi et eum excepturi explicabo id inventore ipsum iusto laborum magnam maxime modi nihil odit officia possimus quae qui reprehenderit sunt suscipit vel velit vero voluptatibus. Accusantium consectetur deserunt distinctio ex exercitationem fugiat magni quae quas saepe sit! Ab culpa dolor error id laboriosam libero mollitia omnis temporibus? Asperiores consequatur, debitis excepturi exercitationem, ipsum mollitia nam porro quidem reiciendis suscipit tempore ut vitae voluptatem voluptatibus, voluptatum. Animi cupiditate, deserunt dicta error officiis velit! Ducimus est laudantium, maiores nulla omnis praesentium quam reiciendis totam. Consequuntur doloribus illo rem!';

  return (
    <div className="">
      dd
      {/* <Topic /> */}
      {/* <section className="h-[48.5vh] max-h-[48.5vh] min-h-[48.5vh] w-3/4 self-center justify-self-center overflow-y-scroll scrollbar-hide"> */}
      {/*  {resultText.split('\n').map((line, index) => ( */}
      {/*    <p */}
      {/*      key={index} */}
      {/*      className="bg-note h-full w-full overflow-hidden border-2 border-primary-700 px-1 leading-loose outline-none " */}
      {/*    > */}
      {/*      {line} */}
      {/*    </p> */}
      {/*  ))} */}
      {/* </section> */}
    </div>
  );
}

export default Page;
