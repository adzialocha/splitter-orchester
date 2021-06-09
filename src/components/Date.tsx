import { format, parseISO } from 'date-fns';
import React from 'react';

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
