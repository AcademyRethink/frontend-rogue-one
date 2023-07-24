import FilterContainer from '../FiltersContainer';
import { SelectData } from '../../types/types';
import { CustomSelect } from '../Filter';
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from 'react';
import { getProductsFromInventory } from '../../services/inventory';

const EvolutionFilter = ({
  onChangeProductName,
  selectedProduct,
  parentId,
}: {
  onChangeProductName: ChangeEventHandler;
  selectedProduct: ChangeEvent<Element>;
  parentId: string;
}) => {
  const [products, setProducts] = useState<SelectData[]>();

  useEffect(() => {
    getProductsFromInventory({ cnpj: '00111222000133' })
      .then((resp) =>
        resp.map((el) => {
          return {
            label: el,
            value: el,
          };
        })
      )
      .then((result) => setProducts(result.slice(0, 10)))
      .catch((error) => alert(error));
  }, []);

  return (
    <div>
      <FilterContainer>
        <CustomSelect
          symbolClass="material-symbols-outlined"
          symbol="pill"
          data={products}
          onChangeFunction={onChangeProductName}
          selectValue={selectedProduct}
          parentId={parentId}
        />
      </FilterContainer>
    </div>
  );
};

export default EvolutionFilter;