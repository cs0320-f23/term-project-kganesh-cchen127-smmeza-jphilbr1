import schedule
import time
from .FullData import * 

# This re-compiles our all_county_geojson_with_data.json every
# week at Sunday 2am so that the data is always updated
def scheduler_job():
    print("Update scheduled: updating full data GeoJSON")
    update_geojson()

schedule.every().sunday.at("02:00").do(scheduler_job)

def scheduler_run():
    while True:
        schedule.run_pending()
        # print(time.time())
        time.sleep(30)