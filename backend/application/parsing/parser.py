from application.schemas import ParserInfo


def parse(url: str) -> ParserInfo:
    return ParserInfo('TestName', 'TestAddress', ['service1', 'service2'])
