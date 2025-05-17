''' datetime utils'''

import calendar
from datetime   import datetime
from typing     import List, Optional

class DateTimeUtils:
    '''Date time utils for the cassini APIs'''
    @staticmethod
    def get_last_n_years(n: int = 1) -> List[str]:
        """
        Return the last n calendar years (including the year of ref_date).
        e.g. get_last_n_years(2, datetime(2025,5,16)) -> ['2024','2025']
        """
        ref = datetime.now()
        return [f"{(ref.year - i):04d}" for i in reversed(range(n))]

    @staticmethod
    def get_years_range(start: int, end: int) -> List[str]:
        """
        Return all years from start to end inclusive, as zero-padded 4-digit strings.
        """
        return [f"{y:04d}" for y in range(start, end + 1)]

    @staticmethod
    def get_months(start: int=1, end: int = 12) -> List[str]:
        """
        Return ['01','02',...,'12'].
        """
        return [f"{m:02d}" for m in range(start, end + 1)]

    @staticmethod
    def get_all_days(month: Optional[int] = None, year: Optional[int] = None) -> List[str]:
        """
        If month and year given, returns valid days for that month; else 1–31.
        If only_odd=True, filter to odd-numbered days.
        """
        if month and year:
            days_in_month = calendar.monthrange(year, month)[1]
        else:
            days_in_month = 31
        days = list(range(1, days_in_month + 1))

        return [f"{d:02d}" for d in days]
    @staticmethod
    def get_all_times(interval_hours: int = 1) -> List[str]:
        """
        Return every interval_hours-hour point in the day, zero-padded,
        e.g. interval_hours=2 -> ['00:00','02:00',...,'22:00'].
        """
        return [f"{h:02d}:00" for h in range(0, 24, interval_hours)]
