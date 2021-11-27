import type { NextPage } from "next";
import Layout from "../components/Layout";

const AboutPage: NextPage = () => {
  return (
    <Layout title="About - My Blog">
      <h1 className="text-5xl border-b-4 pb-5 font-bold">About</h1>

      <div className="bg-white shadow-md rounded-lg px-10 py-6 mt-6">
        <h3 className="text-2xl mb-5">DevSpace Blog</h3>
        <p className="mb-3">This is a tutorial blog taken from Udemy Course</p>

        <p>
          <span className="font-bold">Rakeen</span>
        </p>
      </div>
    </Layout>
  );
};

export default AboutPage;
