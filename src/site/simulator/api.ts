import localforage from "localforage";

// localforage.clear();

export type User = {
  id?: string;
  name: string;
  email?: string;
  backstory?: string;
}


export function setUser(user: User) {
  return localforage.setItem("user", user);
}

export async function getUser(): Promise<User[]> {
  let user = await localforage.getItem<User[]>("user");
  if (!user) user = [];
  return user;
}

export function createUser(user: User){
  let id = Math.random().toString(36).substring(2, 9);
  user.id = id;
  return localforage.setItem("user", user);
}
