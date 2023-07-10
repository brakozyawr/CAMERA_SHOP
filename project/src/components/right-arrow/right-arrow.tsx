
function RightArrow(): JSX.Element {
  return (
    <button className="slider-controls slider-controls--next" aria-label="Следующий слайд" data-direction="right" >
      <svg width="7" height="12" aria-hidden="true">
        <use xlinkHref="#icon-arrow"/>
      </svg>
    </button>
  );
}

export default RightArrow;
