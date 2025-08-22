import ResturantDetailsUI from "@/module/resturant/pages/ResturantDetailsUI";

interface ResturantPageProps {
  params: Promise<{ slug: string }>;
}

const ResturantDetails = async ({ params }: ResturantPageProps) => {

  const { slug } = await params;

  return <ResturantDetailsUI slug={slug} />;
};

export default ResturantDetails;
