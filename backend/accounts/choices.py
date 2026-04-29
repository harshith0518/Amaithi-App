from django.db import models

class SexChoices(models.TextChoices):
    MALE = 'M', 'Male'
    FEMALE = 'F', 'Female'
    OTHER = 'O', 'Other'
    PREFER_NOT_TO_SAY = 'N', 'Prefer not to say'


class MaritalStatusChoices(models.TextChoices):
    SINGLE = 'S', 'Single'
    MARRIED = 'M', 'Married'
    DIVORCED = 'D', 'Divorced'
    WIDOWED = 'W', 'Widowed'
    PREFER_NOT_TO_SAY = 'N', 'Prefer not to say'