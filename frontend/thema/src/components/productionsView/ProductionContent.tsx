type ProductionContentProps = {
  productionId: number;
};

function ProductionContent({
  productionId,
}: ProductionContentProps): React.ReactElement {
  return <div>{productionId}</div>;
}

export default ProductionContent;
