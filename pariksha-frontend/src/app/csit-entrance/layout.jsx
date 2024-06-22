import Navbar from "@/components/Navbar";

export async function generateMetadata() {
  return {
    title: `FREE CSIT ENTRANCE PREPARATION - PARIKSHA`,
  };
}

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <div className="pt-20">{children}</div>
    </>
  );
}

export default Layout;
