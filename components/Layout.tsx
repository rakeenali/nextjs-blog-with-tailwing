import Head from "next/head";
import Header from "./Header";

type Props = {
  title?: string;
  keywords?: string;
  description?: string;
};

const Layout: React.FC<Props> = ({
  title = "Welcome To My Blog",
  children,
  description = "development, coding, programming",
  keywords = "The best info and news for technology",
}) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="keywords" content={keywords} />
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="container mx-auto my-7">{children}</main>
    </div>
  );
};

export default Layout;
