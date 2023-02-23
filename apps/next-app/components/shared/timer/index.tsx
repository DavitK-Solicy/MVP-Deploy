import React, { useEffect, useMemo, useContext } from 'react';
import { TimerServiceContext } from 'utils/services/service/timerService';

enum Colors {
  Green = 'green',
  Yellow = 'yellow',
  Red = 'red',
}

const Timer = (): JSX.Element => {
  const { minutes, seconds, setMinutes } = useContext(TimerServiceContext);

  useEffect(() => {
    if (!minutes && minutes !== 0) {
      setMinutes(15);
    }
  }, []);

  const colorStyle = useMemo(
    () => ({
      color:
        minutes >= 10
          ? Colors.Green
          : 5 <= minutes && minutes < 10
          ? Colors.Yellow
          : Colors.Red,
    }),
    [minutes]
  );

  return (
    <span style={colorStyle}>
      {minutes}:{('0' + seconds).slice(-2)}
    </span>
  );
};

export default Timer;
