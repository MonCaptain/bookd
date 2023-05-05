# Importing the function from utils
from django.core.management.utils import get_random_secret_key


# Generating and printing the SECRET_KEY
print(get_random_secret_key())
