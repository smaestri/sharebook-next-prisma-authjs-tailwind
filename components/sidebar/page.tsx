import SideBarView from "./SideBarView";
export default async function SideBarPage({}) {


//   select c.name,
//     count(b.category_id)
// from category c
// left join book b on c.id = b.category_id
// group by c.name

  //  const { data: categories, error } = await supabase.
  //   from("category")
  //   .select("name, category(count)");
  //   console.log('categories', categories)

  // const { data: categories} = await supabase.rpc('hello_world')

  // TODO FETCH CATEGORIES
  const categories =[{id:1, name:"test", count:1}]

  // if (!categories) {
  //   return null;
  // }

 

  return (<SideBarView categories={categories}/>)
}
