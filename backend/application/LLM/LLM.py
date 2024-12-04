from application.models import Conversation, Message
from typing import List, Optional
from application.schemas import SiteInfo


def apply(info: SiteInfo or None, context: List or None) -> str:
    return 'Demo answer'
