import logging
from django.core.mail import send_mail
from django.conf import settings

logger = logging.getLogger(__name__)


# set the from_email to be None if you want to use the default email from settings.EMAIL_HOST_USER
def send_mail_through_django(subject, message, recipient_list, from_email=None):
    try:
        send_mail(
            subject=subject,
            message=message,
            from_email=from_email or settings.EMAIL_HOST_USER,
            recipient_list=recipient_list,
            fail_silently=False,
        )
        return True
    except Exception as e:
        logger.error(f"Error sending email: {e}")
        return False