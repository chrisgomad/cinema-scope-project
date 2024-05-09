import pytest
from data_storage import store_popularity_rank
from utilities.BaseClass import BaseClass
import sqlite3
from freezegun import freeze_time
from datetime import datetime, timedelta
from unittest.mock import patch
import schedule
from movie_mvp import get_popularity_rank
import movie_mvp

class TestOne(BaseClass):

    def setup_method(self, method):
        return super().setup_method(method)
    # This is a test for the get_popularity_rank function
    def test_get_popularity_rank(self):
        get_popularity_rank()  # Pass the driver from the setup fixture to the function

    # This is a test for the store_popularity_rank function
    def test_store_popularity_rank(self):
        store_popularity_rank('Test Movie', 'Test Popularity', 'Test Date')
        conn = sqlite3.connect('movie_database.db')
        c = conn.cursor()
        c.execute("SELECT * FROM movies WHERE name = 'Test Movie'")
        data = c.fetchall()
        assert len(data) == 1
        assert data[0][1] == 'Test Movie'
        assert data[0][2] == 'Test Popularity'
        assert data[0][3] == 'Test Date'
        c.execute("DELETE FROM movies WHERE name = 'Test Movie'")
        conn.commit()

    def test_scheduled_get_popularity_rank(self):
        with patch('movie_mvp.get_popularity_rank') as mock_job:
        # Schedule the job to run 1 minute from now
            schedule.every(1).minutes.do(movie_mvp.get_popularity_rank)
            now = datetime.now()
        # Freeze the time at a specific moment
        with freeze_time(now):
            # Move the time forward by 1 minute
            one_min_later = now + timedelta(minutes=1)
            with freeze_time(one_min_later):
                # Run the scheduled jobs
                schedule.run_pending()
    
        # Check that get_popularity_rank was called
        mock_job.assert_called_once()
    def teardown_method(self, method):
        conn = sqlite3.connect('movie_database.db')
        c = conn.cursor()
        c.execute("DELETE FROM movies")
        conn.commit()
