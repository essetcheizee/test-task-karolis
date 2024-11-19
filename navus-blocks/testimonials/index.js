/**
 * Internal block libraries
 */
const {useEffect} = wp.element;
const { InspectorControls, MediaUpload } = wp.blockEditor;
const { PanelBody, Button, TextControl, TextareaControl } = wp.components;
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css'; // Import styles correctly

/**
 * Register block
 */
export default registerBlockType('navus/testimonials', {
    title: __('Testimonials', 'navus'),
    description: __('Testimonials block', 'navus'),
    category: 'navus-blocks',
    keywords: [
      __('testimonial', 'navus'),
      __('swiper', 'navus'),
      __('slider', 'navus'),
    ],
    attributes: {
        sectionTitle: {
            type: 'string',
            default: 'Enter Title'
        },
        testimonials: {
            type: 'array',
            default: [],
        },
    },
    edit: (props) => {
      const { attributes, setAttributes } = props;
      const { testimonials, sectionTitle } = attributes;
      const { className } = props;
  
      // Add a testimonial
      const addTestimonial = () => {
        const newTestimonial = {
          testimonial: '',
          name: '',
          position: '',
          company: '',
          image: '',
        };
        setAttributes({
          testimonials: [...testimonials, newTestimonial],
        });
      };
      // Remove testimonial
      const removeTestimonial = (index) => {
        const updatedTestimonials = testimonials.filter((_, i) => i !== index);
        setAttributes({ testimonials: updatedTestimonials });
      };
  
    // Initialize Swiper manually
    const initializeSwiper = () => {
      const testimonalWrappers = document.querySelectorAll('.testimonial-wrapper');
      testimonalWrappers.forEach((testimonialEl) => {
      const swiperContainer = testimonialEl.querySelector('.swiper-container')
        new Swiper(swiperContainer, {
          slidesPerView: 1,
          loop: true,
          autoplay: {
            delay: 2500,
            disableOnInteraction: false,
          },        
          pagination: {
            el: testimonialEl.querySelector('.swiper-pagination'),
            clickable: true,
          },
          navigation: {
            nextEl: testimonialEl.querySelector('.swiper-button-next'),
            prevEl: testimonialEl.querySelector('.swiper-button-prev'),
          },
        });
      });
      };
  
      // Reinitialize Swiper when testimonials change or component is rendered
      useEffect(() => {
        initializeSwiper();
      }, [testimonials]); // Trigger reinitialization whenever testimonials change
  
      return (
        <>
          <InspectorControls>
            <PanelBody title={__('Testimonial Settings', 'navus')}>
                <TextControl
                label={__('Section Title', 'navus')}
                value={sectionTitle}
                onChange={(value) => setAttributes({ sectionTitle: value})}
                placeholder={__('Section Title', 'navus')}
                />
              <Button isPrimary onClick={addTestimonial}>
                {__('Add Testimonial', 'navus')}
              </Button>
              {testimonials.map((testimonial, index) => (
                <div key={index} className="testimonial-item">
                    <TextareaControl
                    label={__('Testimonial', 'navus')}
                    value={testimonial.testimonial}
                    onChange={(value) =>{ 
                        const updatedTestimonials = [...testimonials];
                        updatedTestimonials[index].testimonial = value;
                        setAttributes({testimonials: updatedTestimonials})
                    }}
                    placeholder={__('Testimonial text', 'navus')}
                    />
                    <TextControl
                    label={__('Name', 'navus')}
                    value={testimonial.name}
                    onChange={(value) => {
                        const updatedTestimonials = [...testimonials];
                        updatedTestimonials[index].name = value;
                        setAttributes({testimonials: updatedTestimonials})
                    }}
                    />
                    <TextControl
                    label={__('Position', 'navus')}
                    value={testimonial.position}
                    onChange={(value) => {
                        const updatedTestimonials = [...testimonials];
                        updatedTestimonials[index].position = value;
                        setAttributes({testimonials: updatedTestimonials})
                    }}
                    />
                    <TextControl
                    label={__('Company', 'navus')}
                    value={testimonial.company}
                    onChange={(value) => {
                        const updatedTestimonials = [...testimonials];
                        updatedTestimonials[index].company = value;
                        setAttributes({testimonials: updatedTestimonials})
                    }}
                    />
                    <MediaUpload
                    onSelect={(media) => {
                        const updatedTestimonials = [...testimonials];
                        updatedTestimonials[index].image = media.url;
                        setAttributes({testimonials: updatedTestimonials})
                    }}
                    value={testimonial.image}
                    render={({ open }) => (
                        <Button onClick={open}>
                        {testimonial.image ? __('Change Image', 'navus') : __('Select Image', 'navus')}
                        </Button>
                    )}
                    />
                    <Button isDestructive onClick={() => removeTestimonial(index)}>
                    {__('Remove Testimonial', 'navus')}
                    </Button>
                </div>
                ))}
            </PanelBody>
          </InspectorControls>
  
          <div className={className}>
            <div className='container testimonial-container'>
                <h1>{sectionTitle}</h1>
                <div className='testimonial-wrapper'>
                  <div className='navus-testimonial-quote-text'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="47" height="44" viewBox="0 0 47 44" fill="none">
                      <path d="M17.4778 24.8417V44H0V28.875C0 20.6861 0.96596 14.7583 2.89788 11.0917C5.43353 6.20278 9.4483 2.50556 14.9422 0L18.9268 6.41667C15.6063 7.82222 13.1612 9.93056 11.5915 12.7417C10.0218 15.4917 9.14644 19.525 8.96532 24.8417H17.4778ZM45.5511 24.8417V44H28.0732V28.875C28.0732 20.6861 29.0392 14.7583 30.9711 11.0917C33.5067 6.20278 37.5215 2.50556 43.0154 0L47 6.41667C43.6795 7.82222 41.2344 9.93056 39.6647 12.7417C38.0951 15.4917 37.2197 19.525 37.0385 24.8417H45.5511Z" fill="black"/>
                    </svg>
                  </div>
                  <div className='swiper-container'>
                    <div className='swiper-wrapper'>
                        {testimonials.map((testimonial, index) => (
                        <div key={index} className="swiper-slide testimonial-slide">
                            <p>{testimonial.testimonial}</p>
                            <div className='d-flex align-items-center gap-4'>
                                <div className='img-wrapper'>
                                    {testimonial.image ? (<img src={testimonial.image} alt={testimonial.name ?? 'Testimonial ' + index} className={`img-fluid rounded-circle`} />)
                                    : (<img src="https://via.placeholder.com/94?text=No%20Media%20Available" className={`img-fluid rounded-circle`} />)
                                    }
                                </div>
                                <div className='testimonee-details'>
                                    <h4>{testimonial.name}</h4>
                                    <p>{testimonial.position}</p>
                                    <p>{testimonial.company}</p>
                                </div>
                            </div>
                        </div>
                        ))}
                        </div>
                    </div>
                    
                  <div className="swiper-button-next slide-btns"></div>
                  <div className="swiper-button-prev slide-btns"></div>
                  <div className="swiper-pagination"></div> 
                </div>  
             
              </div>
          </div>
        </>
      );
    },
    save: (props) => {
      const { attributes } = props;
      const { testimonials, sectionTitle  } = attributes;
      return (
        <div className={attributes.className}>
          <div className='container testimonial-container'>
              <h1>{sectionTitle}</h1>
              <div className='testimonial-wrapper'>
                <div className='navus-testimonial-quote-text'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="47" height="44" viewBox="0 0 47 44" fill="none">
                    <path d="M17.4778 24.8417V44H0V28.875C0 20.6861 0.96596 14.7583 2.89788 11.0917C5.43353 6.20278 9.4483 2.50556 14.9422 0L18.9268 6.41667C15.6063 7.82222 13.1612 9.93056 11.5915 12.7417C10.0218 15.4917 9.14644 19.525 8.96532 24.8417H17.4778ZM45.5511 24.8417V44H28.0732V28.875C28.0732 20.6861 29.0392 14.7583 30.9711 11.0917C33.5067 6.20278 37.5215 2.50556 43.0154 0L47 6.41667C43.6795 7.82222 41.2344 9.93056 39.6647 12.7417C38.0951 15.4917 37.2197 19.525 37.0385 24.8417H45.5511Z" fill="black"/>
                  </svg>
                </div>
                <div className='swiper-container'>
                  <div className='swiper-wrapper'>
                      {testimonials.map((testimonial, index) => (
                      <div key={index} className="swiper-slide testimonial-slide">
                          <p>{testimonial.testimonial}</p>
                          <div className='d-flex align-items-center gap-4'>
                              <div className='img-wrapper'>
                                  {testimonial.image ? (<img src={testimonial.image} alt={testimonial.name ?? 'Testimonial ' + index} className={`img-fluid rounded-circle`} />)
                                  : (<img src="https://via.placeholder.com/94?text=No%20Media%20Available" className={`img-fluid rounded-circle`} />)
                                  }
                              </div>
                              <div className='testimonee-details'>
                                  <h4>{testimonial.name}</h4>
                                  <p>{testimonial.position}</p>
                                  <p>{testimonial.company}</p>
                              </div>
                          </div>
                      </div>
                      ))}
                      </div>
                  </div>
                  <div class="swiper-button-next slide-btns"></div>
                  <div class="swiper-button-prev slide-btns"></div>
                  <div className="swiper-pagination"></div>
              </div>
            </div>
          </div>
      );
    },
  });