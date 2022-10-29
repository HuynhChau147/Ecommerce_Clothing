import { useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { RiImageAddLine } from 'react-icons/ri';
import { toast } from 'react-toastify';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';

import { CategoryModel } from '../../../Model/categoryModel';
import imageCategory from '../../../utils/imageCategory';
import FormInput from '../../FormInput/FormInput';
import Modal from '../../Modal/Modal';
import Button from '../../UI/Button/Button';

type UpdateCategoryModalProps = {
  category: CategoryModel;
  onUpdate: () => void;
  onClose: () => void;
};

const UpdateCategoryModal = ({
  category,
  onUpdate,
  onClose,
}: UpdateCategoryModalProps) => {
  const axiosPrivate = useAxiosPrivate();
  const [categoryName, setCategoryName] = useState(category.name);
  const [imageCover, setImageCover] = useState<any>();
  const nameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(e.target.value);
  };

  const imageCoverChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file: any = e.target.files[0];
      const url = URL.createObjectURL(file);

      setImageCover({ file, url });
    }
  };
  const removeImagePreview = () => {
    setImageCover(null);
  };

  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();

    categoryName && formData.append('name', categoryName);
    imageCover &&
      formData.append('imageCover', imageCover.file, imageCover.file.name);

    try {
      const res = await axiosPrivate.patch(
        `categories/${category._id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (res.status === 200) {
        toast.success('Update Success ✔');
        onUpdate();
        onClose();
      }
    } catch (error) {}
  };

  return (
    <Modal className="create-category-modal" onClose={onClose}>
      <form action="" onSubmit={formSubmitHandler}>
        <div className="row">
          <div className='col c-12"'>
            <FormInput
              label="name"
              value={categoryName}
              onChange={nameChangeHandler}
            />
          </div>
        </div>
        <div className="create-category__upload row">
          <div>
            <h4>Images:</h4>
            <input
              type="file"
              accept="image/*"
              id="images"
              onChange={imageCoverChangeHandler}
            />
            <div className="create-category__image-label">
              <label htmlFor="images">
                Provide category image cover
                <RiImageAddLine />
              </label>
            </div>
          </div>
          <div className="create-category__image-preview">
            {imageCover ? (
              <div>
                <img src={imageCover.url} alt="" />
                <div onClick={removeImagePreview}>
                  <AiOutlineCloseCircle />
                </div>
              </div>
            ) : (
              <div>
                <img src={imageCategory(category.imageCover)} alt="" />
                <div>
                  <AiOutlineCloseCircle />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="row create-category__cta">
          <Button
            type="button"
            className="btn--round btn--outline btn--shadow"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button className="btn--round btn--shadow btn--yellow">Update</Button>
        </div>
      </form>
    </Modal>
  );
};
export default UpdateCategoryModal;