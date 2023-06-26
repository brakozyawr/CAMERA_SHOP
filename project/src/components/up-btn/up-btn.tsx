

function UpBtn(): JSX.Element {
  return (
    <div
      className="up-btn"
      onClick = {() => {
        window.scrollTo({top: 0,behavior: 'smooth'});
      }}
    >
      <svg width="12" height="18" aria-hidden="true">
        <use xlinkHref="#icon-arrow2"/>
      </svg>
    </div>
  );
}

export default UpBtn;
