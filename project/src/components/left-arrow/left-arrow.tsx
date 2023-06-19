
function LeftArrow(): JSX.Element {
  return (
    <button className="slider-controls slider-controls--prev" aria-label="Предыдущий слайд" data-direction="left">
      <svg width="7" height="12" aria-hidden="true">
        <use xlinkHref="#icon-arrow"></use>
      </svg>
    </button>
  );
}

export default LeftArrow;
