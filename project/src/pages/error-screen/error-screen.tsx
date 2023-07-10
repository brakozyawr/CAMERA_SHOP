import {Helmet} from 'react-helmet-async';


function ErrorScreen(): JSX.Element {
  return (
    <main style={{justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
      <Helmet>
        <title>Ошибка - Фотошоп</title>
      </Helmet>
      <div className="page-content" style={{justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
        <h1 className="title title--h1">Ошибка!</h1>
        <h1 className="title title--h1">Что-то пошло не так (((</h1>
        <h2 className="title title--h2">попробуйте позже</h2>
      </div>
    </main>

  );
}

export default ErrorScreen;
