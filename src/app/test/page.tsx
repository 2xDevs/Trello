// // import {
// //   addTodo,
// //   editTodo,
// //   getTodo,
// //   TodoType,
// //   UpdateFieldsType,
// // } from "@/server/utils";
// // import { getServerSession } from "next-auth";

// import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
// import { getServerSession } from "next-auth";

// // export default async function TestPage() {
// //   let result;
// //   const session = await getServerSession();
// //   if (session?.user?.name) {
// //     const todo: TodoType = {
// //       title: "yoooooooooooooooovdsvsd s fr rg er e  ergergerg egrg ",
// //       description: "Hello whatsappp ",
// //       status: "To Do",
// //       priority: "Low",
// //       deadline: new Date(),
// //       user: "66aa31a64107e7834f0e81f2",
// //       content: "ceio colci jocc oic dspsdc spdc sp",
// //     };
// //     result = await addTodo("66aa31a64107e7834f0e81f2", todo);
// //     console.log(result);
// //   }

// //   return <div>{JSON.stringify(result)}</div>;
// // }
// export default async function test() {
//   const session = await getServerSession();
//   return (
//     <div className="h-screen bg-slate-300 text-2xl">
//       Hello{JSON.stringify(session?.user)}
//     </div>
//   );
// }
