import React, {lazy, Suspense} from 'react';

const ProductCatalog = lazy(() => import('components/ProductCatalog'));

export const App = () => {
    return (
        <Suspense>
            <ProductCatalog />
        </Suspense>
    );
};

export default App;