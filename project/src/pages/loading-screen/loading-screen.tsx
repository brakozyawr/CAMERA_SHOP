import { createUseStyles } from 'react-jss';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call
const useStyles = createUseStyles({
  loader: {
    width: '60px',
    height: '60px',
    display: 'block',
    margin: '20px auto',
    background: 'radial-gradient(ellipse at center, #6ebeff 69%, rgba(0, 0, 0, 0) 70%), linear-gradient(to right, rgba(0, 0, 0, 0) 47%, #6ebeff 48%, #6ebeff 52%, rgba(0, 0, 0, 0) 53%)',
    backgroundSize: '20px 20px , 20px auto',
    backgroundRepeat:' repeat-x',
    backgroundPosition: 'center bottom, center -5px',
    boxSizing: 'border-box',
    position: 'absolute',
    top: '40%',
    left: 'calc(50% - 30px)',
    '&:before': {
      content: '""',
      boxSizing: 'border-box',
      position: 'absolute',
      left: '-20px',
      top: '0',
      width: '20px',
      height: '60px',
      background: 'radial-gradient(ellipse at center, #6ebeff 69%, rgba(0, 0, 0, 0) 70%), linear-gradient(to right, rgba(0, 0, 0, 0) 47%, #6ebeff 48%, #6ebeff 52%, rgba(0, 0, 0, 0) 53%)',
      backgroundSize: '20px 20px , 20px auto',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center bottom, center -5px',
      transform: 'rotate(0deg)',
      transformOrigin: '50% 0%',
      animation: 'animPend 1s linear infinite alternate',
      animationName: '$animPend',
    },
    '&:after': {
      content: '""',
      boxSizing: 'border-box',
      position: 'absolute',
      top: '0',
      width: '20px',
      height: '60px',
      background: 'radial-gradient(ellipse at center, #6ebeff 69%, rgba(0, 0, 0, 0) 70%), linear-gradient(to right, rgba(0, 0, 0, 0) 47%, #6ebeff 48%, #6ebeff 52%, rgba(0, 0, 0, 0) 53%)',
      backgroundSize: '20px 20px , 20px auto',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center bottom, center -5px',
      transform: 'rotate(0deg)',
      transformOrigin: '50% 0%',
      animation: 'animPend2 1s linear infinite alternate',
      animationName: '$animPend2',
      left: '100%',
    },

  },
  '@keyframes animPend': {
    '0%': {transform: 'rotate(22deg)'},
    '50%': {transform: 'rotate(0deg)'}
  },
  '@keyframes animPend2': {
    '0%': { transform: 'rotate(0deg)'},
    '55%': { transform: 'rotate(0deg)'},
    '100%': { transform: 'rotate(-22deg)'}
  }
});

function LoadingScreen(): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
  const classes = useStyles();

  return (
    <div style={{position: 'absolute', top: '0', left: '0', width: '100vw', height: '100vh', backgroundColor: '#fff'}} data-testid="loader">
      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access */}
      <span className={classes.loader}/>
    </div>
  );
}

export default LoadingScreen;
