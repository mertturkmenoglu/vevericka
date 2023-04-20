import { useMemo } from 'react';
import { differenceInMonths, format, formatDistanceToNowStrict } from 'date-fns';
import { enUS } from 'date-fns/locale';

export function useFormattedDate(dateString: string): string {
  const formattedDate = useMemo(() => {
    const currentDate = new Date();
    const postDate = new Date(dateString);

    if (differenceInMonths(currentDate, postDate) > 1) {
      const formatString = differenceInMonths(currentDate, postDate) > 12 ? 'MMM d, yyyy' : 'MMM d';
      return format(postDate, formatString);
    }

    return formatDistanceToNowStrict(new Date(dateString), { locale: enUS, addSuffix: true });
  }, [dateString]);

  return formattedDate;
}
