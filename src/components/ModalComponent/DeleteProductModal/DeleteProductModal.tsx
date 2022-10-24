import { toast } from 'react-toastify';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { ProductModel } from '../../../Model/productModel';

import Modal from '../../Modal/Modal';
import Button from '../../UI/Button/Button';
import './DeleteProductModal.scss';
type DeleteProductModalProps = {
  onClose: () => void;
  onDelete: () => void;
  product: ProductModel;
};

const DeleteProductModal = ({
  onClose,
  product,
  onDelete,
}: DeleteProductModalProps) => {
  const axiosPrivate = useAxiosPrivate();
  const deleteProductHandler = async () => {
    try {
      console.log(product._id);
      const res = await axiosPrivate.delete(`products/${product._id}`);
      if (res.status === 204) {
        toast('Delete Success');
        onDelete();
      }
      onClose();
    } catch (error) {
      toast.error('Something went wrong!! Please try again');
      console.log(error);
    }
  };

  return (
    <Modal onClose={onClose} className="delete-product-modal">
      <div>
        <span> Do you want to delete </span>
        <h4>{product.name}</h4>
      </div>
      <div>
        <Button className="btn--outline btn--round" onClick={onClose}>
          Cancel
        </Button>
        <Button className="btn--red btn--round" onClick={deleteProductHandler}>
          OK
        </Button>
      </div>
    </Modal>
  );
};
export default DeleteProductModal;