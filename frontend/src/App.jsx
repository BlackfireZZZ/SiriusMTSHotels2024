import './App.css';
import React, { useRef } from 'react';
import Form from "./components/Form";
import Header from "./components/Header";
import KeyWords from "./components/KeyWords";
import UsedTech from "./components/UsedTech";
import AboutUs from "./components/AboutUs";


function App() {
  const formRef = useRef(null);
  const techRef = useRef(null);
  const aboutUsRef = useRef(null);
    const scrollToForm = () => {
      const yOffset = -220;
        const elementPosition = formRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: elementPosition, behavior: 'smooth' });
    };

  return (
      <div>
        <div id="wrap" style={{display: 'flex', flexDirection: 'column'}}>
          <div className="lqd-sticky-placeholder hide" style={{height: '66px'}}/>
          <header className="header site-header main-header main-header-overlay is-stuck" data-sticky-header="true"
                  data-sticky-values-measured="true" data-sticky-options="{&quot;disableOnMobile&quot;:true}"
                  id="header" itemScope="itemscope" itemType="http://schema.org/WPHeader">
            <div className="lqd-head-sec-wrap pos-rel    vc_custom_1579164823599 ">
              <Header techRef={techRef} aboutUsRef={aboutUsRef} formRef={formRef}/>
            </div>
            <div className="lqd-mobile-sec">
              <div className="lqd-mobile-sec-inner navbar-header d-flex align-items-stretch">
                <div className="lqd-mobile-modules-container"/>
                <button type="button" className="navbar-toggle nav-trigger style-mobile collapsed" data-ld-toggle="true"
                        data-toggle="collapse" data-target="#lqd-mobile-sec-nav" aria-expanded="false"
                        data-toggle-options="{ &quot;changeClassnames&quot;: {&quot;html&quot;: &quot;mobile-nav-activated&quot;} }">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="bars">
                  <span className="bars-inner">
                    <span className="bar"/>
                    <span className="bar"/>
                    <span className="bar"/>
                  </span>
                </span>
                </button>
                <a className="navbar-brand" href="https://multiusepro.liquid-themes.com/">
                <span className="navbar-brand-inner">
                  <img className="logo-default"
                       src="https://multiusepro.liquid-themes.com/wp-content/themes/landing-hub/assets/img/logo/logo-1.svg"
                       alt="Hub WordPress Theme"/>
                </span>
                </a>
              </div>
            </div>
          </header>
          <main className="content" id="lqd-site-content">
            <div id="lqd-contents-wrap"><p/>
              <section
                  className="vc_row vc_custom_1605399378146 liquid-row-responsive-634d4b2deb4f9 liquid-row-shadowbox-634d4b2deb512 vc_row-o-full-height"
                  style={{minHeight: '100vh'}}>
                <div className="lqd-particles-bg-wrap">
                  <div className="ld-particles-container lqd-particles-as-bg ld_particles_634d4b2e183ac">
                    <div className="ld-particles-inner pointer-events-auto" id="lqd-579174300002-14637266-1f34"
                         data-particles="true"
                         data-particles-options="{&quot;particles&quot;:{&quot;number&quot;:{&quot;value&quot;:2},&quot;color&quot;:{&quot;value&quot;:&quot;#32a703&quot;},&quot;shape&quot;:{&quot;type&quot;:[&quot;circle&quot;]},&quot;size&quot;:{&quot;value&quot;:3},&quot;move&quot;:{&quot;out_mode&quot;:&quot;out&quot;}},&quot;interactivity&quot;:[],&quot;retina_detect&quot;:true,&quot;asBG&quot;:true}">
                      <canvas className="particles-js-canvas-el" style={{width: '100%', height: '100%'}} width={826}
                              height={2038}/>
                    </div>
                  </div>
                </div>
                <div className="ld-container container-fluid">
                  <div
                      className="row ld-row ld-row-outer vc_row-no-column-align vc_row-o-equal-height vc_row-o-content-middle vc_row-flex">
                    <div
                        className="wpb_column vc_column_container vc_col-sm-7 vc_col-lg-5 vc_col-md-6 liquid-column-634d4b2e02eac liquid-column-responsive-634d4b2e02eae">
                      <div className="vc_column-inner  ">
                        <div className="wpb_wrapper">
                          <div id="ld_images_group_container_634d4b2e02f7e"
                               className="lqd-imggrp-container ld_images_group_container_634d4b2e02f7e ca-initvalues-applied lqd-animations-done"
                               data-custom-animations="true"
                               data-ca-options="{&quot;triggerHandler&quot;:&quot;inview&quot;,&quot;animationTarget&quot;:&quot;.lqd-imggrp-single&quot;,&quot;duration&quot;:&quot;1800&quot;,&quot;delay&quot;:&quot;180&quot;,&quot;ease&quot;:&quot;power4.out&quot;,&quot;direction&quot;:&quot;forward&quot;,&quot;initValues&quot;:{&quot;opacity&quot;:0},&quot;animations&quot;:{&quot;opacity&quot;:1}}">
                            <div className="lqd-imggrp-inner">
                              <p/>
                              <div id="ld_images_group_element_634d4b2e0310a"
                                   className="lqd-imggrp-single ld_images_group_element_634d4b2e0310a lqd-unit-animation-done"
                                   style={{}}>
                                <div className="lqd-imggrp-img-container" data-parallax="true"
                                     data-parallax-from="{&quot;y&quot;:90,&quot;rotationZ&quot;:25}"
                                     data-parallax-to="{&quot;y&quot;:-130,&quot;rotationZ&quot;:-25}"
                                     data-parallax-options="{&quot;overflowHidden&quot;:false,&quot;ease&quot;:&quot;linear&quot;,&quot;start&quot;:&quot;top bottom&quot;}"
                                     style={{transform: 'translate(0px, -130px) rotate(-25deg)'}}>
                                  <figure className="loaded"><img width={31} height={34}
                                                                  src="https://multiusepro.liquid-themes.com/wp-content/uploads/2020/01/Shape-1308@2x.png"
                                                                  className="ld-lazyload entered loaded" alt=""
                                                                  data-src="https://multiusepro.liquid-themes.com/wp-content/uploads/2020/01/Shape-1308@2x.png"
                                                                  data-srcset data-aspect data-ll-status="loaded"/>
                                  </figure>
                                </div>
                              </div>
                              <div id="ld_images_group_element_634d4b2e0436d"
                                   className="lqd-imggrp-single ld_images_group_element_634d4b2e0436d lqd-unit-animation-done"
                                   style={{}}>
                                <div className="lqd-imggrp-img-container" data-parallax="true"
                                     data-parallax-from="{&quot;x&quot;:10,&quot;y&quot;:15}"
                                     data-parallax-to="{&quot;x&quot;:120,&quot;y&quot;:-130}"
                                     data-parallax-options="{&quot;overflowHidden&quot;:false,&quot;ease&quot;:&quot;linear&quot;,&quot;start&quot;:&quot;top bottom&quot;}"
                                     style={{transform: 'translate3d(94.04px, -95.78px, 0px)'}}>
                                  <figure className="loaded"><img width={55} height={54}
                                                                  src="https://multiusepro.liquid-themes.com/wp-content/uploads/2020/01/Rounded-Rectangle-1304@2x.png"
                                                                  className="ld-lazyload entered loaded" alt=""
                                                                  data-src="https://multiusepro.liquid-themes.com/wp-content/uploads/2020/01/Rounded-Rectangle-1304@2x.png"
                                                                  data-srcset data-aspect data-ll-status="loaded"/>
                                  </figure>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="ld-fancy-heading ld_fancy_heading_634d4b2e04e57"><h6
                              className="ld-fh-element lqd-highlight-underline lqd-highlight-grow-left text-decoration-default"> Attack on Data</h6></div>
                          <div className="ld-fancy-heading ld_fancy_heading_634d4b2e05610">
                            <h1 className="ld-fh-element lqd-highlight-custom-underline lqd-highlight-grow-left text-decoration-default is-in-view"
                                data-inview="true" data-transition-delay="true"
                                data-delay-options="{&quot;elements&quot;:&quot;.lqd-highlight-inner&quot;,&quot;delayType&quot;:&quot;transition&quot;}">
                              <mark className="lqd-highlight"><span className="lqd-highlight-txt">Услышим </span><span
                                  className="lqd-highlight-inner" style={{transitionDelay: '0ms'}}><svg
                                  xmlns="http://www.w3.org/2000/svg" width="235.509" height="13.504"
                                  viewBox="0 0 235.509 13.504" aria-hidden="true" preserveAspectRatio="none"><path
                                  d="M163,.383a13.044,13.044,0,0,1,1.517-.072,3.528,3.528,0,0,1,1.237-.134q.618.044,1.237.044a.249.249,0,0,1-.1.178.337.337,0,0,0-.1.266q3.092.088,6.184-.044T178.953.4l-.206-.088a12,12,0,0,0,4.123,0,13.467,13.467,0,0,1,5.772,0q1.443-.178,2.68-.266A5.978,5.978,0,0,1,193.8.4,16.707,16.707,0,0,1,198.01.045q2.164.088,4.844.088-.618.088-.824.134L201.412.4a3.893,3.893,0,0,0,2.061,0,5.413,5.413,0,0,1,1.649-.356q.618.088,1.134.178a9.762,9.762,0,0,0,1.544.09,17,17,0,0,1,3.092-.266q1.649,0,3.5.178,2.886.088,5.875.044t5.875-.222q0,.088.206.088h.412a21.975,21.975,0,0,0,2.577.889A12.458,12.458,0,0,1,232.12,2.18a3.962,3.962,0,0,1,1.031.622A3.349,3.349,0,0,1,234.8,3.825a5.079,5.079,0,0,1,.618,1.111q.412.534-1.031.98-1.031.444-.618.98a2.09,2.09,0,0,1,.206.889q0,.444.825.889.618.8-.206,1.245l-1.237.534q-1.443-.088-2.68-.134a17.255,17.255,0,0,1-2.267-.222,3.128,3.128,0,0,0-.928-.044,3.129,3.129,0,0,1-.928-.044q-2.267-.178-4.432-.266T217.7,9.476q-1.649-.088-2.886-.088a17.343,17.343,0,0,1-2.474-.178q-3.916,0-7.73-.088t-7.73-.266l-12.471-.178q-6.287-.088-12.883-.088h-1.958q-.928,0-1.958.088h-2.061q-1.031,0-2.061-.088-2.68-.088-5.256-.134t-5.256.044h-5.462q-2.577,0-5.462.088-4.535.088-8.76.178t-8.554.088q-2.886.088-5.875.088t-5.875.088q-1.443.088-2.886.134t-3.092.044q-4.741.178-9.791.312t-9.791.312q-2.267.088-4.329.088T78.77,10.1q-4.329.266-8.863.49t-9.276.49q-1.237.088-2.68.134a24.356,24.356,0,0,0-2.683.224q-2.68.178-5.462.312t-5.668.4q-2.474.266-4.741.312t-4.741.044q-1.031-.088-1.958-.134a9.684,9.684,0,0,1-1.958-.312,12.5,12.5,0,0,0-1.443-.312q-.825-.134-1.856-.31-2.886.356-6.39.666t-6.8.845a26.709,26.709,0,0,1-2.886.356,20.758,20.758,0,0,1-9.482-.889Q.232,11.962.026,11.25T1.263,9.917q0-.266.825-.266a13.039,13.039,0,0,0,2.886-.444A17.187,17.187,0,0,1,7.86,8.672q3.092-.266,6.184-.8,1.649-.178,3.3-.312t3.5-.312q4.123-.354,8.039-.712t8.039-.622q9.478-.8,18.758-1.338,2.68-.178,5.153-.356t4.741-.356q2.474-.178,5.05-.356T75.88,3.24h1.34a4.829,4.829,0,0,0,1.34-.178q2.267-.178,4.329-.222t4.329-.134a7.256,7.256,0,0,1,2.267,0,3.459,3.459,0,0,0,1.031-.088,6.009,6.009,0,0,1,2.37-.266,14.745,14.745,0,0,0,2.783-.088q1.649,0,2.474.088a1.308,1.308,0,0,1,.185.011,1.226,1.226,0,0,1,.33-.1,3.656,3.656,0,0,0,.515-.088,4.433,4.433,0,0,1,2.886.266q.412-.088,1.031-.178l1.237-.178q.412,0,1.031.044a5.761,5.761,0,0,0,1.237-.044q2.886-.088,5.772-.044a53.829,53.829,0,0,0,5.772-.222,9.505,9.505,0,0,1,1.34-.088h1.34a4.428,4.428,0,0,1,.821-.258l.825-.178a15.178,15.178,0,0,1,1.855.444,3.028,3.028,0,0,1,1.031-.534,4.039,4.039,0,0,1,1.443-.178,6.158,6.158,0,0,1,1.649.178,5.05,5.05,0,0,0,2.267.268q1.855-.088,3.813-.134T138.13,1.2q1.031,0,2.164-.044t2.37-.044q-.206-.088.412-.534h3.092q.412,0,.309.266t.928,0a5.845,5.845,0,0,1,1.443,0,31.833,31.833,0,0,0,5.359.088,21.471,21.471,0,0,1,6.8.178,5.236,5.236,0,0,0,1.031-.4q.412-.222.825-.4a.694.694,0,0,1,.137.07Z"
                                  transform="translate(0 0.002)"/></svg></span></mark>
                               каждый голос.
                            </h1>
                          </div>
                          <div className="ld-fancy-heading ld_fancy_heading_634d4b2e05cbd"><p
                              className="ld-fh-element lqd-highlight-underline lqd-highlight-grow-left text-decoration-default">
                            Мы изучаем отзывы на ваш курс и помогаем определить сильные и слабые стороны</p></div>
                          <div
                              className="vc_row vc_inner vc_row-fluid vc_custom_1618491590503 liquid-row-shadowbox-634d4b2e07b4f vc_column-gap-0">
                            <div className="ld-container container-fluid">
                              <div className="row ld-row ld-row-inner vc_row-o-content-middle vc_row-flex">
                                <div
                                    className="wpb_column vc_column_container vc_col-sm-12 vc_col-lg-6 liquid-column-634d4b2e1181f">
                                  <div className="vc_column-inner ">
                                    <div className="wpb_wrapper"><a onClick={scrollToForm} style={{cursor: 'pointer'}}
                                                                    className="btn btn-solid text-uppercase circle border-thin btn-has-label ld_button_634d4b2e118df vc_custom_1602667824194">
                                      <span>
                                        <span className="btn-txt" data-text="See how we work">Начни сейчас</span>
                                      </span>
                                    </a></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="ld-empty-space ld_spacer_634d4b2e11fd3"/>

                        </div>
                      </div>
                    </div>
                    <div
                        className="wpb_column vc_column_container vc_col-sm-5 vc_col-lg-offset-1 vc_col-md-6 text-right liquid-column-634d4b2e172ce liquid-column-responsive-634d4b2e172d0 lqd-column-top-onmobile">
                      <div className="vc_column-inner  vc_custom_1607345108348">
                        <div className="wpb_wrapper">
                          <div id="ld_images_group_container_634d4b2e17380"
                               className="lqd-imggrp-container ld_images_group_container_634d4b2e17380">
                            <div className="lqd-imggrp-inner">
                              <div id="ld_images_group_element_634d4b2e17463"
                                   className="lqd-imggrp-single ld_images_group_element_634d4b2e17463">
                                <div className="lqd-imggrp-img-container">
                                  <figure className="loaded"><img width={658} height={727}
                                                                  src="https://multiusepro.liquid-themes.com/wp-content/uploads/2020/10/Images@2x.png"
                                                                  className="ld-lazyload entered loaded" alt=""
                                                                  data-src="https://multiusepro.liquid-themes.com/wp-content/uploads/2020/10/Images@2x.png"
                                                                  data-srcset="https://multiusepro.liquid-themes.com/wp-content/uploads/2020/10/Images@2x-272x300.png 272w, https://multiusepro.liquid-themes.com/wp-content/uploads/2020/10/Images@2x-927x1024.png 927w, https://multiusepro.liquid-themes.com/wp-content/uploads/2020/10/Images@2x.png 1316w"
                                                                  data-aspect data-ll-status="loaded"
                                                                  srcSet="https://multiusepro.liquid-themes.com/wp-content/uploads/2020/10/Images@2x-272x300.png 272w, https://multiusepro.liquid-themes.com/wp-content/uploads/2020/10/Images@2x-927x1024.png 927w, https://multiusepro.liquid-themes.com/wp-content/uploads/2020/10/Images@2x.png 1316w"/>
                                  </figure>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="wpb_column vc_column_container vc_col-sm-12 liquid-column-634d4b2e182c7">
                      <div className="vc_column-inner  ">
                        <div className="wpb_wrapper ca-initvalues-applied lqd-animations-done"
                             data-custom-animations="true"
                             data-ca-options="{&quot;triggerHandler&quot;:&quot;inview&quot;,&quot;animationTarget&quot;:&quot;all-childs&quot;,&quot;duration&quot;:&quot;1800&quot;,&quot;delay&quot;:&quot;180&quot;,&quot;ease&quot;:&quot;power4.out&quot;,&quot;direction&quot;:&quot;forward&quot;,&quot;initValues&quot;:{&quot;y&quot;:35,&quot;transformOriginX&quot;:50,&quot;transformOriginY&quot;:50,&quot;transformOriginZ&quot;:&quot;0px&quot;,&quot;opacity&quot;:0},&quot;animations&quot;:{&quot;y&quot;:0,&quot;transformOriginX&quot;:50,&quot;transformOriginY&quot;:50,&quot;transformOriginZ&quot;:&quot;0px&quot;,&quot;opacity&quot;:1}}"/>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <section className="vc_row liquid-row-responsive-634d4b2e4273d liquid-row-shadowbox-634d4b2e42751"
                       style={{marginBottom: '20px', minHeight: '50vw'}}>
                <Form formRef={formRef}/>
              </section>

              <section data-custom-animations="true"
                       data-ca-options="{&quot;triggerHandler&quot;:&quot;inview&quot;,&quot;animationTarget&quot;:&quot;.wpb_column&quot;,&quot;duration&quot;:&quot;1800&quot;,&quot;delay&quot;:&quot;180&quot;,&quot;ease&quot;:&quot;power4.out&quot;,&quot;direction&quot;:&quot;forward&quot;,&quot;initValues&quot;:{&quot;opacity&quot;:0},&quot;animations&quot;:{&quot;opacity&quot;:1}}"
                       className="vc_row vc_custom_1612871937356 liquid-row-responsive-634d4b2e18da8 liquid-row-shadowbox-634d4b2e18dbe vc_column-gap-0 ca-initvalues-applied lqd-animations-done">
                <KeyWords/>
              </section>
              <section data-bg-image="url"
                       className="vc_row vc_custom_1605894390821 liquid-row-responsive-634d4b2e1df78 liquid-row-shadowbox-634d4b2e1df8c vc_row-has-fill vc_row-has-bg">
                <AboutUs aboutUsRef={aboutUsRef}/>
              </section>
              <section data-bg-image="url"
                       className="vc_row vc_custom_1605894313726 liquid-row-responsive-634d4b2e31c70 liquid-row-shadowbox-634d4b2e31c84 vc_row-has-fill vc_row-has-bg">
                <UsedTech techRef={techRef}/>
              </section>
              <p/></div>
          </main>
        </div>
      </div>
  );
}

export default App;
