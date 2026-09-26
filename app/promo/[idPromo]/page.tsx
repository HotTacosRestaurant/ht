import PromoLanding from "./PromoLanding";

type Props = {
  params: Promise<{ idPromo: string }>;
};

export default async function PromoPage({ params }: Props) {
  const { idPromo } = await params;
  return <PromoLanding idPromo={idPromo} />;
}
