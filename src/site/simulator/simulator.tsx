import { redirect, ActionFunctionArgs, LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { setUser, getUser, User } from "./api";
import Scene from "./scene";
import NewPlayer from "./new-player/new-player";
import Interface from "./interface/interface";
import './simulator.css'
// import './interface.css'

export default function Simulator() {
  const user = useLoaderData() as User[];
  console.log('user: ', user);


  return (
      <>  
      <div className="simulator">
        <NewPlayer />
        <Scene />
        <Interface />
      </div>
    </>
  );
}

export async function loader(args: LoaderFunctionArgs) {
  console.log('user loader args: ', args);
  const user = await getUser();
  if (!user) return false;
  // if (!user) throw new Response("", { status: 404 });
  return user;
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  console.log('create user formdata: ', formData);
  const name = formData.get("playerName") as string
  return await setUser({ name }); // todo have some default values
}
