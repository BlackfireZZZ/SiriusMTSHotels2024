import React from "react";



const Header = ({techRef, aboutUsRef, formRef}) => {

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth', // Для плавной прокрутки
        });
    };

    const scrollToTech = () => {
        const yOffset = -220;
        const elementPosition = techRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: elementPosition, behavior: 'smooth' });
    };

    const scrollToAboutUs = () => {
        const yOffset = -150;
        const elementPosition = aboutUsRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: elementPosition, behavior: 'smooth' });
    }


    const scrollToForm = () => {
        const yOffset = -220;
        const elementPosition = formRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: elementPosition, behavior: 'smooth' });
    };

    return (
        <div className="lqd-head-sec container-fluid d-flex align-items-stretch">
            <div className="col lqd-head-col  ">
                <div className="header-module module-primary-nav pos-stc">
                    <div className="collapse navbar-collapse lqd-submenu-cover  " id="main-header-collapse"
                         aria-expanded="false" role="navigation">
                        <ul id="primary-nav"
                            className="main-nav lqd-menu-counter-right ld_header_menu_634d4b2de3f7d main-nav-hover-default nav align-items-lg-stretch justify-content-lg-start"
                            data-submenu-options="{&quot;toggleType&quot;:&quot;fade&quot;,&quot;handler&quot;:&quot;mouse-in-out&quot;}">
                            <li
                                id="menu-item-10"
                                className="menu-item menu-item-type-custom menu-item-object-custom menu-item-10"
                                style={{
                                    height: '50px',
                                    display: 'flex', // Используем flex для центровки
                                    justifyContent: 'center', // Горизонтальная центровка
                                    alignItems: 'center', // Вертикальная центровка
                                    padding: '10px 20px',
                                    backgroundColor: '#fff',
                                    borderRadius: '50px',
                                    boxShadow: '0 3px 40px rgba(0, 0, 0, 0.08)',
                                    margin: '15px 5px', // Отступы сверху и снизу
                                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                    cursor: 'pointer',
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.transform = 'scale(0.95)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.transform = 'scale(1)';
                                }}
                            >
                                <a
                                    onClick={scrollToTop}
                                    style={{
                                        color: '#002352',
                                        textDecoration: 'none',
                                    }}
                                >
                                    Главная
                                </a>
                            </li>

                            <li id="menu-item-11"
                                className="menu-item menu-item-type-custom menu-item-object-custom menu-item-11"
                                style={{
                                    height: '50px',
                                    display: 'flex', // Используем flex для центровки
                                    justifyContent: 'center', // Горизонтальная центровка
                                    alignItems: 'center', // Вертикальная центровка
                                    padding: '10px 20px',
                                    backgroundColor: '#fff',
                                    borderRadius: '50px',
                                    boxShadow: '0 3px 40px rgba(0, 0, 0, 0.08)',
                                    margin: '15px 5px', // Отступы сверху и снизу
                                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                    cursor: 'pointer',
                            }}
                                onMouseEnter={(e) => {
                                    e.target.style.transform = 'scale(0.95)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.transform = 'scale(1)';
                                }}>
                                <a onClick={scrollToAboutUs}
                                   style={{
                                       color: '#002352',
                                       textDecoration: 'none',
                                   }}
                                >
                                    Кто мы
                                </a>
                            </li>
                            <li id="menu-item-12"
                                className="menu-item menu-item-type-custom menu-item-object-custom menu-item-11" style={{
                                height: '50px',
                                display: 'flex', // Используем flex для центровки
                                justifyContent: 'center', // Горизонтальная центровка
                                alignItems: 'center', // Вертикальная центровка
                                padding: '10px 20px',
                                backgroundColor: '#fff',
                                borderRadius: '50px',
                                boxShadow: '0 3px 40px rgba(0, 0, 0, 0.08)',
                                margin: '15px 5px', // Отступы сверху и снизу
                                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                cursor: 'pointer',
                            }}
                                onMouseEnter={(e) => {
                                    e.target.style.transform = 'scale(0.95)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.transform = 'scale(1)';
                                }}>
                                <a onClick={scrollToTech} style={{
                                    color: '#002352',
                                    textDecoration: 'none',
                                }}>О разработке</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="col lqd-head-col   text-right text-lg-right">
                <div className="header-module module-button">
                    <a
                        className="btn btn-solid circle border-thin btn-has-label ld_header_button_634d4b2de4f6e ld_button_634d4b2de5255"
                        onClick={scrollToForm}
                        style={{cursor: 'pointer'}}>
                    <span>
                      <span className="btn-txt" data-text="Start a project">Начать сейчас</span>
                    </span>
                    </a>
                </div>
            </div>
        </div>
    )
};

export default Header;