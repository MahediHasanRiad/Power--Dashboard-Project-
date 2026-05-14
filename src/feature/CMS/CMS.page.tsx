import { CMSCard } from "./components/cms-card";
import ContentEditor from "./components/ContentEditor";





function CMSpage() {
  return (
    <section className="">
      {/* top part  */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full p-6">
        {/* Header Section */}
        <div className="md:col-span-12 lg:col-span-6">
          <h1 className="text-white text-3xl font-bold tracking-tight">
            CMS Management
          </h1>
        </div>

        {/* Cards Grid */}
        <div className="md:col-span-12 lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <CMSCard
            title="Privacy Policy"
            description="Last updated: 2 days ago"
            border={true}
          />
          <CMSCard
            title="Terms of Service"
            description="Last updated: 5 days ago"
          />
          <CMSCard
            title="Cookie Policy"
            description="Last updated: 1 week ago"
          />
        </div>
      </section>


      {/* content body  */}
      <section>
        <ContentEditor />
      </section>
    </section>
  );
}

export default CMSpage;
