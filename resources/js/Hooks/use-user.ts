import User from "@/Models/User";
import { usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { MiddlewareProps } from "@/Types";

const useUser = () => {
    const pageProps = usePage<MiddlewareProps>().props;
    const [user, setUser] = useState<User | undefined>(pageProps.authUser);

    useEffect(() => {
        setUser(pageProps.authUser);
    }, [pageProps]);

    return {
        user: user,
        setUser: setUser,
    };
};

export default useUser;
