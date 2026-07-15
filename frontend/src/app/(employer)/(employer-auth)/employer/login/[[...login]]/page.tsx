import SignInPage from "./SignIn";

type PageProps = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

const Page = ({ searchParams }: PageProps) => {
  const sessionParam = searchParams?.session;
  const sessionExpired = sessionParam === "expired";

  return <SignInPage sessionExpired={sessionExpired} />;
};

Page.displayName = "Login";
export default Page;