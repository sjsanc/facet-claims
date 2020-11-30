import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import axios, { AxiosResponse } from "axios";
import { User } from "../../server/models/User.model";

export const context = createContext<Partial<User>>({});

export default function Context(props: PropsWithChildren<any>) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    axios
      .get(`/getcurrentuser`, { withCredentials: true })
      .then((res: AxiosResponse) => {
        setUser(res.data);
      });
  }, []);

  return <context.Provider value={user!}>{props.children}</context.Provider>;
}
