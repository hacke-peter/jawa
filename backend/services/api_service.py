'''Xonnect to satellites APIs'''

import os
from typing import List, Optional
from cdsapi import Client
from dotenv import load_dotenv

from helpers.api_time_helper import DateTimeUtils


load_dotenv()

DATASET_ERA5 = "reanalysis-era5-single-levels"

class APIClient:
    """Collection of APIs Calls."""

    def __init__(self):
        print("ERA5_URL",os.getenv('ERA5_URL'))
        self.client_era5 = self.start_api_clients(
            url=os.getenv('ERA5_URL'),
            key=os.getenv('ERA5_KEY')
            )
        self.client_x1 = self.start_api_clients(
            url=os.getenv('ERA5_URL'),
            key=os.getenv('ERA5_KEY')
            )

    def start_api_clients(self, url: str, key: str | None):
        '''initialize api clients'''
        if not key or not url:
            return None
        return Client(key=key, url=url)

    def era5_api(self,
                       years=DateTimeUtils.get_last_n_years(1),
                       months=DateTimeUtils.get_months(1, 5),
                       days=DateTimeUtils.get_all_days(),
                       time=DateTimeUtils.get_all_times(interval_hours=4)):
        '''Call era5 API'''
        request = {
            "product_type": ["reanalysis"],
            "variable": [
                "2m_dewpoint_temperature",
                "2m_temperature"
            ],
            "year": years,
            "month": months,
            "day": days,
            "time": time,
            "data_format": "netcdf",
            "download_format": "zip",
        }
        print("### call to api", request)
        # await self.client_era5.retrieve(DATASET_ERA5, request).download()
        return "done"
