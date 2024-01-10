import React, { Dispatch, SetStateAction, useState } from 'react';

import { DeadlineField } from './styles';

import { ReactComponent as DeadlineDate } from '@assets/images/deadlineCheck.svg';
import { ReactComponent as StartDate } from '@assets/images/startDate.svg';
import { formatDate } from '@utils/formatDate';

interface IProps {
  dateRange: string[];
  setDateRange: Dispatch<SetStateAction<string[]>>;
}

function DateRange({ dateRange, setDateRange }: IProps) {
  const today = new Date();
  const [checkDeadline, setCheckDeadline] = useState<boolean>(dateRange[0] !== '' && dateRange[1] !== '');

  const changeStartDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateRange((prev) => {
      if (prev[1] < e.target.value) {
        return [e.target.value, e.target.value];
      }
      return [e.target.value, prev[1]];
    });
  };

  const changeEndDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateRange((prev) => {
      if (prev[0] > e.target.value) {
        return [e.target.value, e.target.value];
      }

      return [prev[0], e.target.value];
    });
  };

  return (
    <DeadlineField>
      <div className="deadline-label">
        <input
          type="checkbox"
          checked={checkDeadline}
          onChange={() => {
            setCheckDeadline((prev) => !prev);
            if (checkDeadline) {
              setDateRange(['', '']);
            } else {
              setDateRange([formatDate(today), formatDate(today)]);
            }
          }}
        />
        <div className="label-name">기간</div>
      </div>
      {checkDeadline && (
        <>
          <div className="deadline-prop">
            <div className="prop-name-container">
              <StartDate width="1rem" height="1rem" />
              <div className="prop-name">시작일</div>
            </div>
            <input type="date" value={dateRange[0] || formatDate(today)} onChange={changeStartDate} />
          </div>
          <div className="deadline-prop">
            <div className="prop-name-container">
              <DeadlineDate width="1rem" height="1rem" />
              <div className="prop-name">종료일</div>
            </div>
            <input type="date" value={dateRange[1] || formatDate(today)} onChange={changeEndDate} />
          </div>
        </>
      )}
    </DeadlineField>
  );
}

export default DateRange;
