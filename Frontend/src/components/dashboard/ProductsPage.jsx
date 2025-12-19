import React, { useState, useEffect } from 'react';
import DashboardLayout from '../layout/DashboardLayout';
import EmptyState from '../ui/EmptyState';
import AddProductModal from './AddProductModal';
import DeleteModal from './DeleteModal';
import ProductCard from './ProductCard';
import Button from '../ui/Button';

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
} from '../../api/productApi';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('Published');

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Failed to fetch products', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const displayedProducts = products.filter(p =>
    activeTab === 'Published' ? p.isPublished : !p.isPublished
  );

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEdit = (product) => {
    setEditingProduct(product);
    setIsFormModalOpen(true);
  };

  const handleSaveProduct = async (productData) => {
    try {
      if (editingProduct) {
        await updateProduct(editingProduct._id, productData);
      } else {
        await createProduct({
          ...productData,
          isPublished: activeTab === 'Published'
        });
      }
      fetchProducts();
    } catch (error) {
      console.error('Save failed', error);
    }
  };

  const handleOpenDelete = (product) => {
    setProductToDelete(product);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteProduct(productToDelete._id);
      fetchProducts();
      setDeleteModalOpen(false);
      setProductToDelete(null);
    } catch (error) {
      console.error('Delete failed', error);
    }
  };

  const handleTogglePublish = async (product) => {
    try {
      await updateProduct(product._id, {
        isPublished: !product.isPublished
      });
      fetchProducts();
    } catch (error) {
      console.error('Publish toggle failed', error);
    }
  };

  const tabsContainerStyle = {
    display: 'flex',
    gap: '24px',
    borderBottom: '1px solid #e0e0e0',
    marginBottom: '24px'
  };

  const getTabStyle = (tabName) => ({
    padding: '12px 0',
    cursor: 'pointer',
    fontWeight: '500',
    color: activeTab === tabName ? 'var(--primary-color)' : '#888',
    borderBottom: activeTab === tabName ? '2px solid var(--primary-color)' : '2px solid transparent'
  });

  const headerActionsStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '24px'
  };

  const hasContent = displayedProducts.length > 0;

  return (
    <DashboardLayout>
      <div style={headerActionsStyle}>
        <h2 style={{ fontSize: '24px' }}>Products</h2>
        <div style={{ width: '160px' }}>
          <Button onClick={handleOpenAdd}>+ Add Products</Button>
        </div>
      </div>

      <div style={tabsContainerStyle}>
        <div style={getTabStyle('Published')} onClick={() => setActiveTab('Published')}>Published</div>
        <div style={getTabStyle('Unpublished')} onClick={() => setActiveTab('Unpublished')}>Unpublished</div>
      </div>

      {!hasContent ? (
        <EmptyState
          title="No Products Found"
          description="Create your first product"
          actionLabel="Add Product"
          onAction={handleOpenAdd}
        />
      ) : (
        <div style={gridStyle}>
          {displayedProducts.map(p => (
            <ProductCard
              key={p._id}
              product={p}
              isPublished={p.isPublished}
              onEdit={handleOpenEdit}
              onDelete={handleOpenDelete}
              onTogglePublish={handleTogglePublish}
            />
          ))}
        </div>
      )}

      <AddProductModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSave={handleSaveProduct}
        initialData={editingProduct}
      />

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        productName={productToDelete?.name}
      />
    </DashboardLayout>
  );
};

export default ProductsPage;
