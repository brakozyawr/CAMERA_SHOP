import {useAppDispatch} from '../../hooks';
import {ChangeEvent, useEffect, useRef, useState} from 'react';
import {TReviewAdd} from '../../types/types';
import {addReviewAction} from '../../store/api-actions';
import {useForm} from 'react-hook-form';

type ReviewFormProps = {
  productId: number | null;
  setReviewPopupState: (reviewPopupState: boolean) => void;
  setReviewSuccessPopupState: (reviewSuccessPopupState: boolean) => void;
}

function ReviewForm({productId, setReviewPopupState, setReviewSuccessPopupState}:ReviewFormProps): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const onKeyDownEsc = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        setReviewPopupState(false);
      }
    };
    document.addEventListener('keydown', onKeyDownEsc);
    document.body.classList.add('scroll-lock');
    return () => {
      document.removeEventListener('keydown', onKeyDownEsc);
      document.body.classList.remove('scroll-lock');
    };

  }, [setReviewPopupState]);

  const [formData, setFormData] = useState({
    userName: '',
    advantage: '',
    disadvantage: '',
    review: '',
    rating: 0,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const form = useRef<HTMLFormElement | null >(null);

  const fieldChangeHandle = (evt:ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const {name, value} = evt.target;
    setFormData({...formData, [name]: value});
  };

  const onSubmit = (ReviewData: TReviewAdd) => {
    dispatch(addReviewAction(ReviewData));
  };

  const resetForm = () => {
    if(form.current){
      form.current.reset();
    }
    setFormData({
      userName: '',
      advantage: '',
      disadvantage: '',
      review: '',
      rating: 0,
    });
  };

  const submitForm = () => {
    onSubmit({
      cameraId: Number(productId),
      userName: formData.userName,
      advantage: formData.advantage,
      disadvantage: formData.disadvantage,
      review: formData.review,
      rating: Number(formData.rating),
    });

    setReviewPopupState(false);
    setReviewSuccessPopupState(true);
    resetForm();
  };


  return (
    <div className="modal is-active">
      <div className="modal__wrapper">
        <div
          className="modal__overlay"
          onClick={()=>{
            setReviewPopupState(false);
          }}
        />
        <div className="modal__content">
          <p className="title title--h4">Оставить отзыв</p>
          <div className="form-review">
            {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
            <form method="post" onSubmit={handleSubmit(submitForm)} ref={form}>
              <div className="form-review__rate">
                <fieldset className="rate form-review__item">
                  <legend className="rate__caption">Рейтинг
                    <svg width="9" height="9" aria-hidden="true">
                      <use xlinkHref="#icon-snowflake"/>
                    </svg>
                  </legend>
                  <div className="rate__bar">
                    <div className="rate__group">
                      <input

                        className="visually-hidden"
                        id="star-5"
                        name="rating"
                        type="radio"
                        value="5"
                        onChange={fieldChangeHandle}
                      />
                      <label className="rate__label" htmlFor="star-5" title="Отлично"/>
                      <input

                        className="visually-hidden"
                        id="star-4"
                        name="rating"
                        type="radio"
                        value="4"
                        onChange={fieldChangeHandle}
                      />
                      <label className="rate__label" htmlFor="star-4" title="Хорошо"/>
                      <input

                        className="visually-hidden"
                        id="star-3"
                        name="rating"
                        type="radio"
                        value="3"
                        onChange={fieldChangeHandle}
                      />
                      <label className="rate__label" htmlFor="star-3" title="Нормально"/>
                      <input

                        className="visually-hidden"
                        id="star-2"
                        name="rating"
                        type="radio"
                        value="2"
                        onChange={fieldChangeHandle}
                      />
                      <label className="rate__label" htmlFor="star-2" title="Плохо"/>
                      <input
                        {...register('rating', { required: true })}
                        className="visually-hidden"
                        id="star-1"
                        name="rating"
                        type="radio"
                        value="1"
                        onChange={fieldChangeHandle}
                      />
                      <label className="rate__label" htmlFor="star-1" title="Ужасно"/>
                    </div>
                    <div className="rate__progress">
                      <span className="rate__stars">{formData.rating}</span>
                      <span>/</span>
                      <span className="rate__all-stars" >5</span>
                    </div>
                  </div>
                  {Boolean(errors.rating) && <p className="rate__message">Нужно оценить товар</p>}
                </fieldset>
                <div className={`${errors.userName ? 'is-invalid' : ''} custom-input form-review__item`}>
                  <label>
                    <span className="custom-input__label">
                      Ваше имя
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"/>
                      </svg>
                    </span>
                    <input
                      {...register('userName', { required: true })}
                      type="text"
                      name="userName"
                      data-testid="userName"
                      placeholder="Введите ваше имя"
                      onChange={fieldChangeHandle}
                    />
                  </label>
                  {errors.userName && <p className="custom-input__error">Нужно указать имя</p>}
                </div>
                <div className={`${errors.advantage ? 'is-invalid' : ''} custom-input form-review__item`}>
                  <label>
                    <span className="custom-input__label">
                      Достоинства
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"/>
                      </svg>
                    </span>
                    <input
                      {...register('advantage', { required: true })}
                      type="text"
                      name="advantage"
                      data-testid="advantage"
                      placeholder="Основные преимущества товара"
                      onChange={fieldChangeHandle}
                    />
                  </label>
                  {errors.advantage && <p className="custom-input__error">Нужно указать достоинства</p>}
                </div>
                <div className={`${errors.disadvantage ? 'is-invalid' : ''} custom-input form-review__item`}>
                  <label>
                    <span className="custom-input__label">Недостатки
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"/>
                      </svg>
                    </span>
                    <input
                      {...register('disadvantage', { required: true })}
                      type="text"
                      name="disadvantage"
                      data-testid="disadvantage"
                      placeholder="Главные недостатки товара"
                      onChange={fieldChangeHandle}
                    />
                  </label>
                  {errors.disadvantage && <p className="custom-input__error">Нужно указать недостатки</p>}
                </div>
                <div className={`${errors.review ? 'is-invalid' : ''} custom-textarea form-review__item`}>
                  <label>
                    <span className="custom-textarea__label">
                      Комментарий
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"/>
                      </svg>
                    </span>
                    <textarea
                      {...register('review', { required: true })}
                      name="review"
                      data-testid="review"
                      minLength={5}
                      placeholder="Поделитесь своим опытом покупки"
                      onChange={fieldChangeHandle}
                    />
                  </label>
                  {errors.review && <div className="custom-textarea__error">Нужно добавить комментарий</div>}
                </div>
              </div>
              <button data-testid="submit-button" className="btn btn--purple form-review__btn" type="submit" >Отправить отзыв</button>
            </form>
          </div>
          <button
            data-testid="close-button"
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
            onClick={()=>{
              setReviewPopupState(false);
            }}
          >
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReviewForm;
