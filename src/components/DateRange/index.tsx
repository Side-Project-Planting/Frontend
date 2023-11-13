import React, { Dispatch, SetStateAction, useState } from 'react';

import { DeadlineField } from './styles';

import { ReactComponent as DeadlineDate } from '@assets/images/deadlineCheck.svg';
import { ReactComponent as StartDate } from '@assets/images/startDate.svg';

interface IProps {
  setDateRange: Dispatch<SetStateAction<string[] | null>>;
}

function DateRange({ setDateRange }: IProps) {
  const today = new Date();
  const [checkDeadline, setCheckDeadline] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<string>(
    [today.getFullYear(), today.getMonth() + 1, today.getDate()].join('-'),
  );
  const [endDate, setEndDate] = useState<string>(startDate);

  const changeStartDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value > endDate) {
      setEndDate(e.currentTarget.value);
    }
    setStartDate(e.currentTarget.value);
    setDateRange((prev) => {
      if (prev === null) {
        return [startDate, ''];
      }
      return [startDate, prev[1]];
    });
  };

  const changeEndDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value < startDate) {
      setStartDate(e.currentTarget.value);
    }
    setEndDate(e.currentTarget.value);
    setDateRange((prev) => {
      if (prev === null) {
        return ['', endDate];
      }
      return [prev[0], endDate];
    });
  };

  return (
    <DeadlineField>
      <div className="deadline-label">
        <input type="checkbox" checked={checkDeadline} onChange={() => setCheckDeadline((prev) => !prev)} />
        <div className="label-name">기간</div>
      </div>
      {checkDeadline && (
        <>
          <div className="deadline-prop">
            <div className="prop-name-container">
              <StartDate width="1rem" height="1rem" />
              <div className="prop-name">시작일</div>
            </div>
            <input type="date" value={startDate} onChange={changeStartDate} />
          </div>
          <div className="deadline-prop">
            <div className="prop-name-container">
              <DeadlineDate width="1rem" height="1rem" />
              <div className="prop-name">종료일</div>
            </div>
            <input type="date" value={endDate} onChange={changeEndDate} />
          </div>
        </>
      )}
    </DeadlineField>
  );
}

export default DateRange;
