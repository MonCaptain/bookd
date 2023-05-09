from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager


class UserAccountManager(BaseUserManager):
    """
    Account Manager to create differrent users
    """

    def create_user(self, username, first_name, last_name, password=None):
        """
        Creates a user account
        """
        if not username:
            raise ValueError('Users must provide a username')

        user = self.model(
            username=username,
            first_name=first_name,
            last_name=last_name,
        )

        user.is_active = True

        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, username, first_name, last_name, password=None):
        """
        Creates a superuser account
        """
        user = self.create_user(
            username=username,
            first_name=first_name,
            last_name=last_name,
            password=password
        )

        user.is_staff = True
        user.is_superuser = True
        user.save()
        
        return user


class UserAccount(AbstractBaseUser, PermissionsMixin):
    """
    User Model
    """

    # User Detail Fields
    username = models.CharField(max_length=20, unique=True, null=False)
    first_name = models.CharField(max_length=150, null=False)
    last_name = models.CharField(max_length=150, null=False)
    date_created = models.DateTimeField(auto_now_add=True)

    # User Type Fields
    is_staff = models.BooleanField(default=False)

    # Privacy Settings
    visible_profile = models.BooleanField(default=True)

    objects = UserAccountManager()

    USERNAME_FIELD = 'username'

    REQUIRED_FIELDS = [
        'first_name',
        'last_name',
    ]

    @property
    def full_name(self) -> str:
        """
        Returns the user's full name
        """
        return f"{self.first_name} {self.last_name}"

    def __str__(self) -> str:
        return str(self.username)
