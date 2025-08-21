import ResturantDetailsPage from "@/module/resturant/pages/ResturantDetails";

interface ResturantPageProps {
  params: Promise<{ slug: string }>;
}

const ResturantDetails = async ({ params }: ResturantPageProps) => {

  const { slug } = await params;

  return <ResturantDetailsPage slug={slug} />;
};

export default ResturantDetails;
