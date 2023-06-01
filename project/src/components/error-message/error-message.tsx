import {useAppSelector} from '../../hooks';

function ErrorMessage(): JSX.Element | null {
  const {error} = useAppSelector((state) => state);
  return (error)
    ? (
      <div className="modal is-active modal--narrow">
        <div className="modal__wrapper">
          <div className="modal__overlay"></div>
          <div className="modal__content">
            <p className="title title--h4">{error}</p>
            <svg className="modal__icon" width="80" height="78" aria-hidden="true">
              <use xlinkHref="#icon-review-success"></use>
            </svg>
            <div className="modal__buttons">
              <button className="btn btn--purple modal__btn modal__btn--fit-width" type="button">Вернуться к покупкам
              </button>
            </div>
          </div>
        </div>
      </div>
    )
    : null;

}

export default ErrorMessage;
