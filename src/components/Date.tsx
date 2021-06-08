import React from 'react';
import { parseISO, format } from 'date-fns';

type Props = {
  dateString: string;
};

export default function Date({ dateString }: Props): JSX.Element {
  return (
    <time dateTime={dateString}>
      {format(parseISO(dateString), 'dd.MM.yyyy')}
    </time>
  );
}
