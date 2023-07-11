import {useEffect, useRef} from 'react';

type ReviewSuccessProps = {
  setReviewSuccessPopupState: (reviewSuccessPopupState: boolean) => void;
}

function ReviewSuccess({setReviewSuccessPopupState}:ReviewSuccessProps): JSX.Element {
  const modal = useRef<HTMLButtonElement | null >(null);

  useEffect(() => {
    const onKeyDownEsc = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        setReviewSuccessPopupState(false);
      }
    };
    document.addEventListener('keydown', onKeyDownEsc);
    document.body.classList.add('scroll-lock');

    const onFocus = ( evt: FocusEvent ) => {
      const element = evt.target as HTMLElement;
      if (modal.current && !modal.current.contains(element) ) {
        evt.stopPropagation();
        modal.current.focus();
      }
    };

    if(modal.current !== null){
      modal.current.setAttribute('tabindex', '0');
      modal.current.focus();
      document.addEventListener('focus', onFocus, true);
    }

    return () => {
      document.removeEventListener('keydown', onKeyDownEsc);
      document.body.classList.remove('scroll-lock');
      document.removeEventListener('focus', onFocus, true);
      document.body.focus();
    };

  }, []);

  return (
    <div className="modal is-active modal--narrow">
      <div className="modal__wrapper">
        <div
          className="modal__overlay"
          onClick={()=>{
            setReviewSuccessPopupState(false);
          }}
        />
        <div className="modal__content" >
          <p className="title title--h4">Спасибо за отзыв</p>
          <svg className="modal__icon" width="80" height="78" aria-hidden="true">
            <use xlinkHref="#icon-review-success"/>
          </svg>
          <div className="modal__buttons">
            <button ref={modal}
              className="btn btn--purple modal__btn modal__btn--fit-width"
              type="button"
              onClick={()=>{
                setReviewSuccessPopupState(false);
              }}
            >Вернуться к покупкам
            </button>
          </div>
          <button
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
            onClick={()=>{
              setReviewSuccessPopupState(false);
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

export default ReviewSuccess;
