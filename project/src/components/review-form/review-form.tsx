import {useAppDispatch} from '../../hooks';
import {ChangeEvent, FormEvent, useRef, useState} from 'react';
import {TReviewAdd} from '../../types/types';
import {addCommentAction} from '../../store/api-actions';

type ReviewFormProps = {
  productId: number | null;
  setReviewPopupState: (reviewPopupState: boolean) => void;
  setReviewSuccessPopupState: (reviewSuccessPopupState: boolean) => void;
}

function ReviewForm({productId, setReviewPopupState, setReviewSuccessPopupState}:ReviewFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [isDisabledSubmit, setDisabledSubmit] = useState(true);
  const [formData, setFormData] = useState({
    userName: '',
    advantage: '',
    disadvantage: '',
    review: '',
    rating: 0,
  });

  const form = useRef<HTMLFormElement | null >(null);

  const fieldChangeHandle = (evt:ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const {name, value} = evt.target;
    setFormData({...formData, [name]: value});

    const isDisabled = Boolean(formData.rating) &&
      Boolean(formData.userName.length) &&
      Boolean(formData.advantage.length) &&
      Boolean(formData.disadvantage.length) &&
      Boolean(formData.review.length) ;
    setDisabledSubmit(!isDisabled);
  };

  const onSubmit = (CommentData: TReviewAdd) => {
    dispatch(addCommentAction(CommentData));
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
    setDisabledSubmit(true);
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!isDisabledSubmit) {
      onSubmit({
        cameraId: Number(productId),
        userName: formData.userName,
        advantage: formData.advantage,
        disadvantage: formData.disadvantage,
        review: formData.review,
        rating: Number(formData.rating),
      });
    }
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
            <form method="post" onSubmit={handleSubmit} ref={form}>
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
                      <span className="rate__stars">0</span>
                      <span>/</span>
                      <span className="rate__all-stars" >5</span>
                    </div>
                  </div>
                  <p className="rate__message">Нужно оценить товар</p>
                </fieldset>
                <div className="custom-input form-review__item">
                  <label>
                    <span className="custom-input__label">
                      Ваше имя
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"/>
                      </svg>
                    </span>
                    <input
                      type="text"
                      name="userName"
                      placeholder="Введите ваше имя"
                      required
                      onChange={fieldChangeHandle}
                    />
                  </label>
                  <p className="custom-input__error">Нужно указать имя</p>
                </div>
                <div className="custom-input form-review__item">
                  <label>
                    <span className="custom-input__label">
                      Достоинства
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"/>
                      </svg>
                    </span>
                    <input
                      type="text"
                      name="advantage"
                      placeholder="Основные преимущества товара"
                      required
                      onChange={fieldChangeHandle}
                    />
                  </label>
                  <p className="custom-input__error">Нужно указать достоинства</p>
                </div>
                <div className="custom-input form-review__item">
                  <label>
                    <span className="custom-input__label">Недостатки
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"/>
                      </svg>
                    </span>
                    <input
                      type="text"
                      name="disadvantage"
                      placeholder="Главные недостатки товара"
                      required
                      onChange={fieldChangeHandle}
                    />
                  </label>
                  <p className="custom-input__error">Нужно указать недостатки</p>
                </div>
                <div className="custom-textarea form-review__item">
                  <label>
                    <span className="custom-textarea__label">
                      Комментарий
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"/>
                      </svg>
                    </span>
                    <textarea
                      name="review"
                      minLength={5}
                      placeholder="Поделитесь своим опытом покупки"
                      required
                      onChange={fieldChangeHandle}
                    />
                  </label>
                  <div className="custom-textarea__error">Нужно добавить комментарий</div>
                </div>
              </div>
              <button className="btn btn--purple form-review__btn" type="submit" disabled={isDisabledSubmit}>Отправить отзыв</button>
            </form>
          </div>
          <button
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
